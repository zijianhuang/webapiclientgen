using System;
using System.CodeDom;
using System.Linq;
using System.Collections.ObjectModel;

using System.Web.Http;
using System.Web.Http.Description;
using System.Diagnostics;

namespace Fonlow.CodeDom.Web.Ts
{
    /// <summary>
    /// Generate a client function upon ApiDescription
    /// </summary>
    internal class ClientApiTsFunctionGen
    {
        SharedContext sharedContext;
        ApiDescription description;
        string relativePath;
        //  string route;
        Collection<ApiParameterDescription> parameterDescriptions;
        string controllerName;
        string methodName;
        Type returnType;
        CodeMemberMethod method;

        public ClientApiTsFunctionGen(SharedContext sharedContext, ApiDescription description)
        {
            this.description = description;
            this.sharedContext = sharedContext;

            relativePath = description.RelativePath;
            parameterDescriptions = description.ParameterDescriptions;
            controllerName = description.ActionDescriptor.ControllerDescriptor.ControllerName;


            methodName = description.ActionDescriptor.ActionName;
            if (methodName.EndsWith("Async"))
                methodName = methodName.Substring(0, methodName.Length - 5);

            returnType = description.ActionDescriptor.ReturnType;

        }

        static readonly Type typeOfHttpActionResult = typeof(System.Web.Http.IHttpActionResult);
        static readonly Type typeOfChar = typeof(char);

        public static CodeMemberMethod Create(SharedContext sharedContext, ApiDescription description)
        {
            var gen = new ClientApiTsFunctionGen(sharedContext, description);
            return gen.CreateApiFunction();
        }

        public CodeMemberMethod CreateApiFunction()
        {
            //create method
            method = CreateMethodBasic();

            var returnTypeReference = method.ReturnType;

          //  CreateDocComments();


            var binderAttributes = description.ParameterDescriptions.Select(d => d.ParameterDescriptor.ParameterBinderAttribute).ToArray();

            switch (description.HttpMethod.Method)
            {
                case "GET":
                        RenderGetOrDeleteImplementation(
                            new CodePropertyReferenceExpression(
                            new CodeMethodInvokeExpression(sharedContext.clientReference, "GetAsync", new CodeSnippetExpression("requestUri.ToString()")), "Result"));
                    break;
                case "DELETE":
                        RenderGetOrDeleteImplementation(
                            new CodePropertyReferenceExpression(
                            new CodeMethodInvokeExpression(sharedContext.clientReference, "DeleteAsync", new CodeSnippetExpression("requestUri.ToString()"))
                            , "Result"));
                    break;
                case "POST":
                    RenderPostOrPutImplementation(true);
                    break;
                case "PUT":
                    RenderPostOrPutImplementation(false);
                    break;

                default:
                    Trace.TraceWarning("This HTTP method {0} is not yet supported", description.HttpMethod.Method);
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
                ReturnType = returnType == null ? null : new CodeTypeReference(TranslateCustomTypeToClientType(returnType)),
            };
        }

        //CodeMemberMethod CreateMethodBasicForAsync()
        //{
        //    return new CodeMemberMethod()
        //    {
        //        Attributes = MemberAttributes.Public | MemberAttributes.Final,
        //        Name = methodName + "Async",
        //        ReturnType = returnType == null ? new CodeTypeReference("async Task")
        //        : new CodeTypeReference(String.Format("async Task<{0}>", returnType.IsGenericType ? GetGenericTypeFriendlyName(returnType) : TranslateCustomTypeToClientType(returnType))),
        //    };
        //}

        //void CreateDocComments()
        //{
        //    Action<string, string> CreateDocComment = (elementName, doc) =>
        //    {
        //        if (string.IsNullOrWhiteSpace(doc))
        //            return;

        //        method.Comments.Add(new CodeCommentStatement("<" + elementName + ">" + doc + "</" + elementName + ">", true));
        //    };

        //    Action<string, string> CreateParamDocComment = (paramName, doc) =>
        //    {
        //        if (String.IsNullOrWhiteSpace(doc))
        //            return;

        //        method.Comments.Add(new CodeCommentStatement("<param name=\"" + paramName + "\">" + doc + "</param>", true));
        //    };

        //    method.Comments.Add(new CodeCommentStatement("<summary>", true));
        //    method.Comments.Add(new CodeCommentStatement(description.Documentation, true));
        //    method.Comments.Add(new CodeCommentStatement(description.HttpMethod.Method + " " + description.RelativePath, true));
        //    method.Comments.Add(new CodeCommentStatement("</summary>", true));
        //    foreach (var item in description.ParameterDescriptions)
        //    {
        //        CreateParamDocComment(item.Name, item.Documentation);
        //    }
        //    CreateDocComment("returns", description.ResponseDescription.Documentation);
        //}

