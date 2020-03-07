using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fonlow.Web.Meta;
using Fonlow.CodeDom.Web;
using Fonlow.Poco2Client;
using Microsoft.OpenApi.Models;
using Fonlow.OpenApi.ClientTypes;

namespace Fonlow.CodeDom.Web.Ts
{
	public abstract class ClientApiTsFunctionGenBase : ClientApiTsFunctionGenAbstract
	{
		protected ClientApiTsFunctionGenBase(Settings settings, string relativePath, OperationType httpMethod, OpenApiOperation apiOperation, ComponentsToTsTypes poco2TsGen):
			base(settings, relativePath, httpMethod, apiOperation, poco2TsGen)
		{

		}

		protected override string CreateUriQueryForTs(string uriText, ParameterDescription[] parameterDescriptions)
		{
			return UriQueryHelper.CreateUriQueryForTs(uriText, parameterDescriptions);
		}
	}
}
