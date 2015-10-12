using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeStatements
{
    public interface IStatementFactory
    {
        IStatement GetStatement(CodeStatement codeStatement, CodeGeneratorOptions codeGeneratorOptions);
    }
}
