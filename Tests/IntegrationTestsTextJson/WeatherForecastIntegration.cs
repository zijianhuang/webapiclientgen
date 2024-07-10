using System.Linq;
using System.Threading.Tasks;
using Xunit;
namespace IntegrationTests
{
	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class WeatherForecastApiIntegration : IClassFixture<WeatherForecastFixture>
	{
		public WeatherForecastApiIntegration(WeatherForecastFixture fixture)
		{
			api = fixture.Api;
		}

		readonly WebApplication1.Controllers.Client.WeatherForecast api;

		[Fact]
		public void TestGet()
		{
			//var task = authorizedClient.GetStringAsync(new Uri(baseUri, "api/WeatherForecast"));
			//var text = task.Result;
			//var array = JArray.Parse(text);
			var array = api.Get();
			Assert.NotEmpty(array);
		}

	}
}
