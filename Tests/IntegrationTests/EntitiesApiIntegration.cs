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
	public class EntitiesFixture : IDisposable
    {
        public EntitiesFixture()
        {
            var baseUri = new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
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


    [Collection(TestConstants.IisExpressAndInit)]
    public partial class EntitiesApiIntegration : IClassFixture<EntitiesFixture>
	{
		public EntitiesApiIntegration(EntitiesFixture fixture)
		{
			api = fixture.Api;
		}

		DemoWebApi.Controllers.Client.Entities api;


		[Fact]
		public void TestGetNotFound()
		{
			var ex = Assert.Throws<System.Net.Http.HttpRequestException>(() =>
			{
				var person = api.GetPersonNotFound(100);
			});

			Assert.Contains("404", ex.Message);
		}

		[Fact]
		public void TestGetActionNotFound()
		{
			var ex = Assert.Throws<System.Net.Http.HttpRequestException>(() =>
			{
				var person = api.GetPersonActionNotFound(100);
			});

			Assert.Contains("404", ex.Message);
		}
	}
}
