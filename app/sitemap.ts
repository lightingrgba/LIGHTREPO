import type { MetadataRoute } from "next"
import { PUBLIC_PATHS, SEO_LOCALES, SITE_URL, languageAlternates } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
    return SEO_LOCALES.flatMap((lang) =>
        PUBLIC_PATHS.map((path) => ({
            url: `${SITE_URL}/${lang}${path}`,
            changeFrequency: path === "" ? "weekly" : "yearly",
            priority: path === "" ? 1 : 0.3,
            alternates: { languages: languageAlternates(path) },
        })),
    )
}
