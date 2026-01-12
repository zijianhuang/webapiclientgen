class HttpClient {
    /**
      location.origin may not be working in some releases of IE. And locationOrigin is an alternative implementation
    **/
    static locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
    /**
    **/
    get(url, callback, errorCallback, statusCodeCallback, headersHandler) {
        this.executeAjax(url, null, "GET", callback, errorCallback, statusCodeCallback, undefined, headersHandler);
    }
    post(url, dataToSave, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "POST", callback, errorCallback, statusCodeCallback, contentType, headersHandler);
    }
    put(url, dataToSave, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "PUT", callback, errorCallback, statusCodeCallback, contentType, headersHandler);
    }
    patch(url, dataToSave, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "PATCH", callback, errorCallback, statusCodeCallback, contentType, headersHandler);
    }
    delete(url, callback, errorCallback, statusCodeCallback, headersHandler) {
        this.executeAjax(url, null, "DELETE", callback, errorCallback, statusCodeCallback, undefined, headersHandler);
    }
    executeAjax(url, dataToSave, httpVerb, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        jQuery.ajax(url, {
            data: JSON.stringify(dataToSave),
            type: httpVerb,
            success: (data, textStatus, jqXHR) => {
                if (callback) {
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
class AuthHttpClient {
    /**
      location.origin may not be working in some releases of IE. And locationOrigin is an alternative implementation
    **/
    static locationOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
    get(url, callback, errorCallback, statusCodeCallback, headersHandler) {
        this.executeAjax(url, null, "GET", callback, errorCallback, statusCodeCallback, undefined, headersHandler);
    }
    post(url, dataToSave, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "POST", callback, errorCallback, statusCodeCallback, contentType, headersHandler);
    }
    put(url, dataToSave, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "PUT", callback, errorCallback, statusCodeCallback, contentType, headersHandler);
    }
    patch(url, dataToSave, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        this.executeAjax(url, dataToSave, "PATCH", callback, errorCallback, statusCodeCallback, contentType, headersHandler);
    }
    delete(url, callback, errorCallback, statusCodeCallback, headersHandler) {
        this.executeAjax(url, null, "DELETE", callback, errorCallback, statusCodeCallback, undefined, headersHandler);
    }
    executeAjax(url, dataToSave, httpVerb, callback, errorCallback, statusCodeCallback, contentType, headersHandler) {
        //http://api.jquery.com/JQ.ajax/
        jQuery.ajax(url, {
            data: JSON.stringify(dataToSave),
            type: httpVerb,
            success: (data, textStatus, jqXHR) => {
                if (callback) {
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
                if (callback) {
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
//# sourceMappingURL=HttpClient.js.map