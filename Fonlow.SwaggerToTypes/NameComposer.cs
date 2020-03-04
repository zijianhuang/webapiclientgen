using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.CodeDom;
using Fonlow.Web.Meta;

namespace Fonlow.OpenApi.ClientTypes
{
	public class NameComposer
	{
		public NameComposer(Settings settings)
		{
			this.settings = settings;
		}

		Settings settings;

		public string PathToControllerName(string path)
		{
			return "";//todo: regex stuffs.
		}

		public string GetActionName(OpenApiOperation op, string httpMethod)
		{
			switch (settings.ActionNameStrategy)
			{
				case ActionNameStrategy.Default:
					return String.IsNullOrEmpty(op.OperationId) ? ComposeActionName(op, httpMethod) : op.OperationId;
				case ActionNameStrategy.OperationId:
					return op.OperationId;
				case ActionNameStrategy.MethodQueryParameters:
					return ComposeActionName(op, httpMethod);
				default:
					throw new InvalidDataException("Impossible");
			}
		}

		public string ComposeActionName(OpenApiOperation op, string httpMethod)
		{
			var byWhat = String.Join("And", op.Parameters.Select(p => ToTitleCase(p.Name)));
			return op.Tags[0].Name + httpMethod + (String.IsNullOrEmpty(byWhat) ? String.Empty : "By" + byWhat);
		}

		public string GetControllerName(OpenApiOperation op, string path)
		{
			switch (settings.ControllerNameStrategy)
			{
				case ContainerNameStrategy.Path:
					return PathToControllerName(path);
				case ContainerNameStrategy.Tags:
					return ToTitleCase(op.Tags[0].Name);//todo: concanate multiple ones?
				default:
					return settings.ContainerClassName;
			}
		}

		static string ToTitleCase(string s)
		{
			return String.IsNullOrEmpty(s) ? s : (char.ToUpper(s[0]) + (s.Length > 1 ? s.Substring(1) : String.Empty));
		}

		public string UrlToFunctionName(string urlText)
		{
			var uri = new Uri("http://dummy.net" + urlText);
			var localPath = uri.LocalPath;
			var basketIdx = localPath.IndexOf("{");
			if (basketIdx >= 0)
			{
				localPath = localPath.Remove(basketIdx);
			}

			if (!String.IsNullOrEmpty(settings.PathPrefixToRemove))
			{
				localPath = localPath.Remove(0, settings.PathPrefixToRemove.Length);

			}

			var uriWithPaths = new Uri("http://dummy.net" + localPath);
			return String.Join(String.Empty, uriWithPaths.Segments.Select(p => ToTitleCase(p.Replace("/", String.Empty))));
		}

		public Type GetOperationReturnSimpleType(OpenApiOperation op)
		{
			var goodResponse = op.Responses["200"];
			if (goodResponse != null)
			{
				var jsonContent = goodResponse.Content["application/json"];
				var schemaType = jsonContent.Schema.Type;
				if (schemaType != null)
				{
					var schemaFormat = jsonContent.Schema.Format;
					return PrimitiveSwaggerTypeToClrType(schemaType, schemaFormat);
				}
			}

			return null;
		}

		public string GetOperationReturnComplexType(OpenApiOperation op)
		{
			var goodResponse = op.Responses["200"];
			if (goodResponse != null)
			{
				if (goodResponse.Content["application/json"].Schema != null && goodResponse.Content["application/json"].Schema.Reference != null)
				{
					return goodResponse.Content["application/json"].Schema.Reference.Id;
				}
			}

			return null;
		}

		public string GetOperationReturnComment(OpenApiOperation op)
		{
			var goodResponse = op.Responses["200"];
			return goodResponse == null ? null : goodResponse.Description;
		}

		public Tuple<Type, string> GetOperationReturnType(OpenApiOperation op)
		{
			var complexTypeName = GetOperationReturnComplexType(op);
			Type primitiveType = null;
			if (complexTypeName == null)
			{
				primitiveType = GetOperationReturnSimpleType(op);
			}

			return Tuple.Create<Type, string>(primitiveType, complexTypeName);
		}

		public CodeTypeReference GetOperationReturnTypeReference(OpenApiOperation op)
		{
			var complexTypeName = GetOperationReturnComplexType(op);
			if (complexTypeName == null)
			{
				var primitiveType = GetOperationReturnSimpleType(op);
				return new CodeTypeReference(primitiveType);
			}

			return new CodeTypeReference(settings.ClientNamespace + "." + complexTypeName);
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
					Name=p.Name,
					Documentation=p.Description,
					ParameterDescriptor= new ParameterDescriptor()
					{
						IsOptional= !p.Required,
						ParameterName=p.Name,
						ParameterType=PrimitiveSwaggerTypeToClrType(p.Schema.Type, p.Schema.Format),
						ParameterBinder= ParameterLocationToParameterBinder(p.In),
					}
				}
			).ToArray();
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
					throw new NotSupportedException($"{lo} as parameter not supported");
			}
		}

		readonly Dictionary<string, Type> basicClrTypeDic = new Dictionary<string, Type>()
		{
			{"integer_int32", typeof(int) },
			{"integer_int64", typeof(long) },
			{"number_float", typeof(float) },
			{"number_double", typeof(double) },
			{"string", typeof(string) },
			{"boolean", typeof(bool) },
			{"string_date", typeof(DateTime) },
			{"string_date-time", typeof(DateTime) },
		};

		readonly Dictionary<string, string> basicTsTypeDic = new Dictionary<string, string>()
		{
			{"integer_int32", "number" },
			{"integer_int64", "number" },
			{"number_float", "number" },
			{"number_double", "number" },
			{"string", "string" },
			{"boolean", "boolean" },
			{"string_date", "Date" },
			{"string_date-time", "Date" },
		};

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


	}
}
