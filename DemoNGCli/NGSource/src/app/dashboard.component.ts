import { Component, Inject, OnInit } from '@angular/core';
import * as namespaces from '../clientapi/WebApiCoreNg2ClientAuto';

@Component({
	selector: 'my-dashboard',
	templateUrl: 'dashboard.component.html',
	styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	heroes: namespaces.DemoWebApi_Controllers_Client.Hero[] = [];

	constructor(private heroService: namespaces.DemoWebApi_Controllers_Client.Heroes) { }

	ngOnInit(): void {
		this.heroService.getHeros().subscribe(
			{
				next: heroes => {
					if (heroes) {
						this.heroes = heroes.slice(1, 5);
					}
				},
				error: error => console.error(error)
			}
		);
	}
}
