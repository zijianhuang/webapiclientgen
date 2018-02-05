import { async, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

import * as namespaces from './WebApiNG2ClientAuto';
const DemoWebApi_Controllers_Client = namespaces.DemoWebApi_Controllers_Client;
const DemoWebApi_DemoData_Client = namespaces.DemoWebApi_DemoData_Client;

const apiBaseUri = 'http://localhost:10965/';

export function valuesClientFactory(http: HttpClient) {
    return new namespaces.DemoWebApi_Controllers_Client.Values(apiBaseUri, http);
}

export function heroesClientFactory(http: HttpClient) {
    return new namespaces.DemoWebApi_Controllers_Client.Heroes(apiBaseUri, http);
}

export function entitiesClientFactory(http: HttpClient) {
    return new namespaces.DemoWebApi_Controllers_Client.Entities(apiBaseUri, http);
}

export function errorResponseToString(error: HttpErrorResponse | any, ): string {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
            errMsg = 'No response from backend. Connection is unavailable.';
        }
        else {
            if (error.message) {
                errMsg = `${error.status} - ${error.statusText}: ${error.message}`;
            }
            else {
                errMsg = `${error.status} - ${error.statusText}`;
            }
        }

        errMsg += error.error ? (' ' + JSON.stringify(error.error)) : '';
        return errMsg;
    } else {
        errMsg = error.message ? error.message : error.toString();
        return errMsg;
    }
}


//https://stackoverflow.com/questions/42046855/how-to-combine-a-done-callback-with-injection-angular-2-unittest/46027549#46027549
describe('Values API', () => {
    let service: namespaces.DemoWebApi_Controllers_Client.Values;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: namespaces.DemoWebApi_Controllers_Client.Values,
                    useFactory: valuesClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(namespaces.DemoWebApi_Controllers_Client.Values);
    }));

    afterEach(function () {
    });

    it('get', async((done) => {
        service.get().subscribe(
            data => {
                console.debug(data.length);
                expect(data.length).toBeGreaterThan(0);
            },
            error => fail(errorResponseToString(error))
        );

    })
    );

    it('something', () => {
        expect(true).toBe(true);
    });


})


describe('Heroes API', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: namespaces.DemoWebApi_Controllers_Client.Heroes,
                    useFactory: heroesClientFactory,
                    deps: [HttpClient],

                },

            ]
        })
            .compileComponents();
    }));

    it('getAll', async(inject([DemoWebApi_Controllers_Client.Heroes], (client: namespaces.DemoWebApi_Controllers_Client.Heroes) => {
        client.get().subscribe(
            data => {
                console.debug(data.length);
                expect(data.length).toBeGreaterThan(0);
            },
            error => fail(errorResponseToString(error))
        );

    }))

    );

    it('something', () => {
        expect(true).toBe(true);
    });


})

describe('entities API', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: namespaces.DemoWebApi_Controllers_Client.Entities,
                    useFactory: entitiesClientFactory,
                    deps: [HttpClient],

                },

            ]
        });
    }));

    afterEach(function () {
    });


    it('getPersonNotFound', async(inject([DemoWebApi_Controllers_Client.Entities], (client: namespaces.DemoWebApi_Controllers_Client.Entities) => {
        client.getPersonNotFound(123)
            .subscribe(
            data => {
                fail('That is bad.');
            },
            error => { console.info(errorResponseToString(error)); expect(true).toBe(true); }
         //   error => { fail(errorResponseToString(error)); }

            );

    }))
    );

    it('something', () => {
        expect(true).toBe(true);
    });


})



