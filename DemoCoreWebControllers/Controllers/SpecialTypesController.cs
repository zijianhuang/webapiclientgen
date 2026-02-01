using DemoWebApi.DemoData;
using DemoWebApi.DemoData.Base;
using DemoWebApi.DemoDataEx;
using DemoWebApi.Models;
using Fonlow.Auth.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace DemoCoreWeb.Controllers
{
	[ApiController]
	[Route("api/SpecialTypes")]
	public class SpecialTypesController : ControllerBase
	{
		/// <summary>
		/// Anonymous Dynamic of C#
		/// </summary>
		/// <returns>dyanmic things</returns>
		[HttpGet]
		[Route("AnonymousDynamic")]
		public dynamic GetAnonymousDynamic()
		{
			return new
			{
				Id = 12345,
				Name = "Something",
			};
		}

		/// <summary>
		/// Async function returing dynamic
		/// </summary>
		/// <returns></returns>
		[HttpGet] //.net core up to 3.1 does not give correct return type in ApiExplorer.
		[Route("AnonymousDynamic2")]
		public async Task<dynamic> GetAnonymousDynamic2()
		{
			return new
			{
				Id = 12345,
				Name = "Something",
			};
		}

		[HttpGet]
		[Route("AnonymousObject")]
		public object GetAnonymousObject()
		{
			return new
			{
				Id = 12345,
				Name = "Something",
			};
		}

		/// <summary>
		/// Async function returning object
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		[Route("AnonymousObject2")]
		public async Task<object> GetAnonymousObject2()
		{
			return new
			{
				Id = 12345,
				Name = "Something",
			};
		}

		[HttpPost]
		[Route("AnonymousObject")]
		public object PostAnonymousObject([FromBody] dynamic obj)
		{
			if (obj == null)
			{
				System.Diagnostics.Debug.WriteLine("dynamic null");
				return new
				{
					Id = 12345,
					Name = "Something",
				};

			}
			obj.Id = obj.Id + "1";
			obj.Name = obj.Name + "1";
			return obj;
		}

		/// <summary>
		/// Async returning object, Post dynamic
		/// </summary>
		/// <param name="obj"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("AnonymousObject2")]
		public async Task<object> PostAnonymousObject2([FromBody] dynamic obj)
		{
			if (obj == null)
			{
				System.Diagnostics.Debug.WriteLine("dynamic null");
				return new
				{
					Id = 12345,
					Name = "Something",
				};

			}
			obj.Id = obj.Id + "1";
			obj.Name = obj.Name + "1";
			return obj;
		}

		/// <summary>
		/// Very complex generic
		/// </summary>
		/// <param name="body"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("VeryComplexGeneric")]
		public MyGeneric<MyGeneric<double, MyGenericInt, Entity>, ZListCheck, MimsResult<TextJsonPerson>> PostVeryComplexGeneric([FromBody] MyGeneric<Person, MyGenericInt, MyGeneric<decimal, ZListCheck, Company>> body){
			return new MyGeneric<MyGeneric<double, MyGenericInt, Entity>, ZListCheck, MimsResult<TextJsonPerson>>();
		}

	}
}
