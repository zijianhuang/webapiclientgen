using Fonlow.DocComment;
using Fonlow.Poco2Client;
using Fonlow.Reflection;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using Fonlow.CodeDom;

namespace Fonlow.Poco2Ts
{
	/// <summary>
	/// POCO to TypeScript interfaces generator. Create CodeDOM and output TS codes, with TypeScript CodeDOM provider
	/// </summary>
	public class Poco2TsGen : IPoco2Client
	{
		readonly CodeCompileUnit targetUnit;

		readonly string ClientNamespaceSuffix;

		readonly bool helpStrictMode;

		readonly CodeObjectHelper codeObjectHelper;

		readonly IDictionary<Type, Func<object, string>> attribueCommentDic;

		readonly IDictionary<Type, Func<Attribute, CodeAttributeDeclaration>> declaratinDic;

		readonly IDictionary<Type, string> dotNetTypeCommentDic;

		/// <summary>
		/// Poco2TsGen will share the same CodeCompileUnit with other CodeGen components.
		/// </summary>
		/// <param name="codeCompileUnit"></param>
		/// <param name="clientNamespaceSuffix"></param>
		/// <param name="helpStrictMode"></param>
		/// <param name="codeObjectHelper"></param>
		public Poco2TsGen(CodeCompileUnit codeCompileUnit, string clientNamespaceSuffix, bool helpStrictMode, CodeObjectHelper codeObjectHelper)
		{
			targetUnit = codeCompileUnit;
			pendingTypes = new List<Type>();
			this.ClientNamespaceSuffix = clientNamespaceSuffix;
			this.helpStrictMode = helpStrictMode;
			this.codeObjectHelper = codeObjectHelper;

			AnnotationCommentGenerator annotationCommentGenerator = new AnnotationCommentGenerator(true);
			attribueCommentDic = annotationCommentGenerator.Get();
			declaratinDic = AnnotationDeclarationGenerator.Create();
			dotNetTypeCommentDic = DotNetTypeCommentGenerator.Get();
		}


