using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using DemoWebApi.DemoData.Client;
using System.Net.Http;
using System.IO;
using DemoWebApi.Controllers.Client;
using System.Diagnostics;
using Newtonsoft.Json;
using Microsoft.Extensions.Http;

namespace IntegrationTests
{
	[Collection(TestConstants.LaunchWebApiAndInit)]
	public class FileUploadIntegration 
	{

		const int BufferSize = 1024000;

		static readonly string _filename = @"C:\Windows\Media\chimes.wav";
//		static readonly string _filename = @"C:\Users\AndySuperCo\Downloads\Nursery Rhymes Vol 11 - Thirty Rhymes with Karaoke [Full HD,1080p].mp4";

		public FileUploadIntegration()
		{
		}


		[Fact]
		public async void TestUpload()
		{
			var r = await RunClient();
			Assert.Equal("OK", r.Submitter);
		}

		/// <summary>
		/// Runs an HttpClient uploading files using MIME multipart to the controller.
		/// The client uses a progress notification message handler to report progress. 
		/// </summary>
		async Task<FileResult> RunClient()
		{
			var baseUri = new Uri(Fonlow.Testing.TestingSettings.Instance.BaseUrl);
			var requestUri = new Uri(baseUri, "api/FileUpload?userId=OK");

			// Create an HttpClient and wire up the progress handler
			using (HttpClient client = new HttpClient())
			{

				// Set the request timeout as large uploads can take longer than the default 2 minute timeout
				client.Timeout = TimeSpan.FromMinutes(20);

				// Open the file we want to upload and submit it
				using (FileStream fileStream = new FileStream(_filename, FileMode.Open, FileAccess.Read, FileShare.Read, BufferSize, useAsync: true))
				{
					// Create a stream content for the file
					StreamContent streamContent = new StreamContent(fileStream, BufferSize);

					MultipartFormDataContent formData = new MultipartFormDataContent
					{
						{ streamContent, "files", _filename }
					};

					// Post the MIME multipart form data upload with the file
					HttpResponseMessage response = await client.PostAsync(requestUri, formData);
					response.EnsureSuccessStatusCode();
					var stream = await response.Content.ReadAsStreamAsync();
					using (JsonReader jsonReader = new JsonTextReader(new System.IO.StreamReader(stream)))
					{
						var serializer = new JsonSerializer();
						return serializer.Deserialize<FileResult>(jsonReader);
					}
				}


			}
		}

	}


}
