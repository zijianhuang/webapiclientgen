using Fonlow.PoemsApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PoemsApp.Controllers
{
	/// <summary>
	/// Annotations management
	/// </summary>
	[ApiController]
	[Route("api/[controller]")]
	public class AnnotationsController : ControllerBase
	{
		public AnnotationsController()
		{
		}

		/// <summary>
		/// Delete along with what in poemAnnotationMap.
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
		/// <param name="annotation"></param>
		/// <returns></returns>
		[HttpPost]
		public Guid Add([FromBody] Annotation annotation)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="annotation"></param>
		[HttpPut]
		public void Update([FromBody] Annotation annotation)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Get annotation. Support ZH Convert.
		/// </summary>
		/// <param name="id"></param>
		/// <param name="convertZH"></param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public Annotation Get([FromQuery] Guid id, [FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Get all annotation briefs. Support ZH Convert.
		/// </summary>
		/// <param name="convertZH"></param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet("allDic")]
		public IDictionary<Guid, AnnotationBrief> GetAnnotationBriefsDic([FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();
		}

		[AllowAnonymous]
		[HttpGet("all")]
		public AnnotationBrief[] GetAnnotationBriefs([FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();
		}

		[HttpGet("Orphaned")]
		public AnnotationBrief[] GetOrphaned()
		{
			throw new NotImplementedException();
		}

		[HttpPost("Orphaned")]
		public int DeleteOrphaned([FromBody] Guid[] ids)
		{
			throw new NotImplementedException();
		}

		[HttpGet("PoemCountOfAnnotations")]
		public AnnotationPoemCount[] GetPoemCountOfAnnotations()
		{
			throw new NotImplementedException();
		}
	}
}
