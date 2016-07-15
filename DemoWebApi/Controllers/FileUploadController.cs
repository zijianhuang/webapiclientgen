using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Runtime.Serialization;
using System.Collections.Generic;
using System.Diagnostics;

namespace DemoWebApi.Controllers
{
    /// <summary>
    /// This sample controller reads the contents of an HTML file upload asynchronously and writes one or more body parts to a local file.
    /// </summary>
    public class FileUploadController : ApiController
    {
        static readonly string ServerUploadFolder = Path.GetTempPath();

        [HttpPost]
        public async Task<FileResult> UploadFile()
        {
            Debug.WriteLine("Upload start for upload path: "+ServerUploadFolder);
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            // Verify that this is an HTML Form file upload request
            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.UnsupportedMediaType));
            }

            // Create a stream provider for setting up output streams
            MultipartFormDataStreamProvider streamProvider = new MultipartFormDataStreamProvider(ServerUploadFolder);
            
            // Read the MIME multipart asynchronously content using the stream provider we just created.
            try
            {
                await Request.Content.ReadAsMultipartAsync(streamProvider);
                //.ContinueWith(t =>
                //{
                //    if (t.IsFaulted || t.IsCanceled)
                //    {
                //        throw new HttpResponseException(HttpStatusCode.InternalServerError);
                //    }

                //    Debug.WriteLine("task finished");
                //});

            }
            catch (System.Exception ex)
            {
                Trace.TraceError(ex.ToString());
                throw;
            }
            //System.Threading.Tasks.Task.WaitAll(task);

            stopwatch.Stop();
            Trace.TraceInformation($"Writing file to {ServerUploadFolder} in milliseconds: {stopwatch.Elapsed.TotalMilliseconds}");
            // Create response
            return new FileResult
            {
                FileNames = streamProvider.FileData.Select(entry => entry.LocalFileName),
                Submitter = streamProvider.FormData["submitter"]
            };
        }


    }

    /// <summary>
    /// This class is used to carry the result of various file uploads.
    /// </summary>
    [DataContract]
    public class FileResult
    {
        /// <summary>
        /// Gets or sets the local path of the file saved on the server.
        /// </summary>
        /// <value>
        /// The local path.
        /// </value> 
        [DataMember]
        public IEnumerable<string> FileNames { get; set; }

        /// <summary>
        /// Gets or sets the submitter as indicated in the HTML form used to upload the data.
        /// </summary>
        /// <value>
        /// The submitter.
        /// </value>
        [DataMember]
        public string Submitter { get; set; }
    }
}
