﻿using Fonlow.Poco2Client;
using System.Linq;

namespace Fonlow.CodeDom.Web
{
	public class CodeGenSettingsBase
	{
		public CodeGenConfig ApiSelections { get; set; }
	}

	/// <summary>
	/// What CodeGenController is expecting 
	/// </summary>
	public class CodeGenSettings : CodeGenSettingsBase
	{
		public CodeGenOutputs ClientApiOutputs { get; set; }
	}

	/// <summary>
	/// For cherry picking APIs and data models 
	/// </summary>
	public class CodeGenConfig
	{
		/// <summary>
		/// To exclude some controllers. For example, [My.Namespace.Home, My.Namespace.FileUpload] for My.Namespace.HomeController and My.Namespace.FileUploadController.
		/// </summary>
		public string[] ExcludedControllerNames { get; set; }

		string[] dataModelAssemblyNames;

		/// <summary>
		/// To include assemblies containing data models. Assembly names should be without file extension. 
		/// An assembly should appear in either DataModelAssemblyNames or DataModels, not both.
		/// If the Web API assembly is also included, it should be behind those data model assemblies that it depends on.
		/// </summary>
		public string[] DataModelAssemblyNames
		{
			get { return dataModelAssemblyNames; }
			set
			{
				dataModelAssemblyNames = value;
				AllDataModelAssemblyNames = this.GetAllDataModelAssemblyNames();
			}
		}

		DataModel[] dataModels;

		/// <summary>
		/// This provides fine-grained control over the cherry picking method of each data model assemblies.
		/// Similar to DataModelAssemblyNames however, each assembly could have a CherryPickingMethods. An assembly should appear in either DataModelAssemblyNames or DataModels, not both.
		/// If the Web API assembly is also included, it should be behind those data model assemblies that it depends on.
		/// </summary>
		public DataModel[] DataModels
		{
			get { return dataModels; }
			set
			{
				dataModels = value;
				AllDataModelAssemblyNames = this.GetAllDataModelAssemblyNames();
			}
		}

		/// <summary>
		/// Cherry picking methods of POCO classes
		/// </summary>
		public CherryPickingMethods? CherryPickingMethods { get; set; }

		/// <summary>
		/// Used when cherry picking methods is for god assembly (32)
		/// </summary>
		public string[] NamespacePrefixesOfGodAssemblyTypes { get; set; }

		public string[] AllDataModelAssemblyNames { get; private set; }

		string[] GetAllDataModelAssemblyNames()
		{
			int arraySize = (DataModelAssemblyNames == null ? 0 : DataModelAssemblyNames.Length) + (DataModels == null ? 0 : DataModels.Length);
			var combinedArray = new string[arraySize];
			if (DataModelAssemblyNames != null)
			{
				DataModelAssemblyNames.CopyTo(combinedArray, 0);
			}

			if (DataModels != null)
			{
				DataModels.Select(d => d.AssemblyName).ToArray().CopyTo(combinedArray, DataModelAssemblyNames == null ? 0 : DataModelAssemblyNames.Length);
			}

			return combinedArray;
		}
	}

	public class DataModel
	{
		public string AssemblyName { get; set; }

		public CherryPickingMethods? CherryPickingMethods { get; set; }

		/// <summary>
		/// For each selected assembly with POCO classes. System.ComponentModel.DataAnnotations attributes are translated into Doc Comments, 
		/// including Required, Range, MaxLength, MinLength, StringLength, DataType and RegularExpression.
		/// If defined, overwrite the global setting in ModelGenOutputs; if not defined, follow the global setting.
		/// </summary>
		public bool? DataAnnotationsToComments { get; set; }
	}

	public class ModelGenOutputs
	{
		/// <summary>
		/// The naming of namespace is after the controller's namespace. To distinguish from the server side namespace, it is better to add a suffix like ".Client". The default is ".Client".
		/// </summary>
		public string CSClientNamespaceSuffix { get; set; } = ".Client";

		/// <summary>
		/// System.ComponentModel.DataAnnotations attributes are to be copied over, including Required, Range, MaxLength, MinLength and StringLength.
		/// </summary>
		public bool DataAnnotationsEnabled { get; set; }

		/// <summary>
		/// For CS POCO and API function. System.ComponentModel.DataAnnotations attributes are translated into Doc Comments, 
		/// including Required, Range, MaxLength, MinLength, StringLength, DataType and RegularExpression.
		/// </summary>
		public bool DataAnnotationsToComments { get; set; }

