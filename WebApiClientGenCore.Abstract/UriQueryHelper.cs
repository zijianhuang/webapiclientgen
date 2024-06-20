using Fonlow.Web.Meta;
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
			UriTemplate template = new UriTemplate(uriText);
			string[] parameterNames = template.GetParameterNames().ToArray();
			if (parameterNames.Length == 0 && parameterDescriptions.Length == 0)
				return null;

			string newUriText = uriText;

			foreach (ParameterDescription d in parameterDescriptions)
			{
				if (d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody || d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromForm)
				{
					continue;
				}

				newUriText = UriTemplateTransform.Transform(newUriText, d);
			}

			return newUriText;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="uriText"></param>
		/// <param name="parameterDescriptions"></param>
		/// <returns>Null if parameterNames.Length == 0 and parameterDescriptions.Length==0</returns>
		public static string CreateUriQueryForTs(string uriText, ParameterDescription[] parameterDescriptions)
		{
			UriTemplate template = new UriTemplate(uriText);
			string[] parameterNames = template.GetParameterNames().ToArray();
			if (parameterNames.Length == 0 && parameterDescriptions.Length==0)
				return null;
	
			string newUriText = uriText;

			foreach (ParameterDescription d in parameterDescriptions)
			{
				if (d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody || d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromForm)
				{
					continue;
				}

				newUriText = UriTemplateTransform.TransformForTs(newUriText, d);
			}

			return newUriText;
		}

	}

}
