//using System.Text.Json;
//using System.Text.Json.Serialization;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Reflection;

namespace Fonlow.DateOnlyExtensions
{
	public sealed class DateOnlyJsonConverter : JsonConverter<DateOnly> //thanks to https://kevsoft.net/2021/05/22/formatting-dateonly-types-as-iso-8601-in-asp-net-core-responses.html
	{
		public override void WriteJson(JsonWriter writer, DateOnly value, JsonSerializer serializer)
		{
			writer.WriteValue(value.ToString("O"));
		}

		public override DateOnly ReadJson(JsonReader reader, Type objectType, DateOnly existingValue, bool hasExistingValue,
			JsonSerializer serializer)
		{
			return DateOnly.FromDateTime(reader.ReadAsDateTime().Value);
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
		}

		public override DateOnly? ReadJson(JsonReader reader, Type objectType, DateOnly? existingValue, bool hasExistingValue,
			JsonSerializer serializer)
		{
			if (existingValue.HasValue)
			{
				return DateOnly.FromDateTime(reader.ReadAsDateTime().Value);
			}

			return null;
		}
	}

	public sealed class DateTimeOffsetNullableJsonConverter : JsonConverter<DateTimeOffset?>
	{
		public override void WriteJson(JsonWriter writer, DateTimeOffset? value, JsonSerializer serializer)
		{
			if (value.HasValue)
			{
				if (value.Value.TimeOfDay == TimeSpan.Zero)
				{
					writer.WriteValue(value.Value.ToString("yyyy-MM-dd"));
				}
				else
				{
					writer.WriteValue(value.Value.ToString("O"));
				}
			}
		}

		public override DateTimeOffset? ReadJson(JsonReader reader, Type objectType, DateTimeOffset? existingValue, bool hasExistingValue,
			JsonSerializer serializer)
		{
			if (existingValue.HasValue)
			{
				return reader.ReadAsDateTimeOffset();
			}

			return null;
		}
	}

	public sealed class DateTimeOffsetJsonConverter : JsonConverter<DateTimeOffset>
	{
		public override void WriteJson(JsonWriter writer, DateTimeOffset value, JsonSerializer serializer)
		{
			if (value.TimeOfDay == TimeSpan.Zero)
			{
				writer.WriteValue(value.ToString("yyyy-MM-dd"));
			}
			else
			{
				writer.WriteValue(value.ToString("O"));
			}
		}

		public override DateTimeOffset ReadJson(JsonReader reader, Type objectType, DateTimeOffset existingValue, bool hasExistingValue,
			JsonSerializer serializer)
		{
			return reader.ReadAsDateTimeOffset().Value;
		}
	}


}
