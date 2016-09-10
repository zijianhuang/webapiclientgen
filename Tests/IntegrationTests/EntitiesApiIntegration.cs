using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using DemoWebApi.DemoData.Client;

namespace IntegrationTests
{
    public class EntitiesFixture : IDisposable
    {
        public EntitiesFixture()
        {
            var baseUri = new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            httpClient = new System.Net.Http.HttpClient();
            Api = new DemoWebApi.Controllers.Client.Entities(httpClient, baseUri);
        }

        public DemoWebApi.Controllers.Client.Entities Api { get; private set; }

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
    public class EntitiesApiIntegration : IClassFixture<EntitiesFixture>
    {
        public EntitiesApiIntegration(EntitiesFixture fixture)
        {
            api = fixture.Api;
        }

        DemoWebApi.Controllers.Client.Entities api;

        [Fact]
        public void TestCreatePerson()
        {
            Person person = new Person()
            {
                Name = "Some One",
                Surname = "One",
                GivenName = "Some",
                BirthDate = DateTime.Now.AddYears(-20),
                Addresses = new Address[]{new Address(){
                    City="Brisbane",
                    State="QLD",
                    Street1="Somewhere",
                    Street2="Over the rainbow",
                    PostalCode="4000",
                    Country="Australia",
                    Type= AddressType.Postal,
                    Location = new DemoWebApi.DemoData.Another.Client.MyPoint() {X=4, Y=9 },
                }},
            };

            var id = api.CreatePerson(person);
            Assert.True(id > 0);
        }

        [Fact]
        public void TestCreatePersonWithEmptyName()
        {
            Person person = new Person()
            {
                Name = null,
                Surname = "One",
                GivenName = "Some",
                BirthDate = DateTime.Now.AddYears(-20),
                Addresses = new Address[]{new Address(){
                    City="Brisbane",
                    State="QLD",
                    Street1="Somewhere",
                    Street2="Over the rainbow",
                    PostalCode="4000",
                    Country="Australia",
                    Type= AddressType.Postal,
                    Location = new DemoWebApi.DemoData.Another.Client.MyPoint() {X=4, Y=9 },
              }},
            };

            Assert.Throws<System.Net.Http.HttpRequestException>(() => api.CreatePerson(person));
        }

        [Fact]
        public void TestDelete()
        {
            api.Delete(1000);
        }

        [Fact]
        public void TestUpdate()
        {
            api.UpdatePerson(new Person()
            {
                Name = "Some One",
                Surname = "One",
                GivenName = "Some",
                BirthDate = DateTime.Now.AddYears(-20),
                Addresses = new Address[]{new Address(){
                    City="Brisbane",
                    State="QLD",
                    Street1="Somewhere",
                    Street2="Over the rainbow",
                    PostalCode="4000",
                    Country="Australia",
                    Type= AddressType.Postal,
                }},
            }
            );
        }

        [Fact]
        public void TestGet()
        {
            var person = api.GetPerson(100);
            Assert.NotNull(person);
            Assert.Equal("Huang", person.Surname);
            Assert.True(person.BirthDate.HasValue);
            Assert.Equal(DateTime.Now.Year - 20, person.BirthDate.Value.Year);
        }

      //  [Fact(Skip ="No need to run everytime")]
        public void TestCreatePeopleConcurrently()
        {
            Person person = new Person()
            {
                Name = "Some One",
                Surname = "One",
                GivenName = "Some",
                BirthDate = DateTime.Now.AddYears(-20),
                Addresses = new Address[]{new Address(){
                    City="Brisbane",
                    State="QLD",
                    Street1="Somewhere",
                    Street2="Over the rainbow",
                    PostalCode="4000",
                    Country="Australia",
                    Type= AddressType.Postal,
                    Location = new DemoWebApi.DemoData.Another.Client.MyPoint() {X=4, Y=9 },
               }},
            };


            List<Person> people = new List<Person>();
            for (int i = 0; i < 100; i++)
            {
                people.Add(person);
            }


            var idTasks = people.Select(d => api.CreatePersonAsync(d)).ToArray();
            Task.WaitAll(idTasks);
            var ids = idTasks.Select(d => d.Result).ToArray();

            Assert.True(ids[50] > 0);

        }

        [Fact]
        public void GetCompany()
        {
            var c = api.GetCompany(1);
            Assert.Equal("Super Co", c.Name);
            Assert.Equal(2, c.Addresses.Length);
            Assert.Equal(AddressType.Postal, c.Addresses[0].Type);
            Assert.Equal(AddressType.Residential, c.Addresses[1].Type);
            Assert.Equal(8, c.Int2D[1, 3]);
            Assert.Equal(8, c.Int2DJagged[1][3]);

        }

        [Fact]
        public void TestGetNotFound()
        {
            var ex = Assert.Throws<System.Net.Http.HttpRequestException>(() =>
            {
                var person = api.GetPersonNotFound(100);
            });

            Assert.Contains("404", ex.Message);
        }

        [Fact]
        public void TestGetActionNotFound()
        {
            var ex = Assert.Throws<System.Net.Http.HttpRequestException>(() =>
            {
                var person = api.GetPersonActionNotFound(100);
            });

            Assert.Contains("404", ex.Message);
        }

    }
}
