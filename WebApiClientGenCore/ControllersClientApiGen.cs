using Fonlow.Poco2Client;
using Fonlow.Web.Meta;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;
using System.Reflection;
using WebApiClientGenCore.Abstract;

namespace Fonlow.CodeDom.Web.Cs
{
	/// <summary>
	/// Generate .NET codes of the client API of the controllers
	/// </summary>
	public class ControllersClientApiGen : IDisposable
	{
		readonly CodeCompileUnit codeCompileUnit;
		readonly CodeGenSettings codeGenSettings;
		readonly CodeDomProvider provider;

		private bool disposedValue;

		/// <summary>
		/// Also shared by TS Plugins.
		/// </summary>
		public Poco2CsGen Poco2CsGenerator { get; private set; }

		/// <summary>
		/// 
		/// </summary>
		/// <param name="codeGenSettings"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersClientApiGen(CodeGenSettings codeGenSettings)
		{
			this.codeGenSettings = codeGenSettings ?? throw new System.ArgumentNullException(nameof(codeGenSettings));
			codeCompileUnit = new CodeCompileUnit();
			provider = CodeDomProvider.CreateProvider("CSharp");
			Poco2CsGenerator = new Poco2CsGen(codeCompileUnit, provider, this.codeGenSettings);
		}

		/// <summary>
		/// Save C# codes into a file.
		/// </summary>
		/// <param name="fileName"></param>
		// hack inspired by https://csharpcodewhisperer.blogspot.com/2014/10/create-c-class-code-from-datatable.html
		public void Save(string fileName)
		{
			CodeGeneratorOptions options = new CodeGeneratorOptions
			{
				BracingStyle = "C",
				IndentString = "\t"
			};

			using MemoryStream stream = new MemoryStream();
			using StreamWriter writer = new StreamWriter(stream);
			provider.GenerateCodeFromCompileUnit(codeCompileUnit, writer, options);
			writer.Flush();
			stream.Position = 0;
			using StreamReader stringReader = new StreamReader(stream);
			using StreamWriter fileWriter = new StreamWriter(fileName);
			string s = stringReader.ReadToEnd();
			if (codeGenSettings.ClientApiOutputs.UseEnsureSuccessStatusCodeEx && codeGenSettings.ClientApiOutputs.IncludeEnsureSuccessStatusCodeExBlock)
			{
				fileWriter.Write(s.Replace("//;", "").Replace(dummyBlock, System.OperatingSystem.IsWindows() ? blockOfEnsureSuccessStatusCodeEx : GetBlockOfEnsureSuccessStatusCodeExForLinux()));
			}
			else
			{
				fileWriter.Write(s.Replace("//;", ""));
			}
		}

		/// <summary>
		/// Generate CodeDom of POCO classes in data model assemblies and the client API for ApiDescriptions.
		/// </summary>
		/// <param name="webApiDescriptions"></param>
		/// <param name="fileName"></param>
		public void CreateCodeDomAndSaveCsharp(WebApiDescription[] webApiDescriptions, string fileName)
		{
			CreateCodeDom(webApiDescriptions);
			Save(fileName);
		}

		/// <summary>
		/// Generate CodeDOM of POCO classes of namespaces of assemblies loaded and filtered out by what define in codeGenParameters.ApiSelections.DataModelAssemblyNames or codeGenParameters.ApiSelections.DataModels
		/// </summary>
		/// <returns>Namespaces of POCO types.</returns>
		void GenerateCsFromPocoAssemblies()
		{
			if (codeGenSettings.ApiSelections.DataModelAssemblyNames != null)
			{
				Assembly[] allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
				CherryPickingMethods cherryPickingMethods = codeGenSettings.ApiSelections.CherryPickingMethods;
				foreach (string assemblyName in codeGenSettings.ApiSelections.DataModelAssemblyNames)
				{
					Assembly assembly = allAssemblies.FirstOrDefault(d => d.GetName().Name.Equals(assemblyName, StringComparison.OrdinalIgnoreCase));
					if (assembly != null)
					{
						Poco2CsGenerator.CreateCodeDomForAssembly(assembly, cherryPickingMethods, codeGenSettings.ClientApiOutputs.DataAnnotationsToComments);
					}
				}
			}

			if (codeGenSettings.ApiSelections.DataModels != null)
			{
				Assembly[] allAssemblies = AppDomain.CurrentDomain.GetAssemblies(); //because of lazy loading, AppDomain include data assemblies that have been explicitly referenced in function prototypes.
				foreach (DataModel dataModel in codeGenSettings.ApiSelections.DataModels)
				{
					Assembly assembly = allAssemblies.FirstOrDefault(d => d.GetName().Name.Equals(dataModel.AssemblyName, StringComparison.OrdinalIgnoreCase));
					if (assembly == null)
					{
						assembly = GetNotReferencedAssembly(dataModel.AssemblyName); //For data models that will be used in the implementation of client codes.
					}

					if (assembly != null)
					{
						CherryPickingMethods cherryPickingMethods = dataModel.CherryPickingMethods;
						bool dataAnnotationsToComments = (dataModel.DataAnnotationsToComments.HasValue && dataModel.DataAnnotationsToComments.Value) // dm explicitly tell to do
							|| (!dataModel.DataAnnotationsToComments.HasValue && codeGenSettings.ClientApiOutputs.DataAnnotationsToComments);
						Poco2CsGenerator.CreateCodeDomForAssembly(assembly, cherryPickingMethods, dataAnnotationsToComments);
					}
				}
			}
		}


