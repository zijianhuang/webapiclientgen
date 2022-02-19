using System;
using Xunit;
using Fonlow.Testing;

namespace IntegrationTests
{
	public class SpecialTypesFixture : DefaultHttpClient
	{
		public SpecialTypesFixture()
		{
			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = base.BaseUri
			};

			Api = new DemoCoreWeb.Controllers.Client.SpecialTypes(httpClient);
		}

		public DemoCoreWeb.Controllers.Client.SpecialTypes Api { get; private set; }

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
