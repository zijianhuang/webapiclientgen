using Fonlow.CodeDom;
using Fonlow.CodeDom.Web;
using Fonlow.DocComment;
using Fonlow.Poco2TsCore;
using Fonlow.Reflection;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Reflection;

namespace Fonlow.Poco2Client
{
	/// <summary>
	/// Translation is based on C# format.
	/// </summary>
	public interface IDocCommentTranslate
	{
		string TranslateToClientTypeReferenceTextForDocComment(Type type);
	}

	/// <summary>
	/// POCO to C# client data types generator, with CSharpCodeDomProvider.
	/// </summary>
	public class Poco2CsGen : IDocCommentTranslate
	{
		readonly CodeCompileUnit clientCodeCompileUnit;
		readonly CodeGenOutputs codeGenOutputsSettings;
		readonly CodeGenSettings codeGenSettings;
		readonly CodeDomProvider codeDomProvider;

		DocCommentLookup docLookup;

		bool? dataAnnotationsToComments;

		/// <summary>
		/// To store all custom types of the service app
		/// </summary>
		readonly List<Type> pendingTypes;

		readonly IDictionary<Type, Func<object, string>> attribueCommentDic;

		readonly IDictionary<Type, Func<Attribute, CodeAttributeDeclaration>> declarationDic;

		readonly CustomAssembliesSet customAssembliesSet;

		/// <summary>
		/// Gen will share the same CodeCompileUnit with other CodeGen components which generate client API codes.
		/// </summary>
		/// <param name="codeCompileUnit"></param>
		public Poco2CsGen(CodeCompileUnit codeCompileUnit, CodeDomProvider csharpCodeDomProvider, CodeGenSettings codeGenSettings)
		{
			this.clientCodeCompileUnit = codeCompileUnit;
			codeDomProvider = csharpCodeDomProvider;
			pendingTypes = new List<Type>();
			this.codeGenSettings = codeGenSettings;
			this.codeGenOutputsSettings = codeGenSettings.ClientApiOutputs;

			AnnotationCommentGenerator annotationCommentGenerator = new AnnotationCommentGenerator();
			attribueCommentDic = annotationCommentGenerator.Get();
			declarationDic = AnnotationDeclarationGenerator.Create();
			customAssembliesSet = new CustomAssembliesSet(codeGenSettings.ApiSelections.AllDataModelAssemblyNames, codeGenSettings.ClientApiOutputs.CSClientNamespaceSuffix);
		}

		/// <summary>
		/// Create CodeDOM of POCO classes
		/// </summary>
		/// <param name="assembly"></param>
		/// <param name="cherryPickingMethods"></param>
		/// <param name="docLookup"></param>
		/// <param name="codeGenOutputs"></param>
		/// <param name="dataAnnotationsToComments">Optional. This may be independent of the global setting in settings of ModelGenOutputs</param>
		/// <returns>CodeDOM namespaces containing POCO classes.</returns>
		public void CreateCodeDomForAssembly(Assembly assembly, CherryPickingMethods cherryPickingMethods, bool? dataAnnotationsToComments)
		{
			string xmlDocFileName = DocCommentLookup.GetXmlPath(assembly);
			docLookup = DocCommentLookup.Create(xmlDocFileName);
			this.dataAnnotationsToComments = dataAnnotationsToComments;
			Type[] cherryTypes = PodGenHelper.GetCherryTypes(assembly, cherryPickingMethods);
			CreateCodeDomForTypes(cherryTypes, cherryPickingMethods);
		}

		public string TranslateToClientTypeReferenceTextForDocComment(Type type)
		{
			return TranslateToClientTypeReferenceText(type, true);
		}

		/// <summary>
		/// Translate custom types, generic types, array and some special http message types to client code type refernce.
		/// For custom complex types, it will return the propery client CodeTypeReference.
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		public CodeTypeReference TranslateToClientTypeReference(Type type)
		{
			if (type == null)
				return null;// new CodeTypeReference("void");

			if (pendingTypes.Contains(type))
			{
				return new CodeTypeReference(RefineCustomComplexTypeText(type));
			}
			else if (type.IsGenericType)
			{
				return TranslateGenericTypeDefinitionToTypeReference(type);
			}
			else if (type.IsArray)
			{
				Debug.Assert(type.Name.EndsWith(']'));
				Type elementType = type.GetElementType();
				int arrayRank = type.GetArrayRank();
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

				if (type.FullName == "System.Object")// && (type.Attributes & TypeAttributes.Serializable) == TypeAttributes.Serializable)
					return codeGenOutputsSettings.UseSystemTextJson ? new CodeTypeReference("System.Text.Json.Nodes.JsonObject") : new CodeTypeReference("Newtonsoft.Json.Linq.JObject"); // possible only after .NET 6
			}

			return new CodeTypeReference(type);
		}

