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
    public class EntitiesApiIntegration : IDisposable
    {
        public EntitiesApiIntegration()
        {
            baseUri=new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            httpClient=new System.Net.Http.HttpClient();
            api = new DemoWebApi.Controllers.Client.Entities(httpClient, baseUri);
        }

        System.Net.Http.HttpClient httpClient;

        Uri baseUri;

        DemoWebApi.Controllers.Client.Entities api;

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
                }},
            };

            var id = api.CreatePerson(person);
            Assert.True(id > 0);
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

        [Fact]
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
    }
}
