using System;
using Xunit;

namespace IntegrationTests
{
	public class ValuesFixture : IDisposable
    {
        public ValuesFixture()
        {
			var baseUri = new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            httpClient = new System.Net.Http.HttpClient();
            Api = new DemoWebApi.Controllers.Client.Values(httpClient, baseUri);
        }

        public DemoWebApi.Controllers.Client.Values Api { get; private set; }

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


    [Collection(TestConstants.IisExpressAndInit)]
    public partial class ValuesApiIntegration : IClassFixture<ValuesFixture>
    {
        public ValuesApiIntegration(ValuesFixture fixture)
        {
            api = fixture.Api;
        }

		readonly DemoWebApi.Controllers.Client.Values api;


    }
}
