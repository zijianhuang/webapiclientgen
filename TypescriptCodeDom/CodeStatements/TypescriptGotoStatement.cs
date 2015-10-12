using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptGotoStatement : IStatement
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeGotoStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptGotoStatement(
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            CodeGotoStatement statement,
            CodeGeneratorOptions options)
        {
            _statementFactory = statementFactory;
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }

        public string Expand()
        {
            return $"goto {_statement.Label};";
        }
    }
}