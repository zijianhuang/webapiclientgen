/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../ClientApi/WebApiClientAuto.ts"/>
//Make sure chutzpah.json is updated with  reference to the jQuery lib when the lib is upgraded.
//To launch IIS Express, use something like this: C:\VsProjects\webapiclientgen>"C:\Program Files (x86)\IIS Express\iisexpress.exe" /site:DemoWebApi /apppool:Clr4IntegratedAppPool /config:c:\vsprojects\webapiclientgen\.vs\config\applicationhost.config
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
QUnit.config.testTimeout = 30000;
var baseUri = 'http://localhost:10965/';
var authHttpClient = new AuthHttpClient();
var entitiesApi = new DemoWebApi_Controllers_Client.Entities(baseUri, authHttpClient);
var valuesApi = new DemoWebApi_Controllers_Client.Values(baseUri, authHttpClient);
var superDemoApi = new DemoWebApi_Controllers_Client.SuperDemo(baseUri);
var tupleApi = new DemoWebApi_Controllers_Client.Tuple(baseUri);
var heroesApi = new DemoWebApi_Controllers_Client.Heroes(baseUri);
//This should always work since it is a simple unit test.
QUnit.test("data compare", function (assert) {
    var person = {
        name: "someone",
        surname: "my",
        givenName: "something"
    };
    var person2 = {
        name: "someone",
        surname: "my",
        givenName: "something"
    };
    assert.equal(JSON.stringify(person), JSON.stringify(person2));
});
QUnit.module("Heroes", function () {
    QUnit.test("GetAll", function (assert) {
        var done = assert.async();
        heroesApi.get(function (data) {
            assert.ok(data.length > 0);
            done();
        });
    });
    QUnit.test("Get", function (assert) {
        var done = assert.async();
        heroesApi.getById(20, function (data) {
            assert.equal(data.name, "Tornado");
            done();
        });
    });
    QUnit.test("Add", function (assert) {
        var done = assert.async();
        heroesApi.post("somebody", function (data) {
            assert.equal(data.name, "somebody");
            assert.equal(data.id, 21);
            done();
        });
    });
    QUnit.test("Search", function (assert) {
        var done = assert.async();
        heroesApi.search("Torn", function (data) {
            assert.equal(data[0].name, "Tornado");
            done();
        });
    });
});
QUnit.module("SuperDemoTests");
test("JsZeroNotGood", function (assert) {
    assert.notEqual(0.1 + 0.2 - 0.3, 0, "Zero, Zero; equal succeeds");
});
//if the WebAPI built with VS 2015 update 2 is hosted in IIS 10, this test pass.
//If the WebAPI built with VS 2015 update 2 is hosted in IIS 7.5, the test will failed.
test("JsZeroNotGoodWithFloat", function (assert) {
    var done = assert.async();
    superDemoApi.getFloatZero(function (data) {
        assert.notEqual(data, 0);
        done();
    });
});
test("JsZeroNotGoodWithDouble", function (assert) {
    var done = assert.async();
    superDemoApi.getDoubleZero(function (data) {
        assert.notEqual(data, 0);
        done();
    });
});
test("JsZeroGoodWithDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.getDecimalZero(function (data) {
        assert.equal(data, 0);
        done();
    });
});
test("GetIntSquare", function (assert) {
    var done = assert.async();
    superDemoApi.getIntSquare(100, function (data) {
        assert.equal(data, 10000);
        done();
    });
});
test("GetDecimalSquare", function (assert) {
    var done = assert.async();
    superDemoApi.getDecimalSquare(100, function (data) {
        assert.equal(data, 10000);
        done();
    });
});
test("GetDateTime", function (assert) {
    var done = assert.async();
    superDemoApi.getDateTime(true, function (data) {
        assert.ok(data);
        done();
    });
});
test("GetDateTimeNull", function (assert) {
    var done = assert.async();
    superDemoApi.getDateTime(false, function (data) {
        assert.ok(data == undefined);
        done();
    });
});
test("GetNullableDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.getNullableDecimal(true, function (data) {
        assert.ok(data > 10);
        done();
    });
});
test("GetNullableDecimalNull", function (assert) {
    var done = assert.async();
    superDemoApi.getNullableDecimal(false, function (data) {
        assert.ok(data == undefined);
        done();
    });
});
test("GetNullString", function (assert) {
    var done = assert.async();
    superDemoApi.getNullString(function (data) {
        assert.ok(data == null);
        done();
    });
});
test("GetNullPerson", function (assert) {
    var done = assert.async();
    superDemoApi.getNullPerson(function (data) {
        assert.ok(data == null);
        done();
    });
});
test("GetByteArray", function (assert) {
    var done = assert.async();
    superDemoApi.getByteArray(function (data) {
        assert.ok(data.length > 0);
        done();
    });
});
test("GetTextStream", function (assert) {
    var done = assert.async();
    superDemoApi.getTextStream(function (data) {
        assert.ok(data);
        done();
    });
});
test("GetActionResult", function (assert) {
    var done = assert.async();
    superDemoApi.getActionResult(function (data) {
        assert.ok(data);
        done();
    });
});
test("GetActionStringResult", function (assert) {
    var done = assert.async();
    superDemoApi.getActionResult(function (data) {
        assert.equal(data, "abcdefg");
        done();
    });
});
test("Getbyte", function (assert) {
    var done = assert.async();
    superDemoApi.getbyte(function (data) {
        assert.equal(data, 255);
        done();
    });
});
test("GetBool", function (assert) {
    var done = assert.async();
    superDemoApi.getBool(function (data) {
        assert.equal(data, true);
        done();
    });
});
test("Getsbyte", function (assert) {
    var done = assert.async();
    superDemoApi.getsbyte(function (data) {
        assert.equal(data, -127);
        done();
    });
});
test("GetChar", function (assert) {
    var done = assert.async();
    superDemoApi.getChar(function (data) {
        assert.equal(data, "A");
        done();
    });
});
test("GetDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.getDecimal(function (data) {
        assert.equal(data, 79228162514264337593543950335);
        done();
    });
});
test("Getdouble", function (assert) {
    var done = assert.async();
    superDemoApi.getdouble(function (data) {
        assert.equal(data, -1.7976931348623e308);
        done();
    });
});
test("GetUint", function (assert) {
    var done = assert.async();
    superDemoApi.getUint(function (data) {
        assert.equal(data, 4294967295);
        done();
    });
});
test("Getulong", function (assert) {
    var done = assert.async();
    superDemoApi.getulong(function (data) {
        assert.equal(data, 18446744073709551615);
        done();
    });
});
test("GetAnonymousDynamic", function (assert) {
    var done = assert.async();
    superDemoApi.getAnonymousDynamic(function (data) {
        assert.equal(data.id, 12345);
        assert.equal(data.name, "Something");
        done();
    });
});
test("GetAnonymousObject", function (assert) {
    var done = assert.async();
    superDemoApi.getAnonymousObject(function (data) {
        assert.equal(data.id, 12345);
        assert.equal(data.name, "Something");
        done();
    });
});
test("PostAnonymousObject", function (assert) {
    var done = assert.async();
    superDemoApi.postAnonymousObject({ "Id": "12345", "Name": "Something" }, function (data) {
        assert.equal(data.Id, "123451");
        assert.equal(data.Name, "Something1");
        done();
    });
});
test("GetInt2d", function (assert) {
    var done = assert.async();
    superDemoApi.getInt2D(function (data) {
        assert.equal(data[0][0], 1);
        assert.equal(data[0][3], 4);
        assert.equal(data[1][0], 5);
        assert.equal(data[1][3], 8);
        done();
    });
});
test("GetInt2dJagged", function (assert) {
    var done = assert.async();
    superDemoApi.getInt2DJagged(function (data) {
        assert.equal(data[0][0], 1);
        assert.equal(data[0][3], 4);
        assert.equal(data[1][0], 5);
        assert.equal(data[1][3], 8);
        done();
    });
});
test("PostInt2d", function (assert) {
    var done = assert.async();
    superDemoApi.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]], function (data) {
        assert.ok(data);
        done();
    });
});
test("PostInt2dExpectedFalse", function (assert) {
    var done = assert.async();
    superDemoApi.postInt2D([[1, 2, 3, 4], [5, 6, 7, 9]], function (data) {
        assert.ok(data == false);
        done();
    });
});
test("PostIntArray", function (assert) {
    var done = assert.async();
    superDemoApi.postIntArray([1, 2, 3, 4, 5, 6, 7, 8], function (data) {
        assert.ok(data);
        done();
    });
});
test("PostWithQueryButEmptyBody", function (assert) {
    var done = assert.async();
    superDemoApi.postWithQueryButEmptyBody("abc", 123, function (data) {
        assert.equal(data.item1, "abc");
        assert.equal(data.item2, 123);
        done();
    });
});
test("GetIntArray", function (assert) {
    var done = assert.async();
    superDemoApi.getIntArray(function (data) {
        assert.equal(data[7], 8);
        done();
    });
});
test("PostInt2dJagged", function (assert) {
    var done = assert.async();
    superDemoApi.postInt2DJagged([[1, 2, 3, 4], [5, 6, 7, 8]], function (data) {
        assert.ok(data);
        done();
    });
});
test("PostInt2dJaggedExpectedFalse", function (assert) {
    var done = assert.async();
    superDemoApi.postInt2DJagged([[1, 2, 3, 4], [5, 6, 7, 9]], function (data) {
        assert.ok(data == false);
        done();
    });
});
test("GetDictionaryOfPeople", function (assert) {
    var done = assert.async();
    superDemoApi.getDictionaryOfPeople(function (data) {
        assert.equal(data["spider Man"].name, "Peter Parker");
        assert.equal(data["spider Man"].addresses[0].city, "New York");
        done();
    });
});
test("PostDictionaryOfPeople", function (assert) {
    var done = assert.async();
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
    }, function (data) {
        assert.equal(data, 2);
        done();
    });
});
test("GetKeyValuePair", function (assert) {
    var done = assert.async();
    superDemoApi.getKeyhValuePair(function (data) {
        assert.equal(data.key, "Spider Man");
        assert.equal(data.value.addresses[0].city, "New York");
        done();
    });
});
QUnit.module("ValuesTests", function () {
    test("Get", function (assert) {
        var done = assert.async();
        valuesApi.get(function (data) {
            assert.equal(data[1], "value2");
            done();
        });
    });
    test("GetByIdAndName", function (assert) {
        var done = assert.async();
        valuesApi.getByIdAndName(1, "something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"", function (data) {
            assert.equal(data, "something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"1");
            done();
        });
    });
    test("GetByName", function (assert) {
        var done = assert.async();
        valuesApi.getByName("something", function (data) {
            assert.equal(data, "SOMETHING");
            done();
        });
    });
    test("PostValue", function (assert) {
        var done = assert.async();
        var api = new DemoWebApi_Controllers_Client.Values('http://localhost:10965/', authHttpClient, function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            done();
        });
        api.post('value', function (data) {
            assert.equal(data, "VALUE");
            done();
        });
    });
    test("Put", function (assert) {
        assert.expect(0);
        var done = assert.async();
        var api = new DemoWebApi_Controllers_Client.Values('http://localhost:10965/', authHttpClient, function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            done();
        });
        api.put(1, 'value', function (data) {
            done();
        });
    });
    test("Delete", function (assert) {
        assert.expect(0);
        var done = assert.async();
        var api = new DemoWebApi_Controllers_Client.Values('http://localhost:10965/', authHttpClient, function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            done();
        });
        api["delete"](1, function (data) {
            done();
        });
    });
});
QUnit.module("TupleTests");
test("GetTuple2", function (assert) {
    var done = assert.async();
    tupleApi.getTuple2(function (data) {
        assert.equal(data["item1"], "Two");
        assert.equal(data["item2"], 2);
        done();
    });
});
test("PostTuple2", function (assert) {
    var done = assert.async();
    tupleApi.postTuple2({ item1: "One", item2: 2 }, function (data) {
        assert.equal(data, "One");
        done();
    });
});
test("GetTuple7", function (assert) {
    var done = assert.async();
    tupleApi.getTuple7(function (data) {
        assert.equal(data["item1"], "Seven");
        assert.equal(data["item7"], 7);
        done();
    });
});
//Visual Studio IDE may give some 
test("PostTuple7", function (assert) {
    var done = assert.async();
    tupleApi.postTuple7({ item1: "One", item2: "", item3: "", item4: "", item5: "", item6: 33333, item7: 9 }, function (data) {
        assert.equal(data, "One");
        done();
    });
});
test("GetTuple8", function (assert) {
    var done = assert.async();
    tupleApi.getTuple8(function (data) {
        assert.equal(data["item1"], "Nested");
        assert.equal(data["rest"].item1, "nine");
        done();
    });
});
//Visual Studio IDE may give some 
test("PostTuple8", function (assert) {
    var done = assert.async();
    tupleApi.postTuple8({ item1: "One", item2: "", item3: "", item4: "", item5: "", item6: "", item7: "", rest: { item1: "a", item2: "b", item3: "c" } }, function (data) {
        assert.equal(data, "a");
        done();
    });
});
test("LinkPersonCompany", function (assert) {
    var done = assert.async();
    tupleApi.linkPersonCompany1({
        item1: {
            name: "someone",
            surname: "my",
            givenName: "something"
        },
        item2: {
            name: "Super",
            addresses: [{ city: "New York", street1: "Somewhere st" }]
        }
    }, function (data) {
        assert.equal(data.name, "someone");
        done();
    });
});
//# sourceMappingURL=demo.tests.js.map