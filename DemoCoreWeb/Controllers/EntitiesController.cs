using DemoWebApi.DemoData;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
#nullable enable
namespace DemoWebApi.Controllers
{
	// [EnableCors(origins: "*", headers:"*", methods:"*")] set globally in WebApiConfig.cs
	//   [Authorize]
	[Route("api/[controller]")]
	public class EntitiesController : ControllerBase
	{
		/// <summary>
		/// Get a person
		/// so to know the person
		/// </summary>
		/// <param name="id">unique id of that guy</param>
		/// <returns>person in db</returns>
		[HttpGet]
		[Route("getPerson/{id}")]
		public Person GetPerson(long id)
		{
			return new Person()
			{
				Surname = "Huang",
				GivenName = "Z",
				Name = "Z Huang",
				DOB = new DateOnly(1988,12, 31),
			};
		}

		[HttpGet]
		[Route("getPerson2/{id}")]
		public async Task<Person> GetPerson2(long id)
		{
			return new Person()
			{
				Surname = "Huang",
				GivenName = "Z",
				Name = "Z Huang",
				DOB = new DateOnly(2013, 11,24),
				Baptised= DateTimeOffset.Parse("2014-11-23"),
			};
		}

		[HttpPost]
		[Route("createPerson")]
		public long CreatePerson([FromBody] Person p)
		{
			Debug.WriteLine("CreatePerson: " + p.Name);

			if (p.Name == "Exception")
				throw new InvalidOperationException("It is exception");

			Debug.WriteLine("Create " + p);
			return 1000;
		}

		[HttpPost]
		[Route("createPerson2")]
		public async Task<Person> CreatePerson2([FromBody] Person p)
		{
			Debug.WriteLine("CreatePerson: " + p.Name);

			if (p.Name == "Exception")
				throw new InvalidOperationException("It is exception");

			Debug.WriteLine("Create " + p);
			return p;
		}

		[HttpPost]
		[Route("createPerson3")]
		public async Task<Person> CreatePerson3([FromBody] Person p, [FromHeader] string middle)
		{
			p.GivenName = middle;
			Debug.WriteLine("CreatePerson: " + p.Name);

			if (p.Name == "Exception")
				throw new InvalidOperationException("It is exception");

			Debug.WriteLine("Create " + p);
			return p;
		}

		[HttpPut]
		[Route("updatePerson")]
		public string UpdatePerson([FromBody] Person person)
		{
			return person.Name;
		}

		[HttpPatch]
		[Route("patchPerson")]
		public string PatchPerson([FromBody] Person person)
		{
			return person.Name;
		}

		[HttpPut]
		[Route("link")]
		public bool LinkPerson([FromQuery] long id, [FromQuery] string relationship, [FromBody] Person person)
		{
			return person != null && !String.IsNullOrEmpty(relationship);
		}

		[HttpDelete("{id}")]
		public void Delete(long id)
		{
			Debug.WriteLine("Delete " + id);
		}

		/// <summary>
		/// Return empty body, status 204.
		/// </summary>
		/// <returns></returns>
		[HttpGet("NullCompany")]
		public Company? GetNullCompany()
		{
			return null;
		}

		[Route("Company/{id}")]
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

		[HttpPost]
		[Route("createCompany")]
		public async Task<Company> CreateCompany([FromBody] Company p)
		{
			p.Id = Guid.NewGuid();
			return p;
		}


		//[HttpGet]
		//[Route("PersonActionNotFound")]
		//[ProducesResponseType(201, Type = typeof(Person))]
		//public IActionResult GetPersonActionNotFound(long id)
		//{
		//	return NotFound();
		//}

		[HttpPost]
		[Route("Mims")]
		public MimsResult<string> GetMims([FromBody] MimsPackage p)
		{
			return new MimsResult<string>
			{
				Success = true,
				Message = p.Tag,
				Result = p.Result.Result.ToString()
			};
		}

		/// <summary>
		/// Post MyGeneric string, decimal, double
		/// </summary>
		/// <param name="s"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("MyGeneric")]
		public MyGeneric<string, decimal, double> GetMyGeneric([FromBody] MyGeneric<string, decimal, double> s)
		{
			return new MyGeneric<string, decimal, double>
			{
				MyK = s.MyK,
				MyT = s.MyT,
				MyU = s.MyU,
				Status = s.Status,
			};
		}

		/// <summary>
		/// Post MyGeneric string, decimal, Person
		/// </summary>
		/// <param name="s"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("MyGenericPerson")]
		public MyGeneric<string, decimal, Person> GetMyGenericPerson([FromBody] MyGeneric<string, decimal, Person> s)
		{
			return new MyGeneric<string, decimal, Person>
			{
				MyK = s.MyK,
				MyT = s.MyT,
				MyU = s.MyU,
				Status = s.Status,
			};
		}

		[HttpPost("IdMap")]
		public IdMap PostIdMap([FromBody] IdMap idMap)
		{
			return idMap;
		}


	}
}
#nullable disable