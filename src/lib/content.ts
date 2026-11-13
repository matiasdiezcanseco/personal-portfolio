import "server-only";
import en from "@/content/en.json";
import es from "@/content/es.json";
import type { Locale } from "@/lib/i18n";

export type PortfolioContent = typeof en;
const dictionaries: Record<Locale, PortfolioContent> = { en, es };

export function getContent(locale: Locale): PortfolioContent {
  return dictionaries[locale];
}
