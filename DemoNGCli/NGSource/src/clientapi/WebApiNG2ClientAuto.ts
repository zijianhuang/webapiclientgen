import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export namespace DemoWebApi_Controllers_Client {
    export interface Hero {
        id?: number;
        name?: string;
    }

}

export namespace DemoWebApi_DemoData_Client {
    export enum AddressType { Postal, Residential }

    export enum Days { Sat = 1, Sun = 2, Mon = 3, Tue = 4, Wed = 5, Thu = 6, Fri = 7 }

    export interface PhoneNumber {
        id?: string;
        fullNumber?: string;
        phoneType?: DemoWebApi_DemoData_Client.PhoneType;
        entityId?: string;
    }

    export enum PhoneType { Tel, Mobile, Skype, Fax }

    export interface Address {
        id?: string;
        entity?: DemoWebApi_DemoData_Client.Entity;
        entityId?: string;
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
        phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;
        web?: string;
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {
        surname?: string;
        givenName?: string;
        dob?: Date;
    }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {
        BusinessNum?: string;
        businessNumberType?: string;
        textMatrix?: Array<Array<string>>;
        int2DJagged?: Array<Array<number>>;
        int2D?: number[][];
        lines?: Array<string>;
    }

    export interface MyPeopleDic {
        dic?: {[id: string]: DemoWebApi_DemoData_Client.Person };
        anotherDic?: {[id: string]: string };
        intDic?: {[id: number]: string };
    }

}

export namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        x: number;
        y: number;
    }

}

export namespace DemoWebApi_Models_Client {
    export interface AddExternalLoginBindingModel {
        externalAccessToken?: string;
    }

    export interface ChangePasswordBindingModel {
        OldPwd: string;
        newPassword?: string;
        confirmPassword?: string;
    }

    export interface RegisterBindingModel {
        email?: string;
        password?: string;
        confirmPassword?: string;
    }

    export interface RegisterExternalBindingModel {
        email?: string;
    }

    export interface RemoveLoginBindingModel {
        loginProvider?: string;
        providerKey?: string;
    }

    export interface SetPasswordBindingModel {
        newPassword?: string;
        confirmPassword?: string;
    }

}

export namespace DemoWebApi_Controllers_Client {
    @Injectable()
    export class Entities {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/Entities/getPerson/{id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getPerson(id: number): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/getPerson/'+id);
        }

        /** 
         * POST api/Entities/createPerson
         * @param {DemoWebApi_DemoData_Client.Person} p 
         * @return {number} 
         */
        createPerson(p: DemoWebApi_DemoData_Client.Person): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/Entities/createPerson', JSON.stringify(p), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Entities/updatePerson
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        updatePerson(person: DemoWebApi_DemoData_Client.Person): Observable<Response>{
            return this.http.put<Response>(this.baseUri + 'api/Entities/updatePerson', JSON.stringify(person), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Entities/link
         * @param {number} id 
         * @param {string} relationship 
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {boolean} 
         */
        linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person): Observable<boolean>{
            return this.http.put<boolean>(this.baseUri + 'api/Entities/link', JSON.stringify(person), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * DELETE api/Entities/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Observable<Response>{
            return this.http.delete<Response>(this.baseUri + 'api/Entities/'+id);
        }

        /** 
         * GET api/Entities/Company/{id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Company} 
         */
        getCompany(id: number): Observable<DemoWebApi_DemoData_Client.Company>{
            return this.http.get<DemoWebApi_DemoData_Client.Company>(this.baseUri + 'api/Entities/Company/'+id);
        }
    }

    @Injectable()
    export class Heroes {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/Heroes
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        get(): Observable<Array<DemoWebApi_Controllers_Client.Hero>>{
            return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes');
        }

        /** 
         * GET api/Heroes/{id}
         * @param {number} id 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        getById(id: number): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.get<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes/'+id);
        }

        /** 
         * DELETE api/Heroes/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Observable<Response>{
            return this.http.delete<Response>(this.baseUri + 'api/Heroes/'+id);
        }

        /** 
         * POST api/Heroes
         * @param {string} name 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        post(name: string): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.post<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes', JSON.stringify(name), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Heroes
         * @param {DemoWebApi_Controllers_Client.Hero} hero 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        put(hero: DemoWebApi_Controllers_Client.Hero): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.put<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes', JSON.stringify(hero), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Heroes/{name}
         * @param {string} name 
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        search(name: string): Observable<Array<DemoWebApi_Controllers_Client.Hero>>{
            return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes/'+encodeURIComponent(name));
        }
    }

    @Injectable()
    export class Home {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/Home
         * @return {void} 
         */
        index(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/Home');
        }
    }

    @Injectable()
    export class SuperDemo {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/SuperDemo/int/{d}
         * @param {number} d 
         * @return {number} 
         */
        getIntSquare(d: number): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/int/'+d);
        }

        /** 
         * GET api/SuperDemo/decimal/{d}
         * @param {number} d 
         * @return {number} 
         */
        getDecimalSquare(d: number): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/decimal/'+d);
        }

        /** 
         * GET api/SuperDemo/NullableDatetime/{hasValue}
         * @param {boolean} hasValue 
         * @return {Date} 
         */
        getDateTime(hasValue: boolean): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NullableDatetime/'+hasValue);
        }

