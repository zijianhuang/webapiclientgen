"use strict";
var http_1 = require("@angular/http");
var testing_1 = require("@angular/core/testing");
var model = require("../../clientapi/WebApiNG2ClientAuto");
var DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;
//"npm test" has to be terminated through ctrl+C since Jasmine test won't quit by itself, as of v1.3, as documented in many threads like http://stackoverflow.com/questions/35203680/karma-singlerun-not-quitting-automatically
describe('heroes tests', function () {
    var clientApi;
    //beforeAll(() => { this does not work, and I have to put the content to beforeEach.
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
    //                provide: DemoWebApi_Controllers_Client.Heroes,
    //                useFactory: (http: Http) => {
    //                    return new DemoWebApi_Controllers_Client.Heroes("http://localhost:10965/", http);
    //                },
    //                deps: [Http],
    //            },
    //        ]
    //    });
    //});
    beforeEach(function () {
        console.debug("before Each for setting up providers.");
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
                    provide: DemoWebApi_Controllers_Client.Heroes,
                    useFactory: function (http) {
                        console.debug('Heroes created.');
                        return new DemoWebApi_Controllers_Client.Heroes("http://localhost:10965/", http);
                    },
                    deps: [http_1.Http],
                },
            ]
        });
    });
    beforeEach(testing_1.inject([DemoWebApi_Controllers_Client.Heroes], function (userService) {
        console.debug('before Each running');
        clientApi = userService;
    }));
    it('true is true', function () { return expect(true).toBe(true); });
    it('Heroes getAll', function (done) {
        clientApi.get()
            .subscribe(function (data) {
            expect(data.length).toBeGreaterThan(1);
            done();
            console.debug("Heroes getAll done.");
        });
    });
    it('get', function (done) {
        clientApi.getById(20)
            .subscribe(function (data) {
            expect(data.name).toEqual('Tornado');
            done();
        });
    });
    it('add', function (done) {
        clientApi.post('somebody')
            .subscribe(function (data) {
            expect(data.name).toEqual('somebody');
        });
    });
});
//# sourceMappingURL=clientApi.spec.js.map