using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions.Snippet
{
    class TypescriptSnippetExpression : ITypescriptSnippetExpression
    {
        private readonly CodeSnippetExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptSnippetExpression(
            CodeSnippetExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            return _codeExpression.Value;
        }
    }
}