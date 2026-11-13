import Link from "next/link";
import { getContent } from "@/lib/content";
import { site } from "@/lib/site";

export default function NotFound() {
  const en = getContent("en");
  const es = getContent("es");
  return (
    <main className="wrap error-page">
      <p>404 · {site.name}</p>
      <h1>{en.ui.notFound}</h1>
      <p lang="es">{es.ui.notFound}</p>
      <div className="hero-actions">
        <Link href="/en">{en.ui.returnHome}</Link>
        <Link href="/es" lang="es">
          {es.ui.returnHome}
        </Link>
      </div>
    </main>
  );
}
