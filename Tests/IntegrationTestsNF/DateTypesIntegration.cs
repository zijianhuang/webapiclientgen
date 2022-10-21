using Fonlow.DateOnlyExtensions;
using Fonlow.Testing;
using System;
using Xunit;

namespace IntegrationTests
{
	public class DateTypesFixture : DefaultHttpClient
	{
		public DateTypesFixture()
		{
			var jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			jsonSerializerSettings.DateParseHandling = Newtonsoft.Json.DateParseHandling.DateTimeOffset; //needed to make sure JSON serializers assume DateTimeOffset rather than DateTime.
			jsonSerializerSettings.Converters.Add(new DateTimeOffsetJsonConverter()); //needed to handle DateOnly.MinValue
			jsonSerializerSettings.Converters.Add(new DateTimeOffsetNullableJsonConverter()); //needed to handle DateOnly.MinValue
			Api = new DemoWebApi.Controllers.Client.DateTypes(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.DateTypes Api { get; private set; }
	}


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

		[Fact(Skip = "Used for Host in Hawaii")]
		//[Fact]
		public void TestGetDateTimeOffsetWithHawaiiHost()
		{
			var dt = api.GetDateTimeOffset(); // Now in Hawaii is with -10 offset.
			Assert.True((DateTime.Now - dt) < TimeSpan.FromSeconds(2));
			Assert.Equal(TimeSpan.FromHours(-10), dt.Offset); //my dev machine is in +10 timezone. Pass only with DateParseHandling.DateTimeOffset
		}

		/// <summary>
		/// The .net run time may change back to local Offset even if the host is in Hawaii.
		/// </summary>
		[Fact]
		public void TestPostDateTimeOffset()
		{
			var p = DateTimeOffset.Now;
			var r = api.PostDateTimeOffset(p);
			Assert.Equal(p, r);
			Assert.Equal(p.Offset, r.Offset);
		}

		[Fact]
		public void TestPostDateTimeOffsetWithSpecificOffset()
		{
			var span = TimeSpan.FromHours(5);
			DateTimeOffset p = DateTimeOffset.Now;
			p = p.ToOffset(span); //ToOffset does not change the value, but return a new object.
			var r = api.PostDateTimeOffset(p);
			Assert.Equal(p, r);
			Assert.Equal(p.Offset, r.Offset);//Pass only with DateParseHandling.DateTimeOffset
		}

		/// <summary>
		/// For client in +10 and server in -10,
		/// </summary>
		[Fact]
		public void TestPostDateTimeOffsetForOffset()
		{
			var span = TimeSpan.FromHours(5);
			DateTimeOffset p = DateTimeOffset.Now;
			p = p.ToOffset(span); //ToOffset does not change the value, but return a new object.
			Assert.Equal(span, p.Offset);
			var r = api.PostDateTimeOffsetForOffset(p);
			Assert.Equal(span, r);
		}

		[Fact]
		public void TestPostDateTimeOffsetStringForOffset()
		{
			var span = TimeSpan.FromHours(5);
			DateTimeOffset p = DateTimeOffset.Now;
			p = p.ToOffset(span); //ToOffset does not change the value, but return a new object.
			Assert.Equal(span, p.Offset);
			var r = api.PostDateTimeOffsetStringForOffset(p.ToString("O")); //the object returned is created in service through parsing.
			Assert.Equal(p.Offset, r);
			Assert.Equal(span, r);
		}

		[Fact]
		public void TestPostDateTimeOffsetForO()
		{
			var p = DateTimeOffset.Now;
			var r = api.PostDateTimeOffsetForO(p);
			Assert.Equal(p.ToString("O"), r);
		}

		/// <summary>
		/// So with Utc, the server return local DateTimeOffset of client timezone.
		/// </summary>
		[Fact]
		public void TestPostDateTimeOffsetUtcNow()
		{
			var p = DateTimeOffset.UtcNow;
			var r = api.PostDateTimeOffset(p);
			Assert.Equal(p, r);
			Assert.Equal(TimeSpan.Zero, p.Offset);
			//Assert.Equal(TimeSpan.FromHours(10), r.Offset); //I am in Australia AEST.
		}

		[Fact]
		public void TestPostDateTimeOffsetDate()
		{
			DateTimeOffset p = DateTimeOffset.Now.Date;
			var r = api.PostDateTimeOffset(p);
			Assert.Equal(p, r);
			Assert.Equal(p.Offset, r.Offset);
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
			var dateOnly = new DateTimeOffset(1988, 12, 23, 0, 0, 0, TimeSpan.Zero);
			var r = api.PostDateOnly(dateOnly);
			Assert.Equal(dateOnly.Date, r.Date);
			Assert.Equal(DateTimeOffset.Now.Offset, r.Offset); //Local date start, because the return  object is "1988-12-23". no matter the client sends "2022-03-12" or "2022-03-12T00:00:00+00:00" or "2022-03-12T00:00:00Z"
			Assert.Equal(TimeSpan.Zero, r.TimeOfDay);
		}

		/// <summary>
		/// Need DateTimeOffsetConverter to handle DateOnly.MinValue from the server as "0001-01-01"
		/// </summary>
		[Fact]
		public void TestPostDateOnlyMin()
		{
			var dateOnly = DateTimeOffset.MinValue; //timezone zero.
			var r = api.PostDateOnly(dateOnly);
			Assert.Equal(dateOnly.Date, r.Date);
			Assert.Equal(TimeSpan.Zero, r.Offset);
			Assert.Equal(TimeSpan.Zero, r.TimeOfDay);
		}

		[Fact]
		public void TestPostDateOnlyNullable()
		{
			var dateOnly = new DateTimeOffset(1988, 12, 23, 0, 0, 0, TimeSpan.Zero);
			var r = api.PostDateOnlyNullable(dateOnly);
			Assert.Equal(dateOnly.Date, r.Value.Date);
			Assert.Equal(DateTimeOffset.Now.Offset, r.Value.Offset); //Because the return  object is "1988-12-23". no matter the client sends "2022-03-12" or "2022-03-12T00:00:00+00:00" or "2022-03-12T00:00:00Z" (JavaScript)
			Assert.Equal(TimeSpan.Zero, r.Value.TimeOfDay);
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
			DateTimeOffset d = new DateTimeOffset(2008, 12, 18, 0, 0, 0, TimeSpan.Zero);
			var r = await api.QueryDateOnlyAsStringAsync(d.ToString("yyyy-MM-dd"));
			Assert.Equal(DateTimeOffset.Now.Offset, r.Offset); //Local date start, because the return  object is "1988-12-23". no matter the client sends "2022-03-12" or "2022-03-12T00:00:00+00:00" or "2022-03-12T00:00:00Z"
			Assert.Equal(TimeSpan.Zero, r.TimeOfDay);
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
