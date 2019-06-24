"use strict";
exports.__esModule = true;
var namespaces = require("./clientapi/WebApiAxiosClientAuto");
//import * as namespaces from './clientapi/WebApiCoreAxiosClientAuto';
// JEST provides a few ways of handling async code. This test suite use callbacks, 
// since it is a simple hack from the test suite initially written for Angular 2.
var DemoWebApi_Controllers_Client = namespaces.DemoWebApi_Controllers_Client;
var apiBaseUri = 'http://localhost:10965/';
//const apiBaseUri = 'http://localhost:5000/';
function instanceOfAxiosError(obj) {
    return 'isAxiosError' in obj;
}
function errorResponseToString(error) {
    var errMsg;
    if (instanceOfAxiosError(error)) {
        if (error.response.status === 0) {
            errMsg = 'No response from backend. Connection is unavailable.';
        }
        else {
            if (error.message) {
                errMsg = error.response.status + " - " + error.response.statusText + ": " + error.message;
            }
            else {
                errMsg = error.response.status + " - " + error.response.statusText;
            }
        }
        errMsg += error.message ? (' ' + JSON.stringify(error.message)) : '';
        return errMsg;
    }
    else {
        errMsg = error.message ? error.message : error.toString();
        return errMsg;
    }
}
exports.errorResponseToString = errorResponseToString;
describe('Values API', function () {
    var service = new namespaces.DemoWebApi_Controllers_Client.Values(apiBaseUri);
    it('get', function (done) {
        service.get().then(function (data) {
            console.debug(data.length);
            expect(data[1]).toBe('value2');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getByIdAndName', function (done) {
        service.getByIdAndName(1, 'Abc').then(function (data) {
            console.debug(data.length);
            expect(data).toBe('Abc1');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getByName', function (done) {
        service.getByName('Abc').then(function (data) {
            console.debug(data.length);
            expect(data).toBe('ABC');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('Post', function (done) {
        service.post('Abc').then(function (data) {
            console.debug(data.length);
            expect(data).toBe('ABC');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getByIdAndChinese', function (done) {
        service.getByIdAndName(1, 'something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"').then(function (data) {
            console.debug(data.length);
            expect(data).toBe('something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.\'; <>: \"1');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
});
describe('Heroes API', function () {
    var service = new namespaces.DemoWebApi_Controllers_Client.Heroes(apiBaseUri);
    it('getAll', function (done) {
        service.get().then(function (data) {
            console.debug(data.length);
            expect(data.length).toBeGreaterThan(0);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('Add', function (done) {
        service.post('somebody').then(function (data) {
            expect(data.name).toBe('somebody');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('PostWithQuery', function (done) {
        service.postWithQuery('somebodyqqq').then(function (data) {
            expect(data.name).toBe('somebodyqqq');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('search', function (done) {
        service.search('Torna').then(function (data) {
            console.debug(data.length);
            expect(data.length).toBe(1);
            expect(data[0].name).toBe('Tornado');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
});
describe('entities API', function () {
    var client = new namespaces.DemoWebApi_Controllers_Client.Entities(apiBaseUri);
    //it('getPersonNotFound', (done) => {
    //    client.getPersonNotFound(123)
    //        .then(
    //        data => {
    //            fail('That is bad. Should be 404.');
    //            done();
    //        },
    //        error => {
    //            expect(errorResponseToString(error)).toContain('404');
    //            done();
    //        }
    //        );
    //}
    //);
    it('add', function (done) {
        var id;
        var newPerson = {
            name: 'John Smith' + Date.now().toString(),
            givenName: 'John',
            surname: 'Smith',
            dob: new Date('1977-12-28')
        };
        client.createPerson(newPerson)
            .then(function (data) {
            id = data;
            expect(data).toBeTruthy();
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('mimsString', function (done) {
        var id;
        var c = {
            tag: 'Hello',
            result: {
                result: 123.45
            }
        };
        client.getMims(c)
            .then(function (data) {
            expect(data.message).toBe('Hello');
            expect(data.result).toBe('123.45');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('myGenericPerson', function (done) {
        var newPerson = {
            name: 'John Smith',
            givenName: 'John',
            surname: 'Smith',
            dob: new Date('1977-12-28')
        };
        var c = {
            myK: 123.456,
            myT: 'abc',
            myU: newPerson,
            status: 'OK'
        };
        client.getMyGenericPerson(c)
            .then(function (data) {
            expect(data.myU.name).toBe('John Smith');
            expect(data.status).toBe('OK');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
});
describe('SuperDemo API', function () {
    var service = new namespaces.DemoWebApi_Controllers_Client.SuperDemo(apiBaseUri);
    it('getBool', function (done) {
        service.getBool().then(function (data) {
            expect(data).toBeTruthy();
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('GetNextHour', function (done) {
        var dt = new Date(Date.now());
        var h = dt.getHours();
        service.getNextHour(dt).then(function (data) {
            var dd = new Date(data);
            expect(dd.getHours()).toBe(h + 1);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('GetNextYear', function (done) {
        var dt = new Date(Date.now());
        var h = dt.getFullYear();
        service.getNextYear(dt).then(function (data) {
            var dd = new Date(data);
            expect(dd.getFullYear()).toBe(h + 1);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('PostNextYear', function (done) {
        var dt = new Date(Date.now());
        var h = dt.getFullYear();
        service.postNextYear(dt).then(function (data) {
            var dd = new Date(data);
            expect(dd.getFullYear()).toBe(h + 1);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getFloatZero', function (done) {
        service.getFloatZero().then(function (data) {
            expect(data).toBeLessThan(0.000001);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getDoubleZero', function (done) {
        service.getDoubleZero().then(function (data) {
            expect(data).not.toBe(0);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getDecimalZero', function (done) {
        service.getDecimalZero().then(function (data) {
            expect(data).toBe(0);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getIntSquare', function (done) {
        service.getIntSquare(100).then(function (data) {
            expect(data).toBe(10000);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getDecimalSquare', function (done) {
        service.getDecimalSquare(100).then(function (data) {
            expect(data).toBe(10000);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getDateTime', function (done) {
        service.getDateTime(true).then(function (data) {
            expect(data).toBeDefined();
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getDateTimeNull', function (done) {
        service.getDateTime(false).then(function (data) {
            expect(data).toBeNull();
            //expect(data).toBe(''); // .net core return 204 nocontent empty body
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getNullableDecimal', function (done) {
        service.getNullableDecimal(true).then(function (data) {
            expect(data).toBeGreaterThan(10);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getNullableDecimalNull', function (done) {
        service.getNullableDecimal(false).then(function (data) {
            expect(data).toBeNull();
            //expect(data).toBe(''); // .net core return 204 nocontent empty body
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getNullString', function (done) {
        service.getNullString().then(function (data) {
            expect(data).toBeNull();
            //expect(data).toBe(''); // .net core return 204 nocontent empty body
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getNullPerson', function (done) {
        service.getNullPerson().then(function (data) {
            expect(data).toBeNull();
            //expect(data).toBe(''); // .net core return 204 nocontent empty body
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getByteArray', function (done) {
        service.getByteArray().then(function (data) {
            expect(data.length).toBeGreaterThan(0);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getTextStream', function (done) {
        service.getTextStream().then(function (data) {
            console.debug('getTextStream');
            console.debug(data); // abcdefg
            expect(data).toBe('abcdefg');
            // const reader = new FileReader();//axios actually give string rather than a blob structure
            // reader.onload = () => {
            //   expect(reader.result).toBe('abcdefg'); 
            // };
            // reader.readAsText(data.data);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getActionResult', function (done) {
        service.getActionResult().then(function (data) {
            console.debug('getActionResult');
            console.debug(data); // abcdefg
            expect(data).toBe('abcdefg'); //axios give string directly rather than a response structure
            // expect(data.status).toBe(200);
            // expect(data.data).toBe('"abcdefg"');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getbyte', function (done) {
        service.getbyte().then(function (data) {
            expect(data).toEqual(255);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getActionStringResult', function (done) {
        service.getActionStringResult().then(function (data) {
            expect(data).toContain('abcdefg');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getChar', function (done) {
        service.getChar().then(function (data) {
            expect(data).toBe('A');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getDecimal', function (done) {
        service.getDecimal().then(function (data) {
            expect(data).toBe(79228162514264337593543950335);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getdouble', function (done) {
        service.getdouble().then(function (data) {
            expect(data).toBe(-1.7976931348623e308);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getUint', function (done) {
        service.getUint().then(function (data) {
            expect(data).toBe(4294967295);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getulong', function (done) {
        service.getulong().then(function (data) {
            expect(data).toBe(18446744073709551615);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getInt2D', function (done) {
        service.getInt2D().then(function (data) {
            expect(data[0][0]).toBe(1);
            expect(data[0][3]).toBe(4);
            expect(data[1][0]).toBe(5);
            expect(data[1][3]).toBe(8);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getInt2DJagged', function (done) {
        service.getInt2DJagged().then(function (data) {
            expect(data[0][0]).toBe(1);
            expect(data[0][3]).toBe(4);
            expect(data[1][0]).toBe(5);
            expect(data[1][3]).toBe(8);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('postInt2D', function (done) {
        service.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]]).then(function (data) {
            expect(data).toBeTruthy();
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('postIntArray', function (done) {
        service.postIntArray([1, 2, 3, 4, 5, 6, 7, 8]).then(function (data) {
            expect(data).toBeTruthy();
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('postWithQueryButEmptyBody', function (done) {
        service.postWithQueryButEmptyBody('abc', 123).then(function (data) {
            expect(data.item1).toBe('abc');
            expect(data.item2).toBe(123);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getDictionaryOfPeople', function (done) {
        service.getDictionaryOfPeople().then(function (data) {
            var p = data['spider Man']; //ASP.NET Web API with NewtonSoftJson made it camcel;
            if (!p) {
                p = data['Spider Man']; //.NET Core is OK
            }
            expect(p.name).toBe('Peter Parker');
            expect(p.addresses[0].city).toBe('New York');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('PostDictionaryOfPeople', function (done) {
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
                        'postalCode': null,
                        'country': null,
                        'type': 0,
                        location: { x: 100, y: 200 }
                    }
                ]
            }
        }).then(function (data) {
            expect(data).toBe(2);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getKeyhValuePair', function (done) {
        service.getKeyhValuePair().then(function (data) {
            expect(data.key).toBe('Spider Man');
            expect(data.value.addresses[0].city).toBe('New York');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getBool', function (done) {
        service.getBool().then(function (data) {
            expect(data).toBeTruthy();
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getNextYearNullable', function (done) {
        var now = new Date(Date.now());
        service.getNextYearNullable(2, now).then(function (data) {
            var dt = new Date(data); //data is actually string, NG HttpClient does not translate it to Date
            expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getNextHourNullable', function (done) {
        var now = new Date(Date.now());
        service.getNextHourNullable(2, now).then(function (data) {
            var dt = new Date(data);
            expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getNextYearNullable2', function (done) {
        var now = new Date(Date.now());
        service.getNextYearNullable(2, undefined).then(function (data) {
            var dt = new Date(data);
            expect(dt.getFullYear()).toEqual(now.getFullYear() + 2);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getNextHourNullable2', function (done) {
        var now = new Date(Date.now());
        service.getNextHourNullable(2, null).then(function (data) {
            var dt = new Date(data);
            expect(dt.getHours() % 24).toEqual((now.getHours() + 2) % 24);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('searchDateRange', function (done) {
        var startDt = new Date(Date.now());
        var endDt = new Date(Date.now() + 100000);
        service.searchDateRange(startDt, endDt).then(function (data) {
            expect(new Date(data.item1)).toEqual(startDt);
            expect(new Date(data.item2)).toEqual(endDt);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('searchDateRangeEndUndefined', function (done) {
        var startDt = new Date(Date.now());
        var endDt = new Date(Date.now() + 100000);
        service.searchDateRange(startDt, undefined).then(function (data) {
            expect(new Date(data.item1)).toEqual(startDt);
            expect(data.item2).toBeNull(); //OK with null rather than undefined
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('searchDateRangeStartUndefined', function (done) {
        var startDt = new Date(Date.now());
        var endDt = new Date(Date.now() + 100000);
        service.searchDateRange(undefined, endDt).then(function (data) {
            //fail('The API should return http 400 error.'); in .net core 2.0, the service return status 400. Apparently this was a bug which was fixed in 2.1
            expect(data.item1).toBeNull();
            expect(new Date(data.item2)).toEqual(endDt);
            done();
        }, function (error) {
            var errorText = errorResponseToString(error);
            if (errorText.indexOf('400') < 0) {
                fail(errorText);
            }
            expect(true).toBeTruthy();
            done();
        });
    });
    it('searchDateRangeBotNull', function (done) {
        var startDt = new Date(Date.now());
        var endDt = new Date(Date.now() + 100000);
        service.searchDateRange(null, undefined).then(function (data) {
            expect(data.item1).toBeNull();
            expect(data.item1).toBeNull();
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
});
describe('Tuple API', function () {
    var service = new namespaces.DemoWebApi_Controllers_Client.Tuple(apiBaseUri);
    it('getTuple2', function (done) {
        service.getTuple2().then(function (data) {
            expect(data.item1).toBe('Two');
            expect(data.item2).toBe(2);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('postTuple2', function (done) {
        service.postTuple2({ item1: "One", item2: 2 }).then(function (data) {
            expect(data).toBe('One');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getTuple7', function (done) {
        service.getTuple7().then(function (data) {
            expect(data.item1).toBe('Seven');
            expect(data.item7).toBe(7);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getTuple2', function (done) {
        service.getTuple2().then(function (data) {
            expect(data.item1).toBe('Two');
            expect(data.item2).toBe(2);
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('postTuple7', function (done) {
        service.postTuple7({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: 33333, item7: 9 }).then(function (data) {
            expect(data).toBe('One');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('getTuple8', function (done) {
        service.getTuple8().then(function (data) {
            expect(data.item1).toBe('Nested');
            expect(data.rest.item1).toBe('nine');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('postTuple8', function (done) {
        service.postTuple8({ item1: 'One', item2: '', item3: '', item4: '', item5: '', item6: '', item7: '', rest: { item1: 'a', item2: 'b', item3: 'c' } }).then(function (data) {
            expect(data).toBe('a');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
    it('linkPersonCompany1', function (done) {
        service.linkPersonCompany1({
            item1: {
                name: 'someone',
                surname: 'my',
                givenName: 'something'
            },
            item2: {
                name: 'Super',
                addresses: [{ city: 'New York', street1: 'Somewhere st' }]
            }
        }).then(function (data) {
            expect(data.name).toBe('someone');
            done();
        }, function (error) {
            fail(errorResponseToString(error));
            done();
        });
    });
});
