using System;
using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;

using System.Web.Http;
using System.Web.Http.Description;
using System.Diagnostics;

namespace Fonlow.Net.Http
{
    /// <summary>
    /// Generate .NET codes of the client API of the controllers
    /// </summary>
    public class ControllersClientApiGen
    {
        CodeCompileUnit targetUnit;
        Dictionary<string, object> apiClassesDic;
        CodeTypeDeclaration[] newClassesCreated;
        //  string[] prefixesOfCustomNamespaces;
        SharedContext sharedContext;
        string[] excludedControllerNames;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="prefixesOfCustomNamespaces">Prefixes of namespaces of custom complex data types, so the code gen will use .client of client data types.</param>
        /// <param name="excludedControllerNames">Excluse some Api Controllers from being exposed to the client API. Each item should be fully qualified class name but without the assembly name.</param>
        /// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
        public ControllersClientApiGen(string[] prefixesOfCustomNamespaces, string[] excludedControllerNames = null)
        {
            sharedContext = new SharedContext();
            sharedContext.prefixesOfCustomNamespaces = prefixesOfCustomNamespaces == null ? new string[] { } : prefixesOfCustomNamespaces;
            targetUnit = new CodeCompileUnit();
            apiClassesDic = new Dictionary<string, object>();
            this.excludedControllerNames = excludedControllerNames;
        }

        /// <summary>
        /// Save C# codes into a file.
        /// </summary>
        /// <param name="fileName"></param>
        public void SaveCSharpCode(string fileName)
        {
            CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp");
            CodeGeneratorOptions options = new CodeGeneratorOptions();
            options.BracingStyle = "C";
            using (StreamWriter sourceWriter = new StreamWriter(fileName))
            {
                provider.GenerateCodeFromCompileUnit(targetUnit, sourceWriter, options);
            }
        }

        /// <summary>
        /// Generate CodeDom of the client API for ApiDescriptions.
        /// </summary>
        /// <param name="descriptions">Web Api descriptions exposed by Configuration.Services.GetApiExplorer().ApiDescriptions</param>
        public void Generate(Collection<ApiDescription> descriptions, bool forBothAsyncAndSync = false)
        {
            var controllersGroupByNamespace = descriptions.Select(d => d.ActionDescriptor.ControllerDescriptor).Distinct().GroupBy(d => d.ControllerType.Namespace);
            foreach (var grouppedControllerDescriptions in controllersGroupByNamespace)
            {
                var clientNamespaceText = grouppedControllerDescriptions.Key + ".Client";
                var clientNamespace = new CodeNamespace(clientNamespaceText);
                targetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

                clientNamespace.Imports.AddRange(new CodeNamespaceImport[]{
                new CodeNamespaceImport("System"),
                new CodeNamespaceImport("System.Collections.Generic"),
                new CodeNamespaceImport("System.Threading.Tasks"),
                new CodeNamespaceImport("System.Net.Http"),
                new CodeNamespaceImport("Newtonsoft.Json"),
                new CodeNamespaceImport("System.Net"),

                });

                newClassesCreated = grouppedControllerDescriptions.Select(d =>
                {
                    var controllerFullName = d.ControllerType.Namespace + "." + d.ControllerName;
                    if (excludedControllerNames != null && excludedControllerNames.Contains(controllerFullName))
                        return null;

                    return CreateControllerClientClass(clientNamespace, d.ControllerName);
                }
                    ).ToArray();//add classes into the namespace
            }

            foreach (var d in descriptions)
            {
                var controllerNamespace = d.ActionDescriptor.ControllerDescriptor.ControllerType.Namespace;
                var controllerName = d.ActionDescriptor.ControllerDescriptor.ControllerName;
                var controllerFullName = controllerNamespace + "." + controllerName;
                if (excludedControllerNames != null && excludedControllerNames.Contains(controllerFullName))
                    continue;

                var existingClientClass = LookupExistingClass(controllerNamespace, controllerName);
                System.Diagnostics.Trace.Assert(existingClientClass != null);

                var apiFunction = ClientApiFunctionGen.Create(sharedContext, d, true);
                existingClientClass.Members.Add(apiFunction);
                if (forBothAsyncAndSync)
                {
                    existingClientClass.Members.Add(ClientApiFunctionGen.Create(sharedContext, d, false));
                }
            }

        }

