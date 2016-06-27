using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;

namespace Fonlow.TypeScriptCodeDom
{
    /// <summary>
    /// TypeScriptCodeProvider has ICodeGenerator implemented for TypeScript.
    /// </summary>
    /// <remarks>As stated in msdn, when implementing ICodeGenerator, "you must not call the corresponding method of the base class."</remarks>
    public sealed class TypeScriptCodeProvider : CodeDomProvider, ICodeGenerator
    {
        public TypeScriptCodeProvider(bool asModule=false)
        {
            generator = new TsCodeGenerator(asModule);
        }

        ICodeGenerator generator;

        [Obsolete("Callers should not use the ICodeCompiler interface and should instead use the methods directly on the CodeDomProvider class. Those inheriting from CodeDomProvider must still implement this interface, and should exclude this warning or also obsolete this method.")]
        public override ICodeCompiler CreateCompiler()
        {
            throw new NotImplementedException("TypeScript compiler is not to be supported in CodeDOM.");
        }

        [Obsolete("Callers should not use the ICodeGenerator interface and should instead use the methods directly on the CodeDomProvider class. Those inheriting from CodeDomProvider must still implement this interface, and should exclude this warning or also obsolete this method.")]
        public override ICodeGenerator CreateGenerator()
        {
            return generator;
        }

        public override string FileExtension
        {
            get
            {
                return "ts";
            }
        }

        #region ICodeGenerator

        public override string CreateEscapedIdentifier(string value)
        {
            return generator.CreateEscapedIdentifier(value);
        }

        public override string CreateValidIdentifier(string value)
        {
            return generator.CreateEscapedIdentifier(value);
        }

        public override void GenerateCodeFromCompileUnit(CodeCompileUnit e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromCompileUnit(e, w, o);
        }

        public override void GenerateCodeFromExpression(CodeExpression e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromExpression(e, w, o);
        }

        public override void GenerateCodeFromNamespace(CodeNamespace e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromNamespace(e, w, o);
        }

        public override void GenerateCodeFromStatement(CodeStatement e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromStatement(e, w, o);
        }

        public override void GenerateCodeFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
        {
            generator.GenerateCodeFromType(e, w, o);
        }

        public override string GetTypeOutput(CodeTypeReference type)
        {
            return generator.GetTypeOutput(type);
        }

        public override bool IsValidIdentifier(string value)
        {
            return generator.IsValidIdentifier(value);
        }


        public override bool Supports(GeneratorSupport supports)
        {
            return generator.Supports(supports);
        }

        /// <summary>
        /// Chick if not keyword, and leave the compiler to validate other factors
        /// </summary>
        /// <exception cref="ArgumentException"/>
        public void ValidateIdentifier(string value)
        {
            generator.ValidateIdentifier(value);
        }

        #endregion
    }
}
