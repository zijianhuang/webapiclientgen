using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fonlow.Poco2Client
{
	public static class CommentsHelper
	{
		/// <summary>
		/// Generate doc comments from attributes, and the attributes are sorted according to RequiredAttribute
		/// </summary>
		/// <param name="attributes"></param>
		/// <param name="attribueCommentDic"></param>
		/// <returns></returns>
		public static string[] GenerateCommentsFromAttributes(
#pragma warning disable CA1002 // Do not expose generic lists, but I need to sort it.
		List<Attribute> attributes,
#pragma warning restore CA1002 // Do not expose generic lists
		IDictionary<Type, Func<object, string>> attribueCommentDic)
		{
			List<string> ss = new List<string>();
			attributes.Sort((x, y) =>
			{
				// Special-case RequiredAttribute so that it shows up on top
				if (x is RequiredAttribute)
				{
					return -1;
				}
				if (y is RequiredAttribute)
				{
					return 1;
				}

				return 0;
			});

			foreach (Attribute attribute in attributes)
			{
				if (attribueCommentDic.TryGetValue(attribute.GetType(), out Func<object, string> textGenerator))
				{
					ss.Add(textGenerator(attribute));
				}
			}

			return ss.ToArray();
		}
	}
}
