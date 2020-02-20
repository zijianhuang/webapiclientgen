using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoCoreWeb.Controllers
{
    [Produces("application/json")] //.net core difference: .net core 2.0 does not support these.let's see 2.1 upcoming. issue #40
    [Route("api/SpecialTypes")]
    public class SpecialTypesController : Controller
    {
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

        [HttpGet]
        [Route("AnonymousObject")]
        public object GetAnonymousObject()
        {
            return new
            {
                Id = 12345,
                Name = "Something",
            };
        }

        [HttpPost]
        [Route("AnonymousObject")]
        public object PostAnonymousObject([FromBody] dynamic obj)
        {
            if (obj == null)
            {
                System.Diagnostics.Debug.WriteLine("dynamic null");
                return new
                {
                    Id = 12345,
                    Name = "Something",
                };

            }
            obj.Id = obj.Id + "1";
            obj.Name = obj.Name + "1";
            return obj;
        }

    }
}