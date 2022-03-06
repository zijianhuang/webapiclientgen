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
		[HttpGet]
		[Route("AthletheSearch")]
		public string AthletheSearch([FromQuery] int? take = 10, [FromQuery] int skip = 0, [FromQuery] string order = null, [FromQuery] string sort = null, [FromQuery] string search = null)
		{
			return (take.HasValue ? take.Value.ToString() : String.Empty) + skip.ToString() + (String.IsNullOrEmpty(order) ? "" : order) + (String.IsNullOrEmpty(sort) ? "" : sort) + (String.IsNullOrEmpty(search) ? "" : search);
		}

		/// <summary>
		/// Return empty body with status 204 No Content.
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("NullString")]
		public string GetNullString()
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

	}
}
