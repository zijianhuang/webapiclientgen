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
		[HttpDelete("{id}")]
		public void Delete(long id)
		{
			Debug.WriteLine("Delete " + id);
		}

		/// <summary>
		/// Anonymous Dynamic of C#
		/// </summary>
		/// <returns>dyanmic things</returns>
		[HttpGet]
		[Route("AnonymousDynamic")]
		public dynamic GetAnonymousDynamic()
		{
			return new
			{
				Id = 12345,
				Name = "Something",
			};
		}


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

		[HttpPost]
		[Route("createPerson2")]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
		public async Task<Person> CreatePerson2([FromBody] Person p)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
		{
			Debug.WriteLine("CreatePerson: " + p.Name);

			if (p.Name == "Exception")
				throw new InvalidOperationException("It is exception");

			Debug.WriteLine("Create " + p);
			return p;
		}

		[HttpPost]
		[Route("createPersonByAdmin")]
		[ProducesResponseType((int)HttpStatusCode.NotFound)]
		[ProducesResponseType((int)HttpStatusCode.NoContent)]
		[ProducesResponseType((int)HttpStatusCode.UnprocessableEntity)]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
		public async Task<Person> CreatePersonByAdmin([FromBody] Person p)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
		{
			Debug.WriteLine("CreatePerson: " + p.Name);

			if (p.Name == "Exception")
				throw new InvalidOperationException("It is exception");

			Debug.WriteLine("Create " + p);
			return p;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="p"></param>
		/// <returns></returns>
		/// <exception cref="InvalidOperationException"></exception>
		[HttpPost]
		[Route("createPersonWeak")]
		[ProducesResponseType((int)HttpStatusCode.NotFound)]
		[ProducesResponseType((int)HttpStatusCode.NoContent)]
		[ProducesResponseType(typeof(Person), (int)HttpStatusCode.OK)]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
		public async Task<IActionResult> CreatePersonWeak([FromBody] Person p)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
		{
			Debug.WriteLine("CreatePerson: " + p.Name);

			if (p.Name == "Exception")
				throw new InvalidOperationException("It is exception");

			Debug.WriteLine("Create " + p);
			return Ok(p);
		}

		[HttpPost]
		[Route("createPersonWithNotFound")]
		[ProducesResponseType((int)HttpStatusCode.NotFound)]
		public ActionResult<Person> CreatePersonWithNotFound([FromBody] Person p)
		{
			if (p.Name == "Exception")
				throw new InvalidOperationException("It is exception");

			if (p.Name == "NotFound")
				return NotFound();

			return Ok(p);
		}

		[HttpPost]
		[Route("createPersonWithStatuses")]
		[ProducesResponseType((int)HttpStatusCode.NotFound)]
		[ProducesResponseType((int)HttpStatusCode.NoContent)]
		[ProducesResponseType((int)HttpStatusCode.UnprocessableEntity)]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
		public async Task<ActionResult<Person>> CreatePersonWithStatuses([FromBody] Person p)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
		{
			if (p.Name == "Exception")
				throw new InvalidOperationException("It is exception");

			if (p.Name == "NotFound")
				return NotFound();

			return Ok(p);
		}
	}
}
