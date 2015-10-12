using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace TypescriptCodeDom.Common.TypeMapper
{
    public class TypescriptTypeMapper : ITypescriptTypeMapper
    {
        private readonly Dictionary<string, string> _typeMap;
        private readonly Regex _baseTypeRegex = new Regex(@"(?<TypeName>([a-zA-Z]+[0-9.]*)+)");
        private readonly Regex _arrayRegex = new Regex(@"(?<TypeName>[a-zA-Z0-9\.]+)(?<TypeArguments>[`0-9]*)(\[(?<JaggedRank>\]\[)*|(?<DimensionalRank>,)*\])+$");

        public TypescriptTypeMapper()
        {
            _typeMap = new Dictionary<string, string>();            

            AddAllKnownTypes();
        }

        private void AddAllKnownTypes()
        {
            _typeMap[typeof(int).FullName] = "number";
            _typeMap[typeof(uint).FullName] = "number";
            _typeMap[typeof(long).FullName] = "number";
            _typeMap[typeof(ulong).FullName] = "number";
            _typeMap[typeof(short).FullName] = "number";
            _typeMap[typeof(ushort).FullName] = "number";
            _typeMap[typeof(float).FullName] = "number";
            _typeMap[typeof(double).FullName] = "number";
            _typeMap[typeof(decimal).FullName] = "number";
            _typeMap[typeof(byte).FullName] = "number";
            _typeMap[typeof(string).FullName] = "string";
            _typeMap[typeof(Guid).FullName] = "string";
            _typeMap[typeof(bool).FullName] = "boolean";
            _typeMap[typeof(void).FullName] = "void";
            _typeMap[typeof(object).FullName] = "any";
            _typeMap[typeof(DateTime).FullName] = "Date";
            _typeMap[typeof(DateTimeOffset).FullName] = "Date";
            _typeMap["System.Collections.Generic.List"] = "Array";
            _typeMap["System.Collections.Generic.IList"] = "Array";
            _typeMap["System.Collections.Generic.IEnumerable"] = "Array";
            _typeMap["System.Collections.IEnumerable"] = "Array";
            _typeMap["System.Array"] = "Array";
        }

        public bool IsValidTypeForDerivation(CodeTypeReference type)
        {
            return !type.BaseType.Equals(typeof (object).FullName);
        }

        public string GetTypeOutput(CodeTypeReference type)
        {
            if (!_baseTypeRegex.IsMatch(type.BaseType))
                throw new ArgumentException("Type mismatch");

            var baseTypeName = _baseTypeRegex
                .Match(type.BaseType)
                .Groups["TypeName"]
                .Captures[0]
                .Value;


            string typeOutputString;

            if (baseTypeName.Contains("Nullable"))
            {
                typeOutputString = GetTypeArgument(type);
            }
            else
            {
                typeOutputString = TranslateType(baseTypeName);

                if (type.TypeArguments.Count > 0)
                    typeOutputString = AddTypeArguments(type, typeOutputString);
            }

            if (_arrayRegex.IsMatch(type.BaseType))
                typeOutputString = GetArrayType(type.BaseType, typeOutputString);
            else if (type.ArrayRank > 0)
                typeOutputString = GetArrayString(typeOutputString, type.ArrayRank);
                        
            return typeOutputString;
        }

        private string AddTypeArguments(CodeTypeReference type, string typeOutputString)
        {
            var typeArguments = type.TypeArguments
                .OfType<CodeTypeReference>()
                .Select(GetTypeOutput);

            return $"{typeOutputString}<{string.Join(", ", typeArguments)}>";
        }

        private string GetTypeArgument(CodeTypeReference type)
        {
            var typeArguments = type.TypeArguments
                .OfType<CodeTypeReference>()
                .Select(GetTypeOutput);

            return $"{string.Join(", ", typeArguments)}";
        }

        private string TranslateType(string baseTypeName)
        {
            return _typeMap.ContainsKey(baseTypeName) ? _typeMap[baseTypeName] : baseTypeName;
        }

        private string GetArrayType(string baseType, string actualTypeName)
        {
            var matches = _arrayRegex.Match(baseType);
            var jaggedcount = matches.Groups["JaggedRank"].Captures.Count;
            var dimensionalArrayCount = matches.Groups["DimensionalRank"].Captures.Count;
            if (jaggedcount > 0)
            {
                return GetArrayString(actualTypeName, jaggedcount + 1);
            }
            if (dimensionalArrayCount > 0)
            {
                return GetArrayString(actualTypeName, dimensionalArrayCount + 1);
            }

            return GetArrayString(actualTypeName, 1);
        }

        private string GetArrayString(string baseType, int count)
        {
            return count == 0 ? baseType : $"Array<{GetArrayString(baseType, count-1)}>";
        }
    }
}
