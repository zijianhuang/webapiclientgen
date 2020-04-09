using DemoWebApi.DemoData.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace IntegrationTests
{
	public partial class EntitiesApiIntegration
	{
		[Fact]
		public void TestCreatePerson()
		{
			Person person = new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = DateTime.Now.AddYears(-20),
				Addresses = new Address[]{new Address(){
					City="Brisbane",
					State="QLD",
					Street1="Somewhere",
					Street2="Over the rainbow",
					PostalCode="4000",
					Country="Australia",
					Type= AddressType.Postal,
					Location = new DemoWebApi.DemoData.Another.Client.MyPoint() {X=4, Y=9 },
				}},
			};

			var id = api.CreatePerson(person);
			Assert.True(id > 0);
		}

		//This one works for ASP.NET Web API, but .NET Core Web API is not checking the RequiredAttribute, as described at https://www.strathweb.com/2017/12/required-and-bindrequired-in-asp-net-core-mvc/
		// Application developer may follow the 2nd part of the article.
		//[Fact]
		//public void TestCreatePersonWithEmptyName()
		//{
		//	Person person = new Person()
		//	{
		//		Name = null,
		//		Surname = "One",
		//		GivenName = "Some",
		//		DOB = DateTime.Now.AddYears(-20),
		//		Addresses = new Address[]{new Address(){
		//			City="Brisbane",
		//			State="QLD",
		//			Street1="Somewhere",
		//			Street2="Over the rainbow",
		//			PostalCode="4000",
		//			Country="Australia",
		//			Type= AddressType.Postal,
		//			Location = new DemoWebApi.DemoData.Another.Client.MyPoint() {X=4, Y=9 },
		//	  }},
		//	};

		//	var ex = Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() => api.CreatePerson(person));
		//	System.Diagnostics.Debug.WriteLine(ex.ToString());
		//}

		[Fact]
		public void TestCreatePersonWithExceptionName()
		{
			Person person = new Person()
			{
				Name = "Exception",
				Surname = "One",
				GivenName = "Some",
				DOB = DateTime.Now.AddYears(-20),
				Addresses = new Address[]{new Address(){
					City="Brisbane",
					State="QLD",
					Street1="Somewhere",
					Street2="Over the rainbow",
					PostalCode="4000",
					Country="Australia",
					Type= AddressType.Postal,
					Location = new DemoWebApi.DemoData.Another.Client.MyPoint() {X=4, Y=9 },
			  }},
			};

			var ex = Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() => api.CreatePerson(person));
			System.Diagnostics.Debug.WriteLine(ex.ToString());
		}

		[Fact]
		public void TestDelete()
		{
			api.Delete(1000);
		}

		[Fact]
		public void TestUpdate()
		{
			var r = api.UpdatePerson(new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = DateTime.Now.AddYears(-20),
				Addresses = new Address[]{new Address(){
					City="Brisbane",
					State="QLD",
					Street1="Somewhere",
					Street2="Over the rainbow",
					PostalCode="4000",
					Country="Australia",
					Type= AddressType.Postal,
				}},
			}
			);

			Assert.Equal("Some One", r);
		}

		[Fact]
		public void TestGet()
		{
			var person = api.GetPerson(100);
			Assert.NotNull(person);
			Assert.Equal("Huang", person.Surname);
			Assert.True(person.DOB.HasValue);
			Assert.Equal(DateTime.Now.Year - 20, person.DOB.Value.Year);
		}


		[Fact]
		public void TestGetCompany()
		{
			var c = api.GetCompany(1);
			Assert.Equal("Super Co", c.Name);
			Assert.Equal(2, c.Addresses.Length);
			Assert.Equal(AddressType.Postal, c.Addresses[0].Type);
			Assert.Equal(AddressType.Residential, c.Addresses[1].Type);
			Assert.Equal(8, c.Int2D[1, 3]);
			Assert.Equal(8, c.Int2DJagged[1][3]);

		}

		[Fact]
		public void TestGetMimsString()
		{
			var c = api.GetMims(new MimsPackage
			{
				Tag = "Hello",
				KK=99,
				Result = new MimsResult<decimal>
				{
					Result = 123.45m,
				}
			});

			Assert.Equal("Hello", c.Message);
			Assert.Equal("123.45", c.Result);
		}

		[Fact]
		public void TestGetMimsStringWithInvalidKK()
		{
			var r = Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() => api.GetMims(new MimsPackage
			{
				Tag = "Hello",
				Result = new MimsResult<decimal>
				{
					Result = 123.45m
				}
			}));
			Console.WriteLine(r.Message);
		}

		[Fact]
		public void TestMyGeneric()
		{
			var c = api.GetMyGeneric(new MyGeneric<string, decimal, double>
			{
				MyK= 123.456m,
				MyT = "abc",
				MyU=123e10,
			});

			Assert.Equal("abc", c.MyT);
			Assert.Equal(123.456m, c.MyK);
			Assert.Equal(123e10, c.MyU);
		}

		[Fact]
		public void TestMyGenericPerson()
		{
			var c = api.GetMyGenericPerson(new MyGeneric<string, decimal, Person>
			{
				MyK = 123.456m,
				MyT = "abc",
				MyU= new Person
				{
					Name="Somebody",
				},
				Status="OK"

			});

			Assert.Equal("Somebody", c.MyU.Name);
			Assert.Equal("OK", c.Status);
		}
	}
}
