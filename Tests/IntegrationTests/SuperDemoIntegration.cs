using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace IntegrationTests
{
    [Collection(TestConstants.IisExpressAndInit)]
    public class SuperDemoApiIntegration : IDisposable
    {
        public SuperDemoApiIntegration()
        {
            baseUri=new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            httpClient=new System.Net.Http.HttpClient();
            api = new DemoWebApi.Controllers.Client.SuperDemo(httpClient, baseUri);
        }

        System.Net.Http.HttpClient httpClient;

        Uri baseUri;

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
            Assert.True(dt.Value <= DateTime.Now);
        }

        [Fact]
        public void TestGetDateTimeNull()
        {
            var dt = api.GetDateTime(false);
            Assert.False(dt.HasValue);
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
            var s= System.Text.Encoding.UTF8.GetString(array);
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
}
