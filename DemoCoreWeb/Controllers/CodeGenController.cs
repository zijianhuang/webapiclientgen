#if DEBUG  //This controller is not needed in production release, since the client API should be generated during development of the Web Api.
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using Fonlow.CodeDom.Web;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Diagnostics;
using Microsoft.AspNetCore.Hosting;

namespace Fonlow.WebApiClientGen
{
	[ApiExplorerSettings(IgnoreApi = true)]//this controller is a dev backdoor during development, no need to be visible in ApiExplorer.
	[Route("api/[controller]")]
	public class CodeGenController : Controller
	{
		private readonly IApiDescriptionGroupCollectionProvider apiExplorer;
		private readonly IHostingEnvironment hostingEnvironment;
		public CodeGenController(IApiDescriptionGroupCollectionProvider apiExplorer, IHostingEnvironment hostingEnvironment)
		{
			this.apiExplorer = apiExplorer;
			this.hostingEnvironment = hostingEnvironment;
		}

		/// <summary>
		/// Trigger the API to generate WebApiClientAuto.cs for an established client API project.
		/// POST to  http://localhost:10965/api/CodeGen with json object CodeGenParameters
		/// </summary>
		/// <param name="settings"></param>
		/// <returns>OK if OK</returns>
		[HttpPost]
		public ActionResult TriggerCodeGen([FromBody] CodeGenSettings settings)
		{
			if (settings == null || settings.ClientApiOutputs==null)
				return new BadRequestResult();
			//   throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "parametersNull" });

			string webRootPath = hostingEnvironment.WebRootPath;
			Fonlow.Web.Meta.WebApiDescription[] apiDescriptions;
			try
			{   
				var descriptions = ApiExplorerHelper.GetApiDescriptions(apiExplorer);
				apiDescriptions = descriptions.Select(d => Fonlow.Web.Meta.MetaTransform.GetWebApiDescription(d)).ToArray();

			}
			catch (System.InvalidOperationException e)
			{
				System.Diagnostics.Trace.TraceWarning(e.Message);
				return StatusCode((int)HttpStatusCode.ServiceUnavailable);
				// throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.ServiceUnavailable) { ReasonPhrase = "CodeGenNotReady" });
			}

			if (!settings.ClientApiOutputs.CamelCase.HasValue)
			{
				//todo: chekc this later var camelCase = GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver is Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver;
				settings.ClientApiOutputs.CamelCase = true;// camelCase;
			}

			try
			{
				CodeGen.GenerateClientAPIs(webRootPath, settings, apiDescriptions);
			}
			catch (Fonlow.Web.Meta.CodeGenException e)
			{
				System.Diagnostics.Trace.TraceError(e.Message + " : " + e.Description);
				return BadRequest();
				//throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
				//{
				//    ReasonPhrase = e.Message,
				//    Content = String.IsNullOrEmpty(e.Description) ? null : new StringContent(e.Description, System.Text.Encoding.UTF8, "text/plain"),
				//});
			}

			return Ok();

		}
	}

}
#endif
