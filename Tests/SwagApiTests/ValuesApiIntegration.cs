using System.Linq;
using System;
using Xunit;
using System.Threading.Tasks;
using MyNS;
namespace IntegrationTests
{
	public class ValuesFixture : IDisposable
	{
		public ValuesFixture()
		{
			var baseUri = new Uri("http://localhost:5000/");

			httpClient = new System.Net.Http.HttpClient();
			httpClient.BaseAddress = baseUri;
			//httpClient.DefaultRequestHeaders
			//  .Accept
			//  .Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//.net core has different behavior as described at https://github.com/zijianhuang/webapiclientgen/issues/26

			Api = new ValuesClient(httpClient);
		}

		public ValuesClient Api { get; private set; }

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

	public partial class ValuesApiIntegration : IClassFixture<ValuesFixture>
	{
		public ValuesApiIntegration(ValuesFixture fixture)
		{
			api = fixture.Api;
		}

		ValuesClient api;

		[Fact]
		public void TestValuesGet()
		{
			//var task = authorizedClient.GetStringAsync(new Uri(baseUri, "api/Values"));
			//var text = task.Result;
			//var array = JArray.Parse(text);
			var array = api.ValuesGet();
			Assert.Equal("value2", array[1]);
		}

		//[Fact]
		//public void TestValuesGetId() Swashbuckle.AspNetCore could not generate yaml for this
		//{
		//	var r = api.get(1,  "something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"");
		//	Assert.Equal("something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"1", r);
		//}


		//[Fact]
		//public void TestGetName() Swashbuckle.AspNetCore could not generate yaml for this
		//{
		//	Assert.Equal("ABC", api.ValuesGet("Abc"));
		//}

		[Fact]
		public void TestValuesPost()
		{
			var t = api.ValuesPost("value");
			Assert.Equal("VALUE", t);
		}

		[Fact]
		public async Task TestValuesPostAsync()
		{
			var t = await api.ValuesPostAsync("value");
			Assert.Equal("VALUE", t);
		}

		[Fact]
		public void TestValuesPut2()
		{
			api.ValuesPutById(1, "value");
		}

		[Fact]
		public void TestValuesDelete()
		{
			api.ValuesDeleteById(1);
		}

	}
}
