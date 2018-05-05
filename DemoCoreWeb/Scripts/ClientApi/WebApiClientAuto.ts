///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="HttpClient.ts" />
namespace DemoWebApi_Controllers_Client {
    export class Values {
        constructor(private baseUri: string = HttpClient.locationOrigin, private httpClient: HttpClientBase = new HttpClient(), private error?: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any, private statusCode?: { [key: string]: any; }){
        }

        /** 
         * GET api/Values
         * @return {Array<string>} 
         */
        get(callback: (data : Array<string>) => any){
            this.httpClient.get(this.baseUri + 'api/Values', callback, this.error, this.statusCode);
        }

        /** 
         * GET api/Values/{id}
         * @param {number} id 
         * @return {string} 
         */
        getById(id: number, callback: (data : string) => any){
            this.httpClient.get(this.baseUri + 'api/Values/'+id, callback, this.error, this.statusCode);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {void} 
         */
        post(value: string, callback: (data : void) => any){
            this.httpClient.post(this.baseUri + 'api/Values', value, callback, this.error, this.statusCode);
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        put(id: number, value: string, callback: (data : void) => any){
            this.httpClient.put(this.baseUri + 'api/Values/'+id, value, callback, this.error, this.statusCode);
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number, callback: (data : void) => any){
            this.httpClient.delete(this.baseUri + 'api/Values/'+id, callback, this.error, this.statusCode);
        }
    }

}

