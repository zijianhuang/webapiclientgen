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
            if (baseUri === void 0) { baseUri = ''; }
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
        return SuperDemo;
    })();
    DemoWebApi_Controllers_Client.SuperDemo = SuperDemo;
    var Entities = (function () {
        function Entities(baseUri, error, statusCode) {
            if (baseUri === void 0) { baseUri = ''; }
            this.baseUri = baseUri;
            this.error = error;
            this.statusCode = statusCode;
            this.httpClient = new HttpClient();
        }
        /**
         * GET Company?id={id}
         * @param {number} id
         * @return {DemoWebApi_DemoData_Client.Company}
         */
        Entities.prototype.GetCompany = function (id, callback) {
            this.httpClient.get(encodeURI(this.baseUri + 'Company?id=' + id), callback, this.error, this.statusCode);
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
    var Values = (function () {
        function Values(baseUri, error, statusCode) {
            if (baseUri === void 0) { baseUri = ''; }
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
//# sourceMappingURL=WebApiClientAuto.js.map