using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace IntegrationTests
{
    [Collection(TestConstants.IisExpressAndInit)]
    public class ValuesApiIntegration : IDisposable
    {
        public ValuesApiIntegration()
        {
            baseUri=new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            httpClient=new System.Net.Http.HttpClient();
            api = new DemoWebApi.Controllers.Client.Values(httpClient, baseUri);
        }

        System.Net.Http.HttpClient httpClient;

        Uri baseUri;

        DemoWebApi.Controllers.Client.Values api;

        [Fact]
        public void TestValuesGet()
        {
            //var task = authorizedClient.GetStringAsync(new Uri(baseUri, "api/Values"));
            //var text = task.Result;
            //var array = JArray.Parse(text);
            var array = api.Get().ToArray();
            Assert.Equal("value2", array[1]);
        }

        [Fact]
        public void TestValuesGetId()
        {
            //UriBuilder builder = new UriBuilder(new Uri(baseUri, "api/Values"));
            //var query = System.Web.HttpUtility.ParseQueryString(builder.Query);
            //query.Add("id", "1");
            //query.Add("name", "something to say");
            //builder.Query = query.ToString();
            //var task = authorizedClient.GetStringAsync(builder.ToString());
            //var text = task.Result;
            //var jObject = JValue.Parse(text);
            var r = api.Get(1, "something to say");
            Assert.Equal("something to say1", r);
        }


        [Fact]
        public void TestValuesPost()
        {
            //var t = authorizedClient.PostAsync(new Uri(baseUri, "api/Values")
            //        , new FormUrlEncodedContent(new[] { new KeyValuePair<string, string>("", "value") }));
            //var ok = t.Result.IsSuccessStatusCode;
            //Assert.True(ok);
            //var text = t.Result.Content.ReadAsStringAsync().Result;
            //var jObject = JValue.Parse(text);
            //Assert.Equal("VALUE", jObject.ToObject<string>());
            var t = api.Post("value");
            Assert.Equal("VALUE", t);
        }

        [Fact]
        public void TestValuesPut2()
        {
            //var t = authorizedClient.PutAsync(new Uri(baseUri, "api/Values?id=1"), new FormUrlEncodedContent(new[] { new KeyValuePair<string, string>("", "value") }));
            //var ok = t.Result.IsSuccessStatusCode;
            //Assert.True(ok);
            api.Put(1, "value");
        }

        [Fact]
        public void TestValuesDelete()
        {
            //var t = authorizedClient.DeleteAsync(new Uri(baseUri, "api/Values/1"));
            //var ok = t.Result.IsSuccessStatusCode;
            //Assert.True(ok);
            api.Delete(1);
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
