﻿using Fonlow.Reflection;
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

		string returnTypeText;
		readonly string contentType;
		readonly bool handleHttpRequestHeaders;

		readonly JSOutput jsOutput;

		public ClientApiTsFetchFunctionGen(JSOutput jsOutput, bool handleHttpRequestHeaders) : base()
		{
			this.jsOutput = jsOutput;
			this.contentType = String.IsNullOrEmpty(contentType) ? "application/json;charset=UTF-8" : contentType;
			this.handleHttpRequestHeaders = handleHttpRequestHeaders;
		}

		protected override CodeMemberMethod CreateMethodName()
		{
			string contentType = jsOutput.ContentType;
			CodeTypeReference returnTypeReference = Poco2TsGen.TranslateToClientTypeReference(ReturnType);
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
			else
			{
				if (jsOutput.HelpStrictMode)
				{
					if (!returnTypeText.EndsWith(" | null", StringComparison.Ordinal) && ReturnTypeIsNullable)
					{
						returnTypeText += " | null"; // optional null
					}
				}
			}

			string callbackTypeText = $"Promise<{returnTypeText}>";
			Debug.WriteLine("callback: " + callbackTypeText);
			CodeSnipetTypeReference returnTypeReferenceWithObservable = new CodeSnipetTypeReference(callbackTypeText);

			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = MethodName,
				ReturnType = returnTypeReferenceWithObservable,
			};
		}


		protected override void RenderImplementation()
		{
			const string returnNullOrText = "{if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;}";
			const string returnBolb = "{if (d.status<=202) return d.blob(); else if (d.status==204) return null; throw d;}";
			const string returnJson = "{if (d.status<=202) return d.json(); else if (d.status==204) return null; throw d;}";

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
			string OptionsForString = handleHttpRequestHeaders ? optionsWithHeadersHandlerForString : $"{{ method: '{HttpMethodName}' }}";

			string optionsWithHeadersHandlerForResponse = $"{{ method: '{HttpMethodName}', headers: headersHandler ? headersHandler() : undefined }}";
			string OptionsForResponse = handleHttpRequestHeaders ? optionsWithHeadersHandlerForResponse : $"{{ method: '{HttpMethodName}' }}";

			string optionsWithHeadersHandler = $"{{ method: '{HttpMethodName}', headers: headersHandler ? headersHandler() : undefined }}";
			string Options = handleHttpRequestHeaders ? optionsWithHeadersHandler : $"{{ method: '{HttpMethodName}' }}";

			RenderMethodPrototype();
			if (handleHttpRequestHeaders)
			{
				Method.Parameters.Add(new CodeParameterDeclarationExpression(
					"() => {[header: string]: string}", "headersHandler?"));
			}

			string uriText = GetFullUriText();

			if (ReturnType != null && TypeHelper.IsStringType(ReturnType) && this.StringAsString)//stringAsString is for .NET Core Web API
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => {returnNullOrText});"));
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					string dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => {returnNullOrText});"));
					}
					else
					{
						string contentOptions = GetContentOptionsForString(dataToPost);
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions}).then(d => {returnNullOrText});"));
					}

					return;
				}
			}
			else if (returnTypeText == FetchtHttpBlobResponse)//translated from blobresponse to this
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => {returnBolb});")); //todo: type cast is not really needed.
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					string dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForString}).then(d => {returnBolb});"));
					}
					else
					{
						string contentOptions = GetContentOptionsForString(dataToPost);
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions}).then(d => {returnBolb});"));
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
					string dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {Options});"));
					}
					else
					{
						string contentOptions = GetOptionsWithContent(dataToPost);
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
						Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {Options}).then(d => {returnJson});"));
					}
				}
				else if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					string dataToPost = GetDataToPost();
					if (returnTypeText == null)//http response
					{
						if (dataToPost == "null")
						{
							Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {OptionsForResponse});"));
						}
						else
						{
							string contentOptions = GetContentOptionsForResponse(dataToPost);
							Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions});"));
						}
					}
					else // type is returned
					{
						if (dataToPost == "null")
						{
							Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {Options}).then(d => {returnJson});"));
						}
						else
						{
							string contentOptions = GetOptionsWithContent(dataToPost);
							Method.Statements.Add(new CodeSnippetStatement($"return fetch({uriText}, {contentOptions}).then(d => {returnJson});"));
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
