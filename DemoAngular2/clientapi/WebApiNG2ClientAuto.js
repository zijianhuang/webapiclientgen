"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
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
})(DemoWebApi_DemoData_Client = exports.DemoWebApi_DemoData_Client || (exports.DemoWebApi_DemoData_Client = {}));
var DemoWebApi_Controllers_Client;
(function (DemoWebApi_Controllers_Client) {
    var SuperDemo = (function () {
        function SuperDemo(baseUri, http) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
            this.http = http;
        }
        /**
         * GET api/SuperDemo/int?d={d}
         * @param {number} d
         * @return {number}
         */
        SuperDemo.prototype.getIntSquare = function (d) {
            return this.http.get(this.baseUri + 'api/SuperDemo/int?d=' + d).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/decimal?d={d}
         * @param {number} d
         * @return {number}
         */
        SuperDemo.prototype.getDecimalSquare = function (d) {
            return this.http.get(this.baseUri + 'api/SuperDemo/decimal?d=' + d).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         * @param {boolean} hasValue
         * @return {Date}
         */
        SuperDemo.prototype.getDateTime = function (hasValue) {
            return this.http.get(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue=' + hasValue).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/NextYear?dt={dt}
         * @param {Date} dt
         * @return {Date}
         */
        SuperDemo.prototype.getNextYear = function (dt) {
            return this.http.get(this.baseUri + 'api/SuperDemo/NextYear?dt=' + dt).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/NextHour?dt={dt}
         * @param {Date} dt
         * @return {Date}
         */
        SuperDemo.prototype.getNextHour = function (dt) {
            return this.http.get(this.baseUri + 'api/SuperDemo/NextHour?dt=' + dt).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/NextYear
         * @param {Date} dt
         * @return {Date}
         */
        SuperDemo.prototype.postNextYear = function (dt) {
            return this.http.post(this.baseUri + 'api/SuperDemo/NextYear', JSON.stringify(dt), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/DateTimeOffset
         * @return {Date}
         */
        SuperDemo.prototype.getDateTimeOffset = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/DateTimeOffset').map(function (response) { return response.json() || {}; });
        };
        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         * @param {Date} d
         * @return {boolean}
         */
        SuperDemo.prototype.postDateTimeOffset = function (d) {
            return this.http.post(this.baseUri + 'api/SuperDemo/DateTimeOffset', JSON.stringify(d), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         * @param {Date} d
         * @return {boolean}
         */
        SuperDemo.prototype.postDateTimeOffsetNullable = function (d) {
            return this.http.post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', JSON.stringify(d), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         * @param {boolean} hasValue
         * @return {number}
         */
        SuperDemo.prototype.getNullableDecimal = function (hasValue) {
            return this.http.get(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue=' + hasValue).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/FloatZero
         * @return {number}
         */
        SuperDemo.prototype.getFloatZero = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/FloatZero').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/DoubleZero
         * @return {number}
         */
        SuperDemo.prototype.getDoubleZero = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/DoubleZero').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/DecimalZero
         * @return {number}
         */
        SuperDemo.prototype.getDecimalZero = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/DecimalZero').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/NullString
         * @return {string}
         */
        SuperDemo.prototype.getNullString = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/NullString').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/EmptyString
         * @return {string}
         */
        SuperDemo.prototype.getEmptyString = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/EmptyString').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/NullObject
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        SuperDemo.prototype.getNullPerson = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/NullObject').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/TextStream
         * @return {any}
         */
        SuperDemo.prototype.getTextStream = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/TextStream');
        };
        /**
         * GET api/SuperDemo/ByteArray
         * @return {Array<number>}
         */
        SuperDemo.prototype.getByteArray = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/ByteArray').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/ActionResult
         * @return {any}
         */
        SuperDemo.prototype.getActionResult = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/ActionResult');
        };
        /**
         * GET api/SuperDemo/ActionStringResult
         * @return {string}
         */
        SuperDemo.prototype.getActionStringResult = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/ActionStringResult').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/byte
         * @return {number}
         */
        SuperDemo.prototype.getbyte = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/byte').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/sbyte
         * @return {number}
         */
        SuperDemo.prototype.getsbyte = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/sbyte').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/short
         * @return {number}
         */
        SuperDemo.prototype.getShort = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/short').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/ushort
         * @return {number}
         */
        SuperDemo.prototype.getUShort = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/ushort').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/uint
         * @return {number}
         */
        SuperDemo.prototype.getUint = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/uint').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/ulong
         * @return {number}
         */
        SuperDemo.prototype.getulong = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/ulong').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/doulbe
         * @return {number}
         */
        SuperDemo.prototype.getdouble = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/doulbe').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/decimal
         * @return {number}
         */
        SuperDemo.prototype.getDecimal = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/decimal').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/char
         * @return {string}
         */
        SuperDemo.prototype.getChar = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/char').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/bool
         * @return {boolean}
         */
        SuperDemo.prototype.getBool = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/bool').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/int2d
         * @return {number[][]}
         */
        SuperDemo.prototype.getInt2D = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/int2d').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/int2dJagged
         * @return {Array<Array<number>>}
         */
        SuperDemo.prototype.getInt2DJagged = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/int2dJagged').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/int2d
         * @param {number[][]} a
         * @return {boolean}
         */
        SuperDemo.prototype.postInt2D = function (a) {
            return this.http.post(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/int2djagged
         * @param {Array<Array<number>>} a
         * @return {boolean}
         */
        SuperDemo.prototype.postInt2DJagged = function (a) {
            return this.http.post(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a
         * @return {boolean}
         */
        SuperDemo.prototype.postIntArray = function (a) {
            return this.http.post(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/intArray
         * @return {Array<number>}
         */
        SuperDemo.prototype.getIntArray = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/intArray').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/AnonymousDynamic
         * @return {any}
         */
        SuperDemo.prototype.getAnonymousDynamic = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/AnonymousDynamic');
        };
        /**
         * GET api/SuperDemo/AnonymousObject
         * @return {any}
         */
        SuperDemo.prototype.getAnonymousObject = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/AnonymousObject');
        };
        /**
         * POST api/SuperDemo/AnonymousObject
         * @param {any} obj
         * @return {any}
         */
        SuperDemo.prototype.postAnonymousObject = function (obj) {
            return this.http.post(this.baseUri + 'api/SuperDemo/AnonymousObject', JSON.stringify(obj), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
        };
        /**
         * GET api/SuperDemo/StringStringDic
         * @return {{[id: string]: string }}
         */
        SuperDemo.prototype.getDictionary = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/StringStringDic').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/StringPersonDic
         * @return {{[id: string]: DemoWebApi_DemoData_Client.Person }}
         */
        SuperDemo.prototype.getDictionaryOfPeople = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/StringPersonDic').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/StringPersonDic
         * @param {{[id: string]: DemoWebApi_DemoData_Client.Person }} dic
         * @return {number}
         */
        SuperDemo.prototype.postDictionary = function (dic) {
            return this.http.post(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/KeyValuePair
         * @return {{key: string, value: DemoWebApi_DemoData_Client.Person }}
         */
        SuperDemo.prototype.getKeyhValuePair = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/KeyValuePair').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/ICollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getICollection = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/ICollection').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/IList
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getIList = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/IList').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/IReadOnlyList
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getIReadOnlyList = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/IReadOnlyList').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/IReadOnlyCollection
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getIReadOnlyCollection = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/List
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getList = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/List').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/Collection
         * @return {Array<DemoWebApi_DemoData_Client.Person>}
         */
        SuperDemo.prototype.getCollection = function () {
            return this.http.get(this.baseUri + 'api/SuperDemo/Collection').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/ICollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postICollection = function (list) {
            return this.http.post(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/IList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postIList = function (list) {
            return this.http.post(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/IReadOnlyList
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postIReadOnlyList = function (list) {
            return this.http.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/IReadOnlyCollection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postIReadOnlyCollection = function (list) {
            return this.http.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/List
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postList = function (list) {
            return this.http.post(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/Collection
         * @param {Array<DemoWebApi_DemoData_Client.Person>} list
         * @return {number}
         */
        SuperDemo.prototype.postCollection = function (list) {
            return this.http.post(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/SuperDemo/PostEmpty?s={s}&i={i}
         * @param {string} s
         * @param {number} i
         * @return {{item1:string, item2:number}}
         */
        SuperDemo.prototype.postWithQueryButEmptyBody = function (s, i) {
            return this.http.post(this.baseUri + 'api/SuperDemo/PostEmpty?s=' + encodeURIComponent(s) + '&i=' + i, JSON.stringify(null), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        SuperDemo = __decorate([
            core_1.Injectable(),
            __param(0, core_1.Inject('baseUri')), 
            __metadata('design:paramtypes', [String, http_1.Http])
        ], SuperDemo);
        return SuperDemo;
    }());
    DemoWebApi_Controllers_Client.SuperDemo = SuperDemo;
    var Entities = (function () {
        function Entities(baseUri, http) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
            this.http = http;
        }
        /**
         * PUT api/SuperDemo/link?id={id}&relationship={relationship}
         * @param {number} id
         * @param {string} relationship
         * @param {DemoWebApi_DemoData_Client.Person} person
         * @return {boolean}
         */
        Entities.prototype.linkPerson = function (id, relationship, person) {
            return this.http.put(this.baseUri + 'api/SuperDemo/link?id=' + id + '&relationship=' + encodeURIComponent(relationship), JSON.stringify(person), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/Company?id={id}
         * @param {number} id
         * @return {DemoWebApi_DemoData_Client.Company}
         */
        Entities.prototype.getCompany = function (id) {
            return this.http.get(this.baseUri + 'api/SuperDemo/Company?id=' + id).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/PersonNotFound?id={id}
         * @param {number} id
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Entities.prototype.getPersonNotFound = function (id) {
            return this.http.get(this.baseUri + 'api/SuperDemo/PersonNotFound?id=' + id).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/SuperDemo/PersonActionNotFound?id={id}
         * @param {number} id
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Entities.prototype.getPersonActionNotFound = function (id) {
            return this.http.get(this.baseUri + 'api/SuperDemo/PersonActionNotFound?id=' + id).map(function (response) { return response.json() || {}; });
        };
        /**
         * Get a person
         * GET api/Entities/{id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        Entities.prototype.getPerson = function (id) {
            return this.http.get(this.baseUri + 'api/Entities/' + id).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} p
         * @return {number}
         */
        Entities.prototype.createPerson = function (p) {
            return this.http.post(this.baseUri + 'api/Entities', JSON.stringify(p), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * PUT api/Entities
         * @param {DemoWebApi_DemoData_Client.Person} person
         * @return {void}
         */
        Entities.prototype.updatePerson = function (person) {
            return this.http.put(this.baseUri + 'api/Entities', JSON.stringify(person), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
        };
        /**
         * DELETE api/Entities/{id}
         * @param {number} id
         * @return {void}
         */
        Entities.prototype.delete = function (id) {
            return this.http.delete(this.baseUri + 'api/Entities/' + id);
        };
        Entities = __decorate([
            core_1.Injectable(),
            __param(0, core_1.Inject('baseUri')), 
            __metadata('design:paramtypes', [String, http_1.Http])
        ], Entities);
        return Entities;
    }());
    DemoWebApi_Controllers_Client.Entities = Entities;
    var Tuple = (function () {
        function Tuple(baseUri, http) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
            this.http = http;
        }
        /**
         * POST api/Tuple/PersonCompany1
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPersonCompany1 = function (peopleAndCompany) {
            return this.http.post(this.baseUri + 'api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/PeopleCompany2
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany2 = function (peopleAndCompany) {
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/PeopleCompany3
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany3 = function (peopleAndCompany) {
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/PeopleCompany4
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany4 = function (peopleAndCompany) {
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/PeopleCompany4
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Company}}
         */
        Tuple.prototype.getPeopleCompany4 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/PeopleCompany4').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/PeopleCompany5
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany5 = function (peopleAndCompany) {
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/PeopleCompany5
         * @return {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Company}}
         */
        Tuple.prototype.getPeopleCompany5 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/PeopleCompany5').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/PeopleCompany6
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany6 = function (peopleAndCompany) {
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/PeopleCompany7
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany7 = function (peopleAndCompany) {
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/PeopleCompany8
         * @param {{item1:DemoWebApi_DemoData_Client.Person, item2:DemoWebApi_DemoData_Client.Person, item3:DemoWebApi_DemoData_Client.Person, item4:DemoWebApi_DemoData_Client.Person, item5:DemoWebApi_DemoData_Client.Person, item6:DemoWebApi_DemoData_Client.Person, item7:DemoWebApi_DemoData_Client.Person, rest:DemoWebApi_DemoData_Client.Company}} peopleAndCompany
         * @return {DemoWebApi_DemoData_Client.Person}
         */
        Tuple.prototype.linkPeopleCompany8 = function (peopleAndCompany) {
            return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/Tuple1
         * @return {{item1:number}}
         */
        Tuple.prototype.getTuple1 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/Tuple1').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/Tuple1
         * @param {{item1:number}} tuple
         * @return {number}
         */
        Tuple.prototype.postTuple1 = function (tuple) {
            return this.http.post(this.baseUri + 'api/Tuple/Tuple1', JSON.stringify(tuple), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/Tuple2
         * @return {{item1:string, item2:number}}
         */
        Tuple.prototype.getTuple2 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/Tuple2').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/Tuple2
         * @param {{item1:string, item2:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple2 = function (tuple) {
            return this.http.post(this.baseUri + 'api/Tuple/Tuple2', JSON.stringify(tuple), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/Tuple3
         * @return {{item1:string, item2:string, item3:number}}
         */
        Tuple.prototype.getTuple3 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/Tuple3').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/Tuple3
         * @param {{item1:string, item2:string, item3:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple3 = function (tuple) {
            return this.http.post(this.baseUri + 'api/Tuple/Tuple3', JSON.stringify(tuple), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/Tuple4
         * @return {{item1:string, item2:string, item3:string, item4:number}}
         */
        Tuple.prototype.getTuple4 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/Tuple4').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/Tuple4
         * @param {{item1:string, item2:string, item3:string, item4:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple4 = function (tuple) {
            return this.http.post(this.baseUri + 'api/Tuple/Tuple4', JSON.stringify(tuple), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/Tuple5
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:number}}
         */
        Tuple.prototype.getTuple5 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/Tuple5').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/Tuple5
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple5 = function (tuple) {
            return this.http.post(this.baseUri + 'api/Tuple/Tuple5', JSON.stringify(tuple), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/Tuple6
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}}
         */
        Tuple.prototype.getTuple6 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/Tuple6').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/Tuple6
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple6 = function (tuple) {
            return this.http.post(this.baseUri + 'api/Tuple/Tuple6', JSON.stringify(tuple), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/Tuple7
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}}
         */
        Tuple.prototype.getTuple7 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/Tuple7').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/Tuple7
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:number, item7:number}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple7 = function (tuple) {
            return this.http.post(this.baseUri + 'api/Tuple/Tuple7', JSON.stringify(tuple), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Tuple/Tuple8
         * @return {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:number, rest:{item1:string, item2:string, item3:string}}}
         */
        Tuple.prototype.getTuple8 = function () {
            return this.http.get(this.baseUri + 'api/Tuple/Tuple8').map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Tuple/Tuple8
         * @param {{item1:string, item2:string, item3:string, item4:string, item5:string, item6:string, item7:string, rest:{item1:string, item2:string, item3:string}}} tuple
         * @return {string}
         */
        Tuple.prototype.postTuple8 = function (tuple) {
            return this.http.post(this.baseUri + 'api/Tuple/Tuple8', JSON.stringify(tuple), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        Tuple = __decorate([
            core_1.Injectable(),
            __param(0, core_1.Inject('baseUri')), 
            __metadata('design:paramtypes', [String, http_1.Http])
        ], Tuple);
        return Tuple;
    }());
    DemoWebApi_Controllers_Client.Tuple = Tuple;
    var Heroes = (function () {
        function Heroes(baseUri, http) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
            this.http = http;
        }
        /**
         * GET api/Heroes
         * @return {Array<DemoWebApi_Controllers_Client.Hero>}
         */
        Heroes.prototype.get = function () {
            return this.http.get(this.baseUri + 'api/Heroes').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Heroes/{id}
         * @param {number} id
         * @return {DemoWebApi_Controllers_Client.Hero}
         */
        Heroes.prototype.getById = function (id) {
            return this.http.get(this.baseUri + 'api/Heroes/' + id).map(function (response) { return response.json() || {}; });
        };
        /**
         * DELETE api/Heroes/{id}
         * @param {number} id
         * @return {void}
         */
        Heroes.prototype.delete = function (id) {
            return this.http.delete(this.baseUri + 'api/Heroes/' + id);
        };
        /**
         * POST api/Heroes?name={name}
         * @param {string} name
         * @return {DemoWebApi_Controllers_Client.Hero}
         */
        Heroes.prototype.post = function (name) {
            return this.http.post(this.baseUri + 'api/Heroes?name=' + encodeURIComponent(name), JSON.stringify(null), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * PUT api/Heroes
         * @param {DemoWebApi_Controllers_Client.Hero} hero
         * @return {DemoWebApi_Controllers_Client.Hero}
         */
        Heroes.prototype.put = function (hero) {
            return this.http.put(this.baseUri + 'api/Heroes', JSON.stringify(hero), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Heroes?name={name}
         * @param {string} name
         * @return {Array<DemoWebApi_Controllers_Client.Hero>}
         */
        Heroes.prototype.search = function (name) {
            return this.http.get(this.baseUri + 'api/Heroes?name=' + encodeURIComponent(name)).map(function (response) { return response.json() || {}; });
        };
        Heroes = __decorate([
            core_1.Injectable(),
            __param(0, core_1.Inject('baseUri')), 
            __metadata('design:paramtypes', [String, http_1.Http])
        ], Heroes);
        return Heroes;
    }());
    DemoWebApi_Controllers_Client.Heroes = Heroes;
    var Values = (function () {
        function Values(baseUri, http) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
            this.http = http;
        }
        /**
         * GET api/Values
         * @return {Array<string>}
         */
        Values.prototype.get = function () {
            return this.http.get(this.baseUri + 'api/Values').map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Values/{id}?name={name}
         * @param {number} id
         * @param {string} name
         * @return {string}
         */
        Values.prototype.getByIdAndName = function (id, name) {
            return this.http.get(this.baseUri + 'api/Values/' + id + '?name=' + encodeURIComponent(name)).map(function (response) { return response.json() || {}; });
        };
        /**
         * GET api/Values?name={name}
         * @param {string} name
         * @return {string}
         */
        Values.prototype.getByName = function (name) {
            return this.http.get(this.baseUri + 'api/Values?name=' + encodeURIComponent(name)).map(function (response) { return response.json() || {}; });
        };
        /**
         * POST api/Values
         * @param {string} value
         * @return {string}
         */
        Values.prototype.post = function (value) {
            return this.http.post(this.baseUri + 'api/Values', JSON.stringify(value), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }).map(function (response) { return response.json() || {}; });
        };
        /**
         * PUT api/Values/{id}
         * @param {number} id
         * @param {string} value
         * @return {void}
         */
        Values.prototype.put = function (id, value) {
            return this.http.put(this.baseUri + 'api/Values/' + id, JSON.stringify(value), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
        };
        /**
         * DELETE api/Values/{id}
         * @param {number} id
         * @return {void}
         */
        Values.prototype.delete = function (id) {
            return this.http.delete(this.baseUri + 'api/Values/' + id);
        };
        Values = __decorate([
            core_1.Injectable(),
            __param(0, core_1.Inject('baseUri')), 
            __metadata('design:paramtypes', [String, http_1.Http])
        ], Values);
        return Values;
    }());
    DemoWebApi_Controllers_Client.Values = Values;
})(DemoWebApi_Controllers_Client = exports.DemoWebApi_Controllers_Client || (exports.DemoWebApi_Controllers_Client = {}));
//# sourceMappingURL=WebApiNG2ClientAuto.js.map