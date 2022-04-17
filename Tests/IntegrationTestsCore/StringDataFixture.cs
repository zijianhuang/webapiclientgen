using Fonlow.Testing;

namespace IntegrationTests
{
	public class StringDataFixture : DefaultHttpClient
	{
		public StringDataFixture()
		{
			Api = new DemoWebApi.Controllers.Client.StringData(HttpClient);
		}

		public DemoWebApi.Controllers.Client.StringData Api { get; private set; }
	}
}
