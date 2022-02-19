using System;
using Xunit;
using Fonlow.Testing;

namespace IntegrationTests
{
	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class SpecialTypesApiIntegration : IClassFixture<SpecialTypesFixture>
	{
		public SpecialTypesApiIntegration(SpecialTypesFixture fixture)
		{
			api = fixture.Api;
		}

		readonly DemoCoreWeb.Controllers.Client.SpecialTypes api;

		[Fact]
		public void TestGetAnonymousDynamic()
		{
			var d = api.GetAnonymousDynamic();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestGetAnonymousObject()
		{
			var d = api.GetAnonymousObject();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestPostAnonymousObject()
		{
			var d = new Newtonsoft.Json.Linq.JObject
			{
				["Id"] = "12345",
				["Name"] = "Something"
			};
			var r = api.PostAnonymousObject(d);
			Assert.Equal("123451", r["Id"].ToString());
			Assert.Equal("Something1", r["Name"].ToString());

		}

		[Fact]
		public void TestGetAnonymousDynamic2()
		{
			var d = api.GetAnonymousDynamic2();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestGetAnonymousObject2()
		{
			var d = api.GetAnonymousObject2();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestPostAnonymousObject2()
		{
			var d = new Newtonsoft.Json.Linq.JObject
			{
				["Id"] = "12345",
				["Name"] = "Something"
			};
			var r = api.PostAnonymousObject2(d);
			Assert.Equal("123451", r["Id"].ToString());
			Assert.Equal("Something1", r["Name"].ToString());

		}

	}
}
