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

	public class RequiredFromQueryAttribute : FromQueryAttribute, IParameterModelConvention
	{
		public void Apply(ParameterModel parameter)
		{
			if (parameter.Action.Selectors != null && parameter.Action.Selectors.Any())
			{
				parameter.Action.Selectors.Last().ActionConstraints.Add(new RequiredFromQueryActionConstraint(parameter.BindingInfo?.BinderModelName ?? parameter.ParameterName));
			}
		}
	}

	public class RequiredFromQueryActionConstraint : Microsoft.AspNetCore.Mvc.ActionConstraints.IActionConstraint
	{
		private readonly string _parameter;

		public RequiredFromQueryActionConstraint(string parameter)
		{
			_parameter = parameter;
		}

		public int Order => 999;

		public bool Accept(Microsoft.AspNetCore.Mvc.ActionConstraints.ActionConstraintContext context)
		{
			if (!context.RouteContext.HttpContext.Request.Query.ContainsKey(_parameter))
			{
				return false;
			}

			return true;
		}
	}
}
