using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeNamespaces
{
    public interface ITypescriptNamespace
    {
        string Expand(CodeNamespace codeNamespace, CodeGeneratorOptions options);
    }
}