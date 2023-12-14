import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DemoWebApi_Controllers_Client, DemoWebApi_DemoData_Client } from '../../clientapi/WebApiCoreNG2FormGroupClientAuto';

export interface HeroWithNestedFormProperties extends DemoWebApi_Controllers_Client.HeroFormProperties {
    address?: FormGroup<DemoWebApi_DemoData_Client.AddressFormProperties>,
    phoneNumbers?: FormArray<FormGroup<DemoWebApi_DemoData_Client.PhoneNumberFormProperties>>,
}

export function CreateHeroWithNestedFormGroup() {
    const fg: FormGroup<HeroWithNestedFormProperties> = DemoWebApi_Controllers_Client.CreateHeroFormGroup();
    fg.controls.address = DemoWebApi_DemoData_Client.CreateAddressFormGroup();
    fg.controls.phoneNumbers = new FormArray<FormGroup<DemoWebApi_DemoData_Client.PhoneNumberFormProperties>>([]);
    return fg;
}

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    hero?: DemoWebApi_Controllers_Client.Hero;
    heroForm: FormGroup<HeroWithNestedFormProperties>;
    constructor(
        private heroService: DemoWebApi_Controllers_Client.Heroes,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.heroForm = CreateHeroWithNestedFormGroup();
    }
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            const id = +params['id'];
            this.heroService.getHero(id).subscribe({
                next: hero => {
                    if (hero) {
                        this.hero = hero;
                        this.heroForm.patchValue(hero); // populate properties including composit ones except nested array.
                        if (this.hero.phoneNumbers) {
                            this.hero.phoneNumbers.forEach(d => {
                                const g = DemoWebApi_DemoData_Client.CreatePhoneNumberFormGroup();
                                g.patchValue(d);
                                this.heroForm.controls.phoneNumbers?.push(g);
                            });
                        }
                    }
                },
                error: error => alert(error)
            });
        });
    }

    save(): void {
        const raw: DemoWebApi_Controllers_Client.Hero = this.heroForm.getRawValue(); // nested array included.
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

    addPhoneNumber() {
        var n = DemoWebApi_DemoData_Client.CreatePhoneNumberFormGroup();
        this.heroForm.controls.phoneNumbers?.push(n);
    }

    removePhoneNumber(pg: FormGroup<DemoWebApi_DemoData_Client.PhoneNumberFormProperties>) {
        const idx = this.heroForm.controls.phoneNumbers?.controls.indexOf(pg);
        if (idx != undefined) {
            this.heroForm.controls.phoneNumbers?.removeAt(idx);
        }
    }
}
