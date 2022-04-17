using Fonlow.Testing;
using System;

namespace IntegrationTests
{
	public class TextDataFixture : DefaultHttpClient
	{
		public TextDataFixture()
		{
			Api = new DemoWebApi.Controllers.Client.TextData(HttpClient);
		}

		public DemoWebApi.Controllers.Client.TextData Api { get; private set; }
	}
}
