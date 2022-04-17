using Fonlow.DateOnlyExtensions;
using Fonlow.Testing;
using System;

namespace IntegrationTests
{
	public class TupleFixture : DefaultHttpClient
	{
		public TupleFixture()
		{
			var jsonSerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
			{
				NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
			};

			jsonSerializerSettings.Converters.Add(new DateOnlyJsonConverter());
			jsonSerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter());

			Api = new DemoWebApi.Controllers.Client.Tuple(HttpClient, jsonSerializerSettings);
		}

		public DemoWebApi.Controllers.Client.Tuple Api { get; private set; }
	}
}
