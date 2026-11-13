"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { localeCookie, type Locale } from "@/lib/i18n";

export function LanguageSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const target = locale === "en" ? "es" : "en";
  return (
    <Button variant="ghost" size="sm" asChild className="language-switch">
      <Link
        href={`/${target}`}
        hrefLang={target}
        aria-label={label}
        onClick={() => {
          document.cookie = `${localeCookie}=${target}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
        }}
      >
        <Languages aria-hidden="true" />
        <span lang={target}>{target.toUpperCase()}</span>
      </Link>
    </Button>
  );
}
