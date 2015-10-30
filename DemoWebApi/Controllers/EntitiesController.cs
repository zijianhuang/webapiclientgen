using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DemoWebApi.DemoData;
using System.Diagnostics;

namespace DemoWebApi.Controllers
{
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
                BirthDate=DateTime.Now.AddYears(-20),
            };
        }

        [HttpPost]
        public long CreatePerson(Person person)
        {
            Debug.WriteLine("Create " + person);
            return 1000;
        }

        [HttpPut]
        public void UpdatePerson(Person person)
        {
            Debug.WriteLine("Update " + person);
        }

        [HttpDelete]
        public void Delete(long id)
        {
            Debug.WriteLine("Delete " + id);
        }

        
    }
}
