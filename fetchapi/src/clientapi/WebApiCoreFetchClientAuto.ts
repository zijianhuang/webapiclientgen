export namespace DemoWebApi_DemoData_Client {
	export interface Address {
		city?: string;
		country?: string;
		entity?: DemoWebApi_DemoData_Client.Entity;

		/**
		 * Foreign key to Entity
		 */
		entityId?: string;
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
		entityId?: string;
		fullNumber?: string;
		id?: string;
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
		getAnonymousDynamic(): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousDynamic', {method: 'get'});
		}

		/**
		 * GET api/SpecialTypes/AnonymousDynamic2
		 */
		getAnonymousDynamic2(): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousDynamic2', {method: 'get'});
		}

		/**
		 * GET api/SpecialTypes/AnonymousObject
		 */
		getAnonymousObject(): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousObject', {method: 'get'});
		}

		/**
		 * GET api/SpecialTypes/AnonymousObject2
		 */
		getAnonymousObject2(): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousObject2', {method: 'get'});
		}

		/**
		 * POST api/SpecialTypes/AnonymousObject
		 */
		postAnonymousObject(obj: any): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousObject', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(obj) });
		}

		/**
		 * POST api/SpecialTypes/AnonymousObject2
		 */
		postAnonymousObject2(obj: any): Promise<Response> {
			return fetch(this.baseUri + 'api/SpecialTypes/AnonymousObject2', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(obj) });
		}
	}

}

export namespace DemoWebApi_Controllers_Client {
	export class Entities {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * POST api/Entities/createPerson
		 */
		createPerson(p: DemoWebApi_DemoData_Client.Person): Promise<number> {
			return fetch(this.baseUri + 'api/Entities/createPerson', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(p) }).then(d => d.json());
		}

