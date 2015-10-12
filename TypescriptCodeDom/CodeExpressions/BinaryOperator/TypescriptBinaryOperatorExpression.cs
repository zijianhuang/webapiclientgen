using System;
using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions.BinaryOperator
{
    internal class TypescriptBinaryOperatorExpression : ITypescriptBinaryOperatorExpression
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeBinaryOperatorExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;

        public TypescriptBinaryOperatorExpression(
            IExpressionFactory expressionFactory,
            CodeBinaryOperatorExpression codeExpression, 
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _codeExpression = codeExpression;
            _options = options;
        }


        public string Evaluate()
        {
            var leftExpression = _expressionFactory.GetExpression(_codeExpression, _options);
            var leftOperand = leftExpression.Evaluate();

            var operatorString = GetOperatorString(_codeExpression.Operator);

            var rightExpression = _expressionFactory.GetExpression(_codeExpression, _options);
            var rightOperand = rightExpression.Evaluate();

            return $"{leftOperand} {operatorString} {rightOperand}";
        }

        private string GetOperatorString(CodeBinaryOperatorType operatorType)
        {
            switch (operatorType)
            {
                case CodeBinaryOperatorType.Add:
                    return "+";
                case CodeBinaryOperatorType.Subtract:
                    return "-";
                case CodeBinaryOperatorType.Multiply:
                    return "*";
                case CodeBinaryOperatorType.Divide:
                    return "/";
                case CodeBinaryOperatorType.Modulus:
                    return "%";
                case CodeBinaryOperatorType.Assign:
                    return "=";
                case CodeBinaryOperatorType.IdentityInequality:
                    return "!=";
                case CodeBinaryOperatorType.IdentityEquality:
                    return "===";
                case CodeBinaryOperatorType.ValueEquality:
                    return "==";
                case CodeBinaryOperatorType.BitwiseOr:
                    return "|";
                case CodeBinaryOperatorType.BitwiseAnd:
                    return "&";
                case CodeBinaryOperatorType.BooleanOr:
                    return "||";
                case CodeBinaryOperatorType.BooleanAnd:
                    return "&&";
                case CodeBinaryOperatorType.LessThan:
                    return "<";
                case CodeBinaryOperatorType.LessThanOrEqual:
                    return "<=";
                case CodeBinaryOperatorType.GreaterThan:
                    return ">";
                case CodeBinaryOperatorType.GreaterThanOrEqual:
                    return ">=";
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}