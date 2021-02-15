import {HttpClient} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-framework';
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

	export interface MimsPackage {
		kk?: number;
		result?: DemoWebApi_DemoData_Client.MimsResult<number>;
		tag?: string;
	}

	export interface MimsResult<T> {
		generatedAt?: Date;
		message?: string;
		result?: T;
		success?: boolean;
	}

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
	@autoinject()
	export class SpecialTypes {
		constructor(private http: HttpClient) {
		}

		/**
		 * Anonymous Dynamic of C#
		 * GET api/SpecialTypes/AnonymousDynamic
		 * @return {any} dyanmic things
		 */
		getAnonymousDynamic(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/SpecialTypes/AnonymousDynamic', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SpecialTypes/AnonymousDynamic2
		 */
		getAnonymousDynamic2(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/SpecialTypes/AnonymousDynamic2', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SpecialTypes/AnonymousObject
		 */
		getAnonymousObject(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/SpecialTypes/AnonymousObject', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/SpecialTypes/AnonymousObject2
		 */
		getAnonymousObject2(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/SpecialTypes/AnonymousObject2', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * POST api/SpecialTypes/AnonymousObject
		 */
		postAnonymousObject(obj: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/SpecialTypes/AnonymousObject', JSON.stringify(obj), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * POST api/SpecialTypes/AnonymousObject2
		 */
		postAnonymousObject2(obj: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/SpecialTypes/AnonymousObject2', JSON.stringify(obj), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}
	}

}

export namespace DemoWebApi_Controllers_Client {
	@autoinject()
	export class Entities {
		constructor(private http: HttpClient) {
		}

		/**
		 * POST api/Entities/createPerson
		 */
		createPerson(p: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Entities/createPerson', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Entities/createPerson2
		 */
		createPerson2(p: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Entities/createPerson2', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Entities/createPerson3
		 */
		createPerson3(p: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Entities/createPerson3', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * DELETE api/Entities/{id}
		 */
		delete(id: number, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Entities/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Entities/Company/{id}
		 */
		getCompany(id: number, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Company> {
			return this.http.get('api/Entities/Company/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/Entities/Mims
		 */
		getMims(p: DemoWebApi_DemoData_Client.MimsPackage, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.MimsResult<string>> {
			return this.http.post('api/Entities/Mims', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Entities/MyGeneric
		 */
		getMyGeneric(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, number>, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, number>> {
			return this.http.post('api/Entities/MyGeneric', JSON.stringify(s), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Entities/MyGenericPerson
		 */
		getMyGenericPerson(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>> {
			return this.http.post('api/Entities/MyGenericPerson', JSON.stringify(s), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * Get a person
		 * so to know the person
		 * GET api/Entities/getPerson/{id}
		 * @param {number} id unique id of that guy
		 * @return {DemoWebApi_DemoData_Client.Person} person in db
		 */
		getPerson(id: number, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.get('api/Entities/getPerson/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Entities/getPerson2/{id}
		 */
		getPerson2(id: number, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.get('api/Entities/getPerson2/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * PUT api/Entities/link?id={id}&relationship={relationship}
		 */
		linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.put('api/Entities/link?id=' + id + '&relationship=' + (relationship == null ? '' : encodeURIComponent(relationship)), JSON.stringify(person), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * PATCH api/Entities/patchPerson
		 */
		patchPerson(person: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.patch('api/Entities/patchPerson', JSON.stringify(person), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}

		/**
		 * PUT api/Entities/updatePerson
		 */
		updatePerson(person: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.put('api/Entities/updatePerson', JSON.stringify(person), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}
	}

	@autoinject()
	export class Heroes {
		constructor(private http: HttpClient) {
		}

		/**
		 * DELETE api/Heroes/{id}
		 */
		delete(id: number, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Heroes/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Heroes/asyncHeroes
		 */
		getAsyncHeroes(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return this.http.get('api/Heroes/asyncHeroes', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Get a hero.
		 * GET api/Heroes/{id}
		 */
		getHero(id: number, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return this.http.get('api/Heroes/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Get all heroes.
		 * GET api/Heroes
		 */
		getHeros(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return this.http.get('api/Heroes', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/Heroes
		 */
		post(name: string, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return this.http.post('api/Heroes', JSON.stringify(name), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * Add a hero
		 * POST api/Heroes/q?name={name}
		 */
		postWithQuery(name: string, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return this.http.post('api/Heroes/q?name=' + (name == null ? '' : encodeURIComponent(name)), null, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Update hero.
		 * PUT api/Heroes
		 */
		put(hero: DemoWebApi_Controllers_Client.Hero, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return this.http.put('api/Heroes', JSON.stringify(hero), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * Search heroes
		 * GET api/Heroes/search/{name}
		 * @param {string} name keyword contained in hero name.
		 * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
		 */
		search(name: string, headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return this.http.get('api/Heroes/search/' + (name == null ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}
	}

	@autoinject()
	export class SuperDemo {
		constructor(private http: HttpClient) {
		}

		/**
		 * GET api/SuperDemo/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
		 */
		athletheSearch(take: number, skip: number, order: string, sort: string, search: string, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (order == null ? '' : encodeURIComponent(order)) + '&sort=' + (sort == null ? '' : encodeURIComponent(sort)) + '&search=' + (search == null ? '' : encodeURIComponent(search)), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/SuperDemo/ActionResult
		 */
		getActionResult(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/ActionResult', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ActionResult2
		 */
		getActionResult2(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/ActionResult2', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ActionStringResult
		 */
		getActionStringResult(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/ActionStringResult', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/SuperDemo/bool
		 */
		getBool(headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.get('api/SuperDemo/bool', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/byte
		 */
		getbyte(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/byte', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ByteArray
		 */
		getByteArray(headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/ByteArray', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/char
		 */
		getChar(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/char', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/Collection
		 */
		getCollection(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/Collection', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullableDatetime/{hasValue}
		 */
		getDateTime(hasValue: boolean, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/SuperDemo/NullableDatetime/' + hasValue, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/DateTimeOffset
		 */
		getDateTimeOffset(headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/SuperDemo/DateTimeOffset', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/enumGet?d={d}
		 */
		getDay(d: DemoWebApi_DemoData_Client.Days, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Days> {
			return this.http.get('api/SuperDemo/enumGet?d=' + d, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/decimal
		 */
		getDecimal(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/decimal', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/decimalArrayQ?a={a}
		 */
		getDecimalArrayQ(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/decimalArrayQ?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/decimal/{d}
		 */
		getDecimalSquare(d: number, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/decimal/' + d, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/DecimalZero
		 */
		getDecimalZero(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/DecimalZero', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/StringStringDic
		 */
		getDictionary(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: string }> {
			return this.http.get('api/SuperDemo/StringStringDic', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/StringPersonDic
		 */
		getDictionaryOfPeople(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: DemoWebApi_DemoData_Client.Person }> {
			return this.http.get('api/SuperDemo/StringPersonDic', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/doulbe
		 */
		getdouble(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/doulbe', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Result of 0.1d + 0.2d - 0.3d
		 * GET api/SuperDemo/DoubleZero
		 */
		getDoubleZero(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/DoubleZero', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/EmptyString
		 */
		getEmptyString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/EmptyString', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/SuperDemo/enumArrayDays?a={a}
		 */
		getEnumArrayDays(a: Array<DemoWebApi_DemoData_Client.Days>, headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Days>> {
			return this.http.get('api/SuperDemo/enumArrayDays?'+a.map(z => `a=${z}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/enumArrayQ2?a={a}
		 */
		getEnumArrayQ2(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/enumArrayQ2?'+a.map(z => `a=${z}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/FloatZero
		 */
		getFloatZero(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/FloatZero', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ICollection
		 */
		getICollection(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/ICollection', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/IList
		 */
		getIList(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/IList', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/int2d
		 */
		getInt2D(headersHandler?: () => {[header: string]: string}): Promise<number[][]> {
			return this.http.get('api/SuperDemo/int2d', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/int2dJagged
		 */
		getInt2DJagged(headersHandler?: () => {[header: string]: string}): Promise<Array<Array<number>>> {
			return this.http.get('api/SuperDemo/int2dJagged', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/intArray
		 */
		getIntArray(headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/intArray', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/intArrayQ?a={a}
		 */
		getIntArrayQ(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/intArrayQ?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/intArrayQ2?a={a}
		 */
		getIntArrayQ2(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/intArrayQ2?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/int/{d}
		 */
		getIntSquare(d: number, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/int/' + d, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/IReadOnlyCollection
		 */
		getIReadOnlyCollection(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/IReadOnlyCollection', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/IReadOnlyList
		 */
		getIReadOnlyList(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/IReadOnlyList', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/KeyValuePair
		 */
		getKeyhValuePair(headersHandler?: () => {[header: string]: string}): Promise<{key: string, value: DemoWebApi_DemoData_Client.Person }> {
			return this.http.get('api/SuperDemo/KeyValuePair', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/List
		 */
		getList(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/List', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NextHour/{dt}
		 */
		getNextHour(dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/SuperDemo/NextHour/' + dt.toISOString(), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NextHourNullable?n={n}&dt={dt}
		 */
		getNextHourNullable(n: number, dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/SuperDemo/NextHourNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NextYear/{dt}
		 */
		getNextYear(dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/SuperDemo/NextYear/' + dt.toISOString(), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NextYearNullable?n={n}&dt={dt}
		 */
		getNextYearNullable(n: number, dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/SuperDemo/NextYearNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullableDecimal/{hasValue}
		 */
		getNullableDecimal(hasValue: boolean, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/NullableDecimal/' + hasValue, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullObject
		 */
		getNullPerson(headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.get('api/SuperDemo/NullObject', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullString
		 */
		getNullString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/NullString', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
		 */
		getPrimitiveNullable(location: string, dd: number, de: number, headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: number, item3: number}> {
			return this.http.get('api/SuperDemo/DoubleNullable?location=' + (location == null ? '' : encodeURIComponent(location)) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
		 */
		getPrimitiveNullable2(dd: number, de: number, headersHandler?: () => {[header: string]: string}): Promise<{item1: number, item2: number}> {
			return this.http.get('api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/sbyte
		 */
		getsbyte(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/sbyte', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/short
		 */
		getShort(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/short', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/stringArrayQ?a={a}
		 */
		getStringArrayQ(a: Array<string>, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.get('api/SuperDemo/stringArrayQ?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/stringArrayQ2?a={a}
		 */
		getStringArrayQ2(a: Array<string>, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.get('api/SuperDemo/stringArrayQ2?'+a.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/TextStream
		 */
		getTextStream(headersHandler?: () => {[header: string]: string}): Promise<Blob> {
			return this.http.get('api/SuperDemo/TextStream', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.blob());
		}

		/**
		 * GET api/SuperDemo/uint
		 */
		getUint(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/uint', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ulong
		 */
		getulong(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/ulong', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ushort
		 */
		getUShort(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/ushort', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/ActionResult
		 */
		postActionResult(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/SuperDemo/ActionResult', null, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/PostActionResult2
		 */
		postActionResult2(s: string, headersHandler?: () => {[header: string]: string}): Promise<Blob> {
			return this.http.post('api/SuperDemo/PostActionResult2', JSON.stringify(s), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.blob());
		}

		/**
		 * POST api/SuperDemo/PostActionResult3
		 */
		postActionResult3(person: DemoWebApi_DemoData_Client.Person, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/SuperDemo/PostActionResult3', JSON.stringify(person), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/Collection
		 */
		postCollection(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/Collection', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
		 * POST api/SuperDemo/DateTimeOffset
		 */
		postDateTimeOffset(d: Date, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.post('api/SuperDemo/DateTimeOffset', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/DateTimeOffsetNullable
		 */
		postDateTimeOffsetNullable(d: Date, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.post('api/SuperDemo/DateTimeOffsetNullable', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/enumPost?d={d}
		 */
		postDay(d: DemoWebApi_DemoData_Client.Days, d2: DemoWebApi_DemoData_Client.Days, headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Days>> {
			return this.http.post('api/SuperDemo/enumPost?d=' + d, JSON.stringify(d2), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/StringPersonDic
		 */
		postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/Guids
		 */
		postGuids(guids: Array<string>, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.post('api/SuperDemo/Guids', JSON.stringify(guids), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/ICollection
		 */
		postICollection(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/ICollection', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/IList
		 */
		postIList(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/IList', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/int2d
		 */
		postInt2D(a: number[][], headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.post('api/SuperDemo/int2d', JSON.stringify(a), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/int2djagged
		 */
		postInt2DJagged(a: Array<Array<number>>, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.post('api/SuperDemo/int2djagged', JSON.stringify(a), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/intArray
		 */
		postIntArray(a: Array<number>, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.post('api/SuperDemo/intArray', JSON.stringify(a), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/IReadOnlyCollection
		 */
		postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/IReadOnlyList
		 */
		postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/List
		 */
		postList(list: Array<DemoWebApi_DemoData_Client.Person>, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/List', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/NextYear
		 */
		postNextYear(dt: Date, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.post('api/SuperDemo/NextYear', JSON.stringify(dt), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/PostEmpty/{i}
		 */
		postWithQueryButEmptyBody(s: string, i: number, headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: number}> {
			return this.http.post('api/SuperDemo/PostEmpty/' + i, JSON.stringify(s), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/SearchDateRange?startDate={startDate}&endDate={endDate}
		 */
		searchDateRange(startDate: Date, endDate: Date, headersHandler?: () => {[header: string]: string}): Promise<{item1: Date, item2: Date}> {
			return this.http.get('api/SuperDemo/SearchDateRange?' + (startDate ? 'startDate=' + startDate.toISOString() : '') + (endDate ? '&endDate=' + endDate.toISOString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}
	}

	@autoinject()
	export class Tuple {
		constructor(private http: HttpClient) {
		}

		/**
		 * POST api/Tuple/ChangeName
		 */
		changeName(d: {item1: string, item2: DemoWebApi_DemoData_Client.Person}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/ChangeName', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/PeopleCompany4
		 */
		getPeopleCompany4(headersHandler?: () => {[header: string]: string}): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}> {
			return this.http.get('api/Tuple/PeopleCompany4', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/PeopleCompany5
		 */
		getPeopleCompany5(headersHandler?: () => {[header: string]: string}): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}> {
			return this.http.get('api/Tuple/PeopleCompany5', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple1
		 */
		getTuple1(headersHandler?: () => {[header: string]: string}): Promise<{item1: number}> {
			return this.http.get('api/Tuple/Tuple1', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple2
		 */
		getTuple2(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: number}> {
			return this.http.get('api/Tuple/Tuple2', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple3
		 */
		getTuple3(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: number}> {
			return this.http.get('api/Tuple/Tuple3', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple4
		 */
		getTuple4(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: number}> {
			return this.http.get('api/Tuple/Tuple4', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple5
		 */
		getTuple5(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: number}> {
			return this.http.get('api/Tuple/Tuple5', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple6
		 */
		getTuple6(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}> {
			return this.http.get('api/Tuple/Tuple6', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple7
		 */
		getTuple7(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}> {
			return this.http.get('api/Tuple/Tuple7', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple8
		 */
		getTuple8(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}> {
			return this.http.get('api/Tuple/Tuple8', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany2
		 */
		linkPeopleCompany2(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany3
		 */
		linkPeopleCompany3(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany4
		 */
		linkPeopleCompany4(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany5
		 */
		linkPeopleCompany5(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany6
		 */
		linkPeopleCompany6(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany7
		 */
		linkPeopleCompany7(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany8
		 */
		linkPeopleCompany8(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PersonCompany1
		 */
		linkPersonCompany1(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/Tuple1
		 */
		postTuple1(tuple: {item1: number}, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Tuple/Tuple1', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/Tuple2
		 */
		postTuple2(tuple: {item1: string, item2: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple2', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple3
		 */
		postTuple3(tuple: {item1: string, item2: string, item3: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple3', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple4
		 */
		postTuple4(tuple: {item1: string, item2: string, item3: string, item4: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple4', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple5
		 */
		postTuple5(tuple: {item1: string, item2: string, item3: string, item4: string, item5: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple5', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple6
		 */
		postTuple6(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple6', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple7
		 */
		postTuple7(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple7', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple8
		 */
		postTuple8(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: {item1: string, item2: string, item3: string}}, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple8', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}
	}

	@autoinject()
	export class Values {
		constructor(private http: HttpClient) {
		}

		/**
		 * DELETE api/Values/{id}
		 */
		delete(id: number, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Values/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Get a list of value
		 * GET api/Values
		 */
		get(headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.get('api/Values', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * Get by both Id and name
		 * GET api/Values/{id}?name={name}
		 */
		getByIdAndName(id: number, name: string, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/Values/' + id + '?name=' + (name == null ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/Values?name={name}
		 */
		getByName(name: string, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/Values?name=' + (name == null ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/Values/{id}
		 */
		getById(id: number, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/Values/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => d.text());
		}

		/**
		 * GET api/Values/Get2
		 */
		get2(headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.get('api/Values/Get2', { headers: headersHandler ? headersHandler() : undefined }).then(d => d.json());
		}

		/**
		 * POST api/Values
		 */
		post(value: string, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Values', JSON.stringify(value), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.text());
		}

		/**
		 * Update with valjue
		 * PUT api/Values/{id}
		 */
		put(id: number, value: string, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Values/' + id, JSON.stringify(value), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}
	}

}

