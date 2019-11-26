using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.CodeDom;
using Xunit;
using Fonlow.Poco2Ts;
using Fonlow.Poco2Client;
using Fonlow.TypeScriptCodeDom;
using System.CodeDom.Compiler;
using System.IO;


namespace Poco2TsTests
{
    public class TsOutput
    {
        static void Verify(Type type, string expected)
        {
            var gen = new Poco2TsGen();
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
            var gen = new Poco2TsGen();
            gen.CreateCodeDom(new Type[] { type }, CherryPickingMethods.NewtonsoftJson);
            using (var writer = new StringWriter())
            {
                gen.WriteCode(writer);
                var s = writer.ToString();
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
			Assert.True(IsNullablePremitive(t));

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
			Assert.True(IsNullablePremitive(t));

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
		 	Assert.True(IsNullablePremitive(t));
		}


		static readonly Type typeOfNullableDefinition = typeof(Nullable<>);

		/// <summary>
		/// DateTime is not premitive type. Decimal is premitive VB.net but not in C#.NET
		/// </summary>
		/// <param name="t"></param>
		/// <returns></returns>
		static bool IsNullablePremitive(Type t)
		{
			return (t.IsGenericType && typeOfNullableDefinition.Equals(t.GetGenericTypeDefinition()) && (t.GetGenericArguments()[0].IsPrimitive || t.GetGenericArguments()[0].IsValueType));
		}

	}

}
