"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//import { TestComponentBuilder} from '@angular/compiler/testing';
var testing_1 = require('@angular/core/testing');
//import { Component, OpaqueToken } from '@angular/core';
//import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
var http_1 = require('@angular/http');
//// The usual bootstrapping imports
//import { bootstrap }      from '@angular/platform-browser-dynamic';
//import { By }             from '@angular/platform-browser';
var core_2 = require('@angular/core');
//import {HeroService} from './hero.service';
//import { MyUppercasePipe } from './my-uppercase.pipe';
var WebApiNG2ClientAuto_1 = require('../clientapi/WebApiNG2ClientAuto');
var CustomBrowserXhr = (function (_super) {
    __extends(CustomBrowserXhr, _super);
    function CustomBrowserXhr() {
        _super.apply(this, arguments);
    }
    CustomBrowserXhr.prototype.build = function () {
        var xhr = _super.prototype.build.call(this);
        xhr.withCredentials = true;
        return (xhr);
    };
    CustomBrowserXhr = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CustomBrowserXhr);
    return CustomBrowserXhr;
}(http_1.BrowserXhr));
exports.CustomBrowserXhr = CustomBrowserXhr;
testing_1.describe('dummy tests', function () {
    testing_1.it('true is true', function () { testing_1.expect(true).toEqual(true); });
    testing_1.it('false is  false', function () { testing_1.expect(false).toEqual(false); });
    testing_1.it('null is not the same thing as undefined', function () { return testing_1.expect(null).not.toEqual(undefined); });
});
//test   
testing_1.describe('heroes tests', function () {
    beforeEach(function () {
    });
    testing_1.beforeEachProviders(function () { return [
        //ROUTER_PROVIDERS,
        http_1.HTTP_PROVIDERS,
        //HeroService,
        WebApiNG2ClientAuto_1.DemoWebApi_Controllers_Client.Values,
        WebApiNG2ClientAuto_1.DemoWebApi_Controllers_Client.SuperDemo,
        WebApiNG2ClientAuto_1.DemoWebApi_Controllers_Client.Entities,
        { provide: 'baseUri', useValue: 'http://localhost:9024/' },
        core_2.provide(http_1.BrowserXhr, { useClass: CustomBrowserXhr })
    ]; });
    testing_1.it('check hero', function () {
        var hero = { id: 1, name: 'super man' };
        testing_1.expect(hero.name).toEqual('super man');
    });
    testing_1.it('Entities get person', testing_1.inject([WebApiNG2ClientAuto_1.DemoWebApi_Controllers_Client.Entities], function (myService) {
        myService.getPerson(100);
    }));
    //it('heroes not empty', inject([HeroService], (heroService: HeroService) => {
    //    let heroes = heroService.getHeroes();
    //    heroes.then(response => expect(response.length).toBeGreaterThan(0));
    //}));
});
//describe('pipe tests', () => {
//    let pipe: MyUppercasePipe;
//    beforeEach(() => {
//        pipe = new MyUppercasePipe();
//    });
//    it('transforms "abc" to "ABC"', () => {
//        expect(pipe.transform('abc')).toEqual('ABC');
//    });
//    it('transforms "abc def" to "ABC DEF"', () => {
//        expect(pipe.transform('abc def')).toEqual('ABC DEF');
//    });
//    it('leaves "ABC DEF" unchanged', () => {
//        expect(pipe.transform('ABC DEF')).toEqual('ABC DEF');
//    });
//});
//# sourceMappingURL=my-tests.spec.js.map