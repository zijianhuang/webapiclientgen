using Fonlow.Reflection;
using Fonlow.Web.Meta;
using System;

namespace Fonlow.CodeDom.Web
{
	internal static class UriTemplateTransform
	{
		static readonly Type typeofString = typeof(string);
		static readonly Type typeofDateTime = typeof(DateTime);
		static readonly Type typeofDateTimeNullable = typeof(DateTime?);
		static readonly Type typeofDateTimeOffset = typeof(DateTimeOffset);
		static readonly Type typeofDateTimeOffsetNullable = typeof(DateTimeOffset?);
		static readonly Type typeofDateOnly = typeof(DateOnly);
		static readonly Type typeofDateOnlyNullable = typeof(DateOnly?);
		static readonly Type typeOfNullableDefinition = typeof(Nullable<>);

		public static string Transform(string newUriText, ParameterDescription d)
		{
			if (d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromQuery)
			{
				bool queryExists = newUriText.Contains('?');
				newUriText += queryExists ? "&" : "?";

				if (d.ParameterDescriptor.ParameterType == typeofString)
				{
					return newUriText += $"({d.Name} == null ? \"\" : {d.Name}=\" + Uri.EscapeDataString({d.Name}))+\"";
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
				{
					return newUriText += $"{d.Name}=\" + {d.Name}.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\")+\"";
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTimeNullable || d.ParameterDescriptor.ParameterType == typeofDateTimeOffsetNullable)
				{
					string replaced = newUriText.Replace($"\"&{d.Name}={{{d.Name}}}", $"({d.Name}.HasValue?\"&{d.Name}=\"+{d.Name}.Value.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\"):String.Empty)+\"");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"\"+({d.Name}.HasValue?\"{d.Name}=\"+{d.Name}.Value.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\"):String.Empty)+\"");
					}

					return replaced;
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateOnly)
				{
					return newUriText += $"{d.Name}=\" + {d.Name}.ToString(\"O\")+\"";
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateOnlyNullable)
				{
					string replaced = newUriText.Replace($"\"&{d.Name}={{{d.Name}}}", $"({d.Name}.HasValue?\"&{d.Name}=\"+{d.Name}.Value.ToString(\"O\"):String.Empty)+\"");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"\"+({d.Name}.HasValue?\"{d.Name}=\"+{d.Name}.Value.ToString(\"O\"):String.Empty)+\"");
					}

