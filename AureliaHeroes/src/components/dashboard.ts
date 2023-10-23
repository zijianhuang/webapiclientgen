import { HttpClient } from 'aurelia-fetch-client';
import {DemoWebApi_Controllers_Client} from 'clientapi/WebApiCoreAureliaClientAuto';

import {inject} from 'aurelia-framework';

@inject(DemoWebApi_Controllers_Client.Heroes)
export class DashboardComponent {
  heroes: DemoWebApi_Controllers_Client.Hero[] = [];

  constructor(private heroesSerrvice: DemoWebApi_Controllers_Client.Heroes) { 
  }

  created() {
    this.heroesSerrvice.getHeros().then(
      heroes => {
        this.heroes = heroes.slice(1, 5);
      }
    ).catch(error => console.error(error));
  }
}
