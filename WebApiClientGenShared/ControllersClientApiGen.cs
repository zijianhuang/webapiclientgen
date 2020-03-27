using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using Fonlow.Web.Meta;
using System;
using Fonlow.Poco2Client;

namespace Fonlow.CodeDom.Web.Cs
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
		CodeCompileUnit targetUnit { get; set; }
		SharedContext sharedContext { get; set; }
		CodeGenSettings codeGenParameters { get; set; }

		/// <summary>
		/// 
		/// </summary>
		/// <param name="codeGenParameters"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersClientApiGen(CodeGenSettings codeGenParameters)
		{
			if (codeGenParameters == null)
				throw new System.ArgumentNullException(nameof(codeGenParameters));

			this.codeGenParameters = codeGenParameters;
			targetUnit = new CodeCompileUnit();
			sharedContext = new SharedContext();
			poco2CsGen = new Poco2CsGen(targetUnit);
		}

		Poco2CsGen poco2CsGen;

		///// <summary>
		///// Save C# codes into a file.
		///// </summary>
		///// <param name="fileName"></param>
		//public void Save(string fileName)
		//{
		//	using (CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp"))
		//	{
		//		CodeGeneratorOptions options = new CodeGeneratorOptions();
		//		options.BracingStyle = "C";
		//		options.IndentString = "\t";
		//		using (StreamWriter writer = new StreamWriter(fileName))
		//		{
		//			provider.GenerateCodeFromCompileUnit(targetUnit, writer, options);
		//		}
		//	}
		//}

		/// <summary>
		/// Save C# codes into a file.
		/// </summary>
		/// <param name="fileName"></param>
		// hack inspired by https://csharpcodewhisperer.blogspot.com/2014/10/create-c-class-code-from-datatable.html
		public void Save(string fileName)
		{
			using (CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp"))
			{
				CodeGeneratorOptions options = new CodeGeneratorOptions();
				options.BracingStyle = "C";
				options.IndentString = "\t";
				using (var stream = new MemoryStream())
				using (StreamWriter writer = new StreamWriter(stream))
				{
					provider.GenerateCodeFromCompileUnit(targetUnit, writer, options);
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
		}

		public bool ForBothAsyncAndSync { get; set; }


		void GenerateCsFromPoco()
		{
			if (codeGenParameters.ApiSelections.DataModelAssemblyNames != null)
			{
				var allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
				var assemblies = allAssemblies.Where(d => codeGenParameters.ApiSelections.DataModelAssemblyNames.Any(k => k.Equals(d.GetName().Name, StringComparison.CurrentCultureIgnoreCase)))
					.OrderBy(n => n.FullName)
					.ToArray();
				var cherryPickingMethods = codeGenParameters.ApiSelections.CherryPickingMethods.HasValue ? (CherryPickingMethods)codeGenParameters.ApiSelections.CherryPickingMethods.Value : CherryPickingMethods.DataContract;
				foreach (var assembly in assemblies)
				{
					var xmlDocFileName = DocComment.DocCommentLookup.GetXmlPath(assembly);
					var docLookup = Fonlow.DocComment.DocCommentLookup.Create(xmlDocFileName);
					poco2CsGen.CreateCodeDom(assembly, cherryPickingMethods, docLookup, codeGenParameters.ClientApiOutputs.CSClientNamespaceSuffix,
							codeGenParameters.ClientApiOutputs.DataAnnotationsEnabled, codeGenParameters.ClientApiOutputs.DataAnnotationsToComments);
				}
			}
			else if (codeGenParameters.ApiSelections.DataModels != null)
			{
				var allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
				foreach (var dm in codeGenParameters.ApiSelections.DataModels)
				{
					var assembly = allAssemblies.FirstOrDefault(d => d.GetName().Name.Equals(dm.AssemblyName, StringComparison.CurrentCultureIgnoreCase));
					if (assembly != null)
					{
						var xmlDocFileName = DocComment.DocCommentLookup.GetXmlPath(assembly);
						var docLookup = Fonlow.DocComment.DocCommentLookup.Create(xmlDocFileName);
						var cherryPickingMethods = dm.CherryPickingMethods.HasValue ? (CherryPickingMethods)dm.CherryPickingMethods.Value : CherryPickingMethods.DataContract;
						poco2CsGen.CreateCodeDom(assembly, cherryPickingMethods, docLookup, codeGenParameters.ClientApiOutputs.CSClientNamespaceSuffix, 
							codeGenParameters.ClientApiOutputs.DataAnnotationsEnabled, codeGenParameters.ClientApiOutputs.DataAnnotationsToComments);
					}
				}
			}
		}

		/// <summary>
		/// Generate CodeDom of the client API for ApiDescriptions.
		/// </summary>
		/// <param name="descriptions">Web Api descriptions exposed by Configuration.Services.GetApiExplorer().ApiDescriptions</param>
		public void CreateCodeDom(WebApiDescription[] descriptions)
		{
			if (descriptions == null)
			{
				throw new ArgumentNullException(nameof(descriptions));
			}

			GenerateCsFromPoco();
			//controllers of ApiDescriptions (functions) grouped by namespace
			var controllersGroupByNamespace = descriptions.Select(d => d.ActionDescriptor.ControllerDescriptor)
				.Distinct()
				.GroupBy(d => d.ControllerType.Namespace)
				.OrderBy(g => g.Key);// order by namespace

			//Create client classes mapping to controller classes
			foreach (var grouppedControllerDescriptions in controllersGroupByNamespace)
			{
				var clientNamespaceText = grouppedControllerDescriptions.Key + codeGenParameters.ClientApiOutputs.CSClientNamespaceSuffix;
				var clientNamespace = new CodeNamespace(clientNamespaceText);
				targetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

				clientNamespace.Imports.AddRange(new CodeNamespaceImport[]{
				new CodeNamespaceImport("System"),
				new CodeNamespaceImport("System.Collections.Generic"),
				new CodeNamespaceImport("System.Threading.Tasks"),
				new CodeNamespaceImport("System.Net.Http"),
				new CodeNamespaceImport("Newtonsoft.Json"),
				});

				var newClassesCreated = grouppedControllerDescriptions
					.OrderBy(d => d.ControllerName)
					.Select(d =>
					{
						var controllerFullName = d.ControllerType.Namespace + "." + d.ControllerName;
						if (codeGenParameters.ApiSelections.ExcludedControllerNames != null && codeGenParameters.ApiSelections.ExcludedControllerNames.Contains(controllerFullName))
							return null;

						string containerClassName = GetContainerClassName(d.ControllerName);
						return CreateControllerClientClass(clientNamespace, containerClassName);
					}
					)
					.ToArray();//add classes into the namespace
			}

			foreach (var d in descriptions)
			{
				var controllerNamespace = d.ActionDescriptor.ControllerDescriptor.ControllerType.Namespace;
				var controllerName = d.ActionDescriptor.ControllerDescriptor.ControllerName;
				var controllerFullName = controllerNamespace + "." + controllerName;
				if (codeGenParameters.ApiSelections.ExcludedControllerNames != null && codeGenParameters.ApiSelections.ExcludedControllerNames.Contains(controllerFullName))
					continue;

				var existingClientClass = LookupExistingClass(controllerNamespace, GetContainerClassName(controllerName));
				System.Diagnostics.Trace.Assert(existingClientClass != null);

				var apiFunction = ClientApiFunctionGen.Create(sharedContext, d, poco2CsGen, this.codeGenParameters.ClientApiOutputs.StringAsString, true, codeGenParameters.ClientApiOutputs.DIFriendly);
				existingClientClass.Members.Add(apiFunction);
				if (ForBothAsyncAndSync)
				{
					existingClientClass.Members.Add(ClientApiFunctionGen.Create(sharedContext, d, poco2CsGen, this.codeGenParameters.ClientApiOutputs.StringAsString, false, codeGenParameters.ClientApiOutputs.DIFriendly));
				}
			}

		}

		string GetContainerClassName(string controllerName)
		{
			return controllerName + (codeGenParameters.ClientApiOutputs.ContainerNameSuffix ?? String.Empty);
		}

		/// <summary>
		/// Lookup existing CodeTypeDeclaration created.
		/// </summary>
		/// <param name="namespaceText"></param>
		/// <param name="containerClassName"></param>
		/// <returns></returns>
		CodeTypeDeclaration LookupExistingClass(string namespaceText, string containerClassName)
		{
			for (int i = 0; i < targetUnit.Namespaces.Count; i++)
			{
				var ns = targetUnit.Namespaces[i];
				if (ns.Name == namespaceText + codeGenParameters.ClientApiOutputs.CSClientNamespaceSuffix)
				{
					for (int k = 0; k < ns.Types.Count; k++)
					{
						var c = ns.Types[k];
						if (c.Name == containerClassName)
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
			if (codeGenParameters.ClientApiOutputs.DIFriendly)
			{
				AddConstructorWithHttpClient(targetClass);
			}
			else
			{
				AddConstructor(targetClass);
			}

			return targetClass;
		}


		void AddLocalFields(CodeTypeDeclaration targetClass)
		{
			CodeMemberField clientField = new CodeMemberField();
			clientField.Attributes = MemberAttributes.Private;
			clientField.Name = "client";
			clientField.Type = new CodeTypeReference("System.Net.Http.HttpClient");
			targetClass.Members.Add(clientField);

			if (!codeGenParameters.ClientApiOutputs.DIFriendly)
			{
				CodeMemberField baseUriField = new CodeMemberField();
				baseUriField.Attributes = MemberAttributes.Private;
				baseUriField.Name = "baseUri";
				baseUriField.Type = new CodeTypeReference("System.Uri");
				targetClass.Members.Add(baseUriField);
			}

		}

		void AddConstructor(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new CodeConstructor();
			constructor.Attributes =
				MemberAttributes.Public | MemberAttributes.Final;

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"System.Net.Http.HttpClient", "client"));
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"System.Uri", "baseUri"));

			constructor.Statements.Add(new CodeSnippetStatement(@"			if (client == null)
				throw new ArgumentNullException(""Null HttpClient."", ""client"");
"));
			constructor.Statements.Add(new CodeSnippetStatement(@"			if (baseUri == null)
				throw new ArgumentNullException(""Null baseUri"", ""baseUri"");
"));
			// Add field initialization logic
			sharedContext.clientReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "client");
			constructor.Statements.Add(new CodeAssignStatement(sharedContext.clientReference, new CodeArgumentReferenceExpression("client")));
			sharedContext.baseUriReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "baseUri");
			constructor.Statements.Add(new CodeAssignStatement(sharedContext.baseUriReference, new CodeArgumentReferenceExpression("baseUri")));
			targetClass.Members.Add(constructor);
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
