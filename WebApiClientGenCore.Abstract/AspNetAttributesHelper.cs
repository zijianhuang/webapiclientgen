using Fonlow.Reflection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace WebApiClientGenCore.Abstract
{
	public static class AspNetAttributesHelper
	{
		/// <summary>
		/// Some custom attributes of the API function will become doc comment
		/// </summary>
		/// <param name="customAttributes"></param>
		/// <returns></returns>
		public static string[] CreateMethodCommentBasedOnAttributes(Attribute[] customAttributes)
		{
			var stringList = new List<string>();
			var statusCodeList = new List<string>();
			var authorizeDescription = "";

			foreach (var c in customAttributes)
			{
				var typeFullName = c.GetType().FullName;
				if (typeFullName == "Microsoft.AspNetCore.Authorization.AuthorizeAttribute")
				{
					var roles = TypeHelper.GetAttributePropertyValue(c, "Roles")?.ToString();
					var schemes = TypeHelper.GetAttributePropertyValue(c, "AuthenticationSchemes")?.ToString();
					var policy = TypeHelper.GetAttributePropertyValue(c, "Policy")?.ToString();
					if (!string.IsNullOrEmpty(schemes))
					{
						authorizeDescription += schemes;
					}

					if (!string.IsNullOrEmpty(policy))
					{
						authorizeDescription += $"Policy: {policy}; ";
					}

					if (!string.IsNullOrEmpty(roles))
					{
						authorizeDescription += $"Roles: {roles}; ";
					}

				}

				if (typeFullName == "Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute")
				{
					var statusCodeText = TypeHelper.GetAttributePropertyValue(c, "StatusCode")?.ToString();
					if (statusCodeText != null){
						var code = int.Parse(statusCodeText);
						statusCodeList.Add($"{code}:{((HttpStatusCode)code).ToString()}");
					}
				}

			}

			if (!string.IsNullOrEmpty(authorizeDescription))
			{
				stringList.Add("Authorize: " + authorizeDescription);
			}

			if (statusCodeList.Count > 0) {
				stringList.Add("Status Codes: " + string.Join(", ", statusCodeList));
			}

			return stringList.ToArray();
		}


	}
}
