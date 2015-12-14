#if DEBUG  //This controller is not needed in production release, since the client API should be generated during development of the Web Api.
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Fonlow.CodeDom.Web;
using System.Linq;

namespace Fonlow.WebApiClientGen
{
    [System.Web.Http.Description.ApiExplorerSettings(IgnoreApi = true)]//this controller is a dev backdoor during development, no need to be visible in ApiExplorer.
    public class CodeGenController : ApiController
    {
        /// <summary>
        /// Trigger the API to generate WebApiClientAuto.cs for an established client API project.
        /// POST to  http://localhost:10965/api/CodeGen with json object CodeGenParameters
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns>OK if OK</returns>
        [HttpPost]
        public string TriggerCodeGen(CodeGenParameters parameters)
        {
            if (parameters == null)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "parametersNull" });

            string webRootPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            Fonlow.Web.Meta.WebApiDescription[] apiDescriptions;
            try
            {
                apiDescriptions = Configuration.Services.GetApiExplorer().ApiDescriptions.Select(d => Fonlow.Web.Meta.MetaTransform.GetWebApiDescription(d)).ToArray();

            }
            catch (System.InvalidOperationException e)
            {
                System.Diagnostics.Trace.TraceWarning(e.Message);
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.ServiceUnavailable) { ReasonPhrase = "CodeGenNotReady" });
            }

            if (!string.IsNullOrEmpty(parameters.ClientLibraryProjectFolderName))
            {
                if (string.IsNullOrWhiteSpace(parameters.ClientLibraryProjectFolderName))
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "ClientLibraryProjectFolderNameNull" });

                string clientProjectDir = System.IO.Path.Combine(webRootPath, "..", parameters.ClientLibraryProjectFolderName);
                if (!System.IO.Directory.Exists(clientProjectDir))
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "ClientLibraryProjectFolderNotExist" });

                var path = System.IO.Path.Combine(clientProjectDir, "WebApiClientAuto.cs");
                var gen = new Fonlow.CodeDom.Web.Cs.ControllersClientApiGen(parameters);
                gen.ForBothAsyncAndSync = parameters.GenerateBothAsyncAndSync;
                gen.CreateCodeDom(apiDescriptions);
                gen.Save(path);
            }

            if (!string.IsNullOrEmpty(parameters.TypeScriptFolder))
            {
                string theFolder;
                try
                {
                    theFolder = System.IO.Path.IsPathRooted(parameters.TypeScriptFolder) ? parameters.TypeScriptFolder
                : System.IO.Path.Combine(webRootPath, "Scripts", parameters.TypeScriptFolder);

                }
                catch (System.ArgumentException e)
                {
                    System.Diagnostics.Trace.TraceWarning(e.Message);
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "InvalidTypeScriptFolder" });
                }

                if (!System.IO.Directory.Exists(theFolder))
                {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "TypeScriptFolderNotExist" });
                }
                string tsPath = System.IO.Path.Combine(theFolder, "WebApiClientAuto.ts");

                var tsGen = new Fonlow.CodeDom.Web.Ts.ControllersTsClientApiGen(parameters);
                tsGen.CreateCodeDom(apiDescriptions);
                tsGen.Save(tsPath);
            }

            return "OK";
        }
    }

}
#endif
