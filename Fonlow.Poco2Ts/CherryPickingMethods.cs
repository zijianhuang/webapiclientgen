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

    /// <summary>
    /// How significant the cherry is
    /// </summary>
    public enum CherryType
    {
        None,

        Cherry,
        BigCherry,
    }

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
                r1= PropertyHelper.ReadAttribute<DataContractAttribute>(type) != null;
            }

            if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
            {
                r2= PropertyHelper.AttributeExists(type, "Newtonsoft.Json.JsonObjectAttribute") !=null;
            }

            if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
            {
                r3= PropertyHelper.ReadAttribute<SerializableAttribute>(type) != null;
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

            if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
            {
                var a = PropertyHelper.ReadAttribute<DataMemberAttribute>(memberInfo);
                if (a == null)
                    r[1]= CherryType.None;
                else
                    r[1]= a.IsRequired ? CherryType.BigCherry : CherryType.Cherry;

            }

            if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
            {
                var a =PropertyHelper.AttributeExists(memberInfo, "Newtonsoft.Json.JsonPropertyAttribute");
                if (a == null)
                {
                    r[2] = CherryType.None;
                }
                else
                {
                    r[2]= !PropertyHelper.GetRequired(a, "Required", "Default") ? CherryType.BigCherry : CherryType.Cherry;
                }
            }

            if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
            {
                var a= PropertyHelper.ReadAttribute<NonSerializedAttribute>(memberInfo);
                if (a==null)
                {
                    var a2 = PropertyHelper.ReadAttribute<RequiredAttribute>(memberInfo);
                    r[3]=  a2 == null ? CherryType.Cherry : CherryType.BigCherry;
                }
                else
                {
                    r[3] = CherryType.None;
                }
            }

            if ((methods & CherryPickingMethods.AspNet) == CherryPickingMethods.AspNet)
            {
                var a = PropertyHelper.ReadAttribute<RequiredAttribute>(memberInfo);
                r[4]= a == null ? CherryType.Cherry : CherryType.BigCherry;
            }

            if (methods== CherryPickingMethods.All)
            {
                r[0] = CherryType.Cherry;
            }

            return r.Max();

        }

    }
}