		/// <summary>
		/// Create CodeDOM for POCO types. 
		/// For an enum type, all members will be processed regardless of EnumMemberAttribute.
		/// </summary>
		/// <param name="types">POCO types, generally of the same assembly</param>
		/// <param name="cherryPickingMethods">How to cherry pick data to be exposed to the clients.</param>
		/// <param name="clientNamespaceSuffix"></param>
		/// <returns>Namespaces of types.</returns>
		void CreateCodeDomForTypes(Type[] types, CherryPickingMethods cherryPickingMethods)
		{
			if (types == null)
				throw new ArgumentNullException(nameof(types), "types is not defined.");

			this.pendingTypes.AddRange(types);

			IGrouping<string, Type>[] typeGroupedByNamespace = types
				.GroupBy(d => d.Namespace)
				.OrderBy(k => k.Key).ToArray(); // order by namespace
			string[] namespacesOfTypes = typeGroupedByNamespace.Select(d => d.Key).ToArray(); // service type namespaces without client suffix

			foreach (IGrouping<string, Type> groupedTypes in typeGroupedByNamespace)
			{
				string clientNamespaceText = groupedTypes.Key + codeGenOutputsSettings.CSClientNamespaceSuffix;
				CodeNamespaceEx clientNamespace = clientCodeCompileUnit.Namespaces.InsertToSortedCollection(clientNamespaceText, true);
				Debug.WriteLine("Generating types in namespace: " + groupedTypes.Key + " ...");
				CodeTypeDeclaration[] codeTypeDeclarations = groupedTypes.OrderBy(t => t.Name).Select(type =>
				{
					return TypeToCodeTypeDeclaration(type, clientNamespace, namespacesOfTypes, cherryPickingMethods);
				}).Where(d => d != null).ToArray();//add classes into the namespace
			}
		}

		/// <summary>
		/// Check if custom Poco type is already registered as a client type.
		/// If not, create a new CodeTypeDeclaration, optionally with a new CodeNamespace.
		/// It is up to the client codes to decide what pocoType to come int. BCL types and other non-POCO types are not welcome.
		/// </summary>
		/// <param name="type">Custom POCO types.</param>
		/// <returns>Existing or newly created CodeTypeDeclaration.</returns>
		public CodeTypeDeclaration CheckOrAdd(Type type, bool dcOnly)
		{
			if (type == null || type == typeof(Object) || (type.IsGenericTypeParameter && type.IsGenericParameter))
			{
				return null;
			}

			CodeTypeDeclaration codeTypeDeclaration = LookupExistingClassOfCs(type);
			if (codeTypeDeclaration != null)
			{
				return codeTypeDeclaration;
			}

			var isClosedGeneric = type.IsGenericType && !type.IsGenericTypeDefinition;
			if (isClosedGeneric)
			{
				var assemblyFilename = type.Assembly.GetName().Name;
				if (codeGenSettings.ApiSelections.CherryPickingMethods == CherryPickingMethods.ApiOnly && codeGenSettings.ApiSelections.DataModelAssemblyNames != null && codeGenSettings.ApiSelections.DataModelAssemblyNames.Contains(assemblyFilename)) //to ensure the generic type is custom made, not from BCL or 3rd party you don't want.
				{
					Type foundTypeDef = PodGenHelper.FindGenericTypeDef(type.Assembly, $"{type.Namespace}.{type.Name}");
					if (foundTypeDef is not null && LookupExistingClassOfCs(foundTypeDef) is null)
					{
						return AddCodeTypeDeclaration(foundTypeDef, dcOnly); // for generic definition type
					}
				}

				Type[] genericArguments = type.GetGenericArguments();
				for (int i = 0; i < genericArguments.Length; i++)
				{
					CheckOrAdd(genericArguments[i], true);
				}
			}
			else if (TypeHelper.IsSimpleArrayType(type))
			{
				return null;
			}
			else if (type.IsArray)
			{
				Type elementType = type.GetElementType();
				return CheckOrAdd(elementType, true);
			}
			else
			{
				var assemblyFilename = type.Assembly.GetName().Name;
				if (codeGenSettings.ApiSelections.CherryPickingMethods == CherryPickingMethods.ApiOnly && codeGenSettings.ApiSelections.DataModelAssemblyNames != null && codeGenSettings.ApiSelections.DataModelAssemblyNames.Contains(assemblyFilename))
				{
					return AddCodeTypeDeclaration(type, dcOnly);
				}
			}

			return null;
		}

		CodeTypeDeclaration AddCodeTypeDeclaration(Type type, bool dcOnly)
		{
			if (type.IsGenericTypeParameter && type.IsGenericParameter)
			{
				return null;
			}


			CheckOrAdd(type.BaseType, true); // for baseType

			pendingTypes.Add(type); //do this first, in case of recursive relationship between class and property.

			string clientNamespaceText = type.Namespace + codeGenOutputsSettings.CSClientNamespaceSuffix;
			CodeNamespaceEx clientNamespace = clientCodeCompileUnit.Namespaces.InsertToSortedCollection(clientNamespaceText, dcOnly);
			string[] clientNamespacesOfTypes = clientCodeCompileUnit.Namespaces.Cast<CodeNamespace>().Select(d => d.Name).ToArray();
			string[] namespacesOfTypes = clientNamespacesOfTypes.Select(d => d.Substring(0, d.Length - codeGenSettings.ClientApiOutputs.CSClientNamespaceSuffix.Length)).ToArray();
			CodeTypeDeclaration r = TypeToCodeTypeDeclaration(type, clientNamespace as CodeNamespaceEx, namespacesOfTypes, codeGenSettings.ApiSelections.CherryPickingMethods);

			return r;
		}

