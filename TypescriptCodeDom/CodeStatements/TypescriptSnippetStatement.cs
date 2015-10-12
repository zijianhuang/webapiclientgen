using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptSnippetStatement : IStatement
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeSnippetStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptSnippetStatement(
            IExpressionFactory expressionFactory,
            CodeSnippetStatement statement,
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }

        public string Expand()
        {
            return _statement.Value;
        }
    }
}