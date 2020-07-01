/// <reference path="../typings/jquery/jquery.d.ts" />
class HttpClient {
    /**
    **/
    get(url, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, null, "GET", callback, errorCalback, statusCodeCallback);
    }
    post(url, dataToSave, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, dataToSave, "POST", callback, errorCalback, statusCodeCallback);
    }
    put(url, dataToSave, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, dataToSave, "PUT", callback, errorCalback, statusCodeCallback);
    }
    delete(url, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, null, "DELETE", callback, errorCalback, statusCodeCallback);
    }
    executeAjax(url, dataToSave, httpVerb, callback, errorCallback, statusCodeCallback) {
        //http://api.jquery.com/jquery.ajax/
        $.ajax(url, {
            data: JSON.stringify(dataToSave),
            type: httpVerb,
            success: (data, textStatus, jqXHR) => {
                if (callback !== null) {
                    callback(data);
                }
            },
            error: (xhr, ajaxOptions, thrown) => {
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
    }
}
/**
  location.origin may not be working in some releases of IE. And locationOrigin is an alternative implementation
**/
HttpClient.locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
class AuthHttpClient {
    /**
    **/
    get(url, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, null, "GET", callback, errorCalback, statusCodeCallback);
    }
    post(url, dataToSave, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, dataToSave, "POST", callback, errorCalback, statusCodeCallback);
    }
    put(url, dataToSave, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, dataToSave, "PUT", callback, errorCalback, statusCodeCallback);
    }
    delete(url, callback, errorCalback, statusCodeCallback) {
        this.executeAjax(url, null, "DELETE", callback, errorCalback, statusCodeCallback);
    }
    executeAjax(url, dataToSave, httpVerb, callback, errorCallback, statusCodeCallback) {
        //http://api.jquery.com/jquery.ajax/
        $.ajax(url, {
            data: JSON.stringify(dataToSave),
            type: httpVerb,
            success: (data, textStatus, jqXHR) => {
                if (callback !== null) {
                    callback(data);
                }
            },
            error: (xhr, ajaxOptions, thrown) => {
                if (errorCallback != null) {
                    errorCallback(xhr, ajaxOptions, thrown);
                }
            },
            statusCode: statusCodeCallback,
            contentType: 'application/json; charset=UTF-8',
            headers: {
                Accept: 'text/html,application/xhtml+xml,application/json,application/xml;q=0.9,*/*;q=0.8',
            },
            beforeSend: (xhr, settings) => {
                xhr.setRequestHeader('Authorization', 'bearer ' + sessionStorage.getItem('access_token'));
            }
        });
    }
    /**
    * Get oAuth token through username and password. The token will be saved in sessionStorage.
    */
    getToken(url, username, password, callback, errorCallback, statusCodeCallback) {
        $.ajax(url + 'token', {
            data: {
                'grant_type': 'password',
                'username': username,
                'password': password
            },
            type: 'POST',
            success: (data, textStatus, jqXHR) => {
                if (data != null && data != '') {
                    sessionStorage.setItem("access_token", data.access_token);
                    sessionStorage.setItem("expires_in", data.expires_in);
                }
                if (callback !== null) {
                    callback(data);
                }
            },
            error: (xhr, ajaxOptions, thrown) => {
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
    }
}
/**
  location.origin may not be working in some releases of IE. And locationOrigin is an alternative implementation
**/
AuthHttpClient.locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
