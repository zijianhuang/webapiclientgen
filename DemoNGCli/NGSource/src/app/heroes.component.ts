import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as namespaces from '../clientapi/WebApiNG2ClientAuto';
import DemoWebApi_Controllers_Client = namespaces.DemoWebApi_Controllers_Client;

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit {
    heroes: DemoWebApi_Controllers_Client.Hero[];
    selectedHero: DemoWebApi_Controllers_Client.Hero;
    constructor(
        @Inject(namespaces.DemoWebApi_Controllers_Client.Heroes)  private heroService: DemoWebApi_Controllers_Client.Heroes,
        private router: Router) { }
    getHeroes(): void {
        this.heroService
            .get()
            .subscribe(heroes => this.heroes = heroes);
    }
    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.post(name)
            .subscribe(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }
    delete(hero: DemoWebApi_Controllers_Client.Hero): void {
        this.heroService
            .delete(hero.id)
            .subscribe(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }
    ngOnInit(): void {
        this.getHeroes();
    }
    onSelect(hero: DemoWebApi_Controllers_Client.Hero): void {
        this.selectedHero = hero;
    }
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}
