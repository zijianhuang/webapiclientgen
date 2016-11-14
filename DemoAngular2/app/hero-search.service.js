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
var model = require('../clientapi/WebApiNG2ClientAuto');
var DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;
var HeroSearchService = (function () {
    function HeroSearchService(http) {
        this.http = http;
        this.baseUri = 'http://localhost:10965/';
        this.heroesApi = new DemoWebApi_Controllers_Client.Heroes(this.baseUri, http);
    }
    HeroSearchService.prototype.search = function (term) {
        return this.heroesApi.search(term);
        //return this.http
        //    .get(`app/heroes/?name=${term}`)
        //    .map((r: Response) => r.json().data as DemoWebApi_Controllers_Client.Hero[]);
    };
    HeroSearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroSearchService);
    return HeroSearchService;
}());
exports.HeroSearchService = HeroSearchService;
//# sourceMappingURL=hero-search.service.js.map