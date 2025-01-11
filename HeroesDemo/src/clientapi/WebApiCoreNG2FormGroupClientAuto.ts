import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
		getHeroes(headersHandler?: () => HttpHeaders): Observable<Array<DemoWebApi_Controllers_Client.Hero>> {
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
		 * GET api/Values/Name/{id}?name={name}
		 * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
		 */
		getByIdOfInt32AndNameOfString(id?: number | null, name?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'api/Values/Name/' + id + '?name=' + (!name ? '' : encodeURIComponent(name)), { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
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

	/**
	 * 2D position
	 * with X and Y
	 * for Demo
	 */
	export interface MyPointFormProperties {

		/**
		 * X
		 * Type: double
		 */
		x: FormControl<number | null | undefined>,

		/**
		 * Y
		 * Type: double
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
		 * Required
		 * Min length: 2
		 * Max length: 255
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
		 * Required
		 * Min length: 2
		 * Max length: 255
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

		/** Length min: 2, max: 100 */
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

		/** Length min: 2, max: 100 */
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
		business_no?: string | null;
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
		business_no: FormControl<string | null | undefined>,
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
			business_no: new FormControl<string | null | undefined>(undefined),
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
		 * Type: int, -2,147,483,648 to 2,147,483,647
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
		 * Type: int, -2,147,483,648 to 2,147,483,647
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

export namespace TT_Legacy_Models_Client {
	export interface Client {
		created?: Date | null;
		id?: number | null;
		lastunit?: number | null;
		lastupdate?: Date | null;
		registrationId?: string | null;
	}
	export interface ClientFormProperties {
		created: FormControl<Date | null | undefined>,
		id: FormControl<number | null | undefined>,
		lastunit: FormControl<number | null | undefined>,
		lastupdate: FormControl<Date | null | undefined>,
		registrationId: FormControl<string | null | undefined>,
	}
	export function CreateClientFormGroup() {
		return new FormGroup<ClientFormProperties>({
			created: new FormControl<Date | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			lastunit: new FormControl<number | null | undefined>(undefined),
			lastupdate: new FormControl<Date | null | undefined>(undefined),
			registrationId: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Clientunit {
		clientId?: number | null;
		unitId?: number | null;
	}
	export interface ClientunitFormProperties {
		clientId: FormControl<number | null | undefined>,
		unitId: FormControl<number | null | undefined>,
	}
	export function CreateClientunitFormGroup() {
		return new FormGroup<ClientunitFormProperties>({
			clientId: new FormControl<number | null | undefined>(undefined),
			unitId: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Commandq {
		added?: Date | null;
		addedBy?: string | null;
		clientAckStatus?: string | null;
		clientAckTime?: Date | null;
		clientId?: number | null;
		command?: string | null;
		commanddata?: string | null;
		commanddate?: Date | null;
		commanddesc?: string | null;
		commandInfo?: string | null;
		deleted?: number | null;
		gcmResponse?: string | null;
		gcmSent?: number | null;
		gcmSentTime?: Date | null;
		id?: number | null;
		waitforregistration?: number | null;
	}
	export interface CommandqFormProperties {
		added: FormControl<Date | null | undefined>,
		addedBy: FormControl<string | null | undefined>,
		clientAckStatus: FormControl<string | null | undefined>,
		clientAckTime: FormControl<Date | null | undefined>,
		clientId: FormControl<number | null | undefined>,
		command: FormControl<string | null | undefined>,
		commanddata: FormControl<string | null | undefined>,
		commanddate: FormControl<Date | null | undefined>,
		commanddesc: FormControl<string | null | undefined>,
		commandInfo: FormControl<string | null | undefined>,
		deleted: FormControl<number | null | undefined>,
		gcmResponse: FormControl<string | null | undefined>,
		gcmSent: FormControl<number | null | undefined>,
		gcmSentTime: FormControl<Date | null | undefined>,
		id: FormControl<number | null | undefined>,
		waitforregistration: FormControl<number | null | undefined>,
	}
	export function CreateCommandqFormGroup() {
		return new FormGroup<CommandqFormProperties>({
			added: new FormControl<Date | null | undefined>(undefined),
			addedBy: new FormControl<string | null | undefined>(undefined),
			clientAckStatus: new FormControl<string | null | undefined>(undefined),
			clientAckTime: new FormControl<Date | null | undefined>(undefined),
			clientId: new FormControl<number | null | undefined>(undefined),
			command: new FormControl<string | null | undefined>(undefined),
			commanddata: new FormControl<string | null | undefined>(undefined),
			commanddate: new FormControl<Date | null | undefined>(undefined),
			commanddesc: new FormControl<string | null | undefined>(undefined),
			commandInfo: new FormControl<string | null | undefined>(undefined),
			deleted: new FormControl<number | null | undefined>(undefined),
			gcmResponse: new FormControl<string | null | undefined>(undefined),
			gcmSent: new FormControl<number | null | undefined>(undefined),
			gcmSentTime: new FormControl<Date | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			waitforregistration: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Company {
		companyname?: string | null;
		displayname?: string | null;
		dnsname?: string | null;
		externalid?: number | null;
		id?: number | null;
		isactive?: number | null;
		languageId?: string | null;
		logo?: string | null;
		orggroup?: string | null;
		provisioned?: Date | null;
		provisionemailsent?: Date | null;
		region?: string | null;
		termsagreed?: number | null;
		tstamp?: Date | null;
		tzone?: string | null;
	}
	export interface CompanyFormProperties {
		companyname: FormControl<string | null | undefined>,
		displayname: FormControl<string | null | undefined>,
		dnsname: FormControl<string | null | undefined>,
		externalid: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		isactive: FormControl<number | null | undefined>,
		languageId: FormControl<string | null | undefined>,
		logo: FormControl<string | null | undefined>,
		orggroup: FormControl<string | null | undefined>,
		provisioned: FormControl<Date | null | undefined>,
		provisionemailsent: FormControl<Date | null | undefined>,
		region: FormControl<string | null | undefined>,
		termsagreed: FormControl<number | null | undefined>,
		tstamp: FormControl<Date | null | undefined>,
		tzone: FormControl<string | null | undefined>,
	}
	export function CreateCompanyFormGroup() {
		return new FormGroup<CompanyFormProperties>({
			companyname: new FormControl<string | null | undefined>(undefined),
			displayname: new FormControl<string | null | undefined>(undefined),
			dnsname: new FormControl<string | null | undefined>(undefined),
			externalid: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			isactive: new FormControl<number | null | undefined>(undefined),
			languageId: new FormControl<string | null | undefined>(undefined),
			logo: new FormControl<string | null | undefined>(undefined),
			orggroup: new FormControl<string | null | undefined>(undefined),
			provisioned: new FormControl<Date | null | undefined>(undefined),
			provisionemailsent: new FormControl<Date | null | undefined>(undefined),
			region: new FormControl<string | null | undefined>(undefined),
			termsagreed: new FormControl<number | null | undefined>(undefined),
			tstamp: new FormControl<Date | null | undefined>(undefined),
			tzone: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Companyreportsetting {
		companyid?: number | null;
		disclaimer?: string | null;
		footerimage?: string | null;
		headerimage?: string | null;
		heading?: string | null;
		id?: number | null;
		introduction?: string | null;
		subheading?: string | null;
	}
	export interface CompanyreportsettingFormProperties {
		companyid: FormControl<number | null | undefined>,
		disclaimer: FormControl<string | null | undefined>,
		footerimage: FormControl<string | null | undefined>,
		headerimage: FormControl<string | null | undefined>,
		heading: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		introduction: FormControl<string | null | undefined>,
		subheading: FormControl<string | null | undefined>,
	}
	export function CreateCompanyreportsettingFormGroup() {
		return new FormGroup<CompanyreportsettingFormProperties>({
			companyid: new FormControl<number | null | undefined>(undefined),
			disclaimer: new FormControl<string | null | undefined>(undefined),
			footerimage: new FormControl<string | null | undefined>(undefined),
			headerimage: new FormControl<string | null | undefined>(undefined),
			heading: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			introduction: new FormControl<string | null | undefined>(undefined),
			subheading: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Dashboardmsg {
		active?: number | null;
		created?: Date | null;
		createdBy?: number | null;
		forall?: number | null;
		fromdate?: Date | null;
		id?: number | null;
		message?: string | null;
		todate?: Date | null;
	}
	export interface DashboardmsgFormProperties {
		active: FormControl<number | null | undefined>,
		created: FormControl<Date | null | undefined>,
		createdBy: FormControl<number | null | undefined>,
		forall: FormControl<number | null | undefined>,
		fromdate: FormControl<Date | null | undefined>,
		id: FormControl<number | null | undefined>,
		message: FormControl<string | null | undefined>,
		todate: FormControl<Date | null | undefined>,
	}
	export function CreateDashboardmsgFormGroup() {
		return new FormGroup<DashboardmsgFormProperties>({
			active: new FormControl<number | null | undefined>(undefined),
			created: new FormControl<Date | null | undefined>(undefined),
			createdBy: new FormControl<number | null | undefined>(undefined),
			forall: new FormControl<number | null | undefined>(undefined),
			fromdate: new FormControl<Date | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			message: new FormControl<string | null | undefined>(undefined),
			todate: new FormControl<Date | null | undefined>(undefined),
		});

	}

	export interface Dashboardmsgfor {
		companyId?: number | null;
		msgId?: number | null;
	}
	export interface DashboardmsgforFormProperties {
		companyId: FormControl<number | null | undefined>,
		msgId: FormControl<number | null | undefined>,
	}
	export function CreateDashboardmsgforFormGroup() {
		return new FormGroup<DashboardmsgforFormProperties>({
			companyId: new FormControl<number | null | undefined>(undefined),
			msgId: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Emailtemplate {
		companyId?: number | null;
		heading?: string | null;
		id?: number | null;
		language?: string | null;
		name?: string | null;
		subject?: string | null;
		template?: string | null;
		userTemplate?: number | null;
	}
	export interface EmailtemplateFormProperties {
		companyId: FormControl<number | null | undefined>,
		heading: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		language: FormControl<string | null | undefined>,
		name: FormControl<string | null | undefined>,
		subject: FormControl<string | null | undefined>,
		template: FormControl<string | null | undefined>,
		userTemplate: FormControl<number | null | undefined>,
	}
	export function CreateEmailtemplateFormGroup() {
		return new FormGroup<EmailtemplateFormProperties>({
			companyId: new FormControl<number | null | undefined>(undefined),
			heading: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			language: new FormControl<string | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
			subject: new FormControl<string | null | undefined>(undefined),
			template: new FormControl<string | null | undefined>(undefined),
			userTemplate: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Eventlog {
		companyId?: number | null;
		eventname?: string | null;
		id?: number | null;
		ipaddress?: string | null;
		note?: string | null;
		response?: string | null;
		timestamp?: Date | null;
		userId?: number | null;
	}
	export interface EventlogFormProperties {
		companyId: FormControl<number | null | undefined>,
		eventname: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		ipaddress: FormControl<string | null | undefined>,
		note: FormControl<string | null | undefined>,
		response: FormControl<string | null | undefined>,
		timestamp: FormControl<Date | null | undefined>,
		userId: FormControl<number | null | undefined>,
	}
	export function CreateEventlogFormGroup() {
		return new FormGroup<EventlogFormProperties>({
			companyId: new FormControl<number | null | undefined>(undefined),
			eventname: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			ipaddress: new FormControl<string | null | undefined>(undefined),
			note: new FormControl<string | null | undefined>(undefined),
			response: new FormControl<string | null | undefined>(undefined),
			timestamp: new FormControl<Date | null | undefined>(undefined),
			userId: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Job {
		buildingCategory?: string | null;
		companyId?: number | null;
		customerName?: string | null;
		dateTime?: Date | null;
		flags?: number | null;
		id?: number | null;
		jobType?: string | null;
		locationId?: number | null;
		notes?: string | null;
		number?: string | null;
		operatorId?: string | null;
		uuid?: string | null;
	}
	export interface JobFormProperties {
		buildingCategory: FormControl<string | null | undefined>,
		companyId: FormControl<number | null | undefined>,
		customerName: FormControl<string | null | undefined>,
		dateTime: FormControl<Date | null | undefined>,
		flags: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		jobType: FormControl<string | null | undefined>,
		locationId: FormControl<number | null | undefined>,
		notes: FormControl<string | null | undefined>,
		number: FormControl<string | null | undefined>,
		operatorId: FormControl<string | null | undefined>,
		uuid: FormControl<string | null | undefined>,
	}
	export function CreateJobFormGroup() {
		return new FormGroup<JobFormProperties>({
			buildingCategory: new FormControl<string | null | undefined>(undefined),
			companyId: new FormControl<number | null | undefined>(undefined),
			customerName: new FormControl<string | null | undefined>(undefined),
			dateTime: new FormControl<Date | null | undefined>(undefined),
			flags: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			jobType: new FormControl<string | null | undefined>(undefined),
			locationId: new FormControl<number | null | undefined>(undefined),
			notes: new FormControl<string | null | undefined>(undefined),
			number: new FormControl<string | null | undefined>(undefined),
			operatorId: new FormControl<string | null | undefined>(undefined),
			uuid: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Lang {
		encoding?: string | null;
		errorText?: string | null;
		hidden?: number | null;
		id?: string | null;
		meta?: string | null;
		name?: string | null;
	}
	export interface LangFormProperties {
		encoding: FormControl<string | null | undefined>,
		errorText: FormControl<string | null | undefined>,
		hidden: FormControl<number | null | undefined>,
		id: FormControl<string | null | undefined>,
		meta: FormControl<string | null | undefined>,
		name: FormControl<string | null | undefined>,
	}
	export function CreateLangFormGroup() {
		return new FormGroup<LangFormProperties>({
			encoding: new FormControl<string | null | undefined>(undefined),
			errorText: new FormControl<string | null | undefined>(undefined),
			hidden: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<string | null | undefined>(undefined),
			meta: new FormControl<string | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Lead {
		id?: number | null;
		leadaddr?: string | null;
		leadcompany?: string | null;
		leadcontact?: string | null;
		leademail?: string | null;
		leadphone?: string | null;
		opportunity?: string | null;
		reseller?: string | null;
		resellerid?: number | null;
		salesemail?: string | null;
		salesperson?: string | null;
		submitdate?: Date | null;
	}
	export interface LeadFormProperties {
		id: FormControl<number | null | undefined>,
		leadaddr: FormControl<string | null | undefined>,
		leadcompany: FormControl<string | null | undefined>,
		leadcontact: FormControl<string | null | undefined>,
		leademail: FormControl<string | null | undefined>,
		leadphone: FormControl<string | null | undefined>,
		opportunity: FormControl<string | null | undefined>,
		reseller: FormControl<string | null | undefined>,
		resellerid: FormControl<number | null | undefined>,
		salesemail: FormControl<string | null | undefined>,
		salesperson: FormControl<string | null | undefined>,
		submitdate: FormControl<Date | null | undefined>,
	}
	export function CreateLeadFormGroup() {
		return new FormGroup<LeadFormProperties>({
			id: new FormControl<number | null | undefined>(undefined),
			leadaddr: new FormControl<string | null | undefined>(undefined),
			leadcompany: new FormControl<string | null | undefined>(undefined),
			leadcontact: new FormControl<string | null | undefined>(undefined),
			leademail: new FormControl<string | null | undefined>(undefined),
			leadphone: new FormControl<string | null | undefined>(undefined),
			opportunity: new FormControl<string | null | undefined>(undefined),
			reseller: new FormControl<string | null | undefined>(undefined),
			resellerid: new FormControl<number | null | undefined>(undefined),
			salesemail: new FormControl<string | null | undefined>(undefined),
			salesperson: new FormControl<string | null | undefined>(undefined),
			submitdate: new FormControl<Date | null | undefined>(undefined),
		});

	}

	export interface Leaseapp {
		acn?: string | null;
		amtowing?: number | null;
		android?: number | null;
		applicantname?: string | null;
		applicanttitle?: string | null;
		billto?: string | null;
		businessfax?: string | null;
		businessname?: string | null;
		businessphone?: string | null;
		contactemail?: string | null;
		contactname?: string | null;
		contactphone?: string | null;
		country?: string | null;
		created?: Date | null;
		deleted?: number | null;
		deposit?: number | null;
		depositmethod?: number | null;
		guarantorname?: string | null;
		id?: number | null;
		monthlyamount?: number | null;
		ordervalue?: number | null;
		paymethod?: number | null;
		periods?: number | null;
		proddesc?: string | null;
		prodprice?: string | null;
		prodqty?: string | null;
		shipto?: string | null;
		signdate?: string | null;
		signedip?: string | null;
		signtimestamp?: Date | null;
		uuid?: string | null;
	}
	export interface LeaseappFormProperties {
		acn: FormControl<string | null | undefined>,
		amtowing: FormControl<number | null | undefined>,
		android: FormControl<number | null | undefined>,
		applicantname: FormControl<string | null | undefined>,
		applicanttitle: FormControl<string | null | undefined>,
		billto: FormControl<string | null | undefined>,
		businessfax: FormControl<string | null | undefined>,
		businessname: FormControl<string | null | undefined>,
		businessphone: FormControl<string | null | undefined>,
		contactemail: FormControl<string | null | undefined>,
		contactname: FormControl<string | null | undefined>,
		contactphone: FormControl<string | null | undefined>,
		country: FormControl<string | null | undefined>,
		created: FormControl<Date | null | undefined>,
		deleted: FormControl<number | null | undefined>,
		deposit: FormControl<number | null | undefined>,
		depositmethod: FormControl<number | null | undefined>,
		guarantorname: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		monthlyamount: FormControl<number | null | undefined>,
		ordervalue: FormControl<number | null | undefined>,
		paymethod: FormControl<number | null | undefined>,
		periods: FormControl<number | null | undefined>,
		proddesc: FormControl<string | null | undefined>,
		prodprice: FormControl<string | null | undefined>,
		prodqty: FormControl<string | null | undefined>,
		shipto: FormControl<string | null | undefined>,
		signdate: FormControl<string | null | undefined>,
		signedip: FormControl<string | null | undefined>,
		signtimestamp: FormControl<Date | null | undefined>,
		uuid: FormControl<string | null | undefined>,
	}
	export function CreateLeaseappFormGroup() {
		return new FormGroup<LeaseappFormProperties>({
			acn: new FormControl<string | null | undefined>(undefined),
			amtowing: new FormControl<number | null | undefined>(undefined),
			android: new FormControl<number | null | undefined>(undefined),
			applicantname: new FormControl<string | null | undefined>(undefined),
			applicanttitle: new FormControl<string | null | undefined>(undefined),
			billto: new FormControl<string | null | undefined>(undefined),
			businessfax: new FormControl<string | null | undefined>(undefined),
			businessname: new FormControl<string | null | undefined>(undefined),
			businessphone: new FormControl<string | null | undefined>(undefined),
			contactemail: new FormControl<string | null | undefined>(undefined),
			contactname: new FormControl<string | null | undefined>(undefined),
			contactphone: new FormControl<string | null | undefined>(undefined),
			country: new FormControl<string | null | undefined>(undefined),
			created: new FormControl<Date | null | undefined>(undefined),
			deleted: new FormControl<number | null | undefined>(undefined),
			deposit: new FormControl<number | null | undefined>(undefined),
			depositmethod: new FormControl<number | null | undefined>(undefined),
			guarantorname: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			monthlyamount: new FormControl<number | null | undefined>(undefined),
			ordervalue: new FormControl<number | null | undefined>(undefined),
			paymethod: new FormControl<number | null | undefined>(undefined),
			periods: new FormControl<number | null | undefined>(undefined),
			proddesc: new FormControl<string | null | undefined>(undefined),
			prodprice: new FormControl<string | null | undefined>(undefined),
			prodqty: new FormControl<string | null | undefined>(undefined),
			shipto: new FormControl<string | null | undefined>(undefined),
			signdate: new FormControl<string | null | undefined>(undefined),
			signedip: new FormControl<string | null | undefined>(undefined),
			signtimestamp: new FormControl<Date | null | undefined>(undefined),
			uuid: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Location {
		address?: string | null;
		companyId?: number | null;
		id?: number | null;
		uuid?: string | null;
	}
	export interface LocationFormProperties {
		address: FormControl<string | null | undefined>,
		companyId: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		uuid: FormControl<string | null | undefined>,
	}
	export function CreateLocationFormGroup() {
		return new FormGroup<LocationFormProperties>({
			address: new FormControl<string | null | undefined>(undefined),
			companyId: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			uuid: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Menu {
		enabled?: number | null;
		icon?: string | null;
		id?: number | null;
		name?: string | null;
		optionid?: string | null;
		seq?: number | null;
		type?: string | null;
		url?: string | null;
		userlevel?: string | null;
	}
	export interface MenuFormProperties {
		enabled: FormControl<number | null | undefined>,
		icon: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		name: FormControl<string | null | undefined>,
		optionid: FormControl<string | null | undefined>,
		seq: FormControl<number | null | undefined>,
		type: FormControl<string | null | undefined>,
		url: FormControl<string | null | undefined>,
		userlevel: FormControl<string | null | undefined>,
	}
	export function CreateMenuFormGroup() {
		return new FormGroup<MenuFormProperties>({
			enabled: new FormControl<number | null | undefined>(undefined),
			icon: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
			optionid: new FormControl<string | null | undefined>(undefined),
			seq: new FormControl<number | null | undefined>(undefined),
			type: new FormControl<string | null | undefined>(undefined),
			url: new FormControl<string | null | undefined>(undefined),
			userlevel: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Menuoption {
		enabled?: number | null;
		id?: number | null;
		menuId?: number | null;
		name?: string | null;
		optionid?: string | null;
		seq?: number | null;
		url?: string | null;
	}
	export interface MenuoptionFormProperties {
		enabled: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		menuId: FormControl<number | null | undefined>,
		name: FormControl<string | null | undefined>,
		optionid: FormControl<string | null | undefined>,
		seq: FormControl<number | null | undefined>,
		url: FormControl<string | null | undefined>,
	}
	export function CreateMenuoptionFormGroup() {
		return new FormGroup<MenuoptionFormProperties>({
			enabled: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			menuId: new FormControl<number | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
			optionid: new FormControl<string | null | undefined>(undefined),
			seq: new FormControl<number | null | undefined>(undefined),
			url: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Office {
		address?: string | null;
		companyId?: number | null;
		email?: string | null;
		exoOffice?: number | null;
		id?: number | null;
		lat?: string | null;
		lng?: string | null;
		name?: string | null;
		phone?: string | null;
		publish?: number | null;
		tstamp?: Date | null;
		unitId?: number | null;
	}
	export interface OfficeFormProperties {
		address: FormControl<string | null | undefined>,
		companyId: FormControl<number | null | undefined>,
		email: FormControl<string | null | undefined>,
		exoOffice: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		lat: FormControl<string | null | undefined>,
		lng: FormControl<string | null | undefined>,
		name: FormControl<string | null | undefined>,
		phone: FormControl<string | null | undefined>,
		publish: FormControl<number | null | undefined>,
		tstamp: FormControl<Date | null | undefined>,
		unitId: FormControl<number | null | undefined>,
	}
	export function CreateOfficeFormGroup() {
		return new FormGroup<OfficeFormProperties>({
			address: new FormControl<string | null | undefined>(undefined),
			companyId: new FormControl<number | null | undefined>(undefined),
			email: new FormControl<string | null | undefined>(undefined),
			exoOffice: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			lat: new FormControl<string | null | undefined>(undefined),
			lng: new FormControl<string | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
			phone: new FormControl<string | null | undefined>(undefined),
			publish: new FormControl<number | null | undefined>(undefined),
			tstamp: new FormControl<Date | null | undefined>(undefined),
			unitId: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Pplanapp {
		acn?: string | null;
		amtowing?: number | null;
		applicantname?: string | null;
		applicanttitle?: string | null;
		billto?: string | null;
		businessfax?: string | null;
		businessname?: string | null;
		businessphone?: string | null;
		contactemail?: string | null;
		contactname?: string | null;
		contactphone?: string | null;
		country?: string | null;
		created?: Date | null;
		deleted?: number | null;
		deposit?: number | null;
		depositmethod?: number | null;
		id?: number | null;
		monthlyamount?: number | null;
		ordervalue?: number | null;
		paymethod?: number | null;
		periods?: number | null;
		planfee?: number | null;
		proddesc?: string | null;
		prodprice?: string | null;
		prodqty?: string | null;
		shipto?: string | null;
		signdate?: string | null;
		signedip?: string | null;
		signtimestamp?: Date | null;
		uuid?: string | null;
	}
	export interface PplanappFormProperties {
		acn: FormControl<string | null | undefined>,
		amtowing: FormControl<number | null | undefined>,
		applicantname: FormControl<string | null | undefined>,
		applicanttitle: FormControl<string | null | undefined>,
		billto: FormControl<string | null | undefined>,
		businessfax: FormControl<string | null | undefined>,
		businessname: FormControl<string | null | undefined>,
		businessphone: FormControl<string | null | undefined>,
		contactemail: FormControl<string | null | undefined>,
		contactname: FormControl<string | null | undefined>,
		contactphone: FormControl<string | null | undefined>,
		country: FormControl<string | null | undefined>,
		created: FormControl<Date | null | undefined>,
		deleted: FormControl<number | null | undefined>,
		deposit: FormControl<number | null | undefined>,
		depositmethod: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		monthlyamount: FormControl<number | null | undefined>,
		ordervalue: FormControl<number | null | undefined>,
		paymethod: FormControl<number | null | undefined>,
		periods: FormControl<number | null | undefined>,
		planfee: FormControl<number | null | undefined>,
		proddesc: FormControl<string | null | undefined>,
		prodprice: FormControl<string | null | undefined>,
		prodqty: FormControl<string | null | undefined>,
		shipto: FormControl<string | null | undefined>,
		signdate: FormControl<string | null | undefined>,
		signedip: FormControl<string | null | undefined>,
		signtimestamp: FormControl<Date | null | undefined>,
		uuid: FormControl<string | null | undefined>,
	}
	export function CreatePplanappFormGroup() {
		return new FormGroup<PplanappFormProperties>({
			acn: new FormControl<string | null | undefined>(undefined),
			amtowing: new FormControl<number | null | undefined>(undefined),
			applicantname: new FormControl<string | null | undefined>(undefined),
			applicanttitle: new FormControl<string | null | undefined>(undefined),
			billto: new FormControl<string | null | undefined>(undefined),
			businessfax: new FormControl<string | null | undefined>(undefined),
			businessname: new FormControl<string | null | undefined>(undefined),
			businessphone: new FormControl<string | null | undefined>(undefined),
			contactemail: new FormControl<string | null | undefined>(undefined),
			contactname: new FormControl<string | null | undefined>(undefined),
			contactphone: new FormControl<string | null | undefined>(undefined),
			country: new FormControl<string | null | undefined>(undefined),
			created: new FormControl<Date | null | undefined>(undefined),
			deleted: new FormControl<number | null | undefined>(undefined),
			deposit: new FormControl<number | null | undefined>(undefined),
			depositmethod: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			monthlyamount: new FormControl<number | null | undefined>(undefined),
			ordervalue: new FormControl<number | null | undefined>(undefined),
			paymethod: new FormControl<number | null | undefined>(undefined),
			periods: new FormControl<number | null | undefined>(undefined),
			planfee: new FormControl<number | null | undefined>(undefined),
			proddesc: new FormControl<string | null | undefined>(undefined),
			prodprice: new FormControl<string | null | undefined>(undefined),
			prodqty: new FormControl<string | null | undefined>(undefined),
			shipto: new FormControl<string | null | undefined>(undefined),
			signdate: new FormControl<string | null | undefined>(undefined),
			signedip: new FormControl<string | null | undefined>(undefined),
			signtimestamp: new FormControl<Date | null | undefined>(undefined),
			uuid: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Report {
		comments?: string | null;
		companyId?: number | null;
		customername?: string | null;
		id?: number | null;
		jobId?: number | null;
		locationId?: number | null;
		name?: string | null;
		operator?: string | null;
		opercert?: string | null;
		reportnum?: string | null;
		reportscanlogs?: Array<TT_Legacy_Models_Client.Reportscanlog>;
		reportsections?: Array<TT_Legacy_Models_Client.Reportsection>;
		requestedby?: string | null;
		tstamp?: Date | null;
		userId?: number | null;
	}
	export interface ReportFormProperties {
		comments: FormControl<string | null | undefined>,
		companyId: FormControl<number | null | undefined>,
		customername: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		jobId: FormControl<number | null | undefined>,
		locationId: FormControl<number | null | undefined>,
		name: FormControl<string | null | undefined>,
		operator: FormControl<string | null | undefined>,
		opercert: FormControl<string | null | undefined>,
		reportnum: FormControl<string | null | undefined>,
		requestedby: FormControl<string | null | undefined>,
		tstamp: FormControl<Date | null | undefined>,
		userId: FormControl<number | null | undefined>,
	}
	export function CreateReportFormGroup() {
		return new FormGroup<ReportFormProperties>({
			comments: new FormControl<string | null | undefined>(undefined),
			companyId: new FormControl<number | null | undefined>(undefined),
			customername: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			jobId: new FormControl<number | null | undefined>(undefined),
			locationId: new FormControl<number | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
			operator: new FormControl<string | null | undefined>(undefined),
			opercert: new FormControl<string | null | undefined>(undefined),
			reportnum: new FormControl<string | null | undefined>(undefined),
			requestedby: new FormControl<string | null | undefined>(undefined),
			tstamp: new FormControl<Date | null | undefined>(undefined),
			userId: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Reportscanlog {
		id?: number | null;
		notes?: string | null;
		report?: TT_Legacy_Models_Client.Report;
		reportId?: number | null;
		scanid?: number | null;
		sectionId?: number | null;
		seq?: number | null;
	}
	export interface ReportscanlogFormProperties {
		id: FormControl<number | null | undefined>,
		notes: FormControl<string | null | undefined>,
		reportId: FormControl<number | null | undefined>,
		scanid: FormControl<number | null | undefined>,
		sectionId: FormControl<number | null | undefined>,
		seq: FormControl<number | null | undefined>,
	}
	export function CreateReportscanlogFormGroup() {
		return new FormGroup<ReportscanlogFormProperties>({
			id: new FormControl<number | null | undefined>(undefined),
			notes: new FormControl<string | null | undefined>(undefined),
			reportId: new FormControl<number | null | undefined>(undefined),
			scanid: new FormControl<number | null | undefined>(undefined),
			sectionId: new FormControl<number | null | undefined>(undefined),
			seq: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Reportsection {
		comments?: string | null;
		conclusive?: number | null;
		id?: number | null;
		insectother?: string | null;
		insecttype?: number | null;
		name?: string | null;
		nameoverride?: string | null;
		report?: TT_Legacy_Models_Client.Report;
		reportId?: number | null;
		seq?: number | null;
	}
	export interface ReportsectionFormProperties {
		comments: FormControl<string | null | undefined>,
		conclusive: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		insectother: FormControl<string | null | undefined>,
		insecttype: FormControl<number | null | undefined>,
		name: FormControl<string | null | undefined>,
		nameoverride: FormControl<string | null | undefined>,
		reportId: FormControl<number | null | undefined>,
		seq: FormControl<number | null | undefined>,
	}
	export function CreateReportsectionFormGroup() {
		return new FormGroup<ReportsectionFormProperties>({
			comments: new FormControl<string | null | undefined>(undefined),
			conclusive: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			insectother: new FormControl<string | null | undefined>(undefined),
			insecttype: new FormControl<number | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
			nameoverride: new FormControl<string | null | undefined>(undefined),
			reportId: new FormControl<number | null | undefined>(undefined),
			seq: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Reseller {
		email?: string | null;
		id?: number | null;
		name?: string | null;
		reportifnoleads?: number | null;
	}
	export interface ResellerFormProperties {
		email: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		name: FormControl<string | null | undefined>,
		reportifnoleads: FormControl<number | null | undefined>,
	}
	export function CreateResellerFormGroup() {
		return new FormGroup<ResellerFormProperties>({
			email: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
			reportifnoleads: new FormControl<number | null | undefined>(undefined),
		});

	}

	export interface Scan {
		appVer?: string | null;
		batteryvolt?: string | null;
		companyId?: number | null;
		compass?: string | null;
		created?: Date | null;
		damageVisible?: number | null;
		data?: string | null;
		dateTime?: Date | null;
		deviceFirmwareVersion?: string | null;
		deviceSerialNumber?: string | null;
		flags?: string | null;
		floor?: string | null;
		gainSetting?: number | null;
		howPositioned?: string | null;
		howUsed?: string | null;
		id?: number | null;
		image?: string | null;
		jobId?: number | null;
		logNumber?: number | null;
		moisturedelta?: string | null;
		moisturemax?: number | null;
		moisturemin?: number | null;
		moistureoffset?: string | null;
		moistureslope?: string | null;
		notes?: string | null;
		room?: string | null;
		scanArea?: string | null;
		sensorId?: number | null;
		thumbnail?: string | null;
		unitId?: number | null;
		uuid?: string | null;
	}
	export interface ScanFormProperties {
		appVer: FormControl<string | null | undefined>,
		batteryvolt: FormControl<string | null | undefined>,
		companyId: FormControl<number | null | undefined>,
		compass: FormControl<string | null | undefined>,
		created: FormControl<Date | null | undefined>,
		damageVisible: FormControl<number | null | undefined>,
		data: FormControl<string | null | undefined>,
		dateTime: FormControl<Date | null | undefined>,
		deviceFirmwareVersion: FormControl<string | null | undefined>,
		deviceSerialNumber: FormControl<string | null | undefined>,
		flags: FormControl<string | null | undefined>,
		floor: FormControl<string | null | undefined>,
		gainSetting: FormControl<number | null | undefined>,
		howPositioned: FormControl<string | null | undefined>,
		howUsed: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		image: FormControl<string | null | undefined>,
		jobId: FormControl<number | null | undefined>,
		logNumber: FormControl<number | null | undefined>,
		moisturedelta: FormControl<string | null | undefined>,
		moisturemax: FormControl<number | null | undefined>,
		moisturemin: FormControl<number | null | undefined>,
		moistureoffset: FormControl<string | null | undefined>,
		moistureslope: FormControl<string | null | undefined>,
		notes: FormControl<string | null | undefined>,
		room: FormControl<string | null | undefined>,
		scanArea: FormControl<string | null | undefined>,
		sensorId: FormControl<number | null | undefined>,
		thumbnail: FormControl<string | null | undefined>,
		unitId: FormControl<number | null | undefined>,
		uuid: FormControl<string | null | undefined>,
	}
	export function CreateScanFormGroup() {
		return new FormGroup<ScanFormProperties>({
			appVer: new FormControl<string | null | undefined>(undefined),
			batteryvolt: new FormControl<string | null | undefined>(undefined),
			companyId: new FormControl<number | null | undefined>(undefined),
			compass: new FormControl<string | null | undefined>(undefined),
			created: new FormControl<Date | null | undefined>(undefined),
			damageVisible: new FormControl<number | null | undefined>(undefined),
			data: new FormControl<string | null | undefined>(undefined),
			dateTime: new FormControl<Date | null | undefined>(undefined),
			deviceFirmwareVersion: new FormControl<string | null | undefined>(undefined),
			deviceSerialNumber: new FormControl<string | null | undefined>(undefined),
			flags: new FormControl<string | null | undefined>(undefined),
			floor: new FormControl<string | null | undefined>(undefined),
			gainSetting: new FormControl<number | null | undefined>(undefined),
			howPositioned: new FormControl<string | null | undefined>(undefined),
			howUsed: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			image: new FormControl<string | null | undefined>(undefined),
			jobId: new FormControl<number | null | undefined>(undefined),
			logNumber: new FormControl<number | null | undefined>(undefined),
			moisturedelta: new FormControl<string | null | undefined>(undefined),
			moisturemax: new FormControl<number | null | undefined>(undefined),
			moisturemin: new FormControl<number | null | undefined>(undefined),
			moistureoffset: new FormControl<string | null | undefined>(undefined),
			moistureslope: new FormControl<string | null | undefined>(undefined),
			notes: new FormControl<string | null | undefined>(undefined),
			room: new FormControl<string | null | undefined>(undefined),
			scanArea: new FormControl<string | null | undefined>(undefined),
			sensorId: new FormControl<number | null | undefined>(undefined),
			thumbnail: new FormControl<string | null | undefined>(undefined),
			unitId: new FormControl<number | null | undefined>(undefined),
			uuid: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Session {
		custId?: string | null;
		id?: number | null;
		nonce?: string | null;
		ssn?: string | null;
	}
	export interface SessionFormProperties {
		custId: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		nonce: FormControl<string | null | undefined>,
		ssn: FormControl<string | null | undefined>,
	}
	export function CreateSessionFormGroup() {
		return new FormGroup<SessionFormProperties>({
			custId: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			nonce: new FormControl<string | null | undefined>(undefined),
			ssn: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Staff {
		companyid?: number | null;
		id?: number | null;
		name?: string | null;
	}
	export interface StaffFormProperties {
		companyid: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		name: FormControl<string | null | undefined>,
	}
	export function CreateStaffFormGroup() {
		return new FormGroup<StaffFormProperties>({
			companyid: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface String {
		en?: string | null;
		es?: string | null;
		fr?: string | null;
		it?: string | null;
		ja?: string | null;
		ko?: string | null;
		pageId?: string | null;
		pt?: string | null;
		stringId?: string | null;
		tstamp?: Date | null;
		zhCht?: string | null;
		zhCn?: string | null;
	}
	export interface StringFormProperties {
		en: FormControl<string | null | undefined>,
		es: FormControl<string | null | undefined>,
		fr: FormControl<string | null | undefined>,
		it: FormControl<string | null | undefined>,
		ja: FormControl<string | null | undefined>,
		ko: FormControl<string | null | undefined>,
		pageId: FormControl<string | null | undefined>,
		pt: FormControl<string | null | undefined>,
		stringId: FormControl<string | null | undefined>,
		tstamp: FormControl<Date | null | undefined>,
		zhCht: FormControl<string | null | undefined>,
		zhCn: FormControl<string | null | undefined>,
	}
	export function CreateStringFormGroup() {
		return new FormGroup<StringFormProperties>({
			en: new FormControl<string | null | undefined>(undefined),
			es: new FormControl<string | null | undefined>(undefined),
			fr: new FormControl<string | null | undefined>(undefined),
			it: new FormControl<string | null | undefined>(undefined),
			ja: new FormControl<string | null | undefined>(undefined),
			ko: new FormControl<string | null | undefined>(undefined),
			pageId: new FormControl<string | null | undefined>(undefined),
			pt: new FormControl<string | null | undefined>(undefined),
			stringId: new FormControl<string | null | undefined>(undefined),
			tstamp: new FormControl<Date | null | undefined>(undefined),
			zhCht: new FormControl<string | null | undefined>(undefined),
			zhCn: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface SystemTbl {
		id?: number | null;
		lastGet?: Date | null;
		lastPut?: Date | null;
		lastSosBearerTokenRefresh?: Date | null;
		lastSosNewCustomerSync?: Date | null;
		lastSosNewSerialSync?: Date | null;
		lastSosUpdatedCustomerSync?: Date | null;
		lastSosUpdatedSerialSync?: Date | null;
		lastT5sync?: Date | null;
		mode?: number | null;
		sosBearerToken?: string | null;
		sosRefreshToken?: string | null;
	}
	export interface SystemTblFormProperties {
		id: FormControl<number | null | undefined>,
		lastGet: FormControl<Date | null | undefined>,
		lastPut: FormControl<Date | null | undefined>,
		lastSosBearerTokenRefresh: FormControl<Date | null | undefined>,
		lastSosNewCustomerSync: FormControl<Date | null | undefined>,
		lastSosNewSerialSync: FormControl<Date | null | undefined>,
		lastSosUpdatedCustomerSync: FormControl<Date | null | undefined>,
		lastSosUpdatedSerialSync: FormControl<Date | null | undefined>,
		lastT5sync: FormControl<Date | null | undefined>,
		mode: FormControl<number | null | undefined>,
		sosBearerToken: FormControl<string | null | undefined>,
		sosRefreshToken: FormControl<string | null | undefined>,
	}
	export function CreateSystemTblFormGroup() {
		return new FormGroup<SystemTblFormProperties>({
			id: new FormControl<number | null | undefined>(undefined),
			lastGet: new FormControl<Date | null | undefined>(undefined),
			lastPut: new FormControl<Date | null | undefined>(undefined),
			lastSosBearerTokenRefresh: new FormControl<Date | null | undefined>(undefined),
			lastSosNewCustomerSync: new FormControl<Date | null | undefined>(undefined),
			lastSosNewSerialSync: new FormControl<Date | null | undefined>(undefined),
			lastSosUpdatedCustomerSync: new FormControl<Date | null | undefined>(undefined),
			lastSosUpdatedSerialSync: new FormControl<Date | null | undefined>(undefined),
			lastT5sync: new FormControl<Date | null | undefined>(undefined),
			mode: new FormControl<number | null | undefined>(undefined),
			sosBearerToken: new FormControl<string | null | undefined>(undefined),
			sosRefreshToken: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface T5calcentre {
		address1?: string | null;
		address2?: string | null;
		address3?: string | null;
		city?: string | null;
		contact?: string | null;
		country?: string | null;
		displayname?: string | null;
		email1?: string | null;
		email2?: string | null;
		id?: number | null;
		name?: string | null;
		notes?: string | null;
		permissions?: number | null;
		phone1?: string | null;
		phone2?: string | null;
		region?: string | null;
		state?: string | null;
		zip?: string | null;
	}
	export interface T5calcentreFormProperties {
		address1: FormControl<string | null | undefined>,
		address2: FormControl<string | null | undefined>,
		address3: FormControl<string | null | undefined>,
		city: FormControl<string | null | undefined>,
		contact: FormControl<string | null | undefined>,
		country: FormControl<string | null | undefined>,
		displayname: FormControl<string | null | undefined>,
		email1: FormControl<string | null | undefined>,
		email2: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		name: FormControl<string | null | undefined>,
		notes: FormControl<string | null | undefined>,
		permissions: FormControl<number | null | undefined>,
		phone1: FormControl<string | null | undefined>,
		phone2: FormControl<string | null | undefined>,
		region: FormControl<string | null | undefined>,
		state: FormControl<string | null | undefined>,
		zip: FormControl<string | null | undefined>,
	}
	export function CreateT5calcentreFormGroup() {
		return new FormGroup<T5calcentreFormProperties>({
			address1: new FormControl<string | null | undefined>(undefined),
			address2: new FormControl<string | null | undefined>(undefined),
			address3: new FormControl<string | null | undefined>(undefined),
			city: new FormControl<string | null | undefined>(undefined),
			contact: new FormControl<string | null | undefined>(undefined),
			country: new FormControl<string | null | undefined>(undefined),
			displayname: new FormControl<string | null | undefined>(undefined),
			email1: new FormControl<string | null | undefined>(undefined),
			email2: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			name: new FormControl<string | null | undefined>(undefined),
			notes: new FormControl<string | null | undefined>(undefined),
			permissions: new FormControl<number | null | undefined>(undefined),
			phone1: new FormControl<string | null | undefined>(undefined),
			phone2: new FormControl<string | null | undefined>(undefined),
			region: new FormControl<string | null | undefined>(undefined),
			state: new FormControl<string | null | undefined>(undefined),
			zip: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface T5calibration {
		ambientTemperature?: string | null;
		appVersion?: string | null;
		batteryLevel?: string | null;
		borescope?: string | null;
		borescopeResult?: string | null;
		calCentre?: string | null;
		caldate?: Date | null;
		certificate?: string | null;
		firmwareVersion?: string | null;
		humidity?: string | null;
		id?: string | null;
		lastsync?: Date | null;
		lastupdate?: Date | null;
		latitude?: string | null;
		longitude?: string | null;
		miscdata?: string | null;
		moisture?: string | null;
		moistureResult?: string | null;
		nextcaldate?: Date | null;
		notes?: string | null;
		owner?: string | null;
		radar?: string | null;
		radarResult?: string | null;
		sensorMask?: string | null;
		sensorTimes?: string | null;
		temperature?: string | null;
		temperatureprobe?: string | null;
		temperatureProbeResult?: string | null;
		temperatureResult?: string | null;
		thermalcamera?: string | null;
		thermalCameraResult?: string | null;
		unitid?: number | null;
		user?: string | null;
	}
	export interface T5calibrationFormProperties {
		ambientTemperature: FormControl<string | null | undefined>,
		appVersion: FormControl<string | null | undefined>,
		batteryLevel: FormControl<string | null | undefined>,
		borescope: FormControl<string | null | undefined>,
		borescopeResult: FormControl<string | null | undefined>,
		calCentre: FormControl<string | null | undefined>,
		caldate: FormControl<Date | null | undefined>,
		certificate: FormControl<string | null | undefined>,
		firmwareVersion: FormControl<string | null | undefined>,
		humidity: FormControl<string | null | undefined>,
		id: FormControl<string | null | undefined>,
		lastsync: FormControl<Date | null | undefined>,
		lastupdate: FormControl<Date | null | undefined>,
		latitude: FormControl<string | null | undefined>,
		longitude: FormControl<string | null | undefined>,
		miscdata: FormControl<string | null | undefined>,
		moisture: FormControl<string | null | undefined>,
		moistureResult: FormControl<string | null | undefined>,
		nextcaldate: FormControl<Date | null | undefined>,
		notes: FormControl<string | null | undefined>,
		owner: FormControl<string | null | undefined>,
		radar: FormControl<string | null | undefined>,
		radarResult: FormControl<string | null | undefined>,
		sensorMask: FormControl<string | null | undefined>,
		sensorTimes: FormControl<string | null | undefined>,
		temperature: FormControl<string | null | undefined>,
		temperatureprobe: FormControl<string | null | undefined>,
		temperatureProbeResult: FormControl<string | null | undefined>,
		temperatureResult: FormControl<string | null | undefined>,
		thermalcamera: FormControl<string | null | undefined>,
		thermalCameraResult: FormControl<string | null | undefined>,
		unitid: FormControl<number | null | undefined>,
		user: FormControl<string | null | undefined>,
	}
	export function CreateT5calibrationFormGroup() {
		return new FormGroup<T5calibrationFormProperties>({
			ambientTemperature: new FormControl<string | null | undefined>(undefined),
			appVersion: new FormControl<string | null | undefined>(undefined),
			batteryLevel: new FormControl<string | null | undefined>(undefined),
			borescope: new FormControl<string | null | undefined>(undefined),
			borescopeResult: new FormControl<string | null | undefined>(undefined),
			calCentre: new FormControl<string | null | undefined>(undefined),
			caldate: new FormControl<Date | null | undefined>(undefined),
			certificate: new FormControl<string | null | undefined>(undefined),
			firmwareVersion: new FormControl<string | null | undefined>(undefined),
			humidity: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<string | null | undefined>(undefined),
			lastsync: new FormControl<Date | null | undefined>(undefined),
			lastupdate: new FormControl<Date | null | undefined>(undefined),
			latitude: new FormControl<string | null | undefined>(undefined),
			longitude: new FormControl<string | null | undefined>(undefined),
			miscdata: new FormControl<string | null | undefined>(undefined),
			moisture: new FormControl<string | null | undefined>(undefined),
			moistureResult: new FormControl<string | null | undefined>(undefined),
			nextcaldate: new FormControl<Date | null | undefined>(undefined),
			notes: new FormControl<string | null | undefined>(undefined),
			owner: new FormControl<string | null | undefined>(undefined),
			radar: new FormControl<string | null | undefined>(undefined),
			radarResult: new FormControl<string | null | undefined>(undefined),
			sensorMask: new FormControl<string | null | undefined>(undefined),
			sensorTimes: new FormControl<string | null | undefined>(undefined),
			temperature: new FormControl<string | null | undefined>(undefined),
			temperatureprobe: new FormControl<string | null | undefined>(undefined),
			temperatureProbeResult: new FormControl<string | null | undefined>(undefined),
			temperatureResult: new FormControl<string | null | undefined>(undefined),
			thermalcamera: new FormControl<string | null | undefined>(undefined),
			thermalCameraResult: new FormControl<string | null | undefined>(undefined),
			unitid: new FormControl<number | null | undefined>(undefined),
			user: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface T5config {
		active?: number | null;
		ai?: number | null;
		aitrainer?: number | null;
		applied?: number | null;
		applieddate?: Date | null;
		apptermsagreed?: number | null;
		borescope?: number | null;
		borescopeuse?: number | null;
		calcentreid?: number | null;
		camera?: number | null;
		data?: string | null;
		expiryDate?: Date | null;
		firmware?: string | null;
		id?: number | null;
		iTrakerName?: string | null;
		lastcheck?: Date | null;
		lastupdate?: Date | null;
		moisture?: number | null;
		moistureuse?: number | null;
		nextCalibration?: Date | null;
		ownerid?: number | null;
		radar?: number | null;
		radaruse?: number | null;
		sensorTimes?: string | null;
		subscriptionlevel?: number | null;
		suspendreason?: number | null;
		tconnex?: number | null;
		technicianid?: number | null;
		temperature?: number | null;
		temperatureuse?: number | null;
		tempprobe?: number | null;
		tempprobeuse?: number | null;
		thermalcam?: number | null;
		thermalcamuse?: number | null;
		ttGlobalUser?: string | null;
		unitid?: number | null;
		usageMode?: string | null;
	}
	export interface T5configFormProperties {
		active: FormControl<number | null | undefined>,
		ai: FormControl<number | null | undefined>,
		aitrainer: FormControl<number | null | undefined>,
		applied: FormControl<number | null | undefined>,
		applieddate: FormControl<Date | null | undefined>,
		apptermsagreed: FormControl<number | null | undefined>,
		borescope: FormControl<number | null | undefined>,
		borescopeuse: FormControl<number | null | undefined>,
		calcentreid: FormControl<number | null | undefined>,
		camera: FormControl<number | null | undefined>,
		data: FormControl<string | null | undefined>,
		expiryDate: FormControl<Date | null | undefined>,
		firmware: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		iTrakerName: FormControl<string | null | undefined>,
		lastcheck: FormControl<Date | null | undefined>,
		lastupdate: FormControl<Date | null | undefined>,
		moisture: FormControl<number | null | undefined>,
		moistureuse: FormControl<number | null | undefined>,
		nextCalibration: FormControl<Date | null | undefined>,
		ownerid: FormControl<number | null | undefined>,
		radar: FormControl<number | null | undefined>,
		radaruse: FormControl<number | null | undefined>,
		sensorTimes: FormControl<string | null | undefined>,
		subscriptionlevel: FormControl<number | null | undefined>,
		suspendreason: FormControl<number | null | undefined>,
		tconnex: FormControl<number | null | undefined>,
		technicianid: FormControl<number | null | undefined>,
		temperature: FormControl<number | null | undefined>,
		temperatureuse: FormControl<number | null | undefined>,
		tempprobe: FormControl<number | null | undefined>,
		tempprobeuse: FormControl<number | null | undefined>,
		thermalcam: FormControl<number | null | undefined>,
		thermalcamuse: FormControl<number | null | undefined>,
		ttGlobalUser: FormControl<string | null | undefined>,
		unitid: FormControl<number | null | undefined>,
		usageMode: FormControl<string | null | undefined>,
	}
	export function CreateT5configFormGroup() {
		return new FormGroup<T5configFormProperties>({
			active: new FormControl<number | null | undefined>(undefined),
			ai: new FormControl<number | null | undefined>(undefined),
			aitrainer: new FormControl<number | null | undefined>(undefined),
			applied: new FormControl<number | null | undefined>(undefined),
			applieddate: new FormControl<Date | null | undefined>(undefined),
			apptermsagreed: new FormControl<number | null | undefined>(undefined),
			borescope: new FormControl<number | null | undefined>(undefined),
			borescopeuse: new FormControl<number | null | undefined>(undefined),
			calcentreid: new FormControl<number | null | undefined>(undefined),
			camera: new FormControl<number | null | undefined>(undefined),
			data: new FormControl<string | null | undefined>(undefined),
			expiryDate: new FormControl<Date | null | undefined>(undefined),
			firmware: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			iTrakerName: new FormControl<string | null | undefined>(undefined),
			lastcheck: new FormControl<Date | null | undefined>(undefined),
			lastupdate: new FormControl<Date | null | undefined>(undefined),
			moisture: new FormControl<number | null | undefined>(undefined),
			moistureuse: new FormControl<number | null | undefined>(undefined),
			nextCalibration: new FormControl<Date | null | undefined>(undefined),
			ownerid: new FormControl<number | null | undefined>(undefined),
			radar: new FormControl<number | null | undefined>(undefined),
			radaruse: new FormControl<number | null | undefined>(undefined),
			sensorTimes: new FormControl<string | null | undefined>(undefined),
			subscriptionlevel: new FormControl<number | null | undefined>(undefined),
			suspendreason: new FormControl<number | null | undefined>(undefined),
			tconnex: new FormControl<number | null | undefined>(undefined),
			technicianid: new FormControl<number | null | undefined>(undefined),
			temperature: new FormControl<number | null | undefined>(undefined),
			temperatureuse: new FormControl<number | null | undefined>(undefined),
			tempprobe: new FormControl<number | null | undefined>(undefined),
			tempprobeuse: new FormControl<number | null | undefined>(undefined),
			thermalcam: new FormControl<number | null | undefined>(undefined),
			thermalcamuse: new FormControl<number | null | undefined>(undefined),
			ttGlobalUser: new FormControl<string | null | undefined>(undefined),
			unitid: new FormControl<number | null | undefined>(undefined),
			usageMode: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface T5datum {
		data?: string | null;
		datakind?: string | null;
		id?: number | null;
		info?: string | null;
		localtime?: Date | null;
		serial?: string | null;
		timestamp?: Date | null;
	}
	export interface T5datumFormProperties {
		data: FormControl<string | null | undefined>,
		datakind: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		info: FormControl<string | null | undefined>,
		localtime: FormControl<Date | null | undefined>,
		serial: FormControl<string | null | undefined>,
		timestamp: FormControl<Date | null | undefined>,
	}
	export function CreateT5datumFormGroup() {
		return new FormGroup<T5datumFormProperties>({
			data: new FormControl<string | null | undefined>(undefined),
			datakind: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			info: new FormControl<string | null | undefined>(undefined),
			localtime: new FormControl<Date | null | undefined>(undefined),
			serial: new FormControl<string | null | undefined>(undefined),
			timestamp: new FormControl<Date | null | undefined>(undefined),
		});

	}

	export interface T5message {
		hasread?: number | null;
		id?: number | null;
		message?: string | null;
		readdate?: Date | null;
		unitid?: string | null;
	}
	export interface T5messageFormProperties {
		hasread: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		message: FormControl<string | null | undefined>,
		readdate: FormControl<Date | null | undefined>,
		unitid: FormControl<string | null | undefined>,
	}
	export function CreateT5messageFormGroup() {
		return new FormGroup<T5messageFormProperties>({
			hasread: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			message: new FormControl<string | null | undefined>(undefined),
			readdate: new FormControl<Date | null | undefined>(undefined),
			unitid: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface T5owner {
		active?: string | null;
		address1?: string | null;
		address2?: string | null;
		address3?: string | null;
		calcentre?: number | null;
		city?: string | null;
		company?: string | null;
		contact?: string | null;
		country?: string | null;
		displayname?: string | null;
		email?: string | null;
		id?: number | null;
		lastcheck?: Date | null;
		lastupdate?: Date | null;
		notes?: string | null;
		phone1?: string | null;
		phone2?: string | null;
		state?: string | null;
		userKind?: string | null;
		zip?: string | null;
	}
	export interface T5ownerFormProperties {
		active: FormControl<string | null | undefined>,
		address1: FormControl<string | null | undefined>,
		address2: FormControl<string | null | undefined>,
		address3: FormControl<string | null | undefined>,
		calcentre: FormControl<number | null | undefined>,
		city: FormControl<string | null | undefined>,
		company: FormControl<string | null | undefined>,
		contact: FormControl<string | null | undefined>,
		country: FormControl<string | null | undefined>,
		displayname: FormControl<string | null | undefined>,
		email: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		lastcheck: FormControl<Date | null | undefined>,
		lastupdate: FormControl<Date | null | undefined>,
		notes: FormControl<string | null | undefined>,
		phone1: FormControl<string | null | undefined>,
		phone2: FormControl<string | null | undefined>,
		state: FormControl<string | null | undefined>,
		userKind: FormControl<string | null | undefined>,
		zip: FormControl<string | null | undefined>,
	}
	export function CreateT5ownerFormGroup() {
		return new FormGroup<T5ownerFormProperties>({
			active: new FormControl<string | null | undefined>(undefined),
			address1: new FormControl<string | null | undefined>(undefined),
			address2: new FormControl<string | null | undefined>(undefined),
			address3: new FormControl<string | null | undefined>(undefined),
			calcentre: new FormControl<number | null | undefined>(undefined),
			city: new FormControl<string | null | undefined>(undefined),
			company: new FormControl<string | null | undefined>(undefined),
			contact: new FormControl<string | null | undefined>(undefined),
			country: new FormControl<string | null | undefined>(undefined),
			displayname: new FormControl<string | null | undefined>(undefined),
			email: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			lastcheck: new FormControl<Date | null | undefined>(undefined),
			lastupdate: new FormControl<Date | null | undefined>(undefined),
			notes: new FormControl<string | null | undefined>(undefined),
			phone1: new FormControl<string | null | undefined>(undefined),
			phone2: new FormControl<string | null | undefined>(undefined),
			state: new FormControl<string | null | undefined>(undefined),
			userKind: new FormControl<string | null | undefined>(undefined),
			zip: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface T5technician {
		active?: number | null;
		calcentre?: number | null;
		company?: string | null;
		deviceId?: string | null;
		deviceManufacturer?: string | null;
		deviceModel?: string | null;
		email?: string | null;
		id?: number | null;
		level?: number | null;
		password?: string | null;
		permissions?: number | null;
		region?: number | null;
		technician?: string | null;
		username?: string | null;
	}
	export interface T5technicianFormProperties {
		active: FormControl<number | null | undefined>,
		calcentre: FormControl<number | null | undefined>,
		company: FormControl<string | null | undefined>,
		deviceId: FormControl<string | null | undefined>,
		deviceManufacturer: FormControl<string | null | undefined>,
		deviceModel: FormControl<string | null | undefined>,
		email: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		level: FormControl<number | null | undefined>,
		password: FormControl<string | null | undefined>,
		permissions: FormControl<number | null | undefined>,
		region: FormControl<number | null | undefined>,
		technician: FormControl<string | null | undefined>,
		username: FormControl<string | null | undefined>,
	}
	export function CreateT5technicianFormGroup() {
		return new FormGroup<T5technicianFormProperties>({
			active: new FormControl<number | null | undefined>(undefined),
			calcentre: new FormControl<number | null | undefined>(undefined),
			company: new FormControl<string | null | undefined>(undefined),
			deviceId: new FormControl<string | null | undefined>(undefined),
			deviceManufacturer: new FormControl<string | null | undefined>(undefined),
			deviceModel: new FormControl<string | null | undefined>(undefined),
			email: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			level: new FormControl<number | null | undefined>(undefined),
			password: new FormControl<string | null | undefined>(undefined),
			permissions: new FormControl<number | null | undefined>(undefined),
			region: new FormControl<number | null | undefined>(undefined),
			technician: new FormControl<string | null | undefined>(undefined),
			username: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Unit {
		active?: number | null;
		assignedto?: string | null;
		associatedcompany?: number | null;
		companyextid?: number | null;
		companyid?: number | null;
		externalid?: number | null;
		firmwareversion?: string | null;
		id?: number | null;
		location?: number | null;
		make?: string | null;
		model?: string | null;
		nextdue?: Date | null;
		paymentplan?: number | null;
		paymentsremain?: number | null;
		purchasetype?: string | null;
		sensormask?: string | null;
		serial?: string | null;
		stolen?: number | null;
		tstamp?: Date | null;
		usagemode?: string | null;
	}
	export interface UnitFormProperties {
		active: FormControl<number | null | undefined>,
		assignedto: FormControl<string | null | undefined>,
		associatedcompany: FormControl<number | null | undefined>,
		companyextid: FormControl<number | null | undefined>,
		companyid: FormControl<number | null | undefined>,
		externalid: FormControl<number | null | undefined>,
		firmwareversion: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		location: FormControl<number | null | undefined>,
		make: FormControl<string | null | undefined>,
		model: FormControl<string | null | undefined>,
		nextdue: FormControl<Date | null | undefined>,
		paymentplan: FormControl<number | null | undefined>,
		paymentsremain: FormControl<number | null | undefined>,
		purchasetype: FormControl<string | null | undefined>,
		sensormask: FormControl<string | null | undefined>,
		serial: FormControl<string | null | undefined>,
		stolen: FormControl<number | null | undefined>,
		tstamp: FormControl<Date | null | undefined>,
		usagemode: FormControl<string | null | undefined>,
	}
	export function CreateUnitFormGroup() {
		return new FormGroup<UnitFormProperties>({
			active: new FormControl<number | null | undefined>(undefined),
			assignedto: new FormControl<string | null | undefined>(undefined),
			associatedcompany: new FormControl<number | null | undefined>(undefined),
			companyextid: new FormControl<number | null | undefined>(undefined),
			companyid: new FormControl<number | null | undefined>(undefined),
			externalid: new FormControl<number | null | undefined>(undefined),
			firmwareversion: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			location: new FormControl<number | null | undefined>(undefined),
			make: new FormControl<string | null | undefined>(undefined),
			model: new FormControl<string | null | undefined>(undefined),
			nextdue: new FormControl<Date | null | undefined>(undefined),
			paymentplan: new FormControl<number | null | undefined>(undefined),
			paymentsremain: new FormControl<number | null | undefined>(undefined),
			purchasetype: new FormControl<string | null | undefined>(undefined),
			sensormask: new FormControl<string | null | undefined>(undefined),
			serial: new FormControl<string | null | undefined>(undefined),
			stolen: new FormControl<number | null | undefined>(undefined),
			tstamp: new FormControl<Date | null | undefined>(undefined),
			usagemode: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface User {
		company?: number | null;
		deleted?: number | null;
		displayname?: string | null;
		email?: string | null;
		emailVerified?: number | null;
		id?: number | null;
		lastlogin?: Date | null;
		password?: string | null;
		tzone?: string | null;
		usergroup?: number | null;
		username?: string | null;
	}
	export interface UserFormProperties {
		company: FormControl<number | null | undefined>,
		deleted: FormControl<number | null | undefined>,
		displayname: FormControl<string | null | undefined>,
		email: FormControl<string | null | undefined>,
		emailVerified: FormControl<number | null | undefined>,
		id: FormControl<number | null | undefined>,
		lastlogin: FormControl<Date | null | undefined>,
		password: FormControl<string | null | undefined>,
		tzone: FormControl<string | null | undefined>,
		usergroup: FormControl<number | null | undefined>,
		username: FormControl<string | null | undefined>,
	}
	export function CreateUserFormGroup() {
		return new FormGroup<UserFormProperties>({
			company: new FormControl<number | null | undefined>(undefined),
			deleted: new FormControl<number | null | undefined>(undefined),
			displayname: new FormControl<string | null | undefined>(undefined),
			email: new FormControl<string | null | undefined>(undefined),
			emailVerified: new FormControl<number | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			lastlogin: new FormControl<Date | null | undefined>(undefined),
			password: new FormControl<string | null | undefined>(undefined),
			tzone: new FormControl<string | null | undefined>(undefined),
			usergroup: new FormControl<number | null | undefined>(undefined),
			username: new FormControl<string | null | undefined>(undefined),
		});

	}

	export interface Usergroup {
		admin?: number | null;
		displayname?: string | null;
		id?: number | null;
		termatracadmin?: number | null;
		tzone?: string | null;
	}
	export interface UsergroupFormProperties {
		admin: FormControl<number | null | undefined>,
		displayname: FormControl<string | null | undefined>,
		id: FormControl<number | null | undefined>,
		termatracadmin: FormControl<number | null | undefined>,
		tzone: FormControl<string | null | undefined>,
	}
	export function CreateUsergroupFormGroup() {
		return new FormGroup<UsergroupFormProperties>({
			admin: new FormControl<number | null | undefined>(undefined),
			displayname: new FormControl<string | null | undefined>(undefined),
			id: new FormControl<number | null | undefined>(undefined),
			termatracadmin: new FormControl<number | null | undefined>(undefined),
			tzone: new FormControl<string | null | undefined>(undefined),
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

