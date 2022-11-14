// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare const SITE_CONFIG: {
  apiBaseuri?: string;
}

interface SiteConfigConstantsType {
  apiBaseuri?: string;
}

export const environment = {
  production: false
};

export const SiteConfigConstants: SiteConfigConstantsType = {

  ...(typeof SITE_CONFIG === 'undefined' ? {} : SITE_CONFIG),
}
