using System;
using Xunit;

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
	[Collection(TestConstants.LaunchWebApiAndInit)]
	public class EntitiesFixture : IDisposable
	{
		public EntitiesFixture()
		{
			var baseUri = new Uri("http://localhost:5000/");

			httpClient = new System.Net.Http.HttpClient();
			Api = new DemoWebApi.Controllers.Client.Entities(httpClient, baseUri);
		}

		public DemoWebApi.Controllers.Client.Entities Api { get; private set; }

		System.Net.Http.HttpClient httpClient;

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


	public partial class EntitiesApiIntegration : IClassFixture<EntitiesFixture>
	{
		public EntitiesApiIntegration(EntitiesFixture fixture)
		{
			api = fixture.Api;
		}

		DemoWebApi.Controllers.Client.Entities api;

	}
}
