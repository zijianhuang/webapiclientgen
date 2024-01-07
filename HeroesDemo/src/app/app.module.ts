import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as namespaces from '../clientapi/WebApiCoreNG2FormGroupClientAuto';
import { SiteConfigConstants } from '../environments/environment';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { NGMDModule } from './ngmd.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export function clientFactory(http: HttpClient) {
    if (SiteConfigConstants.apiBaseuri) {
        console.debug('apiBaseuri:' + SiteConfigConstants.apiBaseuri)
        return new namespaces.DemoWebApi_Controllers_Client.Heroes(SiteConfigConstants.apiBaseuri, http);
    }

    const _baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
    const webApiUrl = _baseUri + 'webapi/';
    console.debug('webApiUrl: ' + webApiUrl);
    return new namespaces.DemoWebApi_Controllers_Client.Heroes(webApiUrl, http);

}
//export const MY_DATE_FORMATS = {
//  parse: {
//    dateInput: 'YYYY-MM-DD',
//  },
//  display: {
//    dateInput: 'YYYY-MM-DD',
//    monthYearLabel: 'MMM YYYY',
//    dateA11yLabel: 'LL',
//    monthYearA11yLabel: 'MMMM YYYY'
//  },
//};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NGMDModule,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroesComponent,
        HeroDetailComponent,
        MessagesComponent,
        HeroSearchComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: namespaces.DemoWebApi_Controllers_Client.Heroes,
            useFactory: clientFactory,
            deps: [HttpClient],

        },
        { provide: LOCALE_ID, useValue: window.navigator.language }, //working for DatePipe and Material DatePicker


        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
                appearance: 'outline'
            }
        },

    ]
})
export class AppModule { }
