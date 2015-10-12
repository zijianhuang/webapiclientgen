using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom.CodeExpressions
{   
    public interface IExpression
    {
        string Evaluate();
    }    
}