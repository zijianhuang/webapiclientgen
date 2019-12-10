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
		//static readonly string _filename2 = @"C:\Windows\Media\chimes.wav";
		//		static readonly string _filename = @"C:\Users\AndySuperCo\Downloads\Nursery Rhymes Vol 11 - Thirty Rhymes with Karaoke [Full HD,1080p].mp4";

		public FileUploadIntegration()
		{
		}


		[Fact]
		public async void TestUpload()
		{
			var r = await SendFiles(_filename);
			Assert.Equal("OK", r.Submitter);
			Assert.Single(r.FileNames);
		}

		static async Task<FileResult> SendFiles(string filename)
		{
			var baseUri = new Uri(Fonlow.Testing.TestingSettings.Instance.BaseUrl);
			var requestUri = new Uri(baseUri, "api/FileUpload?userId=OK");

			using (HttpClient client = new HttpClient())
			{
				client.Timeout = TimeSpan.FromMinutes(20);
				MultipartFormDataContent formData = new MultipartFormDataContent();
				using (FileStream fileStream = new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.Read, BufferSize, useAsync: true))
				using (StreamContent streamContent = new StreamContent(fileStream, BufferSize))
				{
					formData.Add(streamContent, "files", filename);

					HttpResponseMessage response = await client.PostAsync(requestUri, formData);
					response.EnsureSuccessStatusCode();
					var stream = await response.Content.ReadAsStreamAsync();
					using (JsonReader jsonReader = new JsonTextReader(new StreamReader(stream)))
					{
						var serializer = new JsonSerializer();
						return serializer.Deserialize<FileResult>(jsonReader);
					}
				}

			}
		}

	}


}
