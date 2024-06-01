using Fonlow.Testing;

namespace IntegrationTests
{
	public class DateTypesFixture : BasicHttpClient
	{
		public DateTypesFixture()
		{
			Newtonsoft.Json.JsonSerializerSettings jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			//jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter()); no need to use these converters since .NET 7
			//jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			var c = TestingSettings.Instance.ServiceCommands[0];
			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
			Api = new DemoWebApi.Controllers.Client.DateTypes(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.DateTypes Api { get; private set; }
	}
}
