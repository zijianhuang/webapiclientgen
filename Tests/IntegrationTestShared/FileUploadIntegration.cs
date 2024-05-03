using DemoWebApi.Controllers.Client;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

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


		//[Fact]
		public async void TestUpload()
		{
			FileResult r = await SendFiles(_filename);
			Assert.Equal("OK", r.Submitter);
			Assert.Single(r.FileNames);
		}

		static async Task<FileResult> SendFiles(string filename)
		{
			Uri baseUri = new Uri(Fonlow.Testing.TestingSettings.Instance.BaseUrl);
			Uri requestUri = new Uri(baseUri, "api/FileUpload?userId=OK");

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
					Stream stream = await response.Content.ReadAsStreamAsync();
					using (JsonReader jsonReader = new JsonTextReader(new StreamReader(stream)))
					{
						JsonSerializer serializer = new JsonSerializer();
						return serializer.Deserialize<FileResult>(jsonReader);
					}
				}

			}
		}

	}


}
