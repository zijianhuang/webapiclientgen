using Newtonsoft.Json;

namespace Fonlow.Int64Extensions
{
	public sealed class Int64JsonConverter : JsonConverter<Int64>
	{
		static readonly Type typeOfInt64 = typeof(Int64);
		static readonly Type typeOfString = typeof(string);

		public override void WriteJson(JsonWriter writer, Int64 value, JsonSerializer serializer)
		{
			writer.WriteValue(value.ToString());
		}

		public override Int64 ReadJson(JsonReader reader, Type objectType, Int64 existingValue, bool hasExistingValue, JsonSerializer serializer)
		{
			var v = reader.Value;
			if (v == null)
			{
				return Int64.MinValue;
			}

			var vType = v.GetType();
			if (vType == typeOfInt64) //when the object is from a property in POST body from a TS client
			{
				return Int64.Parse(v.ToString());
			}

			if (vType == typeOfString)
			{
				var vs = (string)v;
				if (String.IsNullOrEmpty(vs))
				{
					return 0;
				}

				return Int64.Parse((string)v);
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}

	public sealed class Int64NullableJsonConverter : JsonConverter<Int64?>
	{
		static readonly Type typeOfInt64 = typeof(Int64);
		static readonly Type typeOfString = typeof(string);

		public override void WriteJson(JsonWriter writer, Int64? value, JsonSerializer serializer)
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

		public override Int64? ReadJson(JsonReader reader, Type objectType, Int64? existingValue, bool hasExistingValue,
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
			if (vType == typeOfInt64) //when the object is from a property in POST body from a TS client
			{
				return Int64.Parse(v.ToString());
			}

			if (vType == typeOfString)
			{
				var vs = (string)v;
				if (String.IsNullOrEmpty(vs))
				{
					return null;
				}

				return Int64.Parse((string)v);
			}


			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}
}
