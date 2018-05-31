using Fonlow.Web.Meta;
using System;
using System.Diagnostics;
using System.Linq;

namespace Fonlow.CodeDom.Web
{
	/// <summary>
	/// Generate a client function upon ApiDescription
	/// </summary>
	public static class UriQueryHelper //though this class could actually be replaced by the implementation of the .NET Core one, however, Tavis.UriTemplates does not have a strong named release.
	{
		static readonly Type typeofString = typeof(string);
		static readonly Type typeofDateTime = typeof(DateTime);
		static readonly Type typeofDateTimeNullable = typeof(DateTime?);
		static readonly Type typeofDateTimeOffset = typeof(DateTimeOffset);
		static readonly Type typeofDateTimeOffsetNullable = typeof(DateTimeOffset?);
		static readonly Type typeOfNullableDefinition = typeof(Nullable<>);

		public static string CreateUriQuery(string uriText, ParameterDescription[] parameterDescriptions)
		{
			Debug.WriteLine("UriText=" + uriText);
			var template = new UriTemplate(uriText);

			if (template.QueryValueVariableNames.Count == 0 && template.PathSegmentVariableNames.Count == 0)
				return null;

			string newUriText = uriText;

			Func<ParameterDescription, string> ReplaceTemplatePlaceHolderWithValue = (d) =>
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
				else if (IsNullablePremitive(d.ParameterDescriptor.ParameterType))
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
			};

			for (int i = 0; i < template.PathSegmentVariableNames.Count; i++)
			{
				var name = template.PathSegmentVariableNames[i];//PathSegmentVariableNames[i] always give uppercase
				var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
				Debug.Assert(d != null);

				newUriText = ReplaceTemplatePlaceHolderWithValue(d);
			}

			for (int i = 0; i < template.QueryValueVariableNames.Count; i++)
			{
				var name = template.QueryValueVariableNames[i];
				var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
				Debug.Assert(d != null);
				newUriText = ReplaceTemplatePlaceHolderWithValue(d);
			}

			return newUriText;
		}

		public static string CreateUriQueryForTs(string uriText, ParameterDescription[] parameterDescriptions)
		{
			var template = new UriTemplate(uriText);

			if (template.QueryValueVariableNames.Count == 0 && template.PathSegmentVariableNames.Count == 0)
				return null;

			string newUriText = uriText;

			for (int i = 0; i < template.PathSegmentVariableNames.Count; i++)
			{
				var name = template.PathSegmentVariableNames[i];//PathSegmentVariableNames[i] always give uppercase
				var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
				Debug.Assert(d != null);
				if (d.ParameterDescriptor.ParameterType == typeofString)
				{
					newUriText = newUriText.Replace($"{{{d.Name}}}", $"' + encodeURIComponent({d.Name}) + '");
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
				{
					newUriText = newUriText.Replace($"{{{d.Name}}}", $"' + {d.Name}.toISOString() + '");
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTimeNullable || d.ParameterDescriptor.ParameterType == typeofDateTimeOffsetNullable)
				{
					var replaced = newUriText.Replace($"'&{d.Name}={{{d.Name}}}", $"({d.Name}?'&{d.Name}='+{d.Name}.toISOString():'') + '");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"'+({d.Name}?'{d.Name}='+{d.Name}.toISOString():'') + '");
					}

					newUriText = replaced;
				}
				else if (IsNullablePremitive(d.ParameterDescriptor.ParameterType))
				{
					var replaced = newUriText.Replace($"'&{d.Name}={{{d.Name}}}", $"({d.Name}?'&{d.Name}='+{d.Name}.toString():'') + '");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"'+({d.Name}?'{d.Name}='+{d.Name}.toString():'') + '");
					}

					newUriText = replaced;
				}
				else
				{
					newUriText = newUriText.Replace($"{{{d.Name}}}", $"' + {d.Name} + '");
				}
			}

			for (int i = 0; i < template.QueryValueVariableNames.Count; i++)
			{
				var name = template.QueryValueVariableNames[i];
				var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
				Debug.Assert(d != null);
				if (d.ParameterDescriptor.ParameterType == typeofString)
				{
					newUriText = newUriText.Replace($"{{{d.Name}}}", $"' + encodeURIComponent({d.Name}) + '");
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTime || d.ParameterDescriptor.ParameterType == typeofDateTimeOffset)
				{
					newUriText = newUriText.Replace($"{{{d.Name}}}", $"' +{d.Name}.toISOString() + '");
				}
				else if (d.ParameterDescriptor.ParameterType == typeofDateTimeNullable || d.ParameterDescriptor.ParameterType == typeofDateTimeOffsetNullable)
				{
					var replaced = newUriText.Replace($"'&{d.Name}={{{d.Name}}}", $"({d.Name}?'&{d.Name}='+{d.Name}.toISOString():'') + '");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"'+({d.Name}?'{d.Name}='+{d.Name}.toISOString():'') + '");
					}

					newUriText = replaced;
				}
				else if (IsNullablePremitive(d.ParameterDescriptor.ParameterType))
				{
					var replaced = newUriText.Replace($"'&{d.Name}={{{d.Name}}}", $"({d.Name}?'&{d.Name}='+{d.Name}.toString():'') + '");
					if (replaced == newUriText)
					{
						replaced = newUriText.Replace($"{d.Name}={{{d.Name}}}", $"'+({d.Name}?'{d.Name}='+{d.Name}.toString():'') + '");
					}

					newUriText = replaced;
				}
				else
				{
					newUriText = newUriText.Replace($"{{{d.Name}}}", $"' + {d.Name} + '");
				}
			}

			return newUriText;
		}

		/// <summary>
		/// DateTime is not premitive type. Decimal is premitive VB.net but not in C#.NET
		/// https://stackoverflow.com/questions/13471941/why-is-decimal-not-a-primitive-type
		/// </summary>
		/// <param name="t"></param>
		/// <returns></returns>
		static bool IsNullablePremitive(Type t)
		{
			return (t.IsGenericType && typeOfNullableDefinition.Equals(t.GetGenericTypeDefinition()) && (t.GetGenericArguments()[0].IsPrimitive || t.GetGenericArguments()[0].IsValueType));
		}

	}

}
