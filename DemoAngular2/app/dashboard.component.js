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
var hero_service_1 = require('./hero.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var WebApiNG2ClientAuto_1 = require('../clientapi/WebApiNG2ClientAuto');
var DashboardComponent = (function () {
    function DashboardComponent(router, heroService, entitiesService) {
        this.router = router;
        this.heroService = heroService;
        this.entitiesService = entitiesService;
        this.heroes = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroService.getHeroes()
            .then(function (heroes) { return _this.heroes = heroes.slice(1, 5); });
        this.entitiesService.getPerson(100).subscribe(function (d) { return _this.myName = d.name; });
    };
    DashboardComponent.prototype.gotoDetail = function (hero) {
        var link = ['HeroDetail', { id: hero.id }];
        this.router.navigate(link);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/dashboard.component.html',
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, hero_service_1.HeroService, WebApiNG2ClientAuto_1.DemoWebApi_Controllers_Client.Entities])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map