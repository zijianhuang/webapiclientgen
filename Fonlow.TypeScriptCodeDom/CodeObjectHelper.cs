using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace Fonlow.TypeScriptCodeDom
{
    internal sealed class Constants
    {
        public const string BasicIndent = "    ";
    }

    internal static class CodeObjectHelper
    {
        public static string GetTypeOfType(CodeTypeDeclaration typeDeclaration)
        {
            return typeDeclaration.IsEnum
                ? "enum"
                : typeDeclaration.IsInterface
                    ? "interface"
                    : "class";
        }

        public static string GetTypeParametersExpression(CodeTypeDeclaration typeDeclaration)
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

        public static string GetBaseTypeExpression(CodeTypeDeclaration typeDeclaration)
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

        public static void GenerateCodeTypeMember(CodeTypeMember e, TextWriter w, CodeGeneratorOptions o)
        {
            if (e == null)
                return;

            //todo: CodeMemberEvent


        }

        public static void GenerateCodeTypeField(CodeMemberField memberField, TextWriter w, CodeGeneratorOptions o, bool isEnum)
        {
        }


        public static void GenerateTypeMembers(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o)
        {
            if (typeDeclaration.IsEnum)
            {
                var enumMembers= typeDeclaration.Members.OfType<CodeTypeMember>().Select(ctm =>
                {
                    var codeMemberField = ctm as CodeMemberField;
                    System.Diagnostics.Trace.Assert(codeMemberField != null);
                    var enumMember = GetEnumMember(codeMemberField);
                    System.Diagnostics.Trace.Assert(!String.IsNullOrEmpty(enumMember));
                    return enumMember;
                }).ToArray();
                w.Write(String.Join(", ", enumMembers));
                return;
            }

            w.WriteLine();

            typeDeclaration.Members.OfType<CodeTypeMember>().ToList().ForEach(ctm =>
            {
                w.Write(o.IndentString);

                var codeMemberField = ctm as CodeMemberField;
                if (codeMemberField != null)
                {
                    w.WriteLine(GetCodeMemberFieldText(codeMemberField)+";");
                    return;
                }

                var codeMemberProperty = ctm as CodeMemberProperty;
                if (codeMemberProperty != null)
                {
                    w.WriteLine(GetCodeMemberPropertyText(codeMemberProperty)+";");
                    return;
                }

                var memberMethod = ctm as CodeMemberMethod;
                if (memberMethod != null)
                {
                    w.Write(memberMethod.Name + "(");
                    GenerateCodeParameterDeclarationExpressionList(memberMethod.Parameters.OfType<CodeParameterDeclarationExpression>(), w);
                    w.Write(")");
                    w.Write(": "+TypeMapper.GetTypeOutput(memberMethod.ReturnType));
                    w.Write("{");



                    w.WriteLine("}");
                }

            });

        }

        public static string GetEnumMember(CodeMemberField _member)
        {
            var initExpression = _member.InitExpression as CodePrimitiveExpression;
            return (initExpression == null) ? $"{_member.Name}" : $"{_member.Name}={initExpression.Value}";
        }

        public static string GetCodeMemberFieldText(CodeMemberField codeMemberField)
        {
            return RefineNameAndType(codeMemberField.Name, GetCodeTypeReferenceText(codeMemberField.Type));
        }

        public static string GetCodeTypeReferenceText(CodeTypeReference codeTypeReference)
        {
            return TypeMapper.GetTypeOutput(codeTypeReference);
        }

        public static string GetCodeMemberPropertyText(CodeMemberProperty codeMemberProperty)
        {
            return RefineNameAndType(codeMemberProperty.Name, GetCodeTypeReferenceText(codeMemberProperty.Type));
        }

        public static string RefineNameAndType(string name, string typeName)
        {
            if (typeName.EndsWith("?"))
            {
                var newName = name + "?";
                var newTypeName = typeName.TrimEnd('?');
                return $"{newName}: {newTypeName}";
            }

            return $"{name}: {typeName}";
        }

        public static void GenerateCodeParameterDeclarationExpressionList(IEnumerable<CodeParameterDeclarationExpression> parameterDeclarations, TextWriter w)
        {
            var pairs = parameterDeclarations.Select(d => $"{d.Name}: {TypeMapper.GetTypeOutput(d.Type)}");
            w.Write(String.Join(", ", pairs));
        }

        public static void GenerateCodeMethodExpression(CodeMethodReferenceExpression expression, TextWriter w, CodeGeneratorOptions o)
        {
            w.Write(o.IndentString);
            w.Write(expression.MethodName + "(");

            var arguments = expression.TypeArguments.OfType<CodeTypeReference>().Select(d => TypeMapper.GetTypeOutput(d));
            w.Write(String.Join(", ", arguments));
            w.Write(")");
            // expression.TargetObject
            //todo: not fully done yet
        }



    }
}
