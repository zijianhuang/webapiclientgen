class HttpClient {
    /**
    **/
    get(url, callback, errorCalback, statusCodeCallback, headersHandler) {
        this.executeAjax(url, null, "GET", callback, errorCalback, statusCodeCallback, null, headersHandler);
    }
    post(url, dataToSave, callback, errorCalback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "POST", callback, errorCalback, statusCodeCallback, contentType, headersHandler);
    }
    put(url, dataToSave, callback, errorCalback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "PUT", callback, errorCalback, statusCodeCallback, contentType, headersHandler);
    }
    delete(url, callback, errorCalback, statusCodeCallback, headersHandler) {
        this.executeAjax(url, null, "DELETE", callback, errorCalback, statusCodeCallback, null, headersHandler);
    }
    executeAjax(url, dataToSave, httpVerb, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        jQuery.ajax(url, {
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
            contentType: contentType,
            headers: headersHandler ? headersHandler() : undefined
        });
    }
}
/**
  location.origin may not be working in some releases of IE. And locationOrigin is an alternative implementation
**/
HttpClient.locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
class AuthHttpClient {
    get(url, callback, errorCalback, statusCodeCallback, headersHandler) {
        this.executeAjax(url, null, "GET", callback, errorCalback, statusCodeCallback, null, headersHandler);
    }
    post(url, dataToSave, callback, errorCalback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "POST", callback, errorCalback, statusCodeCallback, contentType, headersHandler);
    }
    put(url, dataToSave, callback, errorCalback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "PUT", callback, errorCalback, statusCodeCallback, contentType, headersHandler);
    }
    delete(url, callback, errorCalback, statusCodeCallback, headersHandler) {
        this.executeAjax(url, null, "DELETE", callback, errorCalback, statusCodeCallback, null, headersHandler);
    }
    executeAjax(url, dataToSave, httpVerb, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        //http://api.jquery.com/JQ.ajax/
        jQuery.ajax(url, {
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
            contentType: contentType,
            headers: headersHandler ? headersHandler() : undefined,
            beforeSend: (xhr, settings) => {
                xhr.setRequestHeader('Authorization', 'bearer ' + sessionStorage.getItem('access_token'));
            }
        });
    }
    /**
    * Get oAuth token through username and password. The token will be saved in sessionStorage.
    */
    getToken(url, username, password, callback, errorCallback, statusCodeCallback) {
        jQuery.ajax(url + 'token', {
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
//# sourceMappingURL=HttpClient.js.map