using Fonlow.Reflection;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.Diagnostics;
using System.Linq;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate a client function upon ApiDescription for Aurelia
	/// </summary>
	public class ClientApiTsFetchFunctionGen : ClientApiTsFunctionGenBase
	{
		const string FetchHttpResponse = "Response";
		const string FetchtHttpBlobResponse = "Blob";
		const string FetchHttpStringResponse = "string";

		string returnTypeText = null;
		readonly string contentType;
		readonly bool handleHttpRequestHeaders;

		public ClientApiTsFetchFunctionGen(string contentType, bool handleHttpRequestHeaders) : base()
		{
			this.contentType = String.IsNullOrEmpty(contentType) ? "application/json;charset=UTF-8" : contentType;
			this.handleHttpRequestHeaders = handleHttpRequestHeaders;
		}

		protected override CodeMemberMethod CreateMethodName()
		{
			var returnTypeReference = Poco2TsGen.TranslateToClientTypeReference(ReturnType);
			returnTypeText = TypeMapper.MapCodeTypeReferenceToTsText(returnTypeReference);
			if (returnTypeText == "any" || returnTypeText == "void")
			{
				returnTypeText = FetchHttpResponse;
			}
			else if (returnTypeText == "response")
			{
				returnTypeText = FetchHttpStringResponse;
			}
			else if (returnTypeText == "blobresponse")
			{
				returnTypeText = FetchtHttpBlobResponse;
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

			string GetContentOptionsForString(string dataToPost)
			{
				string contentOptionsWithHeadersHandlerForString = $"{{ method: '{httpMethodName}', headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
				return handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForString : $"{{ method: '{httpMethodName}', headers: {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
			}

			string GetContentOptionsForResponse(string dataToPost)
			{
				string contentOptionsWithHeadersHandlerForResponse = $"{{ method: '{httpMethodName}', headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
				return handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForResponse : $"{{ method: '{httpMethodName}', headers: {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
			}

			string GetOptionsWithContent(string dataToPost)
			{
				string optionsWithHeadersHandlerAndContent = $"{{ method: '{httpMethodName}', headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
				return handleHttpRequestHeaders ? optionsWithHeadersHandlerAndContent : $"{{ method: '{httpMethodName}', headers: {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
			}

			string optionsWithHeadersHandlerForString = $"{{ method: '{httpMethodName}', headers: headersHandler ? headersHandler() : undefined }}";
			var OptionsForString = handleHttpRequestHeaders ? optionsWithHeadersHandlerForString : $"{{ method: '{httpMethodName}' }}";

			string optionsWithHeadersHandlerForResponse = $"{{ method: '{httpMethodName}', headers: headersHandler ? headersHandler() : undefined }}";
			var OptionsForResponse = handleHttpRequestHeaders ? optionsWithHeadersHandlerForResponse : $"{{ method: '{httpMethodName}' }}";

			string optionsWithHeadersHandler = $"{{ method: '{httpMethodName}', headers: headersHandler ? headersHandler() : undefined }}";
			var Options = handleHttpRequestHeaders ? optionsWithHeadersHandler : $"{{ method: '{httpMethodName}' }}";
			//deal with parameters
			var parameters = Description.ParameterDescriptions.Select(d =>
				 new CodeParameterDeclarationExpression(Poco2TsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType), d.Name)
			).ToList();

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

			if (ReturnType != null && TypeHelper.IsStringType(ReturnType) && this.StringAsString)//stringAsString is for .NET Core Web API
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => d.text());")); //todo: type cast is not really needed.
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => d.text());"));
					}
					else
					{
						var contentOptions = GetContentOptionsForString(dataToPost);
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions}).then(d => d.text());"));
					}

					return;
				}
			}
			else if (returnTypeText == FetchtHttpBlobResponse)//translated from blobresponse to this
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => d.blob());")); //todo: type cast is not really needed.
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => d.blob());"));
					}
					else
					{
						var contentOptions = GetContentOptionsForString(dataToPost);
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions}).then(d => d.blob());"));
					}

					return;
				}

			}
			else if (returnTypeText == FetchHttpResponse) // client should care about only status
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {Options});"));
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {Options});"));
					}
					else
					{
						var contentOptions = GetOptionsWithContent(dataToPost);
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions});"));
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
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForResponse});")); //only http response needed
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {Options}).then(d => d.json());"));
					}
				}
				else if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (returnTypeText == null)//http response
					{
						if (dataToPost == "null")
						{
							Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForResponse});"));
						}
						else
						{
							var contentOptions = GetContentOptionsForResponse(dataToPost);
							Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions});"));
						}
					}
					else // type is returned
					{
						if (dataToPost == "null")
						{
							Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {Options}).then(d => d.json());"));
						}
						else
						{
							var contentOptions = GetOptionsWithContent(dataToPost);
							Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions}).then(d => d.json());"));
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
