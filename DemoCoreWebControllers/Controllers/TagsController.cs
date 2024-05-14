using Fonlow.PoemsApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PoemsApp.Controllers
{
	/// <summary>
	/// Tags management
	/// </summary>
	[Route("api/[controller]")]
	public class TagsController : ControllerBase
	{

		/// <summary>
		/// Delete along with what in poemTagMap.
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpDelete]
		public bool Delete([FromQuery] Guid id)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="tag"></param>
		/// <returns></returns>
		[HttpPost]
		public Guid Add([FromBody] Tag tag)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="tag"></param>
		[HttpPut]
		public void Update([FromBody] Tag tag)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Get tag. Support ZH Convert.
		/// </summary>
		/// <param name="id"></param>
		/// <param name="convertZH"></param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public Tag Get([FromQuery] Guid id, [FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Get all tags. Support ZH Convert.
		/// </summary>
		/// <param name="convertZH"></param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet("all")]
		public Tag[] GetAll([FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Get all tags as dictionary. Support ZH Convert.
		/// </summary>
		/// <param name="convertZH"></param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet("allDic")]
		public IDictionary<Guid, Tag> GetAllDic([FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();
		}

		[HttpGet("Orphaned")]
		public Tag[] GetOrphaned()
		{
			throw new NotImplementedException();
		}

		[HttpPost("Orphaned")]
		public int DeleteOrphaned([FromBody] Guid[] ids)
		{
			throw new NotImplementedException();
		}

		[HttpGet("PoemCountOfTags")]
		public TagPoemCount[] GetPoemCountOfTags()
		{
			throw new NotImplementedException();
		}

	}
}