        string GetGenericTypeFriendlyName(Type r)
        {
            var separatorPosition = r.Name.IndexOf("`");
            var genericTypeName = r.Name.Substring(0, separatorPosition);
            var typeNameList = r.GenericTypeArguments.Select(d => TranslateCustomTypeToClientType(d));//support only 1 level of generic. This should be good enough. If more needed, recursive algorithm will help
            var typesLiteral = String.Join(", ", typeNameList);
            return String.Format("{0}<{1}>", genericTypeName, typesLiteral);
        }

        string TranslateCustomTypeToClientType(Type t)
        {
            if (t == typeOfHttpActionResult)
                return "System.Net.Http.HttpResponseMessage";


            if (sharedContext.prefixesOfCustomNamespaces.Any(d => t.Namespace.StartsWith(d)))
                return t.Namespace + ".Client." + t.Name;

            return t.FullName;
        }


        void RenderGetOrDeleteImplementation(CodeExpression httpMethodInvokeExpression)
        {
            //Create function parameters
            var parameters = description.ParameterDescriptions.Select(d => new CodeParameterDeclarationExpression()
            {
                Name = d.Name,
                Type = new CodeTypeReference(TranslateCustomTypeToClientType(d.ParameterDescriptor.ParameterType)),

            }).ToArray();

            method.Parameters.AddRange(parameters);

            method.Statements.Add(new CodeVariableDeclarationStatement(
                new CodeTypeReference("var"), "template",
                new CodeObjectCreateExpression("System.UriTemplate", new CodePrimitiveExpression(description.RelativePath))
            ));
            var templateReference = new CodeVariableReferenceExpression("template");

            //Statement: var uriParameters = new System.Collections.Specialized.NameValueCollection();
            method.Statements.Add(new CodeVariableDeclarationStatement(
                new CodeTypeReference("var"), "uriParameters",
                new CodeObjectCreateExpression("System.Collections.Specialized.NameValueCollection")
            ));
            var uriParametersReference = new CodeVariableReferenceExpression("uriParameters");
            foreach (var p in parameters)
            {
                //Statement:             template.Add("id", id);
                method.Statements.Add(new CodeMethodInvokeExpression(uriParametersReference, "Add"
                    , new CodePrimitiveExpression(p.Name), new CodeSnippetExpression(p.Type.BaseType == "System.String" ? p.Name : p.Name + ".ToString()")));
            }

            //Statement: var requestUri = template.BindByName(this.baseUri, uriParameters);
            method.Statements.Add(new CodeVariableDeclarationStatement(
                new CodeTypeReference("var"), "requestUri",
                new CodeMethodInvokeExpression(new CodeVariableReferenceExpression("template"), "BindByName", sharedContext.baseUriReference, new CodeSnippetExpression("uriParameters"))));

            //Statement: var result = this.client.GetAsync(requestUri.ToString()).Result;
            method.Statements.Add(new CodeVariableDeclarationStatement(
                new CodeTypeReference("var"), "responseMessage", httpMethodInvokeExpression));

            ////Statement: var result = task.Result;
            //method.Statements.Add(new CodeVariableDeclarationStatement(
            //    new CodeTypeReference("var"), "result", new CodeSnippetExpression("task.Result")));
            var resultReference = new CodeVariableReferenceExpression("responseMessage");

            //Statement: result.EnsureSuccessStatusCode();
            method.Statements.Add(new CodeMethodInvokeExpression(resultReference, "EnsureSuccessStatusCode"));

            //Statement: return something;
            if (returnType != null)
            {
                AddReturnStatement();
            }

        }

        static readonly Type typeOfHttpResponseMessage = typeof(System.Net.Http.HttpResponseMessage);

