using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;


namespace IntegrationTests
{
	public class HeroesFixture : IDisposable
	{
		public HeroesFixture()
		{
			var baseUri = new Uri("http://localhost:56321/");

			httpClient = new System.Net.Http.HttpClient();
			httpClient.DefaultRequestHeaders
			  .Accept
			  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//.net core has different behavior as described at https://github.com/zijianhuang/webapiclientgen/issues/26

			Api = new DemoWebApi.Controllers.Client.Heroes(httpClient, baseUri);
		}

		public DemoWebApi.Controllers.Client.Heroes Api { get; private set; }

		System.Net.Http.HttpClient httpClient;

		#region IDisposable pattern
		bool disposed;

		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		protected virtual void Dispose(bool disposing)
		{
			if (!disposed)
			{
				if (disposing)
				{
					httpClient.Dispose();
				}

				disposed = true;
			}
		}
		#endregion
	}


	public class HeroesApiIntegration : IClassFixture<HeroesFixture>
	{
		public HeroesApiIntegration(HeroesFixture fixture)
		{
			api = fixture.Api;
		}

		DemoWebApi.Controllers.Client.Heroes api;

		[Fact]
		public void TestGet()
		{
			//var task = authorizedClient.GetStringAsync(new Uri(baseUri, "api/Heroes"));
			//var text = task.Result;
			//var array = JArray.Parse(text);
			var array = api.Get().ToArray();
			Assert.NotEmpty(array);
		}

		[Fact]
		public void TestPost()
		{
			var hero = api.Post("Abc");
			Assert.Equal("Abc", hero.Name);
		}

	}
}
