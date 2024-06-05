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
	public class NumberedAnnotationsController : ControllerBase
	{
		public NumberedAnnotationsController()
		{
		}

		/// <summary>
		/// Delete along with what in poemNumberedAnnotationMap.
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
		/// <param name="numberedAnnotation"></param>
		/// <returns></returns>
		[HttpPost]
		public Guid Add([FromBody] NumberedAnnotation numberedAnnotation)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Add multiple annotations
		/// </summary>
		/// <param name="poemId"></param>
		/// <param name="orderNumbers"></param>
		/// <returns></returns>
		[HttpPost("poem/{poemId}")]
		public NumberedAnnotation[] AddMuitiple(Guid poemId, [FromBody] int[] orderNumbers)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Update annotation
		/// </summary>
		/// <param name="numberedAnnotation"></param>
		[HttpPut]
		public void Update([FromBody] NumberedAnnotation numberedAnnotation)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Update the orders of numbered annotations in a transaction
		/// </summary>
		/// <param name="idAndOrderArray"></param>
		[HttpPut("BulkOrderNumbers")]
		public void BulkUpdateOrderNumbers([FromBody] Tuple<Guid, int>[] idAndOrderArray)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Update Order Number
		/// </summary>
		/// <param name="id"></param>
		/// <param name="orderNumber"></param>
		[HttpPut("OrderNumber")]
		public void UpdateOrderNumber([FromQuery] Guid id, [FromQuery] int orderNumber)
		{
			throw new NotImplementedException();
		}

		/// <summary>
		/// Get numberedAnnotation. Support ZH Convert.
		/// </summary>
		/// <param name="id"></param>
		/// <param name="convertZH"></param>
		/// <returns></returns>
		[AllowAnonymous]
		[HttpGet]
		[return: System.Diagnostics.CodeAnalysis.MaybeNull]
		public NumberedAnnotation Get([FromQuery] Guid id, [FromHeader(Name = "convertZH")] string convertZH)
		{
			throw new NotImplementedException();
		}

	}
}
