using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Xml.Serialization;

namespace TypescriptCodeDom.CodeExpressions
{
    public interface IExpressionFactory
    {
        IExpression GetExpression(CodeExpression expression, CodeGeneratorOptions options);
    }
}