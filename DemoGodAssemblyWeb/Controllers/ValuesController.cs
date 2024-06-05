using Fonlow.CodeDom.Web;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoWebApi.Controllers
{
	[ApiController]
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
		/// Get a list of value async, it is get2
		/// </summary>
		/// <returns></returns>
		[HttpGet("Get2")]
		public async Task<IEnumerable<string>> Get2()
		{
			return new string[] { "value1", "value2" };
		}

		/// <summary>
		/// Get by both Id and name
		/// </summary>
		/// <param name="id"></param>
		/// <param name="name"></param>
		/// <returns></returns>
		[HttpGet("Name/{id}")]
		public string Get(int id, [RequiredFromQuery] string name)
		{
			return name + id.ToString();
		}

		/// <summary>
		/// Get by name
		/// </summary>
		/// <param name="name"></param>
		/// <returns></returns>
		[HttpGet]
		public string Get([RequiredFromQuery] string name)
		{
			return name.ToUpper();
		}

		/// <summary>
		/// Get by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		/// <exception cref="System.ArgumentException"></exception>
		[HttpGet("{id}")]
		public string Get(int id)
		{
			if (id == 666)
			{
				throw new System.ArgumentException("hehehahahah");
			}

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
