using System.CodeDom;

namespace TypescriptCodeDom.CodeTypeMembers
{
    public static class Extensions
    {
        public static string GetAccessModifier(this CodeTypeMember member)
        {
            string accessModifier = member.Attributes == MemberAttributes.Public
                ? "public "
                : member.Attributes == MemberAttributes.Private
                    ? "private "
                    : string.Empty;
            return accessModifier;
        }
    }
}
