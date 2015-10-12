using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeExpressions.ArrayCreate
{
    class TypescriptArrayCreateExpression : ITypescriptArrayCreateExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeArrayCreateExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;

        public TypescriptArrayCreateExpression(
            IExpressionFactory expressionFactory,
            CodeArrayCreateExpression codeExpression, 
            CodeGeneratorOptions options,
            ITypescriptTypeMapper typescriptTypeMapper)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
            _typescriptTypeMapper = typescriptTypeMapper;
        }

        public string Evaluate()
        {
            string sizeEvaluationString = string.Empty;
            if (_codeExpression.SizeExpression != null)
            {
                var sizeExpression = _expressionFactory.GetExpression(_codeExpression, _options);
                sizeEvaluationString = sizeExpression.Evaluate();
            }
            else if (_codeExpression.Size > 0)
            {
                sizeEvaluationString = _codeExpression.Size.ToString();
            }

            var typeString = _typescriptTypeMapper.GetTypeOutput(_codeExpression.CreateType);
            var arrayCreateString = $"{typeString}({sizeEvaluationString})";

            var initializers = _codeExpression.Initializers
                .OfType<CodeExpression>()
                .Select(expression =>
                {
                    var initializerExpression = _expressionFactory.GetExpression(_codeExpression, _options);
                    return initializerExpression.Evaluate();
                })
                .ToList();

            if (initializers.Any())
                return $"{arrayCreateString}({string.Join(",", initializers)})";
            return $"{arrayCreateString}";
        }
    }
}