using System;
using Xunit;
using Fonlow.Testing;
using System.Text.Json;

namespace SystemTextJsonTests
{
	public partial class TextJsonSerializerTests
	{
		[Fact]
		public void TestSerializeInt64()
		{
			Assert.Equal(1234, JsonSerializer.Deserialize<long>("1234"));
			Assert.Equal(9223372036854775807, JsonSerializer.Deserialize<long>("9223372036854775807"));
		}

		[Fact]
		public void TestDerializeInt64()
		{
		}


	}
}
