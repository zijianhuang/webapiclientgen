using DemoWebApi.DemoData;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Numerics;
using System.Threading.Tasks;
namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing different commbinations of parameters and returns
	/// </summary>
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
		[Route("long")]
		public long Post([FromBody] long d)
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
