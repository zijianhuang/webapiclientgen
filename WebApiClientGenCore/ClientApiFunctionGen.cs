using Fonlow.Poco2Client;
using Fonlow.Reflection;
using Fonlow.Web.Meta;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Reflection;

namespace Fonlow.CodeDom.Web.Cs
{
	/// <summary>
	/// Generate a client function upon ApiDescription for C#
	/// </summary>
	internal sealed class ClientApiFunctionGen
	{
		readonly WebApiDescription description;
		readonly string methodName;
		Type returnType;
		readonly bool returnTypeIsStream;
		readonly bool returnTypeIsDynamicObject;

		/// <summary>
		/// Decorated by NotNullAttribute
		/// </summary>
		readonly bool returnTypeDecoratedWithNotNullable;
		readonly bool returnTypeDecoratedWithMaybeNullable;
		CodeMemberMethod clientMethod;
		readonly Poco2Client.Poco2CsGen poco2CsGen;
		readonly bool forAsync;
		readonly bool stringAsString;
		readonly string statementOfEnsureSuccessStatusCode;
		readonly CodeGenSettings codeGenSettings;
		readonly CodeGenOutputs codeGenOutputsSettings;
		readonly System.Reflection.ParameterInfo[] parameterInfoArray;
		readonly IDictionary<Type, Func<object, string>> attribueCommentDic;

