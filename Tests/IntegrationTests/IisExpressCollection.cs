using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace IntegrationTests
{
    public class TestConstants
    {
        public const string IisExpressAndInit = "IISExpressStartup";
    }

    /// <summary>
    /// Load IIS Express and create an demo owner
    /// http://xunit.github.io/docs/shared-context.html
    /// </summary>
    [CollectionDefinition(TestConstants.IisExpressAndInit)]
    public class IisCollection : ICollectionFixture<Fonlow.Testing.IisExpressFixture>
    {
        // This class has no code, and is never created. Its purpose is simply
        // to be the place to apply [CollectionDefinition] and all the
        // ICollectionFixture<> interfaces.
    }

}
