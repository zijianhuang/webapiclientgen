"use strict";
var testing_1 = require('@angular/core/testing');
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
var hero_service_1 = require('./hero.service');
var WebApiNG2ClientAuto_1 = require('../clientapi/WebApiNG2ClientAuto');
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
        router_deprecated_1.ROUTER_PROVIDERS,
        http_1.HTTP_PROVIDERS,
        hero_service_1.HeroService,
        WebApiNG2ClientAuto_1.DemoWebApi_Controllers_Client.Values,
        WebApiNG2ClientAuto_1.DemoWebApi_Controllers_Client.SuperDemo,
        WebApiNG2ClientAuto_1.DemoWebApi_Controllers_Client.Entities,
        { provide: 'baseUri', useValue: 'http://localhost:9024/' },
    ]; });
    testing_1.it('check hero', function () {
        var hero = { id: 1, name: 'super man' };
        testing_1.expect(hero.name).toEqual('super man');
    });
    testing_1.it('Entities get person', testing_1.async(testing_1.inject([WebApiNG2ClientAuto_1.DemoWebApi_Controllers_Client.Entities], function (myService) {
        myService.getPerson(100).subscribe(function (val) { testing_1.expect(val.name).toEqual('Z Huang'); });
    })));
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