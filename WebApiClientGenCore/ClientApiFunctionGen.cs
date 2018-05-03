using System;
using System.CodeDom;
using System.Linq;
using System.Diagnostics;
using Fonlow.Reflection;
using Fonlow.Web.Meta;
using Tavis.UriTemplates;

namespace Fonlow.CodeDom.Web.Cs
{
    /// <summary>
    /// Generate a client function upon ApiDescription
    /// </summary>
    internal class ClientApiFunctionGen
    {
        SharedContext sharedContext;
        WebApiDescription description;
        string methodName;
        protected Type returnType;
        CodeMemberMethod method;
        readonly Fonlow.Poco2Client.IPoco2Client poco2CsGen;

        bool forAsync;

        public ClientApiFunctionGen(SharedContext sharedContext, WebApiDescription description, Fonlow.Poco2Client.IPoco2Client poco2CsGen)
        {
            this.description = description;
            this.sharedContext = sharedContext;
            this.poco2CsGen = poco2CsGen;

            methodName = description.ActionDescriptor.ActionName;
            if (methodName.EndsWith("Async"))
                methodName = methodName.Substring(0, methodName.Length - 5);

            returnType = description.ResponseDescription?.ResponseType ?? description.ActionDescriptor.ReturnType;

        }

        static readonly string typeOfHttpActionResult = "System.Web.Http.IHttpActionResult";
        static readonly Type typeOfChar = typeof(char);
        static readonly Type typeofString = typeof(string);
        static readonly Type typeOfDateTime = typeof(DateTime);
        static readonly Type typeOfDateTimeOffset = typeof(DateTimeOffset);

        public static CodeMemberMethod Create(SharedContext sharedContext, WebApiDescription description, Fonlow.Poco2Client.IPoco2Client poco2CsGen, bool forAsync = false)
        {
            var gen = new ClientApiFunctionGen(sharedContext, description, poco2CsGen);
            return gen.CreateApiFunction(forAsync);
        }

        public CodeMemberMethod CreateApiFunction(bool createAsync = false)
        {
            this.forAsync = createAsync;
            //create method
            method = forAsync ? CreateMethodBasicForAsync() : CreateMethodBasic();

            CreateDocComments();

            switch (description.HttpMethod)
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
                    Trace.TraceWarning("This HTTP method {0} is not yet supported", description.HttpMethod);
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
            var noIndent = Fonlow.DocComment.StringFunctions.TrimIndentedMultiLineTextToArray(description.Documentation);
            if (noIndent != null)
            {
                foreach (var item in noIndent)
                {
                    method.Comments.Add(new CodeCommentStatement(item, true));
                }
            }

            method.Comments.Add(new CodeCommentStatement(description.HttpMethod + " " + description.RelativePath, true));
            method.Comments.Add(new CodeCommentStatement("</summary>", true));
            foreach (var item in description.ParameterDescriptions)
            {
                CreateParamDocComment(item.Name, item.Documentation);
            }
            CreateDocComment("returns", description.ResponseDescription.Documentation);
        }

        void RenderGetOrDeleteImplementation(CodeExpression httpMethodInvokeExpression)
        {
            //Create function parameters
            var parameters = description.ParameterDescriptions.Select(d => new CodeParameterDeclarationExpression()
            {
                Name = d.Name,
                Type = poco2CsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType),

            }).ToArray();

            method.Parameters.AddRange(parameters);

            var jsUriQuery = CreateUriQuery(description.RelativePath, description.ParameterDescriptions);
            var uriText = jsUriQuery == null ? $"new Uri(this.baseUri, \"{description.RelativePath}\")" :
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
            method.Statements.Add(new CodeMethodInvokeExpression(resultReference, "EnsureSuccessStatusCode"));

            //Statement: return something;
            if (returnType != null)
            {
                AddReturnStatement();
            }

        }

        static readonly string typeOfHttpResponseMessage = "System.Net.Http.HttpResponseMessage";

