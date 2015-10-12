using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Linq;
using TypescriptCodeDom.CodeExpressions;
using TypescriptCodeDom.CodeNamespaces;
using TypescriptCodeDom.CodeStatements;
using TypescriptCodeDom.CodeTypeMembers;
using TypescriptCodeDom.Common.Keyword;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom
{
    public class TypescriptCodeGenerator : ICodeGenerator
    {
        private readonly IMemberFactory _memberFactory;
        private readonly ITypescriptKeywordsHandler _typescriptKeywordsHandler;
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;
        private readonly IExpressionFactory _expressionFactory;
        private readonly ITypescriptNamespace _typescriptNamespace;
        private readonly IStatementFactory _statementFactory;

        public TypescriptCodeGenerator(
            IMemberFactory memberFactory,
            IStatementFactory statementFactory, 
            IExpressionFactory expressionFactory,
            ITypescriptNamespace typescriptNamespace,
            ITypescriptTypeMapper typescriptTypeMapper,
            ITypescriptKeywordsHandler typescriptKeywordsHandler)
        {
            _memberFactory = memberFactory;
            _typescriptKeywordsHandler = typescriptKeywordsHandler;
            _typescriptTypeMapper = typescriptTypeMapper;
            _expressionFactory = expressionFactory;
            _typescriptNamespace = typescriptNamespace;
            _statementFactory = statementFactory;
        }


        public bool IsValidIdentifier(string value)
        {
            return _typescriptKeywordsHandler.IsValidIdentifier(value);
        }

        public void ValidateIdentifier(string value)
        {
            _typescriptKeywordsHandler.ValidateIdentifier(value);
        }

        public string CreateEscapedIdentifier(string value)
        {
            return _typescriptKeywordsHandler.CreateEscapedIdentifier(value);
        }

        public string CreateValidIdentifier(string value)
        {
            return _typescriptKeywordsHandler.CreateValidIdentifier(value);
        }

        public string GetTypeOutput(CodeTypeReference type)
        {
            return _typescriptTypeMapper.GetTypeOutput(type);
        }

        public bool Supports(GeneratorSupport supports)
        {
            var supportedOperations = GetSupportedOperations();
            return (supports & supportedOperations) != 0 ;
        }

        private GeneratorSupport GetSupportedOperations()
        {
            return GeneratorSupport.ArraysOfArrays
            | GeneratorSupport.MultidimensionalArrays
            | GeneratorSupport.TryCatchStatements
            | GeneratorSupport.DeclareValueTypes
            | GeneratorSupport.DeclareEnums
            | GeneratorSupport.GotoStatements
            | GeneratorSupport.StaticConstructors
            | GeneratorSupport.DeclareInterfaces
            | GeneratorSupport.DeclareDelegates
            | GeneratorSupport.DeclareEvents
            | GeneratorSupport.NestedTypes
            | GeneratorSupport.MultipleInterfaceMembers
            | GeneratorSupport.ComplexExpressions
            | GeneratorSupport.PartialTypes
            | GeneratorSupport.GenericTypeReference
            | GeneratorSupport.GenericTypeDeclaration
            | GeneratorSupport.DeclareIndexerProperties;
        }


        public void GenerateCodeFromExpression(CodeExpression codeExpression, TextWriter textWriter, CodeGeneratorOptions options)
        {
            var expression = _expressionFactory.GetExpression(codeExpression, options);
            textWriter.Write(expression.Evaluate());
        }
        
        public void GenerateCodeFromStatement(CodeStatement codeStatement, TextWriter textWriter, CodeGeneratorOptions options)
        {
            var statement = _statementFactory.GetStatement(codeStatement, options);
            textWriter.Write(statement.Expand());
        }

        public void GenerateCodeFromNamespace(CodeNamespace codeNamespace, TextWriter textWriter, CodeGeneratorOptions options)
        {
            var namespaces = _typescriptNamespace.Expand(codeNamespace, options);
            textWriter.Write(namespaces);
        }

        public void GenerateCodeFromType(CodeTypeDeclaration member, TextWriter textWriter, CodeGeneratorOptions options)
        {
            var typeMember = _memberFactory.GetMember(member, options);
            textWriter.Write(typeMember.Expand());
        }

        public void GenerateCodeFromCompileUnit(CodeCompileUnit codeCompileUnit, TextWriter textWriter, CodeGeneratorOptions options)
        {
            var namespaces = codeCompileUnit.Namespaces
                .OfType<CodeNamespace>()
                .Select(ns => _typescriptNamespace.Expand(ns, options))
                .ToList();

            var namespacesExpression = string.Join(Environment.NewLine, namespaces);
            textWriter.Write(namespacesExpression);
        }
    }
}