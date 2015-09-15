using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoWebApi.Controllers
{
#if DEBUG  //This controller is not needed in production release, since the client API should be generated during development of Web Api.
    public class CodeGenController : ApiController
    {
        /// <summary>
        /// Trigger the API to generate WebApiClientAuto.cs for an established client API project.
        /// </summary>
        /// <param name="clientLibraryProjectFolderName">Assuming the client api project is the sibling of Web Api project. Relative path to the WebApi project should be fine.</param>
        /// <returns></returns>
        /// <remarks>Convenient to use GET, e.g. http://localhost:10965/api/CodeGen?clientLibraryProjectFolderName=DemoWebApi.ClientApi
        /// or semetically correct to use POST.
        /// </remarks>
        [HttpGet]
        [HttpPost]
        public string TriggerCodeGen(string clientLibraryProjectFolderName)
        {
            string webRootPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            var path = System.IO.Path.Combine(webRootPath, "..", clientLibraryProjectFolderName, "WebApiClientAuto.cs");//assuming the client api project is the sibling of Web Api project.
            var apiDescriptions = Configuration.Services.GetApiExplorer().ApiDescriptions;
            var gen = new Fonlow.Net.Http.ControllersClientApiGen(new string[] { "DemoWebApi" }, new string[] { "DemoWebApi.Controllers.Account", "DemoWebApi.Controllers.CodeGen" });
            gen.Generate(apiDescriptions, true);
            gen.SaveCSharpCode(path);
            return "OK";
        }
    }
#endif
}
