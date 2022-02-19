using System;
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
		public void TestGetDateTime()
		{
			var dt = api.GetDateTime(true);
			Assert.True((DateTime.Now - dt.Value) < TimeSpan.FromSeconds(2));
		}

		[Fact]
		public void TestGetNextYear()
		{
			var dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(1).ToUniversalTime(), api.GetNextYear(dtNow));
		}

		[Fact]
		public void TestGetUtcNowNextYear()
		{
			var dtNow = DateTime.UtcNow;
			Assert.Equal(dtNow.AddYears(1), api.GetNextYear(dtNow).ToUniversalTime());
		}

		[Fact]
		public void TestGetNextHour()
		{
			var dtNow = DateTimeOffset.Now;
			Assert.Equal(dtNow.AddHours(1), api.GetNextHour(dtNow));
		}

		[Fact]
		public void TestGetNextYearNullable()
		{
			var dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(2).ToUniversalTime(), api.GetNextYearNullable(2, dtNow));
		}


		[Fact]
		public void TestGetNextHourNullable()
		{
			var dtNow = DateTimeOffset.Now;
			Assert.Equal(dtNow.AddHours(2), api.GetNextHourNullable(2, dtNow));
		}

		[Fact]
		public void TestGetNextYearNullable2()
		{
			var dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(2).Year, api.GetNextYearNullable(2, null).Year);
		}


		[Fact]
		public void TestGetNextHourNullable2()
		{
			var dtNow = DateTimeOffset.Now;
			Assert.Equal(dtNow.AddHours(2).Hour, api.GetNextHourNullable(2, null).Hour);
		}

		[Fact]
		public void TestIsDateTimeDate()
		{
			var d = new DateTime(2022, 2, 13); //Kind unspecified. So it works for Date
			Assert.Equal(DateTimeKind.Unspecified, d.Kind);
			Assert.Equal(TimeSpan.Zero, d.TimeOfDay);
			var dr = api.IsDateTimeDate(d);
			Assert.Equal(d, dr.Item2);
			Assert.Equal(d.Day, dr.Item1.Day);
		}

		[Fact]
		public void TestIsDateTimeOffsetDate()
		{
			var d = new DateTime(2022, 2, 13);
			Assert.Equal(DateTimeKind.Unspecified, d.Kind);
			Assert.Equal(TimeSpan.Zero, d.TimeOfDay);
			DateTimeOffset ds = new DateTimeOffset(d, TimeSpan.Zero);
			var dr = api.IsDateTimeOffsetDate(ds);
			Assert.Equal(d.Day, dr.Item1.Day);
			Assert.Equal(ds.Day, dr.Item1.Day);
			//Assert.Equal(ds, dr.Item2); if client and server are at different timezone, this will fail.
		}

		[Fact]
		public void TestIsDateTimeOffsetDate2()
		{
			DateTimeOffset ds = new DateTimeOffset(2022, 2, 13, 0, 0, 0, TimeSpan.Zero);
			var dr = api.IsDateTimeOffsetDate(ds);
			Assert.Equal(ds.Day, dr.Item1.Day);
			//Assert.Equal(ds, dr.Item2); if client and server are at different timezone, this will fail.
		}

		[Fact]
		public void TestSearcDateRange()
		{
			var dtStart = DateTime.Today;
			var dtEnd = dtStart.AddDays(5);
			var t = api.SearchDateRange(dtStart, dtEnd);
			Assert.Equal(dtStart.ToUniversalTime(), t.Item1);
			Assert.Equal(dtEnd.ToUniversalTime(), t.Item2);
		}

		[Fact]
		public void TestSearcDateRangeWithEndDateNull()
		{
			var dtStart = DateTime.Today;
			//var dtEnd = dtStart.AddDays(5);
			var t = api.SearchDateRange(dtStart, null);
			Assert.Equal(dtStart.ToUniversalTime(), t.Item1);
			Assert.False(t.Item2.HasValue);
		}

		[Fact]
		public void TestSearcDateRangeWithBothNull()
		{
			//var dtStart = DateTime.Today;
			//var dtEnd = dtStart.AddDays(5);
			var t = api.SearchDateRange(null, null);
			Assert.False(t.Item1.HasValue);
			Assert.False(t.Item2.HasValue);
		}

		[Fact]
		public void TestGetUtcNowNextHour()
		{
			var dtNow = DateTimeOffset.UtcNow;
			Assert.Equal(dtNow.AddHours(1), api.GetNextHour(dtNow));
		}

		[Fact]
		public void TestPostNextYear()
		{
			var dtNow = DateTime.Now;
			Assert.Equal(dtNow.AddYears(1), api.PostNextYear(dtNow));
		}

		[Fact]
		public void TestGetDateTimeNull()
		{
			var dt = api.GetDateTime(false);
			Assert.False(dt.HasValue);
		}

		[Fact]
		public void TestGetDateTimeOffset()
		{
			var dt = api.GetDateTimeOffset();
			Assert.True((DateTime.Now - dt) < TimeSpan.FromSeconds(2));
		}

		[Fact]
		public void TestPostDateTimeOffset()
		{
			var p = DateTimeOffset.Now;
			var r = api.PostDateTimeOffset(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public void TestPostDateTimeOffsetDate()
		{
			var p = DateTimeOffset.Now.Date;
			var r = api.PostDateTimeOffset(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public void TestPostDateTimeOffsetMin()
		{
			var p = DateTimeOffset.MinValue;
			var r = api.PostDateTimeOffset(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public void TestPostDateTimeOffsetNullable()
		{
			var p = DateTimeOffset.Now;
			var r = api.PostDateTimeOffsetNullable(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public void TestPostDateTimeOffsetNullableWithNull()
		{
			var r = api.PostDateTimeOffsetNullable(null);
			Assert.Null(r);
		}

		[Fact]
		public void TestRouteDateTimeOffset()
		{
			var p = DateTimeOffset.Now;
			var r = api.RouteDateTimeOffset(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public void TestPostDateTime()
		{
			var p = DateTime.Now;
			var r = api.PostDateTime(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public void TestPostDateTimeDate()
		{
			var p = DateTime.Now.Date;
			var r = api.PostDateTime(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public void TestPostDateTimeMin()
		{
			var p = DateTime.MinValue;
			var r = api.PostDateTime(p);
			Assert.Equal(p, r);
		}

		[Fact]
		public void TestPostDateOnly()
		{
			var dateOnly = new DateOnly(1988, 12, 23);
			var r = api.PostDateOnly(dateOnly);
			Assert.Equal(dateOnly, r);
		}

		[Fact]
		public void TestPostDateOnlyNullable()
		{
			var dateOnly = new DateOnly(1988, 12, 23);
			var r = api.PostDateOnlyNullable(dateOnly);
			Assert.Equal(dateOnly, r);
		}

		[Fact]
		public void TestPostDateOnlyNullableWithNull()
		{
			var r = api.PostDateOnlyNullable(null);
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
		public void TestSearcDateRangeWithStartDateNull()//asp.net web api won't accept such call.
		{
			var dtStart = DateTime.Today;
			var dtEnd = dtStart.AddDays(5);
			var r = api.SearchDateRange(null, dtEnd);
			Assert.Null(r.Item1);
			Assert.Equal(dtEnd.ToUniversalTime(), r.Item2);
		}



	}
}
