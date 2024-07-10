//using DemoWebApi.Models.Client;
//using IntegrationTests;
//using Fonlow.Auth.Models;
//using DemoCoreWeb.ClientApiTextJson;
//namespace TextJsonIntegrationTests
//{
//	[Collection(TestConstants.LaunchWebApiAndInit)]
//	public partial class PolymorphismApiIntegration : IClassFixture<PolymorphismFixture>
//	{
//		public PolymorphismApiIntegration(PolymorphismFixture fixture)
//		{
//			api = fixture.Api;
//		}

//		readonly PolymorphismClient api;

		//[Fact]
		//public void TestPostRopcRequest()
		//{
		//	var r = api.PostROPCRequst(new ROPCRequst
		//	{
		//		GrantType = "password",
		//		Username = "MyName",
		//		Password = "MyPassword"
		//	});

		//	Assert.Equal("password", r.GrantType);
		//	Assert.Equal("MyName", r.Username);
		//}

		///// <summary>
		///// Concrete in, base out
		///// </summary>
		//[Fact]
		//public void TestPostRopcRequest2()
		//{
		//	RequestBase r = api.PostROPCRequst2(new ROPCRequst
		//	{
		//		GrantType = "password",
		//		Username = "MyName",
		//		Password = "MyPassword"
		//	});

		//	Assert.Equal("password", r.GrantType);
		//	Assert.Equal("MyName", (r as ROPCRequst).Username);
		//}

		//[Fact]
		//public void TestPostRopcRequest3()
		//{
		//	ROPCRequst r = api.PostROPCRequst3(new ROPCRequst
		//	{
		//		GrantType = "password",
		//		Username = "MyName",
		//		Password = "MyPassword"
		//	});

		//	Assert.Equal("password", r.GrantType);
		//	Assert.Equal("MyName", r.Username);
		//}

		//[Fact]
		//public void TestPostRequestBase()
		//{
		//	RequestBase r = api.PostRequestBase(new ROPCRequst
		//	{
		//		GrantType = "password",
		//		Username = "MyName",
		//		Password = "MyPassword"
		//	});

		//	Assert.Equal("password", r.GrantType);
		//	var r2 = r as ROPCRequst;
		//	Assert.Equal("MyName", r2.Username);
		//}


		//[Fact]
		//public async Task TestPostRopcTokenRequestAsFormDataToAuthAsync()
		//{
		//	var r = await api.PostRopcTokenRequestAsFormDataToAuthAsync(new ROPCRequst
		//	{
		//		GrantType = "password",
		//		Username = "MyName",
		//		Password = "MyPassword"
		//	});

		//	Assert.Equal("bearer", r.TokenType);
		//	Assert.Equal("AccessTokenStringMyName", r.AccessToken);
		//	Assert.Equal("RefreshTokenStringMyPassword", r.RefreshToken);
		//	Assert.Equal("some scope", r.Scope);
		//	Assert.Equal(100, r.ExpiresIn);
		//}

		//[Fact]
		//public async Task TestPostRefreshTokenRequestAsFormDataToAuthAsync()
		//{
		//	var r = await api.PostRefreshTokenRequestAsFormDataToAuthAsync(new RefreshAccessTokenRequest
		//	{
		//		GrantType = "refresh_token",
		//		RefreshToken="RefreshTokenString",
		//		Scope="abcd"
		//	});

		//	Assert.Equal("bearer", r.TokenType);
		//	Assert.Equal("abcdNew", r.Scope);
		//	Assert.Equal("RefreshTokenStringRefreshAccess", r.AccessToken);
		//	Assert.Equal("RefreshTokenStringRefresh", r.RefreshToken);
		//	Assert.Equal(100, r.ExpiresIn);
		//}

		//[Fact]
		//public async Task TestPostROPCRequstToAuthAsync()
		//{
		//	var r = await api.PostROPCRequstToAuthAsync(new ROPCRequst
		//	{
		//		GrantType = "password",
		//		Username = "MyName",
		//		Password = "MyPassword"
		//	});

		//	Assert.Equal("bearer", r.TokenType);
		//	Assert.Equal("AccessTokenString", r.AccessToken);
		//	Assert.Equal("RefreshTokenString", r.RefreshToken);
		//	Assert.Equal("some scope", r.Scope);
		//	Assert.Equal(100, r.ExpiresIn);
		//}



//	}
//}
