using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using DemoWebApi.DemoData.Client;

namespace IntegrationTests
{
    public class SuperDemoFixture : IDisposable
    {
        public SuperDemoFixture()
        {
            var baseUri = new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            httpClient = new System.Net.Http.HttpClient();
            Api = new DemoWebApi.Controllers.Client.SuperDemo(httpClient, baseUri);
        }

        public DemoWebApi.Controllers.Client.SuperDemo Api { get; private set; }

        System.Net.Http.HttpClient httpClient;

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


    [Collection(TestConstants.IisExpressAndInit)]
    public class SuperDemoApiIntegration : IClassFixture<SuperDemoFixture>
    {
        public SuperDemoApiIntegration(SuperDemoFixture fixture)
        {
            api = fixture.Api;
        }

        DemoWebApi.Controllers.Client.SuperDemo api;

        [Fact]
        public void TestGetIntSquare()
        {
            Assert.Equal(10000, api.GetIntSquare(100));
        }

        [Fact]
        public void TestGetDecimalSquare()
        {
            Assert.Equal(10000, api.GetDecimalSquare(100));
        }

        [Fact]
        public void TestGetDateTime()
        {
            var dt = api.GetDateTime(true);
            Assert.True( (DateTime.Now- dt.Value)< TimeSpan.FromSeconds(2));
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
        public void TestZeroWithFloatDoubleAndDecimal()
        {
            Assert.NotEqual(0, 0.1f + 0.2f - 0.3f);
            Assert.NotEqual(0, 0.1d + 0.2d - 0.3d);
            Assert.Equal(0, 0.1m + 0.2m - 0.3m);

            Assert.NotEqual(0, api.GetFloatZero());
            Assert.NotEqual(0, api.GetDoubleZero());
            Assert.Equal(0, api.GetDecimalZero());

        }

        [Fact]
        public void TestGetNullString()
        {
            Assert.Equal(null, api.GetNullString());
        }

        [Fact]
        public void TestGetNullPerson()
        {
            Assert.Equal(null, api.GetNullPerson());
        }

        [Fact]
        public void TestGetEmptyString()
        {
            Assert.Equal(String.Empty, api.GetEmptyString());
        }

        [Fact]
        public void TestGetByteArray()
        {
            var array = api.GetByteArray();
            var s = System.Text.Encoding.UTF8.GetString(array);
            Assert.Equal("abcdefg", s);
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
        public void TestGetActionResult()
        {
            var response = api.GetActionResult();
            var stream = response.Content.ReadAsStreamAsync().Result;
            using (var reader = new System.IO.StreamReader(stream))
            {
                var s = reader.ReadToEnd();
                Assert.Equal("\"abcdefg\"", s);
            }

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
        public void TestGetAnonymousDynamic()
        {
            var d = api.GetAnonymousDynamic();
            Assert.Equal("12345", d["Id"].ToString());
            Assert.Equal("Something", d["Name"].ToString());
        }

        [Fact]
        public void TestGetAnonymousObject()
        {
            var d = api.GetAnonymousObject();
            Assert.Equal("12345", d["Id"].ToString());
            Assert.Equal("Something", d["Name"].ToString());
        }

        [Fact]
        public void TestPostAnonymousObject()
        {
            var d = new Newtonsoft.Json.Linq.JObject();
            d["Id"] = "12345";
            d["Name"] = "Something";
            var r = api.PostAnonymousObject(d);
            Assert.Equal("123451", r["Id"].ToString());
            Assert.Equal("Something1", r["Name"].ToString());

        }

        [Fact]
        public void TestGetDictionaryOfPeople()
        {
            var dic = api.GetDictionaryOfPeople();
            Assert.Equal("Tony Stark", dic["Iron Man"].Name);
            Assert.Equal("New York", dic["Spider Man"].Addresses[0].City);
        }

        [Fact]
        public void TestGetDictionary()
        {
            var dic = api.GetDictionary();
            Assert.Equal("number", dic["System.Int64"]);
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

    }
}
