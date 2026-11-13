import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og.js";
import React from "react";
import opentype from "opentype.js";
import en from "../src/content/en.json";
import es from "../src/content/es.json";
import { brandMarkSvg } from "../src/lib/brand";

const out = path.join(process.cwd(), "public");
await mkdir(path.join(out, "brand"), { recursive: true });
const mark = brandMarkSvg;
const font = await readFile(path.join(out, "fonts", "manrope-latin.ttf"));
const typeface = opentype.parse(
  font.buffer.slice(font.byteOffset, font.byteOffset + font.byteLength),
);
const wordmarkGeometry = {
  width: Math.ceil(typeface.getAdvanceWidth("mdc.", 32) + 4),
  height: 40,
  letters: typeface.getPath("mdc", 2, 32, 32).toPathData(3),
  dot: typeface
    .getPath(".", 2 + typeface.getAdvanceWidth("mdc", 32), 32, 32)
    .toPathData(3),
};
await writeFile(
  path.join(process.cwd(), "src", "lib", "wordmark.json"),
  JSON.stringify(wordmarkGeometry, null, 2) + "\n",
);
const wordmark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${wordmarkGeometry.width} ${wordmarkGeometry.height}"><path d="${wordmarkGeometry.letters}" fill="#f2f3f5"/><path d="${wordmarkGeometry.dot}" fill="#9dbbff"/></svg>`;
await writeFile(path.join(out, "brand", "wordmark.svg"), wordmark);
await writeFile(path.join(out, "icon.svg"), mark);
await writeFile(path.join(out, "brand", "mark.svg"), mark);

for (const size of [32, 180, 192, 512]) {
  const image = await sharp(Buffer.from(mark))
    .resize(size, size)
    .png()
    .toBuffer();
  const filename =
    size === 180 ? "apple-touch-icon.png" : `brand/icon-${size}.png`;
  await writeFile(path.join(out, filename), image);
  if (size === 32) {
    // ICO directory with a PNG image, supported by modern favicon consumers.
    const directory = Buffer.alloc(22);
    directory.writeUInt16LE(1, 2);
    directory.writeUInt16LE(1, 4);
    directory[6] = 32;
    directory[7] = 32;
    directory.writeUInt16LE(1, 10);
    directory.writeUInt16LE(32, 12);
    directory.writeUInt32LE(image.length, 14);
    directory.writeUInt32LE(22, 18);
    await writeFile(
      path.join(out, "favicon.ico"),
      Buffer.concat([directory, image]),
    );
  }
}

for (const [locale, content] of Object.entries({ en, es })) {
  const response = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#08090b",
        color: "#f2f3f5",
        fontFamily: "Manrope",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 36, fontWeight: 800 }}>mdc.</span>
        <span style={{ fontSize: 22, color: "#b2b5bd" }}>
          matiasdiezcanseco.dev
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: "-5px",
            lineHeight: 1.05,
          }}
        >
          Matías
        </span>
        <span
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: "-5px",
            lineHeight: 1.05,
          }}
        >
          Diez-Canseco.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #272a31",
          paddingTop: 28,
        }}
      >
        <span style={{ fontSize: 23, color: "#b2b5bd" }}>
          {content.hero.intro}
        </span>
        <span style={{ color: "#9dbbff", fontSize: 22 }}>
          {locale.toUpperCase()}
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Manrope", data: font, style: "normal", weight: 800 }],
    },
  );
  await writeFile(
    path.join(out, "brand", `og-${locale}.png`),
    Buffer.from(await response.arrayBuffer()),
  );
}
console.log(
  "Generated SVG mark, ICO, Apple icon, app icons and EN/ES sharing images.",
);
