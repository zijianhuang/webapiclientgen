using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fonlow.IntegralExtensions
{
	public class UInt128JsonConverter : JsonConverter<UInt128>
	{
		public override UInt128 Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TokenType == JsonTokenType.Number)
			{
				using var doc = JsonDocument.ParseValue(ref reader);
				var rawText = doc.RootElement.GetRawText();
				return UInt128.Parse(rawText, NumberFormatInfo.InvariantInfo);
			}
			else if (reader.TokenType == JsonTokenType.String)
			{
				using var doc = JsonDocument.ParseValue(ref reader);
				var text = doc.RootElement.GetString();
				return UInt128.Parse(text, NumberFormatInfo.InvariantInfo);
			}

			throw new JsonException(string.Format("Found token {0} but expected token {1}", reader.TokenType, JsonTokenType.Number));
		}

		public override void Write(Utf8JsonWriter writer, UInt128 value, JsonSerializerOptions options) =>
			writer.WriteStringValue(value.ToString(NumberFormatInfo.InvariantInfo));
	}
}
