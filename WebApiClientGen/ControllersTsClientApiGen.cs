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
    /// Generate .NET codes of the client API of the controllers
    /// </summary>
    public class ControllersTsClientApiGen 
    {
        CodeCompileUnit targetUnit { get; set; }
        CodeGenParameters codeGenParameters { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="excludedControllerNames">Excluse some Api Controllers from being exposed to the client API. Each item should be fully qualified class name but without the assembly name.</param>
        /// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
        public ControllersTsClientApiGen(CodeGenParameters codeGenParameters)
        {
            if (codeGenParameters == null)
                throw new ArgumentNullException("codeGenParameters");

            this.codeGenParameters = codeGenParameters;
            targetUnit = new CodeCompileUnit();
            poco2TsGen = new Poco2TsGen(targetUnit);
        }

        IPoco2Client poco2TsGen;

        /// <summary>
        /// Save C# codes into a file.
        /// </summary>
        /// <param name="fileName"></param>
        public void Save(string fileName)
        {
            var provider = new TypeScriptCodeProvider();
            //   var provider = CodeDomProvider.CreateProvider("CSharp");
            CodeGeneratorOptions options = new CodeGeneratorOptions()
            {
                BracingStyle = "JS",
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
        public void CreateCodeDom(WebApiDescription[] descriptions)
        {
            if (descriptions==null)
            {
                throw new ArgumentNullException("descriptions");
            }

            AddBasicReferences();

            GenerateTsFromPoco();

            //controllers of ApiDescriptions (functions) grouped by namespace
            var controllersGroupByNamespace = descriptions.Select(d => d.ActionDescriptor.ControllerDescriptor).Distinct().GroupBy(d => d.ControllerType.Namespace);

            //Create client classes mapping to controller classes
            foreach (var grouppedControllerDescriptions in controllersGroupByNamespace)
            {
                var clientNamespaceText = (grouppedControllerDescriptions.Key + ".Client").Replace('.', '_');
                var clientNamespace = new CodeNamespace(clientNamespaceText);

                targetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

                var newClassesCreated = grouppedControllerDescriptions.Select(d =>
                {
                    var controllerFullName = d.ControllerType.Namespace + "." + d.ControllerName;
                    if (codeGenParameters.ExcludedControllerNames != null && codeGenParameters.ExcludedControllerNames.Contains(controllerFullName))
                        return null;

                    return CreateControllerClientClass(clientNamespace, d.ControllerName);
                }).Where(d=>d!= null).ToArray();//add classes into the namespace
            }

            foreach (var d in descriptions)
            {
                var controllerNamespace = d.ActionDescriptor.ControllerDescriptor.ControllerType.Namespace;
                var controllerName = d.ActionDescriptor.ControllerDescriptor.ControllerName;
                var controllerFullName = controllerNamespace + "." + controllerName;
                if (codeGenParameters.ExcludedControllerNames != null && codeGenParameters.ExcludedControllerNames.Contains(controllerFullName))
                    continue;

                var existingClientClass = LookupExistingClassInCodeDom(controllerNamespace, controllerName);
                System.Diagnostics.Trace.Assert(existingClientClass != null);

                var apiFunction = ClientApiTsFunctionGen.Create(d, poco2TsGen);
                existingClientClass.Members.Add(apiFunction);
            }

            RefineOverloadingFunctions();
        }

        void GenerateTsFromPoco()
        {
            if (codeGenParameters.DataModelAssemblyNames == null)
                return;

            var allAssemblies = AppDomain.CurrentDomain.GetAssemblies();
            var assemblies = allAssemblies.Where(d => codeGenParameters.DataModelAssemblyNames.Any(k => k.Equals(d.GetName().Name, StringComparison.CurrentCultureIgnoreCase))).ToArray();
            var cherryPickingMethods = codeGenParameters.CherryPickingMethods.HasValue ? (CherryPickingMethods)codeGenParameters.CherryPickingMethods.Value : CherryPickingMethods.DataContract;
            foreach (var assembly in assemblies)
            {
                poco2TsGen.CreateCodeDom(assembly, cherryPickingMethods);
            }
        }

        void AddBasicReferences()
        {
            targetUnit.ReferencedAssemblies.Add("<reference path=\"../typings/jquery/jquery.d.ts\" />");
            targetUnit.ReferencedAssemblies.Add("<reference path=\"HttpClient.ts\" />");
        }

        /// <summary>
        /// Lookup existing CodeTypeDeclaration created.
        /// </summary>
        /// <param name="clrNamespaceText"></param>
        /// <param name="controllerName"></param>
        /// <returns></returns>
        CodeTypeDeclaration LookupExistingClassInCodeDom(string clrNamespaceText, string controllerName)
        {
            var refined = (clrNamespaceText + ".Client").Replace('.', '_');
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

        void RefineOverloadingFunctions()
        {
            for (int i = 0; i < targetUnit.Namespaces.Count; i++)
            {
                var ns = targetUnit.Namespaces[i];
                for (int k = 0; k < ns.Types.Count; k++)
                {
                    var c = ns.Types[k];
                    List<CodeMemberMethod> methods = new List<CodeMemberMethod>();
                    for (int m = 0; m < c.Members.Count; m++)
                    {
                        var method = c.Members[m] as CodeMemberMethod;
                        if (method != null)
                        {
                            methods.Add(method);
                        }
                    }

                    if (methods.Count > 1)//worth of checking overloading
                    {
                        var candidates = from m in methods group m by m.Name into grp where grp.Count() > 1 select grp.Key;
                        foreach (var candidateName in candidates)
                        {
                            var overloadingMethods = methods.Where(d => d.Name == candidateName).ToArray();
                            System.Diagnostics.Debug.Assert(overloadingMethods.Length > 1);
                            foreach (var item in overloadingMethods) //Wow, 5 nested loops, plus 2 linq expressions
                            {
                                RenameCodeMemberMethodWithParameterNames(item);
                            }
                        }
                    }
                }
            }

        }

        static string ToTitleCase(string s)
        {
            return System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(s);
        }

        static void RenameCodeMemberMethodWithParameterNames(CodeMemberMethod method)
        {
            var parameterNamesInTitleCase = method.Parameters.OfType<CodeParameterDeclarationExpression>().Select(d => ToTitleCase(d.Name)).ToList();
            parameterNamesInTitleCase.RemoveAt(parameterNamesInTitleCase.Count - 1);
            if (parameterNamesInTitleCase.Count > 0)
            {
                method.Name += $"By{String.Join("And", parameterNamesInTitleCase)}";
            }
        }

        static CodeTypeDeclaration CreateControllerClientClass(CodeNamespace ns, string className)
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
            clientField.Name = "httpClient";
            clientField.Type = new CodeTypeReference("HttpClient");
            targetClass.Members.Add(clientField);
        }

        static void AddConstructor(CodeTypeDeclaration targetClass)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes =
                MemberAttributes.Public | MemberAttributes.Final;

            // Add parameters.
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "string = HttpClient.locationOrigin", "public baseUri"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "(xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any", "public error?"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression("{ [key: string]: any; }", "public statusCode?"));

            constructor.Statements.Add(new CodeSnippetStatement(@"this.httpClient = new HttpClient();"));

            targetClass.Members.Add(constructor);
        }

    }


}
