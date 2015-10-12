using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptVariableDeclarationStatement : IStatement
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeVariableDeclarationStatement _statement;
        private readonly CodeGeneratorOptions _options;
        private TypescriptTypeMapper _typescriptTypeMapper;

        public TypescriptVariableDeclarationStatement(
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            CodeVariableDeclarationStatement statement,
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
            var type = _typescriptTypeMapper.GetTypeOutput(_statement.Type);
            var initializationExpression = _expressionFactory.GetExpression(_statement.InitExpression, _options).Evaluate();

            return $"var {_statement.Name}: {type} = {initializationExpression};}}";
        }
    }
}