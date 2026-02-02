using Fonlow.TypeScriptCodeDom;
using System.CodeDom;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate Angular 2 TypeScript codes of the client API of the controllers
	/// </summary>
	public class ControllersTsNG2ClientApiGen : ControllersTsClientApiGenBase
	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="jsOutput"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersTsNG2ClientApiGen(JSOutput jsOutput, bool handleHttpRequestHeaders, Fonlow.Poco2Client.IDocCommentTranslate docCommentTranslate) 
			: base(jsOutput, new ClientApiTsNG2FunctionGen(jsOutput, handleHttpRequestHeaders), docCommentTranslate)
		{
			CreatePoco2TsGen(jsOutput.ClientNamespaceSuffix);
		}

		protected override void CreatePoco2TsGen(string clientNamespaceSuffix)
		{
			Poco2TsGen = jsOutput.ApiSelections.CherryPickingMethods== Poco2Client.CherryPickingMethods.ApiOnly ? new Fonlow.Poco2Ts.PocoToTsResponseGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode, null, jsOutput.ApiSelections.AllDataModelAssemblyNames, jsOutput.ApiSelections.CherryPickingMethods) 
			: new Fonlow.Poco2Ts.PocoToTsResponseGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode, null, jsOutput.ApiSelections.AllDataModelAssemblyNames);
		}

		protected override void AddBasicReferences()
		{
			TargetUnit.ReferencedAssemblies.Add("import { Injectable, Inject } from '@angular/core';");
			TargetUnit.ReferencedAssemblies.Add("import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';");
			TargetUnit.ReferencedAssemblies.Add("import { Observable } from 'rxjs';");
		}


		protected override void AddConstructor(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new CodeConstructor
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final
			};

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"string = window.location.origin + '/'", "@Inject('baseUri') private baseUri"));
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"HttpClient", "private http"));

			targetClass.Members.Add(constructor);
		}

		/// <summary>
		/// return @Injectable()
		/// </summary>
		/// <returns></returns>
		protected override CodeAttributeDeclarationCollection CreateClassCustomAttributes()
		{
			CodeTypeReference c = new CodeTypeReference("Injectable");
			c.UserData.Add(UserDataKeys.TsTypeInfo, new TsTypeInfo { TypeOfType = TypeOfType.IsInterface });
			var atr = new CodeAttributeDeclaration(c);
			atr.Arguments.Add(new CodeAttributeArgument(new CodeSnippetExpression("{ providedIn: 'root' }")));
			return new CodeAttributeDeclarationCollection([atr]);
		}
	}


}