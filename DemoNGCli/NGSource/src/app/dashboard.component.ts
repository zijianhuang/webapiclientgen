import { Component, OnInit, Injectable, Inject } from '@angular/core';

import * as namespaces from '../clientapi/WebApiNG2ClientAuto';
//import DemoWebApi_Controllers_Client = namespaces.DemoWebApi_Controllers_Client;

@Component({
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: namespaces.DemoWebApi_Controllers_Client.Hero[] = [];

    constructor( @Inject(namespaces.DemoWebApi_Controllers_Client.Heroes) private heroService: namespaces.DemoWebApi_Controllers_Client.Heroes) { }

    ngOnInit(): void {
        this.heroService.get()
            .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    }
}
