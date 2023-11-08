using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;

namespace Fonlow.Poco2Ts
{
	/// <summary>
	/// Used by plugins sharing similar handlings with ActionResult.
	/// </summary>
	public class PocoToTsResponseGen : Poco2TsGen
	{
		public PocoToTsResponseGen(CodeCompileUnit codeCompileUnit, string clientNamespaceSuffix, bool helpStrictMode, CodeObjectHelper codeObjectHelper=null) 
			: base(codeCompileUnit, clientNamespaceSuffix, helpStrictMode, codeObjectHelper ?? new CodeObjectHelper(true))
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
