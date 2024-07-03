using Fonlow.Auth.Models;
using Microsoft.AspNetCore.Mvc;
namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing different commbinations of parameters and returns
	/// </summary>
	[Route("api/[controller]")]
	public class PolymorphismController : ControllerBase
	{
		[HttpPost]
		[Consumes("application/x-www-form-urlencoded")]
		public async Task<RequestBase> PostTokenRequest([FromForm] RequestBase model)
		{
			return model;
		}

		[HttpPost]
		[Route("PostRequestBase")]
		public async Task<RequestBase> PostRequestBase([FromBody] RequestBase model)
		{
			return model;
		}

		[HttpPost]
		[Route("PostROPCRequst")]
		public async Task<ROPCRequst> PostROPCRequst([FromBody] ROPCRequst model)
		{
			return model;
		}

		[HttpPost]
		[Route("PostROPCRequst2")]
		public async Task<RequestBase> PostROPCRequst2([FromBody] ROPCRequst model)
		{
			return model;
		}

		[HttpPost]
		[Route("PostROPCRequst3")]
		public async Task<ROPCRequst> PostROPCRequst3([FromBody] RequestBase model)
		{
			return model as ROPCRequst;
		}

	}
}
