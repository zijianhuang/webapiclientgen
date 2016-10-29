/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../ClientApi/WebApiClientAuto.ts"/>


//Make sure chutzpah.json is updated with  reference to the jQuery lib when the lib is upgraded.

QUnit.config.testTimeout = 30000;

//To launch IIS Express, use something like this: C:\VsProjects\webapiclientgen>"C:\Program Files (x86)\IIS Express\iisexpress.exe" /site:DemoWebApi /apppool:Clr4IntegratedAppPool /config:c:\vsprojects\webapiclientgen\.vs\config\applicationhost.config
var entitiesApi = new DemoWebApi_Controllers_Client.Entities('http://localhost:10965/');
var superDemoApi = new DemoWebApi_Controllers_Client.SuperDemo("http://localhost:10965/");
var valuesApi = new DemoWebApi_Controllers_Client.Values("http://localhost:10965/");
var tupleApi = new DemoWebApi_Controllers_Client.Tuple("http://localhost:10965/");
QUnit.module("Entities");


QUnit.test("data compare", function (assert) {

    var person: DemoWebApi_DemoData_Client.Person = {
        name: "someone",
        surname: "my",
        givenName: "something",
    };
    
    var person2: DemoWebApi_DemoData_Client.Person = {
        name: "someone",
        surname: "my",
        givenName: "something",
    };

    assert.equal(JSON.stringify(person), JSON.stringify(person2));

});


QUnit.test("GetPerson", function (assert) {
    var done = assert.async();
    entitiesApi.getPerson(100, (data) => {
        assert.equal(data.name, "Z Huang");
        done();
    });

});

QUnit.test("AddPerson", function (assert) {
    var done = assert.async();
    entitiesApi.createPerson({
        name: "some body",
        givenName: "some",
        surname: "body",
        birthDate: new Date("1977-08-18"),
        addresses: [{
            city: "Brisbane",
            state: "QLD",
            type: DemoWebApi_DemoData_Client.AddressType.Residential,
        }]
       
    }, (data) => {
        assert.ok(data > 0);
        done();
    });
});

QUnit.test("AddPersonExceptionInvokeErrorHandler", function (assert) {
    assert.expect(0);
    var done = assert.async();
    var api = new DemoWebApi_Controllers_Client.Entities('http://localhost:9024/', function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.responseText);
        done();
    });
    api.createPerson({
        name: "Exception",
        givenName: "some",
        surname: "body",

    }, (data) => {
        assert.ok(data > 0);
        // done();
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
    superDemoApi.getFloatZero((data) => {
        assert.notEqual(data, 0);
        done();
    });
});

test("JsZeroNotGoodWithDouble", function (assert) {
    var done = assert.async();
    superDemoApi.getDoubleZero((data) => {
        assert.notEqual(data, 0);
        done();
    });
});

test("JsZeroGoodWithDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.getDecimalZero((data) => {
        assert.equal(data, 0);
        done();
    });
});





test("GetIntSquare", function (assert) {
    var done = assert.async();
    superDemoApi.getIntSquare(100, (data) => {
        assert.equal(data, 10000);
        done();
    });
});

test("GetDecimalSquare", function (assert) {
    var done = assert.async();
    superDemoApi.getDecimalSquare(100, (data) => {
        assert.equal(data, 10000);
        done();
    });
});

test("GetDateTime", function (assert) {
    var done = assert.async();
    superDemoApi.getDateTime(true, (data) => {
        assert.ok(data);
        done();
    });
});

test("GetDateTimeNull", function (assert) {
    var done = assert.async();
    superDemoApi.getDateTime(false, (data) => {
        assert.ok(data == undefined);
        done();
    });
});

test("GetNullableDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.getNullableDecimal(true, (data) => {
        assert.ok(data > 10);
        done();
    });
});

test("GetNullableDecimalNull", function (assert) {
    var done = assert.async();
    superDemoApi.getNullableDecimal(false, (data) => {
        assert.ok(data == undefined);
        done();
    });
});

test("GetNullString", function (assert) {
    var done = assert.async();
    superDemoApi.getNullString((data) => {
        assert.ok(data == null);
        done();
    });
});

test("GetNullPerson", function (assert) {
    var done = assert.async();
    superDemoApi.getNullPerson((data) => {
        assert.ok(data == null);
        done();
    });
});

