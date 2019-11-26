using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Fonlow.Reflection;

namespace Poco2TsTests
{
	public class TypeHelperTests
	{

		[Fact]
		public void TestGuid()
		{
            var type = typeof(Guid);
            Assert.True(TypeHelper.IsValueType(type));
            Assert.False(!TypeHelper.IsValueType(type) && !TypeHelper.IsNullablePremitive(type));
		}

	}
}
