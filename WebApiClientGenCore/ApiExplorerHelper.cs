using Fonlow.Reflection;
using System;
using System.Diagnostics;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Fonlow.CodeDom.Web
{
    public static class ApiExplorerHelper
    {
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
