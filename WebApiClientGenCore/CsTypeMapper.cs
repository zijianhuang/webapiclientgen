using System;
using System.Collections.Generic;

namespace Fonlow.CodeDom.Web
{
	public static class CsTypeMapper
	{
		static readonly Dictionary<string, string> typeMap = new Dictionary<string, string>()
		{
			{typeof(int).FullName, "int"},
			{typeof(uint).FullName, "uint"},
			{typeof(long).FullName, "long"}, //JS supports 2^53-1, -(2^53 - 1), code gen should provide an option to make it BigInt
			{typeof(ulong).FullName, "ulong"},
			{typeof(short).FullName, "short"},
			{typeof(ushort).FullName, "ushort"},
			{typeof(byte).FullName, "byte"},
			{typeof(sbyte).FullName, "sbyte"}, //https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types
			{typeof(float).FullName, "float"},
			{typeof(double).FullName, "double"},
			{typeof(decimal).FullName, "decimal"}, //https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types

			{typeof(string).FullName, "string"},
			{typeof(char).FullName, "char"},
			{typeof(bool).FullName, "bool"}, //https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types

			{typeof(object).FullName, "object"},
		};

		public static bool IsSimpleSystemType(string typeFullName)
		{
			ArgumentNullException.ThrowIfNull(typeFullName);

			return typeMap.ContainsKey(typeFullName);
		}

		/// <summary>
		/// Map some runtime types to C# keywords or type alias.
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		/// <exception cref="ArgumentNullException"></exception>
		public static string MapToTsBasicType(Type type)
		{
			ArgumentNullException.ThrowIfNull(type);

			if (String.IsNullOrEmpty(type.FullName)) //Custom generic type has fullname empty at this point, since it is just a template defined in the assembly.
			{
				System.Diagnostics.Debug.WriteLine("In TypeMapper, The type is an argument of a generic definition: " + type.ToString());
				return type.ToString();
			}

			if (typeMap.TryGetValue(type.FullName, out string tsTypeName))
				return tsTypeName;

			return type.FullName;
		}
	}

}
