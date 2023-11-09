using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Fonlow.TypeScriptCodeDom
{
	/// <summary>
	/// Output TS codes through TextWriter, for Angular FormGroup
	/// </summary>
	public class CodeObjectHelperForNg2FormGroup : CodeObjectHelper
	{
		readonly CodeNamespaceCollection codeNamespaceCollection;

		public CodeObjectHelperForNg2FormGroup(CodeNamespaceCollection codeNamespaceCollection) : base(true)
		{
			this.codeNamespaceCollection = codeNamespaceCollection;
		}

		#region public GenerateCodeFromXXX

		public override void GenerateCodeFromNamespace(CodeNamespace e, TextWriter w, CodeGeneratorOptions o)
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
			//Console.WriteLine("All TypeDeclarations: " + string.Join("; ", currentCodeNamespace.Types.OfType<CodeTypeDeclaration>().Select(d=>d.Name)));
			for (int i = 0; i < codeNamespaceCollection.Count; i++)
			{
				var ns = codeNamespaceCollection[i];
				var found = ns.Types.OfType<CodeTypeDeclaration>().ToList().Find(t => ns.Name + "." + t.Name == tName);
				if (found != null)
				{
					return found;
				}
			}

			return null;
		}

		/// <summary>
		/// Generate TS interface for FormGroup
		/// </summary>
		/// <param name="e"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		void GenerateAngularFormFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
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

		/// <summary>
		/// Generate TS helper function of creating FormGroup object.
		/// </summary>
		/// <param name="e"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		void GenerateAngularFormGroupFunctionFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
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

		string GetCodeMemberFieldTextForAngularFormControl(CodeMemberField codeMemberField)
		{
			var tsTypeName = RefineAngularFormControlTypeName(codeMemberField);
			var fieldName = codeMemberField.Name.EndsWith("?") ? codeMemberField.Name.Substring(0, codeMemberField.Name.Length - 1) : codeMemberField.Name;
			return $"{fieldName}: FormControl<{tsTypeName}>";
		}

		string RefineAngularFormControlTypeName(CodeMemberField codeMemberField)
		{
			var tsTypeName = GetCodeTypeReferenceText(codeMemberField.Type);
			var alreadyNullable = tsTypeName.Contains("| null");
			if (alreadyNullable)
			{
				tsTypeName += " | undefined";
			}
			else
			{
				tsTypeName += " | null | undefined";
			}

			return tsTypeName;
		}

		string GetCodeMemberFieldTextForAngularFormGroup(CodeMemberField codeMemberField)
		{
			var customAttributes = codeMemberField.UserData["CustomAttributes"] as Attribute[];
			var fieldName = codeMemberField.Name.EndsWith("?") ? codeMemberField.Name.Substring(0, codeMemberField.Name.Length - 1) : codeMemberField.Name;
			if (customAttributes?.Length > 0)
			{
				//Console.WriteLine("customAttributes: " + string.Join(", ",  customAttributes));
				var validatorList = new List<string>();
				Console.Write("CustomAttributes: ");
				for (int i = 0; i < customAttributes.Length; i++)
				{
					var ca = customAttributes[i];
					var attributeName = ca.GetType().FullName;
					Console.Write(attributeName + ", ");
					switch (attributeName)
					{
						case "System.ComponentModel.DataAnnotations.RequiredAttribute":
							validatorList.Add("Validators.required");
							break;
						case "System.ComponentModel.DataAnnotations.MaxLengthAttribute":
							var a = ca as System.ComponentModel.DataAnnotations.MaxLengthAttribute;
							validatorList.Add($"Validators.maxLength({a.Length})");
							break;
						case "System.ComponentModel.DataAnnotations.MinLengthAttribute":
							var am = ca as System.ComponentModel.DataAnnotations.MinLengthAttribute;
							validatorList.Add($"Validators.minLength({am.Length})");
							break;
						case "System.ComponentModel.DataAnnotations.RangeAttribute":
							var ar = ca as System.ComponentModel.DataAnnotations.RangeAttribute;
							if (ar.Maximum != null)
							{
								validatorList.Add($"Validators.max({ar.Maximum})");
							}

							if (ar.Minimum != null)
							{
								validatorList.Add($"Validators.min({ar.Minimum})");
							}

							break;
						case "System.ComponentModel.DataAnnotations.StringLengthAttribute":
							var ast = ca as System.ComponentModel.DataAnnotations.StringLengthAttribute;
							if (ast.MaximumLength >0)
							{
								validatorList.Add($"Validators.maxLength({ast.MaximumLength})");
							}

							if (ast.MinimumLength > 0)
							{
								validatorList.Add($"Validators.minLength({ast.MinimumLength})");
							}

							break;
						case "System.ComponentModel.DataAnnotations.EmailAddressAttribute":
							validatorList.Add("Validators.email");
							break;
						default:
							break;
					}
				}
				Console.WriteLine();

				var text = String.Join(", ", validatorList);
				var tsTypeName = RefineAngularFormControlTypeName(codeMemberField);
				return string.IsNullOrEmpty(text) ? $"{fieldName}: new FormControl<{tsTypeName}>(undefined)" :
					$"{fieldName}: new FormControl<{tsTypeName}>(undefined, [{text}])";
			}
			else
			{
				var tsTypeName = RefineAngularFormControlTypeName(codeMemberField);
				return $"{fieldName}: new FormControl<{tsTypeName}>(undefined)";
			}
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
					//Console.WriteLine("parentTypeName: " + parentTypeName);
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
				w.WriteLine(GetCodeMemberFieldTextForAngularFormControl(codeMemberField) + ",");
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

			if (ctm is CodeSnippetTypeMember snippetTypeMember)
			{
				w.WriteLine(snippetTypeMember.Text);
				return;
			}

		}

		#endregion

	}

}
