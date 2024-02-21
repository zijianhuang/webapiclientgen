///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="HttpClient.ts" />
namespace DemoWebApi_DemoData_Client {
	export interface Address {
		city?: string | null;
		country?: string | null;

		/** GUID */
		id?: string | null;
		postalCode?: string | null;
		state?: string | null;
		street1?: string | null;
		street2?: string | null;
		type?: DemoWebApi_DemoData_Client.AddressType | null;

		/**
		 * It is a field
		 */
		location?: DemoWebApi_DemoData_Another_Client.MyPoint;
	}

	export enum AddressType { Postal, Residential }


	/**  */
	export interface BigNumbers {

		/** BigInteger */
		bigInt?: string | null;

		/** Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727 */
		signed128?: string | null;

		/** long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 */
		signed64?: string | null;

		/** UInt128, 0 to 340282366920938463463374607431768211455 */
		unsigned128?: string | null;

		/** ulong, 0 to 18,446,744,073,709,551,615 */
		unsigned64?: string | null;
	}

	export interface Company extends DemoWebApi_DemoData_Base_Client.Entity {

		/**
		 * BusinessNumber to be serialized as BusinessNum
		 */
		BusinessNum?: string | null;
		businessNumberType?: string | null;
		foundDate?: Date | null;

		/** DateOnly */
		registerDate?: Date | null;
		textMatrix?: Array<Array<string>>;
		int2D?: number[][];
		int2DJagged?: Array<Array<number>>;
		lines?: Array<string>;
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

		/** GUID */
		id?: string | null;

		/** GUID */
		idNotEmitDefaultValue?: string | null;
		nullableId?: string | null;
		requiredName: string;
		text?: string | null;
	}

	export interface IntegralEntity extends DemoWebApi_DemoData_Base_Client.Entity {

		/** byte, 0 to 255 */
		byte?: number | null;

		/** int, -2,147,483,648 to 2,147,483,647 */
		int?: number | null;

		/** int, -2,147,483,648 to 2,147,483,647 */
		itemCount?: number | null;

		/** sbyte, -128 to 127 */
		sByte?: number | null;

		/** short, -32,768 to 32,767 */
		short?: number | null;

		/** uint, 0 to 4,294,967,295 */
		uInt?: number | null;

		/** ushort, 0 to 65,535 */
		uShort?: number | null;
	}

	export enum MedicalContraindiationResponseTypeReason { M = "Mm", S = "Ss", P = "Pp", I = "I", A = "A" }

	export enum MedicalContraindiationResponseTypeTypeCode { P = "P", T = "Tt" }

	export interface MimsPackage {

		/** int, -2,147,483,648 to 2,147,483,647 */
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

	export interface Person extends DemoWebApi_DemoData_Base_Client.Entity {
		baptised?: Date | null;

		/**
		 * Date of Birth.
		 * This is optional.
		 */
		dob?: Date | null;
		givenName?: string | null;
		surname?: string | null;
	}

	export interface PhoneNumber {
		fullNumber?: string | null;
		phoneType?: DemoWebApi_DemoData_Client.PhoneType | null;
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

namespace DemoWebApi_DemoData_Another_Client {

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

}

namespace DemoWebApi_DemoData_Base_Client {

	/**
	 * Base class of company and person
	 */
	export interface Entity {

		/**
		 * Multiple addresses
		 */
		addresses?: Array<DemoWebApi_DemoData_Client.Address>;
		emailAddress?: string | null;
		id?: string | null;

		/**
		 * Name of the entity.
		 */
		name: string;
		phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;

		/** Uri */
		web?: string | null;
	}

}

namespace DemoWebApi_Models_Client {
	export interface AddExternalLoginBindingModel {
		externalAccessToken?: string | null;
	}

	export interface ChangePasswordBindingModel {
		confirmPassword?: string | null;
		newPassword?: string | null;
		OldPwd: string;
	}

	export interface RegisterBindingModel {
		confirmPassword?: string | null;
		email?: string | null;
		password?: string | null;
	}

	export interface RegisterExternalBindingModel {
		email?: string | null;
	}

	export interface RemoveLoginBindingModel {
		loginProvider?: string | null;
		providerKey?: string | null;
	}

