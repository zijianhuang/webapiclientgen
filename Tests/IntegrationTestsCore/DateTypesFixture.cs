using Fonlow.Testing;

namespace IntegrationTests
{
	public class DateTypesFixture : DefaultHttpClient
	{
		public DateTypesFixture()
		{
			var jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			//jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter()); no need to use these converters since .NET 7
			//jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			Api = new DemoWebApi.Controllers.Client.DateTypes(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.DateTypes Api { get; private set; }
	}
}
