using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using Fonlow.CodeDom.Web;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Fonlow.CodeDom.Web
{
	public class ApiExplorerVisibilityEnabledConvention : IApplicationModelConvention
	{
		public void Apply(ApplicationModel application)
		{
			foreach (var controller in application.Controllers)
			{
				if (controller.ApiExplorer.IsVisible == null)
				{
					controller.ApiExplorer.IsVisible = true;
					controller.ApiExplorer.GroupName = controller.ControllerName;
				}
			}
		}
	}
}
