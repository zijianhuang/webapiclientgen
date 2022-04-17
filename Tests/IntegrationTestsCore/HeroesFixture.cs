using Fonlow.Testing;

namespace IntegrationTests
{
	public class HeroesFixture : DefaultHttpClient
	{
		public HeroesFixture()
		{
			Api = new DemoWebApi.Controllers.Client.Heroes(HttpClient);
		}

		public DemoWebApi.Controllers.Client.Heroes Api { get; private set; }
	}


}
