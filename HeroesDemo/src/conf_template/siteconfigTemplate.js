const SITE_CONFIG = {
	apiBaseUri: '$apiBaseUri',
	themesDic: {
		"assets/themes/azure-blue.css": { display: "Azure & Blue", dark: false },
		"assets/themes/rose-red.css": { display: "Roes & Red", dark: false },
		"assets/themes/magenta-violet.css": { display: "Magenta & Violet", dark: true },
		"assets/themes/cyan-orange.css": { display: "Cyan & Orange", dark: true }
	},
	themeLoaderSettings: {
		storageKey: 'app.theme',
		themeLinkId: 'theme',
		appColorsDir: 'conf/',
		appColorsLinkId: 'app-colors',
		colorsCss: 'colors.css',
		colorsDarkCss: 'colors-dark.css'
	}
}
