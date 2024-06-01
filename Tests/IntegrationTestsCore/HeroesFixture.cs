using Fonlow.Testing;

namespace IntegrationTests
{
	public class HeroesFixture : BasicHttpClient
	{
		public HeroesFixture()
		{
			var c = TestingSettings.Instance.ServiceCommands[0];
			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
			Api = new DemoWebApi.Controllers.Client.Heroes(HttpClient);
		}

		public DemoWebApi.Controllers.Client.Heroes Api { get; private set; }
	}


}
