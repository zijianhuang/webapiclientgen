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

    export interface MimsResult<T> {
        result?: T;
        generatedAt?: Date;
        success?: boolean;
        message?: string;
    }

    export interface MimsPackage {
        result?: DemoWebApi_DemoData_Client.MimsResult<number>;
        tag?: string;
    }

    export interface MyGeneric<T, K, U> {
        myT?: T;
        myK?: K;
        myU?: U;
        status?: string;
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

namespace DemoCoreWeb_Controllers_Client {
    export class SpecialTypes {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
        }

        /**
         * GET api/SpecialTypes/AnonymousDynamic
         */
        getAnonymousDynamic(callback: (data : any) => any) {
            this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SpecialTypes/AnonymousObject
         */
        getAnonymousObject(callback: (data : any) => any) {
            this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousObject', callback, this.error, this.statusCode);
        }

        /**
         * POST api/SpecialTypes/AnonymousObject
         */
        postAnonymousObject(obj: any, callback: (data : any) => any) {
            this.httpClient.post(this.baseUri + 'api/SpecialTypes/AnonymousObject', obj, callback, this.error, this.statusCode);
        }
    }

}

namespace DemoWebApi_Controllers_Client {
    export class Entities {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
        }

        /**
         * Get a person
         * so to know the person
         * GET api/Entities/getPerson/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        getPerson(id: number, callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.get(this.baseUri + 'api/Entities/getPerson/' + id, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Entities/createPerson
         */
        createPerson(p: DemoWebApi_DemoData_Client.Person, callback: (data : number) => any) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPerson', p, callback, this.error, this.statusCode);
        }

        /**
         * PUT api/Entities/updatePerson
         */
        updatePerson(person: DemoWebApi_DemoData_Client.Person, callback: (data : void) => any) {
            this.httpClient.put(this.baseUri + 'api/Entities/updatePerson', person, callback, this.error, this.statusCode);
        }

        /**
         * PUT api/Entities/link?id={id}&relationship={relationship}
         */
        linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person, callback: (data : boolean) => any) {
            this.httpClient.put(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + encodeURIComponent(relationship), person, callback, this.error, this.statusCode);
        }

        /**
         * DELETE api/Entities/{id}
         */
        delete(id: number, callback: (data : void) => any) {
            this.httpClient.delete(this.baseUri + 'api/Entities/' + id, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Entities/Company/{id}
         */
        getCompany(id: number, callback: (data : DemoWebApi_DemoData_Client.Company) => any) {
            this.httpClient.get(this.baseUri + 'api/Entities/Company/' + id, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Entities/Mims
         */
        getMims(p: DemoWebApi_DemoData_Client.MimsPackage, callback: (data : DemoWebApi_DemoData_Client.MimsResult<string>) => any) {
            this.httpClient.post(this.baseUri + 'api/Entities/Mims', p, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Entities/MyGeneric
         */
        getMyGeneric(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, number>, callback: (data : DemoWebApi_DemoData_Client.MyGeneric<string, number, number>) => any) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGeneric', s, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Entities/MyGenericPerson
         */
        getMyGenericPerson(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>, callback: (data : DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>) => any) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGenericPerson', s, callback, this.error, this.statusCode);
        }
    }

    export class Heroes {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
        }

        /**
         * Get all heroes.
         * GET api/Heroes
         */
        get(callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any) {
            this.httpClient.get(this.baseUri + 'api/Heroes', callback, this.error, this.statusCode);
        }

        /**
         * Get a hero.
         * GET api/Heroes/{id}
         */
        getById(id: number, callback: (data : DemoWebApi_Controllers_Client.Hero) => any) {
            this.httpClient.get(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode);
        }

        /**
         * DELETE api/Heroes/{id}
         */
        delete(id: number, callback: (data : void) => any) {
            this.httpClient.delete(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode);
        }

        /**
         * Add a hero
         * POST api/Heroes/q?name={name}
         */
        postWithQuery(name: string, callback: (data : DemoWebApi_Controllers_Client.Hero) => any) {
            this.httpClient.post(this.baseUri + 'api/Heroes/q?name=' + encodeURIComponent(name), null, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Heroes
         */
        post(name: string, callback: (data : DemoWebApi_Controllers_Client.Hero) => any) {
            this.httpClient.post(this.baseUri + 'api/Heroes', name, callback, this.error, this.statusCode);
        }

        /**
         * Update hero.
         * PUT api/Heroes
         */
        put(hero: DemoWebApi_Controllers_Client.Hero, callback: (data : DemoWebApi_Controllers_Client.Hero) => any) {
            this.httpClient.put(this.baseUri + 'api/Heroes', hero, callback, this.error, this.statusCode);
        }

        /**
         * Search heroes
         * GET api/Heroes/search/{name}
         * @param {string} name keyword contained in hero name.
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
         */
        search(name: string, callback: (data : Array<DemoWebApi_Controllers_Client.Hero>) => any) {
            this.httpClient.get(this.baseUri + 'api/Heroes/search/' + encodeURIComponent(name), callback, this.error, this.statusCode);
        }
    }

    export class SuperDemo {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
        }

        /**
         * GET api/SuperDemo/int/{d}
         */
        getIntSquare(d: number, callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int/' + d, callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/decimal/{d}
         */
        getDecimalSquare(d: number, callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal/' + d, callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/NullableDatetime/{hasValue}
         */
        getDateTime(hasValue: boolean, callback: (data : Date) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDatetime/' + hasValue, callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/NextYear/{dt}
         */
        getNextYear(dt: Date, callback: (data : Date) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYear/' + dt.toISOString(), callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/NextHour/{dt}
         */
        getNextHour(dt: Date, callback: (data : Date) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHour/' + dt.toISOString(), callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/NextYear
         */
        postNextYear(dt: Date, callback: (data : Date) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/NextYear', dt, callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/DateTimeOffset
         */
        getDateTimeOffset(callback: (data : Date) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DateTimeOffset', callback, this.error, this.statusCode);
        }

        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         */
        postDateTimeOffset(d: Date, callback: (data : boolean) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', d, callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         */
        postDateTimeOffsetNullable(d: Date, callback: (data : boolean) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', d, callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/NullableDecimal/{hasValue}
         */
        getNullableDecimal(hasValue: boolean, callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue, callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/FloatZero
         */
        getFloatZero(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/FloatZero', callback, this.error, this.statusCode);
        }

        /**
         * Result of 0.1d + 0.2d - 0.3d
         * GET api/SuperDemo/DoubleZero
         */
        getDoubleZero(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleZero', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/DecimalZero
         */
        getDecimalZero(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DecimalZero', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/NullString
         */
        getNullString(callback: (data : string) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullString', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/EmptyString
         */
        getEmptyString(callback: (data : string) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/EmptyString', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/NullObject
         */
        getNullPerson(callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullObject', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/TextStream
         */
        getTextStream(callback: (data : any) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/TextStream', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/ByteArray
         */
        getByteArray(callback: (data : Array<number>) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ByteArray', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/ActionResult
         */
        getActionResult(callback: (data : any) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/ActionStringResult
         */
        getActionStringResult(callback: (data : string) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionStringResult', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/byte
         */
        getbyte(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/byte', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/sbyte
         */
        getsbyte(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/sbyte', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/short
         */
        getShort(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/short', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/ushort
         */
        getUShort(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ushort', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/uint
         */
        getUint(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/uint', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/ulong
         */
        getulong(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ulong', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/doulbe
         */
        getdouble(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/doulbe', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/decimal
         */
        getDecimal(callback: (data : number) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/char
         */
        getChar(callback: (data : string) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/char', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/bool
         */
        getBool(callback: (data : boolean) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/bool', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/int2d
         */
        getInt2D(callback: (data : number[][]) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2d', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/int2dJagged
         */
        getInt2DJagged(callback: (data : Array<Array<number>>) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2dJagged', callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/int2d
         */
        postInt2D(a: number[][], callback: (data : boolean) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2d', a, callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/int2djagged
         */
        postInt2DJagged(a: Array<Array<number>>, callback: (data : boolean) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2djagged', a, callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/intArray
         */
        postIntArray(a: Array<number>, callback: (data : boolean) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/intArray', a, callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/intArray
         */
        getIntArray(callback: (data : Array<number>) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArray', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/StringStringDic
         */
        getDictionary(callback: (data : {[id: string]: string }) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringStringDic', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/StringPersonDic
         */
        getDictionaryOfPeople(callback: (data : {[id: string]: DemoWebApi_DemoData_Client.Person }) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic', callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/StringPersonDic
         */
        postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }, callback: (data : number) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/StringPersonDic', dic, callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/KeyValuePair
         */
        getKeyhValuePair(callback: (data : {key: string, value: DemoWebApi_DemoData_Client.Person }) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/KeyValuePair', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/ICollection
         */
        getICollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ICollection', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/IList
         */
        getIList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IList', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/IReadOnlyList
         */
        getIReadOnlyList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyList', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/IReadOnlyCollection
         */
        getIReadOnlyCollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/List
         */
        getList(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/List', callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/Collection
         */
        getCollection(callback: (data : Array<DemoWebApi_DemoData_Client.Person>) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/Collection', callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/ICollection
         */
        postICollection(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ICollection', list, callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/IList
         */
        postIList(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IList', list, callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/IReadOnlyList
         */
        postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', list, callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/IReadOnlyCollection
         */
        postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', list, callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/List
         */
        postList(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/List', list, callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/Collection
         */
        postCollection(list: Array<DemoWebApi_DemoData_Client.Person>, callback: (data : number) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Collection', list, callback, this.error, this.statusCode);
        }

        /**
         * POST api/SuperDemo/PostEmpty/{i}
         */
        postWithQueryButEmptyBody(s: string, i: number, callback: (data : {item1: string, item2: number}) => any) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, s, callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
         */
        getPrimitiveNullable(location: string, dd: number, de: number, callback: (data : {item1: string, item2: number, item3: number}) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + encodeURIComponent(location) + (dd?'&dd='+dd.toString():'') + (de?'&de='+de.toString():''), callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
         */
        getPrimitiveNullable2(dd: number, de: number, callback: (data : {item1: number, item2: number}) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable2?'+(dd?'dd='+dd.toString():'') + (de?'&de='+de.toString():''), callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/NextYearNullable?n={n}&dt={dt}
         */
        getNextYearNullable(n: number, dt: Date, callback: (data : Date) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYearNullable?n=' + n + (dt?'&dt='+dt.toISOString():''), callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/NextHourNullable?n={n}&dt={dt}
         */
        getNextHourNullable(n: number, dt: Date, callback: (data : Date) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHourNullable?n=' + n + (dt?'&dt='+dt.toISOString():''), callback, this.error, this.statusCode);
        }

        /**
         * GET api/SuperDemo/SearchDateRange?startDate={startDate}&endDate={endDate}
         */
        searchDateRange(startDate: Date, endDate: Date, callback: (data : {item1: Date, item2: Date}) => any) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/SearchDateRange?'+(startDate?'startDate='+startDate.toISOString():'') + (endDate?'&endDate='+endDate.toISOString():''), callback, this.error, this.statusCode);
        }
    }

    export class Tuple {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
        }

        /**
         * POST api/Tuple/PersonCompany1
         */
        linkPersonCompany1(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PersonCompany1', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/PeopleCompany2
         */
        linkPeopleCompany2(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany2', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/PeopleCompany3
         */
        linkPeopleCompany3(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany3', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/PeopleCompany4
         */
        linkPeopleCompany4(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany4', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/PeopleCompany4
         */
        getPeopleCompany4(callback: (data : {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany4', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/PeopleCompany5
         */
        linkPeopleCompany5(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany5', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/PeopleCompany5
         */
        getPeopleCompany5(callback: (data : {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany5', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/PeopleCompany6
         */
        linkPeopleCompany6(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany6', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/PeopleCompany7
         */
        linkPeopleCompany7(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany7', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/PeopleCompany8
         */
        linkPeopleCompany8(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company}, callback: (data : DemoWebApi_DemoData_Client.Person) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany8', peopleAndCompany, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/Tuple1
         */
        getTuple1(callback: (data : {item1: number}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple1', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/Tuple1
         */
        postTuple1(tuple: {item1: number}, callback: (data : number) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple1', tuple, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/Tuple2
         */
        getTuple2(callback: (data : {item1: string, item2: number}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple2', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/Tuple2
         */
        postTuple2(tuple: {item1: string, item2: number}, callback: (data : string) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple2', tuple, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/Tuple3
         */
        getTuple3(callback: (data : {item1: string, item2: string, item3: number}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple3', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/Tuple3
         */
        postTuple3(tuple: {item1: string, item2: string, item3: number}, callback: (data : string) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple3', tuple, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/Tuple4
         */
        getTuple4(callback: (data : {item1: string, item2: string, item3: string, item4: number}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple4', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/Tuple4
         */
        postTuple4(tuple: {item1: string, item2: string, item3: string, item4: number}, callback: (data : string) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple4', tuple, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/Tuple5
         */
        getTuple5(callback: (data : {item1: string, item2: string, item3: string, item4: string, item5: number}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple5', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/Tuple5
         */
        postTuple5(tuple: {item1: string, item2: string, item3: string, item4: string, item5: number}, callback: (data : string) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple5', tuple, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/Tuple6
         */
        getTuple6(callback: (data : {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple6', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/Tuple6
         */
        postTuple6(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}, callback: (data : string) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple6', tuple, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/Tuple7
         */
        getTuple7(callback: (data : {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple7', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/Tuple7
         */
        postTuple7(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}, callback: (data : string) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple7', tuple, callback, this.error, this.statusCode);
        }

        /**
         * GET api/Tuple/Tuple8
         */
        getTuple8(callback: (data : {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}) => any) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple8', callback, this.error, this.statusCode);
        }

        /**
         * POST api/Tuple/Tuple8
         */
        postTuple8(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: {item1: string, item2: string, item3: string}}, callback: (data : string) => any) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple8', tuple, callback, this.error, this.statusCode);
        }
    }

    export class Values {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }) {
        }

        /**
         * Get a list of value
         * GET api/Values
         */
        get(callback: (data : Array<string>) => any) {
            this.httpClient.get(this.baseUri + 'api/Values', callback, this.error, this.statusCode);
        }

        /**
         * Get by both Id and name
         * GET api/Values/{id}?name={name}
         */
        getByIdAndName(id: number, name: string, callback: (data : string) => any) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id + '?name=' + encodeURIComponent(name), callback, this.error, this.statusCode);
        }

        /**
         * GET api/Values?name={name}
         */
        getByName(name: string, callback: (data : string) => any) {
            this.httpClient.get(this.baseUri + 'api/Values?name=' + encodeURIComponent(name), callback, this.error, this.statusCode);
        }

        /**
         * GET api/Values/{id}
         */
        getById(id: number, callback: (data : string) => any) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode);
        }

        /**
         * POST api/Values
         */
        post(value: string, callback: (data : string) => any) {
            this.httpClient.post(this.baseUri + 'api/Values', value, callback, this.error, this.statusCode);
        }

        /**
         * Update with valjue
         * PUT api/Values/{id}
         */
        put(id: number, value: string, callback: (data : void) => any) {
            this.httpClient.put(this.baseUri + 'api/Values/' + id, value, callback, this.error, this.statusCode);
        }

        /**
         * DELETE api/Values/{id}
         */
        delete(id: number, callback: (data : void) => any) {
            this.httpClient.delete(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode);
        }
    }

}