test("GetByteArray", function (assert) {
    var done = assert.async();
    superDemoApi.getByteArray((data) => {
        assert.ok(data.length > 0);
        done();
    });
});

test("GetTextStream", function (assert) {
    var done = assert.async();
    superDemoApi.getTextStream((data) => {
        assert.ok(data);
        done();
    });
});

test("GetActionResult", function (assert) {
    var done = assert.async();
    superDemoApi.getActionResult((data) => {
        assert.ok(data);
        done();
    });
});

test("GetActionStringResult", function (assert) {
    var done = assert.async();
    superDemoApi.getActionResult((data) => {
        assert.equal(data, "abcdefg");
        done();
    });
});

test("Getbyte", function (assert) {
    var done = assert.async();
    superDemoApi.getbyte((data) => {
        assert.equal(data, 255);
        done();
    });
});

test("GetBool", function (assert) {
    var done = assert.async();
    superDemoApi.getBool((data) => {
        assert.equal(data, true);
        done();
    });
});

test("Getsbyte", function (assert) {
    var done = assert.async();
    superDemoApi.getsbyte((data) => {
        assert.equal(data, -127);
        done();
    });
});

test("GetChar", function (assert) {
    var done = assert.async();
    superDemoApi.getChar((data) => {
        assert.equal(data, "A");
        done();
    });
});

test("GetDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.getDecimal((data) => {
        assert.equal(data, 79228162514264337593543950335);
        done();
    });
});

test("Getdouble", function (assert) {
    var done = assert.async();
    superDemoApi.getdouble((data) => {
        assert.equal(data, -1.7976931348623e308);
        done();
    });
});

test("GetUint", function (assert) {
    var done = assert.async();
    superDemoApi.getUint((data) => {
        assert.equal(data, 4294967295);
        done();
    });
});

test("Getulong", function (assert) {
    var done = assert.async();
    superDemoApi.getulong((data) => {
        assert.equal(data, 18446744073709551615);
        done();
    });
});

test("GetAnonymousDynamic", function (assert) {
    var done = assert.async();
    superDemoApi.getAnonymousDynamic((data) => {
        assert.equal(data.id, 12345);
        assert.equal(data.name, "Something");
        done();
    });
});

test("GetAnonymousObject", function (assert) {
    var done = assert.async();
    superDemoApi.getAnonymousObject((data) => {
        assert.equal(data.id, 12345);
        assert.equal(data.name, "Something");
        done();
    });
});

test("PostAnonymousObject", function (assert) {
    var done = assert.async();
    superDemoApi.postAnonymousObject({ "Id": "12345", "Name": "Something" }, (data) => {
        assert.equal(data.Id, "123451");
        assert.equal(data.Name, "Something1");
        done();
    });
});



test("GetInt2d", function (assert) { 
    var done = assert.async();
    superDemoApi.getInt2D((data) => {
        assert.equal(data[0][ 0], 1);
        assert.equal(data[0] [3], 4);
        assert.equal(data[1][ 0], 5);
        assert.equal(data[1][ 3], 8);
        done();
    });
});

test("GetInt2dJagged", function (assert) {
    var done = assert.async();
    superDemoApi.getInt2DJagged((data) => {
        assert.equal(data[0][0], 1);
        assert.equal(data[0][3], 4);
        assert.equal(data[1][0], 5);
        assert.equal(data[1][3], 8);
        done();
    });
});


test("PostInt2d", function (assert) {
    var done = assert.async();
    superDemoApi.postInt2D([[1, 2, 3, 4], [5, 6, 7, 8]], (data) => {
        assert.ok(data);
        done();
    });
});

test("PostInt2dExpectedFalse", function (assert) {
    var done = assert.async();
    superDemoApi.postInt2D([[1, 2, 3, 4], [5, 6, 7, 9]], (data) => {
        assert.ok(data == false);
        done();
    });
});

test("PostIntArray", function (assert) {
    var done = assert.async();
    superDemoApi.postIntArray([1, 2, 3, 4,5, 6, 7, 8], (data) => {
        assert.ok(data);
        done();
    });
});


test("PostWithQueryButEmptyBody", function (assert) {
    var done = assert.async();
    superDemoApi.postWithQueryButEmptyBody("abc", 123, (data) => {
        assert.equal(data.item1, "abc");
        assert.equal(data.item2, 123);
        done();
    });
});


