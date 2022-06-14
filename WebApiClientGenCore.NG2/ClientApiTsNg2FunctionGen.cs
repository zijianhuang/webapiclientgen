using Fonlow.Reflection;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.Diagnostics;
using System.Linq;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate a client function upon ApiDescription for Angular
	/// </summary>
	public class ClientApiTsNG2FunctionGen : ClientApiTsFunctionGenBase
	{
		const string NG2HttpBlobResponse = "HttpResponse<Blob>";
		const string NG2HttpStringResponse = "HttpResponse<string>";

		readonly string OptionsForBlob;
		readonly string OptionsForResponse;

		readonly string Options;

		readonly string ContentOptionsForString;
		readonly string ContentOptionsForResponse;

		readonly string OptionsForString;
		//readonly string ContentOptionsForBlob;
		readonly string OptionsWithContent;

		string returnTypeText = null;
		//string contentType;
		readonly bool handleHttpRequestHeaders;

		readonly JSOutput jsOutput;

		public ClientApiTsNG2FunctionGen(JSOutput jsOutput, bool handleHttpRequestHeaders) : base()
		{
			this.jsOutput = jsOutput;
			string contentType = jsOutput.ContentType;
			this.handleHttpRequestHeaders = handleHttpRequestHeaders;
			if (String.IsNullOrEmpty(contentType))
			{
				contentType = "application/json;charset=UTF-8";
			}

			string contentOptionsWithHeadersHandlerForString = $"{{ headers: headersHandler ? headersHandler().append('Content-Type', '{contentType}') : new HttpHeaders({{ 'Content-Type': '{contentType}' }}),  responseType: 'text' }}";
			ContentOptionsForString = handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForString : $"{{ headers: {{ 'Content-Type': '{contentType}' }}, responseType: 'text' }}";

			string contentOptionsWithHeadersHandlerForResponse = $"{{ headers: headersHandler ? headersHandler().append('Content-Type', '{contentType}') : new HttpHeaders({{ 'Content-Type': '{contentType}' }}), observe: 'response', responseType: 'text' }}";
			ContentOptionsForResponse = handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForResponse : $"{{ headers: {{ 'Content-Type': '{contentType}' }}, observe: 'response', responseType: 'text' }}";

			string optionsWithHeadersHandlerAndContent = $"{{ headers: headersHandler ? headersHandler().append('Content-Type', '{contentType}') : new HttpHeaders({{ 'Content-Type': '{contentType}' }}) }}";
			OptionsWithContent = handleHttpRequestHeaders ? optionsWithHeadersHandlerAndContent : $"{{ headers: {{ 'Content-Type': '{contentType}' }} }}";

			const string optionsWithHeadersHandlerForString = "{ headers: headersHandler ? headersHandler() : undefined, responseType: 'text' }";
			OptionsForString = handleHttpRequestHeaders ? optionsWithHeadersHandlerForString : "{ responseType: 'text' }";

			const string optionsWithHeadersHandlerForResponse = "{ headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' }";
			OptionsForResponse = handleHttpRequestHeaders ? optionsWithHeadersHandlerForResponse : "{ observe: 'response', responseType: 'text' }";

			const string optionsWithHeadersHandlerForBlob = "{ headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'blob' }";
			OptionsForBlob = handleHttpRequestHeaders ? optionsWithHeadersHandlerForBlob : "{ observe: 'response', responseType: 'blob' }";

			string optionsWithHeadersHandler = ", { headers: headersHandler ? headersHandler() : undefined }";
			Options = handleHttpRequestHeaders ? optionsWithHeadersHandler : "";
		}

		protected override CodeMemberMethod CreateMethodName()
		{
			//Debug.Assert(ReturnType==null || ReturnType.Name != "DayOfWeek[]");
			var returnTypeReference = Poco2TsGen.TranslateToClientTypeReference(ReturnType);
			returnTypeText = TypeMapper.MapCodeTypeReferenceToTsText(returnTypeReference);
			if (returnTypeText == "any" || returnTypeText == "void")
			{
				returnTypeText = NG2HttpStringResponse;
			}
			else if (returnTypeText == "response")
			{
				returnTypeText = NG2HttpStringResponse;
			}
			else if (returnTypeText == "blobresponse")
			{
				returnTypeText = NG2HttpBlobResponse;
			}
			else
			{
				if (jsOutput.HelpStrictMode && !returnTypeText.EndsWith(" | null"))
				{
					returnTypeText += " | null";
				}
			}

			var callbackTypeText = $"Observable<{returnTypeText}>";
			Debug.WriteLine("callback: " + callbackTypeText);
			var returnTypeReferenceWithObservable = new CodeSnipetTypeReference(callbackTypeText);

			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = MethodName,
				ReturnType = returnTypeReferenceWithObservable,
			};
		}


		protected override void RenderImplementation()
		{
			RenderMethodPrototype();
			if (handleHttpRequestHeaders)
			{
				Method.Parameters.Add(new CodeParameterDeclarationExpression(
					"() => HttpHeaders", "headersHandler?"));
			}

			var uriText = GetFullUriText();

			if (ReturnType!=null && TypeHelper.IsStringType(ReturnType) && this.StringAsString)//stringAsString is for .NET Core Web API
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, {OptionsForString});"));
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null, {OptionsForString});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForString});"));
					}

					return;
				}

			}
			else if (returnTypeText == NG2HttpBlobResponse)//translated from blobresponse to this
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, {OptionsForBlob});"));
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null, {OptionsForBlob});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {OptionsForBlob});"));
					}

					return;
				}

			}
			else if (returnTypeText == NG2HttpStringResponse)//translated from response to this
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, {OptionsForResponse});"));
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null, {OptionsForResponse});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse});"));
					}

					return;
				}

			}
			else
			{
				string returnTypeCast = returnTypeText == null ? String.Empty : $"<{returnTypeText}>";

				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					if (returnTypeText == null)
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, {OptionsForResponse});")); //only http response needed
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}{returnTypeCast}({uriText}{Options});"));
					}

					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (returnTypeText == null)//http response
					{
						if (dataToPost == "null")//no content body
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null, {OptionsForResponse});"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse});"));
						}
					}
					else // type is returned
					{
						if (dataToPost == "null") // no body
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}{returnTypeCast}({uriText}, null{Options});"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}{returnTypeCast}({uriText}, JSON.stringify({dataToPost}), {OptionsWithContent});"));
						}
					}

					return;
				}
			}

			Debug.Assert(false, "How come?");
		}

	}

}
