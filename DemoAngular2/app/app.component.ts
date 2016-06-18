import { Component, OpaqueToken } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http'

import { DashboardComponent }  from './dashboard.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';
import {  DemoWebApi_DemoData_Client, DemoWebApi_DemoData_Another_Client, DemoWebApi_Controllers_Client  } from '../clientapi/WebApiNG2ClientAuto';

export let TESTURL = new OpaqueToken(
@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        HeroService,
        DemoWebApi_Controllers_Client.Values,
        DemoWebApi_Controllers_Client.SuperDemo,
        DemoWebApi_Controllers_Client.Entities,
        { provide: 'baseUri', useValue: 'http://localhost:1234' },
        
        

    ]
})
@RouteConfig([
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
    { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent },
    { path: '/heroes', name: 'Heroes', component: HeroesComponent }
])
export class AppComponent {
    title = 'Tour of Heroes';
}
