using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fonlow.DocComment
{
    public static class StringFunctions
    {
        public static string TrimIndent(string s)
        {
            if (s == null)
                return null;

            if (String.IsNullOrWhiteSpace(s))
                return String.Empty;

            var ss = s.Split(new string[] { Environment.NewLine, "\n" }, StringSplitOptions.None);
            var noIndent = ss.Select(d => d.Trim()).ToArray();
            if (noIndent.Length == 1)
            {
                return noIndent[0];
            }

            return String.Join(Environment.NewLine, noIndent).Trim('\r', '\n');
        }

        public static string[] TrimIndentsOfArray(IEnumerable<string> ss)
        {
            if (ss == null)
                return null;

            return ss.Select(d => TrimIndent(d)).ToArray();
        }

        public static string IndentedArrayToString(IEnumerable<string> ss)
        {
            if (ss == null)
                return null;

            return String.Join(Environment.NewLine, TrimIndentsOfArray(ss));
        }
    }
}