		/// <summary>
		/// Generated data types will be decorated with DataContractAttribute and DataMemberAttribute.
		/// </summary>
		public bool DecorateDataModelWithDataContract { get; set; }

		/// <summary>
		/// When DecorateDataModelWithDataContract is true, this is the namespace of DataContractAttribute. For example, "http://mybusiness.com/09/2019
		/// </summary>
		public string DataContractNamespace { get; set; }

		public bool DecorateDataModelWithSerializable { get; set; }

		/// <summary>
		/// Default true.
		/// </summary>
		public bool IEnumerableToArray { get; set; } = true;

		/// <summary>
		/// For TypeScript strict mode, used together with setting HelpStrictMode.
		/// If NotNull decorates return. For scenarios most API may return null. 
		/// This should be exclusive to MaybeNullAttributeOnMethod. if NotNullAttributeOnMethod and MaybeNullAttributeOnMethod are declared, MaybeNullAttributeOnMethod wins.
		/// CS Codes will have NotNull copied over, however for you to generate TypeScript codes from the C# Client API codes when developing a broker broker service.	TS codes will  not have null as optional type for return, when HelpStrictMode is true.
		/// Exclusive against SupportNullReferenceTypeOnMethodReturn.
		/// </summary>
		public bool NotNullAttributeOnMethod { get; set; }

		/// <summary>
		/// For TypeScript strict mode, used together with setting HelpStrictMode.
		/// If MaybeNull decorates return. For scenarios, most if not all API functions are expected to return a not null value. For example, empty array rather than null, or an object rather than null otherwise exception.
		/// This should be exclusive to NotNullAttributeOnMethod.
		/// CS Codes will have NotNull copied over, however for you to generate TypeScript codes from the C# Client API codes when developing a broker broker service. TS codes will not have null as optional type for return, when HelpStrictMode is true.
		/// Exclusive against SupportNullReferenceTypeOnMethodReturn.
		/// </summary>
		public bool MaybeNullAttributeOnMethod { get; set; }

	}

	/// <summary>
	/// Client APIs as output for C#. Mapped to "ClientApiOutputs" in CodeGen.json.
	/// </summary>
	public class CodeGenOutputs : ModelGenOutputs
	{
		/// <summary>
		/// Assuming the C# client API project is the sibling of Web API project. Relative path to the running instance of the WebApi project should be fine.
		/// </summary>
		public string ClientLibraryProjectFolderName { get; set; }

		/// <summary>
		/// File to be generated under ClientLibraryProjectFolder. The default is WebApiClientAuto.cs.
		/// </summary>
		public string FileName { get; set; } = "WebApiClientAuto.cs";

		/// <summary>
		/// For .NET client, generate both async and sync functions for each Web API function, while by default create only async functions.
		/// </summary>
		public bool GenerateBothAsyncAndSync { get; set; }

		/// <summary>
		/// Whether the Web API return string as string, rather than JSON object which is a double quoted string. Default true.
		/// </summary>
		public bool StringAsString { get; set; } = true;

		/// <summary>
		/// Whether to conform to the camel casing convention of javascript and JSON.
		/// If not defined, WebApiClientGen will check if GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
		/// If CamelCasePropertyNamesContractResolver is presented, camelCasing will be used. If not, no camelCasing transformation will be used.
		/// </summary>
		public bool? CamelCase { get; set; }

		/// <summary>
		/// Use System.Text.Json instead of Newtonsoft.Json
		/// </summary>
		public bool UseSystemTextJson { get; set; }

		/// <summary>
		/// For generated C# codes. Each controller is mapped into a container class to contain client API functions matching controller operations.
		/// By default the container is named after the controller name, for example, service class ValuesController will result in client container class Values.
		/// You may define a container name suffix such as "Client" or "Proxy", so the generated container class name may become ValuesClient.
		/// </summary>
		public string ContainerNameSuffix { get; set; }

		/// <summary>
		/// Replace EnsureSuccessStatusCode with EnsureSuccessStatusCodeEx for specific unsuccessful HTTP status handling, which throws YourClientWebApiRequestException.
		/// </summary>
#pragma warning disable CA1711 // Identifiers should not have incorrect suffix
		public bool UseEnsureSuccessStatusCodeEx { get; set; }
#pragma warning restore CA1711 // Identifiers should not have incorrect suffix

