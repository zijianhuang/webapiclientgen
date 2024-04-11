using System.Text.Json;
using System;
using System.Linq;
using System.Numerics;
using Xunit;
using System.Globalization;
using System.Text.Json.Serialization;

namespace IntegrationTests
{
	public class TextJsonNegativeCases
	{

		/// <summary>
		/// By default .net core can't. https://stackoverflow.com/questions/64788895/serialising-biginteger-using-system-text-json had confirmed such shortfall and provided a solution
		/// </summary>
		[Fact]
		public void TestSerializeBigIntWithSomeSetting_Wrong()
		{
			var jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions()
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault,
				PropertyNameCaseInsensitive = true,
			};

			BigInteger bigInt = UInt128.MaxValue;
			var contentJson = JsonSerializer.Serialize(bigInt, jsonSerializerSettings);
			Assert.Equal("{\"Sign\":1}", contentJson);
		}

		[Fact]
		public void TestSerializeBigIntWitoutSetting_Wrong()
		{
			BigInteger bigInt = UInt128.MaxValue;
			var contentJson = JsonSerializer.Serialize(bigInt);
			Assert.Equal("{\"IsPowerOfTwo\":false,\"IsZero\":false,\"IsOne\":false,\"IsEven\":false,\"Sign\":1}", contentJson);
		}

		[Fact]
		public void TestSerializeBigIntWithDefaultsWeb_Wrong()
		{
			var jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions(JsonSerializerDefaults.Web)
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault,
				PropertyNameCaseInsensitive = true,
			};

			BigInteger bigInt = UInt128.MaxValue;
			var contentJson = JsonSerializer.Serialize(bigInt, jsonSerializerSettings);
			Assert.Equal("{\"sign\":1}", contentJson); // just camelCase
		}

		[Fact]
		public void TestSerializeBigIntWithCustomConverter()
		{
			var jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions();
			jsonSerializerSettings.Converters.Add(new DemoTextJsonWeb.BigIntegerConverter());

			BigInteger bigInt = UInt128.MaxValue;
			var contentJson = JsonSerializer.Serialize(bigInt, jsonSerializerSettings);
			Assert.Equal("340282366920938463463374607431768211455", contentJson);
			Assert.Equal(UInt128.MaxValue.ToString(), contentJson);
			Assert.Equal(bigInt.ToString(), contentJson);

			//And deserialize
			var v = JsonSerializer.Deserialize<BigInteger>(contentJson, jsonSerializerSettings);
			Assert.Equal(bigInt, v);
			Assert.Equal("340282366920938463463374607431768211455", v.ToString());
		}

		[Fact]
		public void TestSerializeNullableDateTime()
		{
			DateTime? dn = null;
			var d = JsonSerializer.Serialize(dn);
			Assert.Equal("null", d); //var content = new StringContent(contentJson, System.Text.Encoding.UTF8, "application/json"); will make it a null object

			//var d2 = JsonSerializer.Deserialize<System.Nullable<System.DateTime>>("");
			//Assert.False(d2.HasValue);

		}

		[Fact]
		public void TestDeserializeNullableDateTime()
		{
			var d = JsonSerializer.Deserialize<System.Nullable<System.DateTime>>("null");
			Assert.False(d.HasValue);

			Assert.Throws<JsonException>(()=> JsonSerializer.Deserialize<System.Nullable<System.DateTime>>("")); // ASP.NET Core without Newtonsoft.Json will return empty string and status code 204 No Content. Newtonsoft.Json's serializer will interpret empty string as null for nullable struct.

		}
	}
}
