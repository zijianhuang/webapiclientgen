using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions.ArgumentReference
{
    public class TypescriptArgumentReferenceExpression : ITypescriptArgumentReferenceExpression
    {
        private readonly CodeArgumentReferenceExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptArgumentReferenceExpression(
            CodeArgumentReferenceExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            return _codeExpression.ParameterName;
        }
    }
}
