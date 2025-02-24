﻿#if DEBUG  //This controller is not needed in production release, since the client API should be generated during development of the Web Api.
using Fonlow.CodeDom.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Linq;
using System.Net;

namespace Fonlow.WebApiClientGen
{
	[ApiExplorerSettings(IgnoreApi = true)]
	[ApiController]
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
		/// </summary>
		/// <param name="settings"></param>
		/// <returns>OK if OK</returns>
		[HttpPost]
		public IActionResult TriggerCodeGen([FromBody] CodeGenSettings settings)
		{
			if (settings == null)
				return BadRequest("No settings");

			if (settings.ClientApiOutputs == null)
				return BadRequest("No settings/ClientApiOutputs");

			Fonlow.Web.Meta.WebApiDescription[] webApiDescriptions;
			try
			{
				var descriptions = ApiExplorerHelper.GetApiDescriptions(apiExplorer);
				webApiDescriptions = descriptions.Select(d => Fonlow.Web.Meta.MetaTransform.GetWebApiDescription(d)).OrderBy(d => d.ActionDescriptor.ActionName).ToArray();

			}
			catch (Fonlow.Web.Meta.CodeGenException e)
			{
				System.Diagnostics.Trace.TraceWarning(e.Message);
				return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
			}
			catch (System.InvalidOperationException e)
			{
				System.Diagnostics.Trace.TraceWarning(e.Message);
				return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
			}
			
			try
			{
				CodeGen.GenerateClientAPIs(this.webRootPath, settings, webApiDescriptions);
				//System.IO.File.WriteAllText(@"c:\temp\mygen.json", Newtonsoft.Json.JsonConvert.SerializeObject(apiDescriptions, Newtonsoft.Json.Formatting.Indented)); //Log some runtime info if something is wrong.
			}
			catch (Fonlow.Web.Meta.CodeGenException e)
			{
				var msg = e.Message + (string.IsNullOrEmpty(e.Description) ? string.Empty : (" : " + e.Description));
				System.Diagnostics.Trace.TraceError(msg);
				return BadRequest(msg);
			}

			return Ok("Done");
		}
	}

}
#endif