        /** 
         * GET api/SuperDemo/NextYear/{dt}
         * @param {Date} dt 
         * @return {Date} 
         */
        getNextYear(dt: Date): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NextYear/'+dt);
        }

        /** 
         * GET api/SuperDemo/NextHour/{dt}
         * @param {Date} dt 
         * @return {Date} 
         */
        getNextHour(dt: Date): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NextHour/'+dt);
        }

        /** 
         * POST api/SuperDemo/NextYear
         * @param {Date} dt 
         * @return {Date} 
         */
        postNextYear(dt: Date): Observable<Date>{
            return this.http.post<Date>(this.baseUri + 'api/SuperDemo/NextYear', JSON.stringify(dt), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date} 
         */
        getDateTimeOffset(): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/DateTimeOffset');
        }

        /** 
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffset(d: Date): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/DateTimeOffset', JSON.stringify(d), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffsetNullable(d: Date): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', JSON.stringify(d), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/NullableDecimal/{hasValue}
         * @param {boolean} hasValue 
         * @return {number} 
         */
        getNullableDecimal(hasValue: boolean): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/NullableDecimal/'+hasValue);
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {number} 
         */
        getFloatZero(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/FloatZero');
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {number} 
         */
        getDoubleZero(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/DoubleZero');
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {number} 
         */
        getDecimalZero(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/DecimalZero');
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {string} 
         */
        getNullString(): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/NullString');
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {string} 
         */
        getEmptyString(): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/EmptyString');
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getNullPerson(): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/SuperDemo/NullObject');
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {any} 
         */
        getTextStream(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/TextStream');
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>} 
         */
        getByteArray(): Observable<Array<number>>{
            return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/ByteArray');
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {void} 
         */
        getActionResult(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/ActionResult');
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {number} 
         */
        getbyte(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/byte');
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {number} 
         */
        getsbyte(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/sbyte');
        }

        /** 
         * GET api/SuperDemo/short
         * @return {number} 
         */
        getShort(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/short');
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {number} 
         */
        getUShort(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/ushort');
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {number} 
         */
        getUint(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/uint');
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {number} 
         */
        getulong(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/ulong');
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {number} 
         */
        getdouble(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/doulbe');
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {number} 
         */
        getDecimal(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/decimal');
        }

        /** 
         * GET api/SuperDemo/char
         * @return {string} 
         */
        getChar(): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/char');
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {boolean} 
         */
        getBool(): Observable<boolean>{
            return this.http.get<boolean>(this.baseUri + 'api/SuperDemo/bool');
        }

        /** 
         * GET api/SuperDemo/int2d
         * @return {number[][]} 
         */
        getInt2D(): Observable<number[][]>{
            return this.http.get<number[][]>(this.baseUri + 'api/SuperDemo/int2d');
        }

        /** 
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>} 
         */
        getInt2DJagged(): Observable<Array<Array<number>>>{
            return this.http.get<Array<Array<number>>>(this.baseUri + 'api/SuperDemo/int2dJagged');
        }

        /** 
         * POST api/SuperDemo/int2d
         * @param {number[][]} a 
         * @return {boolean} 
         */
        postInt2D(a: number[][]): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a 
         * @return {boolean} 
         */
        postInt2DJagged(a: Array<Array<number>>): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a 
         * @return {boolean} 
         */
        postIntArray(a: Array<number>): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/intArray
         * @return {Array<number>} 
         */
        getIntArray(): Observable<Array<number>>{
            return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/intArray');
        }

        /** 
         * GET api/SuperDemo/AnonymousDynamic
         * @return {void} 
         */
        getAnonymousDynamic(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/AnonymousDynamic');
        }

        /** 
         * GET api/SuperDemo/AnonymousObject
         * @return {void} 
         */
        getAnonymousObject(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/AnonymousObject');
        }

        /** 
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj 
         * @return {void} 
         */
        postAnonymousObject(obj: any): Observable<Response>{
            return this.http.post<Response>(this.baseUri + 'api/SuperDemo/AnonymousObject', JSON.stringify(obj), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }} 
         */
        getDictionary(): Observable<{[id: string]: string }>{
            return this.http.get<{[id: string]: string }>(this.baseUri + 'api/SuperDemo/StringStringDic');
        }

        /** 
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }} 
         */
        getDictionaryOfPeople(): Observable<{[id: string]: DemoWebApi_DemoData_Client.Person }>{
            return this.http.get<{[id: string]: DemoWebApi_DemoData_Client.Person }>(this.baseUri + 'api/SuperDemo/StringPersonDic');
        }

        /** 
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic 
         * @return {number} 
         */
        postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/KeyValuePair
         * @return {{key: string, value: DemoWebApi_DemoData_Client.Person }} 
         */
        getKeyhValuePair(): Observable<{key: string, value: DemoWebApi_DemoData_Client.Person }>{
            return this.http.get<{key: string, value: DemoWebApi_DemoData_Client.Person }>(this.baseUri + 'api/SuperDemo/KeyValuePair');
        }

        /** 
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getICollection(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/ICollection');
        }

        /** 
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIList(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IList');
        }

        /** 
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIReadOnlyList(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IReadOnlyList');
        }

        /** 
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIReadOnlyCollection(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IReadOnlyCollection');
        }

        /** 
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getList(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/List');
        }

        /** 
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getCollection(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/Collection');
        }

        /** 
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postICollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/PostEmpty/{i}
         * @param {string} s 
         * @param {number} i 
         * @return {{item1:string, item2:number}} 
         */
        postWithQueryButEmptyBody(s: string, i: number): Observable<{item1:string, item2:number}>{
            return this.http.post<{item1:string, item2:number}>(this.baseUri + 'api/SuperDemo/PostEmpty/'+i, JSON.stringify(s), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }
    }

    @Injectable()
    export class Tuple {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * POST api/Tuple/PersonCompany1
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPersonCompany1(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany2
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany2(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany3
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany3(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany4
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany4(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/PeopleCompany4
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} 
         */
        getPeopleCompany4(): Observable<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}>{
            return this.http.get<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}>(this.baseUri + 'api/Tuple/PeopleCompany4');
        }

        /** 
         * POST api/Tuple/PeopleCompany5
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany5(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/PeopleCompany5
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} 
         */
        getPeopleCompany5(): Observable<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}>{
            return this.http.get<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}>(this.baseUri + 'api/Tuple/PeopleCompany5');
        }

        /** 
         * POST api/Tuple/PeopleCompany6
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany6(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany7
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany7(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany8
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany8(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple1
         * @return {{item1:number}} 
         */
        getTuple1(): Observable<{item1:number}>{
            return this.http.get<{item1:number}>(this.baseUri + 'api/Tuple/Tuple1');
        }

        /** 
         * POST api/Tuple/Tuple1
         * @param {{item1:number}} tuple 
         * @return {number} 
         */
        postTuple1(tuple: {item1:number}): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/Tuple/Tuple1', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple2
         * @return {{item1:string, item2:number}} 
         */
        getTuple2(): Observable<{item1:string, item2:number}>{
            return this.http.get<{item1:string, item2:number}>(this.baseUri + 'api/Tuple/Tuple2');
        }

        /** 
         * POST api/Tuple/Tuple2
         * @param {{item1:string, item2:number}} tuple 
         * @return {string} 
         */
        postTuple2(tuple: {item1:string, item2:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple2', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple3
         * @return {{item1:string, item2:string, item3:number}} 
         */
        getTuple3(): Observable<{item1:string, item2:string, item3:number}>{
            return this.http.get<{item1:string, item2:string, item3:number}>(this.baseUri + 'api/Tuple/Tuple3');
        }

        /** 
         * POST api/Tuple/Tuple3
         * @param {{item1:string, item2:string, item3:number}} tuple 
         * @return {string} 
         */
        postTuple3(tuple: {item1:string, item2:string, item3:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple3', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple4
         * @return {{item1:string, item2:string, item3:string, item4:number}} 
         */
        getTuple4(): Observable<{item1:string, item2:string, item3:string, item4:number}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:number}>(this.baseUri + 'api/Tuple/Tuple4');
        }

        /** 
         * POST api/Tuple/Tuple4
         * @param {{item1:string, item2:string, item3:string, item4:number}} tuple 
         * @return {string} 
         */
        postTuple4(tuple: {item1:string, item2:string, item3:string, item4:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple4', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple5
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:number}} 
         */
        getTuple5(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:number}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:string, item5:number}>(this.baseUri + 'api/Tuple/Tuple5');
        }

        /** 
         * POST api/Tuple/Tuple5
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:number}} tuple 
         * @return {string} 
         */
        postTuple5(tuple: {item1:string, item2:string, item3:string, item4:string, item5:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple5', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple6
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} 
         */
        getTuple6(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}>(this.baseUri + 'api/Tuple/Tuple6');
        }

        /** 
         * POST api/Tuple/Tuple6
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} tuple 
         * @return {string} 
         */
        postTuple6(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple6', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple7
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} 
         */
        getTuple7(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}>(this.baseUri + 'api/Tuple/Tuple7');
        }

        /** 
         * POST api/Tuple/Tuple7
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} tuple 
         * @return {string} 
         */
        postTuple7(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple7', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple8
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}} 
         */
        getTuple8(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}>(this.baseUri + 'api/Tuple/Tuple8');
        }

        /** 
         * POST api/Tuple/Tuple8
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}} tuple 
         * @return {string} 
         */
        postTuple8(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple8', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }
    }

    @Injectable()
    export class Values {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/Values
         * @return {Array<string>} 
         */
        get(): Observable<Array<string>>{
            return this.http.get<Array<string>>(this.baseUri + 'api/Values');
        }

        /** 
         * GET api/Values/{id}
         * @param {number} id 
         * @return {string} 
         */
        getById(id: number): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/Values/'+id);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {void} 
         */
        post(value: string): Observable<Response>{
            return this.http.post<Response>(this.baseUri + 'api/Values', JSON.stringify(value), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        put(id: number, value: string): Observable<Response>{
            return this.http.put<Response>(this.baseUri + 'api/Values/'+id, JSON.stringify(value), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Observable<Response>{
            return this.http.delete<Response>(this.baseUri + 'api/Values/'+id);
        }
    }

}

