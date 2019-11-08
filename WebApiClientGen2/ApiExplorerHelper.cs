using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Collections.Generic;
using System.Diagnostics;

namespace Fonlow.CodeDom.Web
{
	/// <summary>
	/// 
	/// </summary>
	public static class ApiExplorerHelper
    {
		/// <summary>
		/// Get a flat list of ApiDescriptions in the api explorer
		/// </summary>
		/// <param name="explorer"></param>
		/// <returns></returns>
		/// <remarks>The core design of WebApiClientGen is based on such flat list, while .net core provide groupped lists.</remarks>
		public static ApiDescription[] GetApiDescriptions(IApiDescriptionGroupCollectionProvider explorer)
		{
			var list = new List<ApiDescription>();
			foreach (var group in explorer.ApiDescriptionGroups.Items)
			{
				Debug.WriteLine(group.GroupName);
				foreach (var d in group.Items)
				{
					list.Add(d);
				}
			}

			return list.ToArray();
		}

	}


}
