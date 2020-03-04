namespace Fonlow.OpenApi.ClientTypes
{
	public enum ActionNameStrategy
	{
		/// <summary>
		/// OperationId or auto
		/// </summary>
		Default,
		OperationId,

		/// <summary>
		/// like GetSomeWhereById1AndId2
		/// </summary>
		MethodQueryParameters,
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
		/// Use path as resource for grouping
		/// </summary>
		Path,
	}

	public class Settings
	{
		public string ClientNamespace { get; set; }

		/// <summary>
		/// To compose client function name through removing path prefix
		/// </summary>
		public string PathPrefixToRemove { get; set; }

		public ActionNameStrategy ActionNameStrategy { get; set; }

		public ContainerNameStrategy ControllerNameStrategy { get; set; }

		/// <summary>
		/// Utilized when ContainerNameStrategy is None
		/// </summary>
		public string ContainerClassName { get; set; } = "Misc";

		public bool ForBothAsyncAndSync { get; set; }
	}
}
