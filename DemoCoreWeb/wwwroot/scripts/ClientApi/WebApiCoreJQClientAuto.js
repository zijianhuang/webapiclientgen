///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="HttpClient.ts" />
var DemoWebApi_Controllers_Client;
(function (DemoWebApi_Controllers_Client) {
    /**
     * For testing different commbinations of parameters and returns
     */
    class DateTypes {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * GET api/DateTypes/GetDateOnlyMin
         * @return {Date} Type: DateOnly
         */
        getDateOnlyMin(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/GetDateOnlyMin', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/DateTypes/NullableDatetime/{hasValue}
         */
        getDateTime(hasValue, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/NullableDatetime/' + hasValue, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * return DateTimeOffset.Now
         * GET api/DateTypes/ForDateTimeOffset
         */
        getDateTimeOffset(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/ForDateTimeOffset', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/DateTypes/NextHour/{dt}
         */
        getNextHour(dt, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/NextHour/' + dt?.toISOString(), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * If Dt is not defined, add a hour from now
         * GET api/DateTypes/NextHourNullable?n={n}&dt={dt}
         * @param {number} n Type: int, -2,147,483,648 to 2,147,483,647
         */
        getNextHourNullable(n, dt, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/NextHourNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/DateTypes/NextYear/{dt}
         */
        getNextYear(dt, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/NextYear/' + dt?.toISOString(), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * If Dt is not defined, add a year from now
         * GET api/DateTypes/NextYearNullable?n={n}&dt={dt}
         * @param {number} n Type: int, -2,147,483,648 to 2,147,483,647
         */
        getNextYearNullable(n, dt, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/NextYearNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Client should send DateTime.Date
         * POST api/DateTypes/IsDateTimeDate
         */
        isDateTimeDate(dt, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/IsDateTimeDate', dt, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/DateTypes/IsDateTimeOffsetDate
         */
        isDateTimeOffsetDate(dt, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/IsDateTimeOffsetDate', dt, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/DateTypes/ForDateOnly
         * @param {Date} d Type: DateOnly
         * @return {Date} Type: DateOnly
         */
        postDateOnly(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateOnly', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/DateTypes/DateOnlyNullable
         */
        postDateOnlyNullable(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/DateOnlyNullable', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/DateTypes/ForDateTime
         */
        postDateTime(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTime', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/DateTypes/DateTimeNullable
         */
        postDateTimeNullable(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/DateTimeNullable', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * return d;
         * POST api/DateTypes/ForDateTimeOffset
         */
        postDateTimeOffset(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTimeOffset', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * return d.ToString("O")
         * POST api/DateTypes/ForDateTimeOffsetForO
         */
        postDateTimeOffsetForO(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetForO', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/DateTypes/ForDateTimeOffsetForOffset
         */
        postDateTimeOffsetForOffset(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetForOffset', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Returned is DateTimeOffset?
         * POST api/DateTypes/DateTimeOffsetNullable
         */
        postDateTimeOffsetNullable(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/DateTimeOffsetNullable', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/DateTypes/ForDateTimeOffsetStringForOffset
         */
        postDateTimeOffsetStringForOffset(s, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetStringForOffset', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/DateTypes/NextYear
         */
        postNextYear(dt, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/DateTypes/NextYear', dt, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * GET api/DateTypes/DateOnlyStringQuery?d={d}
         * @return {Date} Type: DateOnly
         */
        queryDateOnlyAsString(d, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/DateOnlyStringQuery?d=' + (!d ? '' : encodeURIComponent(d)), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/DateTypes/RouteDateTimeOffset/{d}
         */
        routeDateTimeOffset(d, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/RouteDateTimeOffset/' + d?.toISOString(), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Return Tuple DateTime?, DateTime?
         * GET api/DateTypes/SearchDateRange?startDate={startDate}&endDate={endDate}
         * @param {Date} startDate DateTime? startDate = null
         * @param {Date} endDate DateTime? endDate = null
         */
        searchDateRange(startDate, endDate, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/DateTypes/SearchDateRange?' + (startDate ? 'startDate=' + startDate?.toISOString() : '') + (endDate ? '&endDate=' + endDate?.toISOString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.DateTypes = DateTypes;
    /**
     * Entities, Person and Company
     * Some with AuthorizeAttribute
     */
    class Entities {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * POST api/Entities/createCompany
         */
        createCompany(p, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/createCompany', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Entities/createPerson
         * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
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
         * POST api/Entities/createPersonByAdmin
         * Status Codes: 404:NotFound, 204:NoContent, 422:UnprocessableEntity
         */
        createPersonByAdmin(p, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPersonByAdmin', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Entities/createPersonWeak
         * Status Codes: 404:NotFound, 204:NoContent, 200:OK : DemoWebApi.DemoData.Person
         */
        createPersonWeak(p, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPersonWeak', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Entities/createPersonWithNotFound
         * Status Codes: 404:NotFound
         */
        createPersonWithNotFound(p, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPersonWithNotFound', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Entities/createPersonWithStatuses
         * Status Codes: 404:NotFound, 204:NoContent, 422:UnprocessableEntity
         */
        createPersonWithStatuses(p, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/createPersonWithStatuses', p, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * DELETE api/Entities/{id}
         * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
         */
        delete(id, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Entities/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Entities/Company/{id}
         * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
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
         * Post MyGeneric string, decimal, double
         * POST api/Entities/MyGeneric
         */
        getMyGeneric(s, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGeneric', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Post MyGeneric string, decimal, Person
         * POST api/Entities/MyGenericPerson
         */
        getMyGenericPerson(s, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/MyGenericPerson', s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Return empty body, status 204. MaybeNull
         * GET api/Entities/NullCompany
         */
        getNullCompany(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Entities/NullCompany', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get a person
         * so to know the person
         * GET api/Entities/getPerson/{id}
         * @param {string} id unique id of that guy
         * @return {DemoWebApi_DemoData_Client.Person} person in db
         */
        getPerson(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Entities/getPerson/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Entities/getPerson2/{id}
         * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
         */
        getPerson2(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Entities/getPerson2/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * PUT api/Entities/link?id={id}&relationship={relationship}
         * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
         */
        linkPerson(id, relationship, person, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + (!relationship ? '' : encodeURIComponent(relationship)), person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
         * PATCH api/Entities/patchPerson
         */
        patchPerson(person, callback, headersHandler) {
            this.httpClient.patch(this.baseUri + 'api/Entities/patchPerson', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Entities/IdMap
         */
        postIdMap(idMap, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Entities/IdMap', idMap, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * PUT api/Entities/updatePerson
         */
        updatePerson(person, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Entities/updatePerson', person, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.Entities = Entities;
    /**
     * Heroes operations. Decorated by nullable directive.
     */
    class Heroes {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * DELETE api/Heroes/{id}
         * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
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
         * Get a hero. Nullable reference. MaybeNull
         * GET api/Heroes/{id}
         * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
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
         * MaybeNull
         * GET api/Heroes/super?id={id}
         * @param {string} id Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
         */
        getSuperHero(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Heroes/super?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/Heroes
         */
        post(name, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Heroes', name, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Add a hero. The client will not expect null. NotNull
         * POST api/Heroes/q?name={name}
         * @param {string} name name of hero
         * @return {DemoWebApi_Controllers_Client.Hero} Always object.
         */
        postWithQuery(name, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Heroes/q?name=' + (!name ? '' : encodeURIComponent(name)), null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
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
            this.httpClient.get(this.baseUri + 'api/Heroes/search/' + (!name ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode, headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.Heroes = Heroes;
    /**
     * For testing different commbinations of parameters and returns
     */
    class Numbers {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * GET api/Numbers/byte?d={d}
         * @param {number} d Type: byte, 0 to 255
         * @return {number} Type: byte, 0 to 255
         */
        getByte(d, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Numbers/byte?d=' + d, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Numbers/byteWithRange?d={d}
         * @param {number} d Byte for small number.
         * @return {number} Type: byte, 0 to 255
         */
        getByteWithRange(d, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Numbers/byteWithRange?d=' + d, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/Numbers/byte
         * @param {number} d Type: byte, 0 to 255
         * @return {number} Type: byte, 0 to 255
         */
        postByDOfByte(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/byte', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/sbyte
         * @param {number} d Type: sbyte, -128 to 127
         * @return {number} Type: sbyte, -128 to 127
         */
        postByDOfSByte(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/sbyte', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/short
         * @param {number} d Type: short, -32,768 to 32,767
         * @return {number} Type: short, -32,768 to 32,767
         */
        postByDOfInt16(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/short', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/ushort
         * @param {number} d Type: ushort, 0 to 65,535
         * @return {number} Type: ushort, 0 to 65,535
         */
        postByDOfUInt16(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/ushort', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/int
         * @param {number} d Type: int, -2,147,483,648 to 2,147,483,647
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        postByDOfInt32(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/int', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/long
         * @param {string} d Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
         * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
         */
        postByDOfInt64(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/long', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/ulong
         * @param {string} d Type: ulong, 0 to 18,446,744,073,709,551,615
         * @return {string} Type: ulong, 0 to 18,446,744,073,709,551,615
         */
        postByDOfUInt64(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/ulong', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/bigInteger
         * @param {string} bigInteger Type: BigInteger
         * @return {string} Type: BigInteger
         */
        postBigInteger(bigInteger, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/bigInteger', bigInteger, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/bigIntegralAsStringForJs
         */
        postBigIntegralAsStringForJs(bigIntegral, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/bigIntegralAsStringForJs', bigIntegral, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/BigNumbers
         */
        postBigNumbers(bigNumbers, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/BigNumbers', bigNumbers, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/int128
         * @param {string} int128 Type: Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727
         * @return {string} Type: Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727
         */
        postInt128(int128, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/int128', int128, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/int64
         * @param {string} int64 Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
         * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
         */
        postInt64(int64, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/int64', int64, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/IntegralEntity
         */
        postIntegralEntity(integralEntity, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/IntegralEntity', integralEntity, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/IntegralEntityMustBeValid
         */
        postIntegralEntityMustBeValid(integralEntity, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/IntegralEntityMustBeValid', integralEntity, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/intRange
         * @param {number} d Type: int
         *     Range: inclusive between 1 and 100
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        postIntWithRange(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/intRange', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Range is with double, not long. Precision of double: ~15-17 digits, while long.MaxValue 9223372036854775807 has 19 decimal digits.
         * POST api/Numbers/longRange
         * @param {string} d Type: long
         *     Range: inclusive between 1000 and 9223372036854775800
         * @return {string} Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
         */
        postLongWithRange(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/longRange', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/uint128
         * @param {string} uint128 Type: UInt128, 0 to 340282366920938463463374607431768211455
         * @return {string} Type: UInt128, 0 to 340282366920938463463374607431768211455
         */
        postUint128(uint128, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/uint128', uint128, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/Numbers/uint64
         * @param {string} uint64 Type: ulong, 0 to 18,446,744,073,709,551,615
         * @return {string} Type: ulong, 0 to 18,446,744,073,709,551,615
         */
        postUint64(uint64, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Numbers/uint64', uint64, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.Numbers = Numbers;
    /**
     * For testing posting and getting string data. Returned string is JSON object.
     */
    class StringData {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * Athlethe Search
         * GET api/StringData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
         * @param {number} take Generic optional parameter. Default 10
         * @param {number} skip Default 0
         * @param {string} order default null
         */
        athletheSearch(take, skip, order, sort, search, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/StringData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/StringData/String
         */
        getABCDE(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/StringData/String', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Return empty string JSON object. Status 200.
         * GET api/StringData/EmptyString
         */
        getEmptyString(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/StringData/EmptyString', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Return empty body with status 204 No Content, even though the default mime type is application/json. MaybeNull
         * GET api/StringData/NullString
         */
        getNullString(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/StringData/NullString', callback, this.error, this.statusCode, headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.StringData = StringData;
    /**
     * For testing different commbinations of parameters and returns
     */
    class SuperDemo {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
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
         * Status Codes: 200:OK : System.String
         */
        getActionStringResult(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ActionStringResult', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/BadRequest
         */
        getBadRequest(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/BadRequest', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/BadRequest2
         */
        getBadRequest2(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/BadRequest2', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/bool
         */
        getBool(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/bool', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/byte
         * @return {number} Type: byte, 0 to 255
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
         * @return {string} Type: char
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
         * GET api/SuperDemo/enumGet?d={d}
         */
        getDay(d, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/enumGet?d=' + d, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/decimal
         * @return {number} Type: decimal
         */
        getDecimal(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Demo
         * GET api/SuperDemo/decimalArrayQ?a={a}
         */
        getDecimalArrayQ(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimalArrayQ?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/decimal/{d}
         * @param {number} d Type: decimal
         * @return {number} Type: decimal
         */
        getDecimalSquare(d, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/decimal/' + d, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/DecimalZero
         * @return {number} Type: decimal
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
         * GET api/SuperDemo/StringPersonDic2
         */
        getDictionaryOfPeople2(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/StringPersonDic2', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/doulbe
         * @return {number} Type: double
         */
        getdouble(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/doulbe', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Result of 0.1d + 0.2d - 0.3d
         * GET api/SuperDemo/DoubleZero
         * @return {number} Type: double
         */
        getDoubleZero(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleZero', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Demo IEnumerable Days
         * GET api/SuperDemo/enumArrayDays?a={a}
         */
        getEnumArrayDays(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/enumArrayDays?' + a?.map(z => `a=${z}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/enumArrayQ2?a={a}
         */
        getEnumArrayQ2(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/enumArrayQ2?' + a?.map(z => `a=${z}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/FloatZero
         * @return {number} Type: float
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
         * Demo int[];
         * GET api/SuperDemo/intArrayQ?a={a}
         */
        getIntArrayQ(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArrayQ?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Demo IEnumerable long
         * GET api/SuperDemo/intArrayQ2?a={a}
         */
        getIntArrayQ2(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/intArrayQ2?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/int/{d}
         * @param {number} d Type: int, -2,147,483,648 to 2,147,483,647
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
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
         * False to return null, and true to return 1000
         * GET api/SuperDemo/NullableDecimal/{hasValue}
         */
        getNullableDecimal(hasValue, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * MaybeNull
         * GET api/SuperDemo/NullObject
         */
        getNullPerson(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/NullObject', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
         */
        getPrimitiveNullable(location, dd, de, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + (!location ? '' : encodeURIComponent(location)) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
         */
        getPrimitiveNullable2(dd, de, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/sbyte
         * @return {number} Type: sbyte, -128 to 127
         */
        getsbyte(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/sbyte', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/short
         * @return {number} Type: short, -32,768 to 32,767
         */
        getShort(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/short', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Demo string array
         * GET api/SuperDemo/stringArrayQ?a={a}
         */
        getStringArrayQ(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/stringArrayQ?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Demo List string
         * GET api/SuperDemo/stringArrayQ2?a={a}
         */
        getStringArrayQ2(a, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/stringArrayQ2?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * ActionResult with FileStreamResult
         * GET api/SuperDemo/TextStream
         */
        getTextStream(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/TextStream', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/uint
         * @return {number} Type: uint, 0 to 4,294,967,295
         */
        getUint(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/uint', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/ulong
         * @return {string} Type: ulong, 0 to 18,446,744,073,709,551,615
         */
        getulong(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/SuperDemo/ulong', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/SuperDemo/ushort
         * @return {number} Type: ushort, 0 to 65,535
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
         * Post a collection of person
         * POST api/SuperDemo/Collection
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        postCollection(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/Collection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/enumPost?d={d}
         */
        postDay(d, d2, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/enumPost?d=' + d, d2, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Demo Dic string and person
         * POST api/SuperDemo/StringPersonDic
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
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
         * Post ICollection of person
         * POST api/SuperDemo/ICollection
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        postICollection(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/ICollection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Post IList of person
         * POST api/SuperDemo/IList
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
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
         * Demo int[][]
         * POST api/SuperDemo/int2djagged
         */
        postInt2DJagged(a, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/int2djagged', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Demo int[]
         * POST api/SuperDemo/intArray
         * @param {Array<number>} a Min length: 1
         *     Max length: 10
         */
        postIntArray(a, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/intArray', a, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Post IReadOnlyCollection of person
         * POST api/SuperDemo/IReadOnlyCollection
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        postIReadOnlyCollection(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Post e of person
         * POST api/SuperDemo/IReadOnlyList
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        postIReadOnlyList(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Post a list of person
         * POST api/SuperDemo/List
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        postList(list, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/List', list, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * POST api/SuperDemo/PostEmpty/{i}
         * @param {number} i Type: int, -2,147,483,648 to 2,147,483,647
         */
        postWithQueryButEmptyBody(s, i, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, s, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.SuperDemo = SuperDemo;
    /**
     * For testing posting and getting string data. String returned is text/plain by default
     */
    class TextData {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * GET api/TextData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
         * @param {number} skip Type: int, -2,147,483,648 to 2,147,483,647
         */
        athletheSearch(take, skip, order, sort, search, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/TextData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/TextData/String
         */
        getABCDE(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/TextData/String', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Return empty body with status 200.
         * GET api/TextData/EmptyString
         */
        getEmptyString(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/TextData/EmptyString', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * MaybeNull
         * GET api/TextData/NullableString
         */
        getNullableString(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/TextData/NullableString', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Return empty body with status 204 No Content.
         * GET api/TextData/NullString
         */
        getNullString(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/TextData/NullString', callback, this.error, this.statusCode, headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.TextData = TextData;
    /**
     * https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.3.3
     */
    class Tuple {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * Update in a transaction
         * PUT api/Tuple/A1TupleArray
         */
        a1TupleArray(idAndOrderArray, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Tuple/A1TupleArray', idAndOrderArray, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Update IEnumerable Tuple in a transaction
         * PUT api/Tuple/A2TupleArray
         */
        a2TupleIEnumerable(idAndOrderArray, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Tuple/A2TupleArray', idAndOrderArray, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Post tuple
         * POST api/Tuple/ChangeName
         */
        changeName(d, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/ChangeName', d, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Get Tuple in return. MaybeNull
         * GET api/Tuple/PeopleCompany4
         */
        getPeopleCompany4(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tuple/PeopleCompany4', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * MaybeNull
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
         * Post nested tuple
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
         * Post long tuple
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
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        postTuple1(tuple, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tuple/Tuple1', tuple, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Post tuple string int
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
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * DELETE api/Values/{id}
         * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
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
         * GET api/Values/Name/{id}?name={name}
         * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
         */
        getByIdOfInt32AndNameOfString(id, name, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Values/Name/' + id + '?name=' + (!name ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get by name
         * GET api/Values?name={name}
         */
        getByNameOfString(name, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Values?name=' + (!name ? '' : encodeURIComponent(name)), callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get by Id
         * GET api/Values/{id}
         * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
         */
        getByIdOfInt32(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Values/' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get a list of value async, it is get2
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
         * @param {number} id Type: int, -2,147,483,648 to 2,147,483,647
         */
        put(id, value, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Values/' + id, value, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    DemoWebApi_Controllers_Client.Values = Values;
})(DemoWebApi_Controllers_Client || (DemoWebApi_Controllers_Client = {}));
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
    let MedicalContraindiationResponseTypeReason;
    (function (MedicalContraindiationResponseTypeReason) {
        MedicalContraindiationResponseTypeReason["M"] = "Mm";
        MedicalContraindiationResponseTypeReason["S"] = "Ss";
        MedicalContraindiationResponseTypeReason["P"] = "Pp";
        MedicalContraindiationResponseTypeReason["I"] = "I";
        MedicalContraindiationResponseTypeReason["A"] = "A";
    })(MedicalContraindiationResponseTypeReason = DemoWebApi_DemoData_Client.MedicalContraindiationResponseTypeReason || (DemoWebApi_DemoData_Client.MedicalContraindiationResponseTypeReason = {}));
    let MedicalContraindiationResponseTypeTypeCode;
    (function (MedicalContraindiationResponseTypeTypeCode) {
        MedicalContraindiationResponseTypeTypeCode["P"] = "P";
        MedicalContraindiationResponseTypeTypeCode["T"] = "Tt";
    })(MedicalContraindiationResponseTypeTypeCode = DemoWebApi_DemoData_Client.MedicalContraindiationResponseTypeTypeCode || (DemoWebApi_DemoData_Client.MedicalContraindiationResponseTypeTypeCode = {}));
    let MyEnumType;
    (function (MyEnumType) {
        MyEnumType[MyEnumType["First"] = 1] = "First";
        MyEnumType[MyEnumType["Two"] = 2] = "Two";
    })(MyEnumType = DemoWebApi_DemoData_Client.MyEnumType || (DemoWebApi_DemoData_Client.MyEnumType = {}));
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
var Fonlow_PoemsApp_Data_Client;
(function (Fonlow_PoemsApp_Data_Client) {
    let BodyType;
    (function (BodyType) {
        BodyType[BodyType["Text"] = 0] = "Text";
        BodyType[BodyType["HTML"] = 1] = "HTML";
        BodyType[BodyType["MD"] = 2] = "MD";
    })(BodyType = Fonlow_PoemsApp_Data_Client.BodyType || (Fonlow_PoemsApp_Data_Client.BodyType = {}));
})(Fonlow_PoemsApp_Data_Client || (Fonlow_PoemsApp_Data_Client = {}));
var DemoCoreWeb_Controllers_Client;
(function (DemoCoreWeb_Controllers_Client) {
    class SpecialTypes {
        baseUri;
        httpClient;
        error;
        statusCode;
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
         * Async function returing dynamic
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
         * Async function returning object
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
         * Async returning object, Post dynamic
         * POST api/SpecialTypes/AnonymousObject2
         */
        postAnonymousObject2(obj, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/SpecialTypes/AnonymousObject2', obj, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    DemoCoreWeb_Controllers_Client.SpecialTypes = SpecialTypes;
})(DemoCoreWeb_Controllers_Client || (DemoCoreWeb_Controllers_Client = {}));
var PoemsApp_Controllers_Client;
(function (PoemsApp_Controllers_Client) {
    /**
     * Album specific operations
     */
    class Albums {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * Add album. If publisheDate is not defined, it will be now.
         * POST api/Albums
         */
        add(album, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Albums', album, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Delete along with what in poemAlbumMap.
         * DELETE api/Albums?id={id}
         * @param {string} id Type: GUID
         */
        delete(id, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Albums?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get Album. Support ZH Convert.
         * GET api/Albums?id={id}
         * @param {string} id Type: GUID
         */
        get(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Albums?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get all albums. Support ZH Convert.
         * GET api/Albums/all
         * @param {number} timezoneOffset int in header
         */
        getAll(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Albums/all', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get all albums as dictionary. Support ZH Convert.
         * GET api/Albums/allDic
         * @param {number} timezoneOffset int in header
         */
        getAllDic(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Albums/allDic', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * PUT api/Albums
         */
        update(album, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Albums', album, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    PoemsApp_Controllers_Client.Albums = Albums;
    /**
     * Annotations management
     */
    class Annotations {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * POST api/Annotations
         * @return {string} Type: GUID
         */
        add(annotation, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Annotations', annotation, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Delete along with what in poemAnnotationMap.
         * DELETE api/Annotations?id={id}
         * @param {string} id Type: GUID
         */
        delete(id, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Annotations?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/Annotations/Orphaned
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        deleteOrphaned(ids, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Annotations/Orphaned', ids, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Get annotation. Support ZH Convert.
         * GET api/Annotations?id={id}
         * @param {string} id Type: GUID
         */
        get(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Annotations?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Annotations/all
         */
        getAnnotationBriefs(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Annotations/all', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get all annotation briefs. Support ZH Convert.
         * GET api/Annotations/allDic
         */
        getAnnotationBriefsDic(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Annotations/allDic', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Annotations/Orphaned
         */
        getOrphaned(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Annotations/Orphaned', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Annotations/PoemCountOfAnnotations
         */
        getPoemCountOfAnnotations(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Annotations/PoemCountOfAnnotations', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * PUT api/Annotations
         */
        update(annotation, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Annotations', annotation, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    PoemsApp_Controllers_Client.Annotations = Annotations;
    /**
     * Annotations management
     */
    class NumberedAnnotations {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * POST api/NumberedAnnotations
         * @return {string} Type: GUID
         */
        add(numberedAnnotation, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/NumberedAnnotations', numberedAnnotation, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Add multiple annotations
         * POST api/NumberedAnnotations/poem/{poemId}
         * @param {string} poemId Type: GUID
         */
        addMuitiple(poemId, orderNumbers, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/NumberedAnnotations/poem/' + poemId, orderNumbers, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Update the orders of numbered annotations in a transaction
         * PUT api/NumberedAnnotations/BulkOrderNumbers
         */
        bulkUpdateOrderNumbers(idAndOrderArray, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/NumberedAnnotations/BulkOrderNumbers', idAndOrderArray, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Delete along with what in poemNumberedAnnotationMap.
         * DELETE api/NumberedAnnotations?id={id}
         * @param {string} id Type: GUID
         */
        delete(id, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/NumberedAnnotations?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get numberedAnnotation. Support ZH Convert.
         * GET api/NumberedAnnotations?id={id}
         * @param {string} id Type: GUID
         */
        get(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/NumberedAnnotations?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Update annotation
         * PUT api/NumberedAnnotations
         */
        update(numberedAnnotation, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/NumberedAnnotations', numberedAnnotation, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Update Order Number
         * PUT api/NumberedAnnotations/OrderNumber?id={id}&orderNumber={orderNumber}
         * @param {string} id Type: GUID
         * @param {number} orderNumber Type: int, -2,147,483,648 to 2,147,483,647
         */
        updateOrderNumber(id, orderNumber, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/NumberedAnnotations/OrderNumber?id=' + id + '&orderNumber=' + orderNumber, null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    PoemsApp_Controllers_Client.NumberedAnnotations = NumberedAnnotations;
    /**
     * Poems operations; associations with tags, albums and annotations.
     */
    class Poems {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * Add poem. If created is undefined, it will be now. And modified is always now.
         * POST api/Poems
         * @return {Fonlow_PoemsApp_Data_Client.Poem} Id of newly added
         */
        add(poem, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Poems', poem, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Add new poem with existing annotations and new annotation names.
         * PUT api/Poems/AddWithExistingAnnotations
         * @param {{item1: Fonlow_PoemsApp_Data_Client.Poem, item2: Array<string>}} poemAndAnnotations new poem, existing Annotation Ids, and new annotation names
         * @return {Fonlow_PoemsApp_Data_Client.Poem} Poem Id and new annotation objects
         */
        addWithExistingAnnotations(poemAndAnnotations, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/AddWithExistingAnnotations', poemAndAnnotations, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Poem with Tags
         * POST api/Poems/addWithExistingTags
         */
        addWithExistingTags(poemAndTags, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Poems/addWithExistingTags', poemAndTags, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * PUT api/Poems/AddWithNewAnnotationNames
         */
        addWithNewAnnotationNames(poemAndAnnotations, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/AddWithNewAnnotationNames', poemAndAnnotations, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Add new poem with existing tags, and new tag names.
         * POST api/Poems/AddWithNewTagNames
         * @param {{item1: Fonlow_PoemsApp_Data_Client.Poem, item2: Array<string>}} poemAndNewTags new poem, existing Tag Ids, and new tag names
         * @return {Fonlow_PoemsApp_Data_Client.Poem} Poem Id and new tag objects
         */
        addWithNewTagNames(poemAndNewTags, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Poems/AddWithNewTagNames', poemAndNewTags, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Associate album with existing poems.
         * PUT api/Poems/poemsToAlbum?albumId={albumId}
         * @param {string} albumId Type: GUID
         */
        associateAlbumWithPoems(albumId, poemIds, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/poemsToAlbum?albumId=' + albumId, poemIds, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Associate with existing albums.
         * PUT api/Poems/albums?poemId={poemId}
         * @param {string} poemId Type: GUID
         */
        associateWithAlbums(poemId, albumIds, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/albums?poemId=' + poemId, albumIds, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Associate with existing annotations.
         * PUT api/Poems/existingAnnotations?poemId={poemId}
         * @param {string} poemId Type: GUID
         */
        associateWithExistingAnnotations(poemId, existingAnnotationIds, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/existingAnnotations?poemId=' + poemId, existingAnnotationIds, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Associate with existing tags.
         * PUT api/Poems/existingTags?poemId={poemId}
         * @param {string} poemId Type: GUID
         */
        associateWithExistingTags(poemId, existingTagIds, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/existingTags?poemId=' + poemId, existingTagIds, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Save the new annotation, and associate with the poem.
         * If the annotation exists, return null. Nevertheless, the client should check if the annotation had actually been in the annotation list, to avoid exceptions.
         * PUT api/Poems/newAnnotationName?poemId={poemId}&newAnnotationName={newAnnotationName}
         * @param {string} poemId Type: GUID
         * @return {Fonlow_PoemsApp_Data_Client.AnnotationBrief} New annotation, or null if the annotation exists
         */
        associateWithNewAnnotationName(poemId, newAnnotationName, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/newAnnotationName?poemId=' + poemId + '&newAnnotationName=' + (!newAnnotationName ? '' : encodeURIComponent(newAnnotationName)), null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Associate poem with new tag names.
         * PUT api/Poems/newAnnotationNames?poemId={poemId}
         * @param {string} poemId Type: GUID
         * @return {Array<Fonlow_PoemsApp_Data_Client.AnnotationBrief>} New annotation objects based on newAnnotationNames
         */
        associateWithNewAnnotationNames(poemId, newAnnotationNames, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/newAnnotationNames?poemId=' + poemId, newAnnotationNames, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Save the new tag, and associate with the poem.
         * If the tag exists, return null. Nevertheless, the client should check if the tag had actually been in the tag list, to avoid exceptions.
         * PUT api/Poems/newTagName?poemId={poemId}&newTagName={newTagName}
         * @param {string} poemId Type: GUID
         * @return {Fonlow_PoemsApp_Data_Client.Tag} New tag, or null if the tag exists
         */
        associateWithNewTagName(poemId, newTagName, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/newTagName?poemId=' + poemId + '&newTagName=' + (!newTagName ? '' : encodeURIComponent(newTagName)), null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Associate poem with new tag names.
         * PUT api/Poems/newTagNames?poemId={poemId}
         * @param {string} poemId Type: GUID
         * @return {Array<Fonlow_PoemsApp_Data_Client.Tag>} New tag objects based on newTagNames
         */
        associateWithNewTagNames(poemId, newTagNames, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/newTagNames?poemId=' + poemId, newTagNames, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Reconcile among all images, poemImageMaps, and actually img local
         * POST api/Poems/AuditAndReconcile
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        auditAndReconcile(callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Poems/AuditAndReconcile', null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * DELETE api/Poems/all
         */
        clearAllTables(callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Poems/all', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Delete poem, along with association with albums. However, associated tags and annotations are still in maps.
         * DELETE api/Poems?id={id}
         * @param {string} id Type: GUID
         */
        delete(id, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Poems?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Dissociate album.
         * DELETE api/Poems/DissociateAlbum?poemId={poemId}&albumId={albumId}
         * @param {string} poemId Type: GUID
         * @param {string} albumId Type: GUID
         */
        dissociateAlbum(poemId, albumId, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Poems/DissociateAlbum?poemId=' + poemId + '&albumId=' + albumId, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Disassociate annotation.
         * DELETE api/Poems/DissociateAnnotation?poemId={poemId}&annotationId={annotationId}
         * @param {string} poemId Type: GUID
         * @param {string} annotationId Type: GUID
         */
        dissociateAnnotation(poemId, annotationId, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Poems/DissociateAnnotation?poemId=' + poemId + '&annotationId=' + annotationId, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * DissociateT tag.
         * DELETE api/Poems/DissociateTag?poemId={poemId}&tagId={tagId}
         * @param {string} poemId Type: GUID
         * @param {string} tagId Type: GUID
         */
        dissociateTag(poemId, tagId, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Poems/DissociateTag?poemId=' + poemId + '&tagId=' + tagId, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Fix the problem of escaped unicode string, because of the DomSanitizer of Angular. Once off solution
         * PUT api/Poems/EscapeStringToUnicode
         */
        escapeStringToUnicode(callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/EscapeStringToUnicode', null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Include TagMap and AlbumMap. Support ZH Convert.
         * GET api/Poems?id={id}
         * @param {string} id Type: GUID
         */
        get(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Img Src Url to multiple poem Ids
         * GET api/Poems/AllNotLocalImagesOfPoems
         */
        getAllNotLocalImagesOfPoems(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/AllNotLocalImagesOfPoems', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Scan all poems' HTML to create mapping from imageIds to poems. Dic of imageId to poems with img local.
         * POST api/Poems/AssociatedPoemsOfImages
         */
        getAssociatedPoemsOfAllImages(callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Poems/AssociatedPoemsOfImages', null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * All, OrderByDescending published. Support ZH Convert. If the user is not loggedin, not returning those not yet published.
         * GET api/Poems/AllBriefs
         * @param {number} timezoneOffset int in header
         */
        getBriefsOfPoems(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/AllBriefs', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * All poems of album, order by published. Support ZH Convert.
         * GET api/Poems/GetOfAlbum?albumId={albumId}
         * @param {string} albumId Type: GUID
         * @param {string} convertZH string in header
         * @param {number} timezoneOffset int in header
         */
        getOfAlbum(albumId, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/GetOfAlbum?albumId=' + albumId, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Poems/GetPoemBriefsOfAlbum?albumId={albumId}
         * @param {string} albumId Type: GUID
         * @param {number} timezoneOffset int in header
         */
        getPoemBriefsOfAlbum(albumId, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/GetPoemBriefsOfAlbum?albumId=' + albumId, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Poems/PoemCollection
         */
        getPoemCollection(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/PoemCollection', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Poems/PoemCollectionInOtherChineseWriting
         */
        getPoemCollectionInOtherChineseWriting(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/PoemCollectionInOtherChineseWriting', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Poems/PoemCollectionPublished
         * @param {number} timezoneOffset In request headers
         */
        getPoemCollectionPublished(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/PoemCollectionPublished', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Poems/PoemCollectionPublishedInOtherChineseWriting
         * @param {number} timezoneOffset timezoneOffset in headers
         */
        getPoemCollectionPublishedInOtherChineseWriting(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/PoemCollectionPublishedInOtherChineseWriting', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Poems/PoemsWithInternalImageId?imageId={imageId}
         * @param {string} imageId Type: GUID
         */
        getPoemsWithInternalImageId(imageId, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/PoemsWithInternalImageId?imageId=' + imageId, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Poems/TotalCountOfStanza
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        getTotalCountOfStanza(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/TotalCountOfStanza', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/Poems/PoemCollection
         */
        importPoemCollection(collection, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Poems/PoemCollection', collection, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * GET api/Poems/ByAnnotation?annotationId={annotationId}
         * @param {string} annotationId Type: GUID
         */
        searchByAnnotation(annotationId, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Poems/ByAnnotation?annotationId=' + annotationId, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Search by keywords, separated by comma and Chinese comma. Support ZH Convert.
         * POST api/Poems/ByKeywords
         * @param {number} timezoneOffset int in header
         */
        searchByKeywords(keywords, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Poems/ByKeywords', keywords, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Update poem.
         * PUT api/Poems
         */
        update(poem, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems', poem, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Just for maintenance, while the plaintext should be produced in the frontend.
         * POST api/Poems/UpdatePlainTextOfHtmlPoems
         */
        updatePlainTextOfHtmlPoems(callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Poems/UpdatePlainTextOfHtmlPoems', null, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * PUT api/Poems/UpdatePublished?poemId={poemId}
         * @param {string} poemId Type: GUID
         */
        updatePublished(poemId, dt, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Poems/UpdatePublished?poemId=' + poemId, dt, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    PoemsApp_Controllers_Client.Poems = Poems;
    /**
     * Tags management
     */
    class Tags {
        baseUri;
        httpClient;
        error;
        statusCode;
        constructor(baseUri = HttpClient.locationOrigin, httpClient = new HttpClient(), error, statusCode) {
            this.baseUri = baseUri;
            this.httpClient = httpClient;
            this.error = error;
            this.statusCode = statusCode;
        }
        /**
         * POST api/Tags
         * @return {string} Type: GUID
         */
        add(tag, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tags', tag, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Delete along with what in poemTagMap.
         * DELETE api/Tags?id={id}
         * @param {string} id Type: GUID
         */
        delete(id, callback, headersHandler) {
            this.httpClient.delete(this.baseUri + 'api/Tags?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * POST api/Tags/Orphaned
         * @return {number} Type: int, -2,147,483,648 to 2,147,483,647
         */
        deleteOrphaned(ids, callback, headersHandler) {
            this.httpClient.post(this.baseUri + 'api/Tags/Orphaned', ids, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
        /**
         * Get tag. Support ZH Convert.
         * GET api/Tags?id={id}
         * @param {string} id Type: GUID
         */
        get(id, callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tags?id=' + id, callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get all tags. Support ZH Convert.
         * GET api/Tags/all
         */
        getAll(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tags/all', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * Get all tags as dictionary. Support ZH Convert.
         * GET api/Tags/allDic
         */
        getAllDic(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tags/allDic', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tags/Orphaned
         */
        getOrphaned(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tags/Orphaned', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * GET api/Tags/PoemCountOfTags
         */
        getPoemCountOfTags(callback, headersHandler) {
            this.httpClient.get(this.baseUri + 'api/Tags/PoemCountOfTags', callback, this.error, this.statusCode, headersHandler);
        }
        /**
         * PUT api/Tags
         */
        update(tag, callback, headersHandler) {
            this.httpClient.put(this.baseUri + 'api/Tags', tag, callback, this.error, this.statusCode, 'application/json;charset=UTF-8', headersHandler);
        }
    }
    PoemsApp_Controllers_Client.Tags = Tags;
})(PoemsApp_Controllers_Client || (PoemsApp_Controllers_Client = {}));
//# sourceMappingURL=WebApiCoreJQClientAuto.js.map