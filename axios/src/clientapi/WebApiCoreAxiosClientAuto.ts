import Axios from 'axios';
import { AxiosResponse } from 'axios';
export namespace DemoWebApi_Controllers_Client {

    /**
     * Complex hero type
     */
    export interface Hero {
        id?: number;
        name?: string;
    }

}

export namespace DemoWebApi_DemoData_Client {
    export interface Address {
        city?: string;
        country?: string;
        entity?: DemoWebApi_DemoData_Client.Entity;

        /**
         * Foreign key to Entity
         */
        entityId?: string;
        id?: string;
        postalCode?: string;
        state?: string;
        street1?: string;
        street2?: string;
        type?: DemoWebApi_DemoData_Client.AddressType;

        /**
         * It is a field
         */
        location?: DemoWebApi_DemoData_Another_Client.MyPoint;
    }

    export enum AddressType { Postal, Residential }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {

        /**
         * BusinessNumber to be serialized as BusinessNum
         */
        BusinessNum?: string;
        businessNumberType?: string;
        textMatrix?: Array<Array<string>>;
        int2D?: number[][];
        int2DJagged?: Array<Array<number>>;
        lines?: Array<string>;
    }

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


    /**
     * Base class of company and person
     */
    export interface Entity {

        /**
         * Multiple addresses
         */
        addresses?: Array<DemoWebApi_DemoData_Client.Address>;
        id?: string;

        /**
         * Name of the entity.
         */
        name: string;
        phoneNumbers?: Array<DemoWebApi_DemoData_Client.PhoneNumber>;
        web?: string;
    }

    export interface MimsPackage {
        result?: DemoWebApi_DemoData_Client.MimsResult<number>;
        tag?: string;
    }

    export interface MimsResult<T> {
        generatedAt?: Date;
        message?: string;
        result?: T;
        success?: boolean;
    }

    export interface MyGeneric<T, K, U> {
        myK?: K;
        myT?: T;
        myU?: U;
        status?: string;
    }

    export interface MyPeopleDic {
        anotherDic?: {[id: string]: string };
        dic?: {[id: string]: DemoWebApi_DemoData_Client.Person };
        intDic?: {[id: number]: string };
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {

        /**
         * Date of Birth.
         * This is optional.
         */
        dob?: Date;
        givenName?: string;
        surname?: string;
    }

    export interface PhoneNumber {
        entityId?: string;
        fullNumber?: string;
        id?: string;
        phoneType?: DemoWebApi_DemoData_Client.PhoneType;
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
        confirmPassword?: string;
        newPassword?: string;
        OldPwd: string;
    }

    export interface RegisterBindingModel {
        confirmPassword?: string;
        email?: string;
        password?: string;
    }

    export interface RegisterExternalBindingModel {
        email?: string;
    }

    export interface RemoveLoginBindingModel {
        loginProvider?: string;
        providerKey?: string;
    }

    export interface SetPasswordBindingModel {
        confirmPassword?: string;
        newPassword?: string;
    }

}

export namespace DemoCoreWeb_Controllers_Client {
    export class SpecialTypes {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
        }

        /**
         * GET api/SpecialTypes/AnonymousDynamic
         */
        getAnonymousDynamic(): Promise<AxiosResponse> {
            return Axios.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic', { responseType: 'text' });
        }

        /**
         * GET api/SpecialTypes/AnonymousObject
         */
        getAnonymousObject(): Promise<AxiosResponse> {
            return Axios.get(this.baseUri + 'api/SpecialTypes/AnonymousObject', { responseType: 'text' });
        }

        /**
         * POST api/SpecialTypes/AnonymousObject
         */
        postAnonymousObject(obj: any): Promise<AxiosResponse> {
            return Axios.post(this.baseUri + 'api/SpecialTypes/AnonymousObject', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' });
        }
    }

}

export namespace DemoWebApi_Controllers_Client {
    export class Entities {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
        }

