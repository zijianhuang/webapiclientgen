using System;
using System.Threading.Tasks;
using Xunit;
using Fonlow.Testing;

namespace IntegrationTests
{
	public class ValuesFixture : DefaultHttpClient
	{
		public ValuesFixture()
		{
			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = base.BaseUri
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

}
