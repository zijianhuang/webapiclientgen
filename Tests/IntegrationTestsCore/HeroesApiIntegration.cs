using System;
using Xunit;


namespace IntegrationTests
{
	public class HeroesFixture : IDisposable
	{
		public HeroesFixture()
		{
			var baseUri = new Uri("http://localhost:5000/");

			httpClient = new System.Net.Http.HttpClient
			{
				//httpClient.DefaultRequestHeaders
				//  .Accept
				//  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//.net core has different behavior as described at https://github.com/zijianhuang/webapiclientgen/issues/26

				BaseAddress = baseUri
			};
			Api = new DemoWebApi.Controllers.Client.Heroes(httpClient);
		}

		public DemoWebApi.Controllers.Client.Heroes Api { get; private set; }

		readonly System.Net.Http.HttpClient httpClient;

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


	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class HeroesApiIntegration : IClassFixture<HeroesFixture>
	{
		public HeroesApiIntegration(HeroesFixture fixture)
		{
			api = fixture.Api;
		}

		readonly DemoWebApi.Controllers.Client.Heroes api;


		[Fact]
		public async void TestGetAsyncHeroes()
		{
			var array = await api.GetAsyncHeroesAsync();
			Assert.NotEmpty(array);
		}

		[Fact]
		public void TestGet()
		{
			var array = api.GetHeros();
			Assert.NotEmpty(array);
		}

		[Fact]
		public void TestPost()
		{
			var hero = api.Post("Abc");
			Assert.Equal("Abc", hero.Name);
		}

		[Fact]
		public void TestPostWithQuery()
		{
			var hero = api.PostWithQuery("Xyz");
			Assert.Equal("Xyz", hero.Name);
		}

		[Fact]
		public void TestSearch()
		{
			var heroes = api.Search("Torna");
			Assert.Single(heroes);
			Assert.Equal("Tornado", heroes[0].Name);
		}


	}
}
