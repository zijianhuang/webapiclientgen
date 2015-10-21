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
            if (e == null)
                return;

            w.Write(o.IndentString);
            var argumentReferenceExpression = e as CodeArgumentReferenceExpression;
            if (argumentReferenceExpression != null)
            {
                w.WriteLine(argumentReferenceExpression.ParameterName);
                return;
            }

            var arrayCreateExpression = e as CodeArrayCreateExpression;
            if (arrayCreateExpression!=null)
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
            if (fieldReference!=null)
            {
                w.Write(fieldReference.FieldName);
                GenerateCodeFromExpression(fieldReference.TargetObject, w, o);
                return;
            }

            //todo: CodeIndexerExpression

            var methodInvokeExpression = e as CodeMethodInvokeExpression;
            if (methodInvokeExpression!=null)
            {
                GenerateCodeFromExpression(methodInvokeExpression.Method.TargetObject, w, o);
                w.Write(".");
                w.Write(methodInvokeExpression.Method.MethodName + "(");
                methodInvokeExpression.Parameters.OfType<CodeExpression>().ToList().ForEach(d => GenerateCodeFromExpression(d, w, o));
                w.WriteLine(")l");
            }


        }

        static void GenerateCodeMethodExpression(CodeMethodReferenceExpression expression, TextWriter w, CodeGeneratorOptions o)
        {
            w.Write(o.IndentString);
            w.Write(expression.MethodName + "(");

            var arguments = expression.TypeArguments.OfType<CodeTypeReference>().Select(d => TypeMapper.GetTypeOutput(d));
            w.Write(String.Join(", ", arguments));
            w.Write(")");
           // expression.TargetObject
           //todo: not fully done yet
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
            w.Write(o.IndentString);
            var assignStatement = e as CodeAssignStatement;
            if (assignStatement!=null)
            {
                w.Write($"{o.IndentString}{assignStatement.Left} = {assignStatement.Right};");
                return;
            }

            //todo: CodeAttachEventStatement
            //todo: CodeCommentStatement
            var conditionStatement = e as CodeConditionStatement;
            if (conditionStatement!=null)
            {
                var currentIndent = o.IndentString;
                w.Write("if (");
                GenerateCodeFromExpression(conditionStatement.Condition, w, o);
                w.WriteLine("){");

                var trueStatements = conditionStatement.TrueStatements.OfType<CodeStatement>().ToList();
                o.IndentString = currentIndent+o.IndentString;
                trueStatements.ForEach(d => GenerateCodeFromStatement(d, w, o));
                w.Write(currentIndent);
                w.WriteLine("}");
                if (conditionStatement.FalseStatements!=null)
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
            if (methodReturnStatement!=null)
            {
                w.Write($"{o.IndentString}return ");
                GenerateCodeFromExpression(methodReturnStatement.Expression, w, o);
                w.WriteLine($"{o.IndentString}}}");
                return;
            }

            //todo: CodeRemoveEventStatement

            var snippetStatement = e as CodeSnippetStatement;
            if (snippetStatement!=null)
            {
                w.WriteLine($"{o.IndentString}{snippetStatement.Value}");
                return;
            }

            //todo: CodeThrowExceptionStatement
            //todo: CodeCatchFinallyStatement

            var variableDeclarationStatement = e as CodeVariableDeclarationStatement;
            if (variableDeclarationStatement!=null)
            {
                w.Write($"var {variableDeclarationStatement.Name}");
                if (variableDeclarationStatement.Type!=null)
                {
                    w.Write($":{TypeMapper.GetTypeOutput(variableDeclarationStatement.Type)}");
                }

                if (variableDeclarationStatement.InitExpression!=null)
                {
                    w.Write(" = ");
                    GenerateCodeFromExpression(variableDeclarationStatement.InitExpression, w, o);
                }

                w.WriteLine(";");
            }

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
