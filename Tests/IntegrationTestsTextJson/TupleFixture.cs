using Fonlow.Testing;

namespace IntegrationTests
{
	public class TupleFixture : DefaultHttpClient
	{
		public TupleFixture()
		{
			System.Text.Json.JsonSerializerOptions jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions()
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault,
				PropertyNameCaseInsensitive = true,
				NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString
			};

			//jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter()); //not needed in ASP.NET 7
			//jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			Api = new DemoWebApi.Controllers.Client.Tuple(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.Tuple Api { get; private set; }
	}
}
