using System.Globalization;
using System.Numerics;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace Fonlow.IntegralExtensions
{
	public class BigIntegerJsonConverter : JsonConverter<BigInteger>
	{
		public override BigInteger Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TokenType == JsonTokenType.Number)
			{
				using JsonDocument doc = JsonDocument.ParseValue(ref reader);
				string rawText = doc.RootElement.GetRawText();
				return BigInteger.Parse(rawText, NumberFormatInfo.InvariantInfo);
			}
			else if (reader.TokenType == JsonTokenType.String)
			{
				using JsonDocument doc = JsonDocument.ParseValue(ref reader);
				string text = doc.RootElement.GetString();
				return BigInteger.Parse(text, NumberFormatInfo.InvariantInfo);
			}

			throw new JsonException(string.Format("Found token {0} but expected token {1}", reader.TokenType, JsonTokenType.Number));
		}

		public override void Write(Utf8JsonWriter writer, BigInteger value, JsonSerializerOptions options) =>
			writer.WriteStringValue(value.ToString(NumberFormatInfo.InvariantInfo));
	}
}
