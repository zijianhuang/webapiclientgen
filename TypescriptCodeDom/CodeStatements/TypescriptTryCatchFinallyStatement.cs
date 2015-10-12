using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using TypescriptCodeDom.CodeExpressions;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptTryCatchFinallyStatement : IStatement
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeTryCatchFinallyStatement _statement;
        private readonly CodeGeneratorOptions _options;
        private TypescriptTypeMapper _typescriptTypeMapper;

        public TypescriptTryCatchFinallyStatement(
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            CodeTryCatchFinallyStatement statement,
            CodeGeneratorOptions options)
        {
            _statementFactory = statementFactory;
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
            _typescriptTypeMapper = new TypescriptTypeMapper();
        }

        public string Expand()
        {
            var tryStatements = _statement.TryStatements.GetStatementsFromCollection(_statementFactory, _options);
            var tryClause = $"try {{{tryStatements}{Environment.NewLine}}}";

            var catchClauses = _statement.CatchClauses
                .OfType<CodeCatchClause>()
                .Select(clause =>
                {
                    var type = _typescriptTypeMapper.GetTypeOutput(clause.CatchExceptionType);
                    var catchStatements = clause.Statements.GetStatementsFromCollection(_statementFactory, _options);
                    return $"catch({clause.LocalName}: {type}){{{catchStatements}{Environment.NewLine}}}";
                })
                .Aggregate((previous, current) => $"{previous}{Environment.NewLine}{current}");

            string finallyClause = string.Empty;
            if (_statement.FinallyStatements != null && _statement.FinallyStatements.Count > 1)
            {
                var finallyStatements = _statement.FinallyStatements.GetStatementsFromCollection(_statementFactory,
                    _options);
                finallyClause = $"finally {{{finallyStatements}{Environment.NewLine}}}";
            }

            return $"{tryClause}{catchClauses}{finallyClause}";
        }
    }
}