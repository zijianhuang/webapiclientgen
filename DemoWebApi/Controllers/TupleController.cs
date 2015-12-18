using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoWebApi.Controllers
{
    /// <summary>
    /// https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.3.3
    /// </summary>
    [RoutePrefix("api/Tuple")]
    public class TupleController : ApiController
    {
        [HttpPost]
        [Route("PersonCompany1")]
        public DemoData.Person LinkPersonCompany1(Tuple<DemoData.Person, DemoData.Company> peopleAndCompany)
        {
            return peopleAndCompany.Item1;
        }

        [HttpPost]
        [Route("PeopleCompany2")]
        public DemoData.Person LinkPeopleCompany2(Tuple<DemoData.Person, DemoData.Company> peopleAndCompany)
        {
            return peopleAndCompany.Item1;
        }

        [HttpPost]
        [Route("PeopleCompany3")]
        public DemoData.Person LinkPeopleCompany3(Tuple<DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
        {
            return peopleAndCompany.Item1;
        }

        [HttpPost]
        [Route("PeopleCompany4")]
        public DemoData.Person LinkPeopleCompany4(Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
        {
            return peopleAndCompany.Item1;
        }

        [HttpGet]
        [Route("PeopleCompany4")]
        public Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> GetPeopleCompany4()
        {
            return null;
        }

        [HttpPost]
        [Route("PeopleCompany5")]
        public DemoData.Person LinkPeopleCompany5(Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
        {
            return peopleAndCompany.Item1;
        }

        [HttpGet]
        [Route("PeopleCompany5")]
        public Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> GetPeopleCompany5()
        {
            return null;
        }

        [HttpPost]
        [Route("PeopleCompany6")]
        public DemoData.Person LinkPeopleCompany6(Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
        {
            return peopleAndCompany.Item1;
        }

        [HttpPost]
        [Route("PeopleCompany7")]
        public DemoData.Person LinkPeopleCompany7(Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
        {
            return peopleAndCompany.Item1;
        }

        [HttpPost]
        [Route("PeopleCompany8")]
        public DemoData.Person LinkPeopleCompany8(Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
        {
            return peopleAndCompany.Item1;
        }



        [HttpGet]
        [Route("Tuple1")]
        public Tuple<int> GetTuple1()
        {
            return new Tuple<int>(1);
        }

        [HttpPost]
        [Route("Tuple1")]
        public int PostTuple1(Tuple<int> tuple)
        {
            return 1;
        }

        [HttpGet]
        [Route("Tuple2")]
        public Tuple<string, int> GetTuple2()
        {
            return new Tuple<string, int>("Two", 2);
        }

        [HttpPost]
        [Route("Tuple2")]
        public int PostTuple2(Tuple<string, int> tuple)
        {
            return 2;
        }

        [HttpGet]
        [Route("Tuple3")]
        public Tuple<string, string, int> GetTuple3()
        {
            return new Tuple<string, string, int>("One", "Two", 3);
        }

        [HttpPost]
        [Route("Tuple3")]
        public int PostTuple3(Tuple<string, string, int> tuple)
        {
            return 3;
        }

        [HttpGet]
        [Route("Tuple4")]
        public Tuple<string, string, string, int> GetTuple4()
        {
            return new Tuple<string, string, string, int>("One", "Two", "Three", 4);
        }

        [HttpPost]
        [Route("Tuple4")]
        public int PostTuple4(Tuple<string, string, string, int> tuple)
        {
            return 4;
        }

        [HttpGet]
        [Route("Tuple5")]
        public Tuple<string, string, string, string, int> GetTuple5()
        {
            return new Tuple<string, string, string, string, int>("One", "Two", "Three", "Four", 5);
        }

        [HttpPost]
        [Route("Tuple5")]
        public int PostTuple5(Tuple<string, string, string, string, int> tuple)
        {
            return 5;
        }

        [HttpGet]
        [Route("Tuple6")]
        public Tuple<string, string, string, string, string, int> GetTuple6()
        {
            return new Tuple<string, string, string, string, string, int>("One", "Two", "Three", "Four", "Five", 6);
        }

        [HttpPost]
        [Route("Tuple6")]
        public int PostTuple6(Tuple<string, string, string, string, string, int> tuple)
        {
            return 6;
        }

        [HttpGet]
        [Route("Tuple7")]
        public Tuple<string, string, string, string, string, string, int> GetTuple7()
        {
            return new Tuple<string, string, string, string, string, string, int>("One", "Two", "Three", "Four", "Five", "Six", 7);
        }

        [HttpPost]
        [Route("Tuple7")]
        public int PostTuple7(Tuple<string, string, string, string, string, string, int> tuple)
        {
            return 7;
        }

        [HttpGet]
        [Route("Tuple8")]
        public Tuple<string, string, string, string, string, string, string, int> GetTuple8()
        {
            return new Tuple<string, string, string, string, string, string, string, int>("One", "Two", "Three", "Four", "Five", "Six", "Seven", 8);
        }

        [HttpPost]
        [Route("Tuple8")]
        public int PostTuple8(Tuple<string, string, string, string, string, string, string, int> tuple)
        {
            return 8;
        }


    }
}
