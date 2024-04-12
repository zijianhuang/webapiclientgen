using Fonlow.Testing;

namespace IntegrationTests
{
	public class NumbersFixture : DefaultHttpClient
	{
		public NumbersFixture()
		{
			var jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web)
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault,
				PropertyNameCaseInsensitive = true,
				NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString | System.Text.Json.Serialization.JsonNumberHandling.WriteAsString
			};

			jsonSerializerSettings.Converters.Add(new DemoTextJsonWeb.BigIntegerConverter()); // both client and service must have the same conversion.

			Api = new DemoWebApi.Controllers.Client.Numbers(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.Numbers Api { get; private set; }
	}
}
