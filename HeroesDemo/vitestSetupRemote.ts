import 'zone.js'; 
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { APIConfigConstants } from './src/clientapi/testSettings';

const settingsPath = './apiConfigConstantsRemote.js';
console.info('settingsPath: '+ settingsPath);
const settings = await import(settingsPath);
console.info("settings: " + JSON.stringify(settings));
Object.assign(APIConfigConstants, settings.default);
console.info("API_CONFIG: " + APIConfigConstants.apiBaseUri);

TestBed.initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
