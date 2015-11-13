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
    public class TsCodeExpression
    {
        [Fact]
        public void TestCodeArgumentReferenceExpression()
        {
            var e = new CodeArgumentReferenceExpression("myParameterName");
            var builder = new StringBuilder();
            var o = new CodeGeneratorOptions() { IndentString = "    " };
            using (var w = new StringWriter(builder))
            {
                var provider = new TypeScriptCodeProvider();
                provider.GenerateCodeFromExpression(e, w, o);
            }
            Assert.Equal("myParameterName", builder.ToString());
        }

        static void TestCodeExpression(CodeExpression e, string expected)
        {
            var builder = new StringBuilder();
            var o = new CodeGeneratorOptions() { IndentString = "    " };
            using (var w = new StringWriter(builder))
            {
                var provider = new TypeScriptCodeProvider();
                provider.GenerateCodeFromExpression(e, w, o);
            }
            var s = builder.ToString();
            Assert.Equal(expected, s);
        }

        [Fact]
        public void TestCodeArrayCreateExpressionWithoutInit()
        {
            var e = new CodeArrayCreateExpression(new CodeTypeReference(typeof(int)));
            TestCodeExpression(e, "[]");
        }

        [Fact]
        public void TestCodeArrayCreateExpressionWithInit()
        {
            var e = new CodeArrayCreateExpression(new CodeTypeReference(typeof(int)), new CodePrimitiveExpression(8), new CodePrimitiveExpression(4), new CodePrimitiveExpression(2));
            TestCodeExpression(e, "[8, 4, 2]");
        }

        [Fact]
        public void TestCodeArrayCreateExpressionWithMixedInit()
        {
            var e = new CodeArrayCreateExpression(new CodeTypeReference(typeof(int)), new CodePrimitiveExpression(8), new CodePrimitiveExpression("4"), new CodePrimitiveExpression(2));
            TestCodeExpression(e, "[8, \"4\", 2]");//TS compiler might complain, and javascript runtime does not care.
        }

        [Fact]
        public void TestCodeArrayIndexerExpression()
        {
            TestCodeExpression(new CodeArrayIndexerExpression(new CodeSnippetExpression("Something"), new CodePrimitiveExpression(8)),
                "Something[8]");

            TestCodeExpression(new CodeArrayIndexerExpression(new CodeSnippetExpression("Something"), new CodePrimitiveExpression(8), new CodePrimitiveExpression(7)),
                "Something[8][7]");

        }

        [Fact]
        public void TestCodeArrayIndexerExpressionFunky()
        {
            TestCodeExpression(new CodeArrayIndexerExpression(),
                "");

            var e = new CodeArrayIndexerExpression();
            e.Indices.Add(new CodePrimitiveExpression(8));
            TestCodeExpression(e,
                "[8]");

        }

        [Fact]
        public void TestCodeBaseReferenceExpression()
        {
            TestCodeExpression(new CodeBaseReferenceExpression(), "super");
        }

        [Fact]
        public void TestCodeFieldReferenceExpression()
        {
            TestCodeExpression(new CodeFieldReferenceExpression(new CodeSnippetExpression("Field1"), "First"),
                "Field1.First");
        }

        [Fact]
        public void TestCodeIndexerExpression()
        {
            TestCodeExpression(new CodeIndexerExpression(new CodeSnippetExpression("Something2"), new CodePrimitiveExpression(8), new CodePrimitiveExpression(7)),
                "Something2[8][7]");
        }

        [Fact]
        public void TestCodeMethodInvokeExpression()
        {
            TestCodeExpression(new CodeMethodInvokeExpression(new CodeSnippetExpression("Something3"), "MyMethod", new CodePrimitiveExpression(8), new CodePrimitiveExpression("4")),
                "Something3.MyMethod(8, \"4\")");
        }

        [Fact]
        public void TestCodeMethodReferenceExpression()
        {
            TestCodeExpression(new CodeMethodReferenceExpression(new CodeSnippetExpression("Something4"), "MyMethod"),
               "Something4.MyMethod()");
        }

        [Fact]
        public void TestCodeMethodReferenceExpressionGeneric()
        {
            TestCodeExpression(new CodeMethodReferenceExpression(new CodeSnippetExpression("Something4"), "MyMethod", new CodeTypeReference(typeof(int)), new CodeTypeReference(typeof(string))),
               "Something4.MyMethod<number, string>()");
        }

        [Fact]
        public void TestCodeObjectCreateExpression()
        {
            TestCodeExpression(new CodeObjectCreateExpression(typeof(DemoWebApi.DemoData.Person)), "new DemoWebApi.DemoData.Person()");

            TestCodeExpression(new CodeObjectCreateExpression("DemoWebApi.DemoData.Client.Person"), "new DemoWebApi.DemoData.Client.Person()");
        }

        [Fact]
        public void TestCodeObjectCreateExpressionWithParameters()
        {
            TestCodeExpression(new CodeObjectCreateExpression("Building", new CodePrimitiveExpression("something"), new CodePrimitiveExpression(7)), "new Building(\"something\", 7)");
        }

        [Fact]
        public void TestCodeObjectCreateExpressionGeneric()
        {
            var g = new CodeTypeReference("SomeGeneric", new CodeTypeReference("Company"));
            TestCodeExpression(new CodeObjectCreateExpression(g), 
                "new SomeGeneric<Company>()");
        }

        [Fact]
        public void TestCodeParameterDeclarationExpression()
        {
            TestCodeExpression(new CodeParameterDeclarationExpression("MyType", "f"),
                "f: MyType");
        }

        [Fact]
        public void TestCodePropertyReferenceExpression()
        {
            TestCodeExpression(new CodePropertyReferenceExpression(new CodeThisReferenceExpression(), "MyProperty"),
                "this.MyProperty");
        }

        [Fact]
        public void TestCodeTypeOfExpression()
        {
            TestCodeExpression(new CodeTypeOfExpression("MyType"),
                "typeof MyType");
        }

        [Fact]
        public void TestCodeTypeReferenceExpression()
        {
            TestCodeExpression(new CodeTypeReferenceExpression("MyType"),
                "MyType");
        }

        [Fact]
        public void TestCodeVariableReferenceExpression()
        {
            TestCodeExpression(new CodeVariableReferenceExpression("myVariable"),
                "myVariable");
        }
    }
}
