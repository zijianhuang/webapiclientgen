import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Container } from 'aurelia-dependency-injection';
import {inject} from 'aurelia-framework';

@inject(Container)
export class App {

  constructor(){
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Heroes';
    config.options.pushState = true;
    //config.options.root = '/';
    config.map([
      //{ route: '', redirect: '/dashboard' },
      { route: ['', 'dashboard'], moduleId: PLATFORM.moduleName('components/dashboard'), title: 'Dashboard', name: 'dashboard' },
      { route: 'heroes', moduleId: PLATFORM.moduleName('components/heroes'), title: 'Heroes', name: 'heroes' },
      { route: 'detail/:id', moduleId: PLATFORM.moduleName('components/hero-detail'), name: 'detail' },
    ]);
  }

  public message = 'Aurelia Heroes!';
}
