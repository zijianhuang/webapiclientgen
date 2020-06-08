using System;
using Xunit;


namespace IntegrationTests
{
	public class ValuesFixture : IDisposable
	{
		public ValuesFixture()
		{
			var baseUri = new Uri("http://localhost:5000/");

			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = baseUri
			};
			//httpClient.DefaultRequestHeaders
			//  .Accept
			//  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//.net core has different behavior as described at https://github.com/zijianhuang/webapiclientgen/issues/26

			Api = new DemoWebApi.Controllers.Client.Values(httpClient);
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


	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class ValuesApiIntegration : IClassFixture<ValuesFixture>
	{
		public ValuesApiIntegration(ValuesFixture fixture)
		{
			api = fixture.Api;
		}

		readonly DemoWebApi.Controllers.Client.Values api;

	}
}
