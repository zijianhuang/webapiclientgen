"use strict";
var testing_1 = require('@angular/core/testing');
testing_1.describe('dummy tests', function () {
    testing_1.it('true is true', function () { testing_1.expect(true).toEqual(true); });
    testing_1.it('false is  false', function () { testing_1.expect(false).toEqual(false); });
    testing_1.it('null is not the same thing as undefined', function () { return testing_1.expect(null).not.toEqual(undefined); });
});
//test   
//describe('heroes tests', () => {
//    beforeEach(() => {
//    });
//    beforeEachProviders(() => [
//        HTTP_PROVIDERS,
//        provide(Http, { useClass: InMemoryBackendService }), // in-mem server
//        provide(XHRBackend, { useClass: InMemoryBackendService }), // in-mem server
//        provide(SEED_DATA, { useClass: InMemoryDataService }) ,    // in-mem server data
//        HeroService,
//    ]);
//    it('check hero', () => {
//        var hero: Hero = { id: 1, name: 'super man' };
//        expect(hero.name).toEqual('super man');
//    });
//    it('heroes not empty', inject([HeroService], (heroService: HeroService) => {
//        let heroes = heroService.getHeroes();
//        heroes.then(response => expect(response.length).toBeGreaterThan(0));
//        }));
//});
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
//# sourceMappingURL=my-tests.js.map