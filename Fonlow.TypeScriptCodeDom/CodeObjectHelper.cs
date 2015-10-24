using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;
using System.Diagnostics;

namespace Fonlow.TypeScriptCodeDom
{
    internal sealed class Constants
    {
        public const string BasicIndent = "    ";
    }

    public static class CodeObjectHelper
    {
        #region GenerateCodeFromXXX

        public static void GenerateCodeFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
        {
            var currentIndent = o.IndentString;
            var accessModifier = ((e.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export" : String.Empty;
            var typeOfType = CodeObjectHelper.GetTypeOfType(e);
            var name = e.Name;
            var typeParametersExpression = CodeObjectHelper.GetTypeParametersExpression(e);
            var baseTypesExpression = CodeObjectHelper.GetBaseTypeExpression(e);
            w.Write($"{o.IndentString}{accessModifier} {typeOfType} {name}{typeParametersExpression}{baseTypesExpression}{{");
            WriteTypeMembersAndCloseBracing(e, w, o);
            o.IndentString = currentIndent;
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

            if (WriteCodeArrayCreateExpression(e as CodeArrayCreateExpression, w, o))
                return;

            var arrayIndexerExpression = e as CodeArrayIndexerExpression;
            if (arrayIndexerExpression != null)
            {
                GenerateCodeFromExpression(arrayIndexerExpression.TargetObject, w, o);
                for (int i = 0; i < arrayIndexerExpression.Indices.Count; i++)
                {
                    w.Write("[");
                    GenerateCodeFromExpression(arrayIndexerExpression.Indices[i], w, o);
                    w.Write("]");
                }
            }

            var baseReferenceExpression = e as CodeBaseReferenceExpression;
            if (baseReferenceExpression != null)
            {
                w.Write("super");
                return;
            }
            //todo: CodeBinaryOperatorExpression   https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
            //todo: CodeCastExpression, example <HTMLSpanElement>document, not sure anyone would use type casting in generated codes.

            //todo: CodeDefaultValueExpression; ts not supported?
            //todo: CodeDelegateCreateExpression no
            //todo: CodeDelegateInvokeExpression no
            //todo: CodeDirectionExpression; ts not supported
            //todo: CodeEventReferenceExpression; probably better with snippetExpression

            var fieldReference = e as CodeFieldReferenceExpression;
            if (fieldReference != null)
            {
                GenerateCodeFromExpression(fieldReference.TargetObject, w, o);
                w.Write(".");
                w.Write(fieldReference.FieldName);
                return;
            }

            var indexerExpression = e as CodeIndexerExpression;
            if (indexerExpression != null)
            {
                GenerateCodeFromExpression(indexerExpression.TargetObject, w, o);
                for (int i = 0; i < indexerExpression.Indices.Count; i++)
                {
                    w.Write("[");
                    GenerateCodeFromExpression(indexerExpression.Indices[i], w, o);
                    w.Write("]");
                }
            }

            var methodInvokeExpression = e as CodeMethodInvokeExpression;
            if (methodInvokeExpression != null)
            {
                GenerateCodeFromExpression(methodInvokeExpression.Method.TargetObject, w, o);
                w.Write(".");
                w.Write(methodInvokeExpression.Method.MethodName + "(");
                WriteCodeExpressionCollection(methodInvokeExpression.Parameters, w, o);
                w.Write(")");
                return;
            }

            var methodReferenceExpression = e as CodeMethodReferenceExpression;
            if (methodReferenceExpression != null)
            {
                WriteCodeMethodReferenceExpression(methodReferenceExpression, w, o);
                return;
            }

            var objectCreateExpression = e as CodeObjectCreateExpression;
            if (objectCreateExpression != null)
            {
                w.Write($"new {TypeMapper.GetTypeOutput(objectCreateExpression.CreateType)}(");
                WriteCodeExpressionCollection(objectCreateExpression.Parameters, w, o);
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

            //todo: CodePropertySetValueReferenceExpression  not to support

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
                w.Write("typeof " + TypeMapper.GetTypeOutput(typeOfExpression.Type));
                return;
            }

            var typeReferenceExpression = e as CodeTypeReferenceExpression;
            if (typeReferenceExpression != null)
            {
                w.Write(TypeMapper.GetTypeOutput(typeReferenceExpression.Type));
            }

            var variableReferenceExpression = e as CodeVariableReferenceExpression;
            if (variableReferenceExpression != null)
            {
                w.Write(variableReferenceExpression.VariableName);
                return;
            }


        }

        public static void GenerateCodeFromStatement(CodeStatement e, TextWriter w, CodeGeneratorOptions o)
        {
            var currentIndent = o.IndentString;

            if (WriteCodeAssignStatement(e as CodeAssignStatement, w, o))
                return;

            //todo: CodeAttachEventStatement  TS does not seem to support, 

            var commentStatement = e as CodeCommentStatement;
            if (commentStatement != null)
            {
                w.WriteLine(commentStatement.Comment.Text);
                return;
            }

            if (GenerateCodeConditionStatement(e as CodeConditionStatement, w, o))
                return;

            var expressStatement = e as CodeExpressionStatement;
            if (expressStatement != null)
            {
                GenerateCodeFromExpression(expressStatement.Expression, w, o);
                return;
            }
            //todo: CodeGotoStatement, probably not to support

            if (WriteCodeIterationStatement(e as CodeIterationStatement, w, o))
                return;

            //todo: CodeLabeledStatement, probably not to support

            var methodReturnStatement = e as CodeMethodReturnStatement;
            if (methodReturnStatement != null)
            {
                w.Write($"return ");
                GenerateCodeFromExpression(methodReturnStatement.Expression, w, o);
                o.IndentString = currentIndent;
                return;
            }

            //todo: CodeRemoveEventStatement not to support

            var throwExceptionStatement = e as CodeThrowExceptionStatement;
            if (throwExceptionStatement != null)
            {
                w.Write("throw ");
                GenerateCodeFromExpression(throwExceptionStatement.ToThrow, w, o);
                return;
            }

            if (WriteCodeTryCatchFinallyStatement(e as CodeTryCatchFinallyStatement, w, o))
                return;

            if (WriteCodeVariableDeclarationStatement(e as CodeVariableDeclarationStatement, w, o))
                return;

        }

        #endregion



        #region Text

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

        #endregion

        //http://www.codebelt.com/typescript/javascript-getters-setters-typescript-accessor-tutorial/
        static bool WriteCodeMemberProperty(CodeMemberProperty codeMemberProperty, TextWriter w, CodeGeneratorOptions o)
        {
            if (codeMemberProperty == null)
                return false;

            var accessibility = GetAccessibilityModifier(codeMemberProperty.Attributes);

            var currentIndent = o.IndentString;
            var propertyType = TypeMapper.GetTypeOutput(codeMemberProperty.Type);
            if (codeMemberProperty.GetStatements.Count > 0)
            {
                w.Write(o.IndentString);
                w.WriteLine($"{accessibility} get {codeMemberProperty.Name}(): {propertyType}");
                w.WriteLine("{");
                o.IndentString += Constants.BasicIndent;
                WriteCodeStatementCollection(codeMemberProperty.GetStatements, w, o);
                o.IndentString = currentIndent;
            }

            if (codeMemberProperty.SetStatements.Count > 0)
            {
                w.Write(o.IndentString);
                w.WriteLine($"{accessibility} set {codeMemberProperty.Name}(value : {propertyType})");
                w.WriteLine("{");
                o.IndentString += Constants.BasicIndent;
                WriteCodeStatementCollection(codeMemberProperty.SetStatements, w, o);
                o.IndentString = currentIndent;
            }

            return true;
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
                //case MemberAttributes.Override:
                //    break;
                case MemberAttributes.Const:
                    return "const";
                //case MemberAttributes.New:
                //    break;
                //case MemberAttributes.Overloaded:
                //    break;
                //case MemberAttributes.Assembly:
                //    break;
                //case MemberAttributes.FamilyAndAssembly:
                //    break;
                case MemberAttributes.Family:
                    return "protected";
                //case MemberAttributes.FamilyOrAssembly:
                //    break;
                case MemberAttributes.Private:
                    return "private";
                case MemberAttributes.Public:
                    return "public";
                //case MemberAttributes.AccessMask:
                //    break;
                //case MemberAttributes.ScopeMask:
                //    break;
                //case MemberAttributes.VTableMask:
                //    break;
                default:
                    throw new InvalidOperationException("Not supported: " + a.ToString());
            }
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

            for (int i = 0; i < typeDeclaration.Members.Count; i++)
            {
                WriteCodeTypeMember(typeDeclaration.Members[i], w, o);
            };

            w.WriteLine(currentIndent + "}");
            o.IndentString = currentIndent;
        }

        static void WriteCodeTypeMember(CodeTypeMember ctm, TextWriter w, CodeGeneratorOptions o)
        {
            w.Write(o.IndentString);

            var codeMemberField = ctm as CodeMemberField;
            if (codeMemberField != null)
            {
                w.WriteLine(GetCodeMemberFieldText(codeMemberField) + ";");
                return;
            }

            if (WriteCodeMemberProperty(ctm as CodeMemberProperty, w, o))
                return;

            var memberMethod = ctm as CodeMemberMethod;
            if (memberMethod != null)
            {
                var isCodeConstructor = memberMethod is CodeConstructor;
                //todo: CodeEntryPointMethod not applicable to TS
                //todo: CodeTypeConstructor  TS support partially static, so probably not applicable
                w.WriteLine();
                var methodName = isCodeConstructor ? "constructor" : memberMethod.Name;
                w.Write(o.IndentString + methodName + "(");
                WriteCodeParameterDeclarationExpressionCollection(memberMethod.Parameters, w);
                w.Write(")");

                var returnTypeText = TypeMapper.GetTypeOutput(memberMethod.ReturnType);
                if (!(isCodeConstructor || returnTypeText == "void" || memberMethod.ReturnType == null))
                {
                    if (returnTypeText.Contains("?"))
                        w.Write(": any");
                    else
                        w.Write(": " + returnTypeText);
                }

                w.WriteLine("{");

                //todo:  memberMethod.TypeParameters ? how many would generate generic methods

                WriteCodeStatementCollection(memberMethod.Statements, w, o);

                w.WriteLine(o.IndentString + "}");
            }

            var snippetTypeMember = ctm as CodeSnippetTypeMember;
            if (snippetTypeMember != null)
            {
                w.WriteLine(snippetTypeMember.Text);
                return;
            }

            //todo: nested CodeTypeDeclaration not to implement
            /* TypeScript seems to support or simulate nested type declaration. But not likely many programmers will generate such codes.
              class b
  {
  }

  module b
  {
      class c
      {
      }
  }
              */
        }

        static void WriteCodeStatementCollection(CodeStatementCollection statements, TextWriter w, CodeGeneratorOptions o)
        {
            var currentIndent = o.IndentString;
            o.IndentString += Constants.BasicIndent;
            for (int i = 0; i < statements.Count; i++)
            {
                var statement = statements[i];
                if (!WriteCodeSnippetStatement(statement as CodeSnippetStatement, w, o))
                {
                    w.Write(o.IndentString);
                    GenerateCodeFromStatement(statement, w, o);
                    w.WriteLine(";");
                }
            }
            o.IndentString = currentIndent;
        }

        static void WriteCodeParameterDeclarationExpressionCollection(CodeParameterDeclarationExpressionCollection parameterDeclarations, TextWriter w)
        {
            var pairs = parameterDeclarations.OfType<CodeParameterDeclarationExpression>().Select(d => $"{d.Name}: {TypeMapper.GetTypeOutput(d.Type)}");
            w.Write(String.Join(", ", pairs));
        }

        static void WriteCodeMethodReferenceExpression(CodeMethodReferenceExpression expression, TextWriter w, CodeGeneratorOptions o)
        {
            GenerateCodeFromExpression(expression.TargetObject, w, o);
            w.Write(".");
            w.Write(expression.MethodName);
            if (expression.TypeArguments.Count>0)
            {
                w.Write($"<{TypeMapper.GetCodeTypeReferenceCollection(expression.TypeArguments)}>");
            }

            w.Write("()");
        }

        static bool GenerateCodeConditionStatement(CodeConditionStatement conditionStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (conditionStatement == null)
                return false;

            w.Write("if (");
            GenerateCodeFromExpression(conditionStatement.Condition, w, o);
            w.WriteLine("){");

            WriteCodeStatementCollection(conditionStatement.TrueStatements, w, o);
            w.Write(o.IndentString);
            w.WriteLine("}");
            if (conditionStatement.FalseStatements != null)
            {
                w.WriteLine($"{o.IndentString}{{");
                WriteCodeStatementCollection(conditionStatement.FalseStatements, w, o);
                w.Write(o.IndentString);
                w.WriteLine("}");
            }

            return true;
        }

        static bool WriteCodeTryCatchFinallyStatement(CodeTryCatchFinallyStatement tryCatchFinallyStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (tryCatchFinallyStatement == null)
                return false;

            var currentIndent = o.IndentString;
            w.WriteLine(o.IndentString);
            w.WriteLine("try {");
            o.IndentString += Constants.BasicIndent;
            WriteCodeStatementCollection(tryCatchFinallyStatement.TryStatements, w, o);
            o.IndentString = currentIndent;
            w.Write(o.IndentString);
            w.WriteLine("}");

            for (int i = 0; i < tryCatchFinallyStatement.CatchClauses.Count; i++)
            {
                WriteCodeCatchClause(tryCatchFinallyStatement.CatchClauses[i], w, o);
            }

            if (tryCatchFinallyStatement.FinallyStatements.Count > 0)
            {
                o.IndentString += Constants.BasicIndent;
                w.Write(currentIndent);
                w.WriteLine("finally {");
                WriteCodeStatementCollection(tryCatchFinallyStatement.FinallyStatements, w, o);
                w.Write(currentIndent);
                w.WriteLine("}");
            }

            o.IndentString = currentIndent;

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

            w.Write("for (");
            GenerateCodeFromStatement(iterationStatement.InitStatement, w, o);
            w.Write("; ");
            GenerateCodeFromExpression(iterationStatement.TestExpression, w, o);
            w.Write("; ");
            GenerateCodeFromStatement(iterationStatement.IncrementStatement, w, o);
            w.WriteLine("){");
            WriteCodeStatementCollection(iterationStatement.Statements, w, o);
            w.WriteLine("}");
            return true;
        }

        static bool WriteCodeSnippetStatement(CodeSnippetStatement snippetStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (snippetStatement == null)
                return false;

            w.WriteLine();
            w.WriteLine(IndentLines(snippetStatement.Value, o.IndentString));
            return true;

        }

        static bool WriteCodeVariableDeclarationStatement(CodeVariableDeclarationStatement variableDeclarationStatement, TextWriter w, CodeGeneratorOptions o)
        {
            if (variableDeclarationStatement == null)
                return false;

            w.Write(TypeMapper.GetTypeOutput(variableDeclarationStatement.Type) + " " + variableDeclarationStatement.Name);

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

        static readonly Type typeOfString = typeof(string);


    }
}
