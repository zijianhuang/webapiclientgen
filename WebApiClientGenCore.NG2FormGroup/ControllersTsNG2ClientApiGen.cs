using Fonlow.TypeScriptCodeDom;
using System.CodeDom;
using System.IO;

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
		public ControllersTsNG2ClientApiGen(JSOutput jsOutput, bool handleHttpRequestHeaders, Fonlow.Poco2Client.IDocCommentTranslate docCommentTranslate) : base(jsOutput, new ClientApiTsNG2FunctionGen(jsOutput, handleHttpRequestHeaders), docCommentTranslate)
		{
		}

		protected override Fonlow.Poco2Client.IPoco2Client CreatePoco2TsGen(string clientNamespaceSuffix)
		{
			return new Fonlow.Poco2Ts.PocoToTsResponseGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode, new Fonlow.TypeScriptCodeDom.CodeObjectHelperForNg());
		}

		public override void Save()
		{
			var provider = new TypeScriptCodeProvider(new Fonlow.TypeScriptCodeDom.TsCodeGenerator(new Fonlow.TypeScriptCodeDom.CodeObjectHelperForNg()));
			using StreamWriter writer = new(jsOutput.JSPath);
			provider.GenerateCodeFromCompileUnit(TargetUnit, writer, TsCodeGenerationOptions.Instance);
		}

		protected override void AddBasicReferences()
		{
			TargetUnit.ReferencedAssemblies.Add("import { Injectable, Inject } from '@angular/core';");
			TargetUnit.ReferencedAssemblies.Add("import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';");
			TargetUnit.ReferencedAssemblies.Add("import { Observable } from 'rxjs';");
			TargetUnit.ReferencedAssemblies.Add("import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';");
		}


		protected override void AddConstructor(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new CodeConstructor
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final
			};

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/'", "@Inject('baseUri') private baseUri"));
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
			return new CodeAttributeDeclarationCollection(new CodeAttributeDeclaration[] { new CodeAttributeDeclaration("Injectable") });
		}
	}


}