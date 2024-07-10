using Fonlow.Testing;

namespace IntegrationTests
{
	public class StringDataFixture : BasicHttpClient
	{
		public StringDataFixture()
		{
			var c = TestingSettings.Instance.ServiceCommands["LaunchWebApi"];
			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
			Api = new DemoWebApi.Controllers.Client.StringData(HttpClient);
		}

		public DemoWebApi.Controllers.Client.StringData Api { get; private set; }
	}
}
