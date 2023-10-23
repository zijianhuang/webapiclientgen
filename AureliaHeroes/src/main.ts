import {Aurelia} from 'aurelia-framework';
import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import { HttpClient } from 'aurelia-fetch-client';
import {DemoWebApi_Controllers_Client} from 'clientapi/WebApiCoreAureliaClientAuto';

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  const c= new HttpClient();
  c.baseUrl='http://localhost:5000/';
  aurelia.container.registerInstance(DemoWebApi_Controllers_Client.Heroes, new DemoWebApi_Controllers_Client.Heroes(c));

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
