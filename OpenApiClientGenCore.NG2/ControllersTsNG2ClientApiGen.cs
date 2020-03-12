using System.CodeDom;
using Fonlow.OpenApiClientGen.ClientTypes;

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
		public ControllersTsNG2ClientApiGen(Settings settings, JSOutput jsOutput) : base(settings, jsOutput, ()=> new ClientApiTsNG2FunctionGen(jsOutput.ContentType))
		{
		}

		protected override void AddBasicReferences()
		{
			CodeCompileUnit.ReferencedAssemblies.Add("import { Injectable, Inject } from '@angular/core';");
			CodeCompileUnit.ReferencedAssemblies.Add("import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';");

			CodeCompileUnit.ReferencedAssemblies.Add("import { Observable } from 'rxjs';");
		}


		protected override void AddConstructor(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new CodeConstructor();
			constructor.Attributes =
				MemberAttributes.Public | MemberAttributes.Final;

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'", "@Inject('baseUri') private baseUri"));
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"HttpClient", "private http"));

			targetClass.Members.Add(constructor);
		}

		protected override CodeAttributeDeclarationCollection CreateClassCustomAttributes()
		{
			return new CodeAttributeDeclarationCollection(new CodeAttributeDeclaration[] { new CodeAttributeDeclaration("Injectable") });
		}
	}


}