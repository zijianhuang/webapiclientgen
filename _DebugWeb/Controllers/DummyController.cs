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
			return new MyGenericInt { MyK = p.MyK };
		}

		[HttpPost]
		[Route("createSomething")]
		public MyGeneric<int, double, string> CreateSomething([FromBody] MyGeneric<int, double, DateOnly> p)
		{
			return new MyGeneric<int, double, string> { MyK = p.MyK };
		}

		[HttpPost]
		[Route("createPersonSomething")]
		public MyGeneric<int, double, Company> CreatePersonSomething([FromBody] MyGeneric<int, double, Person> p)
		{
			return new MyGeneric<int, double, Company> { MyK = p.MyK };
		}

	}
}
