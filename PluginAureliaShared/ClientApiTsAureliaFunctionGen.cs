using Fonlow.Reflection;
using Fonlow.TypeScriptCodeDom;
using Fonlow.Web.Meta;
using System;
using System.CodeDom;
using System.Diagnostics;
using System.Linq;

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

		public ClientApiTsAureliaFunctionGen(string contentType, bool handleHttpRequestHeaders) : base()
		{
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

			Method.Parameters.AddRange(parameters.ToArray());

			if (handleHttpRequestHeaders)
			{
				Method.Parameters.Add(new CodeParameterDeclarationExpression(
					"() => {[header: string]: string}", "headersHandler?"));
			}

			var jsUriQuery = UriQueryHelper.CreateUriQueryForTs(Description.RelativePath, Description.ParameterDescriptions);
			var hasArrayJoin = jsUriQuery != null && jsUriQuery.Contains(".join(");
			var uriText = jsUriQuery == null ? $"'{Description.RelativePath}'" :
				RemoveTrialEmptyString(hasArrayJoin?$"'{jsUriQuery}": $"'{jsUriQuery}'");

			if (ReturnType != null && TypeHelper.IsStringType(ReturnType) && this.StringAsString)//stringAsString is for .NET Core Web API
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}{OptionsForString}).then(d => d.text());")); //todo: type cast is not really needed.
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put")
				{
					var fromBodyParameterDescriptions = Description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
						|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
						|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
					if (fromBodyParameterDescriptions.Length > 1)
					{
						throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", Description.ActionDescriptor.ActionName));
					}
					var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

					var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, null{OptionsForString}).then(d => d.text());"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForString}).then(d => d.text());"));
					}

					return;
				}
			}
			else if (returnTypeText == AureliatHttpBlobResponse)//translated from blobresponse to this
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}{OptionsForString}).then(d => d.blob());")); //todo: type cast is not really needed.
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put")
				{
					var fromBodyParameterDescriptions = Description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
						|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
						|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
					if (fromBodyParameterDescriptions.Length > 1)
					{
						throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", Description.ActionDescriptor.ActionName));
					}
					var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

					var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, null{OptionsForString}).then(d => d.blob());"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForString}).then(d => d.blob());"));
					}

					return;
				}
			}
			else if (returnTypeText == AureliaHttpStringResponse)//translated from response to this
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}{OptionsForResponse}).then(d => d.json());"));
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put")
				{
					var fromBodyParameterDescriptions = Description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
						|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
						|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
					if (fromBodyParameterDescriptions.Length > 1)
					{
						throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", Description.ActionDescriptor.ActionName));
					}
					var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

					var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, null{OptionsForResponse}).then(d => d.json());"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse}).then(d => d.json());"));
					}

					return;
				}

			}
			else if (returnTypeText == AureliaHttpResponse) // client should care about only status
			{
				if (httpMethodName == "get" || httpMethodName == "delete")
				{
					Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}{Options});"));
					return;
				}

				if (httpMethodName == "post" || httpMethodName == "put")
				{
					var fromBodyParameterDescriptions = Description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
						|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
						|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
					if (fromBodyParameterDescriptions.Length > 1)
					{
						throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", Description.ActionDescriptor.ActionName));
					}
					var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

					var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

					if (dataToPost == "null")
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, null{Options});"));
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {OptionsWithContent});"));
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
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}{OptionsForResponse});")); //only http response needed
					}
					else
					{
						Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}{Options}).then(d => d.json());"));
					}
				}
				else if (httpMethodName == "post" || httpMethodName == "put" || httpMethodName == "patch")
				{
					var fromBodyParameterDescriptions = Description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
						|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
						|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
					if (fromBodyParameterDescriptions.Length > 1)
					{
						throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", Description.ActionDescriptor.ActionName));
					}
					var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

					var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

					if (returnTypeText == null)//http response
					{
						if (dataToPost == "null")//no content body
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, null{OptionsForResponse});"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {ContentOptionsForResponse}).then(d => d.json());"));
						}
					}
					else // type is returned
					{
						if (dataToPost == "null") // no body
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, null{Options}).then(d => d.json());"));
						}
						else
						{
							Method.Statements.Add(new CodeSnippetStatement($"return this.http.{httpMethodName}({uriText}, JSON.stringify({dataToPost}), {OptionsWithContent}).then(d => d.json());"));
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
