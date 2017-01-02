import { } from 'jasmine';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { inject, TestBed } from '@angular/core/testing';

import * as model from '../../clientapi/WebApiNG2ClientAuto';
import DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;

//"npm test" has to be terminated through ctrl+C since Jasmine test won't quit by itself, as of v1.3, as documented in many threads like http://stackoverflow.com/questions/35203680/karma-singlerun-not-quitting-automatically

describe('heroes tests', () => {
    let clientApi: DemoWebApi_Controllers_Client.Heroes;
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


    beforeEach(() => {
        console.debug("before Each for setting up providers.");
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                {
                    provide: Http,
                    useFactory: (backend: XHRBackend, options: RequestOptions) => {
                        console.debug("Http Created.");
                        return new Http(backend, options);
                    },
                    deps: [XHRBackend, RequestOptions]
                },

                {
                    provide: DemoWebApi_Controllers_Client.Heroes,
                    useFactory: (http: Http) => {
                        console.debug('Heroes created.');
                        return new DemoWebApi_Controllers_Client.Heroes("http://localhost:10965/", http);
                    },
                    deps: [Http],

                },
            ]
        });
    });

    beforeEach(inject([DemoWebApi_Controllers_Client.Heroes], (userService: DemoWebApi_Controllers_Client.Heroes) => {
        console.debug('before Each running');
        clientApi = userService;
    }));


    it('true is true', () => expect(true).toBe(true));

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
        clientApi.post('somebody')
            .subscribe(data => {
                expect(data.name).toEqual('somebody');
            });
    });

});