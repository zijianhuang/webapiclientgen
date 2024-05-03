using System;
using System.CodeDom;
using System.Linq;
using System.Diagnostics;
using Fonlow.TypeScriptCodeDom;
using Fonlow.Reflection;
using Fonlow.Web.Meta;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate a client function upon ApiDescription for jQuery
	/// </summary>
	public class ClientApiTsJqFunctionGen : ClientApiTsFunctionGenBase
	{

		readonly bool handleHttpRequestHeaders;
		readonly string contentType;

		public ClientApiTsJqFunctionGen(string contentType, bool handleHttpRequestHeaders) : base()
		{
			this.contentType = String.IsNullOrEmpty(contentType) ? "application/json;charset=UTF-8" : contentType;
			this.handleHttpRequestHeaders = handleHttpRequestHeaders;
		}

		protected override CodeMemberMethod CreateMethodName()
		{
			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = MethodName,
			};
		}

		protected override void RenderImplementation()
		{
			System.Collections.Generic.List<CodeParameterDeclarationExpression> parameters = Description.ParameterDescriptions.Where(p => p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri
				|| p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromQuery || p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
				|| p.ParameterDescriptor.ParameterBinder == ParameterBinder.None).Select(d => {
					Type originalType = d.ParameterDescriptor.ParameterType;
					CodeTypeReference originalCodeTypeReference = Poco2TsGen.TranslateToClientTypeReference(originalType);
					originalCodeTypeReference.UserData.Add(UserDataKeys.IsMethodParameter, true); // so I can add optional null later
					CodeParameterDeclarationExpression exp = new CodeParameterDeclarationExpression(originalCodeTypeReference, d.Name + (StrictMode ? "?" : String.Empty));
					exp.UserData.Add(UserDataKeys.ParameterDescriptor, d.ParameterDescriptor);
					return exp;
				}).ToList();

			CodeTypeReference returnTypeReference = Poco2TsGen.TranslateToClientTypeReference(ReturnType);
			if (returnTypeReference.BaseType == "response")//response is for NG2 with better built-in support for typing, and get translated to HttpResponse<Blob>
			{
				returnTypeReference.BaseType = "any";
			}

			string callbackTypeText = String.Format("(data : {0}) => any", TypeMapper.MapCodeTypeReferenceToTsText(returnTypeReference));
			Debug.WriteLine("callback: " + callbackTypeText);
			CodeSnipetTypeReference callbackTypeReference = new CodeSnipetTypeReference(callbackTypeText);
			parameters.Add(new CodeParameterDeclarationExpression(callbackTypeReference, "callback"));

			Method.Parameters.AddRange(parameters.ToArray());

			if (handleHttpRequestHeaders)
			{
				Method.Parameters.Add(new CodeParameterDeclarationExpression(
					"() => {[header: string]: string}", "headersHandler?"));
			}

			string uriText = GetFullUriText();

			string headerHandlerCall = handleHttpRequestHeaders ? ", headersHandler" : String.Empty;

			if (HttpMethodName == "get" || HttpMethodName == "delete")
			{
				Method.Statements.Add(new CodeSnippetStatement($"this.httpClient.{HttpMethodName}({uriText}, callback, this.error, this.statusCode{headerHandlerCall});"));
			}
			else if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
			{
				ParameterDescription[] fromBodyParameterDescriptions = Description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
					|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
					|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
				if (fromBodyParameterDescriptions.Length > 1)
				{
					throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", Description.ActionDescriptor.ActionName));
				}
				ParameterDescription singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

				string dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

				if (dataToPost == "null")
				{
					Method.Statements.Add(new CodeSnippetStatement($"this.httpClient.{HttpMethodName}({uriText}, null, callback, this.error, this.statusCode, '{contentType}'{headerHandlerCall});"));
				}
				else
				{
					Method.Statements.Add(new CodeSnippetStatement($"this.httpClient.{HttpMethodName}({uriText}, {dataToPost}, callback, this.error, this.statusCode, '{contentType}'{headerHandlerCall});"));
				}

			}
			else
			{
				Debug.Assert(false, $"How come with {HttpMethodName}?");
			}
		}
	}

}
