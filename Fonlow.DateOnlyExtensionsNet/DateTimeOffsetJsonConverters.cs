﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fonlow.Text.Json.DateOnlyExtensions
{
	public sealed class DateTimeOffsetJsonConverter : JsonConverter<DateTimeOffset>
	{
		public override void Write(Utf8JsonWriter writer, DateTimeOffset value, JsonSerializerOptions options)
		{
			writer.WriteStringValue(value.ToString("O"));
		}

		public override DateTimeOffset Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			var v = reader.GetDateTime();
			return v;
		}
	}

	public sealed class DateTimeOffsetNullableJsonConverter : JsonConverter<DateTimeOffset?>
	{
		//public override bool HandleNull => true;

		public override void Write(Utf8JsonWriter writer, DateTimeOffset? value, JsonSerializerOptions options)
		{
			if (value.HasValue)
			{
				writer.WriteStringValue(value.Value.ToString("O"));
			}
			else
			{
				writer.WriteNullValue();
			}
		}

		public override DateTimeOffset? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TryGetDateTime(out var v))
			{
				return v;
			}

			return null;
		}
	}


}
