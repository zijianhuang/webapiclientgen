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
		//[Fact]
		//public void TestUriTemplate()
		//{
		//	UriTemplate template = new UriTemplate("weather/{state}/{city}?forecast={day}");
		//	Uri prefix = new Uri("http://localhost");

		//	foreach (string name in template.PathSegmentVariableNames)
		//	{
		//		Console.WriteLine("     {0}", name);
		//	}


		//	Console.WriteLine("QueryValueVariableNames:");
		//	foreach (string name in template.QueryValueVariableNames)
		//	{
		//		System.Diagnostics.Trace.WriteLine("{0}", name);
		//	}

		//}

		[Fact]
		public void TestGuid()
		{
            var type = typeof(Guid);
            Assert.True(TypeHelper.IsValueType(type));
            Assert.False(!TypeHelper.IsValueType(type) && !TypeHelper.IsNullablePremitive(type));
		}

	}
}
