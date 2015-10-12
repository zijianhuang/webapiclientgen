using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeExpressions.ParameterDeclaration
{
    class TypescriptParameterDeclarationExpression : ITypescriptParameterDeclarationExpression
    {
        private readonly CodeParameterDeclarationExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;
        private ITypescriptTypeMapper _typescriptTypeMapper;

        public TypescriptParameterDeclarationExpression(
            CodeParameterDeclarationExpression codeExpression,
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
            return $"{_codeExpression.Name}: {type}";
        }
    }
}  