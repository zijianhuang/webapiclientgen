using Fonlow.Testing;

namespace IntegrationTests
{
	public class WeatherForecastFixture : BasicHttpClient
	{
		public WeatherForecastFixture()
		{
			//httpClient.DefaultRequestHeaders
			//  .Accept
			//  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//.net core has different behavior as described at https://github.com/zijianhuang/webapiclientgen/issues/26

			var c = TestingSettings.Instance.ServiceCommands["LaunchWebApi"];
			this.HttpClient.BaseAddress = new System.Uri(c.BaseUrl);
			Api = new  WebApplication1.Controllers.Client.WeatherForecast(HttpClient);
		}

		public WebApplication1.Controllers.Client.WeatherForecast Api { get; private set; }
	}

}
