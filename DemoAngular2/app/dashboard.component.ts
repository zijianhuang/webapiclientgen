import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


import * as namespaces from '../clientapi/WebApiNG2ClientAuto';
import DemoWebApi_Controllers_Client = namespaces.DemoWebApi_Controllers_Client;

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: DemoWebApi_Controllers_Client.Hero[] = [];

    constructor(private heroService: DemoWebApi_Controllers_Client.Heroes) { }

    ngOnInit(): void {
        this.heroService.get()
            .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    }
}
