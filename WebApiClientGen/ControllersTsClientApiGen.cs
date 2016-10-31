using Fonlow.Poco2Client;
using Fonlow.Poco2Ts;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Reflection;
using Fonlow.Web.Meta;

namespace Fonlow.CodeDom.Web.Ts
{
    /// <summary>
    /// Generate TypeScript codes of the client API of the controllers
    /// </summary>
    public class ControllersTsClientApiGen : ControllersTsClientApiGenBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="excludedControllerNames">Excluse some Api Controllers from being exposed to the client API. Each item should be fully qualified class name but without the assembly name.</param>
        /// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
        public ControllersTsClientApiGen(JSOutput jsOutput) : base(jsOutput, new ClientApiTsFunctionGen())
        {
        }

        protected override void AddBasicReferences()
        {
            TargetUnit.ReferencedAssemblies.Add("///<reference path=\"../typings/jquery/jquery.d.ts\" />");
            TargetUnit.ReferencedAssemblies.Add("///<reference path=\"HttpClient.ts\" />");
        }


        protected override void AddLocalFields(CodeTypeDeclaration targetClass)
        {
            //CodeMemberField clientField = new CodeMemberField();
            //clientField.Attributes = MemberAttributes.Private;
            //clientField.Name = "httpClient";
            //clientField.Type = new CodeTypeReference("HttpClient");
            //targetClass.Members.Add(clientField);
        }

        protected override void AddConstructor(CodeTypeDeclaration targetClass)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes =
                MemberAttributes.Public | MemberAttributes.Final;

            // Add parameters.
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "string = HttpClient.locationOrigin", "private baseUri"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "HttpClientBase = new HttpClient()", "private httpClient"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "(xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any", "private error?"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression("{ [key: string]: any; }", "private statusCode?"));

            targetClass.Members.Add(constructor);
        }

    }


}
