using Xunit;

namespace IntegrationTests
{
	public class TestConstants
	{
		public const string LaunchWebApiAndInit = "LaunchWebApi";
	}

	[CollectionDefinition(TestConstants.LaunchWebApiAndInit)]
	public class DotNetHostCollection : ICollectionFixture<Fonlow.Testing.ServiceCommandsFixture>
	{
		// This class has no code, and is never created. Its purpose is simply
		// to be the place to apply [CollectionDefinition] and all the
		// ICollectionFixture<> interfaces.
	}
}
