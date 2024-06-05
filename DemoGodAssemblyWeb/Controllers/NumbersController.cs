using DemoWebApi.DemoData;
using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Numerics;
using System.Threading.Tasks;
namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing different commbinations of parameters and returns
	/// </summary>
	[ApiController]
	[Route("api/[controller]")]
	public class NumbersController : ControllerBase
	{
		[HttpPost]
		[Route("BigNumbers")]
		public BigNumbers PostBigNumbers([FromBody] BigNumbers bigNumbers)
		{
			return bigNumbers;
		}

		[HttpPost]
		[Route("IntegralEntity")]
		public IntegralEntity PostIntegralEntity([FromBody] IntegralEntity integralEntity)
		{
			return integralEntity;
		}

		[HttpPost]
		[Route("IntegralEntityMustBeValid")]
		public IntegralEntity PostIntegralEntityMustBeValid([FromBody] IntegralEntity integralEntity)
		{
			if (integralEntity == null)
			{
				throw new ArgumentNullException(nameof(integralEntity), "The client posted null or invalid object.");
			}
			return integralEntity;
		}

		[HttpPost]
		[Route("int64")]
		public long PostInt64([FromBody] long int64)
		{
			return int64;
		}

		[HttpPost]
		[Route("bigIntegralAsStringForJs")]
		public string PostBigIntegralAsStringForJs([FromBody] string bigIntegral)
		{
			return bigIntegral;
		}

		[HttpPost]
		[Route("uint64")]
		public ulong PostUint64([FromBody] ulong uint64)
		{
			return uint64;
		}

		[HttpPost]
		[Route("int128")]
		public Int128 PostInt128([FromBody] Int128 int128)
		{
			return int128;
		}

		[HttpPost]
		[Route("uint128")]
		public UInt128 PostUint128([FromBody] UInt128 uint128)
		{
			return uint128;
		}

		[HttpPost]
		[Route("bigInteger")]
		public BigInteger PostBigInteger([FromBody] BigInteger bigInteger)
		{
			return bigInteger;
		}

		[HttpPost]
		[Route("byte")]
		public byte Post([FromBody] byte d)
		{
			return d;
		}

		[HttpGet]
		[Route("byte")]
		public byte GetByte([FromQuery] byte d)
		{
			return d;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="d">Byte for small number.</param>
		/// <returns></returns>
		/// <exception cref="ArgumentException"></exception>
		[HttpGet]
		[Route("byteWithRange")]
		public byte GetByteWithRange([FromQuery, Range(0, 100)] byte d)
		{
			return d;
		}

		[HttpPost]
		[Route("sbyte")]
		public sbyte Post([FromBody] sbyte d)
		{
			return d;
		}

		[HttpPost]
		[Route("short")]
		public short Post([FromBody] short d)
		{
			return d;
		}

		[HttpPost]
		[Route("ushort")]
		public ushort Post([FromBody] ushort d)
		{
			return d;
		}

		[HttpPost]
		[Route("int")]
		public int Post([FromBody] int d)
		{
			return d;
		}

		[HttpPost]
		[Route("intRange")]
		public int PostIntWithRange([FromBody, Range(1, 100)] int d)
		{
			return d;
		}

		[HttpPost]
		[Route("long")]
		public long Post([FromBody] long d)
		{
			return d;
		}

		/// <summary>
		/// Range is with double, not long. Precision of double: ~15-17 digits, while long.MaxValue 9223372036854775807 has 19 decimal digits.
		/// </summary>
		/// <param name="d"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("longRange")]
		public long PostLongWithRange([FromBody, Range(typeof(long), "1000", "9223372036854775800")] long d)
		{
			return d;
		}

		[HttpPost]
		[Route("ulong")]
		public ulong Post([FromBody] ulong d)
		{
			return d;
		}

	}
}
