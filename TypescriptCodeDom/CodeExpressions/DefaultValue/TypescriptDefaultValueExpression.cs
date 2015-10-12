using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeExpressions.DefaultValue
{
    class TypescriptDefaultValueExpression : ITypescriptDefaultValueExpression
    {
        private readonly CodeDefaultValueExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;

        public TypescriptDefaultValueExpression(
            CodeDefaultValueExpression codeExpression,
            CodeGeneratorOptions options, 
            ITypescriptTypeMapper typescriptTypeMapper)
        {
            _codeExpression = codeExpression;
            _options = options;
            _typescriptTypeMapper = typescriptTypeMapper;
        }

        public string Evaluate()
        {
            return $"new {_typescriptTypeMapper.GetTypeOutput(_codeExpression.Type)}()";
        }
    }
}