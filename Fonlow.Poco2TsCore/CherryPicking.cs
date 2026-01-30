using Fonlow.Reflection;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;

namespace Fonlow.Poco2Client
{
	/// <summary>
	/// Pick a type or a member field or property
	/// </summary>
	public static class CherryPicking
	{
		public static bool IsCherryType(Type type, CherryPickingMethods methods)
		{
			bool r0, r1, r2, r3, r4, r5;
			r0 = r1 = r2 = r3 = r4 = r5 = false;

			if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
			{
				r1= type.GetCustomAttribute<DataContractAttribute>() != null;
			}

			if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
			{
				r2= TypeHelper.AttributeExists(type, "Newtonsoft.Json.JsonObjectAttribute") !=null;
			}

			if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
			{
				r3= type.GetCustomAttribute<SerializableAttribute>() != null;
			}

			if ((methods & CherryPickingMethods.AspNet) == CherryPickingMethods.AspNet)//Asp.net does not seem to define good data annotation for cherry picking types
			{
				r4 = true;
			}

			if ((methods & CherryPickingMethods.NetCore) == CherryPickingMethods.NetCore)
			{
				r5 = true;
			}

			if (methods== CherryPickingMethods.All)
			{
				r0 = true;
			}

			return r0 | r1 | r2 | r3 | r4 | r5;
		}

		/// <summary>
		/// How the type was cherry picked.
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		public static CherryPickingMethods GetTypeCherryMethods(Type type)
		{
			CherryPickingMethods r1, r2, r3;
			r1 = r2 = r3 = CherryPickingMethods.All;

			if (type.GetCustomAttribute<DataContractAttribute>() != null)
			{
				r1 = CherryPickingMethods.DataContract;
			}

			if (TypeHelper.AttributeExists(type, "Newtonsoft.Json.JsonObjectAttribute") != null)
			{
				r2 = CherryPickingMethods.NewtonsoftJson;
			}

			if (type.GetCustomAttribute<SerializableAttribute>() != null)
			{
				r3 = CherryPickingMethods.Serializable;
			}

			return r1 | r2 | r3; //dotnet System.Text.Json.Serialization does not provide a similar attribute for cherry picking at type level.
		}

		public static CherryType GetMemberCherryType(MemberInfo memberInfo, CherryPickingMethods methods, bool typeIsWithDataContract)
		{
			CherryType[] r = { CherryType.None, CherryType.None, CherryType.None, CherryType.None, CherryType.None, CherryType.None };


			//opt-in for DataContract through DataMemberAttribute , and the type may or may not be decorated by DataContractAttribute.
			// Enum will have all member fields being picked, regardless of the EnumMemberAttribute.
			if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
			{
				DataMemberAttribute a = memberInfo.GetCustomAttribute<DataMemberAttribute>();
				if (a == null)
					r[1]= CherryType.None;
				else
					r[1]= a.IsRequired ? CherryType.BigCherry : CherryType.Cherry;

				if (typeIsWithDataContract)
				{
					return r[1];
				}
			}

			//opt-in for NewtonsoftJson through JsonPropertyAttribute, and the type may or may not be decorated by JsonObjectAttribute.
			if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson || methods == CherryPickingMethods.All)
			{
				Attribute a =TypeHelper.AttributeExists(memberInfo, "Newtonsoft.Json.JsonIgnoreAttribute");
				if (a == null)
				{
					Newtonsoft.Json.JsonPropertyAttribute a2 = memberInfo.GetCustomAttribute<Newtonsoft.Json.JsonPropertyAttribute>(); // https://www.newtonsoft.com/json/help/html/T_Newtonsoft_Json_JsonPropertyAttribute.htm
					if (a2 != null)
					{
						r[2] = (TypeHelper.GetRequired(a2, "Required", "Default") || TypeHelper.GetRequired(a2, "Required", "Always")) ? CherryType.BigCherry : CherryType.Cherry; //https://www.newtonsoft.com/json/help/html/T_Newtonsoft_Json_Required.htm
					}
					else
					{
						r[2] = CherryType.Cherry;
					}
				}
				else
				{
					return CherryType.None; //r[2] = CherryType.None;
				}
			}

