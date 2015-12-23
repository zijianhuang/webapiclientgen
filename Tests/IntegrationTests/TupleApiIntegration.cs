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
        public void TestTuple1()
        {
            var r = api.GetTuple1();
            Assert.Equal(1, r.Item1);
        }

        [Fact]
        public void TestPostTuple1()
        {
            var r = api.PostTuple1(new Tuple<int>(8));
            Assert.Equal(8, r);
        }
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
        public void TestTuple3()
        {
            var r = api.GetTuple3();
            Assert.Equal("Three", r.Item1);
        }

        [Fact]
        public void TestPostTuple3()
        {
            var r = api.PostTuple3(new Tuple<string, string, int>("some", "", 3));
            Assert.Equal("some", r);
        }

        [Fact]
        public void TestTuple4()
        {
            var r = api.GetTuple4();
            Assert.Equal("Four", r.Item1);
        }

        [Fact]
        public void TestPostTuple4()
        {
            var r = api.PostTuple4(new Tuple<string, string, string, int>("some", "", "", 3));
            Assert.Equal("some", r);
        }

        [Fact]
        public void TestTuple5()
        {
            var r = api.GetTuple5();
            Assert.Equal("Five", r.Item1);
        }

        [Fact]
        public void TestPostTuple5()
        {
            var r = api.PostTuple5(new Tuple<string, string, string, string, int>("some", "", "", "", 3));
            Assert.Equal("some", r);
        }

        [Fact]
        public void TestTuple6()
        {
            var r = api.GetTuple6();
            Assert.Equal("Six", r.Item1);
        }

        [Fact]
        public void TestPostTuple6()
        {
            var r = api.PostTuple6(new Tuple<string, string, string, string, string, int>("some", "", "", "", "", 3));
            Assert.Equal("some", r);
        }

        [Fact]
        public void TestTuple7()
        {
            var r = api.GetTuple7();
            Assert.Equal("Seven", r.Item1);
        }

        [Fact]
        public void TestPostTuple7()
        {
            var r = api.PostTuple7(new Tuple<string, string, string, string, string, string, int>("some", "", "", "", "", "hhhh", 3));
            Assert.Equal("some", r);
        }


        [Fact]
        public void TestTupleCreate()
        {
            var t = Tuple.Create<string, string, int>("One", "Two", 2);
            var s = JsonConvert.SerializeObject(t);
            
        }

        [Fact]
        public void TestJsonSerializer()
        {
            var t = Tuple.Create<string, string, int>("One", "Two", 2);
            using (var writer = new System.IO.StringWriter())
            {
                var serializer = JsonSerializer.Create();
                serializer.Serialize(writer, t);
                var s = writer.ToString();
            }
        }


    }
}
