import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import * as model from '../clientapi/WebApiNG2ClientAuto';
import DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;
@Injectable()
export class HeroSearchService {
    private baseUri = 'http://localhost:10965/';
    private heroesApi: DemoWebApi_Controllers_Client.Heroes;

    constructor(private http: Http) {
        this.heroesApi = new DemoWebApi_Controllers_Client.Heroes(this.baseUri, http);
    }

    search(term: string): Observable<DemoWebApi_Controllers_Client.Hero[]> {
        return this.heroesApi.search(term);
        //return this.http
        //    .get(`app/heroes/?name=${term}`)
        //    .map((r: Response) => r.json().data as DemoWebApi_Controllers_Client.Hero[]);
    }
}