		/// <summary>
		/// Save TypeScript codes generated into a file.
		/// </summary>
		/// <param name="fileName"></param>
		public void SaveCodeToFile(string fileName)
		{
			if (String.IsNullOrEmpty(fileName))
				throw new ArgumentException("A valid fileName is not defined.", nameof(fileName));

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
		/// 
		/// </summary>
		/// <param name="writer"></param>
		/// <exception cref="ArgumentNullException"></exception>
		/// <remarks>public only for testing</remarks>
		public void WriteCode(TextWriter writer)
		{
			if (writer == null)
				throw new ArgumentNullException(nameof(writer), "No TextWriter instance is defined.");

			using (TypeScriptCodeProvider provider = new Fonlow.TypeScriptCodeDom.TypeScriptCodeProvider(new Fonlow.TypeScriptCodeDom.TsCodeGenerator(codeObjectHelper)))
			{
				CodeGeneratorOptions options = Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance;
				options.BracingStyle = "JS";
				options.IndentString = "\t";

				provider.GenerateCodeFromCompileUnit(targetUnit, writer, options);
			}
		}

		bool dataAnnotationsToComments;

		public void CreateCodeDomInAssembly(Assembly assembly, CherryPickingMethods methods, DocCommentLookup docLookup, bool dataAnnotationsToComments)
		{
			this.docLookup = docLookup;
			this.dataAnnotationsToComments = dataAnnotationsToComments;
			Type[] cherryTypes = PodGenHelper.GetCherryTypes(assembly, methods);
			CreateCodeDom(cherryTypes, methods);
		}

		DocCommentLookup docLookup;

		void CreateTypeDocComment(Type type, CodeTypeDeclaration typeDeclaration)
		{
			if (docLookup != null)
			{
				docMember docComment = docLookup.GetMember("T:" + type.FullName);
				if (docComment != null)
				{
					typeDeclaration.Comments.Add(new CodeCommentStatement(StringFunctions.IndentedArrayToString(docComment.summary.Text), true));
				}
			}
		}

		/// <summary>
		/// Create doc comment if XML document file exists, or generate from type info and validation attributes.
		/// </summary>
		/// <param name="propertyInfo"></param>
		/// <param name="codeField"></param>
		void CreatePropertyDocComment(PropertyInfo propertyInfo, CodeMemberField codeField)
		{
			CreateMemberDocComment(propertyInfo, propertyInfo.PropertyType, "P", codeField);
		}

		void CreateFieldDocComment(FieldInfo fieldInfo, CodeMemberField codeField)
		{
			CreateMemberDocComment(fieldInfo, fieldInfo.FieldType, "F", codeField);
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="memberInfo"></param>
		/// <param name="memberType"></param>
		/// <param name="docFlag">P or F</param>
		/// <param name="codeField"></param>
		void CreateMemberDocComment(MemberInfo memberInfo, Type memberType, string docFlag, CodeMemberField codeField)
		{
			if (docLookup != null)
			{
				string propertyFullName = memberInfo.DeclaringType.FullName + "." + memberInfo.Name;
				docMember dm = docLookup.GetMember($"{docFlag}:" + propertyFullName);
				bool rangeAttributeExists = memberInfo.GetCustomAttributes().Any(attribute => attribute.GetType() == typeof(RangeAttribute));
				List<string> extraLines = new();
				bool typeCommentExists = dotNetTypeCommentDic.TryGetValue(memberType, out string commentFromProperType);
				if (typeCommentExists)
				{
					if (rangeAttributeExists)
					{
						string[] splited = commentFromProperType.Split(",");
						extraLines.Add(splited[0]);
					}
					else
					{
						extraLines.Add(commentFromProperType);

					}
				}

				if (dataAnnotationsToComments)
				{
					string[] commentsFromAttributes = GenerateCommentsFromAttributes(memberInfo.GetCustomAttributes().ToList());
					if (commentsFromAttributes.Length > 0)
					{
						extraLines.AddRange(commentsFromAttributes);
					}
				}

				AddDocComments(codeField.Comments, dm, extraLines);
			}
		}

		static void AddDocComments(CodeCommentStatementCollection comments, docMember dm, IList<string> extra)
		{
			if (dm != null && dm.summary != null)
			{
				if (extra != null && extra.Count > 0)
				{
					comments.Add(new CodeCommentStatement(StringFunctions.IndentedArrayToString(dm.summary.Text.Union(extra)), true));
				}
				else
				{
					comments.Add(new CodeCommentStatement(StringFunctions.IndentedArrayToString(dm.summary.Text), true));
				}
			}
			else if (extra != null && extra.Count > 0)
			{
				comments.Add(new CodeCommentStatement(StringFunctions.IndentedArrayToString(extra), true));
			}
		}

		/// <summary>
		/// Create TypeScript CodeDOM for POCO types. Order by namespaces and type name.
		/// For an enum type, all members will be processed regardless of EnumMemberAttribute.
		/// </summary>
		/// <param name="types">POCO types.</param>
		/// <param name="methods"></param>
		public void CreateCodeDom(Type[] types, CherryPickingMethods methods)
		{
			if (types == null)
				throw new ArgumentNullException(nameof(types), "types is not defined.");

			this.pendingTypes.AddRange(types);
			List<IGrouping<string, Type>> typeGroupedByNamespace = types
				.GroupBy(d => d.Namespace)
				.OrderBy(k => k.Key).ToList(); // order by namespace
			string[] namespacesOfTypes = typeGroupedByNamespace.Select(d => d.Key).ToArray();
			foreach (IGrouping<string, Type> groupedTypes in typeGroupedByNamespace)
			{
				string clientNamespaceText = (groupedTypes.Key + ClientNamespaceSuffix).Replace('.', '_');
				CodeNamespaceEx clientNamespace = new(clientNamespaceText, true);
				targetUnit.Namespaces.InsertToSortedCollection(clientNamespace);//namespace added to Dom

				Debug.WriteLine("Generating types in namespace: " + groupedTypes.Key + " ...");
				IOrderedEnumerable<Type> orderedGroupedTypes = groupedTypes.OrderBy(t => t.Name);
				foreach (Type type in orderedGroupedTypes)
				{
					string tsName = type.Name;
					Debug.WriteLine("tsClass: " + clientNamespace + "  " + tsName);

					CodeTypeDeclaration typeDeclaration;
					if (TypeHelper.IsClassOrStruct(type))
					{
						if (type.IsGenericType)
						{
							typeDeclaration = PodGenHelper.CreatePodClientGenericInterface(clientNamespace, type);
						}
						else
						{
							typeDeclaration = PodGenHelper.CreatePodClientInterface(clientNamespace, tsName);
						}

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

						CreateTypeDocComment(type, typeDeclaration);

						CherryPickingMethods typeCherryMethods = CherryPicking.GetTypeCherryMethods(type);
						bool withDataContract = (typeCherryMethods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract;
						PropertyInfo[] typeProperties = type.GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public).OrderBy(p => p.Name).ToArray();
						foreach (PropertyInfo propertyInfo in typeProperties)
						{
							CherryType cherryType = CherryPicking.GetMemberCherryType(propertyInfo, methods, withDataContract);
							if (cherryType == CherryType.None)
								continue;
							string tsPropertyName;


							bool isRequired = cherryType == CherryType.BigCherry;
							string customName = CherryPicking.GetFieldCustomName(propertyInfo, methods);
							if (String.IsNullOrEmpty(customName))
							{
								tsPropertyName = Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase ? Fonlow.Text.StringExtensions.ToCamelCase(propertyInfo.Name) : propertyInfo.Name;
							}
							else
							{
								tsPropertyName = customName;
							}

							Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, propertyInfo.PropertyType.Name));
							CodeMemberField clientField = new CodeMemberField()//Yes, clr property translated to ts field
							{
								Name = tsPropertyName + (isRequired ? String.Empty : "?"),
								Type = TranslateToClientTypeReference(propertyInfo.PropertyType),

							};

							AddValidationAttributesCodeTypeMember(propertyInfo, clientField, false);
							clientField.UserData.Add(UserDataKeys.CustomAttributes, propertyInfo.GetCustomAttributes().ToArray());
							clientField.Type.UserData.Add(UserDataKeys.FieldTypeInfo,
								new FieldTypeInfo
								{
									IsComplex = CodeObjectHelper.IsComplexType(propertyInfo.PropertyType),
									IsArray = clientField.Type.ArrayRank > 0,
									ClrType = propertyInfo.PropertyType,
								});

							CreatePropertyDocComment(propertyInfo, clientField);

							typeDeclaration.Members.Add(clientField);
						}

						FieldInfo[] typeFields = type.GetFields(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public).OrderBy(f => f.Name).ToArray();
						foreach (FieldInfo fieldInfo in typeFields)
						{
							CherryType cherryType = CherryPicking.GetMemberCherryType(fieldInfo, methods, withDataContract);
							if (cherryType == CherryType.None)
								continue;
							string tsPropertyName;


							bool isRequired = (cherryType == CherryType.BigCherry) || !type.IsClass;//public fields in struct should all be value types, so required
							string customName = CherryPicking.GetFieldCustomName(fieldInfo, methods);
							if (String.IsNullOrEmpty(customName))
							{
								tsPropertyName = Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase ? Fonlow.Text.StringExtensions.ToCamelCase(fieldInfo.Name) : fieldInfo.Name;
							}
							else
							{
								tsPropertyName = customName;
							}

							Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, fieldInfo.FieldType.Name));

							CodeMemberField clientField = new CodeMemberField()
							{
								Name = tsPropertyName + (isRequired ? String.Empty : "?"),
								Type = TranslateToClientTypeReference(fieldInfo.FieldType),
							};

							clientField.UserData.Add(UserDataKeys.CustomAttributes, fieldInfo.GetCustomAttributes().ToArray());
							clientField.Type.UserData.Add(UserDataKeys.FieldTypeInfo, new FieldTypeInfo
							{
								IsComplex = CodeObjectHelper.IsComplexType(fieldInfo.FieldType),
								IsArray = clientField.Type.ArrayRank > 0,
								ClrType = fieldInfo.FieldType,
							});
							CreateFieldDocComment(fieldInfo, clientField);

							typeDeclaration.Members.Add(clientField);
						}
					}
					else if (type.IsEnum)
					{
						typeDeclaration = PodGenHelper.CreatePodClientEnum(clientNamespace, tsName);

						CreateTypeDocComment(type, typeDeclaration);

						int k = 0;
						foreach (FieldInfo fieldInfo in type.GetFields(BindingFlags.Public | BindingFlags.Static))
						{
							string name = fieldInfo.Name;

							CustomAttributeData enumMemberAttributeData = fieldInfo.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.Serialization.EnumMemberAttribute");
							void AddFieldWithoutEnumMemberAttribute()
							{
								int intValue = (int)Convert.ChangeType(fieldInfo.GetValue(null), typeof(int));
								Debug.WriteLine(name + " -- " + intValue);
								bool isInitialized = intValue != k;

								CodeMemberField clientField = new CodeMemberField()
								{
									Name = name,
									Type = new CodeTypeReference(fieldInfo.FieldType),
									InitExpression = isInitialized ? new CodePrimitiveExpression(intValue) : null,
								};

								CreateFieldDocComment(fieldInfo, clientField);
								typeDeclaration.Members.Add(clientField);
							}

							if (enumMemberAttributeData == null)
							{
								AddFieldWithoutEnumMemberAttribute();
							}
							else
							{
								CustomAttributeNamedArgument vm = enumMemberAttributeData.NamedArguments.FirstOrDefault(k => k.MemberName == "Value");

								if (vm.TypedValue.Value != null)
								{
									CodeMemberField mField = new CodeMemberField()
									{
										Name = name,
										Type = new CodeTypeReference(fieldInfo.FieldType),
										InitExpression = new CodePrimitiveExpression(vm.TypedValue),
									};

									CreateFieldDocComment(fieldInfo, mField);
									typeDeclaration.Members.Add(mField);
								}
								else
								{
									AddFieldWithoutEnumMemberAttribute();
								}

							}

							k++;
						}

					}
					else
					{
						Trace.TraceWarning("Not yet supported: " + type.Name);
					}
				};
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

