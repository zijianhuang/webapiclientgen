using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;
using System.Collections.Generic;

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

            var currentIndent = o.IndentString;
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
                return;
            }

            var methodReferenceExpression = e as CodeMethodReferenceExpression;
            if (methodReferenceExpression!=null)
            {
                CodeObjectHelper.GenerateCodeMethodExpression(methodReferenceExpression, w, o);
                return;
            }

            var objectCreateExpression = e as CodeObjectCreateExpression;
            if (objectCreateExpression!=null)
            {
                w.Write($"{currentIndent}new {TypeMapper.GetTypeOutput(objectCreateExpression.CreateType)}(");
                objectCreateExpression.Parameters.OfType<CodeExpression>().ToList().ForEach(d => GenerateCodeFromExpression(d, w, o));
                w.WriteLine(")");
                return;
            }

            var parameterDeclarationExpression = e as CodeParameterDeclarationExpression;
            if (parameterDeclarationExpression!=null)
            {
                w.Write($"{parameterDeclarationExpression.Name}: {TypeMapper.GetTypeOutput(parameterDeclarationExpression.Type)}");
                return;
            }

            var primitiveExpression = e as CodePrimitiveExpression;
            if (primitiveExpression!=null)
            {
                w.Write(primitiveExpression.Value);
                return;
            }

            var propertyReferenceExpression = e as CodePropertyReferenceExpression;
            if (propertyReferenceExpression!=null)
            {
                w.Write(propertyReferenceExpression.PropertyName + ".");
                GenerateCodeFromExpression(propertyReferenceExpression.TargetObject, w, o);
                return;
            }

            //todo: CodePropertySetValueReferenceExpression

            var snippetExpression = e as CodeSnippetExpression;
            if (snippetExpression!=null)
            {
                w.Write(snippetExpression.Value);
                return;
            }

            var thisReferenceExpression = e as CodeThisReferenceExpression;
            if (thisReferenceExpression!=null)
            {
                w.Write("this.");
                return;
            }

            //todo: CodeTypeOfExpression maybe not
            //todo: CodeTypeReferenceExpression

            var variableReferenceExpression = e as CodeVariableReferenceExpression;
            if (variableReferenceExpression!=null)
            {
                w.Write(variableReferenceExpression.VariableName);
                return;
            }


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
            var currentIndent = o.IndentString;
            var accessModifier = ((e.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export" : String.Empty;
            var typeOfType = CodeObjectHelper.GetTypeOfType(e);
            var name = e.Name;
            var typeParametersExpression = CodeObjectHelper.GetTypeParametersExpression(e);
            var baseTypesExpression = CodeObjectHelper.GetBaseTypeExpression(e);
            w.Write($"{o.IndentString}{accessModifier} {typeOfType} {name}{typeParametersExpression}{baseTypesExpression}{{");
            o.IndentString += Constants.BasicIndent;
            CodeObjectHelper.GenerateTypeMembers(e, w, o);
            w.WriteLine(currentIndent+"}");
            o.IndentString = currentIndent;
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

    }




}
