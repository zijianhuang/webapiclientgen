using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fonlow.DocComment
{
    public static class StringFunctions
    {
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

        public static IList<string> TrimTrimIndentsOfArray(IEnumerable<string> ss)
        {
            var list = TrimIndentsOfArray(ss);
            if (list == null)
                return null;

            if (list[0] == String.Empty)
                list.RemoveAt(0);

            if (list[list.Count - 1] == String.Empty)
            {
                list.RemoveAt(list.Count - 1);
            }

            return list;
        }

        public static string IndentedArrayToString(IEnumerable<string> ss)
        {
            if (ss == null)
                return null;

            return String.Join(Environment.NewLine, TrimIndentsOfArray(ss));
        }
    }
}
