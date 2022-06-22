using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing posting and getting string data. Returned string is JSON object.
	/// </summary>
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class StringDataController : ControllerBase
	{
		/// <summary>
		/// Athlethe Search
		/// </summary>
		/// <param name="take">Generic optional parameter. Default 10</param>
		/// <param name="skip">Default 0</param>
		/// <param name="order">default null</param>
		/// <param name="sort"></param>
		/// <param name="search"></param>
		/// <returns></returns>
		[HttpGet]
		[Route("AthletheSearch")]
		public string AthletheSearch([FromQuery] int? take = 10, [FromQuery] int skip = 0, [FromQuery] string order = null, [FromQuery] string sort = null, [FromQuery] string search = null)
		{
			return (take.HasValue ? take.Value.ToString() : String.Empty) + skip.ToString() + (String.IsNullOrEmpty(order) ? "" : order) + (String.IsNullOrEmpty(sort) ? "" : sort) + (String.IsNullOrEmpty(search) ? "" : search);
		}

#nullable enable
		/// <summary>
		/// Return empty body with status 204 No Content, even though the default mime type is application/json.
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("NullString")]
		public string? GetNullString()
		{
			return null;
		}

		[HttpGet]
		[Route("String")]
		public string GetABCDE()
		{
			return "ABCDE";
		}

		/// <summary>
		/// Return empty string JSON object. Status 200.
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("EmptyString")]
		public string GetEmptyString()
		{
			return String.Empty;
		}
#nullable disable
	}
}
