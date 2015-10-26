using System;

namespace Fonlow.TypeScriptCodeDom
{
    public static class KeywordHandler
    {
        static readonly System.Collections.Generic.HashSet<string> keywords = new System.Collections.Generic.HashSet<string>(
           new string[] {
               "any", "number", "boolean", "string", "void",
               "new", "public", "super", "typeof", "instanceof", "this", "function",
               "export", "declare", "class", "extends", "Implements"
           }

        );

        public static bool IsAKeyword(string s)
        {
            return keywords.Contains(s);
        }

        public static string CreateEscapedIdentifier(string value)
        {
            return $"_{value}";
        }

        public static bool IsValidIdentifier(string value)
        {
            return !IsAKeyword(value);
        }

        public static string CreateValidIdentifier(string value)
        {
            return keywords.Contains(value) ? CreateEscapedIdentifier(value) : value;
        }

        public static void ValidateIdentifier(string value)
        {
            if (keywords.Contains(value))
                throw new ArgumentException("Keywords cannot be used as an identifier", "value");
        }

    }

}
