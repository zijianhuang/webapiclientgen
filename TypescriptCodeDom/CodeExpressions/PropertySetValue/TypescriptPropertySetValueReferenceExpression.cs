using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions.PropertySetValue
{
    class TypescriptPropertySetValueReferenceExpression : ITypescriptPropertySetValueReferenceExpression
    {
        private readonly CodePropertySetValueReferenceExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptPropertySetValueReferenceExpression(
            CodePropertySetValueReferenceExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            return "value";
        }
    }
}