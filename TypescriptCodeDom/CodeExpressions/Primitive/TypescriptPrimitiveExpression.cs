using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions.Primitive
{
    class TypescriptPrimitiveExpression : ITypescriptPrimitiveExpression
    {
        private readonly CodePrimitiveExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptPrimitiveExpression(
            CodePrimitiveExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            var expressionValue = _codeExpression.Value.ToString();
            return _codeExpression.Value is string ? $"\"{_codeExpression.Value}\"" : expressionValue;
        }
    }
}