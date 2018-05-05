using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.IO;

namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing different commbinations of parameters and returns
	/// </summary>
	[Route("api/[controller]")]
	public class SuperDemoController : Controller
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

        [HttpGet]
        [Route("NullableDatetime/{hasValue}")]
        public async Task<DateTime?> GetDateTime(bool hasValue)
        {
            return await Task.Run(() =>
            {
                DateTime? dt;
                if (hasValue)
                    dt = DateTime.Now;
                else
                    dt = null;

                return dt;
            });
        }

        //[HttpPost]
        //[Route("kkk")]
        //public void PostSomethingWrong(DemoData.Company x, DemoData.Person y)
        //{
        //    //do nothing.
        //}

        [HttpGet]
        [Route("NextYear/{dt}")]
        public DateTime GetNextYear(DateTime dt)
        {
            return dt.AddYears(1);
        }

        [HttpGet]
        [Route("NextHour/{dt}")]
        public DateTimeOffset GetNextHour(DateTimeOffset dt)
        {
            return dt.AddHours(1);
        }

        [HttpPost]
        [Route("NextYear")]
        public DateTime PostNextYear([FromBody] DateTime dt)
        {
            return dt.AddYears(1);
        }

        [HttpGet]
        [Route("DateTimeOffset")]
        public DateTimeOffset GetDateTimeOffset()
        {
            return DateTimeOffset.Now;
        }

        /// <summary>
        /// DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DateTimeOffset")]
        public bool PostDateTimeOffset([FromBody] DateTimeOffset d)
        {
            return  (DateTimeOffset.Now- d)< TimeSpan.FromSeconds(2);
        }

        [HttpPost]
        [Route("DateTimeOffsetNullable")]
        public bool PostDateTimeOffsetNullable([FromBody] DateTimeOffset? d)
        {
            return d.HasValue;
        }

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

        [HttpGet]
        [Route("FloatZero")]
        public float GetFloatZero()
        {
            var a = 0.1f;
            var b = 0.2f;
            var c = 0.3f;
            return a + b - c;//in all version update to VS 2015, this is a non-zero result done by the runtime.
          //  return 0.1f + 0.2f - 0.3f;//in VS 2015 update 2. this is a zero result done by the compiler in IL code.
        }

        [HttpGet]
        [Route("DoubleZero")]
        public double GetDoubleZero()
        {
            return 0.1d + 0.2d - 0.3d;
        }

        [HttpGet]
        [Route("DecimalZero")]
        public decimal GetDecimalZero()
        {
            return 0.1m + 0.2m - 0.3m;
        }

        [HttpGet]
        [Route("NullString")]
        public string GetNullString()
        {
            return null;
        }

        [HttpGet]
        [Route("EmptyString")]
        public string GetEmptyString()
        {
            return String.Empty;
        }

        [HttpGet]
        [Route("NullObject")]
        public DemoData.Person GetNullPerson()
        {
            return null;
        }

        [HttpGet]
        [Route("TextStream")]
        public HttpResponseMessage GetTextStream()
        {
            var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes("abcdefg"));
            {
                var content = new StreamContent(stream);
                content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = content
                };
            }
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

        //[HttpGet]
        //[Route("ActionStringResult")]
        //[System.Web.Http.Description.ResponseType(typeof(string))]
        //public IActionResult GetActionStringResult()
        //{
        //    return Ok("abcdefg");
        //}


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

        [HttpPost]
        [Route("int2d")]
        public bool PostInt2D([FromBody] int[,] a)
        {
            return a[1, 3] == 8;
        }

        [HttpPost]
        [Route("int2djagged")]
        public bool PostInt2DJagged([FromBody] int[][] a)
        {
            return a[1][3] == 8;
        }


        [HttpPost]
        [Route("intArray")]
        public bool PostIntArray([FromBody] int[] a)
        {
            return a[7] == 8;
        }

        [HttpGet]
        [Route("intArray")]
        public int[] GetIntArray()
        {
            return new int[] { 1, 2, 3, 4, 5, 6, 7, 8 };
        }

        [HttpGet]
        [Route("AnonymousDynamic")]
        public dynamic GetAnonymousDynamic()
        {
            return new
            {
                Id = 12345,
                Name = "Something",
            };
        }

        [HttpGet]
        [Route("AnonymousObject")]
        public object GetAnonymousObject()
        {
            return new
            {
                Id = 12345,
                Name = "Something",
            };
        }

        [HttpPost]
        [Route("AnonymousObject")]
        public object PostAnonymousObject([FromBody] dynamic obj)
        {
            if (obj == null)
            {
                System.Diagnostics.Debug.WriteLine("dynamic null");
                return new
                {
                    Id = 12345,
                    Name = "Something",
                };

            }
            obj.Id = obj.Id + "1";
            obj.Name = obj.Name + "1";
            return obj;
        }

        [HttpGet]
        [Route("StringStringDic")]
        public IDictionary<string, string> GetDictionary()
        {
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


        [HttpPost]
        [Route("ICollection")]
        public int PostICollection([FromBody] ICollection<DemoData.Person> list)
        {
            return list.Count;
        }

        [HttpPost]
        [Route("IList")]
        public int PostIList([FromBody] IList<DemoData.Person> list)
        {
            return list.Count;
        }

        [HttpPost]
        [Route("IReadOnlyList")]
        public int PostIReadOnlyList([FromBody] IReadOnlyList<DemoData.Person> list)
        {
            return list.Count;
        }

        [HttpPost]
        [Route("IReadOnlyCollection")]
        public int PostIReadOnlyCollection([FromBody] IReadOnlyCollection<DemoData.Person> list)
        {
            return list.Count;
        }


        [HttpPost]
        [Route("List")]
        public int PostList([FromBody] List<DemoData.Person> list)
        {
            return list.Count;
        }

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

        [HttpPost]
        [Route("PostEmpty/{i}")]
        public Tuple<string, int> PostWithQueryButEmptyBody([FromBody] string s, int i)
        {
            return new Tuple<string, int>(s, i);
        }

    }
}
