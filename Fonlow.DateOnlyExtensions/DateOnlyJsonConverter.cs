using Newtonsoft.Json;

namespace Fonlow.DateOnlyExtensions
{
	public sealed class DateOnlyJsonConverter : JsonConverter<DateOnly>
	{
		public override void WriteJson(JsonWriter writer, DateOnly value, JsonSerializer serializer)
		{
			writer.WriteValue(value.ToString("O"));
		}

		public override DateOnly ReadJson(JsonReader reader, Type objectType, DateOnly existingValue, bool hasExistingValue, JsonSerializer serializer)
		{
			var v = reader.Value;
			if (v == null)
			{
				return DateOnly.MinValue;
			}

			var vType = v.GetType();
			if (vType == typeof(DateTime)) //when the object is from a property in POST body from a TS client
			{
				return DateOnly.FromDateTime((DateTime)v);
			}

			if (vType == typeof(string))
			{
				return DateOnly.Parse((string)v); //DateOnly can parse 00001-01-01
			}

			//if (vType == typeof(DateTimeOffset)) //apparently never this type??
			//{
			//	return DateOnly.FromDateTime(((DateTimeOffset)v).DateTime);
			//}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}

	public sealed class DateOnlyNullableJsonConverter : JsonConverter<DateOnly?>
	{
		public override void WriteJson(JsonWriter writer, DateOnly? value, JsonSerializer serializer)
		{
			if (value.HasValue)
			{
				writer.WriteValue(value.Value.ToString("O"));
			}
			else
			{
				writer.WriteNull();
			}
		}

		public override DateOnly? ReadJson(JsonReader reader, Type objectType, DateOnly? existingValue, bool hasExistingValue,
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
			if (vType == typeof(DateTime)) //when the object is from a property in POST body from a TS client
			{
				return DateOnly.FromDateTime((DateTime)v);
			}

			if (vType == typeof(string))
			{
				return DateOnly.Parse((string)v);
			}

			//if (vType == typeof(DateTimeOffset))
			//{
			//	return DateOnly.FromDateTime(((DateTimeOffset)v).DateTime);
			//}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}
}
