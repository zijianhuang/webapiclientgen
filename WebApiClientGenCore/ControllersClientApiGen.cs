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
	/// Generate .NET codes of the client API of the controllers
	/// </summary>
	public class ControllersClientApiGen : IDisposable
	{
		CodeCompileUnit TargetUnit { get; set; }
		//SharedContext SharedContext { get; set; }
		CodeGenSettings CodeGenParameters { get; set; }

		/// <summary>
		/// 
		/// </summary>
		/// <param name="codeGenParameters"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersClientApiGen(CodeGenSettings codeGenParameters)
		{
			this.CodeGenParameters = codeGenParameters ?? throw new System.ArgumentNullException(nameof(codeGenParameters));
			TargetUnit = new CodeCompileUnit();
			poco2CsGen = new Poco2CsGen(TargetUnit);
		}

		readonly Poco2CsGen poco2CsGen;
		private bool disposedValue;

		/// <summary>
		/// Save C# codes into a file.
		/// </summary>
		/// <param name="fileName"></param>
		// hack inspired by https://csharpcodewhisperer.blogspot.com/2014/10/create-c-class-code-from-datatable.html
		public void Save(string fileName)
		{
			using (CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp"))
			{
				CodeGeneratorOptions options = new CodeGeneratorOptions
				{
					BracingStyle = "C",
					IndentString = "\t"
				};
				using (var stream = new MemoryStream())
				using (StreamWriter writer = new StreamWriter(stream))
				{
					provider.GenerateCodeFromCompileUnit(TargetUnit, writer, options);
					writer.Flush();
					stream.Position = 0;
					using (var stringReader = new StreamReader(stream))
					using (var fileWriter = new StreamWriter(fileName))
					{
						var s = stringReader.ReadToEnd();
						if (CodeGenParameters.ClientApiOutputs.UseEnsureSuccessStatusCodeEx && CodeGenParameters.ClientApiOutputs.IncludeEnsureSuccessStatusCodeExBlock)
						{
							fileWriter.Write(s.Replace("//;", "").Replace(dummyBlock, blockOfEnsureSuccessStatusCodeEx));
						}
						else
						{
							fileWriter.Write(s.Replace("//;", ""));
						}
					}
				}
			}
		}

		public bool ForBothAsyncAndSync { get; set; }


		void GenerateCsFromPoco()
		{
			if (CodeGenParameters.ApiSelections.DataModelAssemblyNames != null)
			{
				var allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
				var assemblies = allAssemblies.Where(d => CodeGenParameters.ApiSelections.DataModelAssemblyNames.Any(k => k.Equals(d.GetName().Name, StringComparison.CurrentCultureIgnoreCase)))
					.OrderBy(n => n.FullName)
					.ToArray();
				var cherryPickingMethods = CodeGenParameters.ApiSelections.CherryPickingMethods.HasValue ? (CherryPickingMethods)CodeGenParameters.ApiSelections.CherryPickingMethods.Value : CherryPickingMethods.DataContract;
				foreach (var assembly in assemblies)
				{
					var xmlDocFileName = DocComment.DocCommentLookup.GetXmlPath(assembly);
					var docLookup = Fonlow.DocComment.DocCommentLookup.Create(xmlDocFileName);
					poco2CsGen.CreateCodeDom(assembly, cherryPickingMethods, docLookup, CodeGenParameters.ClientApiOutputs, null);
				}
			}
			
			if (CodeGenParameters.ApiSelections.DataModels != null)
			{
				var allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
				foreach (var dm in CodeGenParameters.ApiSelections.DataModels)
				{
					var assembly = allAssemblies.FirstOrDefault(d => d.GetName().Name.Equals(dm.AssemblyName, StringComparison.CurrentCultureIgnoreCase));
					if (assembly != null)
					{
						var xmlDocFileName = DocComment.DocCommentLookup.GetXmlPath(assembly);
						var docLookup = Fonlow.DocComment.DocCommentLookup.Create(xmlDocFileName);
						var cherryPickingMethods = dm.CherryPickingMethods.HasValue ? (CherryPickingMethods)dm.CherryPickingMethods.Value : CherryPickingMethods.DataContract;
						var dataAnnotationsToComments = (dm.DataAnnotationsToComments.HasValue && dm.DataAnnotationsToComments.Value) // dm explicitly tell to do
							|| (!dm.DataAnnotationsToComments.HasValue && CodeGenParameters.ClientApiOutputs.DataAnnotationsToComments);
						poco2CsGen.CreateCodeDom(assembly, cherryPickingMethods, docLookup, CodeGenParameters.ClientApiOutputs, dataAnnotationsToComments);
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
				var clientNamespaceText = grouppedControllerDescriptions.Key + CodeGenParameters.ClientApiOutputs.CSClientNamespaceSuffix;
				var clientNamespace = new CodeNamespace(clientNamespaceText);
				TargetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

				clientNamespace.Imports.AddRange(
					new CodeNamespaceImport[]{
						new CodeNamespaceImport("System"),
						new CodeNamespaceImport("System.Linq"),
						new CodeNamespaceImport("System.Collections.Generic"),
						new CodeNamespaceImport("System.Threading.Tasks"),
						new CodeNamespaceImport("System.Net.Http"),
				});

				if (CodeGenParameters.ClientApiOutputs.UseSystemTextJson)
				{
					clientNamespace.Imports.Add(new CodeNamespaceImport("System.Text.Json"));
					clientNamespace.Imports.Add(new CodeNamespaceImport("System.Text.Json.Serialization"));
				}
				else
				{
					clientNamespace.Imports.Add(new CodeNamespaceImport("Newtonsoft.Json"));
				}

				if (CodeGenParameters.ClientApiOutputs.UseEnsureSuccessStatusCodeEx)
				{
					clientNamespace.Imports.Add(new CodeNamespaceImport("Fonlow.Net.Http"));
				}

				var newClassesCreated = grouppedControllerDescriptions
					.OrderBy(d => d.ControllerName)
					.Select(d =>
					{
						var controllerFullName = d.ControllerType.Namespace + "." + d.ControllerName;
						if (CodeGenParameters.ApiSelections.ExcludedControllerNames != null && CodeGenParameters.ApiSelections.ExcludedControllerNames.Contains(controllerFullName))
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
				if (CodeGenParameters.ApiSelections.ExcludedControllerNames != null && CodeGenParameters.ApiSelections.ExcludedControllerNames.Contains(controllerFullName))
					continue;

				var existingClientClass = LookupExistingClass(controllerNamespace, GetContainerClassName(controllerName));
				System.Diagnostics.Trace.Assert(existingClientClass != null);

				var apiFunction = ClientApiFunctionGen.Create(d, poco2CsGen, this.CodeGenParameters.ClientApiOutputs, true);
				existingClientClass.Members.Add(apiFunction);
				if (ForBothAsyncAndSync)
				{
					existingClientClass.Members.Add(ClientApiFunctionGen.Create(d, poco2CsGen, this.CodeGenParameters.ClientApiOutputs, false));
				}
			}

			if (CodeGenParameters.ClientApiOutputs.UseEnsureSuccessStatusCodeEx && CodeGenParameters.ClientApiOutputs.IncludeEnsureSuccessStatusCodeExBlock)
			{
				CreateDummyOfEnsureSuccessStatusCodeEx();
			}
		}

		string GetContainerClassName(string controllerName)
		{
			return controllerName + (CodeGenParameters.ClientApiOutputs.ContainerNameSuffix ?? String.Empty);
		}

		/// <summary>
		/// Lookup existing CodeTypeDeclaration created.
		/// </summary>
		/// <param name="namespaceText"></param>
		/// <param name="containerClassName"></param>
		/// <returns></returns>
		CodeTypeDeclaration LookupExistingClass(string namespaceText, string containerClassName)
		{
			for (int i = 0; i < TargetUnit.Namespaces.Count; i++)
			{
				var ns = TargetUnit.Namespaces[i];
				if (ns.Name == namespaceText + CodeGenParameters.ClientApiOutputs.CSClientNamespaceSuffix)
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
				Type = CodeGenParameters.ClientApiOutputs.UseSystemTextJson ? new CodeTypeReference("JsonSerializerOptions") : new CodeTypeReference("JsonSerializerSettings")
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
				CodeGenParameters.ClientApiOutputs.UseSystemTextJson ? "JsonSerializerOptions" : "JsonSerializerSettings", "jsonSerializerSettings=null"));

			constructor.Statements.Add(new CodeSnippetStatement(@"			if (client == null)
				throw new ArgumentNullException(""Null HttpClient."", ""client"");
"));
			constructor.Statements.Add(new CodeSnippetStatement(@"			if (client.BaseAddress == null)
				throw new ArgumentNullException(""HttpClient has no BaseAddress"", ""client"");
"));
			// Add field initialization logic
			var clientReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "client");
			constructor.Statements.Add(new CodeAssignStatement(clientReference, new CodeArgumentReferenceExpression("client")));
			var jsonSettingsReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "jsonSerializerSettings");
			constructor.Statements.Add(new CodeAssignStatement(jsonSettingsReference, new CodeArgumentReferenceExpression("jsonSerializerSettings")));
			targetClass.Members.Add(constructor);
		}

		void CreateDummyOfEnsureSuccessStatusCodeEx()
		{
			TargetUnit.Namespaces.Add(new CodeNamespace("EnsureSuccessStatusCodeExDummy"));
		}

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
		const string dummyBlock =
			@"
namespace EnsureSuccessStatusCodeExDummy
{
	
}";

		protected virtual void Dispose(bool disposing)
		{
			if (!disposedValue)
			{
				if (disposing)
				{
					poco2CsGen.Dispose();
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
