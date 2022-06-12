using Fonlow.TypeScriptCodeDom;
using Fonlow.Web.Meta;
using System;
using System.CodeDom;
using System.Diagnostics;
using System.Text;
using Fonlow.Poco2Client;
using System.Linq;
using Fonlow.Reflection;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate a client function upon ApiDescription
	/// </summary>
	public abstract class ClientApiTsFunctionGenAbstract
	{
		protected WebApiDescription Description { get; private set; }
		protected string MethodName { get; private set; }
		protected Type ReturnType { get; private set; }
		protected CodeMemberMethod Method { get; private set; }
		protected IPoco2Client Poco2TsGen { get; private set; }
		protected bool StringAsString { get; private set; }
		protected string HttpMethodName { get; private set; }
		protected ClientApiTsFunctionGenAbstract()
		{

		}

		public CodeMemberMethod CreateApiFunction(WebApiDescription description, IPoco2Client poco2TsGen, bool stringAsString)
		{
			this.Description = description;
			this.Poco2TsGen = poco2TsGen;
			this.StringAsString = stringAsString;

			HttpMethodName = Description.HttpMethod.ToLower(); //Method is always uppercase. 
			MethodName = TsCodeGenerationOptions.Instance.CamelCase ? Fonlow.Text.StringExtensions.ToCamelCase(description.ActionDescriptor.ActionName) : description.ActionDescriptor.ActionName;
			if (MethodName.EndsWith("Async"))
				MethodName = MethodName.Substring(0, MethodName.Length - 5);//HTTP does not care about the server side async.

			ReturnType = description.ResponseDescription?.ResponseType ?? description.ActionDescriptor.ReturnType;

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
				methodFullName += "(" + Description.ParameterDescriptions.Select(d => d.ParameterDescriptor.ParameterType.FullName).Aggregate((c, n) => c + "," + n) + ")";
			}
			Console.WriteLine(methodFullName);
			StringBuilder builder = new StringBuilder();

			Fonlow.DocComment.docMember methodComments=null;
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
			foreach (var item in Description.ParameterDescriptions)
			{
				var tsParameterType = Poco2TsGen.TranslateToClientTypeReference(item.ParameterDescriptor.ParameterType);
				if (!String.IsNullOrEmpty(item.Documentation))
				{
					builder.AppendLine($"@param {{{TypeMapper.MapCodeTypeReferenceToTsText(tsParameterType)}}} {item.Name} {item.Documentation}");
				}
			}

			Type responseType = Description.ResponseDescription.ResponseType ?? Description.ResponseDescription.DeclaredType;
			var tsResponseType = Poco2TsGen.TranslateToClientTypeReference(responseType);
			var returnTypeOfResponse = responseType == null ? "void" : TypeMapper.MapCodeTypeReferenceToTsText(tsResponseType);

			var returnComment = Fonlow.DocComment.DocCommentHelper.GetReturnComment(methodComments);
			if (returnComment != null)
			{
				builder.AppendLine($"@return {{{returnTypeOfResponse}}} {returnComment}");
			}

			Method.Comments.Add(new CodeCommentStatement(builder.ToString(), true));
		}

		protected string RemoveTrialEmptyString(string s)
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
					 new CodeParameterDeclarationExpression(Poco2TsGen.TranslateToClientTypeReference(d.ParameterDescriptor.ParameterType), d.Name)
				).ToArray();

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
