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

		public ClientApiTsAxiosFunctionGen(string contentType, bool handleHttpRequestHeaders) : base()
		{
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
			var httpMethodName = Description.HttpMethod.ToLower(); //Method is always uppercase.
															   //deal with parameters
			var parameters = Description.ParameterDescriptions.Select(d =>
				 new CodeParameterDeclarationExpression(Poco2TsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType), d.Name)
			).ToList();

			//parameters.Add(new CodeParameterDeclarationExpression(callbackTypeReference, "callback"));

			Method.Parameters.AddRange(parameters.ToArray());

			if (handleHttpRequestHeaders)
			{
				Method.Parameters.Add(new CodeParameterDeclarationExpression(
					"() => {[header: string]: string}", "headersHandler?"));
			}

			var jsUriQuery = UriQueryHelper.CreateUriQueryForTs(Description.RelativePath, Description.ParameterDescriptions);
			var hasArrayJoin = jsUriQuery != null && jsUriQuery.Contains(".join(");
			var uriText = jsUriQuery == null ? $"this.baseUri + '{Description.RelativePath}'" :
				RemoveTrialEmptyString(hasArrayJoin ? $"this.baseUri + '{jsUriQuery}" : $"this.baseUri + '{jsUriQuery}'");

			// var mapFunction = returnTypeText == ReactHttpResponse ? String.Empty : ".map(response=> response.json())";

			if (ReturnType!=null && TypeHelper.IsStringType(ReturnType) && this.StringAsString)//stringAsString is for .NET Core Web API
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, {OptionsForString}).then(d => d.data);")); //todo: type cast is not really needed.
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, null, {OptionsForString}).then(d => d.data);"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForString}).then(d => d.data);"));
					}

					return;
				}
			}
			else if (returnTypeText == AxiostHttpBlobResponse)//translated from blobresponse to this
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, {OptionsForBlob}).then(d => d.data);")); //todo: type cast is not really needed.
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, null, {OptionsForBlob}).then(d => d.data);"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForBlob}).then(d => d.data);"));
					}

					return;
				}
			}
			else if (returnTypeText == AxiosHttpStringResponse)//translated from response to this
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, {OptionsForResponse});"));
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, null, {OptionsForResponse});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse});"));
					}

					return;
				}
			}
			else if (returnTypeText == AxiosHttpResponse) // client should care about only status
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}{Options});"));
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, null{Options});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForString});"));
					}

					return;
				}
			}
			else
			{
				string returnTypeCast = returnTypeText == null ? String.Empty : $"<{returnTypeText}>";

				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					if (returnTypeText == null)
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, {OptionsForResponse});")); //only http response needed
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}{returnTypeCast}({uriText}{Options}).then(d => d.data);"));
					}
				}
				else if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (returnTypeText == null)//http response
					{
						if (dataToPost == "null")
						{
							Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, null, {OptionsForResponse});"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse});"));
						}
					}
					else // type is returned
					{
						if (dataToPost == "null")
						{
							Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}{returnTypeCast}({uriText}, null{Options}).then(d => d.data);"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return Axios.{httpMethodName}{returnTypeCast}({uriText}, JSON.stringify({dataToPost}), {OptionsWithContent}).then(d => d.data);"));
						}
					}
				}
				else
				{
					Debug.Assert(false, $"How come with {httpMethodName}?");
				}
			}
		}

	}

}
