using Fonlow.Testing;

namespace IntegrationTests
{
	public class DateTypesFixture : DefaultHttpClient
	{
		public DateTypesFixture()
		{
			System.Text.Json.JsonSerializerOptions jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions()
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.Never,
				PropertyNameCaseInsensitive = true,
			};

			//jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter()); for .NET 6, no need in .NET 7, 8,
			//jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			Api = new DemoWebApi.Controllers.Client.DateTypes(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.DateTypes Api { get; private set; }
	}
}
