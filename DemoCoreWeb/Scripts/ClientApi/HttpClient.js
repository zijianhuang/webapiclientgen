/// <reference path="../typings/jquery/jquery.d.ts" />
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    /**
    **/
    HttpClient.prototype.get = function (url, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, null, "GET", callback, errorCalback, statusCodeCallback);
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
            data: JSON.stringify(dataToSave),
            type: httpVerb,
            success: function (data, textStatus, jqXHR) {
                if (callback !== null) {
                    callback(data);
                }
            },
            error: function (xhr, ajaxOptions, thrown) {
                if (errorCallback != null) {
                    errorCallback(xhr, ajaxOptions, thrown);
                }
            },
            statusCode: statusCodeCallback,
            contentType: 'application/json; charset=UTF-8',
            headers: {
                Accept: 'text/html,application/xhtml+xml,application/json,application/xml;q=0.9,*/*;q=0.8',
            }
        });
    };
    /**
      location.origin may not be working in some releases of IE. And locationOrigin is an alternative implementation
    **/
    HttpClient.locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
    return HttpClient;
}());
var AuthHttpClient = /** @class */ (function () {
    function AuthHttpClient() {
    }
    /**
    **/
    AuthHttpClient.prototype.get = function (url, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, null, "GET", callback, errorCalback, statusCodeCallback);
    };
    AuthHttpClient.prototype.post = function (url, dataToSave, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, dataToSave, "POST", callback, errorCalback, statusCodeCallback);
    };
    AuthHttpClient.prototype.put = function (url, dataToSave, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, dataToSave, "PUT", callback, errorCalback, statusCodeCallback);
    };
    AuthHttpClient.prototype.delete = function (url, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, null, "DELETE", callback, errorCalback, statusCodeCallback);
    };
    AuthHttpClient.prototype.executeAjax = function (url, dataToSave, httpVerb, callback, errorCallback, statusCodeCallback) {
        //http://api.jquery.com/jquery.ajax/
        $.ajax(url, {
            data: JSON.stringify(dataToSave),
            type: httpVerb,
            success: function (data, textStatus, jqXHR) {
                if (callback !== null) {
                    callback(data);
                }
            },
            error: function (xhr, ajaxOptions, thrown) {
                if (errorCallback != null) {
                    errorCallback(xhr, ajaxOptions, thrown);
                }
            },
            statusCode: statusCodeCallback,
            contentType: 'application/json; charset=UTF-8',
            headers: {
                Accept: 'text/html,application/xhtml+xml,application/json,application/xml;q=0.9,*/*;q=0.8',
            },
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('Authorization', 'bearer ' + sessionStorage.getItem('access_token'));
            }
        });
    };
    /**
    * Get oAuth token through username and password. The token will be saved in sessionStorage.
    */
    AuthHttpClient.prototype.getToken = function (url, username, password, callback, errorCallback, statusCodeCallback) {
        $.ajax(url + 'token', {
            data: {
                'grant_type': 'password',
                'username': username,
                'password': password
            },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                if (data != null && data != '') {
                    sessionStorage.setItem("access_token", data.access_token);
                    sessionStorage.setItem("expires_in", data.expires_in);
                }
                if (callback !== null) {
                    callback(data);
                }
            },
            error: function (xhr, ajaxOptions, thrown) {
                if (errorCallback != null) {
                    errorCallback(xhr, ajaxOptions, thrown);
                }
            },
            statusCode: statusCodeCallback,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            headers: {
                Accept: 'text/html,application/xhtml+xml,application/json,application/xml;q=0.9,*/*;q=0.8',
            }
        });
    };
    /**
      location.origin may not be working in some releases of IE. And locationOrigin is an alternative implementation
    **/
    AuthHttpClient.locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
    return AuthHttpClient;
}());
//# sourceMappingURL=HttpClient.js.map