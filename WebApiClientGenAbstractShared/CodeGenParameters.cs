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
		public string[] ExcludedControllerNames { get; set; }

		/// <summary>
		/// Assembly names without file extension
		/// </summary>
		public string[] DataModelAssemblyNames
		{ get; set; }

		/// <summary>
		/// Cherry picking methods of POCO classes
		/// </summary>
		public int? CherryPickingMethods { get; set; }

		public DataModel[] DataModels { get; set; }

	}

	public class DataModel
	{
		public string AssemblyName { get; set; }

		public int? CherryPickingMethods { get; set; }
	}

	/// <summary>
	/// Client APIs as output for C#, jQuery and NG etc. Mapped to "ClientApiOutputs" in CodeGen.json.
	/// </summary>
	public class CodeGenOutputs
	{
		/// <summary>
		/// Assuming the client API project is the sibling of Web API project. Relative path to the WebApi project should be fine.
		/// </summary>
		public string ClientLibraryProjectFolderName { get; set; }

		/// <summary>
		/// For .NET client, generate both async and sync functions for each Web API function
		/// </summary>
		public bool GenerateBothAsyncAndSync { get; set; }

		/// <summary>
		/// Container class's constructor is with HttpClient parameter only and the HttpClient should be initialized with BaseAddress in app codes
		/// </summary>
		public bool DIFriendly { get; set; }

		/// <summary>
		/// Whether the Web API return string as string, rather than JSON object which is a double quoted string.
		/// </summary>
		public bool StringAsString { get; set; }

		/// <summary>
		/// Whether to conform to the camel casing convention of javascript and JSON.
		/// If not defined, WebApiClientGen will check if GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
		/// If CamelCasePropertyNamesContractResolver is presented, camelCasing will be used. If not, no camelCasing transformation will be used.
		/// The default is ".Client".
		/// </summary>
		public bool? CamelCase { get; set; }

		public string CSClientNamespaceSuffix { get; set; } = ".Client";

		/// <summary>
		/// Each controller is mapped into a container class to contain client API functions matching controller operations.
		/// By default the container is named after the controller name, for example, service class ValuesController will result in client container class Values.
		/// You may define a container name suffix such as "Client", so the generated container class name may become ValuesClient.
		/// </summary>
		public string ContainerNameSuffix { get; set; }

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
	}

	public class JSPlugin
	{
		public string AssemblyName { get; set; }

		public string TargetDir { get; set; }

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
	}
}
