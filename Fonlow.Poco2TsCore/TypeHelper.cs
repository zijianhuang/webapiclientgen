﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;

namespace Fonlow.Reflection
{
	public static class TypeHelper
	{
		static readonly Type typeOfNullableDefinition = typeof(Nullable<>);

		static readonly HashSet<string> simpleListTypeNames = new HashSet<string>(
		new string[] {
			typeof(IEnumerable<>).Name,
			typeof(IList<>).Name,
			typeof(ICollection<>).Name,
			typeof(IQueryable<>).Name,
			typeof(IReadOnlyList<>).Name,
			typeof(List<>).Name,
			typeof(System.Collections.ObjectModel.Collection<>).Name,
			typeof(IReadOnlyCollection<>).Name,
		   typeof(System.Collections.ObjectModel.ObservableCollection<>).Name,
	   }
	   );

		static readonly HashSet<string> simpleArrayTypeNames = new HashSet<string>(
		new string[] {
		   "Int32[]",
		   "Int64[]",
		   "Int128[]",
		   "Decimal[]",
		   "Double[]",
		   "Single[]",
		   "String[]",
		   "UInt32[]",
		   "UInt64[]",
		   "UInt128[]",
		   "Int16[]",
		   "UInt16[]",
	   }
	   );

		public static readonly IList<string> TupleTypeNames = new List<string>(
			new string[]
			{
				typeof(Tuple<>).FullName,
				typeof(Tuple<,>).FullName,
				typeof(Tuple<,,>).FullName,
				typeof(Tuple<,,,>).FullName,
				typeof(Tuple<,,,,>).FullName,
				typeof(Tuple<,,,,,>).FullName,
				typeof(Tuple<,,,,,,>).FullName,
				typeof(Tuple<,,,,,,,>).FullName //Tuple<T1, T2, T3, T4, T5, T6, T7, TRest>
			}
			);


		public static T ReadAttribute<T>(MemberInfo memberInfo) where T : Attribute
		{
			ArgumentNullException.ThrowIfNull(memberInfo);

			object[] objects = memberInfo.GetCustomAttributes(typeof(T), false);
			if (objects.Length == 1)
			{
				return (objects[0] as T);
			}
			return null;
		}

		public static T ReadAttribute<T>(Type type) where T : Attribute
		{
			ArgumentNullException.ThrowIfNull(type);

			object[] objects = type.GetCustomAttributes(typeof(T), false);
			if (objects.Length == 1)
			{
				return (objects[0] as T);
			}
			return null;
		}

		public static T[] ReadAttributes<T>(Type type) where T : Attribute
		{
			ArgumentNullException.ThrowIfNull(type);

			object[] objects = type.GetCustomAttributes(typeof(T), false);
			return objects.Cast<T>().ToArray();
		}

		/// <summary>
		/// If exists, return the attribute
		/// </summary>
		/// <param name="type"></param>
		/// <param name="attributeTypeText"></param>
		/// <returns></returns>
		/// <exception cref="ArgumentNullException"></exception>
		public static Attribute AttributeExists(Type type, string attributeTypeText)
		{
			ArgumentNullException.ThrowIfNull(type);

			return type.GetCustomAttributes(false).FirstOrDefault(d => d.GetType().FullName == attributeTypeText) as Attribute;
		}

		/// <summary>
		/// If exists, return the attribute.
		/// </summary>
		/// <param name="memberInfo"></param>
		/// <param name="attributeTypeText"></param>
		/// <returns></returns>
		/// <exception cref="ArgumentNullException"></exception>
		public static Attribute AttributeExists(MemberInfo memberInfo, string attributeTypeText)
		{
			ArgumentNullException.ThrowIfNull(memberInfo);

			return memberInfo.GetCustomAttributes(false).FirstOrDefault(d => d.GetType().FullName == attributeTypeText) as Attribute;

		}

		/// <summary>
		/// Check if a property of attribute contains expectedValue
		/// </summary>
		/// <param name="a"></param>
		/// <param name="propertyName"></param>
		/// <param name="expectedValue"></param>
		/// <returns></returns>
		/// <exception cref="InvalidOperationException"></exception>
		internal static bool GetRequired(Attribute a, string propertyName, string expectedValue)
		{
			Type type = a.GetType();
			PropertyInfo[] publicProperties = type.GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public);
			PropertyInfo expectedProperty = publicProperties.FirstOrDefault(d => d.Name == propertyName);
			if (expectedProperty == null)
				throw new InvalidOperationException($"Expected property {propertyName} does not exist in {a.GetType().FullName}");

