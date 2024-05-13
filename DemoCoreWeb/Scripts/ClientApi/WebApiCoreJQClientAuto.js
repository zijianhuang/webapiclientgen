///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="HttpClient.ts" />
var DemoWebApi_Controllers_Client;
(function (DemoWebApi_Controllers_Client) {
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
