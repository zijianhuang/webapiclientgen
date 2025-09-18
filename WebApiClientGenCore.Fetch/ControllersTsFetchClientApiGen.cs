using System.CodeDom;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate Axios TypeScript codes of the client API of the controllers
	/// </summary>
	public class ControllersTsFetchClientApiGen : ControllersTsClientApiGenBase
	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="jsOutput"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersTsFetchClientApiGen(JSOutput jsOutput, bool handleHttpRequestHeaders, Fonlow.Poco2Client.IDocCommentTranslate docCommentTranslate) : base(jsOutput, new ClientApiTsFetchFunctionGen(jsOutput, handleHttpRequestHeaders), docCommentTranslate)
		{
			CreatePoco2TsGen(jsOutput.ClientNamespaceSuffix);
		}

		protected override void CreatePoco2TsGen(string clientNamespaceSuffix)
		{
			Poco2TsGen = jsOutput.ApiSelections.CherryPickingMethods == Poco2Client.CherryPickingMethods.ApiOnly ? new Fonlow.Poco2Ts.PocoToTsResponseGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode, null, jsOutput.ApiSelections.DataModelAssemblyNames, jsOutput.ApiSelections.CherryPickingMethods)
				: new Fonlow.Poco2Ts.PocoToTsResponseGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode, null);
		}

		protected override void AddBasicReferences()
		{
			//do nothing
		}

		protected override void AddConstructor(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new()
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final
			};

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"string = window.location.origin + '/'", "private baseUri"));
			targetClass.Members.Add(constructor);
		}
	}


}
