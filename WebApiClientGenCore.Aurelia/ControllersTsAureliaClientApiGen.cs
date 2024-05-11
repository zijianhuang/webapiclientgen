using Fonlow.Poco2Ts;
using Fonlow.TypeScriptCodeDom;
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
		public ControllersTsAureliaClientApiGen(JSOutput jsOutput, bool handleHttpRequestHeaders, Fonlow.Poco2Client.IDocCommentTranslate docCommentTranslate) : base(jsOutput, new ClientApiTsAureliaFunctionGen(jsOutput, handleHttpRequestHeaders), docCommentTranslate)
		{
			CreatePoco2TsGen(jsOutput.ClientNamespaceSuffix);
		}

		protected override void CreatePoco2TsGen(string clientNamespaceSuffix)
		{
			Poco2TsGen = new Fonlow.Poco2Ts.PocoToTsResponseGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode, null);
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
			CodeTypeReference c = new CodeTypeReference("autoinject");
			c.UserData.Add(UserDataKeys.TsTypeInfo, new TsTypeInfo { TypeOfType = TypeOfType.IsInterface });
			return new CodeAttributeDeclarationCollection(new CodeAttributeDeclaration[] { new CodeAttributeDeclaration(c) });
		}
	}


}
