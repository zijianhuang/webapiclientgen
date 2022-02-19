using System;
using Xunit;
using Fonlow.Testing;

namespace IntegrationTests
{
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
