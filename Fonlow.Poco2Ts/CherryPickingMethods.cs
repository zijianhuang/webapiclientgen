using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Reflection;
using System.ComponentModel.DataAnnotations;

namespace Fonlow.Poco2Ts
{
    /// <summary>
    /// Flagged options for cherry picking in various development operations.
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
        DataContract =1,

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
    }

    public enum CherryType
    {
        None,
        Cherry,
        BigCherry,
    }

    public static class CherryPicking
    {
        public static bool IsCherryType(Type type, CherryPickingMethods methods)
        {
            var r = false;

            if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
            {
                r= PropertyHelper.ReadAttribute<DataContractAttribute>(type) != null;
                if (methods == CherryPickingMethods.DataContract)
                    return r;
            }

            if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
            {
                r= PropertyHelper.ReadAttribute<SerializableAttribute>(type) != null;
                if (methods == CherryPickingMethods.Serializable)
                    return r;
            }

            if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
            {
                r= PropertyHelper.AttributeExists(type, "Newtonsoft.Json.JsonObjectAttribute") !=null;
                if (methods == CherryPickingMethods.NewtonsoftJson)
                    return r;
            }

            if ((methods & CherryPickingMethods.AspNet) == CherryPickingMethods.AspNet)//Asp.net seems not having good data annotation for cherry picking types
                return true;

            return true;
        }

        public static CherryType GetCherryMemberType(MemberInfo memberInfo, CherryPickingMethods methods)
        {
            var r = CherryType.Cherry; //CherryPickingMethods.All

            if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
            {
                var a = PropertyHelper.ReadAttribute<DataMemberAttribute>(memberInfo);
                if (a == null)
                    r= CherryType.None;
                else
                    r= a.IsRequired ? CherryType.BigCherry : CherryType.Cherry;

                if (methods == CherryPickingMethods.DataContract)
                    return r;
            }

            if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
            {
                var a= PropertyHelper.ReadAttribute<NonSerializedAttribute>(memberInfo);
                if (a==null)
                {
                    var a2 = PropertyHelper.ReadAttribute<RequiredAttribute>(memberInfo);
                    r=  a2 == null ? CherryType.Cherry : CherryType.BigCherry;
                }
                else
                {
                    r = CherryType.None;
                }

                if (methods == CherryPickingMethods.Serializable)
                    return r;
            }

            if ((methods & CherryPickingMethods.AspNet) == CherryPickingMethods.AspNet)
            {
                var a = PropertyHelper.ReadAttribute<RequiredAttribute>(memberInfo);
                r= a == null ? CherryType.Cherry : CherryType.BigCherry;
                if (methods == CherryPickingMethods.AspNet)
                    return r;
            }

            if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
            {
                var a =PropertyHelper.AttributeExists(memberInfo, "Newtonsoft.Json.JsonPropertyAttribute");
                if (a == null)
                {
                    r = CherryType.None;
                }
                else
                {
                    r= !PropertyHelper.GetRequired(a, "Required", "Default") ? CherryType.BigCherry : CherryType.Cherry;
                }

                if (methods == CherryPickingMethods.NewtonsoftJson)
                    return r;
            }

            return r;

        }

    }
}
