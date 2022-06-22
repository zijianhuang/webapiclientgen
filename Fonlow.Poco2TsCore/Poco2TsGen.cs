using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using System;
using Fonlow.Poco2Client;
using Fonlow.Reflection;
using Fonlow.DocComment;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

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
		/// <summary>
		/// Init with its own CodeCompileUnit. Only for test cases.
		/// </summary>
		public Poco2TsGen(string clientNamespaceSuffix, bool helpStrictMode)
		{
			targetUnit = new CodeCompileUnit();
			pendingTypes = new List<Type>();
			this.ClientNamespaceSuffix = clientNamespaceSuffix;
			this.helpStrictMode = helpStrictMode;
		}

		/// <summary>
		/// Poco2TsGen will share the same CodeCompileUnit with other CodeGen components.
		/// </summary>
		/// <param name="codeCompileUnit"></param>
		/// <param name="clientNamespaceSuffix"></param>
		/// <param name="helpStrictMode"></param>
		public Poco2TsGen(CodeCompileUnit codeCompileUnit, string clientNamespaceSuffix, bool helpStrictMode)
		{
			targetUnit = codeCompileUnit;
			pendingTypes = new List<Type>();
			this.ClientNamespaceSuffix = clientNamespaceSuffix;
			this.helpStrictMode = helpStrictMode;
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

		public void WriteCode(TextWriter writer)
		{
			if (writer == null)
				throw new ArgumentNullException("writer", "No TextWriter instance is defined.");

			using (CodeDomProvider provider = new Fonlow.TypeScriptCodeDom.TypeScriptCodeProvider(true))
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
			var cherryTypes = PodGenHelper.GetCherryTypes(assembly, methods);
			CreateCodeDom(cherryTypes, methods);
		}

		DocCommentLookup docLookup;

		void CreateTypeDocComment(Type type, CodeTypeDeclaration typeDeclaration)
		{
			if (docLookup != null)
			{
				var docComment = docLookup.GetMember("T:" + type.FullName);
				if (docComment != null)
				{
					typeDeclaration.Comments.Add(new CodeCommentStatement(StringFunctions.IndentedArrayToString(docComment.summary.Text), true));
				}
			}
		}

		void CreatePropertyDocComment(PropertyInfo propertyInfo, CodeMemberField codeField)
		{
			if (docLookup != null)
			{
				var propertyFullName = propertyInfo.DeclaringType.FullName + "." + propertyInfo.Name;
				var dm = docLookup.GetMember("P:" + propertyFullName);
				AddDocComments(dm, codeField.Comments, GenerateCommentsFromAttributes(propertyInfo));
			}
		}

		void CreateFieldDocComment(FieldInfo fieldInfo, CodeMemberField codeField)
		{
			if (docLookup != null)
			{
				var propertyFullName = fieldInfo.DeclaringType.FullName + "." + fieldInfo.Name;
				var dm = docLookup.GetMember("F:" + propertyFullName);
				AddDocComments(dm, codeField.Comments, GenerateCommentsFromAttributes(fieldInfo));
			}
		}

		static void AddDocComments(docMember dm, CodeCommentStatementCollection comments, string[] extra = null)
		{
			if (dm != null && dm.summary != null)
			{
				if (extra != null && extra.Length > 0)
				{
					comments.Add(new CodeCommentStatement(StringFunctions.IndentedArrayToString(dm.summary.Text.Union(extra)), true));
				}
				else
				{
					comments.Add(new CodeCommentStatement(StringFunctions.IndentedArrayToString(dm.summary.Text), true));
				}
			}
			else if (extra != null && extra.Length > 0)
			{
				comments.Add(new CodeCommentStatement(StringFunctions.IndentedArrayToString(extra), true));
			}
		}

		/// <summary>
		/// Create TypeScript CodeDOM for POCO types. 
		/// For an enum type, all members will be processed regardless of EnumMemberAttribute.
		/// </summary>
		/// <param name="types">POCO types.</param>
		/// <param name="methods"></param>
		public void CreateCodeDom(Type[] types, CherryPickingMethods methods)
		{
			if (types == null)
				throw new ArgumentNullException("types", "types is not defined.");

			this.pendingTypes.AddRange(types);
			var typeGroupedByNamespace = types
				.GroupBy(d => d.Namespace)
				.OrderBy(k => k.Key); // order by namespace
			var namespacesOfTypes = typeGroupedByNamespace.Select(d => d.Key).ToArray();
			foreach (var groupedTypes in typeGroupedByNamespace)
			{
				var clientNamespaceText = (groupedTypes.Key + ClientNamespaceSuffix).Replace('.', '_');
				var clientNamespace = new CodeNamespace(clientNamespaceText);
				targetUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

				Debug.WriteLine("Generating types in namespace: " + groupedTypes.Key + " ...");
				groupedTypes.OrderBy(t => t.Name).Select(type =>
				{
					var tsName = type.Name;
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

						var typeCherryMethods = CherryPicking.GetTypeCherryMethods(type);
						bool withDataContract = (typeCherryMethods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract;
						var typeProperties = type.GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public).OrderBy(p => p.Name).ToArray();
						foreach (var propertyInfo in typeProperties)
						{
							var cherryType = CherryPicking.GetMemberCherryType(propertyInfo, methods, withDataContract);
							if (cherryType == CherryType.None)
								continue;
							string tsPropertyName;


							var isRequired = cherryType == CherryType.BigCherry;
							var customName = CherryPicking.GetFieldCustomName(propertyInfo, methods);
							if (String.IsNullOrEmpty(customName))
							{
								tsPropertyName = Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase ? Fonlow.Text.StringExtensions.ToCamelCase(propertyInfo.Name) : propertyInfo.Name;
							}
							else
							{
								tsPropertyName = customName;
							}

							Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, propertyInfo.PropertyType.Name));
							var clientField = new CodeMemberField()//Yes, clr property translated to ts field
							{
								Name = tsPropertyName + (isRequired ? String.Empty : "?"),
								Type = TranslateToClientTypeReference(propertyInfo.PropertyType),

							};

							CreatePropertyDocComment(propertyInfo, clientField);

							typeDeclaration.Members.Add(clientField);
						}

						var typeFields = type.GetFields(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public).OrderBy(f => f.Name).ToArray();
						foreach (var fieldInfo in typeFields)
						{
							var cherryType = CherryPicking.GetMemberCherryType(fieldInfo, methods, withDataContract);
							if (cherryType == CherryType.None)
								continue;
							string tsPropertyName;


							var isRequired = (cherryType == CherryType.BigCherry) || !type.IsClass;//public fields in struct should all be value types, so required
							var customName = CherryPicking.GetFieldCustomName(fieldInfo, methods);
							if (String.IsNullOrEmpty(customName))
							{
								tsPropertyName = Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase ? Fonlow.Text.StringExtensions.ToCamelCase(fieldInfo.Name) : fieldInfo.Name;
							}
							else
							{
								tsPropertyName = customName;
							}

							Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, fieldInfo.FieldType.Name));

							var clientField = new CodeMemberField()
							{
								Name = tsPropertyName + (isRequired ? String.Empty : "?"),
								Type = TranslateToClientTypeReference(fieldInfo.FieldType),
							};

							CreateFieldDocComment(fieldInfo, clientField);

							typeDeclaration.Members.Add(clientField);
						}
					}
					else if (type.IsEnum)
					{
						typeDeclaration = PodGenHelper.CreatePodClientEnum(clientNamespace, tsName);

						CreateTypeDocComment(type, typeDeclaration);

						int k = 0;
						foreach (var fieldInfo in type.GetFields(BindingFlags.Public | BindingFlags.Static))
						{
							var name = fieldInfo.Name;

							var enumMemberAttributeData = fieldInfo.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.Serialization.EnumMemberAttribute");
							void AddFieldWithoutEnumMemberAttribute()
							{
								var intValue = (int)Convert.ChangeType(fieldInfo.GetValue(null), typeof(int));
								Debug.WriteLine(name + " -- " + intValue);
								var isInitialized = intValue != k;

								var clientField = new CodeMemberField()
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
								var vm = enumMemberAttributeData.NamedArguments.FirstOrDefault(k => k.MemberName == "Value");

								if (vm.TypedValue.Value != null)
								{
									var mField = new CodeMemberField()
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

			if (TypeHelper.IsSimpleType(type))
			{
				var typeText = Fonlow.TypeScriptCodeDom.TypeMapper.MapToTsBasicType(type);
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
				Debug.Assert(type.Name.EndsWith("]"));
				var elementType = type.GetElementType();
				var arrayRank = type.GetArrayRank();
				return CreateArrayTypeReference(elementType, arrayRank);
			}

			var tsBasicTypeText = Fonlow.TypeScriptCodeDom.TypeMapper.MapToTsBasicType(type);
			if (tsBasicTypeText != null)
				return new CodeTypeReference(tsBasicTypeText);

			var actionResultTypeReference = TranslateActionResultToClientTypeReference(type);
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
				var genericTypeReferences = type.GenericTypeArguments.Select(d => TranslateToClientTypeReference(d)).ToArray();
				Debug.Assert(genericTypeReferences.Length == 1);
				var isNullablePrimitiveType = TypeHelper.IsNullablePrimitive(type);
				var baseType = genericTypeReferences[0].BaseType + (helpStrictMode ? " | null" : String.Empty);
				genericTypeReferences[0].BaseType = baseType;
				return genericTypeReferences[0];//CLR nullable is insigificant in js and ts. The output will be all nullable by default, except those required.
			}

			Type[] genericArguments = type.GetGenericArguments();

			if (genericTypeDefinition == typeof(System.Threading.Tasks.Task<>))
			{
				return TranslateToClientTypeReference(genericArguments[0]);
			}

			if (TypeHelper.IsArrayType(genericTypeDefinition) || genericTypeDefinition.FullName == "System.Collections.Generic.IAsyncEnumerable`1")
			{
				Debug.Assert(type.GenericTypeArguments.Length == 1);
				var elementType = type.GenericTypeArguments[0];
				return CreateArrayTypeReference(elementType, 1);
			}

			CodeTypeReference CreateGenericType()
			{
				var anyGenericTypeName = genericTypeDefinition.FullName;
				var idx = anyGenericTypeName.IndexOf('`');
				anyGenericTypeName = anyGenericTypeName.Substring(0, idx);
				var genericParams = genericArguments.Select(t => TranslateToClientTypeReference(t)).ToArray();
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

				//if (genericTypeDefinition == typeof(KeyValuePair<,>))
				//{
				//	return new CodeTypeReference(typeof(KeyValuePair<,>).FullName,
				//		TranslateToClientTypeReference(genericArguments[0]), TranslateToClientTypeReference(genericArguments[1]));
				//}

			}

			return new CodeTypeReference(RefineCustomComplexTypeText(genericTypeDefinition), genericArguments.Select(t => TranslateToClientTypeReference(t)).ToArray());
		}

		string RefineCustomComplexTypeText(Type t)
		{
			return t.Namespace.Replace('.', '_') + ClientNamespaceSuffix.Replace('.', '_') + "." + t.Name;
		}

		CodeTypeReference CreateArrayOfCustomTypeReference(Type elementType, int arrayRank)
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

		string[] GenerateCommentsFromAttributes(MemberInfo property)
		{
			if (!dataAnnotationsToComments)
			{
				return null;
			}

			List<string> ss = new List<string>();
			var attributes = property.GetCustomAttributes().ToList();
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
				if (AnnotationTextGenerator.TryGetValue(attribute.GetType(), out Func<object, string> textGenerator))
				{
					ss.Add(textGenerator(attribute));
				}
			}

			return ss.ToArray();
		}

		readonly IDictionary<Type, Func<object, string>> AnnotationTextGenerator = new Dictionary<Type, Func<object, string>>
		{
			{ typeof(RequiredAttribute), a => "Required" },
			{ typeof(RangeAttribute), a =>
				{
					RangeAttribute range = (RangeAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Range: inclusive between {0} and {1}", range.Minimum, range.Maximum);
				}
			},
			{ typeof(MaxLengthAttribute), a =>
				{
					MaxLengthAttribute maxLength = (MaxLengthAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Max length: {0}", maxLength.Length);
				}
			},
			{ typeof(MinLengthAttribute), a =>
				{
					MinLengthAttribute minLength = (MinLengthAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Min length: {0}", minLength.Length);
				}
			},
			{ typeof(StringLengthAttribute), a =>
				{
					StringLengthAttribute strLength = (StringLengthAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "String length: inclusive between {0} and {1}", strLength.MinimumLength, strLength.MaximumLength);
				}
			},
			{ typeof(DataTypeAttribute), a =>
				{
					DataTypeAttribute dataType = (DataTypeAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Data type: {0}", dataType.CustomDataType ?? dataType.DataType.ToString());
				}
			},
			{ typeof(RegularExpressionAttribute), a =>
				{
					RegularExpressionAttribute regularExpression = (RegularExpressionAttribute)a;
					return String.Format(CultureInfo.CurrentCulture, "Matching regular expression pattern: {0}", regularExpression.Pattern);
				}
			},
		};


	}

}
