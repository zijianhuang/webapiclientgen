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
            api.GetIntArray(function (data) { $('#nameTag').html("<pre>" + data[7] + "</pre>"); });
        };
        First.prototype.postObject = function () {
            var api = new DemoWebApi_Controllers_Client.SuperDemo();
            api.PostAnonymousObject({ Id: '12345', Name: 'Something' }, function (data) { $('#nameTag').html("<pre>" + data.Name + "</pre>"); });
        };
        First.prototype.addPerson = function () {
            var api = new DemoWebApi_Controllers_Client.Entities();
            api.CreatePerson({
                Name: "some body",
                GivenName: "some",
                Surname: "body",
                BirthDate: new Date("1977-08-18"),
                Addresses: [{
                        City: "Brisbane",
                        State: "QLD",
                        Type: DemoWebApi_DemoData_Client.AddressType.Residential
                    }]
            }, function (data) {
                alert(data);
            });
        };
        return First;
    })();
    MyApp.First = First;
})(MyApp || (MyApp = {}));
var first = new MyApp.First();
//# sourceMappingURL=MyApp.js.map