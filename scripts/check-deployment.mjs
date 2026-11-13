import assert from "node:assert/strict";

const input = process.argv[2];
if (!input) throw new Error("Usage: npm run test:deployment -- https://your-deploy.netlify.app");
const base = new URL(input);
if (!["https:", "http:"].includes(base.protocol)) throw new Error("Expected an HTTP(S) deployment URL");

const checks = [
  ...["en", "es"].map((locale) => ({
    label: `${locale} browser language redirect`,
    run: async () => {
      const response = await fetch(new URL("/", base), { redirect: "manual", headers: { "accept-language": locale }, signal: AbortSignal.timeout(20000) });
      assert.equal(response.status, 307);
      assert.equal(new URL(response.headers.get("location"), base).pathname, `/${locale}`);
    },
  })),
  ...["en", "es"].map((locale) => ({
    label: `${locale} server-rendered page`,
    run: async () => {
      const response = await fetch(new URL(`/${locale}`, base), { signal: AbortSignal.timeout(20000) });
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.ok(html.includes(`<html lang="${locale}"`), "Correct document language");
      assert.ok(html.includes('id="experience"') && html.includes('id="projects"'), "Portfolio markup present");
      assert.ok(html.includes("Grams") && html.includes("Yupana"), "Project content present");
      assert.ok(html.includes('type="application/ld+json"'), "Structured metadata present");
    },
  })),
  ...[
    ["/cv/matias-diez-canseco.pdf", "application/pdf"],
    ["/brand/og-es.png", "image/png"],
    ["/sitemap.xml", "application/xml"],
  ].map(([pathname, type]) => ({
    label: pathname,
    run: async () => {
      const response = await fetch(new URL(pathname, base), { signal: AbortSignal.timeout(20000) });
      assert.equal(response.status, 200);
      assert.ok(response.headers.get("content-type")?.includes(type), `Expected ${type}`);
    },
  })),
];

const results = await Promise.all(checks.map(async ({ label, run }) => {
  try { await run(); return { label, passed: true }; }
  catch (error) { return { label, passed: false, error: error.message }; }
}));
for (const result of results) console.log(`${result.passed ? "PASS" : "FAIL"} ${result.label}${result.error ? `: ${result.error}` : ""}`);
if (results.some((result) => !result.passed)) process.exitCode = 1;
