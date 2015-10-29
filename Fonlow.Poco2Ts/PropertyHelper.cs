using System;
using System.Reflection;
using System.ComponentModel;
using System.Linq;

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

        internal static Attribute AttributeExists(Type type, string attributeTypeText)
        {
            if (type == null)
            {
                throw new ArgumentNullException("type");
            }

            //  return type.CustomAttributes.Any(d => d.AttributeType.FullName == attributeTypeText);
            return type.GetCustomAttributes(false).FirstOrDefault(d => d.GetType().FullName == attributeTypeText) as Attribute;
        }

        internal static Attribute AttributeExists(MemberInfo memberInfo, string attributeTypeText)
        {
            if (memberInfo == null)
            {
                throw new ArgumentNullException("memberInfo");
            }

            //    return memberInfo.CustomAttributes.Any(d => d.AttributeType.FullName == attributeTypeText);
            return memberInfo.GetCustomAttributes(false).FirstOrDefault(d => d.GetType().FullName == attributeTypeText) as Attribute;

        }

        internal static bool GetRequired(Attribute a, string propertyName, string expectedValue)
        {
            var type = a.GetType();
            var publicProperties= type.GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public);
            var expectedProperty = publicProperties.FirstOrDefault(d => d.Name == propertyName);
            if (expectedProperty == null)
                throw new InvalidOperationException($"Expected property {propertyName} does not exist in {a.GetType().FullName}");

            var propertyValue = expectedProperty.GetValue(a);
            if (propertyValue == null)
                return false;

            return propertyValue.ToString() == expectedValue;
        }


    }

}
