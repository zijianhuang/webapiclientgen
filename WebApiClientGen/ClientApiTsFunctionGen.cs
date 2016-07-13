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
    public class ClientApiTsFunctionGen : ClientApiTsFunctionGenBase
    {

        public ClientApiTsFunctionGen() : base()
        {
            
        }

        protected override CodeMemberMethod CreateMethodName()
        {
            return new CodeMemberMethod()
            {
                Attributes = MemberAttributes.Public | MemberAttributes.Final,
                Name = NethodName,
            };
        }

        protected override void RenderImplementation()
        {
            var httpMethod = Description.HttpMethod.ToLower(); //Method is always uppercase.
            //deal with parameters
            var parameters = Description.ParameterDescriptions.Select(d =>
                 new CodeParameterDeclarationExpression(Poco2TsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType), d.Name)
            ).ToList();

            var returnTypeReference = Poco2TsGen.TranslateToClientTypeReference(ReturnType);
            var callbackTypeText = String.Format("(data : {0}) => any", TypeMapper.MapCodeTypeReferenceToTsText(returnTypeReference));
            Debug.WriteLine("callback: " + callbackTypeText);
            var callbackTypeReference = new CodeSnipetTypeReference(callbackTypeText);
            parameters.Add(new CodeParameterDeclarationExpression(callbackTypeReference, "callback"));

            Method.Parameters.AddRange(parameters.ToArray());

            var jsUriQuery = CreateUriQuery(Description.RelativePath, Description.ParameterDescriptions);
            var uriText = jsUriQuery == null ? $"this.baseUri + '{Description.RelativePath}'" :
                RemoveTrialEmptyString($"this.baseUri + '{jsUriQuery}'");

            if (httpMethod == "get" || httpMethod == "delete")
            {
                Method.Statements.Add(new CodeSnippetStatement($"this.httpClient.{httpMethod}({uriText}, callback, this.error, this.statusCode);"));
                return;
            }

            if (httpMethod == "post" || httpMethod == "put")
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

                Method.Statements.Add(new CodeSnippetStatement($"this.httpClient.{httpMethod}({uriText}, {dataToPost}, callback, this.error, this.statusCode);"));
                return;
            }

            Debug.Assert(false, "How come?");
        }



    }

}