        /// <summary>
        /// Lookup existing CodeTypeDeclaration created.
        /// </summary>
        /// <param name="namespaceText"></param>
        /// <param name="controllerName"></param>
        /// <returns></returns>
        CodeTypeDeclaration LookupExistingClass(string namespaceText, string controllerName)
        {
            for (int i = 0; i < targetUnit.Namespaces.Count; i++)
            {
                var ns = targetUnit.Namespaces[i];
                if (ns.Name == namespaceText + ".Client")
                {
                    for (int k = 0; k < ns.Types.Count; k++)
                    {
                        var c = ns.Types[k];
                        if (c.Name == controllerName)
                            return c;
                    }
                }
            }

            return null;
        }

        CodeTypeDeclaration CreateControllerClientClass(CodeNamespace ns, string className)
        {
            var targetClass = new CodeTypeDeclaration(className)
            {
                IsClass = true,
                IsPartial = true,
                TypeAttributes = TypeAttributes.Public,
            };

            ns.Types.Add(targetClass);
            AddLocalFields(targetClass);
            AddConstructor(targetClass);

            return targetClass;
        }


        void AddLocalFields(CodeTypeDeclaration targetClass)
        {
            CodeMemberField clientField = new CodeMemberField();
            clientField.Attributes = MemberAttributes.Private;
            clientField.Name = "client";
            clientField.Type = new CodeTypeReference("System.Net.Http.HttpClient");
            targetClass.Members.Add(clientField);

            CodeMemberField baseUriField = new CodeMemberField();
            baseUriField.Attributes = MemberAttributes.Private;
            baseUriField.Name = "baseUri";
            baseUriField.Type = new CodeTypeReference("System.Uri");
            targetClass.Members.Add(baseUriField);

        }

        void AddConstructor(CodeTypeDeclaration targetClass)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes =
                MemberAttributes.Public | MemberAttributes.Final;

