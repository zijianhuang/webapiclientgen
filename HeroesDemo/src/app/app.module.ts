import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HttpBackend, HttpXhrBackend, HttpRequest } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
import * as namespaces from '../clientapi/WebApiCoreNg2ClientAuto';
import { SiteConfigConstants, environment } from '../environments/environment';

export function clientFactory(http: HttpClient) {
  if (SiteConfigConstants.apiBaseuri) {
    console.debug('apiBaseuri:' + SiteConfigConstants.apiBaseuri)
    return new namespaces.DemoWebApi_Controllers_Client.Heroes(SiteConfigConstants.apiBaseuri, http);
  }

  //const _baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
  const _baseUri = 'http://localhost:5000/';
  const webApiUrl = _baseUri ;
  console.debug('webApiUrl: ' + webApiUrl);
  return new namespaces.DemoWebApi_Controllers_Client.Heroes(webApiUrl, http);

}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
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

    ]
})
export class AppModule { }
