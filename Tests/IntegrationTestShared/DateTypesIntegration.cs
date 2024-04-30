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
			var dt = await api.GetDateTimeAsync(true);
			Assert.True((DateTime.Now - dt.Value) < TimeSpan.FromSeconds(2));
		}

		[Fact]
		public async Task TestGetNextYear()
		{
			var dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(1).ToUniversalTime(), await api.GetNextYearAsync(dtNow));
		}

		[Fact]
		public async Task TestGetUtcNowNextYear()
		{
			var dtNow = DateTime.UtcNow;
			Assert.Equal(dtNow.AddYears(1), (await api.GetNextYearAsync(dtNow)).ToUniversalTime());
		}

		[Fact]
		public async Task TestGetNextHour()
		{
			var dtNow = DateTimeOffset.Now;
			Assert.Equal(dtNow.AddHours(1), await api.GetNextHourAsync(dtNow));
		}

		[Fact]
		public async Task TestGetNextYearNullable()
		{
			var dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(2).ToUniversalTime(), await api.GetNextYearNullableAsync(2, dtNow));
		}


		[Fact]
		public async Task TestGetNextHourNullable()
		{
			var dtNow = DateTimeOffset.Now;
			Assert.Equal(dtNow.AddHours(2), await api.GetNextHourNullableAsync(2, dtNow));
		}

		[Fact]
		public async Task TestGetNextYearNullable2()
		{
			var dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(2).Year, (await api.GetNextYearNullableAsync(2, null)).Year);
		}

		[Fact]
		public async Task TestIsDateTimeDate()
		{
			var d = new DateTime(2022, 2, 13); //Kind unspecified. So it works for Date
			Assert.Equal(DateTimeKind.Unspecified, d.Kind);
			Assert.Equal(TimeSpan.Zero, d.TimeOfDay);
			var dr = await api.IsDateTimeDateAsync(d);
			Assert.Equal(d, dr.Item2);
			Assert.Equal(d.Day, dr.Item1.Day);
		}

		[Fact]
		public async Task TestIsDateTimeOffsetDate()
		{
			var d = new DateTime(2022, 2, 13);
			Assert.Equal(DateTimeKind.Unspecified, d.Kind);
			Assert.Equal(TimeSpan.Zero, d.TimeOfDay);
			DateTimeOffset ds = new DateTimeOffset(d, TimeSpan.Zero);
			var dr = await api.IsDateTimeOffsetDateAsync(ds);
			Assert.Equal(d.Day, dr.Item1.Day);
			Assert.Equal(ds.Day, dr.Item1.Day);
			//Assert.Equal(ds, dr.Item2); if client and server are at different timezone, this will fail.
		}

		[Fact]
		public async Task TestIsDateTimeOffsetDate2()
		{
			DateTimeOffset ds = new DateTimeOffset(2022, 2, 13, 0, 0, 0, TimeSpan.Zero);
			var dr = await api.IsDateTimeOffsetDateAsync(ds);
			Assert.Equal(ds.Day, dr.Item1.Day);
			//Assert.Equal(ds, dr.Item2); if client and server are at different timezone, this will fail.
		}

		[Fact]
		public async Task TestSearcDateRange()
		{
			var dtStart = DateTime.Today;
			var dtEnd = dtStart.AddDays(5);
			var t = await api.SearchDateRangeAsync(dtStart, dtEnd);
			Assert.Equal(dtStart.ToUniversalTime(), t.Item1);
			Assert.Equal(dtEnd.ToUniversalTime(), t.Item2);
		}

		[Fact]
		public async Task TestSearcDateRangeWithEndDateNull()
		{
			var dtStart = DateTime.Today;
			//var dtEnd = dtStart.AddDays(5);
			var t = await api.SearchDateRangeAsync(dtStart, null);
			Assert.Equal(dtStart.ToUniversalTime(), t.Item1);
			Assert.False(t.Item2.HasValue); //property not presented in json object returned.
		}

		[Fact]
		public async Task TestSearcDateRangeWithBothNull()
		{
			//var dtStart = DateTime.Today;
			//var dtEnd = dtStart.AddDays(5);
			var t = await api.SearchDateRangeAsync(null, null); //empty json object returned
			Assert.False(t.Item1.HasValue);
			Assert.False(t.Item2.HasValue);
		}

		[Fact]
		public async Task TestGetUtcNowNextHour()
		{
			var dtNow = DateTimeOffset.UtcNow;
			Assert.Equal(dtNow.AddHours(1), await api.GetNextHourAsync(dtNow));
		}

		[Fact]
		public async Task TestPostNextYear()
		{
			var dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(1), await api.PostNextYearAsync(dtNow));
		}

		[Fact]
		public async Task TestGetDateTimeNull()
		{
			var dt = await api.GetDateTimeAsync(false);
			Assert.False(dt.HasValue);
		}

		[Fact]
		public async Task TestPostDateTimeNull()
		{
			var dt = await api.PostDateTimeNullableAsync(null); //The request send a JSON null object, but ASP.NET Core without Newtonsoft.Json will return empty string and status code 204 No Content.
			Assert.False(dt.HasValue);
		}

		[Fact]
		public async Task TestGetDateTimeOffset()
		{
			var dt = await api.GetDateTimeOffsetAsync();
			Assert.True((DateTime.Now - dt) < TimeSpan.FromSeconds(2));
		}

		[Fact(Skip = "Used for Host in Hawaii")]
		//[Fact]
		public async Task TestGetDateTimeOffsetWithHawaiiHost()
		{
			var dt = await api.GetDateTimeOffsetAsync(); // Now in Hawaii is with -10 offset.
			Assert.True((DateTime.Now - dt) < TimeSpan.FromSeconds(2));
			Assert.Equal(TimeSpan.FromHours(-10), dt.Offset); //my dev machine is in +10 timezone
		}

		/// <summary>
		/// The .net run time may change back to local Offset even if the host is in Hawaii.
		/// </summary>
		[Fact]
		public async Task TestPostDateTimeOffset()
		{
			var p = DateTimeOffset.Now;
			var r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
			Assert.Equal(p.Offset, r.Offset);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetWithSpecificOffset()
		{
			var span = TimeSpan.FromHours(5);
			DateTimeOffset p = DateTimeOffset.Now;
			p = p.ToOffset(span); //ToOffset does not change the value, but return a new object.
			var r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
			Assert.Equal(p.Offset, r.Offset);
		}

		/// <summary>
		/// For client in +10 and server in -10,
		/// </summary>
		[Fact]
		public async Task TestPostDateTimeOffsetForOffset()
		{
			var span = TimeSpan.FromHours(5);
			DateTimeOffset p = DateTimeOffset.Now;
			p = p.ToOffset(span); //ToOffset does not change the value, but return a new object.
			Assert.Equal(span, p.Offset);
			var r = await api.PostDateTimeOffsetForOffsetAsync(p);
			Assert.Equal(span, r); //this may fail when client and server on different timezones.
		}

		[Fact]
		public async Task TestPostDateTimeOffsetStringForOffset()
		{
			var span = TimeSpan.FromHours(5);
			DateTimeOffset p = DateTimeOffset.Now;
			p = p.ToOffset(span); //ToOffset does not change the value, but return a new object.
			Assert.Equal(span, p.Offset);
			var r = await api.PostDateTimeOffsetStringForOffsetAsync(p.ToString("O")); //the object returned is created in service through parsing.
			Assert.Equal(p.Offset, r);
			Assert.Equal(span, r);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetForO()
		{
			var p = DateTimeOffset.Now;
			var r = await api.PostDateTimeOffsetForOAsync(p);
			Assert.Equal(p.ToString("O"), r);
		}

		/// <summary>
		/// So with Utc, the server return local DateTimeOffset of client timezone.
		/// </summary>
		[Fact]
		public async Task TestPostDateTimeOffsetUtcNow()
		{
			var p = DateTimeOffset.UtcNow;
			var r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
			Assert.Equal(TimeSpan.Zero, p.Offset);
			//Assert.Equal(TimeSpan.FromHours(10), r.Offset); //I am in Australia AEST.
		}

		[Fact]
		public async Task TestPostDateTimeOffsetDate()
		{
			DateTimeOffset p = DateTimeOffset.Now.Date;
			var r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
			Assert.Equal(p.Offset, r.Offset);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetMin()
		{
			var p = DateTimeOffset.MinValue;
			var r = await api.PostDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetNullable()
		{
			var p = DateTimeOffset.Now;
			var r = await api.PostDateTimeOffsetNullableAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTimeOffsetNullableWithNull()
		{
			var r = await api.PostDateTimeOffsetNullableAsync(null);
			Assert.Null(r);
		}

		[Fact]
		public async Task TestRouteDateTimeOffset()
		{
			var p = DateTimeOffset.Now;
			var r = await api.RouteDateTimeOffsetAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTime()
		{
			var p = DateTime.Now;
			var r = await api.PostDateTimeAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTimeDate()
		{
			var p = DateTime.Now.Date;
			var r = await api.PostDateTimeAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateTimeMin()
		{
			var p = DateTime.MinValue;
			var r = await api.PostDateTimeAsync(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public async Task TestPostDateOnly()
		{
			var dateOnly = new DateOnly(1988, 12, 23);
			var r = await api.PostDateOnlyAsync(dateOnly);
			Assert.Equal(dateOnly, r);
		}

		[Fact]
		public async Task TestUtcStringToDateOnlyThrows()
		{
			var xmasDate = new DateTimeOffset(2018, 12, 25, 0, 0, 0, TimeSpan.Zero);
			var isoDatetime = xmasDate.UtcDateTime.ToString("o");//2018-12-25T00:00:00.0000000Z
			Assert.Throws<FormatException>(() => DateOnly.Parse(isoDatetime));
		}

		[Fact]
		public async Task TestPostDateOnlyMin()
		{
			var dateOnly = DateOnly.MinValue;
			var r = await api.PostDateOnlyAsync(dateOnly);
			Assert.Equal(dateOnly, r);
		}

		[Fact]
		public async Task TestGetDateOnlyMin()
		{
			var r = await api.GetDateOnlyMinAsync();
			Assert.Equal(DateOnly.MinValue, r);
		}

		[Fact]
		public async Task TestPostDateOnlyNullable()
		{
			var dateOnly = new DateOnly(1988, 12, 23);
			var r = await api.PostDateOnlyNullableAsync(dateOnly);
			Assert.Equal(dateOnly, r);
		}

		/// <summary>
		/// For web Api public DateOnly? PostDateOnlyNullable([FromBody] DateOnly? d)
		/// Post a JSON object null, and Both Web API services returns 204.
		/// </summary>
		[Fact]
		public async Task TestPostDateOnlyNullableWithNull()
		{
			var r = await api.PostDateOnlyNullableAsync(null);
			Assert.Null(r);
		}

		[Fact]
		public async void TestQueryDateOnlyString()
		{
			DateOnly d = new DateOnly(2008, 12, 18);
			var r = await api.QueryDateOnlyAsStringAsync(d.ToString("O"));
			Assert.Equal(d, r);
		}

		[Fact]
		public async Task TestSearcDateRangeWithStartDateNull()
		{
			var dtStart = DateTime.Today;
			var dtEnd = dtStart.AddDays(5);
			var r = await api.SearchDateRangeAsync(null, dtEnd);
			Assert.Null(r.Item1);
			Assert.Equal(dtEnd.ToUniversalTime(), r.Item2);//property not presented in json object returned.
		}



	}
}
