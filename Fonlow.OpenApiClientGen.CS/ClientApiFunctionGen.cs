using System;
using System.CodeDom;
using System.Linq;
using System.Diagnostics;
using Fonlow.Reflection;
using Fonlow.Web.Meta;
using Microsoft.OpenApi.Models;
using Fonlow.CodeDom.Web;
using Fonlow.OpenApiClientGen.ClientTypes;

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
		CodeTypeReference requestBodyCodeTypeReference; // for post and put
		string requestBodyComment;

		string relativePath;
		protected CodeTypeReference returnTypeReference;
		//bool returnTypeIsStream;
		CodeMemberMethod method;
		ComponentsToCsTypes poco2CsGen;
		NameComposer nameComposer;
		Settings settings;
		string actionName;
		OperationType httpMethod;
		bool forAsync;
		bool stringAsString;
		bool returnIsComplexType;

		public ClientApiFunctionGen()
		{
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

		public CodeMemberMethod CreateApiFunction(SharedContext sharedContext, Settings settings, string relativePath, OperationType httpMethod, OpenApiOperation apiOperation, ComponentsToCsTypes poco2CsGen, bool forAsync = false)
		{
			this.settings = settings;
			this.nameComposer = new NameComposer(settings);
			this.apiOperation = apiOperation;
			this.httpMethod = httpMethod;
			this.parameterDescriptions = nameComposer.OpenApiParametersToParameterDescriptions(apiOperation.Parameters);
			if (httpMethod == OperationType.Post || httpMethod == OperationType.Put)
			{
				var kc = nameComposer.GetBodyContent(apiOperation);
				if (kc != null)
				{
					this.requestBodyCodeTypeReference = kc.Item1;
					this.requestBodyComment = kc.Item2;
					if (!kc.Item3)
					{
						return null; // not to generate for unsupported POST content type.
					}
				}
			}

			this.actionName = nameComposer.GetActionName(apiOperation, httpMethod.ToString(), relativePath);
			this.sharedContext = sharedContext;
			this.poco2CsGen = poco2CsGen;
			this.forAsync = forAsync;


			this.relativePath = RemovePrefixSlash(relativePath);
			if (actionName.EndsWith("Async"))
				actionName = actionName.Substring(0, actionName.Length - 5);

			var r = nameComposer.GetOperationReturnTypeReference(apiOperation);
			returnTypeReference = r.Item1;
			stringAsString = r.Item2;
			returnIsComplexType = r.Item3;

			//todo: stream, byte and ActionResult later.
			//returnTypeIsStream = returnType!=null && ( (returnType.FullName == typeNameOfHttpResponseMessage) 
			//	|| (returnType.FullName == typeOfIHttpActionResult) 
			//	|| (returnType.FullName == typeOfIActionResult) 
			//	|| (returnType.FullName == typeOfActionResult)
			//	|| (returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[Microsoft.AspNetCore.Mvc.IActionResult")) // .net core is not translating Task<IActionResult> properly.
			//	|| (returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[Microsoft.AspNetCore.Mvc.IHttpActionResult"))
			//	|| (returnType.FullName.StartsWith("System.Threading.Tasks.Task`1[[Microsoft.AspNetCore.Mvc.ActionResult"))
			//	);

			//create method
			method = forAsync ? CreateMethodBasicForAsync() : CreateMethodBasic();

			CreateDocComments();

			switch (httpMethod)
			{
				case OperationType.Get:
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
				case OperationType.Delete:
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
				case OperationType.Post:
					RenderPostOrPutImplementation(true);
					break;
				case OperationType.Put:
					RenderPostOrPutImplementation(false);
					break;

				default:
					Trace.TraceWarning("This HTTP method {0} is not yet supported", httpMethod);
					break;
			}

			return method;
		}

		static string RemovePrefixSlash(string uriText)
		{
			if (uriText[0] == '/')
			{
				return uriText.Remove(0, 1);
			}

			return uriText;
		}

		CodeMemberMethod CreateMethodBasic()
		{
			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = actionName,
				ReturnType = returnTypeReference,
			};
		}

		CodeMemberMethod CreateMethodBasicForAsync()
		{
			return new CodeMemberMethod()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final,
				Name = actionName + "Async",
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
			var noIndent = Fonlow.DocComment.StringFunctions.TrimIndentedMultiLineTextToArray(
				apiOperation.Summary
				+ ((String.IsNullOrEmpty(apiOperation.Summary) || string.IsNullOrEmpty(apiOperation.Description)) ? String.Empty : "\n")
				+ apiOperation.Description);
			if (noIndent != null)
			{
				foreach (var item in noIndent)
				{
					method.Comments.Add(new CodeCommentStatement(item, true));
				}
			}

			method.Comments.Add(new CodeCommentStatement(actionName + " " + relativePath, true));
			method.Comments.Add(new CodeCommentStatement("</summary>", true));
			foreach (var item in parameterDescriptions)
			{
				CreateParamDocComment(item.Name, item.Documentation);
			}

			if (!String.IsNullOrEmpty(requestBodyComment))
			{
				CreateParamDocComment("requestBody", requestBodyComment);
			}

			CreateDocComment("returns", nameComposer.GetOperationReturnComment(apiOperation));
		}

		void RenderGetOrDeleteImplementation(CodeExpression httpMethodInvokeExpression)
		{
			//Create function parameters
			var parameters = apiOperation.Parameters.Where(p => p.In == ParameterLocation.Path || p.In == ParameterLocation.Query).Select(d => new CodeParameterDeclarationExpression()
			{
				Name = d.Name,
				Type = nameComposer.GetParameterCodeTypeReference(d),

			}).ToArray();

			method.Parameters.AddRange(parameters);

			var jsUriQuery = UriQueryHelper.CreateUriQuery(relativePath, parameterDescriptions);
			var uriText = jsUriQuery == null ? $"\"{relativePath}\"" :
				RemoveTrialEmptyString($"\"{jsUriQuery}\"");

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

			if (returnTypeReference != null && returnTypeReference.BaseType == "System.String" && returnTypeReference.ArrayElementType == null)
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
			else // then is complex.
			{
				statementCollection.Add(new CodeSnippetStatement("\t\t\t\tusing (JsonReader jsonReader = new JsonTextReader(new System.IO.StreamReader(stream)))"));
				statementCollection.Add(new CodeSnippetStatement("\t\t\t\t{"));
				statementCollection.Add(new CodeVariableDeclarationStatement(
					new CodeTypeReference("var"), "serializer", new CodeSnippetExpression("new JsonSerializer()")));
				statementCollection.Add(new CodeMethodReturnStatement(new CodeMethodInvokeExpression(
					new CodeMethodReferenceExpression(new CodeVariableReferenceExpression("serializer"), "Deserialize", returnTypeReference),
						new CodeSnippetExpression("jsonReader"))));
			}

			statementCollection.Add(new CodeSnippetStatement("\t\t\t\t}"));
		}

		static bool IsPrimitive(string typeName)
		{
			string[] ts = new string[] { "System.Int32", "System.Int64", "System.Float", "System.Double", "System.DateTime", "System.Boolean" };
			return ts.Contains(typeName);
		}

		bool IsComplexType(CodeTypeReference ctf)
		{
			return ctf.BaseType.StartsWith(settings.ClientNamespace) || ctf.ArrayElementType != null;
		}


		void RenderPostOrPutImplementation(bool isPost)
		{
			//Create function parameters in prototype
			var parameters = parameterDescriptions.Select(d =>
				new CodeParameterDeclarationExpression(poco2CsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType), d.Name))
				.ToArray();
			method.Parameters.AddRange(parameters);
			if (requestBodyCodeTypeReference != null)
			{
				var p = new CodeParameterDeclarationExpression(requestBodyCodeTypeReference, "requestBody");
				method.Parameters.Add(p);
			}

			var uriQueryParameters = parameterDescriptions.Where(d =>
				(d.ParameterDescriptor.ParameterBinder != ParameterBinder.FromBody && d.ParameterDescriptor.ParameterBinder != ParameterBinder.FromForm && TypeHelper.IsSimpleType(d.ParameterDescriptor.ParameterType))
				|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
				|| (d.ParameterDescriptor.ParameterType.IsValueType && d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
				).Select(d => new CodeParameterDeclarationExpression()
				{
					Name = d.Name,
					Type = poco2CsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType),
				}).ToArray();

			//var fromBodyParameterDescriptions = parameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
			//	|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri) || (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
			//if (fromBodyParameterDescriptions.Length > 1)
			//{
			//	throw new CodeGenException("Bad Api Definition")
			//	{
			//		Description = String.Format("This API function {0} has more than 1 FromBody bindings in parameters", actionName)
			//	};
			//}

			//var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

			Action AddRequestUriWithQueryAssignmentStatement = () =>
			{

				var jsUriQuery = UriQueryHelper.CreateUriQuery(relativePath, parameterDescriptions);
				var uriText = jsUriQuery == null ? $"\"{relativePath}\"" :
				RemoveTrialEmptyString($"\"{jsUriQuery}\"");

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


			AddRequestUriWithQueryAssignmentStatement();

			if (requestBodyCodeTypeReference != null)
			{
				method.Statements.Add(new CodeSnippetStatement(
@"			using (var requestWriter = new System.IO.StringWriter())
			{
			var requestSerializer = JsonSerializer.Create();"
));
				method.Statements.Add(new CodeMethodInvokeExpression(new CodeSnippetExpression("requestSerializer"), "Serialize",
					new CodeSnippetExpression("requestWriter"),
					new CodeSnippetExpression("requestBody")));


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

			if (requestBodyCodeTypeReference != null)
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