//test("GetIntArray", function (assert) {//this little fella refuses to finish even if the service had returned the right data. This happens only in the Chupaz runner. In browsers the script is OK.
//    var done = assert.async();
//    superDemoApi.getIntArray((data) => {
//        assert.equal(data[7], 8);
//    });
//});

test("PostInt2dJagged", function (assert) {
    var done = assert.async();
    superDemoApi.postInt2DJagged([[1, 2, 3, 4], [5, 6, 7, 8]], (data) => {
        assert.ok(data);
        done();
    });
});

test("PostInt2dJaggedExpectedFalse", function (assert) {
    var done = assert.async();
    superDemoApi.postInt2DJagged([[1, 2, 3, 4], [5, 6, 7, 9]], (data) => {
        assert.ok(data == false);
        done();
    });
});

test("GetDictionaryOfPeople", function (assert) {
    var done = assert.async();
    superDemoApi.getDictionaryOfPeople((data) => {
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
            "birthDate": null,
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
                    state : "Somewhere",
                    "postalCode": null,
                    "country": null,
                    "type": 0,
                    location: { x: 100, y: 200 }
                    
                }
            ]
        }
    },(data) => {
        assert.equal(data, 2);
        done();
    });
});

test("GetKeyValuePair", function (assert) {
    var done = assert.async();
    superDemoApi.getKeyhValuePair((data) => {
        assert.equal(data.key, "Spider Man");
        assert.equal(data.value.addresses[0].city, "New York");
        done();
    });
});


QUnit.module("ValuesTests");

test("Get", function (assert) {
    var done = assert.async();
    valuesApi.get((data) => {
        assert.equal(data[1], "value2");
        done();
    });
});

test("GetByIdAndName", function (assert) {
    var done = assert.async();
    valuesApi.getByIdAndName(1, "something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"", (data) => {
        assert.equal(data, "something to say中文\\`-=|~!@#$%^&*()_+/|?[]{},.';<>:\"1");
        done();
    });
});


test("GetByName", function (assert) {
    var done = assert.async();
    valuesApi.getByName( "something", (data) => {
        assert.equal(data, "SOMETHING");
        done();
    });
});


test("PostValue", function (assert) {

    var done = assert.async();
    var api = new DemoWebApi_Controllers_Client.Values('http://localhost:9024/', function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.responseText);
        done();
    });

    api.post('value', (data) => {
        assert.equal(data, "VALUE");
        done();
    });
});

test("Put", function (assert) {
    assert.expect(0);
    var done = assert.async();
    var api = new DemoWebApi_Controllers_Client.Values('http://localhost:9024/', function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.responseText);
        done();
    });

    api.put(1, 'value', (data) => {
        done();
    });
});

test("Delete", function (assert) {
    assert.expect(0);
    var done = assert.async();
    var api = new DemoWebApi_Controllers_Client.Values('http://localhost:9024/', function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.responseText);
        done();
    });

    api.delete(1, (data) => {
        done();
    });
});


QUnit.module("TupleTests");

test("GetTuple2", function (assert) {
    var done = assert.async();
    tupleApi.getTuple2((data) => {
        assert.equal(data["item1"], "Two");
        assert.equal(data["item2"], 2);
        done();
    });
});

test("PostTuple2", function (assert) {
    var done = assert.async();
    tupleApi.postTuple2({ item1: "One", item2: 2 }, (data) => {
        assert.equal(data, "One");
        done();
    });
});

test("GetTuple7", function (assert) {
    var done = assert.async();
    tupleApi.getTuple7((data) => {
        assert.equal(data["item1"], "Seven");
        assert.equal(data["item7"], 7);
        done();
    });
});

//Visual Studio IDE may give some 
test("PostTuple7", function (assert) {
    var done = assert.async();
    tupleApi.postTuple7({ item1: "One", item2: "", item3: "", item4: "", item5: "", item6: 33333, item7: 9 }, (data) => {
        assert.equal(data, "One");
        done();
    });
});


test("GetTuple8", function (assert) {
    var done = assert.async();
    tupleApi.getTuple8((data) => {
        assert.equal(data["item1"], "Nested");
        assert.equal(data["rest"].item1, "nine");
        done();
    });
});

//Visual Studio IDE may give some 
test("PostTuple8", function (assert) {
    var done = assert.async();
    tupleApi.postTuple8({item1: "One", item2: "", item3: "", item4: "", item5: "", item6: "", item7: "", rest: { item1: "a", item2: "b", item3:"c"} }, (data) => {
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

