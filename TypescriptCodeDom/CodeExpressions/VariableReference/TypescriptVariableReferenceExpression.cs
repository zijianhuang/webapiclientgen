using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions.VariableReference
{
    class TypescriptVariableReferenceExpression : ITypescriptVariableReferenceExpression
    {
        private readonly CodeVariableReferenceExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptVariableReferenceExpression(
            CodeVariableReferenceExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            return _codeExpression.VariableName;
        }
    }
}