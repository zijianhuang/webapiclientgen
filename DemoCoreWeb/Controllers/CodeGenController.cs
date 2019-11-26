#if DEBUG  //This controller is not needed in production release, since the client API should be generated during development of the Web Api.
using Fonlow.CodeDom.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Linq;
using System.Net;

namespace Fonlow.WebApiClientGen
{
	[ApiExplorerSettings(IgnoreApi = true)]
	[Route("api/[controller]")]
	public class CodeGenController : ControllerBase
	{
		private readonly IApiDescriptionGroupCollectionProvider apiExplorer;
		private readonly string webRootPath;

		/// <summary>
		/// For injecting some environment config by the run time.
		/// </summary>
		/// <param name="apiExplorer"></param>
		/// <param name="hostingEnvironment"></param>
		public CodeGenController(IApiDescriptionGroupCollectionProvider apiExplorer, IWebHostEnvironment hostingEnvironment)
		{
			this.apiExplorer = apiExplorer;
			this.webRootPath = hostingEnvironment.WebRootPath;
		}

		/// <summary>
		/// Trigger the API to generate WebApiClientAuto.cs for an established client API project.
		/// POST to  http://localhost:56321/api/CodeGen with json object CodeGenParameters
		/// </summary>
		/// <param name="settings"></param>
		/// <returns>OK if OK</returns>
		[HttpPost]
		public ActionResult TriggerCodeGen([FromBody] CodeGenSettings settings)
		{
			if (settings == null)
				return BadRequest("No settings");

			if (settings.ClientApiOutputs == null)
				return BadRequest("No settings/ClientApiOutputs");

			Fonlow.Web.Meta.WebApiDescription[] apiDescriptions;
			try
			{
				var descriptions = ApiExplorerHelper.GetApiDescriptions(apiExplorer);
				apiDescriptions = descriptions.Select(d => Fonlow.Web.Meta.MetaTransform.GetWebApiDescription(d)).OrderBy(d => d.ActionDescriptor.ActionName).ToArray();

			}
			catch (System.InvalidOperationException e)
			{
				System.Diagnostics.Trace.TraceWarning(e.Message);
				return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
			}

			if (!settings.ClientApiOutputs.CamelCase.HasValue)
			{
				settings.ClientApiOutputs.CamelCase = true;
			}

			try
			{
				CodeGen.GenerateClientAPIs(this.webRootPath, settings, apiDescriptions);
			}
			catch (Fonlow.Web.Meta.CodeGenException e)
			{
				var msg = e.Message + " : " + e.Description;
				System.Diagnostics.Trace.TraceError(msg);
				return BadRequest(msg);
			}

			return Ok("Done");
		}
	}

}
#endif
