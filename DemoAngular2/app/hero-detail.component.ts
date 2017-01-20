import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import * as namespaces from '../clientapi/WebApiNG2ClientAuto';
import DemoWebApi_Controllers_Client = namespaces.DemoWebApi_Controllers_Client;
@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    hero: DemoWebApi_Controllers_Client.Hero;
    constructor(
        private heroService: DemoWebApi_Controllers_Client.Heroes,
        private route: ActivatedRoute,
        private location: Location
    ) { }
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.heroService.getById(id)
                .subscribe(hero => this.hero = hero);
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