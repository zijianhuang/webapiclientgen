namespace Fonlow.WebApiClientGen.Swag
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

	public enum ControllerNameStrategy
	{
		/// <summary>
		/// Use tags
		/// </summary>
		Tags,

		/// <summary>
		/// Use path along with regex to pick 
		/// </summary>
		Path,
	}

	public class Settings
	{
		public string ClientNamespace { get; set; }

		public string PathPrefixToRemove { get; set; }

		public ActionNameStrategy ActionNameStrategy { get; set; }

		public ControllerNameStrategy ControllerNameStrategy { get; set; }
	}
}
