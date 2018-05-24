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

	}

	/// <summary>
	/// Client APIs as output for C#, jQuery and NG etc.
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
		/// Absolute path or relative path to the Web API project.
		/// </summary>
		public string TypeScriptJQFolder { get; set; }

		/// <summary>
		/// File name to be saved in TypeScriptJQFolder. If not defined, it will be WebApiClientAuto.ts.
		/// </summary>
		public string TypeScriptJQFile { get; set; } = "WebApiClientAuto.ts";

		/// <summary>
		/// Absolute path or relative path to the Web API project.
		/// </summary>
		public string TypeScriptNG2Folder { get; set; }

		/// <summary>
		/// File name to be saved in TypeScriptNG2Folder. If not defined, it will be WebApiNG2ClientAuto.ts.
		/// </summary>
		public string TypeScriptNG2File { get; set; } = "WebApiNG2ClientAuto.ts";

		/// <summary>
		/// HTTP content type used in POST of HTTP of NG2. so text/plain could be used to avoid preflight in CORS.
		/// </summary>
		public string ContentType { get; set; }

		/// <summary>
		/// NG2 version like 4.3, 5.0, 6.0 etc.
		/// </summary>
		public decimal? NGVersion { get; set; }
	}

	public class JSOutput : CodeGenSettingsBase
	{
		/// <summary>
		/// Whether to conform to the camel casing convention of javascript and JSON.
		/// If not defined, WebApiClientGen will check if GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
		/// If CamelCasePropertyNamesContractResolver is presented, camelCasing will be used. If not, no camelCasing transformation will be used.
		/// </summary>
		public bool? CamelCase { get; private set; }

		public string JSPath { get; private set; }

		public bool AsModule { get; private set; }

		public string ContentType { get; private set; }

		public decimal NGVersion { get; private set; }

		public JSOutput(CodeGenSettings settings, string jsPath, bool asModule)
		{
			this.ApiSelections = settings.ApiSelections;
			this.CamelCase = settings.ClientApiOutputs.CamelCase;
			this.JSPath = jsPath;
			this.AsModule = asModule;
			this.ContentType = string.IsNullOrEmpty(settings.ClientApiOutputs.ContentType) ? "application/json" : settings.ClientApiOutputs.ContentType;
			this.NGVersion = settings.ClientApiOutputs.NGVersion.HasValue ? settings.ClientApiOutputs.NGVersion.Value : 6;
		}

	}


}
