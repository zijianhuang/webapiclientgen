import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from '../ngmd.module';
import { DemoWebApi_Controllers_Client, DemoWebApi_DemoData_Client } from '../../clientapi/WebApiCoreNG2FormGroupClientAuto';

@Component({
  selector: 'app-data-detail',
  imports: [		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NGMDModule,	],
  templateUrl: './data-detail.component.html',
  styleUrl: './data-detail.component.css',
})
export class DataDetailComponent {
  form: FormGroup<DemoWebApi_DemoData_Client.IntegralEntityFormProperties>;

  constructor(){
    this.form = DemoWebApi_DemoData_Client.CreateIntegralEntityFormGroup();
  }
  ngOnInit(): void {
  }

  submit(): void {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
