using Fonlow.Testing;

namespace IntegrationTests
{
	public class SpecialTypesFixture : BasicHttpClient
	{
		public SpecialTypesFixture()
		{
			var c = TestingSettings.Instance.ServiceCommands[0];
			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
			Api = new DemoCoreWeb.Controllers.Client.SpecialTypes(HttpClient);
		}

		public DemoCoreWeb.Controllers.Client.SpecialTypes Api { get; private set; }
	}
}
