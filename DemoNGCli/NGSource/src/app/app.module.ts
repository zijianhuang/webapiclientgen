import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpBackend, HttpXhrBackend, HttpRequest } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from './hero-search.component';

import * as namespaces from '../clientapi/WebApiNG2ClientAuto';

import { SiteConfigConstants, environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

export function clientFactory(http: HttpClient) {
  if (SiteConfigConstants.apiBaseuri) {
    return new namespaces.DemoWebApi_Controllers_Client.Heroes(SiteConfigConstants.apiBaseuri, http);
  }

  const _baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
  return new namespaces.DemoWebApi_Controllers_Client.Heroes(_baseUri + 'webapi/', http);

}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
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
      provide: namespaces.DemoWebApi_Controllers_Client.Heroes,
      useFactory: clientFactory,
      deps: [HttpClient],

    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
