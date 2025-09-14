import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages = ["/", "/offres", "/contact", "/blog"];
  return pages.map((p) => ({ url: new URL(p, base).toString(), changeFrequency: "weekly", priority: p === "/" ? 1 : 0.7 }));
}
