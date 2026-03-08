import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { DemoWebApi_Controllers_Client, DemoWebApi_DemoData_Client } from '../../clientapi/WebApiCoreNG2FormGroupClientAuto';


@Component({
	selector: 'app-data-detail',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
	],
	templateUrl: './codex-detail.component.html',
	styleUrl: '../data-detail/data-detail.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodexDetailComponent {
	readonly form = DemoWebApi_DemoData_Client.CreateMixedDataEntityFormGroup();

	private readonly focused: Record<keyof DemoWebApi_DemoData_Client.MixedDataEntity, boolean> = {
		byte: false,
		int: false,
		itemCount: false,
		sByte: false,
		short: false,
		uInt: false,
		uShort: false,
		dob: false,
		emailAddress: false,
		name: false,
		web: false,
	};

	setFocused(field: keyof DemoWebApi_DemoData_Client.MixedDataEntity, isFocused: boolean): void {
		this.focused[field] = isFocused;
	}

	isFocused(field: keyof DemoWebApi_DemoData_Client.MixedDataEntity): boolean {
		return this.focused[field];
	}

	control(name: keyof DemoWebApi_DemoData_Client.MixedDataEntity): FormControl {
		return this.form.controls[name] as FormControl;
	}

	shouldShowError(name: keyof DemoWebApi_DemoData_Client.MixedDataEntity): boolean {
		const c = this.control(name);
		return c.invalid && (c.dirty || c.touched);
	}

	errorMessage(name: keyof DemoWebApi_DemoData_Client.MixedDataEntity): string {
		const c = this.control(name);

		if (c.hasError('required')) return 'This field is required.';
		if (c.hasError('email')) return 'Invalid email format.';
		if (c.hasError('minlength')) {
			const requiredLength = c.getError('minlength')?.requiredLength;
			return `Minimum length is ${requiredLength}.`;
		}
		if (c.hasError('maxlength')) {
			const requiredLength = c.getError('maxlength')?.requiredLength;
			return `Maximum length is ${requiredLength}.`;
		}
		if (c.hasError('min')) {
			const min = c.getError('min')?.min;
			return `Value must be >= ${min}.`;
		}
		if (c.hasError('max')) {
			const max = c.getError('max')?.max;
			return `Value must be <= ${max}.`;
		}
		if (c.hasError('pattern')) return 'Invalid format.';

		return 'Invalid value.';
	}

	submit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const value = this.form.getRawValue() as DemoWebApi_DemoData_Client.MixedDataEntity;
		console.log('MixedDataEntity submitted:', value);
	}
}