        /**
         * POST api/Entities/createPerson
         */
        createPerson(p: DemoWebApi_DemoData_Client.Person): Promise<number> {
            return Axios.post(this.baseUri + 'api/Entities/createPerson', JSON.stringify(p), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as number);
        }

        /**
         * DELETE api/Entities/{id}
         */
        delete(id: number): Promise<AxiosResponse> {
            return Axios.delete(this.baseUri + 'api/Entities/' + id, { responseType: 'text' });
        }

        /**
         * GET api/Entities/Company/{id}
         */
        getCompany(id: number): Promise<DemoWebApi_DemoData_Client.Company> {
            return Axios.get(this.baseUri + 'api/Entities/Company/' + id).then(d => d.data as DemoWebApi_DemoData_Client.Company);
        }

        /**
         * POST api/Entities/Mims
         */
        getMims(p: DemoWebApi_DemoData_Client.MimsPackage): Promise<DemoWebApi_DemoData_Client.MimsResult<string>> {
            return Axios.post(this.baseUri + 'api/Entities/Mims', JSON.stringify(p), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.MimsResult<string>);
        }

        /**
         * POST api/Entities/MyGeneric
         */
        getMyGeneric(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, number>): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, number>> {
            return Axios.post(this.baseUri + 'api/Entities/MyGeneric', JSON.stringify(s), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.MyGeneric<string, number, number>);
        }

        /**
         * POST api/Entities/MyGenericPerson
         */
        getMyGenericPerson(s: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>): Promise<DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>> {
            return Axios.post(this.baseUri + 'api/Entities/MyGenericPerson', JSON.stringify(s), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person>);
        }

        /**
         * Get a person
         * so to know the person
         * GET api/Entities/getPerson/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        getPerson(id: number): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.get(this.baseUri + 'api/Entities/getPerson/' + id).then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * PUT api/Entities/link?id={id}&relationship={relationship}
         */
        linkPerson(id: number, relationship: string, person: DemoWebApi_DemoData_Client.Person): Promise<boolean> {
            return Axios.put(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + encodeURIComponent(relationship), JSON.stringify(person), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as boolean);
        }

        /**
         * PUT api/Entities/updatePerson
         */
        updatePerson(person: DemoWebApi_DemoData_Client.Person): Promise<AxiosResponse> {
            return Axios.put(this.baseUri + 'api/Entities/updatePerson', JSON.stringify(person), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' });
        }
    }

    export class Heroes {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
        }

        /**
         * DELETE api/Heroes/{id}
         */
        delete(id: number): Promise<AxiosResponse> {
            return Axios.delete(this.baseUri + 'api/Heroes/' + id, { responseType: 'text' });
        }

        /**
         * Get all heroes.
         * GET api/Heroes
         */
        get(): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
            return Axios.get(this.baseUri + 'api/Heroes').then(d => d.data as Array<DemoWebApi_Controllers_Client.Hero>);
        }

        /**
         * Get a hero.
         * GET api/Heroes/{id}
         */
        getById(id: number): Promise<DemoWebApi_Controllers_Client.Hero> {
            return Axios.get(this.baseUri + 'api/Heroes/' + id).then(d => d.data as DemoWebApi_Controllers_Client.Hero);
        }

        /**
         * POST api/Heroes
         */
        post(name: string): Promise<DemoWebApi_Controllers_Client.Hero> {
            return Axios.post(this.baseUri + 'api/Heroes', JSON.stringify(name), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_Controllers_Client.Hero);
        }

        /**
         * Add a hero
         * POST api/Heroes/q?name={name}
         */
        postWithQuery(name: string): Promise<DemoWebApi_Controllers_Client.Hero> {
            return Axios.post(this.baseUri + 'api/Heroes/q?name=' + encodeURIComponent(name), null, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_Controllers_Client.Hero);
        }

        /**
         * Update hero.
         * PUT api/Heroes
         */
        put(hero: DemoWebApi_Controllers_Client.Hero): Promise<DemoWebApi_Controllers_Client.Hero> {
            return Axios.put(this.baseUri + 'api/Heroes', JSON.stringify(hero), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_Controllers_Client.Hero);
        }

