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
    /// POCO to TypeScript interfaces generator. Create CodeDOM and output TS codes
    /// </summary>
    public class Poco2TsGen : IPoco2Client
    {
        CodeCompileUnit targetUnit;

        /// <summary>
        /// Init with its own CodeCompileUnit.
        /// </summary>
        public Poco2TsGen()
        {
            targetUnit = new CodeCompileUnit();
        }

        /// <summary>
        /// Poco2TsGen will share the same CodeCompileUnit with other CodeGen components.
        /// </summary>
        /// <param name="codeCompileUnit"></param>
        public Poco2TsGen(CodeCompileUnit codeCompileUnit)
        {
            targetUnit = codeCompileUnit;
        }


        /// <summary>
        /// Save TypeScript codes generated into a file.
        /// </summary>
        /// <param name="fileName"></param>
        public void SaveCodeToFile(string fileName)
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

            var provider = new Fonlow.TypeScriptCodeDom.TypeScriptCodeProvider();
            CodeGeneratorOptions options = new CodeGeneratorOptions()
            {
                BracingStyle = "JS",//not really used
                IndentString = "    ",
            };

            provider.GenerateCodeFromCompileUnit(targetUnit, writer, options);
        }

        public void CreateCodeDom(Assembly assembly, CherryPickingMethods methods)
        {
            var cherryTypes = GetCherryTypes(assembly, methods);
            CreateCodeDom(cherryTypes, methods);
        }


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
                var clientNamespaceText = (groupedTypes.Key + ".Client").Replace('.', '_');
                var clientNamespace = new CodeNamespace(clientNamespaceText);
                targetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

                Debug.WriteLine("Generating types in namespace: " + groupedTypes.Key + " ...");
                groupedTypes.Select(type =>
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
                            var clientField = new CodeMemberField()
                            {
                                Name = tsPropertyName + (isRequired ? String.Empty : "?"),
                                Type = TranslateToClientTypeReference(propertyInfo.PropertyType),
                                //                     Attributes = MemberAttributes.Public,

                            };
                            typeDeclaration.Members.Add(clientField);
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
                            var clientField = new CodeMemberField()
                            {
                                Name = tsPropertyName + (isRequired ? String.Empty : "?"),
                                Type = TranslateToClientTypeReference(fieldInfo.FieldType),
                                //         Attributes = MemberAttributes.Public,
                            };

                            typeDeclaration.Members.Add(clientField);

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

        /// <summary>
        /// Translate a service type into a CodeTypeReference for client.
        /// </summary>
        /// <param name="type">CLR type of the service</param>
        /// <returns></returns>
        public CodeTypeReference TranslateToClientTypeReference(Type type)
        {
            if (type == null)
                return new CodeTypeReference("void");

            if (pendingTypes.Contains(type))
                return new CodeTypeReference(RefineCustomComplexTypeText(type));
            else if (type.IsGenericType)
            {
                return TranslateGenericToTsTypeReference(type);
            }
            else if (type.IsArray)
            {
                Debug.Assert(type.Name.EndsWith("]"));
                var elementType = type.GetElementType();
                var arrayRank = type.GetArrayRank();
                return CreateArrayTypeReference(elementType, arrayRank);
            }

            var tsBasicTypeText = Fonlow.TypeScriptCodeDom.TypeMapper.MapToTsBasicType(type);
            if (tsBasicTypeText != null)
                return new CodeTypeReference(tsBasicTypeText);

            return new CodeTypeReference("any");
        }

        static bool IsClassOrStruct(Type type)
        {
            return type.IsClass || (type.IsValueType && !type.IsPrimitive && !type.IsEnum);
        }

        Type[] pendingTypes;

        CodeTypeReference TranslateGenericToTsTypeReference(Type type)
        {
            Type genericTypeDefinition = type.GetGenericTypeDefinition();

            //if (IsTuple(genericTypeDefinition))
            //{
            //    return new CodeTypeReference(type);
            //}

            Type[] genericArguments = type.GetGenericArguments();
            if (genericArguments.Length == 1)
            {
                if (genericTypeDefinition == typeof(Nullable<>))
                {
                    var genericTypeReferences = type.GenericTypeArguments.Select(d => TranslateToClientTypeReference(d)).ToArray();
                    Debug.Assert(genericTypeReferences.Length == 1);
                    return genericTypeReferences[0];//CLR nullable is insigificant in js and ts. The output will be all nullable by default, except those required.
                }

                if (TypeHelper.IsArrayType(genericTypeDefinition))
                {
                    Debug.Assert(type.GenericTypeArguments.Length == 1);
                    var elementType = type.GenericTypeArguments[0];
                    return CreateArrayTypeReference(elementType, 1);
                }

                //Type closedCollectionType = typeof(ICollection<>).MakeGenericType(genericArguments[0]);
                //if (closedCollectionType.IsAssignableFrom(type))
                //{
                //    return GenerateCollection(type, collectionSize, createdObjectReferences);
                //}
                return null;
            }

            if (genericArguments.Length == 2)
            {
                if (genericTypeDefinition == typeof(IDictionary<,>))
                {
                    return new CodeTypeReference(typeof(Dictionary<,>).FullName,
                        TranslateToClientTypeReference(genericArguments[0]), TranslateToClientTypeReference(genericArguments[1]));
                }

                Type closedDictionaryType = typeof(IDictionary<,>).MakeGenericType(genericArguments[0], genericArguments[1]);
                if (closedDictionaryType.IsAssignableFrom(type))
                {
                    return new CodeTypeReference(typeof(Dictionary<,>).FullName,
                        TranslateToClientTypeReference(genericArguments[0]), TranslateToClientTypeReference(genericArguments[1]));
                }

                if (genericTypeDefinition == typeof(KeyValuePair<,>))
                {
                    return new CodeTypeReference(typeof(KeyValuePair<,>).FullName,
                        TranslateToClientTypeReference(genericArguments[0]), TranslateToClientTypeReference(genericArguments[1]));
                }

            }

            return new CodeTypeReference("any");

        }

        static string RefineCustomComplexTypeText(Type t)
        {
            return t.Namespace.Replace('.', '_') + "_Client." + t.Name;
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
                ArrayElementType = TranslateToClientTypeReference(elementType),
            };
            return otherArrayType;
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

        static Type[] GetCherryTypes(Assembly assembly, CherryPickingMethods methods)
        {
            try
            {
                return assembly.GetTypes().Where(type => (IsClassOrStruct(type) || type.IsEnum)
                && CherryPicking.IsCherryType(type, methods) && type.IsPublic).ToArray();
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
