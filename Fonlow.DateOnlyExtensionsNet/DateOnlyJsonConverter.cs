using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fonlow.Text.Json.DateOnlyExtensions
{
	///thanks to https://kevsoft.net/2021/05/22/formatting-dateonly-types-as-iso-8601-in-asp-net-core-responses.html
	///However, not really working probably because Kevin wrote the article when .NET 6 Preview had behaved differently from .NET 6 official release.
	///As of .NET 6.0.101, DateOnly is not working well in ASP.NET Web API. According to .NET runtime team, they will address this in .NET 7.

	public sealed class DateOnlyJsonConverter : JsonConverter<DateOnly>
	{
		public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
		{
			writer.WriteStringValue(value.ToString("O"));
		}

		public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			var v = reader.GetDateTime();
			return DateOnly.FromDateTime(v);
		}
	}

	/// <summary>
	/// 
	/// </summary>
	/// <remarks>
	/// JsonSerializer.Serialize() can pick this converter when when the value is null.
	/// However, the Return in controller could not pick this converter when the value is null, and return an empty body. 
	/// Then the JsonSerialize.Deserialize() at the client side will complain System.Text.Json.JsonException : The input does not contain any JSON tokens.
	/// I will try again in ASP.NET Core 7.
	/// </remarks>
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
			if (reader.TryGetDateTime(out var v))
			{
				return DateOnly.FromDateTime(v);
			}

			return null;
		}
	}
}
