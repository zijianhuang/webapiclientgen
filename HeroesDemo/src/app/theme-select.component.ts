import {
	ChangeDetectionStrategy,
	Component,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeDef } from '../environments/themeDef';
import { MatFormField, MatLabel, MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { ThemeLoader } from './themeLoader';
import { AppConfigConstants } from '../environments/environment.common';
import { RouterModule } from '@angular/router';

/**
 * Use material select to pick a theme.
 */
@Component({
	selector: 'theme-select',
	templateUrl: 'theme-select.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatIconModule, MatButtonModule, RouterModule, MatFormField, MatSelect, MatLabel, MatOption,
		MatTooltipModule, MatMenuModule
	]
})
export class ThemeSelect  {
	themes?: ThemeDef[];

	get currentTheme() {
		return ThemeLoader.selectedTheme;
	}

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
	}

	themeSelectionChang(e: MatSelectChange) {
		ThemeLoader.loadTheme(e.value);
	}
}