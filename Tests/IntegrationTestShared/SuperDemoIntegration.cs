using DemoWebApi.DemoData.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using System.Threading.Tasks;

namespace IntegrationTests
{
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
			int[] d = api.GetIntArrayQ(new int[] { 3, 4, 5 });
			Assert.Equal(3, d.Length);
			Assert.Equal(5, d[2]);
		}

		[Fact]
		public void TestGetIntArrayQ2()
		{
			long[] d = api.GetIntArrayQ2(new long[] { 3, 4, 5 });
			Assert.Equal(3, d.Length);
			Assert.Equal(5, d[2]);
		}

		[Fact]
		public void TestGetDecimalArrayQ()
		{
			decimal[] d = api.GetDecimalArrayQ(new decimal[] { 3.5m, 4.6m, 5.7m });
			Assert.Equal(3, d.Length);
			Assert.Equal(5.7m, d[2]);
		}

		[Fact]
		public void TestGetStringArrayQ()
		{
			string[] d = api.GetStringArrayQ(new string[] { "Abc", "Eft", "hi" });
			Assert.Equal(3, d.Length);
			Assert.Equal("hi", d[2]);
		}

		[Fact]
		public void TestGetStringArrayQ2()
		{
			string[] d = api.GetStringArrayQ2(new List<string> { "Abc", "Eft", "hi" });
			Assert.Equal(3, d.Length);
			Assert.Equal("hi", d[2]);
		}

		[Fact]
		public void TestGetEnumArrayQ2()
		{
			DayOfWeek[] d = api.GetEnumArrayQ2(new List<DayOfWeek> { DayOfWeek.Monday, DayOfWeek.Sunday, DayOfWeek.Saturday });
			Assert.Equal(3, d.Length);
			Assert.Equal(DayOfWeek.Saturday, d[2]);
		}

		[Fact]
		public void TestGetEnumArrayDays()
		{
			Days[] d = api.GetEnumArrayDays(new Days[] { Days.Mon, Days.Tue, Days.Wed });
			Assert.Equal(3, d.Length);
			Assert.Equal(Days.Wed, d[2]);
		}

		[Fact]
		public void TestGetDay()
		{
			Days d = api.GetDay(Days.Fri);
			Assert.Equal(Days.Fri, d);
		}

		[Fact]
		public void TestPostDay()
		{
			Days[] d = api.PostDay(Days.Fri, Days.Sat);
			Assert.Equal(2, d.Length);
			Assert.Equal(Days.Sat, d[1]);
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
		public void TestNullablePrimitive()
		{
			double dou = 1234.567;
			decimal de = 1234.567m;
			Tuple<string, double?, decimal?> t = api.GetPrimitiveNullable("abc", dou, de);
			Assert.Equal(dou, t.Item2);
			Assert.Equal(de, t.Item3);
		}

		[Fact]
		public void TestNullablePrimitiveWithFirstNull()
		{
			decimal de = 1234.567m;
			Tuple<string, double?, decimal?> t = api.GetPrimitiveNullable("abc", null, de);
			Assert.Null(t.Item2);
			Assert.Equal(de, t.Item3);
		}

		[Fact]
		public void TestNullablePrimitiveWithBothNulll()
		{
			Tuple<string, double?, decimal?> t = api.GetPrimitiveNullable("abc", null, null);
			Assert.Null(t.Item2);
			Assert.Null(t.Item3);
		}

		[Fact]
		public void TestNullablePrimitiveWithSecondNull()
		{
			double dou = 1234.567;
			Tuple<string, double?, decimal?> t = api.GetPrimitiveNullable("abc", dou, null);
			Assert.Equal(dou, t.Item2);
			Assert.Null(t.Item3);
		}

		[Fact]
		public void TestGetNullableDecimal()
		{
			decimal? d = api.GetNullableDecimal(true);
			Assert.True(d.Value > 10);
		}

		[Fact]
		public void TestGetDecimalNull()
		{
			decimal? d = api.GetNullableDecimal(false);
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
			byte[] array = api.GetByteArray();
			string s = System.Text.Encoding.UTF8.GetString(array);
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
			int[] d = api.GetIntArray();
			Assert.Equal(8, d[7]);
		}

		[Fact]
		public void TestPostIntArray()
		{
			Assert.True(api.PostIntArray(new int[] { 1, 2, 3, 4, 5, 6, 7, 8 }));
		}

		/// <summary>
		/// Expected to fail, before MS would fix Text.Json.JsonSerializer for 2 dimensional array
		/// Web API: public int[,] GetInt2D()
		/// </summary>
		[Fact(Skip = "Expected to fail, before MS would fix Text.Json.JsonSerializer for 2 dimensional array")]
		public void TestInt2D()
		{
			int[,] d = api.GetInt2D();
			Assert.Equal(1, d.GetUpperBound(0));
			Assert.Equal(3, d.GetUpperBound(1));
			Assert.Equal(1, d[0, 0]);
			Assert.Equal(4, d[0, 3]);
			Assert.Equal(8, d[1, 3]);
		}

		[Fact]
		public void TestInt2DJagged()
		{
			int[][] d = api.GetInt2DJagged();
			Assert.Equal(1, d.GetUpperBound(0));
			Assert.Equal(1, d[0][0]);
			Assert.Equal(4, d[0][3]);
			Assert.Equal(8, d[1][3]);
		}

		/// <summary>
		/// Expected to fail, before MS would fix Text.Json.JsonSerializer  for 2 dimensional array
		/// </summary>
		[Fact]
		public void TestPostInt2D()
		{
			bool d = api.PostInt2D(new int[,]
			{
			   {1,2,3, 4 },
			   {5,6,7, 8 }
			});
			Assert.True(d);
		}

		/// <summary>
		/// Expected to fail, before MS would fix Text.Json.JsonSerializer for 2 dimensional array
		/// </summary>
		[Fact(Skip = "Expected to fail, before MS would fix Text.Json.JsonSerializer for 2 dimensional array")]
		public void TestPostInt2DExpectedFalse()
		{
			bool d = api.PostInt2D(new int[,]
			{
			   {1,2,3, 4 },
			   {5,6,7, 9 }
			});
			Assert.False(d);
		}

		[Fact]
		public void TestPostInt2DJagged()
		{
			bool d = api.PostInt2DJagged(new int[][]
			{
			   new int[] {1,2,3, 4 },
			   new int[] {5,6,7, 8 }
			});
			Assert.True(d);
		}

		[Fact]
		public void TestPostInt2DJaggedExpectedFalse()
		{
			bool d = api.PostInt2DJagged(new int[][]
			{
			   new int[] {1,2,3, 4 },
			   new int[] {5,6,7, 9 }
			});
			Assert.False(d);
		}

		[Fact]
		public async Task TestGetTextStream()
		{

/* Unmerged change from project 'IntegrationTestsTextJson'
Before:
			var response = api.GetTextStream();
			var stream = await response.Content.ReadAsStreamAsync();
			using (var reader = new System.IO.StreamReader(stream))
After:
			HttpResponseMessage response = api.GetTextStream();
			Stream stream = await response.Content.ReadAsStreamAsync();
			using (StreamReader reader = new System.IO.StreamReader(stream))
*/
			System.Net.Http.HttpResponseMessage response = api.GetTextStream();
			System.IO.Stream stream = await response.Content.ReadAsStreamAsync();
			using (System.IO.StreamReader reader = new System.IO.StreamReader(stream))
			{
				string s = reader.ReadToEnd();
				Assert.Equal("abcdefg", s);
			}

		}

		[Fact]
		public void TestGetBadRequest()
		{
			Fonlow.Net.Http.WebApiRequestException ex = Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() => api.GetBadRequest());
			Assert.Equal("{\"DemoKey\":[\"Some description\"]}", ex.Response);
		}

		[Fact]
		public void TestGetBadRequest2()
		{
			Fonlow.Net.Http.WebApiRequestException ex = Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() => api.GetBadRequest2());
			Assert.Equal("{\"DemoKey\":[\"Some description\"]}", ex.Response);
		}

		[Fact]
		public void TestDictionary()
		{
			Dictionary<string, Person> dic = new Dictionary<string, Person>()
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
			int r = api.PostDictionary(new Dictionary<string, Person>()
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
			KeyValuePair<string, Person> r = api.GetKeyhValuePair();
			Assert.Equal("Spider Man", r.Key);
			Assert.Equal("Peter Parker", r.Value.Name);
		}

		[Fact]
		public void TestGetICollection()
		{
			Person[] r = api.GetICollection().ToArray();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetCollection()
		{
			System.Collections.ObjectModel.Collection<Person> r = api.GetCollection();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetIList()
		{
			IList<Person> r = api.GetIList();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetList()
		{
			List<Person> r = api.GetList();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetIReadOnlyCollection()
		{
			Person[] r = api.GetIReadOnlyCollection().ToArray();
			Assert.Equal("Peter Parker", r[1].Name);
		}

		[Fact]
		public void TestGetIReadOnlyList()
		{
			IReadOnlyList<Person> r = api.GetIReadOnlyList();
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

		static System.Collections.ObjectModel.Collection<Person> GetPersonCollection()
		{
			return new System.Collections.ObjectModel.Collection<Person> {
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
			Assert.Equal(2, api.PostCollection(GetPersonCollection()));
		}

		[Fact]
		public void TestPostList()
		{
			Assert.Equal(2, api.PostList(GetPersonList().ToList()));
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
			Tuple<string, int> r = api.PostWithQueryButEmptyBody("abc", 123);
			Assert.Equal("abc", r.Item1);
			Assert.Equal(123, r.Item2);
		}

		[Fact]
		public async Task TestPostActionResult()
		{

/* Unmerged change from project 'IntegrationTestsTextJson'
Before:
			var m = await api.PostActionResultAsync();
After:
			HttpResponseMessage m = await api.PostActionResultAsync();
*/
			System.Net.Http.HttpResponseMessage m = await api.PostActionResultAsync();
			Assert.Equal(System.Net.HttpStatusCode.OK, m.StatusCode);
			string s = await m.Content.ReadAsStringAsync();
			Assert.Equal("abcdefg", s);
		}

		[Fact]
		public async Task TestGetActionResult()
		{

/* Unmerged change from project 'IntegrationTestsTextJson'
Before:
			var m = await api.GetActionResultAsync();
After:
			HttpResponseMessage m = await api.GetActionResultAsync();
*/
			System.Net.Http.HttpResponseMessage m = await api.GetActionResultAsync();
			Assert.Equal(System.Net.HttpStatusCode.OK, m.StatusCode);
			string s = await m.Content.ReadAsStringAsync();
			Assert.Equal("abcdefg", s);

		}

		[Fact]
		public async Task TestGetActionResult2()
		{

/* Unmerged change from project 'IntegrationTestsTextJson'
Before:
			var m = await api.GetActionResult2Async();
After:
			HttpResponseMessage m = await api.GetActionResult2Async();
*/
			System.Net.Http.HttpResponseMessage m = await api.GetActionResult2Async();
			Assert.Equal(System.Net.HttpStatusCode.OK, m.StatusCode);
			string s = await m.Content.ReadAsStringAsync();
			Assert.Equal("abcdefg", s);

		}

		[Fact]
		public void TestPostGuids()
		{
			Guid id1 = Guid.NewGuid();
			Guid id2 = Guid.NewGuid();
			Guid[] ids = new Guid[] { id1, id2 };
			Guid[] r = api.PostGuids(ids);
			Assert.Equal(2, r.Length);
			Assert.Equal(id1, r[0]);
		}
	}
}
