using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;
using System.Diagnostics;

namespace Fonlow.TypeScriptCodeDom
{
    public static class CodeObjectHelper
    {
        const string BasicIndent = "    ";

        #region public GenerateCodeFromXXX

        internal static void GenerateCodeFromNamespace(CodeNamespace e, TextWriter w, CodeGeneratorOptions o, bool asModule)
        {
            WriteCodeCommentStatementCollection(e.Comments, w, o);

            var refinedNamespaceText = e.Name.Replace('.', '_');
            var namespaceOrModule = asModule ? "export namespace" : "namespace";
            w.WriteLine($"{namespaceOrModule} {refinedNamespaceText} {{");

            for (int i = 0; i < e.Imports.Count; i++)
            {
                var ns = e.Imports[i];
                var nsText = ns.Namespace;
                var alias = nsText.Replace('.', '_');
                w.WriteLine($"{o.IndentString}import {alias} = {nsText};");
            }

            e.Types.OfType<CodeTypeDeclaration>().ToList().ForEach(t =>
            {
                GenerateCodeFromType(t, w, o);
                w.WriteLine();
            });

            w.WriteLine($"}}");
        }

        internal static void GenerateCodeFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
        {
            WriteCodeCommentStatementCollection(e.Comments, w, o);

            GenerateCodeFromAttributeDeclarationCollection(e.CustomAttributes, w, o);

            var accessModifier = ((e.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export " : String.Empty;
            var typeOfType = CodeObjectHelper.GetTypeOfType(e);
            var name = e.Name;
            var typeParametersExpression = CodeObjectHelper.GetTypeParametersExpression(e);
            var baseTypesExpression = CodeObjectHelper.GetBaseTypeExpression(e);
            w.Write($"{o.IndentString}{accessModifier}{typeOfType} {name}{typeParametersExpression}{baseTypesExpression} {{");
            WriteTypeMembersAndCloseBracing(e, w, o);
        }

        static void GenerateCodeFromAttributeDeclaration(CodeAttributeDeclaration e, TextWriter w, CodeGeneratorOptions o)
        {
            if (e.Arguments.Count> 0)
            {
                throw new NotImplementedException("Not yet support decorator with arguments");
            }

            w.WriteLine($"{o.IndentString}@{e.Name}()");
        }

        static void GenerateCodeFromAttributeDeclarationCollection(CodeAttributeDeclarationCollection e, TextWriter w, CodeGeneratorOptions o)
        {
            if (e.Count == 0)
                return;

            for (int i = 0; i < e.Count; i++)
            {
                GenerateCodeFromAttributeDeclaration(e[i], w, o);
            }
        }

        internal static void GenerateCodeFromExpression(CodeExpression e, TextWriter w, CodeGeneratorOptions o)
        {
            if (e == null)
                return;
           
            var argumentReferenceExpression = e as CodeArgumentReferenceExpression;
            if (argumentReferenceExpression != null)
            {
                w.Write(argumentReferenceExpression.ParameterName);
                return;
            }

            if (WriteCodeArrayCreateExpression(e as CodeArrayCreateExpression, w, o))
                return;

            if (WriteCodeArrayIndexerExpression(e as CodeArrayIndexerExpression, w, o))
                return;

            var baseReferenceExpression = e as CodeBaseReferenceExpression;
            if (baseReferenceExpression != null)
            {
                w.Write("super");
                return;
            }

            if (WriteCodeBinaryOperatorExpression(e as CodeBinaryOperatorExpression, w, o))
                return;

            if (WriteCodeFieldReferenceExpression(e as CodeFieldReferenceExpression, w, o))
                return;

            if (WriteCodeIndexerExpression(e as CodeIndexerExpression, w, o))
                return;

            if (WriteCodeMethodInvokeExpression(e as CodeMethodInvokeExpression, w, o))
                return;


            var methodReferenceExpression = e as CodeMethodReferenceExpression;
            if (methodReferenceExpression != null)
            {
                WriteCodeMethodReferenceExpression(methodReferenceExpression, w, o);
                return;
            }

            if (WriteCodeObjectCreateExpression(e as CodeObjectCreateExpression, w, o))
                return;

            var parameterDeclarationExpression = e as CodeParameterDeclarationExpression;
            if (parameterDeclarationExpression != null)
            {
                w.Write($"{parameterDeclarationExpression.Name}: {TypeMapper.MapCodeTypeReferenceToTsText(parameterDeclarationExpression.Type)}");
                return;
            }

            if (WriteCodePrimitiveExpression(e as CodePrimitiveExpression, w))
                return;


            if (WriteCodePropertyReferenceExpression(e as CodePropertyReferenceExpression, w, o))
                return;

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

            var typeOfExpression = e as CodeTypeOfExpression;
            if (typeOfExpression != null)
            {
                w.Write("typeof " + TypeMapper.MapCodeTypeReferenceToTsText(typeOfExpression.Type));
                return;
            }

            var typeReferenceExpression = e as CodeTypeReferenceExpression;
            if (typeReferenceExpression != null)
            {
                w.Write(TypeMapper.MapCodeTypeReferenceToTsText(typeReferenceExpression.Type));
                return;
            }

            var variableReferenceExpression = e as CodeVariableReferenceExpression;
            if (variableReferenceExpression != null)
            {
                w.Write(variableReferenceExpression.VariableName);
                return;
            }

            Trace.TraceWarning($"CodeExpression not supported: {e.ToString()}");
        }

        internal static void GenerateCodeFromStatement(CodeStatement e, TextWriter w, CodeGeneratorOptions o)
        {
            if (WriteCodeAssignStatement(e as CodeAssignStatement, w, o))
                return;

            //CodeAttachEventStatement  TS does not seem to support, Js DOM event better done with code snippet.

            if (WriteCodeCommentStatement(e as CodeCommentStatement, w, o))
                return;

            if (WriteCodeConditionStatement(e as CodeConditionStatement, w, o))
                return;

            if (WriteCodeExpressionStatement(e as CodeExpressionStatement, w, o))
                return;


            //todo: CodeGotoStatement, probably not to support

            if (WriteCodeIterationStatement(e as CodeIterationStatement, w, o))
                return;

            //todo: CodeLabeledStatement, probably not to support

            if (WriteCodeMethodReturnStatement(e as CodeMethodReturnStatement, w, o))
                return;

            //todo: CodeRemoveEventStatement not to support

            if (WriteCodeThrowExceptionStatement(e as CodeThrowExceptionStatement, w, o))
                return;

            if (WriteCodeTryCatchFinallyStatement(e as CodeTryCatchFinallyStatement, w, o))
                return;

            if (WriteCodeVariableDeclarationStatement(e as CodeVariableDeclarationStatement, w, o))
                return;

            Trace.TraceWarning($"CodeStatement not supported: {e.ToString()}");
        }

        #endregion





        #region WriteCodeXXXX

        static bool WriteCodeArrayIndexerExpression(CodeArrayIndexerExpression arrayIndexerExpression, TextWriter w, CodeGeneratorOptions o)
        {
            if (arrayIndexerExpression == null)
                return false;

            GenerateCodeFromExpression(arrayIndexerExpression.TargetObject, w, o);
            for (int i = 0; i < arrayIndexerExpression.Indices.Count; i++)
            {
                w.Write("[");
                GenerateCodeFromExpression(arrayIndexerExpression.Indices[i], w, o);
                w.Write("]");
            }

            return true;
        }

        static bool WriteCodeFieldReferenceExpression(CodeFieldReferenceExpression fieldReferenceExpression, TextWriter w, CodeGeneratorOptions o)
        {
            if (fieldReferenceExpression == null)
                return false; 

             GenerateCodeFromExpression(fieldReferenceExpression.TargetObject, w, o);
            w.Write(".");
            w.Write(fieldReferenceExpression.FieldName);
            return true;
        }

        static bool WriteCodeObjectCreateExpression(CodeObjectCreateExpression objectCreateExpression, TextWriter w, CodeGeneratorOptions o)
        {
            if (objectCreateExpression == null)
                return false;

            w.Write($"new {TypeMapper.MapCodeTypeReferenceToTsText(objectCreateExpression.CreateType)}(");
            WriteCodeExpressionCollection(objectCreateExpression.Parameters, w, o);
            w.Write(")");
            return true;
        }

        static bool WriteCodePrimitiveExpression(CodePrimitiveExpression primitiveExpression, TextWriter w)
        {
            if (primitiveExpression == null)
                return false;

            if (primitiveExpression.Value.GetType() == typeOfString)
                w.Write($"\"{primitiveExpression.Value}\"");
            else
                w.Write(primitiveExpression.Value);

            return true;
        }

        static bool WriteCodePropertyReferenceExpression(CodePropertyReferenceExpression propertyReferenceExpression, TextWriter w, CodeGeneratorOptions o)
        {
            if (propertyReferenceExpression == null)
                return false;

            GenerateCodeFromExpression(propertyReferenceExpression.TargetObject, w, o);
            w.Write(".");
            w.Write(propertyReferenceExpression.PropertyName);
            return true;
        }

        static bool WriteCodeMethodInvokeExpression(CodeMethodInvokeExpression methodInvokeExpression, TextWriter w, CodeGeneratorOptions o)
        {
            if (methodInvokeExpression == null)
                return false;

            GenerateCodeFromExpression(methodInvokeExpression.Method.TargetObject, w, o);
            w.Write(".");
            w.Write(methodInvokeExpression.Method.MethodName + "(");
            WriteCodeExpressionCollection(methodInvokeExpression.Parameters, w, o);
            w.Write(")");
            return true;
        }

        static bool WriteCodeIndexerExpression(CodeIndexerExpression indexerExpression, TextWriter w, CodeGeneratorOptions o)
        {
            if (indexerExpression == null)
                return false;

            GenerateCodeFromExpression(indexerExpression.TargetObject, w, o);
            for (int i = 0; i < indexerExpression.Indices.Count; i++)
            {
                w.Write("[");
                GenerateCodeFromExpression(indexerExpression.Indices[i], w, o);
                w.Write("]");
            }

            return true;
        }

        static bool WriteCodeExpressionStatement(CodeExpressionStatement expressStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (expressStatement == null)
                return false;

            w.Write(o.IndentString);
            GenerateCodeFromExpression(expressStatement.Expression, w, o);
            return true;
        }

        static bool WriteCodeMethodReturnStatement(CodeMethodReturnStatement methodReturnStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (methodReturnStatement == null)
                return false;

            w.Write(o.IndentString);
            w.Write($"return ");
            GenerateCodeFromExpression(methodReturnStatement.Expression, w, o);
            return true;
        }

        static bool WriteCodeThrowExceptionStatement(CodeThrowExceptionStatement throwExceptionStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (throwExceptionStatement == null)
                return false;

            w.Write(o.IndentString + "throw ");
            GenerateCodeFromExpression(throwExceptionStatement.ToThrow, w, o);
            return true;
        }

        static bool WriteCodeBinaryOperatorExpression(CodeBinaryOperatorExpression binaryOperatorExpression, TextWriter w, CodeGeneratorOptions o)
        {
            if (binaryOperatorExpression == null)
                return false;

            GenerateCodeFromExpression(binaryOperatorExpression.Left, w, o);
            w.Write($" {GetCodeBinaryOperatorTypeText(binaryOperatorExpression.Operator)} ");
            GenerateCodeFromExpression(binaryOperatorExpression.Right, w, o);
            return true;
        }

        /// <summary>
        /// Multi-line doc comment will be split according to JSDoc 3 at http://usejsdoc.org
        /// Multi-line comment will be split
        /// </summary>
        /// <param name="commentStatement"></param>
        /// <param name="w"></param>
        /// <param name="o"></param>
        /// <returns></returns>
        static bool WriteCodeCommentStatement(CodeCommentStatement commentStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (commentStatement == null)
                return false;

            if (commentStatement.Comment.DocComment)
            {
                w.Write(o.IndentString + "/** ");
                if (commentStatement.Comment.Text.Contains('\n'))
                {
                    w.WriteLine();
                    var lines = commentStatement.Comment.Text.Split(new string[] { "\r\n", "\n" }, StringSplitOptions.RemoveEmptyEntries);
                    for (int i = 0; i < lines.Length; i++)
                    {
                        w.WriteLine($"{o.IndentString} * {lines[i]}");
                    }
                    w.WriteLine($"{o.IndentString} */");
                }
                else
                {
                    w.Write(commentStatement.Comment.Text);
                    w.WriteLine(" */");
                }
            }
            else
            {
                var lines = commentStatement.Comment.Text.Split(new string[] { "\r\n", "\n" }, StringSplitOptions.RemoveEmptyEntries);
                for (int i = 0; i < lines.Length; i++)
                {
                    w.WriteLine($"{o.IndentString}// {lines[i]}");
                }
            }

            return true;
        }

        //http://www.codebelt.com/typescript/javascript-getters-setters-typescript-accessor-tutorial/
        static bool WriteCodeMemberProperty(CodeMemberProperty codeMemberProperty, TextWriter w, CodeGeneratorOptions o)
        {
            if (codeMemberProperty == null)
                return false;

            WriteCodeCommentStatementCollection(codeMemberProperty.Comments, w, o);

            var accessibility = GetAccessibilityModifier(codeMemberProperty.Attributes);

            var currentIndent = o.IndentString;
            var propertyType = TypeMapper.MapCodeTypeReferenceToTsText(codeMemberProperty.Type);
            if (codeMemberProperty.GetStatements.Count > 0)
            {
                w.Write(o.IndentString);
                w.WriteLine($"{accessibility} get {codeMemberProperty.Name}(): {propertyType}");
                w.WriteLine("{");
                o.IndentString += BasicIndent;
                WriteCodeStatementCollection(codeMemberProperty.GetStatements, w, o);
                o.IndentString = currentIndent;
            }

            if (codeMemberProperty.SetStatements.Count > 0)
            {
                w.Write(o.IndentString);
                w.WriteLine($"{accessibility} set {codeMemberProperty.Name}(value : {propertyType})");
                w.WriteLine("{");
                o.IndentString += BasicIndent;
                WriteCodeStatementCollection(codeMemberProperty.SetStatements, w, o);
                o.IndentString = currentIndent;
            }

            return true;
        }

        static bool WriteCodeMemberMethod(CodeMemberMethod memberMethod, TextWriter w, CodeGeneratorOptions o)
        {
            if (memberMethod == null)
                return false;

            var isCodeConstructor = memberMethod is CodeConstructor;
            var methodName = isCodeConstructor ? "constructor" : memberMethod.Name;
            w.Write(o.IndentString + methodName + "(");
            WriteCodeParameterDeclarationExpressionCollection(memberMethod.Parameters, w);
            w.Write(")");

            var returnTypeText = TypeMapper.MapCodeTypeReferenceToTsText(memberMethod.ReturnType);
            if (!(isCodeConstructor || returnTypeText == "void" || memberMethod.ReturnType == null))
            {
                w.Write(": " + returnTypeText);
            }

            w.WriteLine("{");


            WriteCodeStatementCollection(memberMethod.Statements, w, o);

            w.WriteLine(o.IndentString + "}");
            return true;
        }

        static void WriteCodeExpressionCollection(CodeExpressionCollection collection, TextWriter w, CodeGeneratorOptions o)
        {
            for (int i = 0; i < collection.Count; i++)
            {
                if (i > 0)
                    w.Write(", ");
                GenerateCodeFromExpression(collection[i], w, o);
            }
        }


        static bool WriteCodeArrayCreateExpression(CodeArrayCreateExpression arrayCreateExpression, TextWriter w, CodeGeneratorOptions o)
        {
            if (arrayCreateExpression == null)
                return false;

            w.Write("[");
            WriteCodeExpressionCollection(arrayCreateExpression.Initializers, w, o);
            w.Write("]");
            //TS does not care about other properties of CodeArrayCreateExpression
            if (arrayCreateExpression.Size > 0)
                Trace.TraceWarning("CodeArrayCreateExpression in TypeScript does not care about Size.");

            if (arrayCreateExpression.SizeExpression != null)
                Trace.TraceWarning("CodeArrayCreateExpression in TypeScript does not care about SizeExpression.");

            return true;
        }

        static bool WriteCodeAssignStatement(CodeAssignStatement assignStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (assignStatement == null)
                return false;

            w.Write(o.IndentString);
            GenerateCodeFromExpression(assignStatement.Left, w, o);
            w.Write(" = ");
            GenerateCodeFromExpression(assignStatement.Right, w, o);
            return true;
        }

        static void WriteTypeMembersAndCloseBracing(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o)
        {
            if (typeDeclaration.IsEnum)
            {
                var enumMembers = typeDeclaration.Members.OfType<CodeTypeMember>().Select(ctm =>
                 {
                     var codeMemberField = ctm as CodeMemberField;//todo: codeMemberField.Comments is ignored here. Not sure anyone would write codegen that emit comments for enum members?
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
            o.IndentString += BasicIndent;

            for (int i = 0; i < typeDeclaration.Members.Count; i++)
            {
                WriteCodeTypeMember(typeDeclaration.Members[i], w, o);
            };

            w.WriteLine(currentIndent + "}");
            o.IndentString = currentIndent;
        }

        static void WriteCodeTypeMember(CodeTypeMember ctm, TextWriter w, CodeGeneratorOptions o)
        {
            WriteCodeCommentStatementCollection(ctm.Comments, w, o);

            var codeMemberField = ctm as CodeMemberField;
            if (codeMemberField != null)
            {
                w.Write(o.IndentString);
                w.WriteLine(GetCodeMemberFieldText(codeMemberField) + ";");
                return;
            }

            if (WriteCodeMemberProperty(ctm as CodeMemberProperty, w, o))
                return;

            if (WriteCodeMemberMethod(ctm as CodeMemberMethod, w, o))
                return;

            var snippetTypeMember = ctm as CodeSnippetTypeMember;
            if (snippetTypeMember != null)
            {
                w.WriteLine(snippetTypeMember.Text);
                return;
            }

        }

        /// <summary>
        /// Write every statements with 1 more BasicIndent of the caller, and add ; and linebreak at the end,
        /// </summary>
        /// <param name="statements"></param>
        /// <param name="w"></param>
        /// <param name="o"></param>
        static void WriteCodeStatementCollection(CodeStatementCollection statements, TextWriter w, CodeGeneratorOptions o)
        {
            var currentIndent = o.IndentString;
            o.IndentString += BasicIndent;

            for (int i = 0; i < statements.Count; i++)
            {
                var statement = statements[i];
                if (!WriteCodeSnippetStatement(statement as CodeSnippetStatement, w, o) &&
                    !WriteCodeCommentStatement(statement as CodeCommentStatement, w, o))
                {
                    GenerateCodeFromStatement(statement, w, o);
                    w.WriteLine(";");
                }
            }
            o.IndentString = currentIndent;
        }

        static void WriteCodeParameterDeclarationExpressionCollection(CodeParameterDeclarationExpressionCollection parameterDeclarations, TextWriter w)
        {
            var pairs = parameterDeclarations.OfType<CodeParameterDeclarationExpression>()
                .Select(d => {
                    var s= $"{d.Name}: {TypeMapper.MapCodeTypeReferenceToTsText(d.Type)}";
                    Debug.WriteLine("vvvv " + s);
                    return s;
                    });
            w.Write(String.Join(", ", pairs));
        }

        static void WriteCodeCommentStatementCollection(CodeCommentStatementCollection comments, TextWriter w, CodeGeneratorOptions  o)
        {
            if (comments.Count>0)
                w.WriteLine();

            for (int i = 0; i < comments.Count; i++)
            {
                WriteCodeCommentStatement(comments[i], w, o);
            }
        }

        static void WriteCodeMethodReferenceExpression(CodeMethodReferenceExpression expression, TextWriter w, CodeGeneratorOptions o)
        {
            GenerateCodeFromExpression(expression.TargetObject, w, o);
            w.Write(".");
            w.Write(expression.MethodName);
            if (expression.TypeArguments.Count > 0)
            {
                w.Write($"<{TypeMapper.MapCodeTypeReferenceCollectionToTsText(expression.TypeArguments)}>");
            }

            w.Write("()");
        }

        static bool WriteCodeConditionStatement(CodeConditionStatement conditionStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (conditionStatement == null)
                return false;

            w.Write(o.IndentString);
            w.Write("if (");
            GenerateCodeFromExpression(conditionStatement.Condition, w, o);
            w.WriteLine(") {");

            WriteCodeStatementCollection(conditionStatement.TrueStatements, w, o);
            w.Write(o.IndentString);
            w.WriteLine("}");
            if (conditionStatement.FalseStatements.Count > 0)
            {
                w.WriteLine($"{o.IndentString}else {{");
                WriteCodeStatementCollection(conditionStatement.FalseStatements, w, o);
                w.Write(o.IndentString);
                w.WriteLine("}");
            }

            return true;
        }

        /// <summary>
        /// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
        /// </summary>
        /// <param name="tryCatchFinallyStatement"></param>
        /// <param name="w"></param>
        /// <param name="o"></param>
        /// <returns></returns>
        static bool WriteCodeTryCatchFinallyStatement(CodeTryCatchFinallyStatement tryCatchFinallyStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (tryCatchFinallyStatement == null)
                return false;

            w.Write(o.IndentString);
            w.WriteLine("try {");
            WriteCodeStatementCollection(tryCatchFinallyStatement.TryStatements, w, o);
            w.Write(o.IndentString);
            w.WriteLine("}");

            if (tryCatchFinallyStatement.CatchClauses.Count > 1)
                throw new ArgumentException("Javascript does not support multiple CatchClauses.", "tryCatchFinallyStatement");

            if (tryCatchFinallyStatement.CatchClauses.Count > 0)
            {
                WriteCodeCatchClause(tryCatchFinallyStatement.CatchClauses[0], w, o);
            }

            if (tryCatchFinallyStatement.FinallyStatements.Count > 0)
            {
                w.Write(o.IndentString);
                w.WriteLine("finally {");
                WriteCodeStatementCollection(tryCatchFinallyStatement.FinallyStatements, w, o);
                w.Write(o.IndentString);
                w.WriteLine("}");
            }

            return true;
        }

        /// <summary>
        /// 5.14 Try Statements
        /// The variable introduced by a 'catch' clause of a 'try' statement is always of type Any.It is not possible to include a type annotation in a 'catch' clause.
        /// </summary>
        /// <param name="catchClause"></param>
        /// <param name="w"></param>
        /// <param name="o"></param>
        static void WriteCodeCatchClause(CodeCatchClause catchClause, TextWriter w, CodeGeneratorOptions o)
        {
            w.Write(o.IndentString);
            w.WriteLine($"catch ({catchClause.LocalName}) {{");
            WriteCodeStatementCollection(catchClause.Statements, w, o);
            w.Write(o.IndentString);
            w.WriteLine("}");
        }

        static bool WriteCodeIterationStatement(CodeIterationStatement iterationStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (iterationStatement == null)
                return false;

            var currentIndent = o.IndentString;
            w.Write(o.IndentString);
            w.Write("for (");
            o.IndentString = "";
            GenerateCodeFromStatement(iterationStatement.InitStatement, w, o);
            w.Write("; ");
            GenerateCodeFromExpression(iterationStatement.TestExpression, w, o);
            w.Write("; ");
            GenerateCodeFromStatement(iterationStatement.IncrementStatement, w, o);
            w.WriteLine(") {");
            o.IndentString = currentIndent;
            WriteCodeStatementCollection(iterationStatement.Statements, w, o);
            w.WriteLine(o.IndentString + "}");
            return true;
        }

        static bool WriteCodeSnippetStatement(CodeSnippetStatement snippetStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (snippetStatement == null)
                return false;

            w.WriteLine(IndentLines(snippetStatement.Value, o.IndentString));
            return true;

        }

        static bool WriteCodeVariableDeclarationStatement(CodeVariableDeclarationStatement variableDeclarationStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (variableDeclarationStatement == null)
                return false;

            w.Write(o.IndentString);
            w.Write($"var {variableDeclarationStatement.Name}: {TypeMapper.MapCodeTypeReferenceToTsText(variableDeclarationStatement.Type)}");

            if (variableDeclarationStatement.InitExpression != null)
            {
                w.Write(" = ");
                GenerateCodeFromExpression(variableDeclarationStatement.InitExpression, w, o);
            }

            return true;
        }


        static readonly Type typeOfString = typeof(string);

        #endregion



        #region Text

        /// <summary>
        /// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators
        /// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        static string GetCodeBinaryOperatorTypeText(CodeBinaryOperatorType t)
        {
            switch (t)
            {
                case CodeBinaryOperatorType.Add:
                    return "+";
                case CodeBinaryOperatorType.Subtract:
                    return "-";
                case CodeBinaryOperatorType.Multiply:
                    return "*";
                case CodeBinaryOperatorType.Divide:
                    return "/";
                case CodeBinaryOperatorType.Modulus:
                    return "%";
                case CodeBinaryOperatorType.Assign:
                    return "=";
                case CodeBinaryOperatorType.IdentityInequality:
                    return "!=";
                case CodeBinaryOperatorType.IdentityEquality:
                    return "==";
                case CodeBinaryOperatorType.ValueEquality:
                    return "==";
                case CodeBinaryOperatorType.BitwiseOr:
                    return "|";
                case CodeBinaryOperatorType.BitwiseAnd:
                    return "&";
                case CodeBinaryOperatorType.BooleanOr:
                    return "||";
                case CodeBinaryOperatorType.BooleanAnd:
                    return "&&";
                case CodeBinaryOperatorType.LessThan:
                    return "<";
                case CodeBinaryOperatorType.LessThanOrEqual:
                    return "<=";
                case CodeBinaryOperatorType.GreaterThan:
                    return ">";
                case CodeBinaryOperatorType.GreaterThanOrEqual:
                    return ">=";
                default:
                    throw new ArgumentException(t + " is not supported.");
            }
        }

        static string GetAccessibilityModifier(MemberAttributes a)
        {
            switch (a)
            {
                case MemberAttributes.Abstract:
                    return "abstract";
                case MemberAttributes.Final:
                    return "final";
                case MemberAttributes.Static:
                    return "static";
                case MemberAttributes.Const:
                    return "const";
                case MemberAttributes.Family:
                    return "protected";
                case MemberAttributes.Private:
                    return "private";
                case MemberAttributes.Public:
                    return "public";
                default:
                    throw new InvalidOperationException("Not supported: " + a.ToString());
            }
        }

        static string IndentLines(string s, string indent)
        {
            if (String.IsNullOrEmpty(s))
                return String.Empty;

            var lines = s.Split(new string[] { Environment.NewLine, "\n", "\r" }, StringSplitOptions.None);
            var indentedLines = lines.Select(d => indent + d);
            var ss = String.Join(Environment.NewLine, indentedLines);
            return ss;
        }

        /// <summary>
        /// return enum, interface or class
        /// </summary>
        /// <param name="typeDeclaration"></param>
        /// <returns></returns>
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
                    var type = TypeMapper.MapCodeTypeReferenceToTsText(constraint);
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
                .Select(reference => TypeMapper.MapCodeTypeReferenceToTsText(reference))
                .ToList();
            if (baseTypes.Any() && !typeDeclaration.IsEnum)
            {
                return $" extends {string.Join(",", baseTypes)}";
            }

            return String.Empty;
        }

        static string GetEnumMember(CodeMemberField member)
        {
            var initExpression = member.InitExpression as CodePrimitiveExpression;
            return (initExpression == null) ? $"{member.Name}" : $"{member.Name}={initExpression.Value}";
        }

        static string GetCodeMemberFieldText(CodeMemberField codeMemberField)
        {
            return RefineNameAndType(codeMemberField.Name, GetCodeTypeReferenceText(codeMemberField.Type));
        }

        static string GetCodeTypeReferenceText(CodeTypeReference codeTypeReference)
        {
            return TypeMapper.MapCodeTypeReferenceToTsText(codeTypeReference);
        }

        static string RefineNameAndType(string name, string typeName)
        {
            return $"{name}: {typeName}";
        }

        #endregion


    }

}
