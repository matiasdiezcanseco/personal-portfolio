export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookie = "portfolio-locale";

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

/** Browser preference negotiation, including regional tags and weighted fallbacks. */
export function resolveLocale(
  acceptLanguage: string | null,
  preference?: string,
): Locale {
  if (isLocale(preference)) return preference;
  const candidates = (acceptLanguage ?? "")
    .split(",")
    .map((entry, index) => {
      const [tag, ...parameters] = entry.trim().split(";");
      const quality = parameters.find((parameter) =>
        parameter.trim().startsWith("q="),
      );
      const weight = quality ? Number(quality.trim().slice(2)) : 1;
      return { locale: tag.toLowerCase().split("-")[0], weight, index };
    })
    .filter(
      ({ weight }) => Number.isFinite(weight) && weight > 0 && weight <= 1,
    )
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  const match = candidates.find(({ locale }) => isLocale(locale))?.locale;
  return isLocale(match) ? match : defaultLocale;
}
