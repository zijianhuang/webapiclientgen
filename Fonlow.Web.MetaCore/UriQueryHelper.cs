using Fonlow.Web.Meta;
using System;
using System.Diagnostics;
using System.Linq;
using Tavis.UriTemplates;

namespace Fonlow.CodeDom.Web
{
	/// <summary>
	/// Generate a client function upon ApiDescription
	/// </summary>
	public static class UriQueryHelper
	{
		public static string CreateUriQuery(string uriText, ParameterDescription[] parameterDescriptions)
		{
			var template = new UriTemplate(uriText);
			var parameterNames = template.GetParameterNames().ToArray();
			if (parameterNames.Length == 0 && parameterDescriptions.Length == 0)
				return null;

			bool queryPlaceholderMissing = parameterNames.Length != parameterDescriptions.Length
				&& !parameterDescriptions.Any(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody || d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromForm);//sometimes yaml does not give propery query placeholder.

			string newUriText = uriText;

			foreach (var d in parameterDescriptions)
			{
				if (d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody || d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromForm)
				{
					continue;
				}

				newUriText = UriTemplateTransform.Transform(newUriText, d, queryPlaceholderMissing);
			}

			return newUriText;
		}

		public static string CreateUriQueryForTs(string uriText, ParameterDescription[] parameterDescriptions)
		{
			var template = new UriTemplate(uriText);
			var parameterNames = template.GetParameterNames().ToArray();
			if (parameterNames.Length == 0 && parameterDescriptions.Length==0)
				return null;

			bool queryPlaceholderMissing = parameterNames.Length != parameterDescriptions.Length 
				&& !parameterDescriptions.Any(d=>d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody || d.ParameterDescriptor.ParameterBinder== ParameterBinder.FromForm) ;//sometimes yaml does not give propery query placeholder.
			
			string newUriText = uriText;

			foreach (var d in parameterDescriptions)
			{
				if (d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody || d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromForm)
				{
					continue;
				}

				newUriText = UriTemplateTransform.TransformForTs(newUriText, d, queryPlaceholderMissing);
			}

			return newUriText;
		}

	}

}
