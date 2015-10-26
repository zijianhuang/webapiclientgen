#if DEBUG  //This controller is not needed in production release, since the client API should be generated during development of the Web Api.
using System.Net;
using System.Net.Http;
using System.Web.Http;

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
            var apiDescriptions = Configuration.Services.GetApiExplorer().ApiDescriptions;

            if (!string.IsNullOrEmpty(parameters.ClientLibraryProjectFolderName))
            {
                if (string.IsNullOrWhiteSpace(parameters.ClientLibraryProjectFolderName))
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "ClientLibraryProjectFolderNameNull" });

                string clientProjectDir = System.IO.Path.Combine(webRootPath, "..", parameters.ClientLibraryProjectFolderName);
                if (!System.IO.Directory.Exists(clientProjectDir))
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "ClientLibraryProjectFolderNotExist" });

                var path = System.IO.Path.Combine(clientProjectDir, "WebApiClientAuto.cs");
                var gen = new Fonlow.CodeDom.Web.Cs.ControllersClientApiGen(parameters.PrefixesOfCustomNamespaces, parameters.ExcludedControllerNames);
                gen.ForBothAsyncAndSync = parameters.GenerateBothAsyncAndSync;
                gen.Generate(apiDescriptions);
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

                var tsGen = new Fonlow.CodeDom.Web.Ts.ControllersTsClientApiGen(parameters.PrefixesOfCustomNamespaces, 
                    parameters.ExcludedControllerNames, parameters.TypeScriptDataModelNamespaces);
                tsGen.Generate(apiDescriptions);
                tsGen.Save(tsPath);
            }
            return "OK";
        }
    }

    public class CodeGenParameters
    {
        /// <summary>
        /// Assuming the client API project is the sibling of Web API project. Relative path to the WebApi project should be fine.
        /// </summary>
        public string ClientLibraryProjectFolderName { get; set; }

        public string[] PrefixesOfCustomNamespaces { get; set; }

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
    }
    /*
    json object to post with content-type application/json
    
     {
        "ClientLibraryProjectFolderName": "DemoWebApi.ClientApi",
        "PrefixesOfCustomNamespaces": [
          "DemoWebApi"
        ],
        "ExcludedControllerNames": [
          "DemoWebApi.Controllers.Account"
        ],
        "GenerateBothAsyncAndSync": true,
        "TypeScriptFolder" : "ClientApi",
        "TypeScriptDataModelNamespaces" : [
           "DemoWebApi_DemoData_Client"
        ],
      }
    */

}
#endif
