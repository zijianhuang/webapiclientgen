using Fonlow.OpenApiClientGen.ClientTypes;
using Fonlow.TypeScriptCodeDom;
using Microsoft.OpenApi.Models;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate TypeScript codes of the client API of the controllers
	/// </summary>
	public abstract class ControllersTsClientApiGenBase
	{
		protected CodeCompileUnit CodeCompileUnit { get; private set; }

		CodeNamespace clientNamespace;
		protected Settings settings;
		JSOutput jsOutput;

		readonly NameComposer nameComposer;

		Func<ClientApiTsFunctionGenAbstract> apiFunctionGenFactory; //to be injected in ctor of derived class.

		/// <summary>
		/// 
		/// </summary>
		/// <param name="jsOutput"></param>
		/// <param name="apiFunctionGen"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		protected ControllersTsClientApiGenBase(Settings settings, JSOutput jsOutput, Func<ClientApiTsFunctionGenAbstract> apiFunctionGenFactory)
		{
			this.settings = settings;
			this.jsOutput = jsOutput;
			this.apiFunctionGenFactory = apiFunctionGenFactory;
			CodeCompileUnit = new CodeCompileUnit();
			nameComposer = new NameComposer(settings);

			TsCodeGenerationOptions options = TsCodeGenerationOptions.Instance;
			options.BracingStyle = "JS";
			options.IndentString = "\t";
			options.CamelCase = true;

		}

		/// <summary>
		/// Save C# codes into a file.
		/// </summary>
		public void Save()
		{
			using (StreamWriter writer = new StreamWriter(jsOutput.JSPath))
			{
				WriteCode(writer);
			}
		}

		/// <summary>
		/// Write CodeDOM into TS codes to TextWriter
		/// </summary>
		/// <param name="writer"></param>
		void WriteCode(TextWriter writer)
		{
			if (writer == null)
				throw new ArgumentNullException(nameof(writer), "No TextWriter instance is defined.");

			using (var provider = new TypeScriptCodeProvider(jsOutput.AsModule))
			{
				provider.GenerateCodeFromCompileUnit(CodeCompileUnit, writer, TsCodeGenerationOptions.Instance);
			}
		}

		/// <summary>
		/// Write CodeDOM into C# codes to text
		/// </summary>
		/// <returns></returns>
		public string WriteToText()
		{
			using (var writer = new StringWriter())
			{
				WriteCode(writer);
				return writer.ToString();
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
			CodeCompileUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

			var componentsToTsTypes = new ComponentsToTsTypes(settings, CodeCompileUnit, clientNamespace);
			componentsToTsTypes.CreateCodeDom(components);

			if (paths == null)
				return;

			AddBasicReferences();

			var containerClassNames = GetContainerClassNames(paths);

			var newClassesCreated = containerClassNames.Select(d => CreateControllerClientClass(clientNamespace, d)).ToArray();

			foreach (var p in paths)
			{
				var relativePath = p.Key;
				foreach (var op in p.Value.Operations)
				{
					var apiFunctionGen = apiFunctionGenFactory();
					var apiFunction = apiFunctionGen.CreateApiFunction(settings, relativePath, op.Key, op.Value, new ComponentsToTsTypes(settings, CodeCompileUnit, clientNamespace) );
					if (apiFunction == null)
					{
						System.Diagnostics.Trace.TraceWarning($"Not to generate for {p.Key} {op.Key}.");
						continue;
					}

					var containerClassName = nameComposer.GetContainerName(op.Value, p.Key);
					var existingClass = LookupExistingClass(containerClassName);
					existingClass.Members.Add(apiFunction);
				}
			}


			foreach (var c in newClassesCreated)
			{
				AddHelperFunctionsInClass(c);
			}
		}

		/// <summary>
		/// Lookup existing CodeTypeDeclaration created.
		/// </summary>
		/// <param name="controllerName"></param>
		/// <returns></returns>
		CodeTypeDeclaration LookupExistingClass(string controllerName)
		{
			for (int i = 0; i < CodeCompileUnit.Namespaces.Count; i++)
			{
				var ns = CodeCompileUnit.Namespaces[i];
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

		void RefineOverloadingFunctions()
		{
			for (int i = 0; i < CodeCompileUnit.Namespaces.Count; i++)
			{
				var ns = CodeCompileUnit.Namespaces[i];
				for (int k = 0; k < ns.Types.Count; k++)
				{
					var c = ns.Types[k];
					List<CodeMemberMethod> methods = new List<CodeMemberMethod>();
					for (int m = 0; m < c.Members.Count; m++)
					{
						var method = c.Members[m] as CodeMemberMethod;
						if (method != null)
						{
							methods.Add(method);
						}
					}

					if (methods.Count > 1)//worth of checking overloading
					{
						var candidates = from m in methods group m by m.Name into grp where grp.Count() > 1 select grp.Key;
						foreach (var candidateName in candidates)
						{
							var overloadingMethods = methods.Where(d => d.Name == candidateName).ToArray();
							System.Diagnostics.Debug.Assert(overloadingMethods.Length > 1);
							foreach (var item in overloadingMethods) //Wow, 5 nested loops, plus 2 linq expressions
							{
								RenameCodeMemberMethodWithParameterNames(item);
							}
						}
					}
				}
			}

		}

		static string ToTitleCase(string s)
		{
			return String.IsNullOrEmpty(s) ? s : (char.ToUpper(s[0]) + (s.Length > 1 ? s.Substring(1) : String.Empty));
		}

		static void RenameCodeMemberMethodWithParameterNames(CodeMemberMethod method)
		{
			if (method.Parameters.Count == 0)
				return;

			var parameterNamesInTitleCase = method.Parameters.OfType<CodeParameterDeclarationExpression>().Select(d => ToTitleCase(d.Name)).ToList();
			var lastParameter = parameterNamesInTitleCase[parameterNamesInTitleCase.Count - 1];
			if ("callback".Equals(lastParameter, StringComparison.CurrentCultureIgnoreCase))//for JQ output
			{
				parameterNamesInTitleCase.RemoveAt(parameterNamesInTitleCase.Count - 1);
			}

			if (parameterNamesInTitleCase.Count > 0)
			{
				method.Name += $"By{String.Join("And", parameterNamesInTitleCase)}";
			}
		}

		CodeTypeDeclaration CreateControllerClientClass(CodeNamespace ns, string className)
		{
			var targetClass = new CodeTypeDeclaration(className)
			{
				IsClass = true,
				IsPartial = true,
				TypeAttributes = TypeAttributes.Public,
				CustomAttributes = CreateClassCustomAttributes(),
			};

			ns.Types.Add(targetClass);
			AddConstructor(targetClass);

			return targetClass;
		}


		abstract protected void AddBasicReferences();

		abstract protected void AddConstructor(CodeTypeDeclaration targetClass);

		protected virtual CodeAttributeDeclarationCollection CreateClassCustomAttributes()
		{
			return null;
		}

		protected virtual void AddHelperFunctionsInClass(CodeTypeDeclaration c)
		{
			//do nothing.
		}
	}


}
