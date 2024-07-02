using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using System.Windows.Markup;
using Fonlow.Auth.Models;

namespace Fonlow.Text.Json.Auth
{
	public sealed class TokenRequestConverter : JsonConverter<RequestBase>
	{
		public override bool HandleNull => true;

		public override void Write(Utf8JsonWriter writer, RequestBase value, JsonSerializerOptions options)
		{
			writer.WriteStartObject();
			writer.WriteString("grant_type", value.GrantType);
			switch (value.GrantType)
			{
				case "password":
					ROPCRequst ropcRequest = value as ROPCRequst;
					writer.WriteString("username", ropcRequest.Username);
					writer.WriteString("password", ropcRequest.Password);
					break;
				case "refresh_token":
					RefreshAccessTokenRequest refreshRequest = value as RefreshAccessTokenRequest;
					writer.WriteString("refresh_token", refreshRequest.RefreshToken);
					break;
				default:
					throw new NotSupportedException();
			}

			writer.WriteEndObject();
		}

		public override RequestBase Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TokenType != JsonTokenType.StartObject)
			{
				throw new JsonException();
			}

			reader.Read();
			if (reader.TokenType != JsonTokenType.PropertyName)
			{
				throw new JsonException();
			}

			string propertyName = reader.GetString();
			if (propertyName != "grant_type")
			{
				throw new JsonException();
			}

			reader.Read();
			if (reader.TokenType != JsonTokenType.String)
			{
				throw new JsonException();
			}

			var typeDiscriminator = reader.GetString();

			RequestBase requestBase = typeDiscriminator switch
			{
				"password" => new ROPCRequst(),
				"refresh_token" => new RefreshAccessTokenRequest(),
				_ => throw new JsonException()
			};
			requestBase.GrantType = typeDiscriminator;

			while (reader.Read())
			{
				if (reader.TokenType == JsonTokenType.EndObject)
				{
					return requestBase;
				}

				if (reader.TokenType == JsonTokenType.PropertyName)
				{
					propertyName = reader.GetString();
					if (reader.Read())
					{
						switch (propertyName)
						{
							case "Username":
							case "username":
								((ROPCRequst)requestBase).Username = reader.GetString();
								break;
							case "Password":
							case "password":
								((ROPCRequst)requestBase).Password = reader.GetString();
								break;
							case "refresh_token":
								((RefreshAccessTokenRequest)requestBase).RefreshToken = reader.GetString();
								break;
						}
					}
				}
			}

			throw new JsonException();
		}
	}
}
