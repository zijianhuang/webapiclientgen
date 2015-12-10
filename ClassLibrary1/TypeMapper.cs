using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;

namespace Fonlow.TypeScriptCodeDom
{
    /// <summary>
    /// Map CLR types to TS types
    /// </summary>
    public static class TypeMapper
    {
        static readonly Dictionary<string, string> typeMap = new Dictionary<string, string>()
        {
            {typeof(int).FullName, "number"},
            {typeof(uint).FullName, "number"},
            {typeof(long).FullName, "number"},
            {typeof(ulong).FullName, "number"},
            {typeof(short).FullName, "number"},
            {typeof(ushort).FullName, "number"},
            {typeof(float).FullName, "number"},
            {typeof(double).FullName, "number"},
            {typeof(decimal).FullName, "number"},
            {typeof(byte).FullName, "number"},
            {typeof(sbyte).FullName, "number"},
            {typeof(string).FullName, "string"},
            {typeof(char).FullName, "string"},
            {typeof(Guid).FullName, "string"},
            {typeof(bool).FullName, "boolean"},
            {typeof(void).FullName, "void"},
            {typeof(object).FullName, "any"},
            {typeof(DateTime).FullName, "Date"},
            {typeof(DateTimeOffset).FullName, "Date"},
            //TimeSpan is not so supported in Javascript
        };


        static bool IsArrayType(CodeTypeReference codeTypeReference)
        {
            return codeTypeReference.ArrayElementType != null;
        }

        static bool IsKeyValuePairType(string typeName)
        {
            return typeName.Contains("System.Collections.Generic.KeyValuePair");
        }

        static readonly string typeNameOfObject = typeof(object).FullName;

        internal static bool IsValidTypeForDerivation(CodeTypeReference type)
        {
            return !type.BaseType.Equals(typeNameOfObject);
        }

        public static string MapToTsBasicType(Type type)
        {
            if (type == null)
                throw new ArgumentNullException("type");
            string tsTypeName;

            if (typeMap.TryGetValue(type.FullName, out tsTypeName))
                return tsTypeName;

            return null;
        }

        /// <summary>
        /// Get the TypeScript text of the CodeTypeReference
        /// </summary>
        /// <param name="codeTypeReference">CodeTypeReference to a CLR type</param>
        /// <returns></returns>
        public static string MapCodeTypeReferenceToTsText(CodeTypeReference codeTypeReference)
        {
            if (codeTypeReference == null)
                return null;

            System.Diagnostics.Debug.WriteLine("type.BaseType: " + codeTypeReference.BaseType);
            System.Diagnostics.Debug.WriteLineIf(codeTypeReference.BaseType == "System.Void", "For this void type :" + codeTypeReference.ToString());
            if (IsArrayType(codeTypeReference))
            {
                var rank = codeTypeReference.ArrayRank;
                if (rank>1)
                {
                    return codeTypeReference.BaseType + new System.Text.StringBuilder().Insert(0, "[]", rank).ToString();
                }
                var elementTypeName = MapCodeTypeReferenceToTsText(codeTypeReference.ArrayElementType);
                return $"Array<{elementTypeName}>";
            }

            string tsTypeName;
            if (typeMap.TryGetValue(codeTypeReference.BaseType, out tsTypeName))
                return tsTypeName;


            if (codeTypeReference.TypeArguments.Count == 0)
                return codeTypeReference.BaseType;

            if (IsKeyValuePairType(codeTypeReference.BaseType))
            {
                System.Diagnostics.Debug.Assert(codeTypeReference.TypeArguments.Count == 2);
                var keyTypeReferenceText = MapCodeTypeReferenceToTsText(codeTypeReference.TypeArguments[0]);
                var valueTypeReferenceText = MapCodeTypeReferenceToTsText(codeTypeReference.TypeArguments[1]);
                return $"{{Key: {keyTypeReferenceText}, Value: {valueTypeReferenceText} }}";
            }

            if (codeTypeReference.BaseType.Contains("System.Collections.Generic.Dictionary"))
            {
                System.Diagnostics.Debug.Assert(codeTypeReference.TypeArguments.Count == 2);
                var keyTypeReferenceText = MapCodeTypeReferenceToTsText(codeTypeReference.TypeArguments[0]);
                var valueTypeReferenceText = MapCodeTypeReferenceToTsText(codeTypeReference.TypeArguments[1]);
                return $"{{[id: {keyTypeReferenceText}]: {valueTypeReferenceText} }}";
            }

            if (codeTypeReference.TypeArguments.Count>0)
            {
                var genericTypeName = codeTypeReference.BaseType.Substring(0, codeTypeReference.BaseType.IndexOf('`'));
                return $"{genericTypeName}<{MapCodeTypeReferenceCollectionToTsText(codeTypeReference.TypeArguments)}>";
            }

            System.Diagnostics.Trace.TraceWarning($"{codeTypeReference.BaseType} is mapped to any.");
            return "any";
        }

        /// <summary>
        /// Get text of CodeTypeReferenceCollection in CSV
        /// </summary>
        /// <param name="collection"></param>
        /// <returns></returns>
        public static string MapCodeTypeReferenceCollectionToTsText(CodeTypeReferenceCollection collection)
        {
            var arguments = collection.OfType<CodeTypeReference>().Select(d => MapCodeTypeReferenceToTsText(d));
            return String.Join(", ", arguments);
        }

    }
}
