using Newtonsoft.Json;
using System;

namespace Fonlow.DateOnlyExtensions
{
	public sealed class DateTimeOffsetJsonConverter : JsonConverter<DateTimeOffset>
	{
		public override void WriteJson(JsonWriter writer, DateTimeOffset value, JsonSerializer serializer)
		{
			if (value.TimeOfDay == TimeSpan.Zero && value.Offset == TimeSpan.Zero && value != DateTimeOffset.MinValue)
			{
				writer.WriteValue(value.ToString("yyyy-MM-dd"));
			}
			else
			{
				writer.WriteValue(value.ToString("O"));
			}
		}

		public override DateTimeOffset ReadJson(JsonReader reader, Type objectType, DateTimeOffset existingValue, bool hasExistingValue, JsonSerializer serializer)
		{
			var v = reader.Value;
			if (v == null)
			{
				return DateTimeOffset.MinValue;
			}

			var vType = v.GetType();

			if (vType == typeof(DateTime)) //when the object is from a property in POST body
			{
				return new DateTimeOffset((DateTime)v);
			}

			if (vType == typeof(string)) // when the object is from a standalone DateTimeOffset object in POST body
			{
				var vs = (string)v;
				if (vs == "0001-01-01")
				{
					return DateTimeOffset.MinValue;
				}

				return DateTimeOffset.Parse(vs);
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}

	public sealed class DateTimeOffsetNullableJsonConverter : JsonConverter<DateTimeOffset?>
	{
		public override void WriteJson(JsonWriter writer, DateTimeOffset? value, JsonSerializer serializer)
		{
			if (value.HasValue)
			{
				if (value.Value.TimeOfDay == TimeSpan.Zero && value.Value.Offset == TimeSpan.Zero && value != DateTimeOffset.MinValue)
				{
					writer.WriteValue(value.Value.ToString("yyyy-MM-dd"));
				}
				else
				{
					writer.WriteValue(value.Value.ToString("O"));
				}
			}
			else
			{
				writer.WriteNull();
			}
		}

		public override DateTimeOffset? ReadJson(JsonReader reader, Type objectType, DateTimeOffset? existingValue, bool hasExistingValue,
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

			if (vType == typeof(DateTime))
			{
				return new DateTimeOffset((DateTime)v);
			}

			if (vType == typeof(string))
			{
				var vs = (string)v;
				if (vs == "0001-01-01")
				{
					return DateTimeOffset.MinValue;
				}

				return DateTimeOffset.Parse(vs);
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}

}
