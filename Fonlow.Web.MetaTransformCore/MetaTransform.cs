using System;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Fonlow.Web.Meta
{
	/// <summary>
	/// Transform the runtime info of Web API into POCO meta data.
	/// </summary>
	public static class MetaTransform
	{
		static ParameterBinder GetParameterBinder(BindingSource bindingSource)
		{
			if (bindingSource == null)
				return ParameterBinder.None;

			if (BindingSource.Path.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromUri;

			if (BindingSource.Query.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromUri;

			if (BindingSource.Body.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromBody;

			throw new ArgumentException($"How can it be with this ParameterBindingAttribute {bindingSource.ToString()}", "a");
		}

		public static WebApiDescription GetWebApiDescription(ApiDescription description)
		{
			var controllerActionDescriptor = description.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
			if (controllerActionDescriptor == null)
			{
				return null;
			}

			try
			{
				Type responseType;
				if (description.SupportedResponseTypes.Count > 0)
				{
					if (description.SupportedResponseTypes[0].Type.Equals(typeof(void)))
					{
						responseType = null;
					}
					else
					{
						responseType = description.SupportedResponseTypes[0].Type;
					}
				}
				else
				{
					responseType = null;
				}
				//if (responseType == null)
				//{
				//	Debug.WriteLine("It is " + description.ActionDescriptor.DisplayName);
				//}

				var dr = new WebApiDescription(description.ActionDescriptor.Id)
				{
					ActionDescriptor = new ActionDescriptor()
					{
						ActionName = controllerActionDescriptor.ActionName,
						ReturnType = responseType,
						ControllerDescriptor = new ControllerDescriptor()
						{
							ControllerName = controllerActionDescriptor.ControllerName,
							ControllerType = controllerActionDescriptor.ControllerTypeInfo.AsType()
						}
					},

					HttpMethod = description.HttpMethod,
					//  Documentation = description.Documentation,
					RelativePath = description.RelativePath + BuildQuery(description.ParameterDescriptions),
					ResponseDescription = new ResponseDescription()
					{
						//    Documentation = description.ResponseDescription.Documentation,
						ResponseType = responseType,
						// DeclaredType = description.ResponseDescription.DeclaredType,
					},

					ParameterDescriptions = description.ParameterDescriptions.Select(d => new ParameterDescription()
					{
						//  Documentation = d.Documentation,
						Name = d.Name,
						ParameterDescriptor = new ParameterDescriptor()
						{
							ParameterName = d.ParameterDescriptor.Name,
							ParameterType = d.ParameterDescriptor.ParameterType,
							ParameterBinder = GetParameterBinder(d.Source),//.ParameterBinderAttribute),

						}
					}).ToArray(),

				};

				return dr;
			}
			catch (Exception ex)
			{
				Trace.TraceError(ex.ToString());
				throw;
			}
		}

		static string BuildQuery(IList<ApiParameterDescription> ds)
		{
			var qs = ds.Where(d => BindingSource.Query.CanAcceptDataFrom(d.Source)).Select(k=> String.Format("{0}={{{0}}}", k.Name)).ToArray();
			if (qs.Length == 0)
			{
				return String.Empty;
			}

			return "?"+ qs.Aggregate((c, n) => c + "&" + n); ;
		}

	}

}
