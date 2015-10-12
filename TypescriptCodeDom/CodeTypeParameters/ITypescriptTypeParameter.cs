using System.CodeDom;

namespace TypescriptCodeDom.CodeTypeParameters
{
    internal interface ITypescriptTypeParameter
    {
        string Evaluate(CodeTypeParameter codeTypeParameter);
    }
}