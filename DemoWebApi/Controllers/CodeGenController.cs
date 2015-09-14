using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoWebApi.Controllers
{
    public class CodeGenController : ApiController
    {
        [HttpGet]
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
}
