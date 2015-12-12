using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc.ApiExplorer;

namespace Fonlow.Web.Meta
{
    public static class MetaTransform
    {
        static ParameterBinder GetParameterBinder(ParameterBindingAttribute a)
        {
            if (a == null)
                return ParameterBinder.None;

            if (a is FromUriAttribute)
                return ParameterBinder.FromUri;

            if (a is FromBodyAttribute)
                return ParameterBinder.FromBody;

            throw new ArgumentException($"How can it be with this ParameterBindingAttribute {a.ToString()}", "a");
        }

        public static WebApiDescription GetWebApiDescription(ApiDescription description)
        {
            return new WebApiDescription(description.ID)
{
    ActionDescriptor = new ActionDescriptor()
    {
        ActionName = description.ActionDescriptor.Name,
        ReturnType = description.ResponseType,
                    ControllerDescriptor = new ControllerDescriptor()
                    {
                        ControllerName = description.ActionDescriptor.ControllerDescriptor.ControllerName,
                        ControllerType = description.ActionDescriptor.ControllerDescriptor.ControllerType,
                    }
                },

                HttpMethod = description.HttpMethod.Method,
                Documentation = description.Documentation,
                RelativePath = description.RelativePath,
                ResponseDescription = new ResponseDescription()
                {
                    Documentation = description.ResponseDescription.Documentation,
                    ResponseType = description.ResponseDescription.ResponseType,
                    DeclaredType = description.ResponseDescription.DeclaredType,
                },

                ParameterDescriptions = description.ParameterDescriptions.Select(d => new ParameterDescription()
                {
                    Documentation = d.Documentation,
                    Name = d.Name,
                    ParameterDescriptor = new ParameterDescriptor()
                    {
                        IsOptional = d.ParameterDescriptor.IsOptional,
                        ParameterName = d.ParameterDescriptor.ParameterName,
                        ParameterType = d.ParameterDescriptor.ParameterType,
                        ParameterBinder = GetParameterBinder(d.ParameterDescriptor.ParameterBinderAttribute),

                    }
                }).ToArray(),

            };
        }

    }

}