            // Add parameters.
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "System.Net.Http.HttpClient", "client"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "System.Uri", "baseUri"));

            // Add field initialization logic
            sharedContext.clientReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "client");
            constructor.Statements.Add(new CodeAssignStatement(sharedContext.clientReference, new CodeArgumentReferenceExpression("client")));
            sharedContext.baseUriReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "baseUri");
            constructor.Statements.Add(new CodeAssignStatement(sharedContext.baseUriReference, new CodeArgumentReferenceExpression("baseUri")));
            targetClass.Members.Add(constructor);
        }

    }

    /// <summary>
    /// Store CodeDom references shared by all functions of the client API class.
    /// </summary>
    internal class SharedContext
    {
        public CodeFieldReferenceExpression clientReference { get; set; }
        public string[] prefixesOfCustomNamespaces { get; set; }
        public CodeFieldReferenceExpression baseUriReference { get; set; }
    }

    /// <summary>
    /// Generate a client function upon ApiDescription
    /// </summary>
    internal class ClientApiFunctionGen
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

        bool forAsync;

        public ClientApiFunctionGen(SharedContext sharedContext, ApiDescription description)
        {
            this.description = description;
            this.sharedContext = sharedContext;

            relativePath = description.RelativePath;
            //   route = description.Route;
            parameterDescriptions = description.ParameterDescriptions;
            controllerName = description.ActionDescriptor.ControllerDescriptor.ControllerName;


            methodName = description.ActionDescriptor.ActionName;
            if (methodName.EndsWith("Async"))
                methodName = methodName.Substring(0, methodName.Length - 5);

            returnType = description.ActionDescriptor.ReturnType;

        }

        static readonly Type typeOfHttpActionResult = typeof(System.Web.Http.IHttpActionResult);
        static readonly Type typeOfChar = typeof(char);

        public static CodeMemberMethod Create(SharedContext sharedContext, ApiDescription description, bool forAsync = false)
        {
            var gen = new ClientApiFunctionGen(sharedContext, description);
            return gen.CreateApiFunction(forAsync);
        }

        public CodeMemberMethod CreateApiFunction(bool forAsync = false)
        {
            this.forAsync = forAsync;
            //create method
            method = forAsync ? CreateMethodBasicForAsync() : CreateMethodBasic();

            var returnTypeReference = method.ReturnType;

            CreateDocComments();


            var binderAttributes = description.ParameterDescriptions.Select(d => d.ParameterDescriptor.ParameterBinderAttribute).ToArray();

            switch (description.HttpMethod.Method)
            {
                case "GET":
                    if (forAsync)
                    {
                        RenderGetOrDeleteImplementation(
                            new CodeMethodInvokeExpression(new CodeSnippetExpression("await " + sharedContext.clientReference.FieldName), "GetAsync", new CodeSnippetExpression("requestUri.ToString()")));
                    }
                    else
                    {
                        RenderGetOrDeleteImplementation(
                            new CodePropertyReferenceExpression(
                            new CodeMethodInvokeExpression(sharedContext.clientReference, "GetAsync", new CodeSnippetExpression("requestUri.ToString()")), "Result"));
                    }
                    break;
                case "DELETE":
                    if (forAsync)
                    {
                        RenderGetOrDeleteImplementation(
                            new CodeMethodInvokeExpression(new CodeSnippetExpression("await " + sharedContext.clientReference.FieldName), "DeleteAsync", new CodeSnippetExpression("requestUri.ToString()")));
                    }
                    else
                    {
                        RenderGetOrDeleteImplementation(
                            new CodePropertyReferenceExpression(
                            new CodeMethodInvokeExpression(sharedContext.clientReference, "DeleteAsync", new CodeSnippetExpression("requestUri.ToString()"))
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

        CodeMemberMethod CreateMethodBasicForAsync()
        {
            return new CodeMemberMethod()
            {
                Attributes = MemberAttributes.Public | MemberAttributes.Final,
                Name = methodName + "Async",
                ReturnType = returnType == null ? new CodeTypeReference("async Task")
                : new CodeTypeReference(String.Format("async Task<{0}>", returnType.IsGenericType ? GetGenericTypeFriendlyName(returnType) : TranslateCustomTypeToClientType(returnType))),
            };
        }

        void CreateDocComments()
        {
            Action<string, string> CreateDocComment = (elementName, doc) =>
            {
                if (String.IsNullOrWhiteSpace(doc))
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
            method.Comments.Add(new CodeCommentStatement(description.Documentation, true));
            method.Comments.Add(new CodeCommentStatement(description.HttpMethod.Method + " " + description.RelativePath, true));
            method.Comments.Add(new CodeCommentStatement("</summary>", true));
            foreach (var item in description.ParameterDescriptions)
            {
                CreateParamDocComment(item.Name, item.Documentation);
            }
            CreateDocComment("returns", description.ResponseDescription.Documentation);
        }

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
                new CodeSnippetExpression(forAsync ? "await responseMessage.Content.ReadAsStringAsync()" : "responseMessage.Content.ReadAsStringAsync().Result")));
            var textReference = new CodeVariableReferenceExpression("text");
            if (IsStringType(returnType))
            {
                method.Statements.Add(new CodeMethodReturnStatement(new CodeSnippetExpression("JsonConvert.DeserializeObject<string>(text)")));
            }
            else if (returnType==typeOfChar)
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
                if (forAsync)
                {
                    AddPostStatement(
                    new CodeMethodInvokeExpression(new CodeSnippetExpression("await " + sharedContext.clientReference.FieldName), isPost ? "PostAsJsonAsync" : "PutAsJsonAsync", new CodeSnippetExpression("requestUri.ToString()")
              , new CodeSnippetExpression(singleFromBodyParameterDescription.ParameterDescriptor.ParameterName)));
                }
                else
                {
                    AddPostStatement(new CodePropertyReferenceExpression(
                    new CodeMethodInvokeExpression(sharedContext.clientReference, isPost ? "PostAsJsonAsync" : "PutAsJsonAsync", new CodeSnippetExpression("requestUri.ToString()")
              , new CodeSnippetExpression(singleFromBodyParameterDescription.ParameterDescriptor.ParameterName))
                    , "Result"));
                }
            }
            else
            {
                if (forAsync)
                {
                    AddPostStatement(
                        new CodeMethodInvokeExpression(new CodeSnippetExpression("await " + sharedContext.clientReference.FieldName), isPost ? "PostAsync" : "PutAsync"
                        , new CodeSnippetExpression("requestUri.ToString()")
                        , new CodeSnippetExpression("new StringContent(String.Empty)")));
                }
                else
                {
                    AddPostStatement(new CodePropertyReferenceExpression(
                        new CodeMethodInvokeExpression(sharedContext.clientReference, isPost ? "PostAsync" : "PutAsync"
                        , new CodeSnippetExpression("requestUri.ToString()")
                        , new CodeSnippetExpression("new StringContent(String.Empty)"))
                        , "Result"));
                }

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
