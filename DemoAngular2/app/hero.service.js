"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var model = require('../clientapi/WebApiNG2ClientAuto');
var DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.baseUri = 'http://localhost:10965/';
        this.heroesApi = new DemoWebApi_Controllers_Client.Heroes(this.baseUri, http);
    }
    HeroService.prototype.getHeroes = function () {
        return this.heroesApi.get().toPromise();
        //return this.http.get(this.heroesUrl)
        //    .toPromise()
        //    .then(response => response.json().data as DemoWebApi_Controllers_Client.Hero[])
        //    .catch(this.handleError);
    };
    HeroService.prototype.getHero = function (id) {
        return this.heroesApi.getById(id).toPromise();
        //return this.getHeroes()
        //    .then(heroes => heroes.find(hero => hero.id === id));
    };
    HeroService.prototype.delete = function (id) {
        return this.heroesApi.delete(id).toPromise();
        //const url = `${this.heroesUrl}/${id}`;
        //return this.http.delete(url, { headers: this.headers })
        //    .toPromise()
        //    .then(() => null)
        //    .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        return this.heroesApi.post(name).toPromise();
        //return this.http
        //    .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
        //    .toPromise()
        //    .then(res => res.json().data)
        //    .catch(this.handleError);
    };
    HeroService.prototype.update = function (hero) {
        return this.heroesApi.put(hero).toPromise();
        //const url = `${this.heroesUrl}/${hero.id}`;
        //return this.http
        //    .put(url, JSON.stringify(hero), { headers: this.headers })
        //    .toPromise()
        //    .then(() => hero)
        //    .catch(this.handleError);
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map