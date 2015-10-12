using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptMethodReturnStatement : IStatement
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeMethodReturnStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptMethodReturnStatement(
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            CodeMethodReturnStatement statement,
            CodeGeneratorOptions options)
        {
            _statementFactory = statementFactory;
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }

        public string Expand()
        {
            var returnExpression = _expressionFactory.GetExpression(_statement.Expression, _options).Evaluate();
            return $"return {returnExpression};";
        }
    }
}