///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="HttpClient.ts" />
var DemoWebApi_DemoData_Client;
(function (DemoWebApi_DemoData_Client) {
    (function (AddressType) {
        AddressType[AddressType["Postal"] = 0] = "Postal";
        AddressType[AddressType["Residential"] = 1] = "Residential";
    })(DemoWebApi_DemoData_Client.AddressType || (DemoWebApi_DemoData_Client.AddressType = {}));
    var AddressType = DemoWebApi_DemoData_Client.AddressType;
    (function (Days) {
        Days[Days["Sat"] = 1] = "Sat";
        Days[Days["Sun"] = 2] = "Sun";
        Days[Days["Mon"] = 3] = "Mon";
        Days[Days["Tue"] = 4] = "Tue";
        Days[Days["Wed"] = 5] = "Wed";
        Days[Days["Thu"] = 6] = "Thu";
        Days[Days["Fri"] = 7] = "Fri";
    })(DemoWebApi_DemoData_Client.Days || (DemoWebApi_DemoData_Client.Days = {}));
    var Days = DemoWebApi_DemoData_Client.Days;
    (function (PhoneType) {
        PhoneType[PhoneType["Tel"] = 0] = "Tel";
        PhoneType[PhoneType["Mobile"] = 1] = "Mobile";
        PhoneType[PhoneType["Skype"] = 2] = "Skype";
        PhoneType[PhoneType["Fax"] = 3] = "Fax";
    })(DemoWebApi_DemoData_Client.PhoneType || (DemoWebApi_DemoData_Client.PhoneType = {}));
    var PhoneType = DemoWebApi_DemoData_Client.PhoneType;
})(DemoWebApi_DemoData_Client || (DemoWebApi_DemoData_Client = {}));
var DemoWebApi_Controllers_Client;
(function (DemoWebApi_Controllers_Client) {
    var SuperDemo = (function () {
        function SuperDemo(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * GET api/SuperDemo/int?d={d}
         * @param {number} d
         * @return {number}
         */
        SuperDemo.prototype.getIntSquare = function (d, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int?d=' + d, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d
         * @return {number}
         */
        SuperDemo.prototype.getDecimalSquare = function (d, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal?d=' + d, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue
         * @return {Date}
         */
        SuperDemo.prototype.getDateTime = function (hasValue, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue=' + hasValue, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NextYear?dt={dt}
         * @param {Date} dt
         * @return {Date}
         */
        SuperDemo.prototype.getNextYear = function (dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextYear?dt=' + dt, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NextHour?dt={dt}
         * @param {Date} dt
         * @return {Date}
         */
        SuperDemo.prototype.getNextHour = function (dt, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NextHour?dt=' + dt, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/NextYear
         * @param {Date} dt
         * @return {Date}
         */
        SuperDemo.prototype.postNextYear = function (dt, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/NextYear', dt, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date}
         */
        SuperDemo.prototype.getDateTimeOffset = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DateTimeOffset', callback, this.error, this.statusCode);
        };
        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d
         * @return {boolean}
         */
        SuperDemo.prototype.postDateTimeOffset = function (d, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', d, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d
         * @return {boolean}
         */
        SuperDemo.prototype.postDateTimeOffsetNullable = function (d, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', d, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue
         * @return {number}
         */
        SuperDemo.prototype.getNullableDecimal = function (hasValue, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue=' + hasValue, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/FloatZero
         * @return {number}
         */
        SuperDemo.prototype.getFloatZero = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/FloatZero', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DoubleZero
         * @return {number}
         */
        SuperDemo.prototype.getDoubleZero = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleZero', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DecimalZero
         * @return {number}
         */
        SuperDemo.prototype.getDecimalZero = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DecimalZero', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullString
         * @return {string}
         */
        SuperDemo.prototype.getNullString = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullString', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/EmptyString
         * @return {string}
         */
        SuperDemo.prototype.getEmptyString = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/EmptyString', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        SuperDemo.prototype.getNullPerson = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullObject', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/TextStream
         * @return {any}
         */
        SuperDemo.prototype.getTextStream = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/TextStream', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>}
         */
        SuperDemo.prototype.getByteArray = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ByteArray', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ActionResult
         * @return {any}
         */
        SuperDemo.prototype.getActionResult = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionResult', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ActionStringResult
         * @return {string}
         */
        SuperDemo.prototype.getActionStringResult = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionStringResult', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/byte
         * @return {number}
         */
        SuperDemo.prototype.getbyte = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/byte', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/sbyte
         * @return {number}
         */
        SuperDemo.prototype.getsbyte = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/sbyte', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/short
         * @return {number}
         */
        SuperDemo.prototype.getShort = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/short', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ushort
         * @return {number}
         */
        SuperDemo.prototype.getUShort = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ushort', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/uint
         * @return {number}
         */
        SuperDemo.prototype.getUint = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/uint', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ulong
         * @return {number}
         */
        SuperDemo.prototype.getulong = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ulong', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/doulbe
         * @return {number}
         */
        SuperDemo.prototype.getdouble = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/doulbe', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/decimal
         * @return {number}
         */
        SuperDemo.prototype.getDecimal = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/char
         * @return {string}
         */
        SuperDemo.prototype.getChar = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/char', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/bool
         * @return {boolean}
         */
        SuperDemo.prototype.getBool = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/bool', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/int2d
         * @return {number[][]}
         */
        SuperDemo.prototype.getInt2D = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2d', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>}
         */
        SuperDemo.prototype.getInt2DJagged = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/int2dJagged', callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/int2d
         * @param {number[][]} a
         * @return {boolean}
         */
        SuperDemo.prototype.postInt2D = function (a, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2d', a, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a
         * @return {boolean}
         */
        SuperDemo.prototype.postInt2DJagged = function (a, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2djagged', a, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a
         * @return {boolean}
         */
        SuperDemo.prototype.postIntArray = function (a, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/intArray', a, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/intArray
         * @return {Array<number>}
         */
        SuperDemo.prototype.getIntArray = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArray', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/AnonymousDynamic
         * @return {any}
         */
        SuperDemo.prototype.getAnonymousDynamic = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AnonymousDynamic', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/AnonymousObject
         * @return {any}
         */
        SuperDemo.prototype.getAnonymousObject = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/AnonymousObject', callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj
         * @return {any}
         */
        SuperDemo.prototype.postAnonymousObject = function (obj, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/AnonymousObject', obj, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }}
         */
        SuperDemo.prototype.getDictionary = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringStringDic', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }}
         */
        SuperDemo.prototype.getDictionaryOfPeople = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic', callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic
         * @return {number}
         */
        SuperDemo.prototype.postDictionary = function (dic, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/StringPersonDic', dic, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/KeyValuePair
         * @return {{key: string, value: DemoWebApi_DemoData_Client.Person }}
         */
        SuperDemo.prototype.getKeyhValuePair = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/KeyValuePair', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getICollection = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ICollection', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getIList = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IList', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getIReadOnlyList = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyList', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getIReadOnlyCollection = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getList = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/List', callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getCollection = function (callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/Collection', callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postICollection = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ICollection', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postIList = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IList', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postIReadOnlyList = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postIReadOnlyCollection = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postList = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/List', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postCollection = function (list, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Collection', list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/PostEmpty?s={s}&i={i}
         * @param {string} s
         * @param {number} i
         * @return {{item1:string, item2:number}}
         */
        SuperDemo.prototype.postWithQueryButEmptyBody = function (s, i, callback) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostEmpty?s=' + encodeURIComponent(s) + '&i=' + i, null, callback, this.error, this.statusCode);
        };
        return SuperDemo;
    }());
    DemoWebApi_Controllers_Client.SuperDemo = SuperDemo;
    var Entities = (function () {
        function Entities(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * PUT api/SuperDemo/link?id={id}&relationship={relationship}
         * @param {number} id
         * @param {string} relationship
         * @param {DemoWebApi_DemoData_Client.Person} person
         * @return {boolean}
         */
        Entities.prototype.linkPerson = function (id, relationship, person, callback) {
            this.httpClient.put(this.baseUri + 'api/SuperDemo/link?id=' + id + '&relationship=' + encodeURIComponent(relationship), person, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/Company?id={id}
         * @param {number} id
         * @return {DemoWebApi_DemoData_Client.Company}
         */
        Entities.prototype.getCompany = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/Company?id=' + id, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/PersonNotFound?id={id}
         * @param {number} id
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Entities.prototype.getPersonNotFound = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/PersonNotFound?id=' + id, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/PersonActionNotFound?id={id}
         * @param {number} id
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Entities.prototype.getPersonActionNotFound = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/PersonActionNotFound?id=' + id, callback, this.error, this.statusCode);
        };
        /**
         * Get a person
         * GET api/Entities/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        Entities.prototype.getPerson = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/Entities/' + id, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} p
         * @return {number}
         */
        Entities.prototype.createPerson = function (p, callback) {
            this.httpClient.post(this.baseUri + 'api/Entities', p, callback, this.error, this.statusCode);
        };
        /**
         * PUT api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person
         * @return {void}
         */
        Entities.prototype.updatePerson = function (person, callback) {
            this.httpClient.put(this.baseUri + 'api/Entities', person, callback, this.error, this.statusCode);
        };
        /**
         * DELETE api/Entities/{id}
         * @param {number} id
         * @return {void}
         */
        Entities.prototype.delete = function (id, callback) {
            this.httpClient.delete(this.baseUri + 'api/Entities/' + id, callback, this.error, this.statusCode);
        };
        return Entities;
    }());
    DemoWebApi_Controllers_Client.Entities = Entities;
    var Tuple = (function () {
        function Tuple(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * POST api/Tuple/PersonCompany1
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPersonCompany1 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PersonCompany1', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany2
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany2 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany2', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany3
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany3 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany3', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany4
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany4 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany4', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/PeopleCompany4
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}}
         */
        Tuple.prototype.getPeopleCompany4 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany4', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany5
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany5 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany5', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/PeopleCompany5
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}}
         */
        Tuple.prototype.getPeopleCompany5 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany5', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany6
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany6 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany6', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany7
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany7 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany7', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany8
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany8 = function (peopleAndCompany, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/PeopleCompany8', peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple1
         * @return {{item1:number}}
         */
        Tuple.prototype.getTuple1 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple1', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple1
         * @param {{item1:number}} tuple
         * @return {number}
         */
        Tuple.prototype.postTuple1 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple1', tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple2
         * @return {{item1:string, item2:number}}
         */
        Tuple.prototype.getTuple2 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple2', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple2
         * @param {{item1:string, item2:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple2 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple2', tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple3
         * @return {{item1:string, item2:string, item3:number}}
         */
        Tuple.prototype.getTuple3 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple3', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple3
         * @param {{item1:string, item2:string, item3:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple3 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple3', tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple4
         * @return {{item1:string, item2:string, item3:string, item4:number}}
         */
        Tuple.prototype.getTuple4 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple4', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple4
         * @param {{item1:string, item2:string, item3:string, item4:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple4 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple4', tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple5
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:number}}
         */
        Tuple.prototype.getTuple5 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple5', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple5
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple5 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple5', tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple6
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}}
         */
        Tuple.prototype.getTuple6 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple6', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple6
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple6 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple6', tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple7
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}}
         */
        Tuple.prototype.getTuple7 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple7', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple7
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple7 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple7', tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple8
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}}
         */
        Tuple.prototype.getTuple8 = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Tuple/Tuple8', callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple8
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple8 = function (tuple, callback) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple8', tuple, callback, this.error, this.statusCode);
        };
        return Tuple;
    }());
    DemoWebApi_Controllers_Client.Tuple = Tuple;
    var Heroes = (function () {
        function Heroes(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * GET api/Heroes
         * @return {Array<DemoWebApi_Controllers_Client.Hero>}
         */
        Heroes.prototype.get = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Heroes/{id}
         * @param {number} id
         * @return {DemoWebApi_Controllers_Client.Hero}
         */
        Heroes.prototype.getById = function (id, callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode);
        };
        /**
         * DELETE api/Heroes/{id}
         * @param {number} id
         * @return {void}
         */
        Heroes.prototype.delete = function (id, callback) {
            this.httpClient.delete(this.baseUri + 'api/Heroes/' + id, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Heroes?name={name}
         * @param {string} name
         * @return {DemoWebApi_Controllers_Client.Hero}
         */
        Heroes.prototype.post = function (name, callback) {
            this.httpClient.post(this.baseUri + 'api/Heroes?name=' + encodeURIComponent(name), null, callback, this.error, this.statusCode);
        };
        /**
         * PUT api/Heroes
         * @param {DemoWebApi_Controllers_Client.Hero} hero
         * @return {DemoWebApi_Controllers_Client.Hero}
         */
        Heroes.prototype.put = function (hero, callback) {
            this.httpClient.put(this.baseUri + 'api/Heroes', hero, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Heroes?name={name}
         * @param {string} name
         * @return {Array<DemoWebApi_Controllers_Client.Hero>}
         */
        Heroes.prototype.search = function (name, callback) {
            this.httpClient.get(this.baseUri + 'api/Heroes?name=' + encodeURIComponent(name), callback, this.error, this.statusCode);
        };
        return Heroes;
    }());
    DemoWebApi_Controllers_Client.Heroes = Heroes;
    var Values = (function () {
        function Values(baseUri, httpClient, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            if (httpClient === void 0) { httpClient = new HttpClient(); }
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * GET api/Values
         * @return {Array<string>}
         */
        Values.prototype.get = function (callback) {
            this.httpClient.get(this.baseUri + 'api/Values', callback, this.error, this.statusCode);
        };
        /**
         * GET api/Values/{id}?name={name}
         * @param {number} id
         * @param {string} name
         * @return {string}
         */
        Values.prototype.getByIdAndName = function (id, name, callback) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id + '?name=' + encodeURIComponent(name), callback, this.error, this.statusCode);
        };
        /**
         * GET api/Values?name={name}
         * @param {string} name
         * @return {string}
         */
        Values.prototype.getByName = function (name, callback) {
            this.httpClient.get(this.baseUri + 'api/Values?name=' + encodeURIComponent(name), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Values
         * @param {string} value
         * @return {string}
         */
        Values.prototype.post = function (value, callback) {
            this.httpClient.post(this.baseUri + 'api/Values', value, callback, this.error, this.statusCode);
        };
        /**
         * PUT api/Values/{id}
         * @param {number} id
         * @param {string} value
         * @return {void}
         */
        Values.prototype.put = function (id, value, callback) {
            this.httpClient.put(this.baseUri + 'api/Values/' + id, value, callback, this.error, this.statusCode);
        };
        /**
         * DELETE api/Values/{id}
         * @param {number} id
         * @return {void}
         */
        Values.prototype.delete = function (id, callback) {
            this.httpClient.delete(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode);
        };
        return Values;
    }());
    DemoWebApi_Controllers_Client.Values = Values;
})(DemoWebApi_Controllers_Client || (DemoWebApi_Controllers_Client = {}));
