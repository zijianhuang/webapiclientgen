using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class TypescriptAttachEventStatement : IStatement
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly CodeAttachEventStatement _statement;
        private readonly CodeGeneratorOptions _options;

        public TypescriptAttachEventStatement(
            IExpressionFactory expressionFactory,
            CodeAttachEventStatement statement,
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _statement = statement;
            _options = options;
        }

        public string Expand()
        {
            var eventExpression = _expressionFactory.GetExpression(_statement.Event, _options).Evaluate();
            var listenerExpresssion = _expressionFactory.GetExpression(_statement.Listener, _options).Evaluate();
            return $"{eventExpression}.push({listenerExpresssion});";
        }
    }
}