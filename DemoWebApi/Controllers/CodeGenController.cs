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

            if (!settings.ClientApiOutputs.CamelCase.HasValue)
            {
                var camelCase = GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
                settings.ClientApiOutputs.CamelCase = camelCase;
            }

            try
            {
                CodeGen.GenerateClientAPIs(webRootPath, settings, apiDescriptions);
            }
            catch (Fonlow.Web.Meta.CodeGenException e)
            {
                System.Diagnostics.Trace.TraceError(e.Message + " : "+ e.Description);
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    ReasonPhrase = e.Message,
                    Content = String.IsNullOrEmpty(e.Description) ? null : new StringContent(e.Description, System.Text.Encoding.UTF8, "text/plain"),
                });
            }

            return "OK";

        }
    }

}
#endif
