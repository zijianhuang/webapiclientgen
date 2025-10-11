import { Component, Inject, OnInit } from '@angular/core';
import * as namespaces from '../../clientapi/WebApiCoreNG2FormGroupClientAuto';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from '../ngmd.module';
import { RouterModule } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [
      CommonModule,
      RouterModule, 
      FormsModule,
      ReactiveFormsModule,
      NGMDModule,	

      HeroSearchComponent,
    ],
})
export class DashboardComponent implements OnInit {
  heroes: namespaces.DemoWebApi_Controllers_Client.Hero[] = [];

  constructor(private heroService: namespaces.DemoWebApi_Controllers_Client.Heroes) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(
      {
        next: heroes => {
          this.heroes = heroes.slice(1, 5);
        },
        error: error => console.error(error)
      }
    );
  }
}
