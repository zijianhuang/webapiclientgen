using Microsoft.AspNetCore.Mvc;
using System;
namespace DemoWebApi.Controllers
{
	/// <summary>
	/// https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.3.3
	/// </summary>
	[Route("api/[controller]")]
	public class TupleController : ControllerBase
	{
		/// <summary>
		/// Update in a transaction
		/// </summary>
		/// <param name="idAndOrderArray"></param>
		[HttpPut("A1TupleArray")]
		public void A1TupleArray([FromBody] Tuple<Guid, int>[] idAndOrderArray)
		{
			//do nothing
		}

		/// <summary>
		/// Update IEnumerable Tuple in a transaction
		/// </summary>
		/// <param name="idAndOrderArray"></param>
		[HttpPut("A1TupleArray")]
		public void A2TupleIEnumerable([FromBody] System.Collections.Generic.IEnumerable<Tuple<Guid, int>> idAndOrderArray)
		{
			//do nothing
		}

		/// <summary>
		/// Post tuple
		/// </summary>
		/// <param name="d"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("ChangeName")]
		public DemoData.Person ChangeName([FromBody] Tuple<string, DemoData.Person> d)
		{
			d.Item2.Name = d.Item1;
			return d.Item2;
		}

		[HttpPost]
		[Route("PersonCompany1")]
		public DemoData.Person LinkPersonCompany1([FromBody] Tuple<DemoData.Person, DemoData.Company> peopleAndCompany)
		{
			return peopleAndCompany.Item1;
		}

		[HttpPost]
		[Route("PeopleCompany2")]
		public DemoData.Person LinkPeopleCompany2([FromBody] Tuple<DemoData.Person, DemoData.Company> peopleAndCompany)
		{
			return peopleAndCompany.Item1;
		}

		[HttpPost]
		[Route("PeopleCompany3")]
		public DemoData.Person LinkPeopleCompany3([FromBody] Tuple<DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
		{
			return peopleAndCompany.Item1;
		}

		[HttpPost]
		[Route("PeopleCompany4")]
		public DemoData.Person LinkPeopleCompany4([FromBody] Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
		{
			return peopleAndCompany.Item1;
		}

		/// <summary>
		/// Get Tuple in return. MaybeNull
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("PeopleCompany4")]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> GetPeopleCompany4()
		{
			return null;
		}

		[HttpPost]
		[Route("PeopleCompany5")]
		public DemoData.Person LinkPeopleCompany5([FromBody] Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
		{
			return peopleAndCompany.Item1;
		}

		/// <summary>
		/// MaybeNull
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("PeopleCompany5")]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> GetPeopleCompany5()
		{
			return null;
		}

		[HttpPost]
		[Route("PeopleCompany6")]
		public DemoData.Person LinkPeopleCompany6([FromBody] Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
		{
			return peopleAndCompany.Item1;
		}

		/// <summary>
		/// Post long tuple
		/// </summary>
		/// <param name="peopleAndCompany"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("PeopleCompany7")]
		public DemoData.Person LinkPeopleCompany7([FromBody] Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
		{
			return peopleAndCompany.Item1;
		}

		[HttpPost]
		[Route("PeopleCompany8")]
		public DemoData.Person LinkPeopleCompany8([FromBody] Tuple<DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Person, DemoData.Company> peopleAndCompany)
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
		public int PostTuple1([FromBody] Tuple<int> tuple)
		{
			return tuple.Item1;
		}

		[HttpGet]
		[Route("Tuple2")]
		public Tuple<string, int> GetTuple2()
		{
			return Tuple.Create<string, int>("Two", 2);
		}

		/// <summary>
		/// Post tuple string int
		/// </summary>
		/// <param name="tuple"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("Tuple2")]
		public string PostTuple2([FromBody] Tuple<string, int> tuple)
		{
			System.Diagnostics.Debug.WriteLine("Item1 is : "+tuple.Item1);
			return tuple.Item1;
		}

		[HttpGet]
		[Route("Tuple3")]
		public Tuple<string, string, int> GetTuple3()
		{
			return new Tuple<string, string, int>("Three", "Two", 3);
		}

		[HttpPost]
		[Route("Tuple3")]
		public string PostTuple3([FromBody] Tuple<string, string, int> tuple)
		{
			return tuple.Item1;
		}

		[HttpGet]
		[Route("Tuple4")]
		public Tuple<string, string, string, int> GetTuple4()
		{
			return new Tuple<string, string, string, int>("Four", "Two", "Three", 4);
		}

		[HttpPost]
		[Route("Tuple4")]
		public string PostTuple4([FromBody] Tuple<string, string, string, int> tuple)
		{
			return tuple.Item1;
		}

		[HttpGet]
		[Route("Tuple5")]
		public Tuple<string, string, string, string, int> GetTuple5()
		{
			return new Tuple<string, string, string, string, int>("Five", "Two", "Three", "Four", 5);
		}

		[HttpPost]
		[Route("Tuple5")]
		public string PostTuple5([FromBody] Tuple<string, string, string, string, int> tuple)
		{
			return tuple.Item1;
		}

		[HttpGet]
		[Route("Tuple6")]
		public Tuple<string, string, string, string, string, int> GetTuple6()
		{
			return new Tuple<string, string, string, string, string, int>("Six", "Two", "Three", "Four", "Five", 6);
		}

		[HttpPost]
		[Route("Tuple6")]
		public string PostTuple6([FromBody] Tuple<string, string, string, string, string, int> tuple)
		{
			return tuple.Item1;
		}

		[HttpGet]
		[Route("Tuple7")]
		public Tuple<string, string, string, string, string, long, int> GetTuple7()
		{
			return new Tuple<string, string, string, string, string, long, int>("Seven", "Two", "Three", "Four", "Five", 1000, 7);
		}

		[HttpPost]
		[Route("Tuple7")]
		public string PostTuple7([FromBody] Tuple<string, string, string, string, string, long, int> tuple)
		{
			return tuple.Item1;
		}

		/// <summary>
		/// Post nested tuple
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("Tuple8")]
		public Tuple<string, string, string, string, string, string, int, Tuple<string, string, string>> GetTuple8()
		{
			return new Tuple<string, string, string, string, string, string, int, Tuple<string, string, string>>("Nested", "Two", "Three", "Four", "Five", "Six", 7
				, new Tuple<string, string, string>("nine", "ten", "elevan"));
		}

		[HttpPost]
		[Route("Tuple8")]
		public string PostTuple8([FromBody] Tuple<string, string, string, string, string, string, string, Tuple<string, string, string>> tuple)
		{
			return tuple.Rest.Item1;
		}



	}
}