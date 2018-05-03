using System;
using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Fonlow.Web.Meta
{
    /// <summary>
    /// Transform the runtime info of Web API into POCO meta data.
    /// </summary>
    public static class MetaTransform
    {
		static ParameterBinder GetParameterBinder(BindingSource a)
		{
			if (a == null)
				return ParameterBinder.None;
			
			if (BindingSource.Query.CanAcceptDataFrom(a))
				return ParameterBinder.FromUri;

			if (BindingSource.Body.CanAcceptDataFrom(a))
				return ParameterBinder.FromBody;

			throw new ArgumentException($"How can it be with this ParameterBindingAttribute {a.ToString()}", "a");
		}

		public static WebApiDescription GetWebApiDescription(ApiDescription description)
        {
			var controllerActionDescriptor = description.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
			Debug.Assert(controllerActionDescriptor != null);
			
			return new WebApiDescription(description.ActionDescriptor.Id)
            {
                ActionDescriptor = new ActionDescriptor()
                {
                    ActionName = description.ActionDescriptor.DisplayName,
                    ReturnType = description.SupportedResponseTypes[0].Type,//for complex types
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
                    ResponseType = description.SupportedResponseTypes[0].Type,
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
                        ParameterBinder = GetParameterBinder(d.ParameterDescriptor.BindingInfo.BindingSource),//.ParameterBinderAttribute),

                    }
                }).ToArray(),

            };
        }

    }

}
