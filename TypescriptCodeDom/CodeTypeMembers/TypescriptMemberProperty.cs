using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.CodeExpressions;
using TypescriptCodeDom.CodeStatements;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeTypeMembers
{
    class TypescriptMemberProperty : IMember
    {
        private readonly CodeMemberProperty _member;
        private readonly IStatementFactory _statementFactory;
        private readonly IExpressionFactory _expressionFactory;
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;
        private readonly CodeGeneratorOptions _options;

        public TypescriptMemberProperty(
            CodeMemberProperty member,
            IStatementFactory statementFactory,
            IExpressionFactory expressionFactory,
            ITypescriptTypeMapper typescriptTypeMapper,
            CodeGeneratorOptions options)
        {
            _member = member;
            _statementFactory = statementFactory;
            _expressionFactory = expressionFactory;
            _typescriptTypeMapper = typescriptTypeMapper;
            _options = options;
        }

        public string Expand()
        {
            var shouldGeneratePropertyBody = (bool)_member.UserData["GeneratePropertyBody"];

            if (!shouldGeneratePropertyBody)
                return string.Empty;

            var shouldGenerateAccessModifier = (bool)_member.UserData["GenerateAccessModifier"];
            var accessModifier = shouldGenerateAccessModifier ? _member.GetAccessModifier() : string.Empty;
            var name = _member.Name;            
            var type = _typescriptTypeMapper.GetTypeOutput(_member.Type);
            var parameters = string.Empty;
            var parametersAndSetterValueExpression = $"value: {type}";            

            if (_member.Parameters != null && _member.Parameters.Count > 0)
            {
                parameters = _member.Parameters.GetParametersFromExpressions(_expressionFactory, _options);
                parametersAndSetterValueExpression = $"{parametersAndSetterValueExpression}, {parametersAndSetterValueExpression}";
            }

            var getterMethod = string.Empty;
            if (_member.HasGet)
            {
                var getStatements = _member.GetStatements.GetStatementsFromCollection(_statementFactory, _options);
                getterMethod = $"{accessModifier} get{name}({parameters}): {type}{{{getStatements}{Environment.NewLine}}}";
            }

            var setterMethod = string.Empty;
            if (_member.HasSet)
            {
                var setStatements = _member.SetStatements.GetStatementsFromCollection(_statementFactory, _options);
                setterMethod = $"{accessModifier} set{name}({parametersAndSetterValueExpression}): void{{{setStatements}{Environment.NewLine}}}";
            }

            return $"{getterMethod}{Environment.NewLine}{setterMethod}";
        }
    }
}