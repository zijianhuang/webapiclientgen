using Fonlow.Auth.Models;
using Microsoft.AspNetCore.Mvc;
namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing different commbinations of parameters and returns
	/// </summary>
	[Route("api/[controller]")]
	public class PolymorphismController : ControllerBase
	{
		[HttpPost]
		[Consumes("application/x-www-form-urlencoded")] //need explicit declaration for sharing endpoint
		public async Task<TokenResponseBase> PostTokenRequestAsFormData([FromForm] RequestBase model)
		{
			if (model.GrantType == "password" && model is ROPCRequst ropcRequest)
			{
				return new AccessTokenResponse
				{
					TokenType = "bearer",
					AccessToken = "AccessTokenString"+ ropcRequest.Username,
					ExpiresIn = 100,
					RefreshToken = "RefreshTokenString"+ropcRequest.Password,
					Scope = "some scope"
				};
			}
			else if (model.GrantType == "refresh_token" && model is RefreshAccessTokenRequest refreshAccessTokenRequest)
			{
				return new AccessTokenResponse
				{
					TokenType = "bearer",
					AccessToken = refreshAccessTokenRequest.RefreshToken + "Access",
					ExpiresIn = 100,
					RefreshToken = refreshAccessTokenRequest.RefreshToken + "Refresh",
					Scope = refreshAccessTokenRequest.Scope + "New",
				};
			}

			throw new NotSupportedException();
		}

		//[HttpPost]
		//[Consumes("application/json")] //need explicit declaration for sharing endpoint
		//public async Task<TokenResponseBase> PostTokenRequest([FromBody] RequestBase model)
		//{
		//	if (model.GrantType == "password" && model is ROPCRequst)
		//	{
		//		return new AccessTokenResponse
		//		{
		//			TokenType = "bearer",
		//			AccessToken = "AccessTokenString",
		//			ExpiresIn = 100,
		//			RefreshToken = "RefreshTokenString",
		//			Scope = "some scope"
		//		};
		//	}

		//	throw new NotSupportedException();
		//}

		//[HttpPost]
		//[Route("PostRequestBase")]
		//public async Task<RequestBase> PostRequestBase([FromBody] RequestBase model)
		//{
		//	return model;
		//}

		//[HttpPost]
		//[Route("PostROPCRequst")]
		//public async Task<ROPCRequst> PostROPCRequst([FromBody] ROPCRequst model)
		//{
		//	return model;
		//}

		//[HttpPost]
		//[Route("PostROPCRequst2")]
		//public async Task<RequestBase> PostROPCRequst2([FromBody] ROPCRequst model)
		//{
		//	return model;
		//}

		//[HttpPost]
		//[Route("PostROPCRequst3")]
		//public async Task<ROPCRequst> PostROPCRequst3([FromBody] RequestBase model)
		//{
		//	return model as ROPCRequst;
		//}

	}
}
