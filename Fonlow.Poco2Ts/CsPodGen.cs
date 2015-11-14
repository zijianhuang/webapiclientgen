using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Serialization;
using System;
using Fonlow.Poco2Client;

namespace Fonlow.Poco2Ts
{
    /// <summary>
    /// POCO to TypeScript interfaces generator
    /// </summary>
    public class Poco2CsGen
    {
        CodeCompileUnit targetUnit;

        /// <summary>
        /// Init with its own CodeCompileUnit.
        /// </summary>
        public Poco2CsGen()
        {
            targetUnit = new CodeCompileUnit();
        }

        /// <summary>
        /// Poco2TsGen will share the same CodeCompileUnit with other CodeGen components.
        /// </summary>
        /// <param name="codeCompileUnit"></param>
        public Poco2CsGen(CodeCompileUnit codeCompileUnit)
        {
            targetUnit = codeCompileUnit;
        }


        /// <summary>
        /// Save TypeScript codes generated into a file.
        /// </summary>
        /// <param name="fileName"></param>
        public void SaveTsCodeToFile(string fileName)
        {
            if (String.IsNullOrEmpty(fileName))
                throw new ArgumentException("A valid fileName is not defined.", "fileName");

            try
            {
                using (StreamWriter writer = new StreamWriter(fileName))
                {
                    WriteCode(writer);
                }
            }
            catch (IOException e)
            {
                Trace.TraceWarning(e.Message);
            }
            catch (UnauthorizedAccessException e)
            {
                Trace.TraceWarning(e.Message);
            }
            catch (System.Security.SecurityException e)
            {
                Trace.TraceWarning(e.Message);
            }
        }

        /// <summary>
        /// Save TypeScript codes generated into a TextWriter.
        /// </summary>
        /// <param name="writer"></param>
        public void WriteCode(TextWriter writer)
        {
            if (writer == null)
                throw new ArgumentNullException("writer", "No TextWriter instance is defined.");

            CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp");
            CodeGeneratorOptions options = new CodeGeneratorOptions();

            provider.GenerateCodeFromCompileUnit(targetUnit, writer, options);
        }

        public void CreateTsCodeDom(Assembly assembly, CherryPickingMethods methods)
        {
            var cherryTypes = GetCherryTypes(assembly, methods);
            CreateCodeDom(cherryTypes, methods);
        }


