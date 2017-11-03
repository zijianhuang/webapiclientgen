import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export namespace DemoWebApi_DemoData_Client {
    export enum AddressType { Postal, Residential }

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

    export interface PhoneNumber {
        id?: string;
        fullNumber?: string;
        phoneType?: DemoWebApi_DemoData_Client.PhoneType;
        entityId?: string;
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

    export interface Address {
        id?: string;
        entity?: DemoWebApi_DemoData_Client.Entity;

        /** 
         * Foreign key to Entity
         */
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


    /** 
     * Base class of company and person
     */
    export interface Entity {
        id?: string;

        /** 
         * Name of the entity.
         */
        name: string;

        /** 
         * Multiple addresses
         */
        addresses?: Array<DemoWebApi_DemoData_Client.Address>;
        phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;
        web?: string;
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {
        surname?: string;
        givenName?: string;

        /** 
         * Date of Birth.
         * This is optional.
         */
        dob?: Date;
    }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {

        /** 
         * BusinessNumber to be serialized as BusinessNum
         */
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

export namespace DemoWebApi_Controllers_Client {
    @Injectable()
    export class SuperDemo {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/SuperDemo/int?d={d}
         * @param {number} d 
         * @return {number} 
         */
        getIntSquare(d: number): Observable<number> {
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/int?d=' + d);
        }

        /** 
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d 
         * @return {number} 
         */
        getDecimalSquare(d: number): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/decimal?d='+d);
        }

        /** 
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {Date} 
         */
        getDateTime(hasValue: boolean): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue='+hasValue);
        }

        /** 
         * GET api/SuperDemo/NextYear?dt={dt}
         * @param {Date} dt 
         * @return {Date} 
         */
        getNextYear(dt: Date): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NextYear?dt='+dt);
        }

        /** 
         * GET api/SuperDemo/NextHour?dt={dt}
         * @param {Date} dt 
         * @return {Date} 
         */
        getNextHour(dt: Date): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NextHour?dt='+dt);
        }

        /** 
         * POST api/SuperDemo/NextYear
         * @param {Date} dt 
         * @return {Date} 
         */
        postNextYear(dt: Date): Observable<Date>{
            return this.http.post<Date>(this.baseUri + 'api/SuperDemo/NextYear', JSON.stringify(dt), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date} 
         */
        getDateTimeOffset(): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/DateTimeOffset');
        }

        /** 
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffset(d: Date): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/DateTimeOffset', JSON.stringify(d), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffsetNullable(d: Date): Observable<boolean>{
            return this.http.post <boolean>(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', JSON.stringify(d), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {number} 
         */
        getNullableDecimal(hasValue: boolean): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue='+hasValue);
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
         * @return {any} 
         */
        getActionResult(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/ActionResult');
        }

        /** 
         * GET api/SuperDemo/ActionStringResult
         * @return {string} 
         */
        getActionStringResult(): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/ActionStringResult');
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
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a 
         * @return {boolean} 
         */
        postInt2DJagged(a: Array<Array<number>>): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a 
         * @return {boolean} 
         */
        postIntArray(a: Array<number>): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
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
         * @return {any} 
         */
        getAnonymousDynamic(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/AnonymousDynamic');
        }

        /** 
         * GET api/SuperDemo/AnonymousObject
         * @return {any} 
         */
        getAnonymousObject(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/AnonymousObject');
        }

        /** 
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj 
         * @return {any} 
         */
        postAnonymousObject(obj: any): Observable<Response>{
            return this.http.post<Response>(this.baseUri + 'api/SuperDemo/AnonymousObject', JSON.stringify(obj), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
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
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
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
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/PostEmpty?s={s}&i={i}
         * @param {string} s 
         * @param {number} i 
         * @return {{item1:string, item2:number}} 
         */
        postWithQueryButEmptyBody(s: string, i: number): Observable<{item1:string, item2:number}>{
            return this.http.post<{item1:string, item2:number}>(this.baseUri + 'api/SuperDemo/PostEmpty?s='+encodeURIComponent(s)+'&i='+i, JSON.stringify(null), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }
    }

    @Injectable()
    export class Entities {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * PUT api/SuperDemo/link?id={id}&relationship={relationship}
         * @param {number} id 
         * @param {string} relationship 
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {boolean} 
         */
        linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person): Observable<boolean>{
            return this.http.put<boolean>(this.baseUri + 'api/SuperDemo/link?id='+id+'&relationship='+encodeURIComponent(relationship), JSON.stringify(person), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/Company?id={id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Company} 
         */
        getCompany(id: number): Observable<DemoWebApi_DemoData_Client.Company>{
            return this.http.get<DemoWebApi_DemoData_Client.Company>(this.baseUri + 'api/SuperDemo/Company?id='+id);
        }

        /** 
         * GET api/SuperDemo/PersonNotFound?id={id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getPersonNotFound(id: number): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/SuperDemo/PersonNotFound?id='+id);
        }

        /** 
         * GET api/SuperDemo/PersonActionNotFound?id={id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getPersonActionNotFound(id: number): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/SuperDemo/PersonActionNotFound?id='+id);
        }

        /** 
         * Get a person
         * so to know the person
         * GET api/Entities/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        getPerson(id: number): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/'+id);
        }

        /** 
         * POST api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} p 
         * @return {number} 
         */
        createPerson(p: DemoWebApi_DemoData_Client.Person): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/Entities', JSON.stringify(p), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        updatePerson(person: DemoWebApi_DemoData_Client.Person): Observable<Response>{
            return this.http.put<Response>(this.baseUri + 'api/Entities', JSON.stringify(person), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * DELETE api/Entities/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Observable<Response>{
            return this.http.delete<Response>(this.baseUri + 'api/Entities/'+id);
        }
    }


    @Injectable()
    export class Heroes {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * Get all heroes.
         * GET api/Heroes
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        get(): Observable<Array<DemoWebApi_Controllers_Client.Hero>>{
            return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes');
        }

        /** 
         * Get a hero.
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
         * Add a hero
         * POST api/Heroes?name={name}
         * @param {string} name 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        post(name: string): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.post(this.baseUri + 'api/Heroes?name='+encodeURIComponent(name), JSON.stringify(null), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * Update hero.
         * PUT api/Heroes
         * @param {DemoWebApi_Controllers_Client.Hero} hero 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        put(hero: DemoWebApi_Controllers_Client.Hero): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.put<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes', JSON.stringify(hero), { headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * Search heroes
         * GET api/Heroes?name={name}
         * @param {string} name keyword contained in hero name.
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
         */
        search(name: string): Observable<Array<DemoWebApi_Controllers_Client.Hero>>{
            return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes?name='+encodeURIComponent(name));
        }
    }


}

