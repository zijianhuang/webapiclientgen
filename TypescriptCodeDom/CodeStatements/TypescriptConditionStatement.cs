using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptConditionStatement : IStatement
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeConditionStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptConditionStatement(
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            CodeConditionStatement statement,
            CodeGeneratorOptions options)
        {
            _statementFactory = statementFactory;
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }


        public string Expand()
        {
            var conditionExpression = _expressionFactory.GetExpression(_statement.Condition, _options).Evaluate();
            var trueStatements = _statement.TrueStatements.GetStatementsFromCollection(_statementFactory, _options);
            var falseStatements = _statement.FalseStatements.GetStatementsFromCollection(_statementFactory, _options);

            var conditionalIfBlock = $"if ({conditionExpression}){{{trueStatements}{Environment.NewLine}}}";

            if (_statement.FalseStatements != null && _statement.FalseStatements.Count > 0)
            {
                return $"{conditionalIfBlock}else {{{falseStatements}{Environment.NewLine}}}";                
            }

            return conditionalIfBlock;
        }

        
    }
}