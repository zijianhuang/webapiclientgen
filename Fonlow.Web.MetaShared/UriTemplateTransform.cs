using Fonlow.Web.Meta;
using System;
using System.Diagnostics;
using System.Linq;
using System.Collections.Generic;

namespace Fonlow.CodeDom.Web
{
	internal static class UriTemplateTransform
	{
		static readonly HashSet<string> simpleListTypeNames = new HashSet<string>(
		new string[] {
			typeof(IEnumerable<>).Name,
			typeof(IList<>).Name,
			typeof(ICollection<>).Name,
			typeof(IQueryable<>).Name,
			typeof(IReadOnlyList<>).Name,
			typeof(List<>).Name,
			typeof(System.Collections.ObjectModel.Collection<>).Name,
			typeof(IReadOnlyCollection<>).Name,
			"System.Collections.Generic.IAsyncEnumerable`1",
		   typeof(System.Collections.ObjectModel.ObservableCollection<>).Name,
	   }
	   );

		static readonly HashSet<string> simpleArrayTypeNames = new HashSet<string>(
		new string[] {
		   "Int32[]",
		   "Int64[]",
		   "Decimal[]",
		   "Double[]",
		   "Single[]",
		   "String[]",
	   }
	   );

		static readonly Type typeofString = typeof(string);
		static readonly Type typeofDateTime = typeof(DateTime);
		static readonly Type typeofDateTimeNullable = typeof(DateTime?);
		static readonly Type typeofDateTimeOffset = typeof(DateTimeOffset);
		static readonly Type typeofDateTimeOffsetNullable = typeof(DateTimeOffset?);
		static readonly Type typeOfNullableDefinition = typeof(Nullable<>);

		public static string Transform(string newUriText, ParameterDescription d)
		{
			if (d.ParameterDescriptor.ParameterBinder== ParameterBinder.FromQuery)
			{
				bool queryExists = newUriText.Contains("?");
				newUriText += queryExists ? "&" : "?";

				if (d.ParameterDescriptor.ParameterType == typeofString)
				{
					return newUriText += $"{d.Name}=\" + Uri.EscapeDataString({d.Name})+\"";
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
				{
					return newUriText += $"{d.Name}=\" + {d.Name}.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\")+\"";
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
				else if (IsSimpleArrayType(d.ParameterDescriptor.ParameterType) || IsSimpleListType(d.ParameterDescriptor.ParameterType))
				{
					//int[] kk=new int[] { };
					//var v = String.Join("&", kk.Select(k => $"{d.ParameterDescriptor.ParameterName}={Uri.EscapeDataString(k.ToString())}"));
					var arrayQuery = $"String.Join(\"&\", {d.ParameterDescriptor.ParameterName}.Select(k => $\"{d.ParameterDescriptor.ParameterName}={{Uri.EscapeDataString(k.ToString())}}\"))";
					var placeHolder = $"{d.ParameterDescriptor.ParameterName}={{{d.ParameterDescriptor.ParameterName}}}&";
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
				else if (IsSimpleArrayType(d.ParameterDescriptor.ParameterType) || IsSimpleListType(d.ParameterDescriptor.ParameterType))
				{
					//int[] kk=new int[] { };
					//var v = String.Join("&", kk.Select(k => $"{d.ParameterDescriptor.ParameterName}={Uri.EscapeDataString(k.ToString())}"));
					var arrayQuery = $"String.Join(\"&\", {d.ParameterDescriptor.ParameterName}.Select(k => $\"{d.ParameterDescriptor.ParameterName}={{Uri.EscapeDataString(k.ToString())}}\"))";
					var placeHolder = $"{d.ParameterDescriptor.ParameterName}={{{d.ParameterDescriptor.ParameterName}}}";
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
				bool queryExists = newUriText.Contains("?");
				newUriText += queryExists ? "&" : "?";

				if (d.ParameterDescriptor.ParameterType == typeofString)
				{
					return newUriText+=$"{d.Name}=' + encodeURIComponent({d.Name}) + '";
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
				{
					return newUriText+= $"{d.Name}=' + {d.Name}.toISOString() + '";
				}
				else
				{
					return newUriText+= $"{d.Name}=' + {d.Name} + '";
				}
			}
			else
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

		static bool IsSimpleArrayType(Type type)
		{
			return simpleArrayTypeNames.Contains(type.Name);
		}

		public static bool IsSimpleListType(Type type)
		{
			return simpleListTypeNames.Contains(type.Name) && IsSimpleType(type.GenericTypeArguments[0]);
		}

		static readonly Type typeOfString = typeof(string);

		public static bool IsSimpleType(Type type)
		{
			return type.IsPrimitive || type.Equals(typeOfString);
		}


	}
}
