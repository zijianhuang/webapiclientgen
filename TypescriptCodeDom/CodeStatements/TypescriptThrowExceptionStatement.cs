using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptThrowExceptionStatement : IStatement
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeThrowExceptionStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptThrowExceptionStatement(
            IExpressionFactory expressionFactory,
            CodeThrowExceptionStatement statement,
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }


        public string Expand()
        {
            var throwExpression = _expressionFactory.GetExpression(_statement.ToThrow, _options).Evaluate();
            return $"throw {throwExpression};";
        }
    }
}