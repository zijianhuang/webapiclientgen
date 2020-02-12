using System;
using System.Runtime.Serialization;

namespace Fonlow.Web.Meta
{
	public class Constants
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
		[DataMember]
		public string Documentation
		{ get; set; }

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

		public Type ReturnType
		{ get; set; }


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

		public Type ControllerType
		{ get; set; }

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
			var a = obj as ControllerDescriptor;
			if (a == null)
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

		//[DataMember]
		//public string Prefix
		//{ get; set; }

		[DataMember]
		public ParameterBinder ParameterBinder
		{ get; set; }
	}

	[Serializable]
	[DataContract(Namespace = Constants.NS)]
	public class ResponseDescription
	{
		public Type DeclaredType
		{ get; set; }

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

		public Type ResponseType
		{ get; set; }

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

	}
}
