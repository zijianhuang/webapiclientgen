using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Poco2TsTests
{
	public class Misc
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
		public void TestOfType()
		{
			Base[] aa = new Base[] { new Base(), new A(), new B() };

			Assert.Equal(3, aa.OfType<Base>().Count());
			Assert.Equal(2, aa.OfType<A>().Count());
			Assert.Single(aa.OfType<B>());
		}

		[Fact]
		public void TestOfTypeWithAssembly()
		{
			var aa = System.Reflection.Assembly.GetExecutingAssembly().GetTypes();

			Assert.Empty(aa.OfType<Base>());
			Assert.Empty(aa.OfType<A>());
			Assert.Empty(aa.OfType<B>());
		}

		public class Base
		{
			public string P1 { get; set; }
		}

		public class A : Base
		{
			public string P2 { get; set; }
		}

		public class B : A
		{
			public string P3 { get; set; }
		}
	}
}
