using Fonlow.DocComment;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Fonlow.Reflection;
using Microsoft.AspNetCore.Mvc;

namespace Fonlow.Web.Meta
{
	/// <summary>
	/// Transform the runtime info of Web API into POCO meta data.
	/// </summary>
	/// <exception cref="ArgumentException">Thrown if the BindingSource is not among Path, Query, Body and ModelBinding.</exception>
	public static class MetaTransform
	{
		static ParameterBinder GetParameterBinder(BindingSource bindingSource)
		{
			if (bindingSource == null)
				return ParameterBinder.None;

			if (BindingSource.FormFile.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromForm;

			if (BindingSource.Form.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromForm;

			if (BindingSource.Path.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromUri;

			if (BindingSource.Query.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromUri;

			if (BindingSource.Body.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromBody;

			if (BindingSource.ModelBinding.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromUri;

			if (BindingSource.Header.CanAcceptDataFrom(bindingSource))
				return ParameterBinder.FromHeader;

			throw new ArgumentException($"How can it be with this ParameterBindingAttribute: {bindingSource.DisplayName}", nameof(bindingSource));
		}

		static Type GetReturnTypeFromResponseTypes(IList<ApiResponseType> responseTypes)
		{
			var foundGoodResponse = responseTypes.FirstOrDefault(d => d.StatusCode >= 200 && d.StatusCode <= 202);
			if (foundGoodResponse != null)
			{
				return foundGoodResponse.Type;
			}

			return null;
		}

		/// <summary>
		/// Translate ASP.NET ApiDescription to codegen's WebApiDescription
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
				Type returnType;
				var goodReturnType = GetReturnTypeFromResponseTypes(description.SupportedResponseTypes);
				if (goodReturnType != null)
				{
					if (goodReturnType.Equals(typeof(void))){
						returnType = null;
					}else{
						returnType = goodReturnType;
					}
				}
				else
				{
					Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor actionDescriptor = description.ActionDescriptor as Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor;
					Debug.Assert(actionDescriptor != null, "is it possible?");
					var candidateReturnType = actionDescriptor.MethodInfo.ReturnType;// in .net core 2.1, IActionResult is not in SupportedResponseTypes anymore, so I have to get it here.
					if (candidateReturnType.Equals(typeof(void)))
					{
						returnType = null;
					}
					else if (candidateReturnType.IsGenericType && candidateReturnType.GetGenericTypeDefinition() == typeof(ActionResult<>))
					{
						returnType = Get1stArgumentTypeOfGeneric(candidateReturnType);
					}
					else if (candidateReturnType.IsGenericType && candidateReturnType.GetGenericTypeDefinition() == typeof(System.Threading.Tasks.Task<>))
					{
						var typeInTask = Get1stArgumentTypeOfGeneric(candidateReturnType);
						if (typeInTask.IsGenericType && typeInTask.GetGenericTypeDefinition() == typeof(ActionResult<>))
						{
							returnType = Get1stArgumentTypeOfGeneric(typeInTask);
						}
						else
						{
							returnType = typeInTask;
						}
					}
					else
					{
						returnType = candidateReturnType;
					}
				}

				var dr = new WebApiDescription(description.ActionDescriptor.Id)
				{
					ActionDescriptor = new ActionDescriptor()
					{
						ActionName = controllerActionDescriptor.ActionName,
						MethodName = controllerActionDescriptor.MethodInfo.Name,
						MethodFullName = controllerActionDescriptor.MethodInfo.DeclaringType.FullName + "." + controllerActionDescriptor.MethodInfo.Name,
						MethodParameterTypes = controllerActionDescriptor.MethodInfo.GetParameters().Select(d => d.ParameterType).ToArray(),
						ReturnType = returnType,
						CustomAttributes = controllerActionDescriptor.MethodInfo.GetCustomAttributes(false).OfType<Attribute>().ToArray(),
						ControllerDescriptor = new ControllerDescriptor()
						{
							ControllerName = controllerActionDescriptor.ControllerName,
							ControllerType = controllerActionDescriptor.ControllerTypeInfo.AsType()
						}
					},

					HttpMethod = description.HttpMethod,
					RelativePath = description.RelativePath + BuildQuery(description.ParameterDescriptions),
					ResponseDescription = new ResponseDescription()
					{
						ResponseType = returnType,
					},

					ParameterDescriptions = description.ParameterDescriptions.Select(d =>
					{
						var parameterBinder = GetParameterBinder(d.Source);
						var descriptor = d.ParameterDescriptor;
						if (descriptor == null)
						{
							throw new CodeGenException($"Web API {controllerActionDescriptor.ControllerName}/{controllerActionDescriptor.ActionName} may have invalid parameters.");
						}

						var parameterType = descriptor.ParameterType;
						var isValueType = TypeHelper.IsValueType(parameterType);
						var isNullablePrimitive = TypeHelper.IsNullablePrimitive(parameterType);
						var isArrayType = TypeHelper.IsSimpleListType(parameterType) || TypeHelper.IsSimpleArrayType(parameterType);
						if ((parameterBinder == ParameterBinder.FromQuery || parameterBinder == ParameterBinder.FromUri) &&
							(!isValueType && !isNullablePrimitive && !isArrayType && !parameterType.IsEnum))
						{
							throw new ArgumentException($"Not support ParameterBinder {parameterBinder} with a class parameter {parameterType}.");
						}

						return new ParameterDescription()
						{
							Name = d.Name,
							ParameterDescriptor = new ParameterDescriptor()
							{
								ParameterName = d.ParameterDescriptor.Name,
								ParameterType = parameterType,
								ParameterBinder = parameterBinder,

							}
						};
					}).ToArray(),

				};

				return dr;
			}
			catch (ArgumentException ex)//Expected to be thrown from GetParameterBinder()
			{
				var msg = ex.Message;
				var errorMsg = $"Web API {controllerActionDescriptor.ControllerName}/{controllerActionDescriptor.ActionName} is defined with invalid parameters: {msg}";
				Trace.TraceError(errorMsg);
				throw new CodeGenException(errorMsg, ex);
			}
			catch (NullReferenceException ex)
			{
				var msg = ex.Message;
				var errorMsg = $"Web API {controllerActionDescriptor.ControllerName}/{controllerActionDescriptor.ActionName} has problem: {msg}";
				Trace.TraceError(errorMsg);
				throw new CodeGenException(errorMsg, ex);
			}
			catch (Exception ex)
			{
				Trace.TraceError(ex.ToString());
				throw;
			}
		}

		static Type Get1stArgumentTypeOfGeneric(Type t)
		{
			var genericArguments = t.GetGenericArguments();
			if (genericArguments.Length > 0)
			{
				return genericArguments[0];
			}

			return null;
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
	}

}