					return replaced;
				}
				else if (IsNullablePrimitive(d.ParameterDescriptor.ParameterType))
				{
					string replaced = newUriText.Replace($"\"&{d.Name}={{{d.Name}}}", $"({d.Name}.HasValue?\"&{d.Name}=\"+{d.Name}.Value.ToString():String.Empty)+\"");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"\"+({d.Name}.HasValue?\"{d.Name}=\"+{d.Name}.Value.ToString():String.Empty)+\"");
					}

					return replaced;
				}
				else if (TypeHelper.IsSimpleArrayType(d.ParameterDescriptor.ParameterType) || TypeHelper.IsSimpleListType(d.ParameterDescriptor.ParameterType))
				{
					string arrayQuery = $"String.Join(\"&\", {d.ParameterDescriptor.ParameterName}.Select(k => $\"{d.ParameterDescriptor.ParameterName}={{Uri.EscapeDataString(k.ToString())}}\"))";
					string placeHolder = $"{d.ParameterDescriptor.ParameterName}={{{d.ParameterDescriptor.ParameterName}}}&";
					return newUriText.Replace(placeHolder, "\"+" + arrayQuery);
				}
				else
				{
					return newUriText += $"{d.Name}=\"+{d.Name}+\"";
				}
			}
			else
			{
				if (d.ParameterDescriptor.ParameterType == typeofString)
				{
					return newUriText.Replace($"{{{d.Name}}}", $"\"+({d.Name} == null ? \"\" : Uri.EscapeDataString({d.Name}))+\"");
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
				{
					return newUriText.Replace($"{{{d.Name}}}", $"\"+{d.Name}.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\")+\"");
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTimeNullable || d.ParameterDescriptor.ParameterType == typeofDateTimeOffsetNullable)
				{
					string replaced = newUriText.Replace($"\"&{d.Name}={{{d.Name}}}", $"({d.Name}.HasValue?\"&{d.Name}=\"+{d.Name}.Value.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\"):String.Empty)+\"");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"\"+({d.Name}.HasValue?\"{d.Name}=\"+{d.Name}.Value.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\"):String.Empty)+\"");
					}

					return replaced;
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateOnly)
				{
					return newUriText.Replace($"{{{d.Name}}}", $"\"+{d.Name}.ToString(\"O\")+\"");
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateOnlyNullable)
				{
					string replaced = newUriText.Replace($"\"&{d.Name}={{{d.Name}}}", $"({d.Name}.HasValue?\"&{d.Name}=\"+{d.Name}.Value.ToString(\"O\"):String.Empty)+\"");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"\"+({d.Name}.HasValue?\"{d.Name}=\"+{d.Name}.Value.ToString(\"O\"):String.Empty)+\"");
					}

					return replaced;
				}
				else if (IsNullablePrimitive(d.ParameterDescriptor.ParameterType))
				{
					string replaced = newUriText.Replace($"\"&{d.Name}={{{d.Name}}}", $"({d.Name}.HasValue?\"&{d.Name}=\"+{d.Name}.Value.ToString():String.Empty)+\"");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"\"+({d.Name}.HasValue?\"{d.Name}=\"+{d.Name}.Value.ToString():String.Empty)+\"");
					}

					return replaced;
				}
				else if (TypeHelper.IsSimpleArrayType(d.ParameterDescriptor.ParameterType) || TypeHelper.IsSimpleListType(d.ParameterDescriptor.ParameterType))
				{
					string arrayQuery = $"String.Join(\"&\", {d.ParameterDescriptor.ParameterName}.Select(k => $\"{d.ParameterDescriptor.ParameterName}={{Uri.EscapeDataString(k.ToString())}}\"))";
					string placeHolder = $"{d.ParameterDescriptor.ParameterName}={{{d.ParameterDescriptor.ParameterName}}}";
					return newUriText.Replace(placeHolder, "\"+" + arrayQuery);
				}
				else
				{
					return newUriText.Replace($"{{{d.Name}}}", $"\"+{d.Name}+\"");
				}
			}
		}

		public static string TransformForTs(string newUriText, ParameterDescription d)
		{
			if (d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromQuery)
			{
				bool queryExists = newUriText.Contains('?');
				newUriText += queryExists ? "&" : "?";

				if (d.ParameterDescriptor.ParameterType == typeofString)
				{
					return newUriText += $"(!{d.Name} ? '' : {d.Name}=' + encodeURIComponent({d.Name})) + '";
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
				{
					return newUriText += $"{d.Name}=' + {d.Name}?.toISOString() + '";
				}
				else if (TypeHelper.IsSimpleArrayType(d.ParameterDescriptor.ParameterType) || TypeHelper.IsSimpleListType(d.ParameterDescriptor.ParameterType))
				{
					string arrayQuery = $"{d.ParameterDescriptor.ParameterName}?.map(z => `{d.ParameterDescriptor.ParameterName}=${{encodeURIComponent(z)}}`).join('&')";
					string placeHolder = $"{d.ParameterDescriptor.ParameterName}={{{d.ParameterDescriptor.ParameterName}}}";
					return newUriText.Replace(placeHolder, "'+" + arrayQuery);
				}
				else
				{
					return newUriText += $"{d.Name}=' + {d.Name} + '";
				}
			}
			else
			{
				if (d.ParameterDescriptor.ParameterType == typeofString)
				{
					return newUriText.Replace($"{{{d.Name}}}", $"' + (!{d.Name} ? '' : encodeURIComponent({d.Name})) + '");
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
				{
					return newUriText.Replace($"{{{d.Name}}}", $"' + {d.Name}?.toISOString() + '");
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTimeNullable || d.ParameterDescriptor.ParameterType == typeofDateTimeOffsetNullable)
				{
					string replaced = newUriText.Replace($"'&{d.Name}={{{d.Name}}}", $"({d.Name} ? '&{d.Name}=' + {d.Name}?.toISOString() : '') + '");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"' + ({d.Name} ? '{d.Name}=' + {d.Name}?.toISOString() : '') + '");
					}

					return replaced;
				}
				else if (IsNullablePrimitive(d.ParameterDescriptor.ParameterType))
				{
					if (IsNumericTypeIncludingNullable(d.ParameterDescriptor.ParameterType))
					{
						string replaced = newUriText.Replace($"'&{d.Name}={{{d.Name}}}", $"({d.Name} || {d.Name} == 0 ? '&{d.Name}=' + {d.Name}.toString() : '') + '");
						if (replaced == newUriText)
						{
							replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"' + ({d.Name} || {d.Name} == 0  ? '{d.Name}=' + {d.Name}.toString() : '') + '");
						}

						return replaced;
					}
					else
					{
						string replaced = newUriText.Replace($"'&{d.Name}={{{d.Name}}}", $"({d.Name} ? '&{d.Name}=' + {d.Name}.toString() : '') + '");
						if (replaced == newUriText)
						{
							replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"' + ({d.Name} ? '{d.Name}=' + {d.Name}.toString() : '') + '");
						}

						return replaced;
					}
				}
				else if (TypeHelper.IsSimpleArrayType(d.ParameterDescriptor.ParameterType) || TypeHelper.IsSimpleListType(d.ParameterDescriptor.ParameterType))
				{
					bool elementBaseTypeIsEnum = d.ParameterDescriptor.ParameterType.GenericTypeArguments.Length > 0 && d.ParameterDescriptor.ParameterType.GenericTypeArguments[0].BaseType?.FullName == "System.Enum";
					string arrayQuery = elementBaseTypeIsEnum ?
						$"{d.ParameterDescriptor.ParameterName}?.map(z => `{d.ParameterDescriptor.ParameterName}=${{z}}`).join('&')"
						: $"{d.ParameterDescriptor.ParameterName}?.map(z => `{d.ParameterDescriptor.ParameterName}=${{encodeURIComponent(z)}}`).join('&')";
					string placeHolder = $"{d.ParameterDescriptor.ParameterName}={{{d.ParameterDescriptor.ParameterName}}}";
					return newUriText.Replace(placeHolder, "'+" + arrayQuery);
				}
				else
				{
					return newUriText.Replace($"{{{d.Name}}}", $"' + {d.Name} + '");
				}
			}

		}
		/// <summary>
		/// DateTime is not primitive type. Decimal is primitive VB.net but not in C#.NET
		/// https://stackoverflow.com/questions/13471941/why-is-decimal-not-a-primitive-type
		/// </summary>
		/// <param name="t"></param>
		/// <returns></returns>
		static bool IsNullablePrimitive(Type t)
		{
			return (t.IsGenericType && typeOfNullableDefinition.Equals(t.GetGenericTypeDefinition()) && (t.GetGenericArguments()[0].IsPrimitive || t.GetGenericArguments()[0].IsValueType));
		}

		static readonly Type typeOfString = typeof(string);

		public static bool IsSimpleType(Type type)
		{
			return type.IsPrimitive || type.Equals(typeOfString) || type.BaseType?.FullName == "System.Enum";
		}

		static bool IsNumericType(Type type)
		{
			switch (Type.GetTypeCode(type))
			{
				case TypeCode.Byte:
				case TypeCode.SByte:
				case TypeCode.UInt16:
				case TypeCode.UInt32:
				case TypeCode.UInt64:
				case TypeCode.Int16:
				case TypeCode.Int32:
				case TypeCode.Int64:
				case TypeCode.Decimal:
				case TypeCode.Double:
				case TypeCode.Single:
					return true;
				default:
					return false;
			}
		}

		static bool IsNumericTypeIncludingNullable(Type type)
		{
			Type actualType = Nullable.GetUnderlyingType(type) ?? type;
			return IsNumericType(actualType);
		}


	}
}
