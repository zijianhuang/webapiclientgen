/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../ClientApi/WebApiCoreJQClientAuto.ts"/>
// Make sure chutzpah.json is updated with  reference to the jQuery lib when the lib is upgraded.
// Sometimes the test cases are not appearing in Test Explorer, then claring %temp% may help.
// To launch IIS Express, use something like this: C:\VsProjects\webapiclientgen>"C:\Program Files (x86)\IIS Express\iisexpress.exe" /site:DemoWebApi /apppool:Clr4IntegratedAppPool /config:c:\vsprojects\webapiclientgen\.vs\config\applicationhost.config
// The post build events will copy the JS file of this test to wwwroot and bin\debug\...\wwwroot\
/*
And make sure the testApi credential exists through
POST to http://localhost:10965/api/Account/Register
Content-Type: application/json

{
Email: 'testapi@test.com',
Password: 'Tttttttt_8',
ConfirmPassword:  'Tttttttt_8'
}

*/
var CommonCases;
(function (CommonCases) {
    QUnit.config.testTimeout = 30000;
    const baseUri = HttpClient.locationOrigin;
    let authHttpClient = new AuthHttpClient();
    let entitiesApi = new DemoWebApi_Controllers_Client.Entities(baseUri, authHttpClient);
    let valuesApi = new DemoWebApi_Controllers_Client.Values(baseUri, authHttpClient);
    let superDemoApi = new DemoWebApi_Controllers_Client.SuperDemo(baseUri);
    let tupleApi = new DemoWebApi_Controllers_Client.Tuple(baseUri);
    let heroesApi = new DemoWebApi_Controllers_Client.Heroes(baseUri);
    let stringDataApi = new DemoWebApi_Controllers_Client.StringData(baseUri);
    let textDataApi = new DemoWebApi_Controllers_Client.TextData(baseUri);
    let dateTypesApi = new DemoWebApi_Controllers_Client.DateTypes(baseUri);
    let numbersApi = new DemoWebApi_Controllers_Client.Numbers(baseUri, authHttpClient);
    //This should always work since it is a simple unit test.
    QUnit.test("data compare", function (assert) {
        let person = {
            name: "someone",
            surname: "my",
            givenName: "something",
        };
        let person2 = {
            name: "someone",
            surname: "my",
            givenName: "something",
        };
        assert.equal(JSON.stringify(person), JSON.stringify(person2));
    });
    QUnit.module("Heroes", function () {
        QUnit.test("GetAll", function (assert) {
            let done = assert.async();
            heroesApi.getHeros(data => {
                assert.ok(data.length > 0);
                done();
            });
        });
        QUnit.test("Get", function (assert) {
            let done = assert.async();
            heroesApi.getHero("20", data => {
                assert.equal(data.name, "Tornado");
                done();
            });
        });
        QUnit.test("Add", function (assert) {
            let done = assert.async();
            heroesApi.post("somebody", data => {
                assert.equal(data.name, "somebody");
                done();
            });
        });
        QUnit.test("Search", function (assert) {
            let done = assert.async();
            heroesApi.search("Torn", data => {
                assert.equal(data.length, 1);
                assert.equal(data[0].name, "Tornado");
                done();
            });
        });
    });
    QUnit.module("StringData", function () {
        QUnit.test("TestAthletheSearch", function (assert) {
            let done = assert.async();
            stringDataApi.athletheSearch(32, 0, null, null, null, data => {
                assert.equal(data, '320');
                done();
            });
        });
        QUnit.test("TestAthletheSearch2", function (assert) {
            let done = assert.async();
            stringDataApi.athletheSearch(32, 0, null, null, 'Search', data => {
                assert.equal(data, '320Search');
                done();
            });
        });
        QUnit.test("TestAthletheSearch3", function (assert) {
            let done = assert.async();
            stringDataApi.athletheSearch(32, 0, null, 'Sort', 'Search', data => {
                assert.equal(data, '320SortSearch');
                done();
            });
        });
        QUnit.test("TestAthletheSearch4", function (assert) {
            let done = assert.async();
            stringDataApi.athletheSearch(32, 0, 'Order', 'Sort', 'Search', data => {
                assert.equal(data, '320OrderSortSearch');
                done();
            });
        });
        QUnit.test("TestAthletheSearch5", function (assert) {
            let done = assert.async();
            stringDataApi.athletheSearch(32, 0, 'Order', null, 'Search', data => {
                assert.equal(data, '320OrderSearch');
                done();
            });
        });
        QUnit.test("TestAthletheSearch6", function (assert) {
            let done = assert.async();
            stringDataApi.athletheSearch(32, 0, 'Order', '', 'Search', data => {
                assert.equal(data, '320OrderSearch');
                done();
            });
        });
        QUnit.test("getABCDE", function (assert) {
            let done = assert.async();
            stringDataApi.getABCDE(data => {
                assert.equal(data, 'ABCDE'); //HttpClient based on JQueryXHR is smart enough to intepret JSON string object as plain text.
                done();
            });
        });
        QUnit.test("getEmptyString", function (assert) {
            let done = assert.async();
            stringDataApi.getEmptyString(data => {
                assert.equal(data, '');
                done();
            });
        });
        QUnit.test("getNullString", function (assert) {
            let done = assert.async();
            stringDataApi.getNullString(data => {
                assert.equal(data, null);
                done();
            });
        });
    });
    QUnit.module("TextData", function () {
        QUnit.test("TestAthletheSearch1", function (assert) {
            let done = assert.async();
            textDataApi.athletheSearch(32, 0, null, null, null, data => {
                assert.equal(data, '320');
                done();
            });
        });
        QUnit.test("TestAthletheSearch2", function (assert) {
            let done = assert.async();
            textDataApi.athletheSearch(32, 0, null, null, 'Search', data => {
                assert.equal(data, '320Search');
                done();
            });
        });
        QUnit.test("TestAthletheSearch3", function (assert) {
            let done = assert.async();
            textDataApi.athletheSearch(32, 0, null, 'Sort', 'Search', data => {
                assert.equal(data, '320SortSearch');
                done();
            });
        });
        QUnit.test("TestAthletheSearch4", function (assert) {
            let done = assert.async();
            textDataApi.athletheSearch(32, 0, 'Order', 'Sort', 'Search', data => {
                assert.equal(data, '320OrderSortSearch');
                done();
            });
        });
        QUnit.test("TestAthletheSearch5", function (assert) {
            let done = assert.async();
            textDataApi.athletheSearch(32, 0, 'Order', null, 'Search', data => {
                assert.equal(data, '320OrderSearch');
                done();
            });
        });
        QUnit.test("TestAthletheSearch6", function (assert) {
            let done = assert.async();
            textDataApi.athletheSearch(32, 0, 'Order', '', 'Search', data => {
                assert.equal(data, '320OrderSearch');
                done();
            });
        });
        QUnit.test("getABCDE", function (assert) {
            let done = assert.async();
            textDataApi.getABCDE(data => {
                assert.equal(data, 'ABCDE');
                done();
            });
        });
        QUnit.test("getEmptyString", function (assert) {
            let done = assert.async();
            textDataApi.getEmptyString(data => {
                assert.equal(data, '');
                done();
            });
        });
        QUnit.test("getNullString", function (assert) {
            let done = assert.async();
            textDataApi.getNullString(data => {
                assert.equal(data, null);
                done();
            });
        });
    });
    QUnit.module("DateTypes", function () {
        QUnit.test("GetNextHour", function (assert) {
            let done = assert.async();
            let dt = new Date(Date.now());
            let h = dt.getHours();
            dateTypesApi.getNextHour(dt, (data) => {
                const dataHour = new Date(data).getHours(); //data is regarded by jQ as string
                const expectedH = h + 1;
                assert.equal(dataHour, expectedH);
                //assert.ok(true);
                done();
            });
        });
        QUnit.test("GetDateTime", function (assert) {
            let done = assert.async();
            dateTypesApi.getDateTime(true, (data) => {
                assert.ok(data);
                done();
            });
        });
        QUnit.test("GetDateTimeNull", function (assert) {
            let done = assert.async();
            dateTypesApi.getDateTime(false, (data) => {
                assert.equal(data, null);
                done();
            });
        });
        QUnit.test("postDateTimeOffset", function (assert) {
            const dt = new Date(Date.now());
            let done = assert.async();
            dateTypesApi.postDateTimeOffset(dt, (data) => {
                assert.deepEqual(new Date(data), dt);
                done();
            });
        });
        QUnit.test("postDateTimeOffsetNullable", function (assert) {
            const dt = new Date(Date.now());
            let done = assert.async();
            dateTypesApi.postDateTimeOffsetNullable(dt, (data) => {
                assert.deepEqual(new Date(data), dt);
                done();
            });
        });
        QUnit.test("postDateTimeOffsetNullableWithNull", function (assert) {
            let done = assert.async();
            dateTypesApi.postDateTimeOffsetNullable(null, (data) => {
                assert.equal(data, null);
                done();
            });
        });
        QUnit.test("postDateTimeOffsetNullableWithUndefined", function (assert) {
            let done = assert.async();
            dateTypesApi.postDateTimeOffsetNullable(undefined, (data) => {
                assert.equal(data, null);
                done();
            });
        });
        QUnit.test("postDateOnly", function (assert) {
            const dt = new Date(Date.parse('2018-12-23')); //JS will serialize it to 2018-12-23T00:00:00.000Z.
            let done = assert.async();
            dateTypesApi.postDateOnly(dt, (data) => {
                assert.equal(data, '2018-12-23');
                done();
            });
        });
        QUnit.test("postDateOnlyWithNull", function (assert) {
            let done = assert.async();
            dateTypesApi.postDateOnly(null, (data) => {
                assert.equal(data, '0001-01-01');
                done();
            });
        });
        QUnit.test("postDateOnlyNullable", function (assert) {
            const dt = new Date(Date.parse('2018-12-23')); //JS will serialize it to 2018-12-23T00:00:00.000Z.
            let done = assert.async();
            dateTypesApi.postDateOnlyNullable(dt, (data) => {
                assert.equal(data, '2018-12-23');
                done();
            });
        });
        QUnit.test("postDateOnlyNullableWithNull", function (assert) {
            let done = assert.async();
            dateTypesApi.postDateOnlyNullable(null, (data) => {
                assert.equal(data, null);
                done();
            });
        });
        QUnit.test("postDateOnlyNullableWithUndefined", function (assert) {
            let done = assert.async();
            dateTypesApi.postDateOnlyNullable(undefined, (data) => {
                assert.equal(data, null);
                done();
            });
        });
        QUnit.test("isDateTimeOffsetDate", function (assert) {
            const dt = new Date(Date.parse('2018-12-23')); //JS will serialize it to 2018-12-23T00:00:00.000Z.
            let done = assert.async();
            dateTypesApi.isDateTimeOffsetDate(dt, (data) => {
                const v = data.item1;
                assert.equal(data.item1, '2018-12-23');
                done();
            });
        });
        QUnit.test("isDateTimeDate", function (assert) {
            const dt = new Date(Date.parse('2018-12-23')); //JS will serialize it to 2018-12-23T00:00:00.000Z.
            let done = assert.async();
            dateTypesApi.isDateTimeDate(dt, (data) => {
                const v = data.item1;
                assert.equal(data.item1, '2018-12-23');
                done();
            });
        });
    });
    QUnit.module('Entities', function () {
        QUnit.test('GetMimsString', function (assert) {
            const c = {
                tag: 'Hello',
                result: {
                    result: 123.45
                }
            };
            let done = assert.async();
            entitiesApi.getMims(c, data => {
                assert.strictEqual(data.message, 'Hello');
                assert.equal(data.result, 123.45);
                done();
            });
        });
        QUnit.test('myGenericPerson', function (assert) {
            const newPerson = {
                name: 'John Smith',
                givenName: 'John',
                surname: 'Smith',
                dob: new Date('1977-12-28')
            };
            const c = {
                myK: 123.456,
                myT: 'abc',
                myU: newPerson,
                status: 'OK',
            };
            let done = assert.async();
            entitiesApi.getMyGenericPerson(c, data => {
                assert.strictEqual(data.status, 'OK');
                assert.equal(data.myU.name, 'John Smith');
                done();
            });
        });
    });
    QUnit.module("TupleTests", function () {
        QUnit.test("GetTuple2", function (assert) {
            let done = assert.async();
            tupleApi.getTuple2((data) => {
                assert.equal(data["item1"], "Two");
                assert.equal(data["item2"], 2);
                done();
            });
        });
        QUnit.test("PostTuple2", function (assert) {
            let done = assert.async();
            tupleApi.postTuple2({ item1: "One", item2: 2 }, (data) => {
                assert.equal(data, "One");
                done();
            });
        });
        QUnit.test("GetTuple7", function (assert) {
            let done = assert.async();
            tupleApi.getTuple7((data) => {
                assert.equal(data["item1"], "Seven");
                assert.equal(data["item7"], 7);
                done();
            });
        });
        //Visual Studio IDE may give some 
        QUnit.test("PostTuple7", function (assert) {
            let done = assert.async();
            tupleApi.postTuple7({ item1: "One", item2: "", item3: "", item4: "", item5: "", item6: "33333", item7: 9 }, (data) => {
                assert.equal(data, "One");
                done();
            });
        });
        QUnit.test("GetTuple8", function (assert) {
            let done = assert.async();
            tupleApi.getTuple8((data) => {
                assert.equal(data["item1"], "Nested");
                assert.equal(data["rest"].item1, "nine");
                done();
            });
        });
        //Visual Studio IDE may give some 
        QUnit.test("PostTuple8", function (assert) {
            let done = assert.async();
            tupleApi.postTuple8({ item1: "One", item2: "", item3: "", item4: "", item5: "", item6: "", item7: "", rest: { item1: "a", item2: "b", item3: "c" } }, (data) => {
                assert.equal(data, "a");
                done();
            });
        });
        QUnit.test("LinkPersonCompany", function (assert) {
            let done = assert.async();
            tupleApi.linkPersonCompany1({
                item1: {
                    name: "someone",
                    surname: "my",
                    givenName: "something",
                },
                item2: {
                    name: "Super",
                    addresses: [{ city: "New York", street1: "Somewhere st" }]
                }
            }, (data) => {
                assert.equal(data.name, "someone");
                done();
            });
        });
    });
    QUnit.module("SuperDemoTests", function () {
        QUnit.test("JsZeroNotGood", function (assert) {
            assert.notEqual(0.1 + 0.2 - 0.3, 0, "Zero, Zero; equal succeeds");
        });
        //if the WebAPI built with VS 2015 update 2 is hosted in IIS 10, this test pass.
        //If the WebAPI built with VS 2015 update 2 is hosted in IIS 7.5, the test will failed.
        // with .net core, equal is OK again.
        QUnit.test("JsZeroNotGoodWithFloat", function (assert) {
            let done = assert.async();
            superDemoApi.getFloatZero((data) => {
                //			assert.equal(data, 0);
                assert.ok(data < 0.0000001);
                done();
            });
        });
        QUnit.test("JsZeroNotGoodWithDouble", function (assert) {
            let done = assert.async();
            superDemoApi.getDoubleZero((data) => {
                assert.notEqual(data, 0);
                done();
            });
        });
        QUnit.test("JsZeroGoodWithDecimal", function (assert) {
            let done = assert.async();
            superDemoApi.getDecimalZero((data) => {
                assert.equal(data, 0);
                done();
            });
        });
        QUnit.test("GetIntSquare", function (assert) {
            let done = assert.async();
            superDemoApi.getIntSquare(100, (data) => {
                assert.equal(data, 10000);
                done();
            });
        });
        QUnit.test("GetDecimalSquare", function (assert) {
            let done = assert.async();
            superDemoApi.getDecimalSquare(100, (data) => {
                assert.equal(data, 10000);
                done();
            });
        });
        QUnit.test("GetNullableDecimal", function (assert) {
            let done = assert.async();
            superDemoApi.getNullableDecimal(true, (data) => {
                assert.ok(data > 10);
                done();
            });
        });
        QUnit.test("GetNullableDecimalNull", function (assert) {
            let done = assert.async();
            superDemoApi.getNullableDecimal(false, (data) => {
                assert.ok(data == undefined);
                done();
            });
        });
        QUnit.test("GetNullPerson", function (assert) {
            let done = assert.async();
            superDemoApi.getNullPerson((data) => {
                assert.ok(data == null);
                done();
            });
        });
        QUnit.test("GetByteArray", function (assert) {
            let done = assert.async();
            superDemoApi.getByteArray((data) => {
                assert.ok(data.length > 0);
                done();
            });
        });
        QUnit.test("GetTextStream", function (assert) {
            let done = assert.async();
            superDemoApi.getTextStream((data) => {
                assert.ok(data);
                done();
            });
        });
        QUnit.test("GetActionResult", function (assert) {
            let done = assert.async();
            superDemoApi.getActionResult((data) => {
                assert.ok(data);
                done();
            });
        });
        QUnit.test("GetActionStringResult", function (assert) {
            let done = assert.async();
            superDemoApi.getActionResult((data) => {
                assert.equal(data, "abcdefg");
                done();
            });
        });
        QUnit.test("Getbyte", function (assert) {
            let done = assert.async();
            superDemoApi.getbyte((data) => {
                assert.equal(data, 255);
                done();
            });
        });
        QUnit.test("GetBool", function (assert) {
            let done = assert.async();
            superDemoApi.getBool((data) => {
                assert.equal(data, true);
                done();
            });
        });
        QUnit.test("Getsbyte", function (assert) {
            let done = assert.async();
            superDemoApi.getsbyte((data) => {
                assert.equal(data, -127);
                done();
            });
        });
        QUnit.test("GetChar", function (assert) {
            let done = assert.async();
            superDemoApi.getChar((data) => {
                assert.equal(data, "A");
                done();
            });
        });
        QUnit.test("GetDecimal", function (assert) {
            let done = assert.async();
            superDemoApi.getDecimal((data) => {
                assert.equal(data, 79228162514264337593543950335);
                done();
            });
        });
        QUnit.test("Getdouble", function (assert) {
            let done = assert.async();
            superDemoApi.getdouble((data) => {
                assert.equal(data, -1.7976931348623e308);
                done();
            });
        });
        QUnit.test("GetUint", function (assert) {
            let done = assert.async();
            superDemoApi.getUint((data) => {
                assert.equal(data, 4294967295);
                done();
            });
        });
        QUnit.test("Getulong", function (assert) {
            let done = assert.async();
            superDemoApi.getulong((data) => {
                assert.equal(data, 18446744073709551615);
                done();
            });
        });
        QUnit.test("GetInt2d", function (assert) {
            let done = assert.async();
            superDemoApi.getInt2D((data) => {
                assert.equal(data[0][0], 1);
                assert.equal(data[0][3], 4);
                assert.equal(data[1][0], 5);
                assert.equal(data[1][3], 8);
                done();
            });
        });
        QUnit.test("GetInt2dJagged", function (assert) {
            let done = assert.async();
            superDemoApi.getInt2DJagged((data) => {
                assert.equal(data[0][0], 1);
                assert.equal(data[0][3], 4);
                assert.equal(data[1][0], 5);
                assert.equal(data[1][3], 8);
                done();
            });
        });
        QUnit.test("PostInt2d", function (assert) {
            let done = assert.async();
            superDemoApi.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]], (data) => {
                assert.ok(data);
                done();
            });
        });
        QUnit.test("PostInt2dExpectedFalse", function (assert) {
            let done = assert.async();
            superDemoApi.postInt2D([[1, 2, 3, 4], [5, 6, 7, 9]], (data) => {
                assert.ok(data == false);
                done();
            });
        });
        QUnit.test("PostIntArray", function (assert) {
            let done = assert.async();
            superDemoApi.postIntArray([1, 2, 3, 4, 5, 6, 7, 8], (data) => {
                assert.ok(data);
                done();
            });
        });
        QUnit.test("getIntArrayQ", function (assert) {
            let done = assert.async();
            superDemoApi.getIntArrayQ([6, 7, 8], (data) => {
                assert.equal(data.length, 3);
                assert.equal(data[2], 8);
                done();
            });
        });
        QUnit.test("postDay", function (assert) {
            let done = assert.async();
            superDemoApi.postDay(DemoWebApi_DemoData_Client.Days.Fri, DemoWebApi_DemoData_Client.Days.Mon, (data) => {
                assert.equal(data.length, 2);
                assert.equal(data[1], DemoWebApi_DemoData_Client.Days.Mon);
                done();
            });
        });
        QUnit.test("PostWithQueryButEmptyBody", function (assert) {
            let done = assert.async();
            superDemoApi.postWithQueryButEmptyBody("abc", 123, (data) => {
                assert.equal(data.item1, "abc");
                assert.equal(data.item2, 123);
                done();
            });
        });
        QUnit.test("GetIntArray", function (assert) {
            let done = assert.async();
            superDemoApi.getIntArray((data) => {
                assert.equal(data[7], 8);
                done();
            });
        });
        QUnit.test("PostInt2dJagged", function (assert) {
            let done = assert.async();
            superDemoApi.postInt2DJagged([[1, 2, 3, 4], [5, 6, 7, 8]], (data) => {
                assert.ok(data);
                done();
            });
        });
        QUnit.test("PostInt2dJaggedExpectedFalse", function (assert) {
            let done = assert.async();
            superDemoApi.postInt2DJagged([[1, 2, 3, 4], [5, 6, 7, 9]], (data) => {
                assert.ok(data == false);
                done();
            });
        });
        QUnit.test("GetDictionaryOfPeople", function (assert) {
            let done = assert.async();
            superDemoApi.getDictionaryOfPeople((data) => {
                assert.equal(data["Spider Man"].name, "Peter Parker");
                assert.equal(data["Spider Man"].addresses[0].city, "New York");
                done();
            });
        });
        QUnit.test("PostDictionaryOfPeople", function (assert) {
            let done = assert.async();
            superDemoApi.postDictionary({
                "Iron Man": {
                    "surname": "Stark",
                    "givenName": "Tony",
                    "dob": null,
                    "id": "00000000-0000-0000-0000-000000000000",
                    "name": "Tony Stark",
                    "addresses": []
                },
                "Spider Man": {
                    "name": "Peter Parker",
                    "addresses": [
                        {
                            "id": "00000000-0000-0000-0000-000000000000",
                            "city": "New York",
                            state: "Somewhere",
                            "postalCode": null,
                            "country": null,
                            "type": 0,
                            location: { x: 100, y: 200 }
                        }
                    ]
                }
            }, (data) => {
                assert.equal(data, 2);
                done();
            });
        });
        QUnit.test("GetKeyValuePair", function (assert) {
            let done = assert.async();
            superDemoApi.getKeyhValuePair((data) => {
                assert.equal(data.key, "Spider Man");
                assert.equal(data.value.addresses[0].city, "New York");
                done();
            });
        });
        QUnit.module("ValuesTests", function () {
            QUnit.test("Get", function (assert) {
                let done = assert.async();
                valuesApi.get((data) => {
                    assert.equal(data[1], "value2");
                    done();
                });
            });
            QUnit.test("GetByIdAndName", function (assert) {
                let done = assert.async();
                valuesApi.getByIdOfInt32AndNameOfString(1, "something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"", (data) => {
                    assert.equal(data, "something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"1");
                    done();
                });
            });
            QUnit.test("GetByName", function (assert) {
                let done = assert.async();
                valuesApi.getByNameOfString("something", (data) => {
                    assert.equal(data, "SOMETHING");
                    done();
                });
            });
            QUnit.test("PostValue", function (assert) {
                let done = assert.async();
                valuesApi.post('value', (data) => {
                    assert.equal(data, "VALUE");
                    done();
                });
            });
            QUnit.test("Put", function (assert) {
                let done = assert.async();
                valuesApi.put(1, 'value', (data) => {
                    assert.expect(0);
                    done();
                });
            });
            QUnit.test("Delete", function (assert) {
                let done = assert.async();
                valuesApi.delete(1, (data) => {
                    assert.expect(0);
                    done();
                });
            });
        });
    });
    QUnit.module("NumbersTests", function () {
        /**
         * Even though the request payload is 9223372036854776000 (loosing precision, cause of the 53bit issue), or "9223372036854776123", the response is 0 as shown in Chrome's console and Fiddler.
         * And the Web API has received actually 0. Not sure if the Web API binding had turned the request payload into 0 if the client is a Web browser.
         */
        QUnit.test('postInt64ButIncorrect', function (assert) {
            let done = assert.async();
            numbersApi.postInt64('9223372036854775807', (r) => {
                assert.equal(BigInt(9223372036854775807n).toString(), '9223372036854775807');
                assert.equal(BigInt(r), BigInt('9223372036854775808')); //reponse is 9223372036854775807, but BigInt(r) gives last 3 digits 808
                done();
            });
        });
        QUnit.test('postBigNumbers', function (assert) {
            let done = assert.async();
            const d = {
                unsigned64: '18446744073709551615',
                signed64: '9223372036854775807',
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
            numbersApi.postBigNumbers(d, (r) => {
                assert.notEqual(BigInt(r.unsigned64), BigInt('18446744073709551615')); // BigInt can not handle the coversion from json number form correctly.
                assert.equal(BigInt(r.unsigned64), BigInt('18446744073709551616')); // actually incorrect during deserialization
                assert.notEqual(BigInt(r.signed64), BigInt('9223372036854775807'));
                assert.equal(BigInt(r.signed64), BigInt('9223372036854775808'));
                assert.equal(BigInt(r.unsigned128), BigInt(340282366920938463463374607431768211455n));
                assert.equal(BigInt(r.signed128), BigInt(170141183460469231731687303715884105727n));
                assert.notEqual(BigInt(r.bigInt), BigInt(6277101735386680762814942322444851025767571854389858533375n));
                assert.equal(BigInt(r.bigInt), BigInt(6277101735386680763835789423207666416102355444464034512896n)); // how wrong
                done();
            });
        });
        /**
            postBigIntegerForJs(bigInteger?: string | null, headersHandler?: () => HttpHeaders): Observable<string> {
          return this.http.post<string>(this.baseUri + 'api/Numbers/bigIntegerForJs', JSON.stringify(bigInteger), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }
         */
        QUnit.test('postBigIntegralAsStringForJs', function (assert) {
            let done = assert.async();
            numbersApi.postBigIntegralAsStringForJs('9223372036854775807', (r) => {
                assert.equal(BigInt(9223372036854775807n).toString(), '9223372036854775807');
                assert.equal(BigInt('9223372036854775807').toString(), '9223372036854775807');
                assert.equal(BigInt(r), BigInt('9223372036854775807'));
                assert.equal(BigInt(r), BigInt(9223372036854775807n));
                done();
            });
        });
        QUnit.test('postBigIntegralAsStringForJs2', function (assert) {
            let done = assert.async();
            numbersApi.postBigIntegralAsStringForJs('6277101735386680762814942322444851025767571854389858533375', (r) => {
                assert.equal(BigInt(6277101735386680762814942322444851025767571854389858533375n).toString(), '6277101735386680762814942322444851025767571854389858533375');
                assert.equal(BigInt('6277101735386680762814942322444851025767571854389858533375').toString(), '6277101735386680762814942322444851025767571854389858533375');
                assert.equal(BigInt(r), BigInt('6277101735386680762814942322444851025767571854389858533375'));
                assert.equal(BigInt(r), BigInt(6277101735386680762814942322444851025767571854389858533375n));
                done();
            });
        });
        QUnit.test('postInt64Smaller', function (assert) {
            let done = assert.async();
            numbersApi.postInt64('9223372036854775123', (r) => {
                assert.notEqual(BigInt(r), BigInt('9223372036854775123')); //reponse is 9223372036854775123, but BigInt(r) gives l9223372036854774784
                assert.equal(BigInt(r), BigInt('9223372036854774784'));
                done();
            });
        });
        QUnit.test('postLongAsBigIntButIncorrect', function (assert) {
            let done = assert.async();
            // request: "9223372036854775807"
            // response: 9223372036854775807
            numbersApi.postBigInteger('9223372036854775807', (r) => {
                assert.equal(BigInt(9223372036854775807n).toString(), '9223372036854775807');
                assert.equal(BigInt(r), BigInt('9223372036854775808')); //reponse is 9223372036854775807, but BigInt(r) gives last 3 digits 808, since the returned value does not have the n suffix.
                assert.equal(r.toString(), '9223372036854776000'); //the response is a big int which JS could not handle in toString(), 53bit gets in the way.
                assert.equal(BigInt(r).toString(), '9223372036854775808');
                done();
            });
        });
        QUnit.test('postLongAsBigIntWithSmallNumber', function (assert) {
            let done = assert.async();
            numbersApi.postBigInteger('123', (r) => {
                assert.equal(BigInt(r), BigInt(123n));
                done();
            });
        });
        QUnit.test('postReallyBigInt192bitsButIncorrect', function (assert) {
            let done = assert.async();
            // request: "6277101735386680762814942322444851025767571854389858533375"
            // response: 6277101735386680762814942322444851025767571854389858533375
            numbersApi.postBigInteger('6277101735386680762814942322444851025767571854389858533375', (r) => {
                assert.equal(BigInt(r), BigInt(6277101735386680762814942322444851025767571854389858533375)); //this time, it is correct, but...
                assert.notEqual(BigInt(r).valueOf(), 6277101735386680762814942322444851025767571854389858533375n); // not really,
                assert.notEqual(BigInt(r).valueOf(), BigInt('6277101735386680762814942322444851025767571854389858533375')); // not really, because what returned is lack of n
                done();
            });
        });
        QUnit.test('postReallyBigInt80bitsButIncorect', function (assert) {
            let done = assert.async();
            numbersApi.postBigInteger('604462909807314587353087', (r) => {
                assert.equal(BigInt(r), BigInt(604462909807314587353087)); //this time, it is correct, but...
                assert.notEqual(BigInt(r).valueOf(), 604462909807314587353087n); // not really,
                assert.notEqual(BigInt(r).valueOf(), BigInt('604462909807314587353087')); // not really, because what returned is lack of n
                done();
            });
        });
        QUnit.test('postReallyBigInt128bitsButIncorect', function (assert) {
            let done = assert.async();
            numbersApi.postBigInteger('340282366920938463463374607431768211455', (r) => {
                assert.equal(BigInt(r), BigInt(340282366920938463463374607431768211455)); //this time, it is correct, but...
                assert.notEqual(BigInt(r).valueOf(), 340282366920938463463374607431768211455n); // not really,
                assert.notEqual(BigInt(r).valueOf(), BigInt('340282366920938463463374607431768211455')); // not really, because what returned is lack of n
                done();
            });
        });
        /**
         * Correct.
         * Request as string: "170141183460469231731687303715884105727",
         * Response: "170141183460469231731687303715884105727" , Content-Type: application/json; charset=utf-8
         */
        QUnit.test('postInt128', function (assert) {
            let done = assert.async();
            numbersApi.postInt128('170141183460469231731687303715884105727', (r) => {
                assert.equal(BigInt(r), BigInt('170141183460469231731687303715884105727'));
                assert.equal(BigInt(r), BigInt(170141183460469231731687303715884105727n));
                done();
            });
        });
        /**
         * Correct.
         * Request as string: "340282366920938463463374607431768211455",
         * Response: "340282366920938463463374607431768211455" , Content-Type: application/json; charset=utf-8
         */
        QUnit.test('postUInt128', function (assert) {
            let done = assert.async();
            numbersApi.postUint128('340282366920938463463374607431768211455', (r) => {
                assert.equal(BigInt(r), BigInt('340282366920938463463374607431768211455'));
                assert.equal(BigInt(r), BigInt(340282366920938463463374607431768211455n));
                assert.equal(BigInt(r).valueOf(), BigInt('340282366920938463463374607431768211455'));
                assert.equal(BigInt(r).valueOf(), BigInt(340282366920938463463374607431768211455n));
                done();
            });
        });
    }); //NumbersTests
})(CommonCases || (CommonCases = {}));
