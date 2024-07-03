using Fonlow.Auth.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

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
					writer.WriteString("scope", ropcRequest.Scope);
					break;
				case "refresh_token":
					RefreshAccessTokenRequest refreshRequest = value as RefreshAccessTokenRequest;
					writer.WriteString("refresh_token", refreshRequest.RefreshToken);
					writer.WriteString("scope", refreshRequest.Scope);
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

			switch (typeDiscriminator)
			{
				case "password":
					var ropcRequest = new ROPCRequst();
					ropcRequest.GrantType = typeDiscriminator;
					while (reader.Read())
					{
						if (reader.TokenType == JsonTokenType.EndObject)
						{
							return ropcRequest;
						}

						if (reader.TokenType == JsonTokenType.PropertyName)
						{
							propertyName = reader.GetString();
							if (reader.Read())
							{
								switch (propertyName)
								{
									case "username":
										ropcRequest.Username = reader.GetString();
										break;
									case "password":
										ropcRequest.Password = reader.GetString();
										break;
									case "scope":
										ropcRequest.Scope = reader.GetString();
										break;
								}
							}
						}
					}

					return ropcRequest;
				case "refresh_token":
					var refreshTokenRequest = new RefreshAccessTokenRequest();
					refreshTokenRequest.GrantType = typeDiscriminator;
					while (reader.Read())
					{
						if (reader.TokenType == JsonTokenType.EndObject)
						{
							return refreshTokenRequest;
						}

						if (reader.TokenType == JsonTokenType.PropertyName)
						{
							propertyName = reader.GetString();
							if (reader.Read())
							{
								switch (propertyName)
								{
									case "refresh_token":
										refreshTokenRequest.RefreshToken = reader.GetString();
										break;
									case "scope":
										refreshTokenRequest.Scope = reader.GetString();
										break;
								}
							}
						}
					}
					return refreshTokenRequest;
				default:
					throw new JsonException();
			}
		}
	}
}
