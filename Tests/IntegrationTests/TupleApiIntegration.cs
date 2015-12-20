using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using DemoWebApi.DemoData.Client;
using Newtonsoft.Json;

namespace IntegrationTests
{
    public class TupleFixture : IDisposable
    {
        public TupleFixture()
        {
            var baseUri = new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            httpClient = new System.Net.Http.HttpClient();
            Api = new DemoWebApi.Controllers.Client.Tuple(httpClient, baseUri);
        }

        public DemoWebApi.Controllers.Client.Tuple Api { get; private set; }

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
    public class TupleApiIntegration : IClassFixture<TupleFixture>
    {
        public TupleApiIntegration(TupleFixture fixture)
        {
            api = fixture.Api;
        }

        DemoWebApi.Controllers.Client.Tuple api;

        [Fact]
        public void TestTuple2()
        {
            var r = api.GetTuple2();
            Assert.Equal("Two", r.Item1);
            Assert.Equal(2, r.Item2);
        }

        [Fact]
        public void TestPostTuple2()
        {
            var r = api.PostTuple2(new Tuple<string, int>("some", 3));
            Assert.Equal("some", r);
        }


        [Fact]
        public void TestTupleCreate()
        {
            var t = Tuple.Create<string, string, int>("One", "Two", 2);
            var s = JsonConvert.SerializeObject(t);
        }

    }
}