		ClientApiFunctionGen(WebApiDescription webApiDescription, Poco2Client.Poco2CsGen poco2CsGen, CodeGenSettings codeGenSettings, bool forAsync)
		{
			this.description = webApiDescription;
			this.poco2CsGen = poco2CsGen;
			this.codeGenSettings = codeGenSettings;
			this.codeGenOutputsSettings = codeGenSettings.ClientApiOutputs;
			this.forAsync = forAsync;
			this.stringAsString = codeGenOutputsSettings.StringAsString;
			statementOfEnsureSuccessStatusCode = codeGenOutputsSettings.UseEnsureSuccessStatusCodeEx ? "EnsureSuccessStatusCodeEx" : "EnsureSuccessStatusCode";
			methodName = webApiDescription.ActionDescriptor.ActionName;
			if (methodName.EndsWith("Async", StringComparison.Ordinal))
			{
				methodName = methodName.Substring(0, methodName.Length - 5);
			}

			Type returnTypeOfProducesResponseType = GetTypeTextOfResponse2xx(description.ActionDescriptor.CustomAttributes);
			returnType = returnTypeOfProducesResponseType ?? (webApiDescription.ResponseDescription?.ResponseType ?? webApiDescription.ActionDescriptor.ReturnType);

			returnTypeIsStream = returnType != null && ((returnType.FullName == typeNameOfHttpResponseMessage)
				|| (returnType.FullName == typeOfIHttpActionResult)
				|| (returnType.FullName == typeOfIActionResult)
				|| (returnType.FullName == typeOfActionResult)
				|| (returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[Microsoft.AspNetCore.Mvc.IActionResult", StringComparison.Ordinal)) // .net core is not translating Task<IActionResult> properly.
				|| (returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[Microsoft.AspNetCore.Mvc.IHttpActionResult", StringComparison.Ordinal))
				|| (returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[Microsoft.AspNetCore.Mvc.ActionResult", StringComparison.Ordinal))
				);

			returnTypeIsDynamicObject = returnType != null && returnType.FullName != null && returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[System.Object", StringComparison.Ordinal);

			MethodInfo methodInfo = webApiDescription.ActionDescriptor.ControllerDescriptor.ControllerType.GetMethod(webApiDescription.ActionDescriptor.MethodName, webApiDescription.ActionDescriptor.MethodParameterTypes);
			if (methodInfo != null)
			{
				parameterInfoArray = methodInfo.GetParameters();
				if (codeGenOutputsSettings.MaybeNullAttributeOnMethod)
				{
					returnTypeDecoratedWithMaybeNullable = returnType != null && Attribute.IsDefined(methodInfo.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.MaybeNullAttribute));
				}
				else if (codeGenOutputsSettings.NotNullAttributeOnMethod)
				{
					returnTypeDecoratedWithNotNullable = returnType != null && Attribute.IsDefined(methodInfo.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute));
				}
			}

			AnnotationCommentGenerator annotationCommentGenerator = new AnnotationCommentGenerator();
			attribueCommentDic = annotationCommentGenerator.Get();
		}

		const string typeOfIHttpActionResult = "System.Web.Http.IHttpActionResult";
		const string typeOfIActionResult = "Microsoft.AspNetCore.Mvc.IActionResult"; //for .net core 2.1
		const string typeOfActionResult = "Microsoft.AspNetCore.Mvc.ActionResult"; //for .net core 2.1

		static readonly Type typeOfChar = typeof(char);

		public static CodeMemberMethod Create(WebApiDescription webApiDescription, Poco2Client.Poco2CsGen poco2CsGen, CodeGenSettings codeGenOutputsSettings, bool forAsync)
		{
			ClientApiFunctionGen gen = new ClientApiFunctionGen(webApiDescription, poco2CsGen, codeGenOutputsSettings, forAsync);
			return gen.CreateApiFunction();
		}

		/// <summary>
		/// Candidate could be custom POCO, or custom POCO wrapped in IActionResult, ActionResult etc.
		/// </summary>
		/// <param name="candidateType"></param>
		void AddCustomPocoTypeForCs(Type candidateType)
		{
			if (candidateType == null)
			{
				return;
			}

			var assemblyFilename = candidateType.Assembly.GetName().Name;
			string controllerAssemblyName = description.ActionDescriptor.ControllerDescriptor.ControllerType.Assembly.GetName().Name;
			poco2CsGen.CheckOrAdd(candidateType, controllerAssemblyName != assemblyFilename);
		}

		CodeMemberMethod CreateApiFunction()
		{
			AddCustomPocoTypeForCs(returnType);
			//create method
			clientMethod = forAsync ? CreateMethodBasicForAsync() : CreateMethodBasic();
#if DEBUG
			if (methodName == "GetByteWithRange")
			{
				Console.WriteLine("GetByteWithRange");
			}
#endif
			CreateDocComments();
			if (codeGenOutputsSettings.MaybeNullAttributeOnMethod && returnTypeDecoratedWithMaybeNullable)
			{
				clientMethod.ReturnTypeCustomAttributes.Add(new CodeAttributeDeclaration("System.Diagnostics.CodeAnalysis.MaybeNullAttribute"));
			}
			else if (codeGenOutputsSettings.NotNullAttributeOnMethod && returnTypeDecoratedWithNotNullable)
			{
				clientMethod.ReturnTypeCustomAttributes.Add(new CodeAttributeDeclaration("System.Diagnostics.CodeAnalysis.NotNullAttribute"));
			}

			System.Globalization.TextInfo textInfo = new System.Globalization.CultureInfo("en-US", false).TextInfo;
			switch (description.HttpMethod)
			{
				case "GET":
				case "DELETE":
					RenderGetOrDeleteImplementation(textInfo.ToTitleCase(description.HttpMethod.ToLower(CultureInfo.CurrentCulture)));
					break;
				case "POST":
				case "PUT":
				case "PATCH":
					RenderPostOrPutImplementation(textInfo.ToTitleCase(description.HttpMethod.ToLower(CultureInfo.CurrentCulture)));
					break;
				default:
					Trace.TraceWarning("This HTTP method {0} is not yet supported", description.HttpMethod);
					break;
			}

			return clientMethod;
		}

		CodeMemberMethod CreateMethodBasic()
		{
			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = methodName,
				ReturnType = poco2CsGen.TranslateToClientTypeReference(returnType),
			};
		}

		CodeMemberMethod CreateMethodBasicForAsync()
		{
			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = methodName + "Async",
				ReturnType = returnType == null ? new CodeTypeReference("async Task")
				: new CodeTypeReference("async Task", poco2CsGen.TranslateToClientTypeReference(returnType)),
			};
		}

		void CreateDocComments()
		{
			void CreateDocComment(string elementName, string doc)
			{
				if (string.IsNullOrWhiteSpace(doc))
					return;

				clientMethod.Comments.Add(new CodeCommentStatement("<" + elementName + ">" + doc + "</" + elementName + ">", true));
			}

			void CreateParamDocComment(string paramName, string doc)
			{
				List<string> ss = new();
				if (!String.IsNullOrWhiteSpace(doc))
				{
					ss.Add(doc);
				}

				if (codeGenOutputsSettings.DataAnnotationsToComments)
				{
					ParameterInfo parameterInfo = parameterInfoArray.SingleOrDefault(p => p?.Name == paramName);
					IEnumerable<Attribute> customAttributes = parameterInfo.GetCustomAttributes();
					foreach (Attribute a in customAttributes)
					{
						if (attribueCommentDic.TryGetValue(a.GetType(), out Func<object, string> textGenerator))
						{
							ss.Add(textGenerator(a));
						}
					}
				}

				if (ss.Count == 0)
				{
					return;
				}

				if (ss.Count == 1)
				{
					clientMethod.Comments.Add(new CodeCommentStatement("<param name=\"" + paramName + "\">" + ss[0] + "</param>", true));
				}
				else
				{
					clientMethod.Comments.Add(new CodeCommentStatement("<param name=\"" + paramName + "\">" + ss[0], true));
					for (int i = 1; i < ss.Count; i++)
					{
						clientMethod.Comments.Add(new CodeCommentStatement(ss[i], true));
					}

					clientMethod.Comments.Add(new CodeCommentStatement("</param>", true));
				}
			}

			clientMethod.Comments.Add(new CodeCommentStatement("<summary>", true));
			string methodFullName = description.ActionDescriptor.MethodFullName;
			if (description.ParameterDescriptions.Length > 0)
			{
				methodFullName += "(" + description.ParameterDescriptions.Select(d =>
				{
					string typeText;
					if (TypeHelper.IsDotNetSimpleType(d.ParameterDescriptor.ParameterType))
					{
						typeText = d.ParameterDescriptor.ParameterType.FullName;
					}
					else if (d.ParameterDescriptor.ParameterType.IsGenericType)
					{
						typeText = poco2CsGen.TranslateToClientTypeReferenceTextForDocComment(d.ParameterDescriptor.ParameterType);
					}
					else if (d.ParameterDescriptor.ParameterType.IsArray)
					{
						typeText = poco2CsGen.TranslateToClientTypeReferenceTextForDocComment(d.ParameterDescriptor.ParameterType);
					}
					else
					{
						typeText = d.ParameterDescriptor.ParameterType.FullName;
					};

					return typeText;
				}).Aggregate((c, n) => c + "," + n) + ")";

				Console.WriteLine("FullName: " + methodFullName);
			}

			Fonlow.DocComment.docMember methodComments = null;
			if (WebApiDocSingleton.Instance.Lookup != null)
			{
				methodComments = WebApiDocSingleton.Instance.Lookup.GetMember("M:" + methodFullName);
				string[] noIndent = Fonlow.DocComment.StringFunctions.TrimIndentedMultiLineTextToArray(Fonlow.DocComment.DocCommentHelper.GetSummary(methodComments));
				if (noIndent != null)
				{
					foreach (string item in noIndent)
					{
						clientMethod.Comments.Add(new CodeCommentStatement(item, true));
					}
				}
			}

			clientMethod.Comments.Add(new CodeCommentStatement(description.HttpMethod + " " + description.RelativePath, true));
			string[] methodAttributesAsComments = WebApiClientGenCore.Abstract.AspNetAttributesHelper.CreateDocCommentBasedOnAttributes(description.ActionDescriptor.CustomAttributes);
			if (methodAttributesAsComments.Length > 0)
			{
				foreach (string item in methodAttributesAsComments)
				{
					clientMethod.Comments.Add(new CodeCommentStatement(item, true));
				}
			}

			clientMethod.Comments.Add(new CodeCommentStatement("</summary>", true));
			foreach (ParameterDescription pd in description.ParameterDescriptions)
			{
				string parameterComment = Fonlow.DocComment.DocCommentHelper.GetParameterComment(methodComments, pd.Name);
				CreateParamDocComment(pd.Name, parameterComment);
			}

			string returnComment = Fonlow.DocComment.DocCommentHelper.GetReturnComment(methodComments);
			if (returnComment != null)
			{
				CreateDocComment("returns", returnComment);
			}
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="httpMethod">GET, DELETE, POST, PUT</param>
		void RenderGetOrDeleteImplementation(string httpMethod)
		{
			CodeParameterDeclarationExpression[] parameters = description.ParameterDescriptions.Where(p => p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri
			|| p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromQuery || p.ParameterDescriptor.ParameterBinder == ParameterBinder.None)
				.Select(d =>
				{
					AddCustomPocoTypeForCs(d.ParameterDescriptor.ParameterType);
					CodeParameterDeclarationExpression exp = new CodeParameterDeclarationExpression(poco2CsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType), d.Name);
					exp.UserData.Add(Fonlow.TypeScriptCodeDom.UserDataKeys.ParameterDescriptor, d.ParameterDescriptor);
					return exp;
				}).ToArray();

			clientMethod.Parameters.AddRange(parameters);

			if (codeGenOutputsSettings.CancellationTokenEnabled)
			{
				clientMethod.Parameters.Add(new CodeParameterDeclarationExpression("System.Threading.CancellationToken", "cancellationToken"));
			}

			if (codeGenOutputsSettings.HandleHttpRequestHeaders)
			{
				clientMethod.Parameters.Add(new CodeParameterDeclarationExpression("Action<System.Net.Http.Headers.HttpRequestHeaders>", "handleHeaders = null"));
			}

			string jsUriQuery = UriQueryHelper.CreateUriQuery(description.RelativePath, description.ParameterDescriptions);
			string uriText = string.IsNullOrWhiteSpace(jsUriQuery) ? $"\"{description.RelativePath}\"" : RemoveTrialEmptyString($"\"{jsUriQuery}\"");


			clientMethod.Statements.Add(new CodeVariableDeclarationStatement(
				new CodeTypeReference("var"), "requestUri",
				new CodeSnippetExpression(uriText)));

			clientMethod.Statements.Add(new CodeSnippetStatement(ThreeTabs + $"using var httpRequestMessage = new HttpRequestMessage(HttpMethod.{httpMethod}, requestUri);"));

			if (codeGenOutputsSettings.HandleHttpRequestHeaders)
			{
				clientMethod.Statements.Add(new CodeSnippetStatement("\t\t\thandleHeaders?.Invoke(httpRequestMessage.Headers);"));
			}

			AddResponseMessageSendAsync(clientMethod);

			CodeVariableReferenceExpression resultReference = new CodeVariableReferenceExpression("responseMessage");

			//Statement: result.EnsureSuccessStatusCode();
			if (returnTypeIsStream)
			{
				clientMethod.Statements.Add(new CodeMethodInvokeExpression(resultReference, statementOfEnsureSuccessStatusCode));

				if (returnType != null)
				{
					AddReturnStatement(clientMethod.Statements);
				}
			}
			else
			{
				CodeTryCatchFinallyStatement try1 = new CodeTryCatchFinallyStatement();
				try1.TryStatements.Add(new CodeMethodInvokeExpression(resultReference, statementOfEnsureSuccessStatusCode));
				clientMethod.Statements.Add(try1);

				//Statement: return something;
				if (returnType != null)
				{
					AddReturnStatement(try1.TryStatements);
				}

				try1.FinallyStatements.Add(new CodeMethodInvokeExpression(resultReference, "Dispose"));
			}
		}

		void RenderPostOrPutImplementation(string httpMethod)
		{
			//Create function parameters in prototype
			CodeParameterDeclarationExpression[] parameters = description.ParameterDescriptions.Where(p => p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri
			|| p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromQuery || p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
			|| p.ParameterDescriptor.ParameterBinder == ParameterBinder.None).Select(d =>
			{
				AddCustomPocoTypeForCs(d.ParameterDescriptor.ParameterType);
				CodeParameterDeclarationExpression exp = new CodeParameterDeclarationExpression(poco2CsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType), d.Name);
				exp.UserData.Add(Fonlow.TypeScriptCodeDom.UserDataKeys.ParameterDescriptor, d.ParameterDescriptor);
				return exp;
			}
			).ToArray();
			clientMethod.Parameters.AddRange(parameters);

			if (codeGenOutputsSettings.CancellationTokenEnabled)
			{
				clientMethod.Parameters.Add(new CodeParameterDeclarationExpression("System.Threading.CancellationToken", "cancellationToken"));
			}

			if (codeGenOutputsSettings.HandleHttpRequestHeaders)
			{
				clientMethod.Parameters.Add(new CodeParameterDeclarationExpression("Action<System.Net.Http.Headers.HttpRequestHeaders>", "handleHeaders = null"));
			}

			ParameterDescription[] fromBodyParameterDescriptions = description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
				|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri) || (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
			if (fromBodyParameterDescriptions.Length > 1)
			{
				throw new CodeGenException("Bad Api Definition")
				{
					Description = String.Format("This API function {0} has more than 1 FromBody bindings in parameters", description.ActionDescriptor.ActionName)
				};
			}

			ParameterDescription singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

			void AddRequestUriWithQueryAssignmentStatement()
			{

				string jsUriQuery = UriQueryHelper.CreateUriQuery(description.RelativePath, description.ParameterDescriptions);
				string uriText = jsUriQuery == null ? $"\"{description.RelativePath}\"" : RemoveTrialEmptyString($"\"{jsUriQuery}\"");

				clientMethod.Statements.Add(new CodeVariableDeclarationStatement(
					new CodeTypeReference("var"), "requestUri",
					new CodeSnippetExpression(uriText)));
			}

			AddRequestUriWithQueryAssignmentStatement();

			clientMethod.Statements.Add(new CodeSnippetStatement(
				ThreeTabs + $"using var httpRequestMessage = new HttpRequestMessage(HttpMethod.{httpMethod}, requestUri);"));

			if (singleFromBodyParameterDescription != null)
			{
				if (codeGenOutputsSettings.UseSystemTextJson)
				{
					clientMethod.Statements.Add(new CodeSnippetStatement(ThreeTabs + $"var contentJson = JsonSerializer.Serialize({singleFromBodyParameterDescription.ParameterDescriptor.ParameterName}, jsonSerializerSettings);"));
					clientMethod.Statements.Add(new CodeSnippetStatement(ThreeTabs + @"var content = new StringContent(contentJson, System.Text.Encoding.UTF8, ""application/json"");"));
				}
				else
				{
					clientMethod.Statements.Add(new CodeSnippetStatement(
	$"\t\t\tusing var requestWriter = new System.IO.StringWriter();{Environment.NewLine}\t\t\tvar requestSerializer = JsonSerializer.Create(jsonSerializerSettings);"
	));
					clientMethod.Statements.Add(new CodeMethodInvokeExpression(new CodeSnippetExpression("requestSerializer"), "Serialize",
						new CodeSnippetExpression("requestWriter"),
						new CodeSnippetExpression(singleFromBodyParameterDescription.ParameterDescriptor.ParameterName)));


					clientMethod.Statements.Add(new CodeSnippetStatement(
	@"			var content = new StringContent(requestWriter.ToString(), System.Text.Encoding.UTF8, ""application/json"");"
						));
				}

				clientMethod.Statements.Add(new CodeSnippetStatement("\t\t\thttpRequestMessage.Content = content;"));
				if (codeGenOutputsSettings.HandleHttpRequestHeaders)
				{
					clientMethod.Statements.Add(new CodeSnippetStatement("\t\t\thandleHeaders?.Invoke(httpRequestMessage.Headers);"));
				}
			}

			AddResponseMessageSendAsync(clientMethod);

			CodeVariableReferenceExpression resultReference = new CodeVariableReferenceExpression("responseMessage");

			if (returnTypeIsStream)
			{
				clientMethod.Statements.Add(new CodeMethodInvokeExpression(resultReference, statementOfEnsureSuccessStatusCode));

				//Statement: return something;
				if (returnType != null)
				{
					AddReturnStatement(clientMethod.Statements);
				}
			}
			else
			{
				CodeTryCatchFinallyStatement try1 = new CodeTryCatchFinallyStatement();
				clientMethod.Statements.Add(try1);
				try1.TryStatements.Add(new CodeMethodInvokeExpression(resultReference, statementOfEnsureSuccessStatusCode));

				//Statement: return something;
				if (returnType != null)
				{
					AddReturnStatement(try1.TryStatements);
				}

				try1.FinallyStatements.Add(new CodeMethodInvokeExpression(resultReference, "Dispose"));
			}

			if (singleFromBodyParameterDescription != null && !codeGenOutputsSettings.UseSystemTextJson)
			{
				//Add3TEndBacket(clientMethod);
			}

		}

		static string ThreeTabs => "\t\t\t";

		void AddResponseMessageSendAsync(CodeMemberMethod method)
		{
			string cancellationToken = codeGenOutputsSettings.CancellationTokenEnabled ? ", cancellationToken" : String.Empty;
			method.Statements.Add(new CodeVariableDeclarationStatement(
				new CodeTypeReference("var"), "responseMessage", forAsync ? new CodeSnippetExpression($"await client.SendAsync(httpRequestMessage{cancellationToken})") : new CodeSnippetExpression($"client.SendAsync(httpRequestMessage{cancellationToken}).Result")));
		}

		static void AddNewtonSoftJsonTextReader(CodeStatementCollection statementCollection)
		{
			statementCollection.Add(new CodeSnippetStatement("\t\t\t\tusing JsonReader jsonReader = new JsonTextReader(new System.IO.StreamReader(stream));"));
		}

		void AddNewtonSoftJsonSerializerDeserialize(CodeStatementCollection statementCollection)
		{
			statementCollection.Add(new CodeSnippetStatement($"\t\t\t\treturn serializer.Deserialize<{poco2CsGen.TranslateTypeToCSharp(returnType)}>(jsonReader);"));
		}

		static void AddNewtonSoftJsonSerializer(CodeStatementCollection statementCollection)
		{
			statementCollection.Add(new CodeVariableDeclarationStatement(
				new CodeTypeReference("var"), "serializer", new CodeSnippetExpression("JsonSerializer.Create(jsonSerializerSettings)")));
		}

		void DeserializeContentString(CodeStatementCollection statementCollection)
		{
			statementCollection.Add(new CodeMethodReturnStatement(new CodeMethodInvokeExpression(
				new CodeMethodReferenceExpression(
				new CodeVariableReferenceExpression("JsonSerializer"), "Deserialize", poco2CsGen.TranslateToClientTypeReference(returnType)),
				new CodeSnippetExpression("contentString"), new CodeSnippetExpression("jsonSerializerSettings"))));
		}

		void AddResponseMessageRead(CodeStatementCollection statementCollection)
		{
			if (TypeHelper.IsStringType(returnType) || returnType.IsClass || TypeHelper.IsNullablePrimitive(returnType)) //ASP.NET Core return null as empty body with status code 204, whether to produce JSON or plain text.
			{
				statementCollection.Add(new CodeSnippetStatement("\t\t\t\tif (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent) { return null; }"));
			}

			if (codeGenOutputsSettings.UseSystemTextJson)
			{
				if (returnType != null && TypeHelper.IsStringType(returnType) && this.stringAsString)
				{
					statementCollection.Add(new CodeSnippetStatement(forAsync
					? "\t\t\t\tvar stream = await responseMessage.Content.ReadAsStreamAsync();"
					: "\t\t\t\tvar stream = responseMessage.Content.ReadAsStreamAsync().Result;"));
				}
				else
				{
					statementCollection.Add(new CodeSnippetStatement(forAsync
					? "\t\t\t\tvar contentString = await responseMessage.Content.ReadAsStringAsync();"
					: "\t\t\t\tvar contentString = responseMessage.Content.ReadAsStringAsync().Result;"));
				}
			}
			else
			{
				statementCollection.Add(new CodeSnippetStatement(forAsync
					? "\t\t\t\tvar stream = await responseMessage.Content.ReadAsStreamAsync();"
					: "\t\t\t\tvar stream = responseMessage.Content.ReadAsStreamAsync().Result;"));
			}
		}

		const string typeNameOfHttpResponseMessage = "System.Net.Http.HttpResponseMessage";

		void AddReturnStatement(CodeStatementCollection statementCollection)
		{
			if (returnTypeIsStream)
			{
				statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("responseMessage")));
				return;
			}
			else if (returnTypeIsDynamicObject) // .NET Core ApiExplorer could get return type out of Task<> in most cases, however, not for dynamic and anynomous, while .NET Framework ApiExplorer is fine.
			{
				AddResponseMessageRead(statementCollection);
				if (codeGenOutputsSettings.UseSystemTextJson)
				{
					DeserializeContentString(statementCollection); //todo: may not be good
				}
				else
				{
					AddNewtonSoftJsonTextReader(statementCollection);
					AddNewtonSoftJsonSerializer(statementCollection);
					statementCollection.Add(new CodeSnippetStatement($"\t\t\t\treturn serializer.Deserialize<{poco2CsGen.TranslateTypeToCSharp(returnType)}>(jsonReader);"));
				}

				return;
			}
			else if (returnType.IsGenericType)
			{
				Type genericTypeDefinition = returnType.GetGenericTypeDefinition();
				if (genericTypeDefinition == typeof(System.Threading.Tasks.Task<>))
				{
					statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("responseMessage")));
					Trace.TraceWarning("There could be something to improve: " + returnType.GenericTypeArguments[0].ToString());
					return;
				}
			}

