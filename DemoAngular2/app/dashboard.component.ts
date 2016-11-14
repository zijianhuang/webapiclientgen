import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


import * as model from '../clientapi/WebApiNG2ClientAuto';
import DemoWebApi_Controllers_Client = model.DemoWebApi_Controllers_Client;
import { HeroService } from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: DemoWebApi_Controllers_Client.Hero[] = [];

    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }
}
