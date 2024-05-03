using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace Fonlow.CodeDom.Web
{
	/// <summary>
	/// 
	/// </summary>
	public static class ApiExplorerHelper
	{
		/// <summary>
		/// Get a flat list of ApiDescriptions in the api explorer. Called once in CodeGenController.
		/// </summary>
		/// <param name="explorer"></param>
		/// <returns></returns>
		/// <remarks>The core design of WebApiClientGen is based on such flat list, while .net core provide groupped lists.</remarks>
		public static ApiDescription[] GetApiDescriptions(IApiDescriptionGroupCollectionProvider explorer)
		{
			List<ApiDescription> list = new List<ApiDescription>();
			foreach (ApiDescriptionGroup group in explorer.ApiDescriptionGroups.Items)
			{
				Debug.WriteLine(group.GroupName);
				foreach (ApiDescription d in group.Items)
				{
					list.Add(d);
				}
			}

			ApiDescription first = list.FirstOrDefault(d =>
			{
				Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor controllerActionDescriptor = d.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
				if (controllerActionDescriptor == null)
				{
					return false;
				}

				return true;
			});

			if (first != null)
			{
				Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor firstControllerActionDescriptor = first.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
				string xmlFilePath = DocComment.DocCommentLookup.GetXmlPath(firstControllerActionDescriptor.MethodInfo.DeclaringType.Assembly);
				DocComment.DocCommentLookup docLookup = Fonlow.DocComment.DocCommentLookup.Create(xmlFilePath);
				WebApiDocSingleton.InitOnce(docLookup);
			}

			return list.ToArray();
		}

	}


}
