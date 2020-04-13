using Fonlow.TypeScriptCodeDom;
using Fonlow.Web.Meta;
using System;
using System.CodeDom;
using System.Diagnostics;
using System.Text;
using Fonlow.Poco2Client;

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

		protected ClientApiTsFunctionGenAbstract()
		{

		}

		public CodeMemberMethod CreateApiFunction(WebApiDescription description, IPoco2Client poco2TsGen, bool stringAsString)
		{
			this.Description = description;
			this.Poco2TsGen = poco2TsGen;
			this.StringAsString = stringAsString;

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
			StringBuilder builder = new StringBuilder();
			var noIndent = Fonlow.DocComment.StringFunctions.TrimIndentedMultiLineTextToArray(Description.Documentation);
			if (noIndent != null)
			{
				foreach (var item in noIndent)
				{
					builder.AppendLine(item);
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
			if (!String.IsNullOrEmpty(Description.ResponseDescription.Documentation))
			{
				builder.AppendLine($"@return {{{returnTypeOfResponse}}} {Description.ResponseDescription.Documentation}");
			}

			Method.Comments.Add(new CodeCommentStatement(builder.ToString(), true));
		}

		protected string RemoveTrialEmptyString(string s)
		{
			var p = s.IndexOf(" + ''");
			//Debug.Assert(p > -1, "Must match the end string in RemoveTrialEmptyString");
			if (p > -1)
			{
				return s.Remove(p, 5);
			}

			return s;
		}

		protected abstract CodeMemberMethod CreateMethodName();

		protected abstract void RenderImplementation();

		protected abstract string CreateUriQueryForTs(string uriText, ParameterDescription[] parameterDescriptions);
	}

}
