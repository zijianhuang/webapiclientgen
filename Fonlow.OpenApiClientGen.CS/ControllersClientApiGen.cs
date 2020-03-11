using Fonlow.OpenApiClientGen.ClientTypes;
using Microsoft.OpenApi.Models;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Fonlow.OpenApiClientGen.Cs
{
	/// <summary>
	/// Store CodeDom references shared by all functions of the client API class.
	/// </summary>
	internal class SharedContext
	{
		internal CodeFieldReferenceExpression clientReference { get; set; }
		internal CodeFieldReferenceExpression baseUriReference { get; set; }
	}


	/// <summary>
	/// Generate .NET codes of the client API of the controllers
	/// </summary>
	public class ControllersClientApiGen
	{
		CodeCompileUnit codeCompileUnit;
		SharedContext sharedContext;
		CodeNamespace clientNamespace;
		/// <summary>
		/// 
		/// </summary>
		/// <param name="codeGenParameters"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersClientApiGen(Settings settings)
		{
			this.settings = settings;
			codeCompileUnit = new CodeCompileUnit();
			sharedContext = new SharedContext();
			nameComposer = new NameComposer(settings);
		}

		readonly Settings settings;

		readonly NameComposer nameComposer;

		/// <summary>
		/// Save C# codes to a file, after CreateDom().
		/// </summary>
		/// <param name="fileName"></param>
		// hack inspired by https://csharpcodewhisperer.blogspot.com/2014/10/create-c-class-code-from-datatable.html
		public void Save(string fileName)
		{
			using (var stream = new MemoryStream())
			using (StreamWriter writer = new StreamWriter(stream))
			{
				WriteCode(writer);
				writer.Flush();
				stream.Position = 0;
				using (var stringReader = new StreamReader(stream))
				using (var fileWriter = new StreamWriter(fileName))
				{
					var s = stringReader.ReadToEnd();
					fileWriter.Write(s.Replace("//;", ""));
				}
			}
		}

		/// <summary>
		/// Write CodeDOM into C# codes to TextWriter
		/// </summary>
		/// <param name="writer"></param>
		void WriteCode(TextWriter writer)
		{
			if (writer == null)
				throw new ArgumentNullException(nameof(writer), "No TextWriter instance is defined.");

			using (CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp"))
			{
				CodeGeneratorOptions options = new CodeGeneratorOptions() { BracingStyle = "C", IndentString = "\t" };
				provider.GenerateCodeFromCompileUnit(codeCompileUnit, writer, options);
			}
		}

		/// <summary>
		/// Write CodeDOM into C# codes to text
		/// </summary>
		/// <returns></returns>
		public string WriteToText()
		{
			using (var stream = new MemoryStream())
			using (StreamWriter writer = new StreamWriter(stream))
			{
				WriteCode(writer);
				writer.Flush();
				stream.Position = 0;
				using (var stringReader = new StreamReader(stream))
				using (var stringWriter = new StringWriter())
				{
					var s = stringReader.ReadToEnd();
					stringWriter.Write(s.Replace("//;", ""));
					return stringWriter.ToString();
				}
			}
		}

		/// <summary>
		/// Generate CodeDom of the client API for ApiDescriptions.
		/// </summary>
		/// <param name="descriptions">Web Api descriptions exposed by Configuration.Services.GetApiExplorer().ApiDescriptions</param>
		public void CreateCodeDom(OpenApiPaths paths, OpenApiComponents components)
		{
			if (paths == null && components == null)
			{
				return;
			}

			clientNamespace = new CodeNamespace(settings.ClientNamespace);
			codeCompileUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

			var componentsToCsTypes = new ComponentsToCsTypes(settings, codeCompileUnit, clientNamespace);
			componentsToCsTypes.CreateCodeDom(components);

			if (paths == null)
				return;

			clientNamespace.Imports.AddRange(new CodeNamespaceImport[]{
				new CodeNamespaceImport("System"),
				new CodeNamespaceImport("System.Collections.Generic"),
				new CodeNamespaceImport("System.Threading.Tasks"),
				new CodeNamespaceImport("System.Net.Http"),
				new CodeNamespaceImport("Newtonsoft.Json"),
				});

			var containerClassNames = GetContainerClassNames(paths);

			var newClassesCreated = containerClassNames.Select(d => CreateControllerClientClass(clientNamespace, d)).ToArray();

			foreach (var p in paths)
			{
				foreach (var op in p.Value.Operations)
				{
					ClientApiFunctionGen functionGen = new ClientApiFunctionGen();
					var apiFunction = functionGen.CreateApiFunction(sharedContext, settings, p.Key, op.Key, op.Value, componentsToCsTypes, true);
					if (apiFunction == null)
					{
						System.Diagnostics.Trace.TraceWarning($"Not to generate for {p.Key} {op.Key}.");
						continue;
					}

					var containerClassName = nameComposer.GetContainerName(op.Value, p.Key);
					var existingClass = LookupExistingClass(containerClassName);

					existingClass.Members.Add(apiFunction);
					if (settings.GenerateBothAsyncAndSync)
					{
						ClientApiFunctionGen functionGen2 = new ClientApiFunctionGen();
						existingClass.Members.Add(functionGen2.CreateApiFunction(sharedContext, settings, p.Key, op.Key, op.Value, componentsToCsTypes, false));
					}
				}
			}
		}

		string[] GetContainerClassNames(OpenApiPaths paths)
		{
			if (settings.ContainerNameStrategy == ContainerNameStrategy.None)
			{
				return new string[] { settings.ContainerClassName };
			}

			List<string> names = new List<string>();

			foreach (var p in paths)
			{
				foreach (var op in p.Value.Operations)
				{
					var name = nameComposer.GetContainerName(op.Value, p.Key);
					names.Add(name);
				}
			}

			return names.Distinct().ToArray();
		}

		/// <summary>
		/// Lookup existing CodeTypeDeclaration created.
		/// </summary>
		/// <param name="controllerName"></param>
		/// <returns></returns>
		CodeTypeDeclaration LookupExistingClass(string controllerName)
		{
			for (int i = 0; i < codeCompileUnit.Namespaces.Count; i++)
			{
				var ns = codeCompileUnit.Namespaces[i];
				if (ns.Name == settings.ClientNamespace)
				{
					for (int k = 0; k < ns.Types.Count; k++)
					{
						var c = ns.Types[k];
						if (c.Name == controllerName)
							return c;
					}
				}
			}

			return null;
		}

		CodeTypeDeclaration CreateControllerClientClass(CodeNamespace ns, string className)
		{
			var targetClass = new CodeTypeDeclaration(className)
			{
				IsClass = true,
				IsPartial = true,
				TypeAttributes = TypeAttributes.Public,
			};

			ns.Types.Add(targetClass);
			AddLocalFields(targetClass);
			AddConstructorWithHttpClient(targetClass);

			return targetClass;
		}


		static void AddLocalFields(CodeTypeDeclaration targetClass)
		{
			CodeMemberField clientField = new CodeMemberField();
			clientField.Attributes = MemberAttributes.Private;
			clientField.Name = "client";
			clientField.Type = new CodeTypeReference("System.Net.Http.HttpClient");
			targetClass.Members.Add(clientField);

			//CodeMemberField baseUriField = new CodeMemberField();
			//baseUriField.Attributes = MemberAttributes.Private;
			//baseUriField.Name = "baseUri";
			//baseUriField.Type = new CodeTypeReference("System.Uri");
			//targetClass.Members.Add(baseUriField);

		}

		void AddConstructorWithHttpClient(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new CodeConstructor();
			constructor.Attributes =
				MemberAttributes.Public | MemberAttributes.Final;

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"System.Net.Http.HttpClient", "client"));

			constructor.Statements.Add(new CodeSnippetStatement(@"			if (client == null)
				throw new ArgumentNullException(""Null HttpClient."", ""client"");
"));
			constructor.Statements.Add(new CodeSnippetStatement(@"			if (client.BaseAddress == null)
				throw new ArgumentNullException(""HttpClient has no BaseAddress"", ""client"");
"));
			// Add field initialization logic
			sharedContext.clientReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "client");
			constructor.Statements.Add(new CodeAssignStatement(sharedContext.clientReference, new CodeArgumentReferenceExpression("client")));
			targetClass.Members.Add(constructor);
		}

	}


}
