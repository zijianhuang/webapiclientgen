using Fonlow.Poco2Client;
using Fonlow.Poco2Ts;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.IO;
using Xunit;

namespace Poco2TsTests
{
	/// <summary>
	/// For CherryPickingMethods.AspNet
	/// </summary>
	[Collection("TsOutput")] // ensure not multiple threading against Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase
	public class TsOutputAspNet
	{
		static void Verify(Type type, string expected)
		{
			CodeCompileUnit targetUnit = new CodeCompileUnit();
			Poco2TsGen gen = new Poco2TsGen(targetUnit, ".Client", false, new CodeObjectHelper(true), CherryPickingMethods.All, []);
			gen.CreateCodeDom(new Type[] { type }, CherryPickingMethods.AspNet);
			Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase = false;
			using (StringWriter writer = new StringWriter())
			{
				gen.WriteCode(writer);
				string s = writer.ToString();
				Assert.Equal(expected, s, ignoreLineEndingDifferences: true);
			}
		}

		[Fact]
		public void TestChangePasswordBindingModel()
		{
			Verify(typeof(DemoWebApi.Models.ChangePasswordBindingModel),
@"export namespace DemoWebApi_Models_Client {
	export interface ChangePasswordBindingModel {
		ConfirmPassword?: string | null;
		NewPassword: string;
		OldPassword: string | null;
	}

}

");
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
			Verify(typeof(DemoWebApi.DemoData.Another.MyPoint),
@"export namespace DemoWebApi_DemoData_Another_Client {
	export interface MyPoint {
		x?: number | null;
		y?: number | null;
	}

}

");
			Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase = false;
		}

		[Fact]
		public void TestBigNumbers()
		{
			Verify(typeof(DemoWebApi.DemoData.BigNumbers),
@"export namespace DemoWebApi_DemoData_Client {
	export interface BigNumbers {
		BigInt?: string | null;
		Signed128?: string | null;
		Signed64?: string | null;
		Unsigned128?: string | null;
		Unsigned64?: string | null;
	}

}

");
		}

	}

}
