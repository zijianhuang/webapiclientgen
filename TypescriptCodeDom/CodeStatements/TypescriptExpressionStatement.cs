using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptExpressionStatement : IStatement
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeExpressionStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptExpressionStatement(
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            CodeExpressionStatement statement,
            CodeGeneratorOptions options)
        {
            _statementFactory = statementFactory;
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }

        public string Expand()
        {
            var expression = _expressionFactory.GetExpression(_statement.Expression, _options);
            return $"{expression.Evaluate()};";
        }
    }
}