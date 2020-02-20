using System.Linq;
using Xunit;


namespace IntegrationTests
{
	public partial class HeroesApiIntegration 
	{

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
