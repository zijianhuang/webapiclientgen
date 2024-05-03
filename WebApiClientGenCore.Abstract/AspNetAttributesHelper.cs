using Fonlow.Reflection;
using System;
using System.Collections.Generic;
using System.Net;

namespace WebApiClientGenCore.Abstract
{
	public static class AspNetAttributesHelper
	{
		/// <summary>
		/// Some custom attributes of the API function will become doc comment
		/// </summary>
		/// <param name="customAttributes"></param>
		/// <returns></returns>
		public static string[] CreateDocCommentBasedOnAttributes(Attribute[] customAttributes)
		{
			List<string> stringList = new List<string>();
			List<string> statusCodeList = new List<string>();
			string authorizeDescription = "";

			foreach (Attribute c in customAttributes)
			{
				string typeFullName = c.GetType().FullName;
				if (typeFullName == "Microsoft.AspNetCore.Authorization.AuthorizeAttribute")
				{
					string roles = TypeHelper.GetAttributePropertyValue(c, "Roles")?.ToString();
					string schemes = TypeHelper.GetAttributePropertyValue(c, "AuthenticationSchemes")?.ToString();
					string policy = TypeHelper.GetAttributePropertyValue(c, "Policy")?.ToString();
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
					string statusCodeText = TypeHelper.GetAttributePropertyValue(c, "StatusCode")?.ToString();
					if (statusCodeText != null)
					{
						int code = int.Parse(statusCodeText);
						string typeText = TypeHelper.GetAttributePropertyValue(c, "Type")?.ToString();
						string responseText = $"{code}:{((HttpStatusCode)code).ToString()}";
						if (typeText != "System.Void" && !String.IsNullOrEmpty(typeText))
						{
							responseText += $" : {typeText}";
						}

						statusCodeList.Add(responseText);
					}
				}

			}

			if (!string.IsNullOrEmpty(authorizeDescription))
			{
				stringList.Add("Authorize: " + authorizeDescription);
			}

			if (statusCodeList.Count > 0)
			{
				stringList.Add("Status Codes: " + string.Join(", ", statusCodeList));
			}

			return stringList.ToArray();
		}
	}
}
