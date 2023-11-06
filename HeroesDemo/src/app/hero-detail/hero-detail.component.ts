import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { DemoWebApi_Controllers_Client, } from '../../clientapi/WebApiCoreNG2FormGroupClientAuto';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: DemoWebApi_Controllers_Client.Hero;
  heroForm: FormGroup<DemoWebApi_Controllers_Client.HeroFormProperties>; // Strongly typed FormGroup may be coming in NG 12
  constructor(
    private heroService: DemoWebApi_Controllers_Client.Heroes,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.heroForm = DemoWebApi_Controllers_Client.CreateHeroFormGroup();//  this.CreateModelForm();
  }
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];
      this.heroService.getHero(id).subscribe({
        next: hero => {
          if (hero) {
            this.hero = hero;
            this.heroForm.patchValue(hero);
          }
        },
        error: error => alert(error)
      });
    });
  }

  //private CreateModelForm() {
  //  return new FormGroup({
  //    id: new FormControl<string | undefined>(undefined),
  //    name: new FormControl<string|undefined>(undefined),
  //    dob: new FormControl<Date | undefined>(undefined),
  //    death: new FormControl<Date | undefined>(undefined),
  //  });
  //}

  save(): void {
    const raw: DemoWebApi_Controllers_Client.Hero = this.heroForm.getRawValue();
    this.heroService.put(raw).subscribe(
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
