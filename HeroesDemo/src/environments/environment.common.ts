import { ThemeLoaderSettings, ThemesDic } from "./themeDef"

interface Site_Config {
	apiBaseUri?: string,
	themesDic?: ThemesDic,
	themeLoaderSettings?: ThemeLoaderSettings
}

interface AppConfigConstantsType extends Site_Config {
}

declare const SITE_CONFIG: AppConfigConstantsType

export const AppConfigConstants: AppConfigConstantsType = {
	...(typeof SITE_CONFIG === 'undefined' ? {} : SITE_CONFIG),
}
