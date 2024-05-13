import {HttpClient} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-framework';
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

	export interface SuperHero extends DemoWebApi_Controllers_Client.Hero {
		super?: boolean | null;
	}


	/**
	 * For testing different commbinations of parameters and returns
	 */
	@autoinject()
	export class DateTypes {
		constructor(private http: HttpClient) {
		}

		/**
		 * GET api/DateTypes/GetDateOnlyMin
		 * @return {Date} Type: DateOnly
		 */
		getDateOnlyMin(headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/DateTypes/GetDateOnlyMin', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/DateTypes/NullableDatetime/{hasValue}
		 */
		getDateTime(hasValue: boolean | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/DateTypes/NullableDatetime/' + hasValue, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * return DateTimeOffset.Now
		 * GET api/DateTypes/ForDateTimeOffset
		 */
		getDateTimeOffset(headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/DateTypes/ForDateTimeOffset', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/DateTypes/NextHour/{dt}
		 */
		getNextHour(dt: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/DateTypes/NextHour/' + dt?.toISOString(), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * If Dt is not defined, add a hour from now
		 * GET api/DateTypes/NextHourNullable?n={n}&dt={dt}
		 * @param {number} n Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getNextHourNullable(n: number | null, dt: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/DateTypes/NextHourNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/DateTypes/NextYear/{dt}
		 */
		getNextYear(dt: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/DateTypes/NextYear/' + dt?.toISOString(), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * If Dt is not defined, add a year from now
		 * GET api/DateTypes/NextYearNullable?n={n}&dt={dt}
		 * @param {number} n Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getNextYearNullable(n: number | null, dt: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/DateTypes/NextYearNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Client should send DateTime.Date
		 * POST api/DateTypes/IsDateTimeDate
		 */
		isDateTimeDate(dt: Date | null, headersHandler?: () => {[header: string]: string}): Promise<{item1: Date, item2: Date}> {
			return this.http.post('api/DateTypes/IsDateTimeDate', JSON.stringify(dt), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/DateTypes/IsDateTimeOffsetDate
		 */
		isDateTimeOffsetDate(dt: Date | null, headersHandler?: () => {[header: string]: string}): Promise<{item1: Date, item2: Date}> {
			return this.http.post('api/DateTypes/IsDateTimeOffsetDate', JSON.stringify(dt), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/DateTypes/ForDateOnly
		 * @param {Date} d Type: DateOnly
		 * @return {Date} Type: DateOnly
		 */
		postDateOnly(d: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.post('api/DateTypes/ForDateOnly', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/DateTypes/DateOnlyNullable
		 */
		postDateOnlyNullable(d: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.post('api/DateTypes/DateOnlyNullable', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/DateTypes/ForDateTime
		 */
		postDateTime(d: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.post('api/DateTypes/ForDateTime', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/DateTypes/DateTimeNullable
		 */
		postDateTimeNullable(d: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.post('api/DateTypes/DateTimeNullable', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * return d;
		 * POST api/DateTypes/ForDateTimeOffset
		 */
		postDateTimeOffset(d: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.post('api/DateTypes/ForDateTimeOffset', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * return d.ToString("O")
		 * POST api/DateTypes/ForDateTimeOffsetForO
		 */
		postDateTimeOffsetForO(d: Date | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/DateTypes/ForDateTimeOffsetForO', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * POST api/DateTypes/ForDateTimeOffsetForOffset
		 */
		postDateTimeOffsetForOffset(d: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/DateTypes/ForDateTimeOffsetForOffset', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Returned is DateTimeOffset?
		 * POST api/DateTypes/DateTimeOffsetNullable
		 */
		postDateTimeOffsetNullable(d: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.post('api/DateTypes/DateTimeOffsetNullable', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/DateTypes/ForDateTimeOffsetStringForOffset
		 */
		postDateTimeOffsetStringForOffset(s: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/DateTypes/ForDateTimeOffsetStringForOffset', JSON.stringify(s), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * POST api/DateTypes/NextYear
		 */
		postNextYear(dt: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.post('api/DateTypes/NextYear', JSON.stringify(dt), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/DateTypes/DateOnlyStringQuery?d={d}
		 * @return {Date} Type: DateOnly
		 */
		queryDateOnlyAsString(d: string | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/DateTypes/DateOnlyStringQuery?d=' + (!d ? '' : encodeURIComponent(d)), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/DateTypes/RouteDateTimeOffset/{d}
		 */
		routeDateTimeOffset(d: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Date> {
			return this.http.get('api/DateTypes/RouteDateTimeOffset/' + d?.toISOString(), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Return Tuple DateTime?, DateTime?
		 * GET api/DateTypes/SearchDateRange?startDate={startDate}&endDate={endDate}
		 * @param {Date} startDate DateTime? startDate = null
		 * @param {Date} endDate DateTime? endDate = null
		 */
		searchDateRange(startDate: Date | null, endDate: Date | null, headersHandler?: () => {[header: string]: string}): Promise<{item1: Date, item2: Date}> {
			return this.http.get('api/DateTypes/SearchDateRange?' + (startDate ? 'startDate=' + startDate?.toISOString() : '') + (endDate ? '&endDate=' + endDate?.toISOString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}
	}


	/**
	 * Entities, Person and Company
	 * Some with AuthorizeAttribute
	 */
	@autoinject()
	export class Entities {
		constructor(private http: HttpClient) {
		}

		/**
		 * POST api/Entities/createCompany
		 */
		createCompany(p: DemoWebApi_DemoData_Client.Company | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Company> {
			return this.http.post('api/Entities/createCompany', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Entities/createPerson
		 * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		createPerson(p: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Entities/createPerson', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Entities/createPerson2
		 */
		createPerson2(p: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Entities/createPerson2', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Entities/createPerson3
		 */
		createPerson3(p: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Entities/createPerson3', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Entities/createPersonByAdmin
		 * Status Codes: 404:NotFound, 204:NoContent, 422:UnprocessableEntity
		 */
		createPersonByAdmin(p: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Entities/createPersonByAdmin', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Entities/createPersonWeak
		 * Status Codes: 404:NotFound, 204:NoContent, 200:OK : DemoWebApi.DemoData.Person
		 */
		createPersonWeak(p: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Entities/createPersonWeak', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Entities/createPersonWithNotFound
		 * Status Codes: 404:NotFound
		 */
		createPersonWithNotFound(p: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Entities/createPersonWithNotFound', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Entities/createPersonWithStatuses
		 * Status Codes: 404:NotFound, 204:NoContent, 422:UnprocessableEntity
		 */
		createPersonWithStatuses(p: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Entities/createPersonWithStatuses', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * DELETE api/Entities/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		delete(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Entities/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Entities/Company/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getCompany(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Company> {
			return this.http.get('api/Entities/Company/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Entities/Mims
		 */
		getMims(p: DemoWebApi_DemoData_Client.MimsPackage | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.MimsResult<string>> {
			return this.http.post('api/Entities/Mims', JSON.stringify(p), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post MyGeneric string, decimal, double
		 * POST api/Entities/MyGeneric
		 */
		getMyGeneric(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, number> | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, number>> {
			return this.http.post('api/Entities/MyGeneric', JSON.stringify(s), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post MyGeneric string, decimal, Person
		 * POST api/Entities/MyGenericPerson
		 */
		getMyGenericPerson(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>> {
			return this.http.post('api/Entities/MyGenericPerson', JSON.stringify(s), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Return empty body, status 204. MaybeNull
		 * GET api/Entities/NullCompany
		 */
		getNullCompany(headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Company> {
			return this.http.get('api/Entities/NullCompany', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get a person
		 * so to know the person
		 * GET api/Entities/getPerson/{id}
		 * @param {string} id unique id of that guy
		 * @return {DemoWebApi_DemoData_Client.Person} person in db
		 */
		getPerson(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.get('api/Entities/getPerson/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Entities/getPerson2/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getPerson2(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.get('api/Entities/getPerson2/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * PUT api/Entities/link?id={id}&relationship={relationship}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		linkPerson(id: string | null, relationship: string | null, person: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.put('api/Entities/link?id=' + id + '&relationship=' + (!relationship ? '' : encodeURIComponent(relationship)), JSON.stringify(person), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
		 * PATCH api/Entities/patchPerson
		 */
		patchPerson(person: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.patch('api/Entities/patchPerson', JSON.stringify(person), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * POST api/Entities/IdMap
		 */
		postIdMap(idMap: DemoWebApi_DemoData_Client.IdMap | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.IdMap> {
			return this.http.post('api/Entities/IdMap', JSON.stringify(idMap), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * PUT api/Entities/updatePerson
		 */
		updatePerson(person: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.put('api/Entities/updatePerson', JSON.stringify(person), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}
	}


	/**
	 * Heroes operations. Decorated by nullable directive.
	 */
	@autoinject()
	export class Heroes {
		constructor(private http: HttpClient) {
		}

		/**
		 * DELETE api/Heroes/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		delete(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Heroes/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Heroes/asyncHeroes
		 */
		getAsyncHeroes(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return this.http.get('api/Heroes/asyncHeroes', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get a hero. Nullable reference. MaybeNull
		 * GET api/Heroes/{id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getHero(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return this.http.get('api/Heroes/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get all heroes.
		 * GET api/Heroes
		 */
		getHeros(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return this.http.get('api/Heroes', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * MaybeNull
		 * GET api/Heroes/super?id={id}
		 * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		getSuperHero(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.SuperHero> {
			return this.http.get('api/Heroes/super?id=' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Heroes
		 */
		post(name: string | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return this.http.post('api/Heroes', JSON.stringify(name), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Add a hero. The client will not expect null. NotNull
		 * POST api/Heroes/q?name={name}
		 * @param {string} name name of hero
		 * @return {DemoWebApi_Controllers_Client.Hero} Always object.
		 */
		postWithQuery(name: string | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return this.http.post('api/Heroes/q?name=' + (!name ? '' : encodeURIComponent(name)), null, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Update hero.
		 * PUT api/Heroes
		 */
		put(hero: DemoWebApi_Controllers_Client.Hero | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_Controllers_Client.Hero> {
			return this.http.put('api/Heroes', JSON.stringify(hero), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Search heroes
		 * GET api/Heroes/search/{name}
		 * @param {string} name keyword contained in hero name.
		 * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
		 */
		search(name: string | null, headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
			return this.http.get('api/Heroes/search/' + (!name ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}
	}


	/**
	 * For testing different commbinations of parameters and returns
	 */
	@autoinject()
	export class Numbers {
		constructor(private http: HttpClient) {
		}

		/**
		 * GET api/Numbers/byte?d={d}
		 * @param {number} d Type: byte, 0 to 255
		 * @return {number} Type: byte, 0 to 255
		 */
		getByte(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/Numbers/byte?d=' + d, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Numbers/byteWithRange?d={d}
		 * @param {number} d Byte for small number.
		 * @return {number} Type: byte, 0 to 255
		 */
		getByteWithRange(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/Numbers/byteWithRange?d=' + d, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/byte
		 * @param {number} d Type: byte, 0 to 255
		 * @return {number} Type: byte, 0 to 255
		 */
		postByDOfByte(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Numbers/byte', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/sbyte
		 * @param {number} d Type: sbyte, -128 to 127
		 * @return {number} Type: sbyte, -128 to 127
		 */
		postByDOfSByte(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Numbers/sbyte', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/short
		 * @param {number} d Type: short, -32,768 to 32,767
		 * @return {number} Type: short, -32,768 to 32,767
		 */
		postByDOfInt16(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Numbers/short', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/ushort
		 * @param {number} d Type: ushort, 0 to 65,535
		 * @return {number} Type: ushort, 0 to 65,535
		 */
		postByDOfUInt16(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Numbers/ushort', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/int
		 * @param {number} d Type: int, -2,147,483,648 to 2,147,483,647
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postByDOfInt32(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Numbers/int', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/long
		 * @param {string} d Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		postByDOfInt64(d: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Numbers/long', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/ulong
		 * @param {string} d Type: ulong, 0 to 18,446,744,073,709,551,615
		 * @return {string} Type: ulong, 0 to 18,446,744,073,709,551,615
		 */
		postByDOfUInt64(d: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Numbers/ulong', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/bigInteger
		 * @param {string} bigInteger Type: BigInteger
		 * @return {string} Type: BigInteger
		 */
		postBigInteger(bigInteger: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Numbers/bigInteger', JSON.stringify(bigInteger), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/bigIntegralAsStringForJs
		 */
		postBigIntegralAsStringForJs(bigIntegral: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Numbers/bigIntegralAsStringForJs', JSON.stringify(bigIntegral), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * POST api/Numbers/BigNumbers
		 */
		postBigNumbers(bigNumbers: DemoWebApi_DemoData_Client.BigNumbers | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.BigNumbers> {
			return this.http.post('api/Numbers/BigNumbers', JSON.stringify(bigNumbers), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/int128
		 * @param {string} int128 Type: Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727
		 * @return {string} Type: Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727
		 */
		postInt128(int128: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Numbers/int128', JSON.stringify(int128), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/int64
		 * @param {string} int64 Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		postInt64(int64: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Numbers/int64', JSON.stringify(int64), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/IntegralEntity
		 */
		postIntegralEntity(integralEntity: DemoWebApi_DemoData_Client.IntegralEntity | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.IntegralEntity> {
			return this.http.post('api/Numbers/IntegralEntity', JSON.stringify(integralEntity), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/IntegralEntityMustBeValid
		 */
		postIntegralEntityMustBeValid(integralEntity: DemoWebApi_DemoData_Client.IntegralEntity | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.IntegralEntity> {
			return this.http.post('api/Numbers/IntegralEntityMustBeValid', JSON.stringify(integralEntity), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/intRange
		 * @param {number} d Type: int
		 *     Range: inclusive between 1 and 100
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postIntWithRange(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Numbers/intRange', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Range is with double, not long. Precision of double: ~15-17 digits, while long.MaxValue 9223372036854775807 has 19 decimal digits.
		 * POST api/Numbers/longRange
		 * @param {string} d Type: long
		 *     Range: inclusive between 1000 and 9223372036854775800
		 * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
		 */
		postLongWithRange(d: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Numbers/longRange', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/uint128
		 * @param {string} uint128 Type: UInt128, 0 to 340282366920938463463374607431768211455
		 * @return {string} Type: UInt128, 0 to 340282366920938463463374607431768211455
		 */
		postUint128(uint128: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Numbers/uint128', JSON.stringify(uint128), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Numbers/uint64
		 * @param {string} uint64 Type: ulong, 0 to 18,446,744,073,709,551,615
		 * @return {string} Type: ulong, 0 to 18,446,744,073,709,551,615
		 */
		postUint64(uint64: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Numbers/uint64', JSON.stringify(uint64), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}
	}


	/**
	 * For testing posting and getting string data. Returned string is JSON object.
	 */
	@autoinject()
	export class StringData {
		constructor(private http: HttpClient) {
		}

		/**
		 * Athlethe Search
		 * GET api/StringData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
		 * @param {number} take Generic optional parameter. Default 10
		 * @param {number} skip Default 0
		 * @param {string} order default null
		 */
		athletheSearch(take: number | null, skip: number | null, order: string | null, sort: string | null, search: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/StringData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * GET api/StringData/String
		 */
		getABCDE(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/StringData/String', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * Return empty string JSON object. Status 200.
		 * GET api/StringData/EmptyString
		 */
		getEmptyString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/StringData/EmptyString', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * Return empty body with status 204 No Content, even though the default mime type is application/json. MaybeNull
		 * GET api/StringData/NullString
		 */
		getNullString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/StringData/NullString', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}
	}


	/**
	 * For testing different commbinations of parameters and returns
	 */
	@autoinject()
	export class SuperDemo {
		constructor(private http: HttpClient) {
		}

		/**
		 * GET api/SuperDemo/ActionResult
		 */
		getActionResult(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/ActionResult', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/ActionResult2
		 */
		getActionResult2(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/ActionResult2', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/ActionStringResult
		 * Status Codes: 200:OK : System.String
		 */
		getActionStringResult(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/ActionStringResult', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * GET api/SuperDemo/BadRequest
		 */
		getBadRequest(headersHandler?: () => {[header: string]: string}): Promise<Blob> {
			return this.http.get('api/SuperDemo/BadRequest', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.blob(); throw d;});
		}

		/**
		 * GET api/SuperDemo/BadRequest2
		 */
		getBadRequest2(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/BadRequest2', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/bool
		 */
		getBool(headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.get('api/SuperDemo/bool', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/byte
		 * @return {number} Type: byte, 0 to 255
		 */
		getbyte(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/byte', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/ByteArray
		 */
		getByteArray(headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/ByteArray', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/char
		 * @return {string} Type: char
		 */
		getChar(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/char', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/Collection
		 */
		getCollection(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/Collection', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/enumGet?d={d}
		 */
		getDay(d: DemoWebApi_DemoData_Client.Days | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Days> {
			return this.http.get('api/SuperDemo/enumGet?d=' + d, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/decimal
		 * @return {number} Type: decimal
		 */
		getDecimal(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/decimal', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Demo
		 * GET api/SuperDemo/decimalArrayQ?a={a}
		 */
		getDecimalArrayQ(a: Array<number> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/decimalArrayQ?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/decimal/{d}
		 * @param {number} d Type: decimal
		 * @return {number} Type: decimal
		 */
		getDecimalSquare(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/decimal/' + d, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/DecimalZero
		 * @return {number} Type: decimal
		 */
		getDecimalZero(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/DecimalZero', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/StringStringDic
		 */
		getDictionary(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: string }> {
			return this.http.get('api/SuperDemo/StringStringDic', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/StringPersonDic
		 */
		getDictionaryOfPeople(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: DemoWebApi_DemoData_Client.Person }> {
			return this.http.get('api/SuperDemo/StringPersonDic', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/StringPersonDic2
		 */
		getDictionaryOfPeople2(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: DemoWebApi_DemoData_Client.Person }> {
			return this.http.get('api/SuperDemo/StringPersonDic2', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/doulbe
		 * @return {number} Type: double
		 */
		getdouble(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/doulbe', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Result of 0.1d + 0.2d - 0.3d
		 * GET api/SuperDemo/DoubleZero
		 * @return {number} Type: double
		 */
		getDoubleZero(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/DoubleZero', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Demo IEnumerable Days
		 * GET api/SuperDemo/enumArrayDays?a={a}
		 */
		getEnumArrayDays(a: Array<DemoWebApi_DemoData_Client.Days> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Days>> {
			return this.http.get('api/SuperDemo/enumArrayDays?'+a?.map(z => `a=${z}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/enumArrayQ2?a={a}
		 */
		getEnumArrayQ2(a: Array<number> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/enumArrayQ2?'+a?.map(z => `a=${z}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/FloatZero
		 * @return {number} Type: float
		 */
		getFloatZero(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/FloatZero', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/ICollection
		 */
		getICollection(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/ICollection', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/IList
		 */
		getIList(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/IList', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/int2d
		 */
		getInt2D(headersHandler?: () => {[header: string]: string}): Promise<number[][]> {
			return this.http.get('api/SuperDemo/int2d', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/int2dJagged
		 */
		getInt2DJagged(headersHandler?: () => {[header: string]: string}): Promise<Array<Array<number>>> {
			return this.http.get('api/SuperDemo/int2dJagged', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/intArray
		 */
		getIntArray(headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/intArray', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Demo int[];
		 * GET api/SuperDemo/intArrayQ?a={a}
		 */
		getIntArrayQ(a: Array<number> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<number>> {
			return this.http.get('api/SuperDemo/intArrayQ?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Demo IEnumerable long
		 * GET api/SuperDemo/intArrayQ2?a={a}
		 */
		getIntArrayQ2(a: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.get('api/SuperDemo/intArrayQ2?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/int/{d}
		 * @param {number} d Type: int, -2,147,483,648 to 2,147,483,647
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getIntSquare(d: number | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/int/' + d, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/IReadOnlyCollection
		 */
		getIReadOnlyCollection(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/IReadOnlyCollection', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/IReadOnlyList
		 */
		getIReadOnlyList(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/IReadOnlyList', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/KeyValuePair
		 */
		getKeyhValuePair(headersHandler?: () => {[header: string]: string}): Promise<{key: string, value: DemoWebApi_DemoData_Client.Person }> {
			return this.http.get('api/SuperDemo/KeyValuePair', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/List
		 */
		getList(headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
			return this.http.get('api/SuperDemo/List', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * False to return null, and true to return 1000
		 * GET api/SuperDemo/NullableDecimal/{hasValue}
		 */
		getNullableDecimal(hasValue: boolean | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/NullableDecimal/' + hasValue, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * MaybeNull
		 * GET api/SuperDemo/NullObject
		 */
		getNullPerson(headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.get('api/SuperDemo/NullObject', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
		 */
		getPrimitiveNullable(location: string | null, dd: number | null, de: number | null, headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: number, item3: number}> {
			return this.http.get('api/SuperDemo/DoubleNullable?location=' + (!location ? '' : encodeURIComponent(location)) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
		 */
		getPrimitiveNullable2(dd: number | null, de: number | null, headersHandler?: () => {[header: string]: string}): Promise<{item1: number, item2: number}> {
			return this.http.get('api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/sbyte
		 * @return {number} Type: sbyte, -128 to 127
		 */
		getsbyte(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/sbyte', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/short
		 * @return {number} Type: short, -32,768 to 32,767
		 */
		getShort(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/short', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Demo string array
		 * GET api/SuperDemo/stringArrayQ?a={a}
		 */
		getStringArrayQ(a: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.get('api/SuperDemo/stringArrayQ?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Demo List string
		 * GET api/SuperDemo/stringArrayQ2?a={a}
		 */
		getStringArrayQ2(a: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.get('api/SuperDemo/stringArrayQ2?'+a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * ActionResult with FileStreamResult
		 * GET api/SuperDemo/TextStream
		 */
		getTextStream(headersHandler?: () => {[header: string]: string}): Promise<Blob> {
			return this.http.get('api/SuperDemo/TextStream', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.blob(); throw d;});
		}

		/**
		 * GET api/SuperDemo/uint
		 * @return {number} Type: uint, 0 to 4,294,967,295
		 */
		getUint(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/uint', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/ulong
		 * @return {string} Type: ulong, 0 to 18,446,744,073,709,551,615
		 */
		getulong(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/SuperDemo/ulong', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/SuperDemo/ushort
		 * @return {number} Type: ushort, 0 to 65,535
		 */
		getUShort(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/SuperDemo/ushort', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/SuperDemo/ActionResult
		 */
		postActionResult(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/SuperDemo/ActionResult', null, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/SuperDemo/PostActionResult2
		 */
		postActionResult2(s: string | null, headersHandler?: () => {[header: string]: string}): Promise<Blob> {
			return this.http.post('api/SuperDemo/PostActionResult2', JSON.stringify(s), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.blob(); throw d;});
		}

		/**
		 * POST api/SuperDemo/PostActionResult3
		 */
		postActionResult3(person: DemoWebApi_DemoData_Client.Person | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/SuperDemo/PostActionResult3', JSON.stringify(person), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post a collection of person
		 * POST api/SuperDemo/Collection
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postCollection(list: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/Collection', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/SuperDemo/enumPost?d={d}
		 */
		postDay(d: DemoWebApi_DemoData_Client.Days | null, d2: DemoWebApi_DemoData_Client.Days | null, headersHandler?: () => {[header: string]: string}): Promise<Array<DemoWebApi_DemoData_Client.Days>> {
			return this.http.post('api/SuperDemo/enumPost?d=' + d, JSON.stringify(d2), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Demo Dic string and person
		 * POST api/SuperDemo/StringPersonDic
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person } | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/SuperDemo/Guids
		 */
		postGuids(guids: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.post('api/SuperDemo/Guids', JSON.stringify(guids), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post ICollection of person
		 * POST api/SuperDemo/ICollection
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postICollection(list: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/ICollection', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post IList of person
		 * POST api/SuperDemo/IList
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postIList(list: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/IList', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/SuperDemo/int2d
		 */
		postInt2D(a: number[][] | null, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.post('api/SuperDemo/int2d', JSON.stringify(a), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Demo int[][]
		 * POST api/SuperDemo/int2djagged
		 */
		postInt2DJagged(a: Array<Array<number>> | null, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.post('api/SuperDemo/int2djagged', JSON.stringify(a), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Demo int[]
		 * POST api/SuperDemo/intArray
		 * @param {Array<number>} a Min length: 1
		 *     Max length: 10
		 */
		postIntArray(a: Array<number> | null, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.post('api/SuperDemo/intArray', JSON.stringify(a), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post IReadOnlyCollection of person
		 * POST api/SuperDemo/IReadOnlyCollection
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post e of person
		 * POST api/SuperDemo/IReadOnlyList
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post a list of person
		 * POST api/SuperDemo/List
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postList(list: Array<DemoWebApi_DemoData_Client.Person> | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/SuperDemo/List', JSON.stringify(list), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/SuperDemo/PostEmpty/{i}
		 * @param {number} i Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postWithQueryButEmptyBody(s: string | null, i: number | null, headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: number}> {
			return this.http.post('api/SuperDemo/PostEmpty/' + i, JSON.stringify(s), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}
	}


	/**
	 * For testing posting and getting string data. String returned is text/plain by default
	 */
	@autoinject()
	export class TextData {
		constructor(private http: HttpClient) {
		}

		/**
		 * GET api/TextData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
		 * @param {number} skip Type: int, -2,147,483,648 to 2,147,483,647
		 */
		athletheSearch(take: number | null, skip: number | null, order: string | null, sort: string | null, search: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/TextData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * GET api/TextData/String
		 */
		getABCDE(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/TextData/String', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * Return empty body with status 200.
		 * GET api/TextData/EmptyString
		 */
		getEmptyString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/TextData/EmptyString', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * MaybeNull
		 * GET api/TextData/NullableString
		 */
		getNullableString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/TextData/NullableString', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * Return empty body with status 204 No Content.
		 * GET api/TextData/NullString
		 */
		getNullString(headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/TextData/NullString', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}
	}


	/**
	 * https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.3.3
	 */
	@autoinject()
	export class Tuple {
		constructor(private http: HttpClient) {
		}

		/**
		 * Update in a transaction
		 * PUT api/Tuple/A1TupleArray
		 */
		a1TupleArray(idAndOrderArray: Array<{item1: string, item2: number}> | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Tuple/A1TupleArray', JSON.stringify(idAndOrderArray), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Update IEnumerable Tuple in a transaction
		 * PUT api/Tuple/A2TupleArray
		 */
		a2TupleIEnumerable(idAndOrderArray: Array<{item1: string, item2: number}> | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Tuple/A2TupleArray', JSON.stringify(idAndOrderArray), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Post tuple
		 * POST api/Tuple/ChangeName
		 */
		changeName(d: {item1: string, item2: DemoWebApi_DemoData_Client.Person} | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/ChangeName', JSON.stringify(d), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get Tuple in return. MaybeNull
		 * GET api/Tuple/PeopleCompany4
		 */
		getPeopleCompany4(headersHandler?: () => {[header: string]: string}): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}> {
			return this.http.get('api/Tuple/PeopleCompany4', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * MaybeNull
		 * GET api/Tuple/PeopleCompany5
		 */
		getPeopleCompany5(headersHandler?: () => {[header: string]: string}): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}> {
			return this.http.get('api/Tuple/PeopleCompany5', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Tuple/Tuple1
		 */
		getTuple1(headersHandler?: () => {[header: string]: string}): Promise<{item1: number}> {
			return this.http.get('api/Tuple/Tuple1', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Tuple/Tuple2
		 */
		getTuple2(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: number}> {
			return this.http.get('api/Tuple/Tuple2', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Tuple/Tuple3
		 */
		getTuple3(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: number}> {
			return this.http.get('api/Tuple/Tuple3', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Tuple/Tuple4
		 */
		getTuple4(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: number}> {
			return this.http.get('api/Tuple/Tuple4', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Tuple/Tuple5
		 */
		getTuple5(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: number}> {
			return this.http.get('api/Tuple/Tuple5', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Tuple/Tuple6
		 */
		getTuple6(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}> {
			return this.http.get('api/Tuple/Tuple6', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Tuple/Tuple7
		 */
		getTuple7(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number}> {
			return this.http.get('api/Tuple/Tuple7', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post nested tuple
		 * GET api/Tuple/Tuple8
		 */
		getTuple8(headersHandler?: () => {[header: string]: string}): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}> {
			return this.http.get('api/Tuple/Tuple8', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Tuple/PeopleCompany2
		 */
		linkPeopleCompany2(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Tuple/PeopleCompany3
		 */
		linkPeopleCompany3(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Tuple/PeopleCompany4
		 */
		linkPeopleCompany4(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Tuple/PeopleCompany5
		 */
		linkPeopleCompany5(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Tuple/PeopleCompany6
		 */
		linkPeopleCompany6(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post long tuple
		 * POST api/Tuple/PeopleCompany7
		 */
		linkPeopleCompany7(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Tuple/PeopleCompany8
		 */
		linkPeopleCompany8(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Tuple/PersonCompany1
		 */
		linkPersonCompany1(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company} | null, headersHandler?: () => {[header: string]: string}): Promise<DemoWebApi_DemoData_Client.Person> {
			return this.http.post('api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Tuple/Tuple1
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		postTuple1(tuple: {item1: number} | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Tuple/Tuple1', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Post tuple string int
		 * POST api/Tuple/Tuple2
		 */
		postTuple2(tuple: {item1: string, item2: number} | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple2', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * POST api/Tuple/Tuple3
		 */
		postTuple3(tuple: {item1: string, item2: string, item3: number} | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple3', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * POST api/Tuple/Tuple4
		 */
		postTuple4(tuple: {item1: string, item2: string, item3: string, item4: number} | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple4', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * POST api/Tuple/Tuple5
		 */
		postTuple5(tuple: {item1: string, item2: string, item3: string, item4: string, item5: number} | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple5', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * POST api/Tuple/Tuple6
		 */
		postTuple6(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number} | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple6', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * POST api/Tuple/Tuple7
		 */
		postTuple7(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number} | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple7', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * POST api/Tuple/Tuple8
		 */
		postTuple8(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: {item1: string, item2: string, item3: string}} | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tuple/Tuple8', JSON.stringify(tuple), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}
	}

	@autoinject()
	export class Values {
		constructor(private http: HttpClient) {
		}

		/**
		 * DELETE api/Values/{id}
		 * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
		 */
		delete(id: number | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Values/' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Get a list of value
		 * GET api/Values
		 */
		get(headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.get('api/Values', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get by both Id and name
		 * GET api/Values/Name/{id}?name={name}
		 * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getByIdOfInt32AndNameOfString(id: number | null, name: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/Values/Name/' + id + '?name=' + (!name ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * Get by name
		 * GET api/Values?name={name}
		 */
		getByNameOfString(name: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/Values?name=' + (!name ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * Get by Id
		 * GET api/Values/{id}
		 * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getByIdOfInt32(id: number | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.get('api/Values/' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * Get a list of value async, it is get2
		 * GET api/Values/Get2
		 */
		get2(headersHandler?: () => {[header: string]: string}): Promise<Array<string>> {
			return this.http.get('api/Values/Get2', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Values
		 */
		post(value: string | null, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Values', JSON.stringify(value), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.status == 204 ? null : d.text(); throw d;});
		}

		/**
		 * Update with valjue
		 * PUT api/Values/{id}
		 * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
		 */
		put(id: number | null, value: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Values/' + id, JSON.stringify(value), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}
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
		 * Type: double
		 */
		x: number;

		/**
		 * Y
		 * Type: double
		 */
		y: number;
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
		 * Required
		 * Min length: 2
		 * Max length: 255
		 */
		name: string;
		phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;

		/** Type: Uri */
		web?: string | null;
	}

}

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
		 * Type: int, -2,147,483,648 to 2,147,483,647
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

	export interface PhoneNumber {

		/** Max length: 120 */
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

export namespace DemoWebApi_Models_Client {
	export interface AddExternalLoginBindingModel {

		/** Required */
		externalAccessToken?: string | null;
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

	export interface RegisterExternalBindingModel {

		/** Required */
		email?: string | null;
	}

	export interface RemoveLoginBindingModel {

		/** Required */
		loginProvider?: string | null;

		/** Required */
		providerKey?: string | null;
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
		 * Async function returing dynamic
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
		 * Async function returning object
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
		 * Async returning object, Post dynamic
		 * POST api/SpecialTypes/AnonymousObject2
		 */
		postAnonymousObject2(obj: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/SpecialTypes/AnonymousObject2', JSON.stringify(obj), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}
	}

}

export namespace PoemsApp_Controllers_Client {

	/**
	 * Album specific operations
	 */
	@autoinject()
	export class Albums {
		constructor(private http: HttpClient) {
		}

		/**
		 * Add album. If publisheDate is not defined, it will be now.
		 * POST api/Albums
		 */
		add(album: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/Albums', JSON.stringify(album), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Delete along with what in poemAlbumMap.
		 * DELETE api/Albums?id={id}
		 * @param {string} id Type: GUID
		 */
		delete(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.delete('api/Albums?id=' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get Album. Support ZH Convert.
		 * GET api/Albums?id={id}
		 * @param {string} id Type: GUID
		 */
		get(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/Albums?id=' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Get all albums. Support ZH Convert.
		 * GET api/Albums/all
		 * @param {number} timezoneOffset int in header
		 */
		getAll(headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Albums/all', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get all albums as dictionary. Support ZH Convert.
		 * GET api/Albums/allDic
		 * @param {number} timezoneOffset int in header
		 */
		getAllDic(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: any }> {
			return this.http.get('api/Albums/allDic', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * PUT api/Albums
		 */
		update(album: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Albums', JSON.stringify(album), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}
	}


	/**
	 * Annotations management
	 */
	@autoinject()
	export class Annotations {
		constructor(private http: HttpClient) {
		}

		/**
		 * POST api/Annotations
		 * @return {string} Type: GUID
		 */
		add(annotation: any, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Annotations', JSON.stringify(annotation), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Delete along with what in poemAnnotationMap.
		 * DELETE api/Annotations?id={id}
		 * @param {string} id Type: GUID
		 */
		delete(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.delete('api/Annotations?id=' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Annotations/Orphaned
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		deleteOrphaned(ids: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Annotations/Orphaned', JSON.stringify(ids), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get annotation. Support ZH Convert.
		 * GET api/Annotations?id={id}
		 * @param {string} id Type: GUID
		 */
		get(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/Annotations?id=' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Annotations/all
		 */
		getAnnotationBriefs(headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Annotations/all', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get all annotation briefs. Support ZH Convert.
		 * GET api/Annotations/allDic
		 */
		getAnnotationBriefsDic(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: any }> {
			return this.http.get('api/Annotations/allDic', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Annotations/Orphaned
		 */
		getOrphaned(headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Annotations/Orphaned', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Annotations/PoemCountOfAnnotations
		 */
		getPoemCountOfAnnotations(headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Annotations/PoemCountOfAnnotations', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * PUT api/Annotations
		 */
		update(annotation: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Annotations', JSON.stringify(annotation), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}
	}


	/**
	 * Annotations management
	 */
	@autoinject()
	export class NumberedAnnotations {
		constructor(private http: HttpClient) {
		}

		/**
		 * POST api/NumberedAnnotations
		 * @return {string} Type: GUID
		 */
		add(numberedAnnotation: any, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/NumberedAnnotations', JSON.stringify(numberedAnnotation), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Add multiple annotations
		 * POST api/NumberedAnnotations/poem/{poemId}
		 * @param {string} poemId Type: GUID
		 */
		addMuitiple(poemId: string | null, orderNumbers: Array<number> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.post('api/NumberedAnnotations/poem/' + poemId, JSON.stringify(orderNumbers), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Update the orders of numbered annotations in a transaction
		 * PUT api/NumberedAnnotations/BulkOrderNumbers
		 */
		bulkUpdateOrderNumbers(idAndOrderArray: Array<{item1: string, item2: number}> | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/NumberedAnnotations/BulkOrderNumbers', JSON.stringify(idAndOrderArray), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Delete along with what in poemNumberedAnnotationMap.
		 * DELETE api/NumberedAnnotations?id={id}
		 * @param {string} id Type: GUID
		 */
		delete(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.delete('api/NumberedAnnotations?id=' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get numberedAnnotation. Support ZH Convert.
		 * GET api/NumberedAnnotations?id={id}
		 * @param {string} id Type: GUID
		 */
		get(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/NumberedAnnotations?id=' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Update annotation
		 * PUT api/NumberedAnnotations
		 */
		update(numberedAnnotation: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/NumberedAnnotations', JSON.stringify(numberedAnnotation), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Update Order Number
		 * PUT api/NumberedAnnotations/OrderNumber?id={id}&orderNumber={orderNumber}
		 * @param {string} id Type: GUID
		 * @param {number} orderNumber Type: int, -2,147,483,648 to 2,147,483,647
		 */
		updateOrderNumber(id: string | null, orderNumber: number | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/NumberedAnnotations/OrderNumber?id=' + id + '&orderNumber=' + orderNumber, null, { headers: headersHandler ? headersHandler() : undefined });
		}
	}


	/**
	 * Poems operations; associations with tags, albums and annotations.
	 */
	@autoinject()
	export class Poems {
		constructor(private http: HttpClient) {
		}

		/**
		 * Add poem. If created is undefined, it will be now. And modified is always now.
		 * POST api/Poems
		 * @return {any} Id of newly added
		 */
		add(poem: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/Poems', JSON.stringify(poem), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Add new poem with existing annotations and new annotation names.
		 * PUT api/Poems/AddWithExistingAnnotations
		 * @param {{item1: any, item2: Array<string>}} poemAndAnnotations new poem, existing Annotation Ids, and new annotation names
		 * @return {any} Poem Id and new annotation objects
		 */
		addWithExistingAnnotations(poemAndAnnotations: {item1: any, item2: Array<string>} | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/AddWithExistingAnnotations', JSON.stringify(poemAndAnnotations), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Poem with Tags
		 * POST api/Poems/addWithExistingTags
		 */
		addWithExistingTags(poemAndTags: {item1: any, item2: Array<string>} | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/Poems/addWithExistingTags', JSON.stringify(poemAndTags), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * PUT api/Poems/AddWithNewAnnotationNames
		 */
		addWithNewAnnotationNames(poemAndAnnotations: {item1: any, item2: Array<string>} | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/AddWithNewAnnotationNames', JSON.stringify(poemAndAnnotations), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Add new poem with existing tags, and new tag names.
		 * POST api/Poems/AddWithNewTagNames
		 * @param {{item1: any, item2: Array<string>}} poemAndNewTags new poem, existing Tag Ids, and new tag names
		 * @return {any} Poem Id and new tag objects
		 */
		addWithNewTagNames(poemAndNewTags: {item1: any, item2: Array<string>} | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/Poems/AddWithNewTagNames', JSON.stringify(poemAndNewTags), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Associate album with existing poems.
		 * PUT api/Poems/poemsToAlbum?albumId={albumId}
		 * @param {string} albumId Type: GUID
		 */
		associateAlbumWithPoems(albumId: string | null, poemIds: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/poemsToAlbum?albumId=' + albumId, JSON.stringify(poemIds), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Associate with existing albums.
		 * PUT api/Poems/albums?poemId={poemId}
		 * @param {string} poemId Type: GUID
		 */
		associateWithAlbums(poemId: string | null, albumIds: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/albums?poemId=' + poemId, JSON.stringify(albumIds), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Associate with existing annotations.
		 * PUT api/Poems/existingAnnotations?poemId={poemId}
		 * @param {string} poemId Type: GUID
		 */
		associateWithExistingAnnotations(poemId: string | null, existingAnnotationIds: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/existingAnnotations?poemId=' + poemId, JSON.stringify(existingAnnotationIds), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Associate with existing tags.
		 * PUT api/Poems/existingTags?poemId={poemId}
		 * @param {string} poemId Type: GUID
		 */
		associateWithExistingTags(poemId: string | null, existingTagIds: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/existingTags?poemId=' + poemId, JSON.stringify(existingTagIds), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Save the new annotation, and associate with the poem.
		 * If the annotation exists, return null. Nevertheless, the client should check if the annotation had actually been in the annotation list, to avoid exceptions.
		 * PUT api/Poems/newAnnotationName?poemId={poemId}&newAnnotationName={newAnnotationName}
		 * @param {string} poemId Type: GUID
		 * @return {any} New annotation, or null if the annotation exists
		 */
		associateWithNewAnnotationName(poemId: string | null, newAnnotationName: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/newAnnotationName?poemId=' + poemId + '&newAnnotationName=' + (!newAnnotationName ? '' : encodeURIComponent(newAnnotationName)), null, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Associate poem with new tag names.
		 * PUT api/Poems/newAnnotationNames?poemId={poemId}
		 * @param {string} poemId Type: GUID
		 * @return {Array<any>} New annotation objects based on newAnnotationNames
		 */
		associateWithNewAnnotationNames(poemId: string | null, newAnnotationNames: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.put('api/Poems/newAnnotationNames?poemId=' + poemId, JSON.stringify(newAnnotationNames), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Save the new tag, and associate with the poem.
		 * If the tag exists, return null. Nevertheless, the client should check if the tag had actually been in the tag list, to avoid exceptions.
		 * PUT api/Poems/newTagName?poemId={poemId}&newTagName={newTagName}
		 * @param {string} poemId Type: GUID
		 * @return {any} New tag, or null if the tag exists
		 */
		associateWithNewTagName(poemId: string | null, newTagName: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/newTagName?poemId=' + poemId + '&newTagName=' + (!newTagName ? '' : encodeURIComponent(newTagName)), null, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Associate poem with new tag names.
		 * PUT api/Poems/newTagNames?poemId={poemId}
		 * @param {string} poemId Type: GUID
		 * @return {Array<any>} New tag objects based on newTagNames
		 */
		associateWithNewTagNames(poemId: string | null, newTagNames: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.put('api/Poems/newTagNames?poemId=' + poemId, JSON.stringify(newTagNames), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Reconcile among all images, poemImageMaps, and actually img local
		 * POST api/Poems/AuditAndReconcile
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		auditAndReconcile(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Poems/AuditAndReconcile', null, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * DELETE api/Poems/all
		 */
		clearAllTables(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Poems/all', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Delete poem, along with association with albums. However, associated tags and annotations are still in maps.
		 * DELETE api/Poems?id={id}
		 * @param {string} id Type: GUID
		 */
		delete(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.delete('api/Poems?id=' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Dissociate album.
		 * DELETE api/Poems/DissociateAlbum?poemId={poemId}&albumId={albumId}
		 * @param {string} poemId Type: GUID
		 * @param {string} albumId Type: GUID
		 */
		dissociateAlbum(poemId: string | null, albumId: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Poems/DissociateAlbum?poemId=' + poemId + '&albumId=' + albumId, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Disassociate annotation.
		 * DELETE api/Poems/DissociateAnnotation?poemId={poemId}&annotationId={annotationId}
		 * @param {string} poemId Type: GUID
		 * @param {string} annotationId Type: GUID
		 */
		dissociateAnnotation(poemId: string | null, annotationId: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Poems/DissociateAnnotation?poemId=' + poemId + '&annotationId=' + annotationId, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * DissociateT tag.
		 * DELETE api/Poems/DissociateTag?poemId={poemId}&tagId={tagId}
		 * @param {string} poemId Type: GUID
		 * @param {string} tagId Type: GUID
		 */
		dissociateTag(poemId: string | null, tagId: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.delete('api/Poems/DissociateTag?poemId=' + poemId + '&tagId=' + tagId, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Fix the problem of escaped unicode string, because of the DomSanitizer of Angular. Once off solution
		 * PUT api/Poems/EscapeStringToUnicode
		 */
		escapeStringToUnicode(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/EscapeStringToUnicode', null, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Include TagMap and AlbumMap. Support ZH Convert.
		 * GET api/Poems?id={id}
		 * @param {string} id Type: GUID
		 */
		get(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/Poems?id=' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Img Src Url to multiple poem Ids
		 * GET api/Poems/AllNotLocalImagesOfPoems
		 */
		getAllNotLocalImagesOfPoems(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: Array<string> }> {
			return this.http.get('api/Poems/AllNotLocalImagesOfPoems', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Scan all poems' HTML to create mapping from imageIds to poems. Dic of imageId to poems with img local.
		 * POST api/Poems/AssociatedPoemsOfImages
		 */
		getAssociatedPoemsOfAllImages(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: Array<any> }> {
			return this.http.post('api/Poems/AssociatedPoemsOfImages', null, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * All, OrderByDescending published. Support ZH Convert. If the user is not loggedin, not returning those not yet published.
		 * GET api/Poems/AllBriefs
		 * @param {number} timezoneOffset int in header
		 */
		getBriefsOfPoems(headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Poems/AllBriefs', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * All poems of album, order by published. Support ZH Convert.
		 * GET api/Poems/GetOfAlbum?albumId={albumId}
		 * @param {string} albumId Type: GUID
		 * @param {string} convertZH string in header
		 * @param {number} timezoneOffset int in header
		 */
		getOfAlbum(albumId: string | null, headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Poems/GetOfAlbum?albumId=' + albumId, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Poems/GetPoemBriefsOfAlbum?albumId={albumId}
		 * @param {string} albumId Type: GUID
		 * @param {number} timezoneOffset int in header
		 */
		getPoemBriefsOfAlbum(albumId: string | null, headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Poems/GetPoemBriefsOfAlbum?albumId=' + albumId, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Poems/PoemCollection
		 */
		getPoemCollection(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/Poems/PoemCollection', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Poems/PoemCollectionInOtherChineseWriting
		 */
		getPoemCollectionInOtherChineseWriting(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/Poems/PoemCollectionInOtherChineseWriting', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Poems/PoemCollectionPublished
		 * @param {number} timezoneOffset In request headers
		 */
		getPoemCollectionPublished(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/Poems/PoemCollectionPublished', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Poems/PoemCollectionPublishedInOtherChineseWriting
		 * @param {number} timezoneOffset timezoneOffset in headers
		 */
		getPoemCollectionPublishedInOtherChineseWriting(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/Poems/PoemCollectionPublishedInOtherChineseWriting', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * GET api/Poems/PoemsWithInternalImageId?imageId={imageId}
		 * @param {string} imageId Type: GUID
		 */
		getPoemsWithInternalImageId(imageId: string | null, headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Poems/PoemsWithInternalImageId?imageId=' + imageId, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Poems/TotalCountOfStanza
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getTotalCountOfStanza(headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.get('api/Poems/TotalCountOfStanza', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Poems/PoemCollection
		 */
		importPoemCollection(collection: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/Poems/PoemCollection', JSON.stringify(collection), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * GET api/Poems/ByAnnotation?annotationId={annotationId}
		 * @param {string} annotationId Type: GUID
		 */
		searchByAnnotation(annotationId: string | null, headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Poems/ByAnnotation?annotationId=' + annotationId, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Search by keywords, separated by comma and Chinese comma. Support ZH Convert.
		 * POST api/Poems/ByKeywords
		 * @param {number} timezoneOffset int in header
		 */
		searchByKeywords(keywords: string | null, headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.post('api/Poems/ByKeywords', JSON.stringify(keywords), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Update poem.
		 * PUT api/Poems
		 */
		update(poem: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems', JSON.stringify(poem), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}

		/**
		 * Just for maintenance, while the plaintext should be produced in the frontend.
		 * POST api/Poems/UpdatePlainTextOfHtmlPoems
		 */
		updatePlainTextOfHtmlPoems(headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.post('api/Poems/UpdatePlainTextOfHtmlPoems', null, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * PUT api/Poems/UpdatePublished?poemId={poemId}
		 * @param {string} poemId Type: GUID
		 */
		updatePublished(poemId: string | null, dt: Date | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Poems/UpdatePublished?poemId=' + poemId, JSON.stringify(dt), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}
	}


	/**
	 * Tags management
	 */
	@autoinject()
	export class Tags {
		constructor(private http: HttpClient) {
		}

		/**
		 * POST api/Tags
		 * @return {string} Type: GUID
		 */
		add(tag: any, headersHandler?: () => {[header: string]: string}): Promise<string> {
			return this.http.post('api/Tags', JSON.stringify(tag), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Delete along with what in poemTagMap.
		 * DELETE api/Tags?id={id}
		 * @param {string} id Type: GUID
		 */
		delete(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<boolean> {
			return this.http.delete('api/Tags?id=' + id, { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * POST api/Tags/Orphaned
		 * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
		 */
		deleteOrphaned(ids: Array<string> | null, headersHandler?: () => {[header: string]: string}): Promise<number> {
			return this.http.post('api/Tags/Orphaned', JSON.stringify(ids), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get tag. Support ZH Convert.
		 * GET api/Tags?id={id}
		 * @param {string} id Type: GUID
		 */
		get(id: string | null, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.get('api/Tags?id=' + id, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Get all tags. Support ZH Convert.
		 * GET api/Tags/all
		 */
		getAll(headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Tags/all', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * Get all tags as dictionary. Support ZH Convert.
		 * GET api/Tags/allDic
		 */
		getAllDic(headersHandler?: () => {[header: string]: string}): Promise<{[id: string]: any }> {
			return this.http.get('api/Tags/allDic', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Tags/Orphaned
		 */
		getOrphaned(headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Tags/Orphaned', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * GET api/Tags/PoemCountOfTags
		 */
		getPoemCountOfTags(headersHandler?: () => {[header: string]: string}): Promise<Array<any>> {
			return this.http.get('api/Tags/PoemCountOfTags', { headers: headersHandler ? headersHandler() : undefined }).then(d => {if (d.status<=204) return d.json(); throw d;});
		}

		/**
		 * PUT api/Tags
		 */
		update(tag: any, headersHandler?: () => {[header: string]: string}): Promise<Response> {
			return this.http.put('api/Tags', JSON.stringify(tag), { headers: headersHandler ? Object.assign(headersHandler(), { 'Content-Type': 'application/json;charset=UTF-8' }): { 'Content-Type': 'application/json;charset=UTF-8' } });
		}
	}

}

