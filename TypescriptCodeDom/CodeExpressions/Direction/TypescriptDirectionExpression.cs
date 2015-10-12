using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions.Direction
{
    class TypescriptDirectionExpression : ITypescriptDirectionExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeDirectionExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptDirectionExpression(
            IExpressionFactory expressionFactory,
            CodeDirectionExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            var parameterExpression = _expressionFactory.GetExpression(_codeExpression.Expression, _options);
            return parameterExpression.Evaluate();
        }
    }
}