#if DEBUG  //This controller is not needed in production release, since the client API should be generated during development of the Web Api.
using Fonlow.CodeDom.Web;
using System.Linq;
using System.Web.Http;

namespace Fonlow.WebApiClientGen
{
	[System.Web.Http.Description.ApiExplorerSettings(IgnoreApi = true)]//this controller is a dev backdoor during development, no need to be visible in ApiExplorer.
	public class CodeGenController : ApiController
	{
		/// <summary>
		/// Trigger the API to generate WebApiClientAuto.cs for an established client API project.
		/// </summary>
		/// <param name="settings"></param>
		/// <returns>OK if OK</returns>
		[HttpPost]
		public IHttpActionResult TriggerCodeGen(CodeGenSettings settings)
		{
			if (settings == null)
				return BadRequest("No settings");

			if (settings.ClientApiOutputs == null)
				return BadRequest("No settings/ClientApiOutputs");

			string webRootPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
			Fonlow.Web.Meta.WebApiDescription[] apiDescriptions;
			try
			{
				apiDescriptions = Configuration.Services.GetApiExplorer().ApiDescriptions.Select(d => Fonlow.Web.Meta.MetaTransform.GetWebApiDescription(d)).OrderBy(d => d.ActionDescriptor.ActionName).ToArray();

			}
			catch (Fonlow.Web.Meta.CodeGenException e)
			{
				var msg = e.Message + (string.IsNullOrEmpty(e.Description) ? string.Empty : (" : " + e.Description));
				System.Diagnostics.Trace.TraceError(msg);
				return BadRequest(msg);
			}
			catch (System.InvalidOperationException e)
			{
				System.Diagnostics.Trace.TraceWarning(e.Message);
				return InternalServerError(e);
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
				var msg = e.Message + (string.IsNullOrEmpty(e.Description) ? string.Empty : (" : " + e.Description));
				System.Diagnostics.Trace.TraceError(msg);
				return BadRequest(msg);
			}

			return Ok("Done");
		}
	}

}
#endif
