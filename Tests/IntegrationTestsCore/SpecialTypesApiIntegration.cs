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
			Newtonsoft.Json.Linq.JObject d = api.GetAnonymousDynamic();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestGetAnonymousObject()
		{
			Newtonsoft.Json.Linq.JObject d = api.GetAnonymousObject();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestPostAnonymousObject()
		{
			Newtonsoft.Json.Linq.JObject d = new Newtonsoft.Json.Linq.JObject
			{
				["Id"] = "12345",
				["Name"] = "Something"
			};
			Newtonsoft.Json.Linq.JObject r = api.PostAnonymousObject(d);
			Assert.Equal("123451", r["Id"].ToString());
			Assert.Equal("Something1", r["Name"].ToString());

		}

		[Fact]
		public void TestGetAnonymousDynamic2()
		{
			Newtonsoft.Json.Linq.JObject d = api.GetAnonymousDynamic2();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestGetAnonymousObject2()
		{
			Newtonsoft.Json.Linq.JObject d = api.GetAnonymousObject2();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestPostAnonymousObject2()
		{
			Newtonsoft.Json.Linq.JObject d = new Newtonsoft.Json.Linq.JObject
			{
				["Id"] = "12345",
				["Name"] = "Something"
			};
			Newtonsoft.Json.Linq.JObject r = api.PostAnonymousObject2(d);
			Assert.Equal("123451", r["Id"].ToString());
			Assert.Equal("Something1", r["Name"].ToString());

		}

	}
}
