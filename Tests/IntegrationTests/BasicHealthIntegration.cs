using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using DemoWebApi.Controllers.Client;

namespace IntegrationTests
{
    public class BasicHealthIntegration
    {
        [Fact]
        public void TestNullHttpClientThrows()
        {
            Assert.Throws<ArgumentNullException>(() => new Values(null, new Uri("http://www.fonlow.com")));
        }

        [Fact]
        public void TestNullUriThrows()
        {
            Assert.Throws<ArgumentNullException>(() => {
                using (var client = new System.Net.Http.HttpClient())
                    new Values(client, null);
            });

        }
    }
}
