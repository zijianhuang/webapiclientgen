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
            if (string.IsNullOrWhiteSpace( parameters.ClientLibraryProjectFolderName ))
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "ClientLibraryProjectFolderNameNull" });

            string webRootPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            string clientProjectDir = System.IO.Path.Combine(webRootPath, "..", parameters.ClientLibraryProjectFolderName);
            if (!System.IO.Directory.Exists(clientProjectDir))
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "ClientLibraryProjectFolderNotExist" });

            var path = System.IO.Path.Combine(clientProjectDir, "WebApiClientAuto.cs");
            var apiDescriptions = Configuration.Services.GetApiExplorer().ApiDescriptions;
            var gen = new Fonlow.Net.Http.ControllersClientApiGen(parameters.PrefixesOfCustomNamespaces, parameters.ExcludedControllerNames );
            gen.Generate(apiDescriptions, parameters.GenerateBothAsyncAndSync);
            gen.SaveCSharpCode(path);
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

        public bool GenerateBothAsyncAndSync { get; set; }
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
        "GenerateBothAsyncAndSync": true
      }
    */

}
#endif
