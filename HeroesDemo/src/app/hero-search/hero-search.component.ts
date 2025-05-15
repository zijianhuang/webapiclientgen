import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import * as namespaces from '../../clientapi/WebApiCoreNG2FormGroupClientAuto';

@Component({
    selector: 'app-hero-search',
    templateUrl: 'hero-search.component.html',
    styleUrls: ['hero-search.component.css'],
    standalone: false
})
export class HeroSearchComponent implements OnInit {
  heroes?: Observable<namespaces.DemoWebApi_Controllers_Client.Hero[] | null>;
  private searchTerms = new Subject<string>();
  constructor(
    private heroSearchService: namespaces.DemoWebApi_Controllers_Client.Heroes,
    private router: Router) { }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes = this.searchTerms.pipe(
      debounceTime(300)        // wait for 300ms pause in events
      , distinctUntilChanged()   // ignore if next search term is same as previous
      , switchMap((term: string) => {
        if (term) {
          return this.heroSearchService.search(term);
        } else {
          return of([]);
        }
      }));
  }
  gotoDetail(hero: namespaces.DemoWebApi_Controllers_Client.Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
