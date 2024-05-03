using DemoWebApi.DemoData.Client;
using Newtonsoft.Json;
using System;
using Xunit;

namespace IntegrationTests
{
	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class TupleApiIntegration : IClassFixture<TupleFixture>
	{
		public TupleApiIntegration(TupleFixture fixture)
		{
			api = fixture.Api;
		}

		readonly DemoWebApi.Controllers.Client.Tuple api;

		[Fact]
		public void TestTuple1()
		{
			Tuple<int> r = api.GetTuple1();
			Assert.Equal(1, r.Item1);
		}

		[Fact]
		public void TestPostTuple1()
		{
			int r = api.PostTuple1(new Tuple<int>(8));
			Assert.Equal(8, r);
		}
		[Fact]
		public void TestTuple2()
		{
			Tuple<string, int> r = api.GetTuple2();
			Assert.Equal("Two", r.Item1);
			Assert.Equal(2, r.Item2);
		}

		[Fact]
		public void TestPostTuple2()
		{
			string r = api.PostTuple2(new Tuple<string, int>("some", 3));
			Assert.Equal("some", r);
		}

		[Fact]
		public void TestTuple3()
		{
			Tuple<string, string, int> r = api.GetTuple3();
			Assert.Equal("Three", r.Item1);
		}

		[Fact]
		public void TestPostTuple3()
		{
			string r = api.PostTuple3(new Tuple<string, string, int>("some", "", 3));
			Assert.Equal("some", r);
		}

		[Fact]
		public void TestTuple4()
		{
			Tuple<string, string, string, int> r = api.GetTuple4();
			Assert.Equal("Four", r.Item1);
		}

		[Fact]
		public void TestPostTuple4()
		{
			string r = api.PostTuple4(new Tuple<string, string, string, int>("some", "", "", 3));
			Assert.Equal("some", r);
		}

		[Fact]
		public void TestTuple5()
		{
			Tuple<string, string, string, string, int> r = api.GetTuple5();
			Assert.Equal("Five", r.Item1);
		}

		[Fact]
		public void TestPostTuple5()
		{
			string r = api.PostTuple5(new Tuple<string, string, string, string, int>("some", "", "", "", 3));
			Assert.Equal("some", r);
		}

		[Fact]
		public void TestTuple6()
		{
			Tuple<string, string, string, string, string, int> r = api.GetTuple6();
			Assert.Equal("Six", r.Item1);
		}

		[Fact]
		public void TestPostTuple6()
		{
			string r = api.PostTuple6(new Tuple<string, string, string, string, string, int>("some", "", "", "", "", 3));
			Assert.Equal("some", r);
		}

		[Fact]
		public void TestTuple7()
		{
			Tuple<string, string, string, string, string, long, int> r = api.GetTuple7();
			Assert.Equal("Seven", r.Item1);
		}

		[Fact]
		public void TestPostTuple7()
		{
			string r = api.PostTuple7(new Tuple<string, string, string, string, string, long, int>("some", "", "", "", "", 333, 3));
			Assert.Equal("some", r);
		}

		[Fact]
		public void TestTuple8()
		{
			Tuple<string, string, string, string, string, string, int, Tuple<string, string, string>> r = api.GetTuple8();
			Assert.Equal("Nested", r.Item1);
			Assert.Equal("nine", r.Rest.Item1);
		}

		[Fact]
		public void TestPostTuple8()
		{
			string r = api.PostTuple8(new Tuple<string, string, string, string, string, string, string, Tuple<string, string, string>>(
				"abc", "", "", "", "", "", "", new Tuple<string, string, string>("ok", "yes", "no")));
			Assert.Equal("ok", r);
		}


		//[Fact]
		//public void TestTupleCreate()
		//{
		//	var t = Tuple.Create<string, string, int>("One", "Two", 2);
		//	var s = JsonConvert.SerializeObject(t);

		//}

		[Fact]
		public void TestJsonSerializer()
		{
			Tuple<string, string, int> t = Tuple.Create<string, string, int>("One", "Two", 2);

/* Unmerged change from project 'IntegrationTestsTextJson'
Before:
			using (var writer = new System.IO.StringWriter())
After:
			using (StringWriter writer = new System.IO.StringWriter())
*/
			using (System.IO.StringWriter writer = new System.IO.StringWriter())
			{
				JsonSerializer serializer = JsonSerializer.Create();
				serializer.Serialize(writer, t);
				string s = writer.ToString();
			}
		}

		[Fact]
		public void TestLinkPersonCompany1()
		{
			Person p = new Person
			{
				Name = "Hey OK",
			};

			Company c = new Company
			{
				Name = "My Co",
				FoundDate = DateTime.Now,
				RegisterDate = new DateOnly(2020, 12, 23),
			};

			Person r = api.LinkPersonCompany1(Tuple.Create(p, c));
			Assert.Equal("Hey OK", r.Name);
		}

		[Fact]
		public void TestLinkPersonCompany7()
		{
			Person p = new Person
			{
				Name = "Hey OK",
			};

			Company c = new Company
			{
				Name = "My Co"
			};

			Person r = api.LinkPeopleCompany7(Tuple.Create(p, p, p, p, p, p, c));
			Assert.Equal("Hey OK", r.Name);
		}

		[Fact]
		public void TestChangeName()
		{
			Person p = new Person
			{
				Name = "Hey OK",
			};

			Person r = api.ChangeName(Tuple.Create("Me", p));
			Assert.Equal("Me", r.Name);
		}
	}
}