		static Assembly GetNotReferencedAssembly(string assemblyName)
		{
			var executingAssembly = Assembly.GetExecutingAssembly();
			var executingPath = Path.GetDirectoryName(executingAssembly.Location);
			return Assembly.LoadFile(Path.Combine(executingPath, assemblyName + ".dll"));
		}

		void GenerateClientTypesFormWebApis(WebApiDescription[] webApiDescriptions)
		{
			var toGenerateJsonSerializerContext = codeGenSettings.ClientApiOutputs.UseSystemTextJson && !string.IsNullOrEmpty(codeGenSettings.ClientApiOutputs.JsonSerializerContextNamespace);
			CodeNamespaceEx namespaceOfJsonSerializerContext = toGenerateJsonSerializerContext ? codeCompileUnit.Namespaces.InsertToSortedCollection(codeGenSettings.ClientApiOutputs.JsonSerializerContextNamespace, true) : null;
			var jsonContextAttributeDeclaration = toGenerateJsonSerializerContext ? PodGenHelper.AddClassesToJsonSerializerContext(namespaceOfJsonSerializerContext, []) : null;

			for (int i = 0; i < webApiDescriptions.Length; i++)
			{
				var d = webApiDescriptions[i];
				var returnType = d.ActionDescriptor.ReturnType;
				var codeTypeDeclaration = Poco2CsGenerator.CheckOrAdd(returnType, false);

				string clientNamespaceText = returnType.Namespace + codeGenSettings.ClientApiOutputs.CSClientNamespaceSuffix;
				string gt = ClosedGenericTypeToString(returnType);
				if (jsonContextAttributeDeclaration != null && codeTypeDeclaration != null)
				{
					PodGenHelper.AddClassesToJsonSerializerContext(namespaceOfJsonSerializerContext, [$"{clientNamespaceText}.{codeTypeDeclaration.Name}"]);
				} else {
					var closedGenericTypeText = ClosedGenericTypeToString(returnType);
					if (!string.IsNullOrEmpty(closedGenericTypeText)){
						PodGenHelper.AddClassesToJsonSerializerContext(namespaceOfJsonSerializerContext, [$"{closedGenericTypeText}"]);
					}
				}
			}
		}

		/// <summary>
		/// Returns a string representation of a closed generic type, including its generic type arguments, or the full name
		/// of a non-generic type.
		/// </summary>
		/// <remarks>A closed generic type is a generic type where all type parameters have been specified. For
		/// example, List<int> is a closed generic type, while List<T> is an open generic type definition. This method does
		/// not support open generic type definitions and will return the full name for such types.</remarks>
		/// <param name="type">The type to convert to its string representation. Must not be null.</param>
		/// <returns>A string that represents the specified type. For closed generic types, the string includes the generic type name
		/// and its type arguments; for non-generic types, the string is the type's full name.</returns>
		string ClosedGenericTypeToString(Type type)
		{
			if (type.IsGenericType && !type.IsGenericTypeDefinition)
			{
				var genericTypeDef = type.GetGenericTypeDefinition();
				var genericTypeName = genericTypeDef.Name;
				var genericArgs = type.GenericTypeArguments;
				var genericArgsStrings = genericArgs.Select(d => Poco2CsGenerator.TranslateToClientTypeReferenceText(d, false)); //  genericArgs.Select(t => ClosedGenericTypeToString(t)).ToArray();
				genericTypeName = genericTypeName.Substring(0, genericTypeName.IndexOf('`'));
				return $"{type.Namespace}{this.codeGenSettings.ClientApiOutputs.CSClientNamespaceSuffix}.{genericTypeName}<{string.Join(", ", genericArgsStrings)}>";
			}
			else
			{
				return null;// type.FullName;
			}
		}

