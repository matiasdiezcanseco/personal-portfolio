import { notFound } from "next/navigation";
import { Portfolio } from "@/components/portfolio";
import { getContent } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

// Render the complete document per request; content never depends on a client fetch.
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        url: site.url,
        jobTitle: content.hero.intro,
        sameAs: [site.github, site.linkedin],
        knowsLanguage: ["en", "es"],
        knowsAbout: content.skills.map((skill) => skill.title),
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/${locale}#profile`,
        url: `${site.url}/${locale}`,
        name: content.meta.title,
        description: content.meta.description,
        inLanguage: locale,
        mainEntity: { "@id": `${site.url}/#person` },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <noscript>
        <style>{`.work [data-slot="accordion-content"]{display:block!important}`}</style>
      </noscript>
      <Portfolio locale={locale} content={content} />
    </>
  );
}
