using System;
using System.Threading.Tasks;
using Xunit;

namespace IntegrationTests
{
	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class DateTypesApiIntegration : IClassFixture<DateTypesFixture>
	{
		public DateTypesApiIntegration(DateTypesFixture fixture)
		{
			api = fixture.Api;
		}

		readonly DemoWebApi.Controllers.Client.DateTypes api;

		[Fact]
		public async Task TestGetDateTime()
		{
			DateTime? dt = await api.GetDateTimeAsync(true);
			Assert.True((DateTime.Now - dt.Value) < TimeSpan.FromSeconds(2));
		}

		[Fact]
		public async Task TestGetNextYear()
		{
			DateTime dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(1).ToUniversalTime(), await api.GetNextYearAsync(dtNow));
		}

		[Fact]
		public async Task TestGetUtcNowNextYear()
		{
			DateTime dtNow = DateTime.UtcNow;
			Assert.Equal(dtNow.AddYears(1), (await api.GetNextYearAsync(dtNow)).ToUniversalTime());
		}

		[Fact]
		public async Task TestGetNextHour()
		{
			DateTimeOffset dtNow = DateTimeOffset.Now;
			Assert.Equal(dtNow.AddHours(1), await api.GetNextHourAsync(dtNow));
		}

		[Fact]
		public async Task TestGetNextYearNullable()
		{
			DateTime dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(2).ToUniversalTime(), await api.GetNextYearNullableAsync(2, dtNow));
		}


		[Fact]
		public async Task TestGetNextHourNullable()
		{
			DateTimeOffset dtNow = DateTimeOffset.Now;
			Assert.Equal(dtNow.AddHours(2), await api.GetNextHourNullableAsync(2, dtNow));
		}

		[Fact]
		public async Task TestGetNextYearNullable2()
		{
			DateTime dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(2).Year, (await api.GetNextYearNullableAsync(2, null)).Year);
		}

		[Fact]
		public async Task TestIsDateTimeDate()
		{
			DateTime d = new DateTime(2022, 2, 13); //Kind unspecified. So it works for Date
			Assert.Equal(DateTimeKind.Unspecified, d.Kind);
			Assert.Equal(TimeSpan.Zero, d.TimeOfDay);
			Tuple<DateOnly, DateTime> dr = await api.IsDateTimeDateAsync(d);
			Assert.Equal(d, dr.Item2);
			Assert.Equal(d.Day, dr.Item1.Day);
		}

		[Fact]
		public async Task TestIsDateTimeOffsetDate()
		{
			DateTime d = new DateTime(2022, 2, 13);
			Assert.Equal(DateTimeKind.Unspecified, d.Kind);
			Assert.Equal(TimeSpan.Zero, d.TimeOfDay);
			DateTimeOffset ds = new DateTimeOffset(d, TimeSpan.Zero);
			Tuple<DateOnly, DateTimeOffset> dr = await api.IsDateTimeOffsetDateAsync(ds);
			Assert.Equal(d.Day, dr.Item1.Day);
			Assert.Equal(ds.Day, dr.Item1.Day);
			//Assert.Equal(ds, dr.Item2); if client and server are at different timezone, this will fail.
		}

		[Fact]
		public async Task TestIsDateTimeOffsetDate2()
		{
			DateTimeOffset ds = new DateTimeOffset(2022, 2, 13, 0, 0, 0, TimeSpan.Zero);
			Tuple<DateOnly, DateTimeOffset> dr = await api.IsDateTimeOffsetDateAsync(ds);
			Assert.Equal(ds.Day, dr.Item1.Day);
			//Assert.Equal(ds, dr.Item2); if client and server are at different timezone, this will fail.
		}

		[Fact]
		public async Task TestSearcDateRange()
		{
			DateTime dtStart = DateTime.Today;
			DateTime dtEnd = dtStart.AddDays(5);
			Tuple<DateTime?, DateTime?> t = await api.SearchDateRangeAsync(dtStart, dtEnd);
			Assert.Equal(dtStart.ToUniversalTime(), t.Item1);
			Assert.Equal(dtEnd.ToUniversalTime(), t.Item2);
		}

		[Fact]
		public async Task TestSearcDateRangeWithEndDateNull()
		{
			DateTime dtStart = DateTime.Today;
			//var dtEnd = dtStart.AddDays(5);
			Tuple<DateTime?, DateTime?> t = await api.SearchDateRangeAsync(dtStart, null);
			Assert.Equal(dtStart.ToUniversalTime(), t.Item1);
			Assert.False(t.Item2.HasValue); //property not presented in json object returned.
		}

		[Fact]
		public async Task TestSearcDateRangeWithBothNull()
		{
			//var dtStart = DateTime.Today;
			//var dtEnd = dtStart.AddDays(5);
			Tuple<DateTime?, DateTime?> t = await api.SearchDateRangeAsync(null, null); //empty json object returned
			Assert.False(t.Item1.HasValue);
			Assert.False(t.Item2.HasValue);
		}

		[Fact]
		public async Task TestGetUtcNowNextHour()
		{
			DateTimeOffset dtNow = DateTimeOffset.UtcNow;
			Assert.Equal(dtNow.AddHours(1), await api.GetNextHourAsync(dtNow));
		}

		[Fact]
		public async Task TestPostNextYear()
		{
			DateTime dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(1), await api.PostNextYearAsync(dtNow));
		}

		[Fact]
		public async Task TestGetDateTimeNull()
		{
			DateTime? dt = await api.GetDateTimeAsync(false);
			Assert.False(dt.HasValue);
		}

		[Fact]
		public async Task TestPostDateTimeNull()
		{
			DateTime? dt = await api.PostDateTimeNullableAsync(null); //The request send a JSON null object, but ASP.NET Core without Newtonsoft.Json will return empty string and status code 204 No Content.
			Assert.False(dt.HasValue);
		}

		[Fact]
		public async Task TestGetDateTimeOffset()
		{
			DateTimeOffset dt = await api.GetDateTimeOffsetAsync();
			Assert.True((DateTime.Now - dt) < TimeSpan.FromSeconds(2));
		}

		[Fact(Skip = "Used for Host in Hawaii")]
		//[Fact]
		public async Task TestGetDateTimeOffsetWithHawaiiHost()
		{
			DateTimeOffset dt = await api.GetDateTimeOffsetAsync(); // Now in Hawaii is with -10 offset.
			Assert.True((DateTime.Now - dt) < TimeSpan.FromSeconds(2));
			Assert.Equal(TimeSpan.FromHours(-10), dt.Offset); //my dev machine is in +10 timezone
		}

		/// <summary>
		/// The .net run time may change back to local Offset even if the host is in Hawaii.
		/// </summary>
		[Fact]
		public async Task TestPostDateTimeOffset()
		{
			DateTimeOffset p = DateTimeOffset.Now;
			DateTimeOffset r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
			Assert.Equal(p.Offset, r.Offset);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetWithSpecificOffset()
		{
			TimeSpan span = TimeSpan.FromHours(5);
			DateTimeOffset p = DateTimeOffset.Now;
			p = p.ToOffset(span); //ToOffset does not change the value, but return a new object.
			DateTimeOffset r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
			Assert.Equal(p.Offset, r.Offset);
		}

		/// <summary>
		/// For client in +10 and server in -10,
		/// </summary>
		[Fact]
		public async Task TestPostDateTimeOffsetForOffset()
		{
			TimeSpan span = TimeSpan.FromHours(5);
			DateTimeOffset p = DateTimeOffset.Now;
			p = p.ToOffset(span); //ToOffset does not change the value, but return a new object.
			Assert.Equal(span, p.Offset);
			TimeSpan r = await api.PostDateTimeOffsetForOffsetAsync(p);
			Assert.Equal(span, r); //this may fail when client and server on different timezones.
		}

		[Fact]
		public async Task TestPostDateTimeOffsetStringForOffset()
		{
			TimeSpan span = TimeSpan.FromHours(5);
			DateTimeOffset p = DateTimeOffset.Now;
			p = p.ToOffset(span); //ToOffset does not change the value, but return a new object.
			Assert.Equal(span, p.Offset);
			TimeSpan r = await api.PostDateTimeOffsetStringForOffsetAsync(p.ToString("O")); //the object returned is created in service through parsing.
			Assert.Equal(p.Offset, r);
			Assert.Equal(span, r);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetForO()
		{
			DateTimeOffset p = DateTimeOffset.Now;
			string r = await api.PostDateTimeOffsetForOAsync(p);
			Assert.Equal(p.ToString("O"), r);
		}

		/// <summary>
		/// So with Utc, the server return local DateTimeOffset of client timezone.
		/// </summary>
		[Fact]
		public async Task TestPostDateTimeOffsetUtcNow()
		{
			DateTimeOffset p = DateTimeOffset.UtcNow;
			DateTimeOffset r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
			Assert.Equal(TimeSpan.Zero, p.Offset);
			//Assert.Equal(TimeSpan.FromHours(10), r.Offset); //I am in Australia AEST.
		}

		[Fact]
		public async Task TestPostDateTimeOffsetDate()
		{
			DateTimeOffset p = DateTimeOffset.Now.Date;
			DateTimeOffset r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
			Assert.Equal(p.Offset, r.Offset);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetMin()
		{
			DateTimeOffset p = DateTimeOffset.MinValue;
			DateTimeOffset r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetNullable()
		{
			DateTimeOffset p = DateTimeOffset.Now;
			DateTimeOffset? r = await api.PostDateTimeOffsetNullableAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetNullableWithNull()
		{
			DateTimeOffset? r = await api.PostDateTimeOffsetNullableAsync(null);
			Assert.Null(r);
		}

		[Fact]
		public async Task TestRouteDateTimeOffset()
		{
			DateTimeOffset p = DateTimeOffset.Now;
			DateTimeOffset r = await api.RouteDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTime()
		{
			DateTime p = DateTime.Now;
			DateTime r = await api.PostDateTimeAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTimeDate()
		{
			DateTime p = DateTime.Now.Date;
			DateTime r = await api.PostDateTimeAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTimeMin()
		{
			DateTime p = DateTime.MinValue;
			DateTime r = await api.PostDateTimeAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateOnly()
		{
			DateOnly dateOnly = new DateOnly(1988, 12, 23);
			DateOnly r = await api.PostDateOnlyAsync(dateOnly);
			Assert.Equal(dateOnly, r);
		}

		[Fact]
		public async Task TestUtcStringToDateOnlyThrows()
		{
			DateTimeOffset xmasDate = new DateTimeOffset(2018, 12, 25, 0, 0, 0, TimeSpan.Zero);
			string isoDatetime = xmasDate.UtcDateTime.ToString("o");//2018-12-25T00:00:00.0000000Z
			Assert.Throws<FormatException>(() => DateOnly.Parse(isoDatetime));
		}

		[Fact]
		public async Task TestPostDateOnlyMin()
		{
			DateOnly dateOnly = DateOnly.MinValue;
			DateOnly r = await api.PostDateOnlyAsync(dateOnly);
			Assert.Equal(dateOnly, r);
		}

		[Fact]
		public async Task TestGetDateOnlyMin()
		{
			DateOnly r = await api.GetDateOnlyMinAsync();
			Assert.Equal(DateOnly.MinValue, r);
		}

		[Fact]
		public async Task TestPostDateOnlyNullable()
		{
			DateOnly dateOnly = new DateOnly(1988, 12, 23);
			DateOnly? r = await api.PostDateOnlyNullableAsync(dateOnly);
			Assert.Equal(dateOnly, r);
		}

		/// <summary>
		/// For web Api public DateOnly? PostDateOnlyNullable([FromBody] DateOnly? d)
		/// Post a JSON object null, and Both Web API services returns 204.
		/// </summary>
		[Fact]
		public async Task TestPostDateOnlyNullableWithNull()
		{
			DateOnly? r = await api.PostDateOnlyNullableAsync(null);
			Assert.Null(r);
		}

		[Fact]
		public async Task TestQueryDateOnlyString()
		{
			DateOnly d = new DateOnly(2008, 12, 18);
			DateOnly r = await api.QueryDateOnlyAsStringAsync(d.ToString("O"));
			Assert.Equal(d, r);
		}

		[Fact]
		public async Task TestSearcDateRangeWithStartDateNull()
		{
			DateTime dtStart = DateTime.Today;
			DateTime dtEnd = dtStart.AddDays(5);
			Tuple<DateTime?, DateTime?> r = await api.SearchDateRangeAsync(null, dtEnd);
			Assert.Null(r.Item1);
			Assert.Equal(dtEnd.ToUniversalTime(), r.Item2);//property not presented in json object returned.
		}



	}
}
