using System;
using System.Linq;
using System.Reflection;
using Xunit;

namespace Poco2TsTests
{
	public class Misc
	{
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
			Type[] aa = System.Reflection.Assembly.GetExecutingAssembly().GetTypes();

#pragma warning disable CA2021 // Do not call Enumerable.Cast<T> or Enumerable.OfType<T> with incompatible types. but intentional
			Assert.Empty(aa.OfType<Base>());
			Assert.Empty(aa.OfType<A>());
			Assert.Empty(aa.OfType<B>());
#pragma warning restore CA2021 // Do not call Enumerable.Cast<T> or Enumerable.OfType<T> with incompatible types
		}


		[Fact]
		public void TestNullAttributeOnNullableEnabled()
		{
			Type methodContainerType = Type.GetType("Poco2TsTests.Misc");
			Assert.NotNull(methodContainerType);
			MethodInfo methodBase = methodContainerType.GetMethod("GetNullStringOnNullableEnabled");
			Assert.NotNull(methodBase);
			CustomAttributeData[] customAttributes = methodBase.CustomAttributes.ToArray();
			Assert.Empty(customAttributes);
			//[[System.Runtime.CompilerServices.NullableContextAttribute((Byte)2)]] while return type is will nullable
			//Assert.True(Attribute.IsDefined(methodBase, typeof(System.Runtime.CompilerServices.NullableContextAttribute))); 
			//For compiler only.
			//I can see it in IDE Debugger, but not available in codes according to https://github.com/dotnet/roslyn/blob/main/docs/features/nullable-metadata.md.

			Assert.False(Attribute.IsDefined(methodBase.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute)));
		}

		[Fact]
		public void TestGetANotNullAttributeOnNullableEnabled()
		{
			Type methodContainerType = Type.GetType("Poco2TsTests.Misc");
			Assert.NotNull(methodContainerType);
			MethodInfo methodBase = methodContainerType.GetMethod("GetA");
			Assert.NotNull(methodBase);
			CustomAttributeData[] customAttributes = methodBase.CustomAttributes.ToArray();
			Assert.Empty(customAttributes); //[[System.Runtime.CompilerServices.NullableContextAttribute((Byte)2)]]
			Assert.True(Attribute.IsDefined(methodBase.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute)));
		}

		[Fact]
		public void TestNotNullAttribute()
		{
			Type methodContainerType = Type.GetType("Poco2TsTests.Misc");
			Assert.NotNull(methodContainerType);
			MethodInfo methodBase = methodContainerType.GetMethod("GetNotNullString"); // not within nullable directive
			Assert.NotNull(methodBase);
			CustomAttributeData[] customAttributes = methodBase.CustomAttributes.ToArray();
			Assert.Empty(customAttributes); //There's no System.Runtime.CompilerServices.NullableContextAttribute at all.
			Assert.True(Attribute.IsDefined(methodBase.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute)));
		}



		[return: System.Diagnostics.CodeAnalysis.NotNull]
		public static string GetNotNullString()
		{
			if (DateTime.Now > new DateTime(2008, 12, 3))
			{
				return "ABCD";
			}
			else
			{
				return null;
			}
		}

		[return: System.Diagnostics.CodeAnalysis.NotNull]
		public static string GetNotNullStringOnNullableEnabled(string sort)
		{
			return "ABCD";
		}

#pragma warning disable CA1822 // Mark members as static. Intentional
		public string GetNullStringOnNullableEnabled()
#pragma warning restore CA1822 // Mark members as static
		{
			if (DateTime.Now > new DateTime(2008, 12, 3))
			{
				return "ABCD";
			}
			else
			{
				return null;
			}
		}

		[return: System.Diagnostics.CodeAnalysis.NotNull]
		public A GetA()
		{
			if (DateTime.Now > new DateTime(2008, 12, 3))
			{
				return new A();
			}
			else if (DateTime.Now > new DateTime(2008, 11, 3))
			{
				return new B();
			}

			//return null;
			return new A();
		}

		public static string AthletheSearch(string sort, string search)
		{
			return "ABCD";
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
