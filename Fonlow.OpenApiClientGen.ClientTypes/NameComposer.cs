using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.CodeDom;
using Fonlow.Web.Meta;
using System.Text.RegularExpressions;

namespace Fonlow.OpenApiClientGen.ClientTypes
{
	/// <summary>
	/// Helper functions to compose names from Open API meta data
	/// </summary>
	public class NameComposer
	{
		public NameComposer(Settings settings)
		{
			this.settings = settings;
			if (settings.ActionNameStrategy == ActionNameStrategy.NormalizedOperationId)
			{
				if (String.IsNullOrEmpty(settings.RegexForNormalizedOperationId))
				{
					throw new ArgumentException("When having ActionNameStrategy.NormalizedOperationId you should define RegexForNormalizedOperationId", nameof(settings));
				}

				regex = new Regex(settings.RegexForNormalizedOperationId);
			}
		}

		Settings settings;

		/// <summary>
		/// Construct action name according to OpenApiOperaton, httpMethod and ActionNameStrategy.
		/// </summary>
		/// <param name="op"></param>
		/// <param name="httpMethod"></param>
		/// <returns></returns>
		public string GetActionName(OpenApiOperation op, string httpMethod, string path)
		{
			switch (settings.ActionNameStrategy)
			{
				case ActionNameStrategy.Default:
					return String.IsNullOrEmpty(op.OperationId) ? ComposeActionName(op, httpMethod) : ToTitleCase(op.OperationId);
				case ActionNameStrategy.OperationId:
					return ToTitleCase(op.OperationId);
				case ActionNameStrategy.MethodQueryParameters:
					return ComposeActionNameForPathAsContainer(op, httpMethod);
				case ActionNameStrategy.PathMethodQueryParameters:
					return ComposeActionNameWithPath(op, httpMethod, path);
				case ActionNameStrategy.NormalizedOperationId:
					return NormalizeOperationId(op.OperationId);
				default:
					throw new InvalidDataException("Impossible");
			}
		}

		public string NormalizeOperationId(string s)
		{
			var matches = regex.Matches(s);
			var r = String.Join(String.Empty, matches.Select(m => ToTitleCase(m.Value)));
			return r;
		}

		Regex regex;

		/// <summary>
		/// Compose action name according to tags, httpMethod and Parameters.
		/// </summary>
		/// <param name="op"></param>
		/// <param name="httpMethod"></param>
		/// <returns></returns>
		public string ComposeActionName(OpenApiOperation op, string httpMethod)
		{
			if (op.Tags == null || op.Tags.Count == 0)
			{
				throw new ArgumentException("OpenApiOperation does not contain tags for composing action name.");
			}

			var byWhat = String.Join("And", op.Parameters.Where(p => p.In == ParameterLocation.Path || p.In == ParameterLocation.Query).Select(p => ToTitleCase(p.Name)));
			return ToTitleCase(op.Tags[0].Name) + httpMethod + (String.IsNullOrEmpty(byWhat) ? String.Empty : "By" + byWhat);
		}

		/// <summary>
		/// Generate action name with httpMethod and parameters, for actions under a container class named after a path.
		/// </summary>
		/// <param name="op"></param>
		/// <param name="httpMethod"></param>
		/// <returns></returns>
		public string ComposeActionNameForPathAsContainer(OpenApiOperation op, string httpMethod)
		{
			var byWhat = String.Join("And", op.Parameters.Where(p => p.In == ParameterLocation.Path || p.In == ParameterLocation.Query).Select(p => ToTitleCase(p.Name)));
			return httpMethod + (String.IsNullOrEmpty(byWhat) ? String.Empty : "By" + byWhat);
		}

		/// <summary>
		/// Generate action name hopefully unique across all paths and operations, under a god container class. Consisting of path, httpMethod and parameters.
		/// </summary>
		/// <param name="op"></param>
		/// <param name="httpMethod"></param>
		/// <param name="path"></param>
		/// <returns></returns>
		public string ComposeActionNameWithPath(OpenApiOperation op, string httpMethod, string path)
		{
			var byWhat = String.Join("And", op.Parameters.Where(p => p.In == ParameterLocation.Path || p.In == ParameterLocation.Query).Select(p => ToTitleCase(p.Name)));
			return PathToActionOrContainerName(path) + httpMethod + (String.IsNullOrEmpty(byWhat) ? String.Empty : "By" + byWhat);
		}

