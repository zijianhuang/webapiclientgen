using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Web.Http.Description;

namespace Fonlow.Net.Http
{
    /// <summary>
    /// Store CodeDom references shared by all functions of the client API class.
    /// </summary>
    public class SharedContext
    {
        public CodeFieldReferenceExpression clientReference { get; set; }
        public string[] prefixesOfCustomNamespaces { get; set; }
        public CodeFieldReferenceExpression baseUriReference { get; set; }
    }

    public abstract class ControllersClientApiGenBase
    {
        protected  CodeCompileUnit targetUnit;
        protected  Dictionary<string, object> apiClassesDic;
        protected  CodeTypeDeclaration[] newClassesCreated;
        protected  SharedContext sharedContext;
        protected  string[] excludedControllerNames;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="prefixesOfCustomNamespaces">Prefixes of namespaces of custom complex data types, so the code gen will use .client of client data types.</param>
        /// <param name="excludedControllerNames">Excluse some Api Controllers from being exposed to the client API. Each item should be fully qualified class name but without the assembly name.</param>
        /// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
        public ControllersClientApiGenBase(string[] prefixesOfCustomNamespaces, string[] excludedControllerNames = null)
        {
            sharedContext = new SharedContext();
            sharedContext.prefixesOfCustomNamespaces = prefixesOfCustomNamespaces == null ? new string[] { } : prefixesOfCustomNamespaces;
            targetUnit = new CodeCompileUnit();
            apiClassesDic = new Dictionary<string, object>();
            this.excludedControllerNames = excludedControllerNames;
        }

        public abstract void Save(string fileName);

        public abstract void Generate(Collection<ApiDescription> descriptions);
    }
}
