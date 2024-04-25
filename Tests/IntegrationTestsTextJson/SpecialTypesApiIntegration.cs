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

		/// <summary>
		/// The API is public object PostAnonymousObject([FromBody] dynamic obj), good with Newtonsoft.Json, but System.Text.Json on the service side could not deserialize it, thus causing server error. And the same client call has no problem with DemoCoreWeb that uses Newtonsoft.Json.
		/// The lesson is not to use dynamic as a parameter type in the Web API side.
		/// </summary>
		[Fact]
		public void TestPostAnonymousObject()
		{
			var d = new System.Text.Json.Nodes.JsonObject
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

		/// <summary>
		/// public async Task<object> PostAnonymousObject2([FromBody] dynamic obj)
		/// </summary>
		[Fact]
		public void TestPostAnonymousObject2()
		{
			var d = new System.Text.Json.Nodes.JsonObject
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
