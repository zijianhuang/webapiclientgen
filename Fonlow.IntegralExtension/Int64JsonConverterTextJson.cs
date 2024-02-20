using System.Reflection.Metadata.Ecma335;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fonlow.Text.Json.IntegralExtensions
{
	//public sealed class Int64JsonConverter : JsonConverter<Int64>
	//{
	//	public override void Write(Utf8JsonWriter writer, Int64 value, JsonSerializerOptions options)
	//	{
	//		writer.WriteStringValue($"\"{value.ToString()}\"");
	//	}

	//	public override Int64 Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	//	{
	//		var v = reader.GetInt64();
	//		return v;
	//	}
	//}

	///// <summary>
	///// 
	///// </summary>
	///// <remarks>
	///// JsonSerializer.Serialize() can pick this converter when when the value is null.
	///// However, the Return in controller could not pick this converter when the value is null, and return an empty body. 
	///// Then the JsonSerialize.Deserialize() at the client side will complain System.Text.Json.JsonException : The input does not contain any JSON tokens.
	///// I will try again in ASP.NET Core 7.
	///// </remarks>
	//public sealed class Int64NullableJsonConverter : JsonConverter<Int64?>
	//{
	//	public override bool HandleNull => true;
		
	//	public override void Write(Utf8JsonWriter writer, Int64? value, JsonSerializerOptions options)
	//	{
	//		if (value.HasValue)
	//		{
	//			writer.WriteStringValue($"\"{value.Value.ToString()}\"");
	//		}
	//		else
	//		{
	//			writer.WriteNullValue();
	//		}
	//	}

	//	public override Int64? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	//	{
	//		if (reader.TryGetInt64(out var v))
	//		{
	//			return v;
	//		}

	//		return null;
	//	}
	//}
}
