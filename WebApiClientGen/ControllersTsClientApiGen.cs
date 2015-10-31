using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Web.Http.Description;
using Fonlow.TypeScriptCodeDom;

namespace Fonlow.CodeDom.Web.Ts
{
    /// <summary>
    /// Generate .NET codes of the client API of the controllers
    /// </summary>
    public class ControllersTsClientApiGen : ControllersClientApiGenBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="prefixesOfCustomNamespaces">Prefixes of namespaces of custom complex data types, so the code gen will use .client of client data types.</param>
        /// <param name="excludedControllerNames">Excluse some Api Controllers from being exposed to the client API. Each item should be fully qualified class name but without the assembly name.</param>
        /// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
        public ControllersTsClientApiGen(string[] prefixesOfCustomNamespaces, string[] excludedControllerNames = null, string[] dataModelNamespaces=null)
            :base(prefixesOfCustomNamespaces, excludedControllerNames)
        {
            this.dataModelNamespaces = dataModelNamespaces;
        }

        string[] dataModelNamespaces;

        /// <summary>
        /// Save C# codes into a file.
        /// </summary>
        /// <param name="fileName"></param>
        public override void Save(string fileName)
        {
            var provider = new TypeScriptCodeProvider();
            //   var provider = CodeDomProvider.CreateProvider("CSharp");
            CodeGeneratorOptions options = new CodeGeneratorOptions()
            {
                BracingStyle = "JS",//not yet working
                IndentString = "    ",
            };
            using (StreamWriter writer = new StreamWriter(fileName))
            {
                provider.GenerateCodeFromCompileUnit(targetUnit, writer, options);
            }
        }

        /// <summary>
        /// Generate CodeDom of the client API for ApiDescriptions.
        /// </summary>
        /// <param name="descriptions">Web Api descriptions exposed by Configuration.Services.GetApiExplorer().ApiDescriptions</param>
        public override  void Generate(Collection<ApiDescription> descriptions)
        {
            //controllers of ApiDescriptions (functions) grouped by namespace
            var controllersGroupByNamespace = descriptions.Select(d => d.ActionDescriptor.ControllerDescriptor).Distinct().GroupBy(d => d.ControllerType.Namespace);

            //Create client classes mapping to controller classes
            foreach (var grouppedControllerDescriptions in controllersGroupByNamespace)
            {
                var clientNamespaceText = (grouppedControllerDescriptions.Key + ".Client").Replace('.', '_');
                var clientNamespace = new CodeNamespace(clientNamespaceText);
                //if (dataModelNamespaces != null)
                //{
                //    var dataModeNamespaceImports = dataModelNamespaces.Select(d => new CodeNamespaceImport(d)).ToArray();
                //    clientNamespace.Imports.AddRange(dataModeNamespaceImports);
                //}

                targetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

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

                var apiFunction = ClientApiTsFunctionGen.Create(sharedContext, d);
                existingClientClass.Members.Add(apiFunction);
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
            var refined = (namespaceText + ".Client").Replace('.', '_');
            for (int i = 0; i < targetUnit.Namespaces.Count; i++)
            {
                var ns = targetUnit.Namespaces[i];
                if (ns.Name == refined)
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
            clientField.Name = "httpClient";
            clientField.Type = new CodeTypeReference("HttpClient");
            targetClass.Members.Add(clientField);

            var errorHandlerField = new CodeMemberField()
            {
                Attributes = MemberAttributes.Private,
                Name = "error",
                Type = new CodeTypeReference("(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => any"),
            };
            targetClass.Members.Add(errorHandlerField);

            var statusCodeField = new CodeMemberField()
            {
                Attributes = MemberAttributes.Private,
                Name = "statusCode",
                Type = new CodeTypeReference("{ [key: string]: any; }"),
            };
            targetClass.Members.Add(statusCodeField);

        }

        void AddConstructor(CodeTypeDeclaration targetClass)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes =
                MemberAttributes.Public | MemberAttributes.Final;

            // Add parameters.
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                " (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any", "error?"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "{ [key: string]: any; }", "statusCode?"));

            constructor.Statements.Add(new CodeSnippetStatement(
@"this.httpClient = new HttpClient();
this.error = error;
this.statusCode = statusCode;"));
            
            // Add field initialization logic
            sharedContext.clientReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "client");//todo: remove
        //    constructor.Statements.Add(new CodeAssignStatement(sharedContext.clientReference, new CodeArgumentReferenceExpression("client")));
            sharedContext.baseUriReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "baseUri");//todo: remove
        //    constructor.Statements.Add(new CodeAssignStatement(sharedContext.baseUriReference, new CodeArgumentReferenceExpression("baseUri")));
            targetClass.Members.Add(constructor);
        }

    }


}
