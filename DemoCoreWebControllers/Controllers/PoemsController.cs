using Fonlow.PoemsApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace PoemsApp.Controllers
{
	/// <summary>
	/// Poems operations; associations with tags, albums and annotations.
	/// </summary>
	[ApiController]
	[Route("api/[controller]")]
	public class PoemsController : ControllerBase
	{
		public PoemsController()
		{
		}

		/// <summary>
		/// Delete poem, along with association with albums. However, associated tags and annotations are still in maps.
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpDelete]
		public bool Delete([FromQuery] Guid id)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Add poem. If created is undefined, it will be now. And modified is always now.
		/// </summary>
		/// <param name="poem"></param>
		/// <returns>Id of newly added</returns>
		[HttpPost]
		public Poem Add([FromBody] Poem poem)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Update poem.
		/// </summary>
		/// <param name="poem"></param>
		[HttpPut]
		public void Update([FromBody] Poem poem)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Fix the problem of escaped unicode string, because of the DomSanitizer of Angular. Once off solution
		/// </summary>
		/// <returns></returns>
		[HttpPut("EscapeStringToUnicode")]
		public async Task EscapeStringToUnicode()
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="dt"></param>
		[HttpPut("UpdatePublished")]
		public void UpdatePublished([FromQuery] Guid poemId, [FromBody] DateOnly? dt)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Include TagMap and AlbumMap. Support ZH Convert.
		/// </summary>
		/// <param name="id"></param>
		/// <param name="convertZH"></param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public Poem Get([FromQuery] Guid id, [FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// All, OrderByDescending published. Support ZH Convert. If the user is not loggedin, not returning those not yet published.
		/// </summary>
		/// <param name="convertZH"></param>
		/// <param name="timezoneOffset">int in header</param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet("AllBriefs")]
		public PoemBrief[] GetBriefsOfPoems([FromHeader(Name = "convertZH")] string convertZH, [FromHeader] int timezoneOffset)
		{
			throw new NotImplementedException();
		}

		bool IsAuthor => User.Identity.Name != null;

		/// <summary>
		/// Search by keywords, separated by comma and Chinese comma. Support ZH Convert.
		/// </summary>
		/// <param name="keywords"></param>
		/// <param name="convertZH"></param>
		/// <param name="timezoneOffset">int in header</param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpPost("ByKeywords")]
		public PoemBrief[] SearchByKeywords([FromBody] string keywords, [FromHeader(Name = "convertZH")] string convertZH, [FromHeader] int timezoneOffset) //better to use POST for Chinese characters.
		{
			throw new NotImplementedException();
		}

		[HttpGet("ByAnnotation")]
		public PoemBrief[] SearchByAnnotation([FromQuery] Guid annotationId, [FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();
		}

		#region Poems Albums

		/// <summary>
		/// Associate with existing albums.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="albumIds"></param>
		[HttpPut("albums")]
		public void AssociateWithAlbums([FromQuery] Guid poemId, [FromBody] Guid[] albumIds)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// All poems of album, order by published. Support ZH Convert.
		/// </summary>
		/// <param name="albumId"></param>
		/// <param name="convertZH">string in header</param>
		/// <param name="timezoneOffset">int in header</param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet("GetOfAlbum")]
		public async Task<Poem[]> GetOfAlbum([FromQuery] Guid albumId, [FromHeader(Name = "convertZH")] string convertZH, [FromHeader] int timezoneOffset)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="albumId"></param>
		/// <param name="timezoneOffset">int in header</param>
		/// <returns></returns>
		[HttpGet("GetPoemBriefsOfAlbum")]
		public PoemBrief[] GetPoemBriefsOfAlbum([FromQuery] Guid albumId, [FromHeader] int timezoneOffset)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Dissociate album.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="albumId"></param>
		[HttpDelete("DissociateAlbum")]
		public void DissociateAlbum([FromQuery] Guid poemId, [FromQuery] Guid albumId)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Associate album with existing poems.
		/// </summary>
		/// <param name="albumId"></param>
		/// <param name="poemIds"></param>
		[HttpPut("poemsToAlbum")]
		public void AssociateAlbumWithPoems([FromQuery] Guid albumId, [FromBody] Guid[] poemIds)
		{
			throw new NotImplementedException();
		}

		#endregion

		#region Poems and Tags

		/// <summary>
		/// Associate with existing tags.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="existingTagIds"></param>
		[HttpPut("existingTags")]
		public void AssociateWithExistingTags([FromQuery] Guid poemId, [FromBody] Guid[] existingTagIds)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Associate poem with new tag names.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="newTagNames"></param>
		/// <returns>New tag objects based on newTagNames</returns>
		[HttpPut("newTagNames")]
		public Tag[] AssociateWithNewTagNames([FromQuery] Guid poemId, [FromBody] string[] newTagNames)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Save the new tag, and associate with the poem.
		/// If the tag exists, return null. Nevertheless, the client should check if the tag had actually been in the tag list, to avoid exceptions.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="newTagName"></param>
		/// <returns>New tag, or null if the tag exists</returns>
		[HttpPut("newTagName")]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public Tag AssociateWithNewTagName([FromQuery] Guid poemId, [FromQuery] string newTagName)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Add new poem with existing tags, and new tag names.
		/// </summary>
		/// <param name="poemAndNewTags">new poem, existing Tag Ids, and new tag names</param>
		/// <returns>Poem Id and new tag objects</returns>
		[HttpPost("AddWithNewTagNames")]
		public Poem AddWithNewTagNames([FromBody] Tuple<Poem, string[]> poemAndNewTags)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Poem with Tags
		/// </summary>
		/// <param name="poemAndTags"></param>
		/// <returns></returns>
		[HttpPost("addWithExistingTags")]
		public Poem AddWithExistingTags([FromBody] Tuple<Poem, Guid[]> poemAndTags)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// DissociateT tag.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="tagId"></param>
		[HttpDelete("DissociateTag")]
		public void DissociateTag([FromQuery] Guid poemId, [FromQuery] Guid tagId)
		{
			throw new NotImplementedException();
		}

		#endregion

		#region Poems and Annotations

		/// <summary>
		/// Associate with existing annotations.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="existingAnnotationIds"></param>
		[HttpPut("existingAnnotations")]
		public void AssociateWithExistingAnnotations([FromQuery] Guid poemId, [FromBody] Guid[] existingAnnotationIds)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Associate poem with new tag names.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="newAnnotationNames"></param>
		/// <returns>New annotation objects based on newAnnotationNames</returns>
		[HttpPut("newAnnotationNames")]
		public AnnotationBrief[] AssociateWithNewAnnotationNames([FromQuery] Guid poemId, [FromBody] string[] newAnnotationNames)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Save the new annotation, and associate with the poem.
		/// If the annotation exists, return null. Nevertheless, the client should check if the annotation had actually been in the annotation list, to avoid exceptions.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="newAnnotationName"></param>
		/// <returns>New annotation, or null if the annotation exists</returns>
		[HttpPut("newAnnotationName")]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public AnnotationBrief AssociateWithNewAnnotationName([FromQuery] Guid poemId, [FromQuery] string newAnnotationName)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Add new poem with existing annotations and new annotation names.
		/// </summary>
		/// <param name="poemAndAnnotations">new poem, existing Annotation Ids, and new annotation names</param>
		/// <returns>Poem Id and new annotation objects</returns>
		[HttpPut("AddWithExistingAnnotations")]
		public Poem AddWithExistingAnnotations([FromBody] Tuple<Poem, Guid[]> poemAndAnnotations)
		{
			throw new NotImplementedException();
		}

		[HttpPut("AddWithNewAnnotationNames")]
		public Poem AddWithNewAnnotationNames([FromBody] Tuple<Poem, string[]> poemAndAnnotations)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Disassociate annotation.
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="annotationId"></param>
		[HttpDelete("DissociateAnnotation")]
		public void DissociateAnnotation([FromQuery] Guid poemId, [FromQuery] Guid annotationId)
		{
			throw new NotImplementedException();
		}

		#endregion

		[HttpPost("PoemCollection")]
		public async Task ImportPoemCollection([FromBody] PoemCollection collection)
		{
			throw new NotImplementedException();
		}

		#region Export collection
		[HttpGet("PoemCollection")]
		public PoemCollection GetPoemCollection()
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="timezoneOffset">In request headers</param>
		/// <returns></returns>
		[HttpGet("PoemCollectionPublished")]
		public PoemCollection GetPoemCollectionPublished([FromHeader] int timezoneOffset)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="timezoneOffset">timezoneOffset in headers</param>
		/// <returns></returns>
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		[HttpGet("PoemCollectionPublishedInOtherChineseWriting")]
		public PoemCollection GetPoemCollectionPublishedInOtherChineseWriting([FromHeader] int timezoneOffset)
		{
			return GetPoemCollectionInOtherChineseWriting(true, timezoneOffset);
		}

		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		[HttpGet("PoemCollectionInOtherChineseWriting")]
		public PoemCollection GetPoemCollectionInOtherChineseWriting()
		{
			return GetPoemCollectionInOtherChineseWriting(false);
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="publishedOnly"></param>
		/// <param name="timezoneOffset">Used only when publishedOnly=true. Header parameter.</param>
		/// <returns></returns>
		PoemCollection GetPoemCollectionInOtherChineseWriting(bool publishedOnly, int timezoneOffset=0)
		{
			throw new NotImplementedException();
		}
		#endregion
		[HttpGet("PoemsWithInternalImageId")]
		public PoemBrief[] GetPoemsWithInternalImageId([FromQuery] Guid imageId)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Img Src Url to multiple poem Ids
		/// </summary>
		/// <returns></returns>
		[HttpGet("AllNotLocalImagesOfPoems")]
		public Dictionary<string, Guid[]> GetAllNotLocalImagesOfPoems()
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Scan all poems' HTML to create mapping from imageIds to poems. Dic of imageId to poems with img local.
		/// </summary>
		/// <returns></returns>
		[HttpPost("AssociatedPoemsOfImages")]
		public IDictionary<Guid, PoemBrief[]> GetAssociatedPoemsOfAllImages()
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Reconcile among all images, poemImageMaps, and actually img local
		/// </summary>
		/// <returns></returns>
		[HttpPost("AuditAndReconcile")]
		public async Task<int> AuditAndReconcile()
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Just for maintenance, while the plaintext should be produced in the frontend.
		/// </summary>
		[HttpPost("UpdatePlainTextOfHtmlPoems")]
		public void UpdatePlainTextOfHtmlPoems()
		{
			throw new NotImplementedException();
		}

		[HttpGet("TotalCountOfStanza")]
		public int GetTotalCountOfStanza()
		{
			throw new NotImplementedException();
		}

		[HttpDelete("all")]
		public async Task ClearAllTables()
		{
			throw new NotImplementedException();
		}


	}
}
