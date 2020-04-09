using Xunit;
using System;

namespace IntegrationTests
{

	[Collection(TestConstants.IisExpressAndInit)]
	public class ASPNetSpecial : IClassFixture<SuperDemoFixture>
	{
		public ASPNetSpecial(SuperDemoFixture fixture)
		{
			api = fixture.Api;
		}

		DemoWebApi.Controllers.Client.SuperDemo api;


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
			var d = new Newtonsoft.Json.Linq.JObject();
			d["Id"] = "12345";
			d["Name"] = "Something";
			var r = api.PostAnonymousObject(d);
			Assert.Equal("123451", r["Id"].ToString());
			Assert.Equal("Something1", r["Name"].ToString());

		}


		[Fact]
		public void TestGetDictionary()
		{
			var dic = api.GetDictionary();
			Assert.Equal("number", dic["system.Int64"]);
		}

		[Fact]
		public void TestGetDictionaryOfPeople()
		{
			var dic = api.GetDictionaryOfPeople();
			Assert.Equal("Tony Stark", dic["iron Man"].Name);
			Assert.Equal("New York", dic["spider Man"].Addresses[0].City);
			Assert.Throws< System.Collections.Generic.KeyNotFoundException >(() => dic["Iron Man"].Name); //the camelCase filter is in play in the web api
		}

		[Fact]
		public void TestGetEmptyString()
		{
			Assert.Equal(String.Empty, api.GetEmptyString());
		}

		[Fact]
		public void TestGetNullString()
		{
			Assert.Null(api.GetNullString());
		}

		[Fact]
		public void TestGetActionResult()
		{
			var response = api.GetActionResult();
			var stream = response.Content.ReadAsStreamAsync().Result;
			using (var reader = new System.IO.StreamReader(stream))
			{
				var s = reader.ReadToEnd();
				Assert.Equal("\"abcdefg\"", s);
			}

		}

		[Fact]
		public void TestGetActionStringResult()
		{
			Assert.Equal("abcdefg", api.GetActionStringResult());
		}

		[Fact]
		public void TestZeroWithFloatDoubleAndDecimal()
		{
			// Assert.NotEqual(0f, 0.1f + 0.2f - 0.3f);//In VS 2015 update 2, compiler makes it zeror.
			Assert.NotEqual(0d, 0.1d + 0.2d - 0.3d);
			Assert.Equal(0m, 0.1m + 0.2m - 0.3m);

			Assert.NotEqual(0, api.GetFloatZero());
			Assert.NotEqual(0, api.GetDoubleZero());
			Assert.Equal(0, api.GetDecimalZero());

		}

		[Fact]
		public void TestSearcDateRangeWithStartDateNullThrow()//however, .net core web api will accept such client call well.
		{
			var dtStart = DateTime.Today;
			var dtEnd = dtStart.AddDays(5);
			var ex = Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() =>
			 api.SearchDateRange(null, dtEnd));
			ex.Message.Contains("400");
		}



	}
}
