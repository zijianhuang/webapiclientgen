using Fonlow.Poco2Client;
using Fonlow.Reflection;
using Fonlow.TypeScriptCodeDom;
using Fonlow.Web.Meta;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Reflection;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate a TS client function upon ApiDescription
	/// </summary>
	public abstract class ClientApiTsFunctionGenAbstract
	{
		protected WebApiDescription Description { get; private set; }
		protected string MethodName { get; private set; }
		protected Type ReturnType { get; private set; }
		protected CodeMemberMethod Method { get; private set; }
		protected IPoco2Client Poco2TsGen { get; private set; }
		protected bool StringAsString { get; private set; }
		protected bool StrictMode { get; private set; }
		protected string HttpMethodName { get; private set; }
		protected bool ReturnTypeIsNullable { get; private set; }

		IDocCommentTranslate poco2CsGen;

		readonly IDictionary<Type, string> dotNetTypeCommentDic;
		readonly IDictionary<Type, Func<object, string>> attribueCommentDic;

		System.Reflection.ParameterInfo[] parameterInfoArray;

		JSOutput jsOutput;

		protected ClientApiTsFunctionGenAbstract()
		{
			dotNetTypeCommentDic = DotNetTypeCommentGenerator.Get();
			AnnotationCommentGenerator annotationCommentGenerator = new AnnotationCommentGenerator();
			attribueCommentDic = annotationCommentGenerator.Get();
		}

		public CodeMemberMethod CreateApiFunction(WebApiDescription description, IPoco2Client poco2TsGen, IDocCommentTranslate poco2CsGen, JSOutput jsOutput)
		{
			this.Description = description;
			this.Poco2TsGen = poco2TsGen;
			this.poco2CsGen = poco2CsGen;
			this.jsOutput = jsOutput;
			this.StringAsString = jsOutput.StringAsString;
			this.StrictMode = jsOutput.HelpStrictMode;

			HttpMethodName = Description.HttpMethod.ToLower(); //Method is always uppercase. 
			MethodName = TsCodeGenerationOptions.Instance.CamelCase ? Fonlow.Text.StringExtensions.ToCamelCase(description.ActionDescriptor.ActionName) : description.ActionDescriptor.ActionName;
			if (MethodName.EndsWith("Async"))
				MethodName = MethodName.Substring(0, MethodName.Length - 5);//HTTP does not care about the server side async.

			ReturnType = description.ResponseDescription?.ResponseType ?? description.ActionDescriptor.ReturnType;

			if (jsOutput.HelpStrictMode)
			{
				var methodInfo = description.ActionDescriptor.ControllerDescriptor.ControllerType.GetMethod(description.ActionDescriptor.MethodName, description.ActionDescriptor.MethodTypes);
				if (methodInfo != null)
				{
					parameterInfoArray = methodInfo.GetParameters();
					if (jsOutput.MaybeNullAttributeOnMethod)
					{
						ReturnTypeIsNullable = ReturnType != null && Attribute.IsDefined(methodInfo.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.MaybeNullAttribute));
					}
					else if (jsOutput.NotNullAttributeOnMethod)
					{
						ReturnTypeIsNullable = ReturnType != null && !Attribute.IsDefined(methodInfo.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute));
					}
				}
				else
				{
					throw new ArgumentException("Is this possible, without methodInfo?");
				}
			}

			//create method
			Method = CreateMethodName();

			CreateDocComments();

			switch (description.HttpMethod)
			{
				case "GET":
				case "DELETE":
				case "POST":
				case "PUT":
				case "PATCH":
					RenderImplementation();
					break;
				default:
					Trace.TraceWarning("This HTTP method {0} is not yet supported", description.HttpMethod);
					break;
			}

			return Method;
		}

		void CreateDocComments()
		{
			var methodFullName = Description.ActionDescriptor.MethodFullName;
			if (Description.ParameterDescriptions.Length > 0)
			{
				methodFullName += "(" + Description.ParameterDescriptions.Select(d =>
				{
					string typeText;
					if (TypeHelper.IsDotNetSimpleType(d.ParameterDescriptor.ParameterType))
					{
						typeText = d.ParameterDescriptor.ParameterType.FullName;
					}
					else if (d.ParameterDescriptor.ParameterType.IsGenericType)
					{
						typeText = poco2CsGen.TranslateToClientTypeReferenceTextForDocComment(d.ParameterDescriptor.ParameterType);
					}
					else if (d.ParameterDescriptor.ParameterType.IsArray)
					{
						typeText = poco2CsGen.TranslateToClientTypeReferenceTextForDocComment(d.ParameterDescriptor.ParameterType);
					}
					else
					{
						typeText = d.ParameterDescriptor.ParameterType.FullName;
					};

					return typeText;
				}).Aggregate((c, n) => c + "," + n) + ")";
			}

			StringBuilder builder = new();

			Fonlow.DocComment.docMember methodComments = null;
			if (WebApiDocSingleton.Instance.Lookup != null)
			{
				methodComments = WebApiDocSingleton.Instance.Lookup.GetMember("M:" + methodFullName);
				var noIndent = Fonlow.DocComment.StringFunctions.TrimIndentedMultiLineTextToArray(Fonlow.DocComment.DocCommentHelper.GetSummary(methodComments));
				if (noIndent != null)
				{
					foreach (var item in noIndent)
					{
						builder.AppendLine(item);
					}
				}
			}

			builder.AppendLine(Description.HttpMethod + " " + Description.RelativePath);
			foreach (var paramDesc in Description.ParameterDescriptions)
			{
				var tsParameterType = Poco2TsGen.TranslateToClientTypeReference(paramDesc.ParameterDescriptor.ParameterType);
				var parameterComment = Fonlow.DocComment.DocCommentHelper.GetParameterComment(methodComments, paramDesc.Name);
				if (String.IsNullOrEmpty(parameterComment))
				{
					bool paramTypeCommentExists = dotNetTypeCommentDic.TryGetValue(paramDesc.ParameterDescriptor.ParameterType, out string paramTypeComment);
					if (paramTypeCommentExists)
					{
						builder.AppendLine($"@param {{{TypeMapper.MapCodeTypeReferenceToTsText(tsParameterType)}}} {paramDesc.Name} {paramTypeComment}");
					}
				}
				else
				{
					builder.AppendLine($"@param {{{TypeMapper.MapCodeTypeReferenceToTsText(tsParameterType)}}} {paramDesc.Name} {parameterComment}");
				}
			}

			Type responseType = Description.ResponseDescription.ResponseType ?? Description.ResponseDescription.DeclaredType;
			var tsResponseType = Poco2TsGen.TranslateToClientTypeReference(responseType);
			var returnTypeOfResponse = responseType == null ? "void" : TypeMapper.MapCodeTypeReferenceToTsText(tsResponseType);

			var returnComment = Fonlow.DocComment.DocCommentHelper.GetReturnComment(methodComments);
			if (returnComment == null)
			{
				if (responseType != null)
				{
					bool returnTypeCommentExists = dotNetTypeCommentDic.TryGetValue(responseType, out string returnTypeComment);
					if (returnTypeCommentExists)
					{
						builder.AppendLine($"@return {{{returnTypeOfResponse}}} {returnTypeComment}");
					}
				}
			}
			else
			{
				builder.AppendLine($"@return {{{returnTypeOfResponse}}} {returnComment}");
			}

			Method.Comments.Add(new CodeCommentStatement(builder.ToString(), true));
		}

		/// <summary>
		/// Create doc comment for parameter. If doc comment does not exist, then generate from parameter type and validation attribute.
		/// If RangeAttribute exists, not to generate from parameter type.
		/// </summary>
		/// <param name="builder"></param>
		/// <param name="paramDesc"></param>
		/// <param name="parameterComment"></param>
		void CreateParamDocComment(StringBuilder builder, ParameterDescription paramDesc, string parameterComment)
		{
			var tsParameterType = Poco2TsGen.TranslateToClientTypeReference(paramDesc.ParameterDescriptor.ParameterType);
			if (!String.IsNullOrWhiteSpace(parameterComment))
			{
				builder.AppendLine($"@param {{{TypeMapper.MapCodeTypeReferenceToTsText(tsParameterType)}}} {paramDesc.Name} {parameterComment}");
				return; // if backend programmers provide doc comment, the comment should include data constraints.
			}

			List<string> lines = new();
			if (jsOutput.DataAnnotationsToComments)
			{
				var parameterInfo = parameterInfoArray.Single(p => p.Name == paramDesc.Name);
				var customAttributes = parameterInfo.GetCustomAttributes();
				//var commentsFromAttributes = GenerateCommentsFromAttributes(propertyInfo);
				bool rangeAttributeExists = customAttributes.Any(d => d.GetType() == typeof(RangeAttribute));
				bool paramTypeCommentExists = dotNetTypeCommentDic.TryGetValue(paramDesc.ParameterDescriptor.ParameterType, out string paramTypeComment);
				if (paramTypeCommentExists)
				{
					if (rangeAttributeExists)
					{
						var splited = paramTypeComment.Split(",");
						lines.Add(splited[0]);
					}
					else
					{
						lines.Add(paramTypeComment);
					}
				}

				foreach (Attribute a in customAttributes)
				{
					if (attribueCommentDic.TryGetValue(a.GetType(), out Func<object, string> textGenerator))
					{
						lines.Add(textGenerator(a));
					}
				}
			}

			if (lines.Count > 0)
			{
				var linesOfParamComment = LinesToIndentedLines(lines);
				builder.AppendLine($"@param {{{TypeMapper.MapCodeTypeReferenceToTsText(tsParameterType)}}} {paramDesc.Name} {linesOfParamComment}");
			}
		}

		/// <summary>
		/// Wraping according to https://google.github.io/styleguide/jsguide.html#jsdoc-line-wrapping. 
		/// </summary>
		/// <param name="lines"></param>
		/// <returns></returns>
		static string LinesToIndentedLines(IList<string> lines)
		{
			if (lines == null || lines.Count == 0)
			{
				return null;
			}

			if (lines.Count == 1)
			{
				return lines[0];
			}

			StringBuilder builder = new();
			builder.AppendLine(lines[0]);
			for (int i = 1; i < lines.Count; i++)
			{
				builder.Append("    ");
				builder.Append(lines[i]);
			}

			return builder.ToString();
		}

		protected static string RemoveTrialEmptyString(string s)
		{
			var p = s.IndexOf(" + ''");
			if (p > -1)
			{
				return s.Remove(p, 5);
			}

			return s;
		}

		protected string GetDataToPost()
		{
			var fromBodyParameterDescriptions = Description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
				|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
				|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
			if (fromBodyParameterDescriptions.Length > 1)
			{
				throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", Description.ActionDescriptor.ActionName));
			}
			var singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

			return singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;
		}

		protected void RenderMethodPrototype()
		{
			var parameters = Description.ParameterDescriptions.Where(p => p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri
				|| p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromQuery || p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
				|| p.ParameterDescriptor.ParameterBinder == ParameterBinder.None).Select(d =>
				{
					var originalType = d.ParameterDescriptor.ParameterType;
					var originalCodeTypeReference = Poco2TsGen.TranslateToClientTypeReference(originalType);
					originalCodeTypeReference.UserData.Add(UserDataKeys.IsMethodParameter, true); // so I can add optional null later
					var exp = new CodeParameterDeclarationExpression(originalCodeTypeReference, d.Name + (StrictMode ? "?" : String.Empty));
					exp.UserData.Add(UserDataKeys.ParameterDescriptor, d.ParameterDescriptor);
					return exp;
				}).ToArray();

			Method.Parameters.AddRange(parameters);
		}

		/// <summary>
		/// If the caller expect full uri path rather than relative path.
		/// </summary>
		/// <returns></returns>
		protected string GetFullUriText()
		{
			var jsUriQuery = UriQueryHelper.CreateUriQueryForTs(Description.RelativePath, Description.ParameterDescriptions);
			var hasArrayJoin = jsUriQuery != null && jsUriQuery.Contains(".join(");
			return jsUriQuery == null ? $"this.baseUri + '{Description.RelativePath}'" :
				RemoveTrialEmptyString(hasArrayJoin ? $"this.baseUri + '{jsUriQuery}" : $"this.baseUri + '{jsUriQuery}'");
		}

		protected abstract CodeMemberMethod CreateMethodName();

		protected abstract void RenderImplementation();

		protected abstract string CreateUriQueryForTs(string uriText, ParameterDescription[] parameterDescriptions);
	}

}
