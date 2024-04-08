using Fonlow.Testing;

namespace IntegrationTests
{
	public class NumbersFixture : DefaultHttpClient
	{
		public NumbersFixture()
		{
			var jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions()
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault,
				PropertyNameCaseInsensitive = true,
			};

			Api = new DemoWebApi.Controllers.Client.Numbers(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.Numbers Api { get; private set; }
	}
}
