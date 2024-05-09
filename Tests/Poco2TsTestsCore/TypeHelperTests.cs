using System.Collections.Generic;
using Xunit;
using Fonlow.Reflection;
using System;
using Fonlow.Poco2Client;

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

		[Fact]
		public void TestGuid()
		{
			Type type = typeof(Guid);
			Assert.True(TypeHelper.IsValueType(type));
			Assert.False(!TypeHelper.IsValueType(type) && !TypeHelper.IsNullablePrimitive(type));
		}

		[Fact]
		public void TestFindGeneric(){
			Type t = PodGenHelper.FindGenericTypeDef(this.GetType().Assembly, "Poco2TsTests.MyGeneric`2");
			Assert.NotNull(t);
		}

	}

	public class MyGeneric<T, Y>
	{
		public string MyName { get; set; }
		public T MyT { get; set; }
		public Y MyY { get; set; }
	}
}
