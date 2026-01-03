import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as namespaces from '../../clientapi/WebApiCoreNG2FormGroupClientAuto';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from '../ngmd.module';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NGMDModule
  ],
})
export class HeroesComponent implements OnInit {
  heroes?: namespaces.DemoWebApi_Controllers_Client.Hero[];
  selectedHero?: namespaces.DemoWebApi_Controllers_Client.Hero;
  constructor(
    private heroService: namespaces.DemoWebApi_Controllers_Client.Heroes,
    private router: Router,
    private ref: ChangeDetectorRef) { }
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => {
        this.heroes = heroes;
        this.ref.detectChanges();
      }
    );
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.post(name).subscribe(
      hero => {
        this.heroes?.push(hero);
        this.selectedHero = undefined;
        this.ref.detectChanges();
      });
  }
  delete(hero: namespaces.DemoWebApi_Controllers_Client.Hero): void {
    this.heroService.delete(hero.id!).subscribe(
      () => {
        this.heroes = this.heroes?.filter(h => h !== hero);
        if (this.selectedHero === hero) 
          { this.selectedHero = undefined; }

        this.ref.detectChanges();
      });
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(hero: namespaces.DemoWebApi_Controllers_Client.Hero): void {
    this.selectedHero = hero;
    this.ref.detectChanges();
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero?.id]);
  }

}
