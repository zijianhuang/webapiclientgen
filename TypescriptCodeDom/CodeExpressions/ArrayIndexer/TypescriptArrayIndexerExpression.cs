using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;

namespace TypescriptCodeDom.CodeExpressions.ArrayIndexer
{
    class TypescriptArrayIndexerExpression : ITypescriptArrayIndexerExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeArrayIndexerExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptArrayIndexerExpression(
            IExpressionFactory expressionFactory,
            CodeArrayIndexerExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {

            var indexExpressions = _codeExpression.Indices
                .OfType<CodeExpression>()
                .Select(expression =>
                {
                    var indexExpression = _expressionFactory.GetExpression(_codeExpression, _options);
                    return indexExpression.Evaluate();
                })
                .Aggregate((previous, current) => $"{previous}[{current}]");

            var targetObjectExpression = _expressionFactory.GetExpression(_codeExpression, _options);
            var targetObject = targetObjectExpression.Evaluate();

            return $"{targetObject}{indexExpressions}";
        }
    }
}