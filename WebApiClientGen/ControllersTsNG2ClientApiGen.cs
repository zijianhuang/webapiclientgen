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
    /// Generate Angular 2 TypeScript codes of the client API of the controllers
    /// </summary>
    public class ControllersTsNG2ClientApiGen : ControllersTsClientApiGenBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="excludedControllerNames">Excluse some Api Controllers from being exposed to the client API. Each item should be fully qualified class name but without the assembly name.</param>
        /// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
        public ControllersTsNG2ClientApiGen(JSOutput jsOutput) : base(jsOutput)
        {
            apiFunctionGen = new ClientApiTsNG2FunctionGen();
        }

        protected override void AddBasicReferences()
        {
            targetUnit.ReferencedAssemblies.Add("import { Injectable }    from '@angular/core'");
            targetUnit.ReferencedAssemblies.Add("import { Http, Headers } from '@angular/http'");
            targetUnit.ReferencedAssemblies.Add("import 'rxjs/add/operator/toPromise'");
        }


        protected override void AddLocalFields(CodeTypeDeclaration targetClass)
        {
            //do nothing
        }

        protected override void AddConstructor(CodeTypeDeclaration targetClass)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes =
                MemberAttributes.Public | MemberAttributes.Final;

            // Add parameters.
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'", "private baseUri"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "Http", "private http"));

            targetClass.Members.Add(constructor);
        }

        protected override CodeAttributeDeclarationCollection CreateClassCustomAttributes()
        {
            return new CodeAttributeDeclarationCollection(new CodeAttributeDeclaration[] { new CodeAttributeDeclaration("Injectable") });
        }

        protected override void AddHelperFunctionsInClass(CodeTypeDeclaration c)
        {
            var handleErrorMethod = new CodeMemberMethod()
            {
                Attributes = MemberAttributes.Private | MemberAttributes.Final,
                Name = "handleError",
               // ReturnType = new CodeSnipetTypeReference("Promise<void>"),
            };

            handleErrorMethod.Parameters.Add(new CodeParameterDeclarationExpression("any", "error"));
            handleErrorMethod.Statements.Add(new CodeSnippetStatement("return Promise.reject(error.message || error)"));
            c.Members.Add(handleErrorMethod);
        }
    }


}
