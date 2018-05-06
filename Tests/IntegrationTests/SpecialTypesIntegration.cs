using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using DemoWebApi.DemoData.Client;

namespace IntegrationTests
{

    [Collection(TestConstants.IisExpressAndInit)]
    public class SpecialTypesIntegration : IClassFixture<SuperDemoFixture>
    {
        public SpecialTypesIntegration(SuperDemoFixture fixture)
        {
            api = fixture.Api;
        }

        DemoWebApi.Controllers.Client.SuperDemo api;


        [Fact]
        public void TestGetAnonymousDynamic()
        {
            var d = api.GetAnonymousDynamic();
            Assert.Equal("12345", d["id"].ToString());
            Assert.Equal("Something", d["name"].ToString());
        }

        [Fact]
        public void TestGetAnonymousObject()
        {
            var d = api.GetAnonymousObject();
            Assert.Equal("12345", d["id"].ToString());
            Assert.Equal("Something", d["name"].ToString());
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

    }
}
