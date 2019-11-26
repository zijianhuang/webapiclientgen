using Fonlow.Poco2Client;
using Fonlow.Poco2Ts;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Fonlow.Web.Meta;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate TypeScript codes of the client API of the controllers
	/// </summary>
	public abstract class ControllersTsClientApiGenBase
	{
		protected CodeCompileUnit TargetUnit { get; private set; }

		CodeGenConfig apiSelections;
		protected JSOutput jsOutput;

		ClientApiTsFunctionGenAbstract apiFunctionGen; //to be injected in ctor of derived class.

		/// <summary>
		/// 
		/// </summary>
		/// <param name="jsOutput"></param>
		/// <param name="apiFunctionGen"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		protected ControllersTsClientApiGenBase(JSOutput jsOutput, ClientApiTsFunctionGenAbstract apiFunctionGen)
		{
			if (jsOutput == null)
				throw new ArgumentNullException("jsOutput");

			this.jsOutput = jsOutput;
			this.apiFunctionGen = apiFunctionGen;
			this.apiSelections = jsOutput.ApiSelections;
			TargetUnit = new CodeCompileUnit();
			poco2TsGen = CreatePoco2TsGen();

			TsCodeGenerationOptions options = TsCodeGenerationOptions.Instance;
			options.BracingStyle = "JS";
			options.IndentString = "\t";
			options.CamelCase = jsOutput.CamelCase.HasValue ? jsOutput.CamelCase.Value : false;

		}

		/// <summary>
		/// jQuery and NG@ have slightly different fine grained types for returns
		/// </summary>
		/// <returns></returns>
		abstract protected IPoco2Client CreatePoco2TsGen();

		IPoco2Client poco2TsGen;

		/// <summary>
		/// Save C# codes into a file.
		/// </summary>
		public void Save()
		{
			var provider = new TypeScriptCodeProvider(jsOutput.AsModule);
			using (StreamWriter writer = new StreamWriter(jsOutput.JSPath))
			{
				provider.GenerateCodeFromCompileUnit(TargetUnit, writer, TsCodeGenerationOptions.Instance);
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
				throw new ArgumentNullException("descriptions");
			}

			AddBasicReferences();

			GenerateTsFromPoco();

			//controllers of ApiDescriptions (functions) grouped by namespace
			var controllersGroupByNamespace = descriptions.Select(d => d.ActionDescriptor.ControllerDescriptor)
				.Distinct()
				.GroupBy(d => d.ControllerType.Namespace)
				.OrderBy(k => k.Key);// order by namespace

			//Create client classes mapping to controller classes
			CodeTypeDeclaration[] newControllerClassesCreated = null;
			foreach (var grouppedControllerDescriptions in controllersGroupByNamespace)
			{
				var clientNamespaceText = (grouppedControllerDescriptions.Key + ".Client").Replace('.', '_');
				var clientNamespace = new CodeNamespace(clientNamespaceText);

				TargetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

				newControllerClassesCreated = grouppedControllerDescriptions
					.OrderBy(d => d.ControllerName)
					.Select(d =>
					{
						var controllerFullName = d.ControllerType.Namespace + "." + d.ControllerName;
						if (apiSelections.ExcludedControllerNames != null && apiSelections.ExcludedControllerNames.Contains(controllerFullName))
							return null;

						return CreateControllerClientClass(clientNamespace, d.ControllerName);
					}).Where(d => d != null).ToArray();//add classes into the namespace
			}

			foreach (var d in descriptions)
			{
				var controllerNamespace = d.ActionDescriptor.ControllerDescriptor.ControllerType.Namespace;
				var controllerName = d.ActionDescriptor.ControllerDescriptor.ControllerName;
				var controllerFullName = controllerNamespace + "." + controllerName;
				if (apiSelections.ExcludedControllerNames != null && apiSelections.ExcludedControllerNames.Contains(controllerFullName))
					continue;

				var existingClientClass = LookupExistingClassInCodeDom(controllerNamespace, controllerName);
				System.Diagnostics.Trace.Assert(existingClientClass != null);

				var apiFunction = apiFunctionGen.CreateApiFunction(d, poco2TsGen, this.jsOutput.StringAsString);
				existingClientClass.Members.Add(apiFunction);
			}

			RefineOverloadingFunctions();

			foreach (var c in newControllerClassesCreated)
			{
				AddHelperFunctionsInClass(c);
			}
		}

		void GenerateTsFromPoco()
		{
			if (apiSelections.DataModelAssemblyNames == null)
				return;

			var allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
			var assemblies = allAssemblies.Where(d => apiSelections.DataModelAssemblyNames.Any(k => k.Equals(d.GetName().Name, StringComparison.CurrentCultureIgnoreCase))).ToArray();
			var cherryPickingMethods = apiSelections.CherryPickingMethods.HasValue ? (CherryPickingMethods)apiSelections.CherryPickingMethods.Value : CherryPickingMethods.DataContract;
			foreach (var assembly in assemblies)
			{
				var xmlDocFileName = DocComment.DocCommentLookup.GetXmlPath(assembly);
				var docLookup = Fonlow.DocComment.DocCommentLookup.Create(xmlDocFileName);
				poco2TsGen.CreateCodeDom(assembly, cherryPickingMethods, docLookup);
			}
		}

		/// <summary>
		/// Lookup existing CodeTypeDeclaration created.
		/// </summary>
		/// <param name="clrNamespaceText"></param>
		/// <param name="controllerName"></param>
		/// <returns></returns>
		CodeTypeDeclaration LookupExistingClassInCodeDom(string clrNamespaceText, string controllerName)
		{
			var refined = (clrNamespaceText + ".Client").Replace('.', '_');
			for (int i = 0; i < TargetUnit.Namespaces.Count; i++)
			{
				var ns = TargetUnit.Namespaces[i];
				if (ns.Name == refined)
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

		void RefineOverloadingFunctions()
		{
			for (int i = 0; i < TargetUnit.Namespaces.Count; i++)
			{
				var ns = TargetUnit.Namespaces[i];
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
			return System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(s);
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
