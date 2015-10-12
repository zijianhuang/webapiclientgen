using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using TypescriptCodeDom.CodeExpressions;
using TypescriptCodeDom.CodeStatements;
using TypescriptCodeDom.CodeTypeParameters;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeTypeMembers
{
    class TypescriptConstructor : IMember
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly IStatementFactory _statementFactory;
        private readonly CodeConstructor _member;
        private readonly CodeGeneratorOptions _options;

        public TypescriptConstructor(
            IExpressionFactory expressionFactory,
            IStatementFactory statementFactory,
            CodeConstructor member,
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _statementFactory = statementFactory;
            _member = member;
            _options = options;
        }

        public string Expand()
        {
            var shouldGenerateMethodBody = (bool)_member.UserData["GenerateMethodBody"];

            if (!shouldGenerateMethodBody)
                return string.Empty;

            var parameters = _member.Parameters.GetParametersFromExpressions(_expressionFactory, _options);
            var statements = _member.Statements.GetStatementsFromCollection(_statementFactory, _options);

            var baseConstructorArgs = _member.BaseConstructorArgs.OfType<CodeExpression>()
                .Select(parameter => _expressionFactory.GetExpression(parameter, _options).Evaluate())
                .ToList();
            var baseContructorArgsExpression = string.Empty;
            if (baseConstructorArgs.Any() || _member.ImplementationTypes.Count > 0)
            {
                baseContructorArgsExpression = $"super({string.Join(",", baseConstructorArgs)});";
            }
            else if ((bool)_member.UserData["HasBaseConstructorCall"])
            {
                baseContructorArgsExpression = "super();";
            }

            return $"{_member.GetAccessModifier()} constructor({parameters}){{{baseContructorArgsExpression}{statements}{Environment.NewLine}}}";

        }
    }
}