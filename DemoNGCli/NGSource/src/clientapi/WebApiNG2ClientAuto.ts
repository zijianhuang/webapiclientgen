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

export namespace DemoCoreWeb_Controllers_Client {
    @Injectable()
    export class Values {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/Values
         * @return {Array<string>} 
         */
        demoCoreWeb.Controllers.ValuesController.Get (DemoCoreWeb)(): Observable<Array<string>>{
            return this.http.get<Array<string>>(this.baseUri + 'api/Values');
        }

        /** 
         * GET api/Values/{id}
         * @param {number} id 
         * @return {string} 
         */
        demoCoreWeb.Controllers.ValuesController.Get (DemoCoreWeb)ById(id: number): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/Values/'+id);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {void} 
         */
        demoCoreWeb.Controllers.ValuesController.Post (DemoCoreWeb)(value: string): Observable<Response>{
            return this.http.post<Response>(this.baseUri + 'api/Values', JSON.stringify(value), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        demoCoreWeb.Controllers.ValuesController.Put (DemoCoreWeb)(id: number, value: string): Observable<Response>{
            return this.http.put<Response>(this.baseUri + 'api/Values/'+id, JSON.stringify(value), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        demoCoreWeb.Controllers.ValuesController.Delete (DemoCoreWeb)(id: number): Observable<Response>{
            return this.http.delete<Response>(this.baseUri + 'api/Values/'+id);
        }
    }

}

export namespace DemoWebApi_Controllers_Client {
    @Injectable()
    export class Entities {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/Entities/getPerson
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.EntitiesController.GetPerson (DemoCoreWeb)(id: number): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Entities/getPerson');
        }

        /** 
         * POST api/Entities/createPerson
         * @param {DemoWebApi_DemoData_Client.Person} p 
         * @return {number} 
         */
        demoWebApi.Controllers.EntitiesController.CreatePerson (DemoCoreWeb)(p: DemoWebApi_DemoData_Client.Person): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/Entities/createPerson', JSON.stringify(p), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Entities/updatePerson
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        demoWebApi.Controllers.EntitiesController.UpdatePerson (DemoCoreWeb)(person: DemoWebApi_DemoData_Client.Person): Observable<Response>{
            return this.http.put<Response>(this.baseUri + 'api/Entities/updatePerson', JSON.stringify(person), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Entities/link
         * @param {number} id 
         * @param {string} relationship 
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {boolean} 
         */
        demoWebApi.Controllers.EntitiesController.LinkPerson (DemoCoreWeb)(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person): Observable<boolean>{
            return this.http.put<boolean>(this.baseUri + 'api/Entities/link', JSON.stringify(person), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * DELETE api/Entities
         * @param {number} id 
         * @return {void} 
         */
        demoWebApi.Controllers.EntitiesController.Delete (DemoCoreWeb)(id: number): Observable<Response>{
            return this.http.delete<Response>(this.baseUri + 'api/Entities');
        }

        /** 
         * GET api/Entities/Company
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Company} 
         */
        demoWebApi.Controllers.EntitiesController.GetCompany (DemoCoreWeb)(id: number): Observable<DemoWebApi_DemoData_Client.Company>{
            return this.http.get<DemoWebApi_DemoData_Client.Company>(this.baseUri + 'api/Entities/Company');
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
        demoWebApi.Controllers.HeroesController.Get (DemoCoreWeb)(): Observable<Array<DemoWebApi_Controllers_Client.Hero>>{
            return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes');
        }

        /** 
         * GET api/Heroes/{id}
         * @param {number} id 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        demoWebApi.Controllers.HeroesController.Get (DemoCoreWeb)ById(id: number): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.get<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes/'+id);
        }

        /** 
         * DELETE api/Heroes/{id}
         * @param {number} id 
         * @return {void} 
         */
        demoWebApi.Controllers.HeroesController.Delete (DemoCoreWeb)(id: number): Observable<Response>{
            return this.http.delete<Response>(this.baseUri + 'api/Heroes/'+id);
        }

        /** 
         * POST api/Heroes
         * @param {string} name 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        demoWebApi.Controllers.HeroesController.Post (DemoCoreWeb)(name: string): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.post<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes', JSON.stringify(name), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Heroes
         * @param {DemoWebApi_Controllers_Client.Hero} hero 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        demoWebApi.Controllers.HeroesController.Put (DemoCoreWeb)(hero: DemoWebApi_Controllers_Client.Hero): Observable<DemoWebApi_Controllers_Client.Hero>{
            return this.http.put<DemoWebApi_Controllers_Client.Hero>(this.baseUri + 'api/Heroes', JSON.stringify(hero), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Heroes/{name}
         * @param {string} name 
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        demoWebApi.Controllers.HeroesController.Search (DemoCoreWeb)ByName(name: string): Observable<Array<DemoWebApi_Controllers_Client.Hero>>{
            return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes/'+encodeURIComponent(name));
        }

        /** 
         * GET api/Heroes
         * @param {string} name 
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        demoWebApi.Controllers.HeroesController.Search (DemoCoreWeb)ByName(name: string): Observable<Array<DemoWebApi_Controllers_Client.Hero>>{
            return this.http.get<Array<DemoWebApi_Controllers_Client.Hero>>(this.baseUri + 'api/Heroes');
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
        demoWebApi.Controllers.HomeController.Index (DemoCoreWeb)(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/Home');
        }
    }

    @Injectable()
    export class SuperDemo {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/SuperDemo/int
         * @param {number} d 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIntSquareAsync (DemoCoreWeb)(d: number): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/int');
        }

        /** 
         * GET api/SuperDemo/decimal
         * @param {number} d 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDecimalSquare (DemoCoreWeb)(d: number): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/decimal');
        }

        /** 
         * GET api/SuperDemo/NullableDatetime
         * @param {boolean} hasValue 
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDateTime (DemoCoreWeb)(hasValue: boolean): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NullableDatetime');
        }

        /** 
         * GET api/SuperDemo/NextYear
         * @param {Date} dt 
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNextYear (DemoCoreWeb)(dt: Date): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NextYear');
        }

        /** 
         * GET api/SuperDemo/NextHour
         * @param {Date} dt 
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNextHour (DemoCoreWeb)(dt: Date): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/NextHour');
        }

        /** 
         * POST api/SuperDemo/NextYear
         * @param {Date} dt 
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.PostNextYear (DemoCoreWeb)(dt: Date): Observable<Date>{
            return this.http.post<Date>(this.baseUri + 'api/SuperDemo/NextYear', JSON.stringify(dt), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDateTimeOffset (DemoCoreWeb)(): Observable<Date>{
            return this.http.get<Date>(this.baseUri + 'api/SuperDemo/DateTimeOffset');
        }

        /** 
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostDateTimeOffset (DemoCoreWeb)(d: Date): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/DateTimeOffset', JSON.stringify(d), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostDateTimeOffsetNullable (DemoCoreWeb)(d: Date): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', JSON.stringify(d), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/NullableDecimal
         * @param {boolean} hasValue 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNullableDecimal (DemoCoreWeb)(hasValue: boolean): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/NullableDecimal');
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetFloatZero (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/FloatZero');
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDoubleZero (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/DoubleZero');
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDecimalZero (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/DecimalZero');
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {string} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNullString (DemoCoreWeb)(): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/NullString');
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {string} 
         */
        demoWebApi.Controllers.SuperDemoController.GetEmptyString (DemoCoreWeb)(): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/EmptyString');
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNullPerson (DemoCoreWeb)(): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.get<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/SuperDemo/NullObject');
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {any} 
         */
        demoWebApi.Controllers.SuperDemoController.GetTextStream (DemoCoreWeb)(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/TextStream');
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetByteArray (DemoCoreWeb)(): Observable<Array<number>>{
            return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/ByteArray');
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {void} 
         */
        demoWebApi.Controllers.SuperDemoController.GetActionResult (DemoCoreWeb)(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/ActionResult');
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.Getbyte (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/byte');
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.Getsbyte (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/sbyte');
        }

        /** 
         * GET api/SuperDemo/short
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetShort (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/short');
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetUShort (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/ushort');
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetUint (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/uint');
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.Getulong (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/ulong');
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.Getdouble (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/doulbe');
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDecimal (DemoCoreWeb)(): Observable<number>{
            return this.http.get<number>(this.baseUri + 'api/SuperDemo/decimal');
        }

        /** 
         * GET api/SuperDemo/char
         * @return {string} 
         */
        demoWebApi.Controllers.SuperDemoController.GetChar (DemoCoreWeb)(): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/SuperDemo/char');
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.GetBool (DemoCoreWeb)(): Observable<boolean>{
            return this.http.get<boolean>(this.baseUri + 'api/SuperDemo/bool');
        }

        /** 
         * GET api/SuperDemo/int2d
         * @return {number[][]} 
         */
        demoWebApi.Controllers.SuperDemoController.GetInt2D (DemoCoreWeb)(): Observable<number[][]>{
            return this.http.get<number[][]>(this.baseUri + 'api/SuperDemo/int2d');
        }

        /** 
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetInt2DJagged (DemoCoreWeb)(): Observable<Array<Array<number>>>{
            return this.http.get<Array<Array<number>>>(this.baseUri + 'api/SuperDemo/int2dJagged');
        }

        /** 
         * POST api/SuperDemo/int2d
         * @param {number[][]} a 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostInt2D (DemoCoreWeb)(a: number[][]): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostInt2DJagged (DemoCoreWeb)(a: Array<Array<number>>): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostIntArray (DemoCoreWeb)(a: Array<number>): Observable<boolean>{
            return this.http.post<boolean>(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/intArray
         * @return {Array<number>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIntArray (DemoCoreWeb)(): Observable<Array<number>>{
            return this.http.get<Array<number>>(this.baseUri + 'api/SuperDemo/intArray');
        }

        /** 
         * GET api/SuperDemo/AnonymousDynamic
         * @return {void} 
         */
        demoWebApi.Controllers.SuperDemoController.GetAnonymousDynamic (DemoCoreWeb)(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/AnonymousDynamic');
        }

        /** 
         * GET api/SuperDemo/AnonymousObject
         * @return {void} 
         */
        demoWebApi.Controllers.SuperDemoController.GetAnonymousObject (DemoCoreWeb)(): Observable<Response>{
            return this.http.get<Response>(this.baseUri + 'api/SuperDemo/AnonymousObject');
        }

        /** 
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj 
         * @return {void} 
         */
        demoWebApi.Controllers.SuperDemoController.PostAnonymousObject (DemoCoreWeb)(obj: any): Observable<Response>{
            return this.http.post<Response>(this.baseUri + 'api/SuperDemo/AnonymousObject', JSON.stringify(obj), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDictionary (DemoCoreWeb)(): Observable<{[id: string]: string }>{
            return this.http.get<{[id: string]: string }>(this.baseUri + 'api/SuperDemo/StringStringDic');
        }

        /** 
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDictionaryOfPeople (DemoCoreWeb)(): Observable<{[id: string]: DemoWebApi_DemoData_Client.Person }>{
            return this.http.get<{[id: string]: DemoWebApi_DemoData_Client.Person }>(this.baseUri + 'api/SuperDemo/StringPersonDic');
        }

        /** 
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostDictionary (DemoCoreWeb)(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/SuperDemo/KeyValuePair
         * @return {{key: string, value: DemoWebApi_DemoData_Client.Person }} 
         */
        demoWebApi.Controllers.SuperDemoController.GetKeyhValuePair (DemoCoreWeb)(): Observable<{key: string, value: DemoWebApi_DemoData_Client.Person }>{
            return this.http.get<{key: string, value: DemoWebApi_DemoData_Client.Person }>(this.baseUri + 'api/SuperDemo/KeyValuePair');
        }

        /** 
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetICollection (DemoCoreWeb)(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/ICollection');
        }

        /** 
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIList (DemoCoreWeb)(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IList');
        }

        /** 
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIReadOnlyList (DemoCoreWeb)(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IReadOnlyList');
        }

        /** 
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIReadOnlyCollection (DemoCoreWeb)(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/IReadOnlyCollection');
        }

        /** 
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetList (DemoCoreWeb)(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/List');
        }

        /** 
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetCollection (DemoCoreWeb)(): Observable<Array<DemoWebApi_DemoData_Client.Person>>{
            return this.http.get<Array<DemoWebApi_DemoData_Client.Person>>(this.baseUri + 'api/SuperDemo/Collection');
        }

        /** 
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostICollection (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostIList (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostIReadOnlyList (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostIReadOnlyCollection (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostList (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostCollection (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/SuperDemo/PostEmpty
         * @param {string} s 
         * @param {number} i 
         * @return {{item1:string, item2:number}} 
         */
        demoWebApi.Controllers.SuperDemoController.PostWithQueryButEmptyBody (DemoCoreWeb)(s: string, i: number): Observable<{item1:string, item2:number}>{
            return this.http.post<{item1:string, item2:number}>(this.baseUri + 'api/SuperDemo/PostEmpty', JSON.stringify(s), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
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
        demoWebApi.Controllers.TupleController.LinkPersonCompany1 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany2
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany2 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany3
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany3 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany4
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany4 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/PeopleCompany4
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} 
         */
        demoWebApi.Controllers.TupleController.GetPeopleCompany4 (DemoCoreWeb)(): Observable<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}>{
            return this.http.get<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}>(this.baseUri + 'api/Tuple/PeopleCompany4');
        }

        /** 
         * POST api/Tuple/PeopleCompany5
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany5 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/PeopleCompany5
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} 
         */
        demoWebApi.Controllers.TupleController.GetPeopleCompany5 (DemoCoreWeb)(): Observable<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}>{
            return this.http.get<{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}>(this.baseUri + 'api/Tuple/PeopleCompany5');
        }

        /** 
         * POST api/Tuple/PeopleCompany6
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany6 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany7
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany7 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * POST api/Tuple/PeopleCompany8
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany8 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}): Observable<DemoWebApi_DemoData_Client.Person>{
            return this.http.post<DemoWebApi_DemoData_Client.Person>(this.baseUri + 'api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple1
         * @return {{item1:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple1 (DemoCoreWeb)(): Observable<{item1:number}>{
            return this.http.get<{item1:number}>(this.baseUri + 'api/Tuple/Tuple1');
        }

        /** 
         * POST api/Tuple/Tuple1
         * @param {{item1:number}} tuple 
         * @return {number} 
         */
        demoWebApi.Controllers.TupleController.PostTuple1 (DemoCoreWeb)(tuple: {item1:number}): Observable<number>{
            return this.http.post<number>(this.baseUri + 'api/Tuple/Tuple1', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple2
         * @return {{item1:string, item2:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple2 (DemoCoreWeb)(): Observable<{item1:string, item2:number}>{
            return this.http.get<{item1:string, item2:number}>(this.baseUri + 'api/Tuple/Tuple2');
        }

        /** 
         * POST api/Tuple/Tuple2
         * @param {{item1:string, item2:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple2 (DemoCoreWeb)(tuple: {item1:string, item2:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple2', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple3
         * @return {{item1:string, item2:string, item3:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple3 (DemoCoreWeb)(): Observable<{item1:string, item2:string, item3:number}>{
            return this.http.get<{item1:string, item2:string, item3:number}>(this.baseUri + 'api/Tuple/Tuple3');
        }

        /** 
         * POST api/Tuple/Tuple3
         * @param {{item1:string, item2:string, item3:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple3 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple3', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple4
         * @return {{item1:string, item2:string, item3:string, item4:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple4 (DemoCoreWeb)(): Observable<{item1:string, item2:string, item3:string, item4:number}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:number}>(this.baseUri + 'api/Tuple/Tuple4');
        }

        /** 
         * POST api/Tuple/Tuple4
         * @param {{item1:string, item2:string, item3:string, item4:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple4 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple4', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple5
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple5 (DemoCoreWeb)(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:number}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:string, item5:number}>(this.baseUri + 'api/Tuple/Tuple5');
        }

        /** 
         * POST api/Tuple/Tuple5
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple5 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:string, item5:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple5', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple6
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple6 (DemoCoreWeb)(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}>(this.baseUri + 'api/Tuple/Tuple6');
        }

        /** 
         * POST api/Tuple/Tuple6
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple6 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple6', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple7
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple7 (DemoCoreWeb)(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}>(this.baseUri + 'api/Tuple/Tuple7');
        }

        /** 
         * POST api/Tuple/Tuple7
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple7 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple7', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * GET api/Tuple/Tuple8
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple8 (DemoCoreWeb)(): Observable<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}>{
            return this.http.get<{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}>(this.baseUri + 'api/Tuple/Tuple8');
        }

        /** 
         * POST api/Tuple/Tuple8
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple8 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}): Observable<string>{
            return this.http.post<string>(this.baseUri + 'api/Tuple/Tuple8', JSON.stringify(tuple), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }
    }

}

