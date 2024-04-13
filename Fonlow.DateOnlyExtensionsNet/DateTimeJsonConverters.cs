using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fonlow.Text.Json.DateOnlyExtensions
{
	public sealed class DateTimeJsonConverter : JsonConverter<DateTime>
	{
		public override bool HandleNull => true;

		public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
		{
			writer.WriteStringValue(value.ToString("O"));
		}

		public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TokenType == JsonTokenType.Null)
			{
				throw new ArgumentException("Error converting value {null} to type"); // being consistent with Newtonsoft.Json
			}

			if (reader.TokenType == JsonTokenType.String)
			{
				var v = reader.GetDateTime();
				return v;
			}

			throw new NotSupportedException("Not supported: " + reader.TokenType);
		}
	}

	public sealed class DateTimeNullableJsonConverter : JsonConverter<DateTime?>
	{
		public override bool HandleNull => true;

		public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
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

		public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TokenType == JsonTokenType.Null)
			{
				return null;
			}

			if (reader.TokenType == JsonTokenType.String)
			{
				if (reader.TryGetDateTime(out var v))
				{
					return v;
				}
			}

			throw new NotSupportedException("Not supported: " + reader.TokenType);
		}
	}

}
