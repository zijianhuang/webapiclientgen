using Fonlow.Auth.Models;
using Fonlow.Text.Json.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

			var s = System.Text.Json.JsonSerializer.Serialize(r);
			Assert.Equal("{\"grant_type\":\"password\",\"Username\":\"Somebody\",\"Password\":\"mypwd\",\"Scope\":null}", s);
		}


		[Fact]
		public void TestROPCRequstDeserialize()
		{
			var s = "{\"Username\":\"Somebody\",\"Password\":\"mypwd\",\"Scope\":null,\"grant_type\":\"password\"}";
			var r = System.Text.Json.JsonSerializer.Deserialize<ROPCRequst>(s);
			Assert.Equal("password", r.GrantType);
			Assert.Equal("Somebody", r.Username);
		}

		[Fact]
		public void TestROPCRequstDeserializeAsRequestBase()
		{
			var s = "{\"Username\":\"Somebody\",\"Password\":\"mypwd\",\"Scope\":null,\"grant_type\":\"password\"}";
			var r = System.Text.Json.JsonSerializer.Deserialize<RequestBase>(s);
			Assert.Equal("password", r.GrantType);
			Assert.Null(r as ROPCRequst);
		}

		[Fact]
		public void TestROPCRequstDeserializeAsRequestBaseWithConverter()
		{
			var options = new System.Text.Json.JsonSerializerOptions();
			options.Converters.Add(new TokenRequestConverter());
			var s = "{\"grant_type\":\"password\",\"Username\":\"Somebody\",\"Password\":\"mypwd\",\"Scope\":null}";
			var r = System.Text.Json.JsonSerializer.Deserialize<RequestBase>(s, options);
			Assert.Equal("password", r.GrantType);
			Assert.Equal("Somebody", (r as ROPCRequst).Username);
		}


	}
}
