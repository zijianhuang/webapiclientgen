import { } from 'jasmine';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { inject, TestBed } from '@angular/core/testing';

import * as model from '../../clientapi/WebApiNG2ClientAuto';
import DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;

//"npm test" has to be terminated through ctrl+C since Jasmine test won't quit by itself, as of v1.3, as documented in many threads like http://stackoverflow.com/questions/35203680/karma-singlerun-not-quitting-automatically

describe('heroes tests', () => {
    let clientApi: DemoWebApi_Controllers_Client.Heroes;

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                {
                    provide: Http,
                    useFactory: (backend: XHRBackend, options: RequestOptions) => {
                        console.debug("Http service created.");
                        return new Http(backend, options);
                    },
                    deps: [XHRBackend, RequestOptions]
                },

                {
                    provide: DemoWebApi_Controllers_Client.Heroes,
                    useFactory: (http: Http) => {
                        console.debug('Heroes service created.');
                        return new DemoWebApi_Controllers_Client.Heroes("http://localhost:10965/", http);
                    },
                    deps: [Http],

                },
            ]
        });
    });

    beforeAll(inject([DemoWebApi_Controllers_Client.Heroes], (userService: DemoWebApi_Controllers_Client.Heroes) => {
        clientApi = userService;
    }));


    it('Heroes getAll', (done) => {
        clientApi.get()
            .subscribe(data => {
                expect(data.length).toBeGreaterThan(1);
                done();
                console.debug("Heroes getAll done.");
            }


            );

    }
    );

    it('get', (done) => {
        clientApi.getById(20)
            .subscribe(data => {
                expect(data.name).toEqual('Tornado');
                done();
            });
    });

    it('add', (done) => {
        let n = 'somebody' + Date.now().toLocaleString();
        clientApi.post(n)
            .subscribe(data => {
                expect(data.name).toEqual(n);
                done();
            });
    });

});


describe('superDemo tests', () => {
    let clientApi: DemoWebApi_Controllers_Client.SuperDemo;

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                {
                    provide: Http,
                    useFactory: (backend: XHRBackend, options: RequestOptions) => {
                        console.debug("Http service created.");
                        return new Http(backend, options);
                    },
                    deps: [XHRBackend, RequestOptions]
                },

                {
                    provide: DemoWebApi_Controllers_Client.SuperDemo,
                    useFactory: (http: Http) => {
                        console.debug('SuperDemo service created.');
                        return new DemoWebApi_Controllers_Client.SuperDemo("http://localhost:10965/", http);
                    },
                    deps: [Http],

                },
            ]
        });
    });

    beforeAll(inject([DemoWebApi_Controllers_Client.SuperDemo], (userService: DemoWebApi_Controllers_Client.SuperDemo) => {
        clientApi = userService;
    }));


    it('JsZeroNotGoodWithFloat', (done) => {
        clientApi.getFloatZero()
            .subscribe(data => {
                expect(data).not.toEqual(0)
                done();
            }
            );

    }
    );

    it('JsZeroNotGoodWithDouble', (done) => {
        clientApi.getDoubleZero()
            .subscribe(data => {
                expect(data).not.toEqual(0)
                done();
            }
            );

    }
    );

});