        void AddReturnStatement()
        {
            if ((returnType.FullName == typeOfHttpResponseMessage) || (returnType.FullName == typeOfHttpActionResult))
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("responseMessage")));
                return;
            }

            method.Statements.Add(new CodeSnippetStatement(forAsync ?
                "            var stream = await responseMessage.Content.ReadAsStreamAsync();"
                : "            var stream = responseMessage.Content.ReadAsStreamAsync().Result;"));
            //  method.Statements.Add(new CodeSnippetStatement("            using (System.IO.StreamReader reader = new System.IO.StreamReader(stream))"));
            method.Statements.Add(new CodeSnippetStatement("            using (JsonReader jsonReader = new JsonTextReader(new System.IO.StreamReader(stream)))"));
            method.Statements.Add(new CodeSnippetStatement("            {"));

            method.Statements.Add(new CodeVariableDeclarationStatement(
                new CodeTypeReference("var"), "serializer", new CodeSnippetExpression("new JsonSerializer()")));

            if (TypeHelper.IsStringType(returnType))
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("serializer.Deserialize<string>(jsonReader)")));
            }
            else if (returnType == typeOfChar)
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("serializer.Deserialize<char>(jsonReader)")));
            }
            else if (returnType.IsPrimitive)
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression(String.Format("{0}.Parse(jsonReader.ReadAsString())", returnType.FullName))));
            }
            else if (returnType.IsGenericType || TypeHelper.IsComplexType(returnType))
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeMethodInvokeExpression(
                    new CodeMethodReferenceExpression(new CodeVariableReferenceExpression("serializer"), "Deserialize", poco2CsGen.TranslateToClientTypeReference(returnType)),
                        new CodeSnippetExpression("jsonReader"))));
            }
            else
            {
                Trace.TraceWarning("This type is not yet supported: {0}", returnType.FullName);
            }

            method.Statements.Add(new CodeSnippetStatement("            }"));


        }

        void RenderPostOrPutImplementation(bool isPost)
        {
            //Create function parameters in prototype
            var parameters = description.ParameterDescriptions.Select(d => new CodeParameterDeclarationExpression()
            {
                Name = d.Name,
                Type = poco2CsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType),

            }).ToArray();
            method.Parameters.AddRange(parameters);

            var uriQueryParameters = description.ParameterDescriptions.Where(d =>
                (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody) && TypeHelper.IsSimpleType(d.ParameterDescriptor.ParameterType))
                || (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
                || (d.ParameterDescriptor.ParameterType.IsValueType && d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
                ).Select(d => new CodeParameterDeclarationExpression()
                {
                    Name = d.Name,
                    Type = poco2CsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType),
                }).ToArray();

            var fromBodyParameterDescriptions = description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
                || (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri) || (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
            if (fromBodyParameterDescriptions.Length > 1)
            {
                throw new CodeGenException("BadApiDef")
                {
                    Description = String.Format("This API function {0} has more than 1 FromBody bindings in parameters", description.ActionDescriptor.ActionName)
                };
            }

            var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

            Action AddRequestUriWithQueryAssignmentStatement = () =>
            {

                var jsUriQuery = CreateUriQuery(description.RelativePath, description.ParameterDescriptions);
                var uriText = jsUriQuery == null ? $"new Uri(this.baseUri, \"{description.RelativePath}\")" :
                RemoveTrialEmptyString($"new Uri(this.baseUri, \"{jsUriQuery}\")");

                method.Statements.Add(new CodeVariableDeclarationStatement(
                    new CodeTypeReference("var"), "requestUri",
                    new CodeSnippetExpression(uriText)));
            };

            Action AddRequestUriAssignmentStatement = () =>
            {
                var jsUriQuery = CreateUriQuery(description.RelativePath, description.ParameterDescriptions);
                var uriText = jsUriQuery == null ? $"new Uri(this.baseUri, \"{description.RelativePath}\")" :
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
@"            using (var requestWriter = new System.IO.StringWriter())
            {
            var requestSerializer = JsonSerializer.Create();"
));
                method.Statements.Add(new CodeMethodInvokeExpression(new CodeSnippetExpression("requestSerializer"), "Serialize",
                    new CodeSnippetExpression("requestWriter"),
                    new CodeSnippetExpression(singleFromBodyParameterDescription.ParameterDescriptor.ParameterName)));


                method.Statements.Add(new CodeSnippetStatement(
    @"            var content = new StringContent(requestWriter.ToString(), System.Text.Encoding.UTF8, ""application/json"");"
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

            //Statement: result.EnsureSuccessStatusCode();
            method.Statements.Add(new CodeMethodInvokeExpression(resultReference, "EnsureSuccessStatusCode"));

            //Statement: return something;
            if (returnType != null)
            {
                AddReturnStatement();
            }

            if (singleFromBodyParameterDescription != null)
                method.Statements.Add(new CodeSnippetStatement("            }"));
        }

        static string RemoveTrialEmptyString(string s)
        {
            var p = s.IndexOf("+\"\"");
            return s.Remove(p, 3);
        }


        static string CreateUriQuery(string uriText, ParameterDescription[] parameterDescriptions)
        {
            var template = new UriTemplate(uriText);
			var parameterNames = template.GetParameterNames().ToArray();
            if (parameterNames.Length == 0)
                return null;

            string newUriText = uriText;

            Func<ParameterDescription, string> GetUriText = (d) =>
             {
                 if (d.ParameterDescriptor.ParameterType == typeofString)
                 {
                     return newUriText.Replace($"{{{d.Name}}}", $"\"+Uri.EscapeDataString({d.Name})+\"");
                 }
                 else if ((d.ParameterDescriptor.ParameterType == typeOfDateTime) || (d.ParameterDescriptor.ParameterType == typeOfDateTimeOffset))
                 {
                     return newUriText.Replace($"{{{d.Name}}}", $"\"+{d.Name}.ToUniversalTime().ToString(\"yyyy-MM-ddTHH:mm:ss.fffffffZ\")+\"");
                 }
                 else
                 {
                     return newUriText.Replace($"{{{d.Name}}}", $"\"+{d.Name}+\"");
                 }
             };

            for (int i = 0; i < parameterNames.Length; i++)
            {
                var name = parameterNames[i];//PathSegmentVariableNames[i] always give uppercase
                var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
                Debug.Assert(d != null);

                newUriText = GetUriText(d);
            }

            //for (int i = 0; i < template.QueryValueVariableNames.Count; i++)
            //{
            //    var name = template.QueryValueVariableNames[i];
            //    var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
            //    Debug.Assert(d != null);
            //    newUriText = GetUriText(d);
            //}

            return newUriText;
        }



    }

}
