///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="HttpClient.ts" />
var DemoWebApi_DemoData_Client;
(function (DemoWebApi_DemoData_Client) {
    let AddressType;
    (function (AddressType) {
        AddressType[AddressType["Postal"] = 0] = "Postal";
        AddressType[AddressType["Residential"] = 1] = "Residential";
    })(AddressType = DemoWebApi_DemoData_Client.AddressType || (DemoWebApi_DemoData_Client.AddressType = {}));
    let Days;
    (function (Days) {
        Days[Days["Sat"] = 1] = "Sat";
        Days[Days["Sun"] = 2] = "Sun";
        Days[Days["Mon"] = 3] = "Mon";
        Days[Days["Tue"] = 4] = "Tue";
        Days[Days["Wed"] = 5] = "Wed";
        /**
         * Thursday
         */
        Days[Days["Thu"] = 6] = "Thu";
        Days[Days["Fri"] = 7] = "Fri";
    })(Days = DemoWebApi_DemoData_Client.Days || (DemoWebApi_DemoData_Client.Days = {}));
    /**
     * Phone type
     * Tel, Mobile, Skyp and Fax
     */
    let PhoneType;
    (function (PhoneType) {
        /**
         * Land line
         */
        PhoneType[PhoneType["Tel"] = 0] = "Tel";
        /**
         * Mobile phone
         */
        PhoneType[PhoneType["Mobile"] = 1] = "Mobile";
        PhoneType[PhoneType["Skype"] = 2] = "Skype";
        PhoneType[PhoneType["Fax"] = 3] = "Fax";
    })(PhoneType = DemoWebApi_DemoData_Client.PhoneType || (DemoWebApi_DemoData_Client.PhoneType = {}));
})(DemoWebApi_DemoData_Client || (DemoWebApi_DemoData_Client = {}));
var DemoCoreWeb_Controllers_Client;
(function (DemoCoreWeb_Controllers_Client) {
    class SpecialTypes {
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * Anonymous Dynamic of C#
         * GET api/SpecialTypes/AnonymousDynamic
         * @return {any} dyanmic things
         */
        getAnonymousDynamic(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SpecialTypes/AnonymousDynamic2
         */
        getAnonymousDynamic2(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic2', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SpecialTypes/AnonymousObject
         */
        getAnonymousObject(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousObject', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SpecialTypes/AnonymousObject2
         */
        getAnonymousObject2(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SpecialTypes/AnonymousObject2', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/SpecialTypes/AnonymousObject
         */
        postAnonymousObject(obj, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SpecialTypes/AnonymousObject', obj, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SpecialTypes/AnonymousObject2
         */
        postAnonymousObject2(obj, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SpecialTypes/AnonymousObject2', obj, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    DemoCoreWeb_Controllers_Client.SpecialTypes = SpecialTypes;
})(DemoCoreWeb_Controllers_Client || (DemoCoreWeb_Controllers_Client = {}));
var DemoWebApi_Controllers_Client;
(function (DemoWebApi_Controllers_Client) {
    class Entities {
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * POST api/Entities/createPerson
         */
        createPerson(p, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPerson', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Entities/createPerson2
         */
        createPerson2(p, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPerson2', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Entities/createPerson3
         */
        createPerson3(p, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPerson3', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * DELETE api/Entities/{id}
         */
        delete(id, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Entities/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Entities/Company/{id}
         */
        getCompany(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Entities/Company/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/Entities/Mims
         */
        getMims(p, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/Mims', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Entities/MyGeneric
         */
        getMyGeneric(s, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGeneric', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Entities/MyGenericPerson
         */
        getMyGenericPerson(s, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGenericPerson', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Get a person
         * so to know the person
         * GET api/Entities/getPerson/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        getPerson(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Entities/getPerson/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Entities/getPerson2/{id}
         */
        getPerson2(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Entities/getPerson2/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * PUT api/Entities/link?id={id}&relationship={relationship}
         */
        linkPerson(id, relationship, person, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + (relationship == null ? '' : encodeURIComponent(relationship)), person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * PATCH api/Entities/patchPerson
         */
        patchPerson(person, callback, headersHandler) {
            this.httpClient.patch(this.baseUri + 'api/Entities/patchPerson', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * PUT api/Entities/updatePerson
         */
        updatePerson(person, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Entities/updatePerson', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.Entities = Entities;
    class Heroes {
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * DELETE api/Heroes/{id}
         */
        delete(id, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Heroes/asyncHeroes
         */
        getAsyncHeroes(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Heroes/asyncHeroes', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get a hero.
         * GET api/Heroes/{id}
         */
        getHero(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get all heroes.
         * GET api/Heroes
         */
        getHeros(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Heroes', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/Heroes
         */
        post(name, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Heroes', name, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Add a hero
         * POST api/Heroes/q?name={name}
         */
        postWithQuery(name, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Heroes/q?name=' + (name == null ? '' : encodeURIComponent(name)), null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Update hero.
         * PUT api/Heroes
         */
        put(hero, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Heroes', hero, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Search heroes
         * GET api/Heroes/search/{name}
         * @param {string} name keyword contained in hero name.
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
         */
        search(name, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Heroes/search/' + (name == null ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode, headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.Heroes = Heroes;
    class SuperDemo {
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * GET api/SuperDemo/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
         */
        athletheSearch(take, skip, order, sort, search, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (order == null ? '' : encodeURIComponent(order)) + '&sort=' + (sort == null ? '' : encodeURIComponent(sort)) + '&search=' + (search == null ? '' : encodeURIComponent(search)), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/ActionResult
         */
        getActionResult(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/ActionResult2
         */
        getActionResult2(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult2', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/ActionStringResult
         */
        getActionStringResult(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionStringResult', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/bool
         */
        getBool(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/bool', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/byte
         */
        getbyte(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/byte', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/ByteArray
         */
        getByteArray(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ByteArray', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/char
         */
        getChar(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/char', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/Collection
         */
        getCollection(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/Collection', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/NullableDatetime/{hasValue}
         */
        getDateTime(hasValue, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDatetime/' + hasValue, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/DateTimeOffset
         */
        getDateTimeOffset(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DateTimeOffset', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/enumGet?d={d}
         */
        getDay(d, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/enumGet?d=' + d, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/decimal
         */
        getDecimal(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/decimalArrayQ?a={a}
         */
        getDecimalArrayQ(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimalArrayQ?' + a.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/decimal/{d}
         */
        getDecimalSquare(d, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal/' + d, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/DecimalZero
         */
        getDecimalZero(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DecimalZero', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/StringStringDic
         */
        getDictionary(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringStringDic', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/StringPersonDic
         */
        getDictionaryOfPeople(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/doulbe
         */
        getdouble(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/doulbe', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Result of 0.1d + 0.2d - 0.3d
         * GET api/SuperDemo/DoubleZero
         */
        getDoubleZero(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleZero', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/EmptyString
         */
        getEmptyString(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/EmptyString', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/enumArrayDays?a={a}
         */
        getEnumArrayDays(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/enumArrayDays?' + a.map(z => `a=${z}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/enumArrayQ2?a={a}
         */
        getEnumArrayQ2(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/enumArrayQ2?' + a.map(z => `a=${z}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/FloatZero
         */
        getFloatZero(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/FloatZero', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/ICollection
         */
        getICollection(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ICollection', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/IList
         */
        getIList(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IList', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/int2d
         */
        getInt2D(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2d', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/int2dJagged
         */
        getInt2DJagged(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2dJagged', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/intArray
         */
        getIntArray(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArray', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/intArrayQ?a={a}
         */
        getIntArrayQ(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArrayQ?' + a.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/intArrayQ2?a={a}
         */
        getIntArrayQ2(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArrayQ2?' + a.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/int/{d}
         */
        getIntSquare(d, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int/' + d, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/IReadOnlyCollection
         */
        getIReadOnlyCollection(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/IReadOnlyList
         */
        getIReadOnlyList(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyList', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/KeyValuePair
         */
        getKeyhValuePair(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/KeyValuePair', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/List
         */
        getList(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/List', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/NextHour/{dt}
         */
        getNextHour(dt, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHour/' + dt.toISOString(), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/NextHourNullable?n={n}&dt={dt}
         */
        getNextHourNullable(n, dt, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHourNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/NextYear/{dt}
         */
        getNextYear(dt, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYear/' + dt.toISOString(), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/NextYearNullable?n={n}&dt={dt}
         */
        getNextYearNullable(n, dt, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYearNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/NullableDecimal/{hasValue}
         */
        getNullableDecimal(hasValue, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/NullObject
         */
        getNullPerson(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullObject', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/NullString
         */
        getNullString(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullString', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
         */
        getPrimitiveNullable(location, dd, de, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + (location == null ? '' : encodeURIComponent(location)) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
         */
        getPrimitiveNullable2(dd, de, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/sbyte
         */
        getsbyte(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/sbyte', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/short
         */
        getShort(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/short', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/stringArrayQ?a={a}
         */
        getStringArrayQ(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/stringArrayQ?' + a.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/stringArrayQ2?a={a}
         */
        getStringArrayQ2(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/stringArrayQ2?' + a.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/TextStream
         */
        getTextStream(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/TextStream', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/uint
         */
        getUint(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/uint', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/ulong
         */
        getulong(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ulong', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/ushort
         */
        getUShort(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ushort', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/SuperDemo/ActionResult
         */
        postActionResult(callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ActionResult', null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/PostActionResult2
         */
        postActionResult2(s, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostActionResult2', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/PostActionResult3
         */
        postActionResult3(person, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostActionResult3', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/Collection
         */
        postCollection(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Collection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         */
        postDateTimeOffset(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         */
        postDateTimeOffsetNullable(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/enumPost?d={d}
         */
        postDay(d, d2, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/enumPost?d=' + d, d2, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/StringPersonDic
         */
        postDictionary(dic, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/StringPersonDic', dic, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/Guids
         */
        postGuids(guids, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Guids', guids, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/ICollection
         */
        postICollection(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ICollection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/IList
         */
        postIList(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IList', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/int2d
         */
        postInt2D(a, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2d', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/int2djagged
         */
        postInt2DJagged(a, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2djagged', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/intArray
         */
        postIntArray(a, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/intArray', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/IReadOnlyCollection
         */
        postIReadOnlyCollection(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/IReadOnlyList
         */
        postIReadOnlyList(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/List
         */
        postList(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/List', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/NextYear
         */
        postNextYear(dt, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/NextYear', dt, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/PostEmpty/{i}
         */
        postWithQueryButEmptyBody(s, i, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * GET api/SuperDemo/SearchDateRange?startDate={startDate}&endDate={endDate}
         */
        searchDateRange(startDate, endDate, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/SearchDateRange?' + (startDate ? 'startDate=' + startDate.toISOString() : '') + (endDate ? '&endDate=' + endDate.toISOString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.SuperDemo = SuperDemo;
    class Tuple {
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * POST api/Tuple/ChangeName
         */
        changeName(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/ChangeName', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * GET api/Tuple/PeopleCompany4
         */
        getPeopleCompany4(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany4', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tuple/PeopleCompany5
         */
        getPeopleCompany5(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany5', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tuple/Tuple1
         */
        getTuple1(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple1', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tuple/Tuple2
         */
        getTuple2(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple2', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tuple/Tuple3
         */
        getTuple3(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple3', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tuple/Tuple4
         */
        getTuple4(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple4', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tuple/Tuple5
         */
        getTuple5(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple5', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tuple/Tuple6
         */
        getTuple6(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple6', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tuple/Tuple7
         */
        getTuple7(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple7', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tuple/Tuple8
         */
        getTuple8(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple8', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/Tuple/PeopleCompany2
         */
        linkPeopleCompany2(peopleAndCompany, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany2', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/PeopleCompany3
         */
        linkPeopleCompany3(peopleAndCompany, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany3', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/PeopleCompany4
         */
        linkPeopleCompany4(peopleAndCompany, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany4', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/PeopleCompany5
         */
        linkPeopleCompany5(peopleAndCompany, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany5', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/PeopleCompany6
         */
        linkPeopleCompany6(peopleAndCompany, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany6', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/PeopleCompany7
         */
        linkPeopleCompany7(peopleAndCompany, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany7', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/PeopleCompany8
         */
        linkPeopleCompany8(peopleAndCompany, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany8', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/PersonCompany1
         */
        linkPersonCompany1(peopleAndCompany, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PersonCompany1', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/Tuple1
         */
        postTuple1(tuple, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple1', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/Tuple2
         */
        postTuple2(tuple, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple2', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/Tuple3
         */
        postTuple3(tuple, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple3', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/Tuple4
         */
        postTuple4(tuple, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple4', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/Tuple5
         */
        postTuple5(tuple, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple5', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/Tuple6
         */
        postTuple6(tuple, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple6', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/Tuple7
         */
        postTuple7(tuple, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple7', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Tuple/Tuple8
         */
        postTuple8(tuple, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple8', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.Tuple = Tuple;
    class Values {
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * DELETE api/Values/{id}
         */
        delete(id, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get a list of value
         * GET api/Values
         */
        get(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Values', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get by both Id and name
         * GET api/Values/{id}?name={name}
         */
        getByIdAndName(id, name, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id + '?name=' + (name == null ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Values?name={name}
         */
        getByName(name, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Values?name=' + (name == null ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Values/{id}
         */
        getById(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Values/Get2
         */
        get2(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Values/Get2', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/Values
         */
        post(value, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Values', value, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Update with valjue
         * PUT api/Values/{id}
         */
        put(id, value, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Values/' + id, value, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.Values = Values;
})(DemoWebApi_Controllers_Client || (DemoWebApi_Controllers_Client = {}));
