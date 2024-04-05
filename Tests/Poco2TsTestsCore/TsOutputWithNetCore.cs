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
	/// For CherryPickingMethods.NetCore
	/// </summary>
	[Collection("TsOutput")] // ensure not multiple threading against Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase
	public class TsOutputNetCore
	{
		static void VerifyWithNetCore(Type type, string expected)
		{
			var targetUnit = new CodeCompileUnit();
			var gen = new Poco2TsGen(targetUnit, ".Client", false, new CodeObjectHelper(true));
			gen.CreateCodeDom(new Type[] { type }, CherryPickingMethods.NetCore);
			Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase = false;
			using (var writer = new StringWriter())
			{
				gen.WriteCode(writer);
				var s = writer.ToString();
				Assert.Equal(expected, s);
			}
		}

		/// <summary>
		/// OldPassword becomes oldPwd
		/// </summary>
		[Fact]
		public void TestChangePasswordBindingModel()
		{
			VerifyWithNetCore(typeof(DemoWebApi.Models.ChangePasswordBindingModel),
@"export namespace DemoWebApi_Models_Client {
	export interface ChangePasswordBindingModel {
		ConfirmPassword?: string | null;
		NewPassword?: string | null;
		oldPwd: string;
	}

}

");
		}

		[Fact]
		public void TestEnumAddressType()
		{
			VerifyWithNetCore(typeof(DemoWebApi.DemoData.AddressType),
@"export namespace DemoWebApi_DemoData_Client {
	export enum AddressType { Postal, Residential }

}

");
		}

		[Fact]
		public void TestPerson()
		{
			VerifyWithNetCore(typeof(DemoWebApi.DemoData.Person),
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
			VerifyWithNetCore(typeof(DemoWebApi.DemoData.Days),
@"export namespace DemoWebApi_DemoData_Client {
	export enum Days { Sat = 1, Sun = 2, Mon = 3, Tue = 4, Wed = 5, Thu = 6, Fri = 7 }

}

");
		}

		[Fact]
		public void TestStrutMyPoint()
		{
			Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase = true;
			VerifyWithNetCore(typeof(DemoWebApi.DemoData.Another.MyPoint),
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
		public void TestBigNumbers()
		{
			VerifyWithNetCore(typeof(DemoWebApi.DemoData.BigNumbers),
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
