import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as model from '../clientapi/WebApiNG2ClientAuto';
import DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;

@Injectable()
export class HeroService {
    private baseUri = 'http://localhost:10965/';
    private heroesApi: DemoWebApi_Controllers_Client.Heroes;

    constructor(private http: Http) {
        this.heroesApi = new DemoWebApi_Controllers_Client.Heroes(this.baseUri, http);
    }
    getHeroes(): Promise<DemoWebApi_Controllers_Client.Hero[]> {
        return this.heroesApi.get().toPromise();
        //return this.http.get(this.heroesUrl)
        //    .toPromise()
        //    .then(response => response.json().data as DemoWebApi_Controllers_Client.Hero[])
        //    .catch(this.handleError);
    }
    getHero(id: number): Promise<DemoWebApi_Controllers_Client.Hero> {
        return this.heroesApi.getById(id).toPromise();
        //return this.getHeroes()
        //    .then(heroes => heroes.find(hero => hero.id === id));
    }
    delete(id: number): Promise<void> {
        return this.heroesApi.delete(id).toPromise();
        //const url = `${this.heroesUrl}/${id}`;
        //return this.http.delete(url, { headers: this.headers })
        //    .toPromise()
        //    .then(() => null)
        //    .catch(this.handleError);
    }
    create(name: string): Promise<DemoWebApi_Controllers_Client.Hero> {
        return this.heroesApi.post(name).toPromise();
        //return this.http
        //    .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
        //    .toPromise()
        //    .then(res => res.json().data)
        //    .catch(this.handleError);
    }
    update(hero: DemoWebApi_Controllers_Client.Hero): Promise<DemoWebApi_Controllers_Client.Hero> {
        return this.heroesApi.put(hero).toPromise();
        //const url = `${this.heroesUrl}/${hero.id}`;
        //return this.http
        //    .put(url, JSON.stringify(hero), { headers: this.headers })
        //    .toPromise()
        //    .then(() => hero)
        //    .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}