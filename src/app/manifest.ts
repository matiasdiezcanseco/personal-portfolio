import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "mdc.",
    start_url: "/",
    display: "browser",
    background_color: "#08090b",
    theme_color: "#08090b",
    icons: [192, 512].map((size) => ({
      src: `/brand/icon-${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    })),
  };
}
