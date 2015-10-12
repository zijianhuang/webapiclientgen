using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using TypescriptCodeDom.CodeExpressions.ArgumentReference;
using TypescriptCodeDom.CodeExpressions.ArrayCreate;
using TypescriptCodeDom.CodeExpressions.ArrayIndexer;
using TypescriptCodeDom.CodeExpressions.BaseReference;
using TypescriptCodeDom.CodeExpressions.BinaryOperator;
using TypescriptCodeDom.CodeExpressions.Cast;
using TypescriptCodeDom.CodeExpressions.DefaultValue;
using TypescriptCodeDom.CodeExpressions.DelegateCreate;
using TypescriptCodeDom.CodeExpressions.DelegateInvoke;
using TypescriptCodeDom.CodeExpressions.Direction;
using TypescriptCodeDom.CodeExpressions.EventReference;
using TypescriptCodeDom.CodeExpressions.FieldReference;
using TypescriptCodeDom.CodeExpressions.Indexer;
using TypescriptCodeDom.CodeExpressions.MethodInvoke;
using TypescriptCodeDom.CodeExpressions.MethodReference;
using TypescriptCodeDom.CodeExpressions.ObjectCreate;
using TypescriptCodeDom.CodeExpressions.ParameterDeclaration;
using TypescriptCodeDom.CodeExpressions.Primitive;
using TypescriptCodeDom.CodeExpressions.PropertyReference;
using TypescriptCodeDom.CodeExpressions.PropertySetValue;
using TypescriptCodeDom.CodeExpressions.Snippet;
using TypescriptCodeDom.CodeExpressions.ThisReference;
using TypescriptCodeDom.CodeExpressions.TypeOf;
using TypescriptCodeDom.CodeExpressions.TypeReference;
using TypescriptCodeDom.CodeExpressions.VariableReference;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeExpressions
{
    public class ExpressionFactory : IExpressionFactory
    {
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;
        private readonly Dictionary<Type, Func<CodeExpression, CodeGeneratorOptions, IExpression>> _expressionMap;

        public ExpressionFactory(
            ITypescriptTypeMapper typescriptTypeMapper)
        {
            _typescriptTypeMapper = typescriptTypeMapper;
            _expressionMap = new Dictionary<Type, Func<CodeExpression, CodeGeneratorOptions, IExpression>>();

            ConstructExpressions();
        }

        private void ConstructExpressions()
        {
            _expressionMap[typeof(CodeArgumentReferenceExpression)] = (codeExpression, options) => new TypescriptArgumentReferenceExpression((CodeArgumentReferenceExpression)codeExpression, options);
            _expressionMap[typeof(CodeArrayCreateExpression)] = (codeExpression, options) => new TypescriptArrayCreateExpression(this, (CodeArrayCreateExpression)codeExpression, options, _typescriptTypeMapper);
            _expressionMap[typeof(CodeArrayIndexerExpression)] = (codeExpression, options) => new TypescriptArrayIndexerExpression(this, (CodeArrayIndexerExpression)codeExpression, options);
            _expressionMap[typeof(CodeBaseReferenceExpression)] = (codeExpression, options) => new TypescriptBaseReferenceExpression((CodeBaseReferenceExpression)codeExpression, options);
            _expressionMap[typeof(CodeBinaryOperatorExpression)] = (codeExpression, options) => new TypescriptBinaryOperatorExpression(this, (CodeBinaryOperatorExpression)codeExpression, options);
            _expressionMap[typeof(CodeCastExpression)] = (codeExpression, options) => new TypescriptCastExpression(this, (CodeCastExpression)codeExpression, options, _typescriptTypeMapper);
            _expressionMap[typeof(CodeDefaultValueExpression)] = (codeExpression, options) => new TypescriptDefaultValueExpression((CodeDefaultValueExpression)codeExpression, options, _typescriptTypeMapper);
            _expressionMap[typeof(CodeDelegateCreateExpression)] = (codeExpression, options) => new TypescriptDelegateCreateExpression(this, (CodeDelegateCreateExpression)codeExpression, options);
            _expressionMap[typeof(CodeDelegateInvokeExpression)] = (codeExpression, options) => new TypescriptDelegateInvokeExpression(this, (CodeDelegateInvokeExpression)codeExpression, options);
            _expressionMap[typeof(CodeDirectionExpression)] = (codeExpression, options) => new TypescriptDirectionExpression(this, (CodeDirectionExpression)codeExpression, options);
            _expressionMap[typeof(CodeEventReferenceExpression)] = (codeExpression, options) => new TypescriptEventReferenceExpression(this, (CodeEventReferenceExpression)codeExpression, options);
            _expressionMap[typeof(CodeFieldReferenceExpression)] = (codeExpression, options) => new TypescriptFieldReferenceExpression(this, (CodeFieldReferenceExpression)codeExpression, options);
            _expressionMap[typeof(CodeIndexerExpression)] = (codeExpression, options) => new TypescriptIndexerExpression(this, (CodeIndexerExpression)codeExpression, options);
            _expressionMap[typeof(CodeMethodInvokeExpression)] = (codeExpression, options) => new TypescriptMethodInvokeExpression(this, (CodeMethodInvokeExpression)codeExpression, options);
            _expressionMap[typeof(CodeMethodReferenceExpression)] = (codeExpression, options) => new TypescriptMethodReferenceExpression(this, (CodeMethodReferenceExpression)codeExpression, options);
            _expressionMap[typeof(CodeObjectCreateExpression)] = (codeExpression, options) => new TypescriptObjectCreateExpression(this, (CodeObjectCreateExpression)codeExpression, options, _typescriptTypeMapper);
            _expressionMap[typeof(CodeParameterDeclarationExpression)] = (codeExpression, options) => new TypescriptParameterDeclarationExpression((CodeParameterDeclarationExpression)codeExpression, options, _typescriptTypeMapper);
            _expressionMap[typeof(CodePrimitiveExpression)] = (codeExpression, options) => new TypescriptPrimitiveExpression((CodePrimitiveExpression)codeExpression, options);
            _expressionMap[typeof(CodePropertyReferenceExpression)] = (codeExpression, options) => new TypescriptPropertyReferenceExpression(this, (CodePropertyReferenceExpression)codeExpression, options);
            _expressionMap[typeof(CodePropertySetValueReferenceExpression)] = (codeExpression, options) => new TypescriptPropertySetValueReferenceExpression((CodePropertySetValueReferenceExpression)codeExpression, options);
            _expressionMap[typeof(CodeSnippetExpression)] = (codeExpression, options) => new TypescriptSnippetExpression((CodeSnippetExpression)codeExpression, options);
            _expressionMap[typeof(CodeThisReferenceExpression)] = (codeExpression, options) => new TypescriptThisReferenceExpression((CodeThisReferenceExpression)codeExpression, options);
            _expressionMap[typeof(CodeTypeOfExpression)] = (codeExpression, options) => new TypescriptTypeOfExpression((CodeTypeOfExpression)codeExpression, options, _typescriptTypeMapper);
            _expressionMap[typeof(CodeTypeReferenceExpression)] = (codeExpression, options) => new TypescriptTypeReferenceExpression((CodeTypeReferenceExpression)codeExpression, options, _typescriptTypeMapper);
            _expressionMap[typeof(CodeVariableReferenceExpression)] = (codeExpression, options) => new TypescriptVariableReferenceExpression((CodeVariableReferenceExpression)codeExpression, options);
        }

        public IExpression GetExpression(CodeExpression expression, CodeGeneratorOptions options)
        {
            return _expressionMap[expression.GetType()](expression, options);
        }
    }
}