import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import {
	MatAutocompleteModule
} from '@angular/material/autocomplete';
import {
	MatBadgeModule
} from '@angular/material/badge';
import {
	MatBottomSheetModule
} from '@angular/material/bottom-sheet';
import {
	MatButtonModule
} from '@angular/material/button';
import {
	MatButtonToggleModule
} from '@angular/material/button-toggle';
import {
	MatCardModule
} from '@angular/material/card';
import {
	MatCheckboxModule
} from '@angular/material/checkbox';
import {
	MatChipsModule
} from '@angular/material/chips';
import { DateAdapter, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'; //MD tutorial site use this.
import {
	MatDatepickerModule
} from '@angular/material/datepicker';
import {
	MatDialogModule
} from '@angular/material/dialog';
import {
	MatExpansionModule
} from '@angular/material/expansion';
import {
	MatGridListModule
} from '@angular/material/grid-list';
import {
	MatIconModule
} from '@angular/material/icon';
import {
	MatInputModule
} from '@angular/material/input';
import {
	MatListModule, MAT_LIST_CONFIG
} from '@angular/material/list';
import {
	MatMenuModule
} from '@angular/material/menu';
import {
	MatPaginatorModule
} from '@angular/material/paginator';
import {
	MatProgressBarModule
} from '@angular/material/progress-bar';
import {
	MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import {
	MatRadioModule
} from '@angular/material/radio';
import {
	MatSelectModule
} from '@angular/material/select';
import {

	MatSidenavModule
} from '@angular/material/sidenav';
import {
	MatSliderModule
} from '@angular/material/slider';
import {
	MatSnackBarModule
} from '@angular/material/snack-bar';
import {
	MatSortModule
} from '@angular/material/sort';
import {
	MatStepperModule
} from '@angular/material/stepper';
import {
	MatTableModule
} from '@angular/material/table';
import {
	MatTabsModule, MAT_TABS_CONFIG
} from '@angular/material/tabs';
import {
	MatToolbarModule
} from '@angular/material/toolbar';
import {
	MatTooltipModule
} from '@angular/material/tooltip';

import {
	MatSlideToggleModule
} from '@angular/material/slide-toggle'
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({

	exports: [
		//CdkTableModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatBadgeModule,
		MatChipsModule,
		//MatCoreModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatBottomSheetModule,

		LayoutModule,
		MatStepperModule,
		ScrollingModule,
		CdkTreeModule,
		MatTreeModule,
		OverlayModule,
	],
	providers: [
		//{ provide: MAT_DIALOG_DATA, useValue: {} },
		//{ provide: MatDialogRef, useValue: {} }
		{ provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' }},
		
		//{ provide: MAT_DATE_LOCALE, useValue: 'en-AU' },By default, the MAT_DATE_LOCALE injection token will use the existing LOCALE_ID locale code from @angular/core.
		//If you want to override it, you can provide a new value for the MAT_DATE_LOCALE token

		// The adapter has to be provided to each lazy module which imports this module.
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false, strict: true } },
		{ provide: MAT_LIST_CONFIG, useValue: { hideSingleSelectionIndicator : true} }
		//the moment setting here works only for person.component, not invoiceBulkBill.component in which I have to declare providers there, more exactly, in dateInput Component.
		//`MomentDateAdapter` and`MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
		// `MatMomentDateModule` in your applications root module.

	]
})
export class NGMDModule { }
