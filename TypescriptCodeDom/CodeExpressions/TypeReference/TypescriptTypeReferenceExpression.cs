using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeExpressions.TypeReference
{
    class TypescriptTypeReferenceExpression : ITypescriptTypeReferenceExpression
    {
        private readonly CodeTypeReferenceExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;

        public TypescriptTypeReferenceExpression(
            CodeTypeReferenceExpression codeExpression,
            CodeGeneratorOptions options,
            ITypescriptTypeMapper typescriptTypeMapper)
        {
            _codeExpression = codeExpression;
            _options = options;
            _typescriptTypeMapper = typescriptTypeMapper;
        }

        public string Evaluate()
        {
            var type = _typescriptTypeMapper.GetTypeOutput(_codeExpression.Type);
            return type;
        }
    }
} 