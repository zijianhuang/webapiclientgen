import { AppConfigConstants } from "../environments/environment.common"; //just for typed

/**
 * Helper class to load default theme or selected theme among themes defined in app startup settings.
 * index.html should not have the theme css link during design time.
 * In addition to the main theme which could be one the prebuilt themes reusable across apps, like one of those of Angular Material, 
 * the app may optionally has its own app css file for colors.
 */
export class ThemeLoader {
	private static readonly settings = AppConfigConstants.themeLoaderSettings;

	/**
	 * selected theme file name saved in localStorage.
	 */
	static get selectedTheme(): string | null {
		return this.settings ? localStorage.getItem(this.settings.storageKey) : null;
	};
	private static set selectedTheme(v: string) {
		if (this.settings) {
			localStorage.setItem(this.settings.storageKey, v);
		}
	};

	/**
	 * Load default or previously selected theme during app startup, typically used before calling `bootstrapApplication()`.
	 */
	static init(){
		this.loadTheme(this.selectedTheme);
	}

	/**
	 * Load theme during operation through `ThemeLoader.loadTheme(themeDicKey);`.
	 * @param picked one of the prebuilt themes, typically used with the app's theme picker.
	 */
	static loadTheme(picked: string | null) {
		if (!AppConfigConstants.themesDic || !this.settings || Object.keys(AppConfigConstants.themesDic).length === 0) {
			console.error('AppConfigConstants need to have themesDic with at least 1 item, and themeKeys.');
			return;
		}

		let themeLink = document.getElementById(this.settings.themeLinkId) as HTMLLinkElement;
		if (themeLink) { // app has been loaded in the browser page/tab.
			const currentTheme = themeLink.href.substring(themeLink.href.lastIndexOf('/') + 1);
			const notToLoad = picked == currentTheme;
			if (notToLoad) {
				return;
			}

			const themeValue = AppConfigConstants.themesDic[picked!];
			if (!themeValue) {
				return;
			}

			themeLink.href = picked!;
			this.selectedTheme = picked!;
			console.info(`theme altered to ${picked}.`);

			if (this.settings.appColorsLinkId) {
				let appColorsLink = document.getElementById(this.settings.appColorsLinkId) as HTMLLinkElement;
				if (appColorsLink) {
					if (themeValue.dark != null && this.settings.colorsDarkCss && this.settings.colorsCss) {
						const customFile = themeValue.dark ? this.settings.colorsDarkCss : this.settings.colorsCss;
						appColorsLink.href = (this.settings.appColorsDir ?? '') + customFile;
					} else if (this.settings.colorsCss) {
						appColorsLink.href = (this.settings.appColorsDir ?? '') + this.settings.colorsCss;
					}
				}
			}
		} else { // when app is loaded for the first time, then create 
			themeLink = document.createElement('link');
			themeLink.id = this.settings.themeLinkId;
			themeLink.rel = 'stylesheet';
			const themeDicKey = picked ?? Object.keys(AppConfigConstants.themesDic!)[0];
			themeLink.href = themeDicKey;
			document.head.appendChild(themeLink);
			this.selectedTheme = themeDicKey;
			console.info(`Initially loaded theme ${themeDicKey}`);

			if (this.settings.appColorsLinkId) {
				const appColorsLink = document.createElement('link');
				appColorsLink.id = this.settings.appColorsLinkId;
				appColorsLink.rel = 'stylesheet';
				const themeValue = AppConfigConstants.themesDic[themeDicKey];
				if (themeValue.dark != null && this.settings.colorsDarkCss && this.settings.colorsCss) {
					const customFile = themeValue.dark ? this.settings.colorsDarkCss : this.settings.colorsCss;
					appColorsLink.href = (this.settings.appColorsDir ?? '') + customFile;
				} else if (this.settings.colorsCss) {
					appColorsLink.href = (this.settings.appColorsDir ?? '') + this.settings.colorsCss;
				}

				if (appColorsLink.href) {
					document.head.appendChild(appColorsLink);
					console.info(`appColors ${appColorsLink} loaded.`)
				} else {
					console.warn(`With appColorsLinkId defined, dark&colorsCss&colorDarkCss or colorsCss should be defined.`)
				}
			}
		}
	}
}
