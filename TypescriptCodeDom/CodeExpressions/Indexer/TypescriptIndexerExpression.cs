using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;

namespace TypescriptCodeDom.CodeExpressions.Indexer
{
    class TypescriptIndexerExpression : ITypescriptIndexerExpression
    {
        private readonly CodeIndexerExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;
        private readonly IExpressionFactory _expressionFactory;

        public TypescriptIndexerExpression(
            IExpressionFactory expressionFactory,
            CodeIndexerExpression codeExpression,
            CodeGeneratorOptions options)
        {
            _codeExpression = codeExpression;
            _options = options;
            _expressionFactory = expressionFactory;
        }


        public string Evaluate()
        {
            var targetObjectExpression = _expressionFactory.GetExpression(_codeExpression.TargetObject, _options);

            var indexers = _codeExpression.Indices
                .OfType<CodeExpression>()
                .Select(expression =>
                {
                    var indexExpression = _expressionFactory.GetExpression(expression, _options);
                    return indexExpression.Evaluate();
                })
                .Aggregate((previous, current) => $"{previous}[{current}]");

            return $"{targetObjectExpression.Evaluate()}.{indexers}";

        }
    }
}