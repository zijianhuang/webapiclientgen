import { HttpClient, provideHttpClient } from '@angular/common/http';
import * as namespaces from '../clientapi/WebApiCoreNG2FormGroupClientAuto';
import { SiteConfigConstants } from '../environments/environment';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export function clientFactory(http: HttpClient) {
    if (SiteConfigConstants.apiBaseuri) {
        console.debug('apiBaseuri:' + SiteConfigConstants.apiBaseuri)
        return new namespaces.DemoWebApi_Controllers_Client.Heroes(SiteConfigConstants.apiBaseuri, http);
    }

    const _baseUri = window.location.origin + '/';
    const webApiUrl = _baseUri + 'webapi/';
    console.debug('webApiUrl: ' + webApiUrl);
    return new namespaces.DemoWebApi_Controllers_Client.Heroes(webApiUrl, http);

}

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),

        provideRouter(routes),
        {
            provide: namespaces.DemoWebApi_Controllers_Client.Heroes,
            useFactory: clientFactory,
            deps: [HttpClient],
        }

    ]
};
