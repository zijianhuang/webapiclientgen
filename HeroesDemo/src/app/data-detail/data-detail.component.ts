import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from '../ngmd.module';
import { DemoWebApi_Controllers_Client, DemoWebApi_DemoData_Client } from '../../clientapi/WebApiNG2FormGroupClientAuto';

@Component({
	selector: 'app-data-detail',
	imports: [CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NGMDModule,],
	templateUrl: './data-detail.component.html',
	styleUrl: './data-detail.component.css',
})
export class DataDetailComponent {

	form = DemoWebApi_DemoData_Client.CreateMixedDataEntityFormGroup();

	focused: string | null = null;
	constructor() {
	}
	ngOnInit(): void {
	}



	onFocus(field: string) {
		this.focused = field;
	}

	onBlur() {
		this.focused = null;
	}

	submit() {
		if (this.form.valid) {
			console.log(this.form.value);
		}
	}
}
