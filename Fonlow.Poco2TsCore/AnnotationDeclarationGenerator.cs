using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Fonlow.Poco2Client
{
	/// <summary>
	/// Provide a dictionary to translate an attribute object to CodeAttributeDeclaration
	/// </summary>
	public sealed class AnnotationDeclarationGenerator
	{
		public static IDictionary<Type, Func<Attribute, CodeAttributeDeclaration>> Create()
		{
			return declaratinDic;
		}

		static readonly IDictionary<Type, Func<Attribute, CodeAttributeDeclaration>> declaratinDic = new Dictionary<Type, Func<Attribute, CodeAttributeDeclaration>>
		{
			{ typeof(RequiredAttribute), a => new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.Required") },
			{ typeof(JsonRequiredAttribute), a => new CodeAttributeDeclaration("System.Text.Json.Serialization.JsonRequired") },
			{ typeof(RangeAttribute), a =>
				{
					RangeAttribute obj = a as RangeAttribute;
					CodeSnippetExpression operandType = new CodeSnippetExpression($"typeof({obj.OperandType.FullName})");
					CodeSnippetExpression min = new CodeSnippetExpression($"\"{obj.Minimum}\"");
					CodeSnippetExpression max = new CodeSnippetExpression($"\"{obj.Maximum}\"");
					//var isNumber = obj.GetType()== typeof(int) || obj.GetType()==typeof(double);
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(operandType),
					new CodeAttributeArgument(min),
					new CodeAttributeArgument(max) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					CodeSnippetExpression error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.Range", attributeParams.ToArray());
				}
			},
			{ typeof(MaxLengthAttribute), a =>
				{
					MaxLengthAttribute obj= a as MaxLengthAttribute;
					CodeSnippetExpression len = new CodeSnippetExpression(obj.Length.ToString());
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(len) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					CodeSnippetExpression error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.MaxLength", attributeParams.ToArray());
				}
			},
			{ typeof(MinLengthAttribute), a =>
				{
					MinLengthAttribute obj= a as MinLengthAttribute;
					CodeSnippetExpression len = new CodeSnippetExpression(obj.Length.ToString());
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(len) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					CodeSnippetExpression error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.MinLength", attributeParams.ToArray());
				}
			},
			{ typeof(LengthAttribute), a =>
				{
					LengthAttribute obj= a as LengthAttribute;
					CodeSnippetExpression min = new CodeSnippetExpression(obj.MinimumLength.ToString());
					CodeSnippetExpression max = new CodeSnippetExpression(obj.MaximumLength.ToString());
					List<CodeAttributeArgument> attributeParams = new()
					{
						new CodeAttributeArgument(min),
						new CodeAttributeArgument(max)
					};

					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
						CodeSnippetExpression error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
						attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.Length", attributeParams.ToArray());
				}
			},
			{ typeof(StringLengthAttribute), a =>
				{
					StringLengthAttribute obj= a as StringLengthAttribute;
					CodeSnippetExpression max = new CodeSnippetExpression(obj.MaximumLength.ToString());
					CodeSnippetExpression min = new CodeSnippetExpression(obj.MinimumLength.ToString());
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(max),
					new CodeAttributeArgument("MinimumLength", min) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					CodeSnippetExpression error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.StringLength", attributeParams.ToArray());
				}
			},
			{ typeof(DataTypeAttribute), a =>
				{
					DataTypeAttribute obj= a as DataTypeAttribute;
					CodeSnippetExpression dataType = new CodeSnippetExpression("System.ComponentModel.DataAnnotations.DataType." + obj.DataType.ToString());
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(dataType) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					CodeSnippetExpression error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.DataType", attributeParams.ToArray());
				}
			},
			{ typeof(RegularExpressionAttribute), a =>
				{
					RegularExpressionAttribute obj= a as RegularExpressionAttribute;
					string ps = $"@\"{obj.Pattern}\"";
					CodeSnippetExpression p = new CodeSnippetExpression(ps);
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(p) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					CodeSnippetExpression error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.RegularExpression", attributeParams.ToArray());
				}
			},
			{ typeof(ObsoleteAttribute), a =>
				{
					ObsoleteAttribute obj= a as ObsoleteAttribute;
					return CreateDeclaration(obj);
				}
			},

		};

		public static CodeAttributeDeclaration CreateDeclaration(ObsoleteAttribute obj){
			List<CodeAttributeArgument> attributeParams = new();

			if (!string.IsNullOrEmpty(obj.Message))
			{
				CodeSnippetExpression messageExp = new CodeSnippetExpression($"\"{obj.Message}\"");
				attributeParams.Add(new CodeAttributeArgument(messageExp));
			}

			if (obj.IsError)
			{
				CodeSnippetExpression errorExp = new CodeSnippetExpression(obj.IsError ? "true" : "false");
				attributeParams.Add(string.IsNullOrEmpty(obj.Message) ? new CodeAttributeArgument("IsError", errorExp) : new CodeAttributeArgument(errorExp));
			}

			if (!String.IsNullOrEmpty(obj.DiagnosticId))
			{
				CodeSnippetExpression diagnosticIdExp = new CodeSnippetExpression($"\"{obj.DiagnosticId}\"");
				attributeParams.Add(new CodeAttributeArgument("DiagnosticId", diagnosticIdExp));
			}

			if (!String.IsNullOrEmpty(obj.UrlFormat))
			{
				CodeSnippetExpression urlFormatExp = new CodeSnippetExpression($"\"{obj.UrlFormat}\"");
				attributeParams.Add(new CodeAttributeArgument("UrlFormat", urlFormatExp));
			}

			return new CodeAttributeDeclaration("System.Obsolete", attributeParams.ToArray());
		}

	}
}
