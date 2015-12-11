/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="HttpClient.ts" />
namespace DemoWebApi_DemoData_Client {
    export enum AddressType {Postal, Residential}

    export enum Days {Sat=1, Sun=2, Mon=3, Tue=4, Wed=5, Thu=6, Fri=7}

    export interface Address {
        Id?: string;
        Street1?: string;
        Street2?: string;
        City?: string;
        State?: string;
        PostalCode?: string;
        Country?: string;
        Type?: DemoWebApi_DemoData_Client.AddressType;
        Location?: DemoWebApi_DemoData_Another_Client.MyPoint;
    }

    export interface Entity {
        Id?: string;
        Name: string;
        Addresses?: Array<DemoWebApi_DemoData_Client.Address>;
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {
        Surname?: string;
        GivenName?: string;
        BirthDate?: Date;
    }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {
        BusinessNumber?: string;
        BusinessNumberType?: string;
        TextMatrix?: Array<Array<string>>;
        Int2DJagged?: Array<Array<number>>;
        Int2D?: number[][];
        Lines?: Array<string>;
    }

    export interface MyPeopleDic {
        Dic?: {[id: string]: DemoWebApi_DemoData_Client.Person };
        AnotherDic?: {[id: string]: string };
        IntDic?: {[id: number]: string };
    }

}

namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        X?: number;
        Y?: number;
    }

}

namespace DemoWebApi_Models_Client {
    export interface Handy {
        Id?: number;
        Name?: string;
    }

}

namespace DemoWebApi_Controllers_Client {
    export class SuperDemo {
        httpClient: HttpClient;
        constructor(public baseUri: string = HttpClient.locationOrigin, public error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, public statusCode?: { [key: string]: any; }){
            this.httpClient = new HttpClient();
        }