		/// <summary>
		/// From type, create CodeTypeDeclaration of client type, including properies and fields. And for GodAssembly, optionall create types of properties and fields in CodeDom.
		/// The type is added to the namespace
		/// </summary>
		/// <param name="type"></param>
		/// <param name="clientNamespace"></param>
		/// <param name="namespacesOfTypes">Used by non value type, not used by generic type</param>
		/// <param name="cherryPickingMethods"></param>
		/// <returns></returns>
		CodeTypeDeclaration TypeToCodeTypeDeclaration(Type type, CodeNamespaceEx clientNamespace, string[] namespacesOfTypes, CherryPickingMethods cherryPickingMethods)
		{
			string tsName = type.Name;
			Debug.WriteLine("clientClass: " + clientNamespace + "  " + tsName);

			CodeTypeDeclaration typeDeclaration;
			if (TypeHelper.IsClassOrStruct(type))
			{
				if (type.IsGenericType)
				{
					typeDeclaration = PodGenHelper.CreatePodClientGenericClass(clientNamespace, type, customAssembliesSet);
				}
				else
				{
					typeDeclaration = type.IsClass ? PodGenHelper.CreatePodClientClass(clientNamespace, tsName) : PodGenHelper.CreatePodClientStruct(clientNamespace, tsName);
				}

				if (!type.IsValueType)
				{

					if (type.Name.Contains("Trust"))
					{
						Console.WriteLine(type.Name);
					}

					if (namespacesOfTypes.Contains(type.BaseType.Namespace))
					{
						typeDeclaration.BaseTypes.Add(RefineCustomComplexTypeText(type.BaseType));
					}
					else
					{
						var existingClientNamespaceIdx = clientCodeCompileUnit.Namespaces.FindIndex(type.BaseType.Namespace + this.codeGenOutputsSettings.CSClientNamespaceSuffix);
						if (existingClientNamespaceIdx >= 0) // for base class in the other assembly
						{
							typeDeclaration.BaseTypes.Add(RefineCustomComplexTypeText(type.BaseType));
						}
						else
						{
							typeDeclaration.BaseTypes.Add(type.BaseType); // built-in type
						}
					}
				}

				var typeObsoleteAttribute = type.GetCustomAttribute<ObsoleteAttribute>();
				if (typeObsoleteAttribute != null)
				{
					if (typeObsoleteAttribute.IsError) // not to generate client Type.
					{
						return null;
					}

					typeDeclaration.CustomAttributes.Add(AnnotationDeclarationGenerator.CreateDeclaration(typeObsoleteAttribute));
				}

				CreateTypeDocComment(type, typeDeclaration);

				CherryPickingMethods typeCherryMethods = CherryPicking.GetTypeCherryMethods(type);
				bool withDataContract = (typeCherryMethods & CherryPickingMethods.DataContract) == CherryPickingMethods.DataContract;
				PropertyInfo[] typeProperties = type.GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public).OrderBy(p => p.Name).ToArray();
				foreach (PropertyInfo propertyInfo in typeProperties)
				{
					var propertyObsolete = propertyInfo.GetCustomAttribute<ObsoleteAttribute>();
					if (propertyObsolete != null && propertyObsolete.IsError)
					{
						continue;
					}

					CheckOrAdd(propertyInfo.PropertyType, true);

					CherryType cherryType = CherryPicking.GetMemberCherryType(propertyInfo, cherryPickingMethods, withDataContract);
					if (cherryType == CherryType.None && cherryPickingMethods != CherryPickingMethods.ApiOnly)
					{
						continue;
					}

					string tsPropertyName;
					//todo: Maybe the required of JsonMemberAttribute?       var isRequired = cherryType == CherryType.BigCherry;
					tsPropertyName = propertyInfo.Name;//todo: String.IsNullOrEmpty(dataMemberAttribute.Name) ? propertyInfo.Name : dataMemberAttribute.Name;
					Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, propertyInfo.PropertyType.Name));
					string defaultValue = GetDefaultValue(propertyInfo.GetCustomAttribute(typeOfDefaultValueAttribute) as DefaultValueAttribute);

					CodeMemberField clientProperty = CreateProperty(tsPropertyName, propertyInfo.PropertyType, defaultValue); //hacky way of creating clean getter and writter.
					bool isRequired = cherryType == CherryType.BigCherry;
					if (isRequired)
					{
						clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.Required"));
					}

					if (codeGenOutputsSettings.DataAnnotationsEnabled)
					{
						AddValidationAttributes(propertyInfo, clientProperty, isRequired);
					}

					CreatePropertyDocComment(propertyInfo, clientProperty);

					if (codeGenOutputsSettings.DecorateDataModelWithDataContract)
					{
						AddDataMemberAttribute(propertyInfo, clientProperty);
					}

