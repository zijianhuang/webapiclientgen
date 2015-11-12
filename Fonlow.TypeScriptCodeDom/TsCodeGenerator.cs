using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;

namespace Fonlow.TypeScriptCodeDom
{
    internal class TsCodeGenerator : ICodeGenerator
    {
        public string CreateEscapedIdentifier(string value)
        {
            return KeywordHandler.CreateEscapedIdentifier(value);
        }

        public string CreateValidIdentifier(string value)
        {
            return KeywordHandler.CreateValidIdentifier(value);
        }

        public void GenerateCodeFromCompileUnit(CodeCompileUnit e, TextWriter w, CodeGeneratorOptions o)
        {
            for (int i = 0; i < e.ReferencedAssemblies.Count; i++)
            {
                w.WriteLine("/// "+e.ReferencedAssemblies[i]);
            }

            for (int i = 0; i < e.Namespaces.Count; i++)
            {
                GenerateCodeFromNamespace(e.Namespaces[i], w, o);
                w.WriteLine();
            }
        }

        public void GenerateCodeFromExpression(CodeExpression e, TextWriter w, CodeGeneratorOptions o)
        {
            CodeObjectHelper.GenerateCodeFromExpression(e, w, o);
        }

        public void GenerateCodeFromNamespace(CodeNamespace e, TextWriter w, CodeGeneratorOptions o)
        {
            CodeObjectHelper.GenerateCodeFromNamespace(e, w, o);
        }

        public void GenerateCodeFromStatement(CodeStatement e, TextWriter w, CodeGeneratorOptions o)
        {
            CodeObjectHelper.GenerateCodeFromStatement(e, w, o);
        }

        public void GenerateCodeFromType(CodeTypeDeclaration e, TextWriter w, CodeGeneratorOptions o)
        {
            CodeObjectHelper.GenerateCodeFromType(e, w, o);
        }

        public string GetTypeOutput(CodeTypeReference type)
        {
            return TypeMapper.MapCodeTypeReferenceToTsText(type);
        }

        public bool IsValidIdentifier(string value)
        {
            return KeywordHandler.IsValidIdentifier(value);
        }

        public bool Supports(GeneratorSupport supports)
        {
            return (supports & supported) != 0;
        }

        const GeneratorSupport supported = GeneratorSupport.ArraysOfArrays
            | GeneratorSupport.MultidimensionalArrays
            | GeneratorSupport.TryCatchStatements
            | GeneratorSupport.DeclareValueTypes
            | GeneratorSupport.DeclareEnums
           // | GeneratorSupport.GotoStatements
            | GeneratorSupport.StaticConstructors
            | GeneratorSupport.DeclareInterfaces
            | GeneratorSupport.DeclareDelegates
           // | GeneratorSupport.DeclareEvents
            | GeneratorSupport.NestedTypes
            | GeneratorSupport.MultipleInterfaceMembers
            | GeneratorSupport.ComplexExpressions
           // | GeneratorSupport.PartialTypes
            | GeneratorSupport.GenericTypeReference
            | GeneratorSupport.GenericTypeDeclaration
           // | GeneratorSupport.DeclareIndexerProperties
           ;

        public void ValidateIdentifier(string value)
        {
            KeywordHandler.ValidateIdentifier(value);
        }

    }




}
