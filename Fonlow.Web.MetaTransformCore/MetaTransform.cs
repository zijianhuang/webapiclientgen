using System;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Fonlow.DocComment;
using System.Reflection;

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

				var xmlFilePath = DocComment.DocCommentLookup.GetXmlPath(controllerActionDescriptor.MethodInfo.DeclaringType.Assembly);
				var docLookup = DocCommentLookup.Create(xmlFilePath);
				var methodComments = GetMethodDocComment(docLookup, controllerActionDescriptor);

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
					Documentation = GetSummary(methodComments),
					RelativePath = description.RelativePath + BuildQuery(description.ParameterDescriptions),
					ResponseDescription = new ResponseDescription()
					{
						Documentation = GetReturnComment(methodComments),
						ResponseType = responseType,
						// DeclaredType = description.ResponseDescription.DeclaredType,
					},

					ParameterDescriptions = description.ParameterDescriptions.Select(d => new ParameterDescription()
					{
						Documentation = GetParameterComment(methodComments, d.Name),
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

		static string GetSummary(docMember m)
		{
			if (m == null || m.summary==null || m.summary.Text==null || m.summary.Text.Length==0)
			{
				return null;
			}

			var noIndent = StringFunctions.TrimTrimIndentsOfArray(m.summary.Text);
			return String.Join(Environment.NewLine, noIndent);
		}

		static string GetReturnComment(docMember m)
		{
			if (m == null || m.returns == null || m.returns.Text==null || m.returns.Text.Length==0)
			{
				return null;
			}

			var noIndent = StringFunctions.TrimTrimIndentsOfArray(m.returns.Text);
			return String.Join(Environment.NewLine, noIndent);
		}

		static string GetParameterComment(docMember m, string name)
		{
			if (m == null || m.param==null)
			{
				return null;
			}

			var mc = m.param.SingleOrDefault(d => d.name == name);
			if (mc==null || mc.Text==null || mc.Text.Length == 0)
			{
				return null;
			}

			var noIndent = StringFunctions.TrimTrimIndentsOfArray(mc.Text);
			return String.Join(Environment.NewLine, noIndent);
		}

	}

}
