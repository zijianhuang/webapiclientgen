using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;

namespace TypescriptCodeDom.CodeExpressions.DelegateInvoke
{
    class TypescriptDelegateInvokeExpression : ITypescriptDelegateInvokeExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeDelegateInvokeExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptDelegateInvokeExpression(
            IExpressionFactory expressionFactory,
            CodeDelegateInvokeExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            var parameters = _codeExpression.Parameters.GetParametersFromExpressions(_expressionFactory, _options);

            var targetObject = _expressionFactory.GetExpression(_codeExpression.TargetObject, _options);

            return $"{targetObject.Evaluate()}({parameters})";
        }
    }
}