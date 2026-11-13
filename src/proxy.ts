import { NextResponse, type NextRequest } from "next/server";
import { localeCookie, resolveLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const locale = resolveLocale(
    request.headers.get("accept-language"),
    request.cookies.get(localeCookie)?.value,
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  const response = NextResponse.redirect(url, 307);
  // The redirect is visitor-specific; do not let a CDN cache one visitor's language.
  response.headers.set("Vary", "Accept-Language, Cookie");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/"] };
