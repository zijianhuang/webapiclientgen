import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ThemeLoader } from 'theme-loader-api';

if (environment.production) {
  enableProdMode();
}

console.debug(`Main Startup selectedTheme: ${ThemeLoader.selectedTheme}`);
ThemeLoader.init();

bootstrapApplication(AppComponent, {...appConfig, providers: [provideZonelessChangeDetection(), ...appConfig.providers]})
.catch(err => console.error(err));