			if (TypeHelper.IsStringType(type))
			{
				string typeText = Fonlow.TypeScriptCodeDom.TypeMapper.MapToTsBasicType(type);
				return new CodeTypeReference(typeText);
			}
			else if (TypeHelper.IsDotNetSimpleType(type))
			{
				string typeText = Fonlow.TypeScriptCodeDom.TypeMapper.MapToTsBasicType(type);
				return new CodeTypeReference(typeText);
			}
			else if (pendingTypes.Contains(type))
				return new CodeTypeReference(RefineCustomComplexTypeText(type));
			else if (type.IsGenericType)
			{
				return TranslateGenericToTsTypeReference(type);
			}
			else if (type.IsArray)
			{
				Debug.Assert(type.Name.EndsWith(']'));
				Type elementType = type.GetElementType();
				int arrayRank = type.GetArrayRank();
				return CreateArrayTypeReference(elementType, arrayRank);
			}

			string tsBasicTypeText = Fonlow.TypeScriptCodeDom.TypeMapper.MapToTsBasicType(type);
			if (tsBasicTypeText != null)
				return new CodeTypeReference(tsBasicTypeText);

			CodeTypeReference actionResultTypeReference = TranslateActionResultToClientTypeReference(type);
			if (actionResultTypeReference != null)
			{
				return actionResultTypeReference;
			}

