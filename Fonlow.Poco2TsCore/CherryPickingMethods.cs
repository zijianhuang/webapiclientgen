using System;

namespace Fonlow.Poco2Client
{
	/// <summary>
	/// Flagged options for cherry picking in various development processes.
	/// </summary>
	[Flags]
	public enum CherryPickingMethods
	{
		/// <summary>
		/// Include all public classes, properties and properties.
		/// </summary>
		All = 0,

		/// <summary>
		/// Include all public classes decorated by DataContractAttribute, and public properties or fields decorated by DataMemberAttribute. 
		/// And use DataMemberAttribute.IsRequired
		/// </summary>
		DataContract = 1,

		/// <summary>
		/// Include all public classes decorated by JsonObjectAttribute, and public properties or fields decorated by JsonPropertyAttribute.  
		/// And use JsonPropertyAttribute.Required
		/// </summary>
		NewtonsoftJson = 2,

		/// <summary>
		/// Include all public classes decorated by SerializableAttribute, and all public properties or fields but excluding those decorated by NonSerializedAttribute.
		/// And use System.ComponentModel.DataAnnotations.RequiredAttribute.
		/// </summary>
		Serializable = 4,

		/// <summary>
		/// Include all public classes, properties and properties. 
		/// And use System.ComponentModel.DataAnnotations.RequiredAttribute.
		/// </summary>
		AspNet = 8,

		/// <summary>
		/// For .NET Core Json*Attribute
		/// </summary>
		NetCore= 16,

		/// <summary>
		/// Pick types appearing in the function prototypes of the API only.
		/// This method should be used exclusively with DataModelAssemblyNames of the code gen config only, not DataModels.
		/// DataModelAssemblyNames should include only the name of the god assembly, and optionally a few assemblies that the god assembly references to, which contain other custom POCO classes.
		/// The normination of assemblies DataModelAssemblyNames also give signals to the codegen to distinguish custom POCO classes from BCL classes.
		/// </summary>
		ApiOnly = 32,
	}

	/// <summary>
	/// How significant the cherry is
	/// </summary>
	public enum CherryType
	{
		None,

		/// <summary>
		/// Signal optional property.
		/// </summary>
		Cherry,

		/// <summary>
		/// Signal required property
		/// </summary>
		BigCherry,
	}

}
