/// <reference path="../ClientApi/WebApiCoreJQClientAuto.ts"/>

module SpecialObjects {
	QUnit.config.testTimeout = 30000;
	const baseUri = HttpClient.locationOrigin;


	let specialTypesApi = new DemoCoreWeb_Controllers_Client.SpecialTypes(baseUri);

	QUnit.module("SpecialObjects", function () {
		QUnit.test("GetAnonymousDynamic", function (assert) {
			let done = assert.async();
			specialTypesApi.getAnonymousDynamic((data) => {
				assert.equal(data.id, 12345);
				assert.equal(data.name, "Something");
				done();
			});
		});

		QUnit.test("GetAnonymousObject", function (assert) {
			let done = assert.async();
			specialTypesApi.getAnonymousObject((data) => {
				assert.equal(data.id, 12345);
				assert.equal(data.name, "Something");
				done();
			});
		});

		QUnit.test("PostAnonymousObject", function (assert) {
			let done = assert.async();
			specialTypesApi.postAnonymousObject({ "Id": "12345", "Name": "Something" }, (data) => {
				assert.equal(data.Id, "123451");
				assert.equal(data.Name, "Something1");
				done();
			});
		});

	})

}