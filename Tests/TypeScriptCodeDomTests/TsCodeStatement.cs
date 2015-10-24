using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;
using System.Text;
using Xunit;
using Fonlow.TypeScriptCodeDom;

namespace TypeScriptCodeDomTests
{
    public class TsCodeStatement
    {
        static void TestCodeStatement(CodeStatement e, string expected)
        {
            var builder = new StringBuilder();
            var options = new CodeGeneratorOptions() { IndentString = "    " };
            using (var textWriter = new StringWriter(builder))
            {
                CodeObjectHelper.GenerateCodeFromStatement(e, textWriter, options);
            }
            var s = builder.ToString();
            Assert.Equal(expected, s);
        }

        [Fact]
        public void TestCodeAssignStatement()
        {
            TestCodeStatement(new CodeAssignStatement(new CodeSnippetExpression("s"), new CodePrimitiveExpression("abc")),
                "s = \"abc\"");
        }
    }
}
