///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="HttpClient.ts" />
namespace DemoWebApi_Controllers_Client {
    export interface Hero {
        id?: number;
        name?: string;
    }

}

namespace DemoWebApi_DemoData_Client {
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

namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        x: number;
        y: number;
    }

}

namespace DemoWebApi_Models_Client {
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

namespace DemoCoreWeb_Controllers_Client {
    export class Values {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * GET api/Values
         * @return {Array<string>} 
         */
        demoCoreWeb.Controllers.ValuesController.Get (DemoCoreWeb)(callback: (data : Array<string>) => any){
            this.httpClient.get(this.baseUri + 'api/Values', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Values/{id}
         * @param {number} id 
         * @return {string} 
         */
        demoCoreWeb.Controllers.ValuesController.Get (DemoCoreWeb)ById(id: number, callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/Values/'+id, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {void} 
         */
        demoCoreWeb.Controllers.ValuesController.Post (DemoCoreWeb)(value: string, callback: (data : void) => any){
            this.httpClient.post(this.baseUri + 'api/Values', value, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        demoCoreWeb.Controllers.ValuesController.Put (DemoCoreWeb)(id: number, value: string, callback: (data : void) => any){
            this.httpClient.put(this.baseUri + 'api/Values/'+id, value, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        demoCoreWeb.Controllers.ValuesController.Delete (DemoCoreWeb)(id: number, callback: (data : void) => any){
            this.httpClient.delete(this.baseUri + 'api/Values/'+id, callback, this.error, this.statusCode);
        }
    }

}

namespace DemoWebApi_Controllers_Client {
    export class Entities {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * GET api/Entities/getPerson
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.EntitiesController.GetPerson (DemoCoreWeb)(id: number, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.get(this.baseUri + 'api/Entities/getPerson', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Entities/createPerson
         * @param {DemoWebApi_DemoData_Client.Person} p 
         * @return {number} 
         */
        demoWebApi.Controllers.EntitiesController.CreatePerson (DemoCoreWeb)(p: DemoWebApi_DemoData_Client.Person, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/Entities/createPerson', p, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Entities/updatePerson
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        demoWebApi.Controllers.EntitiesController.UpdatePerson (DemoCoreWeb)(person: DemoWebApi_DemoData_Client.Person, callback: (data : void) => any){
            this.httpClient.put(this.baseUri + 'api/Entities/updatePerson', person, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Entities/link
         * @param {number} id 
         * @param {string} relationship 
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {boolean} 
         */
        demoWebApi.Controllers.EntitiesController.LinkPerson (DemoCoreWeb)(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person, callback: (data : boolean) => any){
            this.httpClient.put(this.baseUri + 'api/Entities/link', person, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Entities
         * @param {number} id 
         * @return {void} 
         */
        demoWebApi.Controllers.EntitiesController.Delete (DemoCoreWeb)(id: number, callback: (data : void) => any){
            this.httpClient.delete(this.baseUri + 'api/Entities', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Entities/Company
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Company} 
         */
        demoWebApi.Controllers.EntitiesController.GetCompany (DemoCoreWeb)(id: number, callback: (data : DemoWebApi_DemoData_Client.Company) => any){
            this.httpClient.get(this.baseUri + 'api/Entities/Company', callback, this.error, this.statusCode);
        }
    }

    export class Heroes {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * GET api/Heroes
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        demoWebApi.Controllers.HeroesController.Get (DemoCoreWeb)(callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any){
            this.httpClient.get(this.baseUri + 'api/Heroes', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Heroes/{id}
         * @param {number} id 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        demoWebApi.Controllers.HeroesController.Get (DemoCoreWeb)ById(id: number, callback: (data : DemoWebApi_Controllers_Client.Hero) => any){
            this.httpClient.get(this.baseUri + 'api/Heroes/'+id, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Heroes/{id}
         * @param {number} id 
         * @return {void} 
         */
        demoWebApi.Controllers.HeroesController.Delete (DemoCoreWeb)(id: number, callback: (data : void) => any){
            this.httpClient.delete(this.baseUri + 'api/Heroes/'+id, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Heroes
         * @param {string} name 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        demoWebApi.Controllers.HeroesController.Post (DemoCoreWeb)(name: string, callback: (data : DemoWebApi_Controllers_Client.Hero) => any){
            this.httpClient.post(this.baseUri + 'api/Heroes', name, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Heroes
         * @param {DemoWebApi_Controllers_Client.Hero} hero 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        demoWebApi.Controllers.HeroesController.Put (DemoCoreWeb)(hero: DemoWebApi_Controllers_Client.Hero, callback: (data : DemoWebApi_Controllers_Client.Hero) => any){
            this.httpClient.put(this.baseUri + 'api/Heroes', hero, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Heroes/{name}
         * @param {string} name 
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        demoWebApi.Controllers.HeroesController.Search (DemoCoreWeb)ByName(name: string, callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any){
            this.httpClient.get(this.baseUri + 'api/Heroes/'+encodeURIComponent(name), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Heroes
         * @param {string} name 
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        demoWebApi.Controllers.HeroesController.Search (DemoCoreWeb)ByName(name: string, callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any){
            this.httpClient.get(this.baseUri + 'api/Heroes', callback, this.error, this.statusCode);
        }
    }

    export class Home {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * GET api/Home
         * @return {void} 
         */
        demoWebApi.Controllers.HomeController.Index (DemoCoreWeb)(callback: (data : void) => any){
            this.httpClient.get(this.baseUri + 'api/Home', callback, this.error, this.statusCode);
        }
    }

    export class SuperDemo {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * GET api/SuperDemo/int
         * @param {number} d 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIntSquareAsync (DemoCoreWeb)(d: number, callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/decimal
         * @param {number} d 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDecimalSquare (DemoCoreWeb)(d: number, callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullableDatetime
         * @param {boolean} hasValue 
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDateTime (DemoCoreWeb)(hasValue: boolean, callback: (data : Date) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDatetime', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NextYear
         * @param {Date} dt 
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNextYear (DemoCoreWeb)(dt: Date, callback: (data : Date) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYear', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NextHour
         * @param {Date} dt 
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNextHour (DemoCoreWeb)(dt: Date, callback: (data : Date) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHour', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/NextYear
         * @param {Date} dt 
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.PostNextYear (DemoCoreWeb)(dt: Date, callback: (data : Date) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/NextYear', dt, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDateTimeOffset (DemoCoreWeb)(callback: (data : Date) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DateTimeOffset', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostDateTimeOffset (DemoCoreWeb)(d: Date, callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', d, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostDateTimeOffsetNullable (DemoCoreWeb)(d: Date, callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', d, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullableDecimal
         * @param {boolean} hasValue 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNullableDecimal (DemoCoreWeb)(hasValue: boolean, callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDecimal', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetFloatZero (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/FloatZero', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDoubleZero (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleZero', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDecimalZero (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DecimalZero', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {string} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNullString (DemoCoreWeb)(callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullString', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {string} 
         */
        demoWebApi.Controllers.SuperDemoController.GetEmptyString (DemoCoreWeb)(callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/EmptyString', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.SuperDemoController.GetNullPerson (DemoCoreWeb)(callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullObject', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {any} 
         */
        demoWebApi.Controllers.SuperDemoController.GetTextStream (DemoCoreWeb)(callback: (data : any) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/TextStream', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetByteArray (DemoCoreWeb)(callback: (data : Array<number>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ByteArray', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {void} 
         */
        demoWebApi.Controllers.SuperDemoController.GetActionResult (DemoCoreWeb)(callback: (data : void) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.Getbyte (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/byte', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.Getsbyte (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/sbyte', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/short
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetShort (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/short', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetUShort (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ushort', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetUint (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/uint', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.Getulong (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ulong', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.Getdouble (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/doulbe', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDecimal (DemoCoreWeb)(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/char
         * @return {string} 
         */
        demoWebApi.Controllers.SuperDemoController.GetChar (DemoCoreWeb)(callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/char', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.GetBool (DemoCoreWeb)(callback: (data : boolean) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/bool', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/int2d
         * @return {number[][]} 
         */
        demoWebApi.Controllers.SuperDemoController.GetInt2D (DemoCoreWeb)(callback: (data : number[][]) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2d', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetInt2DJagged (DemoCoreWeb)(callback: (data : Array<Array<number>>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2dJagged', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/int2d
         * @param {number[][]} a 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostInt2D (DemoCoreWeb)(a: number[][], callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2d', a, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostInt2DJagged (DemoCoreWeb)(a: Array<Array<number>>, callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2djagged', a, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a 
         * @return {boolean} 
         */
        demoWebApi.Controllers.SuperDemoController.PostIntArray (DemoCoreWeb)(a: Array<number>, callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/intArray', a, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/intArray
         * @return {Array<number>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIntArray (DemoCoreWeb)(callback: (data : Array<number>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArray', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/AnonymousDynamic
         * @return {void} 
         */
        demoWebApi.Controllers.SuperDemoController.GetAnonymousDynamic (DemoCoreWeb)(callback: (data : void) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AnonymousDynamic', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/AnonymousObject
         * @return {void} 
         */
        demoWebApi.Controllers.SuperDemoController.GetAnonymousObject (DemoCoreWeb)(callback: (data : void) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AnonymousObject', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj 
         * @return {void} 
         */
        demoWebApi.Controllers.SuperDemoController.PostAnonymousObject (DemoCoreWeb)(obj: any, callback: (data : void) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/AnonymousObject', obj, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDictionary (DemoCoreWeb)(callback: (data : {[id: string]: string }) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringStringDic', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }} 
         */
        demoWebApi.Controllers.SuperDemoController.GetDictionaryOfPeople (DemoCoreWeb)(callback: (data : {[id: string]: DemoWebApi_DemoData_Client.Person }) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostDictionary (DemoCoreWeb)(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/StringPersonDic', dic, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/KeyValuePair
         * @return {{key: string, value: DemoWebApi_DemoData_Client.Person }} 
         */
        demoWebApi.Controllers.SuperDemoController.GetKeyhValuePair (DemoCoreWeb)(callback: (data : {key: string, value: DemoWebApi_DemoData_Client.Person }) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/KeyValuePair', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetICollection (DemoCoreWeb)(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ICollection', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIList (DemoCoreWeb)(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IList', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIReadOnlyList (DemoCoreWeb)(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyList', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetIReadOnlyCollection (DemoCoreWeb)(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetList (DemoCoreWeb)(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/List', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        demoWebApi.Controllers.SuperDemoController.GetCollection (DemoCoreWeb)(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/Collection', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostICollection (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ICollection', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostIList (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IList', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostIReadOnlyList (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostIReadOnlyCollection (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostList (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/List', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        demoWebApi.Controllers.SuperDemoController.PostCollection (DemoCoreWeb)(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Collection', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/PostEmpty
         * @param {string} s 
         * @param {number} i 
         * @return {{item1:string, item2:number}} 
         */
        demoWebApi.Controllers.SuperDemoController.PostWithQueryButEmptyBody (DemoCoreWeb)(s: string, i: number, callback: (data : {item1:string, item2:number}) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostEmpty', s, callback, this.error, this.statusCode);
        }
    }

    export class Tuple {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * POST api/Tuple/PersonCompany1
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPersonCompany1 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PersonCompany1', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany2
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany2 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany2', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany3
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany3 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany3', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany4
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany4 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany4', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/PeopleCompany4
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} 
         */
        demoWebApi.Controllers.TupleController.GetPeopleCompany4 (DemoCoreWeb)(callback: (data : {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany4', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany5
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany5 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany5', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/PeopleCompany5
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} 
         */
        demoWebApi.Controllers.TupleController.GetPeopleCompany5 (DemoCoreWeb)(callback: (data : {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany5', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany6
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany6 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany6', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany7
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany7 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany7', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany8
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        demoWebApi.Controllers.TupleController.LinkPeopleCompany8 (DemoCoreWeb)(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany8', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple1
         * @return {{item1:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple1 (DemoCoreWeb)(callback: (data : {item1:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple1', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple1
         * @param {{item1:number}} tuple 
         * @return {number} 
         */
        demoWebApi.Controllers.TupleController.PostTuple1 (DemoCoreWeb)(tuple: {item1:number}, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple1', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple2
         * @return {{item1:string, item2:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple2 (DemoCoreWeb)(callback: (data : {item1:string, item2:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple2', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple2
         * @param {{item1:string, item2:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple2 (DemoCoreWeb)(tuple: {item1:string, item2:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple2', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple3
         * @return {{item1:string, item2:string, item3:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple3 (DemoCoreWeb)(callback: (data : {item1:string, item2:string, item3:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple3', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple3
         * @param {{item1:string, item2:string, item3:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple3 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple3', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple4
         * @return {{item1:string, item2:string, item3:string, item4:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple4 (DemoCoreWeb)(callback: (data : {item1:string, item2:string, item3:string, item4:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple4', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple4
         * @param {{item1:string, item2:string, item3:string, item4:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple4 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple4', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple5
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple5 (DemoCoreWeb)(callback: (data : {item1:string, item2:string, item3:string, item4:string, item5:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple5', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple5
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple5 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:string, item5:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple5', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple6
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple6 (DemoCoreWeb)(callback: (data : {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple6', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple6
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple6 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple6', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple7
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple7 (DemoCoreWeb)(callback: (data : {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple7', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple7
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple7 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple7', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple8
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}} 
         */
        demoWebApi.Controllers.TupleController.GetTuple8 (DemoCoreWeb)(callback: (data : {item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple8', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple8
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}} tuple 
         * @return {string} 
         */
        demoWebApi.Controllers.TupleController.PostTuple8 (DemoCoreWeb)(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple8', tuple, callback, this.error, this.statusCode);
        }
    }

}

