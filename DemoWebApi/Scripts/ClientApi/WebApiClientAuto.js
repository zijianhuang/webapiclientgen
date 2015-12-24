/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="HttpClient.ts" />
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
})(DemoWebApi_DemoData_Client || (DemoWebApi_DemoData_Client = {}));
var DemoWebApi_Controllers_Client;
(function (DemoWebApi_Controllers_Client) {
    var SuperDemo = (function () {
        function SuperDemo(baseUri, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            this.baseUri = baseUri;
            this.error = error;
            this.statusCode = statusCode;
            this.httpClient = new HttpClient();
        }
        /**
         * GET api/SuperDemo/int?d={d}
         * @param {number} d
         * @return {number}
         */
        SuperDemo.prototype.GetIntSquare = function (d, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/int?d=' + d), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d
         * @return {number}
         */
        SuperDemo.prototype.GetDecimalSquare = function (d, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/decimal?d=' + d), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue
         * @return {Date}
         */
        SuperDemo.prototype.GetDateTime = function (hasValue, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue=' + hasValue), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date}
         */
        SuperDemo.prototype.GetDateTimeOffset = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/DateTimeOffset'), callback, this.error, this.statusCode);
        };
        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d
         * @return {boolean}
         */
        SuperDemo.prototype.PostDateTimeOffset = function (d, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/DateTimeOffset'), d, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d
         * @return {boolean}
         */
        SuperDemo.prototype.PostDateTimeOffsetNullable = function (d, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable'), d, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue
         * @return {number}
         */
        SuperDemo.prototype.GetNullableDecimal = function (hasValue, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue=' + hasValue), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/FloatZero
         * @return {number}
         */
        SuperDemo.prototype.GetFloatZero = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/FloatZero'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DoubleZero
         * @return {number}
         */
        SuperDemo.prototype.GetDoubleZero = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/DoubleZero'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/DecimalZero
         * @return {number}
         */
        SuperDemo.prototype.GetDecimalZero = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/DecimalZero'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullString
         * @return {string}
         */
        SuperDemo.prototype.GetNullString = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/NullString'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/EmptyString
         * @return {string}
         */
        SuperDemo.prototype.GetEmptyString = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/EmptyString'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        SuperDemo.prototype.GetNullPerson = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/NullObject'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/TextStream
         * @return {any}
         */
        SuperDemo.prototype.GetTextStream = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/TextStream'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>}
         */
        SuperDemo.prototype.GetByteArray = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ByteArray'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ActionResult
         * @return {any}
         */
        SuperDemo.prototype.GetActionResult = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ActionResult'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/byte
         * @return {number}
         */
        SuperDemo.prototype.Getbyte = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/byte'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/sbyte
         * @return {number}
         */
        SuperDemo.prototype.Getsbyte = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/sbyte'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/short
         * @return {number}
         */
        SuperDemo.prototype.GetShort = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/short'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ushort
         * @return {number}
         */
        SuperDemo.prototype.GetUShort = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ushort'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/uint
         * @return {number}
         */
        SuperDemo.prototype.GetUint = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/uint'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ulong
         * @return {number}
         */
        SuperDemo.prototype.Getulong = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ulong'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/doulbe
         * @return {number}
         */
        SuperDemo.prototype.Getdouble = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/doulbe'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/decimal
         * @return {number}
         */
        SuperDemo.prototype.GetDecimal = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/decimal'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/char
         * @return {string}
         */
        SuperDemo.prototype.GetChar = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/char'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/bool
         * @return {boolean}
         */
        SuperDemo.prototype.GetBool = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/bool'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/int2d
         * @return {number[][]}
         */
        SuperDemo.prototype.GetInt2D = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/int2d'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>}
         */
        SuperDemo.prototype.GetInt2DJagged = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/int2dJagged'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/int2d
         * @param {number[][]} a
         * @return {boolean}
         */
        SuperDemo.prototype.PostInt2D = function (a, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/int2d'), a, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a
         * @return {boolean}
         */
        SuperDemo.prototype.PostInt2DJagged = function (a, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/int2djagged'), a, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a
         * @return {boolean}
         */
        SuperDemo.prototype.PostIntArray = function (a, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/intArray'), a, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/intArray
         * @return {Array<number>}
         */
        SuperDemo.prototype.GetIntArray = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/intArray'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/AnonymousDynamic
         * @return {any}
         */
        SuperDemo.prototype.GetAnonymousDynamic = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/AnonymousDynamic'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/AnonymousObject
         * @return {any}
         */
        SuperDemo.prototype.GetAnonymousObject = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/AnonymousObject'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj
         * @return {any}
         */
        SuperDemo.prototype.PostAnonymousObject = function (obj, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/AnonymousObject'), obj, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }}
         */
        SuperDemo.prototype.GetDictionary = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/StringStringDic'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }}
         */
        SuperDemo.prototype.GetDictionaryOfPeople = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/StringPersonDic'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic
         * @return {number}
         */
        SuperDemo.prototype.PostDictionary = function (dic, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/StringPersonDic'), dic, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/KeyValuePair
         * @return {{Key: string, Value: DemoWebApi_DemoData_Client.Person }}
         */
        SuperDemo.prototype.GetKeyhValuePair = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/KeyValuePair'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.GetICollection = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/ICollection'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.GetIList = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/IList'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.GetIReadOnlyList = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyList'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.GetIReadOnlyCollection = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyCollection'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.GetList = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/List'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.GetCollection = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/Collection'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.PostICollection = function (list, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/ICollection'), list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.PostIList = function (list, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/IList'), list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.PostIReadOnlyList = function (list, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyList'), list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.PostIReadOnlyCollection = function (list, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/IReadOnlyCollection'), list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.PostList = function (list, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/List'), list, callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.PostCollection = function (list, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/Collection'), list, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/Handy
         * @param {DemoWebApi_Models_Client.Handy} handy
         * @return {DemoWebApi_Models_Client.Handy}
         */
        SuperDemo.prototype.GetHandy = function (handy, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/Handy'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/SuperDemo/PostEmpty?s={s}&i={i}
         * @param {string} s
         * @param {number} i
         * @return {{Item1:string, Item2:number}}
         */
        SuperDemo.prototype.PostWithQueryButEmptyBody = function (s, i, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/SuperDemo/PostEmpty?s=' + s + '&i=' + i), null, callback, this.error, this.statusCode);
        };
        return SuperDemo;
    })();
    DemoWebApi_Controllers_Client.SuperDemo = SuperDemo;
    var Entities = (function () {
        function Entities(baseUri, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            this.baseUri = baseUri;
            this.error = error;
            this.statusCode = statusCode;
            this.httpClient = new HttpClient();
        }
        /**
         * PUT api/SuperDemo/link?id={id}&relationship={relationship}
         * @param {number} id
         * @param {string} relationship
         * @param {DemoWebApi_DemoData_Client.Person} person
         * @return {boolean}
         */
        Entities.prototype.LinkPerson = function (id, relationship, person, callback) {
            this.httpClient.put(encodeURI(this.baseUri + 'api/SuperDemo/link?id=' + id + '&relationship=' + relationship), person, callback, this.error, this.statusCode);
        };
        /**
         * GET api/SuperDemo/Company?id={id}
         * @param {number} id
         * @return {DemoWebApi_DemoData_Client.Company}
         */
        Entities.prototype.GetCompany = function (id, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/SuperDemo/Company?id=' + id), callback, this.error, this.statusCode);
        };
        /**
         * Get a person
         * GET api/Entities/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        Entities.prototype.GetPerson = function (id, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Entities/' + id), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person
         * @return {number}
         */
        Entities.prototype.CreatePerson = function (person, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Entities'), person, callback, this.error, this.statusCode);
        };
        /**
         * PUT api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person
         * @return {void}
         */
        Entities.prototype.UpdatePerson = function (person, callback) {
            this.httpClient.put(encodeURI(this.baseUri + 'api/Entities'), person, callback, this.error, this.statusCode);
        };
        /**
         * DELETE api/Entities/{id}
         * @param {number} id
         * @return {void}
         */
        Entities.prototype.Delete = function (id, callback) {
            this.httpClient.delete(encodeURI(this.baseUri + 'api/Entities/' + id), callback, this.error, this.statusCode);
        };
        return Entities;
    })();
    DemoWebApi_Controllers_Client.Entities = Entities;
    var Tuple = (function () {
        function Tuple(baseUri, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            this.baseUri = baseUri;
            this.error = error;
            this.statusCode = statusCode;
            this.httpClient = new HttpClient();
        }
        /**
         * POST api/Tuple/PersonCompany1
         * @param {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.LinkPersonCompany1 = function (peopleAndCompany, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/PersonCompany1'), peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany2
         * @param {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.LinkPeopleCompany2 = function (peopleAndCompany, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany2'), peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany3
         * @param {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Person, Item3:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.LinkPeopleCompany3 = function (peopleAndCompany, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany3'), peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany4
         * @param {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Person, Item3:DemoWebApi_DemoData_Client.Person, Item4:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.LinkPeopleCompany4 = function (peopleAndCompany, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany4'), peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/PeopleCompany4
         * @return {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Person, Item3:DemoWebApi_DemoData_Client.Person, Item4:DemoWebApi_DemoData_Client.Company}}
         */
        Tuple.prototype.GetPeopleCompany4 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany4'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany5
         * @param {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Person, Item3:DemoWebApi_DemoData_Client.Person, Item4:DemoWebApi_DemoData_Client.Person, Item5:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.LinkPeopleCompany5 = function (peopleAndCompany, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany5'), peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/PeopleCompany5
         * @return {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Person, Item3:DemoWebApi_DemoData_Client.Person, Item4:DemoWebApi_DemoData_Client.Person, Item5:DemoWebApi_DemoData_Client.Company}}
         */
        Tuple.prototype.GetPeopleCompany5 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany5'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany6
         * @param {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Person, Item3:DemoWebApi_DemoData_Client.Person, Item4:DemoWebApi_DemoData_Client.Person, Item5:DemoWebApi_DemoData_Client.Person, Item6:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.LinkPeopleCompany6 = function (peopleAndCompany, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany6'), peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany7
         * @param {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Person, Item3:DemoWebApi_DemoData_Client.Person, Item4:DemoWebApi_DemoData_Client.Person, Item5:DemoWebApi_DemoData_Client.Person, Item6:DemoWebApi_DemoData_Client.Person, Item7:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.LinkPeopleCompany7 = function (peopleAndCompany, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany7'), peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/PeopleCompany8
         * @param {{Item1:DemoWebApi_DemoData_Client.Person, Item2:DemoWebApi_DemoData_Client.Person, Item3:DemoWebApi_DemoData_Client.Person, Item4:DemoWebApi_DemoData_Client.Person, Item5:DemoWebApi_DemoData_Client.Person, Item6:DemoWebApi_DemoData_Client.Person, Item7:DemoWebApi_DemoData_Client.Person, Rest:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.LinkPeopleCompany8 = function (peopleAndCompany, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/PeopleCompany8'), peopleAndCompany, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple1
         * @return {{Item1:number}}
         */
        Tuple.prototype.GetTuple1 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/Tuple1'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple1
         * @param {{Item1:number}} tuple
         * @return {number}
         */
        Tuple.prototype.PostTuple1 = function (tuple, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/Tuple1'), tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple2
         * @return {{Item1:string, Item2:number}}
         */
        Tuple.prototype.GetTuple2 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/Tuple2'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple2
         * @param {{Item1:string, Item2:number}} tuple
         * @return {string}
         */
        Tuple.prototype.PostTuple2 = function (tuple, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/Tuple2'), tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple3
         * @return {{Item1:string, Item2:string, Item3:number}}
         */
        Tuple.prototype.GetTuple3 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/Tuple3'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple3
         * @param {{Item1:string, Item2:string, Item3:number}} tuple
         * @return {string}
         */
        Tuple.prototype.PostTuple3 = function (tuple, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/Tuple3'), tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple4
         * @return {{Item1:string, Item2:string, Item3:string, Item4:number}}
         */
        Tuple.prototype.GetTuple4 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/Tuple4'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple4
         * @param {{Item1:string, Item2:string, Item3:string, Item4:number}} tuple
         * @return {string}
         */
        Tuple.prototype.PostTuple4 = function (tuple, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/Tuple4'), tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple5
         * @return {{Item1:string, Item2:string, Item3:string, Item4:string, Item5:number}}
         */
        Tuple.prototype.GetTuple5 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/Tuple5'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple5
         * @param {{Item1:string, Item2:string, Item3:string, Item4:string, Item5:number}} tuple
         * @return {string}
         */
        Tuple.prototype.PostTuple5 = function (tuple, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/Tuple5'), tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple6
         * @return {{Item1:string, Item2:string, Item3:string, Item4:string, Item5:string, Item6:number}}
         */
        Tuple.prototype.GetTuple6 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/Tuple6'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple6
         * @param {{Item1:string, Item2:string, Item3:string, Item4:string, Item5:string, Item6:number}} tuple
         * @return {string}
         */
        Tuple.prototype.PostTuple6 = function (tuple, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/Tuple6'), tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple7
         * @return {{Item1:string, Item2:string, Item3:string, Item4:string, Item5:string, Item6:number, Item7:number}}
         */
        Tuple.prototype.GetTuple7 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/Tuple7'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple7
         * @param {{Item1:string, Item2:string, Item3:string, Item4:string, Item5:string, Item6:number, Item7:number}} tuple
         * @return {string}
         */
        Tuple.prototype.PostTuple7 = function (tuple, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/Tuple7'), tuple, callback, this.error, this.statusCode);
        };
        /**
         * GET api/Tuple/Tuple8
         * @return {{Item1:string, Item2:string, Item3:string, Item4:string, Item5:string, Item6:string, Item7:number, Rest:{Item1:string, Item2:string, Item3:string}}}
         */
        Tuple.prototype.GetTuple8 = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Tuple/Tuple8'), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Tuple/Tuple8
         * @param {{Item1:string, Item2:string, Item3:string, Item4:string, Item5:string, Item6:string, Item7:string, Rest:{Item1:string, Item2:string, Item3:string}}} tuple
         * @return {string}
         */
        Tuple.prototype.PostTuple8 = function (tuple, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Tuple/Tuple8'), tuple, callback, this.error, this.statusCode);
        };
        return Tuple;
    })();
    DemoWebApi_Controllers_Client.Tuple = Tuple;
    var Values = (function () {
        function Values(baseUri, error, statusCode) {
            if (baseUri === void 0) { baseUri = HttpClient.locationOrigin; }
            this.baseUri = baseUri;
            this.error = error;
            this.statusCode = statusCode;
            this.httpClient = new HttpClient();
        }
        /**
         * GET api/Values
         * @return {Array<string>}
         */
        Values.prototype.Get = function (callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Values'), callback, this.error, this.statusCode);
        };
        /**
         * GET api/Values/{id}?name={name}
         * @param {number} id
         * @param {string} name
         * @return {string}
         */
        Values.prototype.GetByIdAndName = function (id, name, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Values/' + id + '?name=' + name), callback, this.error, this.statusCode);
        };
        /**
         * GET api/Values?name={name}
         * @param {string} name
         * @return {string}
         */
        Values.prototype.GetByName = function (name, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'api/Values?name=' + name), callback, this.error, this.statusCode);
        };
        /**
         * POST api/Values
         * @param {string} value
         * @return {string}
         */
        Values.prototype.Post = function (value, callback) {
            this.httpClient.post(encodeURI(this.baseUri + 'api/Values'), value, callback, this.error, this.statusCode);
        };
        /**
         * PUT api/Values/{id}
         * @param {number} id
         * @param {string} value
         * @return {void}
         */
        Values.prototype.Put = function (id, value, callback) {
            this.httpClient.put(encodeURI(this.baseUri + 'api/Values/' + id), value, callback, this.error, this.statusCode);
        };
        /**
         * DELETE api/Values/{id}
         * @param {number} id
         * @return {void}
         */
        Values.prototype.Delete = function (id, callback) {
            this.httpClient.delete(encodeURI(this.baseUri + 'api/Values/' + id), callback, this.error, this.statusCode);
        };
        return Values;
    })();
    DemoWebApi_Controllers_Client.Values = Values;
})(DemoWebApi_Controllers_Client || (DemoWebApi_Controllers_Client = {}));
