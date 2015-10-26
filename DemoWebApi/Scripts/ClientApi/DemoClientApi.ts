/// <reference path="../typings/angularjs/angular.d.ts" />

module DemoWebApi.DemoData.Client {
    //import DemoWebApi_DemoData_Client = DemoWebApi.DemoData.Client;

    export class EntitiesApi {
        client: ng.IHttpService;
        baseRequestUri: string;

        constructor(httpclient: ng.IHttpService, baseUri: string) {
            this.client = httpclient;
            this.baseRequestUri = baseUri + "api/Entities/";
        }

        GetPerson(id: number, callback: (d: DemoWebApi_DemoData_Client.Person)=>void) {
            var r = this.client.get<DemoWebApi_DemoData_Client.Person>(this.baseRequestUri, { params: { id: id } })
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    throw new Error("Error");
                });

            
        }

    }
}

