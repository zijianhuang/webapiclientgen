using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptCommentStatement : IStatement
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeCommentStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptCommentStatement(
            IExpressionFactory expressionFactory,
            CodeCommentStatement statement,
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }

        public string Expand()
        {
            return $"/*{_statement.Comment.Text}*/";
        }
    }
}