using Fonlow.PoemsApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PoemsApp.Controllers
{
	/// <summary>
	/// Album specific operations
	/// </summary>
	[ApiController]
	[Route("api/[controller]")]
	public class AlbumsController : ControllerBase
	{
		public AlbumsController()
		{
		}

		/// <summary>
		/// Delete along with what in poemAlbumMap.
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpDelete]
		public bool Delete([FromQuery] Guid id)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Add album. If publisheDate is not defined, it will be now.
		/// </summary>
		/// <param name="album"></param>
		/// <returns></returns>
		[HttpPost]
		public Album Add([FromBody] Album album)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="album"></param>
		[HttpPut]
		public void Update([FromBody] Album album)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Get Album. Support ZH Convert.
		/// </summary>
		/// <param name="id"></param>
		/// <param name="convertZH"></param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public Album Get([FromQuery] Guid id, [FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();

		}

		/// <summary>
		/// Get all albums. Support ZH Convert.
		/// </summary>
		/// <param name="convertZH"></param>
		/// <param name="timezoneOffset">int in header</param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet("all")]
		public Album[] GetAll([FromHeader(Name = "convertZH")] string convertZH, [FromHeader] int timezoneOffset)
		{
			throw new NotImplementedException();
		}

		bool IsAuthor => User.Identity.Name != null;

		/// <summary>
		/// Get all albums as dictionary. Support ZH Convert.
		/// </summary>
		/// <param name="convertZH"></param>
		/// <param name="timezoneOffset">int in header</param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet("allDic")]
		public IDictionary<Guid, Album> GetAllDic([FromHeader(Name = "convertZH")] string convertZH, [FromHeader] int timezoneOffset)
		{
			throw new NotImplementedException();
		}
	}
}
