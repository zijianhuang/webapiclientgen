using DemoWebApi.DemoData.Client;
using System;
using System.Collections.Generic;
using Xunit;

namespace IntegrationTests
{

	public partial class SuperDemoApiIntegration 
    {
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
            Assert.Equal(dtNow.AddYears(1), api.GetNextYear(dtNow));
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
			Assert.Equal(dtNow.AddYears(2), api.GetNextYearNullable(2, dtNow));
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
            Assert.Equal(null, api.GetNullPerson());
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
            Assert.Equal(true, api.GetBool());
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

			Assert.Throws<KeyNotFoundException>(()=> dic["iron Man"].Name);
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
    }
}
