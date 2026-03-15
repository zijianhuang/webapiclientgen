import { APIConfigConstants } from './src/testSettings';

const settingsPath = './apiConfigConstantsRemote.js';
console.info('settingsPath: '+ settingsPath);
const settings = await import(settingsPath);
console.info("settings: " + JSON.stringify(settings));
Object.assign(APIConfigConstants, settings.default);
console.info("API_CONFIG: " + APIConfigConstants.apiBaseUri);

