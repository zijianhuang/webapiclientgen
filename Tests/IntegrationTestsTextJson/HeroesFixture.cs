using Fonlow.Testing;

namespace IntegrationTests
{
	public class HeroesFixture : DefaultHttpClient
	{
		public HeroesFixture()
		{
			var jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions()
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault,
				PropertyNameCaseInsensitive = true,
				NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString, // newtonsoft.json along with converters may return long and int128 as string
			};

			//jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter());
			//jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			Api = new DemoWebApi.Controllers.Client.Heroes(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.Heroes Api { get; private set; }
	}


}
