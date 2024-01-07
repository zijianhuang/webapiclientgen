using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Fonlow.Poco2Client
{
	public sealed class AnnotationDeclarationGenerator
	{
		public static IDictionary<Type, Func<Attribute, CodeAttributeDeclaration>> Create()
		{
			return declaratinDic;
		}

		static readonly IDictionary<Type, Func<Attribute, CodeAttributeDeclaration>> declaratinDic = new Dictionary<Type, Func<Attribute, CodeAttributeDeclaration>>
		{
			{ typeof(RequiredAttribute), a => new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.Required") },
			{ typeof(RangeAttribute), a =>
				{
					var obj = a as RangeAttribute;
					var operandType = new CodeSnippetExpression($"typeof({obj.OperandType.FullName})");
					var min = new CodeSnippetExpression($"\"{obj.Minimum}\"");
					var max = new CodeSnippetExpression($"\"{obj.Maximum}\"");
					//var isNumber = obj.GetType()== typeof(int) || obj.GetType()==typeof(double);
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(operandType),
					new CodeAttributeArgument(min),
					new CodeAttributeArgument(max) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.Range", attributeParams.ToArray());
				}
			},
			{ typeof(MaxLengthAttribute), a =>
				{
					var obj= a as MaxLengthAttribute;
					var len = new CodeSnippetExpression(obj.Length.ToString());
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(len) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.MaxLength", attributeParams.ToArray());
				}
			},
			{ typeof(MinLengthAttribute), a =>
				{
					var obj= a as MinLengthAttribute;
					var len = new CodeSnippetExpression(obj.Length.ToString());
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(len) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.MinLength", attributeParams.ToArray());
				}
			},
			{ typeof(StringLengthAttribute), a =>
				{
					var obj= a as StringLengthAttribute;
					var max = new CodeSnippetExpression(obj.MaximumLength.ToString());
					var min = new CodeSnippetExpression(obj.MinimumLength.ToString());
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(max),
					new CodeAttributeArgument("MinimumLength", min) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.StringLength", attributeParams.ToArray());
				}
			},
			{ typeof(DataTypeAttribute), a =>
				{
					var obj= a as DataTypeAttribute;
					var dataType = new CodeSnippetExpression("System.ComponentModel.DataAnnotations.DataType." + obj.DataType.ToString());
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(dataType) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.DataType", attributeParams.ToArray());
				}
			},
			{ typeof(RegularExpressionAttribute), a =>
				{
					var obj= a as RegularExpressionAttribute;
					var ps = $"@\"{obj.Pattern}\"";
					var p = new CodeSnippetExpression(ps);
					List<CodeAttributeArgument> attributeParams = new() { new CodeAttributeArgument(p) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.RegularExpressionAttribute", attributeParams.ToArray());
				}
			},
		};

	}
}
