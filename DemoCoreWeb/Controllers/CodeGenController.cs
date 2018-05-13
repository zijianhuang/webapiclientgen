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
		private readonly IHostingEnvironment hostingEnvironment;

		/// <summary>
		/// For injecting some environment config by the run time.
		/// </summary>
		/// <param name="apiExplorer"></param>
		/// <param name="hostingEnvironment"></param>
		public CodeGenController(IApiDescriptionGroupCollectionProvider apiExplorer, IHostingEnvironment hostingEnvironment)
		{
			this.apiExplorer = apiExplorer;
			this.hostingEnvironment = hostingEnvironment;
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
			if (settings == null || settings.ClientApiOutputs == null)
				return new BadRequestResult();

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
			}

			if (!settings.ClientApiOutputs.CamelCase.HasValue)
			{
				settings.ClientApiOutputs.CamelCase = true;
			}

			try
			{
				CodeGen.GenerateClientAPIs(webRootPath, settings, apiDescriptions);
			}
			catch (Fonlow.Web.Meta.CodeGenException e)
			{
				System.Diagnostics.Trace.TraceError(e.Message + " : " + e.Description);
			}

			return Ok();
		}
	}

}
#endif
