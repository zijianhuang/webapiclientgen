﻿using IntegrationTests;
namespace TextJsonIntegrationTests
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
			System.Text.Json.Nodes.JsonObject d = api.GetAnonymousDynamic();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestGetAnonymousObject()
		{
			System.Text.Json.Nodes.JsonObject d = api.GetAnonymousObject();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		/// <summary>
		/// The API is public object PostAnonymousObject([FromBody] dynamic obj), good with Newtonsoft.Json, but System.Text.Json on the service side could not deserialize it, thus causing server error. And the same client call has no problem with DemoCoreWeb that uses Newtonsoft.Json.
		/// The lesson is not to use dynamic as a parameter type in the Web API side.
		/// </summary>
		[Fact(Skip = "Unitl MS would fix Text.Json.JsonSerializer for Jagged array")]
		public void TestPostAnonymousObject()
		{
			System.Text.Json.Nodes.JsonObject d = new System.Text.Json.Nodes.JsonObject
			{
				["Id"] = "12345",
				["Name"] = "Something"
			};
			System.Text.Json.Nodes.JsonObject r = api.PostAnonymousObject(d);
			Assert.Equal("123451", r["Id"].ToString());
			Assert.Equal("Something1", r["Name"].ToString());

		}

		[Fact]
		public void TestGetAnonymousDynamic2()
		{
			System.Text.Json.Nodes.JsonObject d = api.GetAnonymousDynamic2();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		[Fact]
		public void TestGetAnonymousObject2()
		{
			System.Text.Json.Nodes.JsonObject d = api.GetAnonymousObject2();
			Assert.Equal("12345", d["id"].ToString());
			Assert.Equal("Something", d["name"].ToString());
		}

		/// <summary>
		/// public async Task<object> PostAnonymousObject2([FromBody] dynamic obj)
		/// </summary>
		[Fact(Skip = "Unitl MS would fix Text.Json.JsonSerializer for Jagged array")]
		public void TestPostAnonymousObject2()
		{
			System.Text.Json.Nodes.JsonObject d = new System.Text.Json.Nodes.JsonObject
			{
				["Id"] = "12345",
				["Name"] = "Something"
			};
			System.Text.Json.Nodes.JsonObject r = api.PostAnonymousObject2(d);
			Assert.Equal("123451", r["Id"].ToString());
			Assert.Equal("Something1", r["Name"].ToString());

		}
	}
}
