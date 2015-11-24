using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoWebApi.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id, string name)
        {
            return name + id.ToString();
        }

        public string Get(string name)
        {
            return name.ToUpper();
        }

        [HttpPost]
        public string Post([FromBody]string value)
        {
            System.Diagnostics.Debug.WriteLine("received POST value: "+value);
            return value.ToUpper();
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
            System.Diagnostics.Debug.WriteLine("Put " + id.ToString() + value);
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
