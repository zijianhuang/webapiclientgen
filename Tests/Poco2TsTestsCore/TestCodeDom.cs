using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using Xunit;

namespace Poco2TsTests
{
	/// <summary>
	/// Test outputs with CherryPickingMethods.DataContract, as well as other 
	/// </summary>
	public class TestCodeDom
	{
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
