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
		public Person CreatePerson([FromBody] Person p)
		{
			Debug.WriteLine("CreatePerson: " + p.Name);

			if (p.Name == "Exception")
				throw new InvalidOperationException("It is exception");

			Debug.WriteLine("Create " + p);
			return p;
		}

	}
}
