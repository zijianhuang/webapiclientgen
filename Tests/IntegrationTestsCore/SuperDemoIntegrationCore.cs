using System;
using Xunit;
using DemoWebApi.DemoData.Client;

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

		readonly System.Net.Http.HttpClient httpClient;

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

		readonly DemoWebApi.Controllers.Client.SuperDemo api;

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

		[Fact]
		public void TestGetEnumArrayQ2()
		{
			var d = api.GetEnumArrayQ2(new DayOfWeek[] { DayOfWeek.Monday, DayOfWeek.Sunday, DayOfWeek.Saturday });
			Assert.Equal(3, d.Length);
			Assert.Equal(DayOfWeek.Saturday, d[2]);
		}

		[Fact]
		public void TestGetEnumArrayDays()
		{
			var d = api.GetEnumArrayDays(new Days[] { Days.Mon, Days.Tue, Days.Wed });
			Assert.Equal(3, d.Length);
			Assert.Equal(Days.Wed, d[2]);
		}

		[Fact]
		public void TestGetDay()
		{
			var d = api.GetDay(Days.Fri);
			Assert.Equal(Days.Fri, d);
		}

		[Fact]
		public void TestPostDay()
		{
			var d = api.PostDay(Days.Fri, Days.Sat);
			Assert.Equal(2, d.Length);
			Assert.Equal(Days.Sat, d[1]);
		}

		[Fact]
		public void TestAthletheSearch()
		{
			var s = api.AthletheSearch(32, 0, null, null, null);
			Assert.Equal("\"320\"", s);
		}

		[Fact]
		public void TestAthletheSearch2()
		{
			var s = api.AthletheSearch(32, 0, null, null, "Search");
			Assert.Equal("\"320Search\"", s);
		}

		[Fact]
		public void TestAthletheSearch3()
		{
			var s = api.AthletheSearch(32, 0, null, "Sort", "Search");
			Assert.Equal("\"320SortSearch\"", s);
		}

		[Fact]
		public void TestAthletheSearch4()
		{
			var s = api.AthletheSearch(32, 0, "Order", "Sort", "Search");
			Assert.Equal("\"320OrderSortSearch\"", s);
		}

		[Fact]
		public void TestAthletheSearch5()
		{
			var s = api.AthletheSearch(32, 0, "Order", null, "Search");
			Assert.Equal("\"320OrderSearch\"", s);
		}

		[Fact]
		public void TestAthletheSearch6()
		{
			var s = api.AthletheSearch(32, 0, "Order", "", "Search");
			Assert.Equal("\"320OrderSearch\"", s);
		}



	}
}
