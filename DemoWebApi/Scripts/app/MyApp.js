/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../ClientApi/WebApiClientAuto.ts"/>
/// <reference path="../ClientApi/HttpClient.ts" />
var MyApp;
(function (MyApp) {
    var First = (function () {
        function First() {
        }
        First.prototype.getPerson = function () {
            var api = new DemoWebApi_Controllers_Client.Entities();
            //api.GetPerson(100, (data) => { $('#nameTag').html("<pre>" + data.Name + "</pre>"); });
        };
        First.prototype.getArrayLastMember = function () {
            var api = new DemoWebApi_Controllers_Client.SuperDemo(window.location.origin + '/');
            api.getIntArray(function (data) { $('#nameTag').html("<pre>" + data[7] + "</pre>"); });
        };
        First.prototype.postObject = function () {
            var api = new DemoWebApi_Controllers_Client.SuperDemo();
            api.postAnonymousObject({ Id: '12345', Name: 'Something' }, function (data) { $('#nameTag').html("<pre>" + data.Name + "</pre>"); });
        };
        First.prototype.getKeyValue = function () {
            var api = new DemoWebApi_Controllers_Client.SuperDemo();
            api.getKeyhValuePair(function (data) { $('#nameTag').html("<pre>" + data.value.name + "</pre>"); });
        };
        First.prototype.addPerson = function () {
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
            }, function (data) {
                alert(data);
            });
        };
        return First;
    }());
    MyApp.First = First;
})(MyApp || (MyApp = {}));
var first = new MyApp.First();
//# sourceMappingURL=MyApp.js.map