					if (codeGenOutputsSettings.UseSystemTextJson)
					{
						AddJsonPropertyNameAttribute(propertyInfo, clientProperty);
					}

					typeDeclaration.Members.Add(clientProperty);
				}

				FieldInfo[] typeFields = type.GetFields(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public).OrderBy(f => f.Name).ToArray();
				foreach (FieldInfo fieldInfo in typeFields)
				{
					var fieldObsolete = fieldInfo.GetCustomAttribute<ObsoleteAttribute>();
					if (fieldObsolete != null && fieldObsolete.IsError)
					{
						continue;
					}

					CheckOrAdd(fieldInfo.FieldType, true);

					CherryType cherryType = CherryPicking.GetMemberCherryType(fieldInfo, cherryPickingMethods, withDataContract);
					if (cherryType == CherryType.None)
						continue;
					string tsPropertyName;


					tsPropertyName = fieldInfo.Name;//todo: String.IsNullOrEmpty(dataMemberAttribute.Name) ? propertyInfo.Name : dataMemberAttribute.Name;
					Debug.WriteLine(String.Format("{0} : {1}", tsPropertyName, fieldInfo.FieldType.Name));
					string defaultValue = GetDefaultValue(fieldInfo.GetCustomAttribute(typeOfDefaultValueAttribute) as DefaultValueAttribute);

					//public fields of a class will be translated into properties
					if (type.IsClass)
					{
						CodeMemberField clientProperty = CreateProperty(tsPropertyName, fieldInfo.FieldType, defaultValue); //hacky way of creating clean getter and writter.
						bool isRequired = cherryType == CherryType.BigCherry;
						if (isRequired)
						{
							clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.Required"));
						}

						if (codeGenOutputsSettings.DataAnnotationsEnabled)
						{
							AddValidationAttributes(fieldInfo, clientProperty, isRequired);
						}

						CreateFieldDocComment(fieldInfo, clientProperty);

						if (codeGenOutputsSettings.DecorateDataModelWithDataContract)
						{
							AddDataMemberAttribute(fieldInfo, clientProperty);
						}

						typeDeclaration.Members.Add(clientProperty);
					}
					else //public fields of struct
					{
						CodeMemberField clientField = new CodeMemberField()
						{
							Name = tsPropertyName,
							Type = TranslateToClientTypeReference(fieldInfo.FieldType),
							Attributes = MemberAttributes.Public | MemberAttributes.Final,
							//todo: add some attributes                               
						};

						CreateFieldDocComment(fieldInfo, clientField);

						if (codeGenOutputsSettings.DecorateDataModelWithDataContract)
						{
							AddDataMemberAttribute(fieldInfo, clientField);
						}

						typeDeclaration.Members.Add(clientField);
					}
				}

