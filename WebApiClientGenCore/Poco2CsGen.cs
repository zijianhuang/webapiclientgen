using Fonlow.CodeDom.Web;
using Fonlow.DocComment;
using Fonlow.Reflection;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Fonlow.Poco2Client
{
	/// <summary>
	/// POCO to C# client data types generator, with CSharp CodeDOM provider.
	/// </summary>
	public class Poco2CsGen
	{
		readonly CodeCompileUnit codeCompileUnit;

		/// <summary>
		/// Init with its own CodeCompileUnit.
		/// </summary>
		public Poco2CsGen()
		{
			codeCompileUnit = new CodeCompileUnit();
			pendingTypes = new List<Type>();
		}

		/// <summary>
		/// Gen will share the same CodeCompileUnit with other CodeGen components.
		/// </summary>
		/// <param name="codeCompileUnit"></param>
		public Poco2CsGen(CodeCompileUnit codeCompileUnit)
		{
			this.codeCompileUnit = codeCompileUnit;
			pendingTypes = new List<Type>();
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
				using (var stream = new MemoryStream())
				using (StreamWriter writer = new StreamWriter(stream))
				{
					WriteCode(writer);
					writer.Flush();
					stream.Position = 0;
					using (var stringReader = new StreamReader(stream))
					using (var fileWriter = new StreamWriter(fileName))
					{
						var s = stringReader.ReadToEnd();
						fileWriter.Write(s.Replace("//;", ""));
					}
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
		public void WriteCode(TextWriter writer)
		{
			if (writer == null)
				throw new ArgumentNullException(nameof(writer), "No TextWriter instance is defined.");

			using (CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp"))
			{
				CodeGeneratorOptions options = new CodeGeneratorOptions();
				provider.GenerateCodeFromCompileUnit(codeCompileUnit, writer, options);
			}
		}


		ModelGenOutputs settings;

		/// <summary>
		/// 
		/// </summary>
		/// <param name="assembly"></param>
		/// <param name="methods"></param>
		/// <param name="docLookup"></param>
		/// <param name="codeGenOutputs"></param>
		public void CreateCodeDom(Assembly assembly, CherryPickingMethods methods, DocCommentLookup docLookup, ModelGenOutputs codeGenOutputs)
		{
			this.docLookup = docLookup;
			this.settings = codeGenOutputs;
			var cherryTypes = PodGenHelper.GetCherryTypes(assembly, methods);
			CreateCodeDom(cherryTypes, methods, settings.CSClientNamespaceSuffix);
		}

		/// <summary>
		/// To store all custom types of the service app
		/// </summary>
		readonly List<Type> pendingTypes;

		/// <summary>
		/// Create TypeScript CodeDOM for POCO types. 
		/// For an enum type, all members will be processed regardless of EnumMemberAttribute.
		/// </summary>
		/// <param name="types">POCO types.</param>
		/// <param name="methods">How to cherry pick data to be exposed to the clients.</param>
		/// <param name="clientNamespaceSuffix"></param>
		public void CreateCodeDom(Type[] types, CherryPickingMethods methods, string clientNamespaceSuffix)
		{
			if (types == null)
				throw new ArgumentNullException(nameof(types), "types is not defined.");

			this.pendingTypes.AddRange(types);

			var typeGroupedByNamespace = types
				.GroupBy(d => d.Namespace)
				.OrderBy(k => k.Key); // order by namespace
			var namespacesOfTypes = typeGroupedByNamespace.Select(d => d.Key).ToArray();
			foreach (var groupedTypes in typeGroupedByNamespace)
			{
				var clientNamespaceText = (groupedTypes.Key + clientNamespaceSuffix);
				var clientNamespace = new CodeNamespace(clientNamespaceText);
				codeCompileUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

				Debug.WriteLine("Generating types in namespace: " + groupedTypes.Key + " ...");
				groupedTypes.OrderBy(t => t.Name).Select(type =>
				{
					var tsName = type.Name;
					Debug.WriteLine("clientClass: " + clientNamespace + "  " + tsName);

					CodeTypeDeclaration typeDeclaration;
					if (TypeHelper.IsClassOrStruct(type))
					{
						if (type.IsGenericType)
						{
							typeDeclaration = PodGenHelper.CreatePodClientGenericClass(clientNamespace, type);
						}
						else
						{
							typeDeclaration = type.IsClass ? PodGenHelper.CreatePodClientClass(clientNamespace, tsName) : PodGenHelper.CreatePodClientStruct(clientNamespace, tsName);
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


							//todo: Maybe the required of JsonMemberAttribute?       var isRequired = cherryType == CherryType.BigCherry;
							tsPropertyName = propertyInfo.Name;//todo: String.IsNullOrEmpty(dataMemberAttribute.Name) ? propertyInfo.Name : dataMemberAttribute.Name;
							Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, propertyInfo.PropertyType.Name));
							var defaultValue = GetDefaultValue(propertyInfo.GetCustomAttribute(typeOfDefaultValueAttribute) as DefaultValueAttribute);

							//var clientProperty = new CodeMemberProperty() //orthodox way of creating property, but resulting in verbose generated codes
							//{
							// Name = tsPropertyName,
							// Type = TranslateToClientTypeReference(propertyInfo.PropertyType),
							// Attributes = MemberAttributes.Public | MemberAttributes.Final,
							//};
							var clientProperty = CreateProperty(tsPropertyName, propertyInfo.PropertyType, defaultValue); //hacky way of creating clean getter and writter.
							var isRequired = cherryType == CherryType.BigCherry;
							if (isRequired)
							{
								clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.RequiredAttribute"));
							}

							//var privateFieldName = "_" + tsPropertyName;

							//typeDeclaration.Members.Add(new CodeMemberField()
							//{
							// Name = privateFieldName,
							// Type = TranslateToClientTypeReference(propertyInfo.PropertyType),
							//});

							//clientProperty.GetStatements.Add(new CodeSnippetStatement($"\t\t\t\treturn {privateFieldName};"));
							//clientProperty.SetStatements.Add(new CodeSnippetStatement($"\t\t\t\t{privateFieldName} = value;"));

							if (settings.DataAnnotationsEnabled)
							{
								AddValidationAttributes(propertyInfo, clientProperty, isRequired);
							}

							CreatePropertyDocComment(propertyInfo, clientProperty);

							if (settings.DecorateDataModelWithDataContract)
							{
								AddDataMemberAttribute(propertyInfo, clientProperty);
							}

							typeDeclaration.Members.Add(clientProperty);
						}

						var typeFields = type.GetFields(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public).OrderBy(f => f.Name).ToArray();
						foreach (var fieldInfo in typeFields)
						{
							var cherryType = CherryPicking.GetMemberCherryType(fieldInfo, methods, withDataContract);
							if (cherryType == CherryType.None)
								continue;
							string tsPropertyName;


							tsPropertyName = fieldInfo.Name;//todo: String.IsNullOrEmpty(dataMemberAttribute.Name) ? propertyInfo.Name : dataMemberAttribute.Name;
							Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, fieldInfo.FieldType.Name));
							var defaultValue = GetDefaultValue(fieldInfo.GetCustomAttribute(typeOfDefaultValueAttribute) as DefaultValueAttribute);
							
							//public fields of a class will be translated into properties
							if (type.IsClass)
							{
								//var clientProperty = new CodeMemberProperty() //orthodox way of creating property, but resulting in verbose generated codes
								//{
								// Name = tsPropertyName,
								// Type = TranslateToClientTypeReference(fieldInfo.FieldType),
								// Attributes = MemberAttributes.Public | MemberAttributes.Final,
								//};

								var clientProperty = CreateProperty(tsPropertyName, fieldInfo.FieldType, defaultValue); //hacky way of creating clean getter and writter.
								var isRequired = cherryType == CherryType.BigCherry;
								if (isRequired)
								{
									clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.RequiredAttribute"));
								}

								//var privateFieldName = "_" + tsPropertyName;

								//typeDeclaration.Members.Add(new CodeMemberField()
								//{
								// Name = privateFieldName,
								// Type = TranslateToClientTypeReference(fieldInfo.FieldType),
								//});

								//clientProperty.GetStatements.Add(new CodeSnippetStatement($"\t\t\t\treturn {privateFieldName};"));
								//clientProperty.SetStatements.Add(new CodeSnippetStatement($"\t\t\t\t{privateFieldName} = value;"));

								if (settings.DataAnnotationsEnabled)
								{
									AddValidationAttributes(fieldInfo, clientProperty, isRequired);
								}

								CreateFieldDocComment(fieldInfo, clientProperty);

								if (settings.DecorateDataModelWithDataContract)
								{
									AddDataMemberAttribute(fieldInfo, clientProperty);
								}

								typeDeclaration.Members.Add(clientProperty);
							}
							else //public fields of struct
							{
								var clientField = new CodeMemberField()
								{
									Name = tsPropertyName,
									Type = TranslateToClientTypeReference(fieldInfo.FieldType),
									Attributes = MemberAttributes.Public | MemberAttributes.Final,
									//todo: add some attributes                               
								};

								CreateFieldDocComment(fieldInfo, clientField);

								if (settings.DecorateDataModelWithDataContract)
								{
									AddDataMemberAttribute(fieldInfo, clientField);
								}

								typeDeclaration.Members.Add(clientField);
							}
						}

						if (settings.DecorateDataModelWithDataContract)
						{
							typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataContract", new CodeAttributeArgument("Namespace", new CodeSnippetExpression($"\"{settings.DataContractNamespace}\""))));
						}

						if (settings.DecorateDataModelWithSerializable)
						{
							typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.SerializableAttribute"));
						}
					}
					else if (type.IsEnum)
					{
						typeDeclaration = PodGenHelper.CreatePodClientEnum(clientNamespace, tsName);

						CreateTypeDocComment(type, typeDeclaration);

						var newtonJsonConverterAttributeData = type.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "Newtonsoft.Json.JsonConverterAttribute");
						if (newtonJsonConverterAttributeData != null)
						{
							typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("Newtonsoft.Json.JsonConverterAttribute", new CodeAttributeArgument(new CodeSnippetExpression("typeof(Newtonsoft.Json.Converters.StringEnumConverter)"))));
						}

						var systemJsonConverterAttributeData = type.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Text.Json.Serialization.JsonConverterAttribute");
						if (systemJsonConverterAttributeData != null)
						{
							typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Text.Json.Serialization.JsonConverter", new CodeAttributeArgument(new CodeSnippetExpression("typeof(System.Text.Json.Serialization.JsonStringEnumConverter)"))));
						}

						int k = 0;
						foreach (var fieldInfo in type.GetFields(BindingFlags.Public | BindingFlags.Static))//not to sort
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

							CreateFieldDocComment(fieldInfo, clientField);

							if (settings.DecorateDataModelWithDataContract)
							{
								AddEnumMemberAttribute(fieldInfo, clientField);
							}

							typeDeclaration.Members.Add(clientField);
							k++;
						}

						if (settings.DecorateDataModelWithDataContract)
						{
							typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataContract", new CodeAttributeArgument("Namespace", new CodeSnippetExpression($"\"{settings.DataContractNamespace}\""))));
						}

						if (settings.DecorateDataModelWithSerializable)
						{
							typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.SerializableAttribute"));
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

		void AddDataMemberAttribute(MemberInfo memberField, CodeMemberField clientProperty)
		{
			var dataMemberAttribute = TypeHelper.ReadAttribute<System.Runtime.Serialization.DataMemberAttribute>(memberField);// memberField.GetCustomAttribute<System.Runtime.Serialization.DataMemberAttribute>();
			if (dataMemberAttribute != null)
			{
				var n = dataMemberAttribute.Name;
				if (String.IsNullOrEmpty(n))
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataMember"));
				}
				else
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataMember", new CodeAttributeArgument("Name", new CodeSnippetExpression($"\"{n}\""))));
				}
			}
		}

		void AddEnumMemberAttribute(MemberInfo memberField, CodeMemberField clientProperty)
		{
			var dataMemberAttribute = TypeHelper.ReadAttribute<System.Runtime.Serialization.EnumMemberAttribute>(memberField);
			if (dataMemberAttribute != null)
			{
				var v = dataMemberAttribute.Value;
				if (String.IsNullOrEmpty(v))
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.EnumMember"));
				}
				else
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.EnumMember", new CodeAttributeArgument("Value", new CodeSnippetExpression($"\"{v}\""))));
				}
			}
		}

		DocCommentLookup docLookup;

		void CreateTypeDocComment(Type type, CodeTypeDeclaration typeDeclaration)
		{
			if (docLookup != null)
			{
				var dm = docLookup.GetMember("T:" + type.FullName);
				AddDocComments(dm, typeDeclaration.Comments);
			}
		}

		void CreatePropertyDocComment(PropertyInfo propertyInfo, CodeTypeMember codeField)
		{
			if (docLookup != null)
			{
				var propertyFullName = propertyInfo.DeclaringType.FullName + "." + propertyInfo.Name;
				var dm = docLookup.GetMember("P:" + propertyFullName);
				AddDocComments(dm, codeField.Comments, GenerateCommentsFromAttributes(propertyInfo)); // if no doc comments totally, no comments from attributes either.
			}
		}

		void CreateFieldDocComment(FieldInfo fieldInfo, CodeTypeMember codeField)
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
				comments.Add(new CodeCommentStatement("<summary>", true));
				var noIndent = StringFunctions.TrimTrimIndentsOfArray(dm.summary.Text);
				if (noIndent != null)
				{
					foreach (var item in noIndent)
					{
						comments.Add(new CodeCommentStatement(item, true));
					}
				}

				if (extra != null && extra.Length > 0)
				{
					foreach (var c in extra)
					{
						comments.Add(new CodeCommentStatement(c, true));
					}
				}

				comments.Add(new CodeCommentStatement("</summary>", true));
			}
			else if (extra != null && extra.Length > 0)
			{
				comments.Add(new CodeCommentStatement("<summary>", true));
				foreach (var c in extra)
				{
					comments.Add(new CodeCommentStatement(c, true));
				}
				comments.Add(new CodeCommentStatement("</summary>", true));
			}
		}

		CodeMemberField CreateProperty(string name, Type type, string defaultValue)
		{
			// This is a little hack. Since you cant create auto properties in CodeDOM,
			//  we make the getter and setter part of the member name.
			// This leaves behind a trailing semicolon that we comment out.
			//  Later, we remove the commented out semicolons.
			string memberName = name + (defaultValue == null || !settings.DataAnnotationsEnabled ? " { get; set; }//" : $" {{ get; set; }} = {defaultValue};//");

			CodeMemberField result = new CodeMemberField() { Type = TranslateToClientTypeReference(type), Name = memberName };
			result.Attributes = MemberAttributes.Public | MemberAttributes.Final;

			if (!String.IsNullOrEmpty(defaultValue))
			{
				result.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DefaultValueAttribute", new CodeAttributeArgument(new CodeSnippetExpression(defaultValue))));
			}


			return result;
		}

		/// <summary>
		/// Translate custom types, generic types, array and some special http message types to client code type refernce
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		public CodeTypeReference TranslateToClientTypeReference(Type type)
		{
			if (type == null)
				return null;// new CodeTypeReference("void");

			if (pendingTypes.Contains(type))
				return new CodeTypeReference(RefineCustomComplexTypeText(type));
			else if (type.IsGenericType)
			{
				return TranslateGenericToTypeReference(type);
			}
			else if (type.IsArray)
			{
				Debug.Assert(type.Name.EndsWith("]"));
				var elementType = type.GetElementType();
				var arrayRank = type.GetArrayRank();
				return CreateArrayTypeReference(elementType, arrayRank);
			}
			else
			{
				if (type.FullName == "System.Web.Http.IHttpActionResult")
					return new CodeTypeReference("System.Net.Http.HttpResponseMessage");

				if (type.FullName == "Microsoft.AspNetCore.Mvc.IActionResult" || type.FullName == "Microsoft.AspNetCore.Mvc.ActionResult")
					return new CodeTypeReference("System.Net.Http.HttpResponseMessage");

				if (type.FullName == "System.Net.Http.HttpResponseMessage")
					return new CodeTypeReference("System.Net.Http.HttpResponseMessage");

				if (type.FullName == "System.Object" && (type.Attributes & System.Reflection.TypeAttributes.Serializable) == System.Reflection.TypeAttributes.Serializable)
					return new CodeTypeReference("Newtonsoft.Json.Linq.JObject");
			}


			return new CodeTypeReference(type);

		}

		CodeTypeReference TranslateGenericToTypeReference(Type type)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();

			if (genericTypeDefinition == typeof(Nullable<>))
			{
				return new CodeTypeReference(typeof(Nullable).FullName
					, TranslateToClientTypeReference(genericArguments[0]));
			}

			if (genericTypeDefinition == typeof(System.Threading.Tasks.Task<>))
			{
				return TranslateToClientTypeReference(genericArguments[0]);
			}

			//Handle array types
			if (TypeHelper.IsArrayType(genericTypeDefinition))
			{
				Debug.Assert(type.GenericTypeArguments.Length == 1);
				var elementType = type.GenericTypeArguments[0];
				return CreateArrayTypeReference(elementType, 1);
			}

			var tupleTypeIndex = TypeHelper.IsTuple(genericTypeDefinition);
			if (tupleTypeIndex >= 0)
			{
				switch (tupleTypeIndex)
				{
					case 0:
						Debug.Assert(genericArguments.Length == 1);
						return new CodeTypeReference(TypeHelper.TupleTypeNames[0]
							, TranslateToClientTypeReference(genericArguments[0]));
					case 1:
						Debug.Assert(genericArguments.Length == 2);
						return new CodeTypeReference(TypeHelper.TupleTypeNames[1]
							, TranslateToClientTypeReference(genericArguments[0])
							, TranslateToClientTypeReference(genericArguments[1]));
					case 2:
						return new CodeTypeReference(TypeHelper.TupleTypeNames[2]
							, TranslateToClientTypeReference(genericArguments[0])
							, TranslateToClientTypeReference(genericArguments[1])
							, TranslateToClientTypeReference(genericArguments[2]));
					case 3:
						return new CodeTypeReference(TypeHelper.TupleTypeNames[3]
							, TranslateToClientTypeReference(genericArguments[0])
							, TranslateToClientTypeReference(genericArguments[1])
							, TranslateToClientTypeReference(genericArguments[2])
							, TranslateToClientTypeReference(genericArguments[3]));
					case 4:
						return new CodeTypeReference(TypeHelper.TupleTypeNames[4]
							, TranslateToClientTypeReference(genericArguments[0])
							, TranslateToClientTypeReference(genericArguments[1])
							, TranslateToClientTypeReference(genericArguments[2])
							, TranslateToClientTypeReference(genericArguments[3])
							, TranslateToClientTypeReference(genericArguments[4]));
					case 5:
						return new CodeTypeReference(TypeHelper.TupleTypeNames[5]
							, TranslateToClientTypeReference(genericArguments[0])
							, TranslateToClientTypeReference(genericArguments[1])
							, TranslateToClientTypeReference(genericArguments[2])
							, TranslateToClientTypeReference(genericArguments[3])
							, TranslateToClientTypeReference(genericArguments[4])
							, TranslateToClientTypeReference(genericArguments[5]));
					case 6:
						return new CodeTypeReference(TypeHelper.TupleTypeNames[6]
							, TranslateToClientTypeReference(genericArguments[0])
							, TranslateToClientTypeReference(genericArguments[1])
							, TranslateToClientTypeReference(genericArguments[2])
							, TranslateToClientTypeReference(genericArguments[3])
							, TranslateToClientTypeReference(genericArguments[4])
							, TranslateToClientTypeReference(genericArguments[5])
							, TranslateToClientTypeReference(genericArguments[6]));
					case 7:
						Debug.Assert(genericArguments.Length == 8);
						return new CodeTypeReference(TypeHelper.TupleTypeNames[7]
							, TranslateToClientTypeReference(genericArguments[0])
							, TranslateToClientTypeReference(genericArguments[1])
							, TranslateToClientTypeReference(genericArguments[2])
							, TranslateToClientTypeReference(genericArguments[3])
							, TranslateToClientTypeReference(genericArguments[4])
							, TranslateToClientTypeReference(genericArguments[5])
							, TranslateToClientTypeReference(genericArguments[6])
							, TranslateToClientTypeReference(genericArguments[7]));
					default:
						throw new InvalidOperationException("Hey, what Tuple");
				}
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

			return new CodeTypeReference(RefineCustomComplexTypeText(genericTypeDefinition), genericArguments.Select(t => TranslateToClientTypeReference(t)).ToArray());

		}

		string RefineCustomComplexTypeText(Type t)
		{
			return t.Namespace + this.settings.CSClientNamespaceSuffix + "." + t.Name;
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

		CodeTypeReference CreateArrayOfCustomTypeReference(Type elementType, int arrayRank)
		{
			var elementTypeReference = new CodeTypeReference(RefineCustomComplexTypeText(elementType));
			var typeReference = new CodeTypeReference(new CodeTypeReference(), arrayRank)
			{
				ArrayElementType = elementTypeReference,
			};
			return typeReference;
		}

		string[] GenerateCommentsFromAttributes(MemberInfo property)
		{
			if (!settings.DataAnnotationsToComments)
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
			}
		};

		void AddValidationAttributes(MemberInfo property, CodeTypeMember codeTypeMember, bool requiredAdded)
		{
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
				var attributeType = attribute.GetType();
				if (attributeType == typeof(RequiredAttribute) && requiredAdded)
				{
					continue;
				}

				if (AttributeDeclarationGenerator.TryGetValue(attributeType, out Func<Attribute, CodeAttributeDeclaration> textGenerator))
				{
					codeTypeMember.CustomAttributes.Add(textGenerator(attribute));
				}
			}
		}

		static readonly Type typeOfDefaultValueAttribute = typeof(DefaultValueAttribute);

		static readonly Type[] supportedTypes = new Type[] { typeof(double), typeof(int), typeof(long), typeof(char), typeof(float), typeof(short), typeof(byte) };

		string GetDefaultValue(DefaultValueAttribute a)
		{
			if (a == null)
			{
				return null;
			}

			var type = a.Value.GetType();
			if (type == typeof(string))
			{
				return "\"" + a.Value.ToString() + "\"";
			}


			if (supportedTypes.Any(t => t == type))
			{
				return a.Value.ToString();
			}

			if (type.IsEnum)
			{
				return type.Name + "." + a.Value.ToString();
			}

			return null;//not supported
		}

		readonly IDictionary<Type, Func<Attribute, CodeAttributeDeclaration>> AttributeDeclarationGenerator = new Dictionary<Type, Func<Attribute, CodeAttributeDeclaration>>
		{
			{ typeof(RequiredAttribute), a => new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.Required") },
			{ typeof(RangeAttribute), a =>
				{
					var obj = a as RangeAttribute;
					var operandType = new CodeSnippetExpression($"typeof({obj.OperandType.FullName})");
					var min = new CodeSnippetExpression($"\"{obj.Minimum}\"");
					var max = new CodeSnippetExpression($"\"{obj.Maximum}\"");
					//var isNumber = obj.GetType()== typeof(int) || obj.GetType()==typeof(double);
					List<CodeAttributeArgument> attributeParams = new List<CodeAttributeArgument> { new CodeAttributeArgument(operandType),
					new CodeAttributeArgument(min),
					new CodeAttributeArgument(max) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.Range", attributeParams.ToArray());
				}
			},
			{ typeof(MaxLengthAttribute), a =>
				{
					var obj= a as MaxLengthAttribute;
					var len = new CodeSnippetExpression(obj.Length.ToString());
					List<CodeAttributeArgument> attributeParams = new List<CodeAttributeArgument> { new CodeAttributeArgument(len) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.MaxLength", attributeParams.ToArray());
				}
			},
			{ typeof(MinLengthAttribute), a =>
				{
					var obj= a as MinLengthAttribute;
					var len = new CodeSnippetExpression(obj.Length.ToString());
					List<CodeAttributeArgument> attributeParams = new List<CodeAttributeArgument> { new CodeAttributeArgument(len) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.MinLength", attributeParams.ToArray());
				}
			},
			{ typeof(StringLengthAttribute), a =>
				{
					var obj= a as StringLengthAttribute;
					var max = new CodeSnippetExpression(obj.MaximumLength.ToString());
					var min = new CodeSnippetExpression(obj.MinimumLength.ToString());
					List<CodeAttributeArgument> attributeParams = new List<CodeAttributeArgument> { new CodeAttributeArgument(max),
					new CodeAttributeArgument("MinimumLength", min) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.StringLength", attributeParams.ToArray());
				}
			},
			{ typeof(DataTypeAttribute), a =>
				{
					var obj= a as DataTypeAttribute;
					var dataType = new CodeSnippetExpression("System.ComponentModel.DataAnnotations.DataType." + obj.DataType.ToString());
					List<CodeAttributeArgument> attributeParams = new List<CodeAttributeArgument> { new CodeAttributeArgument(dataType) };
					if (!String.IsNullOrEmpty(obj.ErrorMessage))
					{
					var error= new CodeSnippetExpression($"\"{obj.ErrorMessage}\"");
					attributeParams.Add(new CodeAttributeArgument("ErrorMessage", error));
					}

					return new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.DataType", attributeParams.ToArray());
				}
			},
			// not to support RegularExpressionAttribute since they are more of UI constraints.
		};


	}

}
