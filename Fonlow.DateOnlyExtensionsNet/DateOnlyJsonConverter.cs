using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fonlow.Text.Json.DateOnlyExtensions
{
	public sealed class DateOnlyJsonConverter : JsonConverter<DateOnly>
	{
		public override bool HandleNull => true;

		public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
		{
			writer.WriteStringValue(value.ToString("O"));
		}

		public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TokenType == JsonTokenType.Null)
			{
				return DateOnly.MinValue;
			}

			if (reader.TokenType == JsonTokenType.String)
			{
				var v = reader.GetDateTime();
				return DateOnly.FromDateTime(v);
			}

			throw new NotSupportedException("Not supported: " + reader.TokenType);
		}
	}

	/// <summary> 
	/// not needed in .NET 7 and above
	/// </summary>
	/// <remarks>
	/// JsonSerializer.Serialize() can pick this converter when when the value is null.
	/// However, the Return in controller could not pick this converter when the value is null, and return an empty body. 
	/// Then the JsonSerialize.Deserialize() at the client side will complain System.Text.Json.JsonException : The input does not contain any JSON tokens.
	/// I will try again in ASP.NET Core 7.
	/// </remarks>
	[Obsolete("Not needed in .NET 7")]
	public sealed class DateOnlyNullableJsonConverter : JsonConverter<DateOnly?>
	{
		public override bool HandleNull => true;

		public override void Write(Utf8JsonWriter writer, DateOnly? value, JsonSerializerOptions options)
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

		public override DateOnly? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TokenType == JsonTokenType.Null)
			{
				return null;
			}

			if (reader.TokenType == JsonTokenType.String)
			{
				if (reader.TryGetDateTime(out var v))
				{
					return DateOnly.FromDateTime(v);
				}
			}

			throw new NotSupportedException("Not supported: " + reader.TokenType);
		}
	}
}
