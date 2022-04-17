using Fonlow.DateOnlyExtensions;
using Fonlow.Testing;

namespace IntegrationTests
{
	/*
	And make sure the testApi credential exists through
	POST to http://localhost:10965/api/Account/Register
	Content-Type: application/json

	{
	Email: 'testapi@test.com',
	Password: 'Tttttttt_8',
	ConfirmPassword:  'Tttttttt_8'
	}

	*/
	public class EntitiesFixture : DefaultHttpClient
	{
		public EntitiesFixture()
		{
			var jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings() 
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			Api = new DemoWebApi.Controllers.Client.Entities(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.Entities Api { get; private set; }
	}

}
