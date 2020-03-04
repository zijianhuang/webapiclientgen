using Fonlow.Poco2Client;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

namespace Fonlow.OpenApi.ClientTypes
{
	/// <summary>
	/// Create CS Types CodeDOM from OpenApiComponents
	/// </summary>
	public class ComponentsToCsTypes
	{
		public ComponentsToCsTypes(Settings settings, CodeCompileUnit codeCompileUnit, CodeNamespace clientNamespace)
		{
			this.codeCompileUnit = codeCompileUnit;
			this.settings = settings;
			this.nameComposer = new NameComposer(settings);
			this.ClientNamespace = clientNamespace;
		}

		readonly CodeCompileUnit codeCompileUnit;

		readonly Settings settings;

		readonly NameComposer nameComposer;

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

			using (CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp"))
			{
				CodeGeneratorOptions options = new CodeGeneratorOptions();

				provider.GenerateCodeFromCompileUnit(codeCompileUnit, writer, options);
			}
		}

		public CodeNamespace ClientNamespace { get; private set; }

		public void CreateCodeDom(OpenApiComponents components)
		{
			if (components == null)
			{
				return;
			}

			foreach (var item in components.Schemas)
			{
				var typeName = ToTitleCase(item.Key);
				Debug.WriteLine("clientClass: " + typeName);
				var schema = item.Value;
				var type = schema.Type;
				var allOfBaseTypeSchemaList = schema.AllOf; //maybe empty
				var enumTypeList = schema.Enum; //maybe empty
				bool isForClass = enumTypeList.Count == 0;
				var schemaProperties = schema.Properties;
				CodeTypeDeclaration typeDeclaration;
				if (isForClass)
				{
					if (schema.Properties.Count > 0 || (schema.Properties.Count==0 && allOfBaseTypeSchemaList.Count>1))
					{
						typeDeclaration = PodGenHelper.CreatePodClientClass(ClientNamespace, typeName);
						if (String.IsNullOrEmpty(type) && allOfBaseTypeSchemaList.Count > 0)
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
					else // type alias
					{
						//var typeFormat = schema.Format; No need to do C# Type Alias, since OpenApi.NET will translate the alias to the real type.
						//var realTypeName = nameComposer.PremitiveSwaggerTypeToClrType(type, typeFormat);
						//CodeNamespaceImport cd = new CodeNamespaceImport($"{typeName} = {realTypeName}");
						//clientNamespace.Imports.Add(cd);
					}
				}
				else
				{
					typeDeclaration = PodGenHelper.CreatePodClientEnum(ClientNamespace, typeName);
					CreateTypeOrMemberDocComment(item, typeDeclaration);
					AddEnumMembers(typeDeclaration, enumTypeList);
				}
			}

		}

		void AddEnumMembers(CodeTypeDeclaration typeDeclaration, IList<IOpenApiAny> enumTypeList)
		{
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
						InitExpression = new CodePrimitiveExpression(intValue),
					};

					typeDeclaration.Members.Add(clientField);
					k++;
				}
				else
				{
					var intMember = enumMember as OpenApiInteger;
					var memberName = "_" + intMember.Value.ToString();
					var intValue = k;
					var clientField = new CodeMemberField()
					{
						Name = memberName,
						InitExpression = new CodePrimitiveExpression(intValue),
					};

					typeDeclaration.Members.Add(clientField);
					k++;
				}
			}
		}

		void AddProperties(CodeTypeDeclaration typeDeclaration, OpenApiSchema schema)
		{
			foreach (var p in schema.Properties)
			{
				var propertyName = ToTitleCase(p.Key);
				var propertySchema = p.Value;
				var premitivePropertyType = propertySchema.Type;
				var isRequired = schema.Required.Contains(p.Key); //compare with the original key
				

				CodeMemberField clientProperty;
				if (String.IsNullOrEmpty(premitivePropertyType)) // for custom type, pointing to a custom time "$ref": "#/components/schemas/PhoneType"
				{
					var refToType = propertySchema.AllOf[0];
					var customPropertyType = refToType.Type;
					var customPropertyFormat = refToType.Format;
					var customType = nameComposer.PrimitiveSwaggerTypeToClrType(customPropertyType, customPropertyFormat);
					//clientProperty = CreateProperty(propertyName, customPropertyType);
					clientProperty = CreateProperty(propertyName, customType);
				}
				else
				{
					if (propertySchema.Type == "array") // for array
					{
						var arrayItemsSchema = propertySchema.Items;
						if (arrayItemsSchema.Reference != null) //array of custom type
						{
							var arrayTypeName = arrayItemsSchema.Reference.Id;
							var arrayCodeTypeReference = CreateArrayOfCustomTypeReference(arrayTypeName, 1);
							clientProperty = CreateProperty(arrayCodeTypeReference, propertyName);
						}
						else
						{
							var arrayType = arrayItemsSchema.Type;
							var clrType = nameComposer.PrimitiveSwaggerTypeToClrType(arrayType, null);
							var arrayCodeTypeReference = CreateArrayTypeReference(clrType, 1);
							clientProperty = CreateProperty(arrayCodeTypeReference, propertyName);
						}
					}
					else if (propertySchema.Enum.Count == 0) // for premitive type
					{
						var simpleType = nameComposer.PrimitiveSwaggerTypeToClrType(premitivePropertyType, propertySchema.Format);
						clientProperty = CreateProperty(propertyName, simpleType);
					}
					else // for casual enum
					{
						var casualEnumName = typeDeclaration.Name + ToTitleCase(propertyName);
						var casualEnumTypeDeclaration = PodGenHelper.CreatePodClientEnum(ClientNamespace, casualEnumName);
						AddEnumMembers(casualEnumTypeDeclaration, propertySchema.Enum);
						clientProperty = CreateProperty(propertyName, casualEnumName);
					}
				}

				if (isRequired)
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.RequiredAttribute"));
				}

				CreateTypeOrMemberDocComment(p, clientProperty);

				typeDeclaration.Members.Add(clientProperty);
			}
		}

		static string ToTitleCase(string s)
		{
			return String.IsNullOrEmpty(s) ? s : (char.ToUpper(s[0]) + (s.Length > 1 ? s.Substring(1) : String.Empty));
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

		CodeMemberField CreateProperty(string propertyName, Type type)
		{
			// This is a little hack. Since you cant create auto properties in CodeDOM,
			//  we make the getter and setter part of the member name.
			// This leaves behind a trailing semicolon that we comment out.
			//  Later, we remove the commented out semicolons.
			string memberName = propertyName + " { get; set; }//";

			CodeMemberField result = new CodeMemberField() { Type = TranslateToClientTypeReference(type), Name = memberName };
			result.Attributes = MemberAttributes.Public | MemberAttributes.Final;
			return result;
		}

		CodeMemberField CreateProperty(string propertyName, string typeName)
		{
			string memberName = propertyName + " { get; set; }//";

			CodeMemberField result = new CodeMemberField() { Type = TranslateToClientTypeReference(typeName), Name = memberName };
			result.Attributes = MemberAttributes.Public | MemberAttributes.Final;
			return result;
		}

		CodeMemberField CreateProperty(CodeTypeReference codeTypeReference, string propertyName)
		{
			string memberName = propertyName + " { get; set; }//";

			CodeMemberField result = new CodeMemberField(codeTypeReference, memberName);
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

		CodeTypeReference CreateArrayTypeReference(Type elementType, int arrayRank)
		{
			var otherArrayType = new CodeTypeReference(new CodeTypeReference(), arrayRank)//CodeDom does not care. The baseType is always overwritten by ArrayElementType.
			{
				ArrayElementType = TranslateToClientTypeReference(elementType),
			};
			return otherArrayType;
		}

		CodeTypeReference CreateArrayOfCustomTypeReference(string typeName, int arrayRank)
		{
			var elementTypeReference = new CodeTypeReference(typeName);
			var typeReference = new CodeTypeReference(new CodeTypeReference(), arrayRank)
			{
				ArrayElementType = elementTypeReference,
			};
			return typeReference;
		}

	}
}
