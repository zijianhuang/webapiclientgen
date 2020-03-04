using System;
using System.CodeDom;
using System.Linq;
using System.Diagnostics;
using Fonlow.Reflection;
using Fonlow.Web.Meta;
using Microsoft.OpenApi.Models;
using Fonlow.OpenApi.ClientTypes;
using Fonlow.CodeDom.Web;

namespace Fonlow.OpenApiClientGen.Cs
{
	/// <summary>
	/// Generate a client function upon OpenApiOperation for C#
	/// </summary>
	internal class ClientApiFunctionGen
	{
		SharedContext sharedContext;
		OpenApiOperation apiOperation;
		ParameterDescription[] parameterDescriptions;
		string methodName;
		string relativePath;
		protected CodeTypeReference returnTypeReference;
		//bool returnTypeIsStream;
		CodeMemberMethod method;
		readonly ComponentsToCsTypes poco2CsGen;
		NameComposer nameComposer;
		Settings settings;
		string actionName;

		bool forAsync;
		bool stringAsString;

		public ClientApiFunctionGen(SharedContext sharedContext, Settings settings, string relativePath, OperationType method, OpenApiOperation apiOperation, ComponentsToCsTypes poco2CsGen, bool stringAsString, bool forAsync = false)
		{
			this.settings = settings;
			this.nameComposer = new NameComposer(settings);
			this.apiOperation = apiOperation;
			this.parameterDescriptions = nameComposer.OpenApiParametersToParameterDescriptions(apiOperation.Parameters);
			this.actionName = nameComposer.GetActionName(apiOperation, method.ToString());
			this.sharedContext = sharedContext;
			this.poco2CsGen = poco2CsGen;
			this.forAsync = forAsync;
			this.stringAsString = stringAsString;

			methodName = method.ToString().ToUpper();

			this.relativePath = relativePath;
			if (methodName.EndsWith("Async"))
				methodName = methodName.Substring(0, methodName.Length - 5);

			returnTypeReference = nameComposer.GetOperationReturnTypeReference(apiOperation);
			//todo: stream, byte and ActionResult later.
			//returnTypeIsStream = returnType!=null && ( (returnType.FullName == typeNameOfHttpResponseMessage) 
			//	|| (returnType.FullName == typeOfIHttpActionResult) 
			//	|| (returnType.FullName == typeOfIActionResult) 
			//	|| (returnType.FullName == typeOfActionResult)
			//	|| (returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[Microsoft.AspNetCore.Mvc.IActionResult")) // .net core is not translating Task<IActionResult> properly.
			//	|| (returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[Microsoft.AspNetCore.Mvc.IHttpActionResult"))
			//	|| (returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[Microsoft.AspNetCore.Mvc.ActionResult"))
			//	);
		}

		const string typeOfIHttpActionResult = "System.Web.Http.IHttpActionResult";
		const string typeOfIActionResult = "Microsoft.AspNetCore.Mvc.IActionResult"; //for .net core 2.1. I did not need this for .net core 2.0
		const string typeOfActionResult = "Microsoft.AspNetCore.Mvc.ActionResult"; //for .net core 2.1. I did not need this for .net core 2.0

		static readonly Type typeOfChar = typeof(char);

		//public static CodeMemberMethod Create(SharedContext sharedContext, string relativePath, OperationType method, OpenApiOperation description, ComponentsToCsCodeDom poco2CsGen, bool stringAsString, bool forAsync)
		//{
		//	var gen = new ClientApiFunctionGen(sharedContext, relativePath, method, description, poco2CsGen, stringAsString, forAsync);
		//	return gen.CreateApiFunction();
		//}

