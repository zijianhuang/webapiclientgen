using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using TypescriptCodeDom.CodeExpressions;

namespace TypescriptCodeDom.CodeStatements
{
    class StatementFactory : IStatementFactory
    {
        private readonly IExpressionFactory _expressionFactory;
        private readonly Dictionary<Type, Func<CodeStatement, CodeGeneratorOptions, IStatement>> _statementMap;

        public StatementFactory(IExpressionFactory expressionFactory)
        {
            _expressionFactory = expressionFactory;
            _statementMap = new Dictionary<Type, Func<CodeStatement, CodeGeneratorOptions, IStatement>>();
            ConstructStatementsMap();
        }

        private void ConstructStatementsMap()
        {
            _statementMap[typeof(CodeAssignStatement)] = (codeStatement, options) => new TypescriptAssignStatement(_expressionFactory, (CodeAssignStatement)codeStatement, options);
            _statementMap[typeof(CodeAttachEventStatement)] = (codeStatement, options) => new TypescriptAttachEventStatement(_expressionFactory, (CodeAttachEventStatement)codeStatement, options);
            _statementMap[typeof(CodeCommentStatement)] = (codeStatement, options) => new TypescriptCommentStatement(_expressionFactory, (CodeCommentStatement)codeStatement, options);
            _statementMap[typeof(CodeConditionStatement)] = (codeStatement, options) => new TypescriptConditionStatement(this, _expressionFactory, (CodeConditionStatement)codeStatement, options);
            _statementMap[typeof(CodeExpressionStatement)] = (codeStatement, options) => new TypescriptExpressionStatement(this, _expressionFactory, (CodeExpressionStatement)codeStatement, options);
            _statementMap[typeof(CodeGotoStatement)] = (codeStatement, options) => new TypescriptGotoStatement(this, _expressionFactory, (CodeGotoStatement)codeStatement, options);
            _statementMap[typeof(CodeIterationStatement)] = (codeStatement, options) => new TypescriptIterationStatement(this, _expressionFactory, (CodeIterationStatement)codeStatement, options);
            _statementMap[typeof(CodeLabeledStatement)] = (codeStatement, options) => new TypescriptLabeledStatement(this, _expressionFactory, (CodeLabeledStatement)codeStatement, options);
            _statementMap[typeof(CodeMethodReturnStatement)] = (codeStatement, options) => new TypescriptMethodReturnStatement(this, _expressionFactory, (CodeMethodReturnStatement)codeStatement, options);
            _statementMap[typeof(CodeRemoveEventStatement)] = (codeStatement, options) => new TypescriptRemoveEventStatement(this, _expressionFactory, (CodeRemoveEventStatement)codeStatement, options);
            _statementMap[typeof(CodeSnippetStatement)] = (codeStatement, options) => new TypescriptSnippetStatement(_expressionFactory, (CodeSnippetStatement)codeStatement, options);
            _statementMap[typeof(CodeThrowExceptionStatement)] = (codeStatement, options) => new TypescriptThrowExceptionStatement(_expressionFactory, (CodeThrowExceptionStatement)codeStatement, options);
            _statementMap[typeof(CodeTryCatchFinallyStatement)] = (codeStatement, options) => new TypescriptTryCatchFinallyStatement(this, _expressionFactory, (CodeTryCatchFinallyStatement)codeStatement, options);
            _statementMap[typeof(CodeVariableDeclarationStatement)] = (codeStatement, options) => new TypescriptVariableDeclarationStatement(this, _expressionFactory, (CodeVariableDeclarationStatement)codeStatement, options);
        }

        public IStatement GetStatement(CodeStatement codeStatement, CodeGeneratorOptions codeGeneratorOptions)
        {
            return _statementMap[codeStatement.GetType()](codeStatement, codeGeneratorOptions);
        }
    }
}