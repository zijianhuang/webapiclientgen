#if DEBUG  //This controller is not needed in production release, since the client API should be generated during development of the Web Api.
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Fonlow.CodeDom.Web;
using System.Linq;
using System;

namespace Fonlow.WebApiClientGen
{
    [System.Web.Http.Description.ApiExplorerSettings(IgnoreApi = true)]//this controller is a dev backdoor during development, no need to be visible in ApiExplorer.
    public class CodeGenController : ApiController
    {
        /// <summary>
        /// Trigger the API to generate WebApiClientAuto.cs for an established client API project.
        /// POST to  http://localhost:10965/api/CodeGen with json object CodeGenParameters
        /// </summary>
        /// <param name="settings"></param>
        /// <returns>OK if OK</returns>
        [HttpPost]
        public string TriggerCodeGen(CodeGenSettings settings)
        {
            if (settings == null)
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

            if (!string.IsNullOrEmpty(settings.ClientApiOutputs.ClientLibraryProjectFolderName))
            {
                if (string.IsNullOrWhiteSpace(settings.ClientApiOutputs.ClientLibraryProjectFolderName))
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "ClientLibraryProjectFolderNameNull" });

                string clientProjectDir = System.IO.Path.Combine(webRootPath, "..", settings.ClientApiOutputs.ClientLibraryProjectFolderName);
                if (!System.IO.Directory.Exists(clientProjectDir))
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "ClientLibraryProjectFolderNotExist" });

                var path = System.IO.Path.Combine(clientProjectDir, "WebApiClientAuto.cs");
                var gen = new Fonlow.CodeDom.Web.Cs.ControllersClientApiGen(settings);
                gen.ForBothAsyncAndSync = settings.ClientApiOutputs.GenerateBothAsyncAndSync;
                gen.CreateCodeDom(apiDescriptions);
                gen.Save(path);
            }

            if (!settings.ClientApiOutputs.CamelCase.HasValue)
            {
                var camelCase = GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
                settings.ClientApiOutputs.CamelCase = camelCase;
            }

            Func<string, string, string> CreateTsPath = (folder, fileName) =>
            {
                if (!string.IsNullOrEmpty(folder))
                {
                    string theFolder;
                    try
                    {
                        theFolder = System.IO.Path.IsPathRooted(folder) ?
                            folder : System.IO.Path.Combine(webRootPath, "Scripts", folder);

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
                    return System.IO.Path.Combine(theFolder, fileName);
                };

                return null;
            };


            var jQueryPath = CreateTsPath(settings.ClientApiOutputs.TypeScriptJQFolder, "WebApiClientAuto.ts");
            if (!String.IsNullOrEmpty(jQueryPath))
            {
                var jQueryOutput = new JSOutput(settings, jQueryPath);
                var tsGen = new Fonlow.CodeDom.Web.Ts.ControllersTsClientApiGen(jQueryOutput);
                tsGen.CreateCodeDom(apiDescriptions);
                tsGen.Save();
            }

            var ng2Path = CreateTsPath(settings.ClientApiOutputs.TypeScriptNG2Folder, "WebApiNG2ClientAuto.ts");
            if (!String.IsNullOrEmpty(ng2Path))
            {
                var ng2Output = new JSOutput(settings, ng2Path);
                var tsGen = new Fonlow.CodeDom.Web.Ts.ControllersTsNG2ClientApiGen(ng2Output);
                tsGen.CreateCodeDom(apiDescriptions);
                tsGen.Save();

            }

            return "OK";

        }
    }

}
#endif
