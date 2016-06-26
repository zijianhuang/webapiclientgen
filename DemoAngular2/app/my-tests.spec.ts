import {Injectable} from '@angular/core';
//import { TestComponentBuilder} from '@angular/compiler/testing';
import {describe, expect, it, xit, inject, injectAsync, beforeEachProviders, async, fakeAsync} from '@angular/core/testing'; 


//import { Component, OpaqueToken } from '@angular/core';
//import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Http, Headers, HTTP_PROVIDERS, BrowserXhr } from '@angular/http'
import {BROWSER_PROVIDERS, BROWSER_PLATFORM_PROVIDERS} from '@angular/platform-browser';

//// The usual bootstrapping imports
//import { bootstrap }      from '@angular/platform-browser-dynamic';

//import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
//import { ViewMetadata }   from '@angular/core';
//import { PromiseWrapper } from '@angular/core/src/facade/promise';

import {Hero} from './hero';
//import {HeroService} from './hero.service';
//import { MyUppercasePipe } from './my-uppercase.pipe';

import {  DemoWebApi_DemoData_Client, DemoWebApi_DemoData_Another_Client, DemoWebApi_Controllers_Client  } from '../clientapi/WebApiNG2ClientAuto';

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
    build(): any {
        let xhr = super.build();
        xhr.withCredentials = true;
        return <any>(xhr);
    }
}
 
describe('dummy tests', () => {
    it('true is true', function () { expect(true).toEqual(true); });
    it('false is  false', () => { expect(false).toEqual(false); });
    it('null is not the same thing as undefined',
        () => expect(null).not.toEqual(undefined)
    );
});
//test   
describe('heroes tests', () => {
    


    beforeEach(() => {

    });
    
    beforeEachProviders(() => [
        //ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        //HeroService,
        DemoWebApi_Controllers_Client.Values,
        DemoWebApi_Controllers_Client.SuperDemo,
        DemoWebApi_Controllers_Client.Entities,
        { provide: 'baseUri', useValue: 'http://localhost:9024/' },
        provide(BrowserXhr, { useClass: CustomBrowserXhr })
    ]);
    
    it('check hero', () => {
        var hero: Hero = { id: 1, name: 'super man' };
        expect(hero.name).toEqual('super man');
    });
    it('Entities get person', inject([DemoWebApi_Controllers_Client.Entities], (myService: DemoWebApi_Controllers_Client.Entities) => {
        myService.getPerson(100); }));
 

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
   