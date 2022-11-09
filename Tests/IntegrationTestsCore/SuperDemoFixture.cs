using Fonlow.Testing;
using System;

namespace IntegrationTests
{
	public class SuperDemoFixture : DefaultHttpClient
	{
		public SuperDemoFixture()
		{
			var jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			Api = new DemoWebApi.Controllers.Client.SuperDemo(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.SuperDemo Api { get; private set; }
	}
}
