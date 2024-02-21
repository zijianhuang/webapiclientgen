using Newtonsoft.Json;
using System.Numerics;
using System.Reflection.Metadata.Ecma335;

namespace Fonlow.IntegralExtensions
{
	/// <summary>
	/// Make ASP.NET Core serialize BigInteger as JSON string object rather than number.
	/// </summary>
	public sealed class BigIntegerJsonConverter : JsonConverter<BigInteger>
	{
		static readonly Type typeOfBigInteger = typeof(BigInteger);
		static readonly Type typeOfString = typeof(string);

		public override void WriteJson(JsonWriter writer, BigInteger value, JsonSerializer serializer)
		{
			writer.WriteValue(value.ToString());
		}

		public override BigInteger ReadJson(JsonReader reader, Type objectType, BigInteger existingValue, bool hasExistingValue, JsonSerializer serializer)
		{
			var v = reader.Value;
			if (v == null)
			{
				return 0;
			}

			var vType = v.GetType();
			if (vType == typeOfBigInteger) //when the object is from a property in POST body from a TS client
			{
				return BigInteger.Parse(v.ToString()!); // silly CS8604
			}

			if (vType == typeOfString)
			{
				var vs = (string)v;
				if (String.IsNullOrEmpty(vs))
				{
					return 0;
				}

				return BigInteger.Parse((string)v);
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}

	public sealed class BigIntegerNullableJsonConverter : JsonConverter<BigInteger?>
	{
		static readonly Type typeOfBigInteger = typeof(BigInteger);
		static readonly Type typeOfString = typeof(string);

		public override void WriteJson(JsonWriter writer, BigInteger? value, JsonSerializer serializer)
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

		public override BigInteger? ReadJson(JsonReader reader, Type objectType, BigInteger? existingValue, bool hasExistingValue,
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
			if (vType == typeOfBigInteger) //when the object is from a property in POST body from a TS client
			{
				return BigInteger.Parse(v.ToString()!);
			}

			if (vType == typeOfString)
			{
				var vs = (string)v;
				if (String.IsNullOrEmpty(vs))
				{
					return null;
				}

				return BigInteger.Parse((string)v);
			}


			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}
}
