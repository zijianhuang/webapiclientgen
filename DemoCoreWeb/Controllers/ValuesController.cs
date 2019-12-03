using Fonlow.CodeDom.Web;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DemoWebApi.Controllers
{
	[Route("api/[controller]")]
	public class ValuesController : ControllerBase
	{
		/// <summary>
		/// Get a list of value
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		public IEnumerable<string> Get()
		{
			return new string[] { "value1", "value2" };
		}

		/// <summary>
		/// Get by both Id and name
		/// </summary>
		/// <param name="id"></param>
		/// <param name="name"></param>
		/// <returns></returns>
		[HttpGet("{id}")]
		public string Get(int id, [RequiredFromQuery] string name)
		{
			return name + id.ToString();
		}

		[HttpGet]
		public string Get([RequiredFromQuery] string name)
		{
			return name.ToUpper();
		}

		[HttpGet("{id}")]
		public string Get(int id)
		{
			return id.ToString();
		}

		// POST api/values
		[HttpPost]
		public string Post([FromBody]string value)
		{
			System.Diagnostics.Debug.WriteLine("received POST value: " + value);
			return value.ToUpper();
		}

		/// <summary>
		/// Update with valjue
		/// </summary>
		/// <param name="id"></param>
		/// <param name="value"></param>
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
