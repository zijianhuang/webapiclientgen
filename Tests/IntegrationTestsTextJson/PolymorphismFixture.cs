//using DemoCoreWeb.ClientApiTextJson;
//using Fonlow.Testing;
//using Fonlow.Text.Json.Auth;

//namespace IntegrationTests
//{
//	public class PolymorphismFixture : BasicHttpClient
//	{
//		public PolymorphismFixture()
//		{
//			System.Text.Json.JsonSerializerOptions jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web)
//			{
//				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull,
//			};
//			jsonSerializerSettings.Converters.Add(new TokenRequestConverter());

//			var c = TestingSettings.Instance.ServiceCommands[0];
//			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
//			Api = new PolymorphismClient(HttpClient, jsonSerializerSettings);
//		}

//		public PolymorphismClient Api { get; private set; }
//	}

//}
