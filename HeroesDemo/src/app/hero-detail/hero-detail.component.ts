import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DemoWebApi_Controllers_Client, DemoWebApi_DemoData_Client, InnerOfFormGroup } from '../../clientapi/WebApiCoreNG2FormGroupClientAuto';
import { NGMDModule } from '../ngmd.module';

type HeroFormProperties = InnerOfFormGroup<ReturnType<typeof DemoWebApi_Controllers_Client.CreateHeroFormGroup>>;

export interface HeroWithNestedFormProperties extends HeroFormProperties {
    address?: ReturnType<typeof DemoWebApi_DemoData_Client.CreateAddressFormGroup>,
    phoneNumbers?: FormArray<ReturnType<typeof DemoWebApi_DemoData_Client.CreatePhoneNumberFormGroup>>,
}

export function CreateHeroWithNestedFormGroup() {
    const fg: FormGroup<HeroWithNestedFormProperties> = DemoWebApi_Controllers_Client.CreateHeroFormGroup();
    fg.controls.address = DemoWebApi_DemoData_Client.CreateAddressFormGroup();
    fg.controls.phoneNumbers = new FormArray<ReturnType<typeof DemoWebApi_DemoData_Client.CreatePhoneNumberFormGroup>>([]);
    return fg;
}

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NGMDModule,	
	],
})
export class HeroDetailComponent implements OnInit {
    hero?: DemoWebApi_Controllers_Client.Hero;
    heroForm= CreateHeroWithNestedFormGroup();
    constructor(
        private heroService: DemoWebApi_Controllers_Client.Heroes,
        private route: ActivatedRoute,
        private location: Location,
        private ref: ChangeDetectorRef,
    ) {

    }
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            const id = +params['id'];
            this.heroService.getHero(id.toString()).subscribe({
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

                        this.ref.detectChanges();
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
                        this.ref.detectChanges();
   }

    removePhoneNumber(pg: ReturnType<typeof DemoWebApi_DemoData_Client.CreatePhoneNumberFormGroup>) {
        const idx = this.heroForm.controls.phoneNumbers?.controls.indexOf(pg);
        if (idx != undefined) {
            this.heroForm.controls.phoneNumbers?.removeAt(idx);
                         this.ref.detectChanges();
      }
    }

    getMinLengthErrorsText(errors: ValidationErrors | null) {
        if (!errors) {
            return '';
        }

        if (errors['minlength']) {
            return 'Min length: ' + errors['minlength']['requiredLength'];
        }

        return '';
    }

    getMaxLengthErrorsText(errors: ValidationErrors | null) {
        if (!errors) {
            return '';
        }

        if (errors['maxlength']) {
            return 'Max length: ' + errors['maxlength']['requiredLength'];
        }

        return '';
    }

    getErrorsText(errors: ValidationErrors | null | undefined) {
        if (!errors) {
            return '';
        }

        const lines: string[] = [];
        for (const epn in errors) {
            switch (epn) {
                case 'minlength':
                    lines.push('Min length: ' + errors['minlength']['requiredLength']);
                    break;
                case 'maxlength':
                    lines.push('Max length: ' + errors['maxlength']['requiredLength']);
                    break;
                case 'email':
                    lines.push('Invalid Email address format'); //value is boolean false.
                    break;
                case 'pattern':
                    lines.push('Invalid Web URL'); //value is requiredPattern and actualValue.
                    break;
                default:
                    // print json text of the error during development
                    break;
            }
        }

        return lines.join('; ');
    }

    allNestedValid(fg: FormGroup): boolean {
        for (const cn in fg.controls) {
            if (fg.controls[cn] instanceof FormGroup) { //also work well with FormArray
                const r = this.allNestedValid(fg.controls[cn] as FormGroup);
                if (!r) {
                    return false;
                }
            } else {
                if (fg.controls[cn].invalid) {
                    return false;
                }
            }
        }

        return fg.valid;
    }
}
