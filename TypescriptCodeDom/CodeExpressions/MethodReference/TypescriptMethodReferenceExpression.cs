using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.Common;

namespace TypescriptCodeDom.CodeExpressions.MethodReference
{
    class TypescriptMethodReferenceExpression : ITypescriptMethodReferenceExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeMethodReferenceExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptMethodReferenceExpression(
            IExpressionFactory expressionFactory,
            CodeMethodReferenceExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            var targetObject = _expressionFactory.GetExpression(_codeExpression.TargetObject, _options);

            return $"{targetObject.Evaluate()}.{_codeExpression.MethodName.ConvertPascalCaseToCamelCase()}";
        }
    }
}