			return new CodeTypeReference("any");
		}

		virtual protected CodeTypeReference TranslateActionResultToClientTypeReference(Type type)
		{
			if (type.FullName.Contains("System.Net.Http.HttpResponseMessage") || type.FullName.Contains("System.Web.Http.IHttpActionResult") || type.FullName.Contains("Microsoft.AspNetCore.Mvc.IActionResult") || type.FullName.Contains("Microsoft.AspNetCore.Mvc.ActionResult"))
			{
				return new CodeTypeReference("response");
			}

			return null;
		}

		readonly List<Type> pendingTypes;

		CodeTypeReference TranslateGenericToTsTypeReference(Type type)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();

			if (genericTypeDefinition == typeof(Nullable<>))
			{
				CodeTypeReference[] genericTypeReferences = type.GenericTypeArguments.Select(d => TranslateToClientTypeReference(d)).ToArray();
				Debug.Assert(genericTypeReferences.Length == 1);
				bool isNullablePrimitiveType = TypeHelper.IsNullablePrimitive(type);
				bool isAny = genericTypeReferences[0].BaseType == "any";
				string baseType = genericTypeReferences[0].BaseType + (helpStrictMode && !isAny ? " | null" : String.Empty);  // Optional null for data type of data field in interface
				genericTypeReferences[0].BaseType = baseType;
				return genericTypeReferences[0];//CLR nullable is insigificant in js and ts. The output will be all nullable by default, except those required.
			}

