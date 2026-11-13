import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";
import "../portfolio.css";
import "../implementation.css";

const manrope = localFont({
  src: "../../../public/fonts/manrope-latin-variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "400 800",
});

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const image = `/brand/og-${locale}.png`;
  return {
    metadataBase: new URL(site.url),
    title: c.meta.title,
    description: c.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es", "x-default": "/" },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      title: c.meta.title,
      description: c.meta.description,
      url: `/${locale}`,
      siteName: site.name,
      locale: locale === "es" ? "es_PE" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_PE"],
      images: [{ url: image, width: 1200, height: 630, alt: c.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
      images: [image],
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale}
      className={`${manrope.variable} dark`}
      data-type="software"
    >
      <body>{children}</body>
    </html>
  );
}
