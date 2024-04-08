using Fonlow.Testing;

namespace IntegrationTests
{
	public class SpecialTypesFixture : DefaultHttpClient
	{
		public SpecialTypesFixture()
		{
			Api = new DemoCoreWeb.Controllers.Client.SpecialTypes(HttpClient);
		}

		public DemoCoreWeb.Controllers.Client.SpecialTypes Api { get; private set; }
	}
}
