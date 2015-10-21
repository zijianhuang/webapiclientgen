using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using System.Collections.Generic;
using Fonlow.TypeScriptCodeDom;
using System.Diagnostics;
using System.Runtime.Serialization;
using System;

namespace Fonlow.Poco2Ts
{
    public class TsPodGen
    {
        CodeCompileUnit targetUnit;
        Dictionary<string, object> apiClassesDic;
        CodeTypeDeclaration[] newTypesCreated;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="prefixesOfCustomNamespaces">Prefixes of namespaces of custom complex data types, so the code gen will use .client of client data types.</param>
        /// <param name="excludedControllerNames">Excluse some Api Controllers from being exposed to the client API. Each item should be fully qualified class name but without the assembly name.</param>
        /// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
        public TsPodGen()
        {
            targetUnit = new CodeCompileUnit();
            apiClassesDic = new Dictionary<string, object>();
        }

        /// <summary>
        /// Save TS codes into a file.
        /// </summary>
        /// <param name="fileName"></param>
        public void SaveTsCode(string fileName)
        {
            var provider = new TypeScriptCodeProvider();
            //    var provider = CodeDomProvider.CreateProvider("CSharp");
            CodeGeneratorOptions options = new CodeGeneratorOptions()
            {
                BracingStyle = "JS",//not really used
                IndentString = "    ",
            };
            using (StreamWriter writer = new StreamWriter(fileName))
            {
                provider.GenerateCodeFromCompileUnit(targetUnit, writer, options);
            }
        }

