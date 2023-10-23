import {DemoWebApi_Controllers_Client} from '../clientapi/WebApiCoreAureliaClientAuto';
import { Router, RouterConfiguration, RouteConfig } from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, DemoWebApi_Controllers_Client.Heroes)
export class HeroDetailComponent {
  hero?: DemoWebApi_Controllers_Client.Hero;
  routeConfig?: RouteConfig;
 
  constructor(
    private router: Router,
    private heroesService: DemoWebApi_Controllers_Client.Heroes
  ) {
  }

  created(){

  }

  activate(params: any, routeConfig: RouteConfig) {
    this.routeConfig = routeConfig;
    const id = params.id;
    console.debug('service: ' + JSON.stringify(this.heroesService));
    this.heroesService.getHero(id).then(
      hero => {
        if (hero) {
          this.hero = hero;
          this.routeConfig.navModel.setTitle(this.hero.name);
        }
      }
    ).catch(error => alert(error));
  }

  save(): void {
    this.heroesService.put(this.hero).then(
      d => {
        console.debug('response: ' + JSON.stringify(d));
      }
    ).catch(error => alert(error));
  }

  goBack(): void {
    this.router.navigateBack();
  }

}
