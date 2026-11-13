# Matías Diez-Canseco

Personal portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS and shadcn/ui. The English and Spanish portfolio pages render on the server for every request. Content lives in the repository; there is no CMS, database or runtime content API.

## Run locally

Requires Node.js 22.13+ (Node.js 24 recommended) and npm.

```sh
npm ci
npm run dev
```

Visit http://localhost:3000. The root redirects to `/es` or `/en` using the browser's `Accept-Language` header. Unsupported languages fall back to English. Explicit language URLs always show that language. The language switch remembers a choice for one year in a first-party cookie and takes precedence on subsequent root visits. No environment variables are required.

## Production

```sh
npm run build
npm start
```

On a standalone Node.js host, use the build/start commands above. This is not a static export.

### Netlify

The root `netlify.toml` sets `npm run build`, publish directory `.next`, and Node.js 24. These settings override the old build command and publish directory saved in the Netlify UI. `.nvmrc` also selects Node.js 24 for local development and compatible build tools.

This existing Netlify site previously used Vite, so its Next.js adapter is explicitly enabled with `@netlify/plugin-nextjs` in `netlify.toml` and `devDependencies`. Automatic framework activation did not occur during migration: the first successful build uploaded raw `.next` files with no functions and returned 404 for every public route. Keep the adapter dependency updated with the framework.

The adapter packages SSR into Netlify Functions; it does not run `npm start` as a long-lived server. Do not restore the old SPA catch-all redirect to `/index.html`, which bypasses Next.js routing.

After deployment, check the root redirect for English and Spanish browser preferences, explicit `/en` and `/es` routes, static branding assets, and the CV download. Confirm the build log selects Node.js 24, `npm run build`, and `.next`.

## Content and design

- `src/content/en.json` and `src/content/es.json`: all portfolio copy and UI labels. Both files use the same structure.
- `src/lib/site.ts`: canonical production domain, contact details, social links and CV path.
- `src/components/portfolio.tsx`: server-rendered layout. The scroll-aware mobile header, language switch, mobile sheet, section index and work accordion add client interaction.
- `src/components/ui`: shadcn/ui Button, Badge, Accordion and Sheet, generated with the CLI and adapted for the approved design. The Sheet close label is localized.
- `src/app/portfolio.css`: approved black portfolio layout; `implementation.css` adapts it to the React primitives; `globals.css` defines Tailwind/shadcn tokens.
- `public/cv/matias-diez-canseco.pdf`: supplied original English CV, served locally. The Spanish page labels its download as an English CV.
- `design/black-portfolio`: approved design reference and content provenance; not part of the served application.

Employer/client names appear only in Experience. Personal projects are Grams, Yupana and Inklab, in that order. The two closed-source projects have no private repository links. Training is described as coursework, not official certification.

## Branding

The MDC wordmark uses actual Manrope glyph outlines, generated from the licensed local font into `src/lib/wordmark.json` and `public/brand/wordmark.svg`. The header and exported SVG use the same outlines. The M monogram is defined in `src/lib/brand.ts`. The black/white/blue system includes SVG, ICO, 180px Apple icon, 192px and 512px app icons, and localized 1200×630 sharing cards.

```sh
npm run brand
```

Regenerates committed assets in `public/brand`, `public/icon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, and the wordmark outlines in `src/lib/wordmark.json`. The site self-hosts a variable Manrope WOFF2 font; sharing cards and wordmark generation use a local 800-weight TTF. The SIL Open Font License is included in `public/fonts/OFL.txt`. Builds do not fetch fonts or generate images at runtime.

## SEO

Each locale includes its own title, description, HTML language, canonical URL, reciprocal `hreflang` alternatives, Open Graph/Twitter image, and Person/ProfilePage JSON-LD. Metadata is included in the initial HTML. `/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest` use Next.js metadata routes. The sitemap contains both locale URLs; unknown locales and pages return 404. The root language redirect is temporary and uncacheable to avoid sharing a visitor's language with another visitor.

The original PDF is excluded from crawler discovery in robots.txt; that is not access control. It remains publicly downloadable from the portfolio.

## Validation

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run test:deployment -- https://your-deploy-preview.netlify.app
npm audit
```

End-to-end tests start and stop a production server on port 3100. Locally they use installed Google Chrome; in CI they use Playwright Chromium (`npx playwright install --with-deps chromium`). Tests cover server-rendered locale content and SEO, assets, language preference, responsive layouts, mobile menu, keyboard dismissal, accordions and reading without JavaScript. Mobile navigation regressions verify that every selected section stays in view and receives focus after the sheet finishes closing, in both languages on phone and tablet layouts; ordinary dismissal still restores focus to the hamburger.

The hosted deployment smoke check verifies root language redirects, both server-rendered locale pages, the CV, a sharing image, and the sitemap against the supplied URL. A successful Netlify build alone is insufficient: run this check against the actual preview before merging.

A narrowly scoped minimatch override updates the development-only TypeScript ESLint dependency to its patched release. Keep it under review when updating eslint-config-next/typescript-eslint.
