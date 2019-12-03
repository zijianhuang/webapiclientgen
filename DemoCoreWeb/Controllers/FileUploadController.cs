using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Serialization;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace DemoWebApi.Controllers
{
	/// <summary>
	/// This sample controller reads the contents of an HTML file upload asynchronously and writes one or more body parts to a local file.
	/// </summary>
	[Route("api/[controller]")]
	public class FileUploadController : ControllerBase
	{
		static readonly string ServerUploadFolder = Path.GetTempPath();

		/// <summary>
		/// Post the avatar file with the userId.
		/// </summary>
		/// <returns></returns>
		[HttpPost]
		public async Task<ActionResult<FileResult>> UploadAvatar([FromQuery] string userId, [FromForm] List<IFormFile> files)
		{
			if (files.Count == 0)
			{
				return BadRequest();
			}

			long size = files.Sum(f => f.Length);
			List<string> fileNames = new List<string>(files.Count);

			foreach (var formFile in files)
			{
				if (formFile.Length > 0)
				{
					var filePath = Path.GetTempFileName();

					using (var stream = System.IO.File.Create(filePath))
					{
						await formFile.CopyToAsync(stream);
					}

					fileNames.Add(Path.GetFileName(filePath));
				}
			}

			return new FileResult() { FileNames = fileNames, Submitter = userId };
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
