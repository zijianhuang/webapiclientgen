﻿using Fonlow.Poco2Ts;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Fonlow.TypeScriptCodeDom
{
	/// <summary>
	/// Output TS codes through TextWriter, for Angular FormGroup
	/// </summary>
	public class CodeObjectHelperForNg2FormGroup : CodeObjectHelper
	{
		readonly CodeNamespaceCollection codeNamespaceCollection;
		readonly bool careForDateOnly;

		public CodeObjectHelperForNg2FormGroup(CodeNamespaceCollection codeNamespaceCollection, bool careForDateOnly=false) : base(true)
		{
			this.codeNamespaceCollection = codeNamespaceCollection;
			this.careForDateOnly = careForDateOnly;
		}

		/// <summary>
		/// Generate type declarations as interfaces, typed FormGroup declarations as interfaces, 
		/// </summary>
		/// <param name="e"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		public override void GenerateCodeFromNamespace(CodeNamespace e, TextWriter w, CodeGeneratorOptions o)
		{
			WriteCodeCommentStatementCollection(e.Comments, w, o);

			string refinedNamespaceText = e.Name.Replace('.', '_');
			string namespaceOrModule = asModule ? "export namespace" : "namespace";
			w.WriteLine($"{namespaceOrModule} {refinedNamespaceText} {{");

			for (int i = 0; i < e.Imports.Count; i++)
			{
				CodeNamespaceImport ns = e.Imports[i];
				string nsText = ns.Namespace;
				string alias = nsText.Replace('.', '_');
				w.WriteLine($"{o.IndentString}import {alias} = {nsText};");
			}

			e.Types.OfType<CodeTypeDeclaration>().ToList().ForEach(t =>
			{
				GenerateCodeFromType(t, w, o);

				string typeExpression = GetTypeParametersExpression(t);
				bool isGeneric = typeExpression.Contains('<');
				if (!t.IsPartial && !isGeneric) //controllerClass is partial, as declared in CreateControllerClientClass()
				{
					GenerateAngularFormFromType(t, w, o);
					GenerateAngularFormGroupFunctionFromType(t, w, o);
				}

				w.WriteLine();
			});

			w.WriteLine($"}}");
		}

		/// <summary>
		/// Find CodeTypeDeclaration among namespaces in the CodeDOM.
		/// </summary>
		/// <param name="typeName">Type name including namespace.</param>
		/// <returns></returns>
		CodeTypeDeclaration FindCodeTypeDeclaration(string typeName)
		{
			//Console.WriteLine("All TypeDeclarations: " + string.Join("; ", currentCodeNamespace.Types.OfType<CodeTypeDeclaration>().Select(d=>d.Name)));
			for (int i = 0; i < codeNamespaceCollection.Count; i++)
			{
				CodeNamespace ns = codeNamespaceCollection[i];
				CodeTypeDeclaration found = ns.Types.OfType<CodeTypeDeclaration>().ToList().Find(t => ns.Name + "." + t.Name == typeName);
				if (found != null)
				{
					return found;
				}
			}

			return null;
		}

		/// <summary>
		/// Generate TS interface for FormGroup, like:
		/// 	export interface AddressFormProperties {
		/// 	city: FormControl<string | null | undefined>,
		/// 	country: FormControl<string | null | undefined>,
		///		id: FormControl<string | null | undefined> 
		///		}
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

			GenerateCodeFromAttributeDeclarationCollectionForClass(e.CustomAttributes, w, o);

			string accessModifier = ((e.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export " : String.Empty;
			string typeOfTypeText = GetTypeOfTypeText(e);
			string name = e.Name;
			string typeParametersExpression = GetTypeParametersExpression(e);
			string baseTypesExpression = GetBaseTypeExpression(e);
			if (typeOfTypeText == "interface")
			{
				string extendsExpression = $"{typeParametersExpression}{baseTypesExpression}";
				bool isGeneric = extendsExpression.Contains('<');
				string formPropertiesSuffix = isGeneric ? String.Empty : "FormProperties";
				string extendsExpressionForNg = string.IsNullOrEmpty(extendsExpression) ? String.Empty : $"{extendsExpression}{formPropertiesSuffix}";
				string formGroupInterface = $"{name}FormProperties";
				w.Write($"{o.IndentString}{accessModifier}{typeOfTypeText} {formGroupInterface}{extendsExpressionForNg} {{");
				WriteAngularFormTypeMembersAndCloseBracing(e, w, o);
			}
			else
			{
				throw new ArgumentException("Expect TypeOfType is interface if e is not enum", nameof(e));
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

			string accessModifier = ((e.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export " : String.Empty;
			string typeOfTypeText = GetTypeOfTypeText(e);
			string name = e.Name;
			string typeParametersExpression = GetTypeParametersExpression(e);
			string baseTypesExpression = GetBaseTypeExpression(e);
			if (typeOfTypeText == "interface")
			{
				string extendsExpression = $"{typeParametersExpression}{baseTypesExpression}";
				bool isGeneric = extendsExpression.Contains('<');
				string formPropertiesSuffix = isGeneric ? String.Empty : "FormProperties";
				string formGroupInterface = $"{name}FormProperties";
				w.Write($"{o.IndentString}{accessModifier}function Create{name}FormGroup() {{");
				w.WriteLine();
				w.Write($"{o.IndentString}{o.IndentString}return new FormGroup<{formGroupInterface}>({{");

				WriteAngularFormGroupMembersAndCloseBracing(e, w, o);
				w.WriteLine($"{o.IndentString}}}");
			}
			else
			{
				throw new ArgumentException("Expect TypeOfType is interface if e is not enum", nameof(e));
			}
		}

		/// <summary>
		/// Return the text of a FormControl field, like:
		/// dob : FormControl&lt;Date&gt;
		/// </summary>
		/// <param name="codeMemberField"></param>
		/// <returns></returns>
		static string GetCodeMemberFieldTextForAngularFormControl(CodeMemberField codeMemberField)
		{
			string tsTypeName = RefineAngularFormControlTypeName(codeMemberField);
			string fieldName = codeMemberField.Name.EndsWith('?') ? codeMemberField.Name.Substring(0, codeMemberField.Name.Length - 1) : codeMemberField.Name;
			return $"{fieldName}: FormControl<{tsTypeName}>";
		}

		/// <summary>
		/// Refine the FormControl type of the FormGroup type interface, and add " | null | undefined".
		/// </summary>
		/// <param name="codeMemberField"></param>
		/// <returns></returns>
		static string RefineAngularFormControlTypeName(CodeMemberField codeMemberField)
		{
			string tsTypeName = GetCodeTypeReferenceText(codeMemberField.Type);
			bool alreadyNullable = tsTypeName.Contains("| null");
			if (alreadyNullable)
			{
				tsTypeName += " | undefined";
			}
			else
			{
				tsTypeName += " | null | undefined"; // optional null
			}

			return tsTypeName;
		}


		readonly Dictionary<string, string> integralJsNumberValidatorsDic = new Dictionary<string, string>
		{
			{ "System.SByte", "Validators.min(-127), Validators.max(127)" },
			{ "System.Byte", "Validators.min(0), Validators.max(256)" },
			{ "System.Int16", "Validators.min(-32768), Validators.max(32767)" },
			{ "System.UInt16", "Validators.min(0), Validators.max(65535)" },
			{ "System.Int32", "Validators.min(-2147483648), Validators.max(2147483647)" },
			{ "System.UInt32", "Validators.min(0), Validators.max(4294967295)" },
			// for long and unlong, things become tricky, as in JavaScript Number.MAX_SAFE_INTEGER=9007199254740991, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
			// better let app programmers decide what to do.
		};

		readonly Dictionary<string, string> integralJsStringValidatorsDic = new Dictionary<string, string>
		{
			{ "System.Int64", "Validators.pattern('/^-?\\d{0,19}$/')" }, // use https://regexr.com/ to verify
			{ "System.UInt64", "Validators.pattern('/^\\d{0,20}$/')" },
			{ "System.Int128", "Validators.pattern('/^-?\\d{0,39}$/')" },
			{ "System.UInt128", "Validators.pattern('/^\\d{0,30}$/')" },
			{ "System.Numerics.BigInteger", "Validators.pattern('/^-?\\d*$/')" },
		};

		/// <summary>
		/// For FormGroup creation, return something like:
		/// "name: new FormControl&lt;string | null | undefined&gt;(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)])"
		/// </summary>
		/// <param name="codeMemberField"></param>
		/// <returns>Text of FormControl creation.</returns>
		string GetCodeMemberFieldTextForAngularFormGroup(CodeMemberField codeMemberField)
		{
			Attribute[] customAttributes = codeMemberField.UserData[UserDataKeys.CustomAttributes] as Attribute[];
			string fieldName = codeMemberField.Name.EndsWith('?') ? codeMemberField.Name.Substring(0, codeMemberField.Name.Length - 1) : codeMemberField.Name;
			FieldTypeInfo fieldTypeInfo = codeMemberField.Type.UserData[UserDataKeys.FieldTypeInfo] as FieldTypeInfo;

			if (customAttributes?.Length > 0)
			{
				//Console.WriteLine("customAttributes: " + string.Join(", ",  customAttributes));
				List<string> validatorList = new List<string>();
				for (int i = 0; i < customAttributes.Length; i++)
				{
					Attribute ca = customAttributes[i];
					string attributeName = ca.GetType().FullName;
					Console.Write(attributeName + ", ");
					switch (attributeName)
					{
						case "System.ComponentModel.DataAnnotations.RequiredAttribute":
							validatorList.Add("Validators.required");
							break;
						case "System.ComponentModel.DataAnnotations.MaxLengthAttribute":
							System.ComponentModel.DataAnnotations.MaxLengthAttribute a = ca as System.ComponentModel.DataAnnotations.MaxLengthAttribute;
							validatorList.Add($"Validators.maxLength({a.Length})");
							break;
						case "System.ComponentModel.DataAnnotations.MinLengthAttribute":
							System.ComponentModel.DataAnnotations.MinLengthAttribute am = ca as System.ComponentModel.DataAnnotations.MinLengthAttribute;
							validatorList.Add($"Validators.minLength({am.Length})");
							break;
						case "System.ComponentModel.DataAnnotations.RangeAttribute":
							System.ComponentModel.DataAnnotations.RangeAttribute ar = ca as System.ComponentModel.DataAnnotations.RangeAttribute;
							if (ar.Minimum != null)
							{
								validatorList.Add($"Validators.min({ar.Minimum})");
							}

							if (ar.Maximum != null)
							{
								validatorList.Add($"Validators.max({ar.Maximum})");
							}

							break;
						case "System.ComponentModel.DataAnnotations.LengthAttribute":
							System.ComponentModel.DataAnnotations.LengthAttribute lenAtr = ca as System.ComponentModel.DataAnnotations.LengthAttribute;
							if (lenAtr.MinimumLength > 0)
							{
								validatorList.Add($"Validators.minLength({lenAtr.MinimumLength})");
							}

							if (lenAtr.MaximumLength > 0)
							{
								validatorList.Add($"Validators.maxLength({lenAtr.MaximumLength})");
							}

							break;
						case "System.ComponentModel.DataAnnotations.StringLengthAttribute":
							System.ComponentModel.DataAnnotations.StringLengthAttribute ast = ca as System.ComponentModel.DataAnnotations.StringLengthAttribute;
							if (ast.MinimumLength > 0)
							{
								validatorList.Add($"Validators.minLength({ast.MinimumLength})");
							}

							if (ast.MaximumLength > 0)
							{
								validatorList.Add($"Validators.maxLength({ast.MaximumLength})");
							}

							break;
						case "System.ComponentModel.DataAnnotations.EmailAddressAttribute":
							validatorList.Add("Validators.email");
							break;
						case "System.ComponentModel.DataAnnotations.RegularExpressionAttribute":
							System.ComponentModel.DataAnnotations.RegularExpressionAttribute rp = ca as System.ComponentModel.DataAnnotations.RegularExpressionAttribute;
							string escapedPattern = rp.Pattern
								.Replace("\\'", "\\\\'") // must run first before escaping single quote
								.Replace("'", "\\'")
								.Replace("\\0", "0o")
								;

							string escapedPattern2 = EscapeRegexCapturingGroup(escapedPattern);
							validatorList.Add($"Validators.pattern('{escapedPattern2}')");
							break;
						default:
							break;
					}
				}

				bool isFieldDateOnly = false;

				if (fieldTypeInfo != null)
				{
					bool validatorsHasValidatorMinOrMax = validatorList.Exists(d => d.Contains("max(") || d.Contains("min"));
					if (!validatorsHasValidatorMinOrMax) // no programmer defined validator about max and min
					{
						if (integralJsNumberValidatorsDic.TryGetValue(fieldTypeInfo.ClrType.FullName, out string integralValidators))
						{
							validatorList.Add(integralValidators);
						}
					}

					if (integralJsStringValidatorsDic.TryGetValue(fieldTypeInfo.ClrType.FullName, out string integralJsStringValidators))
					{
						validatorList.Add(integralJsStringValidators);
					}

					if (fieldTypeInfo.ClrType == typeof(DateOnly) || fieldTypeInfo.ClrType == typeof(DateOnly?))
					{
						isFieldDateOnly = true;
					}
				}

				string text = String.Join(", ", validatorList);
				string tsTypeName = RefineAngularFormControlTypeName(codeMemberField);

				if (isFieldDateOnly && careForDateOnly)
				{
					return $"{fieldName}: CreateDateOnlyFormControl()";
				}
				else
				{
					return string.IsNullOrEmpty(text) ? $"{fieldName}: new FormControl<{tsTypeName}>(undefined)" :
						$"{fieldName}: new FormControl<{tsTypeName}>(undefined, [{text}])";
				}
			}
			else
			{
				string tsTypeName = RefineAngularFormControlTypeName(codeMemberField);
				return $"{fieldName}: new FormControl<{tsTypeName}>(undefined)";
			}
		}

		static string EscapeRegexCapturingGroup(string s)
		{
			Regex regex = new Regex("\\\\\\d+");
			string r = s;
			MatchCollection matches = regex.Matches(s);
			foreach (Match m in matches.ToArray())
			{
				string refinedP = m.Value.Replace("\\", "\\\\");
				r = r.Replace(m.Value, refinedP);
			}

			return r;
		}

		void WriteAngularFormTypeMembersAndCloseBracing(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o)
		{

			if (typeDeclaration.IsEnum)
			{
				throw new NotSupportedException("Should run to here");
				//w.WriteLine($"{typeDeclaration.Name}: {typeDeclaration.BaseTypes}");
			}
			else
			{
				string currentIndent = o.IndentString;
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
				string currentIndent = o.IndentString;
				o.IndentString += BasicIndent;
				w.WriteLine();
				if (typeDeclaration.BaseTypes.Count > 0)
				{
					CodeTypeReference parentTypeReference = typeDeclaration.BaseTypes[0];
					string parentTypeName = TypeMapper.MapCodeTypeReferenceToTsText(parentTypeReference); //namspace prefix included
																										  //Console.WriteLine("parentTypeName: " + parentTypeName);
					CodeTypeDeclaration parentCodeTypeDeclaration = FindCodeTypeDeclaration(parentTypeName);
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

		/// <summary>
		/// 
		/// </summary>
		/// <param name="ctm"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		void WriteCodeTypeMemberOfAngularForm(CodeTypeMember ctm, TextWriter w, CodeGeneratorOptions o)
		{
			if (ctm is CodeMemberField codeMemberField)
			{
				CodeTypeDeclaration codeTypeDeclaration = FindCodeTypeDeclaration(codeMemberField.Type.BaseType);
				if (codeTypeDeclaration != null && !codeTypeDeclaration.IsEnum)
				{
					return; // is custom complex type
				}
				else if (codeMemberField.Type.ArrayRank > 0)
				{
					return;
				}

				WriteCodeCommentStatementCollection(ctm.Comments, w, o);

				w.Write(o.IndentString);
				w.WriteLine(GetCodeMemberFieldTextForAngularFormControl(codeMemberField) + ",");
				return;
			}

			//if (WriteCodeMemberProperty(ctm as CodeMemberProperty, w, o))
			//	return;

			//if (ctm is CodeSnippetTypeMember snippetTypeMember)
			//{
			//	w.WriteLine(snippetTypeMember.Text);
			//	return;
			//}

			throw new ArgumentException("Expect CodeMemberField", nameof(ctm));
		}

		/// <summary>
		/// Write FormControl creation codes, for member fields of simple types. Complex types and array types are skipped.
		/// </summary>
		/// <param name="ctm"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		/// <exception cref="ArgumentException">If ctm is not CodeMemberField.</exception>
		void WriteCodeTypeMemberOfAngularFormGroup(CodeTypeMember ctm, TextWriter w, CodeGeneratorOptions o)
		{
			if (ctm is CodeMemberField codeMemberField)
			{
				CodeTypeDeclaration codeTypeDeclaration = FindCodeTypeDeclaration(codeMemberField.Type.BaseType);
				if (codeTypeDeclaration != null && !codeTypeDeclaration.IsEnum)
				{
					return; // is custom complex type
				}
				else if (codeMemberField.Type.ArrayRank > 0)
				{
					return;
				}

				w.Write(o.IndentString + BasicIndent);
				w.WriteLine(GetCodeMemberFieldTextForAngularFormGroup(codeMemberField) + ",");
				return;
			}

			//CodeMemberProperty is not supported

			throw new ArgumentException("Expect CodeMemberField", nameof(ctm));
		}

	}

}
