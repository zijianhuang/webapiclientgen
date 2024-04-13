using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fonlow.Text.Json.DateOnlyExtensions
{
	public sealed class DateTimeOffsetJsonConverter : JsonConverter<DateTimeOffset>
	{
		public override bool HandleNull => true;

		public override void Write(Utf8JsonWriter writer, DateTimeOffset value, JsonSerializerOptions options)
		{
			writer.WriteStringValue(value.ToString("O"));
		}

		public override DateTimeOffset Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TokenType == JsonTokenType.Null)
			{
				throw new ArgumentException("Error converting value {null} to type"); // being consistent with Newtonsoft.Json
			}

			if (reader.TokenType == JsonTokenType.String)
			{
				var v = reader.GetDateTimeOffset();
				return v;
			}

			throw new NotSupportedException("Not supported: " + reader.TokenType);
		}
	}

	[Obsolete("Not needed in .NET 7")]
	public sealed class DateTimeOffsetNullableJsonConverter : JsonConverter<DateTimeOffset?>
	{
		public override bool HandleNull => true;

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
			if (reader.TokenType == JsonTokenType.Null)
			{
				return null;
			}

			if (reader.TokenType == JsonTokenType.String)
			{
				if (reader.TryGetDateTimeOffset(out var v))
				{
					return v;
				}
			}

			throw new NotSupportedException("Not supported: " + reader.TokenType);
		}
	}


}
