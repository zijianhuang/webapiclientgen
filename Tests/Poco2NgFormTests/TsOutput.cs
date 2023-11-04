using Fonlow.Poco2Client;
using Fonlow.Poco2Ts;

namespace Poco2TsTests
{
	public class TsOutput
	{
		static void Verify(Type type, string expected)
		{
			var gen = new Poco2TsGen(".Client", false);
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
			var gen = new Poco2TsGen(".Client", false);
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
		public void TestEntity()
		{
			Verify(typeof(DemoWebApi.DemoData.Entity),
@"export namespace DemoWebApi_DemoData_Client {
	export interface Entity {
		Addresses?: Array<any>;
		Id?: string;
		Name: string;
		PhoneNumbers?: Array<any>;
		Web?: string;
	}
	export interface EntityFormProperties {
		Addresses: FormControl<Array<any> | null | undefined>,
		Id: FormControl<string | null | undefined>,
		Name: FormControl<string | null | undefined>,
		PhoneNumbers: FormControl<Array<any> | null | undefined>,
		Web: FormControl<string | null | undefined>,
	}

}

");
		}

		[Fact]
		public void TestPerson()
		{
			Verify(typeof(DemoWebApi.DemoData.Person),
@"export namespace DemoWebApi_DemoData_Client {
	export interface Person extends DemoWebApi_DemoData_Client.Entity {
		Baptised?: Date;
		DOB?: Date;
		GivenName?: string;
		Surname?: string;
	}
	export interface PersonFormProperties extends DemoWebApi_DemoData_Client.EntityFormProperties {
		Baptised: FormControl<Date | null | undefined>,
		DOB: FormControl<Date | null | undefined>,
		GivenName: FormControl<string | null | undefined>,
		Surname: FormControl<string | null | undefined>,
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
		City?: string;
		Country?: string;
		Id?: string;
		PostalCode?: string;
		State?: string;
		Street1?: string;
		Street2?: string;
		Type?: number;
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
		public void TestGenericMims()
		{
			Verify(typeof(DemoWebApi.DemoData.MimsResult<>),
@"export namespace DemoWebApi_DemoData_Client {
	export enum Days { Sat = 1, Sun = 2, Mon = 3, Tue = 4, Wed = 5, Thu = 6, Fri = 7 }

}

");
		}

		//		[Fact]
		//		public void TestStrutMyPoint()
		//		{
		//			Fonlow.TypeScriptCodeDom.TsCodeGenerationOptions.Instance.CamelCase = true;
		//			VerifyJson(typeof(DemoWebApi.DemoData.Another.MyPoint),
		//@"export namespace DemoWebApi_DemoData_Another_Client {
		//	export interface MyPoint {
		//		x: number;
		//		y: number;
		//	}
		//	export interface MyPointFormProperties {
		//		x: FormControl<number | null | undefined>,
		//		y: FormControl<number | null | undefined>,
		//	}

		//}

		//");
		//		}

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
