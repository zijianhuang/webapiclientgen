using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TypescriptCodeDom.CodeTypeParameters;
using TypescriptCodeDom.Common.TypeMapper;

namespace TypescriptCodeDom.CodeTypeMembers
{
    class TypescriptTypeDeclaration : IMember
    {
        private readonly CodeTypeDeclaration _typeDeclaration;
        private readonly IMemberFactory _memberFactory;
        private readonly ITypescriptTypeMapper _typescriptTypeMapper;
        private readonly ITypescriptTypeParameter _typescriptTypeParameter;
        private readonly CodeGeneratorOptions _options;

        public TypescriptTypeDeclaration(
            CodeTypeDeclaration typeDeclaration,
            IMemberFactory memberFactory,
            ITypescriptTypeMapper typescriptTypeMapper,
            ITypescriptTypeParameter typescriptTypeParameter,
            CodeGeneratorOptions options)
        {
            _typeDeclaration = typeDeclaration;
            _memberFactory = memberFactory;
            _typescriptTypeMapper = typescriptTypeMapper;
            _typescriptTypeParameter = typescriptTypeParameter;
            _options = options;
        }

        public string Expand()
        {
            var accessModifier = (bool)_typeDeclaration.UserData["AddExportKeyword"] ? GetAccessModifier(_typeDeclaration.TypeAttributes) : string.Empty;
            var name = _typeDeclaration.Name;
            var typeType = GetTypeOfType(_typeDeclaration);

            var codeTypeMembers = _typeDeclaration.Members            
                .OfType<CodeTypeMember>()
                .ToList();

            var onlyOneConstructor = codeTypeMembers
                .Where(member => member is CodeConstructor)
                .Take(1);

            var members = codeTypeMembers
                .Where(member => IsSupportedType(member) && !(member is CodeConstructor))
                .Union(onlyOneConstructor)
                .Select(member =>
                {
                    member.UserData["HasBaseConstructorCall"] = _typeDeclaration.BaseTypes.Count > 0;
                    member.UserData["GenerateFieldType"] = !_typeDeclaration.IsEnum;                    
                    member.UserData["GenerateAccessModifier"] = !_typeDeclaration.IsInterface;
                    member.UserData["GenerateMethodBody"] = !_typeDeclaration.IsInterface;
                    member.UserData["GeneratePropertyBody"] = !_typeDeclaration.IsInterface;
                    return _memberFactory.GetMember(member, _options).Expand();
                })
                .ToList();

            var membersExpression = string.Empty;
            if (members.Any())
            {
                membersExpression = string.Join(Environment.NewLine, members.Where(member => !string.IsNullOrWhiteSpace(member)));
            }

            var typeParameters = _typeDeclaration.TypeParameters.OfType<CodeTypeParameter>()
                .Select(parameter => _typescriptTypeParameter.Evaluate(parameter))
                .ToList();
            var typeParametersExpression = string.Empty;
            if (typeParameters.Any())
            {
                typeParametersExpression = $"<{string.Join(",", typeParameters)}>";
            }

            var baseTypes = _typeDeclaration.BaseTypes
                .OfType<CodeTypeReference>()
                .Where(reference => _typescriptTypeMapper.IsValidTypeForDerivation(reference))
                .Select(reference => _typescriptTypeMapper.GetTypeOutput(reference))
                .ToList();
            var baseTypesExpression = string.Empty;
            if (baseTypes.Any() && !_typeDeclaration.IsEnum)
            {
                baseTypesExpression = $" extends {string.Join(",", baseTypes)}";
            }

            return $"{accessModifier}{typeType} {name}{typeParametersExpression}{baseTypesExpression}{{{Environment.NewLine}{membersExpression}{Environment.NewLine}}}";

        }

        private bool IsSupportedType(CodeTypeMember member)
        {
            return !(member is CodeMemberEvent);
        }

        private string GetAccessModifier(TypeAttributes attributes)
        {
            return (attributes & TypeAttributes.Public) == TypeAttributes.Public
                ? "export "
                : string.Empty;
        }

        private string GetTypeOfType(CodeTypeDeclaration typeDeclaration)
        {
            return typeDeclaration.IsEnum
                ? "enum"
                : typeDeclaration.IsInterface
                    ? "interface"
                    : "class";
        }
    }
}