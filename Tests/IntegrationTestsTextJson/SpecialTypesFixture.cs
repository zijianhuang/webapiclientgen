using Fonlow.Testing;

namespace IntegrationTests
{
	public class SpecialTypesFixture : BasicHttpClient
	{
		public SpecialTypesFixture()
		{
			System.Text.Json.JsonSerializerOptions jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web)
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull,
			}; 
			
			var c = TestingSettings.Instance.ServiceCommands[0];
			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
			Api = new DemoCoreWeb.Controllers.Client.SpecialTypes(HttpClient, jsonSerializerSettings);
		}

		public DemoCoreWeb.Controllers.Client.SpecialTypes Api { get; private set; }
	}
}
