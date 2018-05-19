using System.CodeDom;

namespace Fonlow.CodeDom.Web.Ts
{
    /// <summary>
    /// Generate TypeScript codes of the client API of the controllers
    /// </summary>
    public class ControllersTsClientApiGen : ControllersTsClientApiGenBase
    {
		/// <summary>
		/// 
		/// </summary>
		/// <param name="jsOutput"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersTsClientApiGen(JSOutput jsOutput) : base(jsOutput, new ClientApiTsFunctionGen())
        {
        }

        protected override void AddBasicReferences()
        {
            TargetUnit.ReferencedAssemblies.Add("///<reference path=\"../typings/jquery/jquery.d.ts\" />");
            TargetUnit.ReferencedAssemblies.Add("///<reference path=\"HttpClient.ts\" />");
        }

        protected override void AddConstructor(CodeTypeDeclaration targetClass)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes =
                MemberAttributes.Public | MemberAttributes.Final;

            // Add parameters.
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "string = HttpClient.locationOrigin", "private baseUri"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "HttpClientBase = new HttpClient()", "private httpClient"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                "(xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any", "private error?"));
            constructor.Parameters.Add(new CodeParameterDeclarationExpression("{ [key: string]: any; }", "private statusCode?"));

            targetClass.Members.Add(constructor);
        }

    }


}
