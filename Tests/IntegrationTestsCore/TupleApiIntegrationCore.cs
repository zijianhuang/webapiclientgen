using System;
using Xunit;

namespace IntegrationTests
{
	public class TupleFixture : IDisposable
    {
        public TupleFixture()
        {
            var baseUri = new Uri("http://localhost:5000/");

			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = baseUri
			};
			//httpClient.DefaultRequestHeaders
			//  .Accept
			//  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//.net core has different behavior as described at https://github.com/zijianhuang/webapiclientgen/issues/26

			Api = new DemoWebApi.Controllers.Client.Tuple(httpClient);
        }

        public DemoWebApi.Controllers.Client.Tuple Api { get; private set; }

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
	public partial class TupleApiIntegration : IClassFixture<TupleFixture>
    {
        public TupleApiIntegration(TupleFixture fixture)
        {
            api = fixture.Api;
        }

		readonly DemoWebApi.Controllers.Client.Tuple api;

    }
}