		/// <summary>
		/// Default  is true so the code block is included in the generated codes.
		/// Defined if UseEnsureSuccessStatusCodeEx is true. Respective code block will be included the code gen output. However, if you have a few client APIs generated to be used in the same application,
		/// and you may want these client APIs share the same code block, then put the WebApiRequestException code block to an assembly or a standalone CS file.
		/// </summary>
		public bool IncludeEnsureSuccessStatusCodeExBlock { get; set; } = true;

		/// <summary>
		/// Function parameters contain a callback to handle HTTP request headers, applied to C# and TypeScript codes generated.
		/// </summary>
		public bool HandleHttpRequestHeaders { get; set; }

		/// <summary>
		/// Allow cancellation in Send
		/// </summary>
		public bool CancellationTokenEnabled { get; set; }

		/// <summary>
		/// JS does not support method overloading, thus overloaded methods will be having different method name with suffix based on parameter names.
		/// However, there may be overloaded methods with the same parameter names but different CLR type, like byte, int, long and string etc.. 
		/// Having this option on will have suffix ParameterNameOfParameterCLRType
		/// </summary>
		public bool JsMethodSuffixWithClrTypeName { get; set; }


		public JSPlugin[] Plugins { get; set; }
	}

	/// <summary>
	/// Mapped to Plugins[] of CodeGen.json.
	/// </summary>
	public class JSPlugin
	{
		public string AssemblyName { get; set; }

		/// <summary>
		/// Relative or absolute directory.
		/// </summary>
		public string TargetDir { get; set; }

		/// <summary>
		/// Name of TypeScript file to be geneated under TargetDir.
		/// </summary>
		public string TSFile { get; set; }

		/// <summary>
		/// HTTP content type used in POST of HTTP of NG2. so text/plain could be used to avoid preflight in CORS.
		/// </summary>
		public string ContentType { get; set; }

		/// <summary>
		/// True to have "export namespace"; false to have "namespace". jQuery wants "namespace".
		/// </summary>
		public bool AsModule { get; set; }

		/// <summary>
		/// Default is ".Client", and the dot will be translate to underscore.
		/// </summary>
		public string ClientNamespaceSuffix { get; set; } = ".Client";

		/// <summary>
		/// Client container class name for API functions is by default the API controller name. For example, HeroesController will result in client container class name "Heroes".
		/// And a setting value like "Api" may give "Heroes" a suffix, like "HeroesApi"
		/// </summary>
		public string ContainerNameSuffix { get; set; }

		/// <summary>
		/// For JS only. System.ComponentModel.DataAnnotations attributes are translated into Doc Comments, including Required, Range, MaxLength, MinLength, StringLength, DataType and RegularExpression.
		/// </summary>
		public bool DataAnnotationsToComments { get; set; }

		/// <summary>
		/// Give TypeScript strict mode more signal for null value.
		/// The returned types and parameters may be null. And some primitive types in data model / interface may be null.
		/// </summary>
		public bool HelpStrictMode { get; set; }

		/// <summary>
		/// For Angular reactive form control binding with DateOnly, requiring yyyy-MM-dd local date, while the strongly typed field is JavaScript Date.
		/// </summary>
		public bool NgDateOnlyFormControlEnabled { get; set; }
	}

	/// <summary>
	/// A DTO class, not part of the CodeGen.json, but to aggregrate common settings and specific plugin settings.
	/// </summary>
	public class JSOutput : CodeGenSettingsBase
	{
		/// <summary>
		/// Whether to conform to the camel casing convention of javascript and JSON.
		/// If not defined, WebApiClientGen will check if GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
		/// If CamelCasePropertyNamesContractResolver is presented, camelCasing will be used. If not, no camelCasing transformation will be used.
		/// </summary>
		public bool? CamelCase { get; set; }

		public string JSPath { get; set; }

		public bool AsModule { get; set; }

		/// <summary>
		/// HTTP content type used in POST of HTTP of NG2. so text/plain could be used to avoid preflight in CORS.
		/// </summary>
		public string ContentType { get; set; }

		public bool StringAsString { get; set; }

		public string ClientNamespaceSuffix { get; set; } = ".Client";

		public string ContainerNameSuffix { get; set; }

		/// <summary>
		/// For JS. 
		/// </summary>
		public bool DataAnnotationsToComments { get; set; }

		public bool HelpStrictMode { get; set; }

		public bool NotNullAttributeOnMethod { get; set; }

		public bool MaybeNullAttributeOnMethod { get; set; }

		public bool MethodSuffixWithClrTypeName { get; set; }

		public bool NgDateOnlyFormControlEnabled { get; set; }

	}
}
