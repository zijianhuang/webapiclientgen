/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../ClientApi/WebApiClientAuto.ts"/>
/// <reference path="../ClientApi/HttpClient.ts" />
var MyApp;
(function (MyApp) {
    class First {
        getPerson() {
            var api = new DemoWebApi_Controllers_Client.Entities();
            //api.GetPerson(100, (data) => { $('#nameTag').html("<pre>" + data.Name + "</pre>"); });
        }
        getArrayLastMember() {
            var api = new DemoWebApi_Controllers_Client.SuperDemo(window.location.origin + '/');
            api.getIntArray((data) => { $('#nameTag').html("<pre>" + data[7] + "</pre>"); });
        }
        postObject() {
            var api = new DemoWebApi_Controllers_Client.SuperDemo();
            api.postAnonymousObject({ Id: '12345', Name: 'Something' }, (data) => { $('#nameTag').html("<pre>" + data.Name + "</pre>"); });
        }
        getKeyValue() {
            var api = new DemoWebApi_Controllers_Client.SuperDemo();
            api.getKeyhValuePair((data) => { $('#nameTag').html("<pre>" + data.value.name + "</pre>"); });
        }
        addPerson() {
            var api = new DemoWebApi_Controllers_Client.Entities();
            api.createPerson({
                name: "some body",
                givenName: "some",
                surname: "body",
                dob: new Date("1977-08-18"),
                addresses: [{
                        city: "Brisbane",
                        state: "QLD",
                        type: DemoWebApi_DemoData_Client.AddressType.Residential
                    }]
            }, (data) => {
                alert(data);
            });
        }
    }
    MyApp.First = First;
})(MyApp || (MyApp = {}));
var first = new MyApp.First();
//# sourceMappingURL=MyApp.js.map