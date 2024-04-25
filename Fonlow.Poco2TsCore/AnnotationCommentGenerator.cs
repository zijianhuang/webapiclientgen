using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Fonlow.Poco2Client
{
	public sealed class AnnotationCommentGenerator
	{
		/// <summary>
		/// Generate doc comment for RegularExpressionAttribute for C# codes but not for TypeScript.
		/// </summary>
		/// <param name="forTS">JsDoc does not support some regular expressions, not even with mechanism of eacaping. For generating TS codes this should be true.</param>
		public AnnotationCommentGenerator(bool forTS=false)
		{
			if (!forTS)
			{
				generator.Add(typeof(RegularExpressionAttribute), a =>
				{
					RegularExpressionAttribute regularExpression = (RegularExpressionAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Matching regular expression pattern: {0}", regularExpression.Pattern);
				});
			}
		}

		/// <summary>
		/// Dictionary to provide doc comment helper functions for various .NET validation attributes.
		/// The key is the type of an attribute object. The client codes should call dic.TryGetValue.
		/// </summary>
		/// <returns></returns>
		public IDictionary<Type, Func<object, string>> Get()
		{
			return generator;
		}

		readonly Dictionary<Type, Func<object, string>> generator = new Dictionary<Type, Func<object, string>>
		{
			{ typeof(RequiredAttribute), a => "Required" },
			{ typeof(RangeAttribute), a =>
				{
					RangeAttribute range = (RangeAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Range: inclusive between {0} and {1}", range.Minimum, range.Maximum);
				}
			},
			{ typeof(MaxLengthAttribute), a =>
				{
					MaxLengthAttribute maxLength = (MaxLengthAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Max length: {0}", maxLength.Length);
				}
			},
			{ typeof(MinLengthAttribute), a =>
				{
					MinLengthAttribute minLength = (MinLengthAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Min length: {0}", minLength.Length);
				}
			},
			{ typeof(StringLengthAttribute), a =>
				{
					StringLengthAttribute strLength = (StringLengthAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "String length: inclusive between {0} and {1}", strLength.MinimumLength, strLength.MaximumLength);
				}
			},
			{ typeof(DataTypeAttribute), a =>
				{
					DataTypeAttribute dataType = (DataTypeAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Data type: {0}", dataType.CustomDataType ?? dataType.DataType.ToString());
				}
			}
		};
	}
}
