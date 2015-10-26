/// <reference path="../typings/jquery/jquery.d.ts" />
var Fonlow;
(function (Fonlow) {
    var Http;
    (function (Http) {
        var HttpClient = (function () {
            function HttpClient() {
            }
            HttpClient.prototype.get = function (url, callback, errorCalback, statusCodeCallback) {
                $.get(url, callback);
            };
            HttpClient.prototype.post = function (url, dataToSave, callback, errorCalback, statusCodeCallback) {
                this.executeAjax(url, dataToSave, "POST", callback, errorCalback, statusCodeCallback);
            };
            HttpClient.prototype.put = function (url, dataToSave, callback, errorCalback, statusCodeCallback) {
                this.executeAjax(url, dataToSave, "PUT", callback, errorCalback, statusCodeCallback);
            };
            HttpClient.prototype.delete = function (url, callback, errorCalback, statusCodeCallback) {
                this.executeAjax(url, null, "DELETE", callback, errorCalback, statusCodeCallback);
            };
            HttpClient.prototype.executeAjax = function (url, dataToSave, httpVerb, callback, errorCallback, statusCodeCallback) {
                //http://api.jquery.com/jquery.ajax/
                $.ajax(url, {
                    data: dataToSave,
                    type: httpVerb,
                    success: function (data) {
                        if (callback !== undefined) {
                            callback(data);
                        }
                    },
                    error: function (xhr, ajaxOptions, thrown) {
                        if (errorCallback != undefined) {
                            errorCallback(xhr, ajaxOptions, thrown);
                        }
                    },
                    statusCode: statusCodeCallback,
                });
            };
            return HttpClient;
        })();
        Http.HttpClient = HttpClient;
    })(Http = Fonlow.Http || (Fonlow.Http = {}));
})(Fonlow || (Fonlow = {}));
//# sourceMappingURL=HttpClient.js.map