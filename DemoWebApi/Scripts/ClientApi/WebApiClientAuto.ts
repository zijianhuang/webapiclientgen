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
        Int3DJagged?: Array<Array<Array<number>>>;
        Int2D?: number[][];
        Lines?: Array<string>;
    }

}

namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        X?: number;
        Y?: number;
    }

}

namespace DemoWebApi_Controllers_Client {
    export class SuperDemo {
        httpClient: HttpClient;
        constructor(public baseUri?: string, public error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, public statusCode?: { [key: string]: any; }){
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
         * GET api/SuperDemo/int2djagged
         * @return {Array<Array<number>>} 
         */
        GetInt2DJagged(callback: (data : Array<Array<number>>) => any){
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/int2djagged'), callback, this.error, this.statusCode);
        }
    }

    export class Entities {
        httpClient: HttpClient;
        constructor(public baseUri?: string, public error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, public statusCode?: { [key: string]: any; }){
            this.httpClient = new HttpClient();
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
        constructor(public baseUri?: string, public error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, public statusCode?: { [key: string]: any; }){
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
         * POST api/Values
         * @param {string} value 
         * @return {string} 
         */
        Post(value: {'':string}, callback: (data : string) => any){
            this.httpClient.post(encodeURI(this.baseUri + 'api/Values'), value, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        Put(id: number, value: {'':string}, callback: (data : void) => any){
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

