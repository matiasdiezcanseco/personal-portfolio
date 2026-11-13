import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    alternates: {
      languages: {
        en: `${site.url}/en`,
        es: `${site.url}/es`,
        "x-default": site.url,
      },
    },
  }));
}
