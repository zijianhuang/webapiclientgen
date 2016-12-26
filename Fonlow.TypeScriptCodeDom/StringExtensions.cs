using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fonlow.Text
{
    public static class StringExtensions
    {
        public static string ToCamelCase(this string s)
        {
            if (string.IsNullOrWhiteSpace(s) || !char.IsUpper(s[0]))
            {
                return s;
            }

            char[] chars = s.ToCharArray();

            for (int i = 0; i < chars.Length; i++)
            {
                if (i == 1 && !char.IsUpper(chars[i]))
                {
                    break;
                }

                bool hasNext = (i + 1 < chars.Length);
                if (i > 0 && hasNext && !char.IsUpper(chars[i + 1]))
                {
                    break;
                }

                char c;
                c = char.ToLower(chars[i], System.Globalization.CultureInfo.InvariantCulture);
                chars[i] = c;
            }

            return new string(chars);
        }

    }
}
