using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.Common;

namespace TypescriptCodeDom.CodeExpressions.FieldReference
{
    class TypescriptFieldReferenceExpression : ITypescriptFieldReferenceExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeFieldReferenceExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptFieldReferenceExpression(
            IExpressionFactory expressionFactory,
            CodeFieldReferenceExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            var targetObjectExpression = _expressionFactory.GetExpression(_codeExpression.TargetObject, _options);
            return $"{targetObjectExpression.Evaluate()}.{_codeExpression.FieldName.ConvertPascalCaseToCamelCase()}";
        }
    }
}