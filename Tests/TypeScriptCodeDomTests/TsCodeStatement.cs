using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
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
            var o = new CodeGeneratorOptions() { IndentString = "    " };
            using (var w = new StringWriter(builder))
            {
                var provider = new TypeScriptCodeProvider();
                provider.GenerateCodeFromStatement(e, w, o);
            }
            var s = builder.ToString();
            Assert.Equal(expected, s);
        }

        [Fact]
        public void TestCodeAssignStatement()
        {
            TestCodeStatement(new CodeAssignStatement(new CodeSnippetExpression("s"), new CodePrimitiveExpression("abc")),
                "    s = \"abc\"");
        }

        [Fact]
        public void TestCodeCommentStatement()
        {
            TestCodeStatement(new CodeCommentStatement("my comment"),
                "    // my comment\r\n");

        }

        [Fact]
        public void TestCodeCommentStatementDocComment()
        {
            TestCodeStatement(new CodeCommentStatement("my comment", true),
                "    /** my comment */\r\n");

        }

        [Fact]
        public void TestCodeCommentStatementDocCommentLines()
        {
            TestCodeStatement(new CodeCommentStatement("my comment\r\nSecond line", true),
@"    /** 
     * my comment
     * Second line
     */
");

        }

        [Fact]
        public void TestCodeConditionStatement()
        {
            var statement = new CodeConditionStatement(new CodeSnippetExpression("true"),
                new CodeAssignStatement(new CodeSnippetExpression("Abc"), new CodePrimitiveExpression(8)), new CodeSnippetStatement("DoSomething2();"));
            TestCodeStatement(statement,
@"    if (true) {
        Abc = 8;
        DoSomething2();
    }
");
        }

        [Fact]
        public void TestCodeConditionStatementSnippet()
        {
            var statement = new CodeConditionStatement(new CodeSnippetExpression("true"), new CodeSnippetStatement("DoSomething1();"), new CodeSnippetStatement("DoSomething2();"));
            TestCodeStatement(statement,
@"    if (true) {
        DoSomething1();
        DoSomething2();
    }
");
        }

        [Fact]
        public void TestCodeConditionStatementElse()
        {
            var statement = new CodeConditionStatement(new CodeSnippetExpression("true"),
                new CodeStatement[] { new CodeAssignStatement(new CodeSnippetExpression("Abc"), new CodePrimitiveExpression(8)), new CodeSnippetStatement("DoSomething2();") },
                new CodeStatement[] { new CodeSnippetStatement("DoSomething1();"), new CodeSnippetStatement("DoSomething2();") });
            TestCodeStatement(statement,
@"    if (true) {
        Abc = 8;
        DoSomething2();
    }
    else {
        DoSomething1();
        DoSomething2();
    }
");
        }

        [Fact]
        public void TestCodeConditionStatementEmptyTrueButElse()
        {
            var statement = new CodeConditionStatement(new CodeSnippetExpression("true"),
                new CodeStatement[] { },
                new CodeStatement[] { new CodeSnippetStatement("DoSomething1();"), new CodeSnippetStatement("DoSomething2();") });
            TestCodeStatement(statement,
@"    if (true) {
    }
    else {
        DoSomething1();
        DoSomething2();
    }
");
        }

        [Fact]
        public void TestCodeConditionStatementNullTrue()
        {
            Assert.Throws<ArgumentNullException>(() =>
            {
                var statement = new CodeConditionStatement(new CodeSnippetExpression("true"),
                    null,
                    new CodeStatement[] { new CodeSnippetStatement("DoSomething1();"), new CodeSnippetStatement("DoSomething2();") });
            });
        }

        [Fact]
        public void TestCodeIterationStatement()
        {
            var statement = new CodeIterationStatement(new CodeAssignStatement(new CodeVariableReferenceExpression("testInt"), new CodePrimitiveExpression(1)),
    new CodeBinaryOperatorExpression(new CodeVariableReferenceExpression("testInt"),
        CodeBinaryOperatorType.LessThan, new CodePrimitiveExpression(10)),

    new CodeAssignStatement(new CodeVariableReferenceExpression("testInt"), new CodeBinaryOperatorExpression(
        new CodeVariableReferenceExpression("testInt"), CodeBinaryOperatorType.Add, new CodePrimitiveExpression(1))),

    new CodeStatement[] { new CodeExpressionStatement( new CodeMethodInvokeExpression( new CodeMethodReferenceExpression(
        new CodeTypeReferenceExpression("Console"), "WriteLine" ), new CodeMethodInvokeExpression(
        new CodeVariableReferenceExpression("testInt"), "ToString" ) ) ) });

            TestCodeStatement(statement,
@"    for (testInt = 1; testInt < 10; testInt = testInt + 1) {
        Console.WriteLine(testInt.ToString());
    }
");
        }

        [Fact]
        public void TestCodeMethodReturnStatement()
        {
            TestCodeStatement(new CodeMethodReturnStatement(new CodePrimitiveExpression(8)),
               "    return 8");
        }

        [Fact]
        public void TestCodeThrowExceptionStatement()
        {
            TestCodeStatement(new CodeThrowExceptionStatement(new CodePrimitiveExpression("abcd")),
                "    throw \"abcd\"");
        }

        [Fact]
        public void TestCodeTryCatchFinallyStatement()
        {
            CodeTryCatchFinallyStatement try1 = new CodeTryCatchFinallyStatement();
            try1.TryStatements.Add(new CodeMethodInvokeExpression(new CodeThisReferenceExpression(), "ThrowApplicationException"));

            CodeCatchClause catch1 = new CodeCatchClause("ex", new CodeTypeReference("System.ApplicationException"));
            catch1.Statements.Add(new CodeCommentStatement("Handle any System.ApplicationException here."));
            try1.CatchClauses.Add(catch1);

            try1.FinallyStatements.Add(new CodeCommentStatement("Handle any finally block statements."));

            TestCodeStatement(try1,
@"    try {
        this.ThrowApplicationException();
    }
    catch (ex) {
        // Handle any System.ApplicationException here.
    }
    finally {
        // Handle any finally block statements.
    }
");
        }

        [Fact]
        public void TestCodeTryFinallyStatement()
        {
            CodeTryCatchFinallyStatement try1 = new CodeTryCatchFinallyStatement();
            try1.TryStatements.Add(new CodeMethodInvokeExpression(new CodeThisReferenceExpression(), "ThrowApplicationException"));

            try1.FinallyStatements.Add(new CodeCommentStatement("Handle any finally block statements."));

            TestCodeStatement(try1,
@"    try {
        this.ThrowApplicationException();
    }
    finally {
        // Handle any finally block statements.
    }
");
        }

        [Fact]
        public void TestCodeTryCatchStatement()
        {
            CodeTryCatchFinallyStatement try1 = new CodeTryCatchFinallyStatement();
            try1.TryStatements.Add(new CodeMethodInvokeExpression(new CodeThisReferenceExpression(), "ThrowApplicationException"));

            CodeCatchClause catch1 = new CodeCatchClause("ex", new CodeTypeReference("System.ApplicationException"));
            catch1.Statements.Add(new CodeCommentStatement("Handle any System.ApplicationException here."));
            try1.CatchClauses.Add(catch1);

            TestCodeStatement(try1,
@"    try {
        this.ThrowApplicationException();
    }
    catch (ex) {
        // Handle any System.ApplicationException here.
    }
");
        }

        [Fact]
        public void TestCodeVariableDeclarationStatement()
        {
            TestCodeStatement(new CodeVariableDeclarationStatement("string", "name"),
                "    var name: string");
        }

        [Fact]
        public void TestCodeVariableDeclarationStatementWithInit()
        {
            TestCodeStatement(new CodeVariableDeclarationStatement("string", "name", new CodePrimitiveExpression("abc 123")),
                "    var name: string = \"abc 123\"");
        }
    }
}
