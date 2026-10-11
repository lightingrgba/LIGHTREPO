import type { MetadataRoute } from "next"
import { PUBLIC_PATHS, SEO_LOCALES, SITE_URL, languageAlternates } from "@/lib/seo"
import { articles } from "@/lib/blog"

export default function sitemap(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = SEO_LOCALES.flatMap((lang) =>
        PUBLIC_PATHS.map((path) => ({
            url: `${SITE_URL}/${lang}${path}`,
            changeFrequency: path === "" ? "weekly" : "yearly",
            priority: path === "" ? 1 : 0.3,
            alternates: { languages: languageAlternates(path) },
        })),
    )

    // The blog is English-only.
    const blog: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/en/blog`, changeFrequency: "weekly", priority: 0.7 },
        ...articles.map((a) => ({
            url: `${SITE_URL}/en/blog/${a.slug}`,
            lastModified: a.updated,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ]

    return [...pages, ...blog]
}