		/// <summary>
		/// Generate CodeDom of the client API for ApiDescriptions, as well as POCO classes in data model assemblies
		/// </summary>
		/// <param name="webApiDescriptions">Web Api descriptions exposed by Configuration.Services.GetApiExplorer().ApiDescriptions</param>
		/// <returns>Namespaces of types of POCO.</returns>
		void CreateCodeDom(WebApiDescription[] webApiDescriptions)
		{
			ArgumentNullException.ThrowIfNull(webApiDescriptions);

			if (codeGenSettings.ApiSelections.CherryPickingMethods == CherryPickingMethods.ApiOnly)
			{
				GenerateClientTypesFormWebApis(webApiDescriptions);
			}
			else
			{
				GenerateCsFromPocoAssemblies();
			}

			IOrderedEnumerable<IGrouping<string, ControllerDescriptor>> controllersGroupByNamespace = webApiDescriptions.Select(d => d.ActionDescriptor.ControllerDescriptor)
				.Distinct()
				.GroupBy(d => d.ControllerType.Namespace)
				.OrderBy(g => g.Key);// order by namespace

			//Create client classes mapping to controller classes
			foreach (IGrouping<string, ControllerDescriptor> grouppedControllerDescriptions in controllersGroupByNamespace)
			{
				string clientNamespaceText = grouppedControllerDescriptions.Key + codeGenSettings.ClientApiOutputs.CSClientNamespaceSuffix;
				CodeNamespaceEx clientNamespace = codeCompileUnit.Namespaces.InsertToSortedCollection(clientNamespaceText, false);
				clientNamespace.Imports.AddRange(
					new CodeNamespaceImport[]{
						new CodeNamespaceImport("System"),
						new CodeNamespaceImport("System.Linq"),
						new CodeNamespaceImport("System.Collections.Generic"),
						new CodeNamespaceImport("System.Threading.Tasks"),
						new CodeNamespaceImport("System.Net.Http"),
				});

				if (codeGenSettings.ClientApiOutputs.UseSystemTextJson)
				{
					clientNamespace.Imports.Add(new CodeNamespaceImport("System.Text.Json"));
					clientNamespace.Imports.Add(new CodeNamespaceImport("System.Text.Json.Serialization"));
				}
				else
				{
					clientNamespace.Imports.Add(new CodeNamespaceImport("Newtonsoft.Json"));
				}

				if (codeGenSettings.ClientApiOutputs.UseEnsureSuccessStatusCodeEx)
				{
					clientNamespace.Imports.Add(new CodeNamespaceImport("Fonlow.Net.Http"));
				}

				CodeTypeDeclaration[] newControllerClassesCreated = grouppedControllerDescriptions
					.OrderBy(d => d.ControllerName) // order by groupname, and do group by group
					.Select(d =>
					{
						string controllerFullName = d.ControllerType.Namespace + "." + d.ControllerName; // like DemoCoreWeb.Controllers  Entities
						if (codeGenSettings.ApiSelections.ExcludedControllerNames != null && codeGenSettings.ApiSelections.ExcludedControllerNames.Contains(controllerFullName))
							return null;

						string containerClassName = ConcatOptionalSuffix(d.ControllerName); // optionally become EntitiesClient
						CodeTypeDeclaration controllerCodeTypeDeclaration = CreateControllerClientClass(clientNamespace, containerClassName);
						var controllerObsoleteAttribute = d.ControllerType.GetCustomAttribute<ObsoleteAttribute>();
						if (controllerObsoleteAttribute != null)
						{
							if (controllerObsoleteAttribute.IsError) // not to generate client Type.
							{
								return null;
							}

							controllerCodeTypeDeclaration.CustomAttributes.Add(AnnotationDeclarationGenerator.CreateDeclaration(controllerObsoleteAttribute));
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

						string[] attributeComments = AspNetAttributesHelper.CreateDocCommentBasedOnAttributes(d.ControllerType.GetCustomAttributes(false).OfType<Attribute>().ToArray());

						if (docCommentsNoIndent?.Length > 0 || attributeComments?.Length > 0)
						{
							controllerCodeTypeDeclaration.Comments.Add(new CodeCommentStatement("<summary>", true));
							if (docCommentsNoIndent?.Length > 0)
							{
								foreach (string item in docCommentsNoIndent)
								{
									controllerCodeTypeDeclaration.Comments.Add(new CodeCommentStatement(item, true));
								}
							}

							if (attributeComments?.Length > 0)
							{
								foreach (string item in attributeComments)
								{
									controllerCodeTypeDeclaration.Comments.Add(new CodeCommentStatement(item, true));
								}
							}

							controllerCodeTypeDeclaration.Comments.Add(new CodeCommentStatement("</summary>", true));
						}

						return controllerCodeTypeDeclaration;
					}
					)
					.Where(d => d != null).ToArray();//add classes into the namespace

			}

			foreach (WebApiDescription d in webApiDescriptions)
			{
				string controllerNamespace = d.ActionDescriptor.ControllerDescriptor.ControllerType.Namespace;
				string controllerName = d.ActionDescriptor.ControllerDescriptor.ControllerName;
				string controllerFullName = controllerNamespace + "." + controllerName;
				if (codeGenSettings.ApiSelections.ExcludedControllerNames != null && codeGenSettings.ApiSelections.ExcludedControllerNames.Contains(controllerFullName))
					continue;

				CodeTypeDeclaration existingClientClass = LookupExistingClassOfCs(controllerNamespace, ConcatOptionalSuffix(controllerName));
				//System.Diagnostics.Trace.Assert(existingClientClass != null);
				if (existingClientClass == null)
				{
					continue;
				}

				CodeMemberMethod apiFunction = ClientApiFunctionGen.Create(codeCompileUnit, d, Poco2CsGenerator, this.codeGenSettings, true);
				if (apiFunction != null)
				{
					existingClientClass.Members.Add(apiFunction);
					if (codeGenSettings.ClientApiOutputs.GenerateBothAsyncAndSync)
					{
						var clientApiFunction = ClientApiFunctionGen.Create(codeCompileUnit, d, Poco2CsGenerator, this.codeGenSettings, false);
						if (clientApiFunction != null)
						{
							existingClientClass.Members.Add(clientApiFunction);
						}
					}
				}
			}

			if (codeGenSettings.ClientApiOutputs.UseEnsureSuccessStatusCodeEx && codeGenSettings.ClientApiOutputs.IncludeEnsureSuccessStatusCodeExBlock)
			{
				CreateDummyOfEnsureSuccessStatusCodeEx();
			}
		}

		string ConcatOptionalSuffix(string controllerName)
		{
			return controllerName + (codeGenSettings.ClientApiOutputs.ContainerNameSuffix ?? String.Empty);
		}

		/// <summary>
		/// Lookup existing CodeTypeDeclaration created for controller class.
		/// </summary>
		/// <param name="namespaceText"></param>
		/// <param name="containerClassName">Controller name plus suffix</param>
		/// <returns></returns>
		CodeTypeDeclaration LookupExistingClassOfCs(string namespaceText, string containerClassName)
		{
			return Poco2CsGenerator.LookupExistingClassOfCs(namespaceText, containerClassName);
		}

		CodeTypeDeclaration CreateControllerClientClass(CodeNamespace ns, string className)
		{
			CodeTypeDeclaration targetClass = new CodeTypeDeclaration(className)
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


		void AddLocalFields(CodeTypeDeclaration targetClass)
		{
			CodeMemberField clientField = new CodeMemberField
			{
				Attributes = MemberAttributes.Private,
				Name = "client",
				Type = new CodeTypeReference("System.Net.Http.HttpClient")
			};
			targetClass.Members.Add(clientField);

			CodeMemberField jsonSettingsField = new CodeMemberField
			{
				Attributes = MemberAttributes.Private,
				Name = "jsonSerializerSettings",
				Type = codeGenSettings.ClientApiOutputs.UseSystemTextJson ? new CodeTypeReference("JsonSerializerOptions") : new CodeTypeReference("JsonSerializerSettings")
			};
			targetClass.Members.Add(jsonSettingsField);
		}

		void AddConstructorWithHttpClient(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new CodeConstructor
			{
				Attributes =
				MemberAttributes.Public | MemberAttributes.Final
			};

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"System.Net.Http.HttpClient", "client"));
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				codeGenSettings.ClientApiOutputs.UseSystemTextJson ? "JsonSerializerOptions" : "JsonSerializerSettings", "jsonSerializerSettings=null"));

