interface API_Config {
	apiBaseUri?: string;
}

declare const API_CONFIG: API_Config

export const APIConfigConstants: API_Config = {
	...(typeof API_CONFIG === 'undefined' ? {} : API_CONFIG),
}
