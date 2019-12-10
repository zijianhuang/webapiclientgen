///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="HttpClient.ts" />
var DemoWebApi_DemoData_Client;
(function (DemoWebApi_DemoData_Client) {
    var AddressType;
    (function (AddressType) {
        AddressType[AddressType["Postal"] = 0] = "Postal";
        AddressType[AddressType["Residential"] = 1] = "Residential";
    })(AddressType = DemoWebApi_DemoData_Client.AddressType || (DemoWebApi_DemoData_Client.AddressType = {}));
    var Days;
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
    var PhoneType;
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
    var Entities = /** @class */ (function () {
        function Entities(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * POST api/Entities/createPerson
         */
        Entities.prototype.createPerson = function (p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPerson', p, callback, this.error, this.statusCode);
        };
        /**
         * DELETE api/Entities/{id}
         */
        Entities.prototype["delete"] = function (id, callback) {
            this.httpClient["delete"](this.baseUri + 'api/Entities/' + id, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Entities/Company?id={id}
         */
        Entities.prototype.getCompany = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/Entities/Company?id=' + id, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Entities/Mims
         */
        Entities.prototype.getMims = function (p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/Mims', p, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Entities/MyGeneric
         */
        Entities.prototype.getMyGeneric = function (s, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGeneric', s, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Entities/MyGenericPerson
         */
        Entities.prototype.getMyGenericPerson = function (s, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGenericPerson', s, callback, this.error, this.statusCode);
        };
        /**
         * Get a person
         * so to know the person
         * GET api/Entities/getPerson?id={id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        Entities.prototype.getPerson = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/Entities/getPerson?id=' + id, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Entities/PersonActionNotFound?id={id}
         */
        Entities.prototype.getPersonActionNotFound = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/Entities/PersonActionNotFound?id=' + id, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Entities/PersonNotFound?id={id}
         */
        Entities.prototype.getPersonNotFound = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/Entities/PersonNotFound?id=' + id, callback, this.error, this.statusCode);
        };
        /**
         * PUT api/Entities/link?id={id}&relationship={relationship}
         */
        Entities.prototype.linkPerson = function (id, relationship, person, callback) {
            this.httpClient.put(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + encodeURIComponent(relationship), person, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Entities/linkNewDecimal?id={id}
         */
        Entities.prototype.linkWithNewDecimal = function (id, p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/linkNewDecimal?id=' + id, p, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Entities/linkNewGuid?id={id}
         */
        Entities.prototype.linkWithNewGuid = function (id, p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/linkNewGuid?id=' + id, p, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Entities/linkLong?id={id}
         */
        Entities.prototype.linkWithNewLong = function (id, p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities/linkLong?id=' + id, p, callback, this.error, this.statusCode);
        };
        /**
         * PUT api/Entities/updatePerson
         */
        Entities.prototype.updatePerson = function (person, callback) {
            this.httpClient.put(this.baseUri + 'api/Entities/updatePerson', person, callback, this.error, this.statusCode);
        };
        return Entities;
    }());
    DemoWebApi_Controllers_Client.Entities = Entities;
    var Heroes = /** @class */ (function () {
        function Heroes(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * DELETE api/Heroes/{id}
         */
        Heroes.prototype["delete"] = function (id, callback) {
            this.httpClient["delete"](this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode);
        };
        /**
         * Get all heroes.
         * GET api/Heroes
         */
        Heroes.prototype.get = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes', callback, this.error, this.statusCode);
        };
        /**
         * Get a hero.
         * GET api/Heroes/{id}
         */
        Heroes.prototype.getById = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode);
        };
        /**
         * This should triger error: System.ArgumentException: Web API Heroes/GetSomethingInvalid is defined with invalid parameters: Not support ParameterBinder FromQuery or FromUri with a class parameter.
         * GET api/Heroes/invalid
         */
        Heroes.prototype.getSomethingInvalid = function (h, callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes/invalid', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Heroes?name={name}
         */
        Heroes.prototype.post = function (name, callback) {
            this.httpClient.post(this.baseUri + 'api/Heroes?name=' + encodeURIComponent(name), null, callback, this.error, this.statusCode);
        };
        /**
         * Add a hero
         * POST api/Heroes/q?name={name}
         */
        Heroes.prototype.postWithQuery = function (name, callback) {
            this.httpClient.post(this.baseUri + 'api/Heroes/q?name=' + encodeURIComponent(name), null, callback, this.error, this.statusCode);
        };
        /**
         * Update hero.
         * PUT api/Heroes
         */
        Heroes.prototype.put = function (hero, callback) {
            this.httpClient.put(this.baseUri + 'api/Heroes', hero, callback, this.error, this.statusCode);
        };
        /**
         * Search heroes
         * GET api/Heroes/search?name={name}
         * @param {string} name keyword contained in hero name.
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
         */
        Heroes.prototype.search = function (name, callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes/search?name=' + encodeURIComponent(name), callback, this.error, this.statusCode);
        };
        return Heroes;
    }());
    DemoWebApi_Controllers_Client.Heroes = Heroes;
    var SuperDemo = /** @class */ (function () {
        function SuperDemo(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * GET api/SuperDemo/ActionResult
         */
        SuperDemo.prototype.getActionResult = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ActionStringResult
         */
        SuperDemo.prototype.getActionStringResult = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionStringResult', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/AnonymousDynamic
         */
        SuperDemo.prototype.getAnonymousDynamic = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AnonymousDynamic', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/AnonymousObject
         */
        SuperDemo.prototype.getAnonymousObject = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AnonymousObject', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/bool
         */
        SuperDemo.prototype.getBool = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/bool', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/byte
         */
        SuperDemo.prototype.getbyte = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/byte', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ByteArray
         */
        SuperDemo.prototype.getByteArray = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ByteArray', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/char
         */
        SuperDemo.prototype.getChar = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/char', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/Collection
         */
        SuperDemo.prototype.getCollection = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/Collection', callback, this.error, this.statusCode);
        };
        /**
         * True to return now, false to return null
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         */
        SuperDemo.prototype.getDateTime = function (hasValue, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue=' + hasValue, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DateTimeOffset
         */
        SuperDemo.prototype.getDateTimeOffset = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DateTimeOffset', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/decimal
         */
        SuperDemo.prototype.getDecimal = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/decimal?d={d}
         */
        SuperDemo.prototype.getDecimalSquare = function (d, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal?d=' + d, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DecimalZero
         */
        SuperDemo.prototype.getDecimalZero = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DecimalZero', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/StringStringDic
         */
        SuperDemo.prototype.getDictionary = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringStringDic', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/StringPersonDic
         */
        SuperDemo.prototype.getDictionaryOfPeople = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/doulbe
         */
        SuperDemo.prototype.getdouble = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/doulbe', callback, this.error, this.statusCode);
        };
        /**
         * Result of 0.1d + 0.2d - 0.3d
         * GET api/SuperDemo/DoubleZero
         */
        SuperDemo.prototype.getDoubleZero = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleZero', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/EmptyString
         */
        SuperDemo.prototype.getEmptyString = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/EmptyString', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/FloatZero
         */
        SuperDemo.prototype.getFloatZero = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/FloatZero', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ICollection
         */
        SuperDemo.prototype.getICollection = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ICollection', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/IList
         */
        SuperDemo.prototype.getIList = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IList', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/int2d
         */
        SuperDemo.prototype.getInt2D = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2d', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/int2dJagged
         */
        SuperDemo.prototype.getInt2DJagged = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2dJagged', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/intArray
         */
        SuperDemo.prototype.getIntArray = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArray', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/int?d={d}
         */
        SuperDemo.prototype.getIntSquare = function (d, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int?d=' + d, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/IReadOnlyCollection
         */
        SuperDemo.prototype.getIReadOnlyCollection = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/IReadOnlyList
         */
        SuperDemo.prototype.getIReadOnlyList = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyList', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/KeyValuePair
         */
        SuperDemo.prototype.getKeyhValuePair = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/KeyValuePair', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/List
         */
        SuperDemo.prototype.getList = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/List', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NextHour?dt={dt}
         */
        SuperDemo.prototype.getNextHour = function (dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHour?dt=' + dt.toISOString(), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NextHourNullable?n={n}&dt={dt}
         */
        SuperDemo.prototype.getNextHourNullable = function (n, dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHourNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NextYear?dt={dt}
         */
        SuperDemo.prototype.getNextYear = function (dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYear?dt=' + dt.toISOString(), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NextYearNullable?n={n}&dt={dt}
         */
        SuperDemo.prototype.getNextYearNullable = function (n, dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYearNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : ''), callback, this.error, this.statusCode);
        };
        /**
         * True to return 100, and false to return null
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         */
        SuperDemo.prototype.getNullableDecimal = function (hasValue, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue=' + hasValue, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullObject
         */
        SuperDemo.prototype.getNullPerson = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullObject', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullString
         */
        SuperDemo.prototype.getNullString = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullString', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
         */
        SuperDemo.prototype.getPrimitiveNullable = function (location, dd, de, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + encodeURIComponent(location) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
         */
        SuperDemo.prototype.getPrimitiveNullable2 = function (dd, de, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/sbyte
         */
        SuperDemo.prototype.getsbyte = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/sbyte', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/short
         */
        SuperDemo.prototype.getShort = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/short', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/TextStream
         */
        SuperDemo.prototype.getTextStream = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/TextStream', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/uint
         */
        SuperDemo.prototype.getUint = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/uint', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ulong
         */
        SuperDemo.prototype.getulong = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ulong', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ushort
         */
        SuperDemo.prototype.getUShort = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ushort', callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/ActionResult
         */
        SuperDemo.prototype.postActionResult = function (callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ActionResult', null, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/PostActionResult2
         */
        SuperDemo.prototype.postActionResult2 = function (s, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostActionResult2', s, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/PostActionResult3
         */
        SuperDemo.prototype.postActionResult3 = function (person, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostActionResult3', person, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/AnonymousObject
         */
        SuperDemo.prototype.postAnonymousObject = function (obj, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/AnonymousObject', obj, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/Collection
         */
        SuperDemo.prototype.postCollection = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Collection', list, callback, this.error, this.statusCode);
        };
        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         */
        SuperDemo.prototype.postDateTimeOffset = function (d, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', d, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         */
        SuperDemo.prototype.postDateTimeOffsetNullable = function (d, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', d, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/StringPersonDic
         */
        SuperDemo.prototype.postDictionary = function (dic, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/StringPersonDic', dic, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/ICollection
         */
        SuperDemo.prototype.postICollection = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ICollection', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/IList
         */
        SuperDemo.prototype.postIList = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IList', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/int2d
         */
        SuperDemo.prototype.postInt2D = function (a, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2d', a, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/int2djagged
         */
        SuperDemo.prototype.postInt2DJagged = function (a, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2djagged', a, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/intArray
         */
        SuperDemo.prototype.postIntArray = function (a, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/intArray', a, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/IReadOnlyCollection
         */
        SuperDemo.prototype.postIReadOnlyCollection = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/IReadOnlyList
         */
        SuperDemo.prototype.postIReadOnlyList = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/List
         */
        SuperDemo.prototype.postList = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/List', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/NextYear
         */
        SuperDemo.prototype.postNextYear = function (dt, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/NextYear', dt, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/PostEmpty?s={s}&i={i}
         */
        SuperDemo.prototype.postWithQueryButEmptyBody = function (s, i, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostEmpty?s=' + encodeURIComponent(s) + '&i=' + i, null, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/SearchDateRange?startDate={startDate}&endDate={endDate}
         */
        SuperDemo.prototype.searchDateRange = function (startDate, endDate, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/SearchDateRange?' + (startDate ? 'startDate=' + startDate.toISOString() : '') + (endDate ? '&endDate=' + endDate.toISOString() : ''), callback, this.error, this.statusCode);
        };
        return SuperDemo;
    }());
    DemoWebApi_Controllers_Client.SuperDemo = SuperDemo;
    var Tuple = /** @class */ (function () {
        function Tuple(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * POST api/Tuple/ChangeName
         */
        Tuple.prototype.changeName = function (d, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/ChangeName', d, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/PeopleCompany4
         */
        Tuple.prototype.getPeopleCompany4 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany4', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/PeopleCompany5
         */
        Tuple.prototype.getPeopleCompany5 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany5', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple1
         */
        Tuple.prototype.getTuple1 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple1', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple2
         */
        Tuple.prototype.getTuple2 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple2', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple3
         */
        Tuple.prototype.getTuple3 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple3', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple4
         */
        Tuple.prototype.getTuple4 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple4', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple5
         */
        Tuple.prototype.getTuple5 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple5', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple6
         */
        Tuple.prototype.getTuple6 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple6', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple7
         */
        Tuple.prototype.getTuple7 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple7', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple8
         */
        Tuple.prototype.getTuple8 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple8', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany2
         */
        Tuple.prototype.linkPeopleCompany2 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany2', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany3
         */
        Tuple.prototype.linkPeopleCompany3 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany3', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany4
         */
        Tuple.prototype.linkPeopleCompany4 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany4', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany5
         */
        Tuple.prototype.linkPeopleCompany5 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany5', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany6
         */
        Tuple.prototype.linkPeopleCompany6 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany6', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany7
         */
        Tuple.prototype.linkPeopleCompany7 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany7', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany8
         */
        Tuple.prototype.linkPeopleCompany8 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany8', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PersonCompany1
         */
        Tuple.prototype.linkPersonCompany1 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PersonCompany1', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple1
         */
        Tuple.prototype.postTuple1 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple1', tuple, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple2
         */
        Tuple.prototype.postTuple2 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple2', tuple, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple3
         */
        Tuple.prototype.postTuple3 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple3', tuple, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple4
         */
        Tuple.prototype.postTuple4 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple4', tuple, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple5
         */
        Tuple.prototype.postTuple5 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple5', tuple, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple6
         */
        Tuple.prototype.postTuple6 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple6', tuple, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple7
         */
        Tuple.prototype.postTuple7 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple7', tuple, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple8
         */
        Tuple.prototype.postTuple8 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple8', tuple, callback, this.error, this.statusCode);
        };
        return Tuple;
    }());
    DemoWebApi_Controllers_Client.Tuple = Tuple;
    var Values = /** @class */ (function () {
        function Values(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * DELETE api/Values/{id}
         */
        Values.prototype["delete"] = function (id, callback) {
            this.httpClient["delete"](this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Values
         */
        Values.prototype.get = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Values', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Values/{id}?name={name}
         */
        Values.prototype.getByIdAndName = function (id, name, callback) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id + '?name=' + encodeURIComponent(name), callback, this.error, this.statusCode);
        };
        /**
         * GET api/Values?name={name}
         */
        Values.prototype.getByName = function (name, callback) {
            this.httpClient.get(this.baseUri + 'api/Values?name=' + encodeURIComponent(name), callback, this.error, this.statusCode);
        };
        /**
         * GET api/Values/{id}
         */
        Values.prototype.getById = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Values
         */
        Values.prototype.post = function (value, callback) {
            this.httpClient.post(this.baseUri + 'api/Values', value, callback, this.error, this.statusCode);
        };
        /**
         * PUT api/Values/{id}
         */
        Values.prototype.put = function (id, value, callback) {
            this.httpClient.put(this.baseUri + 'api/Values/' + id, value, callback, this.error, this.statusCode);
        };
        return Values;
    }());
    DemoWebApi_Controllers_Client.Values = Values;
})(DemoWebApi_Controllers_Client || (DemoWebApi_Controllers_Client = {}));