        static bool IsClassOrStruct(Type type)
        {
            return type.IsClass || (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
        }

        Type[] pendingTypes;
        string[] pendingTypesNames;

        /// <summary>
        /// Generate type declarations in TS for POCO types
        /// </summary>
        /// <param name="types">POCO types</param>
        public void Generate(Type[] types)
        {
            this.pendingTypes = types;
            this.pendingTypesNames = types.Select(d => d.FullName).ToArray();
            var typeGroupedByNamespace = types.GroupBy(d => d.Namespace);
            var namespacesOfTypes = typeGroupedByNamespace.Select(d => d.Key).ToArray();
            foreach (var groupedTypes in typeGroupedByNamespace)
            {
                var clientNamespaceText = groupedTypes.Key + ".Client";
                var clientNamespace = new CodeNamespace(clientNamespaceText);
                targetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

                Debug.WriteLine("Generating types in namespace: " + groupedTypes.Key + " ...");
                newTypesCreated = groupedTypes.Select(type =>
                {
                    var tsName = type.Name;
                    Debug.WriteLine("tsClass: " + clientNamespace + "  " + tsName);

                    CodeTypeDeclaration typeDeclaration;
                    if (IsClassOrStruct(type))
                    {
                        typeDeclaration = CreatePodClientInterface(clientNamespace, tsName);

                        if (!type.IsValueType)
                        {
                            if (namespacesOfTypes.Contains(type.BaseType.Namespace))
                            {
                                typeDeclaration.BaseTypes.Add(type.BaseType.Namespace + ".Client." + type.BaseType.Name);
                            }
                            else
                            {
                                typeDeclaration.BaseTypes.Add(type.BaseType);
                            }
                        }


                        foreach (var propertyInfo in type.GetProperties())
                        {
                            string tsPropertyName;
                            var dataMemberAttribute = PropertyHelper.ReadAttribute<DataMemberAttribute>(propertyInfo);
                            if (dataMemberAttribute != null)
                            {
                                tsPropertyName = String.IsNullOrEmpty(dataMemberAttribute.Name) ? propertyInfo.Name : dataMemberAttribute.Name;
                                Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, propertyInfo.PropertyType.Name));
                                var clientField = new CodeMemberField()
                                {
                                    Name = tsPropertyName,
                                    Type = GetClientFieldTypeText(propertyInfo.PropertyType),
                                    //                     Attributes = MemberAttributes.Public,

                                };
                                typeDeclaration.Members.Add(clientField);

                            }


                        }

                        foreach (var fieldInfo in type.GetFields().Where(d => d.IsPublic))
                        {
                            string tsPropertyName;
                            var dataMemberAttribute = PropertyHelper.ReadAttribute<DataMemberAttribute>(fieldInfo);
                            if (dataMemberAttribute != null)
                            {
                                tsPropertyName = String.IsNullOrEmpty(dataMemberAttribute.Name) ? fieldInfo.Name : dataMemberAttribute.Name;
                                Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, fieldInfo.FieldType.Name));
                                var clientField = new CodeMemberField()
                                {
                                    Name = tsPropertyName,
                                    Type = GetClientFieldTypeText(fieldInfo.FieldType),
                                    //         Attributes = MemberAttributes.Public,
                                };

                                typeDeclaration.Members.Add(clientField);
                            }
                        }
                    }
                    else if (type.IsEnum)
                    {
                        typeDeclaration = CreatePodClientEnum(clientNamespace, tsName);

                        int k = 0;
                        foreach (var fieldInfo in type.GetFields(BindingFlags.Public | BindingFlags.Static))
                        {
                            var name = fieldInfo.Name;
                            var intValue = (int)Convert.ChangeType(fieldInfo.GetValue(null), typeof(int));
                            Debug.WriteLine(name + " -- " + intValue);
                            var isInitialized = intValue != k;

                            var clientField = new CodeMemberField()
                            {
                                Name = name,
                                Type = new CodeTypeReference(fieldInfo.FieldType),
                                InitExpression = isInitialized ? new CodePrimitiveExpression(intValue) : null,
                                //  Attributes= MemberAttributes.Public,
                            };

                            typeDeclaration.Members.Add(clientField);
                            k++;
                        }

                    }
                    else
                    {
                        Trace.TraceWarning("Not yet supported: " + type.Name);
                        typeDeclaration = null;
                    }

                    return typeDeclaration;
                }
                    ).ToArray();//add classes into the namespace
            }


        }


        CodeTypeReference GetClientFieldTypeText(Type t)
        {
            if (pendingTypes.Contains(t))
                return new CodeTypeReference(t.Namespace + ".Client." + t.Name);
            else if (t.IsGenericType)
            {
                if (t.GetInterfaces().Any(d => d.IsGenericType && d.GetGenericTypeDefinition() == typeof(IEnumerable<>)))
                {
                    var genericTypeNames = t.GenericTypeArguments.Select(d => GetClientFieldTypeText(d)).ToArray();
                    var codeTypeReference = new CodeTypeReference(typeof(IList<>));
                    codeTypeReference.TypeArguments.AddRange(genericTypeNames);

                    return codeTypeReference;
                }
                else if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    var genericTypeNames = t.GenericTypeArguments.Select(d => GetClientFieldTypeText(d)).ToArray();
                    var codeTypeReference = new CodeTypeReference(typeof(Nullable<>));
                    codeTypeReference.TypeArguments.AddRange(genericTypeNames);

                    return codeTypeReference;
                }
                else
                    return null;
            }
            else if (t.IsArray)
            {
                Debug.Assert(t.Name.EndsWith("]"));
                var elementType = t.GetElementType();
                var arrayRank = t.GetArrayRank();
                if (pendingTypes.Contains(elementType))
                {
                    var elementTypeReference = new CodeTypeReference(t.Namespace + ".Client." + elementType.Name);
                    var arrayTypeReference = new CodeTypeReference("System.Array");
                    var typeReference = new CodeTypeReference(arrayTypeReference, arrayRank)
                    {
                        ArrayElementType = elementTypeReference,
                    };
                    return typeReference;
                }

                var otherArrayType= new CodeTypeReference(new CodeTypeReference(), arrayRank)//CodeDom does not care. The baseType is always overwritten by ArrayElementType.
                {
                    ArrayElementType = GetClientFieldTypeText(elementType),
                };
                return otherArrayType;
            }

            return new CodeTypeReference(t);

        }



        static CodeTypeDeclaration CreatePodClientInterface(CodeNamespace ns, string className)
        {
            var targetClass = new CodeTypeDeclaration(className)
            {
                TypeAttributes = TypeAttributes.Public | TypeAttributes.Interface, //setting IsInterface has no use
            };

            ns.Types.Add(targetClass);
            return targetClass;
        }

        static CodeTypeDeclaration CreatePodClientEnum(CodeNamespace ns, string className)
        {
            var targetClass = new CodeTypeDeclaration(className)
            {
                IsEnum = true,
            };

            ns.Types.Add(targetClass);
            return targetClass;
        }



    }

}
