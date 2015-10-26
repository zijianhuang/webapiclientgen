/// <reference path="../typings/angularjs/angular.d.ts" />
var DemoWebApi;
(function (DemoWebApi) {
    var DemoData;
    (function (DemoData) {
        var Client;
        (function (Client) {
            var EntitiesApi = (function () {
                function EntitiesApi(httpclient, baseUri) {
                    this.client = httpclient;
                    this.baseRequestUri = baseUri + "api/Entities/";
                }
                EntitiesApi.prototype.GetPerson = function (id, callback) {
                    var r = this.client.get(this.baseRequestUri, { params: { id: id } })
                        .success(function (data, status, headers, config) {
                        callback(data);
                    })
                        .error(function (data, status, headers, config) {
                        throw new Error("Error");
                    });
                };
                return EntitiesApi;
            })();
            Client.EntitiesApi = EntitiesApi;
        })(Client = DemoData.Client || (DemoData.Client = {}));
    })(DemoData = DemoWebApi.DemoData || (DemoWebApi.DemoData = {}));
})(DemoWebApi || (DemoWebApi = {}));
//# sourceMappingURL=DemoClientApi.js.map