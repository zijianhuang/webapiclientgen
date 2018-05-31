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
		public static string CreateUriQuery(string uriText, ParameterDescription[] parameterDescriptions)
		{
			Debug.WriteLine("UriText=" + uriText);
			var template = new UriTemplate(uriText);

			if (template.QueryValueVariableNames.Count == 0 && template.PathSegmentVariableNames.Count == 0)
				return null;

			string newUriText = uriText;

			for (int i = 0; i < template.PathSegmentVariableNames.Count; i++)
			{
				var name = template.PathSegmentVariableNames[i];//PathSegmentVariableNames[i] always give uppercase
				var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
				Debug.Assert(d != null);

				newUriText = UriTemplateTransform.Transform(newUriText, d);
			}

			for (int i = 0; i < template.QueryValueVariableNames.Count; i++)
			{
				var name = template.QueryValueVariableNames[i];
				var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
				Debug.Assert(d != null);
				newUriText = UriTemplateTransform.Transform(newUriText, d);
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
				newUriText = UriTemplateTransform.TransformForTs(newUriText, d);
			}

			for (int i = 0; i < template.QueryValueVariableNames.Count; i++)
			{
				var name = template.QueryValueVariableNames[i];
				var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
				Debug.Assert(d != null);
				newUriText = UriTemplateTransform.TransformForTs(newUriText, d);
			}

			return newUriText;
		}

	}

}
