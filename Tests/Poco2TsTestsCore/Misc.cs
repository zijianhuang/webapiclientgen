﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using System.Reflection;

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

		[Fact]
		public void TestNotNullAttributeOnNullableEnabled()
		{
			Type methodContainerType = Type.GetType("Poco2TsTests.Misc");
			Assert.NotNull(methodContainerType);
			var methodBase = methodContainerType.GetMethod("GetNotNullStringOnNullableEnabled");
			Assert.NotNull(methodBase);
			var customAttributes = methodBase.CustomAttributes.ToArray();
			Assert.NotEmpty(customAttributes); //[[System.Runtime.CompilerServices.NullableContextAttribute((Byte)1)]]
			Assert.True(Attribute.IsDefined(methodBase.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute)));
		}

		[Fact]
		public void TestNullAttributeOnNullableEnabled()
		{
			Type methodContainerType = Type.GetType("Poco2TsTests.Misc");
			Assert.NotNull(methodContainerType);
			MethodInfo methodBase = methodContainerType.GetMethod("GetNullStringOnNullableEnabled");
			Assert.NotNull(methodBase);
			var customAttributes = methodBase.CustomAttributes.ToArray();
			Assert.NotEmpty(customAttributes);
			//[[System.Runtime.CompilerServices.NullableContextAttribute((Byte)2)]] while return type is will nullable
			//Assert.True(Attribute.IsDefined(methodBase, typeof(System.Runtime.CompilerServices.NullableContextAttribute))); 
			//For compiler only.
			//I can see it in IDE Debugger, but not available in codes according to https://github.com/dotnet/roslyn/blob/main/docs/features/nullable-metadata.md.
			Assert.Equal((byte)2, customAttributes[0].ConstructorArguments[0].Value);
			Assert.Equal("System.Runtime.CompilerServices.NullableContextAttribute", customAttributes[0].AttributeType.FullName);


			Assert.False(Attribute.IsDefined(methodBase.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute)));
		}

		[Fact]
		public void TestGetANotNullAttributeOnNullableEnabled()
		{
			Type methodContainerType = Type.GetType("Poco2TsTests.Misc");
			Assert.NotNull(methodContainerType);
			var methodBase = methodContainerType.GetMethod("GetA");
			Assert.NotNull(methodBase);
			var customAttributes = methodBase.CustomAttributes.ToArray();
			Assert.NotEmpty(customAttributes); //[[System.Runtime.CompilerServices.NullableContextAttribute((Byte)2)]]
			Assert.True(Attribute.IsDefined(methodBase.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute)));
		}

		[Fact]
		public void TestNotNullAttribute()
		{
			Type methodContainerType = Type.GetType("Poco2TsTests.Misc");
			Assert.NotNull(methodContainerType);
			var methodBase = methodContainerType.GetMethod("GetNotNullString");
			Assert.NotNull(methodBase);
			var customAttributes = methodBase.CustomAttributes.ToArray();
			Assert.Empty(customAttributes);
			Assert.True(Attribute.IsDefined(methodBase.ReturnParameter, typeof(System.Diagnostics.CodeAnalysis.NotNullAttribute)));
		}

		[return: System.Diagnostics.CodeAnalysis.NotNull]
		public string GetNotNullString()
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

#nullable enable
		[return: System.Diagnostics.CodeAnalysis.NotNull]
		public string GetNotNullStringOnNullableEnabled()
		{
			return "ABCD";
		}

		public string? GetNullStringOnNullableEnabled()
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
		public A? GetA()
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

#nullable disable
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
