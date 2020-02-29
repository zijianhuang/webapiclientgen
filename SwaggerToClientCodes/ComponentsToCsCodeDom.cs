using System;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;
using Microsoft.OpenApi.Readers.Exceptions;
using Microsoft.OpenApi;
using System.Reflection;
using System.IO;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Text;
using Fonlow.Web.Meta;
using System.Linq;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using Tavis.UriTemplates;
using Fonlow.Poco2Client;
using Fonlow.Reflection;
using System.Diagnostics;
using Fonlow.DocComment;
using Microsoft.OpenApi.Any;

namespace Fonlow.WebApiClientGen.Swag
{
	/// <summary>
	/// Create CS CodeDOM from OpenApiComponents
	/// </summary>
	public class ComponentsToCsCodeDom
	{
		public ComponentsToCsCodeDom(Settings settings, CodeCompileUnit codeCompileUnit)
		{
			this.codeCompileUnit = codeCompileUnit;
			this.settings = settings;
			this.nameComposer = new NameComposer(settings);
		}

		readonly CodeCompileUnit codeCompileUnit;

		readonly Settings settings;

		readonly NameComposer nameComposer;

		//Dictionary<string, CodeTypeDeclaration> typeDeclarationDic = new Dictionary<string, CodeTypeDeclaration>();

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

		public void WriteCode(TextWriter writer)
		{
			if (writer == null)
				throw new ArgumentNullException(nameof(writer), "No TextWriter instance is defined.");

			CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp");
			CodeGeneratorOptions options = new CodeGeneratorOptions();

			provider.GenerateCodeFromCompileUnit(codeCompileUnit, writer, options);
		}

		public void CreateCodeDom(OpenApiComponents components)
		{
			if (components == null)
			{
				throw new ArgumentNullException(nameof(components));
			}

			var clientNamespace = new CodeNamespace(settings.ClientNamespace);
			codeCompileUnit.Namespaces.Add(clientNamespace);//namespace added to Dom

			foreach (var item in components.Schemas)
			{
				var typeName = item.Key;
				Debug.WriteLine("clientClass: " + typeName);
				var schema = item.Value;
				var type = schema.Type;
				var allOfBaseTypeSchemaList = schema.AllOf; //maybe empty
				var enumTypeList = schema.Enum; //maybe empty
				bool isForClass = enumTypeList.Count==0;
				var schemaProperties = schema.Properties;
				CodeTypeDeclaration typeDeclaration;
				if (isForClass)
				{
					typeDeclaration = PodGenHelper.CreatePodClientClass(clientNamespace, typeName);
					if (String.IsNullOrEmpty(type) &&  allOfBaseTypeSchemaList.Count > 0)
					{
						var allOfRef = allOfBaseTypeSchemaList[0];
						var baseTypeName = allOfRef.Reference.Id; //pointing to parent class
						typeDeclaration.BaseTypes.Add(baseTypeName);

						var allOfProperteisSchema = allOfBaseTypeSchemaList[1];
						AddProperties(typeDeclaration, allOfProperteisSchema);
					}

					CreateTypeOrMemberDocComment(item, typeDeclaration);
					//	typeDeclarationDic.Add(typeName, typeDeclaration);

					AddProperties(typeDeclaration, schema);
				}
				else
				{
					typeDeclaration = PodGenHelper.CreatePodClientEnum(clientNamespace, typeName);
					CreateTypeOrMemberDocComment(item, typeDeclaration);
					int k = 0;
					foreach (var enumMember in enumTypeList)
					{
						var stringMember = enumMember as OpenApiString;
						if (stringMember != null)
						{
							var memberName = stringMember.Value;
							var intValue = k;
							var clientField = new CodeMemberField()
							{
								Name = memberName,
								//Type = new CodeTypeReference(fieldInfo.FieldType),
								InitExpression = new CodePrimitiveExpression(intValue),
							};

							typeDeclaration.Members.Add(clientField);
							k++;
						}



					}
				}
			}

		}

		void AddProperties(CodeTypeDeclaration typeDeclaration, OpenApiSchema schema)
		{
			foreach (var p in schema.Properties)
			{
				var propertyName = p.Key;
				var premitivePropertyType = p.Value.Type;
				var isRequired = schema.Required.Contains(propertyName);

				CodeMemberField clientProperty;
				if (String.IsNullOrEmpty(premitivePropertyType)) //point to a custom time "$ref": "#/components/schemas/PhoneType"
				{
					var refToType = p.Value.AllOf[0];
					var customPropertyType = refToType.Type;
					clientProperty = CreateProperty(propertyName, customPropertyType);
				}
				else
				{
					var simpleType = nameComposer.PremitiveSwaggerTypeToClrType(premitivePropertyType, p.Value.Format);
					clientProperty = CreateProperty(propertyName, simpleType);
				}

				if (isRequired)
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.RequiredAttribute"));
				}

				CreateTypeOrMemberDocComment(p, clientProperty);

				typeDeclaration.Members.Add(clientProperty);
			}
		}

		void CreateTypeOrMemberDocComment(KeyValuePair<string, OpenApiSchema> item, CodeTypeMember declaration)
		{
			var typeComment = item.Value.Description;
			AddDocComments(typeComment, declaration.Comments);

		}

		static void AddDocComments(string description, CodeCommentStatementCollection comments)
		{
			if (description != null && comments != null)
			{
				comments.Add(new CodeCommentStatement("<summary>", true));
				comments.Add(new CodeCommentStatement(description, true));
				comments.Add(new CodeCommentStatement("</summary>", true));
			}
		}

		CodeMemberField CreateProperty(string name, Type type)
		{
			// This is a little hack. Since you cant create auto properties in CodeDOM,
			//  we make the getter and setter part of the member name.
			// This leaves behind a trailing semicolon that we comment out.
			//  Later, we remove the commented out semicolons.
			string memberName = name + " { get; set; }//";

			CodeMemberField result = new CodeMemberField() { Type = TranslateToClientTypeReference(type), Name = memberName };
			result.Attributes = MemberAttributes.Public | MemberAttributes.Final;
			return result;
		}

		CodeMemberField CreateProperty(string name, string typeName)
		{
			string memberName = name + " { get; set; }//";

			CodeMemberField result = new CodeMemberField() { Type = TranslateToClientTypeReference(typeName), Name = memberName };
			result.Attributes = MemberAttributes.Public | MemberAttributes.Final;
			return result;
		}

		public CodeTypeReference TranslateToClientTypeReference(Type type)
		{
			if (type == null)
				return null;// new CodeTypeReference("void");
			if (type.IsArray)
			{
				Debug.Assert(type.Name.EndsWith("]"));
				var elementType = type.GetElementType();
				var arrayRank = type.GetArrayRank();
				return CreateArrayTypeReference(elementType, arrayRank);
			}

			return new CodeTypeReference(type);

		}

		public CodeTypeReference TranslateToClientTypeReference(string typeName)
		{
			if (typeName == null)
				return null;// new CodeTypeReference("void");

			return new CodeTypeReference(typeName);

		}

		///// <summary>
		///// Ref could be #/components/schemas/Address, while the key is Address.
		///// </summary>
		///// <param name="refNo"></param>
		///// <returns></returns>
		//CodeTypeDeclaration RefToTypeDeclaration(string refNo)
		//{
		//	var key = refNo.Substring(22);
		//	return typeDeclarationDic[key];
		//}

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
			return t.Namespace + settings.ClientNamespaceSuffix + "." + t.Name;
		}

		CodeTypeReference CreateArrayTypeReference(Type elementType, int arrayRank)
		{
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

	}
}
