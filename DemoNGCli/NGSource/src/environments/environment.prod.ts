declare const SITE_CONFIG: {
  apiBaseuri?: string;
}

interface SiteConfigConstantsType {
  apiBaseuri?: string;
}

export const environment = {
  production: true
};

export const SiteConfigConstants: SiteConfigConstantsType = {

  ...(typeof SITE_CONFIG === 'undefined' ? {} : SITE_CONFIG),
}
