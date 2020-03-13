using Fonlow.Poco2Client;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

namespace Fonlow.OpenApiClientGen.ClientTypes
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

		void WriteCode(TextWriter writer)
		{
			//if (writer == null)
			//	throw new ArgumentNullException(nameof(writer), "No TextWriter instance is defined.");

			using (CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp"))
			{
				CodeGeneratorOptions options = new CodeGeneratorOptions() { BracingStyle = "C", IndentString = "\t" };
				provider.GenerateCodeFromCompileUnit(codeCompileUnit, writer, options);
			}
		}

		public string WriteToText()
		{
			using (var writer = new StringWriter())
			{
				WriteCode(writer);
				return writer.ToString();
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
				currentTypeName = ToTitleCase(item.Key);
				Debug.WriteLine("clientClass: " + currentTypeName);
				var schema = item.Value;
				var type = schema.Type;
				var allOfBaseTypeSchemaList = schema.AllOf; //maybe empty
				var enumTypeList = schema.Enum; //maybe empty
				bool isForClass = enumTypeList.Count == 0;
				var schemaProperties = schema.Properties;
				CodeTypeDeclaration typeDeclaration;
				if (isForClass)
				{
					if (schema.Properties.Count > 0 || (schema.Properties.Count == 0 && allOfBaseTypeSchemaList.Count > 1))
					{
						typeDeclaration = PodGenHelper.CreatePodClientClass(ClientNamespace, currentTypeName);
						if (String.IsNullOrEmpty(type) && allOfBaseTypeSchemaList.Count > 0)
						{
							var allOfRef = allOfBaseTypeSchemaList[0];
							var baseTypeName = allOfRef.Reference.Id; //pointing to parent class
							typeDeclaration.BaseTypes.Add(baseTypeName);

							var allOfProperteisSchema = allOfBaseTypeSchemaList[1]; //the 2nd one points to properties of the derived type, while the 1st one points to the base type.
							AddProperties(typeDeclaration, allOfProperteisSchema);
						}

						CreateTypeOrMemberDocComment(item, typeDeclaration);

						AddProperties(typeDeclaration, schema);

						if (settings.DecorateDataModelWithDataContract)
						{
							typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataContractAttribute", new CodeAttributeArgument("Name", new CodeSnippetExpression($"\"{settings.DataContractNamespace}\""))));
						}

						if (settings.DecorateDataModelWithSerializable)
						{
							typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.SerializableAttribute"));
						}
					}
					else if (type == "array") // wrapper of array. Microsoft OpenApi library could not intepret this as type alias, so I have to register the alias myself.
					{
						var itemsRef = schema.Items.Reference;
						TypeAliasDic.Instance.Add(currentTypeName, $"{itemsRef.Id}[]");
					}
					else
					{
						Trace.TraceInformation($"Type Alias {currentTypeName} is skipped:.");
					}
				}
				else
				{
					typeDeclaration = PodGenHelper.CreatePodClientEnum(ClientNamespace, currentTypeName);
					CreateTypeOrMemberDocComment(item, typeDeclaration);
					AddEnumMembers(typeDeclaration, enumTypeList);

					if (settings.DecorateDataModelWithDataContract)
					{
						typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataContractAttribute", new CodeAttributeArgument("Name", new CodeSnippetExpression($"\"{settings.DataContractNamespace}\""))));
					}

					if (settings.DecorateDataModelWithSerializable)
					{
						typeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.SerializableAttribute"));
					}
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

					if (settings.DecorateDataModelWithDataContract)
					{
						clientField.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.EnumMemberAttribute"));
					}

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

		string currentTypeName;

		void AddProperties(CodeTypeDeclaration typeDeclaration, OpenApiSchema schema)
		{
			foreach (var p in schema.Properties)
			{
				var propertyName = ToTitleCase(p.Key);
				if (propertyName == currentTypeName)
				{
					propertyName += "1";
				}

				var propertySchema = p.Value;
				var primitivePropertyType = propertySchema.Type;
				var isPrimitiveType = nameComposer.IsPrimitiveType(primitivePropertyType);
				var isRequired = schema.Required.Contains(p.Key); //compare with the original key

				//Debug.Assert(propertyName != "HuntingSkill");
				CodeMemberField clientProperty;
				if (String.IsNullOrEmpty(primitivePropertyType)) // for custom type, pointing to a custom time "$ref": "#/components/schemas/PhoneType"
				{
					OpenApiSchema refToType = null;
					if (propertySchema.Reference != null)
					{
						var typeId = propertySchema.Reference.Id;
						clientProperty = CreateProperty(propertyName, typeId);
					}
					else
					{
						if (propertySchema.AllOf.Count > 0)
						{
							refToType = propertySchema.AllOf[0];
						}
						else if (propertySchema.OneOf.Count > 0)
						{
							refToType = propertySchema.OneOf[0];
						}
						else if (propertySchema.AnyOf.Count > 0)
						{
							refToType = propertySchema.AnyOf[0];
						}

						var customPropertyType = refToType.Type;
						var customPropertyFormat = refToType.Format;
						var customType = nameComposer.PrimitiveSwaggerTypeToClrType(customPropertyType, customPropertyFormat);
						clientProperty = CreateProperty(propertyName, customType);
					}
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
							if (arrayItemsSchema.Properties != null && arrayItemsSchema.Properties.Count > 0) // for casual type
							{
								var casualTypeName = typeDeclaration.Name + ToTitleCase(propertyName);
								var casualTypeDeclaration = PodGenHelper.CreatePodClientClass(ClientNamespace, casualTypeName);
								AddProperties(casualTypeDeclaration, arrayItemsSchema);
								var arrayCodeTypeReference = CreateArrayOfCustomTypeReference(casualTypeName, 1);
								clientProperty = CreateProperty(arrayCodeTypeReference, casualTypeName);
							}
							else
							{
								var clrType = nameComposer.PrimitiveSwaggerTypeToClrType(arrayType, null);
								var arrayCodeTypeReference = CreateArrayTypeReference(clrType, 1);
								clientProperty = CreateProperty(arrayCodeTypeReference, propertyName);
							}
						}
					}
					else if (propertySchema.Enum.Count == 0 && propertySchema.Reference != null && !isPrimitiveType) // for complex type
					{
						var complexType = propertySchema.Reference.Id;
						clientProperty = CreateProperty(propertyName, complexType);
					}
					else if (propertySchema.Enum.Count == 0) // for primitive type
					{
						var simpleType = nameComposer.PrimitiveSwaggerTypeToClrType(primitivePropertyType, propertySchema.Format);
						clientProperty = CreateProperty(propertyName, simpleType);
					}
					else // for casual enum
					{
						var casualEnumName = typeDeclaration.Name + ToTitleCase(propertyName);
						var casualEnumTypeDeclaration = PodGenHelper.CreatePodClientEnum(ClientNamespace, casualEnumName);
						AddEnumMembers(casualEnumTypeDeclaration, propertySchema.Enum);
						clientProperty = CreateProperty(propertyName, casualEnumName);

						if (isRequired)
						{
							clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.RequiredAttribute"));
						}

						if (settings.DecorateDataModelWithDataContract)
						{
							casualEnumTypeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataContractAttribute", new CodeAttributeArgument("Name", new CodeSnippetExpression($"\"{settings.DataContractNamespace}\""))));
							clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataMemberAttribute"));
						}

						if (settings.DecorateDataModelWithSerializable)
						{
							casualEnumTypeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration("System.SerializableAttribute"));
						}

						CreateTypeOrMemberDocComment(p, clientProperty);
						typeDeclaration.Members.Add(clientProperty);
						continue;
					}
				}

				if (isRequired)
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.ComponentModel.DataAnnotations.RequiredAttribute"));
				}

				if (settings.DecorateDataModelWithDataContract)
				{
					clientProperty.CustomAttributes.Add(new CodeAttributeDeclaration("System.Runtime.Serialization.DataMemberAttribute"));
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
