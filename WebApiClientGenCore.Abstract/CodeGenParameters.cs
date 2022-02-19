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

		/// <summary>
		/// To include assemblies containing data models. Assembly names should be without file extension.
		/// </summary>
		public string[] DataModelAssemblyNames { get; set; }

		/// <summary>
		/// Similar to DataModelAssemblyNames however, each assembly could have a CherryPickingMethods. An assembly should appear in either DataModelAssemblyNames or DataModels, not both.
		/// </summary>
		public DataModel[] DataModels { get; set; }

		/// <summary>
		/// Cherry picking methods of POCO classes
		/// </summary>
		public int? CherryPickingMethods { get; set; }

	}

	public class DataModel
	{
		public string AssemblyName { get; set; }

		public int? CherryPickingMethods { get; set; }
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
		/// System.ComponentModel.DataAnnotations attributes are translated into Doc Comments, 
		/// including Required, Range, MaxLength, MinLength, StringLength, DataType and RegularExpression..
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
		/// Whether the Web API return string as string, rather than JSON object which is a double quoted string.
		/// </summary>
		public bool StringAsString { get; set; }

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
		/// Each controller is mapped into a container class to contain client API functions matching controller operations.
		/// By default the container is named after the controller name, for example, service class ValuesController will result in client container class Values.
		/// You may define a container name suffix such as "Client" or "Proxy", so the generated container class name may become ValuesClient.
		/// </summary>
		public string ContainerNameSuffix { get; set; }

		/// <summary>
		/// Replace EnsureSuccessStatusCode with EnsureSuccessStatusCodeEx for specific unsuccessful HTTP status handling, which throws YourClientWebApiRequestException.
		/// </summary>
		public bool UseEnsureSuccessStatusCodeEx { get; set; }

		/// <summary>
		/// Default  is true so the code block is included in the generated codes.
		/// Defined if UseEnsureSuccessStatusCodeEx is true. Respective code block will be included the code gen output. However, if you have a few client APIs generated to be used in the same application,
		/// and you may want these client APIs share the same code block, then put the WebApiRequestException code block to an assembly or a standalone CS file.
		/// </summary>
		public bool IncludeEnsureSuccessStatusCodeExBlock { get; set; } = true;

		/// <summary>
		/// Function parameters contain a callback to handle HTTP request headers
		/// </summary>
		public bool HandleHttpRequestHeaders { get; set; }

		public JSPlugin[] Plugins { get; set; }
	}

	/// <summary>
	/// A DTO class, not part of the CodeGen.json 
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
		/// System.ComponentModel.DataAnnotations attributes are translated into Doc Comments, including Required, Range, MaxLength, MinLength, StringLength, DataType and RegularExpression.
		/// </summary>
		public bool DataAnnotationsToComments { get; set; }
	}

	/// <summary>
	/// Mapped to Plugins[] of CodeGen.json.
	/// </summary>
	public class JSPlugin
	{
		public string AssemblyName { get; set; }

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

		public string ClientNamespaceSuffix { get; set; } = ".Client";

		public string ContainerNameSuffix { get; set; }

		/// <summary>
		/// System.ComponentModel.DataAnnotations attributes are translated into Doc Comments, including Required, Range, MaxLength, MinLength, StringLength, DataType and RegularExpression.
		/// </summary>
		public bool DataAnnotationsToComments { get; set; }

	}
}
