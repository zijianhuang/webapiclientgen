//using System.Text.Json;
//using System.Text.Json.Serialization; // As of .NET 6.0.101, Newtonsoft.Json is still better than System.Text.Json for some data types.
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Reflection;

namespace Fonlow.DateOnlyExtensions
{
	///thanks to https://kevsoft.net/2021/05/22/formatting-dateonly-types-as-iso-8601-in-asp-net-core-responses.html
	///However, not really working probably because Kevin wrote the article when .NET 6 Preview had behaved differently from .NET 6 official release.
	///As of .NET 6.0.101, DateOnly is not working well in ASP.NET Web API. According to .NET runtime team, they will address this in .NET 7.

	public sealed class DateOnlyJsonConverter : JsonConverter<DateOnly>
	{
		public override void WriteJson(JsonWriter writer, DateOnly value, JsonSerializer serializer)
		{
			writer.WriteValue(value.ToString("O"));
		}

		public override DateOnly ReadJson(JsonReader reader, Type objectType, DateOnly existingValue, bool hasExistingValue, JsonSerializer serializer)
		{
			var v = reader.Value;
			if (v == null)
			{
				return DateOnly.MinValue;
			}

			var vType = v.GetType();
			if (vType == typeof(DateTime)) //when the object is from a property in POST body from a TS client
			{
				return DateOnly.FromDateTime((DateTime)v);
			}

			if (vType == typeof(string))
			{
				return DateOnly.Parse((string)v); //DateOnly can parse 00001-01-01
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
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
			if (hasExistingValue)
			{
				return existingValue;
			}

			var v = reader.Value;
			if (v == null)
			{
				return null;
			}

			var vType = v.GetType();
			if (vType == typeof(DateTime)) //when the object is from a property in POST body from a TS client
			{
				return DateOnly.FromDateTime((DateTime)v);
			}

			if (vType == typeof(string))
			{
				return DateOnly.Parse((string)v);
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
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

		public override DateTimeOffset ReadJson(JsonReader reader, Type objectType, DateTimeOffset existingValue, bool hasExistingValue, JsonSerializer serializer)
		{
			var v = reader.Value;
			if (v == null)
			{
				return DateTimeOffset.MinValue;
			}

			var vType = v.GetType();

			if (vType == typeof(DateTime)) //when the object is from a property in POST body
			{
				return new DateTimeOffset((DateTime)v);
			}

			if (vType == typeof(string)) // when the object is from a standalone DateTimeOffset object in POST body
			{
				var vs = (string)v;
				if (vs == "0001-01-01")
				{
					return DateTimeOffset.MinValue;
				}

				return DateTimeOffset.Parse(vs);
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
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
			if (hasExistingValue)
			{
				return existingValue;
			}

			var v = reader.Value;
			if (v == null)
			{
				return null;
			}

			var vType = v.GetType();

			if (vType == typeof(DateTime))
			{
				return new DateTimeOffset((DateTime)v);
			}

			if (vType == typeof(string))
			{
				var vs = (string)v;
				if (vs == "0001-01-01")
				{
					return DateTimeOffset.MinValue;
				}

				return DateTimeOffset.Parse(vs);
			}

			throw new NotSupportedException($"Not yet support {vType} in {this.GetType()}.");
		}
	}


}
