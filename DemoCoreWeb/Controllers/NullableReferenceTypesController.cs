using Microsoft.AspNetCore.Mvc;
using System;
using System.Runtime.Serialization;
#nullable enable

namespace DemoWebApi.Controllers
{
	/// <summary>
	/// For testing nullable reference types in return and parameters.
	/// </summary>
	[Route("api/[controller]")]
	public class NullableTypesController : ControllerBase
	{
		[HttpGet]
		[Route("AthletheSearch")]
		public string? AthletheSearch([FromQuery] int? take = 10, [FromQuery] int skip = 0, [FromQuery] string? order = null, [FromQuery] string? sort = null, [FromQuery] string? search = null)
		{
			return (take.HasValue ? take.Value.ToString() : String.Empty) + skip.ToString() + (String.IsNullOrEmpty(order) ? "" : order) + (String.IsNullOrEmpty(sort) ? "" : sort) + (String.IsNullOrEmpty(search) ? "" : search);
		}

		[HttpGet("GetString")]
		public string GetString(string? sort)
		{
			return "ABCD";
		}

		[HttpGet]
		[Route("NullableString")]
		public string? GetNullableString()
		{
			if (DateTime.Now > new DateTime(2008, 12, 3))
			{
				return "ABCD";
			}
			else
			{
				return null;
			}
		}

		[HttpPost("GetNullableA")]
		public A? GetNullableA([FromBody] B b)
		{
			return DemoFunctions.GetNullableA(null, b, b, null);
		}

		[HttpPost("GetB")]
		public B GetB([FromBody]A? a)
		{
			return new B();
		}

		[HttpGet("GetStringWith2NullableStringParameters")]
		public string GetStringWith2NullableStringParameters([FromQuery] string? sort, [FromQuery] string? search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return "abcd";
			}

			return "ABCD";
		}

		[HttpGet("GetStringWith2NormalParameters")]
		public string GetStringWith2NormalParameters([FromQuery] string sort, [FromQuery] string search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return "abcd";
			}

			return "ABCD";
		}

		[HttpGet("GetStringWith2NullableStringParameters1Normal")]
		public string GetStringWith2NullableStringParameters1Normal([FromQuery] string? sort, [FromQuery] string? search, [FromQuery] string kk)
		{
			return "ABCD";
		}

		[HttpGet("GetNullableStringWith2NullableStringParameters")]
		public string? GetNullableStringWith2NullableStringParameters([FromQuery] string? sort, [FromQuery] string? search)
		{
			return null;
		}

		[HttpGet("GetNullableStringWith2NullableStringParameters1Normal")]
		public string? GetNullableStringWith2NullableStringParameters1Normal([FromQuery] string? sort, [FromQuery] string? search, [FromQuery] string kk)
		{
			return null;
		}

		[HttpGet("GetStringWith1NullableStringParameter1Normal")]
		public string GetStringWith1NullableStringParameter1Normal([FromQuery] string? sort, [FromQuery] string search)
		{
			return "ABCD";
		}

		[HttpGet("GetNullableStringWith1NullableStringParameter1Normal")]
		public string? GetNullableStringWith1NullableStringParameter1Normal([FromQuery] string? sort, [FromQuery] string search)
		{
			return null;
		}

		[HttpGet("GetTupleWith2NullableStringParameters")]
		public Tuple<A, B, string> GetTupleWith2NullableStringParameters([FromQuery] string? sort, [FromQuery] string? search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return new Tuple<A, B, string>(new A(), new B(), "aaa");
			}

			return new Tuple<A, B, string>(new A(), new B(), "AAAA");
		}

		[HttpGet("GetNullableTupleWith2NullableStringParameters")]
		public Tuple<A, B, string>? GetNullableTupleWith2NullableStringParameters([FromQuery] string? sort, [FromQuery] string? search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return new Tuple<A, B, string>(new A(), new B(), "aaa");
			}

			return null;
		}

		[HttpGet("GetTuple2With2NullableStringParameters")]
		public Tuple<A, B?, string?> GetTuple2With2NullableStringParameters([FromQuery] string? sort, [FromQuery] string? search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return new Tuple<A, B?, string?>(new A(), new B(), "aaa");
			}

			return new Tuple<A, B?, string?>(new A(), null, "AAAA");
		}
	}

	public static class DemoFunctions
	{
		public static string GetString(string? sort)
		{
			return "ABCD";
		}

		public static string? GetNullableString()
		{
			if (DateTime.Now > new DateTime(2008, 12, 3))
			{
				return "ABCD";
			}
			else
			{
				return null;
			}
		}

		public static A? GetNullableA(A? a, B b, A a2, B? b2)
		{
			if (DateTime.Now > new DateTime(2008, 12, 3))
			{
				return new A();
			}
			else if (DateTime.Now > new DateTime(2008, 11, 3))
			{
				return new B();
			}

			return null;
		}

		public static B GetB(B b, A? a, B? b2, A a2)
		{
			return new B();
		}

		public static string GetStringWith2NullableStringParameters(string? sort, string? search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return "abcd";
			}

			return "ABCD";
		}

		public static string GetStringWith2NormalParameters(string sort, string search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return "abcd";
			}

			return "ABCD";
		}

		public static string GetStringWith2NullableStringParameters1Normal(string? sort, string? search, string kk)
		{
			return "ABCD";
		}

		public static string? GetNullableStringWith2NullableStringParameters(string? sort, string? search)
		{
			return null;
		}

		public static string? GetNullableStringWith2NullableStringParameters1Normal(string? sort, string? search, string kk)
		{
			return null;
		}

		public static string GetStringWith1NullableStringParameter1Normal(string? sort, string search)
		{
			return "ABCD";
		}

		public static string? GetNullableStringWith1NullableStringParameter1Normal(string? sort, string search)
		{
			return null;
		}

		public static Tuple<A, B, string> GetTupleWith2NullableStringParameters(string? sort, string? search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return new Tuple<A, B, string>(new A(), new B(), "aaa");
			}

			return new Tuple<A, B, string>(new A(), new B(), "AAAA");
		}

		public static Tuple<A, B, string>? GetNullableTupleWith2NullableStringParameters(string? sort, string? search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return new Tuple<A, B, string>(new A(), new B(), "aaa");
			}

			return null;
		}

		public static Tuple<A, B?, string?> GetTuple2With2NullableStringParameters(string? sort, string? search)
		{
			if (String.IsNullOrEmpty(sort) && !String.IsNullOrEmpty(search))
			{
				return new Tuple<A, B?, string?>(new A(), new B(), "aaa");
			}

			return new Tuple<A, B?, string?>(new A(), null, "AAAA");
		}
	}

	[DataContract(Namespace = DemoWebApi.DemoData.Constants.DataNamespace)]
	public class Base
	{
		[DataMember]
		public string P1 { get; set; }
	}

	[DataContract(Namespace = DemoWebApi.DemoData.Constants.DataNamespace)]
	public class A : Base
	{
		[DataMember]
		public string P2 { get; set; }
	}

	[DataContract(Namespace = DemoWebApi.DemoData.Constants.DataNamespace)]
	public class B : A
	{
		[DataMember]
		public string P3 { get; set; }
	}
}
#nullable disable



