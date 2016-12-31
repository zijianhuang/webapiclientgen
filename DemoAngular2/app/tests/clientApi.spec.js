"use strict";
var http_1 = require("@angular/http");
var testing_1 = require("@angular/core/testing");
var model = require("../../clientapi/WebApiNG2ClientAuto");
var DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;
describe('clientApi tests', function () {
    var valuesApi;
    beforeAll(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                {
                    provide: http_1.Http,
                    useFactory: function (backend, options) {
                        return new http_1.Http(backend, options);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions]
                },
                {
                    provide: DemoWebApi_Controllers_Client.Values,
                    useFactory: function (http) {
                        return new DemoWebApi_Controllers_Client.Values("http://localhost:10965/", http);
                    },
                    deps: [http_1.Http],
                },
            ]
        });
    });
    beforeEach(testing_1.inject([DemoWebApi_Controllers_Client.Values], function (userService) {
        valuesApi = userService;
    }));
    it('true is true', function () { return expect(true).toBe(true); });
    it('Values get', function (done) {
        valuesApi.get()
            .subscribe(function (data) {
            expect(data.length).toBeGreaterThan(1);
            done();
        });
    });
});
//# sourceMappingURL=clientApi.spec.js.map