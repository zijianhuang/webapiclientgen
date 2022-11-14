import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import * as namespaces from '../../clientapi/WebApiCoreNg2ClientAuto';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: namespaces.DemoWebApi_Controllers_Client.Hero;
  heroForm: FormGroup; // Strongly typed FormGroup may be coming in NG 12
  constructor(
    private heroService: namespaces.DemoWebApi_Controllers_Client.Heroes,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.heroForm = this.CreateModelForm();
  }
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];
      this.heroService.getHero(id).subscribe(
        hero => {
          if (hero) {
            this.hero = hero;
            this.heroForm.patchValue(hero);
          }
        },
        error => alert(error)
      );
    });
  }

  private CreateModelForm() {
    return new FormGroup({
      id: new FormControl<string | undefined>(undefined),
      name: new FormControl<string|undefined>(undefined),
      dob: new FormControl<Date | undefined>(undefined),
      death: new FormControl<Date | undefined>(undefined),
    });
  }

  save(): void {
    //const raw = this.heroForm.getRawValue();
    //this.heroService.put(raw).subscribe(
    //  () => {
    //  },
    //  error => alert(error)
    //);

    this.heroService.put(this.hero).subscribe(
      {
        next: d => {
          console.debug('response: ' + JSON.stringify(d));
        },
        error: error => alert(error)
      }
    );
  }
  goBack(): void {
    this.location.back();
  }

}
