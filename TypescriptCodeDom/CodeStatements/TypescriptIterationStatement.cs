using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptIterationStatement : IStatement
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeIterationStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptIterationStatement(
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            CodeIterationStatement statement,
            CodeGeneratorOptions options)
        {
            _statementFactory = statementFactory;
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }

        public string Expand()
        {
            var statements = _statement.Statements.GetStatementsFromCollection(_statementFactory, _options);
            var initStatement = _statementFactory.GetStatement(_statement.InitStatement, _options).Expand();
            var incrementStatement = _statementFactory.GetStatement(_statement.IncrementStatement, _options).Expand();
            var testExpression = _expressionFactory.GetExpression(_statement.TestExpression, _options).Evaluate();

            return $"for ({initStatement}; {testExpression}; {incrementStatement} {{{statements}{Environment.NewLine}}}";

        }
    }
}