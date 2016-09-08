using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using DemoWebApi.DemoData.Client;
using System.Net.Http;
using System.Net.Http.Handlers;
using System.Web.Http;
using System.IO;
using DemoWebApi.Controllers.Client;
using System.Diagnostics;
using Newtonsoft.Json;


namespace IntegrationTests
{
    public class FileUploadFixture : IDisposable
    {
        public FileUploadFixture()
        {
            var baseUri = new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            httpClient = new System.Net.Http.HttpClient();
            Api = new DemoWebApi.Controllers.Client.Entities(httpClient, baseUri);
        }

        public DemoWebApi.Controllers.Client.Entities Api { get; private set; }

        System.Net.Http.HttpClient httpClient;

        #region IDisposable pattern
        bool disposed;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    httpClient.Dispose();
                }

                disposed = true;
            }
        }
        #endregion
    }

    [Collection(TestConstants.IisExpressAndInit)]
    public class FileUploadIntegration : IClassFixture<FileUploadFixture>
    {

        const int BufferSize = 1024000;

        //      static readonly string _filename = @"C:\Windows\Media\chimes.wav";
        static readonly string _filename = @"C:\Users\AndySuperCo\Downloads\Nursery Rhymes Vol 11 - Thirty Rhymes with Karaoke [Full HD,1080p].mp4";

        public FileUploadIntegration()
        {

        }

        [Fact]
        public void TestUpload()
        {
            var stopWatch = new Stopwatch();
            stopWatch.Start();
            var r = RunClient().Result;

            Assert.Equal("Me", r.Submitter);

            stopWatch.Stop();
            Debug.WriteLine("Time ellapsed for upload n millisecond: " + stopWatch.Elapsed.TotalMilliseconds);
        }
        /// <summary>
        /// Runs an HttpClient uploading files using MIME multipart to the controller.
        /// The client uses a progress notification message handler to report progress. 
        /// </summary>
        static async Task<FileResult> RunClient()
        {
            var baseUri = new Uri(System.Configuration.ConfigurationManager.AppSettings["Testing_BaseUrl"]);
            var requestUri = new Uri(baseUri, "api/FileUpload");
            // Create a progress notification handler
            ProgressMessageHandler progress = new ProgressMessageHandler();
            progress.HttpSendProgress += ProgressEventHandler;

            // Create an HttpClient and wire up the progress handler
            using (HttpClient client = HttpClientFactory.Create(progress))
            {

                // Set the request timeout as large uploads can take longer than the default 2 minute timeout
                client.Timeout = TimeSpan.FromMinutes(20);

                // Open the file we want to upload and submit it
                using (FileStream fileStream = new FileStream(_filename, FileMode.Open, FileAccess.Read, FileShare.Read, BufferSize, useAsync: true))
                {
                    // Create a stream content for the file
                    StreamContent streamContent = new StreamContent(fileStream, BufferSize);

                    // Create Multipart form data content, add our submitter data and our stream content
                    MultipartFormDataContent formData = new MultipartFormDataContent();
                    formData.Add(new StringContent("Me"), "submitter");
                    formData.Add(streamContent, "filename", _filename);

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

        static void ProgressEventHandler(object sender, HttpProgressEventArgs eventArgs)
        {
            // The sender is the originating HTTP request   
            HttpRequestMessage request = sender as HttpRequestMessage;

            // Write different message depending on whether we have a total length or not   
            string message;
            if (eventArgs.TotalBytes != null)
            {
                message = String.Format("  Request {0} uploaded {1} of {2} bytes ({3}%)",
                    request.RequestUri, eventArgs.BytesTransferred, eventArgs.TotalBytes, eventArgs.ProgressPercentage);
            }
            else
            {
                message = String.Format("  Request {0} uploaded {1} bytes",
                    request.RequestUri, eventArgs.BytesTransferred, eventArgs.TotalBytes, eventArgs.ProgressPercentage);
            }

            // Write progress message to console   
            System.Diagnostics.Trace.TraceInformation(message);
        }
    }


}
