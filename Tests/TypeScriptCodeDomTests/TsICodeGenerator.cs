using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Text;
using Xunit;
using Fonlow.TypeScriptCodeDom;

namespace TypeScriptCodeDomTests
{
    public class TsICodeGenerator
    {
        [Fact]
        public void TestIsValidIdentifier()
        {
            var provider = new TypeScriptCodeProvider();
            Assert.True(provider.IsValidIdentifier("abcde"));
            Assert.False(provider.IsValidIdentifier("if"));
            Assert.True(provider.IsValidIdentifier("IF"));
        }

        [Fact]
        public void TestValidateIdentifier()
        {
            var provider = new TypeScriptCodeProvider();
            Assert.Throws<ArgumentException>(() => provider.ValidateIdentifier("for"));


            provider.ValidateIdentifier("abc_de123");
        }

        [Fact]
        public void TestSupports()
        {
            var provider = new TypeScriptCodeProvider();
            Assert.False(provider.Supports(GeneratorSupport.GotoStatements));
            Assert.True(provider.Supports(GeneratorSupport.GenericTypeDeclaration));
        }
    }
}