			// opt-out for .NET Core
			if ((methods & CherryPickingMethods.NetCore) == CherryPickingMethods.NetCore || methods== CherryPickingMethods.All)
			{
				Attribute a = TypeHelper.AttributeExists(memberInfo, "System.Text.Json.Serialization.JsonIgnoreAttribute");
				if (a == null)
				{
					System.Text.Json.Serialization.JsonPropertyNameAttribute a2 = memberInfo.GetCustomAttribute<System.Text.Json.Serialization.JsonPropertyNameAttribute>();
					if (a2 != null)
					{
						r[2] = TypeHelper.AttributeExists(memberInfo, "System.Text.Json.Serialization.JsonRequiredAttribute") != null ? CherryType.BigCherry : CherryType.Cherry; // https://learn.microsoft.com/en-us/dotnet/api/system.text.json.serialization.jsonrequiredattribute
					}
					else
					{
						r[2] = CherryType.Cherry;
					}
				}
				else
				{
					return CherryType.None; // r[2] = CherryType.None;
				}
			}

			//opt-out for Serializable through NonSerializedAttribute
			if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
			{
				NonSerializedAttribute a = memberInfo.GetCustomAttribute<NonSerializedAttribute>();
				if (a==null)
				{
					RequiredAttribute a2 = memberInfo.GetCustomAttribute<RequiredAttribute>();
					r[3]=  a2 == null ? CherryType.Cherry : CherryType.BigCherry;
				}
				else
				{
					r[3] = CherryType.None;
				}
			}

			//opt-out for AspNet
			if ((methods & CherryPickingMethods.AspNet) == CherryPickingMethods.AspNet)
			{
				RequiredAttribute a = memberInfo.GetCustomAttribute<RequiredAttribute>();
				r[4] = a == null ? CherryType.Cherry : CherryType.BigCherry;
			}

			if ((methods & CherryPickingMethods.ApiOnly) == CherryPickingMethods.ApiOnly)
			{
				RequiredAttribute a = memberInfo.GetCustomAttribute<RequiredAttribute>();
				r[5] = a == null ? CherryType.Cherry : CherryType.BigCherry;
			}


			//opt-out
			if (methods== CherryPickingMethods.All)
			{
				r[0] = CherryType.Cherry;
			}

			return r.Max();

		}

		/// <summary>
		/// Get custom property name if decorated by DataMemberAttribute or Newtonsoft.Json.JsonPropertyAttribute. If not defined, return null.
		/// </summary>
		/// <param name="memberInfo"></param>
		/// <param name="methods"></param>
		/// <returns></returns>
		public static string GetFieldCustomName(MemberInfo memberInfo, CherryPickingMethods methods)
		{
			//opt-in for DataContract through DataMemberAttribute , and the type may or may not be decorated by DataContractAttribute.
			// Enum will have all member fields being picked, regardless of the EnumMemberAttribute.
			if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
			{
				DataMemberAttribute a = memberInfo.GetCustomAttribute<DataMemberAttribute>();
				if (a!=null)
				{
					return a.Name;
				}

			}

			//opt-in for NewtonsoftJson through JsonPropertyAttribute,  , and the type may or may not be decorated by JsonObjectAttribute.
			if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
			{
				//       var a =TypeHelper.AttributeExists(memberInfo, "Newtonsoft.Json.JsonIgnoreAttribute");
				Newtonsoft.Json.JsonIgnoreAttribute a = memberInfo.GetCustomAttribute<Newtonsoft.Json.JsonIgnoreAttribute>();
				if (a == null)
				{
					Newtonsoft.Json.JsonPropertyAttribute njAttribute = memberInfo.GetCustomAttribute<Newtonsoft.Json.JsonPropertyAttribute>();
					if (njAttribute != null && !String.IsNullOrEmpty(njAttribute.PropertyName))
					{
						return njAttribute.PropertyName;
					}
				}
			}

			if ((methods & CherryPickingMethods.NetCore) == CherryPickingMethods.NetCore)
			{
				System.Text.Json.Serialization.JsonIgnoreAttribute a = memberInfo.GetCustomAttribute<System.Text.Json.Serialization.JsonIgnoreAttribute>();
				if (a == null)
				{
					System.Text.Json.Serialization.JsonPropertyNameAttribute njAttribute = memberInfo.GetCustomAttribute<System.Text.Json.Serialization.JsonPropertyNameAttribute>();
					if (njAttribute != null && !String.IsNullOrEmpty(njAttribute.Name))
					{
						return njAttribute.Name;
					}
				}
			}

			return null;
		}
	}
}
