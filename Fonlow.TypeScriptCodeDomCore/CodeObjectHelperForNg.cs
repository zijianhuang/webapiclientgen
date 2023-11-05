using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;

namespace Fonlow.TypeScriptCodeDom
{
	/// <summary>
	/// Output TS codes through TextWriter, for Angular FormGroup
	/// </summary>
	public class CodeObjectHelperForNg : CodeObjectHelper
	{
		CodeNamespace currentCodeNamespace;

		public CodeObjectHelperForNg() : base(true)
		{
		}

		#region public GenerateCodeFromXXX

		internal override void GenerateCodeFromNamespace(CodeNamespace e, TextWriter w, CodeGeneratorOptions o)
		{
			currentCodeNamespace = e;
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

				var typeExpression = GetTypeParametersExpression(t);
				var isGeneric = typeExpression.Contains("<");
				if (!t.IsPartial && !isGeneric) //controllerClass is partial, as declared in CreateControllerClientClass()
				{
					GenerateAngularFormFromType(t, w, o);
					GenerateAngularFormGroupFunctionFromType(t, w, o);
				}

				w.WriteLine();
			});

			w.WriteLine($"}}");
		}

		CodeTypeDeclaration FindCodeTypeDeclaration(string tName)
		{
			Console.WriteLine("All TypeDeclarations: " + string.Join("; ", currentCodeNamespace.Types.OfType<CodeTypeDeclaration>().Select(d=>d.Name)));
			return currentCodeNamespace.Types.OfType<CodeTypeDeclaration>().ToList().Find(t=>currentCodeNamespace.Name + "." + t.Name== tName);
		}

		internal void GenerateAngularFormFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
		{
			if (e.IsEnum)
			{
				return;
			}

			WriteCodeCommentStatementCollection(e.Comments, w, o);

			GenerateCodeFromAttributeDeclarationCollection(e.CustomAttributes, w, o);

			var accessModifier = ((e.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export " : String.Empty;
			var typeOfType = GetTypeOfType(e);
			var name = e.Name;
			var typeParametersExpression = GetTypeParametersExpression(e);
			var baseTypesExpression = GetBaseTypeExpression(e);
			if (typeOfType == "interface")
			{
				var extendsExpression = $"{typeParametersExpression}{baseTypesExpression}";
				var isGeneric = extendsExpression.Contains("<");
				var formPropertiesSuffix = isGeneric ? String.Empty : "FormProperties";
				var extendsExpressionForNg = extendsExpression == String.Empty ? String.Empty : $"{extendsExpression}{formPropertiesSuffix}";
				var formGroupInterface = $"{name}FormProperties";
				w.Write($"{o.IndentString}{accessModifier}{typeOfType} {formGroupInterface}{extendsExpressionForNg} {{");
				WriteAngularFormTypeMembersAndCloseBracing(e, w, o);
			}
			else
			{
				//do nothing.
			}
		}

		internal void GenerateAngularFormGroupFunctionFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
		{
			if (e.IsEnum)
			{
				return;
			}

			//GenerateCodeFromAttributeDeclarationCollection(e.CustomAttributes, w, o);

			var accessModifier = ((e.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export " : String.Empty;
			var typeOfType = GetTypeOfType(e);
			var name = e.Name;
			var typeParametersExpression = GetTypeParametersExpression(e);
			var baseTypesExpression = GetBaseTypeExpression(e);
			if (typeOfType == "interface")
			{
				var extendsExpression = $"{typeParametersExpression}{baseTypesExpression}";
				var isGeneric = extendsExpression.Contains("<");
				var formPropertiesSuffix = isGeneric ? String.Empty : "FormProperties";
				var extendsExpressionForNg = extendsExpression == String.Empty ? String.Empty : $"{extendsExpression}{formPropertiesSuffix}";
				var formGroupInterface = $"{name}FormProperties";
				w.Write($"{o.IndentString}{accessModifier}function Create{name}FormGroup() {{");
				w.WriteLine();
				w.Write($"{o.IndentString}{o.IndentString}return new FormGroup<{formGroupInterface}>({{");

				WriteAngularFormGroupMembersAndCloseBracing(e, w, o);
				w.WriteLine($"{o.IndentString}}}");
			}
			else
			{
				//do nothing.
			}
		}

		string GetCodeMemberFieldTextForAngularForm(CodeMemberField codeMemberField)
		{
			var fieldName = codeMemberField.Name.EndsWith("?") ? codeMemberField.Name.Substring(0, codeMemberField.Name.Length - 1) : codeMemberField.Name;
			return $"{fieldName}: FormControl<{GetCodeTypeReferenceText(codeMemberField.Type)} | null | undefined>";
		}

		string GetCodeMemberFieldTextForAngularFormGroup(CodeMemberField codeMemberField)
		{
			var fieldName = codeMemberField.Name.EndsWith("?") ? codeMemberField.Name.Substring(0, codeMemberField.Name.Length - 1) : codeMemberField.Name;
			return $"{fieldName}: new FormControl<{GetCodeTypeReferenceText(codeMemberField.Type)} | null | undefined>(undefined)";
		}

		#endregion





		#region WriteCodeXXXX

		void WriteAngularFormTypeMembersAndCloseBracing(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o)
		{

			if (typeDeclaration.IsEnum)
			{
				throw new NotSupportedException("Should run to here");
				//w.WriteLine($"{typeDeclaration.Name}: {typeDeclaration.BaseTypes}");
			}
			else
			{
				var currentIndent = o.IndentString;
				o.IndentString += BasicIndent;
				w.WriteLine();
				for (int i = 0; i < typeDeclaration.Members.Count; i++)
				{
					WriteCodeTypeMemberOfAngularForm(typeDeclaration.Members[i], w, o);
				};
				w.WriteLine(currentIndent + "}");
				o.IndentString = currentIndent;
			}
		}

		void WriteAngularFormGroupMembersAndCloseBracing(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o)
		{

			if (typeDeclaration.IsEnum)
			{
				throw new NotSupportedException("Should run to here");
				//w.WriteLine($"{typeDeclaration.Name}: {typeDeclaration.BaseTypes}");
			}
			else
			{
				var currentIndent = o.IndentString;
				o.IndentString += BasicIndent;
				w.WriteLine();
				if (typeDeclaration.BaseTypes.Count > 0)
				{
					var parentTypeReference = typeDeclaration.BaseTypes[0];
					var parentTypeName = TypeMapper.MapCodeTypeReferenceToTsText(parentTypeReference); //namspace prefix included
					Console.WriteLine("parentTypeName: " + parentTypeName);
					var parentCodeTypeDeclaration = FindCodeTypeDeclaration(parentTypeName);
					if (parentCodeTypeDeclaration != null)
					{
						for (int i = 0; i < parentCodeTypeDeclaration.Members.Count; i++)
						{
							WriteCodeTypeMemberOfAngularFormGroup(parentCodeTypeDeclaration.Members[i], w, o);
						};
					}
				}

				for (int i = 0; i < typeDeclaration.Members.Count; i++)
				{
					WriteCodeTypeMemberOfAngularFormGroup(typeDeclaration.Members[i], w, o);
				};
				w.WriteLine(currentIndent + BasicIndent + "});");
				w.WriteLine();
				o.IndentString = currentIndent;
			}
		}

		void WriteCodeTypeMemberOfAngularForm(CodeTypeMember ctm, TextWriter w, CodeGeneratorOptions o)
		{
			WriteCodeCommentStatementCollection(ctm.Comments, w, o);

			if (ctm is CodeMemberField codeMemberField)
			{
				var codeTypeDeclaration = FindCodeTypeDeclaration(codeMemberField.Type.BaseType);
				if (codeTypeDeclaration != null && !codeTypeDeclaration.IsEnum)
				{
					return; // is custom complex type
				}
				else if (codeMemberField.Type.ArrayRank > 0)
				{
					return;
				}

				w.Write(o.IndentString);
				w.WriteLine(GetCodeMemberFieldTextForAngularForm(codeMemberField) + ",");
				return;
			}

			if (WriteCodeMemberProperty(ctm as CodeMemberProperty, w, o))
				return;

			//if (WriteCodeMemberMethod(ctm as CodeMemberMethod, w, o))
			//	return;

			if (ctm is CodeSnippetTypeMember snippetTypeMember)
			{
				w.WriteLine(snippetTypeMember.Text);
				return;
			}

		}

		void WriteCodeTypeMemberOfAngularFormGroup(CodeTypeMember ctm, TextWriter w, CodeGeneratorOptions o)
		{
			if (ctm is CodeMemberField codeMemberField)
			{
				var codeTypeDeclaration = FindCodeTypeDeclaration(codeMemberField.Type.BaseType);
				if (codeTypeDeclaration != null && !codeTypeDeclaration.IsEnum)
				{
					return; // is custom complex type
				}
				else if (codeMemberField.Type.ArrayRank>0)
				{
					return;
				}

				w.Write(o.IndentString + BasicIndent);
				w.WriteLine(GetCodeMemberFieldTextForAngularFormGroup(codeMemberField) + ",");
				return;
			}

			if (WriteCodeMemberProperty(ctm as CodeMemberProperty, w, o))
				return;

			//if (WriteCodeMemberMethod(ctm as CodeMemberMethod, w, o))
			//	return;

			if (ctm is CodeSnippetTypeMember snippetTypeMember)
			{
				w.WriteLine(snippetTypeMember.Text);
				return;
			}

		}

		#endregion

	}

}
