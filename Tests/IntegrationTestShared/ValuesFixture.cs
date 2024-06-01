using Fonlow.Testing;

namespace IntegrationTests
{
	public class ValuesFixture : BasicHttpClient
	{
		public ValuesFixture()
		{
			//httpClient.DefaultRequestHeaders
			//  .Accept
			//  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//.net core has different behavior as described at https://github.com/zijianhuang/webapiclientgen/issues/26

			var c = TestingSettings.Instance.ServiceCommands[0];
			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
			Api = new DemoWebApi.Controllers.Client.Values(HttpClient);
		}

		public DemoWebApi.Controllers.Client.Values Api { get; private set; }
	}

}
