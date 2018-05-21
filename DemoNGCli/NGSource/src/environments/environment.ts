// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// When testing ASP.NET Web API and .NET Core Web API, alter siteconfig.js accordingly: port 10965 or 5000

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
