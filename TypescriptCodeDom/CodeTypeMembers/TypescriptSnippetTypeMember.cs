using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeTypeMembers
{
    class TypescriptSnippetTypeMember : IMember
    {
        private readonly CodeSnippetTypeMember _member;
        private readonly CodeGeneratorOptions _options;

        public TypescriptSnippetTypeMember(
            CodeSnippetTypeMember member,
            CodeGeneratorOptions options)
        {
            _member = member;
            _options = options;
        }

        public string Expand()
        {
            return _member.Text;
        }
    }
}