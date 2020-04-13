using System;
using Xunit;

namespace IntegrationTests
{
	public class SuperDemoFixture : IDisposable
	{
		public SuperDemoFixture()
		{
			var baseUri = new Uri("http://localhost:5000/");

			httpClient = new System.Net.Http.HttpClient();
			httpClient.BaseAddress = baseUri;
			Api = new DemoWebApi.Controllers.Client.SuperDemo(httpClient);
		}

		public DemoWebApi.Controllers.Client.SuperDemo Api { get; private set; }

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


	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class SuperDemoApiIntegration : IClassFixture<SuperDemoFixture>
	{
		public SuperDemoApiIntegration(SuperDemoFixture fixture)
		{
			api = fixture.Api;
		}

		DemoWebApi.Controllers.Client.SuperDemo api;

		[Fact]
		public void TestGetIntArrayQ()
		{
			var d = api.GetIntArrayQ(new int[] { 3, 4, 5 });
			Assert.Equal(3, d.Length);
			Assert.Equal(5, d[2]);
		}

		[Fact]
		public void TestGetIntArrayQ2()
		{
			var d = api.GetIntArrayQ2(new long[] { 3, 4, 5 });
			Assert.Equal(3, d.Length);
			Assert.Equal(5, d[2]);
		}

		[Fact]
		public void TestGetDecimalArrayQ()
		{
			var d = api.GetDecimalArrayQ(new decimal[] { 3.5m, 4.6m, 5.7m });
			Assert.Equal(3, d.Length);
			Assert.Equal(5.7m, d[2]);
		}

		[Fact]
		public void TestGetStringArrayQ()
		{
			var d = api.GetStringArrayQ(new string[] { "Abc", "Eft", "hi" });
			Assert.Equal(3, d.Length);
			Assert.Equal("hi", d[2]);
		}

		[Fact]
		public void TestGetStringArrayQ2()
		{
			var d = api.GetStringArrayQ2(new string[] { "Abc", "Eft", "hi" });
			Assert.Equal(3, d.Length);
			Assert.Equal("hi", d[2]);
		}



	}
}
