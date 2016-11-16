import './rxjs-extensions';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from './hero-search.component';

import * as model from '../clientapi/WebApiNG2ClientAuto';
import DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        //   InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroesComponent,
        HeroSearchComponent
    ],
    providers: [
        {
            provide: Http,
            useFactory: (backend: XHRBackend, options: RequestOptions) => {
                return new Http(backend, options);
            },
            deps: [XHRBackend, RequestOptions]
        },

        {
            provide: DemoWebApi_Controllers_Client.Heroes,
            useFactory: (http: Http) => {
                return new DemoWebApi_Controllers_Client.Heroes("http://localhost:10965/", http);
            },
            deps: [Http],//this provider has better to be in the same scope with provider of AuthHttp.

        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }