using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DemoWebApi.DemoData;
using System.Diagnostics;
using System.Web.Http.Cors;

namespace DemoWebApi.Controllers
{
   // [EnableCors(origins: "*", headers:"*", methods:"*")] set globally in WebApiConfig.cs
    [Authorize]
    [RoutePrefix("api/SuperDemo")]
    public class EntitiesController : ApiController
    {
        /// <summary>
        /// Get a person
        /// </summary>
        /// <param name="id">unique id of that guy</param>
        /// <returns>person in db</returns>
        [HttpGet]
        public Person GetPerson(long id)
        {
            return new Person()
            {
                Surname = "Huang",
                GivenName = "Z",
                Name = "Z Huang",
                DOB = DateTime.Now.AddYears(-20),
            };
        }

        [HttpPost]
        public long CreatePerson(Person p)
        {
            Debug.WriteLine("CreatePerson: " + p.Name);

            if (p.Name == "Exception")
                throw new InvalidOperationException("It is exception");

            Debug.WriteLine("Create " + p);
            return 1000;
        }

        [HttpPut]
        public void UpdatePerson(Person person)
        {
            Debug.WriteLine("Update " + person);
        }

        [HttpPut]
        [Route("link")]
        public bool LinkPerson(long id, string relationship, [FromBody] Person person)
        {
            return person != null && !String.IsNullOrEmpty(relationship);
        }

        [HttpDelete]
        public void Delete(long id)
        {
            Debug.WriteLine("Delete " + id);
        }

        [Route("Company")]
        [HttpGet]
        public Company GetCompany(long id)
        {
            return new Company()
            {
                Name = "Super Co",
                Addresses = new List<Address>(new Address[]
                {
                    new Address()
                    {
                        Street1="somewhere street",
                        State="QLD",
                        Type= AddressType.Postal,
                    },

                    new Address()
                    {
                        Street1="Rainbow rd",
                        State="Queensland",
                        Type= AddressType.Residential,
                    }
                }),

                Int2D = new int[,] {
               {1,2,3, 4 },
               {5,6,7, 8 }
            },

                Int2DJagged = new int[][]
            {
               new int[] {1,2,3, 4 },
               new int[] {5,6,7, 8 }
            },

               
            };
        }


        [HttpGet]
        [Route("PersonNotFound")]
        public Person GetPersonNotFound(long id)
        {
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        [HttpGet]
        [Route("PersonActionNotFound")]
        [System.Web.Http.Description.ResponseType(typeof(Person))]
        public IHttpActionResult GetPersonActionNotFound(long id)
        {
            return NotFound();
        }



    }
}
