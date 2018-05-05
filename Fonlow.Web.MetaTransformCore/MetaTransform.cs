using System;
using System.Linq;
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
		static ParameterBinder GetParameterBinder(BindingInfo bindingInfo)
		{
			if (bindingInfo == null)
				return ParameterBinder.None;

			var bindingSource = bindingInfo.BindingSource;
			if (bindingSource == null)
				return ParameterBinder.None;

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
					RelativePath = description.RelativePath,
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
							ParameterBinder = GetParameterBinder(d.ParameterDescriptor.BindingInfo),//.ParameterBinderAttribute),

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

	}

}