			object propertyValue = expectedProperty.GetValue(a);
			if (propertyValue == null)
				return false;

			return propertyValue.ToString() == expectedValue;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="a"></param>
		/// <param name="propertyName"></param>
		/// <returns></returns>
		/// <exception cref="InvalidOperationException">If property does not exist</exception>
		public static object GetAttributePropertyValue(Attribute a, string propertyName)
		{
			Type type = a.GetType();
			PropertyInfo[] publicProperties = type.GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public);
			PropertyInfo expectedProperty = publicProperties.FirstOrDefault(d => d.Name == propertyName);
			if (expectedProperty == null)
				throw new InvalidOperationException($"Expected property {propertyName} does not exist in {a.GetType().FullName}");

			object propertyValue = expectedProperty.GetValue(a);
			return propertyValue;
		}

		/// <summary>
		/// Used only in API parameters, which generally use a small subset of IEnumerable drived types.
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		public static bool IsSimpleListType(Type type)
		{
			return simpleListTypeNames.Contains(type.Name) && (IsDotNetSimpleType(type.GenericTypeArguments[0]) || type.GenericTypeArguments[0].IsEnum);
		}

		/// <summary>
		/// Used only in API parameters.
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		public static bool IsSimpleArrayType(Type type)
		{
			return simpleArrayTypeNames.Contains(type.Name);
		}

		public static int IsTuple(Type type)
		{
			return TupleTypeNames.IndexOf(type.FullName);
		}

		public static bool IsIDictionaryType(Type type)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();
			if (genericArguments.Length == 2)
			{
				if (genericTypeDefinition == typeof(IDictionary<,>))
				{
					return true;
				}

				Type closedDictionaryType = typeof(IDictionary<,>).MakeGenericType(genericArguments[0], genericArguments[1]);
				if (closedDictionaryType.IsAssignableFrom(type))
				{
					return true;
				}
			}

			return false;
		}

		public static bool IsIEnumerableType(Type type)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();
			if (genericArguments.Length == 1)
			{
				if (genericTypeDefinition == typeof(IEnumerable<>))
				{
					return true;
				}

				Type closedEnumerableType = typeof(IEnumerable<>).MakeGenericType(genericArguments[0]);
				if (closedEnumerableType.IsAssignableFrom(type))
				{
					return true;
				}
			}

			return false;
		}

		static readonly Type typeOfString = typeof(string);

		/// <summary>
		/// Primitive, or string, or .NET System. enum types. User Defined enum types could be considered as complex type.
		/// This is different from Fonlow.TypeScriptCodeDom.CodeObjectHelper.IsComplextype.
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		public static bool IsDotNetSimpleType(Type type)
		{
			return type.IsPrimitive || type.Equals(typeOfString) || (type.IsEnum && type.FullName.StartsWith("System.", StringComparison.Ordinal));
		}

		public static bool IsComplexType(Type type)
		{
			return !IsDotNetSimpleType(type);
		}

		public static bool IsStringType(Type type)
		{
			return type.Equals(typeOfString);
		}

		public static bool IsClassOrStruct(Type type)
		{
			return type.IsClass || (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
		}

		public static bool IsStruct(Type type)
		{
			return (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
		}

		public static bool IsValueType(Type type)
		{
			return type.IsPrimitive || type.Equals(typeOfString) || type.IsEnum || type.Equals(typeof(decimal)) 
			|| type.Equals(typeof(DateTime)) || type.Equals(typeof(DateTimeOffset)) || type.Equals(typeof(DateOnly)) || type.IsValueType;
		}

		public static bool IsNullablePrimitive(Type type)
		{
			return (type.IsGenericType && typeOfNullableDefinition.Equals(type.GetGenericTypeDefinition()) 
			&& (type.GetGenericArguments()[0].IsPrimitive || type.GetGenericArguments()[0].IsValueType));
		}
	}

}
