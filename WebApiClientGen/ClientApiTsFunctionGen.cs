using System;
using System.CodeDom;
using System.Linq;
using System.Collections.ObjectModel;
using System.Collections.Generic;

using System.Web.Http;
using System.Web.Http.Description;
using System.Diagnostics;
using System.Text;
using Fonlow.TypeScriptCodeDom;
using Fonlow.Poco2Ts;

namespace Fonlow.CodeDom.Web.Ts
{
    /// <summary>
    /// Generate a client function upon ApiDescription
    /// </summary>
    internal class ClientApiTsFunctionGen
    {
   //     SharedContext sharedContext;
        ApiDescription description;
        string methodName;
        Type returnType;
        CodeMemberMethod method;
        readonly Poco2TsGen poco2TsGen;

        public ClientApiTsFunctionGen(ApiDescription description, Poco2TsGen poco2TsGen)
        {
            this.description = description;
         //   this.sharedContext = sharedContext;
            this.poco2TsGen = poco2TsGen;

            methodName = description.ActionDescriptor.ActionName;
            if (methodName.EndsWith("Async"))
                methodName = methodName.Substring(0, methodName.Length - 5);//HTTP does not care about the server side async.

            returnType = description.ActionDescriptor.ReturnType;

        }

        static readonly Type typeOfString = typeof(string);

        public static CodeMemberMethod Create(ApiDescription description, Poco2TsGen poco2TsGen)
        {
            var gen = new ClientApiTsFunctionGen(description, poco2TsGen);
            return gen.CreateApiFunction();
        }

        public CodeMemberMethod CreateApiFunction()
        {
            //create method
            method = CreateMethodName();

            CreateDocComments();

            switch (description.HttpMethod.Method)
            {
                case "GET":
                case "DELETE":
                case "POST":
                case "PUT":
                    RenderImplementation();
                    break;
                default:
                    Trace.TraceWarning("This HTTP method {0} is not yet supported", description.HttpMethod.Method);
                    break;
            }

            return method;
        }

        void CreateDocComments()
        {
            StringBuilder builder = new StringBuilder();
            builder.AppendLine(description.Documentation);
            builder.AppendLine(description.HttpMethod.Method + " " + description.RelativePath);
            foreach (var item in description.ParameterDescriptions)
            {
                var tsParameterType = poco2TsGen.TranslateToTsTypeReference(item.ParameterDescriptor.ParameterType);
                builder.AppendLine($"@param {{{TypeMapper.MapCodeTypeReferenceToTsText(tsParameterType)}}} {item.Name} {item.Documentation}");
            }

            Type responseType = description.ResponseDescription.ResponseType ?? description.ResponseDescription.DeclaredType;
            var tsResponseType = poco2TsGen.TranslateToTsTypeReference(responseType);
            var returnTypeOfResponse = responseType == null ? "void" : TypeMapper.MapCodeTypeReferenceToTsText(tsResponseType);
            builder.AppendLine($"@return {{{returnTypeOfResponse}}} {description.ResponseDescription.Documentation}");
            method.Comments.Add(new CodeCommentStatement(builder.ToString(), true));
        }


        CodeMemberMethod CreateMethodName()
        {
            return new CodeMemberMethod()
            {
                Attributes = MemberAttributes.Public | MemberAttributes.Final,
                Name = methodName,
            };
        }


        //static bool IsClassOrStruct(Type type)
        //{
        //    return type.IsClass || (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
        //}

        void RenderImplementation()
        {
            var httpMethod = description.HttpMethod.Method.ToLower(); //Method is always uppercase.
            var parameters = description.ParameterDescriptions.Select(d => new CodeParameterDeclarationExpression()
            {
                Name = d.Name,
                Type = IsFromBodySimpleType(d) ? CreateCodeTypeReferenceForFromBodySimpleType(d.ParameterDescriptor.ParameterType)
                    : poco2TsGen.TranslateToTsTypeReference(d.ParameterDescriptor.ParameterType),

            }).ToList();

            var parameterType = poco2TsGen.TranslateToTsTypeReference(returnType);
            var callbackTypeText = $"(data : {TypeMapper.MapCodeTypeReferenceToTsText(parameterType)}) => any";
            parameters.Add(new CodeParameterDeclarationExpression()
            {
                Name = "callback",
                Type = new CodeTypeReference(callbackTypeText),
            });

            method.Parameters.AddRange(parameters.ToArray());

            var jsUriQuery = CreateUriQuery(description.RelativePath, description.ParameterDescriptions);
            var uriText = jsUriQuery == null ? $"encodeURI(this.baseUri + '{description.RelativePath}')" :
                RemoveTrialEmptyString($"encodeURI(this.baseUri + '{jsUriQuery}')");

            if (httpMethod == "get" || httpMethod == "delete")
            {
                method.Statements.Add(new CodeSnippetStatement($"this.httpClient.{httpMethod}({uriText}, callback, this.error, this.statusCode);"));
                return;
            }

            if (httpMethod == "post" || httpMethod == "put")
            {
                var fromBodyParameterDescriptions = description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinderAttribute is FromBodyAttribute
                    || (IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinderAttribute is FromUriAttribute)
                    || (d.ParameterDescriptor.ParameterBinderAttribute == null)))).ToArray();
                if (fromBodyParameterDescriptions.Length > 1)
                {
                    throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", description.ActionDescriptor.ActionName));
                }
                var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

                var dataToPost = singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;

                method.Statements.Add(new CodeSnippetStatement($"this.httpClient.{httpMethod}({uriText}, {dataToPost}, callback, this.error, this.statusCode);"));
                return;
            }

            Debug.Assert(false, "How come?");
        }

        static CodeTypeReference CreateCodeTypeReferenceForFromBodySimpleType(Type t)
        {
            var typeText = TypeMapper.MapToTsBasicType(t);
            return new CodeTypeReference($"{{'':{typeText}}}");
        }

        static bool IsFromBodySimpleType(ApiParameterDescription d)
        {
            return IsSimpleType(d.ParameterDescriptor.ParameterType) && (d.ParameterDescriptor.ParameterBinderAttribute is FromBodyAttribute);
        }

        static string RemoveTrialEmptyString(string s)
        {
            var p = s.IndexOf("+''");
            return s.Remove(p, 3);
        }


        static string CreateUriQuery(string uriText, Collection<ApiParameterDescription> parameterDescriptions)
        {
            var template = new UriTemplate(uriText);

            if (template.QueryValueVariableNames.Count == 0 && template.PathSegmentVariableNames.Count == 0)
                return null;

            string newUriText = uriText;

            for (int i = 0; i < template.PathSegmentVariableNames.Count; i++)
            {
                var name = template.PathSegmentVariableNames[i];//PathSegmentVariableNames[i] always give uppercase
                var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
                Debug.Assert(d != null);
                newUriText = newUriText.Replace($"{{{d.Name}}}", $"'+{d.Name}+'");
            }

            for (int i = 0; i < template.QueryValueVariableNames.Count; i++)
            {
                var name = template.QueryValueVariableNames[i];
                var d = parameterDescriptions.FirstOrDefault(r => r.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
                Debug.Assert(d != null);
                newUriText = newUriText.Replace($"{{{d.Name}}}", $"'+{d.Name}+'");
            }

            return newUriText;
        }

        static bool IsSimpleType(Type type)
        {
            return type.IsPrimitive || type.Equals(typeOfString);
        }

        static bool IsComplexType(Type type)
        {
            return !IsSimpleType(type);
        }


    }

}
