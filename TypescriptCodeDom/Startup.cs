using System;
using System.CodeDom.Compiler;
using Microsoft.Practices.Unity;
using TypescriptCodeDom.CodeExpressions;
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
using TypescriptCodeDom.CodeNamespaces;
using TypescriptCodeDom.CodeStatements;
using TypescriptCodeDom.CodeTypeMembers;
using TypescriptCodeDom.CodeTypeParameters;
using TypescriptCodeDom.Common.Keyword;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom
{
    public class Startup
    {
        private readonly IUnityContainer _unityContainer;

        public Startup(IUnityContainer unityContainer)
        {
            _unityContainer = unityContainer;
        }

        public void Initialize()
        {
            RegisterTypes();
        }


        private void RegisterTypes()
        {
            RegisterCodeGenerator();
            RegisterExpressions();
            RegisterStatements();
            RegisterCommonTypes();
            RegisterMember();
            RegisterTypescriptTypeParameter();
            RegisterTypescriptNamespace();
        }

        private void RegisterTypescriptNamespace()
        {
            RegisterSingletonType<ITypescriptNamespace, TypescriptNamespace>();
        }

        private void RegisterTypescriptTypeParameter()
        {
            RegisterSingletonType<ITypescriptTypeParameter, TypescriptTypeParameter>();
        }

        private void RegisterMember()
        {
            RegisterSingletonType<IMemberFactory, MemberFactory>();
        }

        private void RegisterCommonTypes()
        {
            RegisterSingletonType<ITypescriptKeywordsHandler, TypescriptKeywordsHandler>();
            RegisterSingletonType<ITypescriptTypeMapper, TypescriptTypeMapper>();
        }

        private void RegisterStatements()
        {
            RegisterSingletonType<IStatementFactory, StatementFactory>();
        }

        private void RegisterCodeGenerator()
        {
            RegisterSingletonType<ICodeGenerator, TypescriptCodeGenerator>();
        }

        private void RegisterExpressions()
        {
            RegisterSingletonType<IExpressionFactory, ExpressionFactory>();
            RegisterSingletonType<ITypescriptArgumentReferenceExpression, TypescriptArgumentReferenceExpression>();
            RegisterSingletonType<ITypescriptArrayCreateExpression, TypescriptArrayCreateExpression>();
            RegisterSingletonType<ITypescriptArrayIndexerExpression, TypescriptArrayIndexerExpression>();
            RegisterSingletonType<ITypescriptBaseReferenceExpression, TypescriptBaseReferenceExpression>();
            RegisterSingletonType<ITypescriptBinaryOperatorExpression, TypescriptBinaryOperatorExpression>();
            RegisterSingletonType<ITypescriptCastExpression, TypescriptCastExpression>();
            RegisterSingletonType<ITypescriptDefaultValueExpression, TypescriptDefaultValueExpression>();
            RegisterSingletonType<ITypescriptDelegateCreateExpression, TypescriptDelegateCreateExpression>();
            RegisterSingletonType<ITypescriptDelegateInvokeExpression, TypescriptDelegateInvokeExpression>();
            RegisterSingletonType<ITypescriptDirectionExpression, TypescriptDirectionExpression>();
            RegisterSingletonType<ITypescriptEventReferenceExpression, TypescriptEventReferenceExpression>();
            RegisterSingletonType<ITypescriptFieldReferenceExpression, TypescriptFieldReferenceExpression>();
            RegisterSingletonType<ITypescriptIndexerExpression, TypescriptIndexerExpression>();
            RegisterSingletonType<ITypescriptMethodInvokeExpression, TypescriptMethodInvokeExpression>();
            RegisterSingletonType<ITypescriptMethodReferenceExpression, TypescriptMethodReferenceExpression>();
            RegisterSingletonType<ITypescriptObjectCreateExpression, TypescriptObjectCreateExpression>();
            RegisterSingletonType<ITypescriptParameterDeclarationExpression, TypescriptParameterDeclarationExpression>();
            RegisterSingletonType<ITypescriptPrimitiveExpression, TypescriptPrimitiveExpression>();
            RegisterSingletonType<ITypescriptPropertyReferenceExpression, TypescriptPropertyReferenceExpression>();
            RegisterSingletonType<ITypescriptPropertySetValueReferenceExpression, TypescriptPropertySetValueReferenceExpression>();
            RegisterSingletonType<ITypescriptSnippetExpression, TypescriptSnippetExpression>();
            RegisterSingletonType<ITypescriptThisReferenceExpression, TypescriptThisReferenceExpression>();
            RegisterSingletonType<ITypescriptTypeOfExpression, TypescriptTypeOfExpression>();
            RegisterSingletonType<ITypescriptTypeReferenceExpression, TypescriptTypeReferenceExpression>();
            RegisterSingletonType<ITypescriptVariableReferenceExpression, TypescriptVariableReferenceExpression>();
        }

        private void RegisterSingletonType<TInterface, TImplementation>()
            where TImplementation : TInterface
        {
            _unityContainer.RegisterType<TInterface, TImplementation>(new ContainerControlledLifetimeManager());
        }

    }
}