		public CodeMemberMethod CreateApiFunction()
		{
			//create method
			method = forAsync ? CreateMethodBasicForAsync() : CreateMethodBasic();

			CreateDocComments();

			switch (methodName)
			{
				case "GET":
					if (forAsync)
					{
						RenderGetOrDeleteImplementation(
							new CodeMethodInvokeExpression(new CodeSnippetExpression("await " + sharedContext.clientReference.FieldName), "GetAsync", new CodeSnippetExpression("requestUri")));
					}
					else
					{
						RenderGetOrDeleteImplementation(
							new CodePropertyReferenceExpression(
							new CodeMethodInvokeExpression(sharedContext.clientReference, "GetAsync", new CodeSnippetExpression("requestUri")), "Result"));
					}
					break;
				case "DELETE":
					if (forAsync)
					{
						RenderGetOrDeleteImplementation(
							new CodeMethodInvokeExpression(new CodeSnippetExpression("await " + sharedContext.clientReference.FieldName), "DeleteAsync", new CodeSnippetExpression("requestUri")));
					}
					else
					{
						RenderGetOrDeleteImplementation(
							new CodePropertyReferenceExpression(
							new CodeMethodInvokeExpression(sharedContext.clientReference, "DeleteAsync", new CodeSnippetExpression("requestUri"))
							, "Result"));
					}
					break;
				case "POST":
					RenderPostOrPutImplementation(true);
					break;
				case "PUT":
					RenderPostOrPutImplementation(false);
					break;

				default:
					Trace.TraceWarning("This HTTP method {0} is not yet supported", methodName);
					break;
			}

			return method;
		}

		CodeMemberMethod CreateMethodBasic()
		{
			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = methodName,
				ReturnType = returnTypeReference,
			};
		}

