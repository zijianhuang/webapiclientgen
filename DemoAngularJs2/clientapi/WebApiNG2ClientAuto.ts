import { Injectable }    from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise'
export namespace DemoWebApi_DemoData_Client {
    export enum AddressType { Postal, Residential }

    export enum Days { Sat = 1, Sun = 2, Mon = 3, Tue = 4, Wed = 5, Thu = 6, Fri = 7 }

    export interface Address {
        id?: string;
        street1?: string;
        street2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
        type?: DemoWebApi_DemoData_Client.AddressType;
        location?: DemoWebApi_DemoData_Another_Client.MyPoint;
    }

    export interface Entity {
        id?: string;
        name: string;
        addresses?: Array<DemoWebApi_DemoData_Client.Address>;
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {
        surname?: string;
        givenName?: string;
        birthDate?: Date;
    }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {
        businessNumber?: string;
        businessNumberType?: string;
        textMatrix?: Array<Array<string>>;
        int2DJagged?: Array<Array<number>>;
        int2D?: number[][];
        lines?: Array<string>;
    }

    export interface MyPeopleDic {
        dic?: { [id: string]: DemoWebApi_DemoData_Client.Person };
        anotherDic?: { [id: string]: string };
        intDic?: { [id: number]: string };
    }

}

export namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        x: number;
        y: number;
    }

}

export namespace DemoWebApi_Controllers_Client {
    @Injectable()
    export class SuperDemo {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: Http) {
        }

