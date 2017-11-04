"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var testing_1 = require("@angular/core/testing");
var namespaces = require("../../clientapi/WebApiNG2ClientAuto");
var DemoWebApi_Controllers_Client = namespaces.DemoWebApi_Controllers_Client;
//"npm test" has to be terminated through ctrl+C since Jasmine test won't quit by itself, as of v1.3, as documented in many threads like http://stackoverflow.com/questions/35203680/karma-singlerun-not-quitting-automatically
describe('heroes tests', function () {
    var clientApi;
    beforeAll(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                {
                    provide: http_1.Http,
                    useFactory: function (backend, options) {
                        console.debug("Http service created.");
                        return new http_1.Http(backend, options);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions]
                },
                {
                    provide: DemoWebApi_Controllers_Client.Heroes,
                    useFactory: function (http) {
                        console.debug('Heroes service created.');
                        return new DemoWebApi_Controllers_Client.Heroes("http://localhost:10965/", http);
                    },
                    deps: [http_1.Http],
                },
            ]
        });
    });
    beforeAll(testing_1.inject([DemoWebApi_Controllers_Client.Heroes], function (userService) {
        clientApi = userService;
    }));
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
        var n = 'somebody' + Date.now().toLocaleString();
        clientApi.post(n)
            .subscribe(function (data) {
            expect(data.name).toEqual(n);
            done();
        });
    });
});
describe('superDemo tests', function () {
    var clientApi;
    beforeAll(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                {
                    provide: http_1.Http,
                    useFactory: function (backend, options) {
                        console.debug("Http service created.");
                        return new http_1.Http(backend, options);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions]
                },
                {
                    provide: DemoWebApi_Controllers_Client.SuperDemo,
                    useFactory: function (http) {
                        console.debug('SuperDemo service created.');
                        return new DemoWebApi_Controllers_Client.SuperDemo("http://localhost:10965/", http);
                    },
                    deps: [http_1.Http],
                },
            ]
        });
    });
    beforeAll(testing_1.inject([DemoWebApi_Controllers_Client.SuperDemo], function (userService) {
        clientApi = userService;
    }));
    it('JsZeroNotGoodWithFloat', function (done) {
        clientApi.getFloatZero()
            .subscribe(function (data) {
            expect(data).not.toEqual(0);
            done();
        });
    });
    it('JsZeroNotGoodWithDouble', function (done) {
        clientApi.getDoubleZero()
            .subscribe(function (data) {
            expect(data).not.toEqual(0);
            done();
        });
    });
});
//# sourceMappingURL=clientApi.spec.js.map