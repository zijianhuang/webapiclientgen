using System;
using System.Numerics;
using Xunit;

namespace IntegrationTests
{
	[Collection(TestConstants.LaunchWebApiAndInit)]
	public partial class NumbersApiIntegration : IClassFixture<NumbersFixture>
	{
		public NumbersApiIntegration(NumbersFixture fixture)
		{
			api = fixture.Api;
		}

		readonly DemoWebApi.Controllers.Client.Numbers api;

		[Fact]
		public void TestPostBigNumbers()
		{
			var d = new DemoWebApi.DemoData.Client.BigNumbers
			{
				Signed64 = 9223372036854775807, // long.MaxValue,
				Unsigned64 = 18446744073709551615, // ulong.MaxValue,
				Signed128 = Int128.MaxValue,
				Unsigned128 = UInt128.MaxValue, //340282366920938463463374607431768211455, // UInt128.MaxValue,
				BigInt = UInt128.MaxValue * 100,
			};
			var r = api.PostBigNumbers(d);

			Assert.Equal(d.Signed64, r.Signed64);
			Assert.Equal(d.Unsigned64, r.Unsigned64);
			Assert.Equal(d.Signed128, r.Signed128);
			Assert.Equal(d.Unsigned128, r.Unsigned128);
			Assert.Equal(d.BigInt, r.BigInt);
		}

		[Fact]
		public void TestPostLong()
		{
			var r = api.PostInt64(long.MaxValue);
			Assert.Equal(long.MaxValue, r);
		}

		[Fact]
		public void TestPostULong()
		{
			var r = api.PostUint64(ulong.MaxValue);
			Assert.Equal(ulong.MaxValue, r);
		}

		[Fact]
		public void TestPostInt128()
		{
			var r = api.PostInt128(Int128.MaxValue);
			Assert.Equal(Int128.MaxValue, r);
		}

		[Fact]
		public void TestPostUInt128()
		{
			var r = api.PostUint128(UInt128.MaxValue);
			Assert.Equal(UInt128.MaxValue, r);
		}

		[Fact]
		public void TestPostBigInteger()
		{
			BigInteger bigInt = UInt128.MaxValue * 100;
			var r = api.PostBigInteger(bigInt);
			Assert.Equal(bigInt, r);
		}

		[Fact]
		public void TestPostSByte()
		{
			var r = api.Post(sbyte.MaxValue);
			Assert.Equal(sbyte.MaxValue, r);
		}

		[Fact]
		public void TestPostByte()
		{
			var r = api.Post(byte.MaxValue);
			Assert.Equal(byte.MaxValue, r);
		}

		[Fact]
		public void TestPostShort()
		{
			var r = api.Post(short.MaxValue);
			Assert.Equal(short.MaxValue, r);
		}

		[Fact]
		public void TestPostUShort()
		{
			var r = api.Post(ushort.MaxValue);
			Assert.Equal(ushort.MaxValue, r);
		}

		[Fact]
		public void TestPostInt()
		{
			var r = api.Post(int.MaxValue);
			Assert.Equal(int.MaxValue, r);
		}

		[Fact]
		public void TestPostUInt()
		{
			var r = api.Post(uint.MaxValue);
			Assert.Equal(uint.MaxValue, r);
		}


	}
}
