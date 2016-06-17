using System;
using System.CodeDom;
using System.Linq;
using System.Collections.ObjectModel;
using System.Collections.Generic;

using System.Diagnostics;
using System.Text;
using Fonlow.TypeScriptCodeDom;
using Fonlow.Poco2Ts;
using Fonlow.Reflection;
using Fonlow.Web.Meta;

namespace Fonlow.CodeDom.Web.Ts
{
    /// <summary>
    /// Generate a client function upon ApiDescription
    /// </summary>
    public abstract class ClientApiTsFunctionGenBase
    {
        protected WebApiDescription description;
        protected string methodName;
        protected Type returnType;
        protected CodeMemberMethod method;
        protected Fonlow.Poco2Client.IPoco2Client poco2TsGen;


        protected ClientApiTsFunctionGenBase()
        {

        }

        static string SetCamelCase(string s)
        {
            return Char.ToLower(s[0]) + s.Substring(1, s.Length - 1);
        }


        public CodeMemberMethod CreateApiFunction(WebApiDescription description, Fonlow.Poco2Client.IPoco2Client poco2TsGen)
        {
            this.description = description;
            this.poco2TsGen = poco2TsGen;

            methodName = TsCodeGenerationOptions.Instance.CamelCase ? SetCamelCase(description.ActionDescriptor.ActionName) : description.ActionDescriptor.ActionName;
            if (methodName.EndsWith("Async"))
                methodName = methodName.Substring(0, methodName.Length - 5);//HTTP does not care about the server side async.

            returnType = description.ActionDescriptor.ReturnType;

            //create method
            method = CreateMethodName();

            CreateDocComments();

            switch (description.HttpMethod)
            {
                case "GET":
                case "DELETE":
                case "POST":
                case "PUT":
                    RenderImplementation();
                    break;
                default:
                    Trace.TraceWarning("This HTTP method {0} is not yet supported", description.HttpMethod);
                    break;
            }

            return method;
        }

        void CreateDocComments()
        {
            StringBuilder builder = new StringBuilder();
            builder.AppendLine(description.Documentation);
            builder.AppendLine(description.HttpMethod + " " + description.RelativePath);
            foreach (var item in description.ParameterDescriptions)
            {
                var tsParameterType = poco2TsGen.TranslateToClientTypeReference(item.ParameterDescriptor.ParameterType);
                builder.AppendLine($"@param {{{TypeMapper.MapCodeTypeReferenceToTsText(tsParameterType)}}} {item.Name} {item.Documentation}");
            }

            Type responseType = description.ResponseDescription.ResponseType ?? description.ResponseDescription.DeclaredType;
            var tsResponseType = poco2TsGen.TranslateToClientTypeReference(responseType);
            var returnTypeOfResponse = responseType == null ? "void" : TypeMapper.MapCodeTypeReferenceToTsText(tsResponseType);
            builder.AppendLine($"@return {{{returnTypeOfResponse}}} {description.ResponseDescription.Documentation}");
            method.Comments.Add(new CodeCommentStatement(builder.ToString(), true));
        }

        protected static string RemoveTrialEmptyString(string s)
        {
            var p = s.IndexOf("+''");
            return s.Remove(p, 3);
        }


        protected static string CreateUriQuery(string uriText, ParameterDescription[] parameterDescriptions)
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


        protected abstract CodeMemberMethod CreateMethodName();


        protected abstract void RenderImplementation();



    }

}
