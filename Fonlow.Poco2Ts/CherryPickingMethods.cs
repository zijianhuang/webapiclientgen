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
    [Flags]
    public enum CherryPickingMethods
    {
        All = 0,
        DataContract =1,
        NewtonsoftJson = 2,
        Serializable =4,
        AspNet=8,
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
            if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
            {
                return PropertyHelper.ReadAttribute<DataContractAttribute>(type) != null;
            }

            if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
            {
                return PropertyHelper.ReadAttribute<SerializableAttribute>(type) != null;
            }

            if ((methods & CherryPickingMethods.AspNet) == CherryPickingMethods.AspNet)//Asp.net seems not having good data annotation for cherry picking types
                return true;

            if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
            {
                return PropertyHelper.AttributeExists(type, "Newtonsoft.Json.JsonObjectAttribute") !=null;
            }

            return true;
        }

        public static CherryType IsCherryMember(MemberInfo memberInfo, CherryPickingMethods methods)
        {
            if ((methods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract)
            {
                var a = PropertyHelper.ReadAttribute<DataMemberAttribute>(memberInfo);
                if (a == null)
                    return CherryType.None;

                return a.IsRequired ? CherryType.BigCherry : CherryType.Cherry;
            }

            if ((methods & CherryPickingMethods.Serializable) == CherryPickingMethods.Serializable)
            {
                var a= PropertyHelper.ReadAttribute<NonSerializedAttribute>(memberInfo);
                return a == null ? CherryType.Cherry : CherryType.BigCherry;
            }

            if ((methods & CherryPickingMethods.AspNet) == CherryPickingMethods.AspNet)
            {
                var a = PropertyHelper.ReadAttribute<RequiredAttribute>(memberInfo);
                return a == null ? CherryType.Cherry : CherryType.BigCherry;      
            }

            if ((methods & CherryPickingMethods.NewtonsoftJson) == CherryPickingMethods.NewtonsoftJson)
            {
                var a =PropertyHelper.AttributeExists(memberInfo, "Newtonsoft.Json.JsonPropertyAttribute");
                return a == null ? CherryType.Cherry : CherryType.BigCherry;
            }

            return  CherryType.Cherry;

        }

    }
}