	export interface SetPasswordBindingModel {
		confirmPassword?: string | null;
		newPassword?: string | null;
	}


	/**
	 * Auth token
	 */
	export interface TokenResponseModel {
		access_token?: string | null;
		expires?: string | null;

		/** int, -2,147,483,648 to 2,147,483,647 */
		expires_in?: number | null;
		issued?: string | null;
		token_type?: string | null;
		username?: string | null;
	}

}

namespace DemoWebApi_Controllers_Client {

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
	 * Complex hero type
	 */
	export interface Hero {
		address?: DemoWebApi_DemoData_Client.Address;
		death?: Date | null;

		/** DateOnly */
		dob?: Date | null;
		emailAddress?: string | null;

		/** long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 */
		id?: string | null;
		name?: string | null;
		phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;
		webAddress?: string | null;
	}

	export interface SuperHero extends DemoWebApi_Controllers_Client.Hero {
		super?: boolean | null;
	}

}

namespace DemoCoreWeb_Controllers_Client {
	export class SpecialTypes {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * Anonymous Dynamic of C#
		 * GET api/SpecialTypes/AnonymousDynamic
		 * @return {any} dyanmic things
		 */
		getAnonymousDynamic(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Async function returing dynamic
		 * GET api/SpecialTypes/AnonymousDynamic2
		 */
		getAnonymousDynamic2(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic2', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SpecialTypes/AnonymousObject
		 */
		getAnonymousObject(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousObject', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Async function returning object
		 * GET api/SpecialTypes/AnonymousObject2
		 */
		getAnonymousObject2(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousObject2', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * POST api/SpecialTypes/AnonymousObject
		 */
		postAnonymousObject(obj: any, callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SpecialTypes/AnonymousObject', obj, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Async returning object, Post dynamic
		 * POST api/SpecialTypes/AnonymousObject2
		 */
		postAnonymousObject2(obj: any, callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SpecialTypes/AnonymousObject2', obj, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}
	}

}

namespace DemoWebApi_Controllers_Client {
	export class DateTypes {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * GET api/DateTypes/GetDateOnlyMin
		 * @return {Date} DateOnly
		 */
		getDateOnlyMin(callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/GetDateOnlyMin', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/DateTypes/NullableDatetime/{hasValue}
		 */
		getDateTime(hasValue: boolean | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/NullableDatetime/' + hasValue, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * return DateTimeOffset.Now
		 * GET api/DateTypes/ForDateTimeOffset
		 */
		getDateTimeOffset(callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/ForDateTimeOffset', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/DateTypes/NextHour/{dt}
		 */
		getNextHour(dt: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/NextHour/' + dt?.toISOString(), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * If Dt is not defined, add a hour from now
		 * GET api/DateTypes/NextHourNullable?n={n}&dt={dt}
		 * @param {number} n int, -2,147,483,648 to 2,147,483,647
		 */
		getNextHourNullable(n: number | null, dt: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/NextHourNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/DateTypes/NextYear/{dt}
		 */
		getNextYear(dt: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/NextYear/' + dt?.toISOString(), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * If Dt is not defined, add a year from now
		 * GET api/DateTypes/NextYearNullable?n={n}&dt={dt}
		 * @param {number} n int, -2,147,483,648 to 2,147,483,647
		 */
		getNextYearNullable(n: number | null, dt: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/NextYearNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Client should send DateTime.Date
		 * POST api/DateTypes/IsDateTimeDate
		 */
		isDateTimeDate(dt: Date | null, callback: (data : {item1: Date, item2: Date}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/IsDateTimeDate', dt, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/DateTypes/IsDateTimeOffsetDate
		 */
		isDateTimeOffsetDate(dt: Date | null, callback: (data : {item1: Date, item2: Date}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/IsDateTimeOffsetDate', dt, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/DateTypes/ForDateOnly
		 * @param {Date} d DateOnly
		 * @return {Date} DateOnly
		 */
		postDateOnly(d: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateOnly', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/DateTypes/DateOnlyNullable
		 */
		postDateOnlyNullable(d: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/DateOnlyNullable', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/DateTypes/ForDateTime
		 */
		postDateTime(d: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTime', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * return d;
		 * POST api/DateTypes/ForDateTimeOffset
		 */
		postDateTimeOffset(d: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTimeOffset', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * return d.ToString("O")
		 * POST api/DateTypes/ForDateTimeOffsetForO
		 */
		postDateTimeOffsetForO(d: Date | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetForO', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/DateTypes/ForDateTimeOffsetForOffset
		 */
		postDateTimeOffsetForOffset(d: Date | null, callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetForOffset', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Returned is DateTimeOffset?
		 * POST api/DateTypes/DateTimeOffsetNullable
		 */
		postDateTimeOffsetNullable(d: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/DateTimeOffsetNullable', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/DateTypes/ForDateTimeOffsetStringForOffset
		 */
		postDateTimeOffsetStringForOffset(s: string | null, callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetStringForOffset', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/DateTypes/NextYear
		 */
		postNextYear(dt: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/DateTypes/NextYear', dt, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * GET api/DateTypes/DateOnlyStringQuery?d={d}
		 * @return {Date} DateOnly
		 */
		queryDateOnlyAsString(d: string | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/DateOnlyStringQuery?d=' + (!d ? '' : encodeURIComponent(d)), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/DateTypes/RouteDateTimeOffset/{d}
		 */
		routeDateTimeOffset(d: Date | null, callback: (data : Date) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/RouteDateTimeOffset/' + d?.toISOString(), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Return Tuple DateTime?, DateTime?
		 * GET api/DateTypes/SearchDateRange?startDate={startDate}&endDate={endDate}
		 * @param {Date} startDate DateTime? startDate = null
		 * @param {Date} endDate DateTime? endDate = null
		 */
		searchDateRange(startDate: Date | null, endDate: Date | null, callback: (data : {item1: Date, item2: Date}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/DateTypes/SearchDateRange?' + (startDate ? 'startDate=' + startDate?.toISOString() : '') + (endDate ? '&endDate=' + endDate?.toISOString() : ''), callback, this.error, this.statusCode, headersHandler);
		}
	}

	export class Entities {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * POST api/Entities/createCompany
		 */
		createCompany(p: DemoWebApi_DemoData_Client.Company | null, callback: (data : DemoWebApi_DemoData_Client.Company) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Entities/createCompany', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Entities/createPerson
		 * @return {string} long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		createPerson(p: DemoWebApi_DemoData_Client.Person | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Entities/createPerson', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Entities/createPerson2
		 */
		createPerson2(p: DemoWebApi_DemoData_Client.Person | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Entities/createPerson2', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Entities/createPerson3
		 */
		createPerson3(p: DemoWebApi_DemoData_Client.Person | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Entities/createPerson3', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * DELETE api/Entities/{id}
		 * @param {string} id long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		delete(id: string | null, callback: (data : void) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.delete(this.baseUri + 'api/Entities/' + id, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Entities/Company/{id}
		 * @param {string} id long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getCompany(id: string | null, callback: (data : DemoWebApi_DemoData_Client.Company) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Entities/Company/' + id, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * POST api/Entities/Mims
		 */
		getMims(p: DemoWebApi_DemoData_Client.MimsPackage | null, callback: (data : DemoWebApi_DemoData_Client.MimsResult<string>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Entities/Mims', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post MyGeneric string, decimal, double
		 * POST api/Entities/MyGeneric
		 */
		getMyGeneric(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, number> | null, callback: (data : DemoWebApi_DemoData_Client.MyGeneric<string, number, number>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Entities/MyGeneric', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post MyGeneric string, decimal, Person
		 * POST api/Entities/MyGenericPerson
		 */
		getMyGenericPerson(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person> | null, callback: (data : DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Entities/MyGenericPerson', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Return empty body, status 204. MaybeNull
		 * GET api/Entities/NullCompany
		 */
		getNullCompany(callback: (data : DemoWebApi_DemoData_Client.Company) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Entities/NullCompany', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Get a person
		 * so to know the person
		 * GET api/Entities/getPerson/{id}
		 * @param {string} id unique id of that guy
		 * @return {DemoWebApi_DemoData_Client.Person} person in db
		 */
		getPerson(id: string | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Entities/getPerson/' + id, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Entities/getPerson2/{id}
		 * @param {string} id long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getPerson2(id: string | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Entities/getPerson2/' + id, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * PUT api/Entities/link?id={id}&relationship={relationship}
		 * @param {string} id long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		linkPerson(id: string | null, relationship: string | null, person: DemoWebApi_DemoData_Client.Person | null, callback: (data : boolean) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.put(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + (!relationship ? '' : encodeURIComponent(relationship)), person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * PATCH api/Entities/patchPerson
		 */
		patchPerson(person: DemoWebApi_DemoData_Client.Person | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.patch(this.baseUri + 'api/Entities/patchPerson', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Entities/IdMap
		 */
		postIdMap(idMap: DemoWebApi_DemoData_Client.IdMap | null, callback: (data : DemoWebApi_DemoData_Client.IdMap) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Entities/IdMap', idMap, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * PUT api/Entities/updatePerson
		 */
		updatePerson(person: DemoWebApi_DemoData_Client.Person | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.put(this.baseUri + 'api/Entities/updatePerson', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}
	}

	export class Heroes {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * DELETE api/Heroes/{id}
		 * @param {string} id long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		delete(id: string | null, callback: (data : void) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.delete(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Heroes/asyncHeroes
		 */
		getAsyncHeroes(callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Heroes/asyncHeroes', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Get a hero. Nullable reference. MaybeNull
		 * GET api/Heroes/{id}
		 * @param {string} id long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getHero(id: string | null, callback: (data : DemoWebApi_Controllers_Client.Hero) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Get all heroes.
		 * GET api/Heroes
		 */
		getHeros(callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Heroes', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * MaybeNull
		 * GET api/Heroes/super?id={id}
		 * @param {string} id long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getSuperHero(id: string | null, callback: (data : DemoWebApi_Controllers_Client.SuperHero) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Heroes/super?id=' + id, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * POST api/Heroes
		 */
		post(name: string | null, callback: (data : DemoWebApi_Controllers_Client.Hero) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Heroes', name, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Add a hero. The client will not expect null. NotNull
		 * POST api/Heroes/q?name={name}
		 * @param {string} name name of hero
		 * @return {DemoWebApi_Controllers_Client.Hero} Always object.
		 */
		postWithQuery(name: string | null, callback: (data : DemoWebApi_Controllers_Client.Hero) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Heroes/q?name=' + (!name ? '' : encodeURIComponent(name)), null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Update hero.
		 * PUT api/Heroes
		 */
		put(hero: DemoWebApi_Controllers_Client.Hero | null, callback: (data : DemoWebApi_Controllers_Client.Hero) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.put(this.baseUri + 'api/Heroes', hero, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Search heroes
		 * GET api/Heroes/search/{name}
		 * @param {string} name keyword contained in hero name.
		 * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
		 */
		search(name: string | null, callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Heroes/search/' + (!name ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode, headersHandler);
		}
	}

	export class Numbers {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * POST api/Numbers/byte
		 * @param {number} d byte, 0 to 255
		 * @return {number} byte, 0 to 255
		 */
		postByDOfByte(d: number | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/byte', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/sbyte
		 * @param {number} d sbyte, -128 to 127
		 * @return {number} sbyte, -128 to 127
		 */
		postByDOfSByte(d: number | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/sbyte', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/short
		 * @param {number} d short, -32,768 to 32,767
		 * @return {number} short, -32,768 to 32,767
		 */
		postByDOfInt16(d: number | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/short', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/ushort
		 * @param {number} d ushort, 0 to 65,535
		 * @return {number} ushort, 0 to 65,535
		 */
		postByDOfUInt16(d: number | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/ushort', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/int
		 * @param {number} d int, -2,147,483,648 to 2,147,483,647
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		postByDOfInt32(d: number | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/int', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/long
		 * @param {string} d long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 * @return {string} long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		postByDOfInt64(d: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/long', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/ulong
		 * @param {string} d ulong, 0 to 18,446,744,073,709,551,615
		 * @return {string} ulong, 0 to 18,446,744,073,709,551,615
		 */
		postByDOfUInt64(d: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/ulong', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/bigInteger
		 * @param {string} bigInteger BigInteger
		 * @return {string} BigInteger
		 */
		postBigInteger(bigInteger: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/bigInteger', bigInteger, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/bigIntegralAsStringForJs
		 */
		postBigIntegralAsStringForJs(bigIntegral: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/bigIntegralAsStringForJs', bigIntegral, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/BigNumbers
		 */
		postBigNumbers(bigNumbers: DemoWebApi_DemoData_Client.BigNumbers | null, callback: (data : DemoWebApi_DemoData_Client.BigNumbers) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/BigNumbers', bigNumbers, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/int128
		 * @param {string} int128 Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727
		 * @return {string} Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727
		 */
		postInt128(int128: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/int128', int128, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/int64
		 * @param {string} int64 long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 * @return {string} long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		postInt64(int64: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/int64', int64, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/uint128
		 * @param {string} uint128 UInt128, 0 to 340282366920938463463374607431768211455
		 * @return {string} UInt128, 0 to 340282366920938463463374607431768211455
		 */
		postUint128(uint128: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/uint128', uint128, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Numbers/uint64
		 * @param {string} uint64 ulong, 0 to 18,446,744,073,709,551,615
		 * @return {string} ulong, 0 to 18,446,744,073,709,551,615
		 */
		postUint64(uint64: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Numbers/uint64', uint64, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}
	}

	export class StringData {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * Athlethe Search
		 * GET api/StringData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
		 * @param {number} take Generic optional parameter. Default 10
		 * @param {number} skip Default 0
		 * @param {string} order default null
		 */
		athletheSearch(take: number | null, skip: number | null, order: string | null, sort: string | null, search: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/StringData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/StringData/String
		 */
		getABCDE(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/StringData/String', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Return empty string JSON object. Status 200.
		 * GET api/StringData/EmptyString
		 */
		getEmptyString(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/StringData/EmptyString', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Return empty body with status 204 No Content, even though the default mime type is application/json. MaybeNull
		 * GET api/StringData/NullString
		 */
		getNullString(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/StringData/NullString', callback, this.error, this.statusCode, headersHandler);
		}
	}

	export class SuperDemo {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * GET api/SuperDemo/ActionResult
		 */
		getActionResult(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/ActionResult2
		 */
		getActionResult2(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult2', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/ActionStringResult
		 */
		getActionStringResult(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionStringResult', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/BadRequest
		 */
		getBadRequest(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/BadRequest', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/BadRequest2
		 */
		getBadRequest2(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/BadRequest2', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/bool
		 */
		getBool(callback: (data : boolean) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/bool', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/byte
		 * @return {number} byte, 0 to 255
		 */
		getbyte(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/byte', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/ByteArray
		 */
		getByteArray(callback: (data : Array<number>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/ByteArray', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/char
		 * @return {string} char
		 */
		getChar(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/char', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/Collection
		 */
		getCollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/Collection', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/enumGet?d={d}
		 */
		getDay(d: DemoWebApi_DemoData_Client.Days | null, callback: (data : DemoWebApi_DemoData_Client.Days) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/enumGet?d=' + d, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/decimal
		 * @return {number} decimal
		 */
		getDecimal(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Demo
		 * GET api/SuperDemo/decimalArrayQ?a={a}
		 */
		getDecimalArrayQ(a: Array<number> | null, callback: (data : Array<number>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/decimalArrayQ?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/decimal/{d}
		 * @param {number} d decimal
		 * @return {number} decimal
		 */
		getDecimalSquare(d: number | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal/' + d, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/DecimalZero
		 * @return {number} decimal
		 */
		getDecimalZero(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/DecimalZero', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/StringStringDic
		 */
		getDictionary(callback: (data : {[id: string]: string }) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/StringStringDic', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/StringPersonDic
		 */
		getDictionaryOfPeople(callback: (data : {[id: string]: DemoWebApi_DemoData_Client.Person }) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/StringPersonDic2
		 */
		getDictionaryOfPeople2(callback: (data : {[id: string]: DemoWebApi_DemoData_Client.Person }) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic2', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/doulbe
		 * @return {number} double
		 */
		getdouble(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/doulbe', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Result of 0.1d + 0.2d - 0.3d
		 * GET api/SuperDemo/DoubleZero
		 * @return {number} double
		 */
		getDoubleZero(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleZero', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Demo IEnumerable Days
		 * GET api/SuperDemo/enumArrayDays?a={a}
		 */
		getEnumArrayDays(a: Array<DemoWebApi_DemoData_Client.Days> | null, callback: (data : Array<DemoWebApi_DemoData_Client.Days>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/enumArrayDays?'+a?.map(z => `a=${z}`).join('&'), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/enumArrayQ2?a={a}
		 */
		getEnumArrayQ2(a: Array<number> | null, callback: (data : Array<number>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/enumArrayQ2?'+a?.map(z => `a=${z}`).join('&'), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/FloatZero
		 * @return {number} float
		 */
		getFloatZero(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/FloatZero', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/ICollection
		 */
		getICollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/ICollection', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/IList
		 */
		getIList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/IList', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/int2d
		 */
		getInt2D(callback: (data : number[][]) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/int2d', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/int2dJagged
		 */
		getInt2DJagged(callback: (data : Array<Array<number>>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/int2dJagged', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/intArray
		 */
		getIntArray(callback: (data : Array<number>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/intArray', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Demo int[];
		 * GET api/SuperDemo/intArrayQ?a={a}
		 */
		getIntArrayQ(a: Array<number> | null, callback: (data : Array<number>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/intArrayQ?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Demo IEnumerable long
		 * GET api/SuperDemo/intArrayQ2?a={a}
		 */
		getIntArrayQ2(a: Array<string> | null, callback: (data : Array<string>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/intArrayQ2?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/int/{d}
		 * @param {number} d int, -2,147,483,648 to 2,147,483,647
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		getIntSquare(d: number | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/int/' + d, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/IReadOnlyCollection
		 */
		getIReadOnlyCollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/IReadOnlyList
		 */
		getIReadOnlyList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyList', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/KeyValuePair
		 */
		getKeyhValuePair(callback: (data : {key: string, value: DemoWebApi_DemoData_Client.Person }) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/KeyValuePair', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/List
		 */
		getList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/List', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/NullableDecimal/{hasValue}
		 */
		getNullableDecimal(hasValue: boolean | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * MaybeNull
		 * GET api/SuperDemo/NullObject
		 */
		getNullPerson(callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/NullObject', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
		 */
		getPrimitiveNullable(location: string | null, dd: number | null, de: number | null, callback: (data : {item1: string, item2: number, item3: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + (!location ? '' : encodeURIComponent(location)) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
		 */
		getPrimitiveNullable2(dd: number | null, de: number | null, callback: (data : {item1: number, item2: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/sbyte
		 * @return {number} sbyte, -128 to 127
		 */
		getsbyte(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/sbyte', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/short
		 * @return {number} short, -32,768 to 32,767
		 */
		getShort(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/short', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Demo string array
		 * GET api/SuperDemo/stringArrayQ?a={a}
		 */
		getStringArrayQ(a: Array<string> | null, callback: (data : Array<string>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/stringArrayQ?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Demo List string
		 * GET api/SuperDemo/stringArrayQ2?a={a}
		 */
		getStringArrayQ2(a: Array<string> | null, callback: (data : Array<string>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/stringArrayQ2?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * ActionResult with FileStreamResult
		 * GET api/SuperDemo/TextStream
		 */
		getTextStream(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/TextStream', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/uint
		 * @return {number} uint, 0 to 4,294,967,295
		 */
		getUint(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/uint', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/ulong
		 * @return {string} ulong, 0 to 18,446,744,073,709,551,615
		 */
		getulong(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/ulong', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/SuperDemo/ushort
		 * @return {number} ushort, 0 to 65,535
		 */
		getUShort(callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/SuperDemo/ushort', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * POST api/SuperDemo/ActionResult
		 */
		postActionResult(callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/ActionResult', null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/SuperDemo/PostActionResult2
		 */
		postActionResult2(s: string | null, callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/PostActionResult2', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/SuperDemo/PostActionResult3
		 */
		postActionResult3(person: DemoWebApi_DemoData_Client.Person | null, callback: (data : any) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/PostActionResult3', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post a collection of person
		 * POST api/SuperDemo/Collection
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		postCollection(list: Array<DemoWebApi_DemoData_Client.Person> | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/Collection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/SuperDemo/enumPost?d={d}
		 */
		postDay(d: DemoWebApi_DemoData_Client.Days | null, d2: DemoWebApi_DemoData_Client.Days | null, callback: (data : Array<DemoWebApi_DemoData_Client.Days>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/enumPost?d=' + d, d2, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Demo Dic string and person
		 * POST api/SuperDemo/StringPersonDic
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person } | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/StringPersonDic', dic, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/SuperDemo/Guids
		 */
		postGuids(guids: Array<string> | null, callback: (data : Array<string>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/Guids', guids, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post ICollection of person
		 * POST api/SuperDemo/ICollection
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		postICollection(list: Array<DemoWebApi_DemoData_Client.Person> | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/ICollection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post IList of person
		 * POST api/SuperDemo/IList
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		postIList(list: Array<DemoWebApi_DemoData_Client.Person> | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/IList', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/SuperDemo/int2d
		 */
		postInt2D(a: number[][] | null, callback: (data : boolean) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/int2d', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Demo int[][]
		 * POST api/SuperDemo/int2djagged
		 */
		postInt2DJagged(a: Array<Array<number>> | null, callback: (data : boolean) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/int2djagged', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Demo int[]
		 * POST api/SuperDemo/intArray
		 */
		postIntArray(a: Array<number> | null, callback: (data : boolean) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/intArray', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post IReadOnlyCollection of person
		 * POST api/SuperDemo/IReadOnlyCollection
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person> | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post e of person
		 * POST api/SuperDemo/IReadOnlyList
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person> | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post a list of person
		 * POST api/SuperDemo/List
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		postList(list: Array<DemoWebApi_DemoData_Client.Person> | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/List', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/SuperDemo/PostEmpty/{i}
		 * @param {number} i int, -2,147,483,648 to 2,147,483,647
		 */
		postWithQueryButEmptyBody(s: string | null, i: number | null, callback: (data : {item1: string, item2: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}
	}

	export class TextData {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * GET api/TextData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
		 * @param {number} skip int, -2,147,483,648 to 2,147,483,647
		 */
		athletheSearch(take: number | null, skip: number | null, order: string | null, sort: string | null, search: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/TextData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/TextData/String
		 */
		getABCDE(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/TextData/String', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Return empty body with status 200.
		 * GET api/TextData/EmptyString
		 */
		getEmptyString(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/TextData/EmptyString', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * MaybeNull
		 * GET api/TextData/NullableString
		 */
		getNullableString(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/TextData/NullableString', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Return empty body with status 204 No Content.
		 * GET api/TextData/NullString
		 */
		getNullString(callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/TextData/NullString', callback, this.error, this.statusCode, headersHandler);
		}
	}

	export class Tuple {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * Update in a transaction
		 * PUT api/Tuple/A1TupleArray
		 */
		a1TupleArray(idAndOrderArray: Array<{item1: string, item2: number}> | null, callback: (data : void) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.put(this.baseUri + 'api/Tuple/A1TupleArray', idAndOrderArray, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Update IEnumerable Tuple in a transaction
		 * PUT api/Tuple/A2TupleArray
		 */
		a2TupleIEnumerable(idAndOrderArray: Array<{item1: string, item2: number}> | null, callback: (data : void) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.put(this.baseUri + 'api/Tuple/A2TupleArray', idAndOrderArray, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post tuple
		 * POST api/Tuple/ChangeName
		 */
		changeName(d: {item1: string, item2: DemoWebApi_DemoData_Client.Person} | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/ChangeName', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Get Tuple in return. MaybeNull
		 * GET api/Tuple/PeopleCompany4
		 */
		getPeopleCompany4(callback: (data : {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany4', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * MaybeNull
		 * GET api/Tuple/PeopleCompany5
		 */
		getPeopleCompany5(callback: (data : {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany5', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Tuple/Tuple1
		 */
		getTuple1(callback: (data : {item1: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/Tuple1', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Tuple/Tuple2
		 */
		getTuple2(callback: (data : {item1: string, item2: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/Tuple2', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Tuple/Tuple3
		 */
		getTuple3(callback: (data : {item1: string, item2: string, item3: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/Tuple3', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Tuple/Tuple4
		 */
		getTuple4(callback: (data : {item1: string, item2: string, item3: string, item4: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/Tuple4', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Tuple/Tuple5
		 */
		getTuple5(callback: (data : {item1: string, item2: string, item3: string, item4: string, item5: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/Tuple5', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Tuple/Tuple6
		 */
		getTuple6(callback: (data : {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/Tuple6', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * GET api/Tuple/Tuple7
		 */
		getTuple7(callback: (data : {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/Tuple7', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Post nested tuple
		 * GET api/Tuple/Tuple8
		 */
		getTuple8(callback: (data : {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Tuple/Tuple8', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * POST api/Tuple/PeopleCompany2
		 */
		linkPeopleCompany2(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company} | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany2', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/PeopleCompany3
		 */
		linkPeopleCompany3(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company} | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany3', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/PeopleCompany4
		 */
		linkPeopleCompany4(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company} | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany4', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/PeopleCompany5
		 */
		linkPeopleCompany5(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company} | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany5', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/PeopleCompany6
		 */
		linkPeopleCompany6(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company} | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany6', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post long tuple
		 * POST api/Tuple/PeopleCompany7
		 */
		linkPeopleCompany7(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company} | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany7', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/PeopleCompany8
		 */
		linkPeopleCompany8(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company} | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany8', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/PersonCompany1
		 */
		linkPersonCompany1(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company} | null, callback: (data : DemoWebApi_DemoData_Client.Person) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/PersonCompany1', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/Tuple1
		 * @return {number} int, -2,147,483,648 to 2,147,483,647
		 */
		postTuple1(tuple: {item1: number} | null, callback: (data : number) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/Tuple1', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Post tuple string int
		 * POST api/Tuple/Tuple2
		 */
		postTuple2(tuple: {item1: string, item2: number} | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/Tuple2', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/Tuple3
		 */
		postTuple3(tuple: {item1: string, item2: string, item3: number} | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/Tuple3', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/Tuple4
		 */
		postTuple4(tuple: {item1: string, item2: string, item3: string, item4: number} | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/Tuple4', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/Tuple5
		 */
		postTuple5(tuple: {item1: string, item2: string, item3: string, item4: string, item5: number} | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/Tuple5', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/Tuple6
		 */
		postTuple6(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number} | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/Tuple6', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/Tuple7
		 */
		postTuple7(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number} | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/Tuple7', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * POST api/Tuple/Tuple8
		 */
		postTuple8(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: {item1: string, item2: string, item3: string}} | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Tuple/Tuple8', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}
	}

	export class Values {
		constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
		}

		/**
		 * DELETE api/Values/{id}
		 * @param {number} id int, -2,147,483,648 to 2,147,483,647
		 */
		delete(id: number | null, callback: (data : void) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.delete(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Get a list of value
		 * GET api/Values
		 */
		get(callback: (data : Array<string>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Values', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Get by both Id and name
		 * GET api/Values/{id}?name={name}
		 * @param {number} id int, -2,147,483,648 to 2,147,483,647
		 */
		getByIdOfInt32AndNameOfString(id: number | null, name: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Values/' + id + '?name=' + (!name ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Get by name
		 * GET api/Values?name={name}
		 */
		getByNameOfString(name: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Values?name=' + (!name ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Get by Id
		 * GET api/Values/{id}
		 * @param {number} id int, -2,147,483,648 to 2,147,483,647
		 */
		getByIdOfInt32(id: number | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * Get a list of value async, it is get2
		 * GET api/Values/Get2
		 */
		get2(callback: (data : Array<string>) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.get(this.baseUri + 'api/Values/Get2', callback, this.error, this.statusCode, headersHandler);
		}

		/**
		 * POST api/Values
		 */
		post(value: string | null, callback: (data : string) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.post(this.baseUri + 'api/Values', value, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}

		/**
		 * Update with valjue
		 * PUT api/Values/{id}
		 * @param {number} id int, -2,147,483,648 to 2,147,483,647
		 */
		put(id: number | null, value: string | null, callback: (data : void) => any, headersHandler?: () => {[header: string]: string}) {
			this.httpClient.put(this.baseUri + 'api/Values/' + id, value, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
		}
	}

}

