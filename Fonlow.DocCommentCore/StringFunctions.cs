using System;
using System.Collections.Generic;
using System.Linq;

namespace Fonlow.DocComment
{
	public static class StringFunctions
	{
		/// <summary>
		/// Trim indent of lines presented in a string, and get a new string
		/// </summary>
		/// <param name="s"></param>
		/// <returns>lines in a string but without indent.</returns>
		public static string TrimIndentsOfMultiLineText(string s)
		{
			var noIndent = TrimIndentedMultiLineTextToArray(s);
			if (noIndent == null)
				return null;

			if (noIndent.Length == 1)
			{
				return noIndent[0];
			}

			return String.Join(Environment.NewLine, noIndent).Trim('\r', '\n');
		}

		/// <summary>
		/// Trim indent of lines presented in a string, and get a new string array
		/// </summary>
		/// <param name="s"></param>
		/// <returns>String array, and each member has no indent.</returns>
		public static string[] TrimIndentedMultiLineTextToArray(string s)
		{
			if (s == null)
				return null;

			if (String.IsNullOrWhiteSpace(s))
				return null;

			var ss = s.Split(new string[] { Environment.NewLine, "\n" }, StringSplitOptions.None);
			var noIndent = ss.Select(d => d.Trim()).ToArray();
			return noIndent;
		}

		/// <summary>
		/// Try indent of lines presented in string array, even if each member may contain line breaks, and return a new string list.
		/// </summary>
		/// <param name="ss"></param>
		/// <returns></returns>
		public static IList<string> TrimIndentsOfArray(IEnumerable<string> ss)
		{
			if (ss == null)
				return null;

			List<string> list = new List<string>();
			foreach (var item in ss)
			{
				var ar = TrimIndentedMultiLineTextToArray(item);
				if (ar != null)
					list.AddRange(ar);
			}

			return list;
		}

		/// <summary>
		/// Remove indent, and trim the head empty line and trial empty line.
		/// </summary>
		/// <param name="ss"></param>
		/// <returns></returns>
		public static IList<string> TrimTrimIndentsOfArray(IEnumerable<string> ss)
		{
			var list = TrimIndentsOfArray(ss);
			if (list == null)
				return null;

#pragma warning disable CA1820 // Test for empty strings using string length
			if (list[0] == String.Empty)
				list.RemoveAt(0);
#pragma warning restore CA1820 // Test for empty strings using string length

#pragma warning disable CA1820 // Test for empty strings using string length
			if (list[list.Count - 1] == String.Empty)
			{
				list.RemoveAt(list.Count - 1);
			}
#pragma warning restore CA1820 // Test for empty strings using string length

			return list;
		}

		/// <summary>
		/// Convert a string array to string containing line breaks, and remove indents.
		/// </summary>
		/// <param name="ss"></param>
		/// <returns></returns>
		public static string IndentedArrayToString(IEnumerable<string> ss)
		{
			if (ss == null)
				return null;

			return String.Join(Environment.NewLine, TrimIndentsOfArray(ss));
		}
	}
}
