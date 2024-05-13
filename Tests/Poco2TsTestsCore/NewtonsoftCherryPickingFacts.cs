using System;
using System.Linq;
using System.Reflection;
using Xunit;
using Newtonsoft.Json;
using DemoWebApi.DemoData;
using System.Runtime.Serialization;
using Poco2TsTestsCore;

namespace Poco2TsTests
{
	public class NewtonsoftCherryPickingFacts
	{
		static readonly JsonSerializerSettings serializerSettings = new JsonSerializerSettings()
		{
			NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
		};

		[Fact]
		public void TestPerson()
		{
			var p = new Person()
			{
				Surname = "Someone"
			};
			var serializer = JsonSerializer.Create();
			var s = JsonConvert.SerializeObject(p, serializerSettings);
			Assert.Equal("{\"Surname\":\"Someone\",\"Addresses\":[]}", s);
		}

		[Fact]
		public void TestFooPerson()
		{
			var p = new FooPerson()
			{
				Surname = "Smith",
				GivenName = "John",
			};
			var serializer = JsonSerializer.Create();
			var s = JsonConvert.SerializeObject(p, serializerSettings);
			Assert.Equal("{\"Surname\":\"Smith\"}", s);
		}

		[Fact]
		public void TestJsonPropertyPerson()
		{
			var p = new JsonPropertyPerson()
			{
				Surname = "Smith",
				GivenName = "John"
			};
			var serializer = JsonSerializer.Create();
			var s = JsonConvert.SerializeObject(p, serializerSettings);
			Assert.Equal("{\"Surname\":\"Smith\"}", s);
		}



	}
}
