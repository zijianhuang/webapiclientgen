using Fonlow.Testing;

namespace IntegrationTests
{
	public class TextDataFixture : BasicHttpClient
	{
		public TextDataFixture()
		{
			var c = TestingSettings.Instance.ServiceCommands["LaunchWebApi"];
			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
			Api = new DemoWebApi.Controllers.Client.TextData(HttpClient);
		}

		public DemoWebApi.Controllers.Client.TextData Api { get; private set; }
	}
}
