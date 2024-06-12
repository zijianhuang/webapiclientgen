using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace Fonlow.DocComment
{ 
	/// <summary>
	/// Helper functions of accessing doc comments of a method
	/// </summary>
	public static class DocCommentHelper
	{
		static readonly string newLine=Environment.NewLine;

		public static string GetSummary(docMember m)
		{
			if (m == null || m.summary == null || m.summary.Text == null || m.summary.Text.Length == 0)
			{
				return null;
			}

			IList<string> noIndent = StringFunctions.TrimTrimIndentsOfArray(m.summary.Text);
			return String.Join(newLine, noIndent);
		}

		public static string GetReturnComment(docMember m)
		{
			if (m == null || m.returns == null || m.returns.Text == null || m.returns.Text.Length == 0)
			{
				return null;
			}

			IList<string> noIndent = StringFunctions.TrimTrimIndentsOfArray(m.returns.Text);
			return String.Join(newLine, noIndent);
		}

		public static string GetParameterComment(docMember m, string name)
		{
			if (m == null || m.param == null)
			{
				return null;
			}

			docMemberParam mc = m.param.SingleOrDefault(d => d.name == name);
			if (mc == null || mc.Text == null || mc.Text.Length == 0)
			{
				return null;
			}

			IList<string> noIndent = StringFunctions.TrimTrimIndentsOfArray(mc.Text);
			return String.Join(newLine, noIndent);
		}
	}
}
