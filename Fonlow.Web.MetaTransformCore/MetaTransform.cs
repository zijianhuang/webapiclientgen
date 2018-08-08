using Fonlow.DocComment;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

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

            if (BindingSource.ModelBinding.CanAcceptDataFrom(bindingSource))
                return ParameterBinder.FromUri;

            throw new ArgumentException($"How can it be with this ParameterBindingAttribute: {bindingSource.DisplayName}", "bindingSource");
        }

        /// <summary>
        /// Translate ApiDescription of the Framework to my own WebApiDescription
        /// </summary>
        /// <param name="description"></param>
        /// <returns></returns>
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
                    Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor actionDescriptor = description.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
                    Debug.Assert(actionDescriptor != null);
                    responseType = actionDescriptor.MethodInfo.ReturnType;// in .net core 2.1, IActionResult is not in SupportedResponseTypes anymore, so I have to get it here.
                    if (responseType.Equals(typeof(void)))
                    {
                        responseType = null;
                    }
                }

                var xmlFilePath = DocComment.DocCommentLookup.GetXmlPath(controllerActionDescriptor.MethodInfo.DeclaringType.Assembly);
                var docLookup = DocCommentLookup.Create(xmlFilePath);
                var methodComments = docLookup == null ? null : GetMethodDocComment(docLookup, controllerActionDescriptor);

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
                    Documentation = DocCommentHelper.GetSummary(methodComments),
                    RelativePath = description.RelativePath + BuildQuery(description.ParameterDescriptions),
                    ResponseDescription = new ResponseDescription()
                    {
                        Documentation = DocCommentHelper.GetReturnComment(methodComments),
                        ResponseType = responseType,
                        // DeclaredType = description.ResponseDescription.DeclaredType,
                    },

                    ParameterDescriptions = description.ParameterDescriptions.Select(d => new ParameterDescription()
                    {
                        Documentation = DocCommentHelper.GetParameterComment(methodComments, d.Name),
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
            var qs = ds.Where(d => BindingSource.Query.CanAcceptDataFrom(d.Source)).Select(k => String.Format("{0}={{{0}}}", k.Name)).ToArray();
            if (qs.Length == 0)
            {
                return String.Empty;
            }

            return "?" + qs.Aggregate((c, n) => c + "&" + n); ;
        }

        static docMember GetMethodDocComment(DocCommentLookup lookup, Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor descriptor)
        {
            var methodInfo = descriptor.MethodInfo;
            var methodFullName = methodInfo.DeclaringType.FullName + "." + methodInfo.Name;
            if (descriptor.Parameters.Count > 0)
            {
                methodFullName += "(" + descriptor.Parameters.Select(d => d.ParameterType.FullName).Aggregate((c, n) => c + "," + n) + ")";
            }

            return lookup.GetMember("M:" + methodFullName);
        }

    }

}
