using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Web.Http.Description;
using Fonlow.CodeDom.Web;
using Fonlow.Poco2Ts;
using System;
using Fonlow.Poco2Client;

namespace Fonlow.CodeDom.Web.Cs
{
    /// <summary>
    /// Generate .NET codes of the client API of the controllers
    /// </summary>
    public class ControllersClientApiGen : ControllersClientApiGenBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="excludedControllerNames">Excluse some Api Controllers from being exposed to the client API. Each item should be fully qualified class name but without the assembly name.</param>
        /// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
        public ControllersClientApiGen(CodeGenParameters codeGenParameters)
            :base(codeGenParameters)
        {
            poco2CsGen = new Poco2CsGen(targetUnit);
        }

        IPoco2Client poco2CsGen;

        /// <summary>
        /// Save C# codes into a file.
        /// </summary>
        /// <param name="fileName"></param>
        public override void Save(string fileName)
        {
            CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp");
            CodeGeneratorOptions options = new CodeGeneratorOptions();
            options.BracingStyle = "C";
            using (StreamWriter writer = new StreamWriter(fileName))
            {
                provider.GenerateCodeFromCompileUnit(targetUnit, writer, options);
            }
        }

        public bool ForBothAsyncAndSync { get; set; }


        void GenerateCsFromPoco()
        {
            if (codeGenParameters.DataModelAssemblyNames == null)
                return;

            var allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
            var assemblies = allAssemblies.Where(d => codeGenParameters.DataModelAssemblyNames.Any(k => k.Equals(d.GetName().Name, StringComparison.CurrentCultureIgnoreCase))).ToArray();
            var cherryPickingMethods = codeGenParameters.CherryPickingMethods.HasValue ? (CherryPickingMethods)codeGenParameters.CherryPickingMethods.Value : CherryPickingMethods.DataContract;
            foreach (var assembly in assemblies)
            {
                poco2CsGen.CreateCodeDom(assembly, cherryPickingMethods);
            }
        }


        /// <summary>
        /// Generate CodeDom of the client API for ApiDescriptions.
        /// </summary>
        /// <param name="descriptions">Web Api descriptions exposed by Configuration.Services.GetApiExplorer().ApiDescriptions</param>
        public override  void CreateCodeDom(Collection<ApiDescription> descriptions)
        {
            GenerateCsFromPoco();
            //controllers of ApiDescriptions (functions) grouped by namespace
            var controllersGroupByNamespace = descriptions.Select(d => d.ActionDescriptor.ControllerDescriptor).Distinct().GroupBy(d => d.ControllerType.Namespace);

            //Create client classes mapping to controller classes
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
                });

                newClassesCreated = grouppedControllerDescriptions.Select(d =>
                {
                    var controllerFullName = d.ControllerType.Namespace + "." + d.ControllerName;
                    if (codeGenParameters.ExcludedControllerNames != null && codeGenParameters.ExcludedControllerNames.Contains(controllerFullName))
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
                if (codeGenParameters.ExcludedControllerNames != null && codeGenParameters.ExcludedControllerNames.Contains(controllerFullName))
                    continue;

                var existingClientClass = LookupExistingClass(controllerNamespace, controllerName);
                System.Diagnostics.Trace.Assert(existingClientClass != null);

                var apiFunction = ClientApiFunctionGen.Create(sharedContext, d, poco2CsGen, true);
                existingClientClass.Members.Add(apiFunction);
                if (ForBothAsyncAndSync)
                {
                    existingClientClass.Members.Add(ClientApiFunctionGen.Create(sharedContext, d, poco2CsGen, false));
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


        static void AddLocalFields(CodeTypeDeclaration targetClass)
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

            constructor.Statements.Add(new CodeSnippetStatement(@"            if (client == null)
                throw new ArgumentNullException(""client"", ""Null HttpClient."");
"));
            constructor.Statements.Add(new CodeSnippetStatement(@"            if (baseUri == null)
                throw new ArgumentNullException(""baseUri"", ""Null baseUri"");
"));
            // Add field initialization logic
            sharedContext.clientReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "client");
            constructor.Statements.Add(new CodeAssignStatement(sharedContext.clientReference, new CodeArgumentReferenceExpression("client")));
            sharedContext.baseUriReference = new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "baseUri");
            constructor.Statements.Add(new CodeAssignStatement(sharedContext.baseUriReference, new CodeArgumentReferenceExpression("baseUri")));
            targetClass.Members.Add(constructor);
        }

    }


}
