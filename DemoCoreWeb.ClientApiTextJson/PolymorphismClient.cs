using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using Fonlow.Net.Http;

namespace DemoCoreWeb.ClientApiTextJson
{
	public partial class PolymorphismClient
	{

		private System.Net.Http.HttpClient client;

		private JsonSerializerOptions jsonSerializerSettings;

		public PolymorphismClient(System.Net.Http.HttpClient client, JsonSerializerOptions jsonSerializerSettings = null)
		{
			if (client == null)
				throw new ArgumentNullException(nameof(client), "Null HttpClient.");

			if (client.BaseAddress == null)
				throw new ArgumentNullException(nameof(client), "HttpClient has no BaseAddress");

			this.client = client;
			this.jsonSerializerSettings = jsonSerializerSettings;
		}

		/// <summary>
		/// POST api/Polymorphism/PostRequestBase
		/// </summary>
		public async Task<Fonlow.Auth.Models.RequestBase> PostRequestBaseAsync(Fonlow.Auth.Models.RequestBase model, Action<System.Net.Http.Headers.HttpRequestHeaders> handleHeaders = null)
		{
			var requestUri = "api/Polymorphism/PostRequestBase";
			using var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri);
			var content = System.Net.Http.Json.JsonContent.Create(model, mediaType: null, jsonSerializerSettings);
			httpRequestMessage.Content = content;
			handleHeaders?.Invoke(httpRequestMessage.Headers);
			var responseMessage = await client.SendAsync(httpRequestMessage);
			try
			{
				responseMessage.EnsureSuccessStatusCodeEx();
				if (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent) { return null; }
				var stream = await responseMessage.Content.ReadAsStreamAsync();
				return JsonSerializer.Deserialize<Fonlow.Auth.Models.RequestBase>(stream, jsonSerializerSettings);
			}
			finally
			{
				responseMessage.Dispose();
			}
		}

