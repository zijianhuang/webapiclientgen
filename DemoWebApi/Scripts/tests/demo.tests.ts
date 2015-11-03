/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../ClientApi/WebApiClientAuto.ts"/>
 

QUnit.module("Generated TS Codes Tests");

var entitiesApi = new DemoWebApi_Controllers_Client.Entities("http://localhost:20012/");
var superDemoApi = new DemoWebApi_Controllers_Client.SuperDemo("http://localhost:20012/");
var valuesApi = new DemoWebApi_Controllers_Client.Values("http://localhost:20012/");



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

QUnit.test("AddPerson", function (assert) {
    stop();
    entitiesApi.CreatePerson({
        Name: "some body",
        GivenName: "some",
        Surname: "body",

    }, (data) => {
        assert.ok(data > 0);
        start();
    });
});

QUnit.test("GetPerson", function (assert) {
    stop();
    entitiesApi.GetPerson(100, (data) => {
        assert.equal("Zijian Huang", data.Name);
        start();
    });

});
