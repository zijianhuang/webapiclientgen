using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using TypescriptCodeDom.CodeExpressions;
using TypescriptCodeDom.CodeStatements;
using TypescriptCodeDom.CodeTypeParameters;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeTypeMembers
{
    class TypescriptMemberMethod : IMember
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly IStatementFactory _statementFactory;
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;
        private readonly ITypescriptTypeParameter _typescriptTypeParameter;
        private readonly CodeMemberMethod _member;
        private readonly CodeGeneratorOptions _options;

        public TypescriptMemberMethod(
            IExpressionFactory expressionFactory,
            IStatementFactory statementFactory,
            ITypescriptTypeMapper typescriptTypeMapper,
            ITypescriptTypeParameter typescriptTypeParameter,
            CodeMemberMethod member,
            CodeGeneratorOptions options)
        {
            _expressionFactory = expressionFactory;
            _statementFactory = statementFactory;
            _typescriptTypeMapper = typescriptTypeMapper;
            _typescriptTypeParameter = typescriptTypeParameter;
            _member = member;
            _options = options;
        }


        public string Expand()
        {
            var parameters = _member.Parameters.GetParametersFromExpressions(_expressionFactory, _options);
            var returnType = _typescriptTypeMapper.GetTypeOutput(_member.ReturnType);
            var statements = _member.Statements.GetStatementsFromCollection(_statementFactory, _options);


            var typeParameters = _member.TypeParameters.OfType<CodeTypeParameter>()
                .Select(parameter => _typescriptTypeParameter.Evaluate(parameter))
                .ToList();
            var typeParametersExpression = string.Empty;
            if (typeParameters.Any())
            {
                typeParametersExpression = $"<{string.Join(",", typeParameters)}>";
            }

            var shouldGenerateMethodBody = (bool)_member.UserData["GenerateMethodBody"];
            var shouldGenerateAccessModifier = (bool)_member.UserData["GenerateAccessModifier"];

            var accessModifier = shouldGenerateAccessModifier ? _member.GetAccessModifier() : string.Empty;
            return shouldGenerateMethodBody 
                ? $"{accessModifier} {_member.Name.ConvertPascalCaseToCamelCase()}{typeParametersExpression}({parameters}): {returnType}{{{Environment.NewLine}{statements}{Environment.NewLine}}}" 
                : $"{accessModifier} {_member.Name.ConvertPascalCaseToCamelCase()}{typeParametersExpression}({parameters}): {returnType};";
        }
    }
}