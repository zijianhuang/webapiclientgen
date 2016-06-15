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
var router_deprecated_1 = require('@angular/router-deprecated');
var hero_service_1 = require('./hero.service');
var hero_detail_component_1 = require('./hero-detail.component');
var HeroesComponent = (function () {
    function HeroesComponent(_router, _heroService) {
        this._router = _router;
        this._heroService = _heroService;
        this.addingHero = false;
    }
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this._heroService
            .getHeroes()
            .then(function (heroes) { return _this.heroes = heroes; })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    HeroesComponent.prototype.addHero = function () {
        this.addingHero = true;
        this.selectedHero = null;
    };
    HeroesComponent.prototype.close = function (savedHero) {
        this.addingHero = false;
        if (savedHero) {
            this.getHeroes();
        }
    };
    HeroesComponent.prototype.delete = function (hero, event) {
        var _this = this;
        event.stopPropagation();
        this._heroService
            .delete(hero)
            .then(function (res) {
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
        this.addingHero = false;
    };
    HeroesComponent.prototype.gotoDetail = function () {
        this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    };
    HeroesComponent = __decorate([
        core_1.Component({
            selector: 'my-heroes',
            templateUrl: 'app/heroes.component.html',
            styleUrls: ['app/heroes.component.css'],
            directives: [hero_detail_component_1.HeroDetailComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, hero_service_1.HeroService])
    ], HeroesComponent);
    return HeroesComponent;
}());
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map