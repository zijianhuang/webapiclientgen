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


        public static void GenerateTypeMembersAndCloseBracing(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o)
        {
            if (typeDeclaration.IsEnum)
            {
                var enumMembers = typeDeclaration.Members.OfType<CodeTypeMember>().Select(ctm =>
                 {
                     var codeMemberField = ctm as CodeMemberField;
                     System.Diagnostics.Trace.Assert(codeMemberField != null);
                     var enumMember = GetEnumMember(codeMemberField);
                     System.Diagnostics.Trace.Assert(!String.IsNullOrEmpty(enumMember));
                     return enumMember;
                 }).ToArray();
                w.Write(String.Join(", ", enumMembers));
                w.WriteLine("}");
                return;
            }

            w.WriteLine();

            var currentIndent = o.IndentString;
            o.IndentString += Constants.BasicIndent;

            typeDeclaration.Members.OfType<CodeTypeMember>().ToList().ForEach(ctm =>
            {
                w.Write(o.IndentString);

                var codeMemberField = ctm as CodeMemberField;
                if (codeMemberField != null)
                {
                    w.WriteLine(GetCodeMemberFieldText(codeMemberField) + ";");
                    return;
                }

                var codeMemberProperty = ctm as CodeMemberProperty;
                if (codeMemberProperty != null)
                {
                    w.WriteLine(GetCodeMemberPropertyText(codeMemberProperty) + ";");
                    return;
                }

                var memberMethod = ctm as CodeMemberMethod;
                if (memberMethod != null)
                {
                    var isCodeConstructor = memberMethod is CodeConstructor;
                    //todo: CodeEntryPointMethod
                    //todo: CodeTypeConstructor
                    w.WriteLine();
                    var methodName = isCodeConstructor ? typeDeclaration.Name : memberMethod.Name;
                    w.Write(o.IndentString +methodName + "(");
                    GenerateCodeParameterDeclarationExpressionList(memberMethod.Parameters.OfType<CodeParameterDeclarationExpression>(), w);
                    w.Write(")");

                    var returnTypeText = TypeMapper.GetTypeOutput(memberMethod.ReturnType);
                    if (!(isCodeConstructor || returnTypeText=="void" || memberMethod.ReturnType == null))
                    {
                        if (returnTypeText.Contains("?"))
                            w.Write(": any");
                        else
                            w.Write(": " + returnTypeText);
                    }

                    w.WriteLine("{");

                    //todo:  memberMethod.TypeParameters

                    GenerateCodeStatementCollection(memberMethod.Statements, w, o);

                    w.WriteLine(o.IndentString + "}");
                }

                //todo: CodeSnippetTypeMember
                //todo: CodeTypeDeclaration 

            });

            w.WriteLine();
            w.WriteLine(currentIndent + "}");
            o.IndentString = currentIndent;
        }

        static void GenerateCodeStatementCollection(CodeStatementCollection statements, TextWriter w, CodeGeneratorOptions o)
        {
            var currentIndent = o.IndentString;
            o.IndentString += Constants.BasicIndent;
            for (int i = 0; i < statements.Count; i++)
            {
                var statement = statements[i];
                if (!GenerateCodeSnippetStatement(statement as CodeSnippetStatement, w, o))
                {
                    w.Write(o.IndentString);
                    GenerateCodeFromStatement(statement, w, o);
                    w.WriteLine(";");
                }
            }
            o.IndentString = currentIndent;
        }

        #region text

        public static string GetEnumMember(CodeMemberField member)
        {
            var initExpression = member.InitExpression as CodePrimitiveExpression;
            return (initExpression == null) ? $"{member.Name}" : $"{member.Name}={initExpression.Value}";
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

        #endregion

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

        static bool GenerateCodeConditionStatement(CodeConditionStatement conditionStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (conditionStatement == null)
                return false;

            w.Write("if (");
            GenerateCodeFromExpression(conditionStatement.Condition, w, o);
            w.WriteLine("){");

            GenerateCodeStatementCollection(conditionStatement.TrueStatements, w, o);
            w.Write(o.IndentString);
            w.WriteLine("}");
            if (conditionStatement.FalseStatements != null)
            {
                w.WriteLine($"{o.IndentString}{{");
                GenerateCodeStatementCollection(conditionStatement.FalseStatements, w, o);
                w.Write(o.IndentString);
                w.WriteLine("}");
            }

            return true;
        }

        static bool GenerateCodeAssignStatement(CodeAssignStatement assignStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (assignStatement == null)
                return false;

            GenerateCodeFromExpression(assignStatement.Left, w, o);
            w.Write(" = ");
            GenerateCodeFromExpression(assignStatement.Right, w, o);
            return true;
        }

        public static void GenerateCodeFromStatement(CodeStatement e, TextWriter w, CodeGeneratorOptions o)
        {
            var currentIndent = o.IndentString;

            if (GenerateCodeAssignStatement(e as CodeAssignStatement, w, o))
                return;

            //todo: CodeAttachEventStatement
            //todo: CodeCommentStatement
            if (GenerateCodeConditionStatement(e as CodeConditionStatement, w, o))
                return;

            var expressStatement = e as CodeExpressionStatement;
            if (expressStatement != null)
            {
                GenerateCodeFromExpression(expressStatement.Expression, w, o);
                return;
            }
            //todo: CodeGotoStatement, probably not to support
            //todo: CodeIterationStatement
            //todo: CodeLabeledStatement, probably not to support

            var methodReturnStatement = e as CodeMethodReturnStatement;
            if (methodReturnStatement != null)
            {
                w.Write($"return ");
                GenerateCodeFromExpression(methodReturnStatement.Expression, w, o);
                o.IndentString = currentIndent;
                return;
            }

            //todo: CodeRemoveEventStatement

            //todo: CodeThrowExceptionStatement
            //todo: CodeCatchFinallyStatement

            if (GenerateCodeVariableDeclarationStatement(e as CodeVariableDeclarationStatement, w, o))
                return;

        }

        static bool GenerateCodeSnippetStatement(CodeSnippetStatement snippetStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (snippetStatement == null)
                return false;

            w.WriteLine();
            w.WriteLine(IndentLines(snippetStatement.Value, o.IndentString));
            return true;

        }

        static bool GenerateCodeVariableDeclarationStatement(CodeVariableDeclarationStatement variableDeclarationStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (variableDeclarationStatement == null)
                return false;

            w.Write(TypeMapper.GetTypeOutput(variableDeclarationStatement.Type) + " "+ variableDeclarationStatement.Name);
            //if (variableDeclarationStatement.Type != null)
            //{
            //    w.Write($":{TypeMapper.GetTypeOutput(variableDeclarationStatement.Type)}");
            //}

            if (variableDeclarationStatement.InitExpression != null)
            {
                w.Write(" = ");
                GenerateCodeFromExpression(variableDeclarationStatement.InitExpression, w, o);
            }

            return true;
        }


        static string IndentLines(string s, string indent)
        {
            if (String.IsNullOrEmpty(s))
                return String.Empty;

            var lines = s.Split(new string[] { "\r\n", "\n", "\r" }, StringSplitOptions.None);
            var indentedLines = lines.Select(d => indent + d);
            var ss = String.Join("\r\n", indentedLines);
            return ss;
        }

        public static void GenerateCodeFromExpression(CodeExpression e, TextWriter w, CodeGeneratorOptions o)
        {
            if (e == null)
                return;

            var currentIndent = o.IndentString;
            var argumentReferenceExpression = e as CodeArgumentReferenceExpression;
            if (argumentReferenceExpression != null)
            {
                w.Write(argumentReferenceExpression.ParameterName);
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
                GenerateCodeFromExpression(fieldReference.TargetObject, w, o);
                w.Write(".");
                w.Write(fieldReference.FieldName);
                return;
            }

            //todo: CodeIndexerExpression

            Action<CodeExpressionCollection> GenerateCodeExpressionCollection = (collection) =>
            {
                for (int i = 0; i < collection.Count; i++)
                {
                    if (i > 0)
                        w.Write(", ");
                    GenerateCodeFromExpression(collection[i], w, o);
                }

            };

            var methodInvokeExpression = e as CodeMethodInvokeExpression;
            if (methodInvokeExpression != null)
            {
                GenerateCodeFromExpression(methodInvokeExpression.Method.TargetObject, w, o);
                w.Write(".");
                w.Write(methodInvokeExpression.Method.MethodName + "(");
                GenerateCodeExpressionCollection(methodInvokeExpression.Parameters);
                w.Write(")");
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
                w.Write($"new {TypeMapper.GetTypeOutput(objectCreateExpression.CreateType)}(");
                GenerateCodeExpressionCollection(objectCreateExpression.Parameters);
                w.Write(")");
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
                if (primitiveExpression.Value.GetType() == typeOfString)
                    w.Write($"\"{primitiveExpression.Value}\"");
                else
                    w.Write(primitiveExpression.Value);

                return;
            }

            var propertyReferenceExpression = e as CodePropertyReferenceExpression;
            if (propertyReferenceExpression != null)
            {
                GenerateCodeFromExpression(propertyReferenceExpression.TargetObject, w, o);
                w.Write(".");
                w.Write(propertyReferenceExpression.PropertyName);
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
                w.Write("this");
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

        static readonly Type typeOfString = typeof(string);


    }
}
