namespace TypescriptCodeDom.Common.Keyword
{
    public interface ITypescriptKeywordsHandler
    {
        bool IsAKeyword(string value);
        string CreateEscapedIdentifier(string value);
        bool IsValidIdentifier(string value);
        string CreateValidIdentifier(string value);
        void ValidateIdentifier(string value);
    }
}