		/**
		 * POST api/Entities/createPerson2
		 */
		createPerson2(p: DemoWebApi_DemoData_Client.Person): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Entities/createPerson2', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(p) }).then(d => d.json());
		}

		/**
		 * DELETE api/Entities/{id}
		 */
		delete(id: number): Promise<Response> {
			return fetch(this.baseUri + 'api/Entities/' + id, {method: 'delete'});
		}

		/**
		 * GET api/Entities/Company/{id}
		 */
		getCompany(id: number): Promise<DemoWebApi_DemoData_Client.Company> {
			return fetch(this.baseUri + 'api/Entities/Company/' + id, {method: 'get'}).then(d => d.json());
		}

		/**
		 * POST api/Entities/Mims
		 */
		getMims(p: DemoWebApi_DemoData_Client.MimsPackage): Promise<DemoWebApi_DemoData_Client.MimsResult<string>> {
			return fetch(this.baseUri + 'api/Entities/Mims', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(p) }).then(d => d.json());
		}

		/**
		 * POST api/Entities/MyGeneric
		 */
		getMyGeneric(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, number>): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, number>> {
			return fetch(this.baseUri + 'api/Entities/MyGeneric', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(s) }).then(d => d.json());
		}

		/**
		 * POST api/Entities/MyGenericPerson
		 */
		getMyGenericPerson(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/Entities/MyGenericPerson', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(s) }).then(d => d.json());
		}

		/**
		 * Get a person
		 * so to know the person
		 * GET api/Entities/getPerson/{id}
		 * @param {number} id unique id of that guy
		 * @return {DemoWebApi_DemoData_Client.Person} person in db
		 */
		getPerson(id: number): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Entities/getPerson/' + id, {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Entities/getPerson2/{id}
		 */
		getPerson2(id: number): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Entities/getPerson2/' + id, {method: 'get'}).then(d => d.json());
		}

		/**
		 * PUT api/Entities/link?id={id}&relationship={relationship}
		 */
		linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person): Promise<boolean> {
			return fetch(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + encodeURIComponent(relationship), {method: 'put', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(person) }).then(d => d.json());
		}

		/**
		 * PUT api/Entities/updatePerson
		 */
		updatePerson(person: DemoWebApi_DemoData_Client.Person): Promise<string> {
			return fetch(this.baseUri + 'api/Entities/updatePerson', {method: 'put', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(person) }).then(d => d.text());
		}
	}

	export class Heroes {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * DELETE api/Heroes/{id}
		 */
		delete(id: number): Promise<Response> {
			return fetch(this.baseUri + 'api/Heroes/' + id, {method: 'delete'});
		}

		/**
		 * GET api/Heroes/asyncHeroes
		 */
		getAsyncHeroes(): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return fetch(this.baseUri + 'api/Heroes/asyncHeroes', {method: 'get'}).then(d => d.json());
		}

		/**
		 * Get a hero.
		 * GET api/Heroes/{id}
		 */
		getHero(id: number): Promise<DemoWebApi_Controllers_Client.Hero> {
			return fetch(this.baseUri + 'api/Heroes/' + id, {method: 'get'}).then(d => d.json());
		}

		/**
		 * Get all heroes.
		 * GET api/Heroes
		 */
		getHeros(): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return fetch(this.baseUri + 'api/Heroes', {method: 'get'}).then(d => d.json());
		}

		/**
		 * POST api/Heroes
		 */
		post(name: string): Promise<DemoWebApi_Controllers_Client.Hero> {
			return fetch(this.baseUri + 'api/Heroes', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(name) }).then(d => d.json());
		}

		/**
		 * Add a hero
		 * POST api/Heroes/q?name={name}
		 */
		postWithQuery(name: string): Promise<DemoWebApi_Controllers_Client.Hero> {
			return fetch(this.baseUri + 'api/Heroes/q?name=' + encodeURIComponent(name), {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * Update hero.
		 * PUT api/Heroes
		 */
		put(hero: DemoWebApi_Controllers_Client.Hero): Promise<DemoWebApi_Controllers_Client.Hero> {
			return fetch(this.baseUri + 'api/Heroes', {method: 'put', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(hero) }).then(d => d.json());
		}

		/**
		 * Search heroes
		 * GET api/Heroes/search/{name}
		 * @param {string} name keyword contained in hero name.
		 * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
		 */
		search(name: string): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return fetch(this.baseUri + 'api/Heroes/search/' + encodeURIComponent(name), {method: 'get'}).then(d => d.json());
		}
	}

	export class SuperDemo {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * GET api/SuperDemo/ActionResult
		 */
		getActionResult(): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/ActionResult', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ActionResult2
		 */
		getActionResult2(): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/ActionResult2', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ActionStringResult
		 */
		getActionStringResult(): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/ActionStringResult', {method: 'get'}).then(d => d.text());
		}

		/**
		 * GET api/SuperDemo/bool
		 */
		getBool(): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/bool', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/byte
		 */
		getbyte(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/byte', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ByteArray
		 */
		getByteArray(): Promise<Array<number>> {
			return fetch(this.baseUri + 'api/SuperDemo/ByteArray', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/char
		 */
		getChar(): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/char', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/Collection
		 */
		getCollection(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/Collection', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullableDatetime/{hasValue}
		 */
		getDateTime(hasValue: boolean): Promise<Date> {
			return fetch(this.baseUri + 'api/SuperDemo/NullableDatetime/' + hasValue, {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/DateTimeOffset
		 */
		getDateTimeOffset(): Promise<Date> {
			return fetch(this.baseUri + 'api/SuperDemo/DateTimeOffset', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/decimal
		 */
		getDecimal(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/decimal', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/decimal/{d}
		 */
		getDecimalSquare(d: number): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/decimal/' + d, {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/DecimalZero
		 */
		getDecimalZero(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/DecimalZero', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/StringStringDic
		 */
		getDictionary(): Promise<{[id: string]: string }> {
			return fetch(this.baseUri + 'api/SuperDemo/StringStringDic', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/StringPersonDic
		 */
		getDictionaryOfPeople(): Promise<{[id: string]: DemoWebApi_DemoData_Client.Person }> {
			return fetch(this.baseUri + 'api/SuperDemo/StringPersonDic', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/doulbe
		 */
		getdouble(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/doulbe', {method: 'get'}).then(d => d.json());
		}

		/**
		 * Result of 0.1d + 0.2d - 0.3d
		 * GET api/SuperDemo/DoubleZero
		 */
		getDoubleZero(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/DoubleZero', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/EmptyString
		 */
		getEmptyString(): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/EmptyString', {method: 'get'}).then(d => d.text());
		}

		/**
		 * GET api/SuperDemo/FloatZero
		 */
		getFloatZero(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/FloatZero', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ICollection
		 */
		getICollection(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/ICollection', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/IList
		 */
		getIList(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/IList', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/int2d
		 */
		getInt2D(): Promise<number[][]> {
			return fetch(this.baseUri + 'api/SuperDemo/int2d', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/int2dJagged
		 */
		getInt2DJagged(): Promise<Array<Array<number>>> {
			return fetch(this.baseUri + 'api/SuperDemo/int2dJagged', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/intArray
		 */
		getIntArray(): Promise<Array<number>> {
			return fetch(this.baseUri + 'api/SuperDemo/intArray', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/int/{d}
		 */
		getIntSquare(d: number): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/int/' + d, {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/IReadOnlyCollection
		 */
		getIReadOnlyCollection(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/IReadOnlyList
		 */
		getIReadOnlyList(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/IReadOnlyList', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/KeyValuePair
		 */
		getKeyhValuePair(): Promise<{key: string, value: DemoWebApi_DemoData_Client.Person }> {
			return fetch(this.baseUri + 'api/SuperDemo/KeyValuePair', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/List
		 */
		getList(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return fetch(this.baseUri + 'api/SuperDemo/List', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NextHour/{dt}
		 */
		getNextHour(dt: Date): Promise<Date> {
			return fetch(this.baseUri + 'api/SuperDemo/NextHour/' + dt.toISOString(), {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NextHourNullable?n={n}&dt={dt}
		 */
		getNextHourNullable(n: number, dt: Date): Promise<Date> {
			return fetch(this.baseUri + 'api/SuperDemo/NextHourNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NextYear/{dt}
		 */
		getNextYear(dt: Date): Promise<Date> {
			return fetch(this.baseUri + 'api/SuperDemo/NextYear/' + dt.toISOString(), {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NextYearNullable?n={n}&dt={dt}
		 */
		getNextYearNullable(n: number, dt: Date): Promise<Date> {
			return fetch(this.baseUri + 'api/SuperDemo/NextYearNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullableDecimal/{hasValue}
		 */
		getNullableDecimal(hasValue: boolean): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue, {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullObject
		 */
		getNullPerson(): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/SuperDemo/NullObject', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/NullString
		 */
		getNullString(): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/NullString', {method: 'get'}).then(d => d.text());
		}

		/**
		 * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
		 */
		getPrimitiveNullable(location: string, dd: number, de: number): Promise<{item1: string, item2: number, item3: number}> {
			return fetch(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + encodeURIComponent(location) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
		 */
		getPrimitiveNullable2(dd: number, de: number): Promise<{item1: number, item2: number}> {
			return fetch(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/sbyte
		 */
		getsbyte(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/sbyte', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/short
		 */
		getShort(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/short', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/TextStream
		 */
		getTextStream(): Promise<Blob> {
			return fetch(this.baseUri + 'api/SuperDemo/TextStream', {method: 'get'}).then(d => d.blob());
		}

		/**
		 * GET api/SuperDemo/uint
		 */
		getUint(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/uint', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ulong
		 */
		getulong(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/ulong', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/ushort
		 */
		getUShort(): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/ushort', {method: 'get'}).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/ActionResult
		 */
		postActionResult(): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/ActionResult', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/PostActionResult2
		 */
		postActionResult2(s: string): Promise<Blob> {
			return fetch(this.baseUri + 'api/SuperDemo/PostActionResult2', {method: 'post', body: JSON.stringify(s)}).then(d => d.blob());
		}

		/**
		 * POST api/SuperDemo/PostActionResult3
		 */
		postActionResult3(person: DemoWebApi_DemoData_Client.Person): Promise<string> {
			return fetch(this.baseUri + 'api/SuperDemo/PostActionResult3', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(person) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/Collection
		 */
		postCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/Collection', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
		 * POST api/SuperDemo/DateTimeOffset
		 */
		postDateTimeOffset(d: Date): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/DateTimeOffset', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/DateTimeOffsetNullable
		 */
		postDateTimeOffsetNullable(d: Date): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/StringPersonDic
		 */
		postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/StringPersonDic', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(dic) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/Guids
		 */
		postGuids(guids: Array<string>): Promise<Array<string>> {
			return fetch(this.baseUri + 'api/SuperDemo/Guids', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(guids) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/ICollection
		 */
		postICollection(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/ICollection', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/IList
		 */
		postIList(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/IList', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/int2d
		 */
		postInt2D(a: number[][]): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/int2d', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(a) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/int2djagged
		 */
		postInt2DJagged(a: Array<Array<number>>): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/int2djagged', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(a) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/intArray
		 */
		postIntArray(a: Array<number>): Promise<boolean> {
			return fetch(this.baseUri + 'api/SuperDemo/intArray', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(a) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/IReadOnlyCollection
		 */
		postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/IReadOnlyList
		 */
		postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/IReadOnlyList', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/List
		 */
		postList(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
			return fetch(this.baseUri + 'api/SuperDemo/List', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(list) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/NextYear
		 */
		postNextYear(dt: Date): Promise<Date> {
			return fetch(this.baseUri + 'api/SuperDemo/NextYear', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(dt) }).then(d => d.json());
		}

		/**
		 * POST api/SuperDemo/PostEmpty/{i}
		 */
		postWithQueryButEmptyBody(s: string, i: number): Promise<{item1: string, item2: number}> {
			return fetch(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(s) }).then(d => d.json());
		}

		/**
		 * GET api/SuperDemo/SearchDateRange?startDate={startDate}&endDate={endDate}
		 */
		searchDateRange(startDate: Date, endDate: Date): Promise<{item1: Date, item2: Date}> {
			return fetch(this.baseUri + 'api/SuperDemo/SearchDateRange?' + (startDate ? 'startDate=' + startDate.toISOString() : '') + (endDate ? '&endDate=' + endDate.toISOString() : ''), {method: 'get'}).then(d => d.json());
		}
	}

	export class Tuple {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * POST api/Tuple/ChangeName
		 */
		changeName(d: {item1: string, item2: DemoWebApi_DemoData_Client.Person}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/ChangeName', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(d) }).then(d => d.json());
		}

		/**
		 * GET api/Tuple/PeopleCompany4
		 */
		getPeopleCompany4(): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany4', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Tuple/PeopleCompany5
		 */
		getPeopleCompany5(): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany5', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple1
		 */
		getTuple1(): Promise<{item1: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple1', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple2
		 */
		getTuple2(): Promise<{item1: string, item2: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple2', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple3
		 */
		getTuple3(): Promise<{item1: string, item2: string, item3: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple3', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple4
		 */
		getTuple4(): Promise<{item1: string, item2: string, item3: string, item4: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple4', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple5
		 */
		getTuple5(): Promise<{item1: string, item2: string, item3: string, item4: string, item5: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple5', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple6
		 */
		getTuple6(): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple6', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple7
		 */
		getTuple7(): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple7', {method: 'get'}).then(d => d.json());
		}

		/**
		 * GET api/Tuple/Tuple8
		 */
		getTuple8(): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}> {
			return fetch(this.baseUri + 'api/Tuple/Tuple8', {method: 'get'}).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany2
		 */
		linkPeopleCompany2(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany2', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany3
		 */
		linkPeopleCompany3(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany3', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany4
		 */
		linkPeopleCompany4(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany4', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany5
		 */
		linkPeopleCompany5(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany5', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany6
		 */
		linkPeopleCompany6(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany6', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany7
		 */
		linkPeopleCompany7(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany7', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PeopleCompany8
		 */
		linkPeopleCompany8(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PeopleCompany8', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/PersonCompany1
		 */
		linkPersonCompany1(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
			return fetch(this.baseUri + 'api/Tuple/PersonCompany1', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(peopleAndCompany) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/Tuple1
		 */
		postTuple1(tuple: {item1: number}): Promise<number> {
			return fetch(this.baseUri + 'api/Tuple/Tuple1', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.json());
		}

		/**
		 * POST api/Tuple/Tuple2
		 */
		postTuple2(tuple: {item1: string, item2: number}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple2', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple3
		 */
		postTuple3(tuple: {item1: string, item2: string, item3: number}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple3', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple4
		 */
		postTuple4(tuple: {item1: string, item2: string, item3: string, item4: number}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple4', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple5
		 */
		postTuple5(tuple: {item1: string, item2: string, item3: string, item4: string, item5: number}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple5', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple6
		 */
		postTuple6(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple6', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple7
		 */
		postTuple7(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple7', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}

		/**
		 * POST api/Tuple/Tuple8
		 */
		postTuple8(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: {item1: string, item2: string, item3: string}}): Promise<string> {
			return fetch(this.baseUri + 'api/Tuple/Tuple8', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(tuple) }).then(d => d.text());
		}
	}

	export class Values {
		constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
		}

		/**
		 * DELETE api/Values/{id}
		 */
		delete(id: number): Promise<Response> {
			return fetch(this.baseUri + 'api/Values/' + id, {method: 'delete'});
		}

		/**
		 * Get a list of value
		 * GET api/Values
		 */
		get(): Promise<Array<string>> {
			return fetch(this.baseUri + 'api/Values', {method: 'get'}).then(d => d.json());
		}

		/**
		 * Get by both Id and name
		 * GET api/Values/{id}?name={name}
		 */
		getByIdAndName(id: number, name: string): Promise<string> {
			return fetch(this.baseUri + 'api/Values/' + id + '?name=' + encodeURIComponent(name), {method: 'get'}).then(d => d.text());
		}

		/**
		 * GET api/Values?name={name}
		 */
		getByName(name: string): Promise<string> {
			return fetch(this.baseUri + 'api/Values?name=' + encodeURIComponent(name), {method: 'get'}).then(d => d.text());
		}

		/**
		 * GET api/Values/{id}
		 */
		getById(id: number): Promise<string> {
			return fetch(this.baseUri + 'api/Values/' + id, {method: 'get'}).then(d => d.text());
		}

		/**
		 * GET api/Values/Get2
		 */
		get2(): Promise<Array<string>> {
			return fetch(this.baseUri + 'api/Values/Get2', {method: 'get'}).then(d => d.json());
		}

		/**
		 * POST api/Values
		 */
		post(value: string): Promise<string> {
			return fetch(this.baseUri + 'api/Values', {method: 'post', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(value) }).then(d => d.text());
		}

		/**
		 * Update with valjue
		 * PUT api/Values/{id}
		 */
		put(id: number, value: string): Promise<Response> {
			return fetch(this.baseUri + 'api/Values/' + id, {method: 'put', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: JSON.stringify(value) });
		}
	}

}

