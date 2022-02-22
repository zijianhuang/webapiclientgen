using Newtonsoft.Json;
using System;

namespace Fonlow.DateOnlyExtensions
{
	public sealed class DateTimeJsonConverter : JsonConverter<DateTime>
	{
		public override void WriteJson(JsonWriter writer, DateTime value, JsonSerializer serializer)
		{
			if (value == DateTime.MinValue)
			{
				writer.WriteValue(value.ToString("yyyy-MM-dd"));
			}
			else
			{
				writer.WriteValue(value.ToString("O"));
			}
		}

		public override DateTime ReadJson(JsonReader reader, Type objectType, DateTime existingValue, bool hasExistingValue, JsonSerializer serializer)
		{
			var v = reader.Value;
			if (v == null)
			{
				return DateTime.MinValue;
			}

			var vType = v.GetType();

			if (vType == typeof(DateTime)) //when the object is from a property in POST body
			{
				return (DateTime)v;
			}

			if (vType == typeof(string)) // when the object is from a standalone DateTime object in POST body
			{
				var vs = (string)v;
				if (vs == "0001-01-01")
				{
					return DateTime.MinValue;
				}

				return DateTime.Parse(vs);
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}

	public sealed class DateTimeNullableJsonConverter : JsonConverter<DateTime?>
	{
		public override void WriteJson(JsonWriter writer, DateTime? value, JsonSerializer serializer)
		{
			if (value.HasValue)
			{
				if (value.Value == DateTime.MinValue)
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

		public override DateTime? ReadJson(JsonReader reader, Type objectType, DateTime? existingValue, bool hasExistingValue,
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
				return (DateTime)v;
			}

			if (vType == typeof(string))
			{
				var vs = (string)v;
				if (vs == "0001-01-01")
				{
					return DateTime.MinValue;
				}

				return DateTime.Parse(vs);
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}



}
