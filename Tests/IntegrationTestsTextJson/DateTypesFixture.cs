using Fonlow.Testing;

namespace IntegrationTests
{
	public class DateTypesFixture : BasicHttpClient
	{
		public DateTypesFixture()
		{
			System.Text.Json.JsonSerializerOptions jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions()
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull,
				PropertyNameCaseInsensitive = true,
			};

			//jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter()); for .NET 6, no need in .NET 7, 8,
			//jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			var c = TestingSettings.Instance.ServiceCommands[0];
			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
			Api = new DemoWebApi.Controllers.Client.DateTypes(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.DateTypes Api { get; private set; }
	}
}
