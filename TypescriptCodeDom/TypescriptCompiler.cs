using System;
using System.CodeDom;
using System.CodeDom.Compiler;

namespace TypescriptCodeDom
{
    public class TypescriptCompiler : ICodeCompiler
    {
        public CompilerResults CompileAssemblyFromDom(CompilerParameters options, CodeCompileUnit compilationUnit)
        {
            throw new NotImplementedException();
        }

        public CompilerResults CompileAssemblyFromFile(CompilerParameters options, string fileName)
        {
            throw new NotImplementedException();
        }

        public CompilerResults CompileAssemblyFromSource(CompilerParameters options, string source)
        {
            throw new NotImplementedException();
        }

        public CompilerResults CompileAssemblyFromDomBatch(CompilerParameters options, CodeCompileUnit[] compilationUnits)
        {
            throw new NotImplementedException();
        }

        public CompilerResults CompileAssemblyFromFileBatch(CompilerParameters options, string[] fileNames)
        {
            throw new NotImplementedException();
        }

        public CompilerResults CompileAssemblyFromSourceBatch(CompilerParameters options, string[] sources)
        {
            throw new NotImplementedException();
        }
    }
}