				if (codeGenOutputsSettings.DecorateDataModelWithDataContract)
				{
					typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataContract", new CodeAttributeArgument("Namespace", new CodeSnippetExpression($"\"{codeGenOutputsSettings.DataContractNamespace}\""))));
				}

				//if (codeGenOutputsSettings.UseSystemTextJson)
				//{
				//	AddJsonDerivedTypeAttributes
				//}

				if (codeGenOutputsSettings.DecorateDataModelWithSerializable)
				{
					typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Serializable"));
				}
			}
			else if (type.IsEnum)
			{
				typeDeclaration = PodGenHelper.CreatePodClientEnum(clientNamespace, tsName);

				CreateTypeDocComment(type, typeDeclaration);

				CustomAttributeData newtonJsonConverterAttributeData = type.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "Newtonsoft.Json.JsonConverterAttribute");
				if (newtonJsonConverterAttributeData != null)
				{
					typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration(codeGenOutputsSettings.UseSystemTextJson ? "System.Text.Json.Serialization.JsonConverter" : "Newtonsoft.Json.JsonConverter", new CodeAttributeArgument(new CodeSnippetExpression(codeGenOutputsSettings.UseSystemTextJson ? "typeof(System.Text.Json.Serialization.JsonStringEnumConverter)" : "typeof(Newtonsoft.Json.Converters.StringEnumConverter)"))));
				}

				CustomAttributeData systemJsonConverterAttributeData = type.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Text.Json.Serialization.JsonConverterAttribute");
				if (systemJsonConverterAttributeData != null)
				{
					typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Text.Json.Serialization.JsonConverter", new CodeAttributeArgument(new CodeSnippetExpression("typeof(System.Text.Json.Serialization.JsonStringEnumConverter)"))));
				}

				int k = 0;
				foreach (FieldInfo fieldInfo in type.GetFields(BindingFlags.Public | BindingFlags.Static))//not to sort
				{
					string name = fieldInfo.Name;
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

					if (codeGenOutputsSettings.DecorateDataModelWithDataContract)
					{
						AddEnumMemberAttribute(fieldInfo, clientField);
					}

					typeDeclaration.Members.Add(clientField);
					k++;
				}

				if (codeGenOutputsSettings.DecorateDataModelWithDataContract)
				{
					typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataContract", new CodeAttributeArgument("Namespace", new CodeSnippetExpression($"\"{codeGenOutputsSettings.DataContractNamespace}\""))));
				}

				if (codeGenOutputsSettings.DecorateDataModelWithSerializable)
				{
					typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Serializable"));
				}
			}
			else
			{
				Trace.TraceWarning("Not yet supported: " + type.Name);
				typeDeclaration = null;
			}

			return typeDeclaration;
		}

		static void AddDataMemberAttribute(MemberInfo memberInfo, CodeMemberField clientProperty)
		{
			System.Runtime.Serialization.DataMemberAttribute dataMemberAttribute = memberInfo.GetCustomAttribute<System.Runtime.Serialization.DataMemberAttribute>();
			if (dataMemberAttribute != null)
			{
				List<CodeAttributeArgument> arguments = new();
				if (!String.IsNullOrEmpty(dataMemberAttribute.Name))
				{
					arguments.Add(new CodeAttributeArgument("Name", new CodeSnippetExpression($"\"{dataMemberAttribute.Name}\"")));
				}

				if (!dataMemberAttribute.EmitDefaultValue)
				{
					arguments.Add(new CodeAttributeArgument("EmitDefaultValue", new CodeSnippetExpression("false")));
				}

				if (dataMemberAttribute.IsRequired)
				{
					arguments.Add(new CodeAttributeArgument("IsRequired ", new CodeSnippetExpression("true")));
				}

				if (dataMemberAttribute.Order > -1) //it seems the default is -1
				{
					arguments.Add(new CodeAttributeArgument("Order", new CodeSnippetExpression(dataMemberAttribute.Order.ToString())));
				}


				if (arguments.Count == 0)
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataMember"));
				}
				else
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataMember", arguments.ToArray()));
				}
			}
		}

		static void AddEnumMemberAttribute(MemberInfo memberInfo, CodeMemberField clientProperty)
		{
			System.Runtime.Serialization.EnumMemberAttribute dataMemberAttribute = memberInfo.GetCustomAttribute<System.Runtime.Serialization.EnumMemberAttribute>();
			if (dataMemberAttribute != null)
			{
				string v = dataMemberAttribute.Value;
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

		static void AddJsonPropertyNameAttribute(MemberInfo memberInfo, CodeMemberField clientProperty)
		{
			System.Text.Json.Serialization.JsonPropertyNameAttribute jsonPropertyNameAttribute = memberInfo.GetCustomAttribute<System.Text.Json.Serialization.JsonPropertyNameAttribute>();
			if (jsonPropertyNameAttribute != null)
			{
				List<CodeAttributeArgument> arguments = new();
				Debug.Assert(!String.IsNullOrEmpty(jsonPropertyNameAttribute.Name));
				arguments.Add(new CodeAttributeArgument(new CodeSnippetExpression($"\"{jsonPropertyNameAttribute.Name}\"")));
				clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Text.Json.Serialization.JsonPropertyName", arguments.ToArray()));
			}
		}

		//static void AddJsonDerivedTypeAttributes(Type type)
		//{
		//	var attbibutes = TypeHelper.ReadAttributes<System.Text.Json.Serialization.JsonDerivedTypeAttribute>(type);
		//	foreach (var a in attbibutes)
		//	{
		//		List<CodeAttributeArgument> arguments = new();
		//		if (!String.IsNullOrEmpty(a.type))
		//		{
		//			arguments.Add(new CodeAttributeArgument("Name", new CodeSnippetExpression($"\"{attbibute.Name}\"")));
		//		}

		//		if (!attbibute.EmitDefaultValue)
		//		{
		//			arguments.Add(new CodeAttributeArgument("EmitDefaultValue", new CodeSnippetExpression("false")));
		//		}

		//		if (attbibute.IsRequired)
		//		{
		//			arguments.Add(new CodeAttributeArgument("IsRequired ", new CodeSnippetExpression("true")));
		//		}
		//		if (attbibute.Order > -1) //it seems the default is -1
		//		{
		//			arguments.Add(new CodeAttributeArgument("Order", new CodeSnippetExpression(attbibute.Order.ToString())));
		//		}


		//		if (arguments.Count == 0)
		//		{
		//			clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataMember"));
		//		}
		//		else
		//		{
		//			clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataMember", arguments.ToArray()));
		//		}
		//	}

		//}

		void CreateTypeDocComment(Type type, CodeTypeDeclaration typeDeclaration)
		{
			if (docLookup != null)
			{
				docMember dm = docLookup.GetMember("T:" + type.FullName);
				AddDocComments(typeDeclaration.Comments, dm, null);
			}
		}

		void CreatePropertyDocComment(PropertyInfo propertyInfo, CodeTypeMember codeField)
		{
			if (docLookup != null)
			{
				string propertyFullName = propertyInfo.DeclaringType.FullName + "." + propertyInfo.Name;
				docMember dm = docLookup.GetMember("P:" + propertyFullName);
				string[] commentsFromAttributes = GenerateCommentsFromAttributes(propertyInfo);
				AddDocComments(codeField.Comments, dm, commentsFromAttributes);
			}
		}

		void CreateFieldDocComment(FieldInfo fieldInfo, CodeTypeMember codeField)
		{
			if (docLookup != null)
			{
				string propertyFullName = fieldInfo.DeclaringType.FullName + "." + fieldInfo.Name;
				docMember dm = docLookup.GetMember("F:" + propertyFullName);
				string[] commentsFromAttributes = GenerateCommentsFromAttributes(fieldInfo);
				AddDocComments(codeField.Comments, dm, commentsFromAttributes);
			}
		}

		/// <summary>
		/// Add doc comment stored in XML to comments (CodeCommentStatementCollection) to form C# doc comment block
		/// </summary>
		/// <param name="commentStatementCollection"></param>
		/// <param name="dm">Doc comment stored in XML.</param>
		/// <param name="extra">If dm has no content, extra will be added to comments.</param>
		static void AddDocComments(CodeCommentStatementCollection commentStatementCollection, docMember dm, string[] extra)
		{
			if (dm != null && dm.summary != null)
			{
				commentStatementCollection.Add(new CodeCommentStatement("<summary>", true));
				IList<string> noIndent = StringFunctions.TrimTrimIndentsOfArray(dm.summary.Text);
				if (noIndent != null)
				{
					foreach (string item in noIndent)
					{
						commentStatementCollection.Add(new CodeCommentStatement(item, true));
					}
				}

				if (extra != null && extra.Length > 0)
				{
					foreach (string c in extra)
					{
						commentStatementCollection.Add(new CodeCommentStatement(c, true));
					}
				}

				commentStatementCollection.Add(new CodeCommentStatement("</summary>", true));
			}
			else if (extra != null && extra.Length > 0)
			{
				commentStatementCollection.Add(new CodeCommentStatement("<summary>", true));
				foreach (string c in extra)
				{
					commentStatementCollection.Add(new CodeCommentStatement(c, true));
				}
				commentStatementCollection.Add(new CodeCommentStatement("</summary>", true));
			}
		}

		CodeMemberField CreateProperty(string name, Type type, string defaultValue)
		{
			// This is a little hack. Since you cant create auto properties in CodeDOM,
			//  we make the getter and setter part of the member name.
			// This leaves behind a trailing semicolon that we comment out.
			//  Later, we remove the commented out semicolons.
			string memberName = name + (defaultValue == null || !codeGenOutputsSettings.DataAnnotationsEnabled ? " { get; set; }//" : $" {{ get; set; }} = {defaultValue};//");

			CodeMemberField result = new()
			{
				Type = TranslateToClientTypeReference(type),
				Name = memberName,
				Attributes = MemberAttributes.Public | MemberAttributes.Final
			};

			if (!String.IsNullOrEmpty(defaultValue))
			{
				result.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DefaultValue", new CodeAttributeArgument(new CodeSnippetExpression(defaultValue))));
			}


			return result;
		}

		CodeTypeReference TranslateGenericTypeDefinitionToTypeReference(Type type)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();

			CodeTypeReference CreateGenericType()
			{
				string anyGenericTypeName = genericTypeDefinition.FullName;
				int idx = anyGenericTypeName.IndexOf('`');
				anyGenericTypeName = anyGenericTypeName.Substring(0, idx);
				CodeTypeReference[] genericParams = genericArguments.Select(t => TranslateToClientTypeReference(t)).ToArray();
				return new CodeTypeReference(anyGenericTypeName, genericParams);
			}

			if (genericTypeDefinition == typeof(Nullable<>) || TypeHelper.IsTuple(genericTypeDefinition) >= 0 ||
				genericTypeDefinition == typeof(IDictionary<,>) || genericTypeDefinition == typeof(KeyValuePair<,>) || TypeHelper.IsIDictionaryType(type) ||
				(TypeHelper.IsIEnumerableType(genericTypeDefinition) && !codeGenOutputsSettings.IEnumerableToArray))
			{
				return CreateGenericType();
			}

			if (genericTypeDefinition == typeof(System.Threading.Tasks.Task<>))
			{
				return TranslateToClientTypeReference(genericArguments[0]);
			}

			if ((TypeHelper.IsIEnumerableType(genericTypeDefinition) && codeGenOutputsSettings.IEnumerableToArray) ||
				genericTypeDefinition.FullName == "System.Collections.Generic.IAsyncEnumerable`1") //Handle IAsyncEnumerable which can't be serialized because of lacking of a collection interface. Thus need to translate to array.
			{
				//Debug.Assert(type.GenericTypeArguments.Length == 1);
				Type elementType = type.GenericTypeArguments[0];
				return CreateArrayTypeReference(elementType, 1);
			}

			// This is for custom generic type, which may want .Client suffix or alike.
			return new CodeTypeReference(RefineCustomComplexTypeText(genericTypeDefinition), genericArguments.Select(t => TranslateToClientTypeReference(t)).ToArray());

		}

		public string TranslateCodeTypeReferenceToCSharp(CodeTypeReference codeTypeReference)
		{
			return codeDomProvider.GetTypeOutput(codeTypeReference);
		}

		public string TranslateTypeToCSharp(Type type)
		{
			CodeTypeReference codeTypeReference = TranslateToClientTypeReference(type);
			return codeDomProvider.GetTypeOutput(codeTypeReference);
		}

		/// <summary>
		/// Generate type text suitable for matching what in doc comment XML, especially for generic types. For example, Nullable int in doc comment is Nullable{System.Int32}.
		/// CSharpCodeProvider always give Nullable int, and there's no built-in way to alter.
		/// This function reassembles TranslateToClientTypeReference, however, make sure that basic types of CLR will have something like System.Int32, and also curly baskets for generics.
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		public string TranslateToClientTypeReferenceText(Type type, bool forDocComment)
		{
			if (type == null)
				return null;

			if (pendingTypes.Contains(type))
				return codeDomProvider.GetTypeOutput(new CodeTypeReference(forDocComment ? type.FullName : RefineCustomComplexTypeText(type)));
			else if (type.IsGenericType)
			{
				return TranslateGenericToTypeReferenceText(type, forDocComment);
			}
			else if (type.IsArray)
			{
				Debug.Assert(type.Name.EndsWith(']'));
				string elementTypeText = TranslateToClientTypeReferenceText(type.GetElementType(), forDocComment);
				return $"{elementTypeText}[]";
			}
			else
			{
				if (type.FullName == "System.Web.Http.IHttpActionResult")
					return "System.Net.Http.HttpResponseMessage";

				if (type.FullName == "Microsoft.AspNetCore.Mvc.IActionResult" || type.FullName == "Microsoft.AspNetCore.Mvc.ActionResult")
					return "System.Net.Http.HttpResponseMessage";

				if (type.FullName == "System.Net.Http.HttpResponseMessage")
					return "System.Net.Http.HttpResponseMessage";

				if (type.FullName == "System.Object")// && (type.Attributes & TypeAttributes.Serializable) == TypeAttributes.Serializable)
					return codeGenOutputsSettings.UseSystemTextJson ? "System.Text.Json.Nodes.JsonObject" : "Newtonsoft.Json.Linq.JObject";
			}


			return type.FullName; // for simpleType, it should be something like System.Int32.

		}

		string TranslateGenericToTypeReferenceText(Type type, bool forDocComment)
		{
			Type genericTypeDefinition = type.GetGenericTypeDefinition();
			Type[] genericArguments = type.GetGenericArguments();

			string CreateGenericTypeText()
			{
				string anyGenericTypeName = forDocComment ? genericTypeDefinition.FullName : RefineCustomComplexTypeText(genericTypeDefinition);
				int idx = anyGenericTypeName.IndexOf('`');
				anyGenericTypeName = anyGenericTypeName.Substring(0, idx);
				string genericParamsText = String.Join(',', genericArguments.Select(t => TranslateToClientTypeReferenceText(t, forDocComment)).ToArray());
				string left = forDocComment ? "{" : "<";
				string right = forDocComment ? "}" : ">";
				return $"{anyGenericTypeName}{left}{genericParamsText}{right}";
			}

			string CreateSystemGenericTypeText()
			{
				string anyGenericTypeName = genericTypeDefinition.FullName;
				int idx = anyGenericTypeName.IndexOf('`');
				anyGenericTypeName = anyGenericTypeName.Substring(0, idx);
				string genericParamsText = String.Join(',', genericArguments.Select(t => TranslateToClientTypeReferenceText(t, forDocComment)).ToArray());
				string left = forDocComment ? "{" : "<";
				string right = forDocComment ? "}" : ">";
				return $"{anyGenericTypeName}{left}{genericParamsText}{right}";
			}

			if (genericTypeDefinition == typeof(Nullable<>) || TypeHelper.IsTuple(genericTypeDefinition) >= 0 ||
				genericTypeDefinition == typeof(IDictionary<,>) || genericTypeDefinition == typeof(KeyValuePair<,>) || TypeHelper.IsIDictionaryType(type) ||
				(TypeHelper.IsIEnumerableType(genericTypeDefinition) && !codeGenOutputsSettings.IEnumerableToArray))
			{
				return CreateSystemGenericTypeText();
			}

			if (genericTypeDefinition == typeof(System.Threading.Tasks.Task<>))
			{
				return TranslateToClientTypeReferenceText(genericArguments[0], forDocComment);
			}

			if ((TypeHelper.IsIEnumerableType(genericTypeDefinition) && codeGenOutputsSettings.IEnumerableToArray) ||
				genericTypeDefinition.FullName == "System.Collections.Generic.IAsyncEnumerable`1") //Handle IAsyncEnumerable which can't be serialized because of lacking of a collection interface. Thus need to translate to array.
			{
				Debug.Assert(type.GenericTypeArguments.Length == 1);
				Type elementType = type.GenericTypeArguments[0];
				return CreateArrayTypeReferenceText(elementType, 1);
			}

			return CreateGenericTypeText();
		}

		/// <summary>
		/// Giving something like MyNamespace.Client.TName
		/// </summary>
		/// <param name="type"></param>
		/// <returns></returns>
		string RefineCustomComplexTypeText(Type type)
		{
			if (type.IsGenericType && !type.IsGenericTypeDefinition && customAssembliesSet.IsCustomType(type))
			{
				var ts = type.GenericTypeArguments;
				var tsText = string.Join(", ", ts.Select(d => TranslateToClientTypeReference(d).BaseType));
				string[] nameSegments = type.Name.Split('`');
				string genericClassName = nameSegments[0];
				return type.Namespace + this.codeGenOutputsSettings.CSClientNamespaceSuffix + "." + genericClassName + $"<{tsText}>";
				//so to return something like DemoWebApi.DemoData.Client.MyGeneric<Int32, String, DateTime> as the parent type
			}
			else
			{
				return customAssembliesSet.GetClientTypeName(type);
			}
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

		string CreateArrayTypeReferenceText(Type elementType, int arrayRank)
		{
			if (pendingTypes.Contains(elementType))
			{
				return CreateArrayOfCustomTypeReferenceText(elementType, arrayRank);
			}

			CodeTypeReference t = TranslateToClientTypeReference(elementType);
			string s = new string(',', arrayRank - 1);
			return $"{t}[{s}]";
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

		string CreateArrayOfCustomTypeReferenceText(Type elementType, int arrayRank)
		{
			string t = RefineCustomComplexTypeText(elementType);
			string s = new string(',', arrayRank - 1);
			return $"{t}[{s}]";
		}

		/// <summary>
		/// Return a list of comments from validation attributes of property.
		/// </summary>
		/// <param name="memberInfo"></param>
		/// <returns>Empty array if no comment</returns>
		string[] GenerateCommentsFromAttributes(MemberInfo memberInfo)
		{
			if ((dataAnnotationsToComments.HasValue && !dataAnnotationsToComments.Value) || //dataModel.dataAnnotationsToComments explicitly tells not to
				(!dataAnnotationsToComments.HasValue && !codeGenOutputsSettings.DataAnnotationsToComments)) // dataModel.dataAnnotationsToComments does not tell, and global setting tells not to
			{
				return Array.Empty<string>();
			}

			return CommentsHelper.GenerateCommentsFromAttributes(memberInfo.GetCustomAttributes().ToList(), attribueCommentDic);
		}

		void AddValidationAttributes(MemberInfo memberInfo, CodeTypeMember codeTypeMember, bool requiredAdded)
		{
			List<Attribute> attributes = memberInfo.GetCustomAttributes().ToList();
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

				if (declarationDic.TryGetValue(attributeType, out Func<Attribute, CodeAttributeDeclaration> textGenerator))
				{
					codeTypeMember.CustomAttributes.Add(textGenerator(attribute));
				}
			}
		}

		/// <summary>
		/// Lookup existing CodeTypeDeclaration created for controller class from codeCompileUnit
		/// </summary>
		/// <param name="namespaceText"></param>
		/// <param name="className">Controller name plus suffix</param>
		/// <returns></returns>
		public CodeTypeDeclaration LookupExistingClassOfCs(Type type)
		{
			for (int i = 0; i < clientCodeCompileUnit.Namespaces.Count; i++)
			{
				CodeNamespace ns = clientCodeCompileUnit.Namespaces[i];
				if (ns.Name == type.Namespace + codeGenSettings.ClientApiOutputs.CSClientNamespaceSuffix)
				{
					for (int k = 0; k < ns.Types.Count; k++)
					{
						CodeTypeDeclaration c = ns.Types[k];
						if (type.IsGenericTypeDefinition && type.IsTypeDefinition)
						{
							string[] nameSegments = type.Name.Split('`');
							string genericClassName = nameSegments[0];
							int numOfGenericParameters = int.Parse(nameSegments[1]);
							if (c.Name == genericClassName && c.TypeParameters.Count == numOfGenericParameters)
							{
								return c;
							}
						}
						else if (c.Name == type.Name)
						{
							return c;
						}
					}
				}
			}

			return null;
		}

		public CodeTypeDeclaration LookupExistingClassOfCs(string namespaceText, string typeName)
		{
			for (int i = 0; i < clientCodeCompileUnit.Namespaces.Count; i++)
			{
				CodeNamespace ns = clientCodeCompileUnit.Namespaces[i];
				if (ns.Name == namespaceText + codeGenSettings.ClientApiOutputs.CSClientNamespaceSuffix)
				{
					for (int k = 0; k < ns.Types.Count; k++)
					{
						CodeTypeDeclaration c = ns.Types[k];
						if (c.Name == typeName)
						{
							return c;
						}
					}
				}
			}

			return null;
		}

		static readonly Type typeOfDefaultValueAttribute = typeof(DefaultValueAttribute);

		static readonly Type[] supportedTypes = new Type[] { typeof(double), typeof(int), typeof(long), typeof(char), typeof(float), typeof(short), typeof(byte) };

		static string GetDefaultValue(DefaultValueAttribute a)
		{
			if (a == null)
			{
				return null;
			}

			Type type = a.Value.GetType();
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

	}

}