			Type[] genericArguments = type.GetGenericArguments();

			if (genericTypeDefinition == typeof(System.Threading.Tasks.Task<>))
			{
				return TranslateToClientTypeReference(genericArguments[0]);
			}

			if (TypeHelper.IsIEnumerableType(genericTypeDefinition) || genericTypeDefinition.FullName == "System.Collections.Generic.IAsyncEnumerable`1")
			{
				Debug.Assert(type.GenericTypeArguments.Length == 1);
				Type elementType = type.GenericTypeArguments[0];
				return CreateArrayTypeReference(elementType, 1);
			}

			CodeTypeReference CreateGenericType()
			{
				string anyGenericTypeName = genericTypeDefinition.FullName;
				int idx = anyGenericTypeName.IndexOf('`');
				anyGenericTypeName = anyGenericTypeName.Substring(0, idx);
				CodeTypeReference[] genericParams = genericArguments.Select(t => TranslateToClientTypeReference(t)).ToArray();
				return new CodeTypeReference(anyGenericTypeName, genericParams);
			}

			if (TypeHelper.IsTuple(genericTypeDefinition) >= 0 || genericTypeDefinition == typeof(KeyValuePair<,>))
			{
				return CreateGenericType();
			}

			// Cover IDictionary derived types
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
			}

			return new CodeTypeReference(RefineCustomComplexTypeText(genericTypeDefinition), genericArguments.Select(t => TranslateToClientTypeReference(t)).ToArray());
		}

		string RefineCustomComplexTypeText(Type t)
		{
			return t.Namespace.Replace('.', '_') + ClientNamespaceSuffix.Replace('.', '_') + "." + t.Name;
		}

		CodeTypeReference CreateArrayOfCustomTypeReference(Type elementType, int arrayRank)
		{
			CodeTypeReference elementTypeReference = new CodeTypeReference(RefineCustomComplexTypeText(elementType));
			CodeTypeReference typeReference = new CodeTypeReference(new CodeTypeReference(), arrayRank)
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

			CodeTypeReference otherArrayType = new CodeTypeReference(new CodeTypeReference(), arrayRank)//CodeDom does not care. The baseType is always overwritten by ArrayElementType.
			{
				ArrayElementType = TranslateToClientTypeReference(elementType),
			};

			return otherArrayType;
		}

		string[] GenerateCommentsFromAttributes(List<Attribute> attributes)
		{
			return CommentsHelper.GenerateCommentsFromAttributes(attributes, attribueCommentDic);
		}

		void AddValidationAttributesCodeTypeMember(MemberInfo property, CodeTypeMember codeTypeMember, bool requiredAdded)
		{
			List<Attribute> attributes = property.GetCustomAttributes().ToList();
			attributes.Sort((x, y) =>
			{
				// Special-case RequiredAttribute so that it shows up on top
				if (x is RequiredAttribute)
				{
					return -1;
				}
				if (y is RequiredAttribute)
				{
					return 1;
				}

				return 0;
			});

			foreach (Attribute attribute in attributes)
			{
				Type attributeType = attribute.GetType();
				if (attributeType == typeof(RequiredAttribute) && requiredAdded)
				{
					continue;
				}

				if (declaratinDic.TryGetValue(attributeType, out Func<Attribute, CodeAttributeDeclaration> textGenerator))
				{
					codeTypeMember.CustomAttributes.Add(textGenerator(attribute));
				}
			}
		}




	}

}
