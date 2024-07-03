using Fonlow.Auth.Models;
using Fonlow.Text.Json.Auth;
using System.Text.Json;

namespace ConvertersTests
{
	public class AuthModelsConvertersTests
	{
		[Fact]
		public void TestROPCRequstSerialize()
		{
			ROPCRequst r = new ROPCRequst
			{
				GrantType = "password",
				Username = "Somebody",
				Password = "mypwd"
			};

			var s = System.Text.Json.JsonSerializer.Serialize(r, new JsonSerializerOptions(JsonSerializerDefaults.Web));
			Assert.Equal("{\"grant_type\":\"password\",\"username\":\"Somebody\",\"password\":\"mypwd\",\"scope\":null}", s);
		}


		[Fact]
		public void TestROPCRequstDeserialize()
		{
			var s = "{\"username\":\"Somebody\",\"password\":\"mypwd\",\"scope\":null,\"grant_type\":\"password\"}";
			var r = System.Text.Json.JsonSerializer.Deserialize<ROPCRequst>(s, new JsonSerializerOptions(JsonSerializerDefaults.Web));
			Assert.Equal("password", r.GrantType);
			Assert.Equal("Somebody", r.Username);
		}

		[Fact]
		public void TestROPCRequstDeserializeAsRequestBase()
		{
			var s = "{\"username\":\"Somebody\",\"password\":\"mypwd\",\"scope\":null,\"grant_type\":\"password\"}";
			var r = System.Text.Json.JsonSerializer.Deserialize<RequestBase>(s, new JsonSerializerOptions(JsonSerializerDefaults.Web));
			Assert.Equal("password", r.GrantType);
			Assert.Null(r as ROPCRequst);
		}

		[Fact]
		public void TestROPCRequstDeserializeAsRequestBaseWithConverter()
		{
			var options = new System.Text.Json.JsonSerializerOptions(new JsonSerializerOptions(JsonSerializerDefaults.Web));
			options.Converters.Add(new TokenRequestConverter());
			var s = "{\"grant_type\":\"password\",\"username\":\"Somebody\",\"password\":\"mypwd\",\"scope\":\"Something somewhere\"}";
			var r = System.Text.Json.JsonSerializer.Deserialize<RequestBase>(s, options);
			Assert.Equal("password", r.GrantType);
			Assert.Equal("Somebody", (r as ROPCRequst).Username);
			Assert.Equal("mypwd", (r as ROPCRequst).Password);
			Assert.Equal("Something somewhere", (r as ROPCRequst).Scope);
		}

		[Fact]
		public void TestRefreshTokenRequstDeserializeAsRequestBaseWithConverter()
		{
			var options = new System.Text.Json.JsonSerializerOptions(new JsonSerializerOptions(JsonSerializerDefaults.Web));
			options.Converters.Add(new TokenRequestConverter());
			var request = new RefreshAccessTokenRequest
			{
				GrantType = "refresh_token",
				RefreshToken = "LongTokenString",
				Scope = "Something",
			};

			var s = JsonSerializer.Serialize(request, options);
			var r = System.Text.Json.JsonSerializer.Deserialize<RequestBase>(s, options);
			Assert.Equal("refresh_token", r.GrantType);
			Assert.Equal("LongTokenString", (r as RefreshAccessTokenRequest).RefreshToken);
			Assert.Equal("Something", (r as RefreshAccessTokenRequest).Scope);
		}


	}
}
