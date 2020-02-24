import { Component, OnInit , Inject} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import * as namespaces from '../clientapi/WebApiNG2ClientAuto';

@Component({
	moduleId: module.id,
	selector: 'my-hero-detail',
	templateUrl: 'hero-detail.component.html',
	styleUrls: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
	hero: namespaces.DemoWebApi_Controllers_Client.Hero;
	constructor(
		@Inject(namespaces.DemoWebApi_Controllers_Client.Heroes) private heroService: namespaces.DemoWebApi_Controllers_Client.Heroes,
		private route: ActivatedRoute,
		private location: Location
	) { }
	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			this.heroService.getHero(id).subscribe(
				hero => this.hero = hero,
				error => console.error(error)
			);
		});
	}
	save(): void {
		this.heroService.put(this.hero)
			.subscribe(() => this.goBack());
	}
	goBack(): void {
		this.location.back();
	}
}
