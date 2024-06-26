﻿using Fonlow.Poco2Client;
using Fonlow.Poco2Ts;
using Fonlow.TypeScriptCodeDom;
using System;
using System.CodeDom;
using System.IO;
using Xunit;


namespace Poco2TsTests
{
	/// <summary>
	/// Test outputs with CherryPickingMethods.DataContract, as well as other 
	/// </summary>
	[Collection("TsOutput")] // ensure not multiple threading against Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase
	public class TsOutputDataContract
	{
		static void Verify(Type type, string expected)
		{
			CodeCompileUnit targetUnit = new CodeCompileUnit();
			Poco2TsGen gen = new Poco2TsGen(targetUnit, ".Client", false, new CodeObjectHelper(true));
			gen.CreateCodeDom(new Type[] { type }, CherryPickingMethods.DataContract);
			Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase = false;
			using (StringWriter writer = new StringWriter())
			{
				gen.WriteCode(writer);
				string s = writer.ToString();
				Assert.Equal(expected, s, ignoreLineEndingDifferences: true);
			}
		}

		[Fact]
		public void TestPersonWithRegions()
		{
			CodeCompileUnit targetUnit = new CodeCompileUnit();
			Poco2TsGen gen = new Poco2TsGen(targetUnit, ".Client", false, new CodeObjectHelper(true));
			gen.CreateCodeDom(new Type[] { typeof(DemoWebApi.DemoData.Person) }, CherryPickingMethods.DataContract);
			CodeTypeDeclaration typeDeclaration = targetUnit.Namespaces[0].Types[0];
			typeDeclaration.StartDirectives.Add(new CodeRegionDirective(CodeRegionMode.Start, "Type Block"));
			typeDeclaration.EndDirectives.Add(new CodeRegionDirective(CodeRegionMode.End, string.Empty));

			using (StringWriter writer = new StringWriter())
			{
				gen.WriteCode(writer);
				string s = writer.ToString();
				string expected = @"export namespace DemoWebApi_DemoData_Client {

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
				Assert.Equal(expected, s, ignoreLineEndingDifferences: true);
			}

		}

		[Fact]
		public void Test2TypesWithRegions()
		{
			CodeCompileUnit targetUnit = new CodeCompileUnit();
			Poco2TsGen gen = new Poco2TsGen(targetUnit, ".Client", false, new CodeObjectHelper(true));
			gen.CreateCodeDom(new Type[] { typeof(DemoWebApi.DemoData.Person), typeof(DemoWebApi.DemoData.AddressType) }, CherryPickingMethods.DataContract);
			CodeTypeDeclaration typeDeclaration = targetUnit.Namespaces[0].Types[0];
			CodeTypeDeclaration typeDeclaration1 = targetUnit.Namespaces[0].Types[1];
			typeDeclaration.StartDirectives.Add(new CodeRegionDirective(CodeRegionMode.Start, "Type Block")); // Address
			typeDeclaration1.EndDirectives.Add(new CodeRegionDirective(CodeRegionMode.End, string.Empty)); //Person. 
																										   //types inside CreateCodeDom are sorted by namespace and type name.

			using (StringWriter writer = new StringWriter())
			{
				gen.WriteCode(writer);
				string s = writer.ToString();
				string expected = @"export namespace DemoWebApi_DemoData_Client {

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
				Assert.Equal(expected, s, ignoreLineEndingDifferences: true);
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