		/// <summary>
		/// Container class name for containing client functions, according OpenApiOperation and operation path.
		/// </summary>
		/// <param name="op"></param>
		/// <param name="path"></param>
		/// <returns></returns>
		public string GetContainerName(OpenApiOperation op, string path)
		{
			switch (settings.ContainerNameStrategy)
			{
				case ContainerNameStrategy.Path:
					return PathToActionOrContainerName(path) + settings.ContainerNameSuffix;
				case ContainerNameStrategy.Tags:
					if (op.Tags != null && op.Tags.Count > 0)
					{
						return ToTitleCase(op.Tags[0].Name) + settings.ContainerNameSuffix;//todo: concanate multiple ones?
					}
					else
					{
						return settings.ContainerClassName;
					}
				default:
					return settings.ContainerClassName;
			}
		}

		static string ToTitleCase(string s)
		{
			return String.IsNullOrEmpty(s) ? s : (char.ToUpper(s[0]) + (s.Length > 1 ? s.Substring(1) : String.Empty));
		}

		/// <summary>
		/// Construct the base action name or container name
		/// </summary>
		/// <param name="path"></param>
		/// <returns></returns>
		public string PathToActionOrContainerName(string path)
		{
			var uri = new Uri("http://dummy.net" + path);
			var pathSegments = uri.Segments.Where(s => !s.Contains("%7B"));
			var localPath = String.Join(String.Empty, pathSegments);

			if (!String.IsNullOrEmpty(settings.PathPrefixToRemove))
			{
				localPath = localPath.Remove(0, settings.PathPrefixToRemove.Length);

			}

			if (!localPath.StartsWith("/"))
			{
				localPath = "/" + localPath;
			}

			var uriWithPaths = new Uri("http://dummy.net" + localPath);
			return String.Join(String.Empty, uriWithPaths.Segments.Select(p => ToTitleCase(p.Replace("/", String.Empty))));
		}

		readonly Type typeOfString = typeof(string);

		/// <summary>
		/// 
		/// </summary>
		/// <param name="op"></param>
		/// <returns>CodeTypeReference of the return type, and StringAsString generally with text/plain</returns>
		public Tuple<CodeTypeReference, bool> GetOperationReturnSimpleTypeReference(OpenApiOperation op)
		{
			OpenApiResponse goodResponse;
			if (op.Responses.TryGetValue("200", out goodResponse))
			{
				OpenApiMediaType content;
				CodeTypeReference codeTypeReference;

				if (goodResponse.Content.TryGetValue("application/json", out content)) // application/json has better to be first.
				{
					codeTypeReference = OpenApiMediaTypeToCodeTypeReference(content);
					return Tuple.Create(codeTypeReference, false);
				}

				if (goodResponse.Content.TryGetValue("text/plain", out content))
				{
					if (content.Schema != null)
					{
						var schemaType = content.Schema.Type;
						if (schemaType != null)
						{
							var schemaFormat = content.Schema.Format;
							var type = PrimitiveSwaggerTypeToClrType(schemaType, schemaFormat);
							return Tuple.Create(new CodeTypeReference(type), type == typeOfString);
						}
					}
				}

			}

			return Tuple.Create<CodeTypeReference, bool>(null, false);
		}

		public string GetOperationReturnComplexTypeReference(OpenApiOperation op)
		{
			OpenApiResponse goodResponse;
			if (op.Responses.TryGetValue("200", out goodResponse))
			{
				OpenApiMediaType content;
				if (goodResponse.Content.TryGetValue("application/json", out content) && content.Schema != null && content.Schema.Reference != null)
				{
					return content.Schema.Reference.Id;
				}
			}

			return null;
		}

