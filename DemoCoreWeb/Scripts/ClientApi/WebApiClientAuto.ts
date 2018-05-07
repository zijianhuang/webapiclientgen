///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="HttpClient.ts" />
namespace DemoWebApi_Controllers_Client {

    /** 
     * Complex hero type
     */
    export interface Hero {
        id?: number;
        name?: string;
    }

}

namespace DemoWebApi_DemoData_Client {
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

namespace DemoWebApi_DemoData_Another_Client {

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

namespace DemoWebApi_Controllers_Client {
    export class Entities {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * Get a person
         * so to know the person
         * GET api/Entities/getPerson/{id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getPerson(id: number, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.get(this.baseUri + 'api/Entities/getPerson/'+id, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Entities/createPerson
         * @param {DemoWebApi_DemoData_Client.Person} p 
         * @return {number} 
         */
        createPerson(p: DemoWebApi_DemoData_Client.Person, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/Entities/createPerson', p, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Entities/updatePerson
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {void} 
         */
        updatePerson(person: DemoWebApi_DemoData_Client.Person, callback: (data : void) => any){
            this.httpClient.put(this.baseUri + 'api/Entities/updatePerson', person, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Entities/link?id={id}&relationship={relationship}
         * @param {number} id 
         * @param {string} relationship 
         * @param {DemoWebApi_DemoData_Client.Person} person 
         * @return {boolean} 
         */
        linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person, callback: (data : boolean) => any){
            this.httpClient.put(this.baseUri + 'api/Entities/link?id='+id+'&relationship='+encodeURIComponent(relationship), person, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Entities/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number, callback: (data : void) => any){
            this.httpClient.delete(this.baseUri + 'api/Entities/'+id, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Entities/Company/{id}
         * @param {number} id 
         * @return {DemoWebApi_DemoData_Client.Company} 
         */
        getCompany(id: number, callback: (data : DemoWebApi_DemoData_Client.Company) => any){
            this.httpClient.get(this.baseUri + 'api/Entities/Company/'+id, callback, this.error, this.statusCode);
        }
    }

    export class Heroes {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * Get all heroes.
         * GET api/Heroes
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        get(callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any){
            this.httpClient.get(this.baseUri + 'api/Heroes', callback, this.error, this.statusCode);
        }

        /** 
         * Get a hero.
         * GET api/Heroes/{id}
         * @param {number} id 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        getById(id: number, callback: (data : DemoWebApi_Controllers_Client.Hero) => any){
            this.httpClient.get(this.baseUri + 'api/Heroes/'+id, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Heroes/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number, callback: (data : void) => any){
            this.httpClient.delete(this.baseUri + 'api/Heroes/'+id, callback, this.error, this.statusCode);
        }

        /** 
         * Add a hero
         * POST api/Heroes
         * @param {string} name 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        post(name: string, callback: (data : DemoWebApi_Controllers_Client.Hero) => any){
            this.httpClient.post(this.baseUri + 'api/Heroes', name, callback, this.error, this.statusCode);
        }

        /** 
         * Update hero.
         * PUT api/Heroes
         * @param {DemoWebApi_Controllers_Client.Hero} hero 
         * @return {DemoWebApi_Controllers_Client.Hero} 
         */
        put(hero: DemoWebApi_Controllers_Client.Hero, callback: (data : DemoWebApi_Controllers_Client.Hero) => any){
            this.httpClient.put(this.baseUri + 'api/Heroes', hero, callback, this.error, this.statusCode);
        }

        /** 
         * Search heroes
         * GET api/Heroes/{name}
         * @param {string} name 
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} 
         */
        search(name: string, callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any){
            this.httpClient.get(this.baseUri + 'api/Heroes/'+encodeURIComponent(name), callback, this.error, this.statusCode);
        }
    }

    export class Home {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * GET api/Home
         * @return {void} 
         */
        index(callback: (data : void) => any){
            this.httpClient.get(this.baseUri + 'api/Home', callback, this.error, this.statusCode);
        }
    }

    export class SuperDemo {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * GET api/SuperDemo/int/{d}
         * @param {number} d 
         * @return {number} 
         */
        getIntSquare(d: number, callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int/'+d, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/decimal/{d}
         * @param {number} d 
         * @return {number} 
         */
        getDecimalSquare(d: number, callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal/'+d, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullableDatetime/{hasValue}
         * @param {boolean} hasValue 
         * @return {Date} 
         */
        getDateTime(hasValue: boolean, callback: (data : Date) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDatetime/'+hasValue, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NextYear/{dt}
         * @param {Date} dt 
         * @return {Date} 
         */
        getNextYear(dt: Date, callback: (data : Date) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYear/'+dt, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NextHour/{dt}
         * @param {Date} dt 
         * @return {Date} 
         */
        getNextHour(dt: Date, callback: (data : Date) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHour/'+dt, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/NextYear
         * @param {Date} dt 
         * @return {Date} 
         */
        postNextYear(dt: Date, callback: (data : Date) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/NextYear', dt, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date} 
         */
        getDateTimeOffset(callback: (data : Date) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DateTimeOffset', callback, this.error, this.statusCode);
        }

        /** 
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffset(d: Date, callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', d, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d 
         * @return {boolean} 
         */
        postDateTimeOffsetNullable(d: Date, callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', d, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullableDecimal/{hasValue}
         * @param {boolean} hasValue 
         * @return {number} 
         */
        getNullableDecimal(hasValue: boolean, callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDecimal/'+hasValue, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/FloatZero
         * @return {number} 
         */
        getFloatZero(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/FloatZero', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DoubleZero
         * @return {number} 
         */
        getDoubleZero(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleZero', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/DecimalZero
         * @return {number} 
         */
        getDecimalZero(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DecimalZero', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullString
         * @return {string} 
         */
        getNullString(callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullString', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/EmptyString
         * @return {string} 
         */
        getEmptyString(callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/EmptyString', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        getNullPerson(callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullObject', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/TextStream
         * @return {any} 
         */
        getTextStream(callback: (data : any) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/TextStream', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>} 
         */
        getByteArray(callback: (data : Array<number>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ByteArray', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ActionResult
         * @return {void} 
         */
        getActionResult(callback: (data : void) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/byte
         * @return {number} 
         */
        getbyte(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/byte', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/sbyte
         * @return {number} 
         */
        getsbyte(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/sbyte', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/short
         * @return {number} 
         */
        getShort(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/short', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ushort
         * @return {number} 
         */
        getUShort(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ushort', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/uint
         * @return {number} 
         */
        getUint(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/uint', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ulong
         * @return {number} 
         */
        getulong(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ulong', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/doulbe
         * @return {number} 
         */
        getdouble(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/doulbe', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/decimal
         * @return {number} 
         */
        getDecimal(callback: (data : number) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/char
         * @return {string} 
         */
        getChar(callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/char', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/bool
         * @return {boolean} 
         */
        getBool(callback: (data : boolean) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/bool', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/int2d
         * @return {number[][]} 
         */
        getInt2D(callback: (data : number[][]) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2d', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>} 
         */
        getInt2DJagged(callback: (data : Array<Array<number>>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2dJagged', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/int2d
         * @param {number[][]} a 
         * @return {boolean} 
         */
        postInt2D(a: number[][], callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2d', a, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a 
         * @return {boolean} 
         */
        postInt2DJagged(a: Array<Array<number>>, callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2djagged', a, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a 
         * @return {boolean} 
         */
        postIntArray(a: Array<number>, callback: (data : boolean) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/intArray', a, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/intArray
         * @return {Array<number>} 
         */
        getIntArray(callback: (data : Array<number>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArray', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }} 
         */
        getDictionary(callback: (data : {[id: string]: string }) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringStringDic', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }} 
         */
        getDictionaryOfPeople(callback: (data : {[id: string]: DemoWebApi_DemoData_Client.Person }) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic 
         * @return {number} 
         */
        postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/StringPersonDic', dic, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/KeyValuePair
         * @return {{key: string, value: DemoWebApi_DemoData_Client.Person }} 
         */
        getKeyhValuePair(callback: (data : {key: string, value: DemoWebApi_DemoData_Client.Person }) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/KeyValuePair', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getICollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ICollection', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IList', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIReadOnlyList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyList', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getIReadOnlyCollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/List', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>} 
         */
        getCollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any){
            this.httpClient.get(this.baseUri + 'api/SuperDemo/Collection', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postICollection(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ICollection', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIList(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IList', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postList(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/List', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list 
         * @return {number} 
         */
        postCollection(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Collection', list, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/SuperDemo/PostEmpty/{i}
         * @param {string} s 
         * @param {number} i 
         * @return {{item1:string, item2:number}} 
         */
        postWithQueryButEmptyBody(s: string, i: number, callback: (data : {item1:string, item2:number}) => any){
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostEmpty/'+i, s, callback, this.error, this.statusCode);
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
        linkPersonCompany1(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PersonCompany1', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany2
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany2(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany2', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany3
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany3(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany3', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany4
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany4(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany4', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/PeopleCompany4
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} 
         */
        getPeopleCompany4(callback: (data : {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany4', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany5
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany5(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany5', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/PeopleCompany5
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} 
         */
        getPeopleCompany5(callback: (data : {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany5', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany6
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany6(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany6', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany7
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany7(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany7', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/PeopleCompany8
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}} peopleAndCompany 
         * @return {DemoWebApi_DemoData_Client.Person} 
         */
        linkPeopleCompany8(peopleAndCompany: {item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany8', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple1
         * @return {{item1:number}} 
         */
        getTuple1(callback: (data : {item1:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple1', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple1
         * @param {{item1:number}} tuple 
         * @return {number} 
         */
        postTuple1(tuple: {item1:number}, callback: (data : number) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple1', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple2
         * @return {{item1:string, item2:number}} 
         */
        getTuple2(callback: (data : {item1:string, item2:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple2', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple2
         * @param {{item1:string, item2:number}} tuple 
         * @return {string} 
         */
        postTuple2(tuple: {item1:string, item2:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple2', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple3
         * @return {{item1:string, item2:string, item3:number}} 
         */
        getTuple3(callback: (data : {item1:string, item2:string, item3:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple3', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple3
         * @param {{item1:string, item2:string, item3:number}} tuple 
         * @return {string} 
         */
        postTuple3(tuple: {item1:string, item2:string, item3:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple3', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple4
         * @return {{item1:string, item2:string, item3:string, item4:number}} 
         */
        getTuple4(callback: (data : {item1:string, item2:string, item3:string, item4:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple4', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple4
         * @param {{item1:string, item2:string, item3:string, item4:number}} tuple 
         * @return {string} 
         */
        postTuple4(tuple: {item1:string, item2:string, item3:string, item4:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple4', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple5
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:number}} 
         */
        getTuple5(callback: (data : {item1:string, item2:string, item3:string, item4:string, item5:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple5', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple5
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:number}} tuple 
         * @return {string} 
         */
        postTuple5(tuple: {item1:string, item2:string, item3:string, item4:string, item5:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple5', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple6
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} 
         */
        getTuple6(callback: (data : {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple6', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple6
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} tuple 
         * @return {string} 
         */
        postTuple6(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple6', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple7
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} 
         */
        getTuple7(callback: (data : {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple7', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple7
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} tuple 
         * @return {string} 
         */
        postTuple7(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple7', tuple, callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Tuple/Tuple8
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}} 
         */
        getTuple8(callback: (data : {item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}) => any){
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple8', callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Tuple/Tuple8
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}} tuple 
         * @return {string} 
         */
        postTuple8(tuple: {item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple8', tuple, callback, this.error, this.statusCode);
        }
    }

    export class Values {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * Get a list of value
         * GET api/Values
         * @return {Array<string>} 
         */
        get(callback: (data : Array<string>) => any){
            this.httpClient.get(this.baseUri + 'api/Values', callback, this.error, this.statusCode);
        }

        /** 
         * Get by both Id and name
         * GET api/Values/{id}?name={name}
         * @param {number} id 
         * @param {string} name 
         * @return {string} 
         */
        getByIdAndName(id: number, name: string, callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/Values/'+id+'?name='+encodeURIComponent(name), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Values?name={name}
         * @param {string} name 
         * @return {string} 
         */
        getByName(name: string, callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/Values?name='+encodeURIComponent(name), callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Values/{id}
         * @param {number} id 
         * @return {string} 
         */
        getById(id: number, callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/Values/'+id, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {string} 
         */
        post(value: string, callback: (data : string) => any){
            this.httpClient.post(this.baseUri + 'api/Values', value, callback, this.error, this.statusCode);
        }

        /** 
         * Update with valjue
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        put(id: number, value: string, callback: (data : void) => any){
            this.httpClient.put(this.baseUri + 'api/Values/'+id, value, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number, callback: (data : void) => any){
            this.httpClient.delete(this.baseUri + 'api/Values/'+id, callback, this.error, this.statusCode);
        }
    }

}

