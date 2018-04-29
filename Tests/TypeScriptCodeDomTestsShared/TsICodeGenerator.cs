using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Text;
using Xunit;
using Fonlow.TypeScriptCodeDom;
using Fonlow.Text;

namespace TypeScriptCodeDomTests
{
    public class TsICodeGenerator
    {
        [Fact]
        public void TestIsValidIdentifier()
        {
            var provider = new TypeScriptCodeProvider(false);
            Assert.True(provider.IsValidIdentifier("abcde"));
            Assert.False(provider.IsValidIdentifier("if"));
            Assert.True(provider.IsValidIdentifier("IF"));
        }

        [Fact]
        public void TestValidateIdentifier()
        {
            var provider = new TypeScriptCodeProvider(false);
            Assert.Throws<ArgumentException>(() => provider.ValidateIdentifier("for"));


            provider.ValidateIdentifier("abc_de123");
        }

        [Fact]
        public void TestSupports()
        {
            var provider = new TypeScriptCodeProvider(false);
            Assert.False(provider.Supports(GeneratorSupport.GotoStatements));
            Assert.True(provider.Supports(GeneratorSupport.GenericTypeDeclaration));
        }

        [Fact]
        public void TestCamelCase()
        {
            Assert.Equal("dob", "DOB".ToCamelCase());
            Assert.Equal(null, StringExtensions.ToCamelCase(null));
            Assert.Equal("birthDate", StringExtensions.ToCamelCase("BirthDate"));
            Assert.Equal("birthDate", StringExtensions.ToCamelCase("birthDate"));
            Assert.Equal("dbEngine", StringExtensions.ToCamelCase("DBEngine"));
        }
    }
}
