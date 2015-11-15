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
            api.GetPerson(100, function (data) { $('#nameTag').html("<pre>" + data.Name + "</pre>"); });
        };
        First.prototype.getArrayLastMember = function () {
            var api = new DemoWebApi_Controllers_Client.SuperDemo();
            api.GetIntArray(function (data) { $('#nameTag').html("<pre>" + data[7] + "</pre>"); });
        };
        return First;
    })();
    MyApp.First = First;
})(MyApp || (MyApp = {}));
var first = new MyApp.First();