        /** 
         * GET api/SuperDemo/int?d={d}
         * @param {number} d 
         * @return {number} 
         */
        GetIntSquare(d: number, callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/int?d='+d), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d 
         * @return {number} 
         */
        GetDecimalSquare(d: number, callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/decimal?d='+d), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {Date} 
         */
        GetDateTime(hasValue: boolean, callback: (data : Date) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue='+hasValue), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date} 
         */
        GetDateTimeOffset(callback: (data : Date) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/DateTimeOffset'), callback, this.error, this.statusCode);
        }

        /** 
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d 
         * @return {boolean} 
         */
        PostDateTimeOffset(d: Date, callback: (data : boolean) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/DateTimeOffset'), d, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d 
         * @return {boolean} 
         */
        PostDateTimeOffsetNullable(d: Date, callback: (data : boolean) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable'), d, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue 
         * @return {number} 
         */
        GetNullableDecimal(hasValue: boolean, callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue='+hasValue), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {number} 
         */
        GetFloatZero(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/FloatZero'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {number} 
         */
        GetDoubleZero(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/DoubleZero'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {number} 
         */
        GetDecimalZero(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/DecimalZero'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {string} 
         */
        GetNullString(callback: (data : string) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/NullString'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {string} 
         */
        GetEmptyString(callback: (data : string) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/EmptyString'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        GetNullPerson(callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/NullObject'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {any} 
         */
        GetTextStream(callback: (data : any) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/TextStream'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>} 
         */
        GetByteArray(callback: (data : Array<number>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ByteArray'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {any} 
         */
        GetActionResult(callback: (data : any) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ActionResult'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {number} 
         */
        Getbyte(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/byte'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {number} 
         */
        Getsbyte(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/sbyte'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/short
         * @return {number} 
         */
        GetShort(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/short'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {number} 
         */
        GetUShort(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ushort'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {number} 
         */
        GetUint(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/uint'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {number} 
         */
        Getulong(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ulong'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {number} 
         */
        Getdouble(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/doulbe'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {number} 
         */
        GetDecimal(callback: (data : number) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/decimal'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/char
         * @return {string} 
         */
        GetChar(callback: (data : string) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/char'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {boolean} 
         */
        GetBool(callback: (data : boolean) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/bool'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/int2d
         * @return {number[][]} 
         */
        GetInt2D(callback: (data : number[][]) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/int2d'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>} 
         */
        GetInt2DJagged(callback: (data : Array<Array<number>>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/int2dJagged'), callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/int2d
         * @param {number[][]} a 
         * @return {boolean} 
         */
        PostInt2D(a: number[][], callback: (data : boolean) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/int2d'), a, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a 
         * @return {boolean} 
         */
        PostInt2DJagged(a: Array<Array<number>>, callback: (data : boolean) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/int2djagged'), a, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a 
         * @return {boolean} 
         */
        PostIntArray(a: Array<number>, callback: (data : boolean) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/intArray'), a, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/intArray
         * @return {Array<number>} 
         */
        GetIntArray(callback: (data : Array<number>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/intArray'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/AnonymousDynamic
         * @return {any} 
         */
        GetAnonymousDynamic(callback: (data : any) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/AnonymousDynamic'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/AnonymousObject
         * @return {any} 
         */
        GetAnonymousObject(callback: (data : any) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/AnonymousObject'), callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj 
         * @return {any} 
         */
        PostAnonymousObject(obj: any, callback: (data : any) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/AnonymousObject'), obj, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }} 
         */
        GetDictionary(callback: (data : {[id: string]: string }) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/StringStringDic'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }} 
         */
        GetDictionaryOfPeople(callback: (data : {[id: string]: DemoWebApi_DemoData_Client.Person }) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/StringPersonDic'), callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic 
         * @return {number} 
         */
        PostDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }, callback: (data : number) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/StringPersonDic'), dic, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/KeyValuePair
         * @return {{Key: string, Value: DemoWebApi_DemoData_Client.Person }} 
         */
        GetKeyhValuePair(callback: (data : {Key: string, Value: DemoWebApi_DemoData_Client.Person }) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/KeyValuePair'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        GetICollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ICollection'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        GetIList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/IList'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        GetIReadOnlyList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyList'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        GetIReadOnlyCollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyCollection'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        GetList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/List'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        GetCollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/Collection'), callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        PostICollection(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/ICollection'), list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        PostIList(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/IList'), list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        PostIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyList'), list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        PostIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyCollection'), list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        PostList(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/List'), list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        PostCollection(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/Collection'), list, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/Handy
         * @param {DemoWebApi_Models_Client.Handy} handy 
         * @return {DemoWebApi_Models_Client.Handy} 
         */
        GetHandy(handy: DemoWebApi_Models_Client.Handy, callback: (data : DemoWebApi_Models_Client.Handy) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/Handy'), callback, this.error, this.statusCode);
        }
    }

    export class Entities {
        httpClient: HttpClient;
        constructor(public baseUri: string = HttpClient.locationOrigin, public error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, public statusCode?: { [key: string]: any; }){
            this.httpClient = new HttpClient();
        }

        /** 
         * PUT api/SuperDemo/link?id={id}&relationship={relationship}
         * @param {number} id 
         * @param {string} relationship 
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {boolean} 
         */
        LinkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person, callback: (data : boolean) => any){
            this.httpClient.put(encodeURI(this.baseUri + 'api/SuperDemo/link?id='+id+'&relationship='+relationship), person, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/Company?id={id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Company} 
         */
        GetCompany(id: number, callback: (data : DemoWebApi_DemoData_Client.Company) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/Company?id='+id), callback, this.error, this.statusCode);
        }

        /** 
         * Get a person
         * GET api/Entities/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        GetPerson(id: number, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/Entities/'+id), callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {number} 
         */
        CreatePerson(person: DemoWebApi_DemoData_Client.Person, callback: (data : number) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/Entities'), person, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        UpdatePerson(person: DemoWebApi_DemoData_Client.Person, callback: (data : void) => any){
            this.httpClient.put(encodeURI(this.baseUri + 'api/Entities'), person, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Entities/{id}
         * @param {number} id 
         * @return {void} 
         */
        Delete(id: number, callback: (data : void) => any){
            this.httpClient.delete(encodeURI(this.baseUri + 'api/Entities/'+id), callback, this.error, this.statusCode);
        }
    }

    export class Values {
        httpClient: HttpClient;
        constructor(public baseUri: string = HttpClient.locationOrigin, public error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, public statusCode?: { [key: string]: any; }){
            this.httpClient = new HttpClient();
        }

        /** 
         * GET api/Values
         * @return {Array<string>} 
         */
        Get(callback: (data : Array<string>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/Values'), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Values/{id}?name={name}
         * @param {number} id 
         * @param {string} name 
         * @return {string} 
         */
        GetByIdAndName(id: number, name: string, callback: (data : string) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/Values/'+id+'?name='+name), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Values?name={name}
         * @param {string} name 
         * @return {string} 
         */
        GetByName(name: string, callback: (data : string) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/Values?name='+name), callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {string} 
         */
        Post(value: string, callback: (data : string) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/Values'), value, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        Put(id: number, value: string, callback: (data : void) => any){
            this.httpClient.put(encodeURI(this.baseUri + 'api/Values/'+id), value, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        Delete(id: number, callback: (data : void) => any){
            this.httpClient.delete(encodeURI(this.baseUri + 'api/Values/'+id), callback, this.error, this.statusCode);
        }
    }

}

