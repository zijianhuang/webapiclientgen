﻿namespace Fonlow.OpenApi.ClientTypes
{
	public enum ActionNameStrategy
	{
		/// <summary>
		/// Either OperationId or MethodQueryParameters
		/// </summary>
		Default,

		OperationId,

		/// <summary>
		/// Compose something like GetSomeWhereById1AndId2. Generally used with ContainerNameStrategy.Path
		/// </summary>
		MethodQueryParameters,

		PathMethodQueryParameters,

		/// <summary>
		/// Some YAML may define operationId not a valid function name for example, list-data-sets. Regex may be needed to create a valid function name from such operationId.
		/// </summary>
		NormalizedOperationId,
	}

	public enum ContainerNameStrategy
	{
		/// <summary>
		/// All client functions will be constructed in a god class named after ContainerClassName
		/// </summary>
		None,

		/// <summary>
		/// Use tags
		/// </summary>
		Tags,

		/// <summary>
		/// Use path as resource for grouping, as a container class name.
		/// </summary>
		Path,
	}

	public class Settings
	{
		public string ClientNamespace { get; set; }

		/// <summary>
		/// To compose client function name through removing path prefix. Typically / or /api. The default is /.
		/// The lenght of the prefix is used to remove path prefix.
		/// </summary>
		public string PathPrefixToRemove { get; set; } = "/";

		public ActionNameStrategy ActionNameStrategy { get; set; }

		/// <summary>
		/// Default is \w* for Alphanumeric words
		/// </summary>
		public string RegexForNormalizedOperationId { get; set; } = @"\w*";

		public ContainerNameStrategy ContainerNameStrategy { get; set; }

		/// <summary>
		/// Container class name when ContainerNameStrategy is None. The default is Misc.
		/// </summary>
		public string ContainerClassName { get; set; } = "Misc";

		/// <summary>
		/// Suffix of container class name if ContainerNameStrategy is not None.
		/// </summary>
		public string SuffixOfContainerName { get; set; } = "Client";

		/// <summary>
		/// Assuming the client API project is the sibling of Web API project. Relative path to the WebApi project should be fine.
		/// </summary>
		public string ClientLibraryProjectFolderName { get; set; }

		/// <summary>
		/// For .NET client, generate both async and sync functions for each Web API function
		/// </summary>
		public bool GenerateBothAsyncAndSync { get; set; }

		public bool? CamelCase { get; set; }

		public JSPlugin[] Plugins { get; set; }

	}

	/// <summary>
	/// A DTO class, not part of the CodeGen.json 
	/// </summary>
	public class JSOutput
	{
		/// <summary>
		/// Whether to conform to the camel casing convention of javascript and JSON.
		/// If not defined, WebApiClientGen will check if GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
		/// If CamelCasePropertyNamesContractResolver is presented, camelCasing will be used. If not, no camelCasing transformation will be used.
		/// </summary>
		public bool? CamelCase { get; set; }

		public string JSPath { get; set; }

		public bool AsModule { get; set; }

		///// <summary>
		///// HTTP content type used in POST of HTTP of NG2. so text/plain could be used to avoid preflight in CORS.
		///// </summary>
		public string ContentType { get; set; }

		public string ClientNamespaceSuffix { get; set; } = ".Client";
	}

	public class JSPlugin
	{
		public string AssemblyName { get; set; }

		public string TargetDir { get; set; }

		public string TSFile { get; set; }

		///// <summary>
		///// HTTP content type used in POST of HTTP of NG2. so text/plain could be used to avoid preflight in CORS.
		///// </summary>
		public string ContentType { get; set; }

		/// <summary>
		/// True to have "export namespace"; false to have "namespace". jQuery wants "namespace".
		/// </summary>
		public bool AsModule { get; set; }

		public string ClientNamespaceSuffix { get; set; } = ".Client";
	}
}