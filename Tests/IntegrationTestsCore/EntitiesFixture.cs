using System;
using Xunit;
using DemoWebApi.DemoData.Client;
using Fonlow.DateOnlyExtensions;
using Fonlow.Testing;

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
	public class EntitiesFixture : DefaultHttpClient
	{
		public EntitiesFixture()
		{
			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = base.BaseUri,
			};

			var jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings() 
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateTimeOffsetJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateTimeOffsetNullableJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateTimeJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateTimeNullableJsonConverter());

			Api = new DemoWebApi.Controllers.Client.Entities(httpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.Entities Api { get; private set; }

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
