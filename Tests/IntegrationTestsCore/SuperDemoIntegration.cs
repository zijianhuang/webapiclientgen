using DemoWebApi.DemoData.Client;
using System;
using System.Collections.Generic;
using Xunit;
using Fonlow.DateOnlyExtensions;

namespace IntegrationTests
{
	public class SuperDemoFixture : IDisposable
	{
		public SuperDemoFixture()
		{
			var baseUri = new Uri("http://localhost:5000/");

			httpClient = new System.Net.Http.HttpClient
			{
				BaseAddress = baseUri
			};

			var jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateTimeOffsetNullableJsonConverter());

			Api = new DemoWebApi.Controllers.Client.SuperDemo(httpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.SuperDemo Api { get; private set; }

		readonly System.Net.Http.HttpClient httpClient;

		#region IDisposable pattern
		bool disposed;

		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		protected virtual void Dispose(bool disposing)
		{
			if (!disposed)
			{
				if (disposing)
				{
					httpClient.Dispose();
				}

				disposed = true;
			}
		}
		#endregion
	}


	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class SuperDemoApiIntegration : IClassFixture<SuperDemoFixture>
	{
		public SuperDemoApiIntegration(SuperDemoFixture fixture)
		{
			api = fixture.Api;
		}

		readonly DemoWebApi.Controllers.Client.SuperDemo api;

		[Fact]
		public void TestGetIntArrayQ()
		{
			var d = api.GetIntArrayQ(new int[] { 3, 4, 5 });
			Assert.Equal(3, d.Length);
			Assert.Equal(5, d[2]);
		}

		[Fact]
		public void TestGetIntArrayQ2()
		{
			var d = api.GetIntArrayQ2(new long[] { 3, 4, 5 });
			Assert.Equal(3, d.Length);
			Assert.Equal(5, d[2]);
		}

		[Fact]
		public void TestGetDecimalArrayQ()
		{
			var d = api.GetDecimalArrayQ(new decimal[] { 3.5m, 4.6m, 5.7m });
			Assert.Equal(3, d.Length);
			Assert.Equal(5.7m, d[2]);
		}

		[Fact]
		public void TestGetStringArrayQ()
		{
			var d = api.GetStringArrayQ(new string[] { "Abc", "Eft", "hi" });
			Assert.Equal(3, d.Length);
			Assert.Equal("hi", d[2]);
		}

		[Fact]
		public void TestGetStringArrayQ2()
		{
			var d = api.GetStringArrayQ2(new string[] { "Abc", "Eft", "hi" });
			Assert.Equal(3, d.Length);
			Assert.Equal("hi", d[2]);
		}

		[Fact]
		public void TestGetEnumArrayQ2()
		{
			var d = api.GetEnumArrayQ2(new DayOfWeek[] { DayOfWeek.Monday, DayOfWeek.Sunday, DayOfWeek.Saturday });
			Assert.Equal(3, d.Length);
			Assert.Equal(DayOfWeek.Saturday, d[2]);
		}

		[Fact]
		public void TestGetEnumArrayDays()
		{
			var d = api.GetEnumArrayDays(new Days[] { Days.Mon, Days.Tue, Days.Wed });
			Assert.Equal(3, d.Length);
			Assert.Equal(Days.Wed, d[2]);
		}

		[Fact]
		public void TestGetDay()
		{
			var d = api.GetDay(Days.Fri);
			Assert.Equal(Days.Fri, d);
		}

		[Fact]
		public void TestPostDay()
		{
			var d = api.PostDay(Days.Fri, Days.Sat);
			Assert.Equal(2, d.Length);
			Assert.Equal(Days.Sat, d[1]);
		}

		[Fact]
		public void TestAthletheSearch()
		{
			var s = api.AthletheSearch(32, 0, null, null, null);
			Assert.Equal("\"320\"", s);
		}

		[Fact]
		public void TestAthletheSearch2()
		{
			var s = api.AthletheSearch(32, 0, null, null, "Search");
			Assert.Equal("\"320Search\"", s);
		}

		[Fact]
		public void TestAthletheSearch3()
		{
			var s = api.AthletheSearch(32, 0, null, "Sort", "Search");
			Assert.Equal("\"320SortSearch\"", s);
		}

		[Fact]
		public void TestAthletheSearch4()
		{
			var s = api.AthletheSearch(32, 0, "Order", "Sort", "Search");
			Assert.Equal("\"320OrderSortSearch\"", s);
		}

		[Fact]
		public void TestAthletheSearch5()
		{
			var s = api.AthletheSearch(32, 0, "Order", null, "Search");
			Assert.Equal("\"320OrderSearch\"", s);
		}

		[Fact]
		public void TestAthletheSearch6()
		{
			var s = api.AthletheSearch(32, 0, "Order", "", "Search");
			Assert.Equal("\"320OrderSearch\"", s);
		}

		[Fact]
		public void TestGetIntSquare()
		{
			Assert.Equal(10000, api.GetIntSquare(100));
		}

		[Fact]
		public void TestGetDecimalSquare()
		{
			Assert.Equal(10158.6241m, api.GetDecimalSquare(100.79m));
		}

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
		public void TestNullablePrimitive()
		{
			double dou = 1234.567;
			decimal de = 1234.567m;
			var t = api.GetPrimitiveNullable("abc", dou, de);
			Assert.Equal(dou, t.Item2);
			Assert.Equal(de, t.Item3);
		}

		[Fact]
		public void TestNullablePrimitiveWithFirstNull()
		{
			decimal de = 1234.567m;
			var t = api.GetPrimitiveNullable("abc", null, de);
			Assert.Null(t.Item2);
			Assert.Equal(de, t.Item3);
		}

		[Fact]
		public void TestNullablePrimitiveWithBothNulll()
		{
			var t = api.GetPrimitiveNullable("abc", null, null);
			Assert.Null(t.Item2);
			Assert.Null(t.Item3);
		}

		[Fact]
		public void TestNullablePrimitiveWithSecondNull()
		{
			double dou = 1234.567;
			var t = api.GetPrimitiveNullable("abc", dou, null);
			Assert.Equal(dou, t.Item2);
			Assert.Null(t.Item3);
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
			var r = api.PostDateTimeOffset(DateTimeOffset.Now);
			Assert.True(r);
		}

		[Fact]
		public void TestPostDateTimeOffsetNullable()
		{
			var r = api.PostDateTimeOffsetNullable(DateTimeOffset.Now);
			Assert.True(r);
		}

		[Fact]
		public void TestPostDateTimeOffsetWithNull()
		{
			var r = api.PostDateTimeOffsetNullable(null);
			Assert.False(r);
		}

		[Fact]
		public void TestPostDateOnly()
		{
			var dateOnly = new DateOnly(1988, 12, 23);
			var r = api.PostDateOnly(dateOnly);
			Assert.Equal(dateOnly, r);
		}


		[Fact]
		public void TestGetNullableDecimal()
		{
			var d = api.GetNullableDecimal(true);
			Assert.True(d.Value > 10);
		}

		[Fact]
		public void TestGetDecimalNull()
		{
			var d = api.GetNullableDecimal(false);
			Assert.False(d.HasValue);
		}

		[Fact]
		public void TestGetNullPerson()
		{
			Assert.Null(api.GetNullPerson());
		}

		[Fact]
		public void TestGetByteArray()
		{
			var array = api.GetByteArray();
			var s = System.Text.Encoding.UTF8.GetString(array);
			Assert.Equal("abcdefg", s);
		}

		[Fact]
		public void TestGetBool()
		{
			Assert.True(api.GetBool());
		}

		[Fact]
		public void TestGetByte()
		{
			Assert.Equal(255, api.Getbyte());
		}

		[Fact]
		public void TestGet()
		{
			Assert.Equal(-127, api.Getsbyte());
		}

		[Fact]
		public void TestGetChar()
		{
			//var response = api.GetChar();
			//var text = response.Content.ReadAsStringAsync().Result;//Web API return only string, and does not support char directly.
			//Assert.Equal("\"A\"", text);
			Assert.Equal('A', api.GetChar());
		}

		[Fact]
		public void TestGetDecimal()
		{
			Assert.Equal(decimal.MaxValue, api.GetDecimal());
		}

		[Fact]
		public void TestGetDouble()
		{
			Assert.Equal(-1.7976931348623e308, api.Getdouble());
		}

		[Fact]
		public void TestGetUint()
		{
			Assert.Equal(4294967295, api.GetUint());
		}

		[Fact]
		public void TestGetUlong()
		{
			Assert.Equal(18446744073709551615, api.Getulong());
		}

		[Fact]
		public void TestIntArray()
		{
			var d = api.GetIntArray();
			Assert.Equal(8, d[7]);
		}

		[Fact]
		public void TestPostIntArray()
		{
			Assert.True(api.PostIntArray(new int[] { 1, 2, 3, 4, 5, 6, 7, 8 }));
		}

		[Fact]
		public void TestInt2D()
		{
			var d = api.GetInt2D();
			Assert.Equal(1, d.GetUpperBound(0));
			Assert.Equal(3, d.GetUpperBound(1));
			Assert.Equal(1, d[0, 0]);
			Assert.Equal(4, d[0, 3]);
			Assert.Equal(8, d[1, 3]);
		}

		[Fact]
		public void TestInt2DJagged()
		{
			var d = api.GetInt2DJagged();
			Assert.Equal(1, d.GetUpperBound(0));
			Assert.Equal(1, d[0][0]);
			Assert.Equal(4, d[0][3]);
			Assert.Equal(8, d[1][3]);
		}

		[Fact]
		public void TestPostInt2D()
		{
			var d = api.PostInt2D(new int[,]
			{
			   {1,2,3, 4 },
			   {5,6,7, 8 }
			});
			Assert.True(d);
		}

		[Fact]
		public void TestPostInt2DExpectedFalse()
		{
			var d = api.PostInt2D(new int[,]
			{
			   {1,2,3, 4 },
			   {5,6,7, 9 }
			});
			Assert.False(d);
		}

		[Fact]
		public void TestPostInt2DJagged()
		{
			var d = api.PostInt2DJagged(new int[][]
			{
			   new int[] {1,2,3, 4 },
			   new int[] {5,6,7, 8 }
			});
			Assert.True(d);
		}

		[Fact]
		public void TestPostInt2DJaggedExpectedFalse()
		{
			var d = api.PostInt2DJagged(new int[][]
			{
			   new int[] {1,2,3, 4 },
			   new int[] {5,6,7, 9 }
			});
			Assert.False(d);
		}

		[Fact]
		public void TestGetTextStream()
		{
			var response = api.GetTextStream();
			var stream = response.Content.ReadAsStreamAsync().Result;
			using (var reader = new System.IO.StreamReader(stream))
			{
				var s = reader.ReadToEnd();
				Assert.Equal("abcdefg", s);
			}

		}

		[Fact]
		public void TestDictionary()
		{
			var dic = new Dictionary<string, Person>()
			{
				{"Iron Man", new Person()
				{
					Name= "Tony Stark",
					Surname="Stark",
					GivenName="Tony"
				} },

				{"Spider Man", new Person() {
					Name="Peter Parker",
					Addresses=
						new Address[] { new Address() {
							City="New York"

						} },
				} },
			};

			Assert.Throws<KeyNotFoundException>(() => dic["iron Man"].Name);
			Assert.Equal("New York", dic["Spider Man"].Addresses[0].City);
		}

		[Fact]
		public void TestPostDic()
		{
			var r = api.PostDictionary(new Dictionary<string, Person>()
			{
				{"Iron Man", new Person()
				{
					Name= "Tony Stark",
					Surname="Stark",
					GivenName="Tony"
				} },

				{"Spider Man", new Person() {
					Name="Peter Parker",
					Addresses= new Address[] { new Address() {
							City="New York"
						}
					},
				} },
			});

			Assert.Equal(2, r);
		}

		[Fact]
		public void TestGetKeyValuePair()
		{
			var r = api.GetKeyhValuePair();
			Assert.Equal("Spider Man", r.Key);
			Assert.Equal("Peter Parker", r.Value.Name);
		}

		[Fact]
		public void TestGetICollection()
		{
			var r = api.GetICollection();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetCollection()
		{
			var r = api.GetCollection();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetIList()
		{
			var r = api.GetIList();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetList()
		{
			var r = api.GetList();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetIReadOnlyCollection()
		{
			var r = api.GetIReadOnlyCollection();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetIReadOnlyList()
		{
			var r = api.GetIReadOnlyList();
			Assert.Equal("Peter Parker", r[1].Name);
		}


		static Person[] GetPersonList()
		{
			return new Person[] {
				new Person()
				{
					Name= "Tony Stark",
					Surname="Stark",
					GivenName="Tony"
				},

				new Person() {
					Name="Peter Parker",
					Addresses= new Address[] { new Address() {
							City="New York"

						} },
				}

			};
		}


		[Fact]
		public void TestPostICollection()
		{
			Assert.Equal(2, api.PostICollection(GetPersonList()));
		}

		[Fact]
		public void TestPostIList()
		{
			Assert.Equal(2, api.PostIList(GetPersonList()));
		}

		[Fact]
		public void TestPostCollection()
		{
			Assert.Equal(2, api.PostCollection(GetPersonList()));
		}

		[Fact]
		public void TestPostList()
		{
			Assert.Equal(2, api.PostList(GetPersonList()));
		}

		[Fact]
		public void TestPostIReadOnlyCollection()
		{
			Assert.Equal(2, api.PostIReadOnlyCollection(GetPersonList()));
		}

		[Fact]
		public void TestPostIReadOnlyList()
		{
			Assert.Equal(2, api.PostIReadOnlyList(GetPersonList()));
		}

		[Fact]
		public void TestPostWithQueryButEmptyBody()
		{
			var r = api.PostWithQueryButEmptyBody("abc", 123);
			Assert.Equal("abc", r.Item1);
			Assert.Equal(123, r.Item2);
		}

		[Fact]
		public async void TestPostActionResult()
		{
			var m = await api.PostActionResultAsync();
			Assert.Equal(System.Net.HttpStatusCode.OK, m.StatusCode);
			var s = await m.Content.ReadAsStringAsync();
			Assert.Equal("\"abcdefg\"", s);
		}

		[Fact]
		public async void TestGetActionResult()
		{
			var m = await api.GetActionResultAsync();
			Assert.Equal(System.Net.HttpStatusCode.OK, m.StatusCode);
			var s = await m.Content.ReadAsStringAsync();
			Assert.Equal("\"abcdefg\"", s);

		}

		[Fact]
		public async void TestGetActionResult2()
		{
			var m = await api.GetActionResult2Async();
			Assert.Equal(System.Net.HttpStatusCode.OK, m.StatusCode);
			var s = await m.Content.ReadAsStringAsync();
			Assert.Equal("\"abcdefg\"", s);

		}

		[Fact]
		public void TestPostGuids()
		{
			var id1 = Guid.NewGuid();
			var id2 = Guid.NewGuid();
			var ids = new Guid[] { id1, id2 };
			var r = api.PostGuids(ids);
			Assert.Equal(2, r.Length);
			Assert.Equal(id1, r[0]);
		}



	}
}
