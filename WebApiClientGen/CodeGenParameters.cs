using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.ServiceModel;

namespace Fonlow.CodeDom.Web
{
    public class CodeGenSettingsBase
    {
        public CodeGenConfig ApiSelections { get; set; }
    }

    /// <summary>
    /// What CodeGenController is expecting 
    /// </summary>
    public class CodeGenSettings : CodeGenSettingsBase
    {
        public CodeGenOutputs ClientApiOutputs { get; set; }
    }

    /// <summary>
    /// For cherry picking APIs and data models 
    /// </summary>
    public class CodeGenConfig
    {
        public string[] ExcludedControllerNames { get; set; }

        /// <summary>
        /// Assembly names without file extension
        /// </summary>
        public string[] DataModelAssemblyNames
        { get; set; }

        /// <summary>
        /// Cherry picking methods of POCO classes
        /// </summary>
        public int? CherryPickingMethods { get; set; }

    }

    /// <summary>
    /// Client APIs as output for C#, jQuery and NG etc.
    /// </summary>
    public class CodeGenOutputs
    {
        /// <summary>
        /// Assuming the client API project is the sibling of Web API project. Relative path to the WebApi project should be fine.
        /// </summary>
        public string ClientLibraryProjectFolderName { get; set; }

        /// <summary>
        /// For .NET client, generate both async and sync functions for each Web API function
        /// </summary>
        public bool GenerateBothAsyncAndSync { get; set; }


        /// <summary>
        /// Whether to conform to the camel casing convention of javascript and JSON.
        /// If not defined, WebApiClientGen will check if GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
        /// If CamelCasePropertyNamesContractResolver is presented, camelCasing will be used. If not, no camelCasing transformation will be used.
        /// </summary>
        public bool? CamelCase { get; set; }

        /// <summary>
        /// Absolute path or relative path under the Scripts folder of current Web API project.
        /// </summary>
        public string TypeScriptFolder { get; set; }

        /// <summary>
        /// Absolute path or relative path under the Scripts folder of current Web API project.
        /// </summary>
        public string TypeScriptNG2Folder { get; set; }


    }

    public class CSharpOutput : CodeGenSettingsBase
    {
        /// <summary>
        /// Assuming the client API project is the sibling of Web API project. Relative path to the WebApi project should be fine.
        /// </summary>
        public string ClientLibraryProjectFolderName { get; set; }

        /// <summary>
        /// For .NET client, generate both async and sync functions for each Web API function
        /// </summary>
        public bool GenerateBothAsyncAndSync { get; set; }


        public CSharpOutput(CodeGenSettings settings)
        {
            this.ApiSelections = settings.ApiSelections;
            this.ClientLibraryProjectFolderName = settings.ClientApiOutputs.ClientLibraryProjectFolderName;
            this.GenerateBothAsyncAndSync = settings.ClientApiOutputs.GenerateBothAsyncAndSync;
        }
    }

    public class JSOutput : CodeGenSettingsBase
    {
        /// <summary>
        /// Whether to conform to the camel casing convention of javascript and JSON.
        /// If not defined, WebApiClientGen will check if GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
        /// If CamelCasePropertyNamesContractResolver is presented, camelCasing will be used. If not, no camelCasing transformation will be used.
        /// </summary>
        public bool? CamelCase { get; private set; }

        public string JSPath { get; private set; }

        public JSOutput(CodeGenSettings settings, string jsPath)
        {
            this.ApiSelections = settings.ApiSelections;
            this.CamelCase = settings.ClientApiOutputs.CamelCase;
            this.JSPath = jsPath;
        }

    }

    //public class JQueryOutput : JSOutput
    //{
    //    /// <summary>
    //    /// Absolute path or relative path under the Scripts folder of current Web API project.
    //    /// </summary>
    //    public string TypeScriptFolder { get; set; }


    //    public JQueryOutput(CodeGenSettings settings) : base(settings)
    //    {
    //        this.TypeScriptFolder = settings.ClientApiOutputs.TypeScriptFolder;
    //    }

    //}

    //public class NG2Output : JSOutput
    //{
    //    /// <summary>
    //    /// Absolute path or relative path under the Scripts folder of current Web API project.
    //    /// </summary>
    //    public string TypeScriptNG2Folder { get; set; }

    //    public NG2Output(CodeGenSettings settings) : base(settings)
    //    {
    //        this.TypeScriptNG2Folder = settings.ClientApiOutputs.TypeScriptNG2Folder;
    //    }
    //}


    //public class CodeGenParametersEx
    //{
    //    public CodeGenSettings Parameters { get; set; }

    //    public string TsPath { get; set; }

    //    public string TsNg2Path { get; set; }
    //}
}