		public string GetOperationReturnComment(OpenApiOperation op)
		{
			OpenApiResponse goodResponse;
			if (op.Responses.TryGetValue("200", out goodResponse))
			{
				return goodResponse.Description;
			}

			return null;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="op"></param>
		/// <returns>Item3 indicate whether to be complex type.</returns>
		public Tuple<CodeTypeReference, bool, bool> GetOperationReturnTypeReference(OpenApiOperation op)
		{
			var complexTypeName = GetOperationReturnComplexTypeReference(op);
			bool stringAsString = false;
			if (complexTypeName == null)
			{
				var r = GetOperationReturnSimpleTypeReference(op);
				var primitiveTypeReference = r.Item1;
				stringAsString = r.Item2;
				return Tuple.Create(primitiveTypeReference == null ? null : primitiveTypeReference, stringAsString, false);
			}

			string typeAlias;
			if (TypeAliasDic.Instance.TryGet(complexTypeName, out typeAlias))
			{
				return Tuple.Create(new CodeTypeReference(typeAlias), stringAsString, true);
			}

			return Tuple.Create(new CodeTypeReference(complexTypeName), stringAsString, true);
		}

		public CodeTypeReference GetParameterCodeTypeReference(OpenApiParameter p)
		{
			var type = PrimitiveSwaggerTypeToClrType(p.Schema.Type, p.Schema.Format);
			return new CodeTypeReference(type);
		}

		public ParameterDescription[] OpenApiParametersToParameterDescriptions(IList<OpenApiParameter> ps)
		{
			return ps.Select(p =>
				new ParameterDescription()
				{
					Name = p.Name,
					Documentation = p.Description,
					ParameterDescriptor = new ParameterDescriptor()
					{
						IsOptional = !p.Required,
						ParameterName = p.Name,
						ParameterType = PrimitiveSwaggerTypeToClrType(p.Schema.Type, p.Schema.Format),
						ParameterBinder = ParameterLocationToParameterBinder(p.In),
					}
				}
			).Where(k => k.ParameterDescriptor.ParameterBinder != ParameterBinder.None).ToArray();
		}

		ParameterBinder ParameterLocationToParameterBinder(ParameterLocation? lo)
		{
			if (!lo.HasValue)
			{
				throw new InvalidDataException("ParameterLocation is REQUIRED");
			}

			switch (lo)
			{
				case ParameterLocation.Query:
					return ParameterBinder.FromQuery;
				case ParameterLocation.Path:
					return ParameterBinder.FromUri;
				default:
					return ParameterBinder.None; //so to be skiped/ignored
			}
		}

		/// <summary>
		/// Get CodeTypeReference and description of requestBody of operation.
		/// </summary>
		/// <param name="op"></param>
		/// <returns>bool is whether to support generating codes for this.</returns>
		public Tuple<CodeTypeReference, string, bool> GetBodyContent(OpenApiOperation op)
		{
			if (op.RequestBody != null && op.RequestBody.Content != null)
			{
				OpenApiMediaType content;
				var description = op.RequestBody.Description;//todo: comment

				if (op.RequestBody.Reference != null)
				{
					if (op.RequestBody.Content.TryGetValue("application/json", out content) && (content.Schema.Type != null && content.Schema.Type != "object"))
					{
						return Tuple.Create(OpenApiMediaTypeToCodeTypeReference(content), description, true);
					}

					var typeName = op.RequestBody.Reference.Id;
					var codeTypeReference = new CodeTypeReference(typeName);
					return Tuple.Create(codeTypeReference, description, true);
				}
				else if (op.RequestBody.Content.TryGetValue("application/json", out content))
				{
					if (content.Schema!=null && content.Schema.Reference != null)
					{
						var typeName = content.Schema.Reference.Id;
						var codeTypeReference = new CodeTypeReference(typeName);
						return Tuple.Create(codeTypeReference, description, true);
					}

					return Tuple.Create(OpenApiMediaTypeToCodeTypeReference(content), description, true);
				}
				else if (op.RequestBody.Content.Count > 0) // with content but not supported
				{
					return Tuple.Create<CodeTypeReference, string, bool>(null, null, false);
				}
			}

			return null; //empty post
		}

		/// <summary>
		/// Translate OpenApiMediaType content to CodeTypeReference
		/// </summary>
		/// <param name="content"></param>
		/// <returns></returns>
		CodeTypeReference OpenApiMediaTypeToCodeTypeReference(OpenApiMediaType content)
		{
			var schemaType = content.Schema.Type;
			if (schemaType != null)
			{
				if (schemaType == "array") // for array
				{
					var arrayItemsSchema = content.Schema.Items;
					if (arrayItemsSchema.Reference != null) //array of custom type
					{
						var arrayTypeName = arrayItemsSchema.Reference.Id;
						var arrayCodeTypeReference = CreateArrayOfCustomTypeReference(arrayTypeName, 1);
						return arrayCodeTypeReference;
					}
					else
					{
						var arrayType = arrayItemsSchema.Type;
						var clrType = PrimitiveSwaggerTypeToClrType(arrayType, null);
						var arrayCodeTypeReference = CreateArrayTypeReference(clrType, 1);
						return arrayCodeTypeReference;
					}
				}
				else if (content.Schema.Enum.Count == 0) // for primitive type
				{
					var simpleType = PrimitiveSwaggerTypeToClrType(content.Schema.Type, content.Schema.Format);
					var codeTypeReference = new CodeTypeReference(simpleType);
					return codeTypeReference;
				}

				var schemaFormat = content.Schema.Format;
				return new CodeTypeReference(PrimitiveSwaggerTypeToClrType(schemaType, schemaFormat));
			}

			return null;
		}

		readonly Dictionary<string, Type> basicClrTypeDic = new Dictionary<string, Type>()
		{
			{"integer_int32", typeof(int) },
			{"integer_int64", typeof(long) },
			{"integer", typeof(int) },
			{"number_float", typeof(float) },
			{"number_double", typeof(double) },
			{"number", typeof(float) },
			{"string", typeof(string) },
			{"boolean", typeof(bool) },
			{"string_date", typeof(DateTimeOffset) },
			{"string_date-time", typeof(DateTimeOffset) },
		};

		readonly Dictionary<string, string> basicTsTypeDic = new Dictionary<string, string>()
		{
			{"integer_int32", "number" },
			{"integer_int64", "number" },
			{"integer", "number" },
			{"number_float", "number" },
			{"number_double", "number" },
			{"number", "number" },
			{"string", "string" },
			{"boolean", "boolean" },
			{"string_date", "Date" },
			{"string_date-time", "Date" },
		};

		readonly string[] oafTypes = new string[] { "integer", "number", "string", "boolean" };

		public bool IsPrimitiveType(string typeName)
		{
			return oafTypes.Contains(typeName);
		}

		/// <summary>
		/// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md
		/// https://swagger.io/specification/
		/// </summary>
		/// <param name="type"></param>
		/// <param name="format"></param>
		/// <returns></returns>
		public Type PrimitiveSwaggerTypeToClrType(string type, string format)
		{
			var key = type + (String.IsNullOrEmpty(format) ? String.Empty : ("_" + format));
			Type t;
			if (basicClrTypeDic.TryGetValue(key, out t))
			{
				return t;
			}
			else
			{
				return typeof(string);
			}
		}

		public string PrimitiveSwaggerTypeToTsType(string type, string format)
		{
			var key = type + (String.IsNullOrEmpty(format) ? String.Empty : ("_" + format));
			string t;
			if (basicTsTypeDic.TryGetValue(key, out t))
			{
				return t;
			}
			else
			{
				return "string";
			}
		}

		public CodeTypeReference TranslateToClientTypeReference(Type type)
		{
			if (type == null)
				return null;// new CodeTypeReference("void");
			if (type.IsArray)
			{
				var elementType = type.GetElementType();
				var arrayRank = type.GetArrayRank();
				return CreateArrayTypeReference(elementType, arrayRank);
			}

			return new CodeTypeReference(type);

		}

		CodeTypeReference TranslateToClientTypeReference(string typeName)
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
