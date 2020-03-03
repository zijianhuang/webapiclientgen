"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
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
})(DemoWebApi_DemoData_Client = exports.DemoWebApi_DemoData_Client || (exports.DemoWebApi_DemoData_Client = {}));
var DemoWebApi_Controllers_Client;
(function (DemoWebApi_Controllers_Client) {
    var Entities = /** @class */ (function () {
        function Entities(baseUri) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
        }
        /**
         * POST api/Entities/createPerson
         */
        Entities.prototype.createPerson = function (p) {
            return axios_1["default"].post(this.baseUri + 'api/Entities/createPerson', JSON.stringify(p), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * DELETE api/Entities/{id}
         */
        Entities.prototype["delete"] = function (id) {
            return axios_1["default"]["delete"](this.baseUri + 'api/Entities/' + id, { responseType: 'text' });
        };
        /**
         * GET api/Entities/Company?id={id}
         */
        Entities.prototype.getCompany = function (id) {
            return axios_1["default"].get(this.baseUri + 'api/Entities/Company?id=' + id).then(function (d) { return d.data; });
        };
        /**
         * POST api/Entities/Mims
         */
        Entities.prototype.getMims = function (p) {
            return axios_1["default"].post(this.baseUri + 'api/Entities/Mims', JSON.stringify(p), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Entities/MyGeneric
         */
        Entities.prototype.getMyGeneric = function (s) {
            return axios_1["default"].post(this.baseUri + 'api/Entities/MyGeneric', JSON.stringify(s), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Entities/MyGenericPerson
         */
        Entities.prototype.getMyGenericPerson = function (s) {
            return axios_1["default"].post(this.baseUri + 'api/Entities/MyGenericPerson', JSON.stringify(s), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * Get a person
         * so to know the person
         * GET api/Entities/getPerson?id={id}
         * @param {number} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        Entities.prototype.getPerson = function (id) {
            return axios_1["default"].get(this.baseUri + 'api/Entities/getPerson?id=' + id).then(function (d) { return d.data; });
        };
        /**
         * GET api/Entities/PersonActionNotFound?id={id}
         */
        Entities.prototype.getPersonActionNotFound = function (id) {
            return axios_1["default"].get(this.baseUri + 'api/Entities/PersonActionNotFound?id=' + id).then(function (d) { return d.data; });
        };
        /**
         * GET api/Entities/PersonNotFound?id={id}
         */
        Entities.prototype.getPersonNotFound = function (id) {
            return axios_1["default"].get(this.baseUri + 'api/Entities/PersonNotFound?id=' + id).then(function (d) { return d.data; });
        };
        /**
         * PUT api/Entities/link?id={id}&relationship={relationship}
         */
        Entities.prototype.linkPerson = function (id, relationship, person) {
            return axios_1["default"].put(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + encodeURIComponent(relationship), JSON.stringify(person), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Entities/linkNewDecimal?id={id}
         */
        Entities.prototype.linkWithNewDecimal = function (id, p) {
            return axios_1["default"].post(this.baseUri + 'api/Entities/linkNewDecimal?id=' + id, JSON.stringify(p), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Entities/linkNewGuid?id={id}
         */
        Entities.prototype.linkWithNewGuid = function (id, p) {
            return axios_1["default"].post(this.baseUri + 'api/Entities/linkNewGuid?id=' + id, JSON.stringify(p), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Entities/linkLong?id={id}
         */
        Entities.prototype.linkWithNewLong = function (id, p) {
            return axios_1["default"].post(this.baseUri + 'api/Entities/linkLong?id=' + id, JSON.stringify(p), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * PUT api/Entities/updatePerson
         */
        Entities.prototype.updatePerson = function (person) {
            return axios_1["default"].put(this.baseUri + 'api/Entities/updatePerson', JSON.stringify(person), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        return Entities;
    }());
    DemoWebApi_Controllers_Client.Entities = Entities;
    var Heroes = /** @class */ (function () {
        function Heroes(baseUri) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
        }
        /**
         * DELETE api/Heroes/{id}
         */
        Heroes.prototype["delete"] = function (id) {
            return axios_1["default"]["delete"](this.baseUri + 'api/Heroes/' + id, { responseType: 'text' });
        };
        /**
         * Get a hero.
         * GET api/Heroes/{id}
         */
        Heroes.prototype.getHero = function (id) {
            return axios_1["default"].get(this.baseUri + 'api/Heroes/' + id).then(function (d) { return d.data; });
        };
        /**
         * Get all heroes.
         * GET api/Heroes
         */
        Heroes.prototype.getHeros = function () {
            return axios_1["default"].get(this.baseUri + 'api/Heroes').then(function (d) { return d.data; });
        };
        /**
         * This should triger error: System.ArgumentException: Web API Heroes/GetSomethingInvalid is defined with invalid parameters: Not support ParameterBinder FromQuery or FromUri with a class parameter.
         * GET api/Heroes/invalid
         */
        Heroes.prototype.getSomethingInvalid = function (h) {
            return axios_1["default"].get(this.baseUri + 'api/Heroes/invalid').then(function (d) { return d.data; });
        };
        /**
         * POST api/Heroes?name={name}
         */
        Heroes.prototype.post = function (name) {
            return axios_1["default"].post(this.baseUri + 'api/Heroes?name=' + encodeURIComponent(name), null, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * Add a hero
         * POST api/Heroes/q?name={name}
         */
        Heroes.prototype.postWithQuery = function (name) {
            return axios_1["default"].post(this.baseUri + 'api/Heroes/q?name=' + encodeURIComponent(name), null, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * Update hero.
         * PUT api/Heroes
         */
        Heroes.prototype.put = function (hero) {
            return axios_1["default"].put(this.baseUri + 'api/Heroes', JSON.stringify(hero), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * Search heroes
         * GET api/Heroes/search?name={name}
         * @param {string} name keyword contained in hero name.
         * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
         */
        Heroes.prototype.search = function (name) {
            return axios_1["default"].get(this.baseUri + 'api/Heroes/search?name=' + encodeURIComponent(name)).then(function (d) { return d.data; });
        };
        return Heroes;
    }());
    DemoWebApi_Controllers_Client.Heroes = Heroes;
    var SuperDemo = /** @class */ (function () {
        function SuperDemo(baseUri) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
        }
        /**
         * GET api/SuperDemo/ActionResult
         */
        SuperDemo.prototype.getActionResult = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/ActionResult', { responseType: 'text' }).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/ActionResult2
         */
        SuperDemo.prototype.getActionResult2 = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/ActionResult2', { responseType: 'text' }).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/ActionStringResult
         */
        SuperDemo.prototype.getActionStringResult = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/ActionStringResult').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/AnonymousDynamic
         */
        SuperDemo.prototype.getAnonymousDynamic = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/AnonymousDynamic', { responseType: 'text' });
        };
        /**
         * GET api/SuperDemo/AnonymousObject
         */
        SuperDemo.prototype.getAnonymousObject = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/AnonymousObject', { responseType: 'text' });
        };
        /**
         * GET api/SuperDemo/bool
         */
        SuperDemo.prototype.getBool = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/bool').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/byte
         */
        SuperDemo.prototype.getbyte = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/byte').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/ByteArray
         */
        SuperDemo.prototype.getByteArray = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/ByteArray').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/char
         */
        SuperDemo.prototype.getChar = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/char').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/Collection
         */
        SuperDemo.prototype.getCollection = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/Collection').then(function (d) { return d.data; });
        };
        /**
         * True to return now, false to return null
         * GET api/SuperDemo/NullableDatetime?hasValue={hasValue}
         */
        SuperDemo.prototype.getDateTime = function (hasValue) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/NullableDatetime?hasValue=' + hasValue).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/DateTimeOffset
         */
        SuperDemo.prototype.getDateTimeOffset = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/DateTimeOffset').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/decimal
         */
        SuperDemo.prototype.getDecimal = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/decimal').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/decimal?d={d}
         */
        SuperDemo.prototype.getDecimalSquare = function (d) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/decimal?d=' + d).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/DecimalZero
         */
        SuperDemo.prototype.getDecimalZero = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/DecimalZero').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/StringStringDic
         */
        SuperDemo.prototype.getDictionary = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/StringStringDic').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/StringPersonDic
         */
        SuperDemo.prototype.getDictionaryOfPeople = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/StringPersonDic').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/doulbe
         */
        SuperDemo.prototype.getdouble = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/doulbe').then(function (d) { return d.data; });
        };
        /**
         * Result of 0.1d + 0.2d - 0.3d
         * GET api/SuperDemo/DoubleZero
         */
        SuperDemo.prototype.getDoubleZero = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/DoubleZero').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/EmptyString
         */
        SuperDemo.prototype.getEmptyString = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/EmptyString').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/FloatZero
         */
        SuperDemo.prototype.getFloatZero = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/FloatZero').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/ICollection
         */
        SuperDemo.prototype.getICollection = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/ICollection').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/IList
         */
        SuperDemo.prototype.getIList = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/IList').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/int2d
         */
        SuperDemo.prototype.getInt2D = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/int2d').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/int2dJagged
         */
        SuperDemo.prototype.getInt2DJagged = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/int2dJagged').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/intArray
         */
        SuperDemo.prototype.getIntArray = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/intArray').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/int?d={d}
         */
        SuperDemo.prototype.getIntSquare = function (d) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/int?d=' + d).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/IReadOnlyCollection
         */
        SuperDemo.prototype.getIReadOnlyCollection = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/IReadOnlyList
         */
        SuperDemo.prototype.getIReadOnlyList = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/IReadOnlyList').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/KeyValuePair
         */
        SuperDemo.prototype.getKeyhValuePair = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/KeyValuePair').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/List
         */
        SuperDemo.prototype.getList = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/List').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/NextHour?dt={dt}
         */
        SuperDemo.prototype.getNextHour = function (dt) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/NextHour?dt=' + dt.toISOString()).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/NextHourNullable?n={n}&dt={dt}
         */
        SuperDemo.prototype.getNextHourNullable = function (n, dt) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/NextHourNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : '')).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/NextYear?dt={dt}
         */
        SuperDemo.prototype.getNextYear = function (dt) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/NextYear?dt=' + dt.toISOString()).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/NextYearNullable?n={n}&dt={dt}
         */
        SuperDemo.prototype.getNextYearNullable = function (n, dt) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/NextYearNullable?n=' + n + (dt ? '&dt=' + dt.toISOString() : '')).then(function (d) { return d.data; });
        };
        /**
         * True to return 100, and false to return null
         * GET api/SuperDemo/NullableDecimal?hasValue={hasValue}
         */
        SuperDemo.prototype.getNullableDecimal = function (hasValue) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/NullableDecimal?hasValue=' + hasValue).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/NullObject
         */
        SuperDemo.prototype.getNullPerson = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/NullObject').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/NullString
         */
        SuperDemo.prototype.getNullString = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/NullString').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
         */
        SuperDemo.prototype.getPrimitiveNullable = function (location, dd, de) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + encodeURIComponent(location) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : '')).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
         */
        SuperDemo.prototype.getPrimitiveNullable2 = function (dd, de) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : '')).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/sbyte
         */
        SuperDemo.prototype.getsbyte = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/sbyte').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/short
         */
        SuperDemo.prototype.getShort = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/short').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/TextStream
         */
        SuperDemo.prototype.getTextStream = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/TextStream', { responseType: 'blob' }).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/uint
         */
        SuperDemo.prototype.getUint = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/uint').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/ulong
         */
        SuperDemo.prototype.getulong = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/ulong').then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/ushort
         */
        SuperDemo.prototype.getUShort = function () {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/ushort').then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/ActionResult
         */
        SuperDemo.prototype.postActionResult = function () {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/ActionResult', null, { responseType: 'text' }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/PostActionResult2
         */
        SuperDemo.prototype.postActionResult2 = function (s) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/PostActionResult2', JSON.stringify(s), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/PostActionResult3
         */
        SuperDemo.prototype.postActionResult3 = function (person) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/PostActionResult3', JSON.stringify(person), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/AnonymousObject
         */
        SuperDemo.prototype.postAnonymousObject = function (obj) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/AnonymousObject', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' });
        };
        /**
         * POST api/SuperDemo/Collection
         */
        SuperDemo.prototype.postCollection = function (list) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * DateTime and DateTimeOffset may not be represented well in URL, so must put them into the POST body.
         * POST api/SuperDemo/DateTimeOffset
         */
        SuperDemo.prototype.postDateTimeOffset = function (d) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/DateTimeOffset', JSON.stringify(d), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/DateTimeOffsetNullable
         */
        SuperDemo.prototype.postDateTimeOffsetNullable = function (d) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/DateTimeOffsetNullable', JSON.stringify(d), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/StringPersonDic
         */
        SuperDemo.prototype.postDictionary = function (dic) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/Guids
         */
        SuperDemo.prototype.postGuids = function (guids) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/Guids', JSON.stringify(guids), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/ICollection
         */
        SuperDemo.prototype.postICollection = function (list) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/IList
         */
        SuperDemo.prototype.postIList = function (list) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/int2d
         */
        SuperDemo.prototype.postInt2D = function (a) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/int2djagged
         */
        SuperDemo.prototype.postInt2DJagged = function (a) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/intArray
         */
        SuperDemo.prototype.postIntArray = function (a) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/IReadOnlyCollection
         */
        SuperDemo.prototype.postIReadOnlyCollection = function (list) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/IReadOnlyList
         */
        SuperDemo.prototype.postIReadOnlyList = function (list) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/List
         */
        SuperDemo.prototype.postList = function (list) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/NextYear
         */
        SuperDemo.prototype.postNextYear = function (dt) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/NextYear', JSON.stringify(dt), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/SuperDemo/PostEmpty?s={s}&i={i}
         */
        SuperDemo.prototype.postWithQueryButEmptyBody = function (s, i) {
            return axios_1["default"].post(this.baseUri + 'api/SuperDemo/PostEmpty?s=' + encodeURIComponent(s) + '&i=' + i, null, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * GET api/SuperDemo/SearchDateRange?startDate={startDate}&endDate={endDate}
         */
        SuperDemo.prototype.searchDateRange = function (startDate, endDate) {
            return axios_1["default"].get(this.baseUri + 'api/SuperDemo/SearchDateRange?' + (startDate ? 'startDate=' + startDate.toISOString() : '') + (endDate ? '&endDate=' + endDate.toISOString() : '')).then(function (d) { return d.data; });
        };
        return SuperDemo;
    }());
    DemoWebApi_Controllers_Client.SuperDemo = SuperDemo;
    var Tuple = /** @class */ (function () {
        function Tuple(baseUri) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
        }
        /**
         * POST api/Tuple/ChangeName
         */
        Tuple.prototype.changeName = function (d) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/ChangeName', JSON.stringify(d), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/PeopleCompany4
         */
        Tuple.prototype.getPeopleCompany4 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/PeopleCompany4').then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/PeopleCompany5
         */
        Tuple.prototype.getPeopleCompany5 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/PeopleCompany5').then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/Tuple1
         */
        Tuple.prototype.getTuple1 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/Tuple1').then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/Tuple2
         */
        Tuple.prototype.getTuple2 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/Tuple2').then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/Tuple3
         */
        Tuple.prototype.getTuple3 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/Tuple3').then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/Tuple4
         */
        Tuple.prototype.getTuple4 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/Tuple4').then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/Tuple5
         */
        Tuple.prototype.getTuple5 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/Tuple5').then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/Tuple6
         */
        Tuple.prototype.getTuple6 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/Tuple6').then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/Tuple7
         */
        Tuple.prototype.getTuple7 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/Tuple7').then(function (d) { return d.data; });
        };
        /**
         * GET api/Tuple/Tuple8
         */
        Tuple.prototype.getTuple8 = function () {
            return axios_1["default"].get(this.baseUri + 'api/Tuple/Tuple8').then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/PeopleCompany2
         */
        Tuple.prototype.linkPeopleCompany2 = function (peopleAndCompany) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/PeopleCompany3
         */
        Tuple.prototype.linkPeopleCompany3 = function (peopleAndCompany) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/PeopleCompany4
         */
        Tuple.prototype.linkPeopleCompany4 = function (peopleAndCompany) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/PeopleCompany5
         */
        Tuple.prototype.linkPeopleCompany5 = function (peopleAndCompany) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/PeopleCompany6
         */
        Tuple.prototype.linkPeopleCompany6 = function (peopleAndCompany) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/PeopleCompany7
         */
        Tuple.prototype.linkPeopleCompany7 = function (peopleAndCompany) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/PeopleCompany8
         */
        Tuple.prototype.linkPeopleCompany8 = function (peopleAndCompany) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/PersonCompany1
         */
        Tuple.prototype.linkPersonCompany1 = function (peopleAndCompany) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/Tuple1
         */
        Tuple.prototype.postTuple1 = function (tuple) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/Tuple1', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/Tuple2
         */
        Tuple.prototype.postTuple2 = function (tuple) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/Tuple2', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/Tuple3
         */
        Tuple.prototype.postTuple3 = function (tuple) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/Tuple3', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/Tuple4
         */
        Tuple.prototype.postTuple4 = function (tuple) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/Tuple4', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/Tuple5
         */
        Tuple.prototype.postTuple5 = function (tuple) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/Tuple5', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/Tuple6
         */
        Tuple.prototype.postTuple6 = function (tuple) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/Tuple6', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/Tuple7
         */
        Tuple.prototype.postTuple7 = function (tuple) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/Tuple7', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * POST api/Tuple/Tuple8
         */
        Tuple.prototype.postTuple8 = function (tuple) {
            return axios_1["default"].post(this.baseUri + 'api/Tuple/Tuple8', JSON.stringify(tuple), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        return Tuple;
    }());
    DemoWebApi_Controllers_Client.Tuple = Tuple;
    var Values = /** @class */ (function () {
        function Values(baseUri) {
            if (baseUri === void 0) { baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'; }
            this.baseUri = baseUri;
        }
        /**
         * DELETE api/Values/{id}
         */
        Values.prototype["delete"] = function (id) {
            return axios_1["default"]["delete"](this.baseUri + 'api/Values/' + id, { responseType: 'text' });
        };
        /**
         * GET api/Values
         */
        Values.prototype.get = function () {
            return axios_1["default"].get(this.baseUri + 'api/Values').then(function (d) { return d.data; });
        };
        /**
         * GET api/Values/{id}?name={name}
         */
        Values.prototype.getByIdAndName = function (id, name) {
            return axios_1["default"].get(this.baseUri + 'api/Values/' + id + '?name=' + encodeURIComponent(name)).then(function (d) { return d.data; });
        };
        /**
         * GET api/Values?name={name}
         */
        Values.prototype.getByName = function (name) {
            return axios_1["default"].get(this.baseUri + 'api/Values?name=' + encodeURIComponent(name)).then(function (d) { return d.data; });
        };
        /**
         * GET api/Values/{id}
         */
        Values.prototype.getById = function (id) {
            return axios_1["default"].get(this.baseUri + 'api/Values/' + id).then(function (d) { return d.data; });
        };
        /**
         * POST api/Values
         */
        Values.prototype.post = function (value) {
            return axios_1["default"].post(this.baseUri + 'api/Values', JSON.stringify(value), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(function (d) { return d.data; });
        };
        /**
         * PUT api/Values/{id}
         */
        Values.prototype.put = function (id, value) {
            return axios_1["default"].put(this.baseUri + 'api/Values/' + id, JSON.stringify(value), { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, responseType: 'text' });
        };
        return Values;
    }());
    DemoWebApi_Controllers_Client.Values = Values;
})(DemoWebApi_Controllers_Client = exports.DemoWebApi_Controllers_Client || (exports.DemoWebApi_Controllers_Client = {}));
