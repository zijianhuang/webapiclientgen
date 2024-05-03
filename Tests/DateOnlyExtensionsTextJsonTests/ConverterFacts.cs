using System.Text.Json;

namespace DateOnlyExtensionsTextJsonTests
{
	public class ConverterFacts
	{
		/// <summary>
		/// The converter was developed for .NET 6 which serializes DateOnly to string unfriendly to JavaScript. Since .NET 7, this had been fixed.
		/// </summary>
		[Fact]
		public void TestDateOnlyJsonConverterInNet8()
		{
			JsonSerializerOptions options = new JsonSerializerOptions();
			options.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateOnlyJsonConverter());
			string s = JsonSerializer.Serialize(DateOnly.Parse("2023-12-31"), options);
			Assert.Equal("\"2023-12-31\"", s);
		}

		//[Fact] not needed in .NET 7 and above
		//public void TestDateOnlyJsonConverterInNet8WithNullable()
		//{
		//	var options = new JsonSerializerOptions();
		//	options.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateOnlyNullableJsonConverter());
		//	var s = JsonSerializer.Serialize(DateOnly.Parse("2023-12-31"), options);
		//	Assert.Equal("\"2023-12-31\"", s);
		//}

		//[Fact]
		//public void TestDateOnlyJsonConverterInNet8WithNullableWithNull()
		//{
		//	var options = new JsonSerializerOptions();
		//	options.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateOnlyNullableJsonConverter());
		//	var d = JsonSerializer.Deserialize<DateOnly?>("null", options);
		//	Assert.False(d.HasValue);
		//}

		[Fact]
		public void TestJsonSerializerDefaultBehavior()
		{
			string s = JsonSerializer.Serialize(DateOnly.Parse("2023-12-31"));
			Assert.Equal("\"2023-12-31\"", s);
		}

		[Fact]
		public void TestDateOnlyToString()
		{
			DateOnly d = DateOnly.Parse("2023-12-31");
			Assert.Equal("2023-12-31", d.ToString("O"));
		}

		[Fact]
		public void TestJsonSerializerDefaultBehaviorWithNull()
		{
			DateOnly? d = null;
			string s = JsonSerializer.Serialize<DateOnly?>(d);
			Assert.Equal("null", s);
		}

		[Fact]
		public void TestJsonDederializerDefaultBehaviorWithNull()
		{
			DateOnly? d = JsonSerializer.Deserialize<DateOnly?>("null"); // string "null" only presenting a JSON object in text, not null
			Assert.False(d.HasValue);
		}
	}
}