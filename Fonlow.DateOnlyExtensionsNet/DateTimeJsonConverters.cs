using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fonlow.DateOnlyExtensions
{
	public sealed class DateTimeJsonConverter : JsonConverter<DateTime>
	{
		public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
		{
			writer.WriteStringValue(value.ToString("O"));
		}

		public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			var v = reader.GetDateTime();
			return v;
		}
	}

	public sealed class DateTimeNullableJsonConverter : JsonConverter<DateTime?>
	{
		public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
		{
			if (value.HasValue)
			{
				writer.WriteStringValue(value.Value.ToString("O"));
			}
		}

		public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TryGetDateTime(out var v))
			{
				return v;
			}

			return null;
		}
	}

}