        /**
         * Search heroes
         * GET api/Heroes/search/{name}
         * @param {string} name keyword contained in hero name.
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
         */
        search(name: string): Promise<Array<DemoWebApi_Controllers_Client.Hero>> {
            return Axios.get(this.baseUri + 'api/Heroes/search/' + encodeURIComponent(name)).then(d => d.data as Array<DemoWebApi_Controllers_Client.Hero>);
        }
    }

    export class SuperDemo {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
        }

        /**
         * GET api/SuperDemo/ActionResult
         */
        getActionResult(): Promise<AxiosResponse<string>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/ActionResult', { responseType: 'text' }).then(d => d.data as AxiosResponse<string>);
        }

        /**
         * GET api/SuperDemo/ActionStringResult
         */
        getActionStringResult(): Promise<string> {
            return Axios.get(this.baseUri + 'api/SuperDemo/ActionStringResult', { responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * GET api/SuperDemo/bool
         */
        getBool(): Promise<boolean> {
            return Axios.get(this.baseUri + 'api/SuperDemo/bool').then(d => d.data as boolean);
        }

        /**
         * GET api/SuperDemo/byte
         */
        getbyte(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/byte').then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/ByteArray
         */
        getByteArray(): Promise<Array<number>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/ByteArray').then(d => d.data as Array<number>);
        }

        /**
         * GET api/SuperDemo/char
         */
        getChar(): Promise<string> {
            return Axios.get(this.baseUri + 'api/SuperDemo/char').then(d => d.data as string);
        }

        /**
         * GET api/SuperDemo/Collection
         */
        getCollection(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/Collection').then(d => d.data as Array<DemoWebApi_DemoData_Client.Person>);
        }

        /**
         * GET api/SuperDemo/NullableDatetime/{hasValue}
         */
        getDateTime(hasValue: boolean): Promise<Date> {
            return Axios.get(this.baseUri + 'api/SuperDemo/NullableDatetime/' + hasValue).then(d => d.data as Date);
        }

        /**
         * GET api/SuperDemo/DateTimeOffset
         */
        getDateTimeOffset(): Promise<Date> {
            return Axios.get(this.baseUri + 'api/SuperDemo/DateTimeOffset').then(d => d.data as Date);
        }

        /**
         * GET api/SuperDemo/decimal
         */
        getDecimal(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/decimal').then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/decimal/{d}
         */
        getDecimalSquare(d: number): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/decimal/' + d).then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/DecimalZero
         */
        getDecimalZero(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/DecimalZero').then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/StringStringDic
         */
        getDictionary(): Promise<{[id: string]: string }> {
            return Axios.get(this.baseUri + 'api/SuperDemo/StringStringDic').then(d => d.data as {[id: string]: string });
        }

        /**
         * GET api/SuperDemo/StringPersonDic
         */
        getDictionaryOfPeople(): Promise<{[id: string]: DemoWebApi_DemoData_Client.Person }> {
            return Axios.get(this.baseUri + 'api/SuperDemo/StringPersonDic').then(d => d.data as {[id: string]: DemoWebApi_DemoData_Client.Person });
        }

        /**
         * GET api/SuperDemo/doulbe
         */
        getdouble(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/doulbe').then(d => d.data as number);
        }

        /**
         * Result of 0.1d + 0.2d - 0.3d
         * GET api/SuperDemo/DoubleZero
         */
        getDoubleZero(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/DoubleZero').then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/EmptyString
         */
        getEmptyString(): Promise<string> {
            return Axios.get(this.baseUri + 'api/SuperDemo/EmptyString', { responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * GET api/SuperDemo/FloatZero
         */
        getFloatZero(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/FloatZero').then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/ICollection
         */
        getICollection(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/ICollection').then(d => d.data as Array<DemoWebApi_DemoData_Client.Person>);
        }

        /**
         * GET api/SuperDemo/IList
         */
        getIList(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/IList').then(d => d.data as Array<DemoWebApi_DemoData_Client.Person>);
        }

        /**
         * GET api/SuperDemo/int2d
         */
        getInt2D(): Promise<number[][]> {
            return Axios.get(this.baseUri + 'api/SuperDemo/int2d').then(d => d.data as number[][]);
        }

        /**
         * GET api/SuperDemo/int2dJagged
         */
        getInt2DJagged(): Promise<Array<Array<number>>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/int2dJagged').then(d => d.data as Array<Array<number>>);
        }

        /**
         * GET api/SuperDemo/intArray
         */
        getIntArray(): Promise<Array<number>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/intArray').then(d => d.data as Array<number>);
        }

        /**
         * GET api/SuperDemo/int/{d}
         */
        getIntSquare(d: number): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/int/' + d).then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/IReadOnlyCollection
         */
        getIReadOnlyCollection(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection').then(d => d.data as Array<DemoWebApi_DemoData_Client.Person>);
        }

        /**
         * GET api/SuperDemo/IReadOnlyList
         */
        getIReadOnlyList(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/IReadOnlyList').then(d => d.data as Array<DemoWebApi_DemoData_Client.Person>);
        }

        /**
         * GET api/SuperDemo/KeyValuePair
         */
        getKeyhValuePair(): Promise<{key: string, value: DemoWebApi_DemoData_Client.Person }> {
            return Axios.get(this.baseUri + 'api/SuperDemo/KeyValuePair').then(d => d.data as {key: string, value: DemoWebApi_DemoData_Client.Person });
        }

        /**
         * GET api/SuperDemo/List
         */
        getList(): Promise<Array<DemoWebApi_DemoData_Client.Person>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/List').then(d => d.data as Array<DemoWebApi_DemoData_Client.Person>);
        }

        /**
         * GET api/SuperDemo/NextHour/{dt}
         */
        getNextHour(dt: Date): Promise<Date> {
            return Axios.get(this.baseUri + 'api/SuperDemo/NextHour/' + dt.toISOString()).then(d => d.data as Date);
        }

        /**
         * GET api/SuperDemo/NextHourNullable?n={n}&dt={dt}
         */
        getNextHourNullable(n: number, dt: Date): Promise<Date> {
            return Axios.get(this.baseUri + 'api/SuperDemo/NextHourNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : '')).then(d => d.data as Date);
        }

        /**
         * GET api/SuperDemo/NextYear/{dt}
         */
        getNextYear(dt: Date): Promise<Date> {
            return Axios.get(this.baseUri + 'api/SuperDemo/NextYear/' + dt.toISOString()).then(d => d.data as Date);
        }

        /**
         * GET api/SuperDemo/NextYearNullable?n={n}&dt={dt}
         */
        getNextYearNullable(n: number, dt: Date): Promise<Date> {
            return Axios.get(this.baseUri + 'api/SuperDemo/NextYearNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : '')).then(d => d.data as Date);
        }

        /**
         * GET api/SuperDemo/NullableDecimal/{hasValue}
         */
        getNullableDecimal(hasValue: boolean): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue).then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/NullObject
         */
        getNullPerson(): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.get(this.baseUri + 'api/SuperDemo/NullObject').then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * GET api/SuperDemo/NullString
         */
        getNullString(): Promise<string> {
            return Axios.get(this.baseUri + 'api/SuperDemo/NullString', { responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
         */
        getPrimitiveNullable(location: string, dd: number, de: number): Promise<{item1: string, item2: number, item3: number}> {
            return Axios.get(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + encodeURIComponent(location) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : '')).then(d => d.data as {item1: string, item2: number, item3: number});
        }

        /**
         * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
         */
        getPrimitiveNullable2(dd: number, de: number): Promise<{item1: number, item2: number}> {
            return Axios.get(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : '')).then(d => d.data as {item1: number, item2: number});
        }

        /**
         * GET api/SuperDemo/sbyte
         */
        getsbyte(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/sbyte').then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/short
         */
        getShort(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/short').then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/TextStream
         */
        getTextStream(): Promise<AxiosResponse<Blob>> {
            return Axios.get(this.baseUri + 'api/SuperDemo/TextStream', { responseType: 'blob' }).then(d => d.data as AxiosResponse<Blob>);
        }

        /**
         * GET api/SuperDemo/uint
         */
        getUint(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/uint').then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/ulong
         */
        getulong(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/ulong').then(d => d.data as number);
        }

        /**
         * GET api/SuperDemo/ushort
         */
        getUShort(): Promise<number> {
            return Axios.get(this.baseUri + 'api/SuperDemo/ushort').then(d => d.data as number);
        }

        /**
         * POST api/SuperDemo/ActionResult
         */
        postActionResult(): Promise<AxiosResponse<string>> {
            return Axios.post(this.baseUri + 'api/SuperDemo/ActionResult', null, { responseType: 'text' }).then(d => d.data as AxiosResponse<string>);
        }

        /**
         * POST api/SuperDemo/PostActionResult2
         */
        postActionResult2(s: string): Promise<AxiosResponse<string>> {
            return Axios.post(this.baseUri + 'api/SuperDemo/PostActionResult2', JSON.stringify(s), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as AxiosResponse<string>);
        }

        /**
         * POST api/SuperDemo/PostActionResult3
         */
        postActionResult3(person: DemoWebApi_DemoData_Client.Person): Promise<AxiosResponse<string>> {
            return Axios.post(this.baseUri + 'api/SuperDemo/PostActionResult3', JSON.stringify(person), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as AxiosResponse<string>);
        }

        /**
         * POST api/SuperDemo/Collection
         */
        postCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return Axios.post(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as number);
        }

        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         */
        postDateTimeOffset(d: Date): Promise<boolean> {
            return Axios.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', JSON.stringify(d), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as boolean);
        }

        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         */
        postDateTimeOffsetNullable(d: Date): Promise<boolean> {
            return Axios.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', JSON.stringify(d), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as boolean);
        }

        /**
         * POST api/SuperDemo/StringPersonDic
         */
        postDictionary(dic: {[id: string]: DemoWebApi_DemoData_Client.Person }): Promise<number> {
            return Axios.post(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as number);
        }

        /**
         * POST api/SuperDemo/ICollection
         */
        postICollection(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return Axios.post(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as number);
        }

        /**
         * POST api/SuperDemo/IList
         */
        postIList(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return Axios.post(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as number);
        }

        /**
         * POST api/SuperDemo/int2d
         */
        postInt2D(a: number[][]): Promise<boolean> {
            return Axios.post(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as boolean);
        }

        /**
         * POST api/SuperDemo/int2djagged
         */
        postInt2DJagged(a: Array<Array<number>>): Promise<boolean> {
            return Axios.post(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as boolean);
        }

        /**
         * POST api/SuperDemo/intArray
         */
        postIntArray(a: Array<number>): Promise<boolean> {
            return Axios.post(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as boolean);
        }

        /**
         * POST api/SuperDemo/IReadOnlyCollection
         */
        postIReadOnlyCollection(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return Axios.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as number);
        }

        /**
         * POST api/SuperDemo/IReadOnlyList
         */
        postIReadOnlyList(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return Axios.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as number);
        }

        /**
         * POST api/SuperDemo/List
         */
        postList(list: Array<DemoWebApi_DemoData_Client.Person>): Promise<number> {
            return Axios.post(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as number);
        }

        /**
         * POST api/SuperDemo/NextYear
         */
        postNextYear(dt: Date): Promise<Date> {
            return Axios.post(this.baseUri + 'api/SuperDemo/NextYear', JSON.stringify(dt), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as Date);
        }

        /**
         * POST api/SuperDemo/PostEmpty/{i}
         */
        postWithQueryButEmptyBody(s: string, i: number): Promise<{item1: string, item2: number}> {
            return Axios.post(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, JSON.stringify(s), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as {item1: string, item2: number});
        }

        /**
         * GET api/SuperDemo/SearchDateRange?startDate={startDate}&endDate={endDate}
         */
        searchDateRange(startDate: Date, endDate: Date): Promise<{item1: Date, item2: Date}> {
            return Axios.get(this.baseUri + 'api/SuperDemo/SearchDateRange?' + (startDate ? 'startDate=' + startDate.toISOString() : '') + (endDate ? '&endDate=' + endDate.toISOString() : '')).then(d => d.data as {item1: Date, item2: Date});
        }
    }

    export class Tuple {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
        }

        /**
         * GET api/Tuple/PeopleCompany4
         */
        getPeopleCompany4(): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}> {
            return Axios.get(this.baseUri + 'api/Tuple/PeopleCompany4').then(d => d.data as {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company});
        }

        /**
         * GET api/Tuple/PeopleCompany5
         */
        getPeopleCompany5(): Promise<{item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}> {
            return Axios.get(this.baseUri + 'api/Tuple/PeopleCompany5').then(d => d.data as {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company});
        }

        /**
         * GET api/Tuple/Tuple1
         */
        getTuple1(): Promise<{item1: number}> {
            return Axios.get(this.baseUri + 'api/Tuple/Tuple1').then(d => d.data as {item1: number});
        }

        /**
         * GET api/Tuple/Tuple2
         */
        getTuple2(): Promise<{item1: string, item2: number}> {
            return Axios.get(this.baseUri + 'api/Tuple/Tuple2').then(d => d.data as {item1: string, item2: number});
        }

        /**
         * GET api/Tuple/Tuple3
         */
        getTuple3(): Promise<{item1: string, item2: string, item3: number}> {
            return Axios.get(this.baseUri + 'api/Tuple/Tuple3').then(d => d.data as {item1: string, item2: string, item3: number});
        }

        /**
         * GET api/Tuple/Tuple4
         */
        getTuple4(): Promise<{item1: string, item2: string, item3: string, item4: number}> {
            return Axios.get(this.baseUri + 'api/Tuple/Tuple4').then(d => d.data as {item1: string, item2: string, item3: string, item4: number});
        }

        /**
         * GET api/Tuple/Tuple5
         */
        getTuple5(): Promise<{item1: string, item2: string, item3: string, item4: string, item5: number}> {
            return Axios.get(this.baseUri + 'api/Tuple/Tuple5').then(d => d.data as {item1: string, item2: string, item3: string, item4: string, item5: number});
        }

        /**
         * GET api/Tuple/Tuple6
         */
        getTuple6(): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}> {
            return Axios.get(this.baseUri + 'api/Tuple/Tuple6').then(d => d.data as {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number});
        }

        /**
         * GET api/Tuple/Tuple7
         */
        getTuple7(): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}> {
            return Axios.get(this.baseUri + 'api/Tuple/Tuple7').then(d => d.data as {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number});
        }

        /**
         * GET api/Tuple/Tuple8
         */
        getTuple8(): Promise<{item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}}> {
            return Axios.get(this.baseUri + 'api/Tuple/Tuple8').then(d => d.data as {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: number, rest: {item1: string, item2: string, item3: string}});
        }

        /**
         * POST api/Tuple/PeopleCompany2
         */
        linkPeopleCompany2(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.post(this.baseUri + 'api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * POST api/Tuple/PeopleCompany3
         */
        linkPeopleCompany3(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.post(this.baseUri + 'api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * POST api/Tuple/PeopleCompany4
         */
        linkPeopleCompany4(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.post(this.baseUri + 'api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * POST api/Tuple/PeopleCompany5
         */
        linkPeopleCompany5(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.post(this.baseUri + 'api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * POST api/Tuple/PeopleCompany6
         */
        linkPeopleCompany6(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.post(this.baseUri + 'api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * POST api/Tuple/PeopleCompany7
         */
        linkPeopleCompany7(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.post(this.baseUri + 'api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * POST api/Tuple/PeopleCompany8
         */
        linkPeopleCompany8(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Person, item3: DemoWebApi_DemoData_Client.Person, item4: DemoWebApi_DemoData_Client.Person, item5: DemoWebApi_DemoData_Client.Person, item6: DemoWebApi_DemoData_Client.Person, item7: DemoWebApi_DemoData_Client.Person, rest: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.post(this.baseUri + 'api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * POST api/Tuple/PersonCompany1
         */
        linkPersonCompany1(peopleAndCompany: {item1: DemoWebApi_DemoData_Client.Person, item2: DemoWebApi_DemoData_Client.Company}): Promise<DemoWebApi_DemoData_Client.Person> {
            return Axios.post(this.baseUri + 'api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as DemoWebApi_DemoData_Client.Person);
        }

        /**
         * POST api/Tuple/Tuple1
         */
        postTuple1(tuple: {item1: number}): Promise<number> {
            return Axios.post(this.baseUri + 'api/Tuple/Tuple1', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(d => d.data as number);
        }

        /**
         * POST api/Tuple/Tuple2
         */
        postTuple2(tuple: {item1: string, item2: number}): Promise<string> {
            return Axios.post(this.baseUri + 'api/Tuple/Tuple2', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * POST api/Tuple/Tuple3
         */
        postTuple3(tuple: {item1: string, item2: string, item3: number}): Promise<string> {
            return Axios.post(this.baseUri + 'api/Tuple/Tuple3', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * POST api/Tuple/Tuple4
         */
        postTuple4(tuple: {item1: string, item2: string, item3: string, item4: number}): Promise<string> {
            return Axios.post(this.baseUri + 'api/Tuple/Tuple4', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * POST api/Tuple/Tuple5
         */
        postTuple5(tuple: {item1: string, item2: string, item3: string, item4: string, item5: number}): Promise<string> {
            return Axios.post(this.baseUri + 'api/Tuple/Tuple5', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * POST api/Tuple/Tuple6
         */
        postTuple6(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number}): Promise<string> {
            return Axios.post(this.baseUri + 'api/Tuple/Tuple6', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * POST api/Tuple/Tuple7
         */
        postTuple7(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: number, item7: number}): Promise<string> {
            return Axios.post(this.baseUri + 'api/Tuple/Tuple7', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * POST api/Tuple/Tuple8
         */
        postTuple8(tuple: {item1: string, item2: string, item3: string, item4: string, item5: string, item6: string, item7: string, rest: {item1: string, item2: string, item3: string}}): Promise<string> {
            return Axios.post(this.baseUri + 'api/Tuple/Tuple8', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as string);
        }
    }

    export class Values {
        constructor(private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/') {
        }

        /**
         * DELETE api/Values/{id}
         */
        delete(id: number): Promise<AxiosResponse> {
            return Axios.delete(this.baseUri + 'api/Values/' + id, { responseType: 'text' });
        }

        /**
         * Get a list of value
         * GET api/Values
         */
        get(): Promise<Array<string>> {
            return Axios.get(this.baseUri + 'api/Values').then(d => d.data as Array<string>);
        }

        /**
         * Get by both Id and name
         * GET api/Values/{id}?name={name}
         */
        getByIdAndName(id: number, name: string): Promise<string> {
            return Axios.get(this.baseUri + 'api/Values/' + id + '?name=' + encodeURIComponent(name), { responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * GET api/Values?name={name}
         */
        getByName(name: string): Promise<string> {
            return Axios.get(this.baseUri + 'api/Values?name=' + encodeURIComponent(name), { responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * GET api/Values/{id}
         */
        getById(id: number): Promise<string> {
            return Axios.get(this.baseUri + 'api/Values/' + id, { responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * POST api/Values
         */
        post(value: string): Promise<string> {
            return Axios.post(this.baseUri + 'api/Values', JSON.stringify(value), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(d => d.data as string);
        }

        /**
         * Update with valjue
         * PUT api/Values/{id}
         */
        put(id: number, value: string): Promise<AxiosResponse> {
            return Axios.put(this.baseUri + 'api/Values/' + id, JSON.stringify(value), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' });
        }
    }

}

