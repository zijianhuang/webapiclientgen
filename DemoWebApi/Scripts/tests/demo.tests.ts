/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../ClientApi/WebApiClientAuto.ts"/>
 

QUnit.module("test2");

var entitiesApi = new DemoWebApi_Controllers_Client.Entities('http://localhost:9024/');
var superDemoApi = new DemoWebApi_Controllers_Client.SuperDemo("http://localhost:9024/");
var valuesApi = new DemoWebApi_Controllers_Client.Values("http://localhost:9024/");



QUnit.test("data compare", function (assert) {

    var person: DemoWebApi_DemoData_Client.Person = {
        Name: "someone",
        Surname: "my",
        GivenName: "something",
    };

    var person2: DemoWebApi_DemoData_Client.Person = {
        Name: "someone",
        Surname: "my",
        GivenName: "something",
    };

    assert.equal(JSON.stringify(person), JSON.stringify(person2));

});


QUnit.test("GetPerson", function (assert) {
    var done = assert.async();
    entitiesApi.GetPerson(100, (data) => {
        assert.equal(data.Name, "Z Huang");
        done();
    });

});

QUnit.test("AddPerson", function (assert) {
    var done = assert.async();
    entitiesApi.CreatePerson({
        Name: "some body",
        GivenName: "some",
        Surname: "body",

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
    api.CreatePerson({
        Name: "Exception",
        GivenName: "some",
        Surname: "body",

    }, (data) => {
        assert.ok(data > 0);
       // done();
    });
});

QUnit.module("SuperDemoTests");

test("JsZeroNotGood", function (assert) {
    assert.notEqual(0.1 + 0.2 - 0.3, 0, "Zero, Zero; equal succeeds");

});

test("JsZeroNotGoodWithFloat", function (assert) {
    var done = assert.async();
    superDemoApi.GetFloatZero((data) => {
        assert.notEqual(data, 0);
        done();
    });
});

test("JsZeroNotGoodWithDouble", function (assert) {
    var done = assert.async();
    superDemoApi.GetDoubleZero((data) => {
        assert.notEqual(data, 0);
        done();
    });
});

test("JsZeroGoodWithDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.GetDecimalZero((data) => {
        assert.equal(data, 0);
        done();
    });
});





test("GetIntSquare", function (assert) {
    var done = assert.async();
    superDemoApi.GetIntSquare(100, (data) => {
        assert.equal(data, 10000);
        done();
    });
});

test("GetDecimalSquare", function (assert) {
    var done = assert.async();
    superDemoApi.GetDecimalSquare(100, (data) => {
        assert.equal(data, 10000);
        done();
    });
});

test("GetDateTime", function (assert) {
    var done = assert.async();
    superDemoApi.GetDateTime(true, (data) => {
        assert.ok(data);
        done();
    });
});

test("GetDateTimeNull", function (assert) {
    var done = assert.async();
    superDemoApi.GetDateTime(false, (data) => {
        assert.ok(data == undefined);
        done();
    });
});

test("GetNullableDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.GetNullableDecimal(true, (data) => {
        assert.ok(data > 10);
        done();
    });
});

test("GetNullableDecimalNull", function (assert) {
    var done = assert.async();
    superDemoApi.GetNullableDecimal(false, (data) => {
        assert.ok(data == undefined);
        done();
    });
});

test("GetNullString", function (assert) {
    var done = assert.async();
    superDemoApi.GetNullString((data) => {
        assert.ok(data==null);
        done();
    });
});

test("GetNullPerson", function (assert) {
    var done = assert.async();
    superDemoApi.GetNullPerson((data) => {
        assert.ok(data==null);
        done();
    });
});

test("GetByteArray", function (assert) {
    var done = assert.async();
    superDemoApi.GetByteArray((data) => {
        assert.ok(data.length> 0);
        done();
    });
});

test("GetTextStream", function (assert) {
    var done = assert.async();
    superDemoApi.GetTextStream((data) => {
        assert.ok(data);
        done();
    });
});

test("GetActionResult", function (assert) {
    var done = assert.async();
    superDemoApi.GetActionResult((data) => {
        assert.ok(data);
        done();
    });
});

test("Getbyte", function (assert) {
    var done = assert.async();
    superDemoApi.Getbyte((data) => {
        assert.equal(data, 255);
        done();
    });
});

test("GetBool", function (assert) {
    var done = assert.async();
    superDemoApi.GetBool((data) => {
        assert.equal(data, true);
        done();
    });
});

test("Getsbyte", function (assert) {
    var done = assert.async();
    superDemoApi.Getsbyte((data) => {
        assert.equal(data, -127);
        done();
    });
});

test("GetChar", function (assert) {
    var done = assert.async();
    superDemoApi.GetChar((data) => {
        assert.equal(data, "A");
        done();
    });
});

test("GetDecimal", function (assert) {
    var done = assert.async();
    superDemoApi.GetDecimal((data) => {
        assert.equal(data, 79228162514264337593543950335);
        done();
    });
});

test("Getdouble", function (assert) {
    var done = assert.async();
    superDemoApi.Getdouble((data) => {
        assert.equal(data, -1.7976931348623e308);
        done();
    });
});

test("GetUint", function (assert) {
    var done = assert.async();
    superDemoApi.GetUint((data) => {
        assert.equal(data, 4294967295);
        done();
    });
});

test("Getulong", function (assert) {
    var done = assert.async();
    superDemoApi.Getulong((data) => {
        assert.equal(data, 18446744073709551615);
        done();
    });
});

//test("", function (assert) {
//    var done = assert.async();
//    superDemoApi((data) => {
//        assert.equal(data, 0);
//        done();
//    });
//});

//test("", function (assert) {
//    var done = assert.async();
//    superDemoApi((data) => {
//        assert.equal(data, 0);
//        done();
//    });
//});

//test("", function (assert) {
//    var done = assert.async();
//    superDemoApi((data) => {
//        assert.equal(data, 0);
//        done();
//    });
//});



