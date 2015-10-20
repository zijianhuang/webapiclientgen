using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;

namespace Fonlow.TypeScriptCodeDom
{
    public class TsCodeGenerator : ICodeGenerator
    {
        public string CreateEscapedIdentifier(string value)
        {
            return KeywordHandler.CreateEscapedIdentifier(value);
        }

        public string CreateValidIdentifier(string value)
        {
            return KeywordHandler.CreateValidIdentifier(value);
        }

        public void GenerateCodeFromCompileUnit(CodeCompileUnit e, TextWriter w, CodeGeneratorOptions o)
        {
            e.Namespaces.OfType<CodeNamespace>().ToList().ForEach(n =>
            {
                GenerateCodeFromNamespace(n, w, o);
                w.WriteLine();
            });
        }

        public void GenerateCodeFromExpression(CodeExpression e, TextWriter w, CodeGeneratorOptions o)
        {
            throw new NotImplementedException();
        }

        public void GenerateCodeFromNamespace(CodeNamespace e, TextWriter w, CodeGeneratorOptions o)
        {
            w.WriteLine($"module {e.Name}{{");

            e.Types.OfType<CodeTypeDeclaration>().ToList().ForEach(t =>
            {
                GenerateCodeFromType(t, w, o);
                w.WriteLine();
            });
            //todo: later e.Imports.

            w.WriteLine($"}}");
        }

        public void GenerateCodeFromStatement(CodeStatement e, TextWriter w, CodeGeneratorOptions o)
        {
            throw new NotImplementedException();
        }

        public void GenerateCodeFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
        {
            var accessModifier = ((e.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export" : String.Empty;
            var typeOfType = GetTypeOfType(e);
            var name = e.Name;
            var typeParametersExpression = GetTypeParametersExpression(e);
            var baseTypesExpression = GetBaseTypeExpression(e);
            var membersLines = GetTypeMembersLines(e);

            w.WriteLine($"{o.IndentString}{accessModifier} {typeOfType} {name}{typeParametersExpression}{baseTypesExpression}{{");
            w.Write($"{o.IndentString}{o.IndentString}");
            var separator = e.IsEnum ? "," : ";";
            w.WriteLine(String.Join($"{separator}{Environment.NewLine}{o.IndentString}{o.IndentString}", membersLines));
            w.WriteLine($"{o.IndentString}}}");
            w.WriteLine();
        }

        public string GetTypeOutput(CodeTypeReference type)
        {
            return TypeMapper.GetTypeOutput(type);
        }

        public bool IsValidIdentifier(string value)
        {
            return KeywordHandler.IsValidIdentifier(value);
        }

        public bool Supports(GeneratorSupport supports)
        {
            return (supports & supported) != 0;
        }

        const GeneratorSupport supported = GeneratorSupport.ArraysOfArrays
            | GeneratorSupport.MultidimensionalArrays
            | GeneratorSupport.TryCatchStatements
            | GeneratorSupport.DeclareValueTypes
            | GeneratorSupport.DeclareEnums
            | GeneratorSupport.GotoStatements
            | GeneratorSupport.StaticConstructors
            | GeneratorSupport.DeclareInterfaces
            | GeneratorSupport.DeclareDelegates
            | GeneratorSupport.DeclareEvents
            | GeneratorSupport.NestedTypes
            | GeneratorSupport.MultipleInterfaceMembers
            | GeneratorSupport.ComplexExpressions
            | GeneratorSupport.PartialTypes
            | GeneratorSupport.GenericTypeReference
            | GeneratorSupport.GenericTypeDeclaration
            | GeneratorSupport.DeclareIndexerProperties;

        public void ValidateIdentifier(string value)
        {
            KeywordHandler.ValidateIdentifier(value);
        }

        static string GetTypeOfType(CodeTypeDeclaration typeDeclaration)
        {
            return typeDeclaration.IsEnum
                ? "enum"
                : typeDeclaration.IsInterface
                    ? "interface"
                    : "class";
        }

        static string GetTypeParametersExpression(CodeTypeDeclaration typeDeclaration)
        {
            if (typeDeclaration.TypeParameters.Count == 0)
                return string.Empty;

            var parameterNames = typeDeclaration.TypeParameters.OfType<CodeTypeParameter>().Select(d =>
            {
                var typeParameterConstraint = string.Empty;
                if (d.Constraints.Count > 0)
                {
                    var constraint = d.Constraints.OfType<CodeTypeReference>().First();
                    var type = TypeMapper.GetTypeOutput(constraint);
                    typeParameterConstraint = $" extends {type}";
                }


                return $"{d.Name}{typeParameterConstraint}";
            }).ToArray();

            return parameterNames.Length == 0 ? String.Empty : $"<{String.Join(", ", parameterNames)}>";
        }

        static string GetBaseTypeExpression(CodeTypeDeclaration typeDeclaration)
        {
            var baseTypes = typeDeclaration.BaseTypes
                .OfType<CodeTypeReference>()
                .Where(reference => TypeMapper.IsValidTypeForDerivation(reference))
                .Select(reference => TypeMapper.GetTypeOutput(reference))
                .ToList();
            var baseTypesExpression = string.Empty;
            if (baseTypes.Any() && !typeDeclaration.IsEnum)
            {
                return $" extends {string.Join(",", baseTypes)}";
            }

            return String.Empty;
        }

        static string[] GetTypeMembersLines(CodeTypeDeclaration typeDeclaration)
        {
            if (typeDeclaration.IsEnum)
            {
                return typeDeclaration.Members.OfType<CodeTypeMember>().Select(ctm =>
                {
                    var codeMemberField = ctm as CodeMemberField;
                    System.Diagnostics.Trace.Assert(codeMemberField != null);
                    var enumMember = GetEnumMember(codeMemberField);
                    System.Diagnostics.Trace.Assert(!String.IsNullOrEmpty(enumMember));
                    return enumMember;
                    // return GetCodeMemberFieldText(codeMemberField);
                }).ToArray();
            }

            var membersLines = typeDeclaration.Members.OfType<CodeTypeMember>().Select(ctm =>
            {
                var codeMemberField = ctm as CodeMemberField;
                if (codeMemberField != null)
                {
                    return GetCodeMemberFieldText(codeMemberField);
                }

                var codeMemberProperty = ctm as CodeMemberProperty;
                if (codeMemberProperty != null)
                {
                    return GetCodeMemberPropertyText(codeMemberProperty);
                }

                return string.Empty;
            }).ToArray();
            return membersLines;
        }

        static string GetEnumMember(CodeMemberField _member)
        {
            var initExpression = _member.InitExpression as CodePrimitiveExpression;
            return (initExpression == null) ? $"{_member.Name}" : $"{_member.Name}={initExpression.Value}";
        }

        static string GetCodeMemberFieldText(CodeMemberField codeMemberField)
        {
            return RefineNameAndType(codeMemberField.Name, GetCodeTypeReferenceText(codeMemberField.Type));
        }

        static string GetCodeTypeReferenceText(CodeTypeReference codeTypeReference)
        {
            return TypeMapper.GetTypeOutput(codeTypeReference);
        }

        static string GetCodeMemberPropertyText(CodeMemberProperty codeMemberProperty)
        {
            return RefineNameAndType(codeMemberProperty.Name, GetCodeTypeReferenceText(codeMemberProperty.Type));
        }

        static string RefineNameAndType(string name, string typeName)
        {
            if (typeName.EndsWith("?"))
            {
                var newName = name + "?";
                var newTypeName = typeName.TrimEnd('?');
                return $"{newName}: {newTypeName}";
            }

            return $"{name}: {typeName}";
        }
    }




}
