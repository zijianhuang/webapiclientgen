using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;

namespace Fonlow.TypeScriptCodeDom
{
    public sealed class TypeScriptCodeProvider : CodeDomProvider, ICodeGenerator
    {
        public TypeScriptCodeProvider()
        {
            generator = new TsCodeGenerator();
        }

        TsCodeGenerator generator;

        [Obsolete("Callers should not use the ICodeCompiler interface and should instead use the methods directly on the CodeDomProvider class. Those inheriting from CodeDomProvider must still implement this interface, and should exclude this warning or also obsolete this method.")]
        public override ICodeCompiler CreateCompiler()
        {
            throw new NotImplementedException();
        }

        [Obsolete("Callers should not use the ICodeGenerator interface and should instead use the methods directly on the CodeDomProvider class. Those inheriting from CodeDomProvider must still implement this interface, and should exclude this warning or also obsolete this method.")]
        public override ICodeGenerator CreateGenerator()
        {
            return generator;
        }

        string ICodeGenerator.CreateEscapedIdentifier(string value)
        {
            return generator.CreateEscapedIdentifier(value);
        }

        string ICodeGenerator.CreateValidIdentifier(string value)
        {
            return generator.CreateEscapedIdentifier(value);
        }

        void ICodeGenerator.GenerateCodeFromCompileUnit(CodeCompileUnit e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromCompileUnit(e, w, o);
        }

        void ICodeGenerator.GenerateCodeFromExpression(CodeExpression e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromExpression(e, w, o);
        }

        void ICodeGenerator.GenerateCodeFromNamespace(CodeNamespace e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromNamespace(e, w, o);
        }

        void ICodeGenerator.GenerateCodeFromStatement(CodeStatement e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromStatement(e, w, o);
        }

        void ICodeGenerator.GenerateCodeFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromType(e, w, o);
        }

        string ICodeGenerator.GetTypeOutput(CodeTypeReference type)
        {
            return generator.GetTypeOutput(type);
        }

        bool ICodeGenerator.IsValidIdentifier(string value)
        {
            return generator.IsValidIdentifier(value);
        }

        bool ICodeGenerator.Supports(GeneratorSupport supports)
        {
            return generator.Supports(supports);
        }

        void ICodeGenerator.ValidateIdentifier(string value)
        {
            generator.ValidateIdentifier(value);
        }
    }
}
