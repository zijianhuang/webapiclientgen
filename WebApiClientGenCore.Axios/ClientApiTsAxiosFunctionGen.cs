using Fonlow.Reflection;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.Diagnostics;
using System.Linq;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate a client function upon ApiDescription for AXIOS
	/// </summary>
	public class ClientApiTsAxiosFunctionGen : ClientApiTsFunctionGenBase
	{
		const string AxiosHttpResponse = "AxiosResponse";
		const string AxiostHttpBlobResponse = "AxiosResponse<Blob>";
		const string AxiosHttpStringResponse = "AxiosResponse<string>";

		readonly string OptionsForString;
		readonly string OptionsForResponse;

		readonly string Options;
		readonly string OptionsForBlob;

		readonly string ContentOptionsForString;
		readonly string ContentOptionsForBlob;
		readonly string ContentOptionsForResponse;

		readonly string OptionsWithContent;

		string returnTypeText = null;
		readonly bool handleHttpRequestHeaders;

		readonly JSOutput jsOutput;

		public ClientApiTsAxiosFunctionGen(JSOutput jsOutput, bool handleHttpRequestHeaders) : base()
		{
			this.jsOutput = jsOutput;
			string contentType = jsOutput.ContentType;
			this.handleHttpRequestHeaders = handleHttpRequestHeaders;
			if (String.IsNullOrEmpty(contentType))
			{
				contentType = "application/json;charset=UTF-8";
			}

			string contentOptionsWithHeadersHandlerForString = $"{{ headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }},  responseType: 'text' }}";
			ContentOptionsForString = handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForString : $"{{ headers: {{ 'Content-Type': '{contentType}' }}, responseType: 'text' }}";

			string contentOptionsWithHeadersHandlerForBlob = $"{{ headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }},  responseType: 'blob' }}";
			ContentOptionsForBlob = handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForBlob : $"{{ headers: {{ 'Content-Type': '{contentType}' }}, responseType: 'blob' }}";

			string contentOptionsWithHeadersHandlerForResponse = $"{{ headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }}, responseType: 'text' }}";
			ContentOptionsForResponse = handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForResponse : $"{{ headers: {{ 'Content-Type': '{contentType}' }}, responseType: 'text' }}";

			string optionsWithHeadersHandlerAndContent = $"{{ headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }} }}";
			OptionsWithContent = handleHttpRequestHeaders ? optionsWithHeadersHandlerAndContent : $"{{ headers: {{ 'Content-Type': '{contentType}' }} }}";

			const string optionsWithHeadersHandlerForString = "{ headers: headersHandler ? headersHandler() : undefined, responseType: 'text' }";
			OptionsForString = handleHttpRequestHeaders ? optionsWithHeadersHandlerForString : "{ responseType: 'text' }";

			const string optionsWithHeadersHandlerForBlob = "{ headers: headersHandler ? headersHandler() : undefined, responseType: 'blob' }";
			OptionsForBlob = handleHttpRequestHeaders ? optionsWithHeadersHandlerForBlob : "{ responseType: 'blob' }";

			const string optionsWithHeadersHandlerForResponse = "{ headers: headersHandler ? headersHandler() : undefined, responseType: 'text' }";
			OptionsForResponse = handleHttpRequestHeaders ? optionsWithHeadersHandlerForResponse : "{ responseType: 'text' }";

			string optionsWithHeadersHandler = ", { headers: headersHandler ? headersHandler() : undefined }";
			Options = handleHttpRequestHeaders ? optionsWithHeadersHandler : "";
		}

		protected override CodeMemberMethod CreateMethodName()
		{
			var returnTypeReference = Poco2TsGen.TranslateToClientTypeReference(ReturnType);
			returnTypeText = TypeMapper.MapCodeTypeReferenceToTsText(returnTypeReference);
			if (returnTypeText == "any" || returnTypeText == "void")
			{
				returnTypeText = AxiosHttpResponse;
			}
			else if (returnTypeText == "response")
			{
				returnTypeText = AxiosHttpStringResponse;
			}
			else if (returnTypeText == "blobresponse")
			{
				returnTypeText = AxiostHttpBlobResponse;
			}
			else
			{
				if (jsOutput.HelpStrictMode && !returnTypeText.EndsWith(" | null"))
				{
					returnTypeText += " | null";
				}
			}

			var callbackTypeText = $"Promise<{returnTypeText}>";
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
					"() => {[header: string]: string}", "headersHandler?"));
			}

			var uriText = GetFullUriText();

			if (ReturnType!=null && TypeHelper.IsStringType(ReturnType) && this.StringAsString)//stringAsString is for .NET Core Web API
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, {OptionsForString}).then(d => d.status == 204 ? null : d.data);")); //todo: type cast is not really needed.
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, null, {OptionsForString}).then(d => d.status == 204 ? null : d.data);"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForString}).then(d => d.status == 204 ? null : d.data);"));
					}

					return;
				}
			}
			else if (returnTypeText == AxiostHttpBlobResponse)//translated from blobresponse to this
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, {OptionsForBlob}).then(d => d.data);")); //todo: type cast is not really needed.
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, null, {OptionsForBlob}).then(d => d.data);"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForBlob}).then(d => d.data);"));
					}

					return;
				}
			}
			else if (returnTypeText == AxiosHttpStringResponse)//translated from response to this
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, {OptionsForResponse});"));
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, null, {OptionsForResponse});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse});"));
					}

					return;
				}
			}
			else if (returnTypeText == AxiosHttpResponse) // client should care about only status
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}{Options});"));
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, null{Options});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForString});"));
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
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, {OptionsForResponse});")); //only http response needed
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}{returnTypeCast}({uriText}{Options}).then(d => d.data);"));
					}
				}
				else if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (returnTypeText == null)//http response
					{
						if (dataToPost == "null")
						{
							Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, null, {OptionsForResponse});"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse});"));
						}
					}
					else // type is returned
					{
						if (dataToPost == "null")
						{
							Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}{returnTypeCast}({uriText}, null{Options}).then(d => d.data);"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return Axios.{HttpMethodName}{returnTypeCast}({uriText}, JSON.stringify({dataToPost}), {OptionsWithContent}).then(d => d.data);"));
						}
					}
				}
				else
				{
					Debug.Assert(false, $"How come with {HttpMethodName}?");
				}
			}
		}

	}

}
