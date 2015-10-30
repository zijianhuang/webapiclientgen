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
            if (type == null)
                return null;

            System.Diagnostics.Debug.WriteLine("type.BaseType: " + type.BaseType);
            System.Diagnostics.Debug.WriteLineIf(type.BaseType == "System.Void", "For this void type :" + type.ToString());
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


            if (type.TypeArguments.Count == 0)
                return type.BaseType;

            if (IsGenericArrayType(type.BaseType))
            {
                System.Diagnostics.Trace.Assert(type.TypeArguments.Count == 1);
                return $"Array<{GetTypeOutput(type.TypeArguments[0])}>";
            }

            if (IsNullableType(type.BaseType))
            {
                System.Diagnostics.Trace.Assert(type.TypeArguments.Count == 1);
                return GetTypeOutput(type.TypeArguments[0]);// + "?"; in javascript all is optional anyway.
            }

            var genericBaseTypeName = type.BaseType.Contains("`1") ? type.BaseType.Replace("`1", null) : type.BaseType;  //.NET runtime gives `1 suffix, but TS does not need it.

            return $"{genericBaseTypeName}<{GetCodeTypeReferenceCollection(type.TypeArguments)}>";
        }


        public static string GetCodeTypeReferenceCollection(CodeTypeReferenceCollection collection)
        {
            var arguments = collection.OfType<CodeTypeReference>().Select(d => GetTypeOutput(d));
            return String.Join(", ", arguments);
        }


    }
}
