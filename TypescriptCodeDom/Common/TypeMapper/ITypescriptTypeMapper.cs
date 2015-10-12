using System.CodeDom;

namespace TypescriptCodeDom.Common.TypeMapper
{
    public interface ITypescriptTypeMapper
    {
        string GetTypeOutput(CodeTypeReference type);
        bool IsValidTypeForDerivation(CodeTypeReference type);
    }
}