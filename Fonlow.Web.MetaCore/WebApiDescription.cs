using System;
using System.Runtime.Serialization;

namespace Fonlow.Web.Meta
{
	public static class Constants
	{
		public const string NS = "http://fonlow.com/Web/Meta/201509";
	}

	[Serializable]
	[DataContract(Namespace = Constants.NS)]
	public class WebApiDescriptions
	{
		[DataMember]
		public WebApiDescription[] Descriptions
		{ get; set; }

		/// <summary>
		/// Schema sets done through XmlScehma.Write().
		/// </summary>
		[DataMember]
		public string[] Schemas
		{ get; set; }
	}

	/// <summary>
	/// POCO for the data structure of ApiDescription
	/// </summary>
	[Serializable]
	[DataContract(Namespace = Constants.NS)]
	public class WebApiDescription
	{
		//[DataMember]
		//public string MethodSummary
		//{ get; set; }

		[DataMember]
		public string ID
		{ get; private set; }

		[DataMember]
		public ActionDescriptor ActionDescriptor
		{ get; set; }

		[DataMember]
		public string HttpMethod
		{ get; set; }

		[DataMember]
		public ParameterDescription[] ParameterDescriptions
		{ get; set; }

		[DataMember]
		public string RelativePath
		{ get; set; }

		[DataMember]
		public ResponseDescription ResponseDescription
		{ get; set; }

		public WebApiDescription(string id)
		{
			ID = id;
		}
	}

	[Serializable]
	[DataContract(Namespace = Constants.NS)]
	public class ActionDescriptor
	{
		/// <summary>
		/// ActionName is by default the function name of the controller, however, could be overridden by ActionNameAttribute.
		/// </summary>
		[DataMember]
		public string ActionName
		{ get; set; }

		/// <summary>
		/// Used to match doc comments.
		/// </summary>
		[DataMember]
		public string MethodFullName
		{ get; set; }

		/// <summary>
		/// It may be null
		/// </summary>
		[DataMember]
		public Type ReturnType
		{ get; set; }

		/// <summary>
		/// FullName of ReturnType
		/// </summary>
		[DataMember]
		public string ReturnTypeName
		{
			get
			{
				if (ReturnType == null)
					return null;

				return ReturnType.FullName;
			}

			set { }
		}

		[DataMember]
		public ControllerDescriptor ControllerDescriptor
		{ get; set; }

	}

	[Serializable]
	[DataContract(Namespace = Constants.NS)]
	public class ControllerDescriptor
	{
		[DataMember]
		public string ControllerName
		{ get; set; }

		/// <summary>
		/// It may be null
		/// </summary>
		[DataMember]
		public Type ControllerType
		{ get; set; }

		/// <summary>
		/// Fullname of ControllerType
		/// </summary>
		[DataMember]
		public string ControllerTypeName
		{
			get
			{
				if (ControllerType == null)
					return null;

				return ControllerType.FullName;
			}
			set { }
		}

		public override bool Equals(object obj)
		{
			if (!(obj is ControllerDescriptor a))
				return false;

			return a.ControllerName == ControllerName && a.ControllerType == ControllerType;
		}

		public override int GetHashCode()
		{
			return (ControllerType + ControllerType.FullName).GetHashCode();//important for Distinct() of Linq.
		}
	}

	[Serializable]
	[DataContract(Namespace = Constants.NS)]
	public class ParameterDescription
	{
		[DataMember]
		public string Documentation
		{ get; set; }

		[DataMember]
		public string Name
		{ get; set; }

		[DataMember]
		public ParameterDescriptor ParameterDescriptor
		{ get; set; }
	}

	[Serializable]
	[DataContract(Namespace = Constants.NS)]
	public class ParameterDescriptor
	{
		[DataMember]
		public bool IsOptional
		{ get; set; }

		[DataMember]
		public string ParameterName
		{ get; set; }

		[DataMember]
		public Type ParameterType
		{ get; set; }

		[DataMember]
		public ParameterBinder ParameterBinder
		{ get; set; }
	}

	[Serializable]
	[DataContract(Namespace = Constants.NS)]
	public class ResponseDescription
	{
		/// <summary>
		/// It may be null
		/// </summary>
		public Type DeclaredType
		{ get; set; }

		/// <summary>
		/// Fullname of DeclaredType
		/// </summary>
		[DataMember]
		public string DeclaredTypeName
		{
			get
			{
				if (DeclaredType == null)
					return null;

				return DeclaredType.FullName;
			}
			set { }
		}

		[DataMember]
		public string Documentation
		{ get; set; }

		/// <summary>
		/// It may be null
		/// </summary>
		public Type ResponseType
		{ get; set; }

		/// <summary>
		/// Fullname of ResponseType
		/// </summary>
		[DataMember]
		public string ResponseTypeName
		{
			get
			{
				if (ResponseType == null)
					return null;

				return ResponseType.FullName;
			}
			set { }
		}
	}



	[Serializable]
	[DataContract(Namespace = Constants.NS)]
	public enum ParameterBinder
	{
		[EnumMember]
		None,
		[EnumMember]
		FromUri,
		[EnumMember]
		FromBody,
		[EnumMember]
		FromQuery,
		[EnumMember]
		FromForm,

		[EnumMember]
		FromHeader,

	}
}
