/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <chutzpah_reference path="../qunit-2.6.1.js" />
/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../ClientApi/WebApiJQClientAuto.ts"/>
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
var SpecialObjects;
(function (SpecialObjects) {
    QUnit.config.testTimeout = 30000;
    const baseUri = HttpClient.locationOrigin;
    let superDemoApi = new DemoWebApi_Controllers_Client.SuperDemo(baseUri);
    QUnit.module("SpecialObjects", function () {
        QUnit.test("GetAnonymousDynamic", function (assert) {
            let done = assert.async();
            superDemoApi.getAnonymousDynamic((data) => {
                assert.equal(data.id, 12345);
                assert.equal(data.name, "Something");
                done();
            });
        });
        QUnit.test("GetAnonymousObject", function (assert) {
            let done = assert.async();
            superDemoApi.getAnonymousObject((data) => {
                assert.equal(data.id, 12345);
                assert.equal(data.name, "Something");
                done();
            });
        });
        QUnit.test("PostAnonymousObject", function (assert) {
            let done = assert.async();
            superDemoApi.postAnonymousObject({ "Id": "12345", "Name": "Something" }, (data) => {
                assert.equal(data.Id, "123451");
                assert.equal(data.Name, "Something1");
                done();
            });
        });
    });
})(SpecialObjects || (SpecialObjects = {}));
//# sourceMappingURL=special.tests.js.map