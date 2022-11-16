using Fonlow.Testing;
using Fonlow.DateOnlyExtensions;

namespace IntegrationTests
{
	public class TupleFixture : DefaultHttpClient
	{
		public TupleFixture()
		{
			var jsonSerializerSettings = new System.Text.Json.JsonSerializerOptions()
			{
				DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
			};

			//jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter()); //not needed in ASP.NET 7
			//jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());
			Api = new DemoWebApi.Controllers.Client.Tuple(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.Tuple Api { get; private set; }
	}
}
