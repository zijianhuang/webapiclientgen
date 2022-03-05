export namespace DemoWebApi_DemoData_Client {
	export interface Address {
		city?: string;
		country?: string;
		id?: string;
		postalCode?: string;
		state?: string;
		street1?: string;
		street2?: string;
		type?: DemoWebApi_DemoData_Client.AddressType;

		/**
		 * It is a field
		 */
		location?: DemoWebApi_DemoData_Another_Client.MyPoint;
	}

	export enum AddressType { Postal, Residential }

	export interface Company extends DemoWebApi_DemoData_Client.Entity {

		/**
		 * BusinessNumber to be serialized as BusinessNum
		 */
		BusinessNum?: string;
		businessNumberType?: string;
		foundDate?: Date;
		registerDate?: Date;
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
	 * Base class of company and person
	 */
	export interface Entity {

		/**
		 * Multiple addresses
		 */
		addresses?: Array<DemoWebApi_DemoData_Client.Address>;
		id?: string;

		/**
		 * Name of the entity.
		 */
		name: string;
		phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;
		web?: string;
	}

	export enum MedicalContraindiationResponseTypeReason { M = "Mm", S = "Ss", P = "Pp", I = "I", A = "A" }

	export enum MedicalContraindiationResponseTypeTypeCode { P = "P", T = "Tt" }

	export interface MimsPackage {
		kk?: number;

		/**
		 * Having an initialized value in the property is not like defining a DefaultValueAttribute. Such intialization happens at run time,
		 * and there's no reliable way for a codegen to know if the value is declared by the programmer, or is actually the natural default value like 0.
		 */
		kK2?: number;
		optionalEnum?: DemoWebApi_DemoData_Client.MyEnumType;
		optionalInt?: number;
		result?: DemoWebApi_DemoData_Client.MimsResult<number>;
		tag?: string;
	}

	export interface MimsResult<T> {
		generatedAt?: Date;
		message?: string;
		result?: T;
		success?: boolean;
	}

	export enum MyEnumType { First = 1, Two = 2 }

	export interface MyGeneric<T, K, U> {
		myK?: K;
		myT?: T;
		myU?: U;
		status?: string;
	}

	export interface MyPeopleDic {
		anotherDic?: {[id: string]: string };
		dic?: {[id: string]: DemoWebApi_DemoData_Client.Person };
		intDic?: {[id: number]: string };
	}

	export interface Person extends DemoWebApi_DemoData_Client.Entity {
		baptised?: Date;

		/**
		 * Date of Birth.
		 * This is optional.
		 */
		dob?: Date;
		givenName?: string;
		surname?: string;
	}

	export interface PhoneNumber {
		fullNumber?: string;
		phoneType?: DemoWebApi_DemoData_Client.PhoneType;
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

}

export namespace DemoWebApi_Models_Client {
	export interface AddExternalLoginBindingModel {
		externalAccessToken?: string;
	}

	export interface ChangePasswordBindingModel {
		confirmPassword?: string;
		newPassword?: string;
		OldPwd: string;
	}

	export interface RegisterBindingModel {
		confirmPassword?: string;
		email?: string;
		password?: string;
	}

	export interface RegisterExternalBindingModel {
		email?: string;
	}

	export interface RemoveLoginBindingModel {
		loginProvider?: string;
		providerKey?: string;
	}

	export interface SetPasswordBindingModel {
		confirmPassword?: string;
		newPassword?: string;
	}


	/**
	 * Auth token
	 */
	export interface TokenResponseModel {
		access_token?: string;
		expires?: string;
		expires_in?: number;
		issued?: string;
		token_type?: string;
		username?: string;
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
		submitter?: string;
	}


	/**
	 * Complex hero type
	 */
	export interface Hero {
		id?: number;
		name?: string;
	}

}

export namespace DemoCoreWeb_Controllers_Client {
	export class SpecialTypes {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * Anonymous Dynamic of C#
		 * GET api/SpecialTypes/AnonymousDynamic
		 * @return {any} dyanmic things
		 */
		getAnonymousDynamic(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousDynamic', { method: 'get', headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SpecialTypes/AnonymousDynamic2
		 */
		getAnonymousDynamic2(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousDynamic2', { method: 'get', headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SpecialTypes/AnonymousObject
		 */
		getAnonymousObject(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousObject', { method: 'get', headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SpecialTypes/AnonymousObject2
		 */
		getAnonymousObject2(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousObject2', { method: 'get', headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * POST api/SpecialTypes/AnonymousObject
		 */
		postAnonymousObject(obj: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousObject', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(obj) });
		}

		/**
		 * POST api/SpecialTypes/AnonymousObject2
		 */
		postAnonymousObject2(obj: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousObject2', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(obj) });
		}
	}

}

export namespace DemoWebApi_Controllers_Client {
	export class DateTypes {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * GET api/DateTypes/NullableDatetime/{hasValue}
		 */
		getDateTime(hasValue: boolean, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/NullableDatetime/' + hasValue, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/DateTypes/ForDateTimeOffset
		 */
		getDateTimeOffset(headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/ForDateTimeOffset', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/DateTypes/NextHour/{dt}
		 */
		getNextHour(dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/NextHour/' + dt.toISOString(), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/DateTypes/NextHourNullable?n={n}&dt={dt}
		 */
		getNextHourNullable(n: number, dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/NextHourNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/DateTypes/NextYear/{dt}
		 */
		getNextYear(dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/NextYear/' + dt.toISOString(), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/DateTypes/NextYearNullable?n={n}&dt={dt}
		 */
		getNextYearNullable(n: number, dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/NextYearNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Client should send DateTime.Date
		 * POST api/DateTypes/IsDateTimeDate
		 */
		isDateTimeDate(dt: Date, headersHandler?: () => {[header: string]: string}): Promise<{item1: Date, item2: Date}> {
			return fetch(this.baseUri + 'api/DateTypes/IsDateTimeDate', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(dt) }).then(d => d.json());
		}

		/**
		 * POST api/DateTypes/IsDateTimeOffsetDate
		 */
		isDateTimeOffsetDate(dt: Date, headersHandler?: () => {[header: string]: string}): Promise<{item1: Date, item2: Date}> {
			return fetch(this.baseUri + 'api/DateTypes/IsDateTimeOffsetDate', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(dt) }).then(d => d.json());
		}

		/**
		 * POST api/DateTypes/ForDateOnly
		 */
		postDateOnly(d: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/ForDateOnly', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.json());
		}

		/**
		 * POST api/DateTypes/DateOnlyNullable
		 */
		postDateOnlyNullable(d: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/DateOnlyNullable', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.json());
		}

		/**
		 * POST api/DateTypes/ForDateTime
		 */
		postDateTime(d: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/ForDateTime', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.json());
		}

		/**
		 * POST api/DateTypes/ForDateTimeOffset
		 */
		postDateTimeOffset(d: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/ForDateTimeOffset', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.json());
		}

		/**
		 * POST api/DateTypes/ForDateTimeOffsetForO
		 */
		postDateTimeOffsetForO(d: Date, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/DateTypes/ForDateTimeOffsetForO', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.text());
		}

		/**
		 * POST api/DateTypes/DateTimeOffsetNullable
		 */
		postDateTimeOffsetNullable(d: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/DateTimeOffsetNullable', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.json());
		}

		/**
		 * POST api/DateTypes/NextYear
		 */
		postNextYear(dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/NextYear', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(dt) }).then(d => d.json());
		}

		/**
		 * GET api/DateTypes/DateOnlyStringQuery?d={d}
		 */
		queryDateOnlyAsString(d: string, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/DateOnlyStringQuery?d=' + (d == null ? '' : encodeURIComponent(d)), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/DateTypes/RouteDateTimeOffset/{d}
		 */
		routeDateTimeOffset(d: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return fetch(this.baseUri + 'api/DateTypes/RouteDateTimeOffset/' + d.toISOString(), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/DateTypes/SearchDateRange?startDate={startDate}&endDate={endDate}
		 */
		searchDateRange(startDate: Date, endDate: Date, headersHandler?: () => {[header: string]: string}): Promise<{item1: Date, item2: Date}> {
			return fetch(this.baseUri + 'api/DateTypes/SearchDateRange?' + (startDate ? 'startDate=' + startDate.toISOString() : '') + (endDate ? '&endDate=' + endDate.toISOString() : ''), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}
	}

	export class Entities {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * POST api/Entities/createCompany
		 */
		createCompany(p: DemoWebApi_DemoData_Client.Company, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Company> {
			return fetch(this.baseUri + 'api/Entities/createCompany', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(p) }).then(d => d.json());
		}

		/**
		 * POST api/Entities/createPerson
		 */
		createPerson(p: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/Entities/createPerson', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(p) }).then(d => d.json());
		}

		/**
		 * POST api/Entities/createPerson2
		 */
		createPerson2(p: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Entities/createPerson2', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(p) }).then(d => d.json());
		}

		/**
		 * POST api/Entities/createPerson3
		 */
		createPerson3(p: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Entities/createPerson3', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(p) }).then(d => d.json());
		}

		/**
		 * DELETE api/Entities/{id}
		 */
		delete(id: number, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/Entities/' + id, { method: 'delete', headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Entities/Company/{id}
		 */
		getCompany(id: number, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Company> {
			return fetch(this.baseUri + 'api/Entities/Company/' + id, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/Entities/Mims
		 */
		getMims(p: DemoWebApi_DemoData_Client.MimsPackage, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.MimsResult<string>> {
			return fetch(this.baseUri + 'api/Entities/Mims', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(p) }).then(d => d.json());
		}

		/**
		 * POST api/Entities/MyGeneric
		 */
		getMyGeneric(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, number>, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, number>> {
			return fetch(this.baseUri + 'api/Entities/MyGeneric', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(s) }).then(d => d.json());
		}

		/**
		 * POST api/Entities/MyGenericPerson
		 */
		getMyGenericPerson(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/Entities/MyGenericPerson', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(s) }).then(d => d.json());
		}

		/**
		 * Get a person
		 * so to know the person
		 * GET api/Entities/getPerson/{id}
		 * @param {number} id unique id of that guy
		 * @return {DemoWebApi_DemoData_Client.Person} person in db
		 */
		getPerson(id: number, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Entities/getPerson/' + id, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Entities/getPerson2/{id}
		 */
		getPerson2(id: number, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Entities/getPerson2/' + id, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * PUT api/Entities/link?id={id}&relationship={relationship}
		 */
		linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return fetch(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + (relationship == null ? '' : encodeURIComponent(relationship)), { method: 'put', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(person) }).then(d => d.json());
		}

		/**
		 * PATCH api/Entities/patchPerson
		 */
		patchPerson(person: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Entities/patchPerson', { method: 'patch', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(person) }).then(d => d.text());
		}

		/**
		 * PUT api/Entities/updatePerson
		 */
		updatePerson(person: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Entities/updatePerson', { method: 'put', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(person) }).then(d => d.text());
		}
	}

	export class Heroes {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * DELETE api/Heroes/{id}
		 */
		delete(id: number, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/Heroes/' + id, { method: 'delete', headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Heroes/asyncHeroes
		 */
		getAsyncHeroes(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return fetch(this.baseUri + 'api/Heroes/asyncHeroes', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Get a hero.
		 * GET api/Heroes/{id}
		 */
		getHero(id: number, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return fetch(this.baseUri + 'api/Heroes/' + id, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Get all heroes.
		 * GET api/Heroes
		 */
		getHeros(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return fetch(this.baseUri + 'api/Heroes', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/Heroes
		 */
		post(name: string, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return fetch(this.baseUri + 'api/Heroes', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(name) }).then(d => d.json());
		}

		/**
		 * Add a hero
		 * POST api/Heroes/q?name={name}
		 */
		postWithQuery(name: string, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return fetch(this.baseUri + 'api/Heroes/q?name=' + (name == null ? '' : encodeURIComponent(name)), { method: 'post', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Update hero.
		 * PUT api/Heroes
		 */
		put(hero: DemoWebApi_Controllers_Client.Hero, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return fetch(this.baseUri + 'api/Heroes', { method: 'put', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(hero) }).then(d => d.json());
		}

		/**
		 * Search heroes
		 * GET api/Heroes/search/{name}
		 * @param {string} name keyword contained in hero name.
		 * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
		 */
		search(name: string, headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return fetch(this.baseUri + 'api/Heroes/search/' + (name == null ? '' : encodeURIComponent(name)), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}
	}

	export class StringData {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * GET api/StringData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
		 */
		athletheSearch(take: number, skip: number, order: string, sort: string, search: string, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/StringData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (order == null ? '' : encodeURIComponent(order)) + '&sort=' + (sort == null ? '' : encodeURIComponent(sort)) + '&search=' + (search == null ? '' : encodeURIComponent(search)), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/StringData/String
		 */
		getABCDE(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/StringData/String', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/StringData/EmptyString
		 */
		getEmptyString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/StringData/EmptyString', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/StringData/NullString
		 */
		getNullString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/StringData/NullString', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}
	}

	export class SuperDemo {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * GET api/SuperDemo/ActionResult
		 */
		getActionResult(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/ActionResult', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ActionResult2
		 */
		getActionResult2(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/ActionResult2', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ActionStringResult
		 */
		getActionStringResult(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/ActionStringResult', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/SuperDemo/bool
		 */
		getBool(headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/bool', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/byte
		 */
		getbyte(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/byte', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ByteArray
		 */
		getByteArray(headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return fetch(this.baseUri + 'api/SuperDemo/ByteArray', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/char
		 */
		getChar(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/char', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/Collection
		 */
		getCollection(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/Collection', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/enumGet?d={d}
		 */
		getDay(d: DemoWebApi_DemoData_Client.Days, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Days> {
			return fetch(this.baseUri + 'api/SuperDemo/enumGet?d=' + d, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/decimal
		 */
		getDecimal(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/decimal', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/decimalArrayQ?a={a}
		 */
		getDecimalArrayQ(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return fetch(this.baseUri + 'api/SuperDemo/decimalArrayQ?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/decimal/{d}
		 */
		getDecimalSquare(d: number, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/decimal/' + d, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/DecimalZero
		 */
		getDecimalZero(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/DecimalZero', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/StringStringDic
		 */
		getDictionary(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: string }> {
			return fetch(this.baseUri + 'api/SuperDemo/StringStringDic', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/StringPersonDic
		 */
		getDictionaryOfPeople(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: DemoWebApi_DemoData_Client.Person }> {
			return fetch(this.baseUri + 'api/SuperDemo/StringPersonDic', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/doulbe
		 */
		getdouble(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/doulbe', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Result of 0.1d + 0.2d - 0.3d
		 * GET api/SuperDemo/DoubleZero
		 */
		getDoubleZero(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/DoubleZero', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/enumArrayDays?a={a}
		 */
		getEnumArrayDays(a: Array<DemoWebApi_DemoData_Client.Days>, headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Days>> {
			return fetch(this.baseUri + 'api/SuperDemo/enumArrayDays?'+a.map(z => `a=${z}`).join('&'), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/enumArrayQ2?a={a}
		 */
		getEnumArrayQ2(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return fetch(this.baseUri + 'api/SuperDemo/enumArrayQ2?'+a.map(z => `a=${z}`).join('&'), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/FloatZero
		 */
		getFloatZero(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/FloatZero', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ICollection
		 */
		getICollection(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/ICollection', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/IList
		 */
		getIList(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/IList', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/int2d
		 */
		getInt2D(headersHandler?: () => {[header: string]: string}): Promise<number[][]> {
			return fetch(this.baseUri + 'api/SuperDemo/int2d', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/int2dJagged
		 */
		getInt2DJagged(headersHandler?: () => {[header: string]: string}): Promise<Array<Array<number>>> {
			return fetch(this.baseUri + 'api/SuperDemo/int2dJagged', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/intArray
		 */
		getIntArray(headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return fetch(this.baseUri + 'api/SuperDemo/intArray', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/intArrayQ?a={a}
		 */
		getIntArrayQ(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return fetch(this.baseUri + 'api/SuperDemo/intArrayQ?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/intArrayQ2?a={a}
		 */
		getIntArrayQ2(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return fetch(this.baseUri + 'api/SuperDemo/intArrayQ2?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/int/{d}
		 */
		getIntSquare(d: number, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/int/' + d, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/IReadOnlyCollection
		 */
		getIReadOnlyCollection(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/IReadOnlyList
		 */
		getIReadOnlyList(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/IReadOnlyList', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/KeyValuePair
		 */
		getKeyhValuePair(headersHandler?: () => {[header: string]: string}): Promise<{key: string, value: DemoWebApi_DemoData_Client.Person }> {
			return fetch(this.baseUri + 'api/SuperDemo/KeyValuePair', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/List
		 */
		getList(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/List', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullableDecimal/{hasValue}
		 */
		getNullableDecimal(hasValue: boolean, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullObject
		 */
		getNullPerson(headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/SuperDemo/NullObject', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
		 */
		getPrimitiveNullable(location: string, dd: number, de: number, headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: number, item3: number}> {
			return fetch(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + (location == null ? '' : encodeURIComponent(location)) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
		 */
		getPrimitiveNullable2(dd: number, de: number, headersHandler?: () => {[header: string]: string}): Promise<{item1: number, item2: number}> {
			return fetch(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/sbyte
		 */
		getsbyte(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/sbyte', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/short
		 */
		getShort(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/short', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/stringArrayQ?a={a}
		 */
		getStringArrayQ(a: Array<string>, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return fetch(this.baseUri + 'api/SuperDemo/stringArrayQ?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/stringArrayQ2?a={a}
		 */
		getStringArrayQ2(a: Array<string>, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return fetch(this.baseUri + 'api/SuperDemo/stringArrayQ2?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/TextStream
		 */
		getTextStream(headersHandler?: () => {[header: string]: string}): Promise<Blob> {
			return fetch(this.baseUri + 'api/SuperDemo/TextStream', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.blob());
		}

		/**
		 * GET api/SuperDemo/uint
		 */
		getUint(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/uint', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ulong
		 */
		getulong(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/ulong', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ushort
		 */
		getUShort(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/ushort', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/ActionResult
		 */
		postActionResult(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/ActionResult', { method: 'post', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/PostActionResult2
		 */
		postActionResult2(s: string, headersHandler?: () => {[header: string]: string}): Promise<Blob> {
			return fetch(this.baseUri + 'api/SuperDemo/PostActionResult2', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(s) }).then(d => d.blob());
		}

		/**
		 * POST api/SuperDemo/PostActionResult3
		 */
		postActionResult3(person: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/PostActionResult3', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(person) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/Collection
		 */
		postCollection(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/Collection', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/enumPost?d={d}
		 */
		postDay(d: DemoWebApi_DemoData_Client.Days, d2: DemoWebApi_DemoData_Client.Days, headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Days>> {
			return fetch(this.baseUri + 'api/SuperDemo/enumPost?d=' + d, { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d2) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/StringPersonDic
		 */
		postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/StringPersonDic', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(dic) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/Guids
		 */
		postGuids(guids: Array<string>, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return fetch(this.baseUri + 'api/SuperDemo/Guids', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(guids) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/ICollection
		 */
		postICollection(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/ICollection', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/IList
		 */
		postIList(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/IList', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/int2d
		 */
		postInt2D(a: number[][], headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/int2d', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(a) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/int2djagged
		 */
		postInt2DJagged(a: Array<Array<number>>, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/int2djagged', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(a) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/intArray
		 */
		postIntArray(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/intArray', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(a) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/IReadOnlyCollection
		 */
		postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/IReadOnlyList
		 */
		postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/IReadOnlyList', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/List
		 */
		postList(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/List', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/PostEmpty/{i}
		 */
		postWithQueryButEmptyBody(s: string, i: number, headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: number}> {
			return fetch(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(s) }).then(d => d.json());
		}
	}

	export class TextData {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * GET api/TextData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
		 */
		athletheSearch(take: number, skip: number, order: string, sort: string, search: string, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/TextData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (order == null ? '' : encodeURIComponent(order)) + '&sort=' + (sort == null ? '' : encodeURIComponent(sort)) + '&search=' + (search == null ? '' : encodeURIComponent(search)), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/TextData/String
		 */
		getABCDE(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/TextData/String', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/TextData/EmptyString
		 */
		getEmptyString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/TextData/EmptyString', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/TextData/NullString
		 */
		getNullString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/TextData/NullString', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}
	}

	export class Tuple {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * POST api/Tuple/ChangeName
		 */
		changeName(d: {item1: string, item2: DemoWebApi_DemoData_Client.Person}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/ChangeName', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/PeopleCompany4
		 */
		getPeopleCompany4(headersHandler?: () => {[header: string]: string}): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany4', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/PeopleCompany5
		 */
		getPeopleCompany5(headersHandler?: () => {[header: string]: string}): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany5', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple1
		 */
		getTuple1(headersHandler?: () => {[header: string]: string}): Promise<{item1: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple1', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple2
		 */
		getTuple2(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple2', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple3
		 */
		getTuple3(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple3', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple4
		 */
		getTuple4(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple4', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple5
		 */
		getTuple5(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple5', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple6
		 */
		getTuple6(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple6', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple7
		 */
		getTuple7(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple7', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple8
		 */
		getTuple8(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple8', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany2
		 */
		linkPeopleCompany2(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany2', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany3
		 */
		linkPeopleCompany3(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany3', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany4
		 */
		linkPeopleCompany4(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany4', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany5
		 */
		linkPeopleCompany5(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany5', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany6
		 */
		linkPeopleCompany6(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany6', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany7
		 */
		linkPeopleCompany7(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany7', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany8
		 */
		linkPeopleCompany8(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany8', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PersonCompany1
		 */
		linkPersonCompany1(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PersonCompany1', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/Tuple1
		 */
		postTuple1(tuple: {item1: number}, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return fetch(this.baseUri + 'api/Tuple/Tuple1', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/Tuple2
		 */
		postTuple2(tuple: {item1: string, item2: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple2', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple3
		 */
		postTuple3(tuple: {item1: string, item2: string, item3: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple3', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple4
		 */
		postTuple4(tuple: {item1: string, item2: string, item3: string, item4: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple4', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple5
		 */
		postTuple5(tuple: {item1: string, item2: string, item3: string, item4: string, item5: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple5', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple6
		 */
		postTuple6(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple6', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple7
		 */
		postTuple7(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple7', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple8
		 */
		postTuple8(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: {item1: string, item2: string, item3: string}}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple8', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}
	}

	export class Values {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * DELETE api/Values/{id}
		 */
		delete(id: number, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/Values/' + id, { method: 'delete', headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Get a list of value
		 * GET api/Values
		 */
		get(headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return fetch(this.baseUri + 'api/Values', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Get by both Id and name
		 * GET api/Values/{id}?name={name}
		 */
		getByIdAndName(id: number, name: string, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Values/' + id + '?name=' + (name == null ? '' : encodeURIComponent(name)), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/Values?name={name}
		 */
		getByName(name: string, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Values?name=' + (name == null ? '' : encodeURIComponent(name)), { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/Values/{id}
		 */
		getById(id: number, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Values/' + id, { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/Values/Get2
		 */
		get2(headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return fetch(this.baseUri + 'api/Values/Get2', { method: 'get', headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/Values
		 */
		post(value: string, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return fetch(this.baseUri + 'api/Values', { method: 'post', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(value) }).then(d => d.text());
		}

		/**
		 * Update with valjue
		 * PUT api/Values/{id}
		 */
		put(id: number, value: string, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return fetch(this.baseUri + 'api/Values/' + id, { method: 'put', headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(value) });
		}
	}

}

