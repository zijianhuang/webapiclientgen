using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions.ThisReference
{
    class TypescriptThisReferenceExpression : ITypescriptThisReferenceExpression
    {
        private readonly CodeThisReferenceExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptThisReferenceExpression(
            CodeThisReferenceExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            return "this";
        }
    }
}