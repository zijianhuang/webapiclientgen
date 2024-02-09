using Fonlow.Poco2Client;
using Fonlow.Poco2Ts;
using System.CodeDom;

namespace Poco2TsTests
{
	public class TsOutput
	{
		static void Verify(Type type, string expected)
		{
			var targetUnit = new CodeCompileUnit();
			var gen = new Poco2TsGen(targetUnit, ".Client", false, new Fonlow.TypeScriptCodeDom.CodeObjectHelperForNg2FormGroup(targetUnit.Namespaces));
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
			var gen = new Poco2TsGen(targetUnit, ".Client", false, new Fonlow.TypeScriptCodeDom.CodeObjectHelperForNg2FormGroup(targetUnit.Namespaces));
			gen.CreateCodeDom(new Type[] { type }, CherryPickingMethods.NewtonsoftJson);
			using (var writer = new StringWriter())
			{
				gen.WriteCode(writer);
				var s = writer.ToString();
				Assert.Equal(expected, s);
			}
		}

		//		[Fact]
		//		public void TestEnumAddressType()visual 
		//		{
		//			Verify(typeof(DemoWebApi.DemoData.AddressType),
		//@"export namespace DemoWebApi_DemoData_Client {
		//	export enum AddressType { Postal, Residential }

		//}

		//");
		//		}

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
	export interface EntityFormProperties {
		EmailAddress: FormControl<string | null | undefined>,
		Id: FormControl<string | null | undefined>,
		Name: FormControl<string | null | undefined>,
		Web: FormControl<string | null | undefined>,
	}
	export function CreateEntityFormGroup() {
		return new FormGroup<EntityFormProperties>({
			EmailAddress: new FormControl<string | null | undefined>(undefined, [Validators.email, Validators.maxLength(255)]),
			Id: new FormControl<string | null | undefined>(undefined),
			Name: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
			Web: new FormControl<string | null | undefined>(undefined, [Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]),
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
	export interface IntegralEntity extends DemoWebApi.DemoData.Base.Entity {
		Byte?: number | null;
		Int?: number | null;
		ItemCount?: number | null;
		SByte?: number | null;
		Short?: number | null;
		UInt?: number | null;
		UShort?: number | null;
	}
	export interface IntegralEntityFormProperties extends DemoWebApi.DemoData.Base.EntityFormProperties {
		Byte: FormControl<number | null | undefined>,
		Int: FormControl<number | null | undefined>,
		ItemCount: FormControl<number | null | undefined>,
		SByte: FormControl<number | null | undefined>,
		Short: FormControl<number | null | undefined>,
		UInt: FormControl<number | null | undefined>,
		UShort: FormControl<number | null | undefined>,
	}
	export function CreateIntegralEntityFormGroup() {
		return new FormGroup<IntegralEntityFormProperties>({
			Byte: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(256)]),
			Int: new FormControl<number | null | undefined>(undefined, [Validators.min(-2147483648), Validators.max(2147483647)]),
			ItemCount: new FormControl<number | null | undefined>(undefined, [Validators.min(-1000), Validators.max(1000000)]),
			SByte: new FormControl<number | null | undefined>(undefined, [Validators.min(-127), Validators.max(127)]),
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
	export interface PersonFormProperties extends DemoWebApi.DemoData.Base.EntityFormProperties {
		Baptised: FormControl<Date | null | undefined>,
		DOB: FormControl<Date | null | undefined>,
		GivenName: FormControl<string | null | undefined>,
		Surname: FormControl<string | null | undefined>,
	}
	export function CreatePersonFormGroup() {
		return new FormGroup<PersonFormProperties>({
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
	export interface AddressFormProperties {
		City: FormControl<string | null | undefined>,
		Country: FormControl<string | null | undefined>,
		Id: FormControl<string | null | undefined>,
		PostalCode: FormControl<string | null | undefined>,
		State: FormControl<string | null | undefined>,
		Street1: FormControl<string | null | undefined>,
		Street2: FormControl<string | null | undefined>,
		Type: FormControl<number | null | undefined>,
		Location: FormControl<any | null | undefined>,
	}
	export function CreateAddressFormGroup() {
		return new FormGroup<AddressFormProperties>({
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
