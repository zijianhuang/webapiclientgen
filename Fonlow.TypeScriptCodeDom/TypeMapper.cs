using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;

namespace Fonlow.TypeScriptCodeDom
{
    public static class TypeMapper
    {
        static readonly Dictionary<string, string> typeMap = new Dictionary<string, string>();

        static TypeMapper()
        {
            typeMap[typeof(int).FullName] = "number";
            typeMap[typeof(uint).FullName] = "number";
            typeMap[typeof(long).FullName] = "number";
            typeMap[typeof(ulong).FullName] = "number";
            typeMap[typeof(short).FullName] = "number";
            typeMap[typeof(ushort).FullName] = "number";
            typeMap[typeof(float).FullName] = "number";
            typeMap[typeof(double).FullName] = "number";
            typeMap[typeof(decimal).FullName] = "number";
            typeMap[typeof(byte).FullName] = "number";
            typeMap[typeof(string).FullName] = "string";
            typeMap[typeof(Guid).FullName] = "string";
            typeMap[typeof(bool).FullName] = "boolean";
            typeMap[typeof(void).FullName] = "void";
            typeMap[typeof(object).FullName] = "any";
            typeMap[typeof(DateTime).FullName] = "Date";
            typeMap[typeof(DateTimeOffset).FullName] = "Date";
            typeMap["System.Collections.IEnumerable"] = "Array";
            typeMap["System.Array"] = "Array";
        }

        static readonly string[] arrayGenericTypes = {
            "System.Collections.Generic.List",
            "System.Collections.Generic.IList",
            "System.Collections.Generic.IEnumerable" };

        static bool IsGenericArrayType(string typeName)
        {
            return arrayGenericTypes.Any(d => typeName.Contains(d));
        }

        static bool IsNullableType(string typeName)
        {
            return typeName.Contains("System.Nullable");
        }

        static bool IsArrayType(CodeTypeReference codeTypeReference)
        {
            return codeTypeReference.ArrayElementType != null;
        }

        static readonly string typeNameOfObject = typeof(object).FullName;

        public static bool IsValidTypeForDerivation(CodeTypeReference type)
        {
            return !type.BaseType.Equals(typeNameOfObject);
        }

        public static string GetTypeOutput(CodeTypeReference type)
        {
            System.Diagnostics.Debug.WriteLine("type.BaseType: " + type.BaseType);
            string tsTypeName;
            if (IsArrayType(type))//I am not sure why the type.BaseType is the same as the ArrayElementType, even if I gave it System.Array
            {
                var elementTypeName = GetTypeOutput(type.ArrayElementType);
                return $"Array<{elementTypeName}>"; //more consistence with IEnumerable
                //var arrayBaskets = string.Concat(Enumerable.Repeat("[]", type.ArrayRank));
                //return $"{type.ArrayElementType.BaseType}{arrayBaskets}";
            }

            if (typeMap.TryGetValue(type.BaseType, out tsTypeName))
                return tsTypeName;

            var genericTypeArgument = type.TypeArguments.OfType<CodeTypeReference>().FirstOrDefault();

            if (genericTypeArgument == null)
                return type.BaseType;

            if (IsGenericArrayType(type.BaseType))
            {
                System.Diagnostics.Debug.Assert(genericTypeArgument != null);
                return $"Array<{GetTypeOutput(genericTypeArgument)}>";
            }

            if (IsNullableType(type.BaseType))
            {
                System.Diagnostics.Debug.Assert(genericTypeArgument != null);
                return GetTypeOutput(genericTypeArgument) + "?";
            }

            return $"{type.BaseType}<{GetTypeOutput(genericTypeArgument)}>";
        }


    }
}
