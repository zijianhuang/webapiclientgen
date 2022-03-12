using Fonlow.DateOnlyExtensions;
using Fonlow.Testing;
using System;

namespace IntegrationTests
{
	public class SuperDemoFixture : DefaultHttpClient
	{
		public SuperDemoFixture()
		{
			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = base.BaseUri
			};

			var jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			Api = new DemoWebApi.Controllers.Client.SuperDemo(httpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.SuperDemo Api { get; private set; }

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
