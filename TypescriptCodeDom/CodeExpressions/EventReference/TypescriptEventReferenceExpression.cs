using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions.EventReference
{
    class TypescriptEventReferenceExpression : ITypescriptEventReferenceExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeEventReferenceExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptEventReferenceExpression(
            IExpressionFactory expressionFactory,
            CodeEventReferenceExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            var targetObjectExpression = _expressionFactory.GetExpression(_codeExpression, _options);
            return $"{targetObjectExpression.Evaluate()}.{_codeExpression.EventName}";
        }
    }
}