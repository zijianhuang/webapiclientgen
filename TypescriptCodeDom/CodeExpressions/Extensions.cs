using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;

namespace TypescriptCodeDom.CodeExpressions
{
    public static class Extensions
    {
        public static string GetParametersFromExpressions(this CodeExpressionCollection codeExpressions, IExpressionFactory expressionFactory, CodeGeneratorOptions options)
        {
            var parametersFromExpressions = codeExpressions
                .OfType<CodeExpression>()
                .Select(parameter =>
                {
                    var parameterExpression = expressionFactory.GetExpression(parameter, options);
                    return parameterExpression.Evaluate();
                }).ToList();
            return string.Join(", ", parametersFromExpressions);
        }

        public static string GetParametersFromExpressions(this CodeParameterDeclarationExpressionCollection codeExpressions, IExpressionFactory expressionFactory, CodeGeneratorOptions options)
        {
            if (codeExpressions.Count <= 0)
                return string.Empty;

            var parametersFromExpressions = codeExpressions
                .OfType<CodeParameterDeclarationExpression>()
                .Select(parameter =>
                {
                    var parameterExpression = expressionFactory.GetExpression(parameter, options);
                    return parameterExpression.Evaluate();
                })
                .ToList();
            return string.Join(", ", parametersFromExpressions);
        }
    }
}
