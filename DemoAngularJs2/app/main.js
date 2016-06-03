"use strict";
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
// Imports for loading & configuring the in-memory web api
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
//import { InMemoryDataService }               from './in-memory-data.service';
// The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_2 = require('@angular/http');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_2.HTTP_PROVIDERS,
    core_1.provide(http_1.XHRBackend, { useClass: angular2_in_memory_web_api_1.InMemoryBackendService }),
]);
//# sourceMappingURL=main.js.map