# Next.js implementation

The approved portfolio is implemented in Next.js 16.4.6 / React 19.3.1 with App Router, TypeScript, Tailwind CSS 4 and shadcn/ui. The previous Vite/Sanity application, assets, configuration and dependencies have been removed. The approved HTML prototype is retained under `design/` as an unserved reference.

## Rendering and localization

- Production build identifies `/[locale]` as dynamic (`ƒ`, rendered on demand), not a static export.
- `/en` and `/es` return localized portfolio markup and metadata in the initial HTML.
- `/` temporarily redirects using the browser's weighted `Accept-Language` header; supported regional variants map to English or Spanish and unsupported languages fall back to English.
- A manual language choice is remembered in `portfolio-locale` for one year and takes precedence on subsequent root visits. Language-specific URLs retain their explicit locale.
- The personalized root redirect is private/no-store and varies on language/cookie.
- All content is local. Only the language switch, mobile menu, section index and accordion add client interaction. Work descriptions remain readable with JavaScript disabled.
- The supplied PDF remains in its original English and is served from `public/cv/`.

## Branding and SEO

- New MDC vector wordmark, M monogram, SVG favicon, 32px ICO, Apple touch icon and 192/512px app icons.
- Original EN/ES sharing images at 1200×630, regenerated with `npm run brand`.
- Manrope variable WOFF2 is self-hosted (24,532 bytes); no runtime font downloads from Google. Its SIL OFL license is included.
- Localized page titles, descriptions, HTML language, canonical URLs, reciprocal language alternatives and x-default, Open Graph/Twitter metadata and images.
- Person and ProfilePage JSON-LD avoid employer names outside the Experience content.
- Next.js sitemap, robots and web manifest routes; unknown routes/locales return 404.
- Canonical origin uses the supplied production domain. Actual publication and search-engine indexing are outside this local implementation.

## Verification

- `npm run brand`: generated all branding assets successfully.
- `npm run build`: passed; locale pages confirmed dynamic server-rendered routes.
- `npm run typecheck`: passed.
- `npm run lint`: passed without warnings.
- `npm test`: 2 tests passed (weighted locale negotiation, translation coverage and editorial constraints).
- `npm run test:e2e`: 5 tests passed against a production server, including SSR/SEO/assets, redirect preferences, manual language switch, mobile sheet navigation and Escape/focus return, accordion behavior, JavaScript-disabled rendering, and overflow checks for both languages at 320, 390, 768, 1024 and 1440px.
- `npm audit`: 0 vulnerabilities. A scoped development-dependency override resolves the TypeScript ESLint minimatch advisory.
- `git diff --check`: passed; Git reports only its Windows LF/CRLF conversion notices.
- Production screenshots were reviewed for the approved English desktop and Spanish mobile layouts. Browser tests capture final EN/ES desktop/mobile screenshots under ignored `test-results/`.

The design skill's generic commercial-site requirements (fixed screen heights, visuals in every section and mandatory animated moments) are superseded by the user's explicitly approved text-led portfolio direction. Its earlier gate report remains a historical prototype artifact, not a claimed production pass. The approved visual hierarchy is retained; targeted production tests and visual inspection validate the actual implementation.

## Deployment

Netlify migration configuration is versioned in `netlify.toml` and `.nvmrc`: Node.js 24, `npm run build`, publish `.next`, no SPA rewrite, and explicit OpenNext adapter activation through `@netlify/plugin-nextjs`. The first fix addressed Node.js 16.20.2 failing the package's engine requirement. Its replacement build succeeded, but deployment `6af732b813b82102166916e4` reported `plugin_state: "none"`, no functions and no edge functions, while the hosted smoke check returned 404 for every page and asset. That evidence confirmed the existing Vite site's adapter had not been activated automatically. Explicit plugin configuration and its dependency address the missing runtime. `npm run test:deployment -- <url>` checks actual hosted behavior; the next preview must pass it before this deployment issue is considered resolved.

The implementation itself did not publish production. PR #10 contains the subsequent GitHub publication and Netlify preview configuration. Use `npm run dev` locally or `npm run build` followed by `npm start` on a standalone Node.js host. Netlify uses its adapter instead of the start command. See the root README for maintenance and commands.
