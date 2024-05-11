import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { DemoWebApi_DemoData_Client, DemoWebApi_Controllers_Client } from './WebApiCoreNg2ClientAuto';

//const apiBaseUri = 'http://fonlow.org/'; // for DemoCoreWeb hosted in server of different timezone.
const apiBaseUri = 'http://localhost:5000/'; // for DemoCoreWeb


export function valuesClientFactory(http: HttpClient) {
    return new DemoWebApi_Controllers_Client.Values(apiBaseUri, http);
}

export function heroesClientFactory(http: HttpClient) {
    return new DemoWebApi_Controllers_Client.Heroes(apiBaseUri, http);
}

export function entitiesClientFactory(http: HttpClient) {
    return new DemoWebApi_Controllers_Client.Entities(apiBaseUri, http);
}

export function superDemoClientFactory(http: HttpClient) {
    return new DemoWebApi_Controllers_Client.SuperDemo(apiBaseUri, http);
}
export function dateTypesClientFactory(http: HttpClient) {
    return new DemoWebApi_Controllers_Client.DateTypes(apiBaseUri, http);
}

export function tupleClientFactory(http: HttpClient) {
    return new DemoWebApi_Controllers_Client.Tuple(apiBaseUri, http);
}

export function stringDataClientFactory(http: HttpClient) {
    return new DemoWebApi_Controllers_Client.StringData(apiBaseUri, http);
}

export function textDataClientFactory(http: HttpClient) {
    return new DemoWebApi_Controllers_Client.TextData(apiBaseUri, http);
}

export function numbersClientFactory(http: HttpClient) {
    return new DemoWebApi_Controllers_Client.Numbers(apiBaseUri, http);
}


export function errorResponseToString(error: HttpErrorResponse | any,): string {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
            errMsg = 'No response from backend. Connection is unavailable.';
        } else {
            if (error.message) {
                errMsg = `${error.status} - ${error.statusText}: ${error.message}`;
            } else {
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

export function errorResponseBodyToString(error: HttpErrorResponse | any,): string {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
            errMsg = 'No response from backend. Connection is unavailable.';
        } else {
            errMsg = JSON.stringify(error.error);
        }

        return errMsg;
    } else {
        errMsg = error.message ? error.message : error.toString();
        return errMsg;
    }
}


