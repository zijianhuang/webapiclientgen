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
		[Route("createPersonSomething")]
		public MyGeneric<int, double, Company> CreatePersonSomething([FromBody] MyGeneric<int, double, Person> p)
		{
			return new MyGeneric<int, double, Company> { MyK = p.MyK };
		}

	}
}
