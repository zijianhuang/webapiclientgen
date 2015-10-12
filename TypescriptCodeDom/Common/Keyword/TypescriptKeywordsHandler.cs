using System;
using System.Collections.Generic;

namespace TypescriptCodeDom.Common.Keyword
{
    public class TypescriptKeywordsHandler : ITypescriptKeywordsHandler
    {
        private readonly HashSet<string> _keywords;

        public TypescriptKeywordsHandler()
        {
            _keywords = new HashSet<string>();

            AddAllBaseKeywords();
            AddAllPredefinedTypes();

        }

        private void AddAllPredefinedTypes()
        {
            _keywords.Add("any");
            _keywords.Add("number");
            _keywords.Add("boolean");
            _keywords.Add("string");
            _keywords.Add("void");
        }

        private void AddAllBaseKeywords()
        {
            _keywords.Add("new");
            _keywords.Add("public");
            _keywords.Add("super");
            _keywords.Add("typeof");
            _keywords.Add("instanceof");
            _keywords.Add("this");
            _keywords.Add("function");
            _keywords.Add("export");
            _keywords.Add("declare");
            _keywords.Add("class");
            _keywords.Add("extends");
            _keywords.Add("implements");
        }

        public bool IsAKeyword(string value)
        {
            return _keywords.Contains(value);
        }

        public string CreateEscapedIdentifier(string value)
        {
            return $"_{value}";
        }

        public bool IsValidIdentifier(string value)
        {
            return !IsAKeyword(value);
        }

        public string CreateValidIdentifier(string value)
        {
            return _keywords.Contains(value) ? CreateEscapedIdentifier(value) : value;
        }

        public void ValidateIdentifier(string value)
        {
            if (_keywords.Contains(value))
                throw new ArgumentException("Keywords cannot be used as an identifier", nameof(value));
        }
    }
}
