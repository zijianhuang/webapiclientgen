using System;
using System.Reflection;
using System.ComponentModel;
using System.Linq;
using System.Collections.Generic;

namespace Fonlow.Reflection
{
    public static class TypeHelper
    {
        public static T ReadAttribute<T>(MemberInfo memberInfo) where T : Attribute
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

        public static T ReadAttribute<T>(Type type) where T : Attribute
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

        public static Attribute AttributeExists(Type type, string attributeTypeText)
        {
            if (type == null)
            {
                throw new ArgumentNullException("type");
            }

            return type.GetCustomAttributes(false).FirstOrDefault(d => d.GetType().FullName == attributeTypeText) as Attribute;
        }

        public static Attribute AttributeExists(MemberInfo memberInfo, string attributeTypeText)
        {
            if (memberInfo == null)
            {
                throw new ArgumentNullException("memberInfo");
            }

            return memberInfo.GetCustomAttributes(false).FirstOrDefault(d => d.GetType().FullName == attributeTypeText) as Attribute;

        }

        public static bool GetRequired(Attribute a, string propertyName, string expectedValue)
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

        public static bool IsArrayType(Type type)
        {
            return type == typeof(IEnumerable<>) ||
                   type == typeof(IList<>) ||
                   type == typeof(ICollection<>) ||
                   type == typeof(IQueryable<>) ||
                   type == typeof(IReadOnlyList<>) ||
                   type == typeof(List<>) ||
                   type == typeof(System.Collections.ObjectModel.Collection<>) ||
                   type == typeof(IReadOnlyCollection<>);
        }


        static readonly Type typeOfString = typeof(string);

        public static bool IsSimpleType(Type type)
        {
            return type.IsPrimitive || type.Equals(typeOfString);
        }

        public static bool IsComplexType(Type type)
        {
            return !IsSimpleType(type);
        }

        public static bool IsStringType(Type type)
        {
            return type.Equals(typeOfString);
        }

        public static bool IsClassOrStruct(Type type)
        {
            return type.IsClass || (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
        }


    }

}
