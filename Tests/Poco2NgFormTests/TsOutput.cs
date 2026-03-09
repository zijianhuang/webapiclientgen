using Fonlow.Poco2Client;
using Fonlow.Poco2Ts;
using System.CodeDom;

namespace Poco2TsTests
{
	public class TsOutput
	{
		static void Verify(Type type, string expected)
		{
			CodeCompileUnit targetUnit = new CodeCompileUnit();
			Poco2TsGen gen = new Poco2TsGen(targetUnit, ".Client", false, new Fonlow.TypeScriptCodeDom.CodeObjectHelperForNg2FormGroup(targetUnit.Namespaces, new Fonlow.CodeDom.Web.JSOutput { NgDateOnlyFormControlEnabled = false, ApiSelections = null, NgUseRegexAttribute= Fonlow.CodeDom.Web.UseRegexAttr.Use }), CherryPickingMethods.All, []);
			gen.CreateCodeDom(new Type[] { type }, CherryPickingMethods.DataContract);
			using (StringWriter writer = new StringWriter())
			{
				gen.WriteCode(writer);
				string s = writer.ToString();
				Assert.Equal(expected, s, ignoreLineEndingDifferences: true);
			}
		}

		[Fact]
		public void TestEntity()
		{
			Verify(typeof(DemoWebApi.DemoData.Base.Entity),
@"export namespace DemoWebApi_DemoData_Base_Client {
	export interface Entity {
		Addresses?: Array<any>;
		EmailAddress?: string | null;
		Id?: string | null;
		Name: string;
		PhoneNumbers?: Array<any>;
		Web?: string | null;
	}
	export function CreateEntityFormGroup() {
		return new FormGroup({
			EmailAddress: new FormControl<string | null | undefined>(undefined, [Validators.email, Validators.maxLength(255)]),
			Id: new FormControl<string | null | undefined>(undefined),
			Name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
			Web: new FormControl<string | null | undefined>(undefined, [Validators.pattern(/^(https?:\/\/)?[da-z.-]+.[a-z.]{2,6}([/\w .-]*)*\/?$/)]),
		});

	}

}

");
		}

		[Fact]
		public void TestIntegralEntity()
		{
			Verify(typeof(DemoWebApi.DemoData.IntegralEntity),
@"export namespace DemoWebApi_DemoData_Client {
	export interface IntegralEntity {
		Byte?: number | null;
		Int?: number | null;
		ItemCount?: number | null;
		SByte?: number | null;
		Short?: number | null;
		UInt?: number | null;
		UShort?: number | null;
	}
	export function CreateIntegralEntityFormGroup() {
		return new FormGroup({
			Byte: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(255)]),
			Int: new FormControl<number | null | undefined>(undefined, [Validators.min(-2147483648), Validators.max(2147483647)]),
			ItemCount: new FormControl<number | null | undefined>(undefined, [Validators.min(-1000), Validators.max(1000000)]),
			SByte: new FormControl<number | null | undefined>(undefined, [Validators.min(-128), Validators.max(127)]),
			Short: new FormControl<number | null | undefined>(undefined, [Validators.min(-32768), Validators.max(32767)]),
			UInt: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(4294967295)]),
			UShort: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(65535)]),
		});

	}

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
	export function CreatePersonFormGroup() {
		return new FormGroup({
			Baptised: new FormControl<Date | null | undefined>(undefined),
			DOB: new FormControl<Date | null | undefined>(undefined),
			GivenName: new FormControl<string | null | undefined>(undefined),
			Surname: new FormControl<string | null | undefined>(undefined),
		});

	}

}

");
		}

		[Fact]
		public void TestAddress()
		{
			Verify(typeof(DemoWebApi.DemoData.Address),
@"export namespace DemoWebApi_DemoData_Client {
	export interface Address {
		City?: string | null;
		Country?: string | null;
		Id?: string | null;
		PostalCode?: string | null;
		State?: string | null;
		Street1?: string | null;
		Street2?: string | null;
		Type?: number | null;
		Location?: any;
	}
	export function CreateAddressFormGroup() {
		return new FormGroup({
			City: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(50)]),
			Country: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(30)]),
			Id: new FormControl<string | null | undefined>(undefined),
			PostalCode: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(10)]),
			State: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(30)]),
			Street1: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(100)]),
			Street2: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(100)]),
			Type: new FormControl<number | null | undefined>(undefined),
			Location: new FormControl<any | null | undefined>(undefined),
		});

	}

}

");
		}

	}

}