        void AddReturnStatement()
        {
            if ((returnType == typeOfHttpResponseMessage) || (returnType == typeOfHttpActionResult))
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("responseMessage")));
                return;
            }

            method.Statements.Add(new CodeVariableDeclarationStatement(
                new CodeTypeReference("var"), "text",
                new CodeSnippetExpression("responseMessage.Content.ReadAsStringAsync().Result")));
            var textReference = new CodeVariableReferenceExpression("text");
            if (IsStringType(returnType))
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("JsonConvert.DeserializeObject<string>(text)")));
            }
            else if (returnType == typeOfChar)
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("JsonConvert.DeserializeObject<char>(text)")));
            }
            else if (returnType.IsPrimitive)
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression(String.Format("{0}.Parse(text)", returnType.FullName))));
            }
            else if (returnType.IsGenericType)
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression(String.Format("JsonConvert.DeserializeObject<{0}>(text)", GetGenericTypeFriendlyName(returnType)))));
            }
            else if (IsComplexType(returnType))
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression(String.Format("JsonConvert.DeserializeObject<{0}>(text)", TranslateCustomTypeToClientType(returnType)))));
            }
            else
            {
                Trace.TraceWarning("This typ is not yet supported: {0}", returnType.FullName);
            }

        }

        Type typeOfString = typeof(string);
        bool IsSimpleType(Type type)
        {
            return type.IsPrimitive || type.Equals(typeOfString);
        }

        bool IsComplexType(Type type)
        {
            return !IsSimpleType(type);
        }

        bool IsStringType(Type type)
        {
            return type.Equals(typeOfString);
        }

        void RenderPostOrPutImplementation(bool isPost)
        {
            //Create function parameters in prototype
            var parameters = description.ParameterDescriptions.Select(d => new CodeParameterDeclarationExpression()
            {
                Name = d.Name,
                Type = new CodeTypeReference(TranslateCustomTypeToClientType(d.ParameterDescriptor.ParameterType)),

            }).ToArray();
            method.Parameters.AddRange(parameters);

            var uriQueryParameters = description.ParameterDescriptions.Where(d =>
                (!(d.ParameterDescriptor.ParameterBinderAttribute is FromBodyAttribute) && IsSimpleType(d.ParameterDescriptor.ParameterType))
                || (IsComplexType(d.ParameterDescriptor.ParameterType) && d.ParameterDescriptor.ParameterBinderAttribute is FromUriAttribute)
                || (d.ParameterDescriptor.ParameterType.IsValueType && d.ParameterDescriptor.ParameterBinderAttribute is FromUriAttribute)
                ).Select(d => new CodeParameterDeclarationExpression()
                {
                    Name = d.Name,
                    Type = new CodeTypeReference(TranslateCustomTypeToClientType(d.ParameterDescriptor.ParameterType)),
                }).ToArray();

            var fromBodyParameterDescriptions = description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinderAttribute is FromBodyAttribute
                || (IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinderAttribute is FromUriAttribute) || (d.ParameterDescriptor.ParameterBinderAttribute == null)))).ToArray();
            if (fromBodyParameterDescriptions.Length > 1)
            {
                throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", description.ActionDescriptor.ActionName));
            }
            var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

            Action AddRequestUriWithQueryAssignmentStatement = () =>
            {

                //Statement: ar template = new System.UriTemplate("api/UserManagement/Account");
                method.Statements.Add(new CodeVariableDeclarationStatement(
                    new CodeTypeReference("var"), "template",
                    new CodeObjectCreateExpression("System.UriTemplate", new CodePrimitiveExpression(description.RelativePath))
                ));
                var templateReference = new CodeVariableReferenceExpression("template");

                //Statement: var uriParameters = new System.Collections.Specialized.NameValueCollection();
                method.Statements.Add(new CodeVariableDeclarationStatement(
                    new CodeTypeReference("var"), "uriParameters",
                    new CodeObjectCreateExpression("System.Collections.Specialized.NameValueCollection")
                ));
                var uriParametersReference = new CodeVariableReferenceExpression("uriParameters");
                foreach (var p in uriQueryParameters)
                {
                    //Statement:             template.Add("id", id);
                    method.Statements.Add(new CodeMethodInvokeExpression(uriParametersReference, "Add",
                        new CodePrimitiveExpression(p.Name), new CodeSnippetExpression(p.Type.BaseType == "System.String" ? p.Name : p.Name + ".ToString()")));
                }

                //Statement: var requestUri = template.BindByName(this.baseUri, uriParameters);
                method.Statements.Add(new CodeVariableDeclarationStatement(
                    new CodeTypeReference("var"), "requestUri",
                    new CodeMethodInvokeExpression(new CodeVariableReferenceExpression("template"), "BindByName", sharedContext.baseUriReference, new CodeSnippetExpression("uriParameters"))));
            };

            Action AddRequestUriAssignmentStatement = () =>
            {
                method.Statements.Add(new CodeVariableDeclarationStatement(
                    new CodeTypeReference("var"), "requestUri",
                    new CodeObjectCreateExpression("System.Uri", sharedContext.baseUriReference, new CodePrimitiveExpression(description.RelativePath))));

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

                    AddPostStatement(new CodePropertyReferenceExpression(
                    new CodeMethodInvokeExpression(sharedContext.clientReference, isPost ? "PostAsJsonAsync" : "PutAsJsonAsync", new CodeSnippetExpression("requestUri.ToString()")
              , new CodeSnippetExpression(singleFromBodyParameterDescription.ParameterDescriptor.ParameterName))
                    , "Result"));
            }
            else
            {
                    AddPostStatement(new CodePropertyReferenceExpression(
                        new CodeMethodInvokeExpression(sharedContext.clientReference, isPost ? "PostAsync" : "PutAsync"
                        , new CodeSnippetExpression("requestUri.ToString()")
                        , new CodeSnippetExpression("new StringContent(String.Empty)"))
                        , "Result"));
            }

            ////Statement: var result = task.Result;
            //method.Statements.Add(new CodeVariableDeclarationStatement(
            //    new CodeTypeReference("var"), "result", new CodeSnippetExpression("task.Result")));
            var resultReference = new CodeVariableReferenceExpression("responseMessage");

            //Statement: result.EnsureSuccessStatusCode();
            method.Statements.Add(new CodeMethodInvokeExpression(resultReference, "EnsureSuccessStatusCode"));

            //Statement: return something;
            if (returnType != null)
            {
                AddReturnStatement();
            }

        }

    }

}
