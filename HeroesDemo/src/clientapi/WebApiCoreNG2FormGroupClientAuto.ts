import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export namespace DemoWebApi_DemoData_Client {
	export interface Address {

		/** String length: inclusive between 2 and 50 */
		city?: string | null;

		/** String length: inclusive between 2 and 30 */
		country?: string | null;

		/** Type: GUID */
		id?: string | null;

		/** String length: inclusive between 2 and 10 */
		postalCode?: string | null;

		/** String length: inclusive between 2 and 30 */
		state?: string | null;

		/** String length: inclusive between 2 and 100 */
		street1?: string | null;

		/** String length: inclusive between 2 and 100 */
		street2?: string | null;
		type?: DemoWebApi_DemoData_Client.AddressType | null;

		/**
		 * It is a field
		 */
		location?: DemoWebApi_DemoData_Another_Client.MyPoint;
	}
	export interface AddressFormProperties {

		/** String length: inclusive between 2 and 50 */
		city: FormControl<string | null | undefined>,

		/** String length: inclusive between 2 and 30 */
		country: FormControl<string | null | undefined>,

		/** Type: GUID */
		id: FormControl<string | null | undefined>,

		/** String length: inclusive between 2 and 10 */
		postalCode: FormControl<string | null | undefined>,

		/** String length: inclusive between 2 and 30 */
		state: FormControl<string | null | undefined>,

		/** String length: inclusive between 2 and 100 */
		street1: FormControl<string | null | undefined>,

		/** String length: inclusive between 2 and 100 */
		street2: FormControl<string | null | undefined>,
		type: FormControl<DemoWebApi_DemoData_Client.AddressType | null | undefined>,
	}
	export function CreateAddressFormGroup() {
		return new FormGroup<AddressFormProperties>({
			city: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(50)]),
			country: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(30)]),
			id: new FormControl<string | null | undefined>(undefined),
			postalCode: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(10)]),
			state: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(30)]),
			street1: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(100)]),
			street2: new FormControl<string | null | undefined>(undefined, [Validators.minLength(2), Validators.maxLength(100)]),
			type: new FormControl<DemoWebApi_DemoData_Client.AddressType | null | undefined>(undefined),
		});

	}

	export enum AddressType { Postal, Residential }


	/**  */
	export interface BigNumbers {

		/** Type: BigInteger */
		bigInt?: string | null;

		/** Type: Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727 */
		signed128?: string | null;

		/** Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 */
		signed64?: string | null;

		/** Type: UInt128, 0 to 340282366920938463463374607431768211455 */
		unsigned128?: string | null;

		/** Type: ulong, 0 to 18,446,744,073,709,551,615 */
		unsigned64?: string | null;
	}

	/**  */
	export interface BigNumbersFormProperties {

		/** Type: BigInteger */
		bigInt: FormControl<string | null | undefined>,

		/** Type: Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727 */
		signed128: FormControl<string | null | undefined>,

		/** Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 */
		signed64: FormControl<string | null | undefined>,

		/** Type: UInt128, 0 to 340282366920938463463374607431768211455 */
		unsigned128: FormControl<string | null | undefined>,

		/** Type: ulong, 0 to 18,446,744,073,709,551,615 */
		unsigned64: FormControl<string | null | undefined>,
	}
	export function CreateBigNumbersFormGroup() {
		return new FormGroup<BigNumbersFormProperties>({
			bigInt: new FormControl<string | null | undefined>(undefined, [Validators.pattern('/^-?\d*$/')]),
			signed128: new FormControl<string | null | undefined>(undefined, [Validators.pattern('/^-?\d{0,39}$/')]),
			signed64: new FormControl<string | null | undefined>(undefined, [Validators.pattern('/^-?\d{0,19}$/')]),
			unsigned128: new FormControl<string | null | undefined>(undefined, [Validators.pattern('/^\d{0,30}$/')]),
			unsigned64: new FormControl<string | null | undefined>(undefined, [Validators.pattern('/^\d{0,20}$/')]),
		});

	}

	export interface Company extends DemoWebApi_DemoData_Base_Client.Entity {

		/**
		 * BusinessNumber to be serialized as BusinessNum
		 */
		BusinessNum?: string | null;
		businessNumberType?: string | null;

		/** Data type: Date */
		foundDate?: Date | null;

		/** Type: DateOnly */
		registerDate?: Date | null;
		textMatrix?: Array<Array<string>>;
		int2D?: number[][];
		int2DJagged?: Array<Array<number>>;
		lines?: Array<string>;
	}
	export interface CompanyFormProperties extends DemoWebApi_DemoData_Base_Client.EntityFormProperties {

		/**
		 * BusinessNumber to be serialized as BusinessNum
		 */
		BusinessNum: FormControl<string | null | undefined>,
		businessNumberType: FormControl<string | null | undefined>,

		/** Data type: Date */
		foundDate: FormControl<Date | null | undefined>,

		/** Type: DateOnly */
		registerDate: FormControl<Date | null | undefined>,
	}
	export function CreateCompanyFormGroup() {
		return new FormGroup<CompanyFormProperties>({
			emailAddress: new FormControl<string | null | undefined>(undefined, [Validators.email, Validators.maxLength(255)]),
			id: new FormControl<string | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
			web: new FormControl<string | null | undefined>(undefined, [Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]),
			BusinessNum: new FormControl<string | null | undefined>(undefined),
			businessNumberType: new FormControl<string | null | undefined>(undefined),
			foundDate: new FormControl<Date | null | undefined>(undefined),
			registerDate: new FormControl<Date | null | undefined>(undefined),
		});

	}

	export enum Days {
		Sat = 1,
		Sun = 2,
		Mon = 3,
		Tue = 4,
		Wed = 5,

		/**
		 * Thursday
		 */
		Thu = 6,
		Fri = 7
	}


	/**
	 * To test different serializations against Guid
	 */
	export interface IdMap {

		/** Type: GUID */
		id?: string | null;

		/** Type: GUID */
		idNotEmitDefaultValue?: string | null;
		nullableId?: string | null;

		/** Required */
		requiredName: string;
		text?: string | null;
	}

	/**
	 * To test different serializations against Guid
	 */
	export interface IdMapFormProperties {

		/** Type: GUID */
		id: FormControl<string | null | undefined>,

		/** Type: GUID */
		idNotEmitDefaultValue: FormControl<string | null | undefined>,
		nullableId: FormControl<string | null | undefined>,

		/** Required */
		requiredName: FormControl<string | null | undefined>,
		text: FormControl<string | null | undefined>,
	}
	export function CreateIdMapFormGroup() {
		return new FormGroup<IdMapFormProperties>({
			id: new FormControl<string | null | undefined>(undefined),
			idNotEmitDefaultValue: new FormControl<string | null | undefined>(undefined),
			nullableId: new FormControl<string | null | undefined>(undefined),
			requiredName: new FormControl<string | null | undefined>(undefined, [Validators.required]),
			text: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface IntegralEntity extends DemoWebApi_DemoData_Base_Client.Entity {

		/** Type: byte, 0 to 255 */
		byte?: number | null;

		/** Type: int, -2,147,483,648 to 2,147,483,647 */
		int?: number | null;

		/**
		 * Type: int
		 * Range: inclusive between -1000 and 1000000
		 */
		itemCount?: number | null;

		/** Type: sbyte, -128 to 127 */
		sByte?: number | null;

		/** Type: short, -32,768 to 32,767 */
		short?: number | null;

		/** Type: uint, 0 to 4,294,967,295 */
		uInt?: number | null;

		/** Type: ushort, 0 to 65,535 */
		uShort?: number | null;
	}
	export interface IntegralEntityFormProperties extends DemoWebApi_DemoData_Base_Client.EntityFormProperties {

		/** Type: byte, 0 to 255 */
		byte: FormControl<number | null | undefined>,

		/** Type: int, -2,147,483,648 to 2,147,483,647 */
		int: FormControl<number | null | undefined>,

		/**
		 * Type: int
		 * Range: inclusive between -1000 and 1000000
		 */
		itemCount: FormControl<number | null | undefined>,

		/** Type: sbyte, -128 to 127 */
		sByte: FormControl<number | null | undefined>,

		/** Type: short, -32,768 to 32,767 */
		short: FormControl<number | null | undefined>,

		/** Type: uint, 0 to 4,294,967,295 */
		uInt: FormControl<number | null | undefined>,

		/** Type: ushort, 0 to 65,535 */
		uShort: FormControl<number | null | undefined>,
	}
	export function CreateIntegralEntityFormGroup() {
		return new FormGroup<IntegralEntityFormProperties>({
			emailAddress: new FormControl<string | null | undefined>(undefined, [Validators.email, Validators.maxLength(255)]),
			id: new FormControl<string | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
			web: new FormControl<string | null | undefined>(undefined, [Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]),
			byte: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(256)]),
			int: new FormControl<number | null | undefined>(undefined, [Validators.min(-2147483648), Validators.max(2147483647)]),
			itemCount: new FormControl<number | null | undefined>(undefined, [Validators.min(-1000), Validators.max(1000000)]),
			sByte: new FormControl<number | null | undefined>(undefined, [Validators.min(-127), Validators.max(127)]),
			short: new FormControl<number | null | undefined>(undefined, [Validators.min(-32768), Validators.max(32767)]),
			uInt: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(4294967295)]),
			uShort: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(65535)]),
		});

	}

	export enum MedicalContraindiationResponseTypeReason { M = "Mm", S = "Ss", P = "Pp", I = "I", A = "A" }

	export enum MedicalContraindiationResponseTypeTypeCode { P = "P", T = "Tt" }

	export interface MimsPackage {

		/**
		 * Type: int
		 * Range: inclusive between 10 and 100
		 */
		kk?: number | null;

		/**
		 * Having an initialized value in the property is not like defining a DefaultValueAttribute. Such intialization happens at run time,
		 * and there's no reliable way for a codegen to know if the value is declared by the programmer, or is actually the natural default value like 0.
		 */
		kK2?: number | null;
		optionalEnum?: DemoWebApi_DemoData_Client.MyEnumType | null;
		optionalInt?: number | null;
		result?: DemoWebApi_DemoData_Client.MimsResult<number>;
		tag?: string | null;
	}
	export interface MimsPackageFormProperties {

		/**
		 * Type: int
		 * Range: inclusive between 10 and 100
		 */
		kk: FormControl<number | null | undefined>,

		/**
		 * Having an initialized value in the property is not like defining a DefaultValueAttribute. Such intialization happens at run time,
		 * and there's no reliable way for a codegen to know if the value is declared by the programmer, or is actually the natural default value like 0.
		 */
		kK2: FormControl<number | null | undefined>,
		optionalEnum: FormControl<DemoWebApi_DemoData_Client.MyEnumType | null | undefined>,
		optionalInt: FormControl<number | null | undefined>,
		result: FormControl<DemoWebApi_DemoData_Client.MimsResult<number> | null | undefined>,
		tag: FormControl<string | null | undefined>,
	}
	export function CreateMimsPackageFormGroup() {
		return new FormGroup<MimsPackageFormProperties>({
			kk: new FormControl<number | null | undefined>(undefined, [Validators.min(10), Validators.max(100)]),
			kK2: new FormControl<number | null | undefined>(undefined, [Validators.min(-2147483648), Validators.max(2147483647)]),
			optionalEnum: new FormControl<DemoWebApi_DemoData_Client.MyEnumType | null | undefined>(undefined),
			optionalInt: new FormControl<number | null | undefined>(undefined),
			result: new FormControl<DemoWebApi_DemoData_Client.MimsResult<number> | null | undefined>(undefined),
			tag: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface MimsResult<T> {
		generatedAt?: Date | null;
		message?: string | null;
		result?: T;
		success?: boolean | null;
	}

	export enum MyEnumType { First = 1, Two = 2 }

	export interface MyGeneric<T, K, U> {
		myK?: K;
		myT?: T;
		myU?: U;
		status?: string | null;
	}

	export interface MyPeopleDic {
		anotherDic?: {[id: string]: string };
		dic?: {[id: string]: DemoWebApi_DemoData_Client.Person };
		intDic?: {[id: number]: string };
	}
	export interface MyPeopleDicFormProperties {
		anotherDic: FormControl<{[id: string]: string } | null | undefined>,
		dic: FormControl<{[id: string]: DemoWebApi_DemoData_Client.Person } | null | undefined>,
		intDic: FormControl<{[id: number]: string } | null | undefined>,
	}
	export function CreateMyPeopleDicFormGroup() {
		return new FormGroup<MyPeopleDicFormProperties>({
			anotherDic: new FormControl<{[id: string]: string } | null | undefined>(undefined),
			dic: new FormControl<{[id: string]: DemoWebApi_DemoData_Client.Person } | null | undefined>(undefined),
			intDic: new FormControl<{[id: number]: string } | null | undefined>(undefined),
		});

	}

	export interface Person extends DemoWebApi_DemoData_Base_Client.Entity {

		/** Data type: Date */
		baptised?: Date | null;

		/**
		 * Date of Birth.
		 * This is optional.
		 */
		dob?: Date | null;
		givenName?: string | null;
		surname?: string | null;
	}
	export interface PersonFormProperties extends DemoWebApi_DemoData_Base_Client.EntityFormProperties {

		/** Data type: Date */
		baptised: FormControl<Date | null | undefined>,

		/**
		 * Date of Birth.
		 * This is optional.
		 */
		dob: FormControl<Date | null | undefined>,
		givenName: FormControl<string | null | undefined>,
		surname: FormControl<string | null | undefined>,
	}
	export function CreatePersonFormGroup() {
		return new FormGroup<PersonFormProperties>({
			emailAddress: new FormControl<string | null | undefined>(undefined, [Validators.email, Validators.maxLength(255)]),
			id: new FormControl<string | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
			web: new FormControl<string | null | undefined>(undefined, [Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]),
			baptised: new FormControl<Date | null | undefined>(undefined),
			dob: new FormControl<Date | null | undefined>(undefined),
			givenName: new FormControl<string | null | undefined>(undefined),
			surname: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface PhoneNumber {

		/** Max length: 120 */
		fullNumber?: string | null;
		phoneType?: DemoWebApi_DemoData_Client.PhoneType | null;
	}
	export interface PhoneNumberFormProperties {

		/** Max length: 120 */
		fullNumber: FormControl<string | null | undefined>,
		phoneType: FormControl<DemoWebApi_DemoData_Client.PhoneType | null | undefined>,
	}
	export function CreatePhoneNumberFormGroup() {
		return new FormGroup<PhoneNumberFormProperties>({
			fullNumber: new FormControl<string | null | undefined>(undefined, [Validators.maxLength(120)]),
			phoneType: new FormControl<DemoWebApi_DemoData_Client.PhoneType | null | undefined>(undefined),
		});

	}


	/**
	 * Phone type
	 * Tel, Mobile, Skyp and Fax
	 */
	export enum PhoneType {

		/**
		 * Land line
		 */
		Tel,

		/**
		 * Mobile phone
		 */
		Mobile,
		Skype,
		Fax
	}

}

export namespace DemoWebApi_DemoData_Another_Client {

	/**
	 * 2D position
	 * with X and Y
	 * for Demo
	 */
	export interface MyPoint {

		/**
		 * X
		 */
		x: number;

		/**
		 * Y
		 */
		y: number;
	}

	/**
	 * 2D position
	 * with X and Y
	 * for Demo
	 */
	export interface MyPointFormProperties {

		/**
		 * X
		 */
		x: FormControl<number | null | undefined>,

		/**
		 * Y
		 */
		y: FormControl<number | null | undefined>,
	}
	export function CreateMyPointFormGroup() {
		return new FormGroup<MyPointFormProperties>({
			x: new FormControl<number | null | undefined>(undefined),
			y: new FormControl<number | null | undefined>(undefined),
		});

	}

}

export namespace DemoWebApi_DemoData_Base_Client {

	/**
	 * Base class of company and person
	 */
	export interface Entity {

		/**
		 * Multiple addresses
		 */
		addresses?: Array<DemoWebApi_DemoData_Client.Address>;

		/** Max length: 255 */
		emailAddress?: string | null;
		id?: string | null;

		/**
		 * Name of the entity.
		 */
		name: string;
		phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;

		/** Type: Uri */
		web?: string | null;
	}

	/**
	 * Base class of company and person
	 */
	export interface EntityFormProperties {

		/** Max length: 255 */
		emailAddress: FormControl<string | null | undefined>,
		id: FormControl<string | null | undefined>,

		/**
		 * Name of the entity.
		 */
		name: FormControl<string | null | undefined>,

		/** Type: Uri */
		web: FormControl<string | null | undefined>,
	}
	export function CreateEntityFormGroup() {
		return new FormGroup<EntityFormProperties>({
			emailAddress: new FormControl<string | null | undefined>(undefined, [Validators.email, Validators.maxLength(255)]),
			id: new FormControl<string | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
			web: new FormControl<string | null | undefined>(undefined, [Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]),
		});

	}

}

export namespace DemoWebApi_Models_Client {
	export interface AddExternalLoginBindingModel {

		/** Required */
		externalAccessToken?: string | null;
	}
	export interface AddExternalLoginBindingModelFormProperties {

		/** Required */
		externalAccessToken: FormControl<string | null | undefined>,
	}
	export function CreateAddExternalLoginBindingModelFormGroup() {
		return new FormGroup<AddExternalLoginBindingModelFormProperties>({
			externalAccessToken: new FormControl<string | null | undefined>(undefined, [Validators.required]),
		});

	}

	export interface ChangePasswordBindingModel {

		/** Data type: Password */
		confirmPassword?: string | null;

		/**
		 * Required
		 * String length: inclusive between 6 and 100
		 * Data type: Password
		 */
		newPassword: string;

		/**
		 * Required
		 * Data type: Password
		 */
		OldPwd: string;
	}
	export interface ChangePasswordBindingModelFormProperties {

		/** Data type: Password */
		confirmPassword: FormControl<string | null | undefined>,

		/**
		 * Required
		 * String length: inclusive between 6 and 100
		 * Data type: Password
		 */
		newPassword: FormControl<string | null | undefined>,

		/**
		 * Required
		 * Data type: Password
		 */
		OldPwd: FormControl<string | null | undefined>,
	}
	export function CreateChangePasswordBindingModelFormGroup() {
		return new FormGroup<ChangePasswordBindingModelFormProperties>({
			confirmPassword: new FormControl<string | null | undefined>(undefined),
			newPassword: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
			OldPwd: new FormControl<string | null | undefined>(undefined, [Validators.required]),
		});

	}

	export interface RegisterBindingModel {

		/** Data type: Password */
		confirmPassword?: string | null;

		/** Required */
		email?: string | null;

		/**
		 * Required
		 * String length: inclusive between 6 and 100
		 * Data type: Password
		 */
		password?: string | null;
	}
	export interface RegisterBindingModelFormProperties {

		/** Data type: Password */
		confirmPassword: FormControl<string | null | undefined>,

		/** Required */
		email: FormControl<string | null | undefined>,

		/**
		 * Required
		 * String length: inclusive between 6 and 100
		 * Data type: Password
		 */
		password: FormControl<string | null | undefined>,
	}
	export function CreateRegisterBindingModelFormGroup() {
		return new FormGroup<RegisterBindingModelFormProperties>({
			confirmPassword: new FormControl<string | null | undefined>(undefined),
			email: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.email]),
			password: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
		});

	}

	export interface RegisterExternalBindingModel {

		/** Required */
		email?: string | null;
	}
	export interface RegisterExternalBindingModelFormProperties {

		/** Required */
		email: FormControl<string | null | undefined>,
	}
	export function CreateRegisterExternalBindingModelFormGroup() {
		return new FormGroup<RegisterExternalBindingModelFormProperties>({
			email: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.email]),
		});

	}

	export interface RemoveLoginBindingModel {

		/** Required */
		loginProvider?: string | null;

		/** Required */
		providerKey?: string | null;
	}
	export interface RemoveLoginBindingModelFormProperties {

		/** Required */
		loginProvider: FormControl<string | null | undefined>,

		/** Required */
		providerKey: FormControl<string | null | undefined>,
	}
	export function CreateRemoveLoginBindingModelFormGroup() {
		return new FormGroup<RemoveLoginBindingModelFormProperties>({
			loginProvider: new FormControl<string | null | undefined>(undefined, [Validators.required]),
			providerKey: new FormControl<string | null | undefined>(undefined, [Validators.required]),
		});

	}

	export interface SetPasswordBindingModel {

		/** Data type: Password */
		confirmPassword?: string | null;

		/**
		 * Required
		 * String length: inclusive between 6 and 100
		 * Data type: Password
		 */
		newPassword?: string | null;
	}
	export interface SetPasswordBindingModelFormProperties {

		/** Data type: Password */
		confirmPassword: FormControl<string | null | undefined>,

		/**
		 * Required
		 * String length: inclusive between 6 and 100
		 * Data type: Password
		 */
		newPassword: FormControl<string | null | undefined>,
	}
	export function CreateSetPasswordBindingModelFormGroup() {
		return new FormGroup<SetPasswordBindingModelFormProperties>({
			confirmPassword: new FormControl<string | null | undefined>(undefined),
			newPassword: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
		});

	}


	/**
	 * Auth token
	 */
	export interface TokenResponseModel {
		access_token?: string | null;
		expires?: string | null;

		/** Type: int, -2,147,483,648 to 2,147,483,647 */
		expires_in?: number | null;
		issued?: string | null;
		token_type?: string | null;
		username?: string | null;
	}

	/**
	 * Auth token
	 */
	export interface TokenResponseModelFormProperties {
		access_token: FormControl<string | null | undefined>,
		expires: FormControl<string | null | undefined>,

		/** Type: int, -2,147,483,648 to 2,147,483,647 */
		expires_in: FormControl<number | null | undefined>,
		issued: FormControl<string | null | undefined>,
		token_type: FormControl<string | null | undefined>,
		username: FormControl<string | null | undefined>,
	}
	export function CreateTokenResponseModelFormGroup() {
		return new FormGroup<TokenResponseModelFormProperties>({
			access_token: new FormControl<string | null | undefined>(undefined),
			expires: new FormControl<string | null | undefined>(undefined),
			expires_in: new FormControl<number | null | undefined>(undefined, [Validators.min(-2147483648), Validators.max(2147483647)]),
			issued: new FormControl<string | null | undefined>(undefined),
			token_type: new FormControl<string | null | undefined>(undefined),
			username: new FormControl<string | null | undefined>(undefined),
		});

	}

}

export namespace DemoWebApi_Controllers_Client {

	/**
	 * This class is used to carry the result of various file uploads.
	 */
	export interface FileResult {

		/**
		 * Gets or sets the local path of the file saved on the server.
		 */
		fileNames?: Array<string>;

		/**
		 * Gets or sets the submitter as indicated in the HTML form used to upload the data.
		 */
		submitter?: string | null;
	}

	/**
	 * This class is used to carry the result of various file uploads.
	 */
	export interface FileResultFormProperties {

		/**
		 * Gets or sets the submitter as indicated in the HTML form used to upload the data.
		 */
		submitter: FormControl<string | null | undefined>,
	}
	export function CreateFileResultFormGroup() {
		return new FormGroup<FileResultFormProperties>({
			submitter: new FormControl<string | null | undefined>(undefined),
		});

	}


	/**
	 * Complex hero type
	 */
	export interface Hero {
		address?: DemoWebApi_DemoData_Client.Address;
		death?: Date | null;

		/** Type: DateOnly */
		dob?: Date | null;
		emailAddress?: string | null;

		/** Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 */
		id?: string | null;

		/**
		 * Required
		 * String length: inclusive between 2 and 120
		 */
		name?: string | null;
		phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;

		/** Min length: 6 */
		webAddress?: string | null;
	}

	/**
	 * Complex hero type
	 */
	export interface HeroFormProperties {
		death: FormControl<Date | null | undefined>,

		/** Type: DateOnly */
		dob: FormControl<Date | null | undefined>,
		emailAddress: FormControl<string | null | undefined>,

		/** Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 */
		id: FormControl<string | null | undefined>,

		/**
		 * Required
		 * String length: inclusive between 2 and 120
		 */
		name: FormControl<string | null | undefined>,

		/** Min length: 6 */
		webAddress: FormControl<string | null | undefined>,
	}
	export function CreateHeroFormGroup() {
		return new FormGroup<HeroFormProperties>({
			death: new FormControl<Date | null | undefined>(undefined),
			dob: new FormControl<Date | null | undefined>(undefined),
			emailAddress: new FormControl<string | null | undefined>(undefined, [Validators.email]),
			id: new FormControl<string | null | undefined>(undefined, [Validators.pattern('/^-?\d{0,19}$/')]),
			name: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
			webAddress: new FormControl<string | null | undefined>(undefined, [Validators.minLength(6), Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]),
		});

	}

	export interface SuperHero extends DemoWebApi_Controllers_Client.Hero {
		super?: boolean | null;
	}
	export interface SuperHeroFormProperties extends DemoWebApi_Controllers_Client.HeroFormProperties {
		super: FormControl<boolean | null | undefined>,
	}
	export function CreateSuperHeroFormGroup() {
		return new FormGroup<SuperHeroFormProperties>({
			death: new FormControl<Date | null | undefined>(undefined),
			dob: new FormControl<Date | null | undefined>(undefined),
			emailAddress: new FormControl<string | null | undefined>(undefined, [Validators.email]),
			id: new FormControl<string | null | undefined>(undefined, [Validators.pattern('/^-?\d{0,19}$/')]),
			name: new FormControl<string | null | undefined>(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
			webAddress: new FormControl<string | null | undefined>(undefined, [Validators.minLength(6), Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]),
			super: new FormControl<boolean | null | undefined>(undefined),
		});

	}

}

export namespace DemoCoreWeb_Controllers_Client {
	@Injectable()
	export class SpecialTypes {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * Anonymous Dynamic of C#
		 * GET api/SpecialTypes/AnonymousDynamic
		 * @return {any} dyanmic things
		 */
		getAnonymousDynamic(headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * Async function returing dynamic
		 * GET api/SpecialTypes/AnonymousDynamic2
		 */
		getAnonymousDynamic2(headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic2', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * GET api/SpecialTypes/AnonymousObject
		 */
		getAnonymousObject(headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.get(this.baseUri + 'api/SpecialTypes/AnonymousObject', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * Async function returning object
		 * GET api/SpecialTypes/AnonymousObject2
		 */
		getAnonymousObject2(headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.get(this.baseUri + 'api/SpecialTypes/AnonymousObject2', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * POST api/SpecialTypes/AnonymousObject
		 */
		postAnonymousObject(obj?: any, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'api/SpecialTypes/AnonymousObject', JSON.stringify(obj), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Async returning object, Post dynamic
		 * POST api/SpecialTypes/AnonymousObject2
		 */
		postAnonymousObject2(obj?: any, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'api/SpecialTypes/AnonymousObject2', JSON.stringify(obj), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}
	}

}

export namespace DemoWebApi_Controllers_Client {

	/**
	 * For testing different commbinations of parameters and returns
	 */
	@Injectable()
	export class DateTypes {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * GET api/DateTypes/GetDateOnlyMin
		 * @return {Date} Type: DateOnly
		 */
		getDateOnlyMin(headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.get<Date>(this.baseUri + 'api/DateTypes/GetDateOnlyMin', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/DateTypes/NullableDatetime/{hasValue}
		 */
		getDateTime(hasValue?: boolean | null, headersHandler?: () => HttpHeaders): Observable<Date | null> {
			return this.http.get<Date | null>(this.baseUri + 'api/DateTypes/NullableDatetime/' + hasValue, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * return DateTimeOffset.Now
		 * GET api/DateTypes/ForDateTimeOffset
		 */
		getDateTimeOffset(headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.get<Date>(this.baseUri + 'api/DateTypes/ForDateTimeOffset', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/DateTypes/NextHour/{dt}
		 */
		getNextHour(dt?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.get<Date>(this.baseUri + 'api/DateTypes/NextHour/' + dt?.toISOString(), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * If Dt is not defined, add a hour from now
		 * GET api/DateTypes/NextHourNullable?n={n}&dt={dt}
		 * @param {number} n Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getNextHourNullable(n?: number | null, dt?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.get<Date>(this.baseUri + 'api/DateTypes/NextHourNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/DateTypes/NextYear/{dt}
		 */
		getNextYear(dt?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.get<Date>(this.baseUri + 'api/DateTypes/NextYear/' + dt?.toISOString(), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * If Dt is not defined, add a year from now
		 * GET api/DateTypes/NextYearNullable?n={n}&dt={dt}
		 * @param {number} n Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getNextYearNullable(n?: number | null, dt?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.get<Date>(this.baseUri + 'api/DateTypes/NextYearNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Client should send DateTime.Date
		 * POST api/DateTypes/IsDateTimeDate
		 */
		isDateTimeDate(dt?: Date | null, headersHandler?: () => HttpHeaders): Observable<{item1: Date, item2: Date}> {
			return this.http.post<{item1: Date, item2: Date}>(this.baseUri + 'api/DateTypes/IsDateTimeDate', JSON.stringify(dt), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/DateTypes/IsDateTimeOffsetDate
		 */
		isDateTimeOffsetDate(dt?: Date | null, headersHandler?: () => HttpHeaders): Observable<{item1: Date, item2: Date}> {
			return this.http.post<{item1: Date, item2: Date}>(this.baseUri + 'api/DateTypes/IsDateTimeOffsetDate', JSON.stringify(dt), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/DateTypes/ForDateOnly
		 * @param {Date} d Type: DateOnly
		 * @return {Date} Type: DateOnly
		 */
		postDateOnly(d?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.post<Date>(this.baseUri + 'api/DateTypes/ForDateOnly', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/DateTypes/DateOnlyNullable
		 */
		postDateOnlyNullable(d?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date | null> {
			return this.http.post<Date | null>(this.baseUri + 'api/DateTypes/DateOnlyNullable', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/DateTypes/ForDateTime
		 */
		postDateTime(d?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.post<Date>(this.baseUri + 'api/DateTypes/ForDateTime', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/DateTypes/DateTimeNullable
		 */
		postDateTimeNullable(d?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date | null> {
			return this.http.post<Date | null>(this.baseUri + 'api/DateTypes/DateTimeNullable', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * return d;
		 * POST api/DateTypes/ForDateTimeOffset
		 */
		postDateTimeOffset(d?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.post<Date>(this.baseUri + 'api/DateTypes/ForDateTimeOffset', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * return d.ToString("O")
		 * POST api/DateTypes/ForDateTimeOffsetForO
		 */
		postDateTimeOffsetForO(d?: Date | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetForO', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * POST api/DateTypes/ForDateTimeOffsetForOffset
		 */
		postDateTimeOffsetForOffset(d?: Date | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetForOffset', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Returned is DateTimeOffset?
		 * POST api/DateTypes/DateTimeOffsetNullable
		 */
		postDateTimeOffsetNullable(d?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date | null> {
			return this.http.post<Date | null>(this.baseUri + 'api/DateTypes/DateTimeOffsetNullable', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/DateTypes/ForDateTimeOffsetStringForOffset
		 */
		postDateTimeOffsetStringForOffset(s?: string | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetStringForOffset', JSON.stringify(s), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * POST api/DateTypes/NextYear
		 */
		postNextYear(dt?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.post<Date>(this.baseUri + 'api/DateTypes/NextYear', JSON.stringify(dt), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * GET api/DateTypes/DateOnlyStringQuery?d={d}
		 * @return {Date} Type: DateOnly
		 */
		queryDateOnlyAsString(d?: string | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.get<Date>(this.baseUri + 'api/DateTypes/DateOnlyStringQuery?d=' + (!d ? '' : encodeURIComponent(d)), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/DateTypes/RouteDateTimeOffset/{d}
		 */
		routeDateTimeOffset(d?: Date | null, headersHandler?: () => HttpHeaders): Observable<Date> {
			return this.http.get<Date>(this.baseUri + 'api/DateTypes/RouteDateTimeOffset/' + d?.toISOString(), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Return Tuple DateTime?, DateTime?
		 * GET api/DateTypes/SearchDateRange?startDate={startDate}&endDate={endDate}
		 * @param {Date | null} startDate DateTime? startDate = null
		 * @param {Date | null} endDate DateTime? endDate = null
		 */
		searchDateRange(startDate?: Date | null, endDate?: Date | null, headersHandler?: () => HttpHeaders): Observable<{item1: Date | null, item2: Date | null}> {
			return this.http.get<{item1: Date | null, item2: Date | null}>(this.baseUri + 'api/DateTypes/SearchDateRange?' + (startDate ? 'startDate=' + startDate?.toISOString() : '') + (endDate ? '&endDate=' + endDate?.toISOString() : ''), { headers: headersHandler ? headersHandler() : undefined });
		}
	}


	/**
	 * Entities, Person and Company
	 * Some with AuthorizeAttribute
	 */
	@Injectable()
	export class Entities {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * POST api/Entities/createCompany
		 */
		createCompany(p?: DemoWebApi_DemoData_Client.Company | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Company> {
			return this.http.post<DemoWebApi_DemoData_Client.Company>(this.baseUri + 'api/Entities/createCompany', JSON.stringify(p), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Entities/createPerson
		 * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		createPerson(p?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post<string>(this.baseUri + 'api/Entities/createPerson', JSON.stringify(p), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Entities/createPerson2
		 */
		createPerson2(p?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/createPerson2', JSON.stringify(p), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Entities/createPerson3
		 */
		createPerson3(p?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/createPerson3', JSON.stringify(p), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Entities/createPersonByAdmin
		 * Status Codes: 404:NotFound, 204:NoContent, 422:UnprocessableEntity
		 */
		createPersonByAdmin(p?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/createPersonByAdmin', JSON.stringify(p), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Entities/createPersonWeak
		 * Status Codes: 404:NotFound, 204:NoContent, 200:OK : DemoWebApi.DemoData.Person
		 */
		createPersonWeak(p?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/createPersonWeak', JSON.stringify(p), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Entities/createPersonWithNotFound
		 * Status Codes: 404:NotFound
		 */
		createPersonWithNotFound(p?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/createPersonWithNotFound', JSON.stringify(p), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Entities/createPersonWithStatuses
		 * Status Codes: 404:NotFound, 204:NoContent, 422:UnprocessableEntity
		 */
		createPersonWithStatuses(p?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/createPersonWithStatuses', JSON.stringify(p), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * DELETE api/Entities/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		delete(id?: string | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.delete(this.baseUri + 'api/Entities/' + id, { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * GET api/Entities/Company/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getCompany(id?: string | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Company> {
			return this.http.get<DemoWebApi_DemoData_Client.Company>(this.baseUri + 'api/Entities/Company/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * POST api/Entities/Mims
		 */
		getMims(p?: DemoWebApi_DemoData_Client.MimsPackage | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.MimsResult<string>> {
			return this.http.post<DemoWebApi_DemoData_Client.MimsResult<string>>(this.baseUri + 'api/Entities/Mims', JSON.stringify(p), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Post MyGeneric string, decimal, double
		 * POST api/Entities/MyGeneric
		 */
		getMyGeneric(s?: DemoWebApi_DemoData_Client.MyGeneric<string, number, number> | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.MyGeneric<string, number, number>> {
			return this.http.post<DemoWebApi_DemoData_Client.MyGeneric<string, number, number>>(this.baseUri + 'api/Entities/MyGeneric', JSON.stringify(s), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Post MyGeneric string, decimal, Person
		 * POST api/Entities/MyGenericPerson
		 */
		getMyGenericPerson(s?: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>> {
			return this.http.post<DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/Entities/MyGenericPerson', JSON.stringify(s), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Return empty body, status 204. MaybeNull
		 * GET api/Entities/NullCompany
		 */
		getNullCompany(headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Company | null> {
			return this.http.get<DemoWebApi_DemoData_Client.Company | null>(this.baseUri + 'api/Entities/NullCompany', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Get a person
		 * so to know the person
		 * GET api/Entities/getPerson/{id}
		 * @param {string} id unique id of that guy
		 * @return {DemoWebApi_DemoData_Client.Person} person in db
		 */
		getPerson(id?: string | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/getPerson/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Entities/getPerson2/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getPerson2(id?: string | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/getPerson2/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * PUT api/Entities/link?id={id}&relationship={relationship}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		linkPerson(id?: string | null, relationship?: string | null, person?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<boolean> {
			return this.http.put<boolean>(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + (!relationship ? '' : encodeURIComponent(relationship)), JSON.stringify(person), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
		 * PATCH api/Entities/patchPerson
		 */
		patchPerson(person?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.patch(this.baseUri + 'api/Entities/patchPerson', JSON.stringify(person), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * POST api/Entities/IdMap
		 */
		postIdMap(idMap?: DemoWebApi_DemoData_Client.IdMap | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.IdMap> {
			return this.http.post<DemoWebApi_DemoData_Client.IdMap>(this.baseUri + 'api/Entities/IdMap', JSON.stringify(idMap), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * PUT api/Entities/updatePerson
		 */
		updatePerson(person?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.put(this.baseUri + 'api/Entities/updatePerson', JSON.stringify(person), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}
	}


	/**
	 * Heroes operations. Decorated by nullable directive.
	 */
	@Injectable()
	export class Heroes {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * DELETE api/Heroes/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		delete(id?: string | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.delete(this.baseUri + 'api/Heroes/' + id, { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * GET api/Heroes/asyncHeroes
		 */
		getAsyncHeroes(headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_Controllers_Client.Hero>> {
			return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes/asyncHeroes', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Get a hero. Nullable reference. MaybeNull
		 * GET api/Heroes/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getHero(id?: string | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_Controllers_Client.Hero | null> {
			return this.http.get<DemoWebApi_Controllers_Client.Hero | null>(this.baseUri + 'api/Heroes/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Get all heroes.
		 * GET api/Heroes
		 */
		getHeros(headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_Controllers_Client.Hero>> {
			return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * MaybeNull
		 * GET api/Heroes/super?id={id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getSuperHero(id?: string | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_Controllers_Client.SuperHero | null> {
			return this.http.get<DemoWebApi_Controllers_Client.SuperHero | null>(this.baseUri + 'api/Heroes/super?id=' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * POST api/Heroes
		 */
		post(name?: string | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_Controllers_Client.Hero> {
			return this.http.post<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes', JSON.stringify(name), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Add a hero. The client will not expect null. NotNull
		 * POST api/Heroes/q?name={name}
		 * @param {string} name name of hero
		 * @return {DemoWebApi_Controllers_Client.Hero} Always object.
		 */
		postWithQuery(name?: string | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_Controllers_Client.Hero> {
			return this.http.post<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes/q?name=' + (!name ? '' : encodeURIComponent(name)), null, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Update hero.
		 * PUT api/Heroes
		 */
		put(hero?: DemoWebApi_Controllers_Client.Hero | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_Controllers_Client.Hero> {
			return this.http.put<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes', JSON.stringify(hero), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Search heroes
		 * GET api/Heroes/search/{name}
		 * @param {string} name keyword contained in hero name.
		 * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
		 */
		search(name?: string | null, headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_Controllers_Client.Hero>> {
			return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes/search/' + (!name ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined });
		}
	}


	/**
	 * For testing different commbinations of parameters and returns
	 */
	@Injectable()
	export class Numbers {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * GET api/Numbers/byte?d={d}
		 * @param {number} d Type: byte, 0 to 255
		 * @return {number} Type: byte, 0 to 255
		 */
		getByte(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/Numbers/byte?d=' + d, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Numbers/byteWithRange?d={d}
		 * @param {number} d Byte for small number.
		 * @return {number} Type: byte, 0 to 255
		 */
		getByteWithRange(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/Numbers/byteWithRange?d=' + d, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * POST api/Numbers/byte
		 * @param {number} d Type: byte, 0 to 255
		 * @return {number} Type: byte, 0 to 255
		 */
		postByDOfByte(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/Numbers/byte', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/sbyte
		 * @param {number} d Type: sbyte, -128 to 127
		 * @return {number} Type: sbyte, -128 to 127
		 */
		postByDOfSByte(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/Numbers/sbyte', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/short
		 * @param {number} d Type: short, -32,768 to 32,767
		 * @return {number} Type: short, -32,768 to 32,767
		 */
		postByDOfInt16(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/Numbers/short', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/ushort
		 * @param {number} d Type: ushort, 0 to 65,535
		 * @return {number} Type: ushort, 0 to 65,535
		 */
		postByDOfUInt16(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/Numbers/ushort', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/int
		 * @param {number} d Type: int, -2,147,483,648 to 2,147,483,647
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postByDOfInt32(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/Numbers/int', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/long
		 * @param {string} d Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		postByDOfInt64(d?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post<string>(this.baseUri + 'api/Numbers/long', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/ulong
		 * @param {string} d Type: ulong, 0 to 18,446,744,073,709,551,615
		 * @return {string} Type: ulong, 0 to 18,446,744,073,709,551,615
		 */
		postByDOfUInt64(d?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post<string>(this.baseUri + 'api/Numbers/ulong', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/bigInteger
		 * @param {string} bigInteger Type: BigInteger
		 * @return {string} Type: BigInteger
		 */
		postBigInteger(bigInteger?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post<string>(this.baseUri + 'api/Numbers/bigInteger', JSON.stringify(bigInteger), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/bigIntegralAsStringForJs
		 */
		postBigIntegralAsStringForJs(bigIntegral?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/Numbers/bigIntegralAsStringForJs', JSON.stringify(bigIntegral), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * POST api/Numbers/BigNumbers
		 */
		postBigNumbers(bigNumbers?: DemoWebApi_DemoData_Client.BigNumbers | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.BigNumbers> {
			return this.http.post<DemoWebApi_DemoData_Client.BigNumbers>(this.baseUri + 'api/Numbers/BigNumbers', JSON.stringify(bigNumbers), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/int128
		 * @param {string} int128 Type: Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727
		 * @return {string} Type: Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727
		 */
		postInt128(int128?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post<string>(this.baseUri + 'api/Numbers/int128', JSON.stringify(int128), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/int64
		 * @param {string} int64 Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		postInt64(int64?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post<string>(this.baseUri + 'api/Numbers/int64', JSON.stringify(int64), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/IntegralEntity
		 */
		postIntegralEntity(integralEntity?: DemoWebApi_DemoData_Client.IntegralEntity | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.IntegralEntity> {
			return this.http.post<DemoWebApi_DemoData_Client.IntegralEntity>(this.baseUri + 'api/Numbers/IntegralEntity', JSON.stringify(integralEntity), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/IntegralEntityMustBeValid
		 */
		postIntegralEntityMustBeValid(integralEntity?: DemoWebApi_DemoData_Client.IntegralEntity | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.IntegralEntity> {
			return this.http.post<DemoWebApi_DemoData_Client.IntegralEntity>(this.baseUri + 'api/Numbers/IntegralEntityMustBeValid', JSON.stringify(integralEntity), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/intRange
		 * @param {number} d Type: int
		 *     Range: inclusive between 1 and 100
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postIntWithRange(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/Numbers/intRange', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Range is with double, not long. Precision of double: ~15-17 digits, while long.MaxValue 9223372036854775807 has 19 decimal digits.
		 * POST api/Numbers/longRange
		 * @param {string} d Type: long
		 *     Range: inclusive between 1000 and 9223372036854775800
		 * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		postLongWithRange(d?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post<string>(this.baseUri + 'api/Numbers/longRange', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/uint128
		 * @param {string} uint128 Type: UInt128, 0 to 340282366920938463463374607431768211455
		 * @return {string} Type: UInt128, 0 to 340282366920938463463374607431768211455
		 */
		postUint128(uint128?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post<string>(this.baseUri + 'api/Numbers/uint128', JSON.stringify(uint128), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Numbers/uint64
		 * @param {string} uint64 Type: ulong, 0 to 18,446,744,073,709,551,615
		 * @return {string} Type: ulong, 0 to 18,446,744,073,709,551,615
		 */
		postUint64(uint64?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post<string>(this.baseUri + 'api/Numbers/uint64', JSON.stringify(uint64), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}
	}


	/**
	 * For testing posting and getting string data. Returned string is JSON object.
	 */
	@Injectable()
	export class StringData {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * Athlethe Search
		 * GET api/StringData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
		 * @param {number | null} take Generic optional parameter. Default 10
		 * @param {number} skip Default 0
		 * @param {string} order default null
		 */
		athletheSearch(take?: number | null, skip?: number | null, order?: string | null, sort?: string | null, search?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/StringData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * GET api/StringData/String
		 */
		getABCDE(headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/StringData/String', { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * Return empty string JSON object. Status 200.
		 * GET api/StringData/EmptyString
		 */
		getEmptyString(headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/StringData/EmptyString', { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * Return empty body with status 204 No Content, even though the default mime type is application/json. MaybeNull
		 * GET api/StringData/NullString
		 */
		getNullString(headersHandler?: () => HttpHeaders): Observable<string | null> {
			return this.http.get(this.baseUri + 'api/StringData/NullString', { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}
	}


	/**
	 * For testing different commbinations of parameters and returns
	 */
	@Injectable()
	export class SuperDemo {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * GET api/SuperDemo/ActionResult
		 */
		getActionResult(headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.get(this.baseUri + 'api/SuperDemo/ActionResult', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * GET api/SuperDemo/ActionResult2
		 */
		getActionResult2(headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.get(this.baseUri + 'api/SuperDemo/ActionResult2', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * GET api/SuperDemo/ActionStringResult
		 * Status Codes: 200:OK : System.String
		 */
		getActionStringResult(headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/SuperDemo/ActionStringResult', { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * GET api/SuperDemo/BadRequest
		 */
		getBadRequest(headersHandler?: () => HttpHeaders): Observable<HttpResponse<Blob>> {
			return this.http.get(this.baseUri + 'api/SuperDemo/BadRequest', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'blob' });
		}

		/**
		 * GET api/SuperDemo/BadRequest2
		 */
		getBadRequest2(headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.get(this.baseUri + 'api/SuperDemo/BadRequest2', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * GET api/SuperDemo/bool
		 */
		getBool(headersHandler?: () => HttpHeaders): Observable<boolean> {
			return this.http.get<boolean>(this.baseUri + 'api/SuperDemo/bool', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/byte
		 * @return {number} Type: byte, 0 to 255
		 */
		getbyte(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/byte', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/ByteArray
		 */
		getByteArray(headersHandler?: () => HttpHeaders): Observable<Array<number>> {
			return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/ByteArray', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/char
		 * @return {string} Type: char
		 */
		getChar(headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get<string>(this.baseUri + 'api/SuperDemo/char', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/Collection
		 */
		getCollection(headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/Collection', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/enumGet?d={d}
		 */
		getDay(d?: DemoWebApi_DemoData_Client.Days | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Days> {
			return this.http.get<DemoWebApi_DemoData_Client.Days>(this.baseUri + 'api/SuperDemo/enumGet?d=' + d, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/decimal
		 * @return {number} Type: decimal
		 */
		getDecimal(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/decimal', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Demo
		 * GET api/SuperDemo/decimalArrayQ?a={a}
		 */
		getDecimalArrayQ(a?: Array<number> | null, headersHandler?: () => HttpHeaders): Observable<Array<number>> {
			return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/decimalArrayQ?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/decimal/{d}
		 * @param {number} d Type: decimal
		 * @return {number} Type: decimal
		 */
		getDecimalSquare(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/decimal/' + d, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/DecimalZero
		 * @return {number} Type: decimal
		 */
		getDecimalZero(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/DecimalZero', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/StringStringDic
		 */
		getDictionary(headersHandler?: () => HttpHeaders): Observable<{[id: string]: string }> {
			return this.http.get<{[id: string]: string }>(this.baseUri + 'api/SuperDemo/StringStringDic', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/StringPersonDic
		 */
		getDictionaryOfPeople(headersHandler?: () => HttpHeaders): Observable<{[id: string]: DemoWebApi_DemoData_Client.Person }> {
			return this.http.get<{[id: string]: DemoWebApi_DemoData_Client.Person }>(this.baseUri + 'api/SuperDemo/StringPersonDic', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/StringPersonDic2
		 */
		getDictionaryOfPeople2(headersHandler?: () => HttpHeaders): Observable<{[id: string]: DemoWebApi_DemoData_Client.Person }> {
			return this.http.get<{[id: string]: DemoWebApi_DemoData_Client.Person }>(this.baseUri + 'api/SuperDemo/StringPersonDic2', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/doulbe
		 * @return {number} Type: double
		 */
		getdouble(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/doulbe', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Result of 0.1d + 0.2d - 0.3d
		 * GET api/SuperDemo/DoubleZero
		 * @return {number} Type: double
		 */
		getDoubleZero(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/DoubleZero', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Demo IEnumerable Days
		 * GET api/SuperDemo/enumArrayDays?a={a}
		 */
		getEnumArrayDays(a?: Array<DemoWebApi_DemoData_Client.Days> | null, headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_DemoData_Client.Days>> {
			return this.http.get<Array<DemoWebApi_DemoData_Client.Days>>(this.baseUri + 'api/SuperDemo/enumArrayDays?'+a?.map(z => `a=${z}`).join('&'), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/enumArrayQ2?a={a}
		 */
		getEnumArrayQ2(a?: Array<number> | null, headersHandler?: () => HttpHeaders): Observable<Array<number>> {
			return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/enumArrayQ2?'+a?.map(z => `a=${z}`).join('&'), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/FloatZero
		 * @return {number} Type: float
		 */
		getFloatZero(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/FloatZero', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/ICollection
		 */
		getICollection(headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/ICollection', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/IList
		 */
		getIList(headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IList', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/int2d
		 */
		getInt2D(headersHandler?: () => HttpHeaders): Observable<number[][]> {
			return this.http.get<number[][]>(this.baseUri + 'api/SuperDemo/int2d', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/int2dJagged
		 */
		getInt2DJagged(headersHandler?: () => HttpHeaders): Observable<Array<Array<number>>> {
			return this.http.get<Array<Array<number>>>(this.baseUri + 'api/SuperDemo/int2dJagged', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/intArray
		 */
		getIntArray(headersHandler?: () => HttpHeaders): Observable<Array<number>> {
			return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/intArray', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Demo int[];
		 * GET api/SuperDemo/intArrayQ?a={a}
		 */
		getIntArrayQ(a?: Array<number> | null, headersHandler?: () => HttpHeaders): Observable<Array<number>> {
			return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/intArrayQ?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Demo IEnumerable long
		 * GET api/SuperDemo/intArrayQ2?a={a}
		 */
		getIntArrayQ2(a?: Array<string> | null, headersHandler?: () => HttpHeaders): Observable<Array<string>> {
			return this.http.get<Array<string>>(this.baseUri + 'api/SuperDemo/intArrayQ2?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/int/{d}
		 * @param {number} d Type: int, -2,147,483,648 to 2,147,483,647
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getIntSquare(d?: number | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/int/' + d, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/IReadOnlyCollection
		 */
		getIReadOnlyCollection(headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/IReadOnlyList
		 */
		getIReadOnlyList(headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IReadOnlyList', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/KeyValuePair
		 */
		getKeyhValuePair(headersHandler?: () => HttpHeaders): Observable<{key: string, value: DemoWebApi_DemoData_Client.Person }> {
			return this.http.get<{key: string, value: DemoWebApi_DemoData_Client.Person }>(this.baseUri + 'api/SuperDemo/KeyValuePair', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/List
		 */
		getList(headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/List', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * False to return null, and true to return 1000
		 * GET api/SuperDemo/NullableDecimal/{hasValue}
		 */
		getNullableDecimal(hasValue?: boolean | null, headersHandler?: () => HttpHeaders): Observable<number | null> {
			return this.http.get<number | null>(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * MaybeNull
		 * GET api/SuperDemo/NullObject
		 */
		getNullPerson(headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person | null> {
			return this.http.get<DemoWebApi_DemoData_Client.Person | null>(this.baseUri + 'api/SuperDemo/NullObject', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
		 */
		getPrimitiveNullable(location?: string | null, dd?: number | null, de?: number | null, headersHandler?: () => HttpHeaders): Observable<{item1: string, item2: number | null, item3: number | null}> {
			return this.http.get<{item1: string, item2: number | null, item3: number | null}>(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + (!location ? '' : encodeURIComponent(location)) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
		 */
		getPrimitiveNullable2(dd?: number | null, de?: number | null, headersHandler?: () => HttpHeaders): Observable<{item1: number | null, item2: number | null}> {
			return this.http.get<{item1: number | null, item2: number | null}>(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/sbyte
		 * @return {number} Type: sbyte, -128 to 127
		 */
		getsbyte(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/sbyte', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/short
		 * @return {number} Type: short, -32,768 to 32,767
		 */
		getShort(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/short', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Demo string array
		 * GET api/SuperDemo/stringArrayQ?a={a}
		 */
		getStringArrayQ(a?: Array<string> | null, headersHandler?: () => HttpHeaders): Observable<Array<string>> {
			return this.http.get<Array<string>>(this.baseUri + 'api/SuperDemo/stringArrayQ?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Demo List string
		 * GET api/SuperDemo/stringArrayQ2?a={a}
		 */
		getStringArrayQ2(a?: Array<string> | null, headersHandler?: () => HttpHeaders): Observable<Array<string>> {
			return this.http.get<Array<string>>(this.baseUri + 'api/SuperDemo/stringArrayQ2?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * ActionResult with FileStreamResult
		 * GET api/SuperDemo/TextStream
		 */
		getTextStream(headersHandler?: () => HttpHeaders): Observable<HttpResponse<Blob>> {
			return this.http.get(this.baseUri + 'api/SuperDemo/TextStream', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'blob' });
		}

		/**
		 * GET api/SuperDemo/uint
		 * @return {number} Type: uint, 0 to 4,294,967,295
		 */
		getUint(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/uint', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/ulong
		 * @return {string} Type: ulong, 0 to 18,446,744,073,709,551,615
		 */
		getulong(headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get<string>(this.baseUri + 'api/SuperDemo/ulong', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SuperDemo/ushort
		 * @return {number} Type: ushort, 0 to 65,535
		 */
		getUShort(headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.get<number>(this.baseUri + 'api/SuperDemo/ushort', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * POST api/SuperDemo/ActionResult
		 */
		postActionResult(headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'api/SuperDemo/ActionResult', null, { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * POST api/SuperDemo/PostActionResult2
		 */
		postActionResult2(s?: string | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<Blob>> {
			return this.http.post(this.baseUri + 'api/SuperDemo/PostActionResult2', JSON.stringify(s), { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'blob' });
		}

		/**
		 * POST api/SuperDemo/PostActionResult3
		 */
		postActionResult3(person?: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'api/SuperDemo/PostActionResult3', JSON.stringify(person), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Post a collection of person
		 * POST api/SuperDemo/Collection
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postCollection(list?: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/SuperDemo/enumPost?d={d}
		 */
		postDay(d?: DemoWebApi_DemoData_Client.Days | null, d2?: DemoWebApi_DemoData_Client.Days | null, headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_DemoData_Client.Days>> {
			return this.http.post<Array<DemoWebApi_DemoData_Client.Days>>(this.baseUri + 'api/SuperDemo/enumPost?d=' + d, JSON.stringify(d2), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Demo Dic string and person
		 * POST api/SuperDemo/StringPersonDic
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postDictionary(dic?: {[id: string]: DemoWebApi_DemoData_Client.Person } | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/SuperDemo/Guids
		 */
		postGuids(guids?: Array<string> | null, headersHandler?: () => HttpHeaders): Observable<Array<string>> {
			return this.http.post<Array<string>>(this.baseUri + 'api/SuperDemo/Guids', JSON.stringify(guids), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Post ICollection of person
		 * POST api/SuperDemo/ICollection
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postICollection(list?: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Post IList of person
		 * POST api/SuperDemo/IList
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postIList(list?: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/SuperDemo/int2d
		 */
		postInt2D(a?: number[][] | null, headersHandler?: () => HttpHeaders): Observable<boolean> {
			return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Demo int[][]
		 * POST api/SuperDemo/int2djagged
		 */
		postInt2DJagged(a?: Array<Array<number>> | null, headersHandler?: () => HttpHeaders): Observable<boolean> {
			return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Demo int[]
		 * POST api/SuperDemo/intArray
		 * @param {Array<number>} a Min length: 1
		 *     Max length: 10
		 */
		postIntArray(a?: Array<number> | null, headersHandler?: () => HttpHeaders): Observable<boolean> {
			return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Post IReadOnlyCollection of person
		 * POST api/SuperDemo/IReadOnlyCollection
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postIReadOnlyCollection(list?: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Post e of person
		 * POST api/SuperDemo/IReadOnlyList
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postIReadOnlyList(list?: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Post a list of person
		 * POST api/SuperDemo/List
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postList(list?: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/SuperDemo/PostEmpty/{i}
		 * @param {number} i Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postWithQueryButEmptyBody(s?: string | null, i?: number | null, headersHandler?: () => HttpHeaders): Observable<{item1: string, item2: number}> {
			return this.http.post<{item1: string, item2: number}>(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, JSON.stringify(s), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}
	}


	/**
	 * For testing posting and getting string data. String returned is text/plain by default
	 */
	@Injectable()
	export class TextData {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * GET api/TextData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
		 * @param {number} skip Type: int, -2,147,483,648 to 2,147,483,647
		 */
		athletheSearch(take?: number | null, skip?: number | null, order?: string | null, sort?: string | null, search?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/TextData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * GET api/TextData/String
		 */
		getABCDE(headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/TextData/String', { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * Return empty body with status 200.
		 * GET api/TextData/EmptyString
		 */
		getEmptyString(headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/TextData/EmptyString', { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * MaybeNull
		 * GET api/TextData/NullableString
		 */
		getNullableString(headersHandler?: () => HttpHeaders): Observable<string | null> {
			return this.http.get(this.baseUri + 'api/TextData/NullableString', { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * Return empty body with status 204 No Content.
		 * GET api/TextData/NullString
		 */
		getNullString(headersHandler?: () => HttpHeaders): Observable<string | null> {
			return this.http.get(this.baseUri + 'api/TextData/NullString', { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}
	}


	/**
	 * https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.3.3
	 */
	@Injectable()
	export class Tuple {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * Update in a transaction
		 * PUT api/Tuple/A1TupleArray
		 */
		a1TupleArray(idAndOrderArray?: Array<{item1: string, item2: number}> | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.put(this.baseUri + 'api/Tuple/A1TupleArray', JSON.stringify(idAndOrderArray), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Update IEnumerable Tuple in a transaction
		 * PUT api/Tuple/A2TupleArray
		 */
		a2TupleIEnumerable(idAndOrderArray?: Array<{item1: string, item2: number}> | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.put(this.baseUri + 'api/Tuple/A2TupleArray', JSON.stringify(idAndOrderArray), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Post tuple
		 * POST api/Tuple/ChangeName
		 */
		changeName(d?: {item1: string, item2: DemoWebApi_DemoData_Client.Person} | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/ChangeName', JSON.stringify(d), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Get Tuple in return. MaybeNull
		 * GET api/Tuple/PeopleCompany4
		 */
		getPeopleCompany4(headersHandler?: () => HttpHeaders): Observable<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company} | null> {
			return this.http.get<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company} | null>(this.baseUri + 'api/Tuple/PeopleCompany4', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * MaybeNull
		 * GET api/Tuple/PeopleCompany5
		 */
		getPeopleCompany5(headersHandler?: () => HttpHeaders): Observable<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company} | null> {
			return this.http.get<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company} | null>(this.baseUri + 'api/Tuple/PeopleCompany5', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Tuple/Tuple1
		 */
		getTuple1(headersHandler?: () => HttpHeaders): Observable<{item1: number}> {
			return this.http.get<{item1: number}>(this.baseUri + 'api/Tuple/Tuple1', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Tuple/Tuple2
		 */
		getTuple2(headersHandler?: () => HttpHeaders): Observable<{item1: string, item2: number}> {
			return this.http.get<{item1: string, item2: number}>(this.baseUri + 'api/Tuple/Tuple2', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Tuple/Tuple3
		 */
		getTuple3(headersHandler?: () => HttpHeaders): Observable<{item1: string, item2: string, item3: number}> {
			return this.http.get<{item1: string, item2: string, item3: number}>(this.baseUri + 'api/Tuple/Tuple3', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Tuple/Tuple4
		 */
		getTuple4(headersHandler?: () => HttpHeaders): Observable<{item1: string, item2: string, item3: string, item4: number}> {
			return this.http.get<{item1: string, item2: string, item3: string, item4: number}>(this.baseUri + 'api/Tuple/Tuple4', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Tuple/Tuple5
		 */
		getTuple5(headersHandler?: () => HttpHeaders): Observable<{item1: string, item2: string, item3: string, item4: string, item5: number}> {
			return this.http.get<{item1: string, item2: string, item3: string, item4: string, item5: number}>(this.baseUri + 'api/Tuple/Tuple5', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Tuple/Tuple6
		 */
		getTuple6(headersHandler?: () => HttpHeaders): Observable<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}> {
			return this.http.get<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}>(this.baseUri + 'api/Tuple/Tuple6', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Tuple/Tuple7
		 */
		getTuple7(headersHandler?: () => HttpHeaders): Observable<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number}> {
			return this.http.get<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number}>(this.baseUri + 'api/Tuple/Tuple7', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Post nested tuple
		 * GET api/Tuple/Tuple8
		 */
		getTuple8(headersHandler?: () => HttpHeaders): Observable<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}> {
			return this.http.get<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}>(this.baseUri + 'api/Tuple/Tuple8', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * POST api/Tuple/PeopleCompany2
		 */
		linkPeopleCompany2(peopleAndCompany?: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Tuple/PeopleCompany3
		 */
		linkPeopleCompany3(peopleAndCompany?: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Tuple/PeopleCompany4
		 */
		linkPeopleCompany4(peopleAndCompany?: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Tuple/PeopleCompany5
		 */
		linkPeopleCompany5(peopleAndCompany?: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Tuple/PeopleCompany6
		 */
		linkPeopleCompany6(peopleAndCompany?: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Post long tuple
		 * POST api/Tuple/PeopleCompany7
		 */
		linkPeopleCompany7(peopleAndCompany?: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Tuple/PeopleCompany8
		 */
		linkPeopleCompany8(peopleAndCompany?: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Tuple/PersonCompany1
		 */
		linkPersonCompany1(peopleAndCompany?: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => HttpHeaders): Observable<DemoWebApi_DemoData_Client.Person> {
			return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * POST api/Tuple/Tuple1
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postTuple1(tuple?: {item1: number} | null, headersHandler?: () => HttpHeaders): Observable<number> {
			return this.http.post<number>(this.baseUri + 'api/Tuple/Tuple1', JSON.stringify(tuple), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Post tuple string int
		 * POST api/Tuple/Tuple2
		 */
		postTuple2(tuple?: {item1: string, item2: number} | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/Tuple/Tuple2', JSON.stringify(tuple), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * POST api/Tuple/Tuple3
		 */
		postTuple3(tuple?: {item1: string, item2: string, item3: number} | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/Tuple/Tuple3', JSON.stringify(tuple), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * POST api/Tuple/Tuple4
		 */
		postTuple4(tuple?: {item1: string, item2: string, item3: string, item4: number} | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/Tuple/Tuple4', JSON.stringify(tuple), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * POST api/Tuple/Tuple5
		 */
		postTuple5(tuple?: {item1: string, item2: string, item3: string, item4: string, item5: number} | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/Tuple/Tuple5', JSON.stringify(tuple), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * POST api/Tuple/Tuple6
		 */
		postTuple6(tuple?: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number} | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/Tuple/Tuple6', JSON.stringify(tuple), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * POST api/Tuple/Tuple7
		 */
		postTuple7(tuple?: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number} | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/Tuple/Tuple7', JSON.stringify(tuple), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * POST api/Tuple/Tuple8
		 */
		postTuple8(tuple?: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: {item1: string, item2: string, item3: string}} | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/Tuple/Tuple8', JSON.stringify(tuple), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}
	}

	@Injectable()
	export class Values {
		constructor(@Inject('baseUri') private baseUri: string = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * DELETE api/Values/{id}
		 * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
		 */
		delete(id?: number | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.delete(this.baseUri + 'api/Values/' + id, { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * Get a list of value
		 * GET api/Values
		 */
		get(headersHandler?: () => HttpHeaders): Observable<Array<string>> {
			return this.http.get<Array<string>>(this.baseUri + 'api/Values', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Get by both Id and name
		 * GET api/Values/{id}?name={name}
		 * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getByIdOfInt32AndNameOfString(id?: number | null, name?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/Values/' + id + '?name=' + (!name ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * Get by name
		 * GET api/Values?name={name}
		 */
		getByNameOfString(name?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/Values?name=' + (!name ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * Get by Id
		 * GET api/Values/{id}
		 * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getByIdOfInt32(id?: number | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/Values/' + id, { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * Get a list of value async, it is get2
		 * GET api/Values/Get2
		 */
		get2(headersHandler?: () => HttpHeaders): Observable<Array<string>> {
			return this.http.get<Array<string>>(this.baseUri + 'api/Values/Get2', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * POST api/Values
		 */
		post(value?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.post(this.baseUri + 'api/Values', JSON.stringify(value), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),  responseType: 'text' });
		}

		/**
		 * Update with valjue
		 * PUT api/Values/{id}
		 * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
		 */
		put(id?: number | null, value?: string | null, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.put(this.baseUri + 'api/Values/' + id, JSON.stringify(value), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}
	}

}

