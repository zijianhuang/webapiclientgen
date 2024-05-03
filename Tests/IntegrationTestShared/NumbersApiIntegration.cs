using System;
using System.Linq;
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
			DemoWebApi.DemoData.Client.BigNumbers d = new DemoWebApi.DemoData.Client.BigNumbers
			{
				Signed64 = 9223372036854775807, // long.MaxValue,
				Unsigned64 = 18446744073709551615, // ulong.MaxValue,
				Signed128 = new Int128(0x7FFF_FFFF_FFFF_FFFF, 0xFFFF_FFFF_FFFF_FFFF), // Int128.MaxValue,
				Unsigned128 = new UInt128(0xFFFF_FFFF_FFFF_FFFF, 0xFFFF_FFFF_FFFF_FFFF), // UInt128.MaxValue
				BigInt = new BigInteger(18446744073709551615) * new BigInteger(18446744073709551615) * new BigInteger(18446744073709551615),
			};

			// {"BigInt":6277101735386680762814942322444851025767571854389858533375,"Signed128":"170141183460469231731687303715884105727",
			// "Signed64":9223372036854775807,"Unsigned128":"340282366920938463463374607431768211455","Unsigned64":18446744073709551615}

			DemoWebApi.DemoData.Client.BigNumbers r = api.PostBigNumbers(d);

			// {"signed64":9223372036854775807,"unsigned64":18446744073709551615,"signed128":"170141183460469231731687303715884105727",
			// "unsigned128":"340282366920938463463374607431768211455","bigInt":6277101735386680762814942322444851025767571854389858533375}
			Assert.Equal(d.Signed64, r.Signed64);
			Assert.Equal(d.Unsigned64, r.Unsigned64);
			Assert.Equal(d.Signed128, r.Signed128);
			Assert.Equal(d.Unsigned128, r.Unsigned128);
			Assert.Equal(d.BigInt, r.BigInt);
			Assert.NotEqual(d.BigInt, r.BigInt - 1);
		}

		[Fact]
		public void TestPostLong()
		{
			long r = api.PostInt64(long.MaxValue);
			Assert.Equal(long.MaxValue, r);
		}

		[Fact]
		public void TestPostLongWithRange()
		{
			Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() => api.PostLongWithRange(9223372036854775800 + 1));
		}

		[Fact]
		public void TestPostULong()
		{
			ulong r = api.PostUint64(ulong.MaxValue);
			Assert.Equal(ulong.MaxValue, r);
		}

		[Fact]
		public void TestPostInt128()
		{
			Int128 r = api.PostInt128(Int128.MaxValue);
			Assert.Equal(Int128.MaxValue, r);
		}

		[Fact]
		public void TestPostUInt128()
		{
			UInt128 r = api.PostUint128(UInt128.MaxValue);
			Assert.Equal(UInt128.MaxValue, r);
		}

		[Fact]
		public void TestPostBigIntegerWith128bits()
		{
			BigInteger bigInt = new BigInteger(18446744073709551615) * new BigInteger(18446744073709551615); // 128-bit unsigned
			Assert.Equal("340282366920938463426481119284349108225", bigInt.ToString());
			BigInteger r = api.PostBigInteger(bigInt);
			Assert.Equal(bigInt, r);
			Assert.Equal("340282366920938463426481119284349108225", r.ToString());
		}

		[Fact]
		public void TestPostBigIntegerWith192bits()
		{
			BigInteger bigInt = new BigInteger(18446744073709551615) * new BigInteger(18446744073709551615) * new BigInteger(18446744073709551615); // 192-bit unsigned
			Assert.Equal("6277101735386680762814942322444851025767571854389858533375", bigInt.ToString());
			BigInteger r = api.PostBigInteger(bigInt);
			Assert.Equal(bigInt, r);
			Assert.Equal("6277101735386680762814942322444851025767571854389858533375", r.ToString());
		}

		[Fact]
		public void TestPostBigIntegerWith80bits()
		{
			byte[] bytes = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F };
			BigInteger bigInt = new BigInteger(bytes); // 192-bit unsigned
			Assert.Equal("604462909807314587353087", bigInt.ToString());
			BigInteger r = api.PostBigInteger(bigInt);
			Assert.Equal(bigInt, r);
			Assert.Equal("604462909807314587353087", r.ToString());
			Assert.True(r.ToByteArray().SequenceEqual(bytes));
		}

		[Fact]
		public void TestPostUIntAsBigInteger()
		{
			BigInteger bigInt = UInt128.MaxValue;
			BigInteger r = api.PostBigInteger(bigInt);
			Assert.Equal(bigInt, r);
			Assert.Equal("340282366920938463463374607431768211455", r.ToString());
		}

		[Fact]
		public void TestPostSByte()
		{
			sbyte r = api.Post(sbyte.MaxValue);
			Assert.Equal(sbyte.MaxValue, r);
		}

		[Fact]
		public void TestPostByte()
		{
			byte r = api.Post(byte.MaxValue);
			Assert.Equal(byte.MaxValue, r);
		}

		[Fact]
		public void TestGetByteWithRange()
		{
			Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() => api.GetByteWithRange(101));
		}

		[Fact]
		public void TestPostShort()
		{
			short r = api.Post(short.MaxValue);
			Assert.Equal(short.MaxValue, r);
		}

		[Fact]
		public void TestPostUShort()
		{
			ushort r = api.Post(ushort.MaxValue);
			Assert.Equal(ushort.MaxValue, r);
		}

		[Fact]
		public void TestPostInt()
		{
			int r = api.Post(int.MaxValue);
			Assert.Equal(int.MaxValue, r);
		}

		[Fact]
		public void TestPostIntWithRange()
		{
			Assert.Throws<Fonlow.Net.Http.WebApiRequestException>(() => api.PostIntWithRange(101));
		}

		[Fact]
		public void TestPostUInt()
		{
			long r = api.Post(uint.MaxValue);
			Assert.Equal(uint.MaxValue, r);
		}

		[Fact]
		public void TestPostUIntButIntValue()
		{
			int r = api.Post(int.MaxValue);
			Assert.Equal(int.MaxValue, r);
		}

		[Fact]
		public void TestPostUIntMaxMinus1()
		{
			long r = api.Post(uint.MaxValue - 1);
			Assert.Equal(uint.MaxValue - 1, r);
		}


	}
}
