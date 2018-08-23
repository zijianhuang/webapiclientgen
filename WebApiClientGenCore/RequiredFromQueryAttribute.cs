using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System.Linq;

namespace Fonlow.CodeDom.Web
{
	/// <summary>
	/// Derived from FromQueryAttribute, signal a query parameter is required. So the action will have distinctive action signature. In contrast, in ASP.NET Web API 2.0, such signal is not required.
	/// </summary>
	public class RequiredFromQueryAttribute : FromQueryAttribute, IParameterModelConvention
	{
		/// <summary>
		/// Alter the default action straint so the query parameter is required.
		/// </summary>
		/// <param name="parameter"></param>
		public void Apply(ParameterModel parameter)
		{
			if (parameter.Action.Selectors != null && parameter.Action.Selectors.Any())
			{
				parameter.Action.Selectors.Last().ActionConstraints.Add(new RequiredFromQueryActionConstraint(parameter.BindingInfo?.BinderModelName ?? parameter.ParameterName));
			}
		}
	}

	/// <summary>
	/// 
	/// </summary>
	internal class RequiredFromQueryActionConstraint : Microsoft.AspNetCore.Mvc.ActionConstraints.IActionConstraint
	{
		private readonly string parameter;

		public RequiredFromQueryActionConstraint(string parameter)
		{
			this.parameter = parameter;
		}

		public int Order => 999;

		public bool Accept(Microsoft.AspNetCore.Mvc.ActionConstraints.ActionConstraintContext context)
		{
			if (!context.RouteContext.HttpContext.Request.Query.ContainsKey(parameter))
			{
				return false;
			}

			return true;
		}
	}
	//Thanks to https://www.strathweb.com/2016/09/required-query-string-parameters-in-asp-net-core-mvc/
}
