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
	public class FileUploadController : Controller
	{
		static readonly string ServerUploadFolder = Path.GetTempPath();

		async Task HandleUploadRequest(string localFolder, string newFileName, List<IFormFile> files)
		{
			if (!Directory.Exists(localFolder))
			{
				Directory.CreateDirectory(localFolder);
			}

			Debug.WriteLine("Upload start for upload path: " + localFolder);

			var firstFile = files[0];


			//write the file
			var localFileName = firstFile.FileName;//funky hash name
			var newFilePath = Path.Combine(localFolder, newFileName);
			Debug.WriteLine($"saved file {localFileName} to be renamed to {newFilePath}");

			System.IO.File.Delete(newFilePath);
			System.IO.File.Move(localFileName, newFilePath);

		}

		/// <summary>
		/// Post the avatar file with the userId.
		/// </summary>
		/// <returns></returns>
		[HttpPost]
		[Route("avatar")]
		public async Task UploadAvatar([FromQuery] string userId, [FromForm] List<IFormFile> files)
		{
			await HandleUploadRequest(ServerUploadFolder, userId, files);
		}


	}
}
