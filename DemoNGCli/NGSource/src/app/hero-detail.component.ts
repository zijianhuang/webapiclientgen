import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import * as namespaces from '../clientapi/WebApiCoreNg2ClientAuto';

@Component({
	moduleId: module.id,
	selector: 'my-hero-detail',
	templateUrl: 'hero-detail.component.html',
	styleUrls: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
	hero: namespaces.DemoWebApi_Controllers_Client.Hero;
	heroForm: FormGroup; // Strongly typed FormGroup may be coming in NG 12
	constructor(
		private heroService: namespaces.DemoWebApi_Controllers_Client.Heroes,
		private route: ActivatedRoute,
		private location: Location
	) {
		this.heroForm = this.CreateModelForm();
	}
	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			const id = +params['id'];
			this.heroService.getHero(id).subscribe(
				hero => {
					this.hero = hero;
					this.heroForm.patchValue(hero);
				},
				error => alert(error)
			);
		});
	}

	private CreateModelForm() {
		return new FormGroup({
			id: new FormControl(undefined),
			name: new FormControl(undefined)
		});
	}

	save(): void {
		const raw = this.heroForm.getRawValue();
		this.heroService.put(raw).subscribe(
			() => {
				this.goBack();
			},
			error => alert(error)
		);
	}
	goBack(): void {
		this.location.back();
	}
}
