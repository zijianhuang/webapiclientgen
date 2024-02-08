using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;
using System.Diagnostics;

namespace Fonlow.TypeScriptCodeDom
{
	/// <summary>
	/// Output TS codes through TextWriter
	/// </summary>
	public class CodeObjectHelper
	{
		readonly protected string BasicIndent = "\t";
		readonly protected bool asModule;

		public CodeObjectHelper(bool asModule)
		{
			this.asModule = asModule;
		}

		#region public GenerateCodeFromXXX

		public virtual void GenerateCodeFromNamespace(CodeNamespace e, TextWriter w, CodeGeneratorOptions o)
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
				WriteCodeRegionDirectives(t.StartDirectives, w);
				GenerateCodeFromType(t, w, o);
				w.WriteLine();
				WriteCodeRegionDirectives(t.EndDirectives, w);
			});

			w.WriteLine($"}}");
		}

		/// <summary>
		/// Generate TS interface
		/// </summary>
		/// <param name="e"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		public void GenerateCodeFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
		{
			WriteCodeCommentStatementCollection(e.Comments, w, o);

			GenerateCodeFromAttributeDeclarationCollectionForClass(e.CustomAttributes, w, o);

			if (e is CodeTypeDelegate codeTypeDelegate)
			{
				w.Write($"{o.IndentString}export type {codeTypeDelegate.Name} = (");
				WriteCodeParameterDeclarationExpressionCollection(codeTypeDelegate.Parameters, w, o);
				w.Write(") => ");
				w.WriteLine(GetCodeTypeReferenceText(codeTypeDelegate.ReturnType) + ";");
				return;
			}

			var accessModifier = ((e.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export " : String.Empty;
			var typeOfTypeText = GetTypeOfTypeText(e);
			var name = e.Name;
			var typeParametersExpression = GetTypeParametersExpression(e);
			var baseTypesExpression = GetBaseTypeExpression(e);
			w.Write($"{o.IndentString}{accessModifier}{typeOfTypeText} {name}{typeParametersExpression}{baseTypesExpression} {{");
			WriteTypeMembersAndCloseBracing(e, w, o);
		}

		/// <summary>
		/// No Argument for class decorator.
		/// Matching https://www.typescriptlang.org/docs/handbook/decorators.html
		/// However, if e.AttributeType.UserData["TsTypeInfo"] as TsTypeInfo indicates IsInterface, the output will include ()
		/// </summary>
		/// <param name="e"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		void GenerateCodeFromAttributeDeclarationForClass(CodeAttributeDeclaration e, TextWriter w, CodeGeneratorOptions o)
		{
			if (e.Arguments.Count > 0)
			{
				throw new ArgumentException("CodeFromAttributeDeclarationForClass should not have arguments", nameof(e));

			}

			var tsTypeInfo = e.AttributeType.UserData["TsTypeInfo"] as TsTypeInfo;
			bool isInterface = tsTypeInfo != null && tsTypeInfo.TypeOfType == TypeOfType.IsInterface;
			if (isInterface){
				w.WriteLine($"{o.IndentString}@{e.Name}()"); //@Injectable in Angular is actually a pointer to interface which demands ().
			}else{
				w.WriteLine($"{o.IndentString}@{e.Name}");
			}

			/* 
export declare const Injectable: InjectableDecorator;

export declare interface InjectableDecorator {
	(): TypeDecorator;
	(options?: {
		providedIn: Type<any> | 'root' | 'platform' | 'any' | null;
	} & InjectableProvider): TypeDecorator;
	new (): Injectable;
	new (options?: {
		providedIn: Type<any> | 'root' | 'platform' | 'any' | null;
	} & InjectableProvider): Injectable;
}

https://angular.io/guide/dependency-injection-in-action
			*/
		}

		void GenerateCodeFromAttributeDeclarationForParameter(CodeAttributeDeclaration e, TextWriter w, CodeGeneratorOptions o)
		{
			if (e.Arguments.Count > 0)
			{
				throw new ArgumentException("GenerateCodeFromAttributeDeclarationForParameter should not have arguments", nameof(e));

			}
			w.Write($"@{e.Name} ");
		}

		/// <summary>
		/// With arguments for method, property, accessor and parameter.
		/// Matching https://www.typescriptlang.org/docs/handbook/decorators.html
		/// </summary>
		/// <param name="e"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		void GenerateCodeFromAttributeDeclaration(CodeAttributeDeclaration e, TextWriter w, CodeGeneratorOptions o)
		{
			w.Write($"{o.IndentString}@{e.Name}(");
			for (int i = 0; i < e.Arguments.Count; i++)
			{
				GenerateCodeFromExpression(e.Arguments[i].Value, w, o);
				if (i < e.Arguments.Count - 1)
				{
					w.Write(", ");
				}
			}

			w.WriteLine(")");
		}

		protected void GenerateCodeFromAttributeDeclarationCollectionForClass(CodeAttributeDeclarationCollection e, TextWriter w, CodeGeneratorOptions o)
		{
			if (e.Count == 0)
				return;

			for (int i = 0; i < e.Count; i++)
			{
				GenerateCodeFromAttributeDeclarationForClass(e[i], w, o);
			}
		}

		protected void GenerateCodeFromAttributeDeclarationCollectionForParameter(CodeAttributeDeclarationCollection e, TextWriter w, CodeGeneratorOptions o)
		{
			if (e.Count == 0)
				return;

			for (int i = 0; i < e.Count; i++)
			{
				GenerateCodeFromAttributeDeclarationForParameter(e[i], w, o);
			}
		}

		protected void GenerateCodeFromAttributeDeclarationCollection(CodeAttributeDeclarationCollection e, TextWriter w, CodeGeneratorOptions o)
		{
			if (e.Count == 0)
				return;

			for (int i = 0; i < e.Count; i++)
			{
				GenerateCodeFromAttributeDeclaration(e[i], w, o);
			}
		}

		internal void GenerateCodeFromExpression(CodeExpression e, TextWriter w, CodeGeneratorOptions o)
		{
			if (e == null)
				return;

			if (e is CodeArgumentReferenceExpression argumentReferenceExpression)
			{
				w.Write(argumentReferenceExpression.ParameterName);
				return;
			}

			if (WriteCodeArrayCreateExpression(e as CodeArrayCreateExpression, w, o))
				return;

			if (WriteCodeArrayIndexerExpression(e as CodeArrayIndexerExpression, w, o))
				return;

			if (e is CodeBaseReferenceExpression)
			{
				w.Write("super");
				return;
			}

			if (WriteCodeCastExpression(e as CodeCastExpression, w, o))
				return;

			if (WriteCodeBinaryOperatorExpression(e as CodeBinaryOperatorExpression, w, o))
				return;

			if (WriteCodeFieldReferenceExpression(e as CodeFieldReferenceExpression, w, o))
				return;

			if (WriteCodeIndexerExpression(e as CodeIndexerExpression, w, o))
				return;

			if (WriteCodeMethodInvokeExpression(e as CodeMethodInvokeExpression, w, o))
				return;


			if (e is CodeMethodReferenceExpression methodReferenceExpression)
			{
				WriteCodeMethodReferenceExpression(methodReferenceExpression, w, o);
				return;
			}

			if (WriteCodeObjectCreateExpression(e as CodeObjectCreateExpression, w, o))
				return;

			if (e is CodeParameterDeclarationExpression parameterDeclarationExpression)
			{
				w.Write($"{parameterDeclarationExpression.Name}: {GetCodeTypeReferenceText(parameterDeclarationExpression.Type)}");
				return;
			}

			if (WriteCodePrimitiveExpression(e as CodePrimitiveExpression, w))
				return;


			if (WriteCodePropertyReferenceExpression(e as CodePropertyReferenceExpression, w, o))
				return;

			if (e is CodeSnippetExpression snippetExpression)
			{
				w.Write(snippetExpression.Value);
				return;
			}

			if (e is CodeThisReferenceExpression)
			{
				w.Write("this");
				return;
			}

			if (e is CodeTypeOfExpression typeOfExpression)
			{
				w.Write("typeof " + GetCodeTypeReferenceText(typeOfExpression.Type));
				return;
			}

			if (e is CodeTypeReferenceExpression typeReferenceExpression)
			{
				w.Write(GetCodeTypeReferenceText(typeReferenceExpression.Type));
				return;
			}

			if (e is CodeVariableReferenceExpression variableReferenceExpression)
			{
				w.Write(variableReferenceExpression.VariableName);
				return;
			}

			Trace.TraceWarning($"CodeExpression not supported: {e}");
		}

		/// <summary>
		/// For CodeTypeDeclaration, CodeTypeMember (field, proeprty and method), CodeStatement, 
		/// </summary>
		/// <param name="directives">CodeDirectiveCollection with CodeRegionDirective</param>
		/// <param name="w"></param>
		void WriteCodeRegionDirectives(CodeDirectiveCollection directives, TextWriter w)
		{
			if (directives != null && directives.Count > 0)
			{
				var codeRegionStartDirectives = directives.OfType<CodeRegionDirective>().ToArray();
				foreach (var item in codeRegionStartDirectives)
				{
					WriteCodeRegionDirective(item, w);
				}
			}
		}

		internal void GenerateCodeFromStatement(CodeStatement e, TextWriter w, CodeGeneratorOptions o)
		{
			if (WriteCodeAssignStatement(e as CodeAssignStatement, w, o))
				return;

			if (WriteCodeCommentStatement(e as CodeCommentStatement, w, o))
				return;

			if (WriteCodeConditionStatement(e as CodeConditionStatement, w, o))
				return;

			if (WriteCodeExpressionStatement(e as CodeExpressionStatement, w, o))
				return;


			if (WriteCodeIterationStatement(e as CodeIterationStatement, w, o))
				return;

			if (WriteCodeMethodReturnStatement(e as CodeMethodReturnStatement, w, o))
				return;

			if (WriteCodeThrowExceptionStatement(e as CodeThrowExceptionStatement, w, o))
				return;

			if (WriteCodeTryCatchFinallyStatement(e as CodeTryCatchFinallyStatement, w, o))
				return;

			if (WriteCodeVariableDeclarationStatement(e as CodeVariableDeclarationStatement, w, o))
				return;

			Trace.TraceWarning($"CodeStatement not supported: {e}");
		}

		#endregion





		#region WriteCodeXXXX

		bool WriteCodeArrayIndexerExpression(CodeArrayIndexerExpression arrayIndexerExpression, TextWriter w, CodeGeneratorOptions o)
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

		bool WriteCodeFieldReferenceExpression(CodeFieldReferenceExpression fieldReferenceExpression, TextWriter w, CodeGeneratorOptions o)
		{
			if (fieldReferenceExpression == null)
				return false;

			GenerateCodeFromExpression(fieldReferenceExpression.TargetObject, w, o);
			w.Write(".");
			w.Write(fieldReferenceExpression.FieldName);
			return true;
		}

		bool WriteCodeObjectCreateExpression(CodeObjectCreateExpression objectCreateExpression, TextWriter w, CodeGeneratorOptions o)
		{
			if (objectCreateExpression == null)
				return false;

			w.Write($"new {GetCodeTypeReferenceText(objectCreateExpression.CreateType)}(");
			WriteCodeExpressionCollection(objectCreateExpression.Parameters, w, o);
			w.Write(")");
			return true;
		}

		bool WriteCodePrimitiveExpression(CodePrimitiveExpression primitiveExpression, TextWriter w)
		{
			if (primitiveExpression == null)
				return false;

			if (primitiveExpression.Value.GetType() == typeOfString)
				w.Write($"\"{primitiveExpression.Value}\"");
			else
				w.Write(primitiveExpression.Value);

			return true;
		}

		bool WriteCodePropertyReferenceExpression(CodePropertyReferenceExpression propertyReferenceExpression, TextWriter w, CodeGeneratorOptions o)
		{
			if (propertyReferenceExpression == null)
				return false;

			GenerateCodeFromExpression(propertyReferenceExpression.TargetObject, w, o);
			w.Write(".");
			w.Write(propertyReferenceExpression.PropertyName);
			return true;
		}

		bool WriteCodeMethodInvokeExpression(CodeMethodInvokeExpression methodInvokeExpression, TextWriter w, CodeGeneratorOptions o)
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

		bool WriteCodeIndexerExpression(CodeIndexerExpression indexerExpression, TextWriter w, CodeGeneratorOptions o)
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

		bool WriteCodeExpressionStatement(CodeExpressionStatement expressStatement, TextWriter w, CodeGeneratorOptions o)
		{
			if (expressStatement == null)
				return false;

			w.Write(o.IndentString);
			GenerateCodeFromExpression(expressStatement.Expression, w, o);
			return true;
		}

		bool WriteCodeMethodReturnStatement(CodeMethodReturnStatement methodReturnStatement, TextWriter w, CodeGeneratorOptions o)
		{
			if (methodReturnStatement == null)
				return false;

			w.Write(o.IndentString);
			w.Write($"return ");
			GenerateCodeFromExpression(methodReturnStatement.Expression, w, o);
			return true;
		}

		bool WriteCodeThrowExceptionStatement(CodeThrowExceptionStatement throwExceptionStatement, TextWriter w, CodeGeneratorOptions o)
		{
			if (throwExceptionStatement == null)
				return false;

			w.Write(o.IndentString + "throw ");
			GenerateCodeFromExpression(throwExceptionStatement.ToThrow, w, o);
			return true;
		}

		bool WriteCodeBinaryOperatorExpression(CodeBinaryOperatorExpression binaryOperatorExpression, TextWriter w, CodeGeneratorOptions o)
		{
			if (binaryOperatorExpression == null)
				return false;

			GenerateCodeFromExpression(binaryOperatorExpression.Left, w, o);
			w.Write($" {GetCodeBinaryOperatorTypeText(binaryOperatorExpression.Operator)} ");
			GenerateCodeFromExpression(binaryOperatorExpression.Right, w, o);
			return true;
		}

		bool WriteCodeCastExpression(CodeCastExpression codeCastExpression, TextWriter w, CodeGeneratorOptions o)
		{
			if (codeCastExpression == null)
				return false;

			var tsTypeText = GetCodeTypeReferenceText(codeCastExpression.TargetType);
			w.Write("(");
			GenerateCodeFromExpression(codeCastExpression.Expression, w, o);
			w.Write(" as ");
			w.Write(tsTypeText);
			w.Write(")");
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
		bool WriteCodeCommentStatement(CodeCommentStatement commentStatement, TextWriter w, CodeGeneratorOptions o)
		{
			if (commentStatement == null)
				return false;

			if (commentStatement.Comment.DocComment)
			{
				var hasMultiLines = commentStatement.Comment.Text.Contains('\n');
				w.Write(o.IndentString + (hasMultiLines ? "/**" : "/** "));
				if (hasMultiLines)
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

		protected bool WriteCodeMemberField(CodeMemberField codeMemberField, TextWriter w, CodeGeneratorOptions o, CodeTypeDeclaration typeDeclaration)
		{
			if (codeMemberField == null)
				return false;

			WriteCodeCommentStatementCollection(codeMemberField.Comments, w, o);

			var typeOfType = GetTypeOfType(typeDeclaration);
			if (typeOfType== TypeOfType.IsClass && codeMemberField.CustomAttributes.Count > 0) // TS decorators applicable to class and its members only.
			{
				GenerateCodeFromAttributeDeclarationCollection(codeMemberField.CustomAttributes, w, o);
			}

			w.Write(o.IndentString);
			w.WriteLine(GetCodeMemberFieldText(codeMemberField) + ";");

			return true;
		}

		protected bool WriteCodeSnippetTypeMember(CodeSnippetTypeMember codeSnippetTypeMember, TextWriter w, CodeGeneratorOptions o)
		{
			if (codeSnippetTypeMember == null)
				return false;

			WriteCodeCommentStatementCollection(codeSnippetTypeMember.Comments, w, o);

			if (codeSnippetTypeMember.CustomAttributes.Count > 0)
			{
				GenerateCodeFromAttributeDeclarationCollection(codeSnippetTypeMember.CustomAttributes, w, o);
			}

			w.Write(o.IndentString);
			w.WriteLine(codeSnippetTypeMember.Text);
			return true;
		}

		//http://www.codebelt.com/typescript/javascript-getters-setters-typescript-accessor-tutorial/
		protected bool WriteCodeMemberProperty(CodeMemberProperty codeMemberProperty, TextWriter w, CodeGeneratorOptions o)
		{
			if (codeMemberProperty == null)
				return false;

			WriteCodeCommentStatementCollection(codeMemberProperty.Comments, w, o);

			if (codeMemberProperty.CustomAttributes.Count > 0)
			{
				GenerateCodeFromAttributeDeclarationCollection(codeMemberProperty.CustomAttributes, w, o);
			}

			var accessibility = GetAccessibilityModifier(codeMemberProperty.Attributes);
			if (accessibility=="public"){
				accessibility = string.Empty;
			}else{
				accessibility += " ";
			}

			var currentIndent = o.IndentString;
			var propertyType = GetCodeTypeReferenceText(codeMemberProperty.Type);
			if (codeMemberProperty.GetStatements.Count > 0)
			{
				w.Write(o.IndentString);
				w.WriteLine($"{accessibility}get {codeMemberProperty.Name}(): {propertyType} {{");
				o.IndentString += BasicIndent;
				WriteCodeStatementCollection(codeMemberProperty.GetStatements, w, o);
				w.Write(currentIndent);
				w.WriteLine("}");
				o.IndentString = currentIndent;
			}

			if (codeMemberProperty.SetStatements.Count > 0)
			{
				w.Write(o.IndentString);
				w.WriteLine($"{accessibility}set {codeMemberProperty.Name}(value: {propertyType}) {{");
				o.IndentString += BasicIndent;
				WriteCodeStatementCollection(codeMemberProperty.SetStatements, w, o);
				w.Write(currentIndent);
				w.WriteLine("}");
				o.IndentString = currentIndent;
			}

			return true;
		}

		bool WriteCodeMemberMethod(CodeMemberMethod memberMethod, TextWriter w, CodeGeneratorOptions o)
		{
			if (memberMethod == null)
				return false;

			WriteCodeCommentStatementCollection(memberMethod.Comments, w, o);

			if (memberMethod.CustomAttributes.Count > 0)
			{
				GenerateCodeFromAttributeDeclarationCollection(memberMethod.CustomAttributes, w, o);
			}

			var isCodeConstructor = memberMethod is CodeConstructor;
			var methodName = isCodeConstructor ? "constructor" : memberMethod.Name;
			w.Write(o.IndentString + methodName + "(");
			WriteCodeParameterDeclarationExpressionCollection(memberMethod.Parameters, w, o);
			w.Write(")");

			var returnTypeText = GetCodeTypeReferenceText(memberMethod.ReturnType);
			if (!(isCodeConstructor || returnTypeText == "void" || memberMethod.ReturnType == null))
			{
				w.Write(": " + returnTypeText);
			}

			w.WriteLine(" {");


			WriteCodeStatementCollection(memberMethod.Statements, w, o);

			w.WriteLine(o.IndentString + "}");
			return true;
		}

		void WriteCodeExpressionCollection(CodeExpressionCollection collection, TextWriter w, CodeGeneratorOptions o)
		{
			for (int i = 0; i < collection.Count; i++)
			{
				if (i > 0)
					w.Write(", ");
				GenerateCodeFromExpression(collection[i], w, o);
			}
		}

		bool WriteCodeArrayCreateExpression(CodeArrayCreateExpression arrayCreateExpression, TextWriter w, CodeGeneratorOptions o)
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

		bool WriteCodeAssignStatement(CodeAssignStatement assignStatement, TextWriter w, CodeGeneratorOptions o)
		{
			if (assignStatement == null)
				return false;

			w.Write(o.IndentString);
			GenerateCodeFromExpression(assignStatement.Left, w, o);
			w.Write(" = ");
			GenerateCodeFromExpression(assignStatement.Right, w, o);
			return true;
		}

		void WriteTypeMembersAndCloseBracing(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o)
		{
			if (typeDeclaration.IsEnum)
			{
				WriteEnumMembersAndCloseBracing(typeDeclaration, w, o);
			}
			else
			{
				var currentIndent = o.IndentString;
				o.IndentString += BasicIndent;
				w.WriteLine();
				for (int i = 0; i < typeDeclaration.Members.Count; i++)
				{
					var member = typeDeclaration.Members[i];
					WriteCodeRegionDirectives(member.StartDirectives, w);
					WriteCodeTypeMember(member, w, o, typeDeclaration);
					WriteCodeRegionDirectives(member.EndDirectives, w);
				};
				w.WriteLine(currentIndent + "}");
				o.IndentString = currentIndent;
			}
		}

		void WriteEnumMembersAndCloseBracing(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o)
		{
			var currentIndent = o.IndentString;
			o.IndentString += BasicIndent;

			var enumMembers = typeDeclaration.Members.OfType<CodeTypeMember>().ToList();
			bool anyMemberDocComment = enumMembers.Any(d => d.Comments.Count > 0);
			if (anyMemberDocComment)
			{
				var i = 0;
				w.WriteLine();
				enumMembers.ForEach(ctm =>
				{
					if (i > 0)
					{
						w.WriteLine(",");
					}


					var codeMemberField = ctm as CodeMemberField;
					System.Diagnostics.Trace.Assert(codeMemberField != null);

					//Handle the comment of the member
					WriteCodeCommentStatementCollection(ctm.Comments, w, o);//This will create a new line first
					w.Write(o.IndentString);

					var enumMemberText = GetEnumMember(codeMemberField);
					w.Write(enumMemberText);
					i++;
				});

				w.WriteLine();
				w.WriteLine(currentIndent + "}");
			}
			else
			{
				var i = 0;
				w.Write(" ");
				enumMembers.ForEach(ctm =>
				{
					if (i > 0)
					{
						w.Write(", ");
					}

					var codeMemberField = ctm as CodeMemberField;
					System.Diagnostics.Trace.Assert(codeMemberField != null);
					var enumMemberText = GetEnumMember(codeMemberField);
					w.Write(enumMemberText);
					i++;
				});

				w.WriteLine(" }");
			}

			o.IndentString = currentIndent;
		}

		/// <summary>
		/// ctm could be CodeMemberField, CodeMemberProperty, CodeMemberMethod or CodeSnippetTypeMember
		/// </summary>
		/// <param name="ctm"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		/// <param name="typeDeclaration"></param>
		void WriteCodeTypeMember(CodeTypeMember ctm, TextWriter w, CodeGeneratorOptions o, CodeTypeDeclaration typeDeclaration)
		{
			if (WriteCodeMemberField(ctm as CodeMemberField, w, o, typeDeclaration))
				return;

			if (WriteCodeMemberProperty(ctm as CodeMemberProperty, w, o))
				return;

			if (WriteCodeMemberMethod(ctm as CodeMemberMethod, w, o))
				return;

			if (WriteCodeSnippetTypeMember(ctm as CodeSnippetTypeMember, w, o))
				return;

			if (ctm==null){
				throw new ArgumentNullException(nameof(ctm));
			}

			Console.Error.WriteLine($"What is ${ctm.GetType().FullName}");
		}

		/// <summary>
		/// Write every statements with 1 more BasicIndent of the caller, and add ; and linebreak at the end,
		/// </summary>
		/// <param name="statements"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		void WriteCodeStatementCollection(CodeStatementCollection statements, TextWriter w, CodeGeneratorOptions o)
		{
			var currentIndent = o.IndentString;
			o.IndentString += BasicIndent;

			for (int i = 0; i < statements.Count; i++)
			{
				var statement = statements[i];
				if (!WriteCodeSnippetStatement(statement as CodeSnippetStatement, w, o) &&
					!WriteCodeCommentStatement(statement as CodeCommentStatement, w, o))
				{
					WriteCodeRegionDirectives(statement.StartDirectives, w);
					GenerateCodeFromStatement(statement, w, o);
					w.WriteLine(";");
					WriteCodeRegionDirectives(statement.EndDirectives, w);
				}
			}
			o.IndentString = currentIndent;
		}

		void WriteCodeParameterDeclarationExpressionCollection(CodeParameterDeclarationExpressionCollection parameterDeclarations, TextWriter w, CodeGeneratorOptions o)
		{
			var pairs = parameterDeclarations.OfType<CodeParameterDeclarationExpression>()
				.Select(d =>
				{
					if (d.CustomAttributes.Count>0){
						GenerateCodeFromAttributeDeclarationCollectionForParameter(d.CustomAttributes, w, o);
					}

					var isMethodParameter = (d.Type.UserData["IsMethodParameter"] as bool?).HasValue;
					var typeText = GetCodeTypeReferenceText(d.Type);
					var alreadyNullable = typeText.EndsWith("| null");
					var isAny = d.Type.BaseType == "any";
					var s = $"{d.Name}: {GetCodeTypeReferenceText(d.Type)}" + (isMethodParameter && !alreadyNullable && !isAny ? " | null" : string.Empty); // optional null
					return s;
				});
			w.Write(String.Join(", ", pairs));
		}

		protected bool WriteCodeCommentStatementCollection(CodeCommentStatementCollection comments, TextWriter w, CodeGeneratorOptions o)
		{
			if (comments.Count == 0)
				return false;

			w.WriteLine();

			for (int i = 0; i < comments.Count; i++)
			{
				WriteCodeCommentStatement(comments[i], w, o);
			}

			return true;
		}

		void WriteCodeMethodReferenceExpression(CodeMethodReferenceExpression expression, TextWriter w, CodeGeneratorOptions o)
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

		bool WriteCodeConditionStatement(CodeConditionStatement conditionStatement, TextWriter w, CodeGeneratorOptions o)
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
		bool WriteCodeTryCatchFinallyStatement(CodeTryCatchFinallyStatement tryCatchFinallyStatement, TextWriter w, CodeGeneratorOptions o)
		{
			if (tryCatchFinallyStatement == null)
				return false;

			w.Write(o.IndentString);
			w.WriteLine("try {");
			WriteCodeStatementCollection(tryCatchFinallyStatement.TryStatements, w, o);
			w.Write(o.IndentString);
			w.WriteLine("}");

			if (tryCatchFinallyStatement.CatchClauses.Count > 1)
				throw new ArgumentException("Javascript does not support multiple CatchClauses.", nameof(tryCatchFinallyStatement));

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
		void WriteCodeCatchClause(CodeCatchClause catchClause, TextWriter w, CodeGeneratorOptions o)
		{
			w.Write(o.IndentString);
			w.WriteLine($"catch ({catchClause.LocalName}) {{");
			WriteCodeStatementCollection(catchClause.Statements, w, o);
			w.Write(o.IndentString);
			w.WriteLine("}");
		}

		bool WriteCodeIterationStatement(CodeIterationStatement iterationStatement, TextWriter w, CodeGeneratorOptions o)
		{
			if (iterationStatement == null)
				return false;

			var currentIndent = o.IndentString;
			w.Write(o.IndentString);
			w.Write("for (let ");
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

		bool WriteCodeSnippetStatement(CodeSnippetStatement snippetStatement, TextWriter w, CodeGeneratorOptions o)
		{
			if (snippetStatement == null)
				return false;

			w.WriteLine(IndentLines(snippetStatement.Value, o.IndentString));
			return true;

		}

		bool WriteCodeVariableDeclarationStatement(CodeVariableDeclarationStatement variableDeclarationStatement, TextWriter w, CodeGeneratorOptions o)
		{
			if (variableDeclarationStatement == null)
				return false;

			w.Write(o.IndentString);
			w.Write($"var {variableDeclarationStatement.Name}: {GetCodeTypeReferenceText(variableDeclarationStatement.Type)}");

			if (variableDeclarationStatement.InitExpression != null)
			{
				w.Write(" = ");
				GenerateCodeFromExpression(variableDeclarationStatement.InitExpression, w, o);
			}

			return true;
		}

		bool WriteCodeRegionDirective(CodeRegionDirective codeRegionDirective, TextWriter w)
		{
			if (codeRegionDirective == null)
				return false;

			if (codeRegionDirective.RegionMode == CodeRegionMode.None)
			{
				return false;
			}

			if (codeRegionDirective.RegionMode== CodeRegionMode.Start)
			{
				w.WriteLine($"\r\n// #region {codeRegionDirective.RegionText}");
			}
			else
			{
				w.WriteLine("// #endregion");
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
		string GetCodeBinaryOperatorTypeText(CodeBinaryOperatorType t)
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

		string GetAccessibilityModifier(MemberAttributes a)
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

		string IndentLines(string s, string indent)
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
		protected string GetTypeOfTypeText(CodeTypeDeclaration typeDeclaration)
		{
			return typeDeclaration.IsEnum
				? "enum"
				: typeDeclaration.IsInterface
					? "interface"
					: "class";
		}

		protected TypeOfType GetTypeOfType(CodeTypeDeclaration typeDeclaration)
		{
			return typeDeclaration.IsEnum
				? TypeOfType.IsEnum
				: typeDeclaration.IsInterface
					? TypeOfType.IsInterface
					: TypeOfType.IsClass;
		}

		protected string GetTypeParametersExpression(CodeTypeDeclaration typeDeclaration)
		{
			if (typeDeclaration.TypeParameters.Count == 0)
				return string.Empty;

			var parameterNames = typeDeclaration.TypeParameters.OfType<CodeTypeParameter>().Select(d =>
			{
				var typeParameterConstraint = string.Empty;
				if (d.Constraints.Count > 0)
				{
					var constraint = d.Constraints.OfType<CodeTypeReference>().First();
					var type = GetCodeTypeReferenceText(constraint);
					typeParameterConstraint = $" extends {type}";
				}


				return $"{d.Name}{typeParameterConstraint}";
			}).ToArray();

			return parameterNames.Length == 0 ? String.Empty : $"<{String.Join(", ", parameterNames)}>";
		}

		protected string GetBaseTypeExpression(CodeTypeDeclaration typeDeclaration)
		{
			var baseTypes = typeDeclaration.BaseTypes
				.OfType<CodeTypeReference>()
				.Where(reference => TypeMapper.IsValidTypeForDerivation(reference))
				.Select(reference => GetCodeTypeReferenceText(reference))
				.ToList();
			if (baseTypes.Any() && !typeDeclaration.IsEnum)
			{
				return $" extends {string.Join(",", baseTypes)}";
			}

			return String.Empty;
		}

		string GetEnumMember(CodeMemberField member)
		{
			return (!(member.InitExpression is CodePrimitiveExpression initExpression)) ? $"{member.Name}" : $"{member.Name} = {initExpression.Value}";
		}

		string GetCodeMemberFieldText(CodeMemberField codeMemberField)
		{
			var isRequired = !codeMemberField.Name.EndsWith("?");
			var fieldName = codeMemberField.Name;
			var tsTypeName = GetCodeTypeReferenceText(codeMemberField.Type);
			if (isRequired)
			{
				return RefineNameAndType(fieldName, tsTypeName);
			}

			var isAny = codeMemberField.Name == "any";
			var fieldTypeInfo = codeMemberField.Type.UserData["FieldTypeInfo"] as FieldTypeInfo;
			if (fieldTypeInfo != null)
			{
				var isComplex = fieldTypeInfo.IsArray || fieldTypeInfo.IsComplex;
				var alreadyNullable = tsTypeName.Contains("| null");
				if (!alreadyNullable && !isAny && !isComplex)  //todo: refine this after
				{
					tsTypeName += " | null"; //optional null
				}
			}
			else
			{
				Console.Error.WriteLine("No FieldTypeInfo in UserData");
			}

			return RefineNameAndType(fieldName, tsTypeName);
		}

		/// <summary>
		/// Primitive, or string, or enum types
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		public static bool IsSimpleType(Type type)
		{
			return type.IsPrimitive || type.Equals(typeOfString) || type.IsEnum
				|| (!string.IsNullOrEmpty(type.FullName) && type.FullName.StartsWith("System.")); //for System.Guid and System.Date etc.
		}

		public static bool IsComplexType(Type type)
		{
			return !IsSimpleType(type);
		}

		protected string GetCodeTypeReferenceText(CodeTypeReference codeTypeReference)
		{
			return TypeMapper.MapCodeTypeReferenceToTsText(codeTypeReference);
		}

		string RefineNameAndType(string name, string typeName)
		{
			return $"{name}: {typeName}";
		}

		#endregion
	}

}