			constructor.Statements.Add(new CodeSnippetStatement(@"			if (client == null)
				throw new ArgumentNullException(nameof(client), ""Null HttpClient."");
"));
			constructor.Statements.Add(new CodeSnippetStatement(@"			if (client.BaseAddress == null)
				throw new ArgumentNullException(nameof(client), ""HttpClient has no BaseAddress"");
"));
			// Add field initialization logic
			CodeFieldReferenceExpression clientReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "client");
			constructor.Statements.Add(new CodeAssignStatement(clientReference, new CodeArgumentReferenceExpression("client")));
			CodeFieldReferenceExpression jsonSettingsReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "jsonSerializerSettings");
			constructor.Statements.Add(new CodeAssignStatement(jsonSettingsReference, new CodeArgumentReferenceExpression("jsonSerializerSettings")));
			constructor.Statements.Add(new CodeSnippetStatement(@"
			if (this.jsonSerializerSettings == null)
			{
				this.jsonSerializerSettings = new JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web);
			}

			this.jsonSerializerSettings.TypeInfoResolverChain.Add(DemoTextJsonWeb.Serialization.AppJsonSerializerContext.Default);
			this.jsonSerializerSettings.TypeInfoResolverChain.Add(new System.Text.Json.Serialization.Metadata.DefaultJsonTypeInfoResolver());"));
			targetClass.Members.Add(constructor);
		}

		void CreateDummyOfEnsureSuccessStatusCodeEx()
		{
			codeCompileUnit.Namespaces.InsertToSortedCollection("ZZZzzzEnsureSuccessStatusCodeExDummy", false); // ZZZ to ensure this block is the last one, hopefully.
		}

		static string GetBlockOfEnsureSuccessStatusCodeExForLinux()
		{
			return blockOfEnsureSuccessStatusCodeEx.ReplaceLineEndings();
		}

		/// <summary>
		/// Code block for Windows with \r\n
		/// </summary>
		const string blockOfEnsureSuccessStatusCodeEx =
		@"

namespace Fonlow.Net.Http
{
	using System.Net.Http;

	public class WebApiRequestException : HttpRequestException
	{
		public new System.Net.HttpStatusCode StatusCode { get; private set; }

		public string Response { get; private set; }

		public System.Net.Http.Headers.HttpResponseHeaders Headers { get; private set; }

		public System.Net.Http.Headers.MediaTypeHeaderValue ContentType { get; private set; }

		public WebApiRequestException(string message, System.Net.HttpStatusCode statusCode, string response, System.Net.Http.Headers.HttpResponseHeaders headers, System.Net.Http.Headers.MediaTypeHeaderValue contentType) : base(message)
		{
			StatusCode = statusCode;
			Response = response;
			Headers = headers;
			ContentType = contentType;
		}
	}

	public static class ResponseMessageExtensions
	{
		public static void EnsureSuccessStatusCodeEx(this HttpResponseMessage responseMessage)
		{
			if (!responseMessage.IsSuccessStatusCode)
			{
				var responseText = responseMessage.Content.ReadAsStringAsync().Result;
				var contentType = responseMessage.Content.Headers.ContentType;
				throw new WebApiRequestException(responseMessage.ReasonPhrase, responseMessage.StatusCode, responseText, responseMessage.Headers, contentType);
			}
		}
	}
}";
		/// <summary>
		/// Block also working well in Linux while C# CodeDOM outputs with \n
		/// </summary>
		string dummyBlock =
			$"{Environment.NewLine}namespace ZZZzzzEnsureSuccessStatusCodeExDummy{Environment.NewLine}{{{Environment.NewLine}\t{Environment.NewLine}}}";

		protected virtual void Dispose(bool disposing)
		{
			if (!disposedValue)
			{
				if (disposing)
				{
					provider.Dispose();
				}

				// TODO: free unmanaged resources (unmanaged objects) and override finalizer
				// TODO: set large fields to null
				disposedValue = true;
			}
		}

		// // TODO: override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
		// ~ControllersClientApiGen()
		// {
		//     // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
		//     Dispose(disposing: false);
		// }

		public void Dispose()
		{
			// Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
			Dispose(disposing: true);
			GC.SuppressFinalize(this);
		}
	}


}
