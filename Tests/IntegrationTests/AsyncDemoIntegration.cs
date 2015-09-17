using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace IntegrationTests
{
    [Collection(TestConstants.IisExpressAndInit)]
    public class AsyncDemoApiIntegration : IDisposable
    {
        public AsyncDemoApiIntegration()
        {
            baseUri=new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            httpClient=new System.Net.Http.HttpClient();
            api = new DemoWebApi.Controllers.Client.AsyncDemo(httpClient, baseUri);
        }

        System.Net.Http.HttpClient httpClient;

        Uri baseUri;

        DemoWebApi.Controllers.Client.AsyncDemo api;

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
        public void TestGetDecimal()
        {
            var d = api.GetDecimal(true);
            Assert.True(d.Value > 10);
        }
      
        [Fact]
        public void TestGetDecimalNull()
        {
            var d = api.GetDecimal(false);
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


        public void Dispose()
        {
            httpClient.Dispose();
        }
    }
}
