using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Fonlow.CodeDom.Web;

namespace DemoWebApi.Controllers
{ 
	[Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

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

		// PUT api/values/5
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
