using Fonlow.Poco2Client;
using Fonlow.Reflection;
using Fonlow.TypeScriptCodeDom;
using Fonlow.Web.Meta;
using Newtonsoft.Json.Serialization;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;

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

		protected ObsoleteAttribute obsoleteAttribute;

		System.Reflection.ParameterInfo[] parameterInfoArray;

		JSOutput jsOutput;

		protected ClientApiTsFunctionGenAbstract()
		{
			dotNetTypeCommentDic = DotNetTypeCommentGenerator.Get();
			AnnotationCommentGenerator annotationCommentGenerator = new AnnotationCommentGenerator(true);
			attribueCommentDic = annotationCommentGenerator.Get();
		}

		/// <summary>
		/// Generates a CodeMemberMethod representing a client API function based on the specified Web API description and
		/// code generation options.
		/// </summary>
		/// <remarks>The generated CodeMemberMethod reflects the HTTP method, action name, and return type as
		/// described by the WebApiDescription. If the API action is marked as obsolete with IsError set to true, no method is
		/// generated and null is returned.</remarks>
		/// <param name="description">The WebApiDescription that provides metadata about the API action to generate the client function for.</param>
		/// <param name="poco2TsGen">The IPoco2Client instance used to generate TypeScript representations of POCO types referenced by the API.</param>
		/// <param name="poco2CsGen">The IDocCommentTranslate instance used to translate or generate documentation comments for the generated code.</param>
		/// <param name="jsOutput">The JSOutput options that control code generation settings such as string handling and strict mode.</param>
		/// <returns>A CodeMemberMethod representing the generated client API function, or null if the API action is marked as obsolete
		/// with IsError set to true.</returns>
		/// <exception cref="ArgumentException">Thrown if the method information for the specified API action cannot be found in the controller type.</exception>
		public CodeMemberMethod CreateApiFunction(WebApiDescription description, IPoco2Client poco2TsGen, IDocCommentTranslate poco2CsGen, JSOutput jsOutput)
		{
			this.Description = description;
			this.Poco2TsGen = poco2TsGen;
			this.poco2CsGen = poco2CsGen;
			this.jsOutput = jsOutput;
			this.StringAsString = jsOutput.StringAsString;
			this.StrictMode = jsOutput.HelpStrictMode;

			HttpMethodName = Description.HttpMethod.ToLower(CultureInfo.CurrentCulture); //Method is always uppercase. 
			MethodName = TsCodeGenerationOptions.Instance.CamelCase ? Fonlow.Text.StringExtensions.ToCamelCase(description.ActionDescriptor.ActionName) : description.ActionDescriptor.ActionName;
			if (MethodName.EndsWith("Async", StringComparison.Ordinal))
				MethodName = MethodName.Substring(0, MethodName.Length - 5);//HTTP does not care about the server side async.

			ReturnType = description.ResponseDescription?.ResponseType ?? description.ActionDescriptor.ReturnType;

			MethodInfo methodInfo = description.ActionDescriptor.ControllerDescriptor.ControllerType.GetMethod(description.ActionDescriptor.MethodName, description.ActionDescriptor.MethodParameterTypes);
			if (methodInfo != null)
			{
				parameterInfoArray = methodInfo.GetParameters();
				if (parameterInfoArray == null)
				{
					parameterInfoArray = Array.Empty<ParameterInfo>();
				}

				if (jsOutput.MaybeNullAttributeOnMethod)
				{
					ReturnTypeIsNullable = ReturnType != null && Attribute.IsDefined(methodInfo.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.MaybeNullAttribute));
				}
				else if (jsOutput.NotNullAttributeOnMethod)
				{
					ReturnTypeIsNullable = ReturnType != null && !Attribute.IsDefined(methodInfo.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute));
				}

				obsoleteAttribute = methodInfo.GetCustomAttribute<ObsoleteAttribute>();
				if (obsoleteAttribute!= null && obsoleteAttribute.IsError)
				{
					return null;
				}
			}
			else
			{
				throw new ArgumentException("Is this possible, without methodInfo?");
			}

			AddCustomPocoTypeForTs(ReturnType, description);

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
					Console.Error.WriteLine("This HTTP method {0} is not yet supported", description.HttpMethod);
					break;
			}

			return Method;
		}

		/// <summary>
		/// Candidate could be custom POCO, or custom POCO wrapped in IActionResult, ActionResult etc.
		/// </summary>
		/// <param name="candidateType"></param>
		void AddCustomPocoTypeForTs(Type candidateType, WebApiDescription description)
		{
			if (candidateType == null)
			{
				return;
			}

			var assemblyFilename = candidateType.Assembly.GetName().Name;
			string controllerAssemblyName = description.ActionDescriptor.ControllerDescriptor.ControllerType.Assembly.GetName().Name;
			Poco2TsGen.CheckOrAdd(candidateType, controllerAssemblyName != assemblyFilename);
		}

		void CreateDocComments()
		{
			string methodFullName = Description.ActionDescriptor.MethodFullName;
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
				string[] noIndent = Fonlow.DocComment.StringFunctions.TrimIndentedMultiLineTextToArray(Fonlow.DocComment.DocCommentHelper.GetSummary(methodComments));
				if (noIndent != null)
				{
					foreach (string item in noIndent)
					{
						builder.AppendLine(item);
					}
				}
			}

			builder.AppendLine(Description.HttpMethod + " " + Description.RelativePath);

			string[] methodAttributesAsComments = WebApiClientGenCore.Abstract.AspNetAttributesHelper.CreateDocCommentBasedOnAttributes(Description.ActionDescriptor.CustomAttributes);
			if (methodAttributesAsComments.Length>0){
				foreach (string item in methodAttributesAsComments)
				{
					builder.AppendLine(item);
				}
			}

			foreach (ParameterDescription paramDesc in Description.ParameterDescriptions)
			{
				string parameterComment = Fonlow.DocComment.DocCommentHelper.GetParameterComment(methodComments, paramDesc.Name);
				CreateParamDocComment(builder, paramDesc, parameterComment);
			}

			Type responseType = Description.ResponseDescription.ResponseType ?? Description.ResponseDescription.DeclaredType;
			CodeTypeReference tsResponseType = Poco2TsGen.TranslateToClientTypeReference(responseType);
			string returnTypeOfResponse = responseType == null ? "void" : TypeMapper.MapCodeTypeReferenceToTsText(tsResponseType);

			string returnComment = Fonlow.DocComment.DocCommentHelper.GetReturnComment(methodComments);
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

			if (obsoleteAttribute != null)
			{
				builder.AppendLine(AnnotationCommentGenerator.GenerateObsoleteAttributeComments(obsoleteAttribute));
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
			CodeTypeReference tsParameterType = Poco2TsGen.TranslateToClientTypeReference(paramDesc.ParameterDescriptor.ParameterType);
			if (!String.IsNullOrWhiteSpace(parameterComment))
			{
				builder.AppendLine($"@param {{{TypeMapper.MapCodeTypeReferenceToTsText(tsParameterType)}}} {paramDesc.Name} {parameterComment}");
				return; // if backend programmers provide doc comment, the comment should include data constraints.
			}

			List<string> lines = new();
			if (jsOutput.DataAnnotationsToComments)
			{
				try
				{
					ParameterInfo parameterInfo = parameterInfoArray.Single(p => p.Name == paramDesc.Name);
					List<Attribute> customAttributes = parameterInfo.GetCustomAttributes().ToList();
					bool rangeAttributeExists = customAttributes.Any(d => d.GetType() == typeof(RangeAttribute));
					bool paramTypeCommentExists = dotNetTypeCommentDic.TryGetValue(paramDesc.ParameterDescriptor.ParameterType, out string paramTypeComment);
					if (paramTypeCommentExists)
					{
						if (rangeAttributeExists)
						{
							string[] splited = paramTypeComment.Split(",");
							lines.Add(splited[0]);
						}
						else
						{
							lines.Add(paramTypeComment);
						}
					}

					string[] commentsFromAttributes = CommentsHelper.GenerateCommentsFromAttributes(customAttributes, attribueCommentDic);
					if (commentsFromAttributes.Length > 0)
					{
						lines.AddRange(commentsFromAttributes);
					}
				}
				catch (ArgumentNullException ex)
				{
					Console.Error.WriteLine(ex.ToString());
					throw;
				}
			}

			if (lines.Count > 0)
			{
				string linesOfParamComment = LinesToIndentedLines(lines);
				builder.AppendLine($"@param {{{TypeMapper.MapCodeTypeReferenceToTsText(tsParameterType)}}} {paramDesc.Name} {linesOfParamComment}");
			}
		}

		/// <summary>
		/// Wraping according to https://google.github.io/styleguide/jsguide.html#jsdoc-line-wrapping. 
		/// </summary>
		/// <param name="lines"></param>
		/// <returns></returns>
		static string LinesToIndentedLines(List<string> lines)
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
			int p = s.IndexOf(" + ''", StringComparison.Ordinal);
			if (p > -1)
			{
				return s.Remove(p, 5);
			}

			return s;
		}

		protected string GetDataToPost()
		{
			ParameterDescription[] fromBodyParameterDescriptions = Description.ParameterDescriptions.Where(d => d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
				|| (TypeHelper.IsComplexType(d.ParameterDescriptor.ParameterType) && (!(d.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri)
				|| (d.ParameterDescriptor.ParameterBinder == ParameterBinder.None)))).ToArray();
			if (fromBodyParameterDescriptions.Length > 1)
			{
				throw new InvalidOperationException(String.Format("This API function {0} has more than 1 FromBody bindings in parameters", Description.ActionDescriptor.ActionName));
			}
			ParameterDescription singleFromBodyParameterDescription = fromBodyParameterDescriptions.FirstOrDefault();

			return singleFromBodyParameterDescription == null ? "null" : singleFromBodyParameterDescription.ParameterDescriptor.ParameterName;
		}

		protected void RenderMethodPrototype()
		{
			CodeParameterDeclarationExpression[] parameters = Description.ParameterDescriptions.Where(p => p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromUri
				|| p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromQuery || p.ParameterDescriptor.ParameterBinder == ParameterBinder.FromBody
				|| p.ParameterDescriptor.ParameterBinder == ParameterBinder.None).Select(d =>
				{
					Type originalType = d.ParameterDescriptor.ParameterType;
					AddCustomPocoTypeForTs(originalType, Description); // for god assembly
					CodeTypeReference originalCodeTypeReference = Poco2TsGen.TranslateToClientTypeReference(originalType);
					originalCodeTypeReference.UserData.Add(UserDataKeys.IsMethodParameter, true); // so I can add optional null later
					CodeParameterDeclarationExpression exp = new CodeParameterDeclarationExpression(originalCodeTypeReference, d.Name + (StrictMode ? "?" : String.Empty));
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
			string jsUriQuery = UriQueryHelper.CreateUriQueryForTs(Description.RelativePath, Description.ParameterDescriptions);
			bool hasArrayJoin = jsUriQuery != null && jsUriQuery.Contains(".join(");
			return jsUriQuery == null ? $"this.baseUri + '{Description.RelativePath}'" :
				RemoveTrialEmptyString(hasArrayJoin ? $"this.baseUri + '{jsUriQuery}" : $"this.baseUri + '{jsUriQuery}'");
		}

		protected abstract CodeMemberMethod CreateMethodName();

		protected abstract void RenderImplementation();

		protected abstract string CreateUriQueryForTs(string uriText, ParameterDescription[] parameterDescriptions);
	}

}
