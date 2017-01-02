"use strict";
var http_1 = require("@angular/http");
var testing_1 = require("@angular/core/testing");
var model = require("../../clientapi/WebApiNG2ClientAuto");
var DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;
describe('clientApi tests', function () {
    var valuesApi;
    //beforeAll(() => {
    //    console.debug("beforeAll() running...");
    //    TestBed.configureTestingModule({
    //        imports: [HttpModule],
    //        providers: [
    //            {
    //                provide: Http,
    //                useFactory: (backend: XHRBackend, options: RequestOptions) => {
    //                    return new Http(backend, options);
    //                },
    //                deps: [XHRBackend, RequestOptions]
    //            },
    //            {
    //                provide: DemoWebApi_Controllers_Client.Values,
    //                useFactory: (http: Http) => {
    //                    return new DemoWebApi_Controllers_Client.Values("http://localhost:10965/", http);
    //                },
    //                deps: [Http],
    //            },
    //        ]
    //    });
    //});
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                {
                    provide: http_1.Http,
                    useFactory: function (backend, options) {
                        console.debug("Http Created.");
                        return new http_1.Http(backend, options);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions]
                },
                {
                    provide: DemoWebApi_Controllers_Client.Values,
                    useFactory: function (http) {
                        console.debug('Values created.');
                        return new DemoWebApi_Controllers_Client.Values("http://localhost:10965/", http);
                    },
                    deps: [http_1.Http],
                },
            ]
        });
    });
    beforeEach(testing_1.inject([DemoWebApi_Controllers_Client.Values], function (userService) {
        console.debug('before Each running');
        valuesApi = userService;
    }));
    it('true is true', function () { return expect(true).toBe(true); });
    it('Values get', function (done) {
        expect(true).toBe(true);
        valuesApi.get()
            .subscribe(function (data) {
            expect(data.length).toBeGreaterThan(1);
            done();
            console.debug("Values call done.");
        }, function (error) {
            console.warn(error);
        });
    });
});
//# sourceMappingURL=clientApi.spec.js.map