			AddResponseMessageRead(statementCollection);

			if (returnType != null && TypeHelper.IsStringType(returnType))
			{
				if (this.stringAsString)
				{
					statementCollection.Add(new CodeSnippetStatement("\t\t\t\tusing System.IO.StreamReader streamReader = new System.IO.StreamReader(stream);"));
					statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("streamReader.ReadToEnd();")));
				}
				else
				{
					if (codeGenOutputsSettings.UseSystemTextJson)
					{
						statementCollection.Add(new CodeMethodReturnStatement(new CodeMethodInvokeExpression(
							new CodeMethodReferenceExpression(
								new CodeVariableReferenceExpression("JsonSerializer"), "Deserialize", new CodeTypeReference(typeof(System.String))),
							new CodeSnippetExpression("contentString"),
							new CodeSnippetExpression("jsonSerializerSettings"))));
					}
					else
					{
						AddNewtonSoftJsonTextReader(statementCollection);
						statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("jsonReader.ReadAsString()")));
					}
				}
			}
			else if (returnType == typeOfChar)
			{
				if (codeGenOutputsSettings.UseSystemTextJson)
				{
					DeserializeContentString(statementCollection);
				}
				else
				{
					AddNewtonSoftJsonTextReader(statementCollection);
					AddNewtonSoftJsonSerializer(statementCollection);
					statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("serializer.Deserialize<char>(jsonReader)")));
				}
			}
			else if (returnType.IsPrimitive)
			{
				if (codeGenOutputsSettings.UseSystemTextJson)
				{
					DeserializeContentString(statementCollection);
				}
				else
				{
					AddNewtonSoftJsonTextReader(statementCollection);
					statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression(String.Format("{0}.Parse(jsonReader.ReadAsString())", returnType.FullName))));
				}
			}
			else if (returnType.IsGenericType || TypeHelper.IsComplexType(returnType) || returnType.IsEnum)
			{
				if (codeGenOutputsSettings.UseSystemTextJson)
				{
					DeserializeContentString(statementCollection);
				}
				else
				{
					AddNewtonSoftJsonTextReader(statementCollection);
					//Add4TStartBacket(statementCollection);
					AddNewtonSoftJsonSerializer(statementCollection);
					AddNewtonSoftJsonSerializerDeserialize(statementCollection);
					//Add4TEndBacket(statementCollection);
				}
			}
			else
			{
				Trace.TraceWarning("This type is not yet supported: {0}", returnType.FullName);
			}
		}

		private static string RemoveTrialEmptyString(string s)
		{
			int p = s.IndexOf("+\"\"", StringComparison.Ordinal);
			if (p >= 0)
			{
				return s.Remove(p, 3);
			}

			int p2 = s.IndexOf("))\"", StringComparison.Ordinal);
			if (p2 >= 0)
			{
				return s.Remove(p2 + 2, 1);
			}

			return s;
		}

		/// <summary>
		/// If the API function use ProducesResponseTypeAttribute and 200-202 to define the return type, then get the return type as full type name,
		/// Null if no such definition .
		/// </summary>
		/// <param name="customAttributes"></param>
		/// <returns></returns>
		static Type GetTypeTextOfResponse2xx(Attribute[] customAttributes)
		{
			foreach (Attribute c in customAttributes)
			{
				Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute responseAttribute = c as Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute;
				if (responseAttribute != null)
				{
					if (responseAttribute.StatusCode >= 200 && responseAttribute.StatusCode <= 202)
					{
						return responseAttribute.Type;
					}
				}
			}

			return null;
		}


	}

}
