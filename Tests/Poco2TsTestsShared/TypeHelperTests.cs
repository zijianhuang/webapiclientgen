using Fonlow.Reflection;
using System;
using Xunit;

namespace Poco2TsTests
{
	public partial class TypeHelperTests
	{

		[Fact]
		public void TestGuid()
		{
            var type = typeof(Guid);
            Assert.True(TypeHelper.IsValueType(type));
            Assert.False(!TypeHelper.IsValueType(type) && !TypeHelper.IsNullablePrimitive(type));
		}

	}
}
