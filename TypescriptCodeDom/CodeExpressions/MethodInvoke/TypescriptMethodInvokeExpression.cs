using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;

namespace TypescriptCodeDom.CodeExpressions.MethodInvoke
{
    class TypescriptMethodInvokeExpression : ITypescriptMethodInvokeExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeMethodInvokeExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptMethodInvokeExpression(
            IExpressionFactory expressionFactory,
            CodeMethodInvokeExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
        }

        public string Evaluate()
        {
            var methodExpression = _expressionFactory.GetExpression(_codeExpression.Method, _options);

            var parameters = _codeExpression.Parameters.GetParametersFromExpressions(_expressionFactory, _options);
            
            return $"{methodExpression.Evaluate()}({parameters})";
        }
    }
}