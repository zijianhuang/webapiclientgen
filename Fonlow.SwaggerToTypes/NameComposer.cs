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
			var byWhat = String.Join("And", op.Parameters.Where(p => p.In == ParameterLocation.Path || p.In == ParameterLocation.Query).Select(p => ToTitleCase(p.Name)));
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

		readonly Type typeOfString = typeof(string);

		public Tuple<Type, bool> GetOperationReturnSimpleType(OpenApiOperation op)
		{
			OpenApiResponse goodResponse;
			if (op.Responses.TryGetValue("200", out goodResponse))
			{
				OpenApiMediaType content;
				if (goodResponse.Content.TryGetValue("text/plain", out content))
				{
					if (content.Schema != null)
					{
						var schemaType = content.Schema.Type;
						if (schemaType != null)
						{
							var schemaFormat = content.Schema.Format;
							var type = PrimitiveSwaggerTypeToClrType(schemaType, schemaFormat);
							return Tuple.Create(type, type == typeOfString);
						}
					}
				}

				if (goodResponse.Content.TryGetValue("application/json", out content))
				{
					var schemaType = content.Schema.Type;
					if (schemaType != null)
					{
						var schemaFormat = content.Schema.Format;
						return Tuple.Create(PrimitiveSwaggerTypeToClrType(schemaType, schemaFormat), false);
					}
				}
			}

			return Tuple.Create<Type, bool>(null, false);
		}

		public string GetOperationReturnComplexType(OpenApiOperation op)
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
		/// Get either Type of simple Type, or type name of complex type
		/// </summary>
		/// <param name="op"></param>
		/// <returns></returns>
		public Tuple<Type, string, bool> GetOperationReturnType(OpenApiOperation op)
		{
			var complexTypeName = GetOperationReturnComplexType(op);
			Type primitiveType = null;
			bool stringAsString = false;
			if (complexTypeName == null)
			{
				var r = GetOperationReturnSimpleType(op);
				primitiveType = r.Item1;
				stringAsString = r.Item2;
			}

			return Tuple.Create(primitiveType, complexTypeName, stringAsString);
		}

		public Tuple<CodeTypeReference, bool> GetOperationReturnTypeReference(OpenApiOperation op)
		{
			var complexTypeName = GetOperationReturnComplexType(op);
			bool stringAsString = false;
			if (complexTypeName == null)
			{
				var r = GetOperationReturnSimpleType(op);
				var primitiveType = r.Item1;
				stringAsString = r.Item2;
				return Tuple.Create(primitiveType == null ? null : new CodeTypeReference(primitiveType), stringAsString);
			}

			return Tuple.Create(new CodeTypeReference(settings.ClientNamespace + "." + complexTypeName), stringAsString);
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
