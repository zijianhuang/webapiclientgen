using System;

namespace Fonlow.CodeDom.Web
{
	/// <summary>
	/// Store the doc comment of the Web API assembly.
	/// </summary>
	public sealed class WebApiDocSingleton
	{
		private static readonly Lazy<WebApiDocSingleton> lazy =
			new(() => new WebApiDocSingleton());

		public static WebApiDocSingleton Instance { get { return lazy.Value; } }

		public static WebApiDocSingleton InitOnce(Fonlow.DocComment.DocCommentLookup lookup)
		{
			var r = Instance;
			if (r.initialized)
			{
				throw new InvalidOperationException("Already initialzied once.");
			}

			r.initialized = true;

			r.Lookup = lookup;
			return r;
		}

		private bool initialized;
		/// <summary>
		/// It might be null if no doc comment for the Web API.
		/// </summary>
		public Fonlow.DocComment.DocCommentLookup Lookup { get; private set; }

		private WebApiDocSingleton()
		{
		}
	}
}
