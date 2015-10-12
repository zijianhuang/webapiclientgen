using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptRemoveEventStatement : IStatement
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeRemoveEventStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptRemoveEventStatement(
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            CodeRemoveEventStatement statement,
            CodeGeneratorOptions options)
        {
            _statementFactory = statementFactory;
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }

        public string Expand()
        {
            var eventExpression = _expressionFactory.GetExpression(_statement.Event, _options).Evaluate();
            var listenerExpression = _expressionFactory.GetExpression(_statement.Listener, _options).Evaluate();

            return $"{eventExpression}.remove({listenerExpression});";
        }
    }
}