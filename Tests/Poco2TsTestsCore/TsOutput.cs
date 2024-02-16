using Fonlow.Poco2Client;
using Fonlow.Poco2Ts;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.IO;
using Xunit;


namespace Poco2TsTests
{
	public class TsOutput
	{
		static void Verify(Type type, string expected)
		{
			var targetUnit = new CodeCompileUnit();
			var gen = new Poco2TsGen(targetUnit, ".Client", false, new CodeObjectHelper(true));
			gen.CreateCodeDom(new Type[] { type }, CherryPickingMethods.DataContract);
			using (var writer = new StringWriter())
			{
				gen.WriteCode(writer);
				var s = writer.ToString();
				Assert.Equal(expected, s);
			}
		}

		static void VerifyJson(Type type, string expected)
		{
			var targetUnit = new CodeCompileUnit();
			var gen = new Poco2TsGen(targetUnit, ".Client", false, new CodeObjectHelper(true));
			gen.CreateCodeDom(new Type[] { type }, CherryPickingMethods.NewtonsoftJson);
			using (var writer = new StringWriter())
			{
				gen.WriteCode(writer);
				var s = writer.ToString();
				Assert.Equal(expected, s);
			}
		}

		[Fact]
		public void TestPersonWithRegions()
		{
			var targetUnit = new CodeCompileUnit();
			var gen = new Poco2TsGen(targetUnit, ".Client", false, new CodeObjectHelper(true));
			gen.CreateCodeDom(new Type[] { typeof(DemoWebApi.DemoData.Person) }, CherryPickingMethods.DataContract);
			var typeDeclaration = targetUnit.Namespaces[0].Types[0];
			typeDeclaration.StartDirectives.Add(new CodeRegionDirective(CodeRegionMode.Start, "Type Block"));
			typeDeclaration.EndDirectives.Add(new CodeRegionDirective(CodeRegionMode.End, string.Empty));

			using (var writer = new StringWriter())
			{
				gen.WriteCode(writer);
				var s = writer.ToString();
				var expected = @"export namespace DemoWebApi_DemoData_Client {

// #region Type Block
	export interface Person extends DemoWebApi.DemoData.Base.Entity {
		Baptised?: Date | null;
		DOB?: Date | null;
		GivenName?: string | null;
		Surname?: string | null;
	}

// #endregion
}

";
				Assert.Equal(expected, s);
			}

		}

