using Newtonsoft.Json;
using System.Numerics;
using System.Reflection.Metadata.Ecma335;

namespace Fonlow.IntegralExtensions
{
	/// <summary>
	/// Make ASP.NET Core serialize UInt64 as JSON string object rather than number.
	/// </summary>
	public sealed class UInt64JsonConverter : JsonConverter<UInt64>
	{
		static readonly Type typeOfUInt64 = typeof(UInt64);
		static readonly Type typeOfBigInteger = typeof(BigInteger);
		static readonly Type typeOfString = typeof(string);

		public override void WriteJson(JsonWriter writer, UInt64 value, JsonSerializer serializer)
		{
			writer.WriteValue(value.ToString());
		}

		public override UInt64 ReadJson(JsonReader reader, Type objectType, UInt64 existingValue, bool hasExistingValue, JsonSerializer serializer)
		{
			var v = reader.Value;
			if (v == null)
			{
				return UInt64.MinValue;
			}

			var vType = v.GetType();
			if (vType == typeOfUInt64) //when the object is from a property in POST body from a TS client
			{
				return UInt64.Parse(v.ToString()!); // silly CS8604
			}

			if (vType == typeOfString)
			{
				var vs = (string)v;
				if (String.IsNullOrEmpty(vs))
				{
					return 0;
				}

				return UInt64.Parse((string)v);
			}

			// Somehow ASP.NET Core 8 reads UInt64.Max 18446744073709551615 as BigInteger when the C# client post a number object with such value.
			// I am not sure if this is a bug of .NET or by design.
			if (vType == typeOfBigInteger) 
			{
				return UInt64.Parse(v.ToString()!); // silly CS8604
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}

	public sealed class UInt64NullableJsonConverter : JsonConverter<UInt64?>
	{
		static readonly Type typeOfUInt64 = typeof(UInt64);
		static readonly Type typeOfBigInteger = typeof(BigInteger);
		static readonly Type typeOfString = typeof(string);

		public override void WriteJson(JsonWriter writer, UInt64? value, JsonSerializer serializer)
		{
			if (value.HasValue)
			{
				writer.WriteValue(value.Value.ToString());
			}
			else
			{
				writer.WriteNull();
			}
		}

		public override UInt64? ReadJson(JsonReader reader, Type objectType, UInt64? existingValue, bool hasExistingValue,
			JsonSerializer serializer)
		{
			if (hasExistingValue)
			{
				return existingValue;
			}

			var v = reader.Value;
			if (v == null)
			{
				return null;
			}

			var vType = v.GetType();
			if (vType == typeOfUInt64) //when the object is from a property in POST body from a TS client
			{
				return UInt64.Parse(v.ToString()!);
			}

			if (vType == typeOfString)
			{
				var vs = (string)v;
				if (String.IsNullOrEmpty(vs))
				{
					return null;
				}

				return UInt64.Parse((string)v);
			}

			if (vType == typeOfBigInteger)
			{
				return UInt64.Parse(v.ToString()!);
			}


			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}
}
