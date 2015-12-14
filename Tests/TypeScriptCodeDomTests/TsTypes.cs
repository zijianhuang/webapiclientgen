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
    public class TsTypes
    {
        static void AssertCodeTypeDeclaration(CodeTypeDeclaration e, string expected)
        {
            var builder = new StringBuilder();
            var options = new CodeGeneratorOptions() { IndentString = "    " };
            using (var textWriter = new StringWriter(builder))
            {
                ICodeGenerator gen = new TypeScriptCodeProvider();
                gen.GenerateCodeFromType(e, textWriter, options);
            }
            var s = builder.ToString();
            Assert.Equal(expected, s);
        }

        [Fact]
        public void TestCodeTypeDeclaration()
        {
            CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType");
            newType.TypeAttributes = System.Reflection.TypeAttributes.NotPublic;
            AssertCodeTypeDeclaration(newType,
@"    class TestType {
    }
");

        }

        [Fact]
        public void TestCodeTypeDeclarationWithBaseType()
        {
            CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType");
            newType.TypeAttributes = System.Reflection.TypeAttributes.NotPublic;
            newType.BaseTypes.Add("BaseType");
            AssertCodeTypeDeclaration(newType,
@"    class TestType extends BaseType {
    }
");
        }

        [Fact]
        public void TestCodeTypeDeclarationWithBaseTypePublic()
        {
            CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType");
            newType.BaseTypes.Add("BaseType");
            AssertCodeTypeDeclaration(newType,
@"    export class TestType extends BaseType {
    }
");
        }

        [Fact]
        public void TestCodeTypeDeclarationWithMembers()
        {
            CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType");
            newType.TypeAttributes = System.Reflection.TypeAttributes.NotPublic;
            newType.Members.Add(new CodeMemberField("string", "name"));
            AssertCodeTypeDeclaration(newType,
@"    class TestType {
        name: string;
    }
");

        }  


        [Fact]
        public void TestTypeOfType()
        {
            Type companyType = typeof(DemoWebApi.DemoData.Company);
            var s = companyType.ToString();
            Type typeOfType = companyType.GetType();
            var s2 = typeOfType.ToString();
        }
    }
}