		/// <summary>
		/// POST api/Polymorphism/PostRequestBase
		/// </summary>
		public Fonlow.Auth.Models.RequestBase PostRequestBase(Fonlow.Auth.Models.RequestBase model, Action<System.Net.Http.Headers.HttpRequestHeaders> handleHeaders = null)
		{
			var requestUri = "api/Polymorphism/PostRequestBase";
			using var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri);
			var content = System.Net.Http.Json.JsonContent.Create(model, mediaType: null, jsonSerializerSettings);
			httpRequestMessage.Content = content;
			handleHeaders?.Invoke(httpRequestMessage.Headers);
			var responseMessage = client.Send(httpRequestMessage);
			try
			{
				responseMessage.EnsureSuccessStatusCodeEx();
				if (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent) { return null; }
				var stream = responseMessage.Content.ReadAsStream();
				return JsonSerializer.Deserialize<Fonlow.Auth.Models.RequestBase>(stream, jsonSerializerSettings);
			}
			finally
			{
				responseMessage.Dispose();
			}
		}

		/// <summary>
		/// POST api/Polymorphism/PostROPCRequst
		/// </summary>
		public async Task<Fonlow.Auth.Models.ROPCRequst> PostROPCRequstAsync(Fonlow.Auth.Models.ROPCRequst model, Action<System.Net.Http.Headers.HttpRequestHeaders> handleHeaders = null)
		{
			var requestUri = "api/Polymorphism/PostROPCRequst";
			using var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri);
			var content = System.Net.Http.Json.JsonContent.Create(model, mediaType: null, jsonSerializerSettings);
			httpRequestMessage.Content = content;
			handleHeaders?.Invoke(httpRequestMessage.Headers);
			var responseMessage = await client.SendAsync(httpRequestMessage);
			try
			{
				responseMessage.EnsureSuccessStatusCodeEx();
				if (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent) { return null; }
				var stream = await responseMessage.Content.ReadAsStreamAsync();
				return JsonSerializer.Deserialize<Fonlow.Auth.Models.ROPCRequst>(stream, jsonSerializerSettings);
			}
			finally
			{
				responseMessage.Dispose();
			}
		}

		/// <summary>
		/// POST api/Polymorphism/PostROPCRequst
		/// </summary>
		public Fonlow.Auth.Models.ROPCRequst PostROPCRequst(Fonlow.Auth.Models.ROPCRequst model, Action<System.Net.Http.Headers.HttpRequestHeaders> handleHeaders = null)
		{
			var requestUri = "api/Polymorphism/PostROPCRequst";
			using var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri);
			var content = System.Net.Http.Json.JsonContent.Create(model, mediaType: null, jsonSerializerSettings);
			httpRequestMessage.Content = content;
			handleHeaders?.Invoke(httpRequestMessage.Headers);
			var responseMessage = client.Send(httpRequestMessage);
			try
			{
				responseMessage.EnsureSuccessStatusCodeEx();
				if (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent) { return null; }
				var stream = responseMessage.Content.ReadAsStream();
				return JsonSerializer.Deserialize<Fonlow.Auth.Models.ROPCRequst>(stream, jsonSerializerSettings);
			}
			finally
			{
				responseMessage.Dispose();
			}
		}

		/// <summary>
		/// POST api/Polymorphism/PostROPCRequst2
		/// </summary>
		public async Task<Fonlow.Auth.Models.RequestBase> PostROPCRequst2Async(Fonlow.Auth.Models.ROPCRequst model, Action<System.Net.Http.Headers.HttpRequestHeaders> handleHeaders = null)
		{
			var requestUri = "api/Polymorphism/PostROPCRequst2";
			using var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri);
			var content = System.Net.Http.Json.JsonContent.Create(model, mediaType: null, jsonSerializerSettings);
			httpRequestMessage.Content = content;
			handleHeaders?.Invoke(httpRequestMessage.Headers);
			var responseMessage = await client.SendAsync(httpRequestMessage);
			try
			{
				responseMessage.EnsureSuccessStatusCodeEx();
				if (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent) { return null; }
				var stream = await responseMessage.Content.ReadAsStreamAsync();
				return JsonSerializer.Deserialize<Fonlow.Auth.Models.RequestBase>(stream, jsonSerializerSettings);
			}
			finally
			{
				responseMessage.Dispose();
			}
		}

		/// <summary>
		/// POST api/Polymorphism/PostROPCRequst2
		/// </summary>
		public Fonlow.Auth.Models.RequestBase PostROPCRequst2(Fonlow.Auth.Models.ROPCRequst model, Action<System.Net.Http.Headers.HttpRequestHeaders> handleHeaders = null)
		{
			var requestUri = "api/Polymorphism/PostROPCRequst2";
			using var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri);
			var content = System.Net.Http.Json.JsonContent.Create(model, mediaType: null, jsonSerializerSettings);
			httpRequestMessage.Content = content;
			handleHeaders?.Invoke(httpRequestMessage.Headers);
			var responseMessage = client.Send(httpRequestMessage);
			try
			{
				responseMessage.EnsureSuccessStatusCodeEx();
				if (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent) { return null; }
				var stream = responseMessage.Content.ReadAsStream();
				return JsonSerializer.Deserialize<Fonlow.Auth.Models.RequestBase>(stream, jsonSerializerSettings);
			}
			finally
			{
				responseMessage.Dispose();
			}
		}

		/// <summary>
		/// POST api/Polymorphism/PostROPCRequst3
		/// </summary>
		public async Task<Fonlow.Auth.Models.ROPCRequst> PostROPCRequst3Async(Fonlow.Auth.Models.RequestBase model, Action<System.Net.Http.Headers.HttpRequestHeaders> handleHeaders = null)
		{
			var requestUri = "api/Polymorphism/PostROPCRequst3";
			using var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri);
			var content = System.Net.Http.Json.JsonContent.Create(model, mediaType: null, jsonSerializerSettings);
			httpRequestMessage.Content = content;
			handleHeaders?.Invoke(httpRequestMessage.Headers);
			var responseMessage = await client.SendAsync(httpRequestMessage);
			try
			{
				responseMessage.EnsureSuccessStatusCodeEx();
				if (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent) { return null; }
				var stream = await responseMessage.Content.ReadAsStreamAsync();
				return JsonSerializer.Deserialize<Fonlow.Auth.Models.ROPCRequst>(stream, jsonSerializerSettings);
			}
			finally
			{
				responseMessage.Dispose();
			}
		}

		/// <summary>
		/// POST api/Polymorphism/PostROPCRequst3
		/// </summary>
		public Fonlow.Auth.Models.ROPCRequst PostROPCRequst3(Fonlow.Auth.Models.RequestBase model, Action<System.Net.Http.Headers.HttpRequestHeaders> handleHeaders = null)
		{
			var requestUri = "api/Polymorphism/PostROPCRequst3";
			using var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUri);
			var content = System.Net.Http.Json.JsonContent.Create(model, mediaType: null, jsonSerializerSettings);
			httpRequestMessage.Content = content;
			handleHeaders?.Invoke(httpRequestMessage.Headers);
			var responseMessage = client.Send(httpRequestMessage);
			try
			{
				responseMessage.EnsureSuccessStatusCodeEx();
				if (responseMessage.StatusCode == System.Net.HttpStatusCode.NoContent) { return null; }
				var stream = responseMessage.Content.ReadAsStream();
				return JsonSerializer.Deserialize<Fonlow.Auth.Models.ROPCRequst>(stream, jsonSerializerSettings);
			}
			finally
			{
				responseMessage.Dispose();
			}
		}

	}

}
