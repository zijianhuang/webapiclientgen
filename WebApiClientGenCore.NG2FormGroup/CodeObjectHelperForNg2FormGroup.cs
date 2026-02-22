using Fonlow.CodeDom.Web;
using Fonlow.Poco2Ts;
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
		readonly UseRegexAttr useRegexAttribute;
		readonly string[] classesForNgSignalForm;

		public CodeObjectHelperForNg2FormGroup(CodeNamespaceCollection codeNamespaceCollection, JSOutput jsOutput) : base(true)
		{
			this.codeNamespaceCollection = codeNamespaceCollection;
			this.careForDateOnly = jsOutput.NgDateOnlyFormControlEnabled;
			this.useRegexAttribute = jsOutput.NgUseRegexAttribute;
			classesForNgSignalForm = null; //todo: jsOutput.ClassesForNgSignalForm;
		}

		/// <summary>
		/// Generate type declarations as interfaces, typed FormGroup declarations as interfaces, 
		/// </summary>
		/// <param name="cn"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		public override void GenerateCodeFromNamespace(CodeNamespace cn, TextWriter w, CodeGeneratorOptions o)
		{
			WriteCodeCommentStatementCollection(cn.Comments, w, o);

			string refinedNamespaceText = cn.Name.Replace('.', '_');
			string namespaceOrModule = asModule ? "export namespace" : "namespace";
			w.WriteLine($"{namespaceOrModule} {refinedNamespaceText} {{");

			for (int i = 0; i < cn.Imports.Count; i++)
			{
				CodeNamespaceImport ns = cn.Imports[i];
				string nsText = ns.Namespace;
				string alias = nsText.Replace('.', '_');
				w.WriteLine($"{o.IndentString}import {alias} = {nsText};");
			}

			cn.Types.OfType<CodeTypeDeclaration>().ToList().ForEach(ctd =>
			{
				GenerateCodeFromType(ctd, w, o);

				string typeExpression = GetTypeParametersExpression(ctd);
				bool isGeneric = typeExpression.Contains('<') || IsParentClosedGenericType(ctd);
				if (!ctd.IsPartial && !isGeneric) //controllerClass is partial, as declared in CreateControllerClientClass()
				{
					GenerateAngularFormFromType(ctd, w, o);
					GenerateAngularFormGroupFunctionFromType(cn, ctd, w, o);
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
		/// <param name="ctd"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		void GenerateAngularFormGroupFunctionFromType(CodeNamespace cn, CodeTypeDeclaration ctd, TextWriter w, CodeGeneratorOptions o)
		{
			if (ctd.IsEnum)
			{
				return;
			}

			string accessModifier = ((ctd.TypeAttributes & System.Reflection.TypeAttributes.Public) == System.Reflection.TypeAttributes.Public) ? "export " : String.Empty;
			string typeOfTypeText = GetTypeOfTypeText(ctd);
			string name = ctd.Name;
			string qualifiedTypeName = cn.Name + "." + name;
			bool forSignalForm = classesForNgSignalForm != null && classesForNgSignalForm.Contains(qualifiedTypeName);
			string typeParametersExpression = GetTypeParametersExpression(ctd);
			string baseTypesExpression = GetBaseTypeExpression(ctd);
			if (typeOfTypeText == "interface")
			{
				string extendsExpression = $"{typeParametersExpression}{baseTypesExpression}";
				bool isGeneric = extendsExpression.Contains('<');
				string formPropertiesSuffix = isGeneric ? String.Empty : "FormProperties";
				string formGroupInterface = $"{name}FormProperties";
				w.Write($"{o.IndentString}{accessModifier}function Create{name}FormGroup() {{");
				w.WriteLine();

				if (forSignalForm)
				{
					w.Write($"{o.IndentString}{o.IndentString}return form<{formGroupInterface}>({{");
				}
				else
				{
					w.Write($"{o.IndentString}{o.IndentString}return new FormGroup<{formGroupInterface}>({{");
				}

				WriteAngularFormGroupMembersAndCloseBracing(ctd, w, o, forSignalForm);
				w.WriteLine($"{o.IndentString}}}");
			}
			else
			{
				throw new ArgumentException("Expect TypeOfType is interface if e is not enum", nameof(ctd));
			}
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
			{ "System.Int64", "Validators.pattern(/^-?\\d{0,19}$/)" }, // use https://regexr.com/ to verify
			{ "System.UInt64", "Validators.pattern(/^\\d{0,20}$/)" },
			{ "System.Int128", "Validators.pattern(/^-?\\d{0,39}$/)" },
			{ "System.UInt128", "Validators.pattern(/^\\d{0,30}$/)" },
			{ "System.Numerics.BigInteger", "Validators.pattern(/^-?\\d*$/)" },
		};

		/// <summary>
		/// Return the text of a FormControl field, like:
		/// dob : FormControl&lt;Date&gt;
		/// </summary>
		/// <param name="codeMemberField"></param>
		/// <returns></returns>
		static string GetCodeMemberFieldTextForAngularFormControl(CodeMemberField codeMemberField)
		{
			//	string tsTypeName = RefineAngularFormControlTypeName(codeMemberField);
			string tsTypeName = RefineFieldTypeNameOfFormControl(codeMemberField);
			string fieldName = codeMemberField.Name.EndsWith('?') ? codeMemberField.Name.Substring(0, codeMemberField.Name.Length - 1) : codeMemberField.Name;
			return $"{fieldName}: FormControl<{tsTypeName}>";
		}

		static string RefineFieldTypeNameOfFormControl(CodeMemberField codeMemberField)
		{
			var isOptional = codeMemberField.Name.EndsWith('?');
			var fieldName = codeMemberField.Name;
			var tsTypeName = GetCodeTypeReferenceText(codeMemberField.Type);
			var isAny = codeMemberField.Name == "any";
			var fieldTypeInfo = codeMemberField.Type.UserData[UserDataKeys.FieldTypeInfo] as FieldTypeInfo;
			if (fieldTypeInfo != null)
			{
				var isComplex = fieldTypeInfo.IsArray || fieldTypeInfo.IsComplex;
				var alreadyWithNull = tsTypeName.Contains("| null");
				if ((!alreadyWithNull && !isAny) || fieldTypeInfo.IsJsonRequired)
				{
					tsTypeName += " | null"; //optional null
				}

				if (isOptional)
				{
					tsTypeName += " | undefined";
				}
			}
			else
			{
				Console.Error.WriteLine("No FieldTypeInfo in UserData");
			}

			return tsTypeName;
		}

		/// <summary>
		/// For FormGroup creation, return something like:
		/// "name: new FormControl&lt;string | null | undefined&gt;(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)])"
		/// </summary>
		/// <param name="codeMemberField"></param>
		/// <returns>Text of FormControl creation.</returns>
		string GetCodeMemberFieldTextForAngularFormGroup(CodeMemberField codeMemberField, bool forSignalForm)
		{
			Attribute[] customAttributes = codeMemberField.UserData[UserDataKeys.CustomAttributes] as Attribute[];
			string fieldName = codeMemberField.Name.EndsWith('?') ? codeMemberField.Name.Substring(0, codeMemberField.Name.Length - 1) : codeMemberField.Name;
			//string tsTypeName = RefineAngularFormControlTypeName(codeMemberField);
			string tsTypeName = RefineFieldTypeNameOfFormControl(codeMemberField);
			bool isFieldDateOnly = false;
			FieldTypeInfo fieldTypeInfo = codeMemberField.Type.UserData[UserDataKeys.FieldTypeInfo] as FieldTypeInfo;
			if (fieldTypeInfo?.ClrType == typeof(DateOnly) || fieldTypeInfo?.ClrType == typeof(DateOnly?))
			{
				isFieldDateOnly = true;
			}

			if (customAttributes?.Length > 0)
			{
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
						//case "System.Text.Json.Serialization.JsonRequiredAttribute": no need. because null and empty string is allowed already.
						//	validatorList.Add("Validators.required");
						//	break;
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
							if ((useRegexAttribute & UseRegexAttr.Use) == UseRegexAttr.Use)
							{
								System.ComponentModel.DataAnnotations.RegularExpressionAttribute rp = ca as System.ComponentModel.DataAnnotations.RegularExpressionAttribute;
								validatorList.Add($"Validators.pattern(/{rp.Pattern}/)");
							}
							break;
						default:
							break;
					}
				}

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
				}

				string text = String.Join(", ", validatorList);
				var isOptional = codeMemberField.Name.EndsWith('?');
				//var tsTypeName = GetCodeTypeReferenceText(codeMemberField.Type);
				var alreadyWithNull = tsTypeName.Contains("| null");
				var initValue = "undefined";
				if (alreadyWithNull && !isOptional)
				{
					initValue = "null";
				}

				if (isFieldDateOnly && careForDateOnly)
				{
					return $"{fieldName}: CreateDateOnlyFormControl()";
				}
				else
				{
					if (forSignalForm)
					{
						return string.IsNullOrEmpty(text) ? $"{fieldName}: field<{tsTypeName}>(undefined)" :
							$"{fieldName}: field<{tsTypeName}>(undefined, [{text}])";
					}
					else
					{
						return string.IsNullOrEmpty(text) ? $"{fieldName}: new FormControl<{tsTypeName}>({initValue})" :
							$"{fieldName}: new FormControl<{tsTypeName}>({initValue}, [{text}])";
					}



				}
			}
			else
			{
				if (isFieldDateOnly && careForDateOnly)
				{
					return $"{fieldName}: CreateDateOnlyFormControl()";
				}
				else
				{
					return $"{fieldName}: new FormControl<{tsTypeName}>(undefined)";
				}
			}
		}

		void WriteAngularFormTypeMembersAndCloseBracing(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o)
		{

			if (typeDeclaration.IsEnum)
			{
				throw new NotSupportedException("Should run to here");
			}
			else
			{
				string currentIndent = o.IndentString;
				o.IndentString += BasicIndent;
				w.WriteLine();
				for (int i = 0; i < typeDeclaration.Members.Count; i++)
				{
					WriteCodeTypeMemberOfAngularForm(typeDeclaration.Members[i], w, o);
				}

				w.WriteLine(currentIndent + "}");
				o.IndentString = currentIndent;
			}
		}

		static bool IsParentClosedGenericType(CodeTypeDeclaration typeDeclaration){
			if (typeDeclaration.BaseTypes.Count > 0)
			{
				CodeTypeReference parentTypeReference = typeDeclaration.BaseTypes[0];
				string parentTypeName = TypeMapper.MapCodeTypeReferenceToTsText(parentTypeReference);									
				if (parentTypeName.Contains('<')) 
				{
					return true;
				}
			}

			return false;
		}

		void WriteAngularFormGroupMembersAndCloseBracing(CodeTypeDeclaration typeDeclaration, TextWriter w, CodeGeneratorOptions o, bool forSignalForm)
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
					if (parentTypeName.Contains('<')) // not to generate FormGroup of closed generic type
					{
						return;
					}
						
					WriteAngularFormGroupMembersOfParent(parentTypeName, w, o, forSignalForm);
				}

				for (int i = 0; i < typeDeclaration.Members.Count; i++)
				{
					WriteCodeTypeMemberOfAngularFormGroup(typeDeclaration.Members[i], w, o, forSignalForm);
				}

				w.WriteLine(currentIndent + BasicIndent + "});");
				w.WriteLine();
				o.IndentString = currentIndent;
			}
		}

		/// <summary>
		/// Write for properties of parent type, after writing the properties of grant parent type, and so on, recrusively.
		/// </summary>
		/// <param name="parentTypeName"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		void WriteAngularFormGroupMembersOfParent(string parentTypeName, TextWriter w, CodeGeneratorOptions o, bool forSignalForm)
		{
			CodeTypeDeclaration parentCodeTypeDeclaration = FindCodeTypeDeclaration(parentTypeName);
			if (parentCodeTypeDeclaration != null)
			{
				if (parentCodeTypeDeclaration.BaseTypes.Count > 0)
				{
					CodeTypeReference grantParentTypeReference = parentCodeTypeDeclaration.BaseTypes[0];
					string grantParentTypeName = TypeMapper.MapCodeTypeReferenceToTsText(grantParentTypeReference);
					WriteAngularFormGroupMembersOfParent(grantParentTypeName, w, o, forSignalForm);
				}


				for (int i = 0; i < parentCodeTypeDeclaration.Members.Count; i++)
				{
					WriteCodeTypeMemberOfAngularFormGroup(parentCodeTypeDeclaration.Members[i], w, o, forSignalForm);
				}
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

			throw new ArgumentException("Expect CodeMemberField", nameof(ctm));
		}

		/// <summary>
		/// Write FormControl creation codes, for member fields of simple types. Complex types and array types are skipped.
		/// </summary>
		/// <param name="ctm"></param>
		/// <param name="w"></param>
		/// <param name="o"></param>
		/// <exception cref="ArgumentException">If ctm is not CodeMemberField.</exception>
		void WriteCodeTypeMemberOfAngularFormGroup(CodeTypeMember ctm, TextWriter w, CodeGeneratorOptions o, bool forSignalForm)
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
				w.WriteLine(GetCodeMemberFieldTextForAngularFormGroup(codeMemberField, forSignalForm) + ",");
				return;
			}

			throw new ArgumentException("Expect CodeMemberField", nameof(ctm));
		}

	}

}
