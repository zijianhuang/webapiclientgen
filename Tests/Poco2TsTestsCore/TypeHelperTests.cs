using System.Collections.Generic;
using Xunit;

namespace Poco2TsTests
{
	public partial class TypeHelperTests
	{

		[Fact]
		public void TestIAsyncEnumerable()
		{
			Assert.Equal("System.Collections.Generic.IAsyncEnumerable`1", typeof(IAsyncEnumerable<>).FullName);
		}

		[Fact]
		public void TestTitleCase()
		{
			System.Globalization.TextInfo textInfo = new System.Globalization.CultureInfo("en-US", false).TextInfo;
			Assert.Equal("Get", textInfo.ToTitleCase("GET".ToLower()));
		}

	}
}
