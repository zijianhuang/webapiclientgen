﻿using DemoWebApi.DemoData;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing different commbinations of parameters and returns
	/// </summary>
	[ApiController]
	[Route("api/[controller]")]
	public class SuperDemoController : ControllerBase
	{
		[HttpGet]
		[Route("int/{d}")]
		public async Task<int> GetIntSquareAsync(int d)//some shops might have strict style guid to name async function with Async suffix always.
		{
			return await Task.Run(() => d * d);
		}

		[HttpGet("decimal/{d}")]
		//    [Route("decimal/{d}")]
		public async Task<decimal> GetDecimalSquare(decimal d)
		{
			return await Task.Run(() => d * d);
		}

		/// <summary>
		/// False to return null, and true to return 1000
		/// </summary>
		/// <param name="hasValue"></param>
		/// <returns></returns>
		[HttpGet]
		[Route("NullableDecimal/{hasValue}")]
		public async Task<Decimal?> GetNullableDecimal(bool hasValue)
		{
			return await Task.Run(() =>
			{
				Decimal? dt;
				if (hasValue)
					dt = 1000;
				else
					dt = null;

				return dt;
			});
		}

		[Obsolete]
		[HttpGet]
		[Route("FloatZero")]
		public float GetFloatZero()
		{
			float a = 0.1f;
			float b = 0.2f;
			float c = 0.3f;
			return a + b - c;//in all version update to VS 2015, this is a non-zero result done by the runtime.
							 //  return 0.1f + 0.2f - 0.3f;//in VS 2015 update 2. this is a zero result done by the compiler in IL code.
		}

		/// <summary>
		/// Result of 0.1d + 0.2d - 0.3d
		/// </summary>
		/// <returns></returns>
		[Obsolete("for testing")]
		[HttpGet]
		[Route("DoubleZero")]
		public double GetDoubleZero()
		{
			return 0.1d + 0.2d - 0.3d;
		}

		[Obsolete("Just for test", DiagnosticId ="abc", UrlFormat ="efg")]
		[HttpGet]
		[Route("DecimalZero")]
		public decimal GetDecimalZero()
		{
			return 0.1m + 0.2m - 0.3m;
		}

		/// <summary>
		/// MaybeNull
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("NullObject")]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public DemoData.Person GetNullPerson()
		{
			return null;
		}

		/// <summary>
		/// ActionResult with FileStreamResult
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("TextStream")]
		public ActionResult GetTextStream()
		{
			MemoryStream stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes("abcdefg"));// don't dispose this and the following disposable objects
			{
				//var content = new StreamContent(stream);
				return new FileStreamResult(stream, new Microsoft.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream"));
			}
		}

		[HttpGet("BadRequest")]
		public ActionResult GetBadRequest()
		{
			ModelState.AddModelError("DemoKey", "Some description");
			return BadRequest(ModelState);
		}

		[HttpGet("BadRequest2")]
		public IActionResult GetBadRequest2()
		{
			ModelState.AddModelError("DemoKey", "Some description");
			return BadRequest(ModelState);
		}

		[HttpGet]
		[Route("ByteArray")]
		public byte[] GetByteArray()
		{
			return System.Text.Encoding.UTF8.GetBytes("abcdefg");
		}

		[HttpGet]
		[Route("ActionResult")]
		public IActionResult GetActionResult()
		{
			return Ok("abcdefg");
		}

		[HttpGet]
		[Route("ActionResult2")]
		public async Task<IActionResult> GetActionResult2()
		{
			return Ok("abcdefg");
		}

		[HttpPost]
		[Route("ActionResult")]
		public async Task<IActionResult> PostActionResult()
		{
			return Ok("abcdefg");
		}

		[HttpPost]
		[Route("PostActionResult2")]
		public async Task<ActionResult> PostActionResult2([FromBody] string s)
		{
			return Ok("abcdefg");
		}

		[HttpPost]
		[Route("PostActionResult3")]
		public IActionResult PostActionResult3([FromBody] DemoWebApi.DemoData.Person person)
		{
			return Ok(person.Name);
		}

		[HttpGet]
		[Route("ActionStringResult")]
		[ProducesResponseType(typeof(string), 200)]
		public IActionResult GetActionStringResult()
		{
			return Ok("abcdefg");
		}


		[HttpGet]
		[Route("byte")]
		public byte Getbyte()
		{
			return 255;
		}

		[HttpGet]
		[Route("sbyte")]
		public sbyte Getsbyte()
		{
			return -127;
		}

		[HttpGet]
		[Route("short")]
		public short GetShort()
		{
			return -32768;
		}

		[HttpGet]
		[Route("ushort")]
		public ushort GetUShort()
		{
			return 65535;
		}

		[HttpGet]
		[Route("uint")]
		public uint GetUint()
		{
			return 4294967295;
		}

		[HttpGet]
		[Route("ulong")]
		public ulong Getulong()
		{
			return 18446744073709551615;
		}

		[HttpGet]
		[Route("doulbe")]
		public double Getdouble()
		{
			return -1.7976931348623e308;
		}

		[HttpGet]
		[Route("decimal")]
		public decimal GetDecimal()
		{
			return decimal.MaxValue;
		}

		[HttpGet]
		[Route("char")]
		public char GetChar()
		{
			return 'A';
		}

		[HttpGet]
		[Route("bool")]
		public bool GetBool()
		{
			return true;
		}

		[HttpGet]
		[Route("int2d")]
		public int[,] GetInt2D()
		{
			return new int[,]
			{
			   {1,2,3, 4 },
			   {5,6,7, 8 }
			};
		}

		[HttpGet]
		[Route("int2dJagged")]
		public int[][] GetInt2DJagged()
		{
			return new int[][]
			{
			   new int[] {1,2,3, 4 },
			   new int[] {5,6,7, 8 }
			};
		}

		/// <summary>
		/// Demo integer array 2D.
		/// </summary>
		/// <param name="a"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("int2d")]
		public bool PostInt2D([FromBody] int[,] a)
		{
			return a[1, 3] == 8;
		}

		/// <summary>
		/// Demo int[][]
		/// </summary>
		/// <param name="a"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("int2djagged")]
		public bool PostInt2DJagged([FromBody] int[][] a)
		{
			return a[1][3] == 8;
		}

		/// <summary>
		/// Demo int[]
		/// </summary>
		/// <param name="a"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("intArray")]
		public bool PostIntArray([FromBody, MinLength(1), MaxLength(10)] int[] a)
		{
			return a[7] == 8;
		}

		[HttpGet]
		[Route("intArray")]
		public int[] GetIntArray()
		{
			return new int[] { 1, 2, 3, 4, 5, 6, 7, 8 };
		}

		/// <summary>
		/// Demo int[];
		/// </summary>
		/// <param name="a"></param>
		/// <returns></returns>
		[HttpGet]
		[Route("intArrayQ")]
		public int[] GetIntArrayQ([FromQuery] int[] a)
		{
			return a.ToArray();
		}

		/// <summary>
		/// Demo IEnumerable long
		/// </summary>
		/// <param name="a"></param>
		/// <returns></returns>
		[HttpGet]
		[Route("intArrayQ2")]
		public long[] GetIntArrayQ2([FromQuery] IEnumerable<long> a)
		{
			return a.ToArray();
		}

		/// <summary>
		/// Demo 
		/// </summary>
		/// <param name="a"></param>
		/// <returns></returns>
		[HttpGet]
		[Route("decimalArrayQ")]
		public decimal[] GetDecimalArrayQ([FromQuery] decimal[] a)
		{
			return a.ToArray();
		}

		/// <summary>
		/// Demo string array
		/// </summary>
		/// <param name="a"></param>
		/// <returns></returns>
		[HttpGet]
		[Route("stringArrayQ")]
		public string[] GetStringArrayQ([FromQuery] string[] a)
		{
			return a;
		}

		/// <summary>
		/// Demo List string
		/// </summary>
		/// <param name="a"></param>
		/// <returns></returns>
		[HttpGet]
		[Route("stringArrayQ2")]
		public string[] GetStringArrayQ2([FromQuery] List<string> a)
		{
			return a.ToArray();
		}

		//[HttpGet]
		//[Route("enumArrayQ")]
		//public DayOfWeek[] GetEnumArrayQ([FromQuery] DayOfWeek[] a)
		//{
		//	return a;
		//}

		[HttpGet]
		[Route("enumArrayQ2")]
		public DayOfWeek[] GetEnumArrayQ2([FromQuery] List<DayOfWeek> a)
		{
			return a.ToArray();
		}

		/// <summary>
		/// Demo IEnumerable Days
		/// </summary>
		/// <param name="a"></param>
		/// <returns></returns>
		[HttpGet]
		[Route("enumArrayDays")]
		public DemoData.Days[] GetEnumArrayDays([FromQuery] IEnumerable<DemoData.Days> a)
		{
			return a.ToArray();
		}

		[HttpGet]
		[Route("enumGet")]
		public DemoData.Days GetDay([FromQuery] DemoData.Days d)
		{
			return d;
		}

		[HttpPost]
		[Route("enumPost")]
		public DemoData.Days[] PostDay([FromQuery] DemoData.Days d, [FromBody] DemoData.Days d2)
		{
			return new DemoData.Days[] { d, d2 };
		}

		[HttpGet]
		[Route("StringStringDic")]
		public IDictionary<string, string> GetDictionary()
		{
#pragma warning disable CS8604 // Possible null reference argument.
			return new Dictionary<string, string>()
		{
			{typeof(int).FullName, "number"},
			{typeof(uint).FullName, "number"},
			{typeof(long).FullName, "number"},
			{typeof(ulong).FullName, "number"},
			{typeof(short).FullName, "number"},
			{typeof(ushort).FullName, "number"},
			{typeof(float).FullName, "number"},
			{typeof(double).FullName, "number"},
			{typeof(decimal).FullName, "number"},
			{typeof(byte).FullName, "number"},
			{typeof(sbyte).FullName, "number"},
			{typeof(string).FullName, "string"},
			{typeof(char).FullName, "string"},
			{typeof(Guid).FullName, "string"},
			{typeof(bool).FullName, "boolean"},
			{typeof(void).FullName, "void"},
			{typeof(object).FullName, "any"},
			{typeof(DateTime).FullName, "Date"},
			{typeof(DateTimeOffset).FullName, "Date"},
			{"System.Collections.IEnumerable", "Array"},
			{"System.Array", "Array"},

		};
#pragma warning restore CS8604 // Possible null reference argument.
		}

		[HttpGet]
		[Route("StringPersonDic")]
		public IDictionary<string, DemoData.Person> GetDictionaryOfPeople()
		{
			return new Dictionary<string, DemoData.Person>()
			{
				{"Iron Man", new DemoData.Person()
				{
					Name= "Tony Stark",
					Surname="Stark",
					GivenName="Tony"
				} },

				{"Spider Man", new DemoData.Person() {
					Name="Peter Parker",
					Addresses= new List<DemoData.Address>(
						new DemoData.Address[] { new DemoData.Address() {
							City="New York"

						} }
					),
				} },
			};
		}

		[HttpGet]
		[Route("StringPersonDic2")]
		public Dictionary<string, DemoData.Person> GetDictionaryOfPeople2()
		{
			return new Dictionary<string, DemoData.Person>()
			{
				{"Iron Man", new DemoData.Person()
				{
					Name= "Tony Stark",
					Surname="Stark",
					GivenName="Tony"
				} },

				{"Spider Man", new DemoData.Person() {
					Name="Peter Parker",
					Addresses= new List<DemoData.Address>(
						new DemoData.Address[] { new DemoData.Address() {
							City="New York"

						} }
					),
				} },
			};
		}

		/// <summary>
		/// Demo Dic string and person
		/// </summary>
		/// <param name="dic"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("StringPersonDic")]
		public int PostDictionary([FromBody] IDictionary<string, DemoData.Person> dic)
		{
			return dic.Count;
		}

		[HttpGet]
		[Route("KeyValuePair")]
		public KeyValuePair<string, DemoData.Person> GetKeyhValuePair()
		{
			return new KeyValuePair<string, DemoData.Person>("Spider Man", new DemoData.Person()
			{
				Name = "Peter Parker",
				Addresses = new List<DemoData.Address>(
						new DemoData.Address[] { new DemoData.Address() {
							City="New York"

						} }
					),
			});
		}

		static List<DemoData.Person> GetPersonList()
		{
			return new List<DemoData.Person>(new DemoData.Person[] {
				new DemoData.Person()
				{
					Name= "Tony Stark",
					Surname="Stark",
					GivenName="Tony"
				},

				new DemoData.Person() {
					Name="Peter Parker",
					Addresses= new List<DemoData.Address>(
						new DemoData.Address[] { new DemoData.Address() {
							City="New York"

						} }
					),
				}

			});
		}

		[HttpGet]
		[Route("ICollection")]
		public ICollection<DemoData.Person> GetICollection()
		{
			return GetPersonList();
		}

		[HttpGet]
		[Route("IList")]
		public IList<DemoData.Person> GetIList()
		{
			return GetPersonList();
		}

		[HttpGet]
		[Route("IReadOnlyList")]
		public IReadOnlyList<DemoData.Person> GetIReadOnlyList()
		{
			return GetPersonList();
		}

		[HttpGet]
		[Route("IReadOnlyCollection")]
		public IReadOnlyCollection<DemoData.Person> GetIReadOnlyCollection()
		{
			return GetPersonList();
		}

		[HttpGet]
		[Route("List")]
		public List<DemoData.Person> GetList()
		{
			return GetPersonList();
		}

		[HttpGet]
		[Route("Collection")]
		public System.Collections.ObjectModel.Collection<DemoData.Person> GetCollection()
		{
			return new System.Collections.ObjectModel.Collection<DemoData.Person>(GetList());
		}

		/// <summary>
		/// Post ICollection of person
		/// </summary>
		/// <param name="list"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("ICollection")]
		public int PostICollection([FromBody] ICollection<DemoData.Person> list)
		{
			return list.Count;
		}

		/// <summary>
		/// Post IList of person
		/// </summary>
		/// <param name="list"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("IList")]
		public int PostIList([FromBody] IList<DemoData.Person> list)
		{
			return list.Count;
		}

		/// <summary>
		/// Post e of person
		/// </summary>
		/// <param name="list"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("IReadOnlyList")]
		public int PostIReadOnlyList([FromBody] IReadOnlyList<DemoData.Person> list)
		{
			return list.Count;
		}

		/// <summary>
		/// Post IReadOnlyCollection of person
		/// </summary>
		/// <param name="list"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("IReadOnlyCollection")]
		public int PostIReadOnlyCollection([FromBody] IReadOnlyCollection<DemoData.Person> list)
		{
			return list.Count;
		}

		/// <summary>
		/// Post a list of person
		/// </summary>
		/// <param name="list"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("List")]
		public int PostList([FromBody] List<DemoData.Person> list)
		{
			return list.Count;
		}

		/// <summary>
		/// Post a collection of person
		/// </summary>
		/// <param name="list"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("Collection")]
		public int PostCollection([FromBody] System.Collections.ObjectModel.Collection<DemoData.Person> list)
		{
			return list.Count;
		}

		//[HttpGet]
		//[Route("Handy")]
		//public DemoWebApi.Models.Handy GetHandy(DemoWebApi.Models.Handy handy)
		//{
		//    return new Models.Handy()
		//    {
		//        Id = 1000,
		//        Name = "Handy Man",
		//    };
		//}

		[HttpPost("PostEmpty/{i}")]
		public Tuple<string, int> PostWithQueryButEmptyBody([FromBody] string s, int i)
		{
			return new Tuple<string, int>(s, i);
		}

		[HttpGet("DoubleNullable")]
		public Tuple<string, double?, decimal?> GetPrimitiveNullable([FromQuery] string location, [FromQuery] double? dd = null, [FromQuery] decimal? de = null)
		{
			return new Tuple<string, double?, decimal?>(location, dd, de);
		}

		[HttpGet("DoubleNullable2")]
		public Tuple<double?, decimal?> GetPrimitiveNullable2([FromQuery] double? dd = null, [FromQuery] decimal? de = null)
		{
			return new Tuple<double?, decimal?>(dd, de);
		}

		[HttpPost]
		[Route("Guids")]
		public Guid[] PostGuids([FromBody] Guid[] guids)
		{
			return guids;
		}

	}
}