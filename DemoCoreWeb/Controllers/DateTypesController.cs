using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing different commbinations of parameters and returns
	/// </summary>
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class DateTypesController : Controller
	{
		[HttpGet]
		[Route("NullableDatetime/{hasValue}")]
		public async Task<DateTime?> GetDateTime(bool hasValue)
		{
			return await Task.Run(() =>
			{
				DateTime? dt;
				if (hasValue)
					dt = DateTime.Now;
				else
					dt = null;

				return dt;
			});
		}

		[HttpGet]
		[Route("NextYear/{dt}")]
		public DateTime GetNextYear(DateTime dt)
		{
			return dt.AddYears(1);
		}

		[HttpGet]
		[Route("NextHour/{dt}")]
		public DateTimeOffset GetNextHour(DateTimeOffset dt)
		{
			return dt.AddHours(1);
		}

		[HttpPost]
		[Route("NextYear")]
		public DateTime PostNextYear([FromBody] DateTime dt)
		{
			return dt.AddYears(1);
		}

		[HttpGet]
		[Route("ForDateTimeOffset")]
		public DateTimeOffset GetDateTimeOffset()
		{
			return DateTimeOffset.Now;
		}

		[HttpPost]
		[Route("ForDateTimeOffset")]
		public DateTimeOffset PostDateTimeOffset([FromBody] DateTimeOffset d)
		{
			return d;
		}

		[HttpPost]
		[Route("ForDateTime")]
		public DateTime PostDateTime([FromBody] DateTime d)
		{
			return d;
		}

		/// <summary>
		/// Client should send DateTime.Date
		/// </summary>
		/// <param name="dt"></param>
		/// <returns></returns>
		[HttpPost("IsDateTimeDate")]
		public Tuple<DateOnly, DateTime> IsDateTimeDate([FromBody] DateTime dt)
		{
			return Tuple.Create(DateOnly.FromDateTime(dt), dt);
		}

		[HttpPost("IsDateTimeOffsetDate")]
		public Tuple<DateOnly, DateTimeOffset> IsDateTimeOffsetDate([FromBody] DateTimeOffset dt)
		{
			return Tuple.Create(DateOnly.FromDateTime(dt.DateTime), dt);
		}

		[HttpPost]
		[Route("DateTimeOffsetNullable")]
		public DateTimeOffset? PostDateTimeOffsetNullable([FromBody] DateTimeOffset? d)
		{
			return d;
		}

		[HttpGet]
		[Route("RouteDateTimeOffset/{d}")]
		public DateTimeOffset RouteDateTimeOffset([FromRoute] DateTimeOffset d)
		{
			return d;
		}

		[HttpPost]
		[Route("ForDateOnly")]
		public DateOnly PostDateOnly([FromBody] DateOnly d)
		{
			return d;
		}

		[HttpPost]
		[Route("DateOnlyNullable")]
		public DateOnly? PostDateOnlyNullable([FromBody] DateOnly? d)
		{
			return d;
		}

		//[HttpGet]
		//[Route("ForDateOnly")] until .NET 7? after ASP.NET core team fix the issue.
		//public DateOnly QueryDateOnly([FromQuery] DateOnly d)
		//{
		//	return d;
		//}

		[HttpGet]
		[Route("DateOnlyStringQuery")]
		public DateOnly QueryDateOnlyAsString([FromQuery] string d)
		{
			return DateOnly.Parse(d);
		}

		/// <summary>
		/// If Dt is not defined, add a year from now
		/// </summary>
		/// <param name="n"></param>
		/// <param name="dt"></param>
		/// <returns></returns>
		[HttpGet("NextYearNullable")]
		public DateTime GetNextYearNullable([FromQuery] int n, [FromQuery] DateTime? dt = null)//must have default value set to null to make it optional so the runtime could locate this controller
		{
			return dt.HasValue ? dt.Value.AddYears(n) : DateTime.Now.AddYears(n);
		}

		/// <summary>
		/// If Dt is not defined, add a hour from now
		/// </summary>
		/// <param name="n"></param>
		/// <param name="dt"></param>
		/// <returns></returns>
		[HttpGet("NextHourNullable")]
		public DateTimeOffset GetNextHourNullable([FromQuery] int n, [FromQuery] DateTimeOffset? dt = null)//must have default value set to null to make it optional so the runtime could locate this controller
		{
			return dt.HasValue ? dt.Value.AddHours(n) : DateTime.Now.AddHours(n);
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="startDate"></param>
		/// <param name="endDate"></param>
		/// <returns></returns>
		[HttpGet("SearchDateRange")]
		public Tuple<DateTime?, DateTime?> SearchDateRange([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
		{
			return new Tuple<DateTime?, DateTime?>(startDate, endDate);
		}


	}
}
