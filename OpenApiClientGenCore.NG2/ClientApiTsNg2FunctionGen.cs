using System;
using System.CodeDom;
using System.Linq;
using System.Collections.ObjectModel;
using System.Collections.Generic;

using System.Diagnostics;
using System.Text;
using Fonlow.TypeScriptCodeDom;
using Fonlow.Poco2Ts;
using Fonlow.Reflection;
using Fonlow.Web.Meta;
using Fonlow.OpenApi.ClientTypes;
using Microsoft.OpenApi.Models;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate a client function upon ApiDescription for Angular
	/// </summary>
	public class ClientApiTsNG2FunctionGen : ClientApiTsFunctionGenBase
	{
		const string NG2HttpResponse = "Response";
		const string NG2HttpBlobResponse = "HttpResponse<Blob>";
		const string NG2HttpStringResponse = "HttpResponse<string>";

		string returnTypeText = null;
		string contentType;

		public ClientApiTsNG2FunctionGen(string contentType) : base()
		{
			this.contentType = contentType;
		}

		protected override CodeMemberMethod CreateMethodName()
		{
			returnTypeText = TypeMapper.MapCodeTypeReferenceToTsText(ReturnTypeReference);
			if (returnTypeText == "any" || returnTypeText == "void")
			{
				returnTypeText = NG2HttpResponse;
			}
			else if (returnTypeText == "response")
			{
				returnTypeText = NG2HttpStringResponse;
			}
			else if (returnTypeText == "blobresponse")
			{
				returnTypeText = NG2HttpBlobResponse;
			}

			var callbackTypeText = $"Observable<{returnTypeText}>";
			Debug.WriteLine("callback: " + callbackTypeText);
			var returnTypeReferenceWithObservable = new CodeSnipetTypeReference(callbackTypeText);

			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = ActionName,
				ReturnType = returnTypeReferenceWithObservable,
			};
		}


		protected override void RenderImplementation()
		{
			var httpMethodName = HttpMethod.ToString().ToLower(); //Method is always uppercase.
																  //deal with parameters
			var parameters = ParameterDescriptions.Select(d =>
				new CodeParameterDeclarationExpression(Poco2TsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType), d.Name))
				.ToArray();

			//parameters.Add(new CodeParameterDeclarationExpression(callbackTypeReference, "callback"));

			Method.Parameters.AddRange(parameters);

			var jsUriQuery = UriQueryHelper.CreateUriQueryForTs(RelativePath, ParameterDescriptions);
			var uriText = jsUriQuery == null ? $"this.baseUri + '{RelativePath}'" :
				RemoveTrialEmptyString($"this.baseUri + '{jsUriQuery}'");

			// var mapFunction = returnTypeText == NG2HttpResponse ? String.Empty : ".map(response=> response.json())";

			if (ReturnTypeReference != null &&  ReturnTypeReference.BaseType == "System.String" && ReturnTypeReference.ArrayElementType == null)//stringAsString is for .NET Core Web API
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, {{ responseType: 'text' }});"));
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put")
				{
					var fromBodyParameterDescriptions = ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
						|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
						|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
					if (fromBodyParameterDescriptions.Length > 1)
					{
						throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", ActionName));
					}
					var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

					var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

					if (String.IsNullOrEmpty(contentType))
					{
						contentType = "application/json;charset=UTF-8";
					}

					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, null, {{headers: {{ 'Content-Type': '{contentType}' }}, responseType: 'text' }});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {{ headers: {{ 'Content-Type': '{contentType}' }}, responseType: 'text' }});"));
					}

					return;
				}

			}
			else if (returnTypeText == NG2HttpBlobResponse)//translated from blobresponse to this
			{
				const string optionForStream = "{ observe: 'response', responseType: 'blob' }";

				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, {optionForStream});"));
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put")
				{
					var fromBodyParameterDescriptions = ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
						|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
						|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
					if (fromBodyParameterDescriptions.Length > 1)
					{
						throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", ActionName));
					}
					var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

					var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, null, {optionForStream});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {optionForStream});"));
					}

					return;
				}

			}
			else if (returnTypeText == NG2HttpStringResponse)//translated from response to this
			{
				const string optionForActionResult = "{ observe: 'response', responseType: 'text' }";

				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, {optionForActionResult});"));
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put")
				{
					var fromBodyParameterDescriptions = ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
						|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
						|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
					if (fromBodyParameterDescriptions.Length > 1)
					{
						throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", ActionName));
					}
					var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

					var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, null, {optionForActionResult});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {{ headers: {{ 'Content-Type': '{contentType}' }}, observe: 'response', responseType: 'text' }});"));
					}

					return;
				}

			}
			else
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}<{returnTypeText}>({uriText});"));
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put")
				{
					var fromBodyParameterDescriptions = ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
						|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
						|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
					if (fromBodyParameterDescriptions.Length > 1)
					{
						throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", ActionName));
					}
					var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

					var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

					if (String.IsNullOrEmpty(contentType))
					{
						contentType = "application/json;charset=UTF-8";
					}

					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}<{returnTypeText}>({uriText}, null, {{ headers: {{ 'Content-Type': '{contentType}' }} }});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}<{returnTypeText}>({uriText}, JSON.stringify({dataToPost}), {{ headers: {{ 'Content-Type': '{contentType}' }} }});"));
					}

					return;
				}
			}

			Debug.Assert(false, "How come?");
		}

	}

}
