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

                    //todo:  memberMethod.TypeParameters
                    var currentIndent = o.IndentString;
                    o.IndentString += Constants.BasicIndent;
                    for (int i = 0; i < memberMethod.Statements.Count; i++)
                    {
                        GenerateCodeFromStatement(memberMethod.Statements[i], w, o);
                    }
                    o.IndentString = currentIndent;
                    w.WriteLine(o.IndentString+"}");
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

        public static void GenerateCodeFromStatement(CodeStatement e, TextWriter w, CodeGeneratorOptions o)
        {
            w.Write(o.IndentString);
            var assignStatement = e as CodeAssignStatement;
            if (assignStatement != null)
            {
                w.Write($"{o.IndentString}{assignStatement.Left} = {assignStatement.Right};");
                return;
            }

            //todo: CodeAttachEventStatement
            //todo: CodeCommentStatement
            var conditionStatement = e as CodeConditionStatement;
            if (conditionStatement != null)
            {
                var currentIndent = o.IndentString;
                w.Write("if (");
                GenerateCodeFromExpression(conditionStatement.Condition, w, o);
                w.WriteLine("){");

                var trueStatements = conditionStatement.TrueStatements.OfType<CodeStatement>().ToList();
                o.IndentString = currentIndent + o.IndentString;
                trueStatements.ForEach(d => GenerateCodeFromStatement(d, w, o));
                w.Write(currentIndent);
                w.WriteLine("}");
                if (conditionStatement.FalseStatements != null)
                {
                    w.WriteLine($"{currentIndent}{{");
                    var falseStatements = conditionStatement.FalseStatements.OfType<CodeStatement>().ToList();
                    falseStatements.ForEach(d => GenerateCodeFromStatement(d, w, o));
                }

                o.IndentString = currentIndent;
                return;
            }

            //todo: CodeExpressionStatement
            //todo: CodeGotoStatement, probably not to support
            //todo: CodeIterationStatement
            //todo: CodeLabeledStatement, probably not to support

            var methodReturnStatement = e as CodeMethodReturnStatement;
            if (methodReturnStatement != null)
            {
                w.Write($"{o.IndentString}return ");
                GenerateCodeFromExpression(methodReturnStatement.Expression, w, o);
                w.WriteLine($"{o.IndentString}}}");
                return;
            }

            //todo: CodeRemoveEventStatement

            var snippetStatement = e as CodeSnippetStatement;
            if (snippetStatement != null)
            {
                w.WriteLine($"{o.IndentString}{snippetStatement.Value}");
                return;
            }

            //todo: CodeThrowExceptionStatement
            //todo: CodeCatchFinallyStatement

            var variableDeclarationStatement = e as CodeVariableDeclarationStatement;
            if (variableDeclarationStatement != null)
            {
                w.Write($"var {variableDeclarationStatement.Name}");
                if (variableDeclarationStatement.Type != null)
                {
                    w.Write($":{TypeMapper.GetTypeOutput(variableDeclarationStatement.Type)}");
                }

                if (variableDeclarationStatement.InitExpression != null)
                {
                    w.Write(" = ");
                    GenerateCodeFromExpression(variableDeclarationStatement.InitExpression, w, o);
                }

                w.WriteLine(";");
            }

        }

        public static void GenerateCodeFromExpression(CodeExpression e, TextWriter w, CodeGeneratorOptions o)
        {
            if (e == null)
                return;

            var currentIndent = o.IndentString;
            w.Write(o.IndentString);
            var argumentReferenceExpression = e as CodeArgumentReferenceExpression;
            if (argumentReferenceExpression != null)
            {
                w.WriteLine(argumentReferenceExpression.ParameterName);
                return;
            }

            var arrayCreateExpression = e as CodeArrayCreateExpression;
            if (arrayCreateExpression != null)
            {//todo: later
             //   arrayCreateExpression.
            }

            //todo: CodeArrayIndexerExpression

            //todo: CodeBaseReferenceExpression
            //todo: CodeBinaryOperatorExpression
            //todo: CodeCastExpression, not to support?

            //todo: CodeDefaultValueExpression; ts not good?
            //todo: CodeDelegateCreateExpression no
            //todo: CodeDelegateInvokeExpression no
            //todo: CodeDirectionExpression;
            //todo: CodeEventReferenceExpression;

            var fieldReference = e as CodeFieldReferenceExpression;
            if (fieldReference != null)
            {
                w.Write(fieldReference.FieldName);
                GenerateCodeFromExpression(fieldReference.TargetObject, w, o);
                return;
            }

            //todo: CodeIndexerExpression

            var methodInvokeExpression = e as CodeMethodInvokeExpression;
            if (methodInvokeExpression != null)
            {
                GenerateCodeFromExpression(methodInvokeExpression.Method.TargetObject, w, o);
                w.Write(".");
                w.Write(methodInvokeExpression.Method.MethodName + "(");
                methodInvokeExpression.Parameters.OfType<CodeExpression>().ToList().ForEach(d => GenerateCodeFromExpression(d, w, o));
                w.WriteLine(")l");
                return;
            }

            var methodReferenceExpression = e as CodeMethodReferenceExpression;
            if (methodReferenceExpression != null)
            {
                CodeObjectHelper.GenerateCodeMethodExpression(methodReferenceExpression, w, o);
                return;
            }

            var objectCreateExpression = e as CodeObjectCreateExpression;
            if (objectCreateExpression != null)
            {
                w.Write($"{currentIndent}new {TypeMapper.GetTypeOutput(objectCreateExpression.CreateType)}(");
                objectCreateExpression.Parameters.OfType<CodeExpression>().ToList().ForEach(d => GenerateCodeFromExpression(d, w, o));
                w.WriteLine(")");
                return;
            }

            var parameterDeclarationExpression = e as CodeParameterDeclarationExpression;
            if (parameterDeclarationExpression != null)
            {
                w.Write($"{parameterDeclarationExpression.Name}: {TypeMapper.GetTypeOutput(parameterDeclarationExpression.Type)}");
                return;
            }

            var primitiveExpression = e as CodePrimitiveExpression;
            if (primitiveExpression != null)
            {
                w.Write(primitiveExpression.Value);
                return;
            }

            var propertyReferenceExpression = e as CodePropertyReferenceExpression;
            if (propertyReferenceExpression != null)
            {
                w.Write(propertyReferenceExpression.PropertyName + ".");
                GenerateCodeFromExpression(propertyReferenceExpression.TargetObject, w, o);
                return;
            }

            //todo: CodePropertySetValueReferenceExpression

            var snippetExpression = e as CodeSnippetExpression;
            if (snippetExpression != null)
            {
                w.Write(snippetExpression.Value);
                return;
            }

            var thisReferenceExpression = e as CodeThisReferenceExpression;
            if (thisReferenceExpression != null)
            {
                w.Write("this.");
                return;
            }

            //todo: CodeTypeOfExpression maybe not
            //todo: CodeTypeReferenceExpression

            var variableReferenceExpression = e as CodeVariableReferenceExpression;
            if (variableReferenceExpression != null)
            {
                w.Write(variableReferenceExpression.VariableName);
                return;
            }


        }


    }
}
