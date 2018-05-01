using System;
using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace Fonlow.Web.Meta
{
    /// <summary>
    /// Transform the runtime info of Web API into POCO meta data.
    /// </summary>
    public static class MetaTransform
    {
        //static ParameterBinder GetParameterBinder(ParameterBindingAttribute a)
        //{
        //    if (a == null)
        //        return ParameterBinder.None;

        //    if (a is FromUriAttribute)
        //        return ParameterBinder.FromUri;

        //    if (a is FromBodyAttribute)
        //        return ParameterBinder.FromBody;

        //    throw new ArgumentException($"How can it be with this ParameterBindingAttribute {a.ToString()}", "a");
        //}

        public static WebApiDescription GetWebApiDescription(ApiDescription description)
        {
            return new WebApiDescription(description.ActionDescriptor.Id)
            {
                ActionDescriptor = new ActionDescriptor()
                {
                    ActionName = description.ActionDescriptor.DisplayName,
                    ReturnType = description.SupportedResponseTypes[0].Type,//for complex types
                    //ControllerDescriptor = new ControllerDescriptor()
                    //{
                    //    ControllerName = description.ActionDescriptor.ControllerDescriptor.ControllerName,
                    //    ControllerType = description.ActionDescriptor.ControllerDescriptor.ControllerType,
                    //}
                },

                HttpMethod = description.HttpMethod,
             //   Documentation = description.Documentation,
                RelativePath = description.RelativePath,
                ResponseDescription = new ResponseDescription()
                {
                  //  Documentation = description.ResponseDescription.Documentation,
                    ResponseType = description.SupportedResponseTypes[0].Type,
                  //  DeclaredType = description.ResponseDescription.DeclaredType,
                },

                ParameterDescriptions = description.ParameterDescriptions.Select(d => new ParameterDescription()
                {
                   // Documentation = d.Documentation,
                    Name = d.Name,
                    ParameterDescriptor = new ParameterDescriptor()
                    {
                       // IsOptional = d.ParameterDescriptor.IsOptional,
                        ParameterName = d.ParameterDescriptor.Name,
                        ParameterType = d.ParameterDescriptor.ParameterType,
                     //   ParameterBinder = GetParameterBinder(d.ParameterDescriptor.ParameterBinderAttribute),

                    }
                }).ToArray(),

            };
        }

    }

}
