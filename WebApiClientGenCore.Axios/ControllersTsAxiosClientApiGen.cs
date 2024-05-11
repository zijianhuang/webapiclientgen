using System.CodeDom;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate Axios TypeScript codes of the client API of the controllers
	/// </summary>
	public class ControllersTsAxiosClientApiGen : ControllersTsClientApiGenBase
	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="jsOutput"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersTsAxiosClientApiGen(JSOutput jsOutput, bool handleHttpRequestHeaders, Fonlow.Poco2Client.IDocCommentTranslate docCommentTranslate) : base(jsOutput, new ClientApiTsAxiosFunctionGen(jsOutput, handleHttpRequestHeaders), docCommentTranslate)
		{
			CreatePoco2TsGen(jsOutput.ClientNamespaceSuffix);
		}

		protected override void CreatePoco2TsGen(string clientNamespaceSuffix)
		{
			Poco2TsGen = new Fonlow.Poco2Ts.PocoToTsResponseGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode, null);
		}

		protected override void AddBasicReferences()
		{
			TargetUnit.ReferencedAssemblies.Add("import Axios from 'axios';");
			TargetUnit.ReferencedAssemblies.Add("import { AxiosResponse } from 'axios';");
		}

		protected override void AddConstructor(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new CodeConstructor
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final
			};

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/'", "private baseUri"));
			targetClass.Members.Add(constructor);
		}
	}


}
