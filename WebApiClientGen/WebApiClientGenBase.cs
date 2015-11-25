using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Web.Http.Description;

namespace Fonlow.CodeDom.Web
{
    /// <summary>
    /// Store CodeDom references shared by all functions of the client API class.
    /// </summary>
    public class SharedContext
    {
        public CodeFieldReferenceExpression clientReference { get; set; }
        public CodeFieldReferenceExpression baseUriReference { get; set; }
    }

    public abstract class ControllersClientApiGenBase
    {
        protected  CodeCompileUnit targetUnit { get; set; }
        protected  Dictionary<string, object> apiClassesDic { get; private set; }
        protected  CodeTypeDeclaration[] newClassesCreated { get; set; }
        protected  SharedContext sharedContext { get; set; }
        protected CodeGenParameters codeGenParameters { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="excludedControllerNames">Excluse some Api Controllers from being exposed to the client API. Each item should be fully qualified class name but without the assembly name.</param>
        /// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
        protected ControllersClientApiGenBase(CodeGenParameters codeGenParameters)
        {
            if (codeGenParameters == null)
                throw new System.ArgumentNullException("codeGenParameters");

            this.codeGenParameters = codeGenParameters;
            sharedContext = new SharedContext();
            targetUnit = new CodeCompileUnit();
            apiClassesDic = new Dictionary<string, object>();
        }

        public abstract void Save(string fileName);

        public abstract void CreateCodeDom(Collection<ApiDescription> descriptions);
    }
}
