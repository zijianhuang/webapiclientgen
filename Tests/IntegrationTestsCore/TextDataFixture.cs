using Fonlow.Testing;
using System;

namespace IntegrationTests
{
	public class TextDataFixture : DefaultHttpClient
	{
		public TextDataFixture()
		{
			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = base.BaseUri
			};

			Api = new DemoWebApi.Controllers.Client.TextData(httpClient);
		}

		public DemoWebApi.Controllers.Client.TextData Api { get; private set; }

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
