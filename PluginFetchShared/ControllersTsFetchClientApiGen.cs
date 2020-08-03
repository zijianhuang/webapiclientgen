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
		public ControllersTsFetchClientApiGen(JSOutput jsOutput, bool handleHttpRequestHeaders) : base(jsOutput, new ClientApiTsFetchFunctionGen(jsOutput.ContentType, handleHttpRequestHeaders))
		{
		}

		protected override Fonlow.Poco2Client.IPoco2Client CreatePoco2TsGen()
		{
			return new Fonlow.Poco2Ts.PocoToTsNgGen(TargetUnit);
		}

		protected override void AddBasicReferences()
		{
			//do nothing
		}

		protected override void AddConstructor(CodeTypeDeclaration targetClass)
		{
			CodeConstructor constructor = new CodeConstructor
			{
				Attributes = MemberAttributes.Public | MemberAttributes.Final
			};

			// Add parameters.
			constructor.Parameters.Add(new CodeParameterDeclarationExpression(
				"string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'", "private baseUri"));
			targetClass.Members.Add(constructor);
		}
	}


}
