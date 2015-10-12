using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeExpressions.DelegateCreate
{
    class TypescriptDelegateCreateExpression : ITypescriptDelegateCreateExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeDelegateCreateExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptDelegateCreateExpression(
            IExpressionFactory expressionFactory,
            CodeDelegateCreateExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            var expression = _expressionFactory.GetExpression(_codeExpression, _options);
            return $"{expression.Evaluate()}.{_codeExpression.MethodName}";
        }
    }
}