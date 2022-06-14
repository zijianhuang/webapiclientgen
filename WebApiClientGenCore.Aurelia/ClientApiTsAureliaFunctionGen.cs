using Fonlow.Reflection;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.Diagnostics;
using System.Linq;
using Fonlow.Web.Meta;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate a client function upon ApiDescription for Aurelia
	/// </summary>
	public class ClientApiTsAureliaFunctionGen : ClientApiTsFunctionGenBase
	{
		const string AureliaHttpResponse = "Response";
		const string AureliatHttpBlobResponse = "Blob";
		const string AureliaHttpStringResponse = "string";

		readonly string OptionsForString;
		readonly string OptionsForResponse;

		readonly string Options;

		readonly string ContentOptionsForString;
		readonly string ContentOptionsForResponse;

		readonly string OptionsWithContent;

		string returnTypeText = null;
		readonly bool handleHttpRequestHeaders;

		readonly JSOutput jsOutput;

		public ClientApiTsAureliaFunctionGen(JSOutput jsOutput, bool handleHttpRequestHeaders) : base()
		{
			this.jsOutput = jsOutput;
			string contentType = jsOutput.ContentType;
			this.handleHttpRequestHeaders = handleHttpRequestHeaders;
			if (String.IsNullOrEmpty(contentType))
			{
				contentType = "application/json;charset=UTF-8";
			}

			string contentOptionsWithHeadersHandlerForString = $"{{ headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }} }}";
			ContentOptionsForString = handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForString : $"{{ headers: {{ 'Content-Type': '{contentType}' }} }}";

			string contentOptionsWithHeadersHandlerForResponse = $"{{ headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }} }}";
			ContentOptionsForResponse = handleHttpRequestHeaders ? contentOptionsWithHeadersHandlerForResponse : $"{{ headers: {{ 'Content-Type': '{contentType}' }} }}";

			string optionsWithHeadersHandlerAndContent = $"{{ headers: headersHandler ? Object.assign(headersHandler(), {{ 'Content-Type': '{contentType}' }}): {{ 'Content-Type': '{contentType}' }} }}";
			OptionsWithContent = handleHttpRequestHeaders ? optionsWithHeadersHandlerAndContent : $"{{ headers: {{ 'Content-Type': '{contentType}' }} }}";

			const string optionsWithHeadersHandlerForString = ", { headers: headersHandler ? headersHandler() : undefined }";
			OptionsForString = handleHttpRequestHeaders ? optionsWithHeadersHandlerForString : "";

			const string optionsWithHeadersHandlerForResponse = ", { headers: headersHandler ? headersHandler() : undefined }";
			OptionsForResponse = handleHttpRequestHeaders ? optionsWithHeadersHandlerForResponse : "";

			string optionsWithHeadersHandler = ", { headers: headersHandler ? headersHandler() : undefined }";
			Options = handleHttpRequestHeaders ? optionsWithHeadersHandler : "";
		}

		protected override CodeMemberMethod CreateMethodName()
		{
			var returnTypeReference = Poco2TsGen.TranslateToClientTypeReference(ReturnType);
			returnTypeText = TypeMapper.MapCodeTypeReferenceToTsText(returnTypeReference);
			if (returnTypeText == "any" || returnTypeText == "void")
			{
				returnTypeText = AureliaHttpResponse;
			}
			else if (returnTypeText == "response")
			{
				returnTypeText = AureliaHttpStringResponse;
			}
			else if (returnTypeText == "blobresponse")
			{
				returnTypeText = AureliatHttpBlobResponse;
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

			var jsUriQuery = UriQueryHelper.CreateUriQueryForTs(Description.RelativePath, Description.ParameterDescriptions);
			var hasArrayJoin = jsUriQuery != null && jsUriQuery.Contains(".join(");
			var uriText = jsUriQuery == null ? $"'{Description.RelativePath}'" :
				RemoveTrialEmptyString(hasArrayJoin ? $"'{jsUriQuery}" : $"'{jsUriQuery}'"); //Aurelia expect relative path.

			if (ReturnType != null && TypeHelper.IsStringType(ReturnType) && this.StringAsString)//stringAsString is for .NET Core Web API
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}{OptionsForString}).then(d => d.status == 204 ? null : d.text());")); //todo: type cast is not really needed.
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null{OptionsForString}).then(d => d.status == 204 ? null : d.text());"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForString}).then(d => d.status == 204 ? null : d.text());"));
					}

					return;
				}
			}
			else if (returnTypeText == AureliatHttpBlobResponse)//translated from blobresponse to this
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}{OptionsForString}).then(d => d.blob());")); //todo: type cast is not really needed.
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null{OptionsForString}).then(d => d.blob());"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForString}).then(d => d.blob());"));
					}

					return;
				}
			}
			else if (returnTypeText == AureliaHttpStringResponse)//translated from response to this
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}{OptionsForResponse}).then(d => d.json());"));
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null{OptionsForResponse}).then(d => d.json());"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse}).then(d => d.json());"));
					}

					return;
				}

			}
			else if (returnTypeText == AureliaHttpResponse) // client should care about only status
			{
				if (HttpMethodName == "get" || HttpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}{Options});"));
					return;
				}

				if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null{Options});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {OptionsWithContent});"));
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
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}{OptionsForResponse});")); //only http response needed
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}{Options}).then(d => d.json());"));
					}
				}
				else if (HttpMethodName == "post" || HttpMethodName == "put" || HttpMethodName == "patch")
				{
					var dataToPost = GetDataToPost();
					if (returnTypeText == null)//http response
					{
						if (dataToPost == "null")//no content body
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null{OptionsForResponse});"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse}).then(d => d.json());"));
						}
					}
					else // type is returned
					{
						if (dataToPost == "null") // no body
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, null{Options}).then(d => d.json());"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{HttpMethodName}({uriText}, JSON.stringify({dataToPost}), {OptionsWithContent}).then(d => d.json());"));
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
