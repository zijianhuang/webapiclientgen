using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fonlow.CodeDom.Web
{
	public sealed class WebApiDocSingleton
	{
		private static readonly Lazy<WebApiDocSingleton> lazy =
			new Lazy<WebApiDocSingleton>(() => new WebApiDocSingleton());

		public static WebApiDocSingleton Instance { get { return lazy.Value; } }

		public static WebApiDocSingleton InitOnce(Fonlow.DocComment.DocCommentLookup lookup)
		{
			var r = Instance;
			r.Lookup = lookup;
			return r;
		}

		/// <summary>
		/// It might be null if no doc comment for the Web API.
		/// </summary>
		public Fonlow.DocComment.DocCommentLookup Lookup { get; private set; }

		private WebApiDocSingleton()
		{
		}
	}
}