describe('Values API', () => {
    let service: DemoWebApi_Controllers_Client.Values;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.Values,
                    useFactory: valuesClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(DemoWebApi_Controllers_Client.Values);
    }));

    afterEach(function () {
    });

    it('get', (done) => {
        service.get().subscribe(
            data => {
                console.debug(data!.length);
                expect(data![1]).toBe('value2');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getByIdAndName', (done) => {
        service.getByIdOfInt32AndNameOfString(1, 'Abc').subscribe(
            data => {
                console.debug(data!.length);
                expect(data).toBe('Abc1');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getByName', (done) => {
        service.getByNameOfString('Abc').subscribe(
            data => {
                console.debug(data!.length);
                expect(data).toBe('ABC');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('Post', (done) => {
        service.post('Abc').subscribe(
            data => {
                console.debug(data!.length);
                expect(data).toBe('ABC');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getByIdAndChinese', (done) => {
        service.getByIdOfInt32AndNameOfString(1, 'something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"').subscribe(
            data => {
                console.debug(data!.length);
                expect(data).toBe('something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"1');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );



});


describe('Heroes API', () => {
    let service: DemoWebApi_Controllers_Client.Heroes;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.Heroes,
                    useFactory: heroesClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(DemoWebApi_Controllers_Client.Heroes);
    }));

    it('getAll', (done) => {
        service.getHeros().subscribe(
            data => {
                console.debug(data!.length);
                expect(data!.length).toBeGreaterThan(0);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getHero', (done) => {
        service.getHero('9999').subscribe(
            data => {
                expect(data).toBeNull();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('Add', (done) => {
        service.post('somebody').subscribe(
            data => {
                expect(data!.name).toBe('somebody');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    /**
     * The service always returns an object and the return is decorated with NotNullAttribute.
     */
    it('PostWithQuery', (done) => {
        service.postWithQuery('somebodyqqq').subscribe(
            data => {
                expect(data.name).toBe('somebodyqqq');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('search', (done) => {
        service.search('Torna').subscribe(
            data => {
                console.debug(data!.length);
                expect(data!.length).toBe(1);
                expect(data![0].name).toBe('Tornado');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

});

describe('entities API', () => {
    let client: DemoWebApi_Controllers_Client.Entities;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.Entities,
                    useFactory: entitiesClientFactory,
                    deps: [HttpClient],
                },

            ]
        });

        client = TestBed.get(DemoWebApi_Controllers_Client.Entities);
    }));

    it('add', (done) => {
        let id: string | null;
        const newPerson: DemoWebApi_DemoData_Client.Person = {
            name: 'John Smith' + Date.now().toString(),
            givenName: 'John',
            surname: 'Smith',
            dob: new Date('1969-12-28'),
            baptised: new Date('1980-01-31'),
        };

        client.createPerson(newPerson)
            .subscribe(
                data => {
                    id = data;
                    expect(data).toBeTruthy();
                    done();
                },
                error => {
                    fail(errorResponseToString(error));
                    done();
                }
            );

    }
    );

    it('addWithHeadersHandling', (done) => {
        const newPerson: DemoWebApi_DemoData_Client.Person = {
            name: 'John Smith' + Date.now().toString(),
            givenName: 'John',
            surname: 'Smith',
            dob: new Date('1969-12-28'),
            baptised: new Date('1980-01-30'),
        };

        client.createPerson3(newPerson, () => new HttpHeaders({ middle: 'HaHa' }))
            .subscribe(
                data => {
                    expect(data!.givenName).toBe('HaHa');
                    const d1: any = data!.dob;
                    const d2: any = data!.baptised;
                    expect(d1).toEqual('1969-12-28'); //string
                    expect(d2).toContain('1980-01-30T00:00:00'); //System.Text.Json returns 1980-01-30T00:00:00.0000000+00:00, while Newtonsoft.Json gives 1980-01-30T00:00:00+00:00
                    done();
                },
                error => {
                    fail(errorResponseToString(error));
                    done();
                }
            );

    }
    );

    it('mimsString', (done) => {
        const c: DemoWebApi_DemoData_Client.MimsPackage = {
            tag: 'Hello',
            result: {
                result: 123.45
            }
        };

        client.getMims(c)
            .subscribe(
                data => {
                    fail('Should fail')
                    done();
                },
                error => {
                    expect(errorResponseToString(error)).toContain('KK has to be between 10 and 100');
                    done();
                }
            );

    }
    );

    it('myGenericPerson', (done) => {
        const newPerson: DemoWebApi_DemoData_Client.Person = {
            name: 'John Smith',
            givenName: 'John',
            surname: 'Smith',
            dob: new Date('1977-12-28')
        };

        const c: DemoWebApi_DemoData_Client.MyGeneric<string, number, DemoWebApi_DemoData_Client.Person> = {
            myK: 123.456,
            myT: 'abc',
            myU: newPerson,
            status: 'OK',
        };

        client.getMyGenericPerson(c)
            .subscribe(
                data => {
                    expect(data!.myU?.name).toBe('John Smith');
                    expect(data!.status).toBe('OK');
                    done();
                },
                error => {
                    fail(errorResponseToString(error));
                    done();
                }
            );

    }
    );

    it('getNullCompany', (done) => {
        client.getNullCompany().subscribe(
            data => {
                expect(data).toBeNull();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    });

});

describe('DateTypes API', () => {
    let service: DemoWebApi_Controllers_Client.DateTypes;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.DateTypes,
                    useFactory: dateTypesClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(DemoWebApi_Controllers_Client.DateTypes);
    }));


    it('GetNextHour', (done) => {
        const dt = new Date(Date.now());
        const h = dt.getHours();
        service.getNextHour(dt).subscribe(
            data => {
                const dd = new Date(data!);
                expect(dd.getHours()).toBe(h + 1);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('GetNextYear', (done) => {
        const dt = new Date(Date.now());
        const h = dt.getFullYear();
        service.getNextYear(dt).subscribe(
            data => {
                const dd = new Date(data!);
                expect(dd.getFullYear()).toBe(h + 1);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('PostNextYear', (done) => {
        const dt = new Date(Date.now());
        const h = dt.getFullYear();
        service.postNextYear(dt).subscribe(
            data => {
                const dd = new Date(data!);
                expect(dd.getFullYear()).toBe(h + 1);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getDateTime', (done) => {
        service.getDateTime(true).subscribe(
            data => {
                expect(data).toBeDefined();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getDateTimeNull', (done) => {
        service.getDateTime(false).subscribe(
            data => {
                expect(data).toBeNull();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateTimeOffset', (done) => {
        const dt = new Date(Date.now());
        service.postDateTimeOffset(dt).subscribe(
            data => {
                expect(new Date(data!)).toEqual(dt);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    /**
     * Newtonsoft.Json will throw error Error converting value {null} to type 'System.DateTimeOffset'
     */
    it('postDateTimeOffsetWithNull', (done) => {
        service.postDateTimeOffset(null).subscribe(
            data => {
                fail("validation")
                done();
            },
            error => {
                expect(errorResponseToString(error)).toContain('Error converting value {null} to type');
                done();
            }
        );

    }
    );

    it('postDateTimeOffsetNullable', (done) => {
        const dt = new Date(Date.now());
        service.postDateTimeOffsetNullable(dt).subscribe(
            data => {
                if (data) {
                    expect(new Date(data)).toEqual(dt);
                } else {
                    expect(new Date(data!)).toEqual(dt); //strict mode happy
                }
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateTimeOffsetNullableWithNull', (done) => {
        service.postDateTimeOffsetNullable(null).subscribe(
            data => {
                expect(data).toBeNull();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateTimeOffsetNullableWithUndefined', (done) => {
        service.postDateTimeOffsetNullable(undefined!).subscribe(
            data => {
                expect(data).toBeNull();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateOnly', (done) => {
        const dt = new Date(Date.parse('2018-12-25')); //JS will serialize it to 2018-12-25T00:00:00.000Z.
        service.postDateOnly(dt).subscribe(
            data => {
                const v: any = data; //string 2008-12-25
                expect(v).toEqual('2018-12-25');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateOnlyWithUtc', (done) => {
        const dt = new Date(Date.parse('2018-12-25T00:00:00.000Z')); //JS will serialize it to 2018-12-25T00:00:00.000Z.
        service.postDateOnly(dt).subscribe(
            data => {
                const v: any = data; //string 2008-12-25
                expect(v).toEqual('2018-12-25');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateOnlyWithAusMidnight', (done) => {
        const dt = new Date(Date.parse('2018-12-24T14:00:00.000Z')); //Angular Material DatePicker by default will give this when picking 2018-12-25
        service.postDateOnly(dt).subscribe(
            data => {
                const v: any = data;
                expect(v).toEqual('2018-12-24');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateOnlyText', (done) => {
        let obj: any = '2018-12-25';
        service.postDateOnly(obj).subscribe(
            data => {
                const v: any = data; //string 2008-12-25
                expect(v).toEqual('2018-12-25');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateOnlyUtcText', (done) => {
        let obj: any = '2018-12-25T00:00:00.000Z';
        service.postDateOnly(obj).subscribe(
            data => {
                const v: any = data;
                expect(v).toEqual('2018-12-25');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateOnlyAusMidnightText', (done) => {
        let obj: any = '2018-12-24T23:00:01.001Z';
        service.postDateOnly(obj).subscribe(
            data => {
                const v: any = data;
                expect(v).toEqual('2018-12-24');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );


    it('postDateOnlyWithNull', (done) => {
        service.postDateOnly(null!).subscribe( //strict mode happy
            data => {
                const v: any = data;
                expect(v).toEqual('0001-01-01');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateOnlyNullable', (done) => {
        const dt = new Date(Date.parse('2018-12-23'));
        service.postDateOnlyNullable(dt).subscribe(
            data => {
                const v: any = data;
                expect(v).toEqual('2018-12-23');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateOnlyNullableWithNull', (done) => {
        service.postDateOnlyNullable(null).subscribe(
            data => {
                expect(data).toBeNull();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDateOnlyNullableWithUndefined', (done) => {
        service.postDateOnlyNullable(null).subscribe(
            data => {
                expect(data).toBeNull();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('isDateTimeOffsetDate', (done) => {
        const dt = new Date(Date.parse('2018-12-23'));
        service.isDateTimeOffsetDate(dt).subscribe(
            data => {
                const v: any = data!.item1;
                expect(v).toEqual('2018-12-23');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('isDateTimeDate', (done) => {
        const dt = new Date(Date.parse('2018-12-23'));
        service.isDateTimeDate(dt).subscribe(
            data => {
                const v: any = data!.item1;
                expect(v).toEqual('2018-12-23');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getNextYearNullable', (done) => {
        const now = new Date(Date.now());
        service.getNextYearNullable(2, now).subscribe(
            data => {
                const dt = new Date(data!); // data is actually string, NG HttpClient does not translate it to Date
                expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getNextHourNullable', (done) => {
        const now = new Date(Date.now());
        service.getNextHourNullable(2, now).subscribe(
            data => {
                const dt = new Date(data!);
                expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getNextYearNullable2', (done) => {
        const now = new Date(Date.now());
        service.getNextYearNullable(2, undefined!).subscribe(
            data => {
                const dt = new Date(data!);
                expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getNextHourNullable2', (done) => {
        const now = new Date(Date.now());
        service.getNextHourNullable(2, null).subscribe(
            data => {
                const dt = new Date(data!);
                expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );


    it('searchDateRange', (done) => {
        const startDt = new Date(Date.now());
        const endDt = new Date(Date.now() + 100000);
        service.searchDateRange(startDt, endDt).subscribe(
            data => {
                if (data!.item1 && data!.item2) {
                    expect(new Date(data!.item1)).toEqual(startDt);
                    expect(new Date(data!.item2)).toEqual(endDt);
                } else {
                    fail('I expect item1 and 2');
                }
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );


    it('searchDateRangeEndUndefined', (done) => {
        const startDt = new Date(Date.now());
        const endDt = new Date(Date.now() + 100000);
        service.searchDateRange(startDt, undefined!).subscribe(
            data => {
                if (data!.item1) {
                    expect(new Date(data!.item1)).toEqual(startDt); //strict mode happy
                } else {
                    fail('I expect item1.');
                }

                //expect(data!.item2).toBeUndefined(); // NewtonSoft.Json give undefined, while System.Text.Json gives null
                expect(data!.item2 == null).toBeTrue();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );


    it('searchDateRangeStartUndefined', (done) => {
        const startDt = new Date(Date.now());
        const endDt = new Date(Date.now() + 100000);
        service.searchDateRange(undefined!, endDt).subscribe(
            data => {
                // fail('The API should return http 400 error.'); in .net core 2.0, the service return status 400. Apparently this was a bug which was fixed in 2.1
                //expect(data!.item1).toBeUndefined(); // NewtonSoft.Json give undefined, while System.Text.Json gives null
                expect(data!.item1 == null).toBeTrue();
                if (data!.item2) {
                    expect(new Date(data!.item2)).toEqual(endDt);
                } else {
                    fail('I expect item2');
                }
                done();
            },
            error => {
                const errorText = errorResponseToString(error);
                if (errorText.indexOf('400') < 0) {
                    fail(errorText);
                }
                expect(true).toBeTruthy();
                done();
            }
        );

    }
    );


    it('searchDateRangeBothNull', (done) => {
        const startDt = new Date(Date.now());
        const endDt = new Date(Date.now() + 100000);
        service.searchDateRange(null, undefined!).subscribe(
            data => {
                //expect(data!.item1).toBeUndefined();
                //expect(data!.item2).toBeUndefined();
                expect(data!.item1 == null).toBeTrue();
                expect(data!.item2 == null).toBeTrue();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

});

describe('SuperDemo API', () => {
    let service: DemoWebApi_Controllers_Client.SuperDemo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.SuperDemo,
                    useFactory: superDemoClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(DemoWebApi_Controllers_Client.SuperDemo);
    }));

    it('getBool', (done) => {
        service.getBool().subscribe(
            data => {
                expect(data).toBeTruthy();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getFloatZero', (done) => {
        service.getFloatZero().subscribe(
            data => {
                expect(data).toBeLessThan(0.000001);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getDoubleZero', (done) => {
        service.getDoubleZero().subscribe(
            data => {
                expect(data).not.toBe(0);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getDecimalZero', (done) => {
        service.getDecimalZero().subscribe(
            data => {
                expect(data).toBe(0);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getIntSquare', (done) => {
        service.getIntSquare(100).subscribe(
            data => {
                expect(data).toBe(10000);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getDecimalSquare', (done) => {
        service.getDecimalSquare(100).subscribe(
            data => {
                expect(data).toBe(10000);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getNullableDecimal', (done) => {
        service.getNullableDecimal(true).subscribe(
            data => {
                expect(data).toBeGreaterThan(10);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getNullableDecimalNull', (done) => {
        service.getNullableDecimal(false).subscribe(
            data => {
                expect(data).toBeNull();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getNullPerson', (done) => {
        service.getNullPerson().subscribe(
            data => {
                expect(data).toBeNull();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getByteArray', (done) => {
        service.getByteArray().subscribe(
            data => {
                expect(data!.length).toBeGreaterThan(0);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getTextStream', (done) => {
        service.getTextStream().subscribe(
            data => {
                expect(data.body!.size).toBe(7);

                const reader = new FileReader();
                reader.onload = () => {
                    expect(reader.result).toBe('abcdefg');
                };
                reader.readAsText(data.body!);

                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getBadRequest', (done) => {
        service.getBadRequest().subscribe(
            data => {
                fail('Should never be OK');
                done();
            },
            error => {
                error.error.text().then((t: any) => { //error.error is blob as observed.
                    expect(t).toBe('{"DemoKey":["Some description"]}');
                    done();
                });
            }
        );

    }
    );

    it('getBadRequest2', (done) => {
        service.getBadRequest2().subscribe(
            data => {
                fail('Should never be OK');
                done();
            },
            error => {
                expect(error.error).toBe('{"DemoKey":["Some description"]}');
                done();
            }
        );

    }
    );

    it('getActionResult', (done) => {
        service.getActionResult().subscribe(
            data => {
                expect(data.status).toBe(200);
                expect(data.body).toBe('abcdefg');

                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getbyte', (done) => {
        service.getbyte().subscribe(
            data => {
                expect(data).toEqual(255);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getActionStringResult', (done) => {
        service.getActionStringResult().subscribe(
            data => {
                expect(data).toContain('abcdefg');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );


    it('getChar', (done) => {
        service.getChar().subscribe(
            data => {
                expect(data).toBe('A');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    /**
     * Response is  79228162514264337593543950335.0
     */
    it('getDecimal', (done) => {
        service.getDecimal().subscribe(
            data => {
                expect(data).toBe(79228162514264337593543950335);
                expect(data.toString()).not.toBe('79228162514264337593543950335'); // otherwise, Expected '7.922816251426434e+28' to be '79228162514264337593543950335'.
                expect(BigInt(data).toString()).toBe('79228162514264337593543950336'); // dirty JavaScript
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );


    it('getdouble', (done) => {
        service.getdouble().subscribe(
            data => {
                expect(data).toBe(-1.7976931348623e308);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getUint', (done) => {
        service.getUint().subscribe(
            data => {
                expect(data).toBe(4294967295);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    /**
     * ASP.NET 8 System.Text.Json cannot handle this.
     */
    it('getInt2D', (done) => {
        service.getInt2D().subscribe(
            data => {
                expect(data![0][0]).toBe(1);
                expect(data![0][3]).toBe(4);
                expect(data![1][0]).toBe(5);
                expect(data![1][3]).toBe(8);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );
    /**
fail: Microsoft.AspNetCore.Server.Kestrel[13]
      Connection id "0HN1IFMQ8I8QJ", Request id "0HN1IFMQ8I8QJ:0000004F": An unhandled exception was thrown by the application.
      System.NotSupportedException: Serialization and deserialization of 'System.Int32[,]' instances is not supported. Path: $.
       ---> System.NotSupportedException: Serialization and deserialization of 'System.Int32[,]' instances is not supported.
         at System.Text.Json.Serialization.Converters.UnsupportedTypeConverter`1.Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
         at System.Text.Json.Serialization.JsonConverter`1.TryWrite(Utf8JsonWriter writer, T& value, JsonSerializerOptions options, WriteStack& state)
         at System.Text.Json.Serialization.JsonConverter`1.WriteCore(Utf8JsonWriter writer, T& value, JsonSerializerOptions options, WriteStack& state)
         --- End of inner exception stack trace ---
         at System.Text.Json.ThrowHelper.ThrowNotSupportedException(WriteStack& state, NotSupportedException ex)
         at System.Text.Json.Serialization.JsonConverter`1.WriteCore(Utf8JsonWriter writer, T& value, JsonSerializerOptions options, WriteStack& state)
         at System.Text.Json.Serialization.Metadata.JsonTypeInfo`1.SerializeAsync(Stream utf8Json, T rootValue, CancellationToken cancellationToken, Object rootValueBoxed)
         at System.Text.Json.Serialization.Metadata.JsonTypeInfo`1.SerializeAsync(Stream utf8Json, T rootValue, CancellationToken cancellationToken, Object rootValueBoxed)
         at System.Text.Json.Serialization.Metadata.JsonTypeInfo`1.SerializeAsync(Stream utf8Json, T rootValue, CancellationToken cancellationToken, Object rootValueBoxed)
         at Microsoft.AspNetCore.Mvc.Formatters.SystemTextJsonOutputFormatter.WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
         at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeResultFilters>g__Awaited|28_0(ResourceInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)
         at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeFilterPipelineAsync>g__Awaited|20_0(ResourceInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)
         at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeAsync>g__Logged|17_1(ResourceInvoker invoker)
         at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeAsync>g__Logged|17_1(ResourceInvoker invoker)
         at Microsoft.AspNetCore.Routing.EndpointMiddleware.<Invoke>g__AwaitRequestTask|7_0(Endpoint endpoint, Task requestTask, ILogger logger)
         at Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.HttpProtocol.ProcessRequests[TContext](IHttpApplication`1 application)

     */


    it('getInt2DJagged', (done) => {
        service.getInt2DJagged().subscribe(
            data => {
                expect(data![0][0]).toBe(1);
                expect(data![0][3]).toBe(4);
                expect(data![1][0]).toBe(5);
                expect(data![1][3]).toBe(8);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    /**
     * ASP.NET 8 System.Text.Json could not handle this.
     */
    it('postInt2D', (done) => {
        service.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]]).subscribe(
            data => {
                expect(data).toBeTruthy();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postIntArray', (done) => {
        service.postIntArray([1, 2, 3, 4, 5, 6, 7, 8]).subscribe(
            data => {
                expect(data).toBeTruthy();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getIntArrayQ', (done) => {
        service.getIntArrayQ([3, 4, 5]).subscribe(
            data => {
                expect(data!.length).toBe(3);
                expect(data![2]).toBe(5);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getIntArrayQ2', (done) => {
        service.getIntArrayQ2(['3', '4', '5']).subscribe(
            data => {
                expect(data!.length).toBe(3);
                expect(data![2].toString()).toBe('5'); // response is [3, 4, 5]
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getStringArrayQ', (done) => {
        service.getStringArrayQ(['abc', 'EFG', 'hi']).subscribe(
            data => {
                expect(data!.length).toBe(3);
                expect(data![2]).toBe('hi');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getStringArrayQ2', (done) => {
        service.getStringArrayQ2(['abc', 'EFG', 'hi']).subscribe(
            data => {
                expect(data!.length).toBe(3);
                expect(data![2]).toBe('hi');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );


    it('getEnumArrayQ2', (done) => {
        service.getEnumArrayQ2([3, 4, 5]).subscribe(
            data => {
                expect(data!.length).toBe(3);
                expect(data![2]).toBe(5);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getEnumArrayDaysWithInt', (done) => {
        service.getEnumArrayDays([3, 4, 5]).subscribe(
            data => {
                expect(data!.length).toBe(3);
                expect(data![2]).toBe(5);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getEnumArrayDaysWithEnum', (done) => {
        service.getEnumArrayDays([DemoWebApi_DemoData_Client.Days.Mon, DemoWebApi_DemoData_Client.Days.Sat, DemoWebApi_DemoData_Client.Days.Wed]).subscribe(
            data => {
                expect(data!.length).toBe(3);
                expect(data![2]).toBe(DemoWebApi_DemoData_Client.Days.Wed);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );



    it('postWithQueryButEmptyBody', (done) => {
        service.postWithQueryButEmptyBody('abc', 123).subscribe(
            data => {
                expect(data!.item1).toBe('abc');
                expect(data!.item2).toBe(123);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDay', (done) => {
        service.postDay(DemoWebApi_DemoData_Client.Days.Fri, DemoWebApi_DemoData_Client.Days.Mon).subscribe(
            data => {
                expect(data!.length).toBe(2);
                expect(data![1]).toBe(DemoWebApi_DemoData_Client.Days.Mon);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postDay2', (done) => {
        service.postDay(3, 5).subscribe(
            data => {
                expect(data!.length).toBe(2);
                expect(data![1]).toBe(5);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getDay', (done) => {
        service.getDay(3).subscribe(
            data => {
                expect(data).toBe(3);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );


    it('postGuids', (done) => {
        service.postGuids(['08d7be8b-4805-459e-849a-fcd5c64a33ee', '08d7be8b-47fb-44a5-86a8-a6f4fe928fa9']).subscribe(
            data => {
                expect(data!.length).toBe(2);
                expect(data![0]).toBe('08d7be8b-4805-459e-849a-fcd5c64a33ee');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getDictionaryOfPeople', (done) => {
        service.getDictionaryOfPeople().subscribe(
            data => {
                let p = data!['spider Man']; // ASP.NET Web API with NewtonSoftJson made it camcel;
                if (!p) {
                    p = data!['Spider Man']; // .NET Core is OK
                }
                expect(p.name).toBe('Peter Parker');
                expect(p.addresses![0].city).toBe('New York');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    /**
     * ASP.NET 8 System.Text.Json could not handle this.
     */
    it('PostDictionaryOfPeople', (done) => {
        service.postDictionary({
            'Iron Man': {
                'surname': 'Stark',
                'givenName': 'Tony',
                'dob': null,
                'id': '00000000-0000-0000-0000-000000000000',
                'name': 'Tony Stark',
                'addresses': []
            },
            'Spider Man': {
                'name': 'Peter Parker',
                'addresses': [
                    {

                        'id': '00000000-0000-0000-0000-000000000000',
                        'city': 'New York',
                        state: 'Somewhere',
                        'postalCode': null!, //strict mode, forced to have null
                        'country': null!,
                        'type': 0,
                        location: { x: 100, y: 200 }

                    }
                ]
            }
        }).subscribe(
            data => {
                expect(data).toBe(2);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getKeyhValuePair', (done) => {
        service.getKeyhValuePair().subscribe(
            data => {
                expect(data!.key).toBe('Spider Man');
                expect(data!.value.addresses![0].city).toBe('New York');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('getBool', (done) => {
        service.getBool().subscribe(
            data => {
                expect(data).toBeTruthy();
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

});

describe('Tuple API', () => {
    let service: DemoWebApi_Controllers_Client.Tuple;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.Tuple,
                    useFactory: tupleClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(DemoWebApi_Controllers_Client.Tuple);
    }));

    afterEach(function () {
    });

    it('getTuple2', (done) => {
        service.getTuple2().subscribe(
            data => {
                expect(data!.item1).toBe('Two');
                expect(data!.item2).toBe(2);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postTuple2', (done) => {
        service.postTuple2({ item1: 'One', item2: 2 }).subscribe(
            data => {
                expect(data).toBe('One');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getTuple7', (done) => {
        service.getTuple7().subscribe(
            data => {
                expect(data!.item1).toBe('Seven');
                expect(data!.item7).toBe(7);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getTuple2', (done) => {
        service.getTuple2().subscribe(
            data => {
                expect(data!.item1).toBe('Two');
                expect(data!.item2).toBe(2);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postTuple7', (done) => {
        service.postTuple7({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '33333', item7: 9 }).subscribe(
            data => {
                expect(data).toBe('One');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getTuple8', (done) => {
        service.getTuple8().subscribe(
            data => {
                expect(data!.item1).toBe('Nested');
                expect(data!.rest.item1).toBe('nine');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postTuple8', (done) => {
        service.postTuple8({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '', item7: '', rest: { item1: 'a', item2: 'b', item3: 'c' } }).subscribe(
            data => {
                expect(data).toBe('a');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('linkPersonCompany1', (done) => {
        service.linkPersonCompany1({
            item1: {
                name: 'someone',
                surname: 'my',
                givenName: 'something',
            },

            item2: {
                name: 'Super',
                addresses: [{ city: 'New York', street1: 'Somewhere st' }]
            }
        }).subscribe(
            data => {
                expect(data!.name).toBe('someone');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );




});

describe('StringData API', () => {
    let service: DemoWebApi_Controllers_Client.StringData;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.StringData,
                    useFactory: stringDataClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(DemoWebApi_Controllers_Client.StringData);
    }));

    afterEach(function () {
    });

    it('TestAthletheSearch', (done) => {
        service.athletheSearch(32, 0, undefined, undefined, undefined!).subscribe(
            data => {
                expect(data).toBe('"320"');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('TestAthletheSearch2', (done) => {
        service.athletheSearch(32, 0, null!, undefined!, 'Search').subscribe(
            data => {
                expect(data).toBe('"320Search"');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('TestAthletheSearch3', (done) => {
        service.athletheSearch(32, 0, null!, 'Sort', 'Search').subscribe( //generally string not available should be undefined.
            data => {
                expect(data).toBe('"320SortSearch"');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('TestAthletheSearch4', (done) => {
        service.athletheSearch(32, 0, 'Order', 'Sort', 'Search').subscribe(
            data => {
                expect(data).toBe('"320OrderSortSearch"');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('TestAthletheSearch5', (done) => {
        service.athletheSearch(32, 0, 'Order', null!, 'Search').subscribe(
            data => {
                expect(data).toBe('"320OrderSearch"');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('TestAthletheSearch6', (done) => {
        service.athletheSearch(32, 0, 'Order', '', 'Search').subscribe(
            data => {
                expect(data).toBe('"320OrderSearch"');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('TestAthletheSearchWithNullInt', (done) => {
        service.athletheSearch(null, null!, 'Order', '', 'Search').subscribe(
            data => {
                fail('validation');
                done();
            },
            error => {
                expect(errorResponseToString(error)).toContain('is not valid');
                done();
            }
        );
    }
    );

    it('TestAthletheSearchWithUndefinedInt', (done) => {
        service.athletheSearch(null, undefined!, 'Order', '', 'Search').subscribe(
            data => {
               fail('validation')
                done();
            },
            error => {
                expect(errorResponseToString(error)).toContain('is not valid');
                done();
            }
        );
    }
    );

    it('getABCDE', (done) => {
        service.getABCDE().subscribe(
            data => {
                expect(data).toBe('"ABCDE"');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getEmptyString', (done) => {
        service.getEmptyString().subscribe(
            data => {
                expect(data).toBe('""');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    /**
     * Angular HttpClient could identify null value.
     */
    it('getNullString', (done) => {
        service.getNullString().subscribe(
            data => {
                expect(data).toBe(null);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );
});

describe('TextData API', () => {
    let service: DemoWebApi_Controllers_Client.TextData;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.TextData,
                    useFactory: textDataClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(DemoWebApi_Controllers_Client.TextData);
    }));

    afterEach(function () {
    });

    it('TestAthletheSearch', (done) => {
        service.athletheSearch(32, 0, null!, undefined!, null!).subscribe(
            data => {
                expect(data).toBe('320');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('TestAthletheSearch2', (done) => {
        service.athletheSearch(32, 0, null!, null!, 'Search').subscribe(
            data => {
                expect(data).toBe('320Search');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getABCDE', (done) => {
        service.getABCDE().subscribe(
            data => {
                expect(data).toBe('ABCDE');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getEmptyString', (done) => {
        service.getEmptyString().subscribe(
            data => {
                expect(data).toBe('');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    /**
     * Angular HttpClient could identify null value.
     */
    it('getNullString', (done) => {
        service.getNullString().subscribe(
            data => {
                expect(data).toBe(null);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

});

/**
 * Test when Web API has customized serialization for 64-bit and BigInteger.
 */
describe('Numbers API', () => {
    let service: DemoWebApi_Controllers_Client.Numbers;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.Numbers,
                    useFactory: numbersClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(DemoWebApi_Controllers_Client.Numbers);
    }));

    it('postBigNumbers', (done) => {
        const d: DemoWebApi_DemoData_Client.BigNumbers = {
            unsigned64: '18446744073709551615', //2 ^ 64 -1,
            signed64: '9223372036854775807', //2 ^ 63 -1,
            unsigned128: '340282366920938463463374607431768211455',
            signed128: '170141183460469231731687303715884105727',
            bigInt: '6277101735386680762814942322444851025767571854389858533375', // 3 unsigned64, 192bits
        };
        /**
        request:
        {
        "unsigned64":"18446744073709551615",
        "signed64":"9223372036854775807",
        "unsigned128":"340282366920938463463374607431768211455",
        "signed128":"170141183460469231731687303715884105727",
        "bigInt":"6277101735386680762814942322444851025767571854389858533375"
        }
        response:
        {
            "signed64": 9223372036854775807,
            "unsigned64": 18446744073709551615,
            "signed128": "170141183460469231731687303715884105727",
            "unsigned128": "340282366920938463463374607431768211455",
            "bigInt": 6277101735386680762814942322444851025767571854389858533375
        }
        
         */
        service.postBigNumbers(d).subscribe(
            r => {
                expect(BigInt(r.unsigned64!)).toBe(BigInt('18446744073709551615'));

                expect(BigInt(r.signed64!)).toBe(BigInt('9223372036854775807'));

                expect(BigInt(r.unsigned128!)).toBe(BigInt(340282366920938463463374607431768211455n));

                expect(BigInt(r.signed128!)).toEqual(BigInt(170141183460469231731687303715884105727n));

                expect(BigInt(r.bigInt!)).toEqual(BigInt(6277101735386680762814942322444851025767571854389858533375n));

                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postIntegralEntity', (done) => {
        service.postIntegralEntity({ name: 'Some one', byte: 255, uShort: 65535 }).subscribe(
            r => {
                expect(r.byte).toBe(255);
                expect(r.uShort).toBe(65535);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postIntegralEntityInvalid', (done) => {
        service.postIntegralEntity({ name: 'Some one', byte: 260, uShort: 65540 }).subscribe(
            r => {
                fail('validation');
                done();
            },
            error => {
                expect(error.status).toEqual(400);
                done();
            }
        );
    }
    );

    /**
     * Backend checks if the data is null, likely due to invalid properties. And throw error.
     */
    it('postIntegralEntityInvalidButBackendCheckNull', (done) => {
        service.postIntegralEntityMustBeValid({ name: 'Some one', byte: 260, uShort: 65540 }).subscribe(
            r => {
                fail('backend should throw 500')
                done();
            },
            error => {
                console.error(errorResponseToString(error));
                expect().nothing();
                done();
            }
        );
    }
    );


    it('postUShort', (done) => {
        service.postByDOfUInt16(65535).subscribe(
            r => {
                expect(r).toBe(65535);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    /**
     * ASP.NET Web API just give 0 back
     */
    it('postUShortInvalid', (done) => {
        service.postByDOfUInt16(65540).subscribe(
            r => {
                fail('validation');
                done();
            },
            error => {
                expect(error.status).toEqual(400);//.toContain('Error converting value 65540 to type');
                done();
            }
        );
    }
    );

    it('postByte', (done) => {
        service.postByDOfByte(255).subscribe(
            r => {
                expect(r).toBe(255);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    /**
     * ASP.NET Web API check ModelState and throw
     */
    it('postByteInvalid', (done) => {
        service.postByDOfByte(258).subscribe(
            r => {
                fail("backend should throw");
                done();
            },
            error => {
                console.error(errorResponseToString(error));
                expect(error.status).toEqual(400)
                done();
            }
        );
    }
    );

    it('getByte', (done) => {
        service.getByte(255).subscribe(
            r => {
                expect(r).toBe(255);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('getByteInvalid', (done) => {
        service.getByte(258).subscribe(
            r => {
                fail('validation');
                done();
            },
            error => {
                expect(error.status).toEqual(400);
                done();
            }
        );
    }
    );

    it('postByteWithNegativeInvalid', (done) => {
        service.postByDOfByte(-10).subscribe(
            r => {
                fail("backend throws")
                done();
            },
            error => {
                console.error(errorResponseToString(error));
                expect().nothing();
                done();
            }
        );
    }
    );

    it('postSByte', (done) => {
        service.postByDOfSByte(127).subscribe(
            r => {
                expect(r).toBe(127);
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postSByteInvalid', (done) => {
        service.postByDOfSByte(130).subscribe(
            r => {
                fail('validation')
                done();
            },
            error => {
                expect(error.status).toEqual(400);
                done();
            }
        );
    }
    );

    it('postInt64', (done) => {
        service.postInt64('9223372036854775807').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt('9223372036854775807'));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postUInt64', (done) => {
        service.postUint64('18446744073709551615').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt('18446744073709551615'));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postInt64Smaller', (done) => {
        service.postInt64('9223372036854775123').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt('9223372036854775123'));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postLongAsBigInt', (done) => {
        // request: "9223372036854775807"
        // response: "9223372036854775807"
        service.postBigInteger('9223372036854775807').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt('9223372036854775807'));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postLongAsBigIntWithSmallNumber', (done) => {
        service.postBigInteger('123').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt(123n));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postReallyBigInt192bits', (done) => {
        // request: "6277101735386680762814942322444851025767571854389858533375"
        // response: "6277101735386680762814942322444851025767571854389858533375"
        service.postBigInteger('6277101735386680762814942322444851025767571854389858533375').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt(6277101735386680762814942322444851025767571854389858533375n));
                expect(BigInt(r).valueOf()).toBe(BigInt('6277101735386680762814942322444851025767571854389858533375'));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postReallyBigInt80bits', (done) => {
        service.postBigInteger('604462909807314587353087').subscribe(
            r => {
                expect(BigInt(r).valueOf()).toBe(604462909807314587353087n);
                expect(BigInt(r).valueOf()).toBe(BigInt('604462909807314587353087'));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postReallyBigInt128bits', (done) => {
        service.postBigInteger('340282366920938463463374607431768211455').subscribe(
            r => {
                expect(BigInt(r).valueOf()).toBe(340282366920938463463374607431768211455n);
                expect(BigInt(r).valueOf()).toBe(BigInt('340282366920938463463374607431768211455'));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    /**
     * Correct.
     * Request as string: "170141183460469231731687303715884105727",
     * Response: "170141183460469231731687303715884105727" , Content-Type: application/json; charset=utf-8
     */
    it('postInt128', (done) => {
        service.postInt128('170141183460469231731687303715884105727').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt('170141183460469231731687303715884105727'));
                expect(BigInt(r)).toBe(BigInt(170141183460469231731687303715884105727n));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    /**
     * Correct.
     * Request as string: "340282366920938463463374607431768211455",
     * Response: "340282366920938463463374607431768211455" , Content-Type: application/json; charset=utf-8
     */
    it('postUInt128', (done) => {
        service.postUint128('340282366920938463463374607431768211455').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt('340282366920938463463374607431768211455'));
                expect(BigInt(r)).toBe(BigInt(340282366920938463463374607431768211455n));
                expect(BigInt(r).valueOf()).toBe(BigInt('340282366920938463463374607431768211455'));
                expect(BigInt(r).valueOf()).toBe(BigInt(340282366920938463463374607431768211455n));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );


});

/**
 * Test when Web API has no customized serialization for 64-bit and BigInteger.
 * Marked as xdescribe then.
 * 
 * Test the behavior of JavaScript when dealing with integral numbers larger than 53-bit.
 * Tested with ASP.NET 8, Chrome Version 121.0.6167.185 (Official Build) (64-bit), Firefox 122.0.1 (64-bit)
 * The lession is, when dealing with integral number larger than 53-bit or 64-bit, there are 3 options for client server agreement, as of year Feb 2024:
 * 1. In both ends, use string Content-Type: text/plain or application/json, for single big number parameter and return, probably for JS specific calls, since C# client can handle these integral types comfortablly.
 * Otherwise, the developer experience of backend developer is poor, loosing the enjoyment of strongly types of integral. For big integral inside an object, this may mean you have to declare a JS specific class as well.
 * 2. In the JS client end, use string object for 54-bit and greater.
 * 3. Use signed128 or unsigned128 if the number is not larger than 128-bit since ASP.NET 8 serializes it as string object.
 * 4. Alter the serilization of ASP.NET Web API for 64-bit and BigInteger, make it similar to what for 128-bit. https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/converters-how-to
 *
 * JavaScript has difficulty in deal with number larger than 53-bit as JSON object.
 */
xdescribe('Numbers API without customized serialization', () => {
    let service: DemoWebApi_Controllers_Client.Numbers;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: DemoWebApi_Controllers_Client.Numbers,
                    useFactory: numbersClientFactory,
                    deps: [HttpClient],

                },

            ]
        });

        service = TestBed.get(DemoWebApi_Controllers_Client.Numbers);
    }));

    it('postBigNumbersIncorrect', (done) => {
        const d: DemoWebApi_DemoData_Client.BigNumbers = {
            unsigned64: '18446744073709551615', //2 ^ 64 -1,
            signed64: '9223372036854775807', //2 ^ 63 -1,
            unsigned128: '340282366920938463463374607431768211455',
            signed128: '170141183460469231731687303715884105727',
            bigInt: '6277101735386680762814942322444851025767571854389858533375', // 3 unsigned64, 192bits
        };
        /**
        request:
        {
        "unsigned64":"18446744073709551615",
        "signed64":"9223372036854775807",
        "unsigned128":"340282366920938463463374607431768211455",
        "signed128":"170141183460469231731687303715884105727",
        "bigInt":"6277101735386680762814942322444851025767571854389858533375"
        }
        response:
        {
            "signed64": 9223372036854775807,
            "unsigned64": 18446744073709551615,
            "signed128": "170141183460469231731687303715884105727",
            "unsigned128": "340282366920938463463374607431768211455",
            "bigInt": 6277101735386680762814942322444851025767571854389858533375
        }
        
         */
        service.postBigNumbers(d).subscribe(
            r => {
                expect(BigInt(r.unsigned64!)).not.toBe(BigInt('18446744073709551615')); // BigInt can not handle the coversion from json number form correctly.
                expect(BigInt(r.unsigned64!)).toEqual(BigInt('18446744073709551616')); // actually incorrect during deserialization

                expect(BigInt(r.signed64!)).not.toBe(BigInt('9223372036854775807'));
                expect(BigInt(r.signed64!)).toEqual(BigInt('9223372036854775808'));

                expect(BigInt(r.unsigned128!)).toBe(BigInt(340282366920938463463374607431768211455n));

                expect(BigInt(r.signed128!)).toEqual(BigInt(170141183460469231731687303715884105727n));

                expect(BigInt(r.bigInt!)).not.toEqual(BigInt(6277101735386680762814942322444851025767571854389858533375n));
                expect(BigInt(r.bigInt!)).toEqual(BigInt(6277101735386680763835789423207666416102355444464034512896n)); // how wrong

                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    /**
     * Even though the request payload is 9223372036854776000 (loosing precision, cause of the 53bit issue), or "9223372036854776123", the response is 0 as shown in Chrome's console and Fiddler.
     * And the Web API has received actually 0. Not sure if the Web API binding had turned the request payload into 0 if the client is a Web browser.
     */
    it('postInt64ButIncorrect', (done) => {
        service.postInt64('9223372036854775807').subscribe(
            r => {
                expect(BigInt(9223372036854775807n).toString()).toBe('9223372036854775807');
                expect(BigInt(r)).toBe(BigInt('9223372036854775808')); //reponse is 9223372036854775807, but BigInt(r) gives last 3 digits 808
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postUInt64ButIncorrect', (done) => {
        service.postUint64('18446744073709551615').subscribe(
            r => {
                expect(BigInt(18446744073709551615n).toString()).toBe('18446744073709551615');
                expect(BigInt(r)).toBe(BigInt('18446744073709551616')); //reponse is 18446744073709551615, but BigInt(r) gives last 3 digits 808
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    /**
            postBigIntegerForJs(bigInteger?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
            return this.http.post<string>(this.baseUri + 'api/Numbers/bigIntegerForJs', JSON.stringify(bigInteger), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }
     */
    it('postBigIntegralAsStringForJs', (done) => {
        service.postBigIntegralAsStringForJs('9223372036854775807').subscribe(
            r => {
                expect(BigInt(9223372036854775807n).toString()).toBe('9223372036854775807');
                expect(BigInt('9223372036854775807').toString()).toBe('9223372036854775807');
                expect(BigInt(r)).toBe(BigInt('9223372036854775807'));
                expect(BigInt(r)).toBe(BigInt(9223372036854775807n));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postBigIntegralAsStringForJs2', (done) => {
        service.postBigIntegralAsStringForJs('6277101735386680762814942322444851025767571854389858533375').subscribe(
            r => {
                expect(BigInt(6277101735386680762814942322444851025767571854389858533375n).toString()).toBe('6277101735386680762814942322444851025767571854389858533375');
                expect(BigInt('6277101735386680762814942322444851025767571854389858533375').toString()).toBe('6277101735386680762814942322444851025767571854389858533375');
                expect(BigInt(r)).toBe(BigInt('6277101735386680762814942322444851025767571854389858533375'));
                expect(BigInt(r)).toBe(BigInt(6277101735386680762814942322444851025767571854389858533375n));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postInt64SmallerInCorrect', (done) => {
        service.postInt64('9223372036854775123').subscribe(
            r => {
                expect(BigInt(r)).not.toBe(BigInt('9223372036854775123')); //reponse is 9223372036854775123, but BigInt(r) gives l9223372036854774784
                expect(BigInt(r)).toBe(BigInt('9223372036854774784')); // many digits wrong
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postLongAsBigIntButIncorrect', (done) => {
        // request: "9223372036854775807"
        // response: 9223372036854775807
        service.postBigInteger('9223372036854775807').subscribe(
            r => {
                expect(BigInt(9223372036854775807n).toString()).toBe('9223372036854775807');
                expect(BigInt(r)).toBe(BigInt('9223372036854775808')); //reponse is 9223372036854775807, but BigInt(r) gives last 3 digits 808, since the returned value does not have the n suffix.
                expect(r.toString()).toBe('9223372036854776000'); //the response is a big int which JS could not handle in toString(), 53bit gets in the way.
                expect(BigInt(r).toString()).toBe('9223372036854775808');
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postLongAsBigIntWithSmallNumber', (done) => {
        service.postBigInteger('123').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt(123n));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );

    }
    );

    it('postReallyBigInt192bitsButIncorrect', (done) => {
        // request: "6277101735386680762814942322444851025767571854389858533375"
        // response: 6277101735386680762814942322444851025767571854389858533375
        service.postBigInteger('6277101735386680762814942322444851025767571854389858533375').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt(6277101735386680762814942322444851025767571854389858533375)); //this time, it is correct, but...
                expect(BigInt(r).valueOf()).not.toBe(6277101735386680762814942322444851025767571854389858533375n); // not really,
                expect(BigInt(r).valueOf()).not.toBe(BigInt('6277101735386680762814942322444851025767571854389858533375')); // not really, because what returned is lack of n
                expect(BigInt(r)).toBe(6277101735386680763835789423207666416102355444464034512896n); // many many digits wrong
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postReallyBigInt80bitsButIncorect', (done) => {
        service.postBigInteger('604462909807314587353087').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt(604462909807314587353087)); //this time, it is correct, but...
                expect(BigInt(r).valueOf()).not.toBe(604462909807314587353087n); // not really,
                expect(BigInt(r).valueOf()).not.toBe(BigInt('604462909807314587353087')); // not really, because what returned is lack of n
                expect(BigInt(r).valueOf()).toBe(604462909807314587353088n); // last digit wrong
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    it('postReallyBigInt128bitsButIncorect', (done) => {
        service.postBigInteger('340282366920938463463374607431768211455').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt(340282366920938463463374607431768211455)); //this time, it is correct, but...
                expect(BigInt(r).valueOf()).not.toBe(340282366920938463463374607431768211455n); // not really,
                expect(BigInt(r).valueOf()).not.toBe(BigInt('340282366920938463463374607431768211455')); // not really, because what returned is lack of n
                expect(BigInt(r)).toBe(34028236692093846346337460743176821145n); // last digit wrong,
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    /**
     * Correct.
     * Request as string: "170141183460469231731687303715884105727",
     * Response: "170141183460469231731687303715884105727" , Content-Type: application/json; charset=utf-8
     */
    it('postInt128', (done) => {
        service.postInt128('170141183460469231731687303715884105727').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt('170141183460469231731687303715884105727'));
                expect(BigInt(r)).toBe(BigInt(170141183460469231731687303715884105727n));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );

    /**
     * Correct.
     * Request as string: "340282366920938463463374607431768211455",
     * Response: "340282366920938463463374607431768211455" , Content-Type: application/json; charset=utf-8
     */
    it('postUInt128', (done) => {
        service.postUint128('340282366920938463463374607431768211455').subscribe(
            r => {
                expect(BigInt(r)).toBe(BigInt('340282366920938463463374607431768211455'));
                expect(BigInt(r)).toBe(BigInt(340282366920938463463374607431768211455n));
                expect(BigInt(r).valueOf()).toBe(BigInt('340282366920938463463374607431768211455'));
                expect(BigInt(r).valueOf()).toBe(BigInt(340282366920938463463374607431768211455n));
                done();
            },
            error => {
                fail(errorResponseToString(error));
                done();
            }
        );
    }
    );


});
