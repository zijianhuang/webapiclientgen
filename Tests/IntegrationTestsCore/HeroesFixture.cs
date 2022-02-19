using System;
using Xunit;
using Fonlow.Testing;

namespace IntegrationTests
{
	public class HeroesFixture : DefaultHttpClient
	{
		public HeroesFixture()
		{
			httpClient = new System.Net.Http.HttpClient
			{
				//httpClient.DefaultRequestHeaders
				//  .Accept
				//  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//.net core has different behavior as described at https://github.com/zijianhuang/webapiclientgen/issues/26

				BaseAddress = base.BaseUri,
			};
			Api = new DemoWebApi.Controllers.Client.Heroes(httpClient);
		}

		public DemoWebApi.Controllers.Client.Heroes Api { get; private set; }

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


}