		CodeMemberMethod CreateMethodBasicForAsync()
		{
			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = methodName + "Async",
				ReturnType = returnTypeReference == null ? new CodeTypeReference("async Task")
				: new CodeTypeReference("async Task", returnTypeReference),
			};
		}

		void CreateDocComments()
		{
			Action<string, string> CreateDocComment = (elementName, doc) =>
			{
				if (string.IsNullOrWhiteSpace(doc))
					return;

				method.Comments.Add(new CodeCommentStatement("<" + elementName + ">" + doc + "</" + elementName + ">", true));
			};

			Action<string, string> CreateParamDocComment = (paramName, doc) =>
			{
				if (String.IsNullOrWhiteSpace(doc))
					return;

				method.Comments.Add(new CodeCommentStatement("<param name=\"" + paramName + "\">" + doc + "</param>", true));
			};

			method.Comments.Add(new CodeCommentStatement("<summary>", true));
			var noIndent = Fonlow.DocComment.StringFunctions.TrimIndentedMultiLineTextToArray(apiOperation.Description);
			if (noIndent != null)
			{
				foreach (var item in noIndent)
				{
					method.Comments.Add(new CodeCommentStatement(item, true));
				}
			}

			method.Comments.Add(new CodeCommentStatement(methodName + " " + relativePath, true));
			method.Comments.Add(new CodeCommentStatement("</summary>", true));
			foreach (var item in parameterDescriptions)
			{
				CreateParamDocComment(item.Name, item.Documentation);
			}
			CreateDocComment("returns", nameComposer.GetOperationReturnComment(apiOperation));
		}

		void RenderGetOrDeleteImplementation(CodeExpression httpMethodInvokeExpression)
		{
			//Create function parameters
			var parameters = apiOperation.Parameters.Select(d => new CodeParameterDeclarationExpression()
			{
				Name = d.Name,
				Type = nameComposer.GetParameterCodeTypeReference(d),

			}).ToArray();

			method.Parameters.AddRange(parameters);

			var jsUriQuery = UriQueryHelper.CreateUriQuery(relativePath, parameterDescriptions);
			var uriText = jsUriQuery == null ? $"new Uri(this.baseUri, \"{relativePath}\")" :
				RemoveTrialEmptyString($"new Uri(this.baseUri, \"{jsUriQuery}\")");

			method.Statements.Add(new CodeVariableDeclarationStatement(
				new CodeTypeReference("var"), "requestUri",
				new CodeSnippetExpression(uriText)));

			//Statement: var result = this.client.GetAsync(requestUri.ToString()).Result;
			method.Statements.Add(new CodeVariableDeclarationStatement(
				new CodeTypeReference("var"), "responseMessage", httpMethodInvokeExpression));


			////Statement: var result = task.Result;
			var resultReference = new CodeVariableReferenceExpression("responseMessage");

			//Statement: result.EnsureSuccessStatusCode();
			//if (returnTypeIsStream)
			//{
			//	method.Statements.Add(new CodeMethodInvokeExpression(resultReference, "EnsureSuccessStatusCode"));

			//	if (returnType != null)
			//	{
			//		AddReturnStatement(method.Statements);
			//	}
			//}
			//else
			{
				CodeTryCatchFinallyStatement try1 = new CodeTryCatchFinallyStatement();
				try1.TryStatements.Add(new CodeMethodInvokeExpression(resultReference, "EnsureSuccessStatusCode"));
				method.Statements.Add(try1);

				//Statement: return something;
				if (returnTypeReference != null)
				{
					AddReturnStatement(try1.TryStatements);
				}

				try1.FinallyStatements.Add(new CodeMethodInvokeExpression(resultReference, "Dispose"));
			}
		}

		const string typeNameOfHttpResponseMessage = "System.Net.Http.HttpResponseMessage";

		void AddReturnStatement(CodeStatementCollection statementCollection)
		{
			//if (returnTypeIsStream)
			//{
			//	statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("responseMessage")));
			//	return;
			//}
			//else if (returnType.IsGenericType)
			//{
			//	Type genericTypeDefinition = returnType.GetGenericTypeDefinition();
			//	if (genericTypeDefinition == typeof(System.Threading.Tasks.Task<>))
			//	{
			//		statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("responseMessage")));
			//		return;
			//	}
			//}

			statementCollection.Add(new CodeSnippetStatement(forAsync ?
				"\t\t\t\tvar stream = await responseMessage.Content.ReadAsStreamAsync();"
				: "\t\t\t\tvar stream = responseMessage.Content.ReadAsStreamAsync().Result;"));
			//  statementCollection.Add(new CodeSnippetStatement("            using (System.IO.StreamReader reader = new System.IO.StreamReader(stream))"));

			if (returnTypeReference != null && returnTypeReference.BaseType=="System.String")
			{
				if (this.stringAsString)
				{
					statementCollection.Add(new CodeSnippetStatement("\t\t\t\tusing (System.IO.StreamReader streamReader = new System.IO.StreamReader(stream))"));
					statementCollection.Add(new CodeSnippetStatement("\t\t\t\t{"));
					statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("streamReader.ReadToEnd();")));
				}
				else
				{
					statementCollection.Add(new CodeSnippetStatement("\t\t\t\tusing (JsonReader jsonReader = new JsonTextReader(new System.IO.StreamReader(stream)))"));
					statementCollection.Add(new CodeSnippetStatement("\t\t\t\t{"));
					statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("jsonReader.ReadAsString()")));
				}
			}
			//else if (returnTypeReference == typeOfChar)
			//{
			//	statementCollection.Add(new CodeSnippetStatement("\t\t\t\tusing (JsonReader jsonReader = new JsonTextReader(new System.IO.StreamReader(stream)))"));
			//	statementCollection.Add(new CodeSnippetStatement("\t\t\t\t{"));
			//	statementCollection.Add(new CodeVariableDeclarationStatement(
			//		new CodeTypeReference("var"), "serializer", new CodeSnippetExpression("new JsonSerializer()")));
			//	statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("serializer.Deserialize<char>(jsonReader)")));
			//}
			//else if (returnTypeReference.IsPrimitive)
			//{
			//	statementCollection.Add(new CodeSnippetStatement("\t\t\t\tusing (JsonReader jsonReader = new JsonTextReader(new System.IO.StreamReader(stream)))"));
			//	statementCollection.Add(new CodeSnippetStatement("\t\t\t\t{"));
			//	statementCollection.Add(new CodeMethodReturnStatement(new CodeSnippetExpression(String.Format("{0}.Parse(jsonReader.ReadAsString())", returnTypeReference.FullName))));
			//}
			else if (IsPrimitive(returnTypeReference.BaseType))
			{
				statementCollection.Add(new CodeSnippetStatement("\t\t\t\tusing (JsonReader jsonReader = new JsonTextReader(new System.IO.StreamReader(stream)))"));
				statementCollection.Add(new CodeSnippetStatement("\t\t\t\t{"));
				statementCollection.Add(new CodeVariableDeclarationStatement(
					new CodeTypeReference("var"), "serializer", new CodeSnippetExpression("new JsonSerializer()")));
				statementCollection.Add(new CodeMethodReturnStatement(new CodeMethodInvokeExpression(
					new CodeMethodReferenceExpression(new CodeVariableReferenceExpression("serializer"), "Deserialize", returnTypeReference),
						new CodeSnippetExpression("jsonReader"))));
			}
			else if (IsComplexType(returnTypeReference.BaseType))
			{
				statementCollection.Add(new CodeSnippetStatement("\t\t\t\tusing (JsonReader jsonReader = new JsonTextReader(new System.IO.StreamReader(stream)))"));
				statementCollection.Add(new CodeSnippetStatement("\t\t\t\t{"));
				statementCollection.Add(new CodeVariableDeclarationStatement(
					new CodeTypeReference("var"), "serializer", new CodeSnippetExpression("new JsonSerializer()")));
				statementCollection.Add(new CodeMethodReturnStatement(new CodeMethodInvokeExpression(
					new CodeMethodReferenceExpression(new CodeVariableReferenceExpression("serializer"), "Deserialize", returnTypeReference),
						new CodeSnippetExpression("jsonReader"))));
			}
			else
			{
				Trace.TraceWarning("This type is not yet supported: {0}", returnTypeReference.BaseType);
			}

			statementCollection.Add(new CodeSnippetStatement("\t\t\t\t}"));
		}

		static bool IsPrimitive(string typeName)
		{
			string[] ts = new string[] {"System.Int32", "System.Int64", "System.Float", "System.Double", "System.DateTime", "System.Boolean" };
			return ts.Contains(typeName);
		}

		bool IsComplexType(string typeName)
		{
			return typeName.StartsWith(settings.ClientNamespace);
		}


		void RenderPostOrPutImplementation(bool isPost)
		{
			//Create function parameters in prototype
			var parameters = parameterDescriptions.Select(d => new CodeParameterDeclarationExpression()
			{
				Name = d.Name,
				Type = poco2CsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType),

			}).ToArray();
			method.Parameters.AddRange(parameters);

			var uriQueryParameters = parameterDescriptions.Where(d =>
				(d.ParameterDescriptor.ParameterBinder != ParameterBinder.FromBody && d.ParameterDescriptor.ParameterBinder != ParameterBinder.FromForm && TypeHelper.IsSimpleType(d.ParameterDescriptor.ParameterType))
				|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
				|| (d.ParameterDescriptor.ParameterType.IsValueType && d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
				).Select(d => new CodeParameterDeclarationExpression()
				{
					Name = d.Name,
					Type = poco2CsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType),
				}).ToArray();

			var fromBodyParameterDescriptions = parameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
				|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri) || (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
			if (fromBodyParameterDescriptions.Length > 1)
			{
				throw new CodeGenException("Bad Api Definition")
				{
					Description = String.Format("This API function {0} has more than 1 FromBody bindings in parameters", actionName)
				};
			}

			var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

			Action AddRequestUriWithQueryAssignmentStatement = () =>
			{

				var jsUriQuery = UriQueryHelper.CreateUriQuery(relativePath, parameterDescriptions);
				var uriText = jsUriQuery == null ? $"new Uri(this.baseUri, \"{relativePath}\")" :
				RemoveTrialEmptyString($"new Uri(this.baseUri, \"{jsUriQuery}\")");

				method.Statements.Add(new CodeVariableDeclarationStatement(
					new CodeTypeReference("var"), "requestUri",
					new CodeSnippetExpression(uriText)));
			};

			Action AddRequestUriAssignmentStatement = () =>
			{
				var jsUriQuery = UriQueryHelper.CreateUriQuery(relativePath, parameterDescriptions);
				var uriText = jsUriQuery == null ? $"new Uri(this.baseUri, \"{relativePath}\")" :
				RemoveTrialEmptyString($"new Uri(this.baseUri, \"{jsUriQuery}\")");

				method.Statements.Add(new CodeVariableDeclarationStatement(
					new CodeTypeReference("var"), "requestUri",
					new CodeSnippetExpression(uriText)));

			};

			Action<CodeExpression> AddPostStatement = (httpMethodInvokeExpression) =>
			{
				//Statement: var task = this.client.GetAsync(requestUri.ToString());
				method.Statements.Add(new CodeVariableDeclarationStatement(
					new CodeTypeReference("var"), "responseMessage", httpMethodInvokeExpression));

			};


			if (uriQueryParameters.Length > 0)
			{
				AddRequestUriWithQueryAssignmentStatement();
			}
			else
			{
				AddRequestUriAssignmentStatement();
			}

			if (singleFromBodyParameterDescription != null)
			{
				method.Statements.Add(new CodeSnippetStatement(
@"			using (var requestWriter = new System.IO.StringWriter())
			{
			var requestSerializer = JsonSerializer.Create();"
));
				method.Statements.Add(new CodeMethodInvokeExpression(new CodeSnippetExpression("requestSerializer"), "Serialize",
					new CodeSnippetExpression("requestWriter"),
					new CodeSnippetExpression(singleFromBodyParameterDescription.ParameterDescriptor.ParameterName)));


				method.Statements.Add(new CodeSnippetStatement(
@"			var content = new StringContent(requestWriter.ToString(), System.Text.Encoding.UTF8, ""application/json"");"
					));

				if (forAsync)
				{
					AddPostStatement(
					new CodeMethodInvokeExpression(new CodeSnippetExpression("await " + sharedContext.clientReference.FieldName), isPost ?
					"PostAsync" : "PutAsync", new CodeSnippetExpression("requestUri")
			  , new CodeSnippetExpression("content")));
				}
				else
				{
					AddPostStatement(new CodePropertyReferenceExpression(
					new CodeMethodInvokeExpression(sharedContext.clientReference, isPost ?
					"PostAsync" : "PutAsync", new CodeSnippetExpression("requestUri")
			  , new CodeSnippetExpression("content"))
					, "Result"));
				}
			}
			else
			{
				if (forAsync)
				{
					AddPostStatement(
						new CodeMethodInvokeExpression(new CodeSnippetExpression("await " + sharedContext.clientReference.FieldName), isPost ? "PostAsync" : "PutAsync"
						, new CodeSnippetExpression("requestUri")
						, new CodeSnippetExpression("new StringContent(String.Empty)")));
				}
				else
				{
					AddPostStatement(new CodePropertyReferenceExpression(
						new CodeMethodInvokeExpression(sharedContext.clientReference, isPost ? "PostAsync" : "PutAsync"
						, new CodeSnippetExpression("requestUri")
						, new CodeSnippetExpression("new StringContent(String.Empty)"))
						, "Result"));
				}

			}

			var resultReference = new CodeVariableReferenceExpression("responseMessage");

			//if (returnTypeIsStream)
			//{
			//	method.Statements.Add(new CodeMethodInvokeExpression(resultReference, "EnsureSuccessStatusCode"));

			//	//Statement: return something;
			//	if (returnTypeReference != null)
			//	{
			//		AddReturnStatement(method.Statements);
			//	}
			//}
			//else
			{
				CodeTryCatchFinallyStatement try1 = new CodeTryCatchFinallyStatement();
				method.Statements.Add(try1);
				try1.TryStatements.Add(new CodeMethodInvokeExpression(resultReference, "EnsureSuccessStatusCode"));

				//Statement: return something;
				if (returnTypeReference != null)
				{
					AddReturnStatement(try1.TryStatements);
				}

				try1.FinallyStatements.Add(new CodeMethodInvokeExpression(resultReference, "Dispose"));
			}

			if (singleFromBodyParameterDescription != null)
				method.Statements.Add(new CodeSnippetStatement("\t\t\t}"));
		}

		static string RemoveTrialEmptyString(string s)
		{
			var p = s.IndexOf("+\"\"");
			if (p == -1)
			{
				return s;
			}
			return s.Remove(p, 3);
		}

	}

}
