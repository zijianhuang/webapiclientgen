using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
#nullable enable
namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing different commbinations of parameters and returns
	/// </summary>
	[Route("api/[controller]")]
	public class DateTypesController : ControllerBase
	{
		[HttpGet]
		[Route("NullableDatetime/{hasValue}")]
		public async Task<DateTime?> GetDateTime(bool hasValue)
		{
			//return await Task.Run(() =>
			//{
			//	DateTime? dt;
			//	if (hasValue)
			//		dt = DateTime.Now;
			//	else
			//		dt = null;

			//	return dt;
			//});
			DateTime? dt;
			if (hasValue)
				dt = DateTime.Now;
			else
				dt = null;

			return dt; //without converter, system.text.json serialize will give empty string, and system.text.json deserialze will intepret it wrong.
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

		/// <summary>
		/// return DateTimeOffset.Now
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("ForDateTimeOffset")]
		public DateTimeOffset GetDateTimeOffset()
		{
			return DateTimeOffset.Now;
		}

		/// <summary>
		/// return d;
		/// </summary>
		/// <param name="d"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("ForDateTimeOffset")]
		public DateTimeOffset PostDateTimeOffset([FromBody] DateTimeOffset d)
		{
			return d;
		}

		[HttpPost]
		[Route("ForDateTimeOffsetStringForOffset")]
		public TimeSpan PostDateTimeOffsetStringForOffset([FromBody] string s)
		{
			var dt = DateTimeOffset.Parse(s);
			return dt.Offset;
		}

		/// <summary>
		/// return d.ToString("O")
		/// </summary>
		/// <param name="d"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("ForDateTimeOffsetForO")]
		public string PostDateTimeOffsetForO([FromBody] DateTimeOffset d)
		{
			return d.ToString("O");
		}

		[HttpPost]
		[Route("ForDateTimeOffsetForOffset")]
		public TimeSpan PostDateTimeOffsetForOffset([FromBody] DateTimeOffset d)
		{
			return d.Offset;
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

		/// <summary>
		/// Returned is DateTimeOffset?
		/// </summary>
		/// <param name="d"></param>
		/// <returns></returns>
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
		/// Return Tuple DateTime?, DateTime?
		/// </summary>
		/// <param name="startDate"> DateTime? startDate = null</param>
		/// <param name="endDate">DateTime? endDate = null</param>
		/// <returns></returns>
		[HttpGet("SearchDateRange")]
		public Tuple<DateTime?, DateTime?> SearchDateRange([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
		{
			return Tuple.Create(startDate, endDate);
		}


	}
}
#nullable disable