using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Fonlow.Reflection
{
	public static class TypeHelper
	{
		static readonly Type typeOfNullableDefinition = typeof(Nullable<>);

		static readonly HashSet<string> arrayTypeFullNames = new HashSet<string>(
		new string[] {
			typeof(IEnumerable<>).FullName,
			typeof(IList<>).FullName,
			typeof(ICollection<>).FullName,
			typeof(IQueryable<>).FullName,
			typeof(IReadOnlyList<>).FullName,
			typeof(List<>).FullName,
			typeof(System.Collections.ObjectModel.Collection<>).FullName,
			typeof(IReadOnlyCollection<>).FullName,
		   typeof(System.Collections.ObjectModel.ObservableCollection<>).FullName,
	   }
	   );

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
		   "Decimal[]",
		   "Double[]",
		   "Single[]",
		   "String[]",
		   "UInt32[]",
		   "UInt64[]",
		   "Int16[]",
		   "UInt16[]",
	   }
	   );

		public static readonly List<string> TupleTypeNames = new List<string>(
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

		internal static bool GetRequired(Attribute a, string propertyName, string expectedValue)
		{
			var type = a.GetType();
			var publicProperties = type.GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public);
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
			return arrayTypeFullNames.Contains(type.FullName);//Could be using IsAssignableFrom() if many people need this.
		}

		public static bool IsSimpleListType(Type type)
		{
			return simpleListTypeNames.Contains(type.Name) && (IsSimpleType(type.GenericTypeArguments[0]) || type.GenericTypeArguments[0].IsEnum);
		}

		public static bool IsSimpleArrayType(Type type)
		{
			return simpleArrayTypeNames.Contains(type.Name);
		}

		public static int IsTuple(Type type)
		{
			return TupleTypeNames.IndexOf(type.FullName);
		}

		static readonly Type typeOfString = typeof(string);

		/// <summary>
		/// Primitive, or string, or .NET System. enum types
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		public static bool IsSimpleType(Type type)
		{
			return type.IsPrimitive || type.Equals(typeOfString) || (type.IsEnum && type.FullName.StartsWith("System."));
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

		public static bool IsStruct(Type type)
		{
			return (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
		}

		public static bool IsValueType(Type t)
		{
			return t.IsPrimitive || t.Equals(typeOfString) || t.IsEnum || t.Equals(typeof(decimal)) || t.Equals(typeof(DateTime)) || t.Equals(typeof(DateTimeOffset)) || t.Equals(typeof(DateOnly)) || t.IsValueType;
		}

		public static bool IsNullablePrimitive(Type t)
		{
			return (t.IsGenericType && typeOfNullableDefinition.Equals(t.GetGenericTypeDefinition()) && (t.GetGenericArguments()[0].IsPrimitive || t.GetGenericArguments()[0].IsValueType));
		}
	}

}
