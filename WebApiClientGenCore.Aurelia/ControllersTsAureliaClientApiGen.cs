using System.CodeDom;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate Axios TypeScript codes of the client API of the controllers
	/// </summary>
	public class ControllersTsAureliaClientApiGen : ControllersTsClientApiGenBase
	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="jsOutput"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersTsAureliaClientApiGen(JSOutput jsOutput, bool handleHttpRequestHeaders) : base(jsOutput, new ClientApiTsAureliaFunctionGen(jsOutput, handleHttpRequestHeaders))
		{
		}

		protected override Fonlow.Poco2Client.IPoco2Client CreatePoco2TsGen(string clientNamespaceSuffix)
		{
			return new Fonlow.Poco2Ts.PocoToTsNgGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode);
		}

		protected override void AddBasicReferences()
		{
			TargetUnit.ReferencedAssemblies.Add("import {HttpClient} from 'aurelia-fetch-client';");
			TargetUnit.ReferencedAssemblies.Add("import {autoinject} from 'aurelia-framework';");
		}

		protected override void AddConstructor(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final
			};

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"HttpClient", "private http"));
			targetClass.Members.Add(constructor);
		}

		protected override CodeAttributeDeclarationCollection CreateClassCustomAttributes()
		{
			return new CodeAttributeDeclarationCollection(new CodeAttributeDeclaration[] { new CodeAttributeDeclaration("autoinject") });
		}
	}


}
