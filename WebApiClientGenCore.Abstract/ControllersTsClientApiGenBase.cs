using Fonlow.Poco2Client;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Fonlow.Web.Meta;
using System.Diagnostics;
using System.Collections.Specialized;
using WebApiClientGenCore.Abstract;
using System.Text;
using Fonlow.CodeDom;
using Fonlow.Reflection;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Create CodeDOM based on Web API controllers, and generate TypeScript codes of the client API of the controllers
	/// </summary>
	public abstract class ControllersTsClientApiGenBase
	{
		protected CodeCompileUnit TargetUnit { get; private set; }

		readonly CodeGenConfig apiSelections;
		protected readonly JSOutput jsOutput;
		readonly ClientApiTsFunctionGenAbstract apiFunctionGen; //to be injected in ctor of derived class.
		readonly IDocCommentTranslate poco2CsGen;

		protected IPoco2Client Poco2TsGen { get; set; }

		/// <summary>
		/// 
		/// </summary>
		/// <param name="jsOutput"></param>
		/// <param name="apiFunctionGen"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		protected ControllersTsClientApiGenBase(JSOutput jsOutput, ClientApiTsFunctionGenAbstract apiFunctionGen, IDocCommentTranslate poco2CsGen)
		{
			this.jsOutput = jsOutput ?? throw new ArgumentNullException(nameof(jsOutput));
			this.apiFunctionGen = apiFunctionGen;
			this.apiSelections = jsOutput.ApiSelections;
			this.poco2CsGen = poco2CsGen;
			TargetUnit = new CodeCompileUnit();
			TsCodeGenerationOptions options = TsCodeGenerationOptions.Instance;
			options.BracingStyle = "JS";
			options.IndentString = "\t";
			options.CamelCase = jsOutput.CamelCase;

		}

		/// <summary>
		/// This is for instantiating IPoco2Client Poco2TsGen { get; }
		/// jQuery and NG2 have slightly different fine grained types for returns
		/// </summary>
		/// <returns></returns>
		abstract protected void CreatePoco2TsGen(string clientNamespaceSuffix);

		protected virtual CodeObjectHelper CreateCodeObjectHelper(bool asModule)
		{
			return new CodeObjectHelper(asModule);
		}

		/// <summary>
		/// Generate and save TS codes into a file.
		/// </summary>
		public void Save()
		{
			using TypeScriptCodeProvider provider = new TypeScriptCodeProvider(new Fonlow.TypeScriptCodeDom.TsCodeGenerator(CreateCodeObjectHelper(jsOutput.AsModule)));
			using StreamWriter writer = new(jsOutput.JSPath);
			provider.GenerateCodeFromCompileUnit(TargetUnit, writer, TsCodeGenerationOptions.Instance);
		}

		/// <summary>
		/// Generate TS CodeDom of the client API for ApiDescriptions.
		/// </summary>
		/// <param name="webApiDescriptions">Web Api descriptions exposed by Configuration.Services.GetApiExplorer().ApiDescriptions</param>
		public void CreateCodeDom(WebApiDescription[] webApiDescriptions)
		{
			ArgumentNullException.ThrowIfNull(webApiDescriptions);

			AddBasicReferences();

			if (apiSelections.CherryPickingMethods == CherryPickingMethods.ApiOnly)
			{
				GenerateClientTypesFormWebApis(webApiDescriptions);
			}
			else
			{
				GenerateTsFromPocoAssemblies();
			}

			//controllers of ApiDescriptions (functions) grouped by namespace
			IOrderedEnumerable<IGrouping<string, ControllerDescriptor>> controllersGroupByNamespace = webApiDescriptions.Select(d => d.ActionDescriptor.ControllerDescriptor)
				.Distinct()
				.GroupBy(d => d.ControllerType.Namespace)
				.OrderBy(k => k.Key);// order by namespace

			//Create client classes mapping to controller classes
			CodeTypeDeclaration[] newControllerClassesCreated = null;
			foreach (IGrouping<string, ControllerDescriptor> grouppedControllerDescriptions in controllersGroupByNamespace)
			{
				string clientNamespaceText = (grouppedControllerDescriptions.Key + jsOutput.ClientNamespaceSuffix).Replace('.', '_');
				CodeNamespaceEx clientNamespace = TargetUnit.Namespaces.InsertToSortedCollection(clientNamespaceText, false);
				newControllerClassesCreated = grouppedControllerDescriptions
					.OrderBy(d => d.ControllerName)
					.Select(d =>
					{
						string controllerFullName = d.ControllerType.Namespace + "." + d.ControllerName; // like DemoCoreWeb.Controllers  Entities
						if (apiSelections.ExcludedControllerNames != null && apiSelections.ExcludedControllerNames.Contains(controllerFullName))
							return null;

						string containerClassName = GetContainerClassName(d.ControllerName); // optionally become EntitiesClient
						CodeTypeDeclaration controllerCodeTypeDeclaration = CreateControllerClientClass(clientNamespace, containerClassName);
						var controllerObsoleteAttribute = d.ControllerType.GetCustomAttribute<ObsoleteAttribute>();
						if (controllerObsoleteAttribute != null)
						{
							if (controllerObsoleteAttribute.IsError) // not to generate client Type.
							{
								return null;
							}

							controllerCodeTypeDeclaration.Comments.Add(new CodeCommentStatement(AnnotationCommentGenerator.GenerateObsoleteAttributeComments(controllerObsoleteAttribute), true));
						}

						Fonlow.DocComment.docMember typeComments = null;
						string[] docCommentsNoIndent = null;
						if (WebApiDocSingleton.Instance.Lookup != null)
						{
							typeComments = WebApiDocSingleton.Instance.Lookup.GetMember($"T:{controllerFullName}Controller");
							if (typeComments != null)
							{
								docCommentsNoIndent = Fonlow.DocComment.StringFunctions.TrimIndentedMultiLineTextToArray(Fonlow.DocComment.DocCommentHelper.GetSummary(typeComments));
							}
						}

						string[] attributeComments = AspNetAttributesHelper.CreateDocCommentBasedOnAttributes(d.ControllerType.GetCustomAttributes().ToArray());

						if (docCommentsNoIndent?.Length > 0 || attributeComments?.Length > 0)
						{
							StringBuilder sb = new StringBuilder();
							if (docCommentsNoIndent?.Length > 0)
							{
								foreach (string item in docCommentsNoIndent)
								{
									sb.AppendLine(item);
								}
							}

							if (attributeComments?.Length > 0)
							{
								foreach (string item in attributeComments)
								{
									sb.AppendLine(item);
								}
							}

							controllerCodeTypeDeclaration.Comments.Add(new CodeCommentStatement(sb.ToString(), true));
						}

						return controllerCodeTypeDeclaration;
					})
					.Where(d => d != null).ToArray();//add classes into the namespace
			}

			foreach (WebApiDescription apiDesc in webApiDescriptions)
			{
				string controllerNamespace = apiDesc.ActionDescriptor.ControllerDescriptor.ControllerType.Namespace;
				string controllerName = apiDesc.ActionDescriptor.ControllerDescriptor.ControllerName;
				string controllerFullName = controllerNamespace + "." + controllerName;
				if (apiSelections.ExcludedControllerNames != null && apiSelections.ExcludedControllerNames.Contains(controllerFullName))
					continue;

				CodeTypeDeclaration existingClientClass = LookupExistingClassOfTsInCodeDom(controllerNamespace, GetContainerClassName(controllerName));
				//System.Diagnostics.Trace.Assert(existingClientClass != null);
				if (existingClientClass == null)
				{
					continue;
				}

				CodeMemberMethod apiFunction = apiFunctionGen.CreateApiFunction(apiDesc, Poco2TsGen, poco2CsGen, this.jsOutput);
				if (apiFunction != null)
				{
					existingClientClass.Members.Add(apiFunction);
				}
			}

			RefineOverloadingFunctions();

			if (newControllerClassesCreated != null) //If no controllers is picked up, this could be null.
			{
				foreach (CodeTypeDeclaration c in newControllerClassesCreated)
				{
					AddHelperFunctionsInClass(c);
				}
			}
			else
			{
				System.Diagnostics.Trace.TraceWarning("No client API is created since no controller is picked up.");
			}
		}

		void GenerateClientTypesFormWebApis(WebApiDescription[] webApiDescriptions)
		{
			for (int i = 0; i < webApiDescriptions.Length; i++)
			{
				var d = webApiDescriptions[i];
				Poco2TsGen.CheckOrAdd(d.ActionDescriptor.ReturnType, false);
			}
		}

		void GenerateTsFromPocoAssemblies()
		{
			if (apiSelections.DataModelAssemblyNames != null)
			{
				Assembly[] allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
				CherryPickingMethods cherryPickingMethods = apiSelections.CherryPickingMethods;
				foreach (var assemblyName in apiSelections.DataModelAssemblyNames)
				{
					Assembly assembly = allAssemblies.FirstOrDefault(d => d.GetName().Name.Equals(assemblyName, StringComparison.OrdinalIgnoreCase));
					if (assembly != null)
					{
						string xmlDocFileName = DocComment.DocCommentLookup.GetXmlPath(assembly);
						DocComment.DocCommentLookup docLookup = Fonlow.DocComment.DocCommentLookup.Create(xmlDocFileName);
						Poco2TsGen.CreateCodeDomInAssembly(assembly, cherryPickingMethods, docLookup, jsOutput.DataAnnotationsToComments);
					}
				}
			}

			if (apiSelections.DataModels != null)
			{
				Assembly[] allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
				foreach (DataModel dataModel in apiSelections.DataModels)
				{
					Assembly assembly = allAssemblies.FirstOrDefault(d => d.GetName().Name.Equals(dataModel.AssemblyName, StringComparison.OrdinalIgnoreCase));
					if (assembly != null)
					{
						string xmlDocFileName = DocComment.DocCommentLookup.GetXmlPath(assembly);
						DocComment.DocCommentLookup docLookup = Fonlow.DocComment.DocCommentLookup.Create(xmlDocFileName);
						CherryPickingMethods cherryPickingMethods = dataModel.CherryPickingMethods;
						bool dataAnnotationsToComments = (dataModel.DataAnnotationsToComments.HasValue && dataModel.DataAnnotationsToComments.Value) // dm explicitly tell to do
							|| (!dataModel.DataAnnotationsToComments.HasValue && jsOutput.DataAnnotationsToComments);
						Poco2TsGen.CreateCodeDomInAssembly(assembly, cherryPickingMethods, docLookup, dataAnnotationsToComments);
					}
				}
			}
		}

		string GetContainerClassName(string controllerName)
		{
			return controllerName + (jsOutput.ContainerNameSuffix ?? String.Empty);
		}

		/// <summary>
		/// Lookup existing CodeTypeDeclaration created for controller class, for TS.
		/// </summary>
		/// <param name="clrNamespaceText"></param>
		/// <param name="containerClassName"></param>
		/// <returns></returns>
		CodeTypeDeclaration LookupExistingClassOfTsInCodeDom(string clrNamespaceText, string containerClassName)
		{
			string refined = (clrNamespaceText + jsOutput.ClientNamespaceSuffix).Replace('.', '_');
			for (int i = 0; i < TargetUnit.Namespaces.Count; i++)
			{
				CodeNamespace ns = TargetUnit.Namespaces[i];
				if (ns.Name == refined)
				{
					for (int k = 0; k < ns.Types.Count; k++)
					{
						CodeTypeDeclaration c = ns.Types[k];
						if (c.Name == containerClassName)
							return c;
					}
				}
			}

			return null;
		}

		/// <summary>
		/// Find over loading API functions, and rename them according to parameter names, since TS and TS do not support overloading functions.
		/// </summary>
		void RefineOverloadingFunctions()
		{
			for (int i = 0; i < TargetUnit.Namespaces.Count; i++)
			{
				CodeNamespace ns = TargetUnit.Namespaces[i];
				for (int k = 0; k < ns.Types.Count; k++)
				{
					CodeTypeDeclaration td = ns.Types[k];
					RefineOverloadingFunctionsOfType(td);
				}
			}

		}

		void RefineOverloadingFunctionsOfType(CodeTypeDeclaration codeTypeDeclaration)
		{
			List<CodeMemberMethod> methods = new();
			for (int m = 0; m < codeTypeDeclaration.Members.Count; m++)
			{
				if (codeTypeDeclaration.Members[m] is CodeMemberMethod method)
				{
					methods.Add(method);
				}
			}

			if (methods.Count > 1)//worth of checking overloading
			{
				IEnumerable<string> candidates = from m in methods group m by m.Name into grp where grp.Count() > 1 select grp.Key;
				foreach (string candidateName in candidates)
				{
					CodeMemberMethod[] overloadingMethods = methods.Where(d => d.Name == candidateName).ToArray();
					//System.Diagnostics.Debug.Assert(overloadingMethods.Length > 1);
					foreach (CodeMemberMethod item in overloadingMethods) //Wow, 5 nested loops, plus 2 linq expressions
					{
						RenameCodeMemberMethodWithParameterNames(item);
					}
				}
			}
		}

		static string ToTitleCase(string s)
		{
			return String.IsNullOrEmpty(s) ? s : (char.ToUpper(s[0]) + (s.Length > 1 ? s.Substring(1) : String.Empty));
		}

		/// <summary>
		/// suffix is based on parameter declaration expression, with name and optionally CLR type name.
		/// </summary>
		/// <param name="d"></param>
		/// <returns></returns>
		string ToMethodNameSuffix(CodeParameterDeclarationExpression d)
		{
			string pn = ToTitleCase(d.Name);
			if (pn.EndsWith('?'))
			{
				pn = pn.Substring(0, pn.Length - 1);
			}

			string typeName = string.Empty;
			if (jsOutput.MethodSuffixWithClrTypeName && (d.UserData.Contains(UserDataKeys.ParameterDescriptor)))
			{
				ParameterDescriptor pt = d.UserData[UserDataKeys.ParameterDescriptor] as ParameterDescriptor;
				typeName = pt.ParameterType.Name;
			}
			else
			{
				typeName = d.Type.BaseType;
			}

			return string.IsNullOrEmpty(typeName) ? string.Empty : $"{pn}Of{typeName}";
		}

		void RenameCodeMemberMethodWithParameterNames(CodeMemberMethod method)
		{
			if (method.Parameters.Count == 0)
				return;

			List<string> parameterNamesInTitleCase = method.Parameters.OfType<CodeParameterDeclarationExpression>()
				.Where(k => k.Name != "headersHandler?")
				.Select(d => ToMethodNameSuffix(d)).ToList();

			parameterNamesInTitleCase = parameterNamesInTitleCase.Select(item =>
			{
				if (item.EndsWith('?'))
				{
					return item.Substring(0, item.Length - 1);
				}

				return item;
			}).Where(k => !string.IsNullOrEmpty(k)).ToList();

			string lastParameter = parameterNamesInTitleCase.LastOrDefault();//for JQ output
			if ("callback".Equals(lastParameter, StringComparison.Ordinal))
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
			CodeTypeDeclaration targetClass = new CodeTypeDeclaration(className)
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
