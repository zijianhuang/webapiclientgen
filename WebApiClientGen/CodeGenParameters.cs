using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fonlow.CodeDom.Web
{
    /// <summary>
    /// Parameters to be used from client programs to CodeGen.
    /// </summary>
    public class CodeGenParameters
    {
        /// <summary>
        /// Assuming the client API project is the sibling of Web API project. Relative path to the WebApi project should be fine.
        /// </summary>
        public string ClientLibraryProjectFolderName { get; set; }

        public string[] ExcludedControllerNames { get; set; }

        /// <summary>
        /// For .NET client, generate both async and sync functions for each Web API function
        /// </summary>
        public bool GenerateBothAsyncAndSync { get; set; }

        /// <summary>
        /// Absolute path or relative path under the Scripts folder of current Web API project.
        /// </summary>
        public string TypeScriptFolder { get; set; }

        /// <summary>
        /// TypeScript uses import which only partially simulate namespaces in .NET
        /// </summary>
        public string[] TypeScriptDataModelNamespaces
        { get; set; }

        /// <summary>
        /// Assembly name without file extension
        /// </summary>
        public string[] DataModelAssemblyNames
        { get; set; }

        /// <summary>
        /// Cherry picking methods of POCO classes
        /// </summary>
        public int? CherryPickingMethods { get; set; }
    }
}
