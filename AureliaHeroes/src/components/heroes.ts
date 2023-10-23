import {DemoWebApi_Controllers_Client} from '../clientapi/WebApiCoreAureliaClientAuto';
import { Router } from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, DemoWebApi_Controllers_Client.Heroes)
export class HeroesComponent {
    heroes?: DemoWebApi_Controllers_Client.Hero[];
    selectedHero?: DemoWebApi_Controllers_Client.Hero;
    private heroName: HTMLInputElement;

    constructor(private router: Router, private heroesService: DemoWebApi_Controllers_Client.Heroes) { 
    }

    getHeroes(): void {
        this.heroesService.getHeros().then(
            heroes => {
                this.heroes = heroes;
            }
        );
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroesService.post(name).then(
            hero => {
                this.heroes?.push(hero);
                this.selectedHero = undefined;
            });
    }

    delete(hero: DemoWebApi_Controllers_Client.Hero): void {
        this.heroesService.delete(hero.id!).then(
            () => {
                this.heroes = this.heroes?.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = undefined; }
            });
    }

    created() {
        this.getHeroes();
    }

    onSelect(hero: DemoWebApi_Controllers_Client.Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigateToRoute('/detail', this.selectedHero?.id);
    }

    addAndClear(){
        this.add(this.heroName.value); 
        this.heroName.value='';
    }

}
