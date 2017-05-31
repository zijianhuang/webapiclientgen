import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
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
    @Injectable()
    export class SuperDemo {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: Http){
        }

        /** 
         * GET api/SuperDemo/int?d={d}
         * @param {number} d 
         * @return {number} 
         */
        getIntSquare(d: number): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/int?d='+d).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d 
         * @return {number} 
         */
        getDecimalSquare(d: number): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/decimal?d='+d).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {Date} 
         */
        getDateTime(hasValue: boolean): Observable<Date>{
            return this.http.get(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue='+hasValue).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/NextYear?dt={dt}
         * @param {Date} dt 
         * @return {Date} 
         */
        getNextYear(dt: Date): Observable<Date>{
            return this.http.get(this.baseUri + 'api/SuperDemo/NextYear?dt='+dt).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/NextHour?dt={dt}
         * @param {Date} dt 
         * @return {Date} 
         */
        getNextHour(dt: Date): Observable<Date>{
            return this.http.get(this.baseUri + 'api/SuperDemo/NextHour?dt='+dt).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/NextYear
         * @param {Date} dt 
         * @return {Date} 
         */
        postNextYear(dt: Date): Observable<Date>{
            return this.http.post(this.baseUri + 'api/SuperDemo/NextYear', JSON.stringify(dt), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date} 
         */
        getDateTimeOffset(): Observable<Date>{
            return this.http.get(this.baseUri + 'api/SuperDemo/DateTimeOffset').map(response=> response.json());
        }

        /** 
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffset(d: Date): Observable<boolean>{
            return this.http.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', JSON.stringify(d), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffsetNullable(d: Date): Observable<boolean>{
            return this.http.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', JSON.stringify(d), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {number} 
         */
        getNullableDecimal(hasValue: boolean): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue='+hasValue).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {number} 
         */
        getFloatZero(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/FloatZero').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {number} 
         */
        getDoubleZero(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/DoubleZero').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {number} 
         */
        getDecimalZero(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/DecimalZero').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {string} 
         */
        getNullString(): Observable<string>{
            return this.http.get(this.baseUri + 'api/SuperDemo/NullString').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {string} 
         */
        getEmptyString(): Observable<string>{
            return this.http.get(this.baseUri + 'api/SuperDemo/EmptyString').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getNullPerson(): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get(this.baseUri + 'api/SuperDemo/NullObject').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {any} 
         */
        getTextStream(): Observable<Response>{
            return this.http.get(this.baseUri + 'api/SuperDemo/TextStream');
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>} 
         */
        getByteArray(): Observable<Array<number>>{
            return this.http.get(this.baseUri + 'api/SuperDemo/ByteArray').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {any} 
         */
        getActionResult(): Observable<Response>{
            return this.http.get(this.baseUri + 'api/SuperDemo/ActionResult');
        }

        /** 
         * GET api/SuperDemo/ActionStringResult
         * @return {string} 
         */
        getActionStringResult(): Observable<string>{
            return this.http.get(this.baseUri + 'api/SuperDemo/ActionStringResult').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {number} 
         */
        getbyte(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/byte').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {number} 
         */
        getsbyte(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/sbyte').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/short
         * @return {number} 
         */
        getShort(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/short').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {number} 
         */
        getUShort(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/ushort').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {number} 
         */
        getUint(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/uint').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {number} 
         */
        getulong(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/ulong').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {number} 
         */
        getdouble(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/doulbe').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {number} 
         */
        getDecimal(): Observable<number>{
            return this.http.get(this.baseUri + 'api/SuperDemo/decimal').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/char
         * @return {string} 
         */
        getChar(): Observable<string>{
            return this.http.get(this.baseUri + 'api/SuperDemo/char').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {boolean} 
         */
        getBool(): Observable<boolean>{
            return this.http.get(this.baseUri + 'api/SuperDemo/bool').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/int2d
         * @return {number[][]} 
         */
        getInt2D(): Observable<number[][]>{
            return this.http.get(this.baseUri + 'api/SuperDemo/int2d').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>} 
         */
        getInt2DJagged(): Observable<Array<Array<number>>>{
            return this.http.get(this.baseUri + 'api/SuperDemo/int2dJagged').map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/int2d
         * @param {number[][]} a 
         * @return {boolean} 
         */
        postInt2D(a: number[][]): Observable<boolean>{
            return this.http.post(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a 
         * @return {boolean} 
         */
        postInt2DJagged(a: Array<Array<number>>): Observable<boolean>{
            return this.http.post(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a 
         * @return {boolean} 
         */
        postIntArray(a: Array<number>): Observable<boolean>{
            return this.http.post(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/intArray
         * @return {Array<number>} 
         */
        getIntArray(): Observable<Array<number>>{
            return this.http.get(this.baseUri + 'api/SuperDemo/intArray').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/AnonymousDynamic
         * @return {any} 
         */
        getAnonymousDynamic(): Observable<Response>{
            return this.http.get(this.baseUri + 'api/SuperDemo/AnonymousDynamic');
        }

        /** 
         * GET api/SuperDemo/AnonymousObject
         * @return {any} 
         */
        getAnonymousObject(): Observable<Response>{
            return this.http.get(this.baseUri + 'api/SuperDemo/AnonymousObject');
        }

        /** 
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj 
         * @return {any} 
         */
        postAnonymousObject(obj: any): Observable<Response>{
            return this.http.post(this.baseUri + 'api/SuperDemo/AnonymousObject', JSON.stringify(obj), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }} 
         */
        getDictionary(): Observable<{[id: string]: string }>{
            return this.http.get(this.baseUri + 'api/SuperDemo/StringStringDic').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }} 
         */
        getDictionaryOfPeople(): Observable<{[id: string]: DemoWebApi_DemoData_Client.Person }>{
            return this.http.get(this.baseUri + 'api/SuperDemo/StringPersonDic').map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic 
         * @return {number} 
         */
        postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }): Observable<number>{
            return this.http.post(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/KeyValuePair
         * @return {{key: string, value: DemoWebApi_DemoData_Client.Person }} 
         */
        getKeyhValuePair(): Observable<{key: string, value: DemoWebApi_DemoData_Client.Person }>{
            return this.http.get(this.baseUri + 'api/SuperDemo/KeyValuePair').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getICollection(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get(this.baseUri + 'api/SuperDemo/ICollection').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIList(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get(this.baseUri + 'api/SuperDemo/IList').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIReadOnlyList(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get(this.baseUri + 'api/SuperDemo/IReadOnlyList').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIReadOnlyCollection(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getList(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get(this.baseUri + 'api/SuperDemo/List').map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getCollection(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get(this.baseUri + 'api/SuperDemo/Collection').map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postICollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postList(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/SuperDemo/PostEmpty?s={s}&i={i}
         * @param {string} s 
         * @param {number} i 
         * @return {{item1:string, item2:number}} 
         */
        postWithQueryButEmptyBody(s: string, i: number): Observable<{item1:string, item2:number}>{
            return this.http.post(this.baseUri + 'api/SuperDemo/PostEmpty?s='+encodeURIComponent(s)+'&i='+i, JSON.stringify(null), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }
    }

    @Injectable()
    export class Entities {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: Http){
        }

        /** 
         * PUT api/SuperDemo/link?id={id}&relationship={relationship}
         * @param {number} id 
         * @param {string} relationship 
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {boolean} 
         */
        linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person): Observable<boolean>{
            return this.http.put(this.baseUri + 'api/SuperDemo/link?id='+id+'&relationship='+encodeURIComponent(relationship), JSON.stringify(person), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/Company?id={id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Company} 
         */
        getCompany(id: number): Observable<DemoWebApi_DemoData_Client.Company>{
            return this.http.get(this.baseUri + 'api/SuperDemo/Company?id='+id).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/PersonNotFound?id={id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getPersonNotFound(id: number): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get(this.baseUri + 'api/SuperDemo/PersonNotFound?id='+id).map(response=> response.json());
        }

        /** 
         * GET api/SuperDemo/PersonActionNotFound?id={id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getPersonActionNotFound(id: number): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get(this.baseUri + 'api/SuperDemo/PersonActionNotFound?id='+id).map(response=> response.json());
        }

        /** 
         * Get a person
         * so to know the person
         * GET api/Entities/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        getPerson(id: number): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get(this.baseUri + 'api/Entities/'+id).map(response=> response.json());
        }

        /** 
         * POST api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} p 
         * @return {number} 
         */
        createPerson(p: DemoWebApi_DemoData_Client.Person): Observable<number>{
            return this.http.post(this.baseUri + 'api/Entities', JSON.stringify(p), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * PUT api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        updatePerson(person: DemoWebApi_DemoData_Client.Person): Observable<Response>{
            return this.http.put(this.baseUri + 'api/Entities', JSON.stringify(person), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * DELETE api/Entities/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Observable<Response>{
            return this.http.delete(this.baseUri + 'api/Entities/'+id);
        }
    }

    @Injectable()
    export class Tuple {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: Http){
        }

        /** 
         * POST api/Tuple/PersonCompany1
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPersonCompany1(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post(this.baseUri + 'api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/Tuple/PeopleCompany2
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany2(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/Tuple/PeopleCompany3
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany3(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/Tuple/PeopleCompany4
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany4(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/PeopleCompany4
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} 
         */
        getPeopleCompany4(): Observable<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}>{
            return this.http.get(this.baseUri + 'api/Tuple/PeopleCompany4').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/PeopleCompany5
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany5(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/PeopleCompany5
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} 
         */
        getPeopleCompany5(): Observable<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}>{
            return this.http.get(this.baseUri + 'api/Tuple/PeopleCompany5').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/PeopleCompany6
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany6(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/Tuple/PeopleCompany7
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany7(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * POST api/Tuple/PeopleCompany8
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany8(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/Tuple1
         * @return {{item1:number}} 
         */
        getTuple1(): Observable<{item1:number}>{
            return this.http.get(this.baseUri + 'api/Tuple/Tuple1').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/Tuple1
         * @param {{item1:number}} tuple 
         * @return {number} 
         */
        postTuple1(tuple: {item1:number}): Observable<number>{
            return this.http.post(this.baseUri + 'api/Tuple/Tuple1', JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/Tuple2
         * @return {{item1:string, item2:number}} 
         */
        getTuple2(): Observable<{item1:string, item2:number}>{
            return this.http.get(this.baseUri + 'api/Tuple/Tuple2').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/Tuple2
         * @param {{item1:string, item2:number}} tuple 
         * @return {string} 
         */
        postTuple2(tuple: {item1:string, item2:number}): Observable<string>{
            return this.http.post(this.baseUri + 'api/Tuple/Tuple2', JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/Tuple3
         * @return {{item1:string, item2:string, item3:number}} 
         */
        getTuple3(): Observable<{item1:string, item2:string, item3:number}>{
            return this.http.get(this.baseUri + 'api/Tuple/Tuple3').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/Tuple3
         * @param {{item1:string, item2:string, item3:number}} tuple 
         * @return {string} 
         */
        postTuple3(tuple: {item1:string, item2:string, item3:number}): Observable<string>{
            return this.http.post(this.baseUri + 'api/Tuple/Tuple3', JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/Tuple4
         * @return {{item1:string, item2:string, item3:string, item4:number}} 
         */
        getTuple4(): Observable<{item1:string, item2:string, item3:string, item4:number}>{
            return this.http.get(this.baseUri + 'api/Tuple/Tuple4').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/Tuple4
         * @param {{item1:string, item2:string, item3:string, item4:number}} tuple 
         * @return {string} 
         */
        postTuple4(tuple: {item1:string, item2:string, item3:string, item4:number}): Observable<string>{
            return this.http.post(this.baseUri + 'api/Tuple/Tuple4', JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/Tuple5
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:number}} 
         */
        getTuple5(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:number}>{
            return this.http.get(this.baseUri + 'api/Tuple/Tuple5').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/Tuple5
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:number}} tuple 
         * @return {string} 
         */
        postTuple5(tuple: {item1:string, item2:string, item3:string, item4:string, item5:number}): Observable<string>{
            return this.http.post(this.baseUri + 'api/Tuple/Tuple5', JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/Tuple6
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} 
         */
        getTuple6(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}>{
            return this.http.get(this.baseUri + 'api/Tuple/Tuple6').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/Tuple6
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} tuple 
         * @return {string} 
         */
        postTuple6(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}): Observable<string>{
            return this.http.post(this.baseUri + 'api/Tuple/Tuple6', JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/Tuple7
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} 
         */
        getTuple7(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}>{
            return this.http.get(this.baseUri + 'api/Tuple/Tuple7').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/Tuple7
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} tuple 
         * @return {string} 
         */
        postTuple7(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}): Observable<string>{
            return this.http.post(this.baseUri + 'api/Tuple/Tuple7', JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * GET api/Tuple/Tuple8
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}} 
         */
        getTuple8(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}>{
            return this.http.get(this.baseUri + 'api/Tuple/Tuple8').map(response=> response.json());
        }

        /** 
         * POST api/Tuple/Tuple8
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}} tuple 
         * @return {string} 
         */
        postTuple8(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}): Observable<string>{
            return this.http.post(this.baseUri + 'api/Tuple/Tuple8', JSON.stringify(tuple), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }
    }

    @Injectable()
    export class Heroes {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: Http){
        }

        /** 
         * Get all heroes.
         * GET api/Heroes
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        get(): Observable<Array<DemoWebApi_Controllers_Client.Hero>>{
            return this.http.get(this.baseUri + 'api/Heroes').map(response=> response.json());
        }

        /** 
         * Get a hero.
         * GET api/Heroes/{id}
         * @param {number} id 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        getById(id: number): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.get(this.baseUri + 'api/Heroes/'+id).map(response=> response.json());
        }

        /** 
         * DELETE api/Heroes/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Observable<Response>{
            return this.http.delete(this.baseUri + 'api/Heroes/'+id);
        }

        /** 
         * Add a hero
         * POST api/Heroes?name={name}
         * @param {string} name 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        post(name: string): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.post(this.baseUri + 'api/Heroes?name='+encodeURIComponent(name), JSON.stringify(null), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * Update hero.
         * PUT api/Heroes
         * @param {DemoWebApi_Controllers_Client.Hero} hero 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        put(hero: DemoWebApi_Controllers_Client.Hero): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.put(this.baseUri + 'api/Heroes', JSON.stringify(hero), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * Search heroes
         * GET api/Heroes?name={name}
         * @param {string} name keyword contained in hero name.
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
         */
        search(name: string): Observable<Array<DemoWebApi_Controllers_Client.Hero>>{
            return this.http.get(this.baseUri + 'api/Heroes?name='+encodeURIComponent(name)).map(response=> response.json());
        }
    }

    @Injectable()
    export class Values {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: Http){
        }

        /** 
         * GET api/Values
         * @return {Array<string>} 
         */
        get(): Observable<Array<string>>{
            return this.http.get(this.baseUri + 'api/Values').map(response=> response.json());
        }

        /** 
         * GET api/Values/{id}?name={name}
         * @param {number} id 
         * @param {string} name 
         * @return {string} 
         */
        getByIdAndName(id: number, name: string): Observable<string>{
            return this.http.get(this.baseUri + 'api/Values/'+id+'?name='+encodeURIComponent(name)).map(response=> response.json());
        }

        /** 
         * GET api/Values?name={name}
         * @param {string} name 
         * @return {string} 
         */
        getByName(name: string): Observable<string>{
            return this.http.get(this.baseUri + 'api/Values?name='+encodeURIComponent(name)).map(response=> response.json());
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {string} 
         */
        post(value: string): Observable<string>{
            return this.http.post(this.baseUri + 'api/Values', JSON.stringify(value), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) }).map(response=> response.json());
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        put(id: number, value: string): Observable<Response>{
            return this.http.put(this.baseUri + 'api/Values/'+id, JSON.stringify(value), { headers: new Headers({ 'Content-Type': 'text/plain;charset=UTF-8' }) });
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Observable<Response>{
            return this.http.delete(this.baseUri + 'api/Values/'+id);
        }
    }

}

