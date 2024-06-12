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
		CodeCompileUnit targetUnit;
		CodeGenSettings codeGenSettings;
		CodeDomProvider provider;

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
			targetUnit = new CodeCompileUnit();
			provider = CodeDomProvider.CreateProvider("CSharp");
			Poco2CsGenerator = new Poco2CsGen(targetUnit, provider, this.codeGenSettings);
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
			provider.GenerateCodeFromCompileUnit(targetUnit, writer, options);
			writer.Flush();
			stream.Position = 0;
			using StreamReader stringReader = new StreamReader(stream);
			using StreamWriter fileWriter = new StreamWriter(fileName);
			string s = stringReader.ReadToEnd();
			if (codeGenSettings.ClientApiOutputs.UseEnsureSuccessStatusCodeEx && codeGenSettings.ClientApiOutputs.IncludeEnsureSuccessStatusCodeExBlock)
			{
				fileWriter.Write(s.Replace("//;", "").Replace(dummyBlock, blockOfEnsureSuccessStatusCodeEx));
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
				CherryPickingMethods cherryPickingMethods = codeGenSettings.ApiSelections.CherryPickingMethods.HasValue ? (CherryPickingMethods)codeGenSettings.ApiSelections.CherryPickingMethods.Value : CherryPickingMethods.DataContract;
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
				Assembly[] allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
				foreach (DataModel dataModel in codeGenSettings.ApiSelections.DataModels)
				{
					Assembly assembly = allAssemblies.FirstOrDefault(d => d.GetName().Name.Equals(dataModel.AssemblyName, StringComparison.OrdinalIgnoreCase));
					if (assembly != null)
					{
						CherryPickingMethods cherryPickingMethods = dataModel.CherryPickingMethods.HasValue ? (CherryPickingMethods)dataModel.CherryPickingMethods.Value : CherryPickingMethods.DataContract;
						bool dataAnnotationsToComments = (dataModel.DataAnnotationsToComments.HasValue && dataModel.DataAnnotationsToComments.Value) // dm explicitly tell to do
							|| (!dataModel.DataAnnotationsToComments.HasValue && codeGenSettings.ClientApiOutputs.DataAnnotationsToComments);
						Poco2CsGenerator.CreateCodeDomForAssembly(assembly, cherryPickingMethods, dataAnnotationsToComments);
					}
				}
			}
		}

		void GenerateClientTypesFormWebApis(WebApiDescription[] webApiDescriptions)
		{
			for (int i = 0; i < webApiDescriptions.Length; i++)
			{
				var d = webApiDescriptions[i];
				Poco2CsGenerator.CheckOrAdd(d.ActionDescriptor.ReturnType, false);
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
				CodeNamespaceEx clientNamespace = targetUnit.Namespaces.InsertToSortedCollection(clientNamespaceText, false);
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
					.ToArray();//add classes into the namespace

			}

			foreach (WebApiDescription d in webApiDescriptions)
			{
				string controllerNamespace = d.ActionDescriptor.ControllerDescriptor.ControllerType.Namespace;
				string controllerName = d.ActionDescriptor.ControllerDescriptor.ControllerName;
				string controllerFullName = controllerNamespace + "." + controllerName;
				if (codeGenSettings.ApiSelections.ExcludedControllerNames != null && codeGenSettings.ApiSelections.ExcludedControllerNames.Contains(controllerFullName))
					continue;

				CodeTypeDeclaration existingClientClass = LookupExistingClassOfCs(controllerNamespace, ConcatOptionalSuffix(controllerName));
				System.Diagnostics.Trace.Assert(existingClientClass != null);

				CodeMemberMethod apiFunction = ClientApiFunctionGen.Create(d, Poco2CsGenerator, this.codeGenSettings, true);
				existingClientClass.Members.Add(apiFunction);
				if (codeGenSettings.ClientApiOutputs.GenerateBothAsyncAndSync)
				{
					existingClientClass.Members.Add(ClientApiFunctionGen.Create(d, Poco2CsGenerator, this.codeGenSettings, false));
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
			targetClass.Members.Add(constructor);
		}

		void CreateDummyOfEnsureSuccessStatusCodeEx()
		{
			targetUnit.Namespaces.InsertToSortedCollection("ZZZzzzEnsureSuccessStatusCodeExDummy", false); // ZZZ to ensure this block is the last one, hopefully.
		}

		/// <summary>
		/// 
		/// </summary>
		/// <remarks>In .NEt 6, StatusCode of HttpRequestException is not there anymore.</remarks>
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
		/// The block must be with CRLF (\r\n) for lline break, and tab between {}.
		/// </summary>
		const string dummyBlock =
			@"
namespace ZZZzzzEnsureSuccessStatusCodeExDummy
{
	
}";

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
