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
		public void TestGetHeroes()
		{
			var array = api.GetHeros();
			Assert.NotEmpty(array);
		}

		[Fact]
		public void TestGetHeroNotExists()
		{
			DemoWebApi.Controllers.Client.Hero h = api.GetHero(99999);
			//Console.WriteLine(h.Name); //No compiler warning here, since the lib is generated.
			Assert.Null(h);

			DemoWebApi.Controllers.Client.Hero h2 = GetNullHero();
			//Console.WriteLine(h2.Name); //no compiler warning here either.
			//DoSomethingWithHero(h2);
		}

		[Fact]
		public void TestPost()
		{
			var hero = api.Post("Abc");
			Assert.Equal("Abc", hero.Name);
		}

		[Fact]
		public void TestPostWithNull()
		{
			var hero = api.Post(null);
			Assert.Null(hero.Name);
		}

		[Fact]
		public void TestPostWithQuery()
		{
			var hero = api.PostWithQuery("Xyz");
			Assert.Equal("Xyz", hero.Name);
		}

		[return: System.Diagnostics.CodeAnalysis.MaybeNullAttribute()]
		DemoWebApi.Controllers.Client.Hero GetNullHero()
		{
			return null;
		}

		//void DoSomethingWithHero([System.Diagnostics.CodeAnalysis.NotNull()] DemoWebApi.Controllers.Client.Hero hero)
		//{
		//	System.Console.WriteLine(hero.Name);
		//}
	}
}
