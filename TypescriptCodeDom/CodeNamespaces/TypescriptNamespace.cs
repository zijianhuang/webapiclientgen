using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using TypescriptCodeDom.CodeStatements;
using TypescriptCodeDom.CodeTypeMembers;

namespace TypescriptCodeDom.CodeNamespaces
{
    class TypescriptNamespace : ITypescriptNamespace
    {
        private readonly IStatementFactory _statementFactory;
        private readonly IMemberFactory _memberFactory;
        

        public TypescriptNamespace(
            IStatementFactory statementFactory,
            IMemberFactory memberFactory)
        {
            _statementFactory = statementFactory;
            _memberFactory = memberFactory;
            
        }

        public string Expand(CodeNamespace codeNamespace, CodeGeneratorOptions options)
        {
            var name = codeNamespace.Name;
                       
            var comments = codeNamespace.Comments
                .OfType<CodeCommentStatement>()
                .Select(statement => _statementFactory.GetStatement(statement, options).Expand())
                .ToList();

            var commentsExpression = string.Empty;
            if (comments.Any())
            {
                commentsExpression = string.Join(Environment.NewLine, comments);
            }

            var imports = codeNamespace.Imports
                .OfType<CodeNamespaceImport>()
                .Select(import => $"import {import.Namespace};")
                .ToList();
            var importsExpression = string.Empty;
            if (imports.Any())
            {
                importsExpression = $"{string.Join(Environment.NewLine, imports)}";
            }

            var types = codeNamespace.Types
                .OfType<CodeTypeDeclaration>()
                .Select(declaration =>
                {
                    declaration.UserData["AddExportKeyword"] = !string.IsNullOrWhiteSpace(codeNamespace.Name);
                    return $"{Environment.NewLine}{_memberFactory.GetMember(declaration, options).Expand()}";
                })
                .ToList();
            var typesExpression = string.Empty;
            if (types.Any())
            {
                typesExpression = $"{string.Join(Environment.NewLine, types)}";
            }

            if (string.IsNullOrWhiteSpace(name))
                return $"{importsExpression}{commentsExpression}{Environment.NewLine}{typesExpression}{Environment.NewLine}";
            return $"{importsExpression}{commentsExpression}{Environment.NewLine}module {name}{{{typesExpression}{Environment.NewLine}}}";

        }
    }
}
