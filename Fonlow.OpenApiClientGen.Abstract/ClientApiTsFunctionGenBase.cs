using Fonlow.Web.Meta;

namespace Fonlow.CodeDom.Web.Ts
{
	public abstract class ClientApiTsFunctionGenBase : ClientApiTsFunctionGenAbstract
	{
		protected ClientApiTsFunctionGenBase():	base()
		{

		}

		protected override string CreateUriQueryForTs(string uriText, ParameterDescription[] parameterDescriptions)
		{
			return UriQueryHelper.CreateUriQueryForTs(uriText, parameterDescriptions);
		}
	}
}
