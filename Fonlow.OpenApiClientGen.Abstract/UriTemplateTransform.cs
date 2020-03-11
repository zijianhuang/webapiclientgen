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
		static readonly Type typeOfNullableDefinition = typeof(Nullable<>);

		public static string Transform(string newUriText, ParameterDescription d)
		{
			if (d.ParameterDescriptor.ParameterType == typeofString)
			{
				return newUriText.Replace($"{{{d.Name}}}", $"\"+Uri.EscapeDataString({d.Name})+\"");
			}
			else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
			{
				return newUriText.Replace($"{{{d.Name}}}", $"\"+{d.Name}.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\")+\"");
			}
			else if (d.ParameterDescriptor.ParameterType == typeofDateTimeNullable || d.ParameterDescriptor.ParameterType == typeofDateTimeOffsetNullable)
			{
				var replaced = newUriText.Replace($"\"&{d.Name}={{{d.Name}}}", $"({d.Name}.HasValue?\"&{d.Name}=\"+{d.Name}.Value.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\"):String.Empty)+\"");
				if (replaced == newUriText)
				{
					replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"\"+({d.Name}.HasValue?\"{d.Name}=\"+{d.Name}.Value.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\"):String.Empty)+\"");
				}

				return replaced;
			}
			else if (IsNullablePrimitive(d.ParameterDescriptor.ParameterType))
			{
				var replaced = newUriText.Replace($"\"&{d.Name}={{{d.Name}}}", $"({d.Name}.HasValue?\"&{d.Name}=\"+{d.Name}.Value.ToString():String.Empty)+\"");
				if (replaced == newUriText)
				{
					replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"\"+({d.Name}.HasValue?\"{d.Name}=\"+{d.Name}.Value.ToString():String.Empty)+\"");
				}

				return replaced;
			}
			else
			{
				return newUriText.Replace($"{{{d.Name}}}", $"\"+{d.Name}+\"");
			}
		}

		public static string TransformForTs(string newUriText, ParameterDescription d)
		{
			if (d.ParameterDescriptor.ParameterType == typeofString)
			{
				return newUriText.Replace($"{{{d.Name}}}", $"' + encodeURIComponent({d.Name}) + '");
			}
			else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
			{
				return newUriText.Replace($"{{{d.Name}}}", $"' + {d.Name}.toISOString() + '");
			}
			else if (d.ParameterDescriptor.ParameterType == typeofDateTimeNullable || d.ParameterDescriptor.ParameterType == typeofDateTimeOffsetNullable)
			{
				var replaced = newUriText.Replace($"'&{d.Name}={{{d.Name}}}", $"({d.Name} ? '&{d.Name}=' + {d.Name}.toISOString() : '') + '");
				if (replaced == newUriText)
				{
					replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"' + ({d.Name} ? '{d.Name}=' + {d.Name}.toISOString() : '') + '");
				}

				return replaced;
			}
			else if (IsNullablePrimitive(d.ParameterDescriptor.ParameterType))
			{
				var replaced = newUriText.Replace($"'&{d.Name}={{{d.Name}}}", $"({d.Name} ? '&{d.Name}=' + {d.Name}.toString() : '') + '");
				if (replaced == newUriText)
				{
					replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"' + ({d.Name} ? '{d.Name}=' + {d.Name}.toString() : '') + '");
				}

				return replaced;
			}
			else
			{
				return newUriText.Replace($"{{{d.Name}}}", $"' + {d.Name} + '");
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


	}
}
