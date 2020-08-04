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
        createPerson(p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPerson', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * DELETE api/Entities/{id}
         */
        delete(id, callback) {
            this.httpClient.delete(this.baseUri + 'api/Entities/' + id, callback, this.error, this.statusCode);
        }
        /**
         * GET api/Entities/Company?id={id}
         */
        getCompany(id, callback) {
            this.httpClient.get(this.baseUri + 'api/Entities/Company?id=' + id, callback, this.error, this.statusCode);
        }
        /**
         * POST api/Entities/Mims
         */
        getMims(p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/Mims', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Entities/MyGeneric
         */
        getMyGeneric(s, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGeneric', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Entities/MyGenericPerson
         */
        getMyGenericPerson(s, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGenericPerson', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * Get a person
         * so to know the person
         * GET api/Entities/getPerson?id={id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        getPerson(id, callback) {
            this.httpClient.get(this.baseUri + 'api/Entities/getPerson?id=' + id, callback, this.error, this.statusCode);
        }
        /**
         * GET api/Entities/PersonActionNotFound?id={id}
         */
        getPersonActionNotFound(id, callback) {
            this.httpClient.get(this.baseUri + 'api/Entities/PersonActionNotFound?id=' + id, callback, this.error, this.statusCode);
        }
        /**
         * GET api/Entities/PersonNotFound?id={id}
         */
        getPersonNotFound(id, callback) {
            this.httpClient.get(this.baseUri + 'api/Entities/PersonNotFound?id=' + id, callback, this.error, this.statusCode);
        }
        /**
         * PUT api/Entities/link?id={id}&relationship={relationship}
         */
        linkPerson(id, relationship, person, callback) {
            this.httpClient.put(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + (relationship == null ? '' : encodeURIComponent(relationship)), person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Entities/linkNewDecimal?id={id}
         */
        linkWithNewDecimal(id, p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/linkNewDecimal?id=' + id, p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Entities/linkNewGuid?id={id}
         */
        linkWithNewGuid(id, p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/linkNewGuid?id=' + id, p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Entities/linkLong?id={id}
         */
        linkWithNewLong(id, p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/linkLong?id=' + id, p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * PUT api/Entities/updatePerson
         */
        updatePerson(person, callback) {
            this.httpClient.put(this.baseUri + 'api/Entities/updatePerson', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
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
        delete(id, callback) {
            this.httpClient.delete(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode);
        }
        /**
         * Get a hero.
         * GET api/Heroes/{id}
         */
        getHero(id, callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode);
        }
        /**
         * Get all heroes.
         * GET api/Heroes
         */
        getHeros(callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes', callback, this.error, this.statusCode);
        }
        /**
         * This should triger error: System.ArgumentException: Web API Heroes/GetSomethingInvalid is defined with invalid parameters: Not support ParameterBinder FromQuery or FromUri with a class parameter.
         * GET api/Heroes/invalid
         */
        getSomethingInvalid(h, callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes/invalid', callback, this.error, this.statusCode);
        }
        /**
         * POST api/Heroes?name={name}
         */
        post(name, callback) {
            this.httpClient.post(this.baseUri + 'api/Heroes?name=' + (name == null ? '' : encodeURIComponent(name)), null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * Add a hero
         * POST api/Heroes/q?name={name}
         */
        postWithQuery(name, callback) {
            this.httpClient.post(this.baseUri + 'api/Heroes/q?name=' + (name == null ? '' : encodeURIComponent(name)), null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * Update hero.
         * PUT api/Heroes
         */
        put(hero, callback) {
            this.httpClient.put(this.baseUri + 'api/Heroes', hero, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * Search heroes
         * GET api/Heroes/search?name={name}
         * @param {string} name keyword contained in hero name.
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
         */
        search(name, callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes/search?name=' + (name == null ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode);
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
         * GET api/SuperDemo/ActionResult
         */
        getActionResult(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/ActionResult2
         */
        getActionResult2(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult2', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/ActionStringResult
         */
        getActionStringResult(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionStringResult', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/AnonymousDynamic
         */
        getAnonymousDynamic(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AnonymousDynamic', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/AnonymousDynamic2
         */
        getAnonymousDynamic2(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AnonymousDynamic2', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/AnonymousObject
         */
        getAnonymousObject(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AnonymousObject', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/bool
         */
        getBool(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/bool', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/byte
         */
        getbyte(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/byte', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/ByteArray
         */
        getByteArray(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ByteArray', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/char
         */
        getChar(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/char', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/Collection
         */
        getCollection(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/Collection', callback, this.error, this.statusCode);
        }
        /**
         * True to return now, false to return null
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         */
        getDateTime(hasValue, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue=' + hasValue, callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/DateTimeOffset
         */
        getDateTimeOffset(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DateTimeOffset', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/decimal
         */
        getDecimal(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/decimal?d={d}
         */
        getDecimalSquare(d, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal?d=' + d, callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/DecimalZero
         */
        getDecimalZero(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DecimalZero', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/StringStringDic
         */
        getDictionary(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringStringDic', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/StringPersonDic
         */
        getDictionaryOfPeople(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/doulbe
         */
        getdouble(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/doulbe', callback, this.error, this.statusCode);
        }
        /**
         * Result of 0.1d + 0.2d - 0.3d
         * GET api/SuperDemo/DoubleZero
         */
        getDoubleZero(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleZero', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/EmptyString
         */
        getEmptyString(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/EmptyString', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/FloatZero
         */
        getFloatZero(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/FloatZero', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/ICollection
         */
        getICollection(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ICollection', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/IList
         */
        getIList(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IList', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/int2d
         */
        getInt2D(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2d', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/int2dJagged
         */
        getInt2DJagged(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2dJagged', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/intArray
         */
        getIntArray(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArray', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/int?d={d}
         */
        getIntSquare(d, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int?d=' + d, callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/IReadOnlyCollection
         */
        getIReadOnlyCollection(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/IReadOnlyList
         */
        getIReadOnlyList(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyList', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/KeyValuePair
         */
        getKeyhValuePair(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/KeyValuePair', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/List
         */
        getList(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/List', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/NextHour?dt={dt}
         */
        getNextHour(dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHour?dt=' + dt.toISOString(), callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/NextHourNullable?n={n}&dt={dt}
         */
        getNextHourNullable(n, dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHourNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/NextYear?dt={dt}
         */
        getNextYear(dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYear?dt=' + dt.toISOString(), callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/NextYearNullable?n={n}&dt={dt}
         */
        getNextYearNullable(n, dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYearNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), callback, this.error, this.statusCode);
        }
        /**
         * True to return 100, and false to return null
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         */
        getNullableDecimal(hasValue, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue=' + hasValue, callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/NullObject
         */
        getNullPerson(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullObject', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/NullString
         */
        getNullString(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullString', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
         */
        getPrimitiveNullable(location, dd, de, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + (location == null ? '' : encodeURIComponent(location)) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
         */
        getPrimitiveNullable2(dd, de, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/sbyte
         */
        getsbyte(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/sbyte', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/short
         */
        getShort(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/short', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/TextStream
         */
        getTextStream(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/TextStream', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/uint
         */
        getUint(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/uint', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/ulong
         */
        getulong(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ulong', callback, this.error, this.statusCode);
        }
        /**
         * GET api/SuperDemo/ushort
         */
        getUShort(callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ushort', callback, this.error, this.statusCode);
        }
        /**
         * POST api/SuperDemo/ActionResult
         */
        postActionResult(callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ActionResult', null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/PostActionResult2
         */
        postActionResult2(s, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostActionResult2', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/PostActionResult3
         */
        postActionResult3(person, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostActionResult3', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/AnonymousObject
         */
        postAnonymousObject(obj, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/AnonymousObject', obj, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/Collection
         */
        postCollection(list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Collection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         */
        postDateTimeOffset(d, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         */
        postDateTimeOffsetNullable(d, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/StringPersonDic
         */
        postDictionary(dic, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/StringPersonDic', dic, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/Guids
         */
        postGuids(guids, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Guids', guids, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/ICollection
         */
        postICollection(list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ICollection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/IList
         */
        postIList(list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IList', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/int2d
         */
        postInt2D(a, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2d', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/int2djagged
         */
        postInt2DJagged(a, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2djagged', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/intArray
         */
        postIntArray(a, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/intArray', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/IReadOnlyCollection
         */
        postIReadOnlyCollection(list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/IReadOnlyList
         */
        postIReadOnlyList(list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/List
         */
        postList(list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/List', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/NextYear
         */
        postNextYear(dt, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/NextYear', dt, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/SuperDemo/PostEmpty?s={s}&i={i}
         */
        postWithQueryButEmptyBody(s, i, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostEmpty?s=' + (s == null ? '' : encodeURIComponent(s)) + '&i=' + i, null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * GET api/SuperDemo/SearchDateRange?startDate={startDate}&endDate={endDate}
         */
        searchDateRange(startDate, endDate, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/SearchDateRange?' + (startDate ? 'startDate=' + startDate.toISOString() : '') + (endDate ? '&endDate=' + endDate.toISOString() : ''), callback, this.error, this.statusCode);
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
        changeName(d, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/ChangeName', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * GET api/Tuple/PeopleCompany4
         */
        getPeopleCompany4(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany4', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Tuple/PeopleCompany5
         */
        getPeopleCompany5(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany5', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Tuple/Tuple1
         */
        getTuple1(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple1', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Tuple/Tuple2
         */
        getTuple2(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple2', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Tuple/Tuple3
         */
        getTuple3(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple3', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Tuple/Tuple4
         */
        getTuple4(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple4', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Tuple/Tuple5
         */
        getTuple5(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple5', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Tuple/Tuple6
         */
        getTuple6(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple6', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Tuple/Tuple7
         */
        getTuple7(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple7', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Tuple/Tuple8
         */
        getTuple8(callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple8', callback, this.error, this.statusCode);
        }
        /**
         * POST api/Tuple/PeopleCompany2
         */
        linkPeopleCompany2(peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany2', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/PeopleCompany3
         */
        linkPeopleCompany3(peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany3', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/PeopleCompany4
         */
        linkPeopleCompany4(peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany4', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/PeopleCompany5
         */
        linkPeopleCompany5(peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany5', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/PeopleCompany6
         */
        linkPeopleCompany6(peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany6', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/PeopleCompany7
         */
        linkPeopleCompany7(peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany7', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/PeopleCompany8
         */
        linkPeopleCompany8(peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany8', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/PersonCompany1
         */
        linkPersonCompany1(peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PersonCompany1', peopleAndCompany, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/Tuple1
         */
        postTuple1(tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple1', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/Tuple2
         */
        postTuple2(tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple2', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/Tuple3
         */
        postTuple3(tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple3', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/Tuple4
         */
        postTuple4(tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple4', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/Tuple5
         */
        postTuple5(tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple5', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/Tuple6
         */
        postTuple6(tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple6', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/Tuple7
         */
        postTuple7(tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple7', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * POST api/Tuple/Tuple8
         */
        postTuple8(tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple8', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
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
        delete(id, callback) {
            this.httpClient.delete(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode);
        }
        /**
         * GET api/Values
         */
        get(callback) {
            this.httpClient.get(this.baseUri + 'api/Values', callback, this.error, this.statusCode);
        }
        /**
         * GET api/Values/{id}?name={name}
         */
        getByIdAndName(id, name, callback) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id + '?name=' + (name == null ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode);
        }
        /**
         * GET api/Values?name={name}
         */
        getByName(name, callback) {
            this.httpClient.get(this.baseUri + 'api/Values?name=' + (name == null ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode);
        }
        /**
         * GET api/Values/{id}
         */
        getById(id, callback) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode);
        }
        /**
         * POST api/Values
         */
        post(value, callback) {
            this.httpClient.post(this.baseUri + 'api/Values', value, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
        /**
         * PUT api/Values/{id}
         */
        put(id, value, callback) {
            this.httpClient.put(this.baseUri + 'api/Values/' + id, value, callback, this.error, this.statusCode, 'application/json;charset=UTF-8');
        }
    }
    DemoWebApi_Controllers_Client.Values = Values;
})(DemoWebApi_Controllers_Client || (DemoWebApi_Controllers_Client = {}));
