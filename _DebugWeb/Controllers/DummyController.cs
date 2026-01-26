using Microsoft.AspNetCore.Mvc;
using System.Net;
using DemoWebApi.DemoData;
using System.Diagnostics;

namespace DebugWeb.Controllers
{
	/// <summary>
	/// To contain API functions that the codegen hasn't support well, for new features or breaking changes or whatever broken
	/// </summary>
	[ApiController]
	[Route("[controller]")]
	public class DummyController : ControllerBase
	{
		[HttpPost]
		[Route("createPerson")]
		public MyGenericInt CreatePerson([FromBody] MyGenericInt p)
		{
			Debug.WriteLine("CreatePerson: " + p.MyK);

			Debug.WriteLine("Create " + p);
			return new MyGenericInt{MyK=p.MyK };
		}

	}
}
