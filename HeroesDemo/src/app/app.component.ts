
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from './ngmd.module';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { MatSelectChange } from '@angular/material/select';
import { ThemeLoader } from './themeLoader';
import { AppConfigConstants } from 'src/environments/environment.common';
import { ThemeDef } from 'src/environments/themeDef';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		NGMDModule,
		MessagesComponent
	],
})
export class AppComponent {
	title = 'Tour of Heroes';

	themes?: ThemeDef[];

	currentTheme: string | null;

	constructor() {
		this.themes = AppConfigConstants.themesDic ? Object.keys(AppConfigConstants.themesDic).map(k => {
			const c = AppConfigConstants.themesDic![k];
			const obj: ThemeDef = {
				display: c.display,
				filePath: k,
				dark: c.dark
			};
			return obj;
		}) : undefined;

		this.currentTheme = ThemeLoader.selectedTheme;
	}

	themeSelectionChang(e: MatSelectChange) {
		ThemeLoader.loadTheme(e.value);
	}
}
