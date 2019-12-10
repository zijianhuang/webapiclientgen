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
    //   [Authorize]
    [RoutePrefix("api/Entities")]
    public class EntitiesController : ApiController
    {
        /// <summary>
        /// Get a person
        /// so to know the person
        /// </summary>
        /// <param name="id">unique id of that guy</param>
        /// <returns>person in db</returns>
        [HttpGet]
        [Route("getPerson")]
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
        [Route("createPerson")]
        public long CreatePerson(Person p)
        {
            if (p.Name == "Exception")
                throw new InvalidOperationException("It is exception");

            Debug.WriteLine("Create " + p);
            return 1000;
        }

        [HttpPut]
        [Route("updatePerson")]
        public string UpdatePerson(Person person)
        {
			return person.Name;
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

        [HttpPost]
        [Route("Mims")]
        public MimsResult<string> GetMims(MimsPackage p)
        {
            return new MimsResult<string>
            {
                Success = true,
                Message = p.Tag,
                Result = p.Result.Result.ToString()
            };
        }

        [HttpPost]
        [Route("MyGeneric")]
        public MyGeneric<string, decimal, double> GetMyGeneric(MyGeneric<string, decimal, double> s)
        {
            return new MyGeneric<string, decimal, double>
            {
                MyK = s.MyK,
                MyT = s.MyT,
                MyU = s.MyU,
                Status=s.Status,
            };
        }

        [HttpPost]
        [Route("MyGenericPerson")]
        public MyGeneric<string, decimal, Person> GetMyGenericPerson(MyGeneric<string, decimal, Person> s)
        {
            return new MyGeneric<string, decimal, Person>
            {
                MyK = s.MyK,
                MyT = s.MyT,
                MyU = s.MyU,
                Status=s.Status,
            };
        }

        [HttpPost]
        [Route("linkLong")]
        public long LinkWithNewLong([FromUri] long id, [FromBody] Person p)
        {
            return 1000;
        }

        [HttpPost]
        [Route("linkNewGuid")]
        public Guid LinkWithNewGuid([FromUri] Guid id, [FromBody] Person p)
        {
            return Guid.NewGuid();
        }

        [HttpPost]
        [Route("linkNewDecimal")]
        public Guid LinkWithNewDecimal([FromUri] decimal id, [FromBody] Person p)
        {
            return Guid.NewGuid();
        }

    }
}
