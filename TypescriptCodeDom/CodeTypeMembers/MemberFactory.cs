using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using TypescriptCodeDom.CodeExpressions;
using TypescriptCodeDom.CodeStatements;
using TypescriptCodeDom.CodeTypeParameters;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeTypeMembers
{
    public interface IMemberFactory
    {
        IMember GetMember(CodeTypeMember member, CodeGeneratorOptions codeGeneratorOptions);
    }

    class MemberFactory : IMemberFactory
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly IStatementFactory _statementFactory;
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;
        private readonly ITypescriptTypeParameter _typescriptTypeParameter;
        private readonly Dictionary<Type, Func<CodeTypeMember, CodeGeneratorOptions, IMember>> _memberMap;


        public MemberFactory(
            IExpressionFactory expressionFactory,
            IStatementFactory statementFactory,
            ITypescriptTypeMapper typescriptTypeMapper,
            ITypescriptTypeParameter typescriptTypeParameter)
        {
            _expressionFactory = expressionFactory;
            _statementFactory = statementFactory;
            _typescriptTypeMapper = typescriptTypeMapper;
            _typescriptTypeParameter = typescriptTypeParameter;
            _memberMap = new Dictionary<Type, Func<CodeTypeMember, CodeGeneratorOptions, IMember>>();

            ConstructMembers();
        }

        private void ConstructMembers()
        {
            _memberMap[typeof(CodeMemberEvent)] = (member, options) => new TypescriptMemberEvent(_expressionFactory, _typescriptTypeMapper, (CodeMemberEvent)member);
            _memberMap[typeof(CodeMemberField)] = (member, options) => new TypescriptMemberField(_expressionFactory, _typescriptTypeMapper, (CodeMemberField)member);
            _memberMap[typeof(CodeMemberMethod)] = (member, options) => new TypescriptMemberMethod(_expressionFactory, _statementFactory, _typescriptTypeMapper,_typescriptTypeParameter, (CodeMemberMethod)member, options);
            _memberMap[typeof(CodeConstructor)] = (member, options) => new TypescriptConstructor(_expressionFactory, _statementFactory, (CodeConstructor)member, options);
            _memberMap[typeof(CodeMemberProperty)] = (member, options) => new TypescriptMemberProperty((CodeMemberProperty)member, _statementFactory, _expressionFactory,_typescriptTypeMapper, options);
            _memberMap[typeof(CodeSnippetTypeMember)] = (member, options) => new TypescriptSnippetTypeMember((CodeSnippetTypeMember)member, options);
            _memberMap[typeof(CodeTypeDeclaration)] = (member, options) => new TypescriptTypeDeclaration((CodeTypeDeclaration)member, this, _typescriptTypeMapper, _typescriptTypeParameter, options);
        }


        public IMember GetMember(CodeTypeMember member, CodeGeneratorOptions codeGeneratorOptions)
        {
            return _memberMap[member.GetType()](member, codeGeneratorOptions);
        }
    }
}
