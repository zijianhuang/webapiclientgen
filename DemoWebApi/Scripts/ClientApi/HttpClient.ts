/// <reference path="../typings/jquery/jquery.d.ts" />


module Fonlow.Http {

    export class HttpClient {
        get(url: string,
            callback: (data: any) => any,
            errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
            statusCodeCallback: Object
        ) {
            $.get(url, callback);
        }

        post(url: string,
            dataToSave: any,
            callback: (data: string) => any,
            errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
            statusCodeCallback: Object
        ) {
            this.executeAjax(url, dataToSave, "POST", callback, errorCalback, statusCodeCallback);
        }

        put(url: string,
            dataToSave: any,
            callback: (data: string) => any,
            errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
            statusCodeCallback: Object
        ) {
            this.executeAjax(url, dataToSave, "PUT", callback, errorCalback, statusCodeCallback);
        }

        delete(url: string,
            callback: (data: string) => any,
            errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
            statusCodeCallback: Object
        ) {
            this.executeAjax(url, null, "DELETE", callback, errorCalback, statusCodeCallback);
        }

        private executeAjax(url: string,
            dataToSave: any,
            httpVerb: string,
            callback: (data: string) => any,
            errorCallback: (xhr, ajaxOptions, thrown) => any,
            statusCodeCallback: Object
        ) {
            //http://api.jquery.com/jquery.ajax/
            $.ajax(url, {
                data: dataToSave,
                type: httpVerb,
                success: (data) => {
                    if (callback !== undefined) {
                        callback(data);
                    }
                },
                error: (xhr, ajaxOptions, thrown) => {
                    if (errorCallback != undefined) {
                        errorCallback(xhr, ajaxOptions, thrown);
                    }
                },

                statusCode: statusCodeCallback,

            });
        }
    }


}