        /** 
         * GET api/SuperDemo/int?d={d}
         * @param {number} d 
         * @return {number} 
         */
        getIntSquare(d: number): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/int?d=' + d)).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d 
         * @return {number} 
         */
        getDecimalSquare(d: number): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/decimal?d=' + d)).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {Date} 
         */
        getDateTime(hasValue: boolean): Promise<Date> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue=' + hasValue)).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date} 
         */
        getDateTimeOffset(): Promise<Date> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/DateTimeOffset')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffset(d: Date): Promise<boolean> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/DateTimeOffset'), JSON.stringify(d), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffsetNullable(d: Date): Promise<boolean> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable'), JSON.stringify(d), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {number} 
         */
        getNullableDecimal(hasValue: boolean): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue=' + hasValue)).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {number} 
         */
        getFloatZero(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/FloatZero')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {number} 
         */
        getDoubleZero(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/DoubleZero')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {number} 
         */
        getDecimalZero(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/DecimalZero')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {string} 
         */
        getNullString(): Promise<string> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/NullString')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {string} 
         */
        getEmptyString(): Promise<string> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/EmptyString')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getNullPerson(): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/NullObject')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {any} 
         */
        getTextStream(): Promise<any> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/TextStream')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>} 
         */
        getByteArray(): Promise<Array<number>> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/ByteArray')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {any} 
         */
        getActionResult(): Promise<any> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/ActionResult')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {number} 
         */
        getbyte(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/byte')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {number} 
         */
        getsbyte(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/sbyte')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/short
         * @return {number} 
         */
        getShort(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/short')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {number} 
         */
        getUShort(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/ushort')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {number} 
         */
        getUint(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/uint')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {number} 
         */
        getulong(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/ulong')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {number} 
         */
        getdouble(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/doulbe')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {number} 
         */
        getDecimal(): Promise<number> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/decimal')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/char
         * @return {string} 
         */
        getChar(): Promise<string> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/char')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {boolean} 
         */
        getBool(): Promise<boolean> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/bool')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/int2d
         * @return {number[][]} 
         */
        getInt2D(): Promise<number[][]> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/int2d')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>} 
         */
        getInt2DJagged(): Promise<Array<Array<number>>> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/int2dJagged')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/int2d
         * @param {number[][]} a 
         * @return {boolean} 
         */
        postInt2D(a: number[][]): Promise<boolean> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/int2d'), JSON.stringify(a), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a 
         * @return {boolean} 
         */
        postInt2DJagged(a: Array<Array<number>>): Promise<boolean> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/int2djagged'), JSON.stringify(a), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a 
         * @return {boolean} 
         */
        postIntArray(a: Array<number>): Promise<boolean> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/intArray'), JSON.stringify(a), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/intArray
         * @return {Array<number>} 
         */
        getIntArray(): Promise<Array<number>> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/intArray')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/AnonymousDynamic
         * @return {any} 
         */
        getAnonymousDynamic(): Promise<any> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/AnonymousDynamic')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/AnonymousObject
         * @return {any} 
         */
        getAnonymousObject(): Promise<any> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/AnonymousObject')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj 
         * @return {any} 
         */
        postAnonymousObject(obj: any): Promise<any> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/AnonymousObject'), JSON.stringify(obj), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }} 
         */
        getDictionary(): Promise<{ [id: string]: string }> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/StringStringDic')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }} 
         */
        getDictionaryOfPeople(): Promise<{ [id: string]: DemoWebApi_DemoData_Client.Person }> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/StringPersonDic')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic 
         * @return {number} 
         */
        postDictionary(dic: { [id: string]: DemoWebApi_DemoData_Client.Person }): Promise<number> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/StringPersonDic'), JSON.stringify(dic), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/KeyValuePair
         * @return {{key: string, value: DemoWebApi_DemoData_Client.Person }} 
         */
        getKeyhValuePair(): Promise<{ key: string, value: DemoWebApi_DemoData_Client.Person }> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/KeyValuePair')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getICollection(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/ICollection')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIList(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/IList')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIReadOnlyList(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyList')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIReadOnlyCollection(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyCollection')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getList(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/List')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getCollection(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/Collection')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postICollection(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/ICollection'), JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIList(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/IList'), JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyList'), JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyCollection'), JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postList(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/List'), JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/Collection'), JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/SuperDemo/PostEmpty?s={s}&i={i}
         * @param {string} s 
         * @param {number} i 
         * @return {{item1:string, item2:number}} 
         */
        postWithQueryButEmptyBody(s: string, i: number): Promise<{ item1: string, item2: number }> {
            return this.http.post(encodeURI(this.baseUri + 'api/SuperDemo/PostEmpty?s=' + s + '&i=' + i), JSON.stringify(null), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }
        handleError(error: any) {
            return Promise.reject(error.message || error)
        }
    }

    @Injectable()
    export class Entities {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: Http) {
        }

        /** 
         * PUT api/SuperDemo/link?id={id}&relationship={relationship}
         * @param {number} id 
         * @param {string} relationship 
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {boolean} 
         */
        linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person): Promise<boolean> {
            return this.http.put(encodeURI(this.baseUri + 'api/SuperDemo/link?id=' + id + '&relationship=' + relationship), JSON.stringify(person), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/SuperDemo/Company?id={id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Company} 
         */
        getCompany(id: number): Promise<DemoWebApi_DemoData_Client.Company> {
            return this.http.get(encodeURI(this.baseUri + 'api/SuperDemo/Company?id=' + id)).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * Get a person
         * GET api/Entities/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        getPerson(id: number): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.get(encodeURI(this.baseUri + 'api/Entities/' + id)).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} p 
         * @return {number} 
         */
        createPerson(p: DemoWebApi_DemoData_Client.Person): Promise<number> {
            return this.http.post(encodeURI(this.baseUri + 'api/Entities'), JSON.stringify(p), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * PUT api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        updatePerson(person: DemoWebApi_DemoData_Client.Person): Promise<void> {
            return this.http.put(encodeURI(this.baseUri + 'api/Entities'), JSON.stringify(person), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * DELETE api/Entities/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Promise<void> {
            return this.http.delete(encodeURI(this.baseUri + 'api/Entities/' + id)).toPromise().then(response => response.json()).catch(this.handleError);
        }
        handleError(error: any) {
            return Promise.reject(error.message || error)
        }
    }

    @Injectable()
    export class Tuple {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: Http) {
        }

        /** 
         * POST api/Tuple/PersonCompany1
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPersonCompany1(peopleAndCompany: { item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company }): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/PersonCompany1'), JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/PeopleCompany2
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany2(peopleAndCompany: { item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company }): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany2'), JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/PeopleCompany3
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany3(peopleAndCompany: { item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company }): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany3'), JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/PeopleCompany4
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany4(peopleAndCompany: { item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company }): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany4'), JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/PeopleCompany4
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} 
         */
        getPeopleCompany4(): Promise<{ item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany4')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/PeopleCompany5
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany5(peopleAndCompany: { item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company }): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany5'), JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/PeopleCompany5
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} 
         */
        getPeopleCompany5(): Promise<{ item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany5')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/PeopleCompany6
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany6(peopleAndCompany: { item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company }): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany6'), JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/PeopleCompany7
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany7(peopleAndCompany: { item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company }): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany7'), JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/PeopleCompany8
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany8(peopleAndCompany: { item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company }): Promise<DemoWebApi_DemoData_Client.Person> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany8'), JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/Tuple1
         * @return {{item1:number}} 
         */
        getTuple1(): Promise<{ item1: number }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/Tuple1')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/Tuple1
         * @param {{item1:number}} tuple 
         * @return {number} 
         */
        postTuple1(tuple: { item1: number }): Promise<number> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/Tuple1'), JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/Tuple2
         * @return {{item1:string, item2:number}} 
         */
        getTuple2(): Promise<{ item1: string, item2: number }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/Tuple2')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/Tuple2
         * @param {{item1:string, item2:number}} tuple 
         * @return {string} 
         */
        postTuple2(tuple: { item1: string, item2: number }): Promise<string> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/Tuple2'), JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/Tuple3
         * @return {{item1:string, item2:string, item3:number}} 
         */
        getTuple3(): Promise<{ item1: string, item2: string, item3: number }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/Tuple3')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/Tuple3
         * @param {{item1:string, item2:string, item3:number}} tuple 
         * @return {string} 
         */
        postTuple3(tuple: { item1: string, item2: string, item3: number }): Promise<string> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/Tuple3'), JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/Tuple4
         * @return {{item1:string, item2:string, item3:string, item4:number}} 
         */
        getTuple4(): Promise<{ item1: string, item2: string, item3: string, item4: number }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/Tuple4')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/Tuple4
         * @param {{item1:string, item2:string, item3:string, item4:number}} tuple 
         * @return {string} 
         */
        postTuple4(tuple: { item1: string, item2: string, item3: string, item4: number }): Promise<string> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/Tuple4'), JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/Tuple5
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:number}} 
         */
        getTuple5(): Promise<{ item1: string, item2: string, item3: string, item4: string, item5: number }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/Tuple5')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/Tuple5
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:number}} tuple 
         * @return {string} 
         */
        postTuple5(tuple: { item1: string, item2: string, item3: string, item4: string, item5: number }): Promise<string> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/Tuple5'), JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/Tuple6
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} 
         */
        getTuple6(): Promise<{ item1: string, item2: string, item3: string, item4: string, item5: string, item6: number }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/Tuple6')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/Tuple6
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} tuple 
         * @return {string} 
         */
        postTuple6(tuple: { item1: string, item2: string, item3: string, item4: string, item5: string, item6: number }): Promise<string> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/Tuple6'), JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/Tuple7
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} 
         */
        getTuple7(): Promise<{ item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/Tuple7')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/Tuple7
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} tuple 
         * @return {string} 
         */
        postTuple7(tuple: { item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number }): Promise<string> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/Tuple7'), JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Tuple/Tuple8
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}} 
         */
        getTuple8(): Promise<{ item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: { item1: string, item2: string, item3: string } }> {
            return this.http.get(encodeURI(this.baseUri + 'api/Tuple/Tuple8')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Tuple/Tuple8
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}} tuple 
         * @return {string} 
         */
        postTuple8(tuple: { item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: { item1: string, item2: string, item3: string } }): Promise<string> {
            return this.http.post(encodeURI(this.baseUri + 'api/Tuple/Tuple8'), JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }
        handleError(error: any) {
            return Promise.reject(error.message || error)
        }
    }

    @Injectable()
    export class Values {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: Http) {
        }

        /** 
         * GET api/Values
         * @return {Array<string>} 
         */
        get(): Promise<Array<string>> {
            return this.http.get(encodeURI(this.baseUri + 'api/Values')).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Values/{id}?name={name}
         * @param {number} id 
         * @param {string} name 
         * @return {string} 
         */
        getByIdAndName(id: number, name: string): Promise<string> {
            return this.http.get(encodeURI(this.baseUri + 'api/Values/' + id + '?name=' + name)).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * GET api/Values?name={name}
         * @param {string} name 
         * @return {string} 
         */
        getByName(name: string): Promise<string> {
            return this.http.get(encodeURI(this.baseUri + 'api/Values?name=' + name)).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {string} 
         */
        post(value: string): Promise<string> {
            return this.http.post(encodeURI(this.baseUri + 'api/Values'), JSON.stringify(value), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        put(id: number, value: string): Promise<void> {
            return this.http.put(encodeURI(this.baseUri + 'api/Values/' + id), JSON.stringify(value), { headers: new Headers({ 'Content-Type': 'application/json' }) }).toPromise().then(response => response.json()).catch(this.handleError);
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Promise<void> {
            return this.http.delete(encodeURI(this.baseUri + 'api/Values/' + id)).toPromise().then(response => response.json()).catch(this.handleError);
        }
        handleError(error: any) {
            return Promise.reject(error.message || error)
        }
    }

}

