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
			string GetContentOptionsForString(string dataToPost)
			{
				string contentOptionsWithHeadersHandlerForString = $"{{ method: '{HttpMethodName}', headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
				return handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForString : $"{{ method: '{HttpMethodName}', headers: {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
			}

			string GetContentOptionsForResponse(string dataToPost)
			{
				string contentOptionsWithHeadersHandlerForResponse = $"{{ method: '{HttpMethodName}', headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
				return handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForResponse : $"{{ method: '{HttpMethodName}', headers: {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
			}

			string GetOptionsWithContent(string dataToPost)
			{
				string optionsWithHeadersHandlerAndContent = $"{{ method: '{HttpMethodName}', headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
				return handleHttpRequestHeaders ? optionsWithHeadersHandlerAndContent : $"{{ method: '{HttpMethodName}', headers: {{ 'Content-Type': '{contentType}' }}, body: JSON.stringify({dataToPost}) }}";
			}

			string optionsWithHeadersHandlerForString = $"{{ method: '{HttpMethodName}', headers: headersHandler ? headersHandler() : undefined }}";
			var OptionsForString = handleHttpRequestHeaders ? optionsWithHeadersHandlerForString : $"{{ method: '{HttpMethodName}' }}";

			string optionsWithHeadersHandlerForResponse = $"{{ method: '{HttpMethodName}', headers: headersHandler ? headersHandler() : undefined }}";
			var OptionsForResponse = handleHttpRequestHeaders ? optionsWithHeadersHandlerForResponse : $"{{ method: '{HttpMethodName}' }}";

			string optionsWithHeadersHandler = $"{{ method: '{HttpMethodName}', headers: headersHandler ? headersHandler() : undefined }}";
			var Options = handleHttpRequestHeaders ? optionsWithHeadersHandler : $"{{ method: '{HttpMethodName}' }}";

			RenderMethodPrototype();
			if (handleHttpRequestHeaders)
			{
				Method.Parameters.Add(new CodeParameterDeclarationExpression(
					"() => {[header: string]: string}", "headersHandler?"));
			}

			var uriText = GetFullUriText();

			if (ReturnType != null && TypeHelper.IsStringType(ReturnType) && this.StringAsString)//stringAsString is for .NET Core Web API
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => d.status == 204 ? null : d.text());")); //todo: type cast is not really needed.
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => d.status == 204 ? null : d.text());"));
					}
					else
					{
						var contentOptions = GetContentOptionsForString(dataToPost);
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions}).then(d => d.status == 204 ? null : d.text());"));
					}

					return;
				}
			}
			else if (returnTypeText == FetchtHttpBlobResponse)//translated from blobresponse to this
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => d.blob());")); //todo: type cast is not really needed.
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
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
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {Options});"));
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
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
				if (HttpMethodName == "get" || HttpMethodName == "delete")
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
				else if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
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
					Debug.Assert(false, $"How come with {HttpMethodName}?");
				}
			}
		}

	}

}
