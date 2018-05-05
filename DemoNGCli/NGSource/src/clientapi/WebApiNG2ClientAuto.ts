import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export namespace DemoWebApi_Controllers_Client {
    @Injectable()
    export class Values {
        constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient){
        }

        /** 
         * GET api/Values
         * @return {Array<string>} 
         */
        get(): Observable<Array<string>>{
            return this.http.get<Array<string>>(this.baseUri + 'api/Values');
        }

        /** 
         * GET api/Values/{id}
         * @param {number} id 
         * @return {string} 
         */
        getById(id: number): Observable<string>{
            return this.http.get<string>(this.baseUri + 'api/Values/'+id);
        }

        /** 
         * POST api/Values
         * @param {string} value 
         * @return {void} 
         */
        post(value: string): Observable<Response>{
            return this.http.post<Response>(this.baseUri + 'api/Values', JSON.stringify(value), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * PUT api/Values/{id}
         * @param {number} id 
         * @param {string} value 
         * @return {void} 
         */
        put(id: number, value: string): Observable<Response>{
            return this.http.put<Response>(this.baseUri + 'api/Values/'+id, JSON.stringify(value), { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
        }

        /** 
         * DELETE api/Values/{id}
         * @param {number} id 
         * @return {void} 
         */
        delete(id: number): Observable<Response>{
            return this.http.delete<Response>(this.baseUri + 'api/Values/'+id);
        }
    }

}