		[Fact]
		public void Test2TypesWithRegions()
		{
			var targetUnit = new CodeCompileUnit();
			var gen = new Poco2TsGen(targetUnit, ".Client", false, new CodeObjectHelper(true));
			gen.CreateCodeDom(new Type[] { typeof(DemoWebApi.DemoData.Person), typeof(DemoWebApi.DemoData.AddressType) }, CherryPickingMethods.DataContract);
			var typeDeclaration = targetUnit.Namespaces[0].Types[0];
			var typeDeclaration1 = targetUnit.Namespaces[0].Types[1];
			typeDeclaration.StartDirectives.Add(new CodeRegionDirective(CodeRegionMode.Start, "Type Block")); // Address
			typeDeclaration1.EndDirectives.Add(new CodeRegionDirective(CodeRegionMode.End, string.Empty)); //Person. 
			//types inside CreateCodeDom are sorted by namespace and type name.

			using (var writer = new StringWriter())
			{
				gen.WriteCode(writer);
				var s = writer.ToString();
				var expected = @"export namespace DemoWebApi_DemoData_Client {

// #region Type Block
	export enum AddressType { Postal, Residential }

	export interface Person extends DemoWebApi.DemoData.Base.Entity {
		Baptised?: Date | null;
		DOB?: Date | null;
		GivenName?: string | null;
		Surname?: string | null;
	}

// #endregion
}

";
				Assert.Equal(expected, s);
			}

		}

		[Fact]
		public void TestEnumAddressType()
		{
			Verify(typeof(DemoWebApi.DemoData.AddressType),
@"export namespace DemoWebApi_DemoData_Client {
	export enum AddressType { Postal, Residential }

}

");
		}

		[Fact]
		public void TestPerson()
		{
			Verify(typeof(DemoWebApi.DemoData.Person),
@"export namespace DemoWebApi_DemoData_Client {
	export interface Person extends DemoWebApi.DemoData.Base.Entity {
		Baptised?: Date | null;
		DOB?: Date | null;
		GivenName?: string | null;
		Surname?: string | null;
	}

}

");
		}

		[Fact]
		public void TestEnumDays()
		{
			Verify(typeof(DemoWebApi.DemoData.Days),
@"export namespace DemoWebApi_DemoData_Client {
	export enum Days { Sat = 1, Sun = 2, Mon = 3, Tue = 4, Wed = 5, Thu = 6, Fri = 7 }

}

");
		}

		[Fact]
		public void TestStrutMyPoint()
		{
			Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase = true;
			VerifyJson(typeof(DemoWebApi.DemoData.Another.MyPoint),
@"export namespace DemoWebApi_DemoData_Another_Client {
	export interface MyPoint {
		x: number;
		y: number;
	}

}

");
			Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase = false;
		}

		[Fact]
		public void TestTuple4Callback()
		{
			var callbackTypeText = "(data : [string, string, string, number]) => any";
			var parameterDeclarationExpression = new CodeParameterDeclarationExpression(callbackTypeText, "callback");
			var s = TypeMapper.MapCodeTypeReferenceToTsText(parameterDeclarationExpression.Type);
			Assert.Equal(callbackTypeText, s);
		}

		[Fact]
		public void TestTuple5CallbackAboutPossibleBugOfCodeDom()
		{
			//CodeTypeReference seems to have a bug which could not read such callbackType properly with 5 or more Tuple parameters.
			//I tried provide callbackTypeText in constructors of CodeTypeReference and CodeParrameterDeclarationExpression, as well as property assignment.
			//all end up with (string , corrupted.
			var callbackTypeText = "(data : [string, string, string, string, number]) => any";
			var codeTypeReference = new CodeTypeReference()
			{
				BaseType = callbackTypeText
			};
			var parameterDeclarationExpression = new CodeParameterDeclarationExpression(codeTypeReference, "callback");
			var s = TypeMapper.MapCodeTypeReferenceToTsText(parameterDeclarationExpression.Type);
			Assert.NotEqual(callbackTypeText, s);
		}

		[Fact]
		public void TestTupleCallbackSnipet()
		{
			var callbackTypeText = "(data : [string, string, string, string, string, number]) => any";
			var callbackTypeReference = new CodeSnipetTypeReference(callbackTypeText);
			var parameterDeclarationExpression = new CodeParameterDeclarationExpression(callbackTypeReference, "callback");
			var s = TypeMapper.MapCodeTypeReferenceToTsText(parameterDeclarationExpression.Type);
			Assert.Equal(callbackTypeText, s);
		}

		[Fact]
		public void TestResponse()
		{
			var s = TypeMapper.MapCodeTypeReferenceToTsText(new CodeTypeReference("response"));
			Assert.Equal("response", s);

		}

		[Fact]
		public void TestNullableDateTime()
		{
			var t = typeof(DateTime?);
			Assert.True(t.IsGenericType);
			Assert.False(t.IsGenericTypeDefinition);
			var nullableType = typeof(Nullable<>);
			Assert.True(t.IsGenericType);
			Assert.False(t.IsGenericTypeDefinition);
			Assert.Equal(nullableType, t.GetGenericTypeDefinition());
			Assert.Equal(typeof(DateTime), t.GetGenericArguments()[0]);
			Assert.True(IsNullablePrimitive(t));

		}

		[Fact]
		public void TestNullableDateOnly()
		{
			var t = typeof(DateOnly?);
			Assert.True(t.IsGenericType);
			Assert.False(t.IsGenericTypeDefinition);
			var nullableType = typeof(Nullable<>);
			Assert.True(t.IsGenericType);
			Assert.False(t.IsGenericTypeDefinition);
			Assert.Equal(nullableType, t.GetGenericTypeDefinition());
			Assert.Equal(typeof(DateOnly), t.GetGenericArguments()[0]);
			Assert.True(IsNullablePrimitive(t));

		}

		[Fact]
		public void TestNullableDouble()
		{
			var t = typeof(double?);
			Assert.True(t.IsGenericType);
			Assert.False(t.IsGenericTypeDefinition);
			var nullableType = typeof(Nullable<>);
			Assert.True(t.IsGenericType);
			Assert.False(t.IsGenericTypeDefinition);
			Assert.Equal(nullableType, t.GetGenericTypeDefinition());
			Assert.Equal(typeof(double), t.GetGenericArguments()[0]);
			Assert.True(IsNullablePrimitive(t));

		}

		[Fact]
		public void TestNullableDecimal()
		{
			var t = typeof(decimal?);
			Assert.True(t.IsGenericType);
			Assert.False(t.IsGenericTypeDefinition);
			var nullableType = typeof(Nullable<>);
			Assert.True(t.IsGenericType);
			Assert.False(t.IsGenericTypeDefinition);
			Assert.Equal(nullableType, t.GetGenericTypeDefinition());
			Assert.Equal(typeof(decimal), t.GetGenericArguments()[0]);
			Assert.True(IsNullablePrimitive(t));
		}

		[Fact]
		public void TestBigNumbers()
		{
			Verify(typeof(DemoWebApi.DemoData.BigNumbers),
@"export namespace DemoWebApi_DemoData_Client {
	export interface BigNumbers {
		BigInt?: BigInt | null;
		Signed128?: BigInt | null;
		Signed64?: number | null;
		Unsigned128?: BigInt | null;
		Unsigned64?: number | null;
	}

}

");
		}



		static readonly Type typeOfNullableDefinition = typeof(Nullable<>);

		/// <summary>
		/// DateTime is not primitive type. Decimal is preiitive VB.net but not in C#.NET
		/// </summary>
		/// <param name="t"></param>
		/// <returns></returns>
		static bool IsNullablePrimitive(Type t)
		{
			return (t.IsGenericType && typeOfNullableDefinition.Equals(t.GetGenericTypeDefinition()) && (t.GetGenericArguments()[0].IsPrimitive || t.GetGenericArguments()[0].IsValueType));
		}

	}

}
