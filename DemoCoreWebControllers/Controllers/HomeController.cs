using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc;

namespace DemoWebApi.Controllers
{
	[Route("api/[controller]")]
	public class HomeController : Controller
	{
		[HttpGet]
		public ActionResult Index()
		{
			ViewBag.Title = "Home Page";

			return View();
		}
	}
}
