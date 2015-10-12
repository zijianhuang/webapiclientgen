using System.CodeDom;
using System.CodeDom.Compiler;
using TypescriptCodeDom.Common;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeExpressions.TypeOf
{
    class TypescriptTypeOfExpression : ITypescriptTypeOfExpression
    {
        private readonly CodeTypeOfExpression _codeExpression;
        private readonly CodeGeneratorOptions _options;
        private ITypescriptTypeMapper _typescriptTypeMapper;

        public TypescriptTypeOfExpression(
            CodeTypeOfExpression codeExpression, 
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
            return $"instanceof {type}";
        }
    }
}