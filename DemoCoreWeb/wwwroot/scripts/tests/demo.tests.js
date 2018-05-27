/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <chutzpah_reference path="../qunit-2.6.1.js" />
/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../ClientApi/WebApiClientAuto.ts"/>
// Make sure chutzpah.json is updated with  reference to the jQuery lib when the lib is upgraded.
// Sometimes the test cases are not appearing in Test Explorer, then claring %temp% may help.
// To launch IIS Express, use something like this: C:\VsProjects\webapiclientgen>"C:\Program Files (x86)\IIS Express\iisexpress.exe" /site:DemoWebApi /apppool:Clr4IntegratedAppPool /config:c:\vsprojects\webapiclientgen\.vs\config\applicationhost.config
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
            heroesApi.get(data => {
                assert.ok(data.length > 0);
                done();
            });
        });
        QUnit.test("Get", function (assert) {
            let done = assert.async();
            heroesApi.getById(20, data => {
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
            tupleApi.postTuple7({ item1: "One", item2: "", item3: "", item4: "", item5: "", item6: 33333, item7: 9 }, (data) => {
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
        //QUnit.test("GetNextHour", function (assert) { the runner of chutzpah apparently intepret toISOString() as toString()
        //	let done = assert.async();
        //	let dt = new Date(Date.now());
        //	let h = dt.getHours();
        //	superDemoApi.getNextHour(dt, (data) => {
        //		assert.equal(data.getHours(), h + 1);
        //		done();
        //	});
        //});
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
        QUnit.test("GetDateTime", function (assert) {
            let done = assert.async();
            superDemoApi.getDateTime(true, (data) => {
                assert.ok(data);
                done();
            });
        });
        QUnit.test("GetDateTimeNull", function (assert) {
            let done = assert.async();
            superDemoApi.getDateTime(false, (data) => {
                assert.ok(data == undefined);
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
        QUnit.test("GetNullString", function (assert) {
            let done = assert.async();
            superDemoApi.getNullString((data) => {
                assert.ok(data == null);
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
                valuesApi.getByIdAndName(1, "something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"", (data) => {
                    assert.equal(data, "something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"1");
                    done();
                });
            });
            QUnit.test("GetByName", function (assert) {
                let done = assert.async();
                valuesApi.getByName("something", (data) => {
                    assert.equal(data, "SOMETHING");
                    done();
                });
            });
            QUnit.test("PostValue", function (assert) {
                let done = assert.async();
                let api = new DemoWebApi_Controllers_Client.Values('http://localhost:10965/', authHttpClient, function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    done();
                });
                api.post('value', (data) => {
                    assert.equal(data, "VALUE");
                    done();
                });
            });
            QUnit.test("Put", function (assert) {
                assert.expect(0);
                let done = assert.async();
                let api = new DemoWebApi_Controllers_Client.Values('http://localhost:10965/', authHttpClient, function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    done();
                });
                api.put(1, 'value', (data) => {
                    done();
                });
            });
            QUnit.test("Delete", function (assert) {
                assert.expect(0);
                let done = assert.async();
                let api = new DemoWebApi_Controllers_Client.Values('http://localhost:10965/', authHttpClient, function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    done();
                });
                api.delete(1, (data) => {
                    done();
                });
            });
        });
    });
})(CommonCases || (CommonCases = {}));
//# sourceMappingURL=demo.tests.js.map