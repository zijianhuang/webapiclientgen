using System.CodeDom;
using TypescriptCodeDom.CodeExpressions;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeTypeMembers
{
    class TypescriptMemberEvent : IMember
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;
        private readonly CodeMemberEvent _member;

        public TypescriptMemberEvent(
            IExpressionFactory expressionFactory,
            ITypescriptTypeMapper typescriptTypeMapper,
            CodeMemberEvent member)
        {
            _expressionFactory = expressionFactory;
            _typescriptTypeMapper = typescriptTypeMapper;
            _member = member;
        }

        public string Expand()
        {
            string eventDeclaration = $"{_member.Name}: Array<{_typescriptTypeMapper.GetTypeOutput(_member.Type)}>;";
            string accessModifier = _member.GetAccessModifier();
            return $"{accessModifier}{eventDeclaration}";
        }
    }
}