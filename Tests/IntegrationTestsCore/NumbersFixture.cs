using Fonlow.Testing;

namespace IntegrationTests
{
	public class NumbersFixture : DefaultHttpClient
	{
		public NumbersFixture()
		{
			Newtonsoft.Json.JsonSerializerSettings jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			Api = new DemoWebApi.Controllers.Client.Numbers(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.Numbers Api { get; private set; }
	}
}
