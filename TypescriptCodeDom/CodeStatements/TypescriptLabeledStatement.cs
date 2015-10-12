using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptLabeledStatement : IStatement
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeLabeledStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptLabeledStatement(
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            CodeLabeledStatement statement,
            CodeGeneratorOptions options)
        {
            _statementFactory = statementFactory;
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }

        public string Expand()
        {
            var statement = _statementFactory.GetStatement(_statement.Statement, _options).Expand();
            return $"{_statement.Label}:{Environment.NewLine}{statement};";
        }
    }
}