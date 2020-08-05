using System;
using Xunit;
using DemoWebApi.DemoData.Client;

namespace IntegrationTests
{
	/*
	And make sure the testApi credential exists through
	POST to http://localhost:10965/api/Account/Register
	Content-Type: application/json

	{
	Email: 'testapi@test.com',
	Password: 'Tttttttt_8',
	ConfirmPassword:  'Tttttttt_8'
	}

	*/
	public class EntitiesFixture : IDisposable
	{
		public EntitiesFixture()
		{
			var baseUri = new Uri("http://localhost:5000/");

			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = baseUri
			};
			Api = new DemoWebApi.Controllers.Client.Entities(httpClient);
		}

		public DemoWebApi.Controllers.Client.Entities Api { get; private set; }

		readonly System.Net.Http.HttpClient httpClient;

		#region IDisposable pattern
		bool disposed;

		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		protected virtual void Dispose(bool disposing)
		{
			if (!disposed)
			{
				if (disposing)
				{
					httpClient.Dispose();
				}

				disposed = true;
			}
		}
		#endregion
	}


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

			var a = api.CreatePerson3(person, (headers)=> { headers.Add("middle", "Hey"); });
			Assert.Equal("Hey", a.GivenName);
		}

		[Fact]
		public void TestPatch()
		{
			var r = api.PatchPerson(new Person()
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


	}
}
