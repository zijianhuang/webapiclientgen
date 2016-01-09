using System;
using System.Linq;
using System.Runtime.Serialization;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using Fonlow.Reflection;


namespace Fonlow.Poco2Client
{

    /// <summary>
    /// Pick a type or a member field or property
    /// </summary>
    public static class CherryPicking
    {
        public static bool IsCherryType(Type type, CherryPickingMethods methods)
        {
            bool r0, r1, r2, r3, r4;
            r0 = r1 = r2 = r3 = r4 = false;

            if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
            {
                r1= TypeHelper.ReadAttribute<DataContractAttribute>(type) != null;
            }

            if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
            {
                r2= TypeHelper.AttributeExists(type, "Newtonsoft.Json.JsonObjectAttribute") !=null;
            }

            if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
            {
                r3= TypeHelper.ReadAttribute<SerializableAttribute>(type) != null;
            }

            if ((methods & CherryPickingMethods.AspNet) == CherryPickingMethods.AspNet)//Asp.net does not seem to define good data annotation for cherry picking types
            {
                r4 = true;
            }

            if (methods== CherryPickingMethods.All)
            {
                r0 = true;
            }

            return r0 | r1 | r2 | r3 | r4;
        }

        public static CherryType GetMemberCherryType(MemberInfo memberInfo, CherryPickingMethods methods)
        {
            CherryType[] r = { CherryType.None, CherryType.None, CherryType.None, CherryType.None, CherryType.None };


            //opt-in for DataContract through DataMemberAttribute , and the type may or may not be decorated by DataContractAttribute.
            // Enum will have all member fields being picked, regardless of the EnumMemberAttribute.
            if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
            {
                var a = TypeHelper.ReadAttribute<DataMemberAttribute>(memberInfo);
                if (a == null)
                    r[1]= CherryType.None;
                else
                    r[1]= a.IsRequired ? CherryType.BigCherry : CherryType.Cherry;

            }

            //opt-in for NewtonsoftJson through JsonPropertyAttribute,  , and the type may or may not be decorated by JsonObjectAttribute.
            if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
            {
                var a =TypeHelper.AttributeExists(memberInfo, "Newtonsoft.Json.JsonIgnoreAttribute");
                if (a == null)
                {
                    var a2 = TypeHelper.AttributeExists(memberInfo, "Newtonsoft.Json.JsonPropertyAttribute");
                    r[2] = TypeHelper.GetRequired(a2, "Required", "Default") ? CherryType.BigCherry : CherryType.Cherry;
                }
                else
                {
                    r[2] = CherryType.None;
                }
            }

            //opt-out for Serializable through NonSerializedAttribute
            if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
            {
                var a= TypeHelper.ReadAttribute<NonSerializedAttribute>(memberInfo);
                if (a==null)
                {
                    var a2 = TypeHelper.ReadAttribute<RequiredAttribute>(memberInfo);
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
                var a = TypeHelper.ReadAttribute<RequiredAttribute>(memberInfo);
                r[4]= a == null ? CherryType.Cherry : CherryType.BigCherry;
            }

            //opt-out
            if (methods== CherryPickingMethods.All)
            {
                r[0] = CherryType.Cherry;
            }

            return r.Max();

        }


    }
}
