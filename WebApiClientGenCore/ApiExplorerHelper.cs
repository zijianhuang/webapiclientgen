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

			// Just in case the Web API consist of more than 1 asemblies that contained strongly typed controller.
			var xmlFilePaths = list.Where(d =>
			{
				Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor controllerActionDescriptor = d.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
				return controllerActionDescriptor != null;
			}).Select(first=> {
				Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor firstControllerActionDescriptor = first.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
				string xmlFilePath = DocComment.DocCommentLookup.GetXmlPath(firstControllerActionDescriptor.MethodInfo.DeclaringType.Assembly);
				return xmlFilePath;
			}).Distinct().ToArray();
			
			if (xmlFilePaths.Length>0){
				DocComment.DocCommentLookup docLookup = Fonlow.DocComment.DocCommentLookup.CreateAndMerge(xmlFilePaths);
				WebApiDocSingleton.InitOnce(docLookup);
				WebApiDocSingleton.InitOnce(docLookup);
			}

			return list.ToArray();
		}

	}


}
