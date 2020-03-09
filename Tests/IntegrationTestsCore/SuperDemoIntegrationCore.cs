using System;
using Xunit;

namespace IntegrationTests
{
	public class SuperDemoFixture : IDisposable
	{
		public SuperDemoFixture()
		{
			var baseUri = new Uri("http://localhost:5000/");

			httpClient = new System.Net.Http.HttpClient();
			httpClient.BaseAddress = baseUri;
			Api = new DemoWebApi.Controllers.Client.SuperDemo(httpClient);
		}

		public DemoWebApi.Controllers.Client.SuperDemo Api { get; private set; }

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


	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class SuperDemoApiIntegration : IClassFixture<SuperDemoFixture>
	{
		public SuperDemoApiIntegration(SuperDemoFixture fixture)
		{
			api = fixture.Api;
		}

		DemoWebApi.Controllers.Client.SuperDemo api;

	}
}
