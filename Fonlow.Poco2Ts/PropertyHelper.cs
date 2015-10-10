using System;
using System.Reflection;
using System.ComponentModel;

namespace Fonlow.Poco2Ts
{
    internal static class PropertyHelper
    {
        internal static string GetPropertyDescription(PropertyInfo propertyInfo)
        {
            var a = ReadAttribute<DescriptionAttribute>(propertyInfo);
            return a == null ? null : a.Description;
        }

        internal static string SimplyQuoteString(string s)
        {
            if (s.Contains(" "))
            {
                return "\"" + s + "\"";
            }

            return s;
        }

        internal static string GetDisplayName(PropertyInfo propertyInfo)
        {
            var a = ReadAttribute<DisplayNameAttribute>(propertyInfo);
            return a == null ? propertyInfo.Name : a.DisplayName;
        }

        internal static T ReadAttribute<T>(MemberInfo memberInfo) where T : Attribute
        {
            if (memberInfo == null)
            {
                throw new ArgumentNullException("memberInfo");
            }

            object[] objects = memberInfo.GetCustomAttributes(typeof(T), false);
            if (objects.Length == 1)
            {
                return (objects[0] as T);
            }
            return null;
        }

        internal static T ReadAttribute<T>(Type type) where T : Attribute
        {
            if (type == null)
            {
                throw new ArgumentNullException("type");
            }

            object[] objects = type.GetCustomAttributes(typeof(T), false);
            if (objects.Length == 1)
            {
                return (objects[0] as T);
            }
            return null;
        }


    }

}