        static bool IsClassOrStruct(Type type)
        {
            return type.IsClass || (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
        }

        Type[] pendingTypes;
        /// <summary>
        /// Create TypeScript CodeDOM for POCO types. 
        /// For an enum type, all members will be processed regardless of EnumMemberAttribute.
        /// </summary>
        /// <param name="types">POCO types.</param>
        public void CreateCodeDom(Type[] types, CherryPickingMethods methods)
        {
            if (types == null)
                throw new ArgumentNullException("types", "types is not defined.");

            this.pendingTypes = types;
            var typeGroupedByNamespace = types.GroupBy(d => d.Namespace);
            var namespacesOfTypes = typeGroupedByNamespace.Select(d => d.Key).ToArray();
            foreach (var groupedTypes in typeGroupedByNamespace)
            {
                var clientNamespaceText = (groupedTypes.Key + ".Client");
                var clientNamespace = new CodeNamespace(clientNamespaceText);
                targetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

                Debug.WriteLine("Generating types in namespace: " + groupedTypes.Key + " ...");
                groupedTypes.Select(type =>
                {
                    var tsName = type.Name;
                    Debug.WriteLine("clientClass: " + clientNamespace + "  " + tsName);

                    CodeTypeDeclaration typeDeclaration;
                    if (IsClassOrStruct(type))
                    {
                        typeDeclaration = CreatePodClientClass(clientNamespace, tsName);

                        if (!type.IsValueType)
                        {
                            if (namespacesOfTypes.Contains(type.BaseType.Namespace))
                            {
                                typeDeclaration.BaseTypes.Add(RefineCustomComplexTypeText(type.BaseType));
                            }
                            else
                            {
                                typeDeclaration.BaseTypes.Add(type.BaseType);
                            }
                        }


                        foreach (var propertyInfo in type.GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public))
                        {
                            var cherryType = CherryPicking.GetMemberCherryType(propertyInfo, methods);
                            if (cherryType == CherryType.None)
                                continue;
                            string tsPropertyName;


                            var isRequired = cherryType == CherryType.BigCherry;
                            tsPropertyName = propertyInfo.Name;//todo: String.IsNullOrEmpty(dataMemberAttribute.Name) ? propertyInfo.Name : dataMemberAttribute.Name;
                            Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, propertyInfo.PropertyType.Name));

                            var clientProperty = new CodeMemberProperty()
                            {
                                Name = tsPropertyName,
                                Type = TranslateToTsTypeReference(propertyInfo.PropertyType),
                                Attributes= MemberAttributes.Public | MemberAttributes.Final,
                                //todo: add some attributes
                                
                            };
                            var privateFieldName = "_" + tsPropertyName;

                            typeDeclaration.Members.Add(new CodeMemberField()
                            {
                                Name = privateFieldName,
                                Type = TranslateToTsTypeReference(propertyInfo.PropertyType),
                            });

                            clientProperty.GetStatements.Add(new CodeSnippetStatement($"                return {privateFieldName};"));
                            clientProperty.SetStatements.Add(new CodeSnippetStatement($"                {privateFieldName} = value;"));
                            typeDeclaration.Members.Add(clientProperty);
                        }

                        foreach (var fieldInfo in type.GetFields(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public))
                        {
                            var cherryType = CherryPicking.GetMemberCherryType(fieldInfo, methods);
                            if (cherryType == CherryType.None)
                                continue;
                            string tsPropertyName;


                            var isRequired = cherryType == CherryType.BigCherry;


                            tsPropertyName = fieldInfo.Name;//todo: String.IsNullOrEmpty(dataMemberAttribute.Name) ? propertyInfo.Name : dataMemberAttribute.Name;
                            Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, fieldInfo.FieldType.Name));
                            var clientProperty = new CodeMemberProperty()
                            {
                                Name = tsPropertyName,
                                Type = TranslateToTsTypeReference(fieldInfo.FieldType),
                                Attributes = MemberAttributes.Public | MemberAttributes.Final,
                                //todo: add some attributes

                            };
                            var privateFieldName = "_" + tsPropertyName;

                            typeDeclaration.Members.Add(new CodeMemberField()
                            {
                                Name = privateFieldName,
                                Type = TranslateToTsTypeReference(fieldInfo.FieldType),
                            });

                            clientProperty.GetStatements.Add(new CodeSnippetStatement($"                return {privateFieldName};"));
                            clientProperty.SetStatements.Add(new CodeSnippetStatement($"                {privateFieldName} = value;"));
                            typeDeclaration.Members.Add(clientProperty);
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


        public CodeTypeReference TranslateToTsTypeReference(Type t)
        {
            if (t == null)
                return new CodeTypeReference("void");

            if (pendingTypes.Contains(t))
                return new CodeTypeReference(RefineCustomComplexTypeText(t));
            else if (t.IsGenericType)
            {
                if (t.GetInterface("IEnumerable", true) != null)
                {
                    Debug.Assert(t.GenericTypeArguments.Length == 1);
                    var elementType = t.GenericTypeArguments[0];
                    return CreateArrayTypeReference(elementType, 1);

                }
                else if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    return new CodeTypeReference(t);
                }
                else
                    return null;
            }
            else if (t.IsArray)
            {
                Debug.Assert(t.Name.EndsWith("]"));
                var elementType = t.GetElementType();
                var arrayRank = t.GetArrayRank();
                return CreateArrayTypeReference(elementType, arrayRank);
            }


            return new CodeTypeReference(t);

        }

        static string RefineCustomComplexTypeText(Type t)
        {
            return t.Namespace + ".Client." + t.Name;
        }

        static CodeTypeReference CreateArrayOfCustomTypeReference(Type elementType, int arrayRank)
        {
            var elementTypeReference = new CodeTypeReference(RefineCustomComplexTypeText(elementType));
            var typeReference = new CodeTypeReference(new CodeTypeReference(), arrayRank)
            {
                ArrayElementType = elementTypeReference,
            };
            return typeReference;
        }

        CodeTypeReference CreateArrayTypeReference(Type elementType, int arrayRank)
        {
            if (pendingTypes.Contains(elementType))
            {
                return CreateArrayOfCustomTypeReference(elementType, arrayRank);
            }

            var otherArrayType = new CodeTypeReference(new CodeTypeReference(), arrayRank)//CodeDom does not care. The baseType is always overwritten by ArrayElementType.
            {
                ArrayElementType = TranslateToTsTypeReference(elementType),
            };
            return otherArrayType;
        }

        static CodeTypeDeclaration CreatePodClientClass(CodeNamespace ns, string className)
        {
            var targetClass = new CodeTypeDeclaration(className)
            {
                TypeAttributes = TypeAttributes.Public | TypeAttributes.Class, //setting IsInterface has no use
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

        static Type[] GetCherryTypes(Assembly assembly, CherryPickingMethods methods)
        {
            try
            {
                return assembly.GetTypes().Where(type => (IsClassOrStruct(type) || type.IsEnum)
                && CherryPicking.IsCherryType(type, methods)).ToArray();
            }
            catch (ReflectionTypeLoadException e)
            {
                foreach (Exception ex in e.LoaderExceptions)
                {
                    Trace.TraceWarning(String.Format("When loading {0}, GetTypes errors occur: {1}", assembly.FullName, ex.Message));
                }
            }
            catch (TargetInvocationException e)
            {
                Trace.TraceWarning(String.Format("When loading {0}, GetTypes errors occur: {1}", assembly.FullName, e.Message + "~~" + e.InnerException.Message));
            }

            return null;
        }

    }

}
