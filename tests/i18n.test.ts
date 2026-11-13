import assert from "node:assert/strict";
import test from "node:test";
import { resolveLocale } from "../src/lib/i18n.ts";
import en from "../src/content/en.json";
import es from "../src/content/es.json";

test("language negotiation respects quality, regional tags and explicit preference", () => {
  assert.equal(resolveLocale("es-PE,es;q=0.9,en;q=0.7"), "es");
  assert.equal(resolveLocale("es;q=0.2,en-US;q=0.9"), "en");
  assert.equal(resolveLocale("fr-FR,es;q=0.8,en;q=0.5"), "es");
  assert.equal(resolveLocale("es;q=0,en;q=0.5"), "en");
  assert.equal(resolveLocale("es;q=invalid,en;q=0.5"), "en");
  assert.equal(resolveLocale("es-PE", "en"), "en");
  assert.equal(resolveLocale("en-US", "es"), "es");
  assert.equal(resolveLocale("es-PE", "invalid"), "es");
  assert.equal(resolveLocale(null), "en");
  assert.equal(resolveLocale("de-DE,*;q=0.8"), "en");
});

function keys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value))
    return value.flatMap((item, i) => keys(item, `${prefix}[${i}]`));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([key, item]) =>
      keys(item, `${prefix}.${key}`),
    );
  return [prefix];
}

test("translations cover the same content structure and protect editorial decisions", () => {
  assert.deepEqual(keys(es), keys(en));
  for (const content of [en, es]) {
    assert.deepEqual(
      content.projects.map((project) => project.id),
      ["grams", "yupana", "inklab"],
    );
    assert.equal(content.projects[0].url, null);
    assert.equal(content.projects[1].url, null);
    const { jobs, experienceIntro, ...outsideExperience } = content;
    assert.ok(jobs.length && experienceIntro.length);
    assert.doesNotMatch(
      JSON.stringify(outsideExperience),
      /Deuna|Pichincha|Devsu|AGP Group|MS4M/,
    );
    assert.doesNotMatch(
      JSON.stringify(content),
      /bottleneck|cuello de botella|Web development training|Object Mapper|Frontend Interview Exercise/,
    );
  }
});
