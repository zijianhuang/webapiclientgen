import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router-deprecated';
import {  DemoWebApi_DemoData_Client, DemoWebApi_Controllers_Client  } from '../clientapi/WebApiNG2ClientAuto';


@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    myName: string;
    constructor(
        private router: Router,
        private heroService: HeroService, private entitiesService: DemoWebApi_Controllers_Client.Entities) {
    }
    ngOnInit() {
        //this.heroService.getHeroes()
        //    .then(heroes => this.heroes = heroes.slice(1, 5));

        this.entitiesService.getPerson(100).subscribe(d => this.myName = d.name);
    }
    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero.id }];
        this.router.navigate(link);
    }
}
