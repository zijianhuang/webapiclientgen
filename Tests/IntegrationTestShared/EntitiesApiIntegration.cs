using DemoWebApi.DemoData.Client;
using Fonlow.Net.Http;
using System;
using System.Net;
using Xunit;

namespace IntegrationTests
{
	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class EntitiesApiIntegration : IClassFixture<EntitiesFixture>
	{
		public EntitiesApiIntegration(EntitiesFixture fixture)
		{
			api = fixture.Api;
		}

		readonly DemoWebApi.Controllers.Client.Entities api;


		[Fact]
		public void TestCreatePerson3()
		{
			Person person = new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = new DateOnly(1988, 11, 23),
				Baptised = DateTimeOffset.Now.Date.AddYears(-20),
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

			Person a = api.CreatePerson3(person, (headers) => { headers.Add("middle", "Hey"); });
			Assert.Equal("Hey", a.GivenName);
			Assert.Equal(person.DOB, a.DOB);
			Assert.Equal(person.Baptised, a.Baptised);
			Assert.Equal(person.Baptised.Value.Offset, a.Baptised.Value.Offset); //Even if the host is in Hawaii.
		}

		[Fact]
		public void TestCreatePerson3DobNotDefined()
		{
			Person person = new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				//DOB = null,// new DateOnly(1988, 11, 23),
				Baptised = DateTimeOffset.Now.Date.AddYears(-20),
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

			Person a = api.CreatePerson3(person, (headers) => { headers.Add("middle", "Hey"); });
			Assert.Equal("Hey", a.GivenName);
			Assert.Equal(person.DOB, a.DOB);
			Assert.Equal(person.Baptised, a.Baptised);
		}

		[Fact]
		public void TestCreatePerson3DobAssignedNull()
		{
			Person person = new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = null,
				Baptised = DateTimeOffset.Now.Date.AddYears(-20),
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

			Person a = api.CreatePerson3(person, (headers) => { headers.Add("middle", "Hey"); });
			Assert.Equal("Hey", a.GivenName);
			Assert.Equal(person.DOB, a.DOB);
			Assert.Equal(person.Baptised, a.Baptised);
		}

		[Fact]
		public void TestCreatePersonByAdmin()
		{
			Person person = new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = new DateOnly(1988, 11, 23),
				Baptised = DateTimeOffset.Now.Date.AddYears(-20),
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

			Person a = api.CreatePersonByAdmin(person, (headers) => { headers.Add("middle", "Hey"); });
			Assert.Equal(person.DOB, a.DOB);
			Assert.Equal(person.Baptised, a.Baptised);
			Assert.Equal(person.Baptised.Value.Offset, a.Baptised.Value.Offset); //Even if the host is in Hawaii.
		}

		[Fact]
		public void TestCreatePersonWeak()
		{
			Person person = new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = new DateOnly(1988, 11, 23),
				Baptised = DateTimeOffset.Now.Date.AddYears(-20),
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

			Person a = api.CreatePersonWeak(person, (headers) => { headers.Add("middle", "Hey"); });
			Assert.Equal(person.DOB, a.DOB);
			Assert.Equal(person.Baptised, a.Baptised);
			Assert.Equal(person.Baptised.Value.Offset, a.Baptised.Value.Offset); //Even if the host is in Hawaii.
		}

		[Fact]
		public void TestCreatePersonWithNotFound()
		{
			Person person = new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = new DateOnly(1988, 11, 23),
				Baptised = DateTimeOffset.Now.Date.AddYears(-20),
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

			Person a = api.CreatePersonWithNotFound(person, (headers) => { headers.Add("middle", "Hey"); });
			Assert.Equal(person.DOB, a.DOB);
			Assert.Equal(person.Baptised, a.Baptised);
			Assert.Equal(person.Baptised.Value.Offset, a.Baptised.Value.Offset); //Even if the host is in Hawaii.
		}

		[Fact]
		public void TestCreatePersonWithStatuses()
		{
			Person person = new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = new DateOnly(1988, 11, 23),
				Baptised = DateTimeOffset.Now.Date.AddYears(-20),
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

			Person a = api.CreatePersonWithStatuses(person, (headers) => { headers.Add("middle", "Hey"); });
			Assert.Equal(person.DOB, a.DOB);
			Assert.Equal(person.Baptised, a.Baptised);
			Assert.Equal(person.Baptised.Value.Offset, a.Baptised.Value.Offset); //Even if the host is in Hawaii.
		}



		[Fact]
		public void TestCreateCompany()
		{
			DateOnly regDate = DateOnly.FromDateTime(DateTime.Today.AddDays(-1));
			DateTimeOffset foundDate = DateTimeOffset.Now.Date.AddDays(-2);
			Company c = new Company
			{
				Name = "Super Co",
				FoundDate = foundDate,
				RegisterDate = regDate,
				BusinessNumber="12345"
			};

			Company a = api.CreateCompany(c);
			Assert.NotNull(a.Id);
			Assert.Equal(regDate, a.RegisterDate);
			Assert.Equal(foundDate, a.FoundDate);
			Assert.Equal("12345", a.BusinessNumber);
		}

		[Fact]
		public void TestCreateCompany2()
		{
			Company c = new Company
			{
				Name = "Super Co",
			};

			Company a = api.CreateCompany(c);
			Assert.NotNull(a.Id);
			Assert.Equal(DateOnly.MinValue, a.RegisterDate);
			Assert.Equal(c.FoundDate, a.FoundDate);
			Assert.Equal(DateTimeOffset.MinValue, a.FoundDate);
		}

		[Fact]
		public void TestPatch()
		{
			string r = api.PatchPerson(new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = new DateOnly(1988, 11, 23),
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
		public void TestCreatePerson()
		{
			Person person = new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = new DateOnly(1988, 11, 23),
				Baptised = DateTimeOffset.Now.Date.AddYears(-20),
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

			long id = api.CreatePerson(person);
			Assert.True(id > 0);
		}

		[Fact]
		public void TestCreatePersonWithExceptionName()
		{
			Person person = new Person()
			{
				Name = "Exception",
				Surname = "One",
				GivenName = "Some",
				DOB = new DateOnly(1988, 11, 23),
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

			WebApiRequestException ex = Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() => api.CreatePerson(person));
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
			string r = api.UpdatePerson(new Person()
			{
				Name = "Some One",
				Surname = "One",
				GivenName = "Some",
				DOB = new DateOnly(1988, 11, 23),
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
			Person person = api.GetPerson(100);
			Assert.NotNull(person);
			Assert.Equal("Huang", person.Surname);
			Assert.True(person.DOB.HasValue);
			Assert.Null(person.Baptised);
			Assert.Equal(1988, person.DOB.Value.Year);
		}

		/// <summary>
		/// Expected to fail, before MS would fix Text.Json.JsonSerializer for Jagged array
		/// </summary>
		[Fact(Skip = "Unitl MS would fix Text.Json.JsonSerializer for Jagged array")]
		public void TestGetCompany()
		{
			Company c = api.GetCompany(1);
			Assert.Equal("Super Co", c.Name);
			Assert.Equal(2, c.Addresses.Count);
			Assert.Equal(AddressType.Postal, c.Addresses[0].Type);
			Assert.Equal(AddressType.Residential, c.Addresses[1].Type);
			Assert.Equal(8, c.Int2D[1, 3]);
			Assert.Equal(8, c.Int2DJagged[1][3]);

		}

		[Fact]
		public void TestGetNullCompany()
		{
			Company c = api.GetNullCompany();
			Assert.Null(c);
		}

		[Fact]
		public void TestGetMimsString()
		{
			MimsResult<string> c = api.GetMims(new MimsPackage
			{
				Tag = "Hello",
				KK = 99,
				Result = new MimsResult<decimal>
				{
					Result = 123.45m,
				}
			});

			Assert.Equal("Hello", c.Message);
			Assert.Equal("123.45", c.Result);
		}

		[Fact]
		public void TestMyGeneric()
		{
			MyGeneric<string, decimal, double> c = api.GetMyGeneric(new MyGeneric<string, decimal, double>
			{
				MyK = 123.456m,
				MyT = "abc",
				MyU = 123e10,
			});

			Assert.Equal("abc", c.MyT);
			Assert.Equal(123.456m, c.MyK);
			Assert.Equal(123e10, c.MyU);
		}

		[Fact]
		public void TestMyGenericPerson()
		{
			MyGeneric<string, decimal, Person> c = api.GetMyGenericPerson(new MyGeneric<string, decimal, Person>
			{
				MyK = 123.456m,
				MyT = "abc",
				MyU = new Person
				{
					Name = "Somebody",
				},
				Status = "OK"

			});

			Assert.Equal("Somebody", c.MyU.Name);
			Assert.Equal("OK", c.Status);
		}

		[Fact]
		public void TestPostIdMap_MissingRequiredName()
		{
			IdMap d = new IdMap
			{

			};

			WebApiRequestException ex = Assert.Throws<WebApiRequestException>(() => api.PostIdMap(d));
			Assert.Equal(HttpStatusCode.BadRequest, ex.StatusCode);
			//var r = api.PostIdMap(d);  //payload is {"Id":"00000000-0000-0000-0000-000000000000"}, while RequiredName is with IsRequired=true;
			//Assert.Null(r); // Without validation checking, the Web API receive null.
		}

		[Fact]
		public void TestPostIdMap()
		{
			IdMap d = new IdMap
			{
				RequiredName = "Hey"
			};
			IdMap r = api.PostIdMap(d);  //payload is {"Id":"00000000-0000-0000-0000-000000000000"}, while RequiredName is with IsRequired=true;
			Assert.Equal(Guid.Empty, r.Id);
			Assert.Equal(Guid.Empty, r.IdNotEmitDefaultValue);
		}
	}
}
