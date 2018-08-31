using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using System;
using Fonlow.Poco2Client;
using Fonlow.Reflection;
using Fonlow.DocComment;

namespace Fonlow.Poco2Ts
{
    public class PocoToTsNgGen : Poco2TsGen
    {
        public PocoToTsNgGen(CodeCompileUnit codeCompileUnit) : base(codeCompileUnit)
        {

        }
        protected override CodeTypeReference TranslateActionResultToClientTypeReference(Type type)
        {
            if (type.FullName.Contains("System.Web.Http.IHttpActionResult") || type.FullName.Contains("Microsoft.AspNetCore.Mvc.IActionResult"))
            {
                return new CodeTypeReference("response");
            }

            if (type.FullName.Contains("System.Net.Http.HttpResponseMessage") || type.FullName.Contains("Microsoft.AspNetCore.Mvc.ActionResult"))
            {
                return new CodeTypeReference("blobresponse");
            }

            return null;
        }
    }
}
