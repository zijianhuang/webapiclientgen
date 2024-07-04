using Fonlow.Auth.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fonlow.Text.Json.Auth
{
	public sealed class TokenResponseConverter : JsonConverter<TokenResponseBase>
	{
		public override bool HandleNull => true;

		public override void Write(Utf8JsonWriter writer, TokenResponseBase value, JsonSerializerOptions options)
		{
			writer.WriteStartObject();
			writer.WriteString("token_type", value.TokenType);
			switch (value.TokenType)
			{
				case "bearer":
				case "Bearer":
					AccessTokenResponse accessTokenResponse = value as AccessTokenResponse;
					writer.WriteString("access_token", accessTokenResponse.AccessToken);
					writer.WriteNumber("expires_in", Convert.ToDecimal(accessTokenResponse.ExpiresIn));
					if (!string.IsNullOrWhiteSpace(accessTokenResponse.RefreshToken))
					{
						writer.WriteString("refresh_token", accessTokenResponse.RefreshToken);
					}

					if (!string.IsNullOrWhiteSpace(accessTokenResponse.Scope))
					{
						writer.WriteString("scope", accessTokenResponse.Scope);
					}
					break;
				default:
					throw new NotSupportedException();
			}

			writer.WriteEndObject();
		}

		public override TokenResponseBase Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
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
			if (propertyName != "token_type")
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
				case "bearer":
				case "Bearer":
					var accessTokenResponse = new AccessTokenResponse();
					accessTokenResponse.TokenType = typeDiscriminator;
					while (reader.Read())
					{
						if (reader.TokenType == JsonTokenType.EndObject)
						{
							return accessTokenResponse;
						}

						if (reader.TokenType == JsonTokenType.PropertyName)
						{
							propertyName = reader.GetString();
							if (reader.Read())
							{
								switch (propertyName)
								{
									case "access_token":
										accessTokenResponse.AccessToken = reader.GetString();
										break;
									case "refresh_token":
										accessTokenResponse.AccessToken = reader.GetString();
										break;
									case "expires_in":
										accessTokenResponse.ExpiresIn = reader.GetInt32();
										break;
									case "scope":
										accessTokenResponse.Scope = reader.GetString();
										break;
								}
							}
						}
					}

					return accessTokenResponse;
				default:
					throw new JsonException();
			}
		}
	}
}
