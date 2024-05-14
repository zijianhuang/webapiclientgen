using System;
using System.Linq;
using System.Reflection;
using Xunit;
using DemoWebApi.DemoData;
using System.Runtime.Serialization;
using Poco2TsTestsCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Poco2TsTests
{
	public class TextJsonPickingFacts
	{
		static readonly JsonSerializerOptions myOptions = new JsonSerializerOptions()
		{
			DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
		};

		[Fact]
		public void TestPerson()
		{
			var p = new Person()
			{
				Surname = "Someone"
			};

			var s = JsonSerializer.Serialize(p, myOptions);
			Assert.Equal("{\"Surname\":\"Someone\",\"Addresses\":[]}", s);
		}

		/// <summary>
		/// It won't respect DataContract and DataMemberSttribute. However, a little confusing info from MS developer "layomia" on https://github.com/dotnet/runtime/issues/30180
		/// </summary>
		[Fact]
		public void TestFooPerson()
		{
			var p = new FooPerson()
			{
				Surname = "Smith",
				GivenName = "John",
			};
			var s = JsonSerializer.Serialize(p, myOptions);
			Assert.Equal("{\"Surname\":\"Smith\",\"GivenName\":\"John\"}", s);
		}

		/// <summary>
		/// It won't respect Newtonsoft.Json attributes, for obvious reasons.
		/// </summary>
		[Fact]
		public void TestJsonPropertyPerson()
		{
			var p = new JsonPropertyPerson()
			{
				Surname = "Smith",
				GivenName = "John"
			};
			var s = JsonSerializer.Serialize(p, myOptions);
			Assert.Equal("{\"Surname\":\"Smith\",\"GivenName\":\"John\"}", s);
		}

		/// <summary>
		/// According to https://github.com/dotnet/runtime/issues/36785, MS somehow prefers opt-out by default.
		/// </summary>
		[Fact]
		public void TestTextJsonPerson()
		{
			var p = new TextJsonPerson()
			{
				Surname = "Smith",
				GivenName = "John"
			};
			var s = JsonSerializer.Serialize(p, myOptions);
			Assert.Equal("{\"Surname\":\"Smith\"}", s);
		}



	}


	public class TextJsonPerson
	{
		public string Surname { get; set; }
		[System.Text.Json.Serialization.JsonIgnore]
		public string GivenName { get; set; }
	}

}
