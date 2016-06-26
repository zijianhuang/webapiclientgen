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
    array2d: number[][];
    constructor(
        private router: Router,
        private entitiesService: DemoWebApi_Controllers_Client.Entities) {
    }
    ngOnInit() {
        this.entitiesService.getPerson(100).subscribe(d => this.myName = d.name);